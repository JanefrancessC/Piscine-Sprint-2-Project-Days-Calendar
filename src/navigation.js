import { renderMonth } from "./displayCalendar.js";

// This function connects buttons to month navigation.
export function initializeCalendarNavigation() {
  const previousMonthButton = document.getElementById("prev-month-btn");
  const nextMonthButton = document.getElementById("next-month-btn");

  if (!previousMonthButton || !nextMonthButton) {
    return;
  }

  // Keep one date object as the calendar state.
  const shownDate = new Date();
  shownDate.setDate(1);

  function showCalendarFromState() {
    renderMonth(shownDate.getFullYear(), shownDate.getMonth());
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
