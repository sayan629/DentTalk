
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


export const getNext5Days = () =>{
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for(let i=0;i<5;i++){
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);

  }
  return dates;
}

export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};