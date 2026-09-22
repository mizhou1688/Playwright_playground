// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

import { chromium } from "@playwright/test";
test("Login test demo", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://ecommerce-playground.lambdatest.io/");
  await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
  await page.locator("text=Login").click();
  
  await page.fill("input[name='email']", "koushik350@gmail.com");
  await page.fill("input[name='password']", "Pass123$");
  await page.click("input[value='Login']");
  await page.waitForSelector('#account-account');

});

test("Prompt alert", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

  page.on("dialog", async (alert) => {
    console.log(alert.message());
    await alert.accept("koushik");
  });

  await page.locator("button:has-text('Click Me')").nth(2).click();

  await expect(page.locator("#prompt-demo")).toContainText("'koushik'");
});



test("Interact with nested iframes", async ({  }) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  /*
  // 1. Start tracing before navigating
  await context.tracing.start({ 
    screenshots: true, // Captures images of every step
    snapshots: true,   // Captures the full DOM state for inspection
    sources: true      // Links actions back to your lines of code
  });
*/
  const page = await context.newPage();



  await page.goto("https://www.testmuai.com/selenium-playground/bootstrap-date-picker-demo");
  let date = "2026-01-13"
  await page.getByPlaceholder("Start date").fill(date);
  await expect(page.getByPlaceholder('Start Date')).toHaveValue('2026-01-13');
  
 // await page.waitForLoadState("networkidle");
  




  // 2. Stop tracing and save it to a zip file
  //await context.tracing.stop({ path: 'trace.zip' });
  await page.waitForTimeout(3000);
  await browser.close();
});
  
test("Handle windows with load state", async ({  }) => {
 const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to the test page
  await page.goto("https://www.testmuai.com/selenium-playground/window-popup-modal-demo");
  let twitterLink = page.locator("a[title='Follow Twitter & Facebook']");
  await expect(twitterLink).toBeAttached();
  await expect(twitterLink).toBeEnabled();
  await expect(twitterLink).toBeVisible();
  await twitterLink.scrollIntoViewIfNeeded();

  // await page.waitForLoadState("networkidle");
  // Trigger pop-ups and wait for new page event
  const [multiPage] = await Promise.all([page.waitForEvent("popup"), 
    page.locator("a[title='Follow Twitter & Facebook']").click() ]);

  // Wait until the new pages are fully loaded (all resources)
  await multiPage.waitForLoadState("load");

  // Retrieve all open pages
  const pages = multiPage.context().pages();
  console.log("No. of tabs: " + pages.length);

  // Print URL of each open tab
  pages.forEach(tab => console.log(tab.url()));
  
  await page.waitForTimeout(3000);
  await browser.close();
});
