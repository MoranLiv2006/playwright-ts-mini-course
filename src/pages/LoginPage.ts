import {expect, Locator, Page} from "@playwright/test";
import UserCredentials from "../../helpers/UserCredentials";
import ApplicationURL from "../../helpers/ApplicationURL";

export default class LoginPage {

    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;

    constructor(protected page: Page) {
        this.usernameField = page.locator('[data-test="username"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    public async loginToApplication(username: string = UserCredentials.STANDARD_USER, password: string = UserCredentials.PASSWORD, url: string = ApplicationURL.BASE_ULR) {
        await this.page.goto(url);
        await this.validateUrl(ApplicationURL.BASE_ULR)
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();

        await this.validateUrl(`${ApplicationURL.BASE_ULR}inventory.html`)
    }

    public async validateUrl(url: string) {
        await expect(this.page).toHaveURL(url, {timeout: 30000});
    }
}