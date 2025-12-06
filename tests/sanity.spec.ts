import {test} from '@playwright/test';
import LoginPage from "../src/pages/LoginPage";
import ProductsPage from "../src/pages/ProductsPage";
import ApplicationURL from "../helpers/ApplicationURL";
import YourCartPage from "../src/pages/YourCartPage";
import PageTitles from "../helpers/PageTitles";
import CheckoutYourInformationPage from "../src/pages/CheckoutYourInformationPage";
import CheckoutOverview from "../src/pages/CheckoutOverview";

test.describe("Sanity Tests Block", () => {

    const products = ["Sauce Labs Bolt T-Shirt", "Sauce Labs Bike Light", "Sauce Labs Onesie"]

    test('Validate simple login and transaction', async ({page}) => {

        const loginPage = new LoginPage(page);
        await loginPage.loginToApplication();

        const productsPage = new ProductsPage(page);
        await productsPage.verifyTitle(PageTitles.PRODUCTS_PAGE)

        const yourCartPage = new YourCartPage(page);

        for (let product of products) {
            await productsPage.chooseProductByTitle(product)
        }

        await productsPage.validateNumberOfItemsInCart(products.length.toString());
        await productsPage.goToCart();

        await yourCartPage.validateUrl(ApplicationURL.YOUR_CART_PAGE_URL)
        await yourCartPage.verifyTitle(PageTitles.YOUR_CART_PAGE)
        await yourCartPage.validateNumberOfItemsInCart(products.length)

        for (let product of products) {
            await yourCartPage.validateProductExistsInCart(product)
        }

        await yourCartPage.goToCheckout();

        const checkYourInformationPage = new CheckoutYourInformationPage(page)
        await yourCartPage.validateUrl(ApplicationURL.CHECKOUT_YOUR_INFORMATION_PAGE_URL)
        await checkYourInformationPage.fillCustomerDetails("Moran", "Liv", "V4P0H5")
        await yourCartPage.verifyTitle(PageTitles.CHECKOUT_YOUR_INFORMATION_PAGE)
        await checkYourInformationPage.goToCheckoutOverview()


        const checkoutOverviewPage = new CheckoutOverview(page)
        await yourCartPage.validateUrl(ApplicationURL.CHECKOUT_OVERVIEW_PAGE_URL)
        await yourCartPage.verifyTitle(PageTitles.CHECKOUT_OVERVIEW_PAGE)
        await checkoutOverviewPage.goToCheckoutComplete();
        await page.locator('[data-test="back-to-products"]').click();
        await page.getByRole('button', {name: 'Open Menu'}).click();
        await page.locator('[data-test="reset-sidebar-link"]').dblclick();
        await page.locator('[data-test="logout-sidebar-link"]').click();
    });
})
