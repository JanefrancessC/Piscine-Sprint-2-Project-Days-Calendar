import { renderMonth } from "./displayCalendar.js";
import { updateSelectors } from "./monthYearSelect.js";

// Keep one date object as the calendar state.
const shownDate = new Date();
shownDate.setDate(1);

// Update the internal state of the dropdowns

export function syncCalendarState(year, month) {
  shownDate.setFullYear(Number(year));
  shownDate.setMonth(Number(month));
}

// This function connects buttons to month navigation.
export function initializeCalendarNavigation() {
  const previousMonthButton = document.getElementById("prev-month-btn");
  const nextMonthButton = document.getElementById("next-month-btn");

  if (!previousMonthButton || !nextMonthButton) {
    return;
  }

  function showCalendarFromState() {
    const year = shownDate.getFullYear();
    const month = shownDate.getMonth();
    renderMonth(year, month);
    updateSelectors(year, month);
  }

  previousMonthButton.addEventListener("click", () => {
    shownDate.setMonth(shownDate.getMonth() - 1);
    showCalendarFromState();
  });

  nextMonthButton.addEventListener("click", () => {
    shownDate.setMonth(shownDate.getMonth() + 1);
    showCalendarFromState();
  });

  // Show current month when page loads.
  showCalendarFromState();
}
