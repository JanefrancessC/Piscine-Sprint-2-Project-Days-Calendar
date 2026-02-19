import { calculateCommemorativeDate } from "./date-utils.js";

/**
 * Fetches commemorative days and injects into the calendar grid.
 * @param {number} year - year argument e.g 2024
 * @param {number} month - month argument
 */
export async function renderCommemorativeDaysForMonth(year, month) {
  try {
    const res = await fetch("./data/days.json");

    if (!res.ok) throw new Error(`Failed to fetch days.json`);

    const daysData = await res.json();

    daysData.forEach((dayObject) => {
      const date = calculateCommemorativeDate(year, dayObject);

      if (date && date.getMonth() === month && date.getFullYear() === year) {
        const dayNumber = date.getDate();
        const cell = document.querySelector(
          `.day-cell[data-day="${dayNumber}"]`,
        );

        if (cell) {
          if (cell.querySelector(".commemorative-label")) return;

          const label = document.createElement("div");
          label.className = "commemorative-label";
          label.textContent = dayObject.name;
          cell.appendChild(label);
        }
      }
    });
  } catch (error) {
    console.error(`Error in CommemorativeRender:`, error);
  }
}
