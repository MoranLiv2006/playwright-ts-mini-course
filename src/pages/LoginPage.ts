import {Locator, Page} from "@playwright/test";
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

    public async loginToApplication(username: string = process.env.STANDARD_USER as string, password: string = process.env.PASSWORD as string, url: string = ApplicationURL.BASE_ULR) {
        await this.page.goto(url);
        await this.validateUrl(ApplicationURL.BASE_ULR)
        await this.fillText(this.usernameField, username);
        await this.fillText(this.passwordField, password);
        await this.clickElement(this.loginButton)
    }

    public async validateErrorMessage(errorMessage: ErrorMessages) {
        await this.validateElementText(this.errorMessage, errorMessage.valueOf())
    }
}