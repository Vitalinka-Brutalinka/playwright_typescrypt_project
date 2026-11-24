import test from "@playwright/test";

test.describe('Actions with elements', () => {

    test.beforeEach(async({ page }) => {
        await page.goto(' ');
    })

    test('click', async ({ page }) => {
        await page.getByText('Sign In').click({force: true, button: 'right'});
        await page.getByText('Sign In').dblclick();
    })
})

test.describe('Actions with page', () => {
      test.beforeEach(async({ page }) => {
        await page.goto(' ');
    })

test('click2', async ({ page }) => {
    await page.getByText('Sign In').click();
    await page.locator('#signinEmail').fill('test@test.com');
    await page.locator('#signinPassword').pressSequentially('testtest', {delay: 100});
    })



test('press Tab', async ({ page }) => {
    await page.getByText('Sign In').click();
    await page.locator('#signinEmail').fill('test@test.com');
    await page.locator('#signinPassword').press('Tab');
    })
    
test('scrole into view', async({ page })=> {
    await page.locator('.contacts_socials').scrollIntoViewIfNeeded();
})

test('drop downs', async({ page })=> {
    await page.getByText('Sign In').click();
    await page.locator('#signinEmail').fill('test@test.com');
    await page.locator('#signinPassword').fill('987654');
    await page.getByText('Login').click();
    await page.locator('Add car').click();
    await page.locator('#addCarBrand').selectOption({ label: 'Fiat' });
})

test.describe('Actions with page', () => {
    test('page goto', async ({ page }) => {
        await page.goto('/');
    })
})
})