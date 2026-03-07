export function splitValueAndUnit(value: string) {
  if (!value) return { number: '', unit: '' };

  const parts = value.trim().split(/\s+/);
  return {
    number: parts[0] || '',
    unit: parts[1] || '',
  };
}
