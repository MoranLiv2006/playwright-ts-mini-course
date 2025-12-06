import {test} from "@playwright/test";
import LoginPage from "../../src/pages/LoginPage";
import ApplicationURL from "../../helpers/ApplicationURL";
import ProductsPage from "../../src/pages/ProductsPage";
import PageTitles from "../../helpers/PageTitles";

test.describe("Positive Login Scenarios", () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
    })

    test.afterEach(async () => {
        await productsPage.validateUrl(ApplicationURL.INVENTORY_PRODUCTS_PAGE_URL)
        await productsPage.verifyTitle(PageTitles.PRODUCTS_PAGE)
    })

    test("Login with standard_user", async () => {
        await loginPage.loginToApplication();
    })

    test("Login with problem_user", async () => {
        await loginPage.loginToApplication(process.env.PROBLEM_USER);
    })

    test("Login with performance_glitch_user", async () => {
        await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER);
    })
})