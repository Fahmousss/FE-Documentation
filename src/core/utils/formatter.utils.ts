import { Dayjs } from 'dayjs';

export const commonFormatDate = (date: Dayjs) => date?.format('YYYY-MM-DD 00:00:00.000 +0700');
export const utcFormatDate = (date: Dayjs) => {
  if (date) {
    return date.format('YYYY-MM-DDT00:00:00.000') + 'Z';
  }
};
export const monthYearFormatDate = (date: Dayjs) => date?.format('MMMM YYYY');

export const initialFormatter = (value: string) =>
  value
    .split(' ')
    .map((name) => name.charAt(0))
    .join('');

export const rupiahFormatter = (value?: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value!);
};

export const rupiahInputFormatter = (value?: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(value!)
    .split('Rp')[1];
};

export const thousandFormatter = new Intl.NumberFormat('ja-JP', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
}).format;

export const rupiahParser = (val?: string) => {
  // for when the input gets clears
  if (typeof val === 'string' && !val.length) {
    val = '0.0';
  }

  // detecting and parsing between comma and dot
  const group = new Intl.NumberFormat('id-ID').format(1111).replace(/1/g, '');
  const decimal = new Intl.NumberFormat('id-ID').format(1.1).replace(/1/g, '');
  let reversedVal = val?.replace(new RegExp('\\' + group, 'g'), '');
  reversedVal = reversedVal?.replace(new RegExp('\\' + decimal, 'g'), '.');
  //  => 1232.21 €

  // removing everything except the digits and dot
  reversedVal = reversedVal?.replace(/[^0-9.]/g, '');
  //  => 1232.21

  // appending digits properly
  const digitsAfterDecimalCount = (reversedVal?.split('.')[1] || []).length;
  const needsDigitsAppended = digitsAfterDecimalCount > 2;

  if (needsDigitsAppended) {
    reversedVal = (Number(reversedVal) * Math.pow(10, digitsAfterDecimalCount - 2)).toString();
  }
  return Number(reversedVal);
};

export const formatNPWP = (value?: string | number): string => {
  const cleaned = ('' + value).replace(/\D/g, '');
  const match = cleaned.match(/(\d{0,2})?(\d{0,3})?(\d{0,3})?(\d{0,1})?(\d{0,3})?(\d{0,3})$/);
  return [
    match?.[1],
    match?.[2] ? '.' : '',
    match?.[2],
    match?.[3] ? '.' : '',
    match?.[3],
    match?.[4] ? '.' : '',
    match?.[4],
    match?.[5] ? '-' : '',
    match?.[5],
    match?.[6] ? '.' : '',
    match?.[6],
  ].join('');
};

// format number with 2 decimal places
export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

// return number with compact format, ex: 1000 => 1.0K
export function formatNumberWithSuffix(num: number, digits?: number): string;
export function formatNumberWithSuffix(num: string, digits?: number): string;
export function formatNumberWithSuffix(num: number | string, digits: number = 1): string {
  if (num === null || num === undefined) return '-';

  const parsed = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(parsed)) return '-';

  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E'];
  let unitIndex = 0;
  let value = parsed;

  while (Math.abs(value) >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }

  // kalau < 1000, tampilkan angka apa adanya
  if (unitIndex === 0) {
    return value.toString();
  }

  // buang desimal kalau hasilnya bilangan bulat
  const formatted = value % 1 === 0 ? value.toString() : value.toFixed(digits);

  return formatted + units[unitIndex];
}

export function scientificFormatter(value: number, precision = 1): string {
  if (value === 0) return '0';
  const abs = Math.abs(value);

  // Jika terlalu kecil (misal < 0.01) atau terlalu besar (> 1e6), ubah ke notasi ilmiah
  if (abs < 0.01 || abs >= 1e6) {
    const exponent = Math.floor(Math.log10(abs));
    const mantissa = (value / Math.pow(10, exponent)).toFixed(precision);
    return `${mantissa}eⁿ`.replace('ⁿ', toSuperscript(exponent));
  }

  // Kalau normal, tampilkan dengan thousand separator
  return thousandFormatter(value);
}

// Helper untuk mengubah angka jadi superscript
function toSuperscript(num: number): string {
  const map: Record<string, string> = {
    '-': '⁻',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
  };
  return num
    .toString()
    .split('')
    .map((c) => map[c] || c)
    .join('');
}
