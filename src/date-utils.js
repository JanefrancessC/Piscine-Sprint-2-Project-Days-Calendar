/**
 * Calculates the specified date for a commemorative d
 * @param {number} year - The year to calculate.
 * @param {object} dayObject - The object from days.json file.
 * @returns {Date} - The calculated Date object.
 */
export const calculateCommemorativeDates = function (year, dayObject) {
    const { monthName, dayName, occurrence} = dayObject;

    const month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

}