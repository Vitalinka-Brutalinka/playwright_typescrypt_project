import { expect } from "@playwright/test";
import { testUser1, testUser2 } from "../test-data/validUser";
import { test } from "../utils/fixtures/pageFixtures";
import AuthService from "../utils/api/services/AuthService";


test.describe('Get storage state for test users', () => {
        test('login as testuser1 and save user state', async ({ request }) => {
                const authService = new AuthService(request)
                const response = await authService.signIn(testUser1.email, testUser1.password)
                expect(response.status()).toBe(200);

                await request.storageState({ path: '.states/testuser1.json' })
        })


        test('login as testuser2 and save user state', async ({ request }) => {
                const authService = new AuthService(request)
                const response = await authService.signIn(testUser2.email, testUser2.password)
                expect(response.status()).toBe(200);

                await request.storageState({ path: '.states/testuser2.json' })
        })

})