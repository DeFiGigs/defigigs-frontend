export const CollateralManagerABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_token", "type": "address"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"}
    ],
    "name": "depositCollateral",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_collateralId", "type": "uint256"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"}
    ],
    "name": "withdrawCollateral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserCollaterals",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_collateralId", "type": "uint256"}],
    "name": "getCollateralValueUSD",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_collateralId", "type": "uint256"}],
    "name": "getAvailableCollateralValueUSD",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "collateralDeposits",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "token", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "uint256", "name": "lockedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "availableAmount", "type": "uint256"},
      {"internalType": "uint8", "name": "status", "type": "uint8"},
      {"internalType": "uint256", "name": "depositedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "collateralId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": false, "internalType": "address", "name": "token", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "CollateralDeposited",
    "type": "event"
  }
] as const;
