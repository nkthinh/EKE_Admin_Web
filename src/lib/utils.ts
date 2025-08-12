import { clsx, ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  // Flatten and join classnames safely
  return inputs.filter(Boolean).map(String).join(" ");
}
