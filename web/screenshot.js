const { chromium, firefox } = require('playwright');

(async () => {
  const browserType = process.argv[2] === 'firefox' ? firefox : chromium;
  const browser = await browserType.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait a bit for animations to start
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: `${process.argv[2] || 'chromium'}.png`, fullPage: true });
  await browser.close();
  console.log(`Screenshot saved for ${process.argv[2] || 'chromium'}`);
})();
