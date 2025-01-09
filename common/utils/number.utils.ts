export function getOrdinalSuffix(num) {
  if (!num) return "";

  const suffixes = ["th", "st", "nd", "rd"];
  const value = num % 100;
  return num + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

export function addOrdinalSuffixToNumbers(numbers) {
  return numbers.map(getOrdinalSuffix);
}

export function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = sizes[i];
  const formattedValue = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${formattedValue} ${size}`;
}

export function generateCustomID() {
  const part1 = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
  const part2 = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return `${part1}-${part2}`;
}
