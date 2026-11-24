import { expect, Locator } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class AddExpenseForm extends BaseForm {

    public readonly formTitle = this.page.locator('.modal-title', { hasText: 'Add an expense' });
    public readonly expensesForm = this.page.locator('.modal-content');
    private readonly vehicleDropdown = this.page.locator('#addExpenseCar');
    private readonly reportDateField = this.page.locator('#addExpenseDate');
    public readonly mileageField = this.page.locator('#addExpenseMileage');
    private readonly numberOfLitersField = this.page.locator('#addExpenseLiters');
    private readonly totalCostField = this.page.locator('#addExpenseTotalCost');
    private readonly addExpenseButton = this.page.getByRole('button', { name: 'Add', exact: true });
    public readonly futureDateErrorMessage = this.page.locator('.alert-danger', 
        { hasText: 'Report date has to be less than tomorrow' });
    public readonly equalMileageErrorMessage = this.page.locator('.alert-danger', 
        { hasText: 'First expense mileage must not be less or equal to car initial mileage. Car initial mileage is'});
    async addNewExpence(mileage: string, numberOfLiters: string, totalCost: string, vehicle?: string, reportDate?: string) {
        await expect(this.vehicleDropdown).toBeEnabled();

        if (vehicle) {
            await this.selectVehicle(vehicle);
        }

        if (reportDate) {
            await this.enterReportDate(reportDate);
        }
        await this.enterMileage(mileage);
        await this.enterNumbersOfLiters(numberOfLiters);
        await this.enterTotalCost(totalCost);
        await this.clickAddExpenceButton();
    }

    async selectVehicle(vehicle: string) {
        await this.vehicleDropdown.selectOption(vehicle);
    }

    async enterReportDate(reportDate: string) {
        await this.reportDateField.fill(reportDate);
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async enterNumbersOfLiters(numberOfLiters: string) {
        await this.numberOfLitersField.fill(numberOfLiters);
    }

    async enterTotalCost(totalCost: string) {
        await this.totalCostField.fill(totalCost);
    }

    async clickAddExpenceButton() {
        await this.addExpenseButton.click();
    }

}