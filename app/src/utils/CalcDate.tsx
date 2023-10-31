export default function calcDate(date1 : Date,date2 : Date) {
    const diff = Math.floor(date1.getTime() - date2.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff/day);
    const months = Math.floor(days/31);
    const years = Math.floor(months/12);

    const remainingMonths = months % 12;
    const remainingDays = days % 31;  // Aproximação para dias

    const decimalYears = years + remainingMonths / 12 + remainingDays / 365;

    return decimalYears;
    
}