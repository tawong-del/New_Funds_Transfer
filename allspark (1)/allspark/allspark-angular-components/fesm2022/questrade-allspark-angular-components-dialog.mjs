import * as i0 from '@angular/core';
import { HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, inject, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import * as i1 from '@questrade/allspark-angular-components/core/directives';
import { QScrollShadowDirective } from '@questrade/allspark-angular-components/core/directives';
import { BreakpointObserver } from '@angular/cdk/layout';
import { injectDestroy } from '@questrade/allspark-angular-components/core/utils';
import { takeUntil } from 'rxjs';

class QDialogContentComponent {
    dataQt = 'q-dialog-content';
    _hostClass = 'q-dialog-content';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QDialogContentComponent, isStandalone: true, selector: "q-dialog-content, [q-dialog-content], [qDialogContent]", inputs: { dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClass" } }, hostDirectives: [{ directive: i1.QScrollShadowDirective }], ngImport: i0, template: '<ng-content />', isInline: true, styles: [".q-dialog-content{display:var(--awds-dialog-content-display, block);overflow:var(--awds-dialog-content-overflow, auto);padding:var(--awds-dialog-content-padding, 0 var(--ads-size-m))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogContentComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, hostDirectives: [QScrollShadowDirective], selector: 'q-dialog-content, [q-dialog-content], [qDialogContent]', template: '<ng-content />', styles: [".q-dialog-content{display:var(--awds-dialog-content-display, block);overflow:var(--awds-dialog-content-overflow, auto);padding:var(--awds-dialog-content-padding, 0 var(--ads-size-m))}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QDialogFooterComponent {
    dataQt = 'q-dialog-footer';
    _hostClass = 'q-dialog-footer';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QDialogFooterComponent, isStandalone: true, selector: "q-dialog-footer, [q-dialog-footer], [qDialogFooter]", inputs: { dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClass" } }, ngImport: i0, template: `
    <ng-content select="[q-dialog-footer-aside-action]" />
    <ng-content />
  `, isInline: true, styles: [".q-dialog-footer{display:var(--awds-dialog-footer-display, flex);justify-content:var(--awds-dialog-footer-justify-content, flex-end);gap:var(--awds-dialog-footer-gap, var(--ads-size-xxs));flex-wrap:var(--awds-dialog-footer-flex-wrap, wrap);flex-shrink:var(--awds-dialog-footer-flex-shrink, 0);padding:var( --awds-dialog-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m) )}@media(min-width:599px){[q-dialog-footer-aside-action]{margin:var(--awds-dialog-footer-aside-action-margin, 0 auto 0 0)}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogFooterComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-dialog-footer, [q-dialog-footer], [qDialogFooter]', template: `
    <ng-content select="[q-dialog-footer-aside-action]" />
    <ng-content />
  `, styles: [".q-dialog-footer{display:var(--awds-dialog-footer-display, flex);justify-content:var(--awds-dialog-footer-justify-content, flex-end);gap:var(--awds-dialog-footer-gap, var(--ads-size-xxs));flex-wrap:var(--awds-dialog-footer-flex-wrap, wrap);flex-shrink:var(--awds-dialog-footer-flex-shrink, 0);padding:var( --awds-dialog-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m) )}@media(min-width:599px){[q-dialog-footer-aside-action]{margin:var(--awds-dialog-footer-aside-action-margin, 0 auto 0 0)}}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QDialogHeaderComponent {
    dataQt = 'q-dialog-header';
    _hostClass = 'q-dialog-header';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QDialogHeaderComponent, isStandalone: true, selector: "q-dialog-header, [q-dialog-header], [qDialogHeader]", inputs: { dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClass" } }, ngImport: i0, template: '<ng-content />', isInline: true, styles: [".q-dialog-header{display:var(--awds-dialog-header-display, flex);gap:var(--awds-dialog-header-gap, var(--ads-size-xxxs));padding:var( --awds-dialog-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m) )}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogHeaderComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-dialog-header, [q-dialog-header], [qDialogHeader]', template: '<ng-content />', styles: [".q-dialog-header{display:var(--awds-dialog-header-display, flex);gap:var(--awds-dialog-header-gap, var(--ads-size-xxxs));padding:var( --awds-dialog-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m) )}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QDialogComponent {
    size = null;
    dataQt = 'q-dialog';
    closedby = null;
    get _hostClasses() {
        return ['q-dialog', this.size && `q-dialog-${this.size}`].filter(Boolean).join(' ');
    }
    _onClick = (event) => this._handleClickOutside(event);
    _onEscapeKeydown = (event) => this._handleEscapeKeydown(event);
    _destroy$ = injectDestroy();
    _elementRef = inject(ElementRef);
    _dialogElement = this._elementRef.nativeElement;
    _breakpointObserver = inject(BreakpointObserver);
    _cdr = inject(ChangeDetectorRef);
    ngAfterViewInit() {
        this._observeBreakpoints();
    }
    showModal() {
        this._dialogElement.showModal();
    }
    close(returnValue) {
        this._dialogElement.close(returnValue);
    }
    _observeBreakpoints() {
        if (!this.size) {
            return;
        }
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
    _handleClickOutside(event) {
        if (['none', 'closerequest'].includes(this.closedby || '')) {
            event.preventDefault();
            return;
        }
        const target = event.target;
        const rect = this._dialogElement.getBoundingClientRect();
        const isInDialog = rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
        if (!isInDialog && target === this._dialogElement) {
            this._dialogElement.close();
        }
    }
    _handleEscapeKeydown(event) {
        if (this.closedby === 'none') {
            event.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QDialogComponent, isStandalone: true, selector: "dialog[q-dialog], dialog[qDialog]", inputs: { size: "size", dataQt: "dataQt", closedby: "closedby" }, host: { listeners: { "mousedown": "_onClick($event)", "keydown.escape": "_onEscapeKeydown($event)" }, properties: { "attr.data-qt": "this.dataQt", "attr.closedby": "this.closedby", "class": "this._hostClasses" } }, ngImport: i0, template: '<ng-content />', isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dialog{font-family:var(--awds-dialog-container-font-family, var(--ads-font-family-body));font-size:var(--awds-dialog-container-font-size, var(--ads-font-size-s));font-style:var(--awds-dialog-container-font-style, inherit);font-weight:var(--awds-dialog-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dialog-container-letter-spacing, 0);line-height:var(--awds-dialog-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dialog-container-text-transform, none);background:var(--awds-dialog-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-dialog-container-background-backdrop-filter, none);backdrop-filter:var(--awds-dialog-container-background-backdrop-filter, none);padding:var(--awds-dialog-container-padding, 0);border:var(--awds-dialog-container-border, none);border-radius:var(--awds-dialog-container-border-radius, var(--ads-border-radius-m));box-shadow:var(--awds-dialog-container-box-shadow, 0 2px 12px rgba(0, 0, 0, .12));max-height:var(--awds-dialog-container-max-height, 90vh);min-height:var(--awds-dialog-container-min-height, auto);max-width:var(--awds-dialog-container-max-width, 100vw);min-width:var(--awds-dialog-container-min-width, auto);color:var(--awds-dialog-container-color, var(--ads-color-body-contrast-100))}.q-dialog::backdrop{background:var(--awds-dialog-backdrop-background, var(--ads-color-overlay-400));-webkit-backdrop-filter:var(--awds-dialog-backdrop-filter, none);backdrop-filter:var(--awds-dialog-backdrop-filter, none)}.q-dialog:open{display:flex;flex-direction:column}.q-dialog-footer{gap:var(--awds-dialog-footer-gap, var(--ads-size-xxs))}.q-dialog-medium{width:var(--awds-dialog-medium-container-width, 520px)}.q-dialog-medium .q-dialog-header{padding:var(--awds-dialog-medium-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m))}.q-dialog-medium .q-dialog-content{padding:var(--awds-dialog-medium-content-padding, 0 var(--ads-size-m))}.q-dialog-medium .q-dialog-footer{padding:var(--awds-dialog-medium-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m))}.q-dialog-large{width:var(--awds-dialog-large-container-width, 724px)}.q-dialog-large .q-dialog-header{padding:var(--awds-dialog-large-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m))}.q-dialog-large .q-dialog-content{padding:var(--awds-dialog-large-content-padding, 0 var(--ads-size-m))}.q-dialog-large .q-dialog-footer{padding:var(--awds-dialog-large-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m))}.q-dialog-xlarge{width:var(--awds-dialog-xlarge-container-width, 1280px)}.q-dialog-xlarge .q-dialog-header{padding:var(--awds-dialog-xlarge-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m))}.q-dialog-xlarge .q-dialog-content{padding:var(--awds-dialog-xlarge-content-padding, 0 var(--ads-size-m))}.q-dialog-xlarge .q-dialog-footer{padding:var(--awds-dialog-xlarge-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m))}@media(max-width:599px){.q-dialog{width:100%;max-width:100%;height:100%;max-height:100%;box-shadow:none;border-radius:0}.q-dialog .q-dialog-header{padding:var(--awds-dialog-mobile-header-padding, var(--ads-size-xs) var(--ads-size-s) var(--ads-size-xxxs) var(--ads-size-s))}.q-dialog .q-dialog-content{max-height:100%;flex:1;padding:var(--awds-dialog-mobile-content-padding, 0 var(--ads-size-s))}.q-dialog .q-dialog-footer{padding:var(--awds-dialog-mobile-footer-padding, var(--ads-size-xxs) var(--ads-size-s));flex-direction:column-reverse}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDialogComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'dialog[q-dialog], dialog[qDialog]', template: '<ng-content />', styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dialog{font-family:var(--awds-dialog-container-font-family, var(--ads-font-family-body));font-size:var(--awds-dialog-container-font-size, var(--ads-font-size-s));font-style:var(--awds-dialog-container-font-style, inherit);font-weight:var(--awds-dialog-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dialog-container-letter-spacing, 0);line-height:var(--awds-dialog-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dialog-container-text-transform, none);background:var(--awds-dialog-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-dialog-container-background-backdrop-filter, none);backdrop-filter:var(--awds-dialog-container-background-backdrop-filter, none);padding:var(--awds-dialog-container-padding, 0);border:var(--awds-dialog-container-border, none);border-radius:var(--awds-dialog-container-border-radius, var(--ads-border-radius-m));box-shadow:var(--awds-dialog-container-box-shadow, 0 2px 12px rgba(0, 0, 0, .12));max-height:var(--awds-dialog-container-max-height, 90vh);min-height:var(--awds-dialog-container-min-height, auto);max-width:var(--awds-dialog-container-max-width, 100vw);min-width:var(--awds-dialog-container-min-width, auto);color:var(--awds-dialog-container-color, var(--ads-color-body-contrast-100))}.q-dialog::backdrop{background:var(--awds-dialog-backdrop-background, var(--ads-color-overlay-400));-webkit-backdrop-filter:var(--awds-dialog-backdrop-filter, none);backdrop-filter:var(--awds-dialog-backdrop-filter, none)}.q-dialog:open{display:flex;flex-direction:column}.q-dialog-footer{gap:var(--awds-dialog-footer-gap, var(--ads-size-xxs))}.q-dialog-medium{width:var(--awds-dialog-medium-container-width, 520px)}.q-dialog-medium .q-dialog-header{padding:var(--awds-dialog-medium-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m))}.q-dialog-medium .q-dialog-content{padding:var(--awds-dialog-medium-content-padding, 0 var(--ads-size-m))}.q-dialog-medium .q-dialog-footer{padding:var(--awds-dialog-medium-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m))}.q-dialog-large{width:var(--awds-dialog-large-container-width, 724px)}.q-dialog-large .q-dialog-header{padding:var(--awds-dialog-large-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m))}.q-dialog-large .q-dialog-content{padding:var(--awds-dialog-large-content-padding, 0 var(--ads-size-m))}.q-dialog-large .q-dialog-footer{padding:var(--awds-dialog-large-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m))}.q-dialog-xlarge{width:var(--awds-dialog-xlarge-container-width, 1280px)}.q-dialog-xlarge .q-dialog-header{padding:var(--awds-dialog-xlarge-header-padding, var(--ads-size-m) var(--ads-size-m) var(--ads-size-xxs) var(--ads-size-m))}.q-dialog-xlarge .q-dialog-content{padding:var(--awds-dialog-xlarge-content-padding, 0 var(--ads-size-m))}.q-dialog-xlarge .q-dialog-footer{padding:var(--awds-dialog-xlarge-footer-padding, var(--ads-size-xxs) var(--ads-size-m) var(--ads-size-s) var(--ads-size-m))}@media(max-width:599px){.q-dialog{width:100%;max-width:100%;height:100%;max-height:100%;box-shadow:none;border-radius:0}.q-dialog .q-dialog-header{padding:var(--awds-dialog-mobile-header-padding, var(--ads-size-xs) var(--ads-size-s) var(--ads-size-xxxs) var(--ads-size-s))}.q-dialog .q-dialog-content{max-height:100%;flex:1;padding:var(--awds-dialog-mobile-content-padding, 0 var(--ads-size-s))}.q-dialog .q-dialog-footer{padding:var(--awds-dialog-mobile-footer-padding, var(--ads-size-xxs) var(--ads-size-s));flex-direction:column-reverse}}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], closedby: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.closedby']
            }], _hostClasses: [{
                type: HostBinding,
                args: ['class']
            }], _onClick: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], _onEscapeKeydown: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }] } });

const Q_DIALOG_COMPONENTS = [
    QDialogComponent,
    QDialogHeaderComponent,
    QDialogContentComponent,
    QDialogFooterComponent,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QDialogComponent, QDialogContentComponent, QDialogFooterComponent, QDialogHeaderComponent, Q_DIALOG_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-dialog.mjs.map
