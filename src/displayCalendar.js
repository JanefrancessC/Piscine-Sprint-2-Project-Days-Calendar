const monthYearElement = document.getElementById("month-year");
const calendarGridElement = document.getElementById("calendar-grid");

// This function returns how many days a month has.
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// This function draws one month in the calendar grid.
export function renderMonth(year, month) {
  calendarGridElement.innerHTML = "";

  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = firstDayOfMonth.getDay(); // Sunday = 0
  const daysInMonth = getDaysInMonth(year, month);

  const monthName = firstDayOfMonth.toLocaleString("en-US", {
    month: "long",
  });
  monthYearElement.textContent = `${monthName} ${year}`;

  // Add empty boxes before day 1 so Sunday stays first.
  for (let i = 0; i < firstWeekday; i += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "day-cell day-cell--empty";
    emptyCell.setAttribute("aria-hidden", "true");
    calendarGridElement.appendChild(emptyCell);
  }

  // Add day boxes for this month.
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayCell = document.createElement("div");
    dayCell.className = "day-cell";
    dayCell.textContent = String(day);
    calendarGridElement.appendChild(dayCell);
  }
}

// This function shows the current month when page loads.
export function renderCurrentMonth() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  renderMonth(currentYear, currentMonth);
}
