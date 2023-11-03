export default function addDaysToDate(date : Date, days : number) {
    // Calculate the total number of milliseconds to add
    let millisecondsToAdd = days * 24 * 60 * 60 * 1000;
  
    // Add the milliseconds to the original date
    let newDate = new Date(date.getTime() + millisecondsToAdd);
  
    return newDate;
  }
  