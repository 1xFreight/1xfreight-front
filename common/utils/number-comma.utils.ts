export default function numberCommaFormat(num: number) {
  if (!num) return 0;
  if (num < 1000) {
    return num.toString();
  }

  const numK = Math.floor(num / 1000);
  const numM = num % 1000;

  const numMFormatted = numM.toString().padStart(3, "0");
  return numK + "," + numMFormatted;
}

export function formatCurrency(amount) {
  if (!amount) return 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatComma(amount) {
  if (!amount) return 0;

  return new Intl.NumberFormat("en-US", {
    // style: "currency",
    // currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
