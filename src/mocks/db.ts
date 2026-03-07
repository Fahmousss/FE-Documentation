export interface IBrand {
  id: number;
  brand_name: string;
}

export const DEFAULT_BRANDS: IBrand[] = [
  { id: 1, brand_name: 'ElectroMax' },
  { id: 2, brand_name: 'TechNova' },
  { id: 3, brand_name: 'Inova Elektrik' },
  { id: 4, brand_name: 'MegaPower' },
];

// Database in-memory untuk MSW
export const db = {
  brands: [...DEFAULT_BRANDS],
};

// Reset database ke nilai awal
export const resetDb = () => {
  db.brands = [...DEFAULT_BRANDS];
};
