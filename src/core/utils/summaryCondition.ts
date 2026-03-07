export function summaryCondition(value: string) {
  if (!value) return;

  if (value === 'summary_line' || value === 'summary_bar') {
    return true;
  } else {
    return false;
  }
}
