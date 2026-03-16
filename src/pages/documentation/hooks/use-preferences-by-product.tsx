import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { IPreferencesResponseItem, IPreferencesSection } from '../utils/model';

export const mapFlatPreferencesToStructured = (
  items: IPreferencesResponseItem[]
): IPreferencesSection[] => {
  if (!items || items.length === 0) return [];

  const sectionMap = new Map<string, IPreferencesSection>();

  items.forEach((item) => {
    let section = sectionMap.get(item.section_id);
    if (!section) {
      section = {
        id: item.section_id,
        name: item.section_name || '',
        sortOrder: item.section_sort || 0,
        items: [],
      };
      sectionMap.set(item.section_id, section);
    }

    if (item.item_id) {
      const itemExists = section.items.some((i) => i.id === item.item_id);
      if (!itemExists) {
        section.items.push({
          id: item.item_id,
          name: item.item_name || '',
          content: item.content || '',
          sortOrder: item.item_sort || 0,
        });
      }
    }
  });

  const sections = Array.from(sectionMap.values()).map((sec) => {
    sec.items.sort((a, b) => a.sortOrder - b.sortOrder);
    return sec;
  });
  sections.sort((a, b) => a.sortOrder - b.sortOrder);

  return sections;
};

export default function usePreferencesByProduct(productId?: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['preferences-by-product', productId],
    queryFn: () => axios.get<HTTPResponse<{ items: IPreferencesResponseItem[] }>>(`/products/${productId}/preferences`),
    enabled: !!productId,
  });

  const structuredPreferences = useMemo(() => {
    return data?.data?.data?.items ? mapFlatPreferencesToStructured(data.data.data.items) : undefined;
  }, [data]);

  return {
    dataPreferences: structuredPreferences,
    isLoadingPreferences: isLoading,
    isErrorPreferences: isError,
    refetchPreferences: refetch,
  };
}
