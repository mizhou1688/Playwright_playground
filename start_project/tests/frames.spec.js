import { expect, test } from "@playwright/test";
test("Interact with frames", async ({ page }) => {
    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("No.of frames: " + allframes.length);
    const myFrame = page.frame("firstFr");
    await myFrame?.fill("input[name='fname']", "yourname");
    await myFrame?.fill("input[name='lname']", "yourexample");
    expect(await myFrame?.locator("p.text-sm").textContent()).toContain("You have entered");
});
