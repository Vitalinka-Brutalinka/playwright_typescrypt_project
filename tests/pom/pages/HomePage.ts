import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
    private readonly signInButton: Locator = this.page.getByRole('button', {name: 'Sign In'});

    async navigate() {
        await this.page.goto('/')
    }

    async openSignInForm(){
        await this.signInButton.click();
}
}