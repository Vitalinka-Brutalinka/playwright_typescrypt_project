import test, { expect } from "@playwright/test";

test.describe('Auto-retrying Assertions', ()=> {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    })

    test('toBeVisible', async ({ page }) => {
        await page.locator('.header_signin').click();
        await expect(page.locator('h4.modal-title')).toBeVisible();
        await page.locator('.close').click();
        await expect(page.locator('#signinEmail')).not.toBeVisible();
    })

    test('toHaveText', async ({ page }) => {
        await page.locator('.header_signin').click();
        await expect(page.locator('.modal-title')).toHaveText('Log in');
    })

    test('toContainText', async ({ page }) => {
        await page.locator('.header_signin').click();
        await expect(page.locator('.modal-title')).toContainText('Log');
    })

    test('toHaveValue', async ({ page }) => {
        await page.locator('.header_signin').click();
        await page.locator('#signinEmail').fill('testemail@gmail.com');
        await expect(page.locator('#signinEmail')).toHaveValue('testemail@gmail.com');
    })
    
    test('toHaveCSS', async ({ page }) => {
        await expect(page.locator('.hero-descriptor_btn')).toHaveCSS('background-color', 'rgb(2, 117, 216)')
    })

    test('toHaveCount', async ({ page }) => {
        await expect(page.locator('.social_icon')).toHaveCount(5);
    })

    test('toHaveURL', async ({ page }) => {
        await expect(page).toHaveURL('https://qauto.forstudy.space/');
    })

    test.describe('Non-retrying Assetrtions', () => {
        test('toBe', () => {
            const result = 10 + 10;
            expect(result).toBe(20);
        })  
    })
})