import test from "@playwright/test";

test.beforeEach(async({ page }) => {
    await page.goto(' ');
})

test('.filter hasText', async({ page }) => {
    page.locator('//button').filter({ hasText: 'Sign up'});
    const locator = page.getByRole('button').filter({ hasText: 'Sign'});
    await locator.highlight();
    await page.pause();
})

test('.filter hasNotText', ({ page }) => {
    page.locator('//button').filter({ hasNotText: 'Sign up'});
    page.getByRole('button').filter({ hasNotText: 'Sign'});
})

test('.filter has', ({ page }) => {
    page.locator('//span').filter({ has:page.locator('span.icon-telegram')});
})

test('.filter hasNot', ({ page }) => {
    page.locator('//span').filter({ hasNot:page.locator('span.icon-telegram')});
})
