import  { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


test.describe('Keyboard Navigation & Accessibility', () =>{
    test.beforeEach(async ({ page })=>{
        await page.goto('/');
    });

    test('Skip Link should become visible on focus and jump to Main', async ({ page })=>{
        // 1. Initial State: Skip Link should be in the DOM but hidden
        const skipLink = page.locator('.skip-link');
        await expect(skipLink).not.toBeInViewport();

        // 2. Press Tab to bring it into view (Simulate keyboard user entering page)
        await page.keyboard.press('Enter');

        // 3. Assertion: Link is now visible to the user
        await expect(skipLink).toBeInViewport();
        await expect(skipLink).toBeFocused();

        // 4. Action: Activate the link
        await page.keyboard.press('Enter');

        // 5. Assertion: Focus should move to the main content container
    // We check this by seeing if the document.activeElement has the id "main-content"
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe('main-content');
    });

    test('Focus Order should follow logical flow', async ({ page })=>{
        // 1. Activate Skip Link to jump header
        await page.keyboard.press('Tab'); //focus skip link
        await page.keyboard.press('Enter'); //Activate it

        // 2. Next Tab should hit the "Play" button (First interactive element in Main)
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', {name: /play/i})).toBeFocused();

        // 3. Next Tab should hit "Add to Watchlist"
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: /watchList/i })).toBeFocused();
    });

    test('Page should not have any axe-core violations', async ({ page })=>{
        // Automated WCAG scan inside the real browser environment
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    })
})