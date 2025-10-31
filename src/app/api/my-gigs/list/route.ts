import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { gigs, gigMilestones } from '@/db/schema';
import { eq, and, inArray, asc } from 'drizzle-orm';

// My Gigs List API - Fetch gigs by tab
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const userType = searchParams.get('user_type');
    const tab = searchParams.get('tab') || 'active';

    // Validation
    if (!userId || isNaN(parseInt(userId)) || parseInt(userId) <= 0) {
      return NextResponse.json({
        error: 'Valid user_id is required and must be a positive integer',
        code: 'INVALID_USER_ID'
      }, { status: 400 });
    }

    if (!userType || !['worker', 'employer'].includes(userType)) {
      return NextResponse.json({
        error: 'user_type must be either "worker" or "employer"',
        code: 'INVALID_USER_TYPE'
      }, { status: 400 });
    }

    if (!['active', 'pending_release', 'history'].includes(tab)) {
      return NextResponse.json({
        error: 'tab must be one of: active, pending_release, history',
        code: 'INVALID_TAB'
      }, { status: 400 });
    }

    const userIdInt = parseInt(userId);

    // Build query based on user type and tab
    let gigsQuery;
    let filteredGigs;

    if (userType === 'worker') {
      // Filter by workerId
      if (tab === 'active') {
        gigsQuery = db.select()
          .from(gigs)
          .where(and(
            eq(gigs.workerId, userIdInt),
            inArray(gigs.status, ['in_progress', 'assigned'])
          ));
      } else if (tab === 'pending_release') {
        // Get gigs with milestone_submitted status OR has submitted milestones
        const gigsWithSubmittedStatus = await db.select()
          .from(gigs)
          .where(and(
            eq(gigs.workerId, userIdInt),
            eq(gigs.status, 'milestone_submitted')
          ));

        // Get gigs that have submitted milestones
        const gigsWithSubmittedMilestones = await db.select({
          gigId: gigMilestones.gigId
        })
          .from(gigMilestones)
          .where(eq(gigMilestones.status, 'submitted'))
          .groupBy(gigMilestones.gigId);

        const gigIdsWithSubmittedMilestones = gigsWithSubmittedMilestones.map(m => m.gigId).filter(id => id !== null) as number[];

        if (gigIdsWithSubmittedMilestones.length > 0) {
          const additionalGigs = await db.select()
            .from(gigs)
            .where(and(
              eq(gigs.workerId, userIdInt),
              inArray(gigs.id, gigIdsWithSubmittedMilestones)
            ));

          // Combine and deduplicate
          const combinedGigs = [...gigsWithSubmittedStatus, ...additionalGigs];
          const uniqueGigs = Array.from(new Map(combinedGigs.map(g => [g.id, g])).values());
          filteredGigs = uniqueGigs;
        } else {
          filteredGigs = gigsWithSubmittedStatus;
        }
      } else if (tab === 'history') {
        gigsQuery = db.select()
          .from(gigs)
          .where(and(
            eq(gigs.workerId, userIdInt),
            inArray(gigs.status, ['completed', 'cancelled'])
          ));
      }
    } else {
      // employer
      if (tab === 'active') {
        gigsQuery = db.select()
          .from(gigs)
          .where(and(
            eq(gigs.employerId, userIdInt),
            inArray(gigs.status, ['in_progress', 'assigned'])
          ));
      } else if (tab === 'pending_release') {
        // Get gigs that have submitted milestones
        const gigsWithSubmittedMilestones = await db.select({
          gigId: gigMilestones.gigId
        })
          .from(gigMilestones)
          .where(eq(gigMilestones.status, 'submitted'))
          .groupBy(gigMilestones.gigId);

        const gigIdsWithSubmittedMilestones = gigsWithSubmittedMilestones.map(m => m.gigId).filter(id => id !== null) as number[];

        if (gigIdsWithSubmittedMilestones.length > 0) {
          gigsQuery = db.select()
            .from(gigs)
            .where(and(
              eq(gigs.employerId, userIdInt),
              inArray(gigs.id, gigIdsWithSubmittedMilestones)
            ));
        } else {
          filteredGigs = [];
        }
      } else if (tab === 'history') {
        gigsQuery = db.select()
          .from(gigs)
          .where(and(
            eq(gigs.employerId, userIdInt),
            inArray(gigs.status, ['completed', 'cancelled'])
          ));
      }
    }

    // Execute query if not already filtered
    if (!filteredGigs && gigsQuery) {
      filteredGigs = await gigsQuery;
    }

    if (!filteredGigs) {
      filteredGigs = [];
    }

    // For each gig, fetch milestones and calculate next milestone
    const gigsWithMilestones = await Promise.all(
      filteredGigs.map(async (gig) => {
        // Fetch all milestones ordered by orderIndex
        const milestones = await db.select()
          .from(gigMilestones)
          .where(eq(gigMilestones.gigId, gig.id))
          .orderBy(asc(gigMilestones.orderIndex));

        // Calculate next milestone
        const nextMilestone = milestones.find(m => 
          m.status === 'pending' || m.status === 'in_progress'
        );

        return {
          id: gig.id,
          title: gig.title,
          description: gig.description,
          paymentAmount: gig.paymentAmount,
          deadline: gig.deadline,
          status: gig.status,
          progress: gig.progress,
          escrowStatus: gig.escrowStatus,
          paymentStatus: gig.paymentStatus,
          category: gig.category,
          requiredSkills: gig.requiredSkills,
          employerId: gig.employerId,
          workerId: gig.workerId,
          assignedWorkerName: gig.assignedWorkerName,
          milestones: milestones.map(m => ({
            id: m.id,
            title: m.title,
            status: m.status,
            amount: m.amount,
            paymentPercentage: m.paymentPercentage
          })),
          nextMilestone: nextMilestone ? {
            id: nextMilestone.id,
            title: nextMilestone.title,
            status: nextMilestone.status
          } : null
        };
      })
    );

    return NextResponse.json({
      gigs: gigsWithMilestones
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}