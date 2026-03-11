# Internal Funds Transfer (Web) — User Stories & Acceptance Criteria

This document lists every user story the current Internal Funds Transfer web prototype fulfils, together with the acceptance criteria for each story.

Source of truth: the implemented code in `src/pages/TransferFundsPage.js`, `src/App.js`, `src/App.css`, `src/pages/TransferFundsPage.css`, and `src/tokens.css`.

---

## Table of Contents

| ID | Story |
|----|-------|
| [US-01](#us-01--enter-transfer-amount) | Enter Transfer Amount |
| [US-02](#us-02--select-from-account) | Select "From" Account |
| [US-03](#us-03--select-to-account) | Select "To" Account |
| [US-04](#us-04--swap-from-and-to-accounts) | Swap From and To Accounts |
| [US-05](#us-05--view-account-balances) | View Account Balances |
| [US-06](#us-06--submit-transfer-for-review) | Submit Transfer for Review |
| [US-07](#us-07--confirm-transfer) | Confirm Transfer |
| [US-08](#us-08--transfer-success) | Transfer Success |
| [US-09](#us-09--cancel-transfer) | Cancel Transfer |
| [US-10](#us-10--amount-validation) | Amount Validation |
| [US-11](#us-11--account-selection-validation) | Account Selection Validation |
| [US-12](#us-12--account-type-banners) | Account-Type Banners |
| [US-13](#us-13--amount-based-warnings) | Amount-Based Warnings |
| [US-14](#us-14--restricted-account-rules) | Restricted Account Rules |
| [US-15](#us-15--breadcrumb-navigation) | Breadcrumb Navigation |
| [US-16](#us-16--confirmation-step-navigation) | Confirmation Step Navigation |
| [US-17](#us-17--responsive-layout) | Responsive Layout |
| [US-18](#us-18--lightdark-theme) | Light/Dark Theme |
| [US-19](#us-19--app-shell-navigation) | App Shell Navigation |
| [US-20](#us-20--accessibility-support) | Accessibility Support |

---

## Core Transfer Flow

### US-01 — Enter Transfer Amount

**As a** client,
**I want to** enter a dollar amount for my internal funds transfer,
**so that** I can specify how much money to move between my accounts.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | The form step displays an input field with a `$` prefix and a label "Amount" linked to the input via `htmlFor`. |
| 2 | The input uses `inputMode="decimal"` so that mobile devices present a numeric keyboard. |
| 3 | The input shows a placeholder of `0.00`. |
| 4 | A currency chip displays the fixed currency "CAD" next to the amount input. |
| 5 | The currency chip shows a chevron icon but does not allow currency switching. |
| 6 | The user can type, edit, and clear the amount value freely. |

---

### US-02 — Select "From" Account

**As a** client,
**I want to** select which account to transfer funds from,
**so that** the correct source account is debited.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | The first account in the list is pre-selected as the default "From" account on page load. |
| 2 | A dropdown trigger button displays the selected account name or the placeholder "Select an account" if none is selected. |
| 3 | Tapping the dropdown trigger toggles an inline dropdown panel open or closed. The chevron rotates to indicate the current state. |
| 4 | The dropdown panel lists all available accounts as selectable options with radio-style indicators. |
| 5 | Each option shows the account name, account type, CAD cash balance, and USD cash balance. |
| 6 | The currently selected account is visually highlighted with a filled radio dot and a selected option style. |
| 7 | Tapping an option selects that account, clears any existing selection error, and closes the dropdown. |
| 8 | If the newly selected "From" account is the same as the current "To" account, the "To" account is cleared. |
| 9 | The dropdown uses `role="listbox"` and each option uses `role="option"` with `aria-selected`. |

---

### US-03 — Select "To" Account

**As a** client,
**I want to** select which account to transfer funds to,
**so that** the correct destination account is credited.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | No "To" account is pre-selected by default; the dropdown trigger shows "Select an account" placeholder text. |
| 2 | The dropdown trigger toggles an inline dropdown panel listing all accounts except the currently selected "From" account. |
| 3 | Each option displays the account name, account type, CAD cash balance, and USD cash balance. |
| 4 | The currently selected account is visually highlighted with a filled radio dot and a selected option style. |
| 5 | Tapping an option selects that account, clears any existing selection error, and closes the dropdown. |
| 6 | The dropdown uses `role="listbox"` and each option uses `role="option"` with `aria-selected`. |

---

### US-04 — Swap From and To Accounts

**As a** client,
**I want to** swap my selected "From" and "To" accounts with a single action,
**so that** I can quickly reverse the transfer direction without reselecting both accounts.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | A circular swap button with a swap icon is displayed between the "From" and "To" account selectors. |
| 2 | Tapping the swap button exchanges the "From" and "To" account selections. |
| 3 | The swap button is disabled when either the "From" or "To" account is not selected. |
| 4 | Swapping clears any existing account validation errors. |
| 5 | The button has `aria-label="Swap from and to accounts"`. |

---

### US-05 — View Account Balances

**As a** client,
**I want to** view the balances of my selected accounts,
**so that** I can make an informed decision about how much to transfer.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | When a "From" or "To" account is selected and its dropdown is collapsed, a balance table is displayed inline below the dropdown trigger. |
| 2 | The balance table is rendered as an HTML `<table>` with column headers "CAD" and "USD". |
| 3 | The table displays two rows: "Cash" (CAD and USD values) and "Buying power" (CAD and USD values). |
| 4 | All monetary values are formatted to two decimal places (e.g., `$100.00`). |
| 5 | The balance table is hidden when the account dropdown is expanded. |
| 6 | If no account is selected, the balance table is not shown. |

---

### US-06 — Submit Transfer for Review

**As a** client,
**I want to** submit my transfer details for review,
**so that** I can verify the transfer before confirming it.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | A "Next" button is displayed below the amount input on the form step. |
| 2 | Tapping "Next" triggers validation on the amount, the "From" account, and the "To" account. |
| 3 | If all validations pass, the user is navigated to the confirmation screen. |
| 4 | Both account dropdowns are collapsed when navigating to the confirmation screen. |
| 5 | A "View disclosure" link is displayed below the Next button. |

---

### US-07 — Confirm Transfer

**As a** client,
**I want to** review my transfer details on a confirmation screen before finalizing,
**so that** I can verify the From account, To account, and amount are correct.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | The confirmation screen displays a card with the transfer details: From account (name and type), To account (name and type), and Amount (formatted to two decimal places with currency). |
| 2 | Each detail is separated by a horizontal divider. |
| 3 | The confirmation note reads: "While many internal transfers are instant, some take up to 3 business days to process." |
| 4 | A "Confirm" button is displayed at the bottom of the confirmation card. |
| 5 | Tapping "Confirm" navigates the user to the success screen and generates a reference number. |
| 6 | Any relevant account-type informational banners (From and To) are displayed at the top of the confirmation card. |

---

### US-08 — Transfer Success

**As a** client,
**I want to** see confirmation that my transfer has been submitted successfully,
**so that** I know the request is being processed and I have a reference number for tracking.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | The success screen displays a large check-circle icon. |
| 2 | The title reads "Transfer submitted". |
| 3 | The description reads: "While many internal transfers are instant, some take up to 3 business days to process." |
| 4 | A reference number is displayed in a styled card with a "Reference number" label and a monospace-formatted value. |
| 5 | The reference number is generated uniquely for each transfer (format: `REF-<timestamp>-<random>`). |
| 6 | A "Done" button is displayed below the reference number. |
| 7 | Tapping "Done" resets the form (clears amount, resets accounts to defaults, clears errors) and returns to the form step. |

---

### US-09 — Cancel Transfer

**As a** client,
**I want to** cancel my transfer from the confirmation screen,
**so that** I can abandon the transfer if I change my mind.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | On the confirmation screen, tapping the close (X) button opens a cancel confirmation dialog. |
| 2 | The dialog title reads "Cancel transfer?" and the body reads "Your transfer details will not be saved. Are you sure you want to cancel?" |
| 3 | The dialog displays two buttons: "Go back" (secondary) and "Cancel transfer" (danger). |
| 4 | Tapping "Go back" closes the dialog and returns the user to the confirmation screen. |
| 5 | Tapping "Cancel transfer" closes the dialog, resets the entire form, and returns the user to the form step. |
| 6 | Tapping the overlay behind the dialog closes the dialog without cancelling. |
| 7 | The dialog uses `role="alertdialog"` with an `aria-label` matching the dialog title. |

---

## Validation

### US-10 — Amount Validation

**As a** client,
**I want to** receive clear error messages when I enter an invalid transfer amount,
**so that** I can correct my input before submitting.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | **Given** the amount field is empty or whitespace only, **when** the user taps "Next", **then** the error "Please enter an amount" is displayed. |
| 2 | **Given** the amount is not a valid number or is zero or negative, **when** the user taps "Next", **then** the error "Please enter an amount" is displayed. |
| 3 | **Given** the amount is a valid number but less than $1, **when** the user taps "Next", **then** the error "Please enter an amount of $1 or more" is displayed. |
| 4 | After the first submission attempt, validation also runs on blur (when the input loses focus) and on every keystroke, providing real-time feedback. |
| 5 | The error message is displayed below the amount input with a red error icon. |
| 6 | The amount input wrapper border turns red and `aria-invalid="true"` is set when an error is active. |
| 7 | The error message has `role="alert"` for screen reader announcement. |

---

### US-11 — Account Selection Validation

**As a** client,
**I want to** be informed when I have not selected an account,
**so that** I can complete the required selections before proceeding.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | **Given** no "From" account is selected, **when** the user taps "Next", **then** the error "Please select an account" is displayed below the "From account" dropdown. |
| 2 | **Given** no "To" account is selected, **when** the user taps "Next", **then** the error "Please select an account" is displayed below the "To account" dropdown. |
| 3 | The error message appears below the dropdown trigger with a red error icon. |
| 4 | The dropdown trigger border turns red (`TF-select--error`) when the error is active. |
| 5 | Selecting an account immediately clears the error for that field. |
| 6 | The error message has `role="alert"` for screen reader announcement. |

---

## Contextual Information

### US-12 — Account-Type Banners

**As a** client,
**I want to** see relevant informational banners when I select certain account types,
**so that** I understand the tax and contribution implications of my transfer.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | **Given** the "From" account is a TFSA, **then** an info banner is displayed stating that TFSA withdrawal amounts are added to contribution room at the beginning of the following year. |
| 2 | **Given** the "From" account is an RRSP, **then** an info banner is displayed stating that transferring from an RSP account is considered de-registration and withholding tax may apply, with details about RRIF rollovers. |
| 3 | **Given** the "From" account is an FHSA, **then** an info banner is displayed explaining tax-free FHSA-to-RRSP/RRIF transfers and contribution limit rules. |
| 4 | **Given** the "To" account is a TFSA, **then** an info banner is displayed stating the annual TFSA contribution limit ($7,000) and that over-contribution is subject to tax. |
| 5 | **Given** the "To" account is an RESP, **then** an info banner is displayed stating that proof of enrollment is required when withdrawing from an RESP account. |
| 6 | **Given** the "To" account is an FHSA, **then** an info banner is displayed explaining tax-free RRSP-to-FHSA transfers and contribution limit deductions. |
| 7 | **Given** the "To" account is an FX & CFD account, **then** an info banner is displayed stating that all funds will settle in the account's base currency and transfers not in the base currency will be converted and subject to a conversion fee. |
| 8 | Account-type banners are displayed below the account selector when the dropdown is collapsed. |
| 9 | Account-type banners use `role="status"` and include an info icon. |

---

### US-13 — Amount-Based Warnings

**As a** client,
**I want to** see warnings when the transfer amount exceeds certain thresholds,
**so that** I am aware of potential interest charges or investment liquidation risks.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | **Given** the "From" account is a Margin account and the amount exceeds the available cash balance in the selected currency, **then** a warning banner is displayed about interest charges on negative balances. |
| 2 | **Given** the "From" account is a QWP (Questwealth Portfolio) account and the transfer would reduce the account equity below $100, **then** a warning banner is displayed stating a minimum balance of CAD $100 is required, that all investments will be liquidated if the balance falls below this amount, that the account will no longer be managed until it has at least CAD $250, and providing a phone number to call to close the account. |
| 3 | Warning banners use a caution (amber) background with a warning triangle icon. |
| 4 | Amount-based banners appear below the amount input field. |

---

### US-14 — Restricted Account Rules

**As a** client,
**I want to** be prevented from selecting invalid destination accounts based on the source account type,
**so that** I do not initiate a transfer that would be rejected.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | **Given** the "From" account category is LIRA, RIFF, LRSP, or LIF, **then** RRSP accounts are disabled in the "To" account dropdown. |
| 2 | Disabled accounts appear greyed out (`opacity: 0.45`) with `cursor: not-allowed` and cannot be clicked. |
| 3 | Disabled accounts have `aria-disabled="true"` and the HTML `disabled` attribute set. |
| 4 | A warning banner is displayed inside the dropdown explaining that RRSP accounts are not available as a destination when transferring from the restricted account type. |
| 5 | If a "To" account was previously selected and becomes restricted after a "From" account change, the "To" selection is cleared. |

---

## Navigation

### US-15 — Breadcrumb Navigation

**As a** client,
**I want to** see a breadcrumb link above the page title,
**so that** I understand my position in the application flow and can navigate back.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | On the form step, a breadcrumb link reads "Back to Choose a transfer type" with a left arrow icon. |
| 2 | On the confirmation step, a breadcrumb link reads "Back to Transfer funds" with a left arrow icon and navigates back to the form step. |
| 3 | On the success step, a breadcrumb link reads "Back to Move money" with a left arrow icon and resets the form to the initial state. |
| 4 | The page title "Transfer funds" is displayed below the breadcrumb on every step. |

---

### US-16 — Confirmation Step Navigation

**As a** client,
**I want to** navigate within the confirmation step using back and cancel controls,
**so that** I can return to edit my transfer or abandon it.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | The confirmation screen displays a step header with a back arrow (left), the title "Confirm transfer" (center), and a close icon (right). |
| 2 | Tapping the back arrow returns the user to the form step with their previous selections preserved. |
| 3 | Tapping the close icon opens the cancel transfer dialog (see US-09). |
| 4 | The back arrow has `aria-label="Back"` and the close icon has `aria-label="Cancel"`. |

---

## Responsive and Theming

### US-17 — Responsive Layout

**As a** user,
**I want** the application to adapt to my screen size,
**so that** I have an optimal experience on both mobile and desktop devices.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | On screens 768px wide and above, the form displays in a two-column grid layout: the form column (max 540px) and a sidebar column (260px). |
| 2 | On screens below 768px, the form displays in a single-column layout. |
| 3 | The left sidebar navigation icons are visible on screens 768px and above, and hidden below 768px. |
| 4 | The top navigation tab bar is visible on screens 768px and above, and hidden below 768px. |
| 5 | Content padding adjusts from larger spacing on desktop to smaller spacing on mobile. |
| 6 | The main content area has a maximum width of 1100px. |

---

### US-18 — Light/Dark Theme

**As a** user,
**I want to** switch between light and dark themes,
**so that** I can use the application comfortably in different lighting conditions.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | The application defaults to the light theme. |
| 2 | The user can toggle between light and dark themes by clicking the icon button in the top navigation bar's right section. |
| 3 | The toggle button has a descriptive `aria-label` indicating the target theme (e.g., "Switch to dark theme"). |
| 4 | Selecting a theme applies the corresponding `data-theme` attribute (`light` or `dark`) to the `<html>` element. |
| 5 | The selected theme is persisted in `localStorage` under the key `ift-theme`. |
| 6 | On subsequent visits, the persisted theme preference is restored automatically. |
| 7 | All UI elements (backgrounds, text, borders, icons, banners, buttons, shadows) respect the active theme via CSS custom properties defined in `tokens.css`. |
| 8 | Dark theme overrides are provided for interactive hover states (banner dismiss, dropdown options, swap button, step navigation buttons). |

---

## App Shell

### US-19 — App Shell Navigation

**As a** user,
**I want** the application to provide a consistent navigation shell,
**so that** I can orient myself within the broader platform.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | A sticky top navigation bar is displayed with a hamburger menu button (left), navigation tabs (center), and user controls (right). |
| 2 | The navigation tabs include: Summary, Move money, Documents, Reports, Management, Apps, Products, and Tools. |
| 3 | The "Move money" tab is highlighted as the active tab. |
| 4 | The right section displays a mail/notification icon button and a user avatar showing the initial "D". |
| 5 | A left sidebar displays icon buttons for Accounts, Transfer, and History (visible on desktop, hidden on mobile). |
| 6 | The sidebar has `aria-label="Section navigation"`. |
| 7 | The main content area renders the `TransferFundsPage` component. |

---

## Accessibility

### US-20 — Accessibility Support

**As a** user relying on assistive technology,
**I want** the transfer flow to be accessible,
**so that** I can complete a funds transfer using a screen reader or keyboard.

#### Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | The transfer amount input has `aria-label="Transfer amount"`. |
| 2 | When the amount input has a validation error, `aria-invalid="true"` is set on the input element. |
| 3 | The "From account" and "To account" dropdown triggers have `aria-expanded` set to `true` or `false` reflecting their current state, and `aria-haspopup="listbox"`. |
| 4 | All validation error messages use `role="alert"` so screen readers announce them immediately. |
| 5 | Contextual banners and the success banner use `role="status"` for polite screen reader announcement. |
| 6 | The confirmation step back button has `aria-label="Back"` and the close button has `aria-label="Cancel"`. |
| 7 | The cancel dialog uses `role="alertdialog"` with `aria-label` matching the dialog title. |
| 8 | The currency chip has `aria-label="Currency: CAD"`. |
| 9 | Account dropdown options use `role="option"` with `aria-selected` to indicate the selected state. |
| 10 | Disabled account options have `aria-disabled="true"` and the HTML `disabled` attribute. |
| 11 | The swap button has `aria-label="Swap from and to accounts"`. |
| 12 | The top navigation bar uses `role="navigation"`. |
| 13 | The left sidebar has `aria-label="Section navigation"`. |
| 14 | The banner dismiss buttons have `aria-label="Dismiss"`. |
| 15 | Interactive elements support keyboard focus with visible `focus-visible` outlines using the `--ads-color-focus-400` token. |
