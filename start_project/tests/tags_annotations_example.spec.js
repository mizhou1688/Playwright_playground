import { test, expect } from '@playwright/test';

const url = "https://ecommerce-playground.lambdatest.io/";
test("Test tags", { tags: ["@smoke", "@click"] }, async ({ page }) => {
  await page.goto(url);
  // confirm that the page was opened
  await expect(page).toHaveTitle("Your Store");
});

// Annotations 
test.describe("Purchase story", { tag: "@purchase" }, () => {
  test(
    "user can access the home page",
    {
      tag: "@smoke",
      annotations: [
        { type: "resolved", description: "bug #12 resolution" },
      ],
    },
    async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveTitle("Your Store");
    }
  );

  test.skip(
    "user can click a category",
    {
      tag: ["@smoke", "@click"],
      annotations: [
        { type: "issue", description: "Linked to bug #123" },
      ],
    },
    async ({ page }) => {
      await page.goto(url);
      await page.click(".figure-caption");
      await expect(page).toHaveTitle("Desktops");
    }
  );
});
