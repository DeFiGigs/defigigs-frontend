export const GigEscrowABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "_totalAmount", "type": "uint256"},
      {"internalType": "address", "name": "_paymentToken", "type": "address"},
      {"internalType": "uint256", "name": "_deadline", "type": "uint256"},
      {"internalType": "string[]", "name": "_milestoneTitles", "type": "string[]"},
      {"internalType": "string[]", "name": "_milestoneDescriptions", "type": "string[]"},
      {"internalType": "uint256[]", "name": "_milestonePercentages", "type": "uint256[]"}
    ],
    "name": "createGig",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_gigId", "type": "uint256"},
      {"internalType": "address", "name": "_worker", "type": "address"}
    ],
    "name": "assignWorker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_gigId", "type": "uint256"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"}
    ],
    "name": "depositEscrow",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_milestoneId", "type": "uint256"},
      {"internalType": "string", "name": "_submissionUrl", "type": "string"}
    ],
    "name": "submitMilestone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_milestoneId", "type": "uint256"}],
    "name": "approveMilestone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_milestoneId", "type": "uint256"},
      {"internalType": "string", "name": "_reason", "type": "string"}
    ],
    "name": "rejectMilestone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_gigId", "type": "uint256"}],
    "name": "withdrawPayment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_gigId", "type": "uint256"},
      {"internalType": "string", "name": "_reason", "type": "string"}
    ],
    "name": "cancelGig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_gigId", "type": "uint256"}],
    "name": "getGigMilestones",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "gigs",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "employer", "type": "address"},
      {"internalType": "address", "name": "worker", "type": "address"},
      {"internalType": "uint256", "name": "totalAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "lockedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "releasedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "withdrawnAmount", "type": "uint256"},
      {"internalType": "address", "name": "paymentToken", "type": "address"},
      {"internalType": "uint8", "name": "status", "type": "uint8"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "milestones",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "uint256", "name": "gigId", "type": "uint256"},
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "uint256", "name": "paymentPercentage", "type": "uint256"},
      {"internalType": "uint8", "name": "status", "type": "uint8"},
      {"internalType": "string", "name": "submissionUrl", "type": "string"},
      {"internalType": "uint256", "name": "submittedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "approvedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextGigId",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "gigId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "employer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256"}
    ],
    "name": "GigCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "gigId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "worker", "type": "address"}
    ],
    "name": "WorkerAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "milestoneId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "submissionUrl", "type": "string"}
    ],
    "name": "MilestoneSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "milestoneId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "gigId", "type": "uint256"}
    ],
    "name": "MilestoneApproved",
    "type": "event"
  }
] as const;
