import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export default class ProductsPage extends BasePage {

    private pageTitleElement: Locator

    constructor(protected page: Page) {
        super(page);
        this.pageTitleElement = page.locator("span[data-test='title']")
    }

    public async verifyTitle(expected_title: string) {
        await this.validateElementText(this.pageTitleElement, expected_title)
    }
}