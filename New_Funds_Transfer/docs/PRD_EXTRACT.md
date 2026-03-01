# PRD Extract: Internal Cash Transfers Improvement

Extracted from **PRD_ Internal Cash Transfers Improvement (1).pdf** for engineering reference. Focus: **Phase 1** F/E changes and backend touchpoints; later phases summarized.

---

## Phase 1 – Instant cash movement upon approval

### Backend (no F/E code in this repo)

- Upon **approval** (system auto-approval or Operations manual approval), trigger **instant cash movement** into the destination account in IQ Manager.
- **Tradable money** appears in destination account; **request status** reflects money ready in destination (e.g. "Completed" or "Approved").
- **Constraint**: Cancellation of Internal Cash Transfer is **unavailable** (no cancel for Pending/Approved). Operations cannot revert approval in QOffice once approved (mitigation: confirmation popup when ops approves in QOffice).

### Frontend changes (Phase 1)

| Location | Current | Phase 1 launch |
|----------|--------|-----------------|
| **Public Website** (Moving funds / Transfer between accounts) | — | Wording update per Change review table |
| **MyPortal** | Pending status until 4pm regardless of funds in destination; Confirm popup: "1-3 business days" | Show **"Approved"** status when funds are available in destination; Confirm popup wording updated |
| **QuestMobile** | Confirm page; History page shows "In progress" even when funds may already be in destination | Confirm page updated; History page shows **Approved/Completed** when funds available |
| **EdgeMobile** | Confirm page (no Funds transfer history page) | Confirm page updated; Phase 1 launch behavior aligned |

### Copy changes (Change review – exact wording)

| Location | Original | Phase 1 (new) |
|----------|----------|----------------|
| **Public Website** | Most internal transfers are processed within 1-3 business days. | While many internal transfers are instant, some take up to 3 business days to process. |
| **Confirmation page** (generic) | Your request will be processed in 1-3 business days. | While many internal transfers are instant, some take up to 3 business days to process. |
| **QuestMobile** Confirmation | Transfer requests submitted outside of business hours or on holidays will be processed the next business day. Business hours: Monday - Friday, 6:30 am - 4:30pm ET | While many internal transfers are instant, some take up to 3 business days to process. |
| **EdgeMobile** Confirmation | (Same as QuestMobile original) | While many internal transfers are instant, some take up to 3 business days to process. |

### Rationale (PRD)

- **Status wording**: After Phase 1, "Pending" / "In Progress" no longer means "pending money movement"; it means the system has attempted to move money. When money is in destination, show **"Approved"** / **"Completed"** so clients aren’t confused.
- **Fast follow**: Align QuestMobile and MyPortal status; make instant experience feel instant (e.g. status update without refresh when time-to-cash &lt; 5 seconds).

---

## Phase 2 (later)

- QWP F/E wording updates; TFSA as source in Phase File; RRSP–RRSP instant; **T101: Web Internal Cash Transfer revamp to align with Mobile / Internal positions transfer experience**; Amplitude tracking on Web.

## Phase 3 (later)

- Embed webform; associate uploaded documents to internal cash case.

---

## Use in this prototype

This repo is a **desktop/mobile mock-up** for Internal Funds Transfer (Internal Positions look and feel, mobile IFT business logic). To align with the PRD:

- **After a successful transfer**: Show success state with status **"Completed"** (or **"Approved"**) and the Phase 1 confirmation copy: *"While many internal transfers are instant, some take up to 3 business days to process."*
- **Backend**: When real APIs exist, the F/E should reflect request status from the backend (e.g. Pending → Approved/Completed when funds available); instant cash movement is backend-driven.

---

*Source: PRD_ Internal Cash Transfers Improvement (1).pdf. Phase 1 delivery ETA: Mar 11, 2026.*
