import {test} from "@playwright/test";
import LoginPage from "../../src/pages/LoginPage";
import {ErrorMessages} from "../../helpers/ErrorMessages";
import ApplicationURL from "../../helpers/ApplicationURL";

test.describe("Negative Login Scenarios", () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
    })

    test("Login with locked_out_user", async ({page}) => {
        await loginPage.loginToApplication(process.env.LOCKED_OUT_USER);
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER)
        await loginPage.validateUrl(ApplicationURL.BASE_ULR)
    })

    test("Login with incorrect username", async ({page}) => {
        await loginPage.loginToApplication("test");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_VALUE)
        await loginPage.validateUrl(ApplicationURL.BASE_ULR)
    })

    test("Login with incorrect password", async ({page}) => {
        await loginPage.loginToApplication(process.env.LOCKED_OUT_USER, "test");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_VALUE)
        await loginPage.validateUrl(ApplicationURL.BASE_ULR)
    })

    test("Login with missing username", async ({page}) => {
        await loginPage.loginToApplication("");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_MISSING_USERNAME)
        await loginPage.validateUrl(ApplicationURL.BASE_ULR)
    })

    test("Login with missing password", async ({page}) => {
        await loginPage.loginToApplication(process.env.STANDARD_USER, "");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_MISSING_PASSWORD)
        await loginPage.validateUrl(ApplicationURL.BASE_ULR)
    })
})