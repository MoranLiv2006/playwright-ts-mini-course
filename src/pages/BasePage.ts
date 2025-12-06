import {expect, Locator, Page, test} from "@playwright/test";

export abstract class BasePage {

    protected constructor(protected page: Page) {
    }

    public async validateUrl(url: string) {
        await test.step(`Validating that a correct value of URL ${url}`, async () => {
            await expect(this.page).toHaveURL(url, {timeout: 30000});
        })
    }

    protected async validateElementText(element: Locator, expectedText: string) {
        await test.step(`Validating that a correct element text is ${expectedText}`, async () => {
            await expect(element).toContainText(expectedText, {timeout: 30000});
        })
    }
}