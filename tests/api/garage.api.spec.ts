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

test.describe('Get brands and models', () => {
    let sid: string;
    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);
        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
    })
    test('Get all brands', async () => {
        const brands = await garageServise.getAllBrands();
        expect(brands).toHaveLength(5)
    })

    test('Get all models', async () => {
        const models = await garageServise.getAllModels();
        expect(models).toHaveLength(23)
    })

    test('Get model by id', async () => {
        const model = await garageServise.getModalById(2);
        expect(model.carBrandId).toBe(1);
        expect(model.title).toBe('R8')
    })

    test('Get model by invalid id', async () => {
        const response = await garageServise.getModalById(6789, false);
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('No car models found with this id');
    })

})

test.describe('Privat requiests', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);
        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
    })

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
        })

        test('Add new car - Audi TT', async () => {
            const newCar = generateNewCar(3, 11,123)
            const addedCar = await garageServise.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);

            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();

            addedCarsToRemove.push(addedCar.id);
        });

    })

    test.describe('Delete a car', () => {
        let carToRemoveId: string;
        let addedCarsToRemove: string[] = [];

        test.beforeAll(async ({ request }) => {
            garageServise = new GarageService(request);

            const newCar = generateNewCar(3, 11,123)
        
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
})