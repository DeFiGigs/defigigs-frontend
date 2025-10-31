export const GigFactoryABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "templateId", "type": "uint256"},
      {"internalType": "address", "name": "paymentToken", "type": "address"}
    ],
    "name": "createDemoGig",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "address", "name": "paymentToken", "type": "address"},
      {"internalType": "uint256", "name": "durationDays", "type": "uint256"}
    ],
    "name": "createSimpleGig",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "templateId", "type": "uint256"}],
    "name": "getTemplate",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "uint256", "name": "durationDays", "type": "uint256"},
      {"internalType": "string[]", "name": "milestoneTitles", "type": "string[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllTemplateNames",
    "outputs": [{"internalType": "string[]", "name": "", "type": "string[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "templateCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "gigId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "employer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "templateId", "type": "uint256"}
    ],
    "name": "DemoGigCreated",
    "type": "event"
  }
] as const;
