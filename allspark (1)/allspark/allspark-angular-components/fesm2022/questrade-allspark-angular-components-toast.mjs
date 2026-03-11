import { OverlayContainer, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { HostBinding, Directive, InjectionToken, EventEmitter, inject, Output, ChangeDetectionStrategy, ViewEncapsulation, Component, ElementRef, ChangeDetectorRef, NgZone, ViewChild, Input, DOCUMENT, Injector, TemplateRef, Injectable, NgModule } from '@angular/core';
import { QDestroyService, QSharedMutationObserverService } from '@questrade/allspark-angular-components/core/services';
import { Subject, takeUntil } from 'rxjs';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { QButtonComponent } from '@questrade/allspark-angular-components/button';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { QInteractiveIconComponent } from '@questrade/allspark-angular-components/interactive-icon';
import { clear } from '@questrade/allspark-icons/icons';
import { take } from 'rxjs/operators';
import { trigger, state, transition, style, animate } from '@angular/animations';

class QToastConfig {
    icon = '';
    viewContainerRef = null;
    autoDismiss = false;
    type = 'primary';
    data = null;
    size = 'standard';
    horizontalPosition = 'center';
    verticalPosition = 'bottom';
    buttonsPosition = 'side';
    buttonType = 'secondary text';
    buttonAdditionalType = 'secondary text';
    dismissIcon = false;
    sourceDialogElement = null;
    sourcePopoverElement = null;
}

const MAX_TIMEOUT = Math.pow(2, 31) - 1;
class QToastRef {
    containerInstance;
    _overlayRef;
    instance;
    _afterDismissed = new Subject();
    _afterOpened = new Subject();
    _onAction = new Subject();
    _durationTimeoutId;
    _dismissedByAction = false;
    constructor(containerInstance, _overlayRef) {
        this.containerInstance = containerInstance;
        this._overlayRef = _overlayRef;
        this.containerInstance._onExit.subscribe(() => this._finishDismiss());
    }
    dismiss() {
        if (!this._afterDismissed.closed) {
            this.containerInstance.exit();
        }
        clearTimeout(this._durationTimeoutId);
    }
    dismissWithAction() {
        if (!this._onAction.closed) {
            this._dismissedByAction = true;
            this._onAction.next();
            this._onAction.complete();
            this.dismiss();
        }
        clearTimeout(this._durationTimeoutId);
    }
    closeWithAction() {
        this.dismissWithAction();
    }
    _dismissAfter(duration) {
        this._durationTimeoutId = window.setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
    }
    _open() {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    }
    afterDismissed() {
        return this._afterDismissed;
    }
    afterOpened() {
        return this.containerInstance._onEnter;
    }
    onAction() {
        return this._onAction;
    }
    _finishDismiss() {
        this._overlayRef.dispose();
        if (!this._onAction.closed) {
            this._onAction.complete();
        }
        this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
        this._afterDismissed.complete();
        this._dismissedByAction = false;
    }
}

class QToastActionDirective {
    hostClass = 'q-toast-action';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastActionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QToastActionDirective, isStandalone: true, selector: "[qToastAction]", host: { properties: { "class": "this.hostClass" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastActionDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[qToastAction]' }]
        }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QToastActionsDirective {
    hostClass = 'q-toast-actions';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastActionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QToastActionsDirective, isStandalone: true, selector: "[qToastActions]", host: { properties: { "class": "this.hostClass" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastActionsDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[qToastActions]' }]
        }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QToastLabelDirective {
    hostClass = 'q-toast-label';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastLabelDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QToastLabelDirective, isStandalone: true, selector: "[qToastLabel]", host: { properties: { "class": "this.hostClass" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastLabelDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[qToastLabel]' }]
        }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_TOAST_DATA = new InjectionToken('QToastData');

class QToastSimpleComponent {
    actionClicked = new EventEmitter();
    additionalActionClicked = new EventEmitter();
    closeIconClicked = new EventEmitter();
    hostClass = 'q-toast-simple';
    iconName = '';
    actionsPosition = 'side';
    data = inject(Q_TOAST_DATA);
    toastRef = inject(QToastRef);
    _iconRegistry = inject(QIconRegistryService);
    constructor() {
        const data = this.data;
        const _iconRegistry = this._iconRegistry;
        _iconRegistry.registerIcon(clear);
        if (data.icon) {
            this.iconName = data.icon;
        }
        if (data.buttonsPosition) {
            this.actionsPosition = data.buttonsPosition;
        }
    }
    dismiss() {
        this.toastRef.dismissWithAction();
    }
    actionClick() {
        this.actionClicked.emit();
        this.dismiss();
    }
    additionalActionClick() {
        this.additionalActionClicked.emit();
        this.dismiss();
    }
    closeIconClick() {
        this.closeIconClicked.emit();
        this.dismiss();
    }
    get hasAction() {
        return !!this.data.action;
    }
    get hasActionAdditional() {
        return !!this.data.actionAdditional;
    }
    get isDismissible() {
        return !!this.data.dismissIcon;
    }
    get isTextButtonType() {
        return this.data.buttonType.includes('text');
    }
    get isTextButtonAdditionalType() {
        return this.data.buttonAdditionalType.includes('text');
    }
    get buttonVariant() {
        return this.data.buttonType.split(' ')[0];
    }
    get buttonAdditionalVariant() {
        return this.data.buttonAdditionalType.split(' ')[0];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastSimpleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QToastSimpleComponent, isStandalone: true, selector: "q-toast-simple", outputs: { actionClicked: "actionClicked", additionalActionClicked: "additionalActionClicked", closeIconClicked: "closeIconClicked" }, host: { properties: { "class": "this.hostClass" } }, ngImport: i0, template: "<div\n  class=\"q-toast-top\"\n  [class.q-toast-has-side-actions]=\"(hasAction || hasActionAdditional) && actionsPosition === 'side'\">\n  <div qToastLabel>\n    <q-icon *ngIf=\"iconName\" [size]=\"'20'\" [name]=\"iconName\" [dataQt]=\"'q-toast-label-icon'\" />\n    <span class=\"q-toast-message\">{{ data.message }}</span>\n  </div>\n\n  <div class=\"q-toast-side-actions\">\n    <ng-container *ngTemplateOutlet=\"actionsPosition === 'side' ? actions : null\" />\n\n    <div *ngIf=\"isDismissible\" class=\"q-toast-dismiss-icon-container\">\n      <q-interactive-icon\n        class=\"q-toast-dismiss-icon\"\n        [icon]=\"'clear'\"\n        [dataQt]=\"'q-toast-interactive-icon'\"\n        (click)=\"closeIconClick()\" />\n    </div>\n  </div>\n</div>\n\n<ng-container *ngTemplateOutlet=\"actionsPosition === 'bottom' ? actions : null\" />\n\n<ng-template #actions>\n  <div qToastActions>\n    <button\n      *ngIf=\"hasAction && isTextButtonType\"\n      q-text-button\n      qToastAction\n      [variant]=\"buttonVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"actionClick()\">\n      {{ data.action }}\n    </button>\n\n    <button\n      *ngIf=\"hasActionAdditional && isTextButtonAdditionalType\"\n      q-text-button\n      qToastAction\n      [variant]=\"buttonAdditionalVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"additionalActionClick()\">\n      {{ data.actionAdditional }}\n    </button>\n\n    <button\n      *ngIf=\"hasAction && !isTextButtonType\"\n      q-button\n      qToastAction\n      [variant]=\"buttonVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"actionClick()\">\n      {{ data.action }}\n    </button>\n\n    <button\n      *ngIf=\"hasActionAdditional && !isTextButtonAdditionalType\"\n      q-button\n      qToastAction\n      [variant]=\"buttonAdditionalVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"additionalActionClick()\">\n      {{ data.actionAdditional }}\n    </button>\n  </div>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-toast-simple{display:flex;flex:1;line-height:var(--ads-font-line-height-xs);align-content:center;justify-content:space-between;align-items:center}.q-toast-top{display:flex;justify-content:space-between;gap:var(--ads-size-micro);width:100%}.q-toast-top.q-toast-has-side-actions{gap:var(--ads-size-xxs)}.q-toast-top .q-toast-side-actions{display:flex;align-items:flex-start;gap:var(--ads-size-micro)}.q-toast-top .q-toast-side-actions .q-toast-dismiss-icon-container{width:var(--ads-size-xs);height:var(--ads-size-xs);display:flex;align-items:center;justify-content:center}.q-toast-label{display:flex;align-self:flex-start}.q-toast-label .q-icon{cursor:auto;margin-right:var(--ads-size-micro);vertical-align:text-bottom}.q-toast-label .q-toast-message{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;flex:1}.q-toast-actions{height:var(--ads-font-line-height-xs);display:flex;align-items:center;gap:var(--ads-size-micro)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QInteractiveIconComponent, selector: "q-interactive-icon", inputs: ["icon", "context", "size", "tooltipValue", "tooltipPosition", "disabled", "tabindex", "tooltipShowDelay", "tooltipHideDelay", "tooltipLongPressDelay", "dataQt", "iconSize", "color"] }, { kind: "component", type: QButtonComponent, selector: "    button[q-button],    button[q-text-button],    button[q-icon-button],  ", inputs: ["icon", "loadingText", "size", "variant", "iconPosition", "loading", "analyticsCssClassIdentifier", "dataQt", "disabled"] }, { kind: "directive", type: QToastLabelDirective, selector: "[qToastLabel]" }, { kind: "directive", type: QToastActionDirective, selector: "[qToastAction]" }, { kind: "directive", type: QToastActionsDirective, selector: "[qToastActions]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastSimpleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-toast-simple', imports: [
                        NgIf,
                        NgTemplateOutlet,
                        QIconComponent,
                        QInteractiveIconComponent,
                        QButtonComponent,
                        QToastLabelDirective,
                        QToastActionDirective,
                        QToastActionsDirective,
                    ], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"q-toast-top\"\n  [class.q-toast-has-side-actions]=\"(hasAction || hasActionAdditional) && actionsPosition === 'side'\">\n  <div qToastLabel>\n    <q-icon *ngIf=\"iconName\" [size]=\"'20'\" [name]=\"iconName\" [dataQt]=\"'q-toast-label-icon'\" />\n    <span class=\"q-toast-message\">{{ data.message }}</span>\n  </div>\n\n  <div class=\"q-toast-side-actions\">\n    <ng-container *ngTemplateOutlet=\"actionsPosition === 'side' ? actions : null\" />\n\n    <div *ngIf=\"isDismissible\" class=\"q-toast-dismiss-icon-container\">\n      <q-interactive-icon\n        class=\"q-toast-dismiss-icon\"\n        [icon]=\"'clear'\"\n        [dataQt]=\"'q-toast-interactive-icon'\"\n        (click)=\"closeIconClick()\" />\n    </div>\n  </div>\n</div>\n\n<ng-container *ngTemplateOutlet=\"actionsPosition === 'bottom' ? actions : null\" />\n\n<ng-template #actions>\n  <div qToastActions>\n    <button\n      *ngIf=\"hasAction && isTextButtonType\"\n      q-text-button\n      qToastAction\n      [variant]=\"buttonVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"actionClick()\">\n      {{ data.action }}\n    </button>\n\n    <button\n      *ngIf=\"hasActionAdditional && isTextButtonAdditionalType\"\n      q-text-button\n      qToastAction\n      [variant]=\"buttonAdditionalVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"additionalActionClick()\">\n      {{ data.actionAdditional }}\n    </button>\n\n    <button\n      *ngIf=\"hasAction && !isTextButtonType\"\n      q-button\n      qToastAction\n      [variant]=\"buttonVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"actionClick()\">\n      {{ data.action }}\n    </button>\n\n    <button\n      *ngIf=\"hasActionAdditional && !isTextButtonAdditionalType\"\n      q-button\n      qToastAction\n      [variant]=\"buttonAdditionalVariant\"\n      [size]=\"'small'\"\n      [dataQt]=\"'q-toast-button-icon-secondary'\"\n      (click)=\"additionalActionClick()\">\n      {{ data.actionAdditional }}\n    </button>\n  </div>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-toast-simple{display:flex;flex:1;line-height:var(--ads-font-line-height-xs);align-content:center;justify-content:space-between;align-items:center}.q-toast-top{display:flex;justify-content:space-between;gap:var(--ads-size-micro);width:100%}.q-toast-top.q-toast-has-side-actions{gap:var(--ads-size-xxs)}.q-toast-top .q-toast-side-actions{display:flex;align-items:flex-start;gap:var(--ads-size-micro)}.q-toast-top .q-toast-side-actions .q-toast-dismiss-icon-container{width:var(--ads-size-xs);height:var(--ads-size-xs);display:flex;align-items:center;justify-content:center}.q-toast-label{display:flex;align-self:flex-start}.q-toast-label .q-icon{cursor:auto;margin-right:var(--ads-size-micro);vertical-align:text-bottom}.q-toast-label .q-toast-message{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;flex:1}.q-toast-actions{height:var(--ads-font-line-height-xs);display:flex;align-items:center;gap:var(--ads-size-micro)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { actionClicked: [{
                type: Output
            }], additionalActionClicked: [{
                type: Output
            }], closeIconClicked: [{
                type: Output
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const toastAnimation = {
    toastState: trigger('state', [
        state('void, hidden', style({
            transform: 'scale(0.8)',
            opacity: 0,
        })),
        state('visible', style({
            transform: 'scale(1)',
            opacity: 1,
        })),
        transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
        transition('* => void, * => hidden', animate('75ms cubic-bezier(0.4, 0.0, 1, 1)', style({
            opacity: 0,
        }))),
    ]),
};

class QToastComponent extends BasePortalOutlet {
    dataQt = 'q-toast';
    _portalOutlet;
    _animationState = 'void';
    toastConfig = inject(QToastConfig);
    _onExit = new Subject();
    _onEnter = new Subject();
    _elementRef = inject(ElementRef);
    _destroyed = false;
    _changeDetectorRef = inject(ChangeDetectorRef);
    _ngZone = inject(NgZone);
    constructor() {
        super();
    }
    ngOnDestroy() {
        this._destroyed = true;
        this._completeExit();
    }
    attachComponentPortal(portal) {
        this._assertNotAttached();
        const result = this._portalOutlet.attachComponentPortal(portal);
        this._afterPortalAttached();
        return result;
    }
    attachTemplatePortal(portal) {
        this._assertNotAttached();
        const result = this._portalOutlet.attachTemplatePortal(portal);
        this._afterPortalAttached();
        return result;
    }
    attachDomPortal = (portal) => {
        this._assertNotAttached();
        const result = this._portalOutlet.attachDomPortal(portal);
        this._afterPortalAttached();
        return result;
    };
    onAnimationEnd(event) {
        const { fromState, toState } = event;
        if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
            this._completeExit();
        }
        if (toState === 'visible') {
            const onEnter = this._onEnter;
            onEnter.next();
            onEnter.complete();
        }
    }
    enter() {
        if (!this._destroyed) {
            this._animationState = 'visible';
            this._changeDetectorRef.detectChanges();
        }
    }
    exit() {
        this._ngZone.run(() => {
            this._animationState = 'hidden';
            this._elementRef.nativeElement.setAttribute('q-exit', '');
            this._changeDetectorRef.markForCheck();
        });
        return this._onExit;
    }
    _afterPortalAttached() {
        const element = this._elementRef.nativeElement;
        const panelType = this.toastConfig.type;
        const toastSize = this.toastConfig.size;
        const buttonsPositionClass = `buttons-position-${this.toastConfig.buttonsPosition}`;
        element.classList.add(`q-toast-${panelType}`, `q-toast-${toastSize}`, `q-toast-${buttonsPositionClass}`);
    }
    get hasLeftIcon() {
        return !!this.toastConfig?.data?.icon;
    }
    get hasRightActions() {
        return (((!!this.toastConfig?.data?.action || !!this.toastConfig?.data?.actionAdditional) &&
            this.toastConfig?.buttonsPosition === 'side') ||
            !!this.toastConfig?.data?.dismissIcon);
    }
    _completeExit() {
        this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            this._ngZone.run(() => {
                this._onExit.next();
                this._onExit.complete();
            });
        });
    }
    _assertNotAttached() {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach toast content after content is already attached');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QToastComponent, isStandalone: true, selector: "q-toast", inputs: { dataQt: "dataQt" }, host: { listeners: { "@state.done": "onAnimationEnd($event)" }, properties: { "class.q-toast-has-left-icon": "hasLeftIcon", "class.q-toast-has-right-actions": "hasRightActions", "@state": "_animationState", "attr.data-qt": "this.dataQt" }, classAttribute: "q-toast q-toast-container q-toast--open" }, viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"q-toast__surface\">\n  <ng-template cdkPortalOutlet />\n</div>\n", styles: [".q-toast-container{border-radius:var(--ads-border-radius-m);display:flex;margin:var(--ads-size-micro) var(--ads-size-micro) var(--ads-size-xxs);width:334px;padding:var(--ads-size-xxxs) var(--ads-size-xxs);min-height:46px;transform-origin:center;overflow:hidden}.q-toast-container.q-toast-has-left-icon{padding-left:var(--ads-size-xxxs)}.q-toast-container.q-toast-has-right-actions{padding-right:var(--ads-size-xxxs)}.q-toast-container.q-toast-large{width:520px}.q-toast-container>.q-toast__surface{display:flex;flex:1}.q-toast-container.q-toast-primary{background:var(--ads-color-primary-200)}.q-toast-container.q-toast-primary .q-toast-label{color:var(--ads-color-primary-700)}.q-toast-container.q-toast-primary .q-toast-label .q-icon{fill:var(--ads-color-primary-700)}.q-toast-container.q-toast-secondary{background:var(--ads-color-secondary-300)}.q-toast-container.q-toast-secondary .q-toast-label{color:var(--ads-color-secondary-contrast-100)}.q-toast-container.q-toast-secondary .q-toast-label .q-icon{fill:var(--ads-color-secondary-contrast-100)}.q-toast-container.q-toast-warning{background:var(--ads-color-warning-200)}.q-toast-container.q-toast-warning .q-toast-label{color:var(--ads-color-warning-700)}.q-toast-container.q-toast-warning .q-toast-label .q-icon{fill:var(--ads-color-warning-700)}.q-toast-container.q-toast-caution{background:var(--ads-color-caution-200)}.q-toast-container.q-toast-caution .q-toast-label{color:var(--ads-color-caution-700)}.q-toast-container.q-toast-caution .q-toast-label .q-icon{fill:var(--ads-color-caution-700)}.q-toast-container.q-toast-error{background:var(--ads-color-danger-200)}.q-toast-container.q-toast-error .q-toast-label{color:var(--ads-color-danger-700)}.q-toast-container.q-toast-error .q-toast-label .q-icon{fill:var(--ads-color-danger-700)}.q-toast-container.q-toast-promo{background:var(--ads-color-info-200)}.q-toast-container.q-toast-promo .q-toast-label{color:var(--ads-color-info-700)}.q-toast-container.q-toast-promo .q-toast-label .q-icon{fill:var(--ads-color-info-700)}.q-toast-container.q-toast-status{background:var(--ads-color-accent-200)}.q-toast-container.q-toast-status .q-toast-label{color:var(--ads-color-accent-700)}.q-toast-container.q-toast-status .q-toast-label .q-icon{fill:var(--ads-color-accent-700)}.q-toast-container.q-toast-buttons-position-bottom .q-toast-simple{min-height:66px;flex-direction:column;align-items:start}.q-toast-container.q-toast-buttons-position-bottom .q-toast-actions{display:flex;width:100%;justify-content:flex-end;margin-top:var(--ads-size-nano)}.q-toast-container.q-toast-buttons-position-bottom .q-toast-dismiss-icon{position:absolute;right:var(--ads-size-quark);top:var(--ads-size-quark)}\n"], dependencies: [{ kind: "directive", type: CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [toastAnimation.toastState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-toast', imports: [CdkPortalOutlet], encapsulation: ViewEncapsulation.None, animations: [toastAnimation.toastState], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'q-toast q-toast-container q-toast--open',
                        '[class.q-toast-has-left-icon]': 'hasLeftIcon',
                        '[class.q-toast-has-right-actions]': 'hasRightActions',
                        '[@state]': '_animationState',
                        '(@state.done)': 'onAnimationEnd($event)',
                    }, template: "<div class=\"q-toast__surface\">\n  <ng-template cdkPortalOutlet />\n</div>\n", styles: [".q-toast-container{border-radius:var(--ads-border-radius-m);display:flex;margin:var(--ads-size-micro) var(--ads-size-micro) var(--ads-size-xxs);width:334px;padding:var(--ads-size-xxxs) var(--ads-size-xxs);min-height:46px;transform-origin:center;overflow:hidden}.q-toast-container.q-toast-has-left-icon{padding-left:var(--ads-size-xxxs)}.q-toast-container.q-toast-has-right-actions{padding-right:var(--ads-size-xxxs)}.q-toast-container.q-toast-large{width:520px}.q-toast-container>.q-toast__surface{display:flex;flex:1}.q-toast-container.q-toast-primary{background:var(--ads-color-primary-200)}.q-toast-container.q-toast-primary .q-toast-label{color:var(--ads-color-primary-700)}.q-toast-container.q-toast-primary .q-toast-label .q-icon{fill:var(--ads-color-primary-700)}.q-toast-container.q-toast-secondary{background:var(--ads-color-secondary-300)}.q-toast-container.q-toast-secondary .q-toast-label{color:var(--ads-color-secondary-contrast-100)}.q-toast-container.q-toast-secondary .q-toast-label .q-icon{fill:var(--ads-color-secondary-contrast-100)}.q-toast-container.q-toast-warning{background:var(--ads-color-warning-200)}.q-toast-container.q-toast-warning .q-toast-label{color:var(--ads-color-warning-700)}.q-toast-container.q-toast-warning .q-toast-label .q-icon{fill:var(--ads-color-warning-700)}.q-toast-container.q-toast-caution{background:var(--ads-color-caution-200)}.q-toast-container.q-toast-caution .q-toast-label{color:var(--ads-color-caution-700)}.q-toast-container.q-toast-caution .q-toast-label .q-icon{fill:var(--ads-color-caution-700)}.q-toast-container.q-toast-error{background:var(--ads-color-danger-200)}.q-toast-container.q-toast-error .q-toast-label{color:var(--ads-color-danger-700)}.q-toast-container.q-toast-error .q-toast-label .q-icon{fill:var(--ads-color-danger-700)}.q-toast-container.q-toast-promo{background:var(--ads-color-info-200)}.q-toast-container.q-toast-promo .q-toast-label{color:var(--ads-color-info-700)}.q-toast-container.q-toast-promo .q-toast-label .q-icon{fill:var(--ads-color-info-700)}.q-toast-container.q-toast-status{background:var(--ads-color-accent-200)}.q-toast-container.q-toast-status .q-toast-label{color:var(--ads-color-accent-700)}.q-toast-container.q-toast-status .q-toast-label .q-icon{fill:var(--ads-color-accent-700)}.q-toast-container.q-toast-buttons-position-bottom .q-toast-simple{min-height:66px;flex-direction:column;align-items:start}.q-toast-container.q-toast-buttons-position-bottom .q-toast-actions{display:flex;width:100%;justify-content:flex-end;margin-top:var(--ads-size-nano)}.q-toast-container.q-toast-buttons-position-bottom .q-toast-dismiss-icon{position:absolute;right:var(--ads-size-quark);top:var(--ads-size-quark)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }] } });

function Q_TOAST_DEFAULT_OPTIONS_FACTORY() {
    return new QToastConfig();
}
const Q_TOAST_DEFAULT_OPTIONS = new InjectionToken('q-toast-default-options', {
    providedIn: 'root',
    factory: Q_TOAST_DEFAULT_OPTIONS_FACTORY,
});
class QToast {
    _toastRefAtThisLevel = null;
    _toastSimpleComponent = QToastSimpleComponent;
    _toastContainerComponent = QToastComponent;
    _dismissTimeout = 10000;
    _destroy$ = inject(QDestroyService);
    _overlayContainer = inject(OverlayContainer);
    _sharedMutationObserverService = inject(QSharedMutationObserverService);
    _document = inject(DOCUMENT);
    _overlay = inject(Overlay);
    _injector = inject(Injector);
    _parentToast = inject(QToast, { optional: true, skipSelf: true });
    _defaultConfig = inject(Q_TOAST_DEFAULT_OPTIONS);
    get _openedToastRef() {
        const parent = this._parentToast;
        return parent ? parent._openedToastRef : this._toastRefAtThisLevel;
    }
    set _openedToastRef(value) {
        if (this._parentToast) {
            this._parentToast._openedToastRef = value;
        }
        else {
            this._toastRefAtThisLevel = value;
        }
    }
    ngOnDestroy() {
        if (this._toastRefAtThisLevel) {
            this._toastRefAtThisLevel.dismiss();
        }
    }
    openFromComponent(component, config) {
        return this._attach(component, config);
    }
    open(message, action = '', actionAdditional = '', config) {
        const _config = { ...this._defaultConfig, ...config };
        _config.data = {
            message,
            action,
            actionAdditional,
            icon: config?.icon || '',
            dismissIcon: config?.dismissIcon || this._defaultConfig.dismissIcon || false,
            buttonType: config?.buttonType || this._defaultConfig.buttonType,
            buttonAdditionalType: config?.buttonAdditionalType || this._defaultConfig.buttonAdditionalType,
            buttonsPosition: config?.buttonsPosition || this._defaultConfig.buttonsPosition,
        };
        return this.openFromComponent(this._toastSimpleComponent, _config);
    }
    dismiss() {
        if (this._openedToastRef) {
            this._openedToastRef.dismiss();
        }
    }
    _attachToastContainer(overlayRef, config) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this._injector,
            providers: [{ provide: QToastConfig, useValue: config }],
        });
        const containerPortal = new ComponentPortal(this._toastContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.toastConfig = config;
        return containerRef.instance;
    }
    _attach(content, userConfig) {
        const config = { ...new QToastConfig(), ...this._defaultConfig, ...userConfig };
        const overlayRef = this._createOverlay(config);
        const container = this._attachToastContainer(overlayRef, config);
        const toastRef = new QToastRef(container, overlayRef);
        if (content instanceof TemplateRef) {
            const portal = new TemplatePortal(content, null, { $implicit: config.data, toastRef });
            toastRef.instance = container.attachTemplatePortal(portal);
        }
        else {
            const injector = this._createInjector(config, toastRef);
            const portal = new ComponentPortal(content, undefined, injector);
            const contentRef = container.attachComponentPortal(portal);
            toastRef.instance = contentRef.instance;
        }
        const overlayContainer = this._overlayContainer.getContainerElement();
        if (config.sourceDialogElement) {
            overlayContainer.parentNode?.removeChild(overlayContainer);
            config.sourceDialogElement.appendChild(overlayContainer);
            this._sharedMutationObserverService
                .observe(config.sourceDialogElement, { attributes: true })
                ?.pipe(takeUntil(this._destroy$))
                .subscribe((mutations) => {
                mutations.forEach((mutation) => {
                    const dialogElement = mutation.target;
                    if (dialogElement.hasAttribute('open')) {
                        overlayContainer.parentNode?.removeChild(overlayContainer);
                        config.sourceDialogElement?.appendChild(overlayContainer);
                    }
                    else if (overlayContainer.parentNode !== this._document.body) {
                        overlayContainer.parentNode?.removeChild(overlayContainer);
                        this._document.body.appendChild(overlayContainer);
                    }
                });
            });
        }
        else if (config.sourcePopoverElement) {
            overlayContainer.parentNode?.removeChild(overlayContainer);
            config.sourcePopoverElement.appendChild(overlayContainer);
            const handlePopoverToggle = (event) => {
                const toggleEvent = event;
                if (toggleEvent.newState === 'open') {
                    overlayContainer.parentNode?.removeChild(overlayContainer);
                    config.sourcePopoverElement?.appendChild(overlayContainer);
                }
                else if (toggleEvent.newState === 'closed' &&
                    overlayContainer.parentNode !== this._document.body) {
                    overlayContainer.parentNode?.removeChild(overlayContainer);
                    this._document.body.appendChild(overlayContainer);
                }
            };
            config.sourcePopoverElement.addEventListener('beforetoggle', handlePopoverToggle);
            toastRef
                .afterDismissed()
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                config.sourcePopoverElement?.removeEventListener('beforetoggle', handlePopoverToggle);
            });
        }
        else if (overlayContainer.parentNode !== this._document.body) {
            this._document.body.appendChild(overlayContainer);
        }
        this._animateToast(toastRef, config);
        this._openedToastRef = toastRef;
        return this._openedToastRef;
    }
    _animateToast(toastRef, config) {
        toastRef
            .afterDismissed()
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            if (this._openedToastRef === toastRef) {
                this._openedToastRef = null;
            }
        });
        if (this._openedToastRef) {
            this._openedToastRef
                .afterDismissed()
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                toastRef.containerInstance.enter();
            });
            this._openedToastRef.dismiss();
        }
        else {
            toastRef.containerInstance.enter();
        }
        if (config.autoDismiss) {
            toastRef
                .afterOpened()
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => toastRef._dismissAfter(this._dismissTimeout));
        }
    }
    _createOverlay(config) {
        const overlayConfig = new OverlayConfig();
        const positionStrategy = this._overlay.position().global();
        const isLeft = config.horizontalPosition === 'left';
        const isRight = !isLeft && config.horizontalPosition !== 'center';
        if (isLeft) {
            positionStrategy.left('0');
        }
        else if (isRight) {
            positionStrategy.right('0');
        }
        else {
            positionStrategy.centerHorizontally();
        }
        if (config.verticalPosition === 'top') {
            positionStrategy.top('0');
        }
        else {
            positionStrategy.bottom('0');
        }
        if (config.dismissIcon &&
            config.size === 'standard' &&
            config.buttonsPosition === 'side' &&
            config.data &&
            config.data.action &&
            config.data.actionAdditional) {
            config.data.buttonsPosition = 'bottom';
            config.buttonsPosition = 'bottom';
        }
        overlayConfig.positionStrategy = positionStrategy;
        return this._overlay.create(overlayConfig);
    }
    _createInjector(config, toastRef) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        return Injector.create({
            parent: userInjector || this._injector,
            providers: [
                { provide: QToastRef, useValue: toastRef },
                { provide: Q_TOAST_DATA, useValue: config.data },
            ],
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToast, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToast });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToast, decorators: [{
            type: Injectable
        }] });

class QToastModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: QToastModule, imports: [QToastComponent, QToastLabelDirective, QToastActionsDirective, QToastActionDirective], exports: [QToastComponent, QToastLabelDirective, QToastActionsDirective, QToastActionDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastModule, providers: [QDestroyService, QToast] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [QToastComponent, QToastLabelDirective, QToastActionsDirective, QToastActionDirective],
                    // vvasylevskyy: why do we export these directives here and via API? Looks like it is for the internal use only.
                    exports: [QToastComponent, QToastLabelDirective, QToastActionsDirective, QToastActionDirective],
                    providers: [QDestroyService, QToast],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { QToast, QToastActionDirective, QToastActionsDirective, QToastComponent, QToastConfig, QToastLabelDirective, QToastModule, QToastRef, QToastSimpleComponent, Q_TOAST_DATA, Q_TOAST_DEFAULT_OPTIONS, Q_TOAST_DEFAULT_OPTIONS_FACTORY };
//# sourceMappingURL=questrade-allspark-angular-components-toast.mjs.map
