import test from '@playwright/test';
import UsersService from '../utils/api/services/UsersService';
import AuthService from '../utils/api/services/AuthService';
import { testUser1, testUser2, } from '../test-data/validUser';

let usersService: UsersService
let authService: AuthService

test.describe('Create test users via API', () => {

    test.beforeEach(({ request }) => {
        usersService = new UsersService(request);
        authService = new AuthService(request);
    })
    
    test('Create user testuser1 ', async () => {
        await usersService.createUser(
            testUser1.name,
            testUser1.last,
            testUser1.email,
            testUser1.password,
            testUser1.password);
    })

    test('Create user testuser2 ', async () => {
        await usersService.createUser(
            testUser2.name,
            testUser2.last,
            testUser2.email,
            testUser2.password,
            testUser2.password);

    })
})