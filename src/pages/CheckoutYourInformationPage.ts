import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export default class CheckoutYourInformationPage extends BasePage {

    private firstNameField: Locator;
    private lastNameField: Locator;
    private zipCodeField: Locator;
    private continueButton: Locator;


    constructor(protected page: Page) {
        super(page);
        this.firstNameField = page.locator("input[data-test='firstName']");
        this.lastNameField = page.locator("input[data-test='lastName']");
        this.zipCodeField = page.locator("input[data-test='postalCode']");
        this.continueButton = page.locator("input[data-test='continue']");
    }

    public async fillCustomerDetails(firstname: string, lastname: string, zipCode: string) {
        await this.fillText(this.firstNameField, firstname);
        await this.fillText(this.lastNameField, lastname);
        await this.fillText(this.zipCodeField, zipCode);
    }

    public async goToCheckoutOverview() {
        await this.clickElement(this.continueButton);
    }




}