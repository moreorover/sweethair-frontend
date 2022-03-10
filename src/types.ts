export type Purchase = {
  id: number;
  orderedAt: Date | string;
  arrivesAt: Date | string;
  arrived: boolean;
  total: number;
  supplierId?: number | null;
  supplier?: Supplier | undefined;
};

export type Supplier = {
  id: number;
  fullName: string;
  location: string;
  about: string;
  email: string;
  instagram: string;
  url: string;

  purchases?: Purchase[];
};
