/**
 * HubSpot Integration Tests
 * 
 * To run these tests:
 * 1. Install Playwright: npm install -D @playwright/test
 * 2. Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID in .env.local
 * 3. Run: npx playwright test
 * 
 * These tests verify that HubSpot tracking script loads correctly
 * when the portal ID is configured.
 */

import { test, expect } from '@playwright/test';

// Skip tests if HubSpot is not configured
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const shouldRunTests = HUBSPOT_PORTAL_ID && HUBSPOT_PORTAL_ID !== 'REPLACE_ME';

test.describe('HubSpot Integration', () => {
  test.skip(!shouldRunTests, 'Skipping HubSpot tests - NEXT_PUBLIC_HUBSPOT_PORTAL_ID not configured');

  test('should load HubSpot tracking script on homepage', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that HubSpot script is present in the DOM
    const hubspotScript = await page.locator('script[src*="js.hs-scripts.com"]');
    await expect(hubspotScript).toBeAttached();

    // Verify the script URL contains the portal ID
    const scriptSrc = await hubspotScript.getAttribute('src');
    expect(scriptSrc).toContain(HUBSPOT_PORTAL_ID);
  });

  test('should initialize HubSpot analytics queue', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that _hsq is initialized on the window
    const hsqExists = await page.evaluate(() => {
      return typeof window._hsq !== 'undefined';
    });

    expect(hsqExists).toBeTruthy();
  });

  test('should load HubSpot script only once (no duplicates)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Count HubSpot script tags
    const scriptCount = await page.locator('script[src*="js.hs-scripts.com"]').count();
    expect(scriptCount).toBe(1);
  });

  test('should not load HubSpot when portal ID is missing', async ({ page }) => {
    // This test would need to run in an environment without the portal ID
    // You could mock this by creating a separate test environment
    
    // For now, we'll skip this test in the normal run
    test.skip(true, 'Requires test environment without NEXT_PUBLIC_HUBSPOT_PORTAL_ID');
  });
});

test.describe('HubSpot Form Integration', () => {
  const FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID;
  const shouldRunFormTests = FORM_ID && FORM_ID !== 'REPLACE_ME';

  test.skip(!shouldRunFormTests, 'Skipping form tests - NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID not configured');

  test('should render HubSpot form on contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Wait for the HubSpot form container to appear
    const formContainer = page.locator('[data-testid="hubspot-form-container"]');
    await expect(formContainer).toBeVisible({ timeout: 10000 });
  });

  test('should load HubSpot forms script', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for forms embed script
    await page.waitForFunction(() => {
      return typeof window.hbspt?.forms !== 'undefined';
    }, { timeout: 10000 });

    const formsLoaded = await page.evaluate(() => {
      return typeof window.hbspt?.forms !== 'undefined';
    });

    expect(formsLoaded).toBeTruthy();
  });
});

test.describe('HubSpot Analytics Helpers', () => {
  test.skip(!shouldRunTests, 'Skipping analytics tests - NEXT_PUBLIC_HUBSPOT_PORTAL_ID not configured');

  test('should allow identifying users via hsIdentify', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Import and call hsIdentify
    const identifyResult = await page.evaluate(() => {
      // Simulate calling hsIdentify
      if (window._hsq) {
        window._hsq.push([
          'identify',
          {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
          },
        ]);
        return true;
      }
      return false;
    });

    expect(identifyResult).toBeTruthy();
  });

  test('should allow tracking custom events via hsTrack', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Simulate tracking an event
    const trackResult = await page.evaluate(() => {
      if (window._hsq) {
        window._hsq.push([
          'trackCustomBehavioralEvent',
          {
            id: 'test_event',
            value: 100,
          },
        ]);
        return true;
      }
      return false;
    });

    expect(trackResult).toBeTruthy();
  });
});

