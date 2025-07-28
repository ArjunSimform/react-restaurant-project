import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('heading', { name: 'Welcome Back' }).click();
  await page.getByText('Restaurant Admin Panel').click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
  await page.getByText('Welcome to your restaurant').click();
  await page.getByRole('link', { name: 'Add Menu Item' }).click();
  await page.getByRole('textbox', { name: 'Enter item name' }).click();
  await page
    .getByRole('textbox', { name: 'Enter item name' })
    .fill('Gulab Jamun new one');
  await page.getByRole('textbox', { name: 'Describe the item' }).click();
  await page
    .getByRole('textbox', { name: 'Describe the item' })
    .fill("it's a sweet product");
  await page.getByPlaceholder('0.00').click();
  await page.getByPlaceholder('0.00').fill('40');
  await page.getByRole('combobox').selectOption('Desserts');

  await page.getByRole('combobox').click();
  await page.getByRole('button', { name: 'Add Menu Item' }).click();
  await page.getByText('Gulab Jamun new one').click();
  await page.getByText("it's a sweet product").click();
  await page.getByRole('cell', { name: 'Desserts' }).locator('span').click();
  await page.getByRole('cell', { name: '₹' }).click();
  await page.getByText('Available', { exact: true }).click();
  await page
    .getByRole('row', { name: 'Gulab Jamun new one' })
    .getByRole('link')
    .click();
  await page.getByRole('textbox', { name: 'Describe the item' }).click();
  await page
    .getByRole('textbox', { name: 'Describe the item' })
    .fill("it's a sweet product , updated");
  await page.getByRole('button', { name: 'Update Item' }).click();
  await page.getByText("it's a sweet product , updated").click();
});
