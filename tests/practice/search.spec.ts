import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('Site access', async({ page }) => {

})

test('page.locator - Xpath', async({ page }) => {
  const title = page.locator('//h1'); 
  const allBattons = page.locator('//button');
  
})

test('page.locator - CSS', async ({ page }) => {
    const title = page.locator('h1');
    const signInBatton = page.locator('.header_signin');
    await signInBatton.click();
})

test('getByRole', async ({ page }) => {
    page.getByRole('button');
})

test('getByText', async ({ page }) => {
    page.getByText('Do more');
})

test('getByPlaceHolder', async ({ page }) => {
    page.getByPlaceholder(' ');
})

test('getByAltText', async ({ page }) => {
    page.getByAltText('Instructions');
})

test('getByLable', async ({ page }) => {
    page.getByLabel('Email');
})

test('getByTitle', async ({ page }) => {
    page.getByTitle('');
})

test('getByTestiD', async ({ page }) => {
    page.getByTestId('');
})


