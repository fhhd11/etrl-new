export type PartnerSession = {
  referrerCode: string;
  commissionRate: number;
};

export type DashboardMetrics = {
  totalReferrals: number;
  successfulPayments: number;
  totalRevenue: number;
  totalCommission: number;
};

export type ChartPoint = {
  date: string;
  value: number;
};

export type DashboardData = {
  metrics: DashboardMetrics;
  referralsChart: ChartPoint[];
  earningsChart: ChartPoint[];
};
