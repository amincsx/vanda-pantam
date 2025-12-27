import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Convert English numbers to Farsi
export function englishToFarsiNumber(num: number | string): string {
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const farsiNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  let str = String(num);
  for (let i = 0; i < 10; i++) {
    str = str.replace(new RegExp(englishNumbers[i], 'g'), farsiNumbers[i]);
  }
  return str;
}

// Format price with commas in Farsi numbers
export function formatPriceInFarsi(price: number): string {
  const formattedPrice = price.toLocaleString('en-US');
  return englishToFarsiNumber(formattedPrice);
}
