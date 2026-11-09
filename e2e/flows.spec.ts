import { test, expect } from '@playwright/test';

test.describe('Prep Stops - Main User Flows', () => {
  test('Flow F1: First visit -> Welcome -> Level Picker -> Path Map', async ({ page }) => {
    // Navigate to home
    await page.goto('/');

    // S1 Welcome screen verification
    await expect(page.getByRole('button', { name: /Choose my level/i })).toBeVisible();
    await expect(page.getByText(/100% Free/i)).toBeVisible();

    // Click Choose my level
    await page.getByRole('button', { name: /Choose my level/i }).click();

    // S2 Level picker verification
    await expect(page.getByRole('heading', { name: /Choose your level/i })).toBeVisible();
    await expect(page.getByText('Fresh', { exact: true })).toBeVisible();

    // Choose Junior Level
    const juniorRadio = page.locator('input[value="junior"]');
    await expect(juniorRadio).toBeVisible();
    await juniorRadio.check();

    // Click Start my path
    await page.getByRole('button', { name: /Start my path/i }).click();

    // Should navigate to /path
    await expect(page).toHaveURL(/\/path/);
    await expect(page.getByRole('heading', { name: /Fresh Stage/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Junior Stage/i })).toBeVisible();
  });

  test('Flow F2: Path Map -> Stop Details -> Lesson -> Exam', async ({ page }) => {
    // Start directly on path
    await page.goto('/path');

    // Click on the first stop node
    const firstStopButton = page.locator('button[aria-label*="stop"]').first();
    await expect(firstStopButton).toBeVisible();
    await firstStopButton.click();

    // Stop details sheet appears
    const sheet = page.getByRole('dialog');
    await expect(sheet).toBeVisible();

    // Click Start lesson
    const startLessonLink = sheet.getByRole('link', { name: /lesson/i });
    if (await startLessonLink.isVisible()) {
      await startLessonLink.click();
      await expect(page).toHaveURL(/\/topics\/.*\/lesson/);

      // Verify lesson header & stepper
      await expect(page.getByRole('link', { name: /Path/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Continue|Start the exam/i })).toBeVisible();
    }
  });

  test('Flow F5: Settings -> Theme switcher & Reset confirmation', async ({ page }) => {
    await page.goto('/settings');

    // Verify settings screen
    await expect(page.getByRole('heading', { name: /Progress & Settings/i })).toBeVisible();

    // Test Dark theme switcher
    const darkButton = page.getByRole('button', { name: /Dark/i });
    await darkButton.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Test Reset modal safety
    await page.getByRole('button', { name: /Reset all progress/i }).click();
    await expect(page.getByText(/Delete all your progress\?/i)).toBeVisible();

    // The delete button must be disabled until RESET is typed
    const confirmButton = page.getByRole('button', { name: /Delete everything/i });
    await expect(confirmButton).toBeDisabled();

    await page.locator('#reset-input').fill('RESET');
    await expect(confirmButton).toBeEnabled();

    // Cancel reset
    await page.getByRole('button', { name: /Cancel/i }).click();
  });
});
