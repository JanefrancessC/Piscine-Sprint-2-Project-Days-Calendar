/**
 * Calculates the specified date for a day object from days.json
 * @param {number} year - The year to calculate.
 * @param {object} dayObject - The object from JSON
 * @returns {Date|null} - The calculated Date object.
 */

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const calculateCommemorativeDate = function (year, dayObject) {
  const { monthName, dayName, occurrence } = dayObject;

//   Get index of month and day
  const monthIndex = months.indexOf(monthName);
  const weekdayIndex = days.indexOf(dayName);

  if (monthIndex === -1 || weekdayIndex === -1) {
    throw new Error("Invalid month or day!");
  }

//   Map occurrences to numbers
  const occurrenceMapped = {
    "first": 1,
    "second": 2,
    "third": 3,
    "fourth": 4
  }
}
