import React, { useState, useCallback } from 'react';
import './TransferFundsPage.css';

const MOCK_ACCOUNTS = [
  {
    id: 'tfsa-1',
    name: 'Honeymoon vacation -',
    type: 'Self-directed TFSA - 12345677',
    cadCash: 100.0,
    usdCash: 50.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 300.0,
  },
  {
    id: 'tfsa-2',
    name: 'TFSA \u2013 44455566',
    type: 'Self-directed Individual',
    cadCash: 100.0,
    usdCash: 50.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 300.0,
  },
  {
    id: 'resp-1',
    name: 'RESP \u2013 77788899',
    type: 'Self-directed Joint',
    cadCash: 100.0,
    usdCash: 50.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 300.0,
  },
  {
    id: 'rrsp-1',
    name: 'RRSP \u2013 77788899',
    type: 'Self-directed Individual',
    cadCash: 100.0,
    usdCash: 50.0,
    cadBuyingPower: 300.0,
    usdBuyingPower: 300.0,
  },
];

function ChevronDown({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowBack() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
    </svg>
  );
}

function InfoIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke={color || 'currentColor'} strokeWidth="1.5" />
      <path d="M10 9V14" stroke={color || 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="1" fill={color || 'currentColor'} />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="var(--ift-red-dark)" strokeWidth="1.5" />
      <path d="M10 6V11" stroke="var(--ift-red-dark)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="1" fill="var(--ift-red-dark)" />
    </svg>
  );
}

function BalanceTable({ account }) {
  return (
    <div className="TFP-balance-table">
      <div className="TFP-balance-combined">
        <span className="TFP-balance-combined-label">Combined</span>
        <span className="TFP-balance-combined-toggle" aria-label="Combined toggle on">
          <span className="TFP-toggle-track"><span className="TFP-toggle-thumb" /></span>
        </span>
        <span className="TFP-balance-col-header">USD</span>
        <span className="TFP-balance-col-header">CAD</span>
      </div>
      <div className="TFP-balance-row">
        <span className="TFP-balance-row-label">Cash</span>
        <span className="TFP-balance-row-val">${account.usdCash.toFixed(2)}</span>
        <span className="TFP-balance-row-val">${account.cadCash.toFixed(2)}</span>
      </div>
      <div className="TFP-balance-row">
        <span className="TFP-balance-row-label">Buying power</span>
        <span className="TFP-balance-row-val">${account.usdBuyingPower.toFixed(2)}</span>
        <span className="TFP-balance-row-val">${account.cadBuyingPower.toFixed(2)}</span>
      </div>
    </div>
  );
}

function TransferFundsPage() {
  const [step, setStep] = useState('amount');
  const [amount, setAmount] = useState('');
  const [currency] = useState('CAD');
  const [fromAccountId, setFromAccountId] = useState(MOCK_ACCOUNTS[0].id);
  const [toAccountId, setToAccountId] = useState('');
  const [fromExpanded, setFromExpanded] = useState(true);
  const [toExpanded, setToExpanded] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [selectError, setSelectError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fromAccount = MOCK_ACCOUNTS.find((a) => a.id === fromAccountId);
  const toAccount = MOCK_ACCOUNTS.find((a) => a.id === toAccountId);
  const toAccountOptions = MOCK_ACCOUNTS.filter((a) => a.id !== fromAccountId);

  const validateAmount = useCallback((val) => {
    if (!val || val.trim() === '') return 'Please enter an amount';
    const num = parseFloat(val);
    if (Number.isNaN(num) || num <= 0) return 'Please enter an amount';
    if (num < 1) return 'Please enter an amount of $1 or more';
    return '';
  }, []);

  const handleNext = () => {
    if (step === 'amount') {
      setSubmitted(true);
      const err = validateAmount(amount);
      setAmountError(err);
      if (err) return;
      if (!fromAccountId || !toAccountId) return;
      setShowSuccess(true);
      setStep('amount');
    } else if (step === 'selectFrom') {
      if (!fromAccountId) {
        setSelectError('Please select an account');
        return;
      }
      setSelectError('');
      setStep('amount');
    } else if (step === 'selectTo') {
      if (!toAccountId) {
        setSelectError('Please select an account');
        return;
      }
      setSelectError('');
      setStep('amount');
    }
  };

  const handleBack = () => {
    if (step === 'selectFrom' || step === 'selectTo') {
      setSelectError('');
      setStep('amount');
    }
  };

  const handleAmountChange = (e) => {
    const v = e.target.value;
    setAmount(v);
    if (submitted) setAmountError(validateAmount(v));
  };

  const handleAmountBlur = () => {
    if (submitted) setAmountError(validateAmount(amount));
  };

  /* ───── Account selection step ───── */
  if (step === 'selectFrom' || step === 'selectTo') {
    const isFrom = step === 'selectFrom';
    const accounts = isFrom ? MOCK_ACCOUNTS : toAccountOptions;
    const selectedId = isFrom ? fromAccountId : toAccountId;
    const setSelectedId = isFrom ? setFromAccountId : setToAccountId;
    const hasError = !!selectError;

    return (
      <div className="TFP" aria-label="Transfer funds">
        {/* Nav */}
        <nav className="TFP-nav">
          <button type="button" className="TFP-nav-btn" onClick={handleBack} aria-label="Back"><ArrowBack /></button>
          <span className="TFP-nav-title">Transfer funds</span>
          <button type="button" className="TFP-nav-btn" onClick={() => setStep('amount')} aria-label="Close"><CloseIcon /></button>
        </nav>

        <div className="TFP-body">
          <h2 className="TFP-subtitle">
            {isFrom ? 'Choose an account to transfer from' : 'Choose an account to transfer to'}
          </h2>

          <div className="TFP-account-list">
            {accounts.map((acct) => {
              const isSelected = acct.id === selectedId;
              return (
                <button
                  key={acct.id}
                  type="button"
                  className={`TFP-radio-card${isSelected ? ' TFP-radio-card--selected' : ''}${hasError && !selectedId ? ' TFP-radio-card--error' : ''}`}
                  onClick={() => { setSelectedId(acct.id); setSelectError(''); }}
                  aria-pressed={isSelected}
                >
                  <span className={`TFP-radio-circle${isSelected ? ' TFP-radio-circle--selected' : ''}${hasError && !selectedId ? ' TFP-radio-circle--error' : ''}`}>
                    {isSelected && <span className="TFP-radio-dot" />}
                  </span>
                  <span className="TFP-radio-info">
                    <span className="TFP-radio-name">{acct.name}</span>
                    <span className="TFP-radio-type">{acct.type}</span>
                  </span>
                  <span className="TFP-radio-balances">
                    <span className="TFP-radio-bal">${acct.cadCash.toFixed(0)} CAD</span>
                    <span className="TFP-radio-bal">${acct.usdCash.toFixed(0)} USD</span>
                  </span>
                </button>
              );
            })}
          </div>

          {selectError && (
            <div className="TFP-select-error" role="alert">
              <ErrorIcon />
              <span>{selectError}</span>
            </div>
          )}
        </div>

        <div className="TFP-sticky-footer">
          <button type="button" className="TFP-next-btn" onClick={handleNext}>Next</button>
        </div>
      </div>
    );
  }

  /* ───── Amount step (main form) ───── */
  return (
    <div className="TFP" aria-label="Transfer funds">
      {/* Nav */}
      <nav className="TFP-nav">
        <button type="button" className="TFP-nav-btn" aria-label="Back"><ArrowBack /></button>
        <span className="TFP-nav-title">Transfer funds</span>
        <button type="button" className="TFP-nav-btn" aria-label="Close"><CloseIcon /></button>
      </nav>

      <div className="TFP-body">
        <h2 className="TFP-subtitle">Choose transfer amount</h2>

        {/* Success banner */}
        {showSuccess && (
          <div className="TFP-banner TFP-banner--info" role="status">
            <InfoIcon color="var(--ift-info-icon)" />
            <span className="TFP-banner-text">
              While many internal transfers are instant, some take up to 3 business days to process.
            </span>
            <button type="button" className="TFP-banner-dismiss" onClick={() => setShowSuccess(false)} aria-label="Dismiss">
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Amount card */}
        <div className="TFP-card">
          <span className="TFP-amount-label">Amount</span>
          <div className="TFP-amount-row">
            <div className={`TFP-amount-input-wrap${amountError ? ' TFP-amount-input-wrap--error' : ''}`}>
              <span className="TFP-amount-prefix">$</span>
              <input
                className="TFP-amount-input"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                placeholder=""
                aria-label="Transfer amount"
                aria-invalid={!!amountError}
              />
            </div>
            <button type="button" className="TFP-currency-chip" aria-label={`Currency: ${currency}`}>
              {currency} <ChevronDown className="TFP-chip-chevron" />
            </button>
          </div>
          {amountError && (
            <div className="TFP-amount-error" role="alert">
              <ErrorIcon />
              <span>{amountError}</span>
            </div>
          )}
          <button type="button" className="TFP-currency-link">
            Learn how currency is converted <InfoIcon color="var(--ift-grey-secondary)" />
          </button>
        </div>

        {/* Account balances card */}
        <div className="TFP-card TFP-balances-card">
          <span className="TFP-balances-heading">Account balances</span>

          {/* From account */}
          <div className="TFP-account-section">
            <button
              type="button"
              className="TFP-account-header"
              onClick={() => fromAccount ? setFromExpanded(!fromExpanded) : setStep('selectFrom')}
              aria-expanded={fromExpanded}
            >
              <span className="TFP-account-header-label">From account</span>
              <ChevronDown className={`TFP-account-chevron${fromExpanded ? ' TFP-account-chevron--up' : ''}`} />
            </button>

            {fromExpanded && fromAccount && (
              <div className="TFP-account-details">
                <button type="button" className="TFP-account-name-btn" onClick={() => setStep('selectFrom')}>
                  <div>
                    <span className="TFP-account-detail-name">{fromAccount.name}</span>
                    <span className="TFP-account-detail-type">{fromAccount.type}</span>
                  </div>
                </button>
                <BalanceTable account={fromAccount} />
              </div>
            )}

            {!fromAccount && (
              <button type="button" className="TFP-account-select-trigger" onClick={() => setStep('selectFrom')}>
                Select account
              </button>
            )}
          </div>

          <div className="TFP-account-divider" />

          {/* To account */}
          <div className="TFP-account-section">
            <button
              type="button"
              className="TFP-account-header"
              onClick={() => toAccount ? setToExpanded(!toExpanded) : setStep('selectTo')}
              aria-expanded={toExpanded}
            >
              <span className="TFP-account-header-label">To account</span>
              <ChevronDown className={`TFP-account-chevron${toExpanded ? ' TFP-account-chevron--up' : ''}`} />
            </button>

            {toExpanded && toAccount && (
              <div className="TFP-account-details">
                <button type="button" className="TFP-account-name-btn" onClick={() => setStep('selectTo')}>
                  <div>
                    <span className="TFP-account-detail-name">{toAccount.name}</span>
                    <span className="TFP-account-detail-type">{toAccount.type}</span>
                  </div>
                </button>
                <BalanceTable account={toAccount} />
              </div>
            )}

            {!toAccount && (
              <button type="button" className="TFP-account-select-trigger" onClick={() => setStep('selectTo')}>
                Select account
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="TFP-sticky-footer">
        <button type="button" className="TFP-next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default TransferFundsPage;
