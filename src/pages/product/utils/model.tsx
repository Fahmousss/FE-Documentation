// =========================
// PRODUCT ENTITY
// =========================

export interface IProducts {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// =========================
// RESPONSE STRUCTURE
// =========================

export interface ProductsData {
  name: string;
  items: IProducts[];
}

// =========================
// FORM & BODY
// =========================

export interface ProductsForm {
  id: string;
  name: string;
}

export interface ProductsBody {
  name: string;
}