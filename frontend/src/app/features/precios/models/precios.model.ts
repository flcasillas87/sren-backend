export type Price = {
  id: string;
  date: Date;
  value: number;
  currency: 'USD' | 'MXN';
  provider: string;
};

export type PriceForm = {
  date: string;
  value: string;
  currency: 'USD' | 'MXN';
  provider: string;
};
