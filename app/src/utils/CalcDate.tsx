export default function calcDate(date1: Date, date2: Date): number {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const timeDifferenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
    const timeDifferenceInDays = timeDifferenceInMilliseconds / millisecondsPerDay;
  
    const years = timeDifferenceInDays / 365;
    const months = (years - Math.floor(years)) * 12;
  
    return Math.floor(years) + months / 12;
  }