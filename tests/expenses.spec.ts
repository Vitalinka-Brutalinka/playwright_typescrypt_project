import { expect, test } from "./utils/fixtures/pageFixtures";
import GarageService from "./utils/api/services/GarageService";
import { getSidFromStorageState } from "./utils/storageState/storageState";
import { generateExpenseData } from "./utils/factories/factory";
import { faker } from "@faker-js/faker";


test.describe('Fuel Expenses test', () => {
    let garageService: GarageService;

    test.use({ storageState: '.states/testuser2.json' });

    test.beforeEach(async ({ request }) => {
        garageService = new GarageService(request);
        const sid = getSidFromStorageState('.states/testuser2.json');
        await garageService.addCar(sid, 1, 1, 888);
    })
    test('Correct adding of expense with valid data', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        const curentDate = new Date().toISOString()
        const year = curentDate.slice(0, 4);
        const month = curentDate.slice(5, 7);
        const day = curentDate.slice(8, 10);
        const formettedDate = `${day}.${month}.${year}`
        await app.expensePage.navigate();
        await app.expensePage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpence(mileage, numberOfLiters, totalCost);
        await app.expensePage.verifyLastExpence(formettedDate, mileage, numberOfLiters, totalCost);
    })

    test('Validation - future date', async ({ app }) => {
        const futureDate = faker.date.future().toISOString();
        const year = futureDate.slice(0, 4);
        const month = futureDate.slice(5, 7);
        const day = futureDate.slice(8, 10);
        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        await app.expensePage.navigate();
        await app.expensePage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpence(
            mileage,
            numberOfLiters,
            totalCost,
            undefined,
            `${day}.${month}.${year}`);
        await expect(app.addExpenseForm.futureDateErrorMessage).toBeVisible();
    })
    test('Validation - adding expence with current number of mileage', async ({ app }) => {

        const { numberOfLiters, totalCost } = generateExpenseData();

        await app.expensePage.navigate();
        await app.expensePage.openAddExpenseForm();
        await expect(app.addExpenseForm.mileageField).toHaveValue(/.+/);
        const newMileage = await app.addExpenseForm.mileageField.inputValue();
        await app.addExpenseForm.addNewExpence(newMileage, numberOfLiters, totalCost);
        await expect(app.addExpenseForm.equalMileageErrorMessage).toBeVisible();
    })
})