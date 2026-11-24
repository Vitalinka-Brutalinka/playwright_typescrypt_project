import test, { expect } from "@playwright/test";
import { testUser1 } from "../test-data/validUser";
import GarageService from "../utils/api/services/GarageService";
import { generateNewCar } from "../utils/api/factories/cars.factory";
import AuthService from "../utils/api/services/AuthService";

let garageServise: GarageService;
let authService: AuthService

test.beforeEach(({ request }) => {
    garageServise = new GarageService(request);
    authService = new AuthService(request);
})

test.describe('Delete a car', () => {
    let carToRemoveId: string;
    let addedCarsToRemove: string[] = [];
    
    let sid: string;

    test.beforeAll(async ({ request }) => {

        authService = new AuthService(request);
        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);

        garageServise = new GarageService(request);

        const newCar = generateNewCar(3, 11, 123)

        const addedCar = await garageServise.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);
        carToRemoveId = addedCar.id;
    })

    test('Remove a car', async ({ request }) => {
        const response = await garageServise.removeCar(sid, carToRemoveId)

        expect(response.status()).toBe(200);
    })

    test('Remove a car with invalid ID', async () => {
        const response = await garageServise.removeCar(sid, '123456', true)
        const responseJson = await response.json();

        expect(responseJson.message).toBe('Car not found')
        expect(response.status()).toBe(404);
    })

    test.afterAll(async ({ request }) => {
        const garageServise = new GarageService(request);

        for (const id of addedCarsToRemove) {
            const response = await request.delete(`/api/cars/${id}`, {
                headers: {
                    'cookie': sid
                }
            });
            expect(response.status()).toBe(200);
        }
    });
});