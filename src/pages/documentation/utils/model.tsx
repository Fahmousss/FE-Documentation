export interface IProductPreferences {
  sections: any[];
  items: any[];
}
export interface IProductItem {
  id: string;
  name: string;
  sections: any[];
  preferences: IProductPreferences;
  blogs: any[];
  showcases: string[];
}
export interface IProductData {
  name: string;
  items: IProductItem[];
}
export interface IProductResponse {
  items: IProductData[];
}

// ─── Documentation ────────────────────────────────────────
export interface IDocumentationItem {
  name: string;
  product_id: string;
  product_name: string;
  section_id: string;
  section_name: string;
  sections: string;
  section_sort: number;
  menu_id: string;
  menu_name: string;
  menu_sort: number;
  submenu_id: string;
  submenu_name: string;
  content: string;
  submenu_sort: number;
  craeted_at: string;
  updated_at: string;
}
export interface IDocumentationResponse {
  items: IDocumentationItem[];
}
export interface IDocumentationSubmenu {
  id: string;
  name: string;
  content: string;
  sortOrder: number;
}
export interface IDocumentationMenu {
  id: string;
  name: string;
  sortOrder: number;
  submenus: IDocumentationSubmenu[];
}
export interface IDocumentationSection {
  id: string;
  name: string;
  sortOrder: number;
  menus: IDocumentationMenu[];
}
export interface IDocumentationRequest {
  product_id: string;
  sections: IDocumentationSection[];
}

// ─── Showcase ─────────────────────────────────────────────
/** Satu item showcase untuk keperluan state lokal di TabShowcase */
export interface IShowcaseItem {
  id: string;
  name: string; // label pill tab, tidak dikirim ke API
  photo: any | null; // file lokal sebelum diupload, dikirim sebagai mediaUrl
  publishDate: any | null; // Dayjs object dari DatePicker
  title: string;
  description: string;
  content: string;
  sortOrder: number;
}
/** Body request POST/PUT /products/:id/showcase */
export interface IShowcaseRequestItem {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  publishDate: string;
  content: string;
  sortOrder: number;
}
export interface IShowcaseRequest {
  items: IShowcaseRequestItem[];
}
/** Satu item showcase dari response API */
export interface IShowcaseResponseItem {
  id: string;
  product_id: string;
  title: string;
  description: string;
  media_url: string;
  publish_date: string;
  content: string;
  sort_order: number;
}
/** Response GET /products/:id/showcase */
export interface IShowcaseResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    items: IShowcaseResponseItem[];
  };
}

// ─── Preferences ──────────────────────────────────────────
/** Satu item dalam section, untuk state lokal di TabPreferences */
export interface IPreferencesItem {
  id: string;
  name: string; // label pill tab → dikirim sebagai itemName
  content: string;
  sortOrder: number;
}
/** Satu section preferences, untuk state lokal di TabPreferences */
export interface IPreferencesSection {
  id: string;
  name: string;
  sortOrder: number;
  items: IPreferencesItem[];
}
/** Body request PUT /products/:productId/preferences */
export interface IPreferencesRequestItem {
  id: string;
  itemName: string;
  content: string;
  sortOrder: number;
}
export interface IPreferencesRequestSection {
  id: string;
  name: string;
  sortOrder: number;
  items: IPreferencesRequestItem[];
}
export interface IPreferencesRequest {
  sections: IPreferencesRequestSection[];
}
/** Satu item dari response GET /products/:productId/preferences */
export interface IPreferencesResponseItem {
  item_id: string;
  product_id: string;
  section_id: string;
  section_name: string;
  section_sort: number;
  item_name: string;
  content: string;
  item_sort: number;
}
/** Response GET /products/:productId/preferences */
export interface IPreferencesResponse {
  success: boolean;
  message: string;
  data: {
    items: IPreferencesResponseItem[];
  };
}

// ─── Blog ─────────────────────────────────────────────────
/** Satu creator blog */
export interface IBlogCreator {
  name: string;
  photoUrl: string; // file lokal → dikirim sebagai URL setelah upload
}

/** Satu blog untuk state lokal di TabBlog */
export interface IBlogItem {
  id: string;
  name: string; // label pill tab, tidak dikirim ke API
  title: string;
  publishDate: any | null; // ISO 8601, dari DatePicker
  description: string;
  content: string;
  heroImage: any | null; // file lokal → dikirim sebagai heroImageUrl setelah upload
  creators: IBlogCreator[];
  sortOrder: number;
}

/** Body request PUT /products/:productId/blog */
export interface IBlogRequestSection {
  id: string;
  title: string;
  publishDate: string; // ISO 8601 e.g. "2019-08-24T14:15:22Z"
  description: string;
  content: string;
  heroImageUrl: string;
  creators: IBlogCreator[];
  sortOrder: number;
}
export interface IBlogRequest {
  sections: IBlogRequestSection[];
}

/** Satu blog dari response GET /products/:productId/blog */
export interface IBlogResponseSection {
  id: string;
  productId: string;
  title: string;
  publishDate: string;
  description: string;
  content: string;
  heroImageUrl: string;
  creators: IBlogCreator[];
  sortOrder: number;
}
/** Response GET /products/:productId/blog */
export interface IBlogResponse {
  success: boolean;
  message: string;
  data: {
    sections: IBlogResponseSection[];
  };
}
