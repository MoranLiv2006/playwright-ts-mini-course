import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";

export default class YourCartPage extends BasePage {

    private cartItem: Locator;
    private cartItemName: Locator;
    private checkoutButton: Locator;

    constructor(protected page: Page) {
        super(page);
        this.cartItem = this.page.locator('[class="cart_item"]');
        this.cartItemName = this.page.locator("div[data-test='inventory-item-name']");
        this.checkoutButton = this.page.locator("button[data-test='checkout']")
    }

    public async validateNumberOfItemsInCart(expectedNumberOfItemsInCart: number) {
        await expect(this.cartItem).toHaveCount(expectedNumberOfItemsInCart);
    }

    public async validateProductExistsInCart(expectedProductExists: string) {
        await expect(this.cartItemName.filter({hasText: expectedProductExists})).toBeVisible();
    }

    public async goToCheckout() {
        await this.clickElement(this.checkoutButton);
    }


}