import test, { expect } from "@playwright/test";
import { testUser1 } from "../test-data/validUser";
import GarageService from "../utils/api/services/GarageService";
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