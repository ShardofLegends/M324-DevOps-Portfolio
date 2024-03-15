import { test, expect } from '@playwright/test';

test('ToDoApp component', async ({ page }) => {
  await page.goto('http://localhost:5173'); // Update the URL as per your local development environment

  // Test rendering the header correctly
  const headerLocator = await page.$('h1');
  const headerText = await headerLocator.textContent();
  await expect(headerText).toBe('To Do List');
});
