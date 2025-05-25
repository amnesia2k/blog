export function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th"; // 4th to 20th are all 'th'
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatDate(date: {
  getDate: () => number;
  toLocaleString: (arg0: string, arg1: { month: string }) => string;
  getFullYear: () => number;
}) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // May, June, etc
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}
