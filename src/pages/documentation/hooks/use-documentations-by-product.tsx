import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { IDocumentationSection } from '../utils/model';

export interface FlatDocItem {
  product_id: string;
  section_id: string;
  section_name: string;
  section_sort: number;
  menu_id: string | null;
  menu_name: string | null;
  menu_sort: number | null;
  submenu_id: string | null;
  submenu_name: string | null;
  content: string | null;
  submenu_sort: number | null;
}

export interface IDocsByProductData {
  name: string;
  items: FlatDocItem[];
}

export const mapFlatDocsToStructured = (items: FlatDocItem[]): IDocumentationSection[] => {
  if (!items || items.length === 0) return [];

  const sectionMap = new Map<string, IDocumentationSection>();
  
  items.forEach(item => {
    // 1. Process Section
    let section = sectionMap.get(item.section_id);
    if (!section) {
      section = {
        id: item.section_id,
        name: item.section_name || '',
        sortOrder: item.section_sort || 0,
        menus: []
      };
      sectionMap.set(item.section_id, section);
    }
    
    // 2. Process Menu
    if (item.menu_id) {
      let menu = section.menus.find(m => m.id === item.menu_id);
      if (!menu) {
        menu = {
          id: item.menu_id,
          name: item.menu_name || '',
          sortOrder: item.menu_sort || 0,
          submenus: []
        };
        section.menus.push(menu);
      }
      
      // 3. Process Submenu
      if (item.submenu_id) {
        const subExists = menu.submenus.some(s => s.id === item.submenu_id);
        if (!subExists) {
            menu.submenus.push({
            id: item.submenu_id,
            name: item.submenu_name || '',
            content: item.content || '',
            sortOrder: item.submenu_sort || 0
            });
        }
      }
    }
  });

  // Convert map to array and sort
  const sections = Array.from(sectionMap.values()).map(sec => {
    sec.menus.sort((a, b) => a.sortOrder - b.sortOrder);
    sec.menus.forEach(m => m.submenus.sort((a, b) => a.sortOrder - b.sortOrder));
    return sec;
  });
  sections.sort((a, b) => a.sortOrder - b.sortOrder);

  return sections;
};

export default function useDocumentationsByProduct(productId?: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['docs-by-product', productId],
    queryFn: () => axios.get<HTTPResponse<IDocsByProductData>>(`/products/${productId}/docs`),
    enabled: !!productId,
  });

  const structuredDocs = useMemo(() => {
    return data?.data?.data?.items ? mapFlatDocsToStructured(data.data.data.items) : undefined;
  }, [data]);

  return {
    dataDocumentations: structuredDocs,
    isLoadingDocumentations: isLoading,
    isErrorDocumentations: isError,
    refetchDocumentations: refetch,
  };
}
