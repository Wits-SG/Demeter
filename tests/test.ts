import { expect, test } from '@playwright/test';

test('NavBar visible on home - not logged in', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByText('Home')).toBeVisible();

	await expect(page.getByText('Search')).toBeVisible();

	await expect(page.getByText('Recipe of the Day')).toBeVisible();

	await expect(page.getByText('Support')).toBeVisible();

	await expect(page.getByText('Login')).toBeVisible();
});

// test('Cookbooks page opens from collections', async({page})=>{
// 	await page.goto('/collections');

// 	await page.getByRole('link', { name: 'Cookbooks' }).click();
// 	await expect(page.getByText('/collections/cookbooks')).toBeVisible();

// });

// test('Menus  page opens from collections', async({page})=>{
// 	await page.goto('/collection');

// 	await page.getByRole('link', { name: 'Menus' }).click();
// 	await expect(page.getByText('/collections/menus')).toBeVisible();

// });

test.describe('collections navigation', () => {
	test.beforeEach(async ({ page }) => {
		// Go to the starting url before each test.
		await page.goto('https://recipio.co.za/collections/');
	});

	test('cookbook navigation', async ({ page }) => {
		// Assertions use the expect API.
		await page.goto('https://recipio.co.za/collections/cookbooks');
		await expect(page).toHaveURL('https://recipio.co.za/collections/cookbooks');
	});

	test('menu navigation', async ({ page }) => {
		// Assertions use the expect API.
		await page.goto('https://recipio.co.za/collections/menus');
		await expect(page).toHaveURL('https://recipio.co.za/collections/menus');
	});
});
