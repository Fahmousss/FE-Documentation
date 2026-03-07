export interface IProductPreferences {
  sections: any[];
  items: any[];   
}

export interface IProductItem {
  items: any[];
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

export interface IDocumentationItem {
    name: string,

    product_id: string;
    product_name: string;
    section_id: string;
    section_name: string;
    sections:string;
    section_sort: number;

    menu_id: string;
    menu_name: string;
    menu_sort: number;

    submenu_id: string;
    submenu_name: string;
    content: string;
    submenu_sort: number;
    craeted_at: string,
    updated_at: string,
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
    product_id: string,
    sections: IDocumentationSection[];
}