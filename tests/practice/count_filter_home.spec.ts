import test from "@playwright/test";

test.beforeEach(async({ page }) => {
    await page.goto(' ');
})

test('count button', async ({ page }) => {
    const locators = page.getByRole("button");
    console.log(await locators.count());
})

test('filter', async ({ page })  => {
    const locators = page.getByRole("button");
    await locators.filter({hasText: 'Sign In'}).highlight();
})