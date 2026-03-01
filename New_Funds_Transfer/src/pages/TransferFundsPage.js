import React, { useState, useCallback } from 'react';
import './TransferFundsPage.css';

const INITIAL_AVAILABLE_BALANCE = 12500.75;
const INITIAL_PENDING_BALANCE = 0;

/** Phase 1 confirmation copy per PRD: Internal Cash Transfers Improvement */
const CONFIRMATION_COPY =
  'While many internal transfers are instant, some take up to 3 business days to process.';

function TransferFundsPage() {
  const [availableBalance, setAvailableBalance] = useState(INITIAL_AVAILABLE_BALANCE);
  const [pendingBalance, setPendingBalance] = useState(INITIAL_PENDING_BALANCE);
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('Main Account');
  const [toAccount, setToAccount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [amountTouched, setAmountTouched] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formatCurrency = useCallback(
    (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value),
    []
  );

  const validateAmount = useCallback(
    (value) => {
      if (value === '' || value === null || value === undefined) return '';
      const num = parseFloat(value);
      if (Number.isNaN(num)) return 'Enter a valid amount';
      if (num <= 0) return 'Enter a valid amount';
      if (num > availableBalance) return 'Amount exceeds available balance';
      return '';
    },
    [availableBalance]
  );

  const handleAmountChange = (e) => {
    const v = e.target.value;
    setAmount(v);
    if (amountTouched) setAmountError(validateAmount(v));
  };

  const handleAmountBlur = () => {
    setAmountTouched(true);
    setAmountError(validateAmount(amount));
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const err = validateAmount(amount);
    setAmountTouched(true);
    setAmountError(err);
    if (err) return;
    const num = parseFloat(amount);
    if (!Number.isNaN(num) && num > 0 && num <= availableBalance) {
      setAvailableBalance((prev) => prev - num);
      setPendingBalance((prev) => prev + num);
      setAmount('');
      setAmountError('');
      setAmountTouched(false);
      setShowSuccess(true);
    }
  };

  return (
    <main className="TransferFundsPage" aria-label="Transfer funds">
      <header className="TransferFundsPage-header">
        <h1 className="TransferFundsPage-title">Transfer funds</h1>
        <p className="TransferFundsPage-subtitle">Qmobile</p>
      </header>

      <section className="TransferFundsPage-balances" aria-label="Account balances">
        <div className="TransferFundsPage-balance-card q-card">
          <span className="TransferFundsPage-balance-label">Available balance</span>
          <span className="TransferFundsPage-balance-value" data-balance="available">
            {formatCurrency(availableBalance)}
          </span>
        </div>
        <div className="TransferFundsPage-balance-card q-card">
          <span className="TransferFundsPage-balance-label">Pending</span>
          <span className="TransferFundsPage-balance-value" data-balance="pending">
            {formatCurrency(pendingBalance)}
          </span>
        </div>
      </section>

      {showSuccess && (
        <section className="TransferFundsPage-success q-card" role="status" aria-live="polite">
          <div className="TransferFundsPage-success-header">
            <span className="TransferFundsPage-success-status">Completed</span>
            <button
              type="button"
              className="TransferFundsPage-success-dismiss"
              onClick={() => setShowSuccess(false)}
              aria-label="Dismiss success message"
            >
              ×
            </button>
          </div>
          <p className="TransferFundsPage-success-copy">{CONFIRMATION_COPY}</p>
        </section>
      )}

      <section className="TransferFundsPage-form-section q-card">
        <form className="TransferFundsPage-form" onSubmit={handleTransfer} noValidate>
          <div className="TransferFundsPage-field">
            <label htmlFor="from-account" className="q-input-label">
              From account
            </label>
            <input
              id="from-account"
              type="text"
              className="q-input"
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              placeholder="From account"
              aria-label="From account"
            />
          </div>
          <div className="TransferFundsPage-field">
            <label htmlFor="to-account" className="q-input-label">
              To account
            </label>
            <input
              id="to-account"
              type="text"
              className="q-input"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              placeholder="To account or recipient"
              aria-label="To account"
            />
          </div>
          <div className="TransferFundsPage-field">
            <label htmlFor="amount" className="q-input-label">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              className={`q-input ${amountError ? 'q-input--error' : ''}`}
              value={amount}
              onChange={handleAmountChange}
              onBlur={handleAmountBlur}
              placeholder="0.00"
              aria-label="Transfer amount"
              aria-invalid={!!amountError}
              aria-describedby={amountError ? 'amount-error' : undefined}
            />
            {amountError && (
              <span id="amount-error" className="TransferFundsPage-error" role="alert">
                {amountError}
              </span>
            )}
          </div>
          <button type="submit" className="TransferFundsPage-submit q-button q-button--primary">
            Transfer
          </button>
        </form>
      </section>
    </main>
  );
}

export default TransferFundsPage;
