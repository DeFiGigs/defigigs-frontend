export const GigFinancingABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "_gigId", "type": "uint256"},
      {"internalType": "uint256", "name": "_requestedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "uint256", "name": "_collateralId", "type": "uint256"}
    ],
    "name": "requestFinancing",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_financingId", "type": "uint256"}],
    "name": "disburseFinancing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_financingId", "type": "uint256"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"}
    ],
    "name": "makeRepayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserFinancings",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "financingRequests",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "borrower", "type": "address"},
      {"internalType": "uint256", "name": "gigId", "type": "uint256"},
      {"internalType": "uint256", "name": "requestedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "approvedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "interestRate", "type": "uint256"},
      {"internalType": "uint256", "name": "duration", "type": "uint256"},
      {"internalType": "uint256", "name": "collateralId", "type": "uint256"},
      {"internalType": "uint256", "name": "collateralLockId", "type": "uint256"},
      {"internalType": "uint8", "name": "status", "type": "uint8"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "approvedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "disbursedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "dueDate", "type": "uint256"},
      {"internalType": "uint256", "name": "totalRepaid", "type": "uint256"},
      {"internalType": "uint256", "name": "totalDue", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidityPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "financingId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "borrower", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "gigId", "type": "uint256"}
    ],
    "name": "FinancingRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "financingId", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "borrower", "type": "address"}
    ],
    "name": "FinancingDisbursed",
    "type": "event"
  }
] as const;
