import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { gigs, gigPayments, gigMilestones, employers } from '@/db/schema';
import { eq, and, inArray, sum, count } from 'drizzle-orm';

// My Gigs Summary API - Worker & Employer Stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get('user_id');
    const userType = searchParams.get('user_type');

    // Validate required parameters
    if (!userIdParam) {
      return NextResponse.json({ 
        error: "user_id parameter is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!userType) {
      return NextResponse.json({ 
        error: "user_type parameter is required",
        code: "MISSING_USER_TYPE" 
      }, { status: 400 });
    }

    // Validate user_id is positive integer
    const userId = parseInt(userIdParam);
    if (isNaN(userId) || userId <= 0) {
      return NextResponse.json({ 
        error: "user_id must be a positive integer",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    // Validate user_type
    if (userType !== 'worker' && userType !== 'employer') {
      return NextResponse.json({ 
        error: "user_type must be either 'worker' or 'employer'",
        code: "INVALID_USER_TYPE" 
      }, { status: 400 });
    }

    let responseData;

    if (userType === 'worker') {
      // Get worker's gigs
      const workerGigs = await db.select({ id: gigs.id })
        .from(gigs)
        .where(eq(gigs.workerId, userId));

      const gigIds = workerGigs.map(g => g.id);

      if (gigIds.length === 0) {
        return NextResponse.json({
          total_earnings: 0,
          total_locked: 0,
          active_gigs: 0,
          pending_release: 0,
          total_released: 0
        });
      }

      // Calculate total_earnings (withdrawn payments)
      const withdrawnPayments = await db.select({
        total: sum(gigPayments.amount)
      })
        .from(gigPayments)
        .where(and(
          inArray(gigPayments.gigId, gigIds),
          eq(gigPayments.status, 'withdrawn')
        ));

      const totalEarnings = withdrawnPayments[0]?.total || 0;

      // Calculate total_locked (locked + pending_release payments)
      const lockedPayments = await db.select({
        total: sum(gigPayments.amount)
      })
        .from(gigPayments)
        .where(and(
          inArray(gigPayments.gigId, gigIds),
          inArray(gigPayments.status, ['locked', 'pending_release'])
        ));

      const totalLocked = lockedPayments[0]?.total || 0;

      // Count active_gigs (in_progress status)
      const activeGigsCount = await db.select({
        count: count()
      })
        .from(gigs)
        .where(and(
          eq(gigs.workerId, userId),
          eq(gigs.status, 'in_progress')
        ));

      const activeGigs = activeGigsCount[0]?.count || 0;

      // Count pending_release (payments with pending_release status)
      const pendingReleaseCount = await db.select({
        count: count()
      })
        .from(gigPayments)
        .where(and(
          inArray(gigPayments.gigId, gigIds),
          eq(gigPayments.status, 'pending_release')
        ));

      const pendingRelease = pendingReleaseCount[0]?.count || 0;

      // Calculate total_released (released payments)
      const releasedPayments = await db.select({
        total: sum(gigPayments.amount)
      })
        .from(gigPayments)
        .where(and(
          inArray(gigPayments.gigId, gigIds),
          eq(gigPayments.status, 'released')
        ));

      const totalReleased = releasedPayments[0]?.total || 0;

      responseData = {
        total_earnings: Number(totalEarnings) || 0,
        total_locked: Number(totalLocked) || 0,
        active_gigs: Number(activeGigs),
        pending_release: Number(pendingRelease),
        total_released: Number(totalReleased) || 0
      };

    } else {
      // Employer logic
      const employerGigs = await db.select({
        id: gigs.id,
        escrowAmount: gigs.escrowAmount,
        escrowStatus: gigs.escrowStatus
      })
        .from(gigs)
        .where(eq(gigs.employerId, userId));

      const gigIds = employerGigs.map(g => g.id);

      // Get employer's escrow balance
      const employerData = await db.select({
        escrowBalance: employers.escrowBalance
      })
        .from(employers)
        .where(eq(employers.id, userId))
        .limit(1);

      const totalEarnings = employerData[0]?.escrowBalance || 0;

      // Calculate total_locked
      const totalLocked = employerGigs
        .filter(g => g.escrowStatus === 'deposited')
        .reduce((sum, g) => sum + (g.escrowAmount || 0), 0);

      // Count active_gigs
      const activeGigsCount = await db.select({
        count: count()
      })
        .from(gigs)
        .where(and(
          eq(gigs.employerId, userId),
          eq(gigs.status, 'in_progress')
        ));

      const activeGigs = activeGigsCount[0]?.count || 0;

      // Count pending_release
      let pendingRelease = 0;
      if (gigIds.length > 0) {
        const pendingReleaseCount = await db.select({
          count: count()
        })
          .from(gigMilestones)
          .where(and(
            inArray(gigMilestones.gigId, gigIds),
            eq(gigMilestones.status, 'submitted')
          ));

        pendingRelease = pendingReleaseCount[0]?.count || 0;
      }

      // Count total_released
      const totalReleasedCount = await db.select({
        count: count()
      })
        .from(gigs)
        .where(and(
          eq(gigs.employerId, userId),
          eq(gigs.status, 'completed')
        ));

      const totalReleased = totalReleasedCount[0]?.count || 0;

      responseData = {
        total_earnings: Number(totalEarnings) || 0,
        total_locked: Number(totalLocked) || 0,
        active_gigs: Number(activeGigs),
        pending_release: Number(pendingRelease),
        total_released: Number(totalReleased)
      };
    }

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}