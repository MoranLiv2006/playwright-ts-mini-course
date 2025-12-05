import { test } from '@playwright/test';
import LoginPage from "../src/pages/LoginPage";
import UserCredentials from "../helpers/UserCredentials";

test('sanity test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').dblclick();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Moran');
    await page.locator('.checkout_info').click();
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Liv');
    await page.locator('[data-test="lastName"]').press('Tab');
    await page.locator('[data-test="postalCode"]').fill('123456');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="back-to-products"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="reset-sidebar-link"]').dblclick();
    await page.locator('[data-test="logout-sidebar-link"]').click();
});

test('demo test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(UserCredentials.PERFORMANCE_GLITCH_USER);

});