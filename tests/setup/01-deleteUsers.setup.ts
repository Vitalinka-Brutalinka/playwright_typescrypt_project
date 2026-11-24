import test from '@playwright/test';
import UsersService from '../utils/api/services/UsersService';
import AuthService from '../utils/api/services/AuthService';
import { testUser1, testUser2, } from '../test-data/validUser';

let usersService: UsersService
let authService: AuthService

test.describe('Delete test users via API', () => {

    test.beforeEach(({ request }) => {
        usersService = new UsersService(request);
        authService = new AuthService(request);
    })
    test('Delete user testuser1 ', async () => {
        const sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
        const response = await usersService.deleteUser(sid)

    })

    test('Delete user testuser2 ', async () => {
        const sid = await authService.getAuthCookie(testUser2.email, testUser2.password);
        const response = await usersService.deleteUser(sid)

    })
})