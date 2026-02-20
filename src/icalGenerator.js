import { writeFile } from "node:fs/promises";
import { calculateCommemorativeDate } from "./date-utils.js";

function formatDateAsIcsValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function formatNowAsDtStamp(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hour}${minute}${second}Z`;
}

function escapeIcsText(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

function createUid(name, date) {
  const safeName = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${formatDateAsIcsValue(date)}-${safeName}@days-calendar`;
}

function buildEventLines(dayItem, year, dtstamp) {
  const eventDate = calculateCommemorativeDate(year, dayItem);

  if (!(eventDate instanceof Date) || Number.isNaN(eventDate.getTime())) {
    throw new Error(
      `Could not calculate a date for "${dayItem.name}" in ${year}.`,
    );
  }

  const nextDay = new Date(eventDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const summary = escapeIcsText(dayItem.name);
  const url = dayItem.descriptionURL
    ? escapeIcsText(dayItem.descriptionURL)
    : "";

  const lines = [
    "BEGIN:VEVENT",
    `UID:${createUid(dayItem.name, eventDate)}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${formatDateAsIcsValue(eventDate)}`,
    `DTEND;VALUE=DATE:${formatDateAsIcsValue(nextDay)}`,
    `SUMMARY:${summary}`,
  ];

  if (url) {
    lines.push(`DESCRIPTION:${url}`);
    lines.push(`URL:${url}`);
  }

  lines.push("END:VEVENT");
  return lines;
}

export function createIcalContent(daysData, startYear = 2020, endYear = 2030) {
  if (!Array.isArray(daysData)) {
    throw new Error("daysData must be an array.");
  }

  const dtstamp = formatNowAsDtStamp(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CYF//Days Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (let year = startYear; year <= endYear; year += 1) {
    for (const dayItem of daysData) {
      lines.push(...buildEventLines(dayItem, year, dtstamp));
    }
  }

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

export async function generateIcalFile(
  daysData,
  outputPath = "days.ics",
  startYear = 2020,
  endYear = 2030,
) {
  const icalContent = createIcalContent(daysData, startYear, endYear);
  await writeFile(outputPath, icalContent, "utf8");
  const totalYears = endYear - startYear + 1;
  return totalYears * daysData.length;
}
