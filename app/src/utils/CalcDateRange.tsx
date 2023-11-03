export default function dateRangeUntilLimit(date : Date) {
  // Calculate the date two days before the current date
  let twoDaysBefore = new Date(date);
  twoDaysBefore.setDate(date.getDate() - 2);

  // Calculate the date one day before the current date
  let oneDayBefore = new Date(date);
  oneDayBefore.setDate(date.getDate() - 1);

  // Calculate the date one day after the current date
  let oneDayAfter = new Date(date);
  oneDayAfter.setDate(date.getDate() + 1);

  // Calculate the date two days after the current date
  let twoDaysAfter = new Date(date);
  twoDaysAfter.setDate(date.getDate() + 2);

  // Create and return the array with Date objects
  return [twoDaysBefore, oneDayBefore, date, oneDayAfter, twoDaysAfter];
}