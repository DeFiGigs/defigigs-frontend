// Export all seed data
export { activitiesSeed } from './activities';
export { collateralAssetsSeed } from './collateral_assets';
export { employerNotificationsSeed } from './employer_notifications';
export { employersSeed } from './employers';
export { escrowTransactionsSeed } from './escrow_transactions';
export { financingRequestsSeed } from './financing_requests';
export { gigApplicantsSeed } from './gig_applicants';
export { gigInvestmentsSeed } from './gig_investments';
export { gigMilestonesSeed } from './gig_milestones';
export { gigNotificationsSeed } from './gig_notifications';
export { gigPaymentsSeed } from './gig_payments';
export { gigsSeed } from './gigs';
export { investorNotificationsSeed } from './investor_notifications';
export { investorPoolSeed } from './investor_pool';
export { investorProfilesSeed } from './investor_profiles';
export { platformStatsSeed } from './platform_stats';
export { poolDepositsSeed } from './pool_deposits';
export { repaymentSchedulesSeed } from './repayment_schedules';
export { userStatsSeed } from './user_stats';
export { withdrawalsSeed } from './withdrawals';
export { workerRatingsSeed } from './worker_ratings';

// Aggregate export for convenience
export const allSeeds = {
  activities: activitiesSeed,
  collateralAssets: collateralAssetsSeed,
  employerNotifications: employerNotificationsSeed,
  employers: employersSeed,
  escrowTransactions: escrowTransactionsSeed,
  financingRequests: financingRequestsSeed,
  gigApplicants: gigApplicantsSeed,
  gigInvestments: gigInvestmentsSeed,
  gigMilestones: gigMilestonesSeed,
  gigNotifications: gigNotificationsSeed,
  gigPayments: gigPaymentsSeed,
  gigs: gigsSeed,
  investorNotifications: investorNotificationsSeed,
  investorPool: investorPoolSeed,
  investorProfiles: investorProfilesSeed,
  platformStats: platformStatsSeed,
  poolDeposits: poolDepositsSeed,
  repaymentSchedules: repaymentSchedulesSeed,
  userStats: userStatsSeed,
  withdrawals: withdrawalsSeed,
  workerRatings: workerRatingsSeed,
};
