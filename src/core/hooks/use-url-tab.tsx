import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function useUrlTab<const T extends readonly string[]>(validTabs: T, defaultTab: T[number]) {
  type TabType = T[number];

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawTab = searchParams.get('tab') as TabType | null;

  const [tab, setTab] = useState<TabType>(
    validTabs.includes(rawTab ?? ('' as TabType)) ? (rawTab as TabType) : defaultTab,
  );

  // Redirect jika tab tidak valid
  useEffect(() => {
    if (!rawTab || !validTabs.includes(rawTab as TabType)) {
      navigate(`?tab=${defaultTab}`, { replace: true });
    }
  }, [rawTab, navigate, validTabs, defaultTab]);

  // Update local state jika URL berubah
  useEffect(() => {
    if (validTabs.includes(rawTab as TabType)) {
      setTab(rawTab as TabType);
    }
  }, [rawTab, validTabs]);

  // Klik tab = update URL
  const changeTab = (next: TabType) => {
    setTab(next);
    navigate(`?tab=${next}`);
  };

  return { tab, changeTab };
}
