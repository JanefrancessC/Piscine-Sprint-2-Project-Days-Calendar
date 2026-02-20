# Testing Report - Days Calendar Project

## Rubric: For Everyone

- **October 2024 Check:**
  - _Method:_ Manual Verification.
  - _Result:_ Confirmed Ada Lovelace Day is on Oct 8 and World Lemur Day is on Oct 25.
- **May 2030 Check:**
  - _Method:_ Manual Verification.
  - _Result:_ Confirmed International Binturong Day is on May 11.
- **Navigation Buttons:**
  - _Method:_ Manual Verification.
  - _Result:_ Confirmed buttons move infinitely across years and sync with dropdowns.
- **Jump to Date:**
  - _Method:_ Manual Verification.
  - _Result:_ Confirmed selection of October 2020 updates grid immediately.
- **Accessibility:**
  - _Method:_ Automated Tool (Lighthouse).
  - _Result:_ Scored 100% on Accessibility.
- **Unit Tests:**
  - **Method: Unit tests in `tests/date-utils.test.js`**
  - _Result:_ Verified Nth-day and Last-day logic using Jest.

## Rubric: Groups of at least 2

- **iCal Generation:**
  - _Method:_ Manual Terminal execution and Google Calendar Import.
  - _Result:_ Ran `npm run generate:ical`. Imported `days.ics` into Google Calendar. Verified dates match the Web UI and events are "All-Day."
- **Shared Logic:**
  - _Method:_ Code Audit.
  - _Result:_ Both `src/commemorativeDays.js` and `generate-ical.js` import from `src/date-utils.js`.
