import { expect } from "@playwright/test";
import { test } from "./utils/fixtures/pageFixtures.ts"
import GarageService from "../tests/utils/api/services/GarageService.ts"
import { getSidFromStorageState } from "./utils/storageState/storageState.ts";

let garageService: GarageService; 

test.describe('Garage tests', () => {

    test.use({ storageState: '.states/testuser1.json' });

    test.beforeEach(async ({ app }) => {
        await app.garagePage.navigate();
        await app.garagePage.openAddCarForm();
    })

    test.describe('Ading cars', () => {
        test('Add new car  - BMW X5', async ({ app }) => {
            await app.addCarFormWithRemovingCar.addNewCar('BMW', 'X5', '899');
            await app.garagePage.verifyCarIsAdded('BMW X5', '899');
        })

        test('Add new car  - Audi Q7', async ({ app }) => {
            await app.addCarForm.addNewCar('Audi', 'Q7', '299');
            await app.garagePage.verifyCarIsAdded('Audi Q7', '299');
        })

        test.afterEach(async ({ request }) => {
            garageService = new GarageService(request);

            const sid = getSidFromStorageState('.states/testuser1.json')

            const allAddedCars = await garageService.getUsersCars(sid);
            const lastAddedCarId = allAddedCars.data[0].id

            await garageService.removeCar(sid, lastAddedCarId)
        
        })
    })

    test('Add new car  without mileage', async ({ app }) => {
        await app.addCarForm.selectBrand('Porsche');
        await app.addCarForm.selectModel('911');
        await expect(app.addCarForm.addCarButton).toBeDisabled();
    })

    test('Close "Add a car" via "Cancel" button', async ({ app }) => {
        await app.addCarForm.clickCancelButton();
        await expect(app.addCarForm.formTitle).not.toBeVisible
    })

    test('Close "Add a car" via close icon', async ({ app }) => {
        await app.addCarForm.clicCloseIcon();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    })
})