import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";

export default class YourCartPage extends BasePage {

    constructor(protected page: Page) {
        super(page);
    }


}