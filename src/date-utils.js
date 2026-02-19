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
  if (!Number.isInteger(year) || year < 0) {
    throw new Error(`Year must be a positive number`);
  }

  if (!dayObject || typeof dayObject !== "object") {
    throw new Error(`Invalid dayObject provided`);
  }
  const { monthName, dayName, occurrence } = dayObject;

  //   Get index of month and day
  const monthIndex = months.indexOf(monthName);
  const targetWeekdayIndex = days.indexOf(dayName);

  if (monthIndex === -1 || targetWeekdayIndex === -1) {
    throw new Error("Invalid month or day!");
  }

  //   Map occurrences to numbers
  const occurrenceMapped = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
  };

  if (occurrence === "last") {
    const dateObj = new Date(year, monthIndex + 1, 0);

    while (dateObj.getDay() !== targetWeekdayIndex) {
      dateObj.setDate(dateObj.getDate() - 1);
    }
    return dateObj;
  } else if (occurrenceMapped[occurrence]) {
    const targetNth = occurrenceMapped[occurrence];

    let foundCount = 0;

    for (let dd = 1; dd <= 31; dd++) {
      const dateObj = new Date(year, monthIndex, dd);

      if (dateObj.getMonth() !== monthIndex) break;

      if (dateObj.getDay() === targetWeekdayIndex) {
        foundCount++;
        if (foundCount === targetNth) {
          return dateObj;
        }
      }
    }
    return null;
  } else {
    throw new Error(
      `Unknown occurrence type! Expected first, second, third, fourth, or last occurrence.`,
    );
  }
};
