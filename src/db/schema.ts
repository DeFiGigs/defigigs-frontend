import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// Add investor pool tables
export const investorPool = sqliteTable('investor_pool', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  totalValueLocked: real('total_value_locked').notNull().default(0),
  activeGigsCount: integer('active_gigs_count').notNull().default(0),
  investorsCount: integer('investors_count').notNull().default(0),
  availableFunds: real('available_funds').notNull().default(0),
  yieldRate: real('yield_rate').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const investorProfiles = sqliteTable('investor_profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  walletAddress: text('wallet_address').notNull().unique(),
  investedAmount: real('invested_amount').notNull().default(0),
  realizedYield: real('realized_yield').notNull().default(0),
  pendingYield: real('pending_yield').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const poolDeposits = sqliteTable('pool_deposits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  investorId: integer('investor_id').references(() => investorProfiles.id),
  amount: real('amount').notNull(),
  walletAddress: text('wallet_address').notNull(),
  status: text('status').notNull().default('pending'),
  transactionHash: text('transaction_hash'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const gigInvestments = sqliteTable('gig_investments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  investorId: integer('investor_id').references(() => investorProfiles.id),
  gigId: integer('gig_id').notNull(),
  gigTitle: text('gig_title').notNull(),
  workerName: text('worker_name').notNull(),
  amount: real('amount').notNull(),
  expectedReturn: real('expected_return').notNull(),
  actualReturn: real('actual_return'),
  allocationPercent: real('allocation_percent').notNull(),
  status: text('status').notNull().default('allocated'),
  progress: integer('progress').notNull().default(0),
  riskScore: integer('risk_score').notNull(),
  dueDate: text('due_date').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const withdrawals = sqliteTable('withdrawals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  investorId: integer('investor_id').references(() => investorProfiles.id),
  amount: real('amount').notNull(),
  walletAddress: text('wallet_address').notNull(),
  withdrawalType: text('withdrawal_type').notNull(),
  status: text('status').notNull().default('pending'),
  transactionHash: text('transaction_hash'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const investorNotifications = sqliteTable('investor_notifications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  investorId: integer('investor_id').references(() => investorProfiles.id),
  eventType: text('event_type').notNull(),
  gigId: integer('gig_id'),
  amount: real('amount'),
  message: text('message').notNull(),
  read: integer('read', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

// Add employer panel tables
export const employers = sqliteTable('employers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  walletAddress: text('wallet_address').notNull().unique(),
  postedGigsCount: integer('posted_gigs_count').notNull().default(0),
  escrowBalance: real('escrow_balance').notNull().default(0),
  totalSpent: real('total_spent').notNull().default(0),
  completedProjectsCount: integer('completed_projects_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const gigs = sqliteTable('gigs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  employerId: integer('employer_id').references(() => employers.id),
  workerId: integer('worker_id'),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  requiredSkills: text('required_skills').notNull(),
  deadline: text('deadline').notNull(),
  paymentAmount: real('payment_amount').notNull(),
  escrowAmount: real('escrow_amount').notNull().default(0),
  escrowStatus: text('escrow_status').notNull().default('not_deposited'),
  paymentStatus: text('payment_status').notNull().default('pending'),
  status: text('status').notNull().default('draft'),
  assignedWorkerId: integer('assigned_worker_id'),
  assignedWorkerName: text('assigned_worker_name'),
  assignedWorkerRating: real('assigned_worker_rating'),
  applicantsCount: integer('applicants_count').notNull().default(0),
  progress: integer('progress').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const gigMilestones = sqliteTable('gig_milestones', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  gigId: integer('gig_id').references(() => gigs.id),
  title: text('title').notNull(),
  description: text('description'),
  amount: real('amount').notNull(),
  paymentPercentage: integer('payment_percentage').notNull().default(0),
  status: text('status').notNull().default('pending'),
  orderIndex: integer('order_index').notNull(),
  submissionUrl: text('submission_url'),
  submissionNote: text('submission_note'),
  reviewComments: text('review_comments'),
  submittedAt: text('submitted_at'),
  submissionDate: text('submission_date'),
  approvedAt: text('approved_at'),
  approvalDate: text('approval_date'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const gigApplicants = sqliteTable('gig_applicants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  gigId: integer('gig_id').references(() => gigs.id),
  workerName: text('worker_name').notNull(),
  workerWallet: text('worker_wallet').notNull(),
  workerRating: real('worker_rating'),
  proposal: text('proposal').notNull(),
  proposedAmount: real('proposed_amount').notNull(),
  status: text('status').notNull().default('pending'),
  appliedAt: text('applied_at').notNull(),
});

export const workerRatings = sqliteTable('worker_ratings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  gigId: integer('gig_id').references(() => gigs.id),
  employerId: integer('employer_id').references(() => employers.id),
  workerId: integer('worker_id').notNull(),
  workerName: text('worker_name').notNull(),
  rating: integer('rating').notNull(),
  feedback: text('feedback'),
  createdAt: text('created_at').notNull(),
});

export const employerNotifications = sqliteTable('employer_notifications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  employerId: integer('employer_id').references(() => employers.id),
  eventType: text('event_type').notNull(),
  gigId: integer('gig_id'),
  gigTitle: text('gig_title'),
  message: text('message').notNull(),
  read: integer('read', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

export const gigPayments = sqliteTable('gig_payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  gigId: integer('gig_id').references(() => gigs.id),
  milestoneId: integer('milestone_id').references(() => gigMilestones.id),
  amount: real('amount').notNull(),
  status: text('status').notNull().default('locked'),
  transactionHash: text('transaction_hash'),
  releasedAt: text('released_at'),
  withdrawnAt: text('withdrawn_at'),
  createdAt: text('created_at').notNull(),
});

export const gigNotifications = sqliteTable('gig_notifications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  gigId: integer('gig_id').references(() => gigs.id),
  type: text('type').notNull(),
  message: text('message').notNull(),
  read: integer('read', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

// Add dashboard tables at the end
export const userStats = sqliteTable('user_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().unique(),
  totalGigsCompleted: integer('total_gigs_completed').notNull().default(0),
  totalEarnings: real('total_earnings').notNull().default(0),
  activeGigs: integer('active_gigs').notNull().default(0),
  successRate: real('success_rate').notNull().default(0),
  reputationScore: integer('reputation_score').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const activities = sqliteTable('activities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  activityType: text('activity_type').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  amount: real('amount'),
  relatedGigId: integer('related_gig_id'),
  createdAt: text('created_at').notNull(),
});

export const platformStats = sqliteTable('platform_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  totalGigs: integer('total_gigs').notNull().default(0),
  totalPaid: text('total_paid').notNull(),
  totalFreelancers: integer('total_freelancers').notNull().default(0),
  successRate: text('success_rate').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Add financing tables at the end
export const financingRequests = sqliteTable('financing_requests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  gigId: integer('gig_id'),
  gigTitle: text('gig_title'),
  requestedAmount: real('requested_amount').notNull(),
  approvedAmount: real('approved_amount'),
  interestRate: real('interest_rate').notNull(),
  repaymentDeadline: text('repayment_deadline').notNull(),
  status: text('status').notNull().default('pending'),
  collateralId: integer('collateral_id'),
  createdAt: text('created_at').notNull(),
  approvedAt: text('approved_at'),
});

export const collateralAssets = sqliteTable('collateral_assets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  assetType: text('asset_type').notNull(),
  assetName: text('asset_name').notNull(),
  assetValue: real('asset_value').notNull(),
  lockedAmount: real('locked_amount').notNull().default(0),
  status: text('status').notNull().default('available'),
  walletAddress: text('wallet_address').notNull(),
  tokenId: text('token_id'),
  createdAt: text('created_at').notNull(),
});

export const escrowTransactions = sqliteTable('escrow_transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  gigId: integer('gig_id').notNull(),
  employerId: text('employer_id').notNull(),
  workerId: text('worker_id').notNull(),
  totalAmount: real('total_amount').notNull(),
  lockedAmount: real('locked_amount').notNull(),
  releasedAmount: real('released_amount').notNull().default(0),
  status: text('status').notNull().default('pending'),
  milestoneId: integer('milestone_id'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const repaymentSchedules = sqliteTable('repayment_schedules', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  financingId: integer('financing_id').notNull(),
  userId: text('user_id').notNull(),
  dueAmount: real('due_amount').notNull(),
  paidAmount: real('paid_amount').notNull().default(0),
  dueDate: text('due_date').notNull(),
  status: text('status').notNull().default('pending'),
  paymentDate: text('payment_date'),
  createdAt: text('created_at').notNull(),
});