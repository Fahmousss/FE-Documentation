// import { Breadcrumb } from "../Types/BreadcrumbTypes"

// function for capitalizing the first letter of a string
export const capitalize = (str: string) => {
  return str.charAt(0)?.toUpperCase() + str.slice(1);
};

// function for add space between camelCase string
export const addSpace = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim();
};

//function for add space between -
export const addSpaceSeparator = (str: string) => {
  return str.replace(/-/g, ' ').trim();
};

// function for capitalizing every word in a string
export const capitalizeEveryWord = (str: string) => {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

// function for remove space or underscore between string and lower case every word
export const removeSpaceAndLower = (str: string) => {
  return str.replace(/[_\s]/g, '').toLowerCase();
};

export const removeKebabCaseCapital = (str: string) => {
  return capitalizeEveryWord(str.replace(/[-\s]/g, ' '));
};

export const formatValueWithUnit = (label: string) => {
  if (!label) {
    return;
  }

  const value = label.split(' ')[0] || '';
  const unit = label.split(' ')[1] || '';
  const parsedValue = Math.round(parseFloat(value.replace(',', '.')));
  if (isNaN(parsedValue)) return `0 ${unit}`;
  if (!unit) return `${parsedValue}`;
  return `${parsedValue} ${unit}`;
};

export const roundingNumber = (value: number): number => {
  return Math.round(value);
};
