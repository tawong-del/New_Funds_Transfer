import * as i0 from '@angular/core';
import { input, computed, inject, Renderer2, ChangeDetectorRef, ElementRef, effect, Directive, output, signal, NgZone, DOCUMENT, HostBinding, Input, numberAttribute, booleanAttribute, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { ENTER, SPACE, isPresent, injectDestroy, querySelectorDeep } from '@questrade/allspark-angular-components/core/utils';
import { QSharedMutationObserverService } from '@questrade/allspark-angular-components/core/services';
import { takeUntil } from 'rxjs';
import { offset, flip, shift, limitShift, arrow, computePosition, autoUpdate } from '@floating-ui/dom';

class QPopoverTriggerDirective {
    popover = input.required(...(ngDevMode ? [{ debugName: "popover", alias: 'qPopoverTriggerFor' }] : [{ alias: 'qPopoverTriggerFor' }]));
    dataQt = input('q-popover-trigger', ...(ngDevMode ? [{ debugName: "dataQt", alias: 'qPopoverTriggerDataQt' }] : [{ alias: 'qPopoverTriggerDataQt' }]));
    _popoverOpen = false;
    _popoverHost = computed(() => this.popover()._getHostElement?.(), ...(ngDevMode ? [{ debugName: "_popoverHost" }] : []));
    _cleanupHoverListeners = null;
    _renderer = inject(Renderer2);
    _cdr = inject(ChangeDetectorRef);
    _triggerElement = inject(ElementRef).nativeElement;
    constructor() {
        effect(() => {
            this._initializePopoverConnection();
        });
    }
    ngAfterViewInit() {
        this._initializePopoverConnection();
    }
    ngOnDestroy() {
        this._cleanupPopoverConnection();
        this._cleanupHoverListeners?.();
    }
    togglePopover() {
        return this._popoverOpen ? this.closePopover() : this.openPopover();
    }
    openPopover() {
        if (this._popoverOpen)
            return;
        this._popoverHost().showPopover({
            source: this._triggerElement,
        });
    }
    closePopover() {
        this._popoverHost()?.hidePopover();
    }
    _handleKeydown(event) {
        const code = event.code;
        if (code === ENTER || code === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            this.togglePopover();
        }
    }
    _handleClick() {
        this.togglePopover();
    }
    _initializePopoverConnection() {
        this._cleanupPopoverConnection();
        this._setupPopoverConnection();
        this._setupTriggerHoverListeners();
    }
    _setupPopoverConnection() {
        this.popover()._disableAutoTriggerSetupMethod?.();
        this.popover()._popoverDirective?.setPopoverTriggerElement(this._triggerElement);
        this._popoverHost()?.addEventListener('toggle', this._handlePopoverToggle);
    }
    _cleanupPopoverConnection() {
        this._popoverHost()?.removeEventListener('toggle', this._handlePopoverToggle);
    }
    _handlePopoverToggle = (event) => {
        const toggleEvent = event;
        this._popoverOpen = toggleEvent.newState === 'open';
        this._cdr.markForCheck();
    };
    _setupTriggerHoverListeners() {
        this._cleanupHoverListeners?.();
        this._cleanupHoverListeners = null;
        if (!this._isHintPopover()) {
            return;
        }
        const cleanupFunctions = [...this._setupTriggerListeners(), ...this._setupPopoverListeners()];
        this._cleanupHoverListeners = () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
        };
    }
    _isHintPopover() {
        return this.popover()._getHostElement?.().getAttribute('popover') === 'hint';
    }
    _setupTriggerListeners() {
        const triggerEl = this._triggerElement;
        return [
            this._renderer.listen(triggerEl, 'mouseenter', this._handleMouseEnter),
            this._renderer.listen(triggerEl, 'mouseleave', this._handleMouseLeave),
            this._renderer.listen(triggerEl, 'focus', this._handleMouseEnter),
            this._renderer.listen(triggerEl, 'blur', this._handleMouseLeave),
        ];
    }
    _setupPopoverListeners() {
        const popoverEl = this.popover()?._getHostElement?.();
        return [
            this._renderer.listen(popoverEl, 'mouseenter', this._handleMouseEnter),
            this._renderer.listen(popoverEl, 'mouseleave', this._handleMouseLeave),
        ];
    }
    _handleMouseEnter = () => {
        this.popover()._triggerMouseEnter?.();
    };
    _handleMouseLeave = () => {
        this.popover()._triggerMouseLeave?.();
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPopoverTriggerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.16", type: QPopoverTriggerDirective, isStandalone: true, selector: "[qPopoverTriggerFor]", inputs: { popover: { classPropertyName: "popover", publicName: "qPopoverTriggerFor", isSignal: true, isRequired: true, transformFunction: null }, dataQt: { classPropertyName: "dataQt", publicName: "qPopoverTriggerDataQt", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "_handleClick()", "keydown": "_handleKeydown($event)" }, properties: { "attr.data-qt": "dataQt()", "attr.role": "\"button\"" }, classAttribute: "q-popover-trigger" }, exportAs: ["qPopoverTrigger"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPopoverTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qPopoverTriggerFor]',
                    exportAs: 'qPopoverTrigger',
                    host: {
                        'class': 'q-popover-trigger',
                        '[attr.data-qt]': 'dataQt()',
                        '[attr.role]': '"button"',
                        '(click)': '_handleClick()',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { popover: [{ type: i0.Input, args: [{ isSignal: true, alias: "qPopoverTriggerFor", required: true }] }], dataQt: [{ type: i0.Input, args: [{ isSignal: true, alias: "qPopoverTriggerDataQt", required: false }] }] } });

class QPopoverDirective {
    opened = output();
    closed = output();
    placement = 'bottom';
    offset = 4;
    _hostClass = 'q-popover-directive';
    _positioningDisabled = signal(false, ...(ngDevMode ? [{ debugName: "_positioningDisabled" }] : []));
    _arrowHeight = 0;
    _arrowWidth = 0;
    _popoverElement = inject(ElementRef).nativeElement;
    _zone = inject(NgZone);
    _document = inject(DOCUMENT);
    _popoverArrowElement = null;
    _popoverTriggerElement = null;
    _autoUpdateCleanup = null;
    constructor() {
        effect(() => {
            if (this._positioningDisabled()) {
                this._detachPositioning();
                this._popoverElement.style.removeProperty('top');
                this._popoverElement.style.removeProperty('left');
            }
            else if (this._popoverElement.matches(':popover-open')) {
                this._attachAndPosition();
            }
        });
    }
    ngAfterViewInit() {
        this._setBeforeToggleListener();
    }
    ngOnDestroy() {
        this._popoverElement.removeEventListener('beforetoggle', this._handleBeforeToggle);
        this._detachPositioning();
    }
    getPopoverTriggerElement() {
        return this._popoverTriggerElement;
    }
    setPopoverTriggerElement(element) {
        this._popoverTriggerElement = element;
    }
    getPopoverArrowElement() {
        return this._popoverArrowElement;
    }
    setPopoverArrowElement(element) {
        this._popoverArrowElement = element;
    }
    _setBeforeToggleListener() {
        this._popoverElement.addEventListener('beforetoggle', this._handleBeforeToggle);
    }
    _handleBeforeToggle = (event) => {
        const toggleEvent = event;
        if (toggleEvent.newState === 'open') {
            requestAnimationFrame(() => {
                this._attachAndPosition();
                this.opened.emit();
            });
        }
        else if (toggleEvent.newState === 'closed') {
            requestAnimationFrame(() => {
                this._detachPositioning();
                this.closed.emit();
            });
        }
    };
    _updatePosition = async () => {
        if (!this._popoverTriggerElement || !this._popoverElement.isConnected) {
            this._detachPositioning();
            return;
        }
        const arrowPresence = !!this._popoverArrowElement;
        const popoverBorderRadius = parseFloat(this._document.defaultView?.getComputedStyle(this._popoverElement).borderRadius || '0');
        const shiftLimitOffset = arrowPresence
            ? popoverBorderRadius + this._arrowWidth
            : popoverBorderRadius;
        const middleware = [offset(arrowPresence ? this._arrowHeight + this.offset : this.offset)];
        const flipMiddleware = flip({ crossAxis: 'alignment', fallbackAxisSideDirection: 'end' });
        const shiftMiddleware = shift({ limiter: limitShift({ offset: shiftLimitOffset }) });
        if (this.placement.includes('-')) {
            middleware.push(flipMiddleware, shiftMiddleware);
        }
        else {
            middleware.push(shiftMiddleware, flipMiddleware);
        }
        if (this._popoverArrowElement) {
            middleware.push(arrow({ element: this._popoverArrowElement, padding: popoverBorderRadius }));
        }
        const { x, y, placement, middlewareData } = await computePosition(this._popoverTriggerElement, this._popoverElement, {
            placement: this.placement,
            middleware: middleware,
        });
        if (!this._autoUpdateCleanup && this._popoverElement.matches(':popover-open'))
            return;
        this._updatePopoverPosition(x, y);
        if (this._popoverArrowElement) {
            this._updateArrowPosition(middlewareData, placement);
        }
    };
    _updatePopoverPosition(x, y) {
        this._popoverElement.style.setProperty('left', `${x}px`);
        this._popoverElement.style.setProperty('top', `${y}px`);
    }
    _updateArrowPosition(middlewareData, placement) {
        if (middlewareData.arrow && this._popoverArrowElement) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;
            const arrowEl = this._popoverArrowElement;
            const popoverPlacementSide = placement.split('-')[0];
            const edgePropertyMap = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };
            const arrowEdgeProperty = edgePropertyMap[popoverPlacementSide];
            const isVerticalArrowEdge = arrowEdgeProperty === 'top' || arrowEdgeProperty === 'bottom';
            const arrowProtrusionValue = isVerticalArrowEdge ? this._arrowHeight : 12;
            arrowEl.style.left = '';
            arrowEl.style.top = '';
            arrowEl.style.right = '';
            arrowEl.style.bottom = '';
            if (isVerticalArrowEdge) {
                arrowEl.style.left = isPresent(arrowX) ? `${arrowX}px` : '';
            }
            else {
                arrowEl.style.top = isPresent(arrowY) ? `${arrowY}px` : '';
            }
            arrowEl.style.setProperty(arrowEdgeProperty, `-${arrowProtrusionValue}px`);
            const rotationMap = {
                top: '0deg',
                bottom: '180deg',
                left: '-90deg',
                right: '-270deg',
            };
            arrowEl.style.transform = `rotate(${rotationMap[popoverPlacementSide]})`;
        }
    }
    _attachAndPosition() {
        if (this._positioningDisabled())
            return;
        if (!this._popoverTriggerElement) {
            console.warn(`QPopover: Could not find trigger element for popover"`);
            return;
        }
        if (this._autoUpdateCleanup)
            return;
        this._updatePosition();
        this._zone.runOutsideAngular(() => {
            if (!this._popoverTriggerElement)
                return;
            this._autoUpdateCleanup = autoUpdate(this._popoverTriggerElement, this._popoverElement, this._updatePosition);
        });
    }
    _detachPositioning() {
        if (this._autoUpdateCleanup) {
            this._autoUpdateCleanup();
            this._autoUpdateCleanup = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPopoverDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QPopoverDirective, isStandalone: true, inputs: { placement: ["qPopoverPlacement", "placement"], offset: ["qPopoverOffset", "offset"] }, outputs: { opened: "opened", closed: "closed" }, host: { properties: { "class": "this._hostClass" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPopoverDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [], propDecorators: { opened: [{ type: i0.Output, args: ["opened"] }], closed: [{ type: i0.Output, args: ["closed"] }], placement: [{
                type: Input,
                args: ['qPopoverPlacement']
            }], offset: [{
                type: Input,
                args: ['qPopoverOffset']
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const ARROW_HEIGHT = 8;
const ARROW_WIDTH = 17;
const DEFAULT_OFFSET = 8;
const DEFAULT_PLACEMENT = 'top';
class QPopoverComponent {
    dataQt = 'q-popover';
    showArrow = true;
    showDelay = 0;
    hideDelay = 100;
    _hostClass = 'q-popover';
    _disableAutoTriggerSetup = signal(false, ...(ngDevMode ? [{ debugName: "_disableAutoTriggerSetup" }] : []));
    _popoverTriggerElement = null;
    _hideDelayTimer = null;
    _showDelayTimer = null;
    _popoverElement = inject(ElementRef).nativeElement;
    _zone = inject(NgZone);
    _document = inject(DOCUMENT);
    _destroy$ = injectDestroy();
    _popoverDirective = inject(QPopoverDirective, { host: true });
    constructor() {
        this._popoverDirective.offset = DEFAULT_OFFSET;
        this._popoverDirective.placement = DEFAULT_PLACEMENT;
    }
    ngAfterViewInit() {
        this._setTriggerElement();
        this._setArrowElement();
        this._setHoverListeners();
        this._trackIdChanges();
    }
    ngOnDestroy() {
        this._cleanup();
    }
    _getHostElement() {
        return this._popoverElement;
    }
    _disableAutoTriggerSetupMethod() {
        this._disableAutoTriggerSetup.set(true);
        this._clearTriggerListeners();
        this._popoverTriggerElement = null;
    }
    _triggerMouseEnter() {
        this._clearHideTimer();
        this._startShowTimer();
    }
    _triggerMouseLeave() {
        this._clearShowTimer();
        this._startHideTimer();
    }
    _startHideTimer() {
        this._clearHideTimer();
        this._hideDelayTimer = setTimeout(() => {
            if (this._popoverElement.isConnected && this._shouldTriggerOnHover()) {
                this._popoverElement.hidePopover();
            }
            this._hideDelayTimer = null;
        }, this.hideDelay);
    }
    _clearHideTimer() {
        if (this._hideDelayTimer) {
            clearTimeout(this._hideDelayTimer);
            this._hideDelayTimer = null;
        }
    }
    _clearShowTimer() {
        if (this._showDelayTimer) {
            clearTimeout(this._showDelayTimer);
            this._showDelayTimer = null;
        }
    }
    _startShowTimer() {
        this._clearShowTimer();
        if (this.showDelay > 0) {
            this._showDelayTimer = setTimeout(this._showPopoverOnHover.bind(this), this.showDelay);
        }
        else {
            this._showPopoverOnHover();
        }
    }
    _showPopoverOnHover() {
        if (this._popoverElement.isConnected &&
            this._shouldTriggerOnHover() &&
            this._popoverTriggerElement) {
            this._popoverElement.showPopover({ source: this._popoverTriggerElement });
            this._showDelayTimer = null;
        }
    }
    _setArrowElement() {
        this._popoverDirective.setPopoverArrowElement(this._popoverElement.querySelector('.q-popover-arrow'));
        this._popoverDirective._arrowHeight = ARROW_HEIGHT;
        this._popoverDirective._arrowWidth = ARROW_WIDTH;
    }
    _setTriggerElement() {
        if (this._disableAutoTriggerSetup())
            return;
        const popoverId = this._popoverElement.getAttribute('id');
        if (popoverId) {
            this._popoverTriggerElement = querySelectorDeep(`[popovertarget="${popoverId}"]`);
            this._popoverDirective.setPopoverTriggerElement(this._popoverTriggerElement);
        }
    }
    _setHoverListeners() {
        if (this._disableAutoTriggerSetup())
            return;
        if (this._shouldTriggerOnHover() && this._popoverTriggerElement) {
            this._zone.runOutsideAngular(() => {
                this._setTriggerListeners();
                this._popoverElement.addEventListener('mouseenter', this._handlePopoverMouseEnter);
                this._popoverElement.addEventListener('mouseleave', this._handlePopoverMouseLeave);
                this._popoverElement.addEventListener('focusin', this._handlePopoverFocusIn);
                this._popoverElement.addEventListener('focusout', this._handlePopoverFocusOut);
            });
        }
    }
    _setTriggerListeners() {
        if (this._disableAutoTriggerSetup())
            return;
        this._popoverTriggerElement?.addEventListener('mouseenter', this._handleTriggerMouseEnter);
        this._popoverTriggerElement?.addEventListener('mouseleave', this._handleTriggerMouseLeave);
        this._popoverTriggerElement?.addEventListener('focus', this._handleTriggerFocus);
        this._popoverTriggerElement?.addEventListener('blur', this._handleTriggerBlur);
    }
    _shouldTriggerOnHover() {
        return this._popoverElement.getAttribute('popover') === 'hint';
    }
    _handleTriggerMouseEnter = () => {
        this._clearHideTimer();
        this._startShowTimer();
    };
    _handleTriggerMouseLeave = () => {
        this._clearShowTimer();
        this._startHideTimer();
    };
    _handleTriggerFocus = () => {
        this._clearHideTimer();
        this._startShowTimer();
    };
    _handleTriggerBlur = () => {
        this._clearShowTimer();
        this._startHideTimer();
    };
    _handlePopoverMouseEnter = () => {
        this._clearHideTimer();
    };
    _handlePopoverMouseLeave = () => {
        this._startHideTimer();
    };
    _handlePopoverFocusIn = () => {
        this._clearHideTimer();
    };
    _handlePopoverFocusOut = () => {
        this._startHideTimer();
    };
    _cleanup() {
        this._clearHideTimer();
        this._clearShowTimer();
        this._clearTriggerListeners();
        this._popoverElement.removeEventListener('mouseenter', this._handlePopoverMouseEnter);
        this._popoverElement.removeEventListener('mouseleave', this._handlePopoverMouseLeave);
        this._popoverElement.removeEventListener('focusin', this._handlePopoverFocusIn);
        this._popoverElement.removeEventListener('focusout', this._handlePopoverFocusOut);
    }
    _clearTriggerListeners() {
        if (this._popoverTriggerElement) {
            this._popoverTriggerElement.removeEventListener('mouseenter', this._handleTriggerMouseEnter);
            this._popoverTriggerElement.removeEventListener('mouseleave', this._handleTriggerMouseLeave);
            this._popoverTriggerElement.removeEventListener('focus', this._handleTriggerFocus);
            this._popoverTriggerElement.removeEventListener('blur', this._handleTriggerBlur);
        }
    }
    _trackIdChanges() {
        const mutationObserver = new QSharedMutationObserverService();
        mutationObserver
            .observe(this._popoverElement, { attributes: true, attributeFilter: ['id'] })
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => this._resetTrigger());
        mutationObserver
            .observe(this._document.body, {
            childList: true,
            subtree: true,
        })
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            if (!this._popoverElement.isConnected) {
                return;
            }
            this._resetTrigger();
        });
    }
    _resetTrigger() {
        if (this._disableAutoTriggerSetup())
            return;
        this._clearTriggerListeners();
        this._setTriggerElement();
        if (this._shouldTriggerOnHover())
            this._setTriggerListeners();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPopoverComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QPopoverComponent, isStandalone: true, selector: "[popover][q-popover], [popover][qPopover]", inputs: { dataQt: "dataQt", showArrow: ["qPopoverShowArrow", "showArrow", booleanAttribute], showDelay: ["qPopoverShowDelay", "showDelay", numberAttribute], hideDelay: ["qPopoverHideDelay", "hideDelay", numberAttribute] }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClass" } }, hostDirectives: [{ directive: QPopoverDirective, inputs: ["qPopoverPlacement", "qPopoverPlacement", "qPopoverOffset", "qPopoverOffset"] }], ngImport: i0, template: `
    <ng-content />

    @if (showArrow) {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="8"
        viewBox="0 0 17 8"
        fill="none"
        class="q-popover-arrow">
        <path
          d="M16.5 0L0.500001 -1.39876e-06L7.08579 6.58579C7.86683 7.36683 9.13316 7.36684 9.91421 6.58579L16.5 0Z"
          fill="white" />
      </svg>
    }
  `, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-popover{font-family:var(--awds-popover-container-font-family, var(--ads-font-family-body));font-size:var(--awds-popover-container-font-size, var(--ads-font-size-s));font-style:var(--awds-popover-container-font-style, inherit);font-weight:var(--awds-popover-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-popover-container-letter-spacing, 0);line-height:var(--awds-popover-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-popover-container-text-transform, none);border:var(--awds-popover-container-border, none);padding:var(--awds-popover-container-padding, 0);border-radius:var(--awds-popover-container-border-radius, var(--ads-border-radius-m));background:var(--awds-popover-container-background, var(--ads-color-elevation-overlay));-webkit-backdrop-filter:var(--awds-popover-container-backdrop-filter);backdrop-filter:var(--awds-popover-container-backdrop-filter);color:var(--awds-popover-container-color, var(--ads-color-elevation-overlay-contrast));box-shadow:var(--awds-popover-container-box-shadow, var(--ads-elevation-overlay-shadow-position-x) var(--ads-elevation-overlay-shadow-position-y) var(--ads-elevation-overlay-shadow-blur) var(--ads-elevation-overlay-shadow-spread) var(--ads-elevation-overlay-shadow-color));width:var(--awds-popover-container-width, fit-content);height:var(--awds-popover-container-height, fit-content);min-width:var(--awds-popover-container-min-width, 0);min-height:var(--awds-popover-container-min-height, 0);max-width:var(--awds-popover-container-max-width, none);max-height:var(--awds-popover-container-max-height, none)}.q-popover .q-popover-arrow{position:absolute;color:var(--awds-popover-arrow-color, var(--ads-color-elevation-overlay))}.q-popover .q-popover-arrow path{fill:currentColor}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: '[popover][q-popover], [popover][qPopover]', template: `
    <ng-content />

    @if (showArrow) {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="8"
        viewBox="0 0 17 8"
        fill="none"
        class="q-popover-arrow">
        <path
          d="M16.5 0L0.500001 -1.39876e-06L7.08579 6.58579C7.86683 7.36683 9.13316 7.36684 9.91421 6.58579L16.5 0Z"
          fill="white" />
      </svg>
    }
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, hostDirectives: [
                        {
                            directive: QPopoverDirective,
                            inputs: ['qPopoverPlacement', 'qPopoverOffset'],
                        },
                    ], styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-popover{font-family:var(--awds-popover-container-font-family, var(--ads-font-family-body));font-size:var(--awds-popover-container-font-size, var(--ads-font-size-s));font-style:var(--awds-popover-container-font-style, inherit);font-weight:var(--awds-popover-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-popover-container-letter-spacing, 0);line-height:var(--awds-popover-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-popover-container-text-transform, none);border:var(--awds-popover-container-border, none);padding:var(--awds-popover-container-padding, 0);border-radius:var(--awds-popover-container-border-radius, var(--ads-border-radius-m));background:var(--awds-popover-container-background, var(--ads-color-elevation-overlay));-webkit-backdrop-filter:var(--awds-popover-container-backdrop-filter);backdrop-filter:var(--awds-popover-container-backdrop-filter);color:var(--awds-popover-container-color, var(--ads-color-elevation-overlay-contrast));box-shadow:var(--awds-popover-container-box-shadow, var(--ads-elevation-overlay-shadow-position-x) var(--ads-elevation-overlay-shadow-position-y) var(--ads-elevation-overlay-shadow-blur) var(--ads-elevation-overlay-shadow-spread) var(--ads-elevation-overlay-shadow-color));width:var(--awds-popover-container-width, fit-content);height:var(--awds-popover-container-height, fit-content);min-width:var(--awds-popover-container-min-width, 0);min-height:var(--awds-popover-container-min-height, 0);max-width:var(--awds-popover-container-max-width, none);max-height:var(--awds-popover-container-max-height, none)}.q-popover .q-popover-arrow{position:absolute;color:var(--awds-popover-arrow-color, var(--ads-color-elevation-overlay))}.q-popover .q-popover-arrow path{fill:currentColor}\n"] }]
        }], ctorParameters: () => [], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], showArrow: [{
                type: Input,
                args: [{ alias: 'qPopoverShowArrow', transform: booleanAttribute }]
            }], showDelay: [{
                type: Input,
                args: [{ alias: 'qPopoverShowDelay', transform: numberAttribute }]
            }], hideDelay: [{
                type: Input,
                args: [{ alias: 'qPopoverHideDelay', transform: numberAttribute }]
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QPopoverComponent, QPopoverDirective, QPopoverTriggerDirective };
//# sourceMappingURL=questrade-allspark-angular-components-popover.mjs.map
