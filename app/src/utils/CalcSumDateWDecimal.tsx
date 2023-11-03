export default function addDecimalYearsToDate(date : Date, decimalYears : number) {
    const newDate = new Date(date);
    
    // Extract date components
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
  
    // Add the whole years to the date
    newDate.setFullYear(year + Math.floor(decimalYears));
  
    // Calculate the remaining months
    const remainingMonths = decimalYears % 1 * 12;
    newDate.setMonth(month + Math.floor(remainingMonths));
  
    // Calculate the remaining days
    const remainingDays = remainingMonths % 1 * 30; // Approximation for months to days
    newDate.setDate(day + Math.floor(remainingDays));
  
    return newDate;
  }