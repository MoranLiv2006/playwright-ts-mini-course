import {expect, Locator, Page} from "@playwright/test";
import UserCredentials from "../../helpers/UserCredentials";
import ApplicationURL from "../../helpers/ApplicationURL";
import {ErrorMessages} from "../../helpers/ErrorMessages";
import {BasePage} from "./BasePage";

export default class LoginPage extends BasePage {

    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    errorMessage: Locator;

    constructor(protected page: Page) {
        super(page);
        this.usernameField = page.locator('[data-test="username"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    public async loginToApplication(username: string = UserCredentials.STANDARD_USER, password: string = UserCredentials.PASSWORD, url: string = ApplicationURL.BASE_ULR) {
        await this.page.goto(url);
        await this.validateUrl(ApplicationURL.BASE_ULR)
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    public async validateErrorMessage(errorMessage: ErrorMessages) {
        // await expect(this.errorMessage).toContainText(errorMessage.valueOf());
        await this.validateElementText(this.errorMessage, errorMessage.valueOf())
    }
}