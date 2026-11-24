import test, { expect } from "@playwright/test";
import { testUser1 } from "../test-data/validUser";

test.describe('Auth tests', () => {
    test('Sign in', async ({ request }) => {
        const responseAuth = await request.post('api/auth/signin', {
            data: {
                "email": testUser1.email,
                "password": testUser1.password,
                "remember": false
            }
        });

        //console.log(response);
        //console.log(response.headers());
        console.log(responseAuth.headers()['set-cookie']);
        console.log(responseAuth.headers()['set-cookie'].split(';')[0]);

    })
})
