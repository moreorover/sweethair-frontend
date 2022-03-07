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
  location: string | null;
  about: string | null;
  email: string | null;
  instagram: string | null;
  url: string | null;

  purchases?: Purchase[];
};
