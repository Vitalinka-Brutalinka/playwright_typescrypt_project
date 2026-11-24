import { test as base, Page } from '@playwright/test';

type ScreenSizes = {
    smallScreen: Page,
    mediumScreen: Page,
    bigScreen: Page
};

export const test = base.extend<ScreenSizes>({
    smallScreen: async({page}, use) => {
        await page.setViewportSize({width: 300, height: 300});
        await use(page);
        console.log('test with small screen is finished');
    },

        mediumScreen: async({page}, use) => {
        await page.setViewportSize({width: 500, height: 500});
        await use(page);
        console.log('test with mediun screen is finished');
    },

        bigScreen: async({page}, use) => {
        await page.setViewportSize({width: 1000, height: 1000});
        await use(page);
        console.log('test with big screen is finished');
    }
});

export { expect } from '@playwright/test';