import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://localhost:4321/local-accelerator';
const OUT = process.argv[3] || 'local-accelerator.pdf';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(URL, { waitUntil: 'networkidle' });

await page.pdf({
  path: OUT,
  format: 'Letter',
  printBackground: true,
  margin: {
    top: '0.5in',
    right: '0.5in',
    bottom: '0.5in',
    left: '0.5in',
  },
});

await browser.close();
console.log(`PDF saved to ${OUT}`);
