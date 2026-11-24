import { Locator, Page } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class SignInForm extends BaseForm{
    private readonly emailField: Locator = this.page.getByRole('textbox', {name: 'Email'}); 
    private readonly passwordField: Locator = this.page.getByRole('textbox', {name: 'Password'});
    private readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });
    public readonly emptyEmailMessage: Locator = this.page.getByText('Email required');

async signInWithCredentials(email: string, password: string) {
    await this.enterEmail(email)
    await this.enterPassword(password);
    await this.loginButton.click();
}

async triggerErrorOnField(fieldName: string){
    let field: Locator;
    if (fieldName==="email"){
        field = this.emailField;
    } else if (fieldName === 'password'){
        field = this.passwordField;
    } else {
        throw new Error('Wrong field name');
    }

    await field.focus();
    await field.blur();
}

async enterEmail(email: string) {
    await this.emailField.fill(email);
}

async enterPassword(password: string) {
    await this.passwordField.fill(password);
}
}