export const financingRequestsSeed = [
  {
    id: "fin-1",
    gigId: "gig-1",
    workerId: "worker-1",
    workerAddress: "0xabc1234567890123456789012345678901234567",
    requestedAmount: "5000.00",
    collateralAmount: "500.00",
    interestRate: "5.0",
    duration: 14, // days
    status: "pending",
    requestedAt: new Date("2024-10-02"),
    updatedAt: new Date("2024-10-02"),
  },
  {
    id: "fin-2",
    gigId: "gig-2",
    workerId: "worker-1",
    workerAddress: "0xabc1234567890123456789012345678901234567",
    requestedAmount: "8000.00",
    collateralAmount: "800.00",
    interestRate: "4.5",
    duration: 28, // days
    status: "approved",
    fundedAmount: "8000.00",
    requestedAt: new Date("2024-09-16"),
    updatedAt: new Date("2024-09-18"),
    approvedAt: new Date("2024-09-18"),
  },
  {
    id: "fin-3",
    gigId: "gig-5",
    workerId: "worker-5",
    workerAddress: "0x5678901234567890123456789012345678901234",
    requestedAmount: "4000.00",
    collateralAmount: "400.00",
    interestRate: "5.5",
    duration: 21, // days
    status: "pending",
    requestedAt: new Date("2024-10-21"),
    updatedAt: new Date("2024-10-21"),
  },
];
