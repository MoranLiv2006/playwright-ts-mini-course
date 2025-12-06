import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export default class ProductsPage extends BasePage {

    private itemDescriptionElement: Locator;
    private shoppingCartBudgeElement: Locator;

    constructor(protected page: Page) {
        super(page);
        this.itemDescriptionElement = page.locator("div[data-test='inventory-item-description']");
        this.shoppingCartBudgeElement = page.locator("a[class='shopping_cart_link']");
    }

    public async chooseProductByTitle(desiredProduct: string) {
        await this.clickElement(this.itemDescriptionElement.filter({hasText: desiredProduct}).locator("button"))
        // for(let product of await this.itemDescriptionElement.all()) {
        //     const productTitle = await product.locator("div[data-test='inventory-item-name']").innerText();
        //     if (productTitle === desiredProduct) {
        //         await product.locator("button").click();
        //     }
        // }
    }

    public async validateNumberOfItemsInCart(expectedNumberOfItems: string) {
        await this.validateElementText(this.shoppingCartBudgeElement, expectedNumberOfItems)
    }

    public async goToCart() {
        await this.clickElement(this.shoppingCartBudgeElement);
    }
}