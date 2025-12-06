import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export default class CheckoutOverview extends BasePage {

    private finishButton: Locator;

    constructor(page: Page) {
        super(page);
        this.finishButton = this.page.locator("button[data-test='finish']")
    }

    public async goToCheckoutComplete() {
        await this.clickElement(this.finishButton);
    }
}