export function generatePickHours() {
  const numbOfRanges = 12;
  const timeArray = [];

  for (let i = 1; i <= numbOfRanges; i++) {
    timeArray.push(`${i}:00 AM`);
    timeArray.push(`${i}:30 AM`);
  }
  for (let i = 1; i <= numbOfRanges; i++) {
    timeArray.push(`${i}:00 PM`);
    timeArray.push(`${i}:30 PM`);
  }

  return timeArray;
}
