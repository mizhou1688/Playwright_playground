import { test, expect } from '@playwright/test';
import { chromium } from "@playwright/test";

test("Test Advanced Click Options", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.testmuai.com/selenium-playground/context-menu/')
  // right click on the element with id 'hot-spot'
  await page.locator('#hot-spot').click({button: "right"});

  await page.goto('https://www.testmuai.com/selenium-playground/checkbox-demo/')
  // double click on the element with label 'Click on check box'
  await page.getByLabel('Click on check box').dblclick();
  await expect(page.getByLabel('Click on check box')).not.toBeChecked();

  // Mouse Hover & Force Click
  await page.goto("https://ecommerce-playground.lambdatest.io/")
  await page.getByRole('button',{name:"My account"}).hover();
  await page.getByRole('link', {name:"Login"}).click({force: true});

  // Position-Based Click
  await page.goto('https://www.testmuai.com/selenium-playground/simple-form-demo/')
  await page.getByRole('button', {name: 'Get Sum'}).click({position: {x:10, y:5}})

});

test('Test Click with Modifier', async ({ page, context }) => {

  await page.goto('https://www.lambdatest.com/selenium-playground/')
  await page.getByRole('link', {name: "Input Form Submit"}).click({ modifiers: ['Shift']});
  
  const pagePromise = context.waitForEvent('page');
  const pageTwo = await pagePromise;
  await expect(pageTwo.getByRole('heading', {name: 'Form Demo'})).toHaveText('Form Demo');

  // Click with delay
  await page.getByRole('link', {name: "Drag and Drop"}).click({delay: 3000 });

  // Drag-and-Drop Action
  await page.getByText('Draggable 1').dragTo(page.locator('#mydropzone'));
  await expect(page.locator('#droppedlist')).toHaveText('Draggable 1');

  // Manual Drag Simulation
  await page.getByText('Draggable 1').hover();
  await page.mouse.down();
  await page.locator('#mydropzone').hover();
  await page.mouse.up();

  // Programmatic Click
  await page.goto('https://www.lambdatest.com/selenium-playground/')
  await page.getByRole('link', {name: "Shadow DOM"}).dispatchEvent('click');
  await expect(page.getByRole('heading', {name: "Shadow DOM"})).toHaveText("Shadow DOM")

});
