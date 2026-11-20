
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatar(
  name: string,
  gender: "MALE" | "FEMALE"
) {
  const seed = encodeURIComponent(name.trim().toLowerCase());

  const styles =
    gender === "FEMALE"
      ? ["lorelei", "notionists", "big-smile", "avataaars"]
      : ["adventurer", "avataaars", "micah", "personas"];

  const hash = [...seed].reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  const style = styles[hash % styles.length];

  return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
}

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // Keep digits only, drop a leading country code / trunk zero
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (digits.length <= 5) return digits;

  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
};
