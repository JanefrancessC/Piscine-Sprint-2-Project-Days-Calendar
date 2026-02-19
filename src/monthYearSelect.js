import { renderMonth } from "./displayCalendar.js";
import { syncCalendarState } from "./navigation.js";

const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");

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

const populateMonths = () => {
  months.forEach((month, index) => {
    const option = document.createElement("option");

    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });
};

const populateYears = () => {
  const startYear = 1900;
  const endYear = 2100;

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
};

function handleJump() {
  if (monthSelect === "" || yearSelect === "") return;

  const selectedMonth = Number(monthSelect.value);
  const selectedYear = Number(yearSelect.value);

  renderMonth(selectedYear, selectedMonth);
  syncCalendarState(selectedYear, selectedMonth);
}

export const updateSelectors = function (year, month) {
  yearSelect.value = year;
  monthSelect.value = month;
};

/**
 *
 */
export const initMonthYearSelect = function () {
  populateMonths();
  populateYears();

  const today = new Date();
  monthSelect.value = today.getMonth();
  yearSelect.value = today.getFullYear();

  monthSelect.addEventListener("change", handleJump);
  yearSelect.addEventListener("change", handleJump);
};
