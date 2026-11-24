import test, { expect } from '@playwright/test';
import { HomePage } from './pom/pages/HomePage';
import { SignInForm } from './pom/forms/SignInForm';
import { testUser1 } from './test-data/validUser';
import { GaragePage } from './pom/pages/GaragePage';

test.describe('Codegen Sign in test', ()=> {

    let homePage: HomePage; 
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page)
        garagePage = new GaragePage(page)

        await homePage.navigate();
        await homePage.openSignInForm();
    })

    test('Successfull logine', async ({page})=> {
        await signInForm.signInWithCredentials(testUser1.email, testUser1.password);
        await expect(garagePage.pageHeading).toContainText('Garage');
    })

    test('Not successful sign in', async ({ page }) => {
      await signInForm.signInWithCredentials(testUser1.email, testUser1.password); 
      await expect(page.getByRole('paragraph')).toContainText('Wrong email or password');
    })

    test('empty email field', async ({page}) => {
        await signInForm.triggerErrorOnField("email");
        await signInForm.enterPassword('parolka')
        await expect(signInForm.emptyEmailMessage).toBeVisible();
    })
})