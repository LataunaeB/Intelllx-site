# HubSpot Integration Tests

This directory contains E2E tests for the HubSpot integration using Playwright.

## Setup

### 1. Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### 2. Configure Environment Variables

Make sure your `.env.local` file has the HubSpot configuration:

```bash
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id
NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID=your-form-guid  # Optional
```

### 3. Create Playwright Config (Optional)

If you want to customize the test configuration, create a `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

### Run specific test file
```bash
npx playwright test tests/hubspot.spec.ts
```

### Debug tests
```bash
npx playwright test --debug
```

## Test Coverage

The HubSpot test suite covers:

- ✅ **Tracking Script Loading**: Verifies HubSpot tracking script loads on all pages
- ✅ **No Duplicate Scripts**: Ensures script is only loaded once
- ✅ **Analytics Queue Initialization**: Confirms `_hsq` is properly initialized
- ✅ **Form Rendering**: Tests HubSpot form embed on contact page
- ✅ **Forms API Loading**: Verifies `hbspt.forms` is available
- ✅ **User Identification**: Tests `hsIdentify` functionality
- ✅ **Event Tracking**: Tests `hsTrack` functionality

## Conditional Test Execution

Tests automatically skip if environment variables are not configured:

- Main tests skip if `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is missing or set to `REPLACE_ME`
- Form tests skip if `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID` is missing or set to `REPLACE_ME`

This allows the test suite to run in environments where HubSpot is not yet configured without failing.

## CI/CD Integration

Add to your GitHub Actions or CI pipeline:

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npx playwright test
  env:
    NEXT_PUBLIC_HUBSPOT_PORTAL_ID: ${{ secrets.HUBSPOT_PORTAL_ID }}
    NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID: ${{ secrets.HUBSPOT_FORM_ID }}
```

## Troubleshooting

### Tests are skipped
- Ensure `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is set in `.env.local`
- Restart your dev server after changing env vars

### Form tests fail
- Verify `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID` is a valid Form ID (GUID)
- Check that the form exists in your HubSpot account
- Ensure the form is published and accessible

### Script loading timeouts
- Increase timeout in test: `{ timeout: 15000 }`
- Check network connectivity
- Verify portal ID is correct

