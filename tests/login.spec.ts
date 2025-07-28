import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://react-restaurant-project-fawn.vercel.app/login');
  await page.getByRole('heading', { name: 'Welcome Back' }).click();
  await page.getByText('Restaurant Admin Panel').click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
  await page.getByText('Welcome to your restaurant').click();
});
