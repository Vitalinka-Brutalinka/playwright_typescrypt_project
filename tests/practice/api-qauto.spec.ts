import test, { expect } from "@playwright/test";

test('Get all brands', async ({ request }) => {
    const response = await request.get('/api/cars/brands');
    const responseJson = await response.json();
    const brands = responseJson.data;
    console.log(response);
    console.log(brands);
    expect(response.status()).toBe(200);
    expect(brands).toHaveLength(5)
})

test('Get all models', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const responseJson = await response.json();
    const models = responseJson.data;
    console.log(response);
    console.log(models);
    expect(response.status()).toBe(200);
    expect(models).toHaveLength(23)
})