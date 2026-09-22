import { expect, test } from "@playwright/test";

test("Interact with nested iframes", async ({ page }) => {
    // Navigate to CodePen containing nested iFrames
    await page.goto("https://codepen.io/jaydeepkarale/pen/dygvXbm");
    await page.waitForLoadState("load");

    // Step 2: Access the base iframe using frame_locator
    const frame = await page.frameLocator("iframe[name='CodePen']").frameLocator("#frame1");
  
    // Step 3: Fill blog URL and render
    await frame.getByPlaceholder("Enter a url").fill("https://www.testmuai.com/blog");
    await frame.getByRole("button", { name: "Render iframe" }).click();

    // nothing works below this line ----------------------
    // Step 4: Search for the blog within the nested iframe
    await frame.frameLocator('#iframe-window').getByPlaceholder("Search …").fill('How To Use Playwright For Web Scraping with Python');
    await page.keyboard.press("Enter");

    // Step 5: Locate blog title and author links
    const blogLink = await frame.frameLocator('#iframe-window').getByRole("link", { name: "How To Use Playwright For Web Scraping with Python" }).first();
    const blogAuthor = await frame.frameLocator('#iframe-window').getByRole("link", { name: "Jaydeep Karale" }).first();

    // Step 6: Validate attributes
    const regex = new RegExp("/blog/playwright-for-web-scraping/");
    console.log(await blogLink.getAttribute("href"));
    await expect(blogLink).toHaveAttribute("href", /blog\/playwright-for-web-scraping/);
    await expect(blogAuthor).toHaveAttribute("href", "https://www.lambdatest.com/blog/author/jaydeep-karale/");

    // Step 7: Set test status and clean up
    page.pause();
    page.close();
 

});
