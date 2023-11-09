import { expect, test } from '@playwright/test';

test('NavBar visible on home - not logged in', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByText('Home')).toBeVisible();

	await expect(page.getByText('Search')).toBeVisible();

	await expect(page.getByText('Recipe of the Day')).toBeVisible();

	await expect(page.getByText('Support')).toBeVisible();

	await expect(page.getByText('Login')).toBeVisible();
});
