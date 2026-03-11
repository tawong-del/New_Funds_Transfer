import React, { useState, useCallback, useMemo } from 'react';
import './TransferFundsPage.css';

/* ──── Mock data ──── */

const MOCK_ACCOUNTS = [
  {
    id: 'tfsa-1',
    name: 'Individual TFSA - 12345677',
    type: 'Self-directed',
    category: 'TFSA',
    cadCash: 100.0,
    usdCash: 50.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 300.0,
  },
  {
    id: 'margin-1',
    name: 'Margin – 55566677',
    type: 'Self-directed',
    category: 'MARGIN',
    cadCash: 250.0,
    usdCash: 120.0,
    cadBuyingPower: 1500.0,
    usdBuyingPower: 800.0,
  },
  {
    id: 'rrsp-1',
    name: 'Self-directed RRSP - 77788899',
    type: 'Self-directed Individual',
    category: 'RRSP',
    cadCash: 100.0,
    usdCash: 50.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 300.0,
  },
  {
    id: 'resp-1',
    name: 'RESP – 77788899',
    type: 'Self-directed Joint',
    category: 'RESP',
    cadCash: 100.0,
    usdCash: 50.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 300.0,
  },
  {
    id: 'fhsa-1',
    name: 'FHSA – 88899900',
    type: 'Self-directed Individual',
    category: 'FHSA',
    cadCash: 200.0,
    usdCash: 75.0,
    cadBuyingPower: 200.0,
    usdBuyingPower: 75.0,
  },
  {
    id: 'lira-1',
    name: 'LIRA – 99900011',
    type: 'Self-directed Individual',
    category: 'LIRA',
    cadCash: 500.0,
    usdCash: 200.0,
    cadBuyingPower: 500.0,
    usdBuyingPower: 200.0,
  },
  {
    id: 'qwp-1',
    name: 'QWP – 11122233',
    type: 'Questwealth Portfolio',
    category: 'QWP',
    cadCash: 150.0,
    usdCash: 80.0,
    cadBuyingPower: 150.0,
    usdBuyingPower: 80.0,
    totalEquityCad: 500.0,
  },
  {
    id: 'fxcfd-1',
    name: 'FX & CFD \u2013 22233344',
    type: 'Self-directed Individual',
    category: 'FXCFD',
    cadCash: 300.0,
    usdCash: 150.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 150.0,
  },
];

const TFSA_LIMIT = 7000;
const RESTRICTED_FROM_CATEGORIES = ['LIRA', 'RIFF', 'LRSP', 'LIF'];

/* ──── Banner definitions ──── */

const FROM_BANNERS = {
  TFSA: {
    id: 'from-tfsa',
    variant: 'info',
    text: 'Transferring from a TFSA account: withdrawal amounts from your TFSA will be added to your contribution room at the beginning of the following year.',
  },
  RRSP: {
    id: 'from-rrsp',
    variant: 'info',
    text: 'Transferring from an RSP account: Transferring funds or investments is considered de-registration and a withholding tax may be deducted from the total amount transferred. If you are transferring assets to a RIF, it is treated as a \u2018rollover\u2019 and no withholding tax are applied. Learn more about internal transfers.',
  },
  FHSA: {
    id: 'from-fhsa',
    variant: 'info',
    text: 'Transfers from an FHSA to a Registered Retirement Savings Plan (RRSP) or Registered Retirement Income Fund (RRIF) are tax-free. The funds transferred will be subject to the usual rules applicable to these accounts, including taxability upon withdrawal. These transfers do not reduce, or are not limited by, an individual\u2019s available RRSP contribution room. They also do not reinstate an individual\u2019s FHSA lifetime contribution limit.',
  },
};

const TO_BANNERS = {
  TFSA: {
    id: 'to-tfsa',
    variant: 'info',
    text: `The annual TFSA contribution limit is $${TFSA_LIMIT.toLocaleString()}. Over-contribution is subject to a tax.`,
  },
  RESP: {
    id: 'to-resp',
    variant: 'info',
    text: 'Proof of enrollment is required when withdrawing from an RESP account. This information must be supplied to Human Resources Development Canada (HRDC) to ensure entitlement to any RESP grants.',
  },
  FHSA: {
    id: 'to-fhsa',
    variant: 'info',
    text: 'Transfers to a FHSA from a Registered Retirement Savings Plan (RRSP) are tax free and the amount is deducted from your FHSA contribution limit. Such transfers are also not income deductible and do not reinstate your RRSP contribution room.',
  },
  FXCFD: {
    id: 'to-fxcfd',
    variant: 'info',
    text: "All funds will settle in your account\u2019s base currency. Transfers not in your base currency will be converted and subject to a conversion fee.",
  },
};

function getAmountBanners(fromAccount, amount, currency) {
  const banners = [];
  if (!fromAccount || !amount) return banners;
  const num = parseFloat(amount);
  if (Number.isNaN(num) || num <= 0) return banners;

  if (fromAccount.category === 'MARGIN') {
    const cash = currency === 'CAD' ? fromAccount.cadCash : fromAccount.usdCash;
    if (num > cash) {
      banners.push({
        id: 'amt-margin',
        variant: 'warning',
        text: 'Interest charges: if there are insufficient funds to cover the amount you want to transfer, a negative balance is subject to interest charges.',
      });
    }
  }

  if (fromAccount.category === 'QWP') {
    const remainingEquity = (fromAccount.totalEquityCad || 0) - num;
    if (remainingEquity <= 100) {
      banners.push({
        id: 'amt-qwp-min',
        variant: 'warning',
        text: 'A minimum balance of CAD $100 is required in your portfolio account. If your request reduces your account balance below this amount, all investments in your account will be liquidated. Your account will no longer be managed until it has at least CAD $250. To close your account, call us at 1.888.783.7866.',
      });
    }
  }

  return banners;
}

function generateRefNumber() {
  return 'REF-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

/* ──── SVG Icons ──── */

function ChevronDown({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
      <path d="M14 24.5L21 31.5L34 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ size }) {
  const s = size || 20;
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="1" fill="currentColor" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L1 18H19L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="15" r="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}

/* ──── Banner component ──── */

function Banner({ banner, onDismiss }) {
  const variantClass = `TF-banner--${banner.variant}`;

  return (
    <div className={`TF-banner ${variantClass}`} role="status">
      {banner.variant === 'warning' ? (
        <WarningIcon />
      ) : banner.variant === 'danger' ? (
        <ErrorIcon />
      ) : (
        <InfoIcon />
      )}
      <span className="TF-banner-text">{banner.text}</span>
      {onDismiss && (
        <button type="button" className="TF-banner-dismiss" onClick={onDismiss} aria-label="Dismiss">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

/* ──── Balance table ──── */

function BalanceTable({ account }) {
  return (
    <table className="TF-balance-table">
      <thead>
        <tr>
          <th></th>
          <th>CAD</th>
          <th>USD</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cash</td>
          <td>${account.cadCash.toFixed(2)}</td>
          <td>${account.usdCash.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Buying power</td>
          <td>${account.cadBuyingPower.toFixed(2)}</td>
          <td>${account.usdBuyingPower.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
}

/* ──── Dialog overlay ──── */

function Dialog({ title, children, actions, onClose }) {
  return (
    <div className="TF-dialog-overlay" onClick={onClose}>
      <div className="TF-dialog" role="alertdialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h3 className="TF-dialog-title">{title}</h3>
        <div className="TF-dialog-body">{children}</div>
        <div className="TF-dialog-actions">{actions}</div>
      </div>
    </div>
  );
}

/* ──── Account selector (bordered dropdown per screenshots) ──── */

function AccountSelector({ label, account, accounts, onSelect, error, expanded, onToggle, disabledIds, disabledBannerText }) {
  return (
    <div className={`TF-field${error ? ' TF-field--error' : ''}`}>
      <label className="TF-label">{label}</label>
      <div className="TF-select-wrap">
        <button
          type="button"
          className={`TF-select${error ? ' TF-select--error' : ''}`}
          onClick={onToggle}
          aria-expanded={expanded}
          aria-haspopup="listbox"
        >
          <span className={account ? 'TF-select-value' : 'TF-select-placeholder'}>
            {account ? account.name : 'Select an account'}
          </span>
          <ChevronDown className={`TF-select-chevron${expanded ? ' TF-select-chevron--up' : ''}`} />
        </button>

        {expanded && (
          <div className="TF-dropdown" role="listbox" aria-label={label}>
            {accounts.map((acct) => {
              const isSelected = account && acct.id === account.id;
              const isDisabled = disabledIds && disabledIds.includes(acct.id);
              return (
                <button
                  key={acct.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                  className={`TF-dropdown-option${isSelected ? ' TF-dropdown-option--selected' : ''}${isDisabled ? ' TF-dropdown-option--disabled' : ''}`}
                  onClick={() => !isDisabled && onSelect(acct.id)}
                >
                  <span className="TF-dropdown-option-radio">
                    {isSelected && <span className="TF-dropdown-option-dot" />}
                  </span>
                  <span className="TF-dropdown-option-info">
                    <span className="TF-dropdown-option-name">{acct.name}</span>
                    <span className="TF-dropdown-option-type">{acct.type}</span>
                  </span>
                  <span className="TF-dropdown-option-bals">
                    <span>${acct.cadCash.toFixed(0)} CAD</span>
                    <span>${acct.usdCash.toFixed(0)} USD</span>
                  </span>
                </button>
              );
            })}
            {disabledBannerText && (
              <div className="TF-dropdown-banner">
                <Banner banner={{ id: 'restricted', variant: 'warning', text: disabledBannerText }} />
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="TF-field-error" role="alert">
          <ErrorIcon />
          <span>{error}</span>
        </div>
      )}

      {!expanded && account && <BalanceTable account={account} />}
    </div>
  );
}

/* ──── Confirmation Screen ──── */

function ConfirmScreen({ fromAccount, toAccount, amount, currency, dangerBanners, onConfirm, onBack, onCancel }) {
  return (
    <div className="TF-step-screen">
      <div className="TF-step-header">
        <button type="button" className="TF-step-back" onClick={onBack} aria-label="Back">
          <ArrowLeft />
        </button>
        <h2 className="TF-step-title">Confirm transfer</h2>
        <button type="button" className="TF-step-close" onClick={onCancel} aria-label="Cancel">
          <CloseIcon />
        </button>
      </div>

      <div className="TF-confirm-card">
        {dangerBanners.length > 0 && (
          <div className="TF-confirm-banners">
            {dangerBanners.map((b) => <Banner key={b.id} banner={b} />)}
          </div>
        )}

        <div className="TF-confirm-row">
          <span className="TF-confirm-label">From</span>
          <div className="TF-confirm-value">
            <span className="TF-confirm-acct-name">{fromAccount.name}</span>
            <span className="TF-confirm-acct-type">{fromAccount.type}</span>
          </div>
        </div>

        <div className="TF-confirm-divider" />

        <div className="TF-confirm-row">
          <span className="TF-confirm-label">To</span>
          <div className="TF-confirm-value">
            <span className="TF-confirm-acct-name">{toAccount.name}</span>
            <span className="TF-confirm-acct-type">{toAccount.type}</span>
          </div>
        </div>

        <div className="TF-confirm-divider" />

        <div className="TF-confirm-row">
          <span className="TF-confirm-label">Amount</span>
          <span className="TF-confirm-amount">${parseFloat(amount).toFixed(2)} {currency}</span>
        </div>

        <div className="TF-confirm-divider" />

        <p className="TF-confirm-note">
          While many internal transfers are instant, some take up to 3 business days to process.
        </p>

        <button type="button" className="TF-btn TF-btn--primary" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

/* ──── Success Screen ──── */

function SuccessScreen({ referenceNumber, onDone }) {
  return (
    <div className="TF-step-screen TF-success-screen">
      <div className="TF-success-icon">
        <CheckCircleIcon />
      </div>
      <h2 className="TF-success-title">Transfer submitted</h2>
      <p className="TF-success-text">
        While many internal transfers are instant, some take up to 3 business days to process.
      </p>
      <div className="TF-success-ref">
        <span className="TF-success-ref-label">Reference number</span>
        <span className="TF-success-ref-value">{referenceNumber}</span>
      </div>
      <button type="button" className="TF-btn TF-btn--primary TF-success-done" onClick={onDone}>
        Done
      </button>
    </div>
  );
}

/* ──── Main page ──── */

function TransferFundsPage() {
  const [step, setStep] = useState('form');
  const [amount, setAmount] = useState('');
  const [currency] = useState('CAD');
  const [fromAccountId, setFromAccountId] = useState(MOCK_ACCOUNTS[0].id);
  const [toAccountId, setToAccountId] = useState('');
  const [fromExpanded, setFromExpanded] = useState(false);
  const [toExpanded, setToExpanded] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [fromError, setFromError] = useState('');
  const [toError, setToError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionTitle, setRejectionTitle] = useState('');
  const [rejectionMessage, setRejectionMessage] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  const fromAccount = MOCK_ACCOUNTS.find((a) => a.id === fromAccountId);
  const toAccount = MOCK_ACCOUNTS.find((a) => a.id === toAccountId);

  const isFromRestricted = fromAccount && RESTRICTED_FROM_CATEGORIES.includes(fromAccount.category);
  const disabledToIds = useMemo(() => {
    if (!isFromRestricted) return [];
    return MOCK_ACCOUNTS.filter((a) => a.category === 'RRSP').map((a) => a.id);
  }, [isFromRestricted]);

  const disabledBannerText = isFromRestricted
    ? `RRSP accounts are not available as a destination when transferring from a ${fromAccount.category} account.`
    : '';

  const toAccountOptions = MOCK_ACCOUNTS.filter((a) => a.id !== fromAccountId);

  const amountBanners = useMemo(
    () => getAmountBanners(fromAccount, amount, currency),
    [fromAccount, amount, currency]
  );

  const dangerBanners = useMemo(() => {
    const banners = [];
    if (fromAccount && FROM_BANNERS[fromAccount.category]) banners.push(FROM_BANNERS[fromAccount.category]);
    if (toAccount && TO_BANNERS[toAccount.category]) banners.push(TO_BANNERS[toAccount.category]);
    amountBanners.filter((b) => b.variant === 'danger').forEach((b) => banners.push(b));
    return banners;
  }, [fromAccount, toAccount, amountBanners]);

  const validateAmount = useCallback((val) => {
    if (!val || val.trim() === '') return 'Please enter an amount';
    const num = parseFloat(val);
    if (Number.isNaN(num) || num <= 0) return 'Please enter an amount';
    if (num < 1) return 'Please enter an amount of $1 or more';
    return '';
  }, []);

  const handleNext = () => {
    setSubmitted(true);
    const aErr = validateAmount(amount);
    const fErr = !fromAccountId ? 'Please select an account' : '';
    const tErr = !toAccountId ? 'Please select an account' : '';
    setAmountError(aErr);
    setFromError(fErr);
    setToError(tErr);
    if (aErr || fErr || tErr) return;
    setFromExpanded(false);
    setToExpanded(false);
    setStep('confirm');
  };

  const handleConfirm = () => {
    const shouldReject = false;
    if (shouldReject) {
      setRejectionTitle('Transfer not permitted');
      setRejectionMessage('The transfer could not be completed. Please contact support for assistance.');
      setShowRejectionDialog(true);
    } else {
      setReferenceNumber(generateRefNumber());
      setStep('success');
    }
  };

  const handleDone = () => {
    setStep('form');
    setAmount('');
    setFromAccountId(MOCK_ACCOUNTS[0].id);
    setToAccountId('');
    setSubmitted(false);
    setAmountError('');
    setFromError('');
    setToError('');
  };

  const handleCancelTransfer = () => {
    setShowCancelDialog(false);
    handleDone();
  };

  const handleAmountChange = (e) => {
    const v = e.target.value;
    setAmount(v);
    if (submitted) setAmountError(validateAmount(v));
  };

  const handleAmountBlur = () => {
    if (submitted) setAmountError(validateAmount(amount));
  };

  const selectFrom = (id) => {
    setFromAccountId(id);
    setFromError('');
    setFromExpanded(false);
    if (id === toAccountId) setToAccountId('');
    const newFrom = MOCK_ACCOUNTS.find((a) => a.id === id);
    if (newFrom && RESTRICTED_FROM_CATEGORIES.includes(newFrom.category)) {
      const to = MOCK_ACCOUNTS.find((a) => a.id === toAccountId);
      if (to && to.category === 'RRSP') setToAccountId('');
    }
  };

  const selectTo = (id) => {
    setToAccountId(id);
    setToError('');
    setToExpanded(false);
  };

  const toggleFromExpanded = () => {
    setFromExpanded((v) => !v);
    if (!fromExpanded) setToExpanded(false);
  };

  const toggleToExpanded = () => {
    setToExpanded((v) => !v);
    if (!toExpanded) setFromExpanded(false);
  };

  const handleSwap = () => {
    if (!fromAccountId || !toAccountId) return;
    const prevFrom = fromAccountId;
    const prevTo = toAccountId;
    setFromAccountId(prevTo);
    setToAccountId(prevFrom);
    setFromError('');
    setToError('');
  };

  /* ──── Success step ──── */
  if (step === 'success') {
    return (
      <div className="TF">
        <a href="#back" className="TF-breadcrumb" onClick={(e) => { e.preventDefault(); handleDone(); }}>
          <ArrowLeft /> Back to Move money
        </a>
        <h1 className="TF-page-title">Transfer funds</h1>
        <SuccessScreen referenceNumber={referenceNumber} onDone={handleDone} />
      </div>
    );
  }

  /* ──── Confirmation step ──── */
  if (step === 'confirm') {
    return (
      <div className="TF">
        <a href="#back" className="TF-breadcrumb" onClick={(e) => { e.preventDefault(); setStep('form'); }}>
          <ArrowLeft /> Back to Transfer funds
        </a>
        <h1 className="TF-page-title">Transfer funds</h1>

        <ConfirmScreen
          fromAccount={fromAccount}
          toAccount={toAccount}
          amount={amount}
          currency={currency}
          dangerBanners={dangerBanners}
          onConfirm={handleConfirm}
          onBack={() => setStep('form')}
          onCancel={() => setShowCancelDialog(true)}
        />

        {showCancelDialog && (
          <Dialog
            title="Cancel transfer?"
            onClose={() => setShowCancelDialog(false)}
            actions={
              <>
                <button type="button" className="TF-dialog-btn TF-dialog-btn--secondary" onClick={() => setShowCancelDialog(false)}>
                  Go back
                </button>
                <button type="button" className="TF-dialog-btn TF-dialog-btn--danger" onClick={handleCancelTransfer}>
                  Cancel transfer
                </button>
              </>
            }
          >
            <p>Your transfer details will not be saved. Are you sure you want to cancel?</p>
          </Dialog>
        )}

        {showRejectionDialog && (
          <Dialog
            title={rejectionTitle}
            onClose={() => setShowRejectionDialog(false)}
            actions={
              <button type="button" className="TF-dialog-btn TF-dialog-btn--primary" onClick={() => setShowRejectionDialog(false)}>
                OK
              </button>
            }
          >
            <p>{rejectionMessage}</p>
          </Dialog>
        )}
      </div>
    );
  }

  /* ──── Form step ──── */
  return (
    <div className="TF">
      <a href="#back" className="TF-breadcrumb" onClick={(e) => e.preventDefault()}>
        <ArrowLeft /> Back to Choose a transfer type
      </a>
      <h1 className="TF-page-title">Transfer funds</h1>
      <p className="TF-page-desc">
        Transfer Canadian or U.S. funds from one of your Questrade accounts to another by
        completing the form below. Your accounts must have the same ownership structure
        (same name on each account).
      </p>
      <p className="TF-page-desc">
        Note: if you want to transfer funds from another broker, go to{' '}
        <a href="https://my.questrade.com/clients/en/my_requests/transfer_from_broker.aspx" className="TF-link">
          Transfer from another broker
        </a>.
      </p>

      <div className="TF-grid">
        <div className="TF-form-column">
          {/* From account */}
          <AccountSelector
            label="From account"
            account={fromAccount}
            accounts={MOCK_ACCOUNTS}
            onSelect={selectFrom}
            error={fromError}
            expanded={fromExpanded}
            onToggle={toggleFromExpanded}
          />

          {/* Swap */}
          <div className="TF-swap-row">
            <button
              type="button"
              className="TF-swap-btn"
              onClick={handleSwap}
              disabled={!fromAccountId || !toAccountId}
              aria-label="Swap from and to accounts"
            >
              <SwapIcon />
            </button>
          </div>

          {/* To account */}
          <AccountSelector
            label="To account"
            account={toAccount}
            accounts={toAccountOptions}
            onSelect={selectTo}
            error={toError}
            expanded={toExpanded}
            onToggle={toggleToExpanded}
            disabledIds={disabledToIds}
            disabledBannerText={disabledBannerText}
          />

          {/* Amount */}
          <div className={`TF-field${amountError ? ' TF-field--error' : ''}`}>
            <label className="TF-label" htmlFor="tf-amount">Amount</label>
            <div className="TF-amount-row">
              <div className={`TF-input-wrap${amountError ? ' TF-input-wrap--error' : ''}`}>
                <span className="TF-input-prefix">$</span>
                <input
                  id="tf-amount"
                  className="TF-input"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  onBlur={handleAmountBlur}
                  placeholder="0.00"
                  aria-label="Transfer amount"
                  aria-invalid={!!amountError}
                />
              </div>
              <button type="button" className="TF-currency-chip" aria-label={`Currency: ${currency}`}>
                {currency}
                <ChevronDown className="TF-chip-chevron" />
              </button>
            </div>
            {amountError && (
              <div className="TF-field-error" role="alert">
                <ErrorIcon />
                <span>{amountError}</span>
              </div>
            )}
          </div>

          {/* Next button */}
          <button type="button" className="TF-btn TF-btn--primary" onClick={handleNext}>
            Next
          </button>

          {/* Disclosure link */}
          <a href="#disclosure" className="TF-disclosure-link" onClick={(e) => e.preventDefault()}>
            View disclosure
          </a>
        </div>

        {/* Right sidebar — alert/warning banners */}
        <aside className="TF-sidebar">
          {(fromAccount && FROM_BANNERS[fromAccount.category]) && (
            <Banner banner={FROM_BANNERS[fromAccount.category]} />
          )}
          {(toAccount && TO_BANNERS[toAccount.category]) && (
            <Banner banner={TO_BANNERS[toAccount.category]} />
          )}
          {amountBanners.map((b) => <Banner key={b.id} banner={b} />)}
          <button type="button" className="TF-help-btn" aria-label="Help">
            <HelpCircleIcon />
          </button>
        </aside>
      </div>
    </div>
  );
}

export default TransferFundsPage;
