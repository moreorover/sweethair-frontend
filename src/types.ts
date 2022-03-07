export type Purchase = {
  id: number;
  orderedAt: Date | string;
  arrivesAt: Date | string;
  arrived: boolean;
  total: number;
};
