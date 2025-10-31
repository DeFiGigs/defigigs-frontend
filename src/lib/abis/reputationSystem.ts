export const ReputationSystemABI = [
  {
    "inputs": [],
    "name": "createProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_ratee", "type": "address"},
      {"internalType": "uint256", "name": "_gigId", "type": "uint256"},
      {"internalType": "uint256", "name": "_score", "type": "uint256"},
      {"internalType": "string", "name": "_comment", "type": "string"},
      {"internalType": "uint8", "name": "_ratingType", "type": "uint8"}
    ],
    "name": "submitRating",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "userProfiles",
    "outputs": [
      {"internalType": "address", "name": "userAddress", "type": "address"},
      {"internalType": "uint256", "name": "totalGigsCompleted", "type": "uint256"},
      {"internalType": "uint256", "name": "totalGigsCancelled", "type": "uint256"},
      {"internalType": "uint256", "name": "totalEarnings", "type": "uint256"},
      {"internalType": "uint256", "name": "totalSpent", "type": "uint256"},
      {"internalType": "uint256", "name": "reputationScore", "type": "uint256"},
      {"internalType": "uint256", "name": "totalRatings", "type": "uint256"},
      {"internalType": "uint256", "name": "sumRatings", "type": "uint256"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "lastUpdated", "type": "uint256"},
      {"internalType": "bool", "name": "isActive", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserAverageRating",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserCompletionRate",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserBadges",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "ProfileCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "ratingId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "rater", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "ratee", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "score", "type": "uint256"}
    ],
    "name": "RatingSubmitted",
    "type": "event"
  }
] as const;
