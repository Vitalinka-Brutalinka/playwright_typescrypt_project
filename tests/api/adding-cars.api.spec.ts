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
});

test.describe('Privat requiests', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);
        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
    });

    test.describe('Adding new car', () => {
        let addedCarsToRemove: string[] = [];

        test('Add new car - Ford Fiesta', async () => {

            const newCar = generateNewCar(1, 1, 123)

            const addedCar = await garageServise.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);

            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();

            addedCarsToRemove.push(addedCar.id);
        });

        test('Add new car - Audi TT', async () => {
            const newCar = generateNewCar(3, 11, 123)
            const addedCar = await garageServise.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);

            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();

            addedCarsToRemove.push(addedCar.id);
        });

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
});