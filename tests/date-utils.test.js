import { calculateCommemorativeDate } from "../src/date-utils.js";

describe("calculateCommemorativeDate", () => {
  test("Ada Lovelace Day 2024 should be October 8", () => {
    const ada2024 = {
      occurrence: "second",
      dayName: "Tuesday",
      monthName: "October",
      name: "Ada Lovelace Day 2024",
    };

    const result = calculateCommemorativeDate(2024, ada2024);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(9);
    expect(result.getDate()).toBe(8);
  });
  test("Ada Lovelace Day 2025 should be October 14", () => {
    const ada2025 = {
      occurrence: "second",
      dayName: "Tuesday",
      monthName: "October",
      name: "Ada Lovelace Day 2025",
    };
    const result = calculateCommemorativeDate(2025, ada2025);

    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(9);
    expect(result.getDate()).toBe(14);
  });

  test("World Lemur Day 2024 should be last Friday of October (25th", () => {
    const lemur2024 = {
      occurrence: "last",
      dayName: "Friday",
      monthName: "October",
      name: "World Lemur Day 2024",
    };

    const result = calculateCommemorativeDate(2024, lemur2024);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(9);
    expect(result.getDate()).toBe(25);
    expect(result.getDay()).toBe(5);
  });

  test("First Sunday of May 2024 should be May 5", () => {
    const firstSundayMay = {
      occurrence: "first",
      dayName: "Sunday",
      monthName: "May",
      name: "First Sunday of May 2024",
    };

    const result = calculateCommemorativeDate(2024, firstSundayMay);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(4);
    expect(result.getDate()).toBe(5);
    expect(result.getDay()).toBe(0);
  });
});
