import * as i0 from '@angular/core';
import { EventEmitter, inject, ChangeDetectorRef, numberAttribute, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component, ElementRef, NgZone, DOCUMENT, HostListener, Directive, InjectionToken } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Overlay, ScrollDispatcher, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { QDestroyService, QPlatformService } from '@questrade/allspark-angular-components/core/services';
import { takeUntil } from 'rxjs';

const STATES = [
    state('void,closed', style({
        opacity: 0.4,
        transform: 'translate({{translationX}}px, {{translationY}}px)',
    }), {
        params: {
            translationX: 0,
            translationY: 0,
        },
    }),
    state('open', style({
        opacity: 1,
        transform: 'translate(0, 0)',
    })),
];
const tooltipAnimation = [
    trigger('openClose', [
        ...STATES,
        transition('void => open, closed => open', [animate('{{showDelay}}ms')], {
            params: { showDelay: 150 },
        }),
        transition('open => closed', [animate('{{hideDelay}}ms')], {
            params: { hideDelay: 150 },
        }),
    ]),
];

class QTooltipComponent {
    closeAnimationDone = new EventEmitter();
    value = '';
    dataQt = 'q-tooltip';
    // TODO: Remove the following inputs once this component is made private
    showDelay = 150;
    hideDelay = 150;
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
        this._changeDetectorRef.detectChanges();
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        this._changeDetectorRef.detectChanges();
    }
    hostClass = 'q-tooltip';
    _isOpen = false;
    _position = null;
    _changeDetectorRef = inject(ChangeDetectorRef);
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
    _onAnimationDone(event) {
        if (event.fromState === 'open' && event.toState === 'closed') {
            this.closeAnimationDone.emit();
        }
    }
    get translationValues() {
        if (this.position === 'right') {
            return {
                x: -4,
                y: 0,
            };
        }
        else if (this.position === 'left') {
            return {
                x: 4,
                y: 0,
            };
        }
        else if (this.position === 'top') {
            return {
                x: 0,
                y: 4,
            };
        }
        else if (this.position === 'bottom') {
            return {
                x: 0,
                y: -4,
            };
        }
        return {
            x: 0,
            y: 0,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QTooltipComponent, isStandalone: true, selector: "q-tooltip", inputs: { value: "value", dataQt: "dataQt", showDelay: ["showDelay", "showDelay", numberAttribute], hideDelay: ["hideDelay", "hideDelay", numberAttribute] }, outputs: { closeAnimationDone: "closeAnimationDone" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, ngImport: i0, template: "<div\n  class=\"q-tooltip-container\"\n  [class.q-tooltip-top]=\"position === 'top'\"\n  [class.q-tooltip-bottom]=\"position === 'bottom'\"\n  [class.q-tooltip-right]=\"position === 'right'\"\n  [class.q-tooltip-left]=\"position === 'left'\"\n  [@openClose]=\"{\n    value: isOpen ? 'open' : 'closed',\n    params: {\n      translationX: translationValues.x,\n      translationY: translationValues.y,\n    },\n  }\"\n  (@openClose.done)=\"_onAnimationDone($event)\">\n  {{ value }}\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-tooltip{font-family:var(--awds-tooltip-container-font-family, var(--ads-font-family-body));font-size:var(--awds-tooltip-container-font-size, var(--ads-font-size-xs));font-style:var(--awds-tooltip-container-font-style, inherit);font-weight:var(--awds-tooltip-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-tooltip-container-letter-spacing, 0);line-height:var(--awds-tooltip-container-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-tooltip-container-text-transform, none)}.q-tooltip .q-tooltip-container{padding:var(--awds-tooltip-container-padding, var(--ads-size-micro) var(--ads-size-xxxs));background:var(--awds-tooltip-container-background, var(--ads-color-body-700));color:var(--awds-tooltip-container-color, var(--ads-color-body-contrast-700));border-radius:var(--awds-tooltip-container-border-radius, var(--ads-border-radius-s));border:var(--awds-tooltip-container-border);display:flex;align-items:center;position:relative;min-width:var(--awds-tooltip-container-min-width);max-width:var(--awds-tooltip-container-max-width)}.q-tooltip .q-tooltip-container:before{-webkit-mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 8'><path fill='black' d='M16 0H0l6.6 6.6c.8.8 2 .8 2.8 0L16 0Z'/></svg>\");mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 8'><path fill='black' d='M16 0H0l6.6 6.6c.8.8 2 .8 2.8 0L16 0Z'/></svg>\");mask-type:alpha;content:\"\";background:var(--awds-tooltip-tip-background, var(--ads-color-body-700));position:absolute;width:var(--awds-tooltip-tip-width, var(--ads-size-xxs));height:var(--awds-tooltip-tip-height, var(--ads-size-micro))}.q-tooltip .q-tooltip-container.q-tooltip-top:before{transform:rotate(0) translate(-50%);top:100%;left:50%}.q-tooltip .q-tooltip-container.q-tooltip-bottom:before{transform:rotate(180deg) translate(50%);bottom:100%;left:50%}.q-tooltip .q-tooltip-container.q-tooltip-left:before{transform:rotate(-90deg) translate(25%,-50%);left:100%;top:50%}.q-tooltip .q-tooltip-container.q-tooltip-right:before{transform:rotate(90deg) translate(-25%,-50%);right:100%;top:50%}\n"], animations: [tooltipAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-tooltip', animations: [tooltipAnimation], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  class=\"q-tooltip-container\"\n  [class.q-tooltip-top]=\"position === 'top'\"\n  [class.q-tooltip-bottom]=\"position === 'bottom'\"\n  [class.q-tooltip-right]=\"position === 'right'\"\n  [class.q-tooltip-left]=\"position === 'left'\"\n  [@openClose]=\"{\n    value: isOpen ? 'open' : 'closed',\n    params: {\n      translationX: translationValues.x,\n      translationY: translationValues.y,\n    },\n  }\"\n  (@openClose.done)=\"_onAnimationDone($event)\">\n  {{ value }}\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-tooltip{font-family:var(--awds-tooltip-container-font-family, var(--ads-font-family-body));font-size:var(--awds-tooltip-container-font-size, var(--ads-font-size-xs));font-style:var(--awds-tooltip-container-font-style, inherit);font-weight:var(--awds-tooltip-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-tooltip-container-letter-spacing, 0);line-height:var(--awds-tooltip-container-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-tooltip-container-text-transform, none)}.q-tooltip .q-tooltip-container{padding:var(--awds-tooltip-container-padding, var(--ads-size-micro) var(--ads-size-xxxs));background:var(--awds-tooltip-container-background, var(--ads-color-body-700));color:var(--awds-tooltip-container-color, var(--ads-color-body-contrast-700));border-radius:var(--awds-tooltip-container-border-radius, var(--ads-border-radius-s));border:var(--awds-tooltip-container-border);display:flex;align-items:center;position:relative;min-width:var(--awds-tooltip-container-min-width);max-width:var(--awds-tooltip-container-max-width)}.q-tooltip .q-tooltip-container:before{-webkit-mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 8'><path fill='black' d='M16 0H0l6.6 6.6c.8.8 2 .8 2.8 0L16 0Z'/></svg>\");mask-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 8'><path fill='black' d='M16 0H0l6.6 6.6c.8.8 2 .8 2.8 0L16 0Z'/></svg>\");mask-type:alpha;content:\"\";background:var(--awds-tooltip-tip-background, var(--ads-color-body-700));position:absolute;width:var(--awds-tooltip-tip-width, var(--ads-size-xxs));height:var(--awds-tooltip-tip-height, var(--ads-size-micro))}.q-tooltip .q-tooltip-container.q-tooltip-top:before{transform:rotate(0) translate(-50%);top:100%;left:50%}.q-tooltip .q-tooltip-container.q-tooltip-bottom:before{transform:rotate(180deg) translate(50%);bottom:100%;left:50%}.q-tooltip .q-tooltip-container.q-tooltip-left:before{transform:rotate(-90deg) translate(25%,-50%);left:100%;top:50%}.q-tooltip .q-tooltip-container.q-tooltip-right:before{transform:rotate(90deg) translate(-25%,-50%);right:100%;top:50%}\n"] }]
        }], propDecorators: { closeAnimationDone: [{
                type: Output
            }], value: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], showDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], hideDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const position = {
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
class QTooltipDirective {
    placement = 'right';
    showDelay = 0;
    hideDelay = 0;
    longPressDelay = 500;
    tooltipValue = '';
    dataQt = 'q-tooltip';
    touchendHideDelay = 1500;
    _onMouseEnter() {
        if (this._isMobilePlatform)
            return;
        this._show(this.showDelay);
    }
    _onMouseLeave(event) {
        if (this._isMobilePlatform)
            return;
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._elementRef.nativeElement.contains(newTarget)) {
            this._hide(this.hideDelay);
        }
    }
    _onWheelMove(event) {
        if (this._tooltipComponent?.isOpen) {
            const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
            const element = this._elementRef.nativeElement;
            // `mouseleave` event won't fire if the user scrolls away using the wheel without moving
            // their cursor. So we find the element under the user's cursor and close the tooltip if
            // it's not the trigger.
            if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
                this._hide(0);
            }
        }
    }
    _onTouchStart() {
        this._show(this.longPressDelay);
    }
    _onTouchEnd() {
        this._hide(this.touchendHideDelay);
    }
    _overlayRef = null;
    _tooltipComponent = null;
    _hideTimeout = null;
    _showTimeout = null;
    _overlay = inject(Overlay);
    _elementRef = inject(ElementRef);
    _destroy$ = inject(QDestroyService);
    _platform = inject(QPlatformService);
    _ngZone = inject(NgZone);
    _focusMonitor = inject(FocusMonitor);
    _document = inject(DOCUMENT);
    _isMobilePlatform = this._platform.ANDROID || this._platform.IOS;
    _scrollDispatcher = inject(ScrollDispatcher);
    _overlayContainer = inject(OverlayContainer);
    ngOnDestroy() {
        this._disposeTooltip();
    }
    ngAfterViewInit() {
        this._focusMonitor
            .monitor(this._elementRef)
            .pipe(takeUntil(this._destroy$))
            .subscribe((origin) => {
            if (!origin) {
                this._ngZone.run(() => this._hide(this.hideDelay));
            }
            else if (origin === 'keyboard') {
                this._ngZone.run(() => this._show(this.showDelay));
            }
        });
    }
    _getPositions() {
        if (this.placement === 'right') {
            return [position.right, position.left, position.top, position.bottom];
        }
        else if (this.placement === 'left') {
            return [position.left, position.right, position.top, position.bottom];
        }
        else if (this.placement === 'bottom') {
            return [position.bottom, position.top, position.right, position.left];
        }
        else
            return [position.top, position.bottom, position.right, position.left];
    }
    _getTooltipElement() {
        return this._tooltipComponent;
    }
    _show(delay) {
        if (!this.tooltipValue)
            return;
        this._clearHideTimer();
        this._showTimeout = setTimeout(() => {
            this._createAndAttachTooltip();
            this._initializeTooltipProperties();
            if (this._tooltipComponent)
                this._tooltipComponent.isOpen = true;
        }, delay);
    }
    _hide(delay) {
        this._clearShowTimer();
        this._hideTimeout = setTimeout(() => {
            if (this._tooltipComponent)
                this._tooltipComponent.isOpen = false;
        }, delay);
    }
    _createAndAttachTooltip() {
        if (this._overlayRef)
            return;
        this._relocateOverlayContainer();
        const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this._elementRef)
            .withPositions(this._getPositions())
            .withScrollableContainers(scrollableAncestors)
            .withFlexibleDimensions(false);
        this._overlayRef = this._overlay.create({
            positionStrategy,
            scrollStrategy: this._overlay.scrollStrategies.reposition({ scrollThrottle: 20 }),
        });
        positionStrategy.positionChanges.pipe(takeUntil(this._destroy$)).subscribe((pos) => {
            if (!this._tooltipComponent)
                return;
            if (pos.scrollableViewProperties.isOverlayClipped &&
                this._tooltipComponent.isOpen &&
                this._tooltipComponent.position) {
                this._tooltipComponent.isOpen = false;
            }
            this._tooltipComponent.position = pos.connectionPair.panelClass;
        });
        this._tooltipComponent = this._overlayRef.attach(new ComponentPortal(QTooltipComponent)).instance;
    }
    _disposeTooltip() {
        this._overlayRef?.dispose();
        this._overlayRef = null;
    }
    _initializeTooltipProperties() {
        if (!this._tooltipComponent)
            return;
        this._tooltipComponent.value = this.tooltipValue;
        this._tooltipComponent.dataQt = this.dataQt;
        this._tooltipComponent.closeAnimationDone
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => this._disposeTooltip());
    }
    _relocateOverlayContainer() {
        const originElement = this._elementRef.nativeElement;
        const popoverContainer = originElement.closest('[popover][q-popover], [popover][qPopover]');
        const dialogContainer = originElement.closest('dialog[q-dialog], dialog[qDialog]');
        const overlayContainer = this._overlayContainer.getContainerElement();
        if (popoverContainer?.contains(originElement)) {
            overlayContainer.parentNode?.removeChild(overlayContainer);
            popoverContainer.appendChild(overlayContainer);
        }
        else if (dialogContainer?.contains(originElement)) {
            overlayContainer.parentNode?.removeChild(overlayContainer);
            dialogContainer.appendChild(overlayContainer);
        }
        else if (overlayContainer.parentNode !== this._document.body) {
            this._document.body.appendChild(this._overlayContainer.getContainerElement());
        }
    }
    _clearShowTimer() {
        if (this._showTimeout) {
            clearTimeout(this._showTimeout);
            this._showTimeout = null;
        }
    }
    _clearHideTimer() {
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: QTooltipDirective, isStandalone: true, selector: "[qTooltip]", inputs: { placement: ["qTooltipPosition", "placement"], showDelay: ["qTooltipShowDelay", "showDelay", numberAttribute], hideDelay: ["qTooltipHideDelay", "hideDelay", numberAttribute], longPressDelay: ["qTooltipLongPressDelay", "longPressDelay", numberAttribute], tooltipValue: ["qTooltip", "tooltipValue"], dataQt: ["qTooltipDataQt", "dataQt"], touchendHideDelay: ["qTooltipTouchendHideDelay", "touchendHideDelay", numberAttribute] }, host: { listeners: { "mouseenter": "_onMouseEnter()", "mouseleave": "_onMouseLeave($event)", "wheel": "_onWheelMove($event)", "touchstart": "_onTouchStart()", "touchend": "_onTouchEnd()" } }, providers: [QDestroyService], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qTooltip]',
                    providers: [QDestroyService],
                }]
        }], propDecorators: { placement: [{
                type: Input,
                args: ['qTooltipPosition']
            }], showDelay: [{
                type: Input,
                args: [{ alias: 'qTooltipShowDelay', transform: numberAttribute }]
            }], hideDelay: [{
                type: Input,
                args: [{ alias: 'qTooltipHideDelay', transform: numberAttribute }]
            }], longPressDelay: [{
                type: Input,
                args: [{ alias: 'qTooltipLongPressDelay', transform: numberAttribute }]
            }], tooltipValue: [{
                type: Input,
                args: ['qTooltip']
            }], dataQt: [{
                type: Input,
                args: ['qTooltipDataQt']
            }], touchendHideDelay: [{
                type: Input,
                args: [{
                        alias: 'qTooltipTouchendHideDelay',
                        transform: numberAttribute,
                    }]
            }], _onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], _onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave', ['$event']]
            }], _onWheelMove: [{
                type: HostListener,
                args: ['wheel', ['$event']]
            }], _onTouchStart: [{
                type: HostListener,
                args: ['touchstart']
            }], _onTouchEnd: [{
                type: HostListener,
                args: ['touchend']
            }] } });

const TOOLTIP_DEFAULT_OPTIONS = {
    showDelay: 0,
    hideDelay: 0,
};
const TOOLTIP_OPTIONS = new InjectionToken('Tooltip options token');

/**
 * Generated bundle index. Do not edit.
 */

export { QTooltipComponent, QTooltipDirective, TOOLTIP_DEFAULT_OPTIONS, TOOLTIP_OPTIONS };
//# sourceMappingURL=questrade-allspark-angular-components-tooltip.mjs.map
