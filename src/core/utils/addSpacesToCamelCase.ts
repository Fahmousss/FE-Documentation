export function addSpacesToCamelCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1 $2');
}
