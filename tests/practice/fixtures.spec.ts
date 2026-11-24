import { chromium } from '@playwright/test';
import { test } from '../utils/fixtures/screenSizeFixtures';

test.describe('Fixtures', () => {

    test('Open Wiki without fixtures', async() => {
        const browser = await chromium.launch();
        const context = browser.newContext();
        const page = (await context).newPage();
        
        (await page).goto('https://wikipedia.org')
    })

    test('Open Wiki with small screen', async ({smallScreen}) => {
        await smallScreen.goto('https://wikipedia.org')
        await smallScreen.waitForTimeout(1000)
    }) 

    test('Open Wiki with medium screen (1280px)', async ({mediumScreen}) => {
        await mediumScreen.goto('https://wikipedia.org')
        await mediumScreen.waitForTimeout(1000)
    }) 

    test('Open Wiki with big screen', async ({bigScreen}) => {
        await bigScreen.goto('https://wikipedia.org')
        await bigScreen.waitForTimeout(1000)
    }) 
})