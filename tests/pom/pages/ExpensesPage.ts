import { expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ExpensePage extends BasePage {
    private readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Fuel exepnses' });
    private readonly addExpenceButton: Locator = this.page.getByRole('button', { name: 'Add an expense' });
    private lastAddedExpenseEntry: Locator = this.page.locator('.expenses_table tr').nth(1);

    async navigate() {
        await super.navigate('/panel/expenses');
    }

    async openAddExpenseForm() {
        await this.addExpenceButton.click();
    }

    async verifyLastExpence(expectedDate: string, expectedMileage: string, expectedLiters: string, expectedCost: string) {
        const formatedCost = expectedCost.includes('.') ? `${expectedCost} USD` : `${expectedCost}.00 USD`
        await expect(this.lastAddedExpenseEntry.locator('td').nth(0)).toHaveText(expectedDate);
        await expect(this.lastAddedExpenseEntry.locator('td').nth(1)).toHaveText(expectedMileage);
        await expect(this.lastAddedExpenseEntry.locator('td').nth(2)).toHaveText(`${expectedLiters}L`);
        await expect(this.lastAddedExpenseEntry.locator('td').nth(3)).toHaveText(expectedCost);

    }
}