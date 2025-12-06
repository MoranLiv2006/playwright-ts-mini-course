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

    protected async clickElement(element: Locator) {
        await test.step(`Clicking the ${element}`, async () => {
            await element.click();
        })
    }

    protected async fillText(element: Locator, textToFill: string) {
        await test.step(`Filling ${textToFill} into the ${element} element`, async () => {
            await element.fill(textToFill);
        })
    }

    public async verifyTitle(expected_title: string) {
        await this.validateElementText(this.page.locator("span[data-test='title']"), expected_title)
    }
}