import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { generateIcalFile } from "./src/icalGenerator.js";

async function run() {
  const daysJsonPath = resolve("./data/days.json");
  const outputPath = resolve("days.ics");

  const daysJson = await readFile(daysJsonPath, "utf8");
  const daysData = JSON.parse(daysJson);

  const totalEvents = await generateIcalFile(daysData, outputPath, 2020, 2030);
  console.log(`Created days.ics with ${totalEvents} events.`);
}

run().catch((error) => {
  console.error("Failed to create days.ics");
  console.error(error.message);
  process.exit(1);
});
