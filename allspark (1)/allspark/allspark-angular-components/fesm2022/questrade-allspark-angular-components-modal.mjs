import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, inject, ChangeDetectorRef, numberAttribute, booleanAttribute, HostListener, HostBinding, ViewChild, ContentChild, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { QButtonComponent } from '@questrade/allspark-angular-components/button';
import { QScrollShadowDirective } from '@questrade/allspark-angular-components/core/directives';
import { injectDestroy } from '@questrade/allspark-angular-components/core/utils';
import { QIconRegistryService } from '@questrade/allspark-angular-components/icon';
import { QInteractiveIconComponent } from '@questrade/allspark-angular-components/interactive-icon';
import { QLinkDirective } from '@questrade/allspark-angular-components/link';
import { MISSING_KEY_HANDLER, ALLSPARK_SCOPE } from '@questrade/allspark-angular-components/transloco';
import { arrowBack } from '@questrade/allspark-icons/icons';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { transition, group, query, style, animate, trigger } from '@angular/animations';

const MODAL_QUERY_SELECTOR = {
    OVERLAY: '[modal-overlay]',
    CONTAINER: '[modal-container]',
};
const ANIMATION = {
    TIME: '0.2s',
    TYPE: 'ease-out',
};
const SKIP_ANIMATION_STATE = 'skipAnimation';
const NORMAL_ANIMATION_STATE = 'toggleAnimation';
const MODAL_ANIMATION_TRANSITIONS = [
    transition(`void => ${SKIP_ANIMATION_STATE}`, []),
    transition(`${SKIP_ANIMATION_STATE} => void`, []),
    transition(':enter', [
        group([
            query(MODAL_QUERY_SELECTOR.OVERLAY, style({
                opacity: 0,
            })),
            query(MODAL_QUERY_SELECTOR.CONTAINER, style({
                opacity: 0,
                transform: 'translateY(-50%) translateY(-24px)',
            })),
            query(MODAL_QUERY_SELECTOR.OVERLAY, animate(`${ANIMATION.TIME} ${ANIMATION.TYPE}`, style({ opacity: 1 }))),
            query(MODAL_QUERY_SELECTOR.CONTAINER, animate(`${ANIMATION.TIME} ${ANIMATION.TYPE}`, style({
                opacity: 1,
                transform: 'translateY(-50%)',
            }))),
        ]),
    ]),
    transition(':leave', [
        group([
            query(MODAL_QUERY_SELECTOR.OVERLAY, style({
                opacity: 0.4,
            })),
            query(MODAL_QUERY_SELECTOR.CONTAINER, style({
                opacity: 1,
                transform: 'translateY(-50%)',
            })),
            query(MODAL_QUERY_SELECTOR.OVERLAY, animate(`${ANIMATION.TIME} ${ANIMATION.TYPE}`, style({ opacity: 0 }))),
            query(MODAL_QUERY_SELECTOR.CONTAINER, animate(`${ANIMATION.TIME} ${ANIMATION.TYPE}`, style({
                opacity: 0,
                transform: 'translateY(-50%) translateY(24px)',
            }))),
        ]),
    ]),
];
const modalAnimation = [trigger('modalToggle', MODAL_ANIMATION_TRANSITIONS)];

/**
 * @deprecated Use Q_DIALOG_COMPONENTS instead, to be removed.
 * @breaking-change First major after Jan 31, 2026
 */
class QModalComponent {
    primaryButtonClicked = new EventEmitter();
    secondaryButtonClicked = new EventEmitter();
    linkClicked = new EventEmitter();
    overlayClicked = new EventEmitter();
    escClicked = new EventEmitter();
    title = '';
    size = 'medium';
    primaryButtonType = 'primary';
    primaryButtonText = '';
    primaryButtonIcon = '';
    primaryButtonIconPosition = 'left';
    secondaryButtonType = 'secondary';
    secondaryButtonText = '';
    secondaryButtonIcon = '';
    secondaryButtonIconPosition = 'left';
    linkText = '';
    linkUrl = '#';
    showSecondaryButton = false;
    showLink = false;
    stackedActionsOnMobile = true;
    disablePrimaryButton = false;
    disableSecondaryButton = false;
    disableLink = false;
    showHeader = true;
    showFooter = true;
    tabIndex = 0;
    dataQt = 'q-modal';
    _modalHeaderTemplate;
    _modalContentTemplate;
    _modalFooterTemplate;
    _secondaryButton;
    _contentRef;
    _modalToggleState;
    _onWindowResize() {
        this._calculateAnimationState();
    }
    _onKeydownHandler(event) {
        this.escClicked.emit(event);
    }
    _currentContentTemplate = null;
    _boxShadow$ = null;
    _containerScrollHeight = 0;
    _rootClass = 'q-modal';
    _boxShadowClass = 'none';
    _contentTemplateHistory = [];
    _boxShadowSubject$ = new BehaviorSubject(this._boxShadowClass);
    _cdr = inject(ChangeDetectorRef);
    _iconRegistry = inject(QIconRegistryService);
    _breakpointObserver = inject(BreakpointObserver);
    _destroy$ = injectDestroy();
    constructor() {
        this._iconRegistry.registerIcon(arrowBack);
        this._boxShadow$ = this._boxShadowSubject$.asObservable();
        this._calculateAnimationState();
    }
    ngAfterViewInit() {
        this._observeBreakpoints();
        this._contentRef.nativeElement?.focus();
        this._currentContentTemplate = this._modalContentTemplate;
        this._cdr.detectChanges();
        document.body.classList.add('q-modal-visible');
    }
    ngOnDestroy() {
        document.body.classList.remove('q-modal-visible');
    }
    showTemplate(template) {
        if (!template)
            return;
        this._updateCurrentContentTemplate(template);
    }
    /** @hidden */
    previousContent() {
        this._currentContentTemplate = this._contentTemplateHistory.pop() ?? null;
        this._cdr.detectChanges();
    }
    /** @hidden */
    onSecondaryButtonClick(event) {
        this.secondaryButtonClicked.emit(event);
    }
    /** @hidden */
    onPrimaryButtonClick(event) {
        this.primaryButtonClicked.emit(event);
    }
    /** @hidden */
    onLinkClicked(event) {
        if (!this.disableLink) {
            this.linkClicked.emit(event);
        }
    }
    /** @hidden */
    onOverlayClicked(event) {
        this.overlayClicked.emit(event);
    }
    _calculateAnimationState() {
        this._modalToggleState = this.isMobileScreen() ? SKIP_ANIMATION_STATE : NORMAL_ANIMATION_STATE;
    }
    /** @hidden */
    onContainerScroll(event) {
        const target = event.target;
        this._containerScrollHeight = target.scrollHeight;
    }
    get isAlternativeContent() {
        return this._contentTemplateHistory.length > 0;
    }
    _observeBreakpoints() {
        const initialSize = this.size;
        const sizeOrder = ['medium', 'large', 'xlarge'];
        const breakpointMap = new Map([
            ['(max-width: 723px)', 'medium'],
            ['(min-width: 724px) and (max-width: 1279px)', 'large'],
            ['(min-width: 1280px)', 'xlarge'],
        ]);
        const breakpointOrder = [
            '(max-width: 723px)',
            '(min-width: 724px) and (max-width: 1279px)',
            '(min-width: 1280px)',
        ];
        this._breakpointObserver
            .observe(breakpointOrder)
            .pipe(takeUntil(this._destroy$))
            .subscribe((state) => {
            let potentialSize = initialSize;
            for (const breakpoint of breakpointOrder) {
                if (state.breakpoints[breakpoint]) {
                    potentialSize = breakpointMap.get(breakpoint) || initialSize;
                    break;
                }
            }
            const initialSizeIndex = sizeOrder.indexOf(initialSize);
            const potentialSizeIndex = sizeOrder.indexOf(potentialSize);
            // The new size should be the smaller of the two (based on index)
            // If initialSize is 'medium' (index 0), it can never be larger.
            // If initialSize is 'large' (index 1), it can be 'medium' or 'large'.
            // If initialSize is 'xlarge' (index 2), it can be 'medium', 'large', or 'xlarge'.
            const newSizeIndex = Math.min(initialSizeIndex, potentialSizeIndex);
            const newSize = sizeOrder[newSizeIndex];
            if (newSize && this.size !== newSize) {
                this.size = newSize;
                this._cdr.markForCheck();
            }
        });
    }
    isMobileScreen() {
        return window?.innerWidth <= 599;
    }
    _updateCurrentContentTemplate(template) {
        this._contentTemplateHistory.push(this._currentContentTemplate);
        this._currentContentTemplate = template;
        this._cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QModalComponent, isStandalone: true, selector: "q-modal", inputs: { title: "title", size: "size", primaryButtonType: "primaryButtonType", primaryButtonText: "primaryButtonText", primaryButtonIcon: "primaryButtonIcon", primaryButtonIconPosition: "primaryButtonIconPosition", secondaryButtonType: "secondaryButtonType", secondaryButtonText: "secondaryButtonText", secondaryButtonIcon: "secondaryButtonIcon", secondaryButtonIconPosition: "secondaryButtonIconPosition", linkText: "linkText", linkUrl: "linkUrl", showSecondaryButton: ["showSecondaryButton", "showSecondaryButton", booleanAttribute], showLink: ["showLink", "showLink", booleanAttribute], stackedActionsOnMobile: ["stackedActionsOnMobile", "stackedActionsOnMobile", booleanAttribute], disablePrimaryButton: ["disablePrimaryButton", "disablePrimaryButton", booleanAttribute], disableSecondaryButton: ["disableSecondaryButton", "disableSecondaryButton", booleanAttribute], disableLink: ["disableLink", "disableLink", booleanAttribute], showHeader: ["showHeader", "showHeader", booleanAttribute], showFooter: ["showFooter", "showFooter", booleanAttribute], tabIndex: ["tabIndex", "tabIndex", numberAttribute], dataQt: "dataQt" }, outputs: { primaryButtonClicked: "primaryButtonClicked", secondaryButtonClicked: "secondaryButtonClicked", linkClicked: "linkClicked", overlayClicked: "overlayClicked", escClicked: "escClicked" }, host: { listeners: { "window:resize": "_onWindowResize()", "document:keydown.escape": "_onKeydownHandler($event)" }, properties: { "attr.tabindex": "this.tabIndex", "attr.data-qt": "this.dataQt", "@modalToggle": "this._modalToggleState" } }, providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], queries: [{ propertyName: "_modalHeaderTemplate", first: true, predicate: ["modalHeaderTemplate"], descendants: true }, { propertyName: "_modalContentTemplate", first: true, predicate: ["modalContentTemplate"], descendants: true }, { propertyName: "_modalFooterTemplate", first: true, predicate: ["modalFooterTemplate"], descendants: true }], viewQueries: [{ propertyName: "_secondaryButton", first: true, predicate: ["secondaryButton"], descendants: true }, { propertyName: "_contentRef", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: "<div cdkTrapFocus class=\"{{ _rootClass }} q-modal-{{ size }}\">\n  <div class=\"{{ _rootClass }}-wrapper\" (scroll)=\"onContainerScroll($event)\">\n    <div\n      role=\"presentation\"\n      modal-overlay\n      class=\"{{ _rootClass }}-overlay\"\n      [style.min-height.px]=\"_containerScrollHeight\"\n      (click)=\"onOverlayClicked($event)\"></div>\n\n    <div modal-container class=\"{{ _rootClass }}-container\">\n      @if (showHeader) {\n        <div\n          class=\"{{ _rootClass }}-header\"\n          [attr.data-qt]=\"'q-modal-header'\"\n          [class.include-back-icon]=\"isAlternativeContent\">\n          @if (isAlternativeContent) {\n            <q-interactive-icon\n              class=\"q-icon-back\"\n              [size]=\"'medium'\"\n              [icon]=\"'arrowBack'\"\n              [dataQt]=\"'q-modal-back-arrow'\"\n              (click)=\"previousContent()\" />\n          }\n          <ng-container *ngTemplateOutlet=\"_modalHeaderTemplate || defaultHeaderTemplate\" />\n          <ng-template #defaultHeaderTemplate>\n            <span\n              [attr.data-qt]=\"'q-modal-title'\"\n              class=\"{{ _rootClass }}-header-title q-display-s\">\n              {{ title }}\n            </span>\n          </ng-template>\n        </div>\n      }\n\n      <div\n        #content\n        class=\"{{ _rootClass }}-content\"\n        qScrollShadow\n        [attr.data-qt]=\"'q-modal-content'\"\n        [tabIndex]=\"tabIndex\"\n        [class.q-modal-custom-padding-top]=\"!showHeader\"\n        [class.q-modal-custom-padding-bottom]=\"!showFooter\">\n        <ng-container *ngTemplateOutlet=\"_currentContentTemplate || defaultContentTemplate\" />\n        <ng-template #defaultContentTemplate>\n          <ng-content modal-content />\n        </ng-template>\n      </div>\n\n      @if (showFooter) {\n        <div\n          class=\"{{ _rootClass }}-footer\"\n          [attr.data-qt]=\"'q-modal-footer'\"\n          [class.stack-actions-mobile]=\"stackedActionsOnMobile\">\n          <ng-container *ngTemplateOutlet=\"_modalFooterTemplate || defaultFooterTemplate\" />\n          <ng-template #defaultFooterTemplate>\n            <ng-container *transloco=\"let t\">\n              <div class=\"{{ _rootClass }}-footer-container\">\n                @if (showLink) {\n                  <div class=\"{{ _rootClass }}-additional-actions\">\n                    <a\n                      qLink\n                      class=\"{{ _rootClass }}-additional-actions-link\"\n                      [attr.href]=\"linkUrl\"\n                      [dataQt]=\"'q-modal-link'\"\n                      [variant]=\"'primary'\"\n                      [size]=\"'14'\"\n                      [attr.disabled]=\"disableLink || null\"\n                      (click)=\"onLinkClicked($event)\">\n                      {{ linkText || t('allspark.modal.actions.link') }}\n                    </a>\n                  </div>\n                }\n                <div class=\"{{ _rootClass }}-actions\">\n                  @if (showSecondaryButton) {\n                    <button\n                      q-button\n                      [variant]=\"secondaryButtonType\"\n                      [dataQt]=\"'q-modal-secondary-button'\"\n                      class=\"{{ _rootClass }}-actions-button\"\n                      [icon]=\"secondaryButtonIcon\"\n                      [iconPosition]=\"secondaryButtonIconPosition\"\n                      [disabled]=\"disableSecondaryButton\"\n                      (click)=\"onSecondaryButtonClick($event)\">\n                      {{ secondaryButtonText || t('allspark.modal.actions.cancel') }}\n                    </button>\n                  }\n                  <button\n                    q-button\n                    [variant]=\"primaryButtonType\"\n                    [dataQt]=\"'q-modal-primary-button'\"\n                    class=\"{{ _rootClass }}-actions-button\"\n                    [icon]=\"primaryButtonIcon\"\n                    [iconPosition]=\"primaryButtonIconPosition\"\n                    [disabled]=\"disablePrimaryButton\"\n                    (click)=\"onPrimaryButtonClick($event)\">\n                    {{ primaryButtonText || t('allspark.modal.actions.ok') }}\n                  </button>\n                </div>\n              </div>\n            </ng-container>\n          </ng-template>\n        </div>\n      }\n    </div>\n  </div>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-modal{animation:none;z-index:1000;position:fixed;inset:0}.q-modal-wrapper{position:relative;width:100%;height:100%;overflow:hidden;display:flex}.q-modal-overlay{background:var(--awds-modal-overlay-background, var(--ads-color-overlay-400));-webkit-backdrop-filter:var(--awds-modal-overlay-backdrop-filter);backdrop-filter:var(--awds-modal-overlay-backdrop-filter);position:absolute;inset:0;z-index:999}.q-modal-container{font-family:var(--awds-modal-container-font-family, var(--ads-font-family-body));font-size:var(--awds-modal-container-font-size, var(--ads-font-size-s));font-style:var(--awds-modal-container-font-style, inherit);font-weight:var(--awds-modal-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-modal-container-letter-spacing, 0);line-height:var(--awds-modal-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-modal-container-text-transform, none);background:var(--awds-modal-container-background, var(--ads-color-body-100));border-radius:var(--awds-modal-container-border-radius, var(--ads-border-radius-m));border:var(--awds-modal-container-border);-webkit-backdrop-filter:var(--awds-modal-container-backdrop-filter);backdrop-filter:var(--awds-modal-container-backdrop-filter);box-shadow:var(--awds-modal-container-box-shadow, 0 2px 12px rgba(0, 0, 0, .12));max-height:var(--awds-modal-container-max-height, 90%);min-height:var(--awds-modal-container-min-height);margin:var(--awds-modal-container-margin, var(--ads-size-xs) auto);height:var(--awds-modal-container-height, fit-content);position:absolute;left:0;right:0;bottom:0;top:calc(50% - var(--ads-size-xs));transform:translateY(-50%);z-index:1000;display:flex;flex-direction:column;overflow:auto}.q-modal.q-modal-medium .q-modal-container{width:var(--awds-modal-medium-container-width, 520px)}.q-modal.q-modal-medium .q-modal-header{padding:var(--awds-modal-medium-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs))}.q-modal.q-modal-medium .q-modal-content{padding:var(--awds-modal-medium-content-padding, 0 var(--ads-size-m))}.q-modal.q-modal-medium .q-modal-footer{padding:var(--awds-modal-medium-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s))}.q-modal.q-modal-large .q-modal-container{width:var(--awds-modal-large-container-width, 724px)}.q-modal.q-modal-large .q-modal-header{padding:var(--awds-modal-large-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs))}.q-modal.q-modal-large .q-modal-content{padding:var(--awds-modal-large-content-padding, 0 var(--ads-size-m))}.q-modal.q-modal-large .q-modal-footer{padding:var(--awds-modal-large-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s))}.q-modal.q-modal-xlarge .q-modal-container{max-width:var(--awds-modal-xlarge-container-width, 1280px)}.q-modal.q-modal-xlarge .q-modal-header{padding:var(--awds-modal-xlarge-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs))}.q-modal.q-modal-xlarge .q-modal-content{padding:var(--awds-modal-xlarge-content-padding, 0 var(--ads-size-m))}.q-modal.q-modal-xlarge .q-modal-footer{padding:var(--awds-modal-xlarge-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s))}.q-modal-content{background:var(--awds-modal-content-background, var(--ads-color-body-100));padding:var(--awds-modal-content-padding, 0 var(--ads-size-s));min-height:var(--awds-modal-content-min-height, var(--ads-size-xxl));height:var(--awds-modal-content-height, fit-content);overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;outline:none}.q-modal .q-modal-custom-padding-top.q-modal-content{padding-top:var(--awds-modal-headerless-container-padding-top)}.q-modal .q-modal-custom-padding-bottom.q-modal-content{padding-bottom:var(--awds-modal-footerless-container-padding-bottom)}.q-modal-header{display:flex;flex-direction:row;flex:0 0 auto;background:var(--awds-modal-header-background, var(--ads-color-body-100))}.q-modal-header-title{color:var(--awds-modal-header-title-color, var(--ads-color-body-contrast-100));flex:1}.q-modal-header--shadow{box-shadow:var(--awds-modal-header-box-shadow, 0 var(--ads-size-quark) 6px rgba(0, 0, 0, .06))}.q-modal-header.include-back-icon{flex-direction:column}.q-modal-header .q-icon-back{margin-bottom:var(--awds-modal-icon-header-margin-bottom, var(--ads-size-xxs))}.q-modal-footer{background:var(--awds-modal-footer-background, var(--ads-color-body-100))}.q-modal-footer-container{display:flex;flex-direction:row;justify-content:space-between}.q-modal-footer-container .q-modal-actions{display:flex;flex-direction:row;margin-left:auto;gap:var(--awds-modal-footer-gap, var(--ads-size-xxs))}.q-modal-footer-container .q-modal-additional-actions{display:flex;flex-direction:row;align-items:center}.q-modal-footer-container .q-modal-additional-actions-link{font-weight:var(--awds-modal-footer-link-font-weight, var(--ads-font-weight-semi-bold))}@media(max-width:599px){.q-modal.q-modal-medium .q-modal-container{top:0;transform:none;width:100%;height:100%;max-height:100%;max-width:100%;margin:0;box-shadow:none;border-radius:0;overflow:auto}.q-modal.q-modal-medium .q-modal-header{padding:var(--awds-modal-mobile-header-padding, var(--ads-size-xs) var(--ads-size-s) var(--ads-size-xxxs))}.q-modal.q-modal-medium .q-modal-content{flex:1;padding:var(--awds-modal-mobile-content-padding, 0 var(--ads-size-s))}.q-modal.q-modal-medium .q-modal-footer{padding:var(--awds-modal-mobile-footer-padding, var(--ads-size-xxs) var(--ads-size-s))}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile{padding:var(--awds-modal-mobile-stacked-actions-footer-padding, var(--ads-size-xxs) var(--ads-size-s))}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-footer-container{flex-direction:column-reverse;gap:var(--awds-modal-mobile-footer-gap, var(--ads-size-xxs))}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-actions{margin-left:unset;flex-direction:column-reverse}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-additional-actions{flex-direction:column}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-additional-actions-link{height:var(--awds-modal-mobile-footer-link-height, var(--ads-size-xl));font-weight:var(--awds-modal-mobile-footer-link-font-weight, var(--ads-font-weight-semi-bold))}}@media (max-height: calc(var(--awds-modal-container-min-height, 360px) + 2 * var(--ads-size-xs))){.q-modal-wrapper{overflow-y:auto}.q-modal-container{position:relative;top:0;transform:translateY(0)}}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: A11yModule }, { kind: "directive", type: i1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: i2.TranslocoDirective, selector: "[transloco]", inputs: ["transloco", "translocoParams", "translocoScope", "translocoRead", "translocoPrefix", "translocoLang", "translocoLoadingTpl"] }, { kind: "component", type: QButtonComponent, selector: "    button[q-button],    button[q-text-button],    button[q-icon-button],  ", inputs: ["icon", "loadingText", "size", "variant", "iconPosition", "loading", "analyticsCssClassIdentifier", "dataQt", "disabled"] }, { kind: "directive", type: QLinkDirective, selector: "a[qLink], a[q-link]", inputs: ["variant", "size", "underlined", "disabled", "tabindex", "analyticsCssClassIdentifier", "dataQt"] }, { kind: "component", type: QInteractiveIconComponent, selector: "q-interactive-icon", inputs: ["icon", "context", "size", "tooltipValue", "tooltipPosition", "disabled", "tabindex", "tooltipShowDelay", "tooltipHideDelay", "tooltipLongPressDelay", "dataQt", "iconSize", "color"] }, { kind: "directive", type: QScrollShadowDirective, selector: "[qScrollShadow]", inputs: ["qScrollShadowAuditTimeMs", "qScrollShadowEnabled"] }], animations: [modalAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-modal', imports: [
                        NgTemplateOutlet,
                        A11yModule,
                        TranslocoModule,
                        QButtonComponent,
                        QLinkDirective,
                        QInteractiveIconComponent,
                        QScrollShadowDirective,
                    ], providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], animations: [modalAnimation], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div cdkTrapFocus class=\"{{ _rootClass }} q-modal-{{ size }}\">\n  <div class=\"{{ _rootClass }}-wrapper\" (scroll)=\"onContainerScroll($event)\">\n    <div\n      role=\"presentation\"\n      modal-overlay\n      class=\"{{ _rootClass }}-overlay\"\n      [style.min-height.px]=\"_containerScrollHeight\"\n      (click)=\"onOverlayClicked($event)\"></div>\n\n    <div modal-container class=\"{{ _rootClass }}-container\">\n      @if (showHeader) {\n        <div\n          class=\"{{ _rootClass }}-header\"\n          [attr.data-qt]=\"'q-modal-header'\"\n          [class.include-back-icon]=\"isAlternativeContent\">\n          @if (isAlternativeContent) {\n            <q-interactive-icon\n              class=\"q-icon-back\"\n              [size]=\"'medium'\"\n              [icon]=\"'arrowBack'\"\n              [dataQt]=\"'q-modal-back-arrow'\"\n              (click)=\"previousContent()\" />\n          }\n          <ng-container *ngTemplateOutlet=\"_modalHeaderTemplate || defaultHeaderTemplate\" />\n          <ng-template #defaultHeaderTemplate>\n            <span\n              [attr.data-qt]=\"'q-modal-title'\"\n              class=\"{{ _rootClass }}-header-title q-display-s\">\n              {{ title }}\n            </span>\n          </ng-template>\n        </div>\n      }\n\n      <div\n        #content\n        class=\"{{ _rootClass }}-content\"\n        qScrollShadow\n        [attr.data-qt]=\"'q-modal-content'\"\n        [tabIndex]=\"tabIndex\"\n        [class.q-modal-custom-padding-top]=\"!showHeader\"\n        [class.q-modal-custom-padding-bottom]=\"!showFooter\">\n        <ng-container *ngTemplateOutlet=\"_currentContentTemplate || defaultContentTemplate\" />\n        <ng-template #defaultContentTemplate>\n          <ng-content modal-content />\n        </ng-template>\n      </div>\n\n      @if (showFooter) {\n        <div\n          class=\"{{ _rootClass }}-footer\"\n          [attr.data-qt]=\"'q-modal-footer'\"\n          [class.stack-actions-mobile]=\"stackedActionsOnMobile\">\n          <ng-container *ngTemplateOutlet=\"_modalFooterTemplate || defaultFooterTemplate\" />\n          <ng-template #defaultFooterTemplate>\n            <ng-container *transloco=\"let t\">\n              <div class=\"{{ _rootClass }}-footer-container\">\n                @if (showLink) {\n                  <div class=\"{{ _rootClass }}-additional-actions\">\n                    <a\n                      qLink\n                      class=\"{{ _rootClass }}-additional-actions-link\"\n                      [attr.href]=\"linkUrl\"\n                      [dataQt]=\"'q-modal-link'\"\n                      [variant]=\"'primary'\"\n                      [size]=\"'14'\"\n                      [attr.disabled]=\"disableLink || null\"\n                      (click)=\"onLinkClicked($event)\">\n                      {{ linkText || t('allspark.modal.actions.link') }}\n                    </a>\n                  </div>\n                }\n                <div class=\"{{ _rootClass }}-actions\">\n                  @if (showSecondaryButton) {\n                    <button\n                      q-button\n                      [variant]=\"secondaryButtonType\"\n                      [dataQt]=\"'q-modal-secondary-button'\"\n                      class=\"{{ _rootClass }}-actions-button\"\n                      [icon]=\"secondaryButtonIcon\"\n                      [iconPosition]=\"secondaryButtonIconPosition\"\n                      [disabled]=\"disableSecondaryButton\"\n                      (click)=\"onSecondaryButtonClick($event)\">\n                      {{ secondaryButtonText || t('allspark.modal.actions.cancel') }}\n                    </button>\n                  }\n                  <button\n                    q-button\n                    [variant]=\"primaryButtonType\"\n                    [dataQt]=\"'q-modal-primary-button'\"\n                    class=\"{{ _rootClass }}-actions-button\"\n                    [icon]=\"primaryButtonIcon\"\n                    [iconPosition]=\"primaryButtonIconPosition\"\n                    [disabled]=\"disablePrimaryButton\"\n                    (click)=\"onPrimaryButtonClick($event)\">\n                    {{ primaryButtonText || t('allspark.modal.actions.ok') }}\n                  </button>\n                </div>\n              </div>\n            </ng-container>\n          </ng-template>\n        </div>\n      }\n    </div>\n  </div>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-modal{animation:none;z-index:1000;position:fixed;inset:0}.q-modal-wrapper{position:relative;width:100%;height:100%;overflow:hidden;display:flex}.q-modal-overlay{background:var(--awds-modal-overlay-background, var(--ads-color-overlay-400));-webkit-backdrop-filter:var(--awds-modal-overlay-backdrop-filter);backdrop-filter:var(--awds-modal-overlay-backdrop-filter);position:absolute;inset:0;z-index:999}.q-modal-container{font-family:var(--awds-modal-container-font-family, var(--ads-font-family-body));font-size:var(--awds-modal-container-font-size, var(--ads-font-size-s));font-style:var(--awds-modal-container-font-style, inherit);font-weight:var(--awds-modal-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-modal-container-letter-spacing, 0);line-height:var(--awds-modal-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-modal-container-text-transform, none);background:var(--awds-modal-container-background, var(--ads-color-body-100));border-radius:var(--awds-modal-container-border-radius, var(--ads-border-radius-m));border:var(--awds-modal-container-border);-webkit-backdrop-filter:var(--awds-modal-container-backdrop-filter);backdrop-filter:var(--awds-modal-container-backdrop-filter);box-shadow:var(--awds-modal-container-box-shadow, 0 2px 12px rgba(0, 0, 0, .12));max-height:var(--awds-modal-container-max-height, 90%);min-height:var(--awds-modal-container-min-height);margin:var(--awds-modal-container-margin, var(--ads-size-xs) auto);height:var(--awds-modal-container-height, fit-content);position:absolute;left:0;right:0;bottom:0;top:calc(50% - var(--ads-size-xs));transform:translateY(-50%);z-index:1000;display:flex;flex-direction:column;overflow:auto}.q-modal.q-modal-medium .q-modal-container{width:var(--awds-modal-medium-container-width, 520px)}.q-modal.q-modal-medium .q-modal-header{padding:var(--awds-modal-medium-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs))}.q-modal.q-modal-medium .q-modal-content{padding:var(--awds-modal-medium-content-padding, 0 var(--ads-size-m))}.q-modal.q-modal-medium .q-modal-footer{padding:var(--awds-modal-medium-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s))}.q-modal.q-modal-large .q-modal-container{width:var(--awds-modal-large-container-width, 724px)}.q-modal.q-modal-large .q-modal-header{padding:var(--awds-modal-large-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs))}.q-modal.q-modal-large .q-modal-content{padding:var(--awds-modal-large-content-padding, 0 var(--ads-size-m))}.q-modal.q-modal-large .q-modal-footer{padding:var(--awds-modal-large-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s))}.q-modal.q-modal-xlarge .q-modal-container{max-width:var(--awds-modal-xlarge-container-width, 1280px)}.q-modal.q-modal-xlarge .q-modal-header{padding:var(--awds-modal-xlarge-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs))}.q-modal.q-modal-xlarge .q-modal-content{padding:var(--awds-modal-xlarge-content-padding, 0 var(--ads-size-m))}.q-modal.q-modal-xlarge .q-modal-footer{padding:var(--awds-modal-xlarge-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s))}.q-modal-content{background:var(--awds-modal-content-background, var(--ads-color-body-100));padding:var(--awds-modal-content-padding, 0 var(--ads-size-s));min-height:var(--awds-modal-content-min-height, var(--ads-size-xxl));height:var(--awds-modal-content-height, fit-content);overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;outline:none}.q-modal .q-modal-custom-padding-top.q-modal-content{padding-top:var(--awds-modal-headerless-container-padding-top)}.q-modal .q-modal-custom-padding-bottom.q-modal-content{padding-bottom:var(--awds-modal-footerless-container-padding-bottom)}.q-modal-header{display:flex;flex-direction:row;flex:0 0 auto;background:var(--awds-modal-header-background, var(--ads-color-body-100))}.q-modal-header-title{color:var(--awds-modal-header-title-color, var(--ads-color-body-contrast-100));flex:1}.q-modal-header--shadow{box-shadow:var(--awds-modal-header-box-shadow, 0 var(--ads-size-quark) 6px rgba(0, 0, 0, .06))}.q-modal-header.include-back-icon{flex-direction:column}.q-modal-header .q-icon-back{margin-bottom:var(--awds-modal-icon-header-margin-bottom, var(--ads-size-xxs))}.q-modal-footer{background:var(--awds-modal-footer-background, var(--ads-color-body-100))}.q-modal-footer-container{display:flex;flex-direction:row;justify-content:space-between}.q-modal-footer-container .q-modal-actions{display:flex;flex-direction:row;margin-left:auto;gap:var(--awds-modal-footer-gap, var(--ads-size-xxs))}.q-modal-footer-container .q-modal-additional-actions{display:flex;flex-direction:row;align-items:center}.q-modal-footer-container .q-modal-additional-actions-link{font-weight:var(--awds-modal-footer-link-font-weight, var(--ads-font-weight-semi-bold))}@media(max-width:599px){.q-modal.q-modal-medium .q-modal-container{top:0;transform:none;width:100%;height:100%;max-height:100%;max-width:100%;margin:0;box-shadow:none;border-radius:0;overflow:auto}.q-modal.q-modal-medium .q-modal-header{padding:var(--awds-modal-mobile-header-padding, var(--ads-size-xs) var(--ads-size-s) var(--ads-size-xxxs))}.q-modal.q-modal-medium .q-modal-content{flex:1;padding:var(--awds-modal-mobile-content-padding, 0 var(--ads-size-s))}.q-modal.q-modal-medium .q-modal-footer{padding:var(--awds-modal-mobile-footer-padding, var(--ads-size-xxs) var(--ads-size-s))}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile{padding:var(--awds-modal-mobile-stacked-actions-footer-padding, var(--ads-size-xxs) var(--ads-size-s))}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-footer-container{flex-direction:column-reverse;gap:var(--awds-modal-mobile-footer-gap, var(--ads-size-xxs))}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-actions{margin-left:unset;flex-direction:column-reverse}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-additional-actions{flex-direction:column}.q-modal.q-modal-medium .q-modal-footer.stack-actions-mobile .q-modal-additional-actions-link{height:var(--awds-modal-mobile-footer-link-height, var(--ads-size-xl));font-weight:var(--awds-modal-mobile-footer-link-font-weight, var(--ads-font-weight-semi-bold))}}@media (max-height: calc(var(--awds-modal-container-min-height, 360px) + 2 * var(--ads-size-xs))){.q-modal-wrapper{overflow-y:auto}.q-modal-container{position:relative;top:0;transform:translateY(0)}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { primaryButtonClicked: [{
                type: Output
            }], secondaryButtonClicked: [{
                type: Output
            }], linkClicked: [{
                type: Output
            }], overlayClicked: [{
                type: Output
            }], escClicked: [{
                type: Output
            }], title: [{
                type: Input
            }], size: [{
                type: Input
            }], primaryButtonType: [{
                type: Input
            }], primaryButtonText: [{
                type: Input
            }], primaryButtonIcon: [{
                type: Input
            }], primaryButtonIconPosition: [{
                type: Input
            }], secondaryButtonType: [{
                type: Input
            }], secondaryButtonText: [{
                type: Input
            }], secondaryButtonIcon: [{
                type: Input
            }], secondaryButtonIconPosition: [{
                type: Input
            }], linkText: [{
                type: Input
            }], linkUrl: [{
                type: Input
            }], showSecondaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showLink: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], stackedActionsOnMobile: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disablePrimaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableSecondaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableLink: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showHeader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showFooter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }, {
                type: HostBinding,
                args: ['attr.tabindex']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _modalHeaderTemplate: [{
                type: ContentChild,
                args: ['modalHeaderTemplate']
            }], _modalContentTemplate: [{
                type: ContentChild,
                args: ['modalContentTemplate']
            }], _modalFooterTemplate: [{
                type: ContentChild,
                args: ['modalFooterTemplate']
            }], _secondaryButton: [{
                type: ViewChild,
                args: ['secondaryButton']
            }], _contentRef: [{
                type: ViewChild,
                args: ['content']
            }], _modalToggleState: [{
                type: HostBinding,
                args: ['@modalToggle']
            }], _onWindowResize: [{
                type: HostListener,
                args: ['window:resize', []]
            }], _onKeydownHandler: [{
                type: HostListener,
                args: ['document:keydown.escape', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QModalComponent };
//# sourceMappingURL=questrade-allspark-angular-components-modal.mjs.map
