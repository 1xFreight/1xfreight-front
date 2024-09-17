export function disablePastDates() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

export function formatDate(dateString) {
  if (!dateString) return;

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return;

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatTime(timeString) {
  if (!timeString) return;

  const timeParts = timeString.split(" ");
  const timeMidday = timeParts[1];
  const onlyTime = timeParts[0].split(":");

  return `${Number(onlyTime[0]) < 10 ? "0" + onlyTime[0] : onlyTime[0]}:${Number(onlyTime[1]) < 10 ? "0" + onlyTime[1] : onlyTime[1]} ${timeMidday}`;
}

export function chatDateFormat(dateString) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} - ${hours}:${minutes}`;
}

export function getYesterday() {
  const today = new Date();
  today.setDate(today.getDate() - 1); // Subtract one day from today

  // Return in YYYY-MM-DD format
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
