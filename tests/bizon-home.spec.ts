import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bizon.by/';

function logStep(message: string) {
  // Timestamped logs as required
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${message}`);
}

test.describe('bizon.by - Home page', () => {
  test('Home loads, search visible, categories visible, Brands link navigates', async ({ page }) => {
    try {
      logStep(`Navigate to ${BASE_URL}`);
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

      logStep('Assert page title and H1');
      await expect(page).toHaveTitle('Купить спортивное питание в Минске | Интернет-магазин Бизон');
      await expect(page.getByRole('heading', { level: 1, name: 'Магазин спортивного питания' })).toBeVisible();

      logStep('Assert searchbox "Поиск в каталоге" is visible');
      await expect(page.getByRole('searchbox', { name: 'Поиск в каталоге' })).toBeVisible();

      logStep('Assert button "Категории" is visible');
      await expect(page.getByRole('button', { name: 'Категории' })).toBeVisible();

      logStep('Click link "Бренды"');
      await page.getByRole('link', { name: 'Бренды' }).click();

      logStep('Assert URL is https://bizon.by/brands and title is "Производители"');
      await expect(page).toHaveURL('https://bizon.by/brands');
      await expect(page).toHaveTitle('Производители');
    } catch (error) {
      logStep(`ERROR: ${String(error)}`);
      await page.screenshot({ path: 'test-failure.png', fullPage: true });
      throw error;
    } finally {
      logStep('Test finished');
    }
  });
});
