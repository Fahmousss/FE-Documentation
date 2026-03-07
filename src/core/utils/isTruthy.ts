export function isTruthy(value: number | string | null | undefined): boolean {
  if ([0, '0', '0 ', null, undefined, ' '].includes(value)) {
    return false;
  } else {
    return true;
  }
}
