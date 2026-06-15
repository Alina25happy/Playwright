import { test, expect } from '@playwright/test';

test('EPAM services client work navigation', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  const servicesMenu = page.getByRole('link', { name: 'Services' });
  await expect(servicesMenu).toBeVisible();
  await servicesMenu.hover();

  const clientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
  await expect(clientWorkLink).toBeVisible();
  await clientWorkLink.click();

  await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
});
