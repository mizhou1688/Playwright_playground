import { test } from "@playwright/test";

test("Bootstrap/jQuery dropdown", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");

  await selectCountry("India");
  await selectCountry("Denmark");
  await selectCountry("South Africa");

  async function selectCountry(countryName) {
    await page.click("#country+span");
    await page.locator("ul#select2-country-results")
      .locator("li", { hasText: countryName })
      .click();
  }
});
