import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { inject, ElementRef, HostBinding, Input, Directive, EventEmitter, booleanAttribute, ViewChild, Output, ChangeDetectionStrategy, Component } from '@angular/core';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { QButtonComponent } from '@questrade/allspark-angular-components/button';
import { QIconComponent } from '@questrade/allspark-angular-components/icon';
import { QOverlayComponent } from '@questrade/allspark-angular-components/overlay';

class QPromotionalMessageTriggerDirective {
    get message() {
        return this._message;
    }
    set message(message) {
        if (message === this._message)
            return;
        if (this._overlayOrigin) {
            message.openedBy = this._overlayOrigin;
        }
        this._message = message;
        this.message.closed.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._closeMessage();
        });
    }
    hostClass = 'q-highlight-content';
    _message;
    _elementRef = inject(ElementRef);
    _destroy$ = inject(QDestroyService);
    _overlayOrigin = null;
    constructor() {
        this._overlayOrigin = new CdkOverlayOrigin(this._elementRef);
    }
    _closeMessage() {
        if (this.message.isOpened) {
            this.message?.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPromotionalMessageTriggerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QPromotionalMessageTriggerDirective, isStandalone: true, selector: "[qPromotionalMessageTrigger]", inputs: { message: ["qPromotionalMessageTrigger", "message"] }, host: { properties: { "class": "this.hostClass" } }, providers: [QDestroyService], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPromotionalMessageTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qPromotionalMessageTrigger]',
                    providers: [QDestroyService],
                }]
        }], ctorParameters: () => [], propDecorators: { message: [{
                type: Input,
                args: ['qPromotionalMessageTrigger']
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QPromotionalMessageComponent {
    closed = new EventEmitter();
    title = '';
    message = '';
    icon = '';
    position = 'bottom';
    primaryButtonText = '';
    secondaryButtonText = '';
    hasSecondaryButton = false;
    openMessageOnInit = false;
    dataQt = 'promotional-message';
    _overlay;
    hostClass = 'q-promotional-message';
    openedBy;
    positions = [];
    _positionsMap = {
        top: {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -10,
            panelClass: 'top',
        },
        right: {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: 10,
            panelClass: 'right',
        },
        bottom: {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 10,
            panelClass: 'bottom',
        },
        left: {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: -10,
            panelClass: 'left',
        },
    };
    _destroy$ = inject(QDestroyService);
    ngOnInit() {
        this.positions = this._getPositions();
    }
    ngAfterViewInit() {
        this._overlay.closed.pipe(takeUntil(this._destroy$)).subscribe(() => this.closed.emit());
        if (this.openMessageOnInit) {
            this.open();
        }
    }
    open() {
        if (this.isOpened)
            return;
        this._overlay.open();
    }
    close() {
        this._overlay.close();
        this.closed.emit();
    }
    _getPositions() {
        if (this.position === 'right') {
            return [
                this._positionsMap.right,
                this._positionsMap.left,
                this._positionsMap.top,
                this._positionsMap.bottom,
            ];
        }
        else if (this.position === 'left') {
            return [
                this._positionsMap.left,
                this._positionsMap.right,
                this._positionsMap.top,
                this._positionsMap.bottom,
            ];
        }
        else if (this.position === 'bottom') {
            return [
                this._positionsMap.bottom,
                this._positionsMap.top,
                this._positionsMap.right,
                this._positionsMap.left,
            ];
        }
        else
            return [
                this._positionsMap.top,
                this._positionsMap.bottom,
                this._positionsMap.right,
                this._positionsMap.left,
            ];
    }
    get isOpened() {
        return this._overlay.isOpened;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPromotionalMessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QPromotionalMessageComponent, isStandalone: true, selector: "q-promotional-message", inputs: { title: "title", message: "message", icon: "icon", position: "position", primaryButtonText: "primaryButtonText", secondaryButtonText: "secondaryButtonText", hasSecondaryButton: ["hasSecondaryButton", "hasSecondaryButton", booleanAttribute], openMessageOnInit: ["openMessageOnInit", "openMessageOnInit", booleanAttribute], dataQt: "dataQt" }, outputs: { closed: "closed" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "_overlay", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: "<q-overlay\n  #overlay\n  [backdropClass]=\"'q-overlay-backdrop'\"\n  [panelClass]=\"['q-overlay-panel', 'q-pm-overlay-panel']\"\n  [overlayOrigin]=\"openedBy\"\n  [positions]=\"positions\">\n  <div class=\"q-promotional-message-arrow\"></div>\n  <ng-content>\n    <div tabindex=\"-1\" class=\"q-promotional-message-panel\" [attr.data-qt]=\"dataQt\">\n      <div class=\"q-promotional-message-container\">\n        <div class=\"q-promotional-message-content\" [attr.data-qt]=\"'q-promotional-message-content'\">\n          <div *ngIf=\"icon\" class=\"q-promotional-message-icon-wrapper\">\n            <q-icon [size]=\"'24'\" [name]=\"icon\" [dataQt]=\"'q-promotional-message-container-icon'\" />\n          </div>\n\n          <div\n            class=\"q-promotional-message-message\"\n            [attr.data-qt]=\"'q-promotional-message-message'\">\n            <div\n              *ngIf=\"title\"\n              class=\"q-promotional-message-header\"\n              [attr.data-qt]=\"'q-promotional-message-header'\">\n              {{ title }}\n            </div>\n            {{ message }}\n          </div>\n        </div>\n\n        <div class=\"q-promotional-message-actions\" [attr.data-qt]=\"'q-promotional-message-actions'\">\n          <button\n            *ngIf=\"hasSecondaryButton\"\n            q-button\n            variant=\"secondary\"\n            size=\"small\"\n            [dataQt]=\"'q-promotional-message-button-secondary'\"\n            (click)=\"close()\">\n            {{ secondaryButtonText }}\n          </button>\n\n          <button\n            q-button\n            variant=\"primary\"\n            size=\"small\"\n            [dataQt]=\"'q-promotional-message-button-primary'\"\n            (click)=\"close()\">\n            {{ primaryButtonText }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </ng-content>\n</q-overlay>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-promotional-message-panel{max-height:calc(100vh - 50px);min-height:46px;min-width:146px;max-width:312px;outline:0;border-width:0}.q-promotional-message-header{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;margin-bottom:var(--ads-size-xxxs)}.q-promotional-message-header .q-icon{vertical-align:bottom;margin-right:var(--ads-size-nano)}.q-promotional-message-container{display:flex;flex-direction:column;padding:var(--ads-size-s)}.q-promotional-message-content{color:var(--ads-color-body-contrast-100);display:flex}.q-promotional-message-message{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-promotional-message-message.padding-left{padding-left:var(--ads-size-m)}.q-promotional-message-icon-wrapper{padding-right:var(--ads-size-micro)}.q-promotional-message-actions{display:flex;margin-left:auto;margin-top:var(--ads-size-xxs);align-self:center;gap:var(--ads-size-xxs);flex-direction:row}.q-promotional-message-arrow{-webkit-mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 8 16'><path fill='black' d='M8 16V0L1.4 6.6a2 2 0 0 0 0 2.8L8 16Z'/></svg>\");mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 8 16'><path fill='black' d='M8 16V0L1.4 6.6a2 2 0 0 0 0 2.8L8 16Z'/></svg>\");mask-type:alpha;height:var(--ads-size-xxs);width:var(--ads-size-micro);position:absolute;background-color:var(--ads-color-body-100);z-index:1001}::ng-deep .q-highlight-content{background-color:var(--ads-color-body-contrast-700);display:inline-flex;position:relative;z-index:1001;border-radius:var(--ads-border-radius-s);padding:var(--ads-size-micro) var(--ads-size-nano)}::ng-deep .q-overlay-panel.q-pm-overlay-panel{overflow:initial}::ng-deep .top .q-promotional-message-arrow{transform:rotate(270deg) translate(50%);top:100%;left:50%}::ng-deep .bottom .q-promotional-message-arrow{transform:rotate(90deg) translate(50%);bottom:100%;left:50%}::ng-deep .left .q-promotional-message-arrow{transform:rotate(180deg) translateY(50%);top:50%;left:100%}::ng-deep .right .q-promotional-message-arrow{transform:translateY(-50%);right:100%;top:50%}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QOverlayComponent, selector: "q-overlay", inputs: ["top", "bottom", "left", "right", "offsetY", "offsetX", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "yPosition", "xPosition", "positions", "overlayOrigin", "panelClass", "backdropClass", "scrollStrategy", "closeAnimationDone", "priorityPositions", "closeOnBackdropClick", "flexibleDimensions", "disableClose", "hasBackdrop", "closeOnEsc"], outputs: ["opened", "closed", "overlayOriginChange"] }, { kind: "component", type: QButtonComponent, selector: "    button[q-button],    button[q-text-button],    button[q-icon-button],  ", inputs: ["icon", "loadingText", "size", "variant", "iconPosition", "loading", "analyticsCssClassIdentifier", "dataQt", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPromotionalMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-promotional-message', imports: [NgIf, QIconComponent, QOverlayComponent, QButtonComponent], providers: [QDestroyService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<q-overlay\n  #overlay\n  [backdropClass]=\"'q-overlay-backdrop'\"\n  [panelClass]=\"['q-overlay-panel', 'q-pm-overlay-panel']\"\n  [overlayOrigin]=\"openedBy\"\n  [positions]=\"positions\">\n  <div class=\"q-promotional-message-arrow\"></div>\n  <ng-content>\n    <div tabindex=\"-1\" class=\"q-promotional-message-panel\" [attr.data-qt]=\"dataQt\">\n      <div class=\"q-promotional-message-container\">\n        <div class=\"q-promotional-message-content\" [attr.data-qt]=\"'q-promotional-message-content'\">\n          <div *ngIf=\"icon\" class=\"q-promotional-message-icon-wrapper\">\n            <q-icon [size]=\"'24'\" [name]=\"icon\" [dataQt]=\"'q-promotional-message-container-icon'\" />\n          </div>\n\n          <div\n            class=\"q-promotional-message-message\"\n            [attr.data-qt]=\"'q-promotional-message-message'\">\n            <div\n              *ngIf=\"title\"\n              class=\"q-promotional-message-header\"\n              [attr.data-qt]=\"'q-promotional-message-header'\">\n              {{ title }}\n            </div>\n            {{ message }}\n          </div>\n        </div>\n\n        <div class=\"q-promotional-message-actions\" [attr.data-qt]=\"'q-promotional-message-actions'\">\n          <button\n            *ngIf=\"hasSecondaryButton\"\n            q-button\n            variant=\"secondary\"\n            size=\"small\"\n            [dataQt]=\"'q-promotional-message-button-secondary'\"\n            (click)=\"close()\">\n            {{ secondaryButtonText }}\n          </button>\n\n          <button\n            q-button\n            variant=\"primary\"\n            size=\"small\"\n            [dataQt]=\"'q-promotional-message-button-primary'\"\n            (click)=\"close()\">\n            {{ primaryButtonText }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </ng-content>\n</q-overlay>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-promotional-message-panel{max-height:calc(100vh - 50px);min-height:46px;min-width:146px;max-width:312px;outline:0;border-width:0}.q-promotional-message-header{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;margin-bottom:var(--ads-size-xxxs)}.q-promotional-message-header .q-icon{vertical-align:bottom;margin-right:var(--ads-size-nano)}.q-promotional-message-container{display:flex;flex-direction:column;padding:var(--ads-size-s)}.q-promotional-message-content{color:var(--ads-color-body-contrast-100);display:flex}.q-promotional-message-message{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-promotional-message-message.padding-left{padding-left:var(--ads-size-m)}.q-promotional-message-icon-wrapper{padding-right:var(--ads-size-micro)}.q-promotional-message-actions{display:flex;margin-left:auto;margin-top:var(--ads-size-xxs);align-self:center;gap:var(--ads-size-xxs);flex-direction:row}.q-promotional-message-arrow{-webkit-mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 8 16'><path fill='black' d='M8 16V0L1.4 6.6a2 2 0 0 0 0 2.8L8 16Z'/></svg>\");mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 8 16'><path fill='black' d='M8 16V0L1.4 6.6a2 2 0 0 0 0 2.8L8 16Z'/></svg>\");mask-type:alpha;height:var(--ads-size-xxs);width:var(--ads-size-micro);position:absolute;background-color:var(--ads-color-body-100);z-index:1001}::ng-deep .q-highlight-content{background-color:var(--ads-color-body-contrast-700);display:inline-flex;position:relative;z-index:1001;border-radius:var(--ads-border-radius-s);padding:var(--ads-size-micro) var(--ads-size-nano)}::ng-deep .q-overlay-panel.q-pm-overlay-panel{overflow:initial}::ng-deep .top .q-promotional-message-arrow{transform:rotate(270deg) translate(50%);top:100%;left:50%}::ng-deep .bottom .q-promotional-message-arrow{transform:rotate(90deg) translate(50%);bottom:100%;left:50%}::ng-deep .left .q-promotional-message-arrow{transform:rotate(180deg) translateY(50%);top:50%;left:100%}::ng-deep .right .q-promotional-message-arrow{transform:translateY(-50%);right:100%;top:50%}\n"] }]
        }], propDecorators: { closed: [{
                type: Output
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], icon: [{
                type: Input
            }], position: [{
                type: Input
            }], primaryButtonText: [{
                type: Input
            }], secondaryButtonText: [{
                type: Input
            }], hasSecondaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], openMessageOnInit: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _overlay: [{
                type: ViewChild,
                args: ['overlay']
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_PROMOTIONAL_MESSAGE_COMPONENTS = [
    QPromotionalMessageComponent,
    QPromotionalMessageTriggerDirective,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QPromotionalMessageComponent, QPromotionalMessageTriggerDirective, Q_PROMOTIONAL_MESSAGE_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-promotional-message.mjs.map
