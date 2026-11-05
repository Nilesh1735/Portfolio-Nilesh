/**
 * Renders resume/resume.html to public/resume.pdf.
 *
 *   node resume/build.mjs
 *
 * Playwright is not a dependency of this project; it is resolved from
 * wherever it happens to be installed (the container ships one globally).
 * Install it locally with `npm i -D playwright` if you would rather pin it.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);

function loadPlaywright() {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try {
      return require(id);
    } catch {
      /* try the next location */
    }
  }
  throw new Error(
    "playwright not found. Install it with: npm i -D playwright",
  );
}

const { chromium } = loadPlaywright();

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, "resume.html");
const out = path.join(here, "..", "public", "resume.pdf");

const browser = await chromium.launch({ args: ["--no-sandbox"] });
try {
  const page = await browser.newPage();
  await page.goto("file://" + src, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    // Margins live here and nowhere else. Setting them in the CSS @page rule
    // as well made Chromium emit a phantom second page.
    margin: { top: "10mm", bottom: "10mm", left: "12mm", right: "12mm" },
  });
} finally {
  await browser.close();
}
console.log("wrote", out);
