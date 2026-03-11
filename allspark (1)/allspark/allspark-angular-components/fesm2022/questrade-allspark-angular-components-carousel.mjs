import { NgIf, NgFor } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, inject, ElementRef, Renderer2, booleanAttribute, HostBinding, ViewChild, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { QSharedResizeObserverService } from '@questrade/allspark-angular-components/core/services';
import { injectDestroy } from '@questrade/allspark-angular-components/core/utils';
import { takeUntil } from 'rxjs';
import { state, style, trigger, transition, animate, keyframes } from '@angular/animations';

const STATES = [
    state('0', style({
        transform: 'translateX({{xValue}}px)',
    }), { params: { itemWidth: 0, xValue: 0 } }),
    state('1', style({
        transform: 'translateX({{xValue}}px)',
    }), { params: { itemWidth: 0, xValue: 0 } }),
];
const carouselAnimation = [
    trigger('animateRight', [
        ...STATES,
        transition('0 => 1', [
            animate('0.1s ease-out', keyframes([
                style({ width: '{{itemSize}}px' }),
                style({ width: '{{growSize}}px' }),
                style({
                    width: '{{itemSize}}px',
                    transform: 'translateX({{xValue}}px)',
                }),
            ])),
        ], { params: { itemSize: 0, growSize: 0, left: 0 } }),
    ]),
    trigger('animateLeft', [
        ...STATES,
        transition('0 => 1', [
            animate('0.1s ease-out', keyframes([
                style({ width: '{{itemSize}}px' }),
                style({
                    width: '{{growSize}}px',
                    transform: 'translateX({{xValue}}px)',
                }),
                style({ width: '{{itemSize}}px' }),
            ])),
        ], { params: { itemSize: 0, growSize: 0, left: 0 } }),
    ]),
];

const MAX_INDICATORS = 10;
class QCarouselComponent {
    changed = new EventEmitter();
    centered = true;
    absolute = false;
    type = 'tight';
    size = 'medium';
    dataQt = 'q-carousel';
    set marginTop(value) {
        this._renderer.setStyle(this._elementRef.nativeElement, 'margin-top', `${value}px`);
    }
    set marginBottom(value) {
        this._renderer.setStyle(this._elementRef.nativeElement, 'margin-bottom', `${value}px`);
    }
    set items(value) {
        this._indicatorsCount = value > MAX_INDICATORS ? MAX_INDICATORS : value;
        if (this._activeItem > this._indicatorsCount) {
            this._updateActiveIndicator(value);
        }
    }
    set active(value) {
        if (value > this._indicatorsCount || value < 1)
            return;
        this._oldActiveItem = this._activeItem;
        this._activeItem = value;
        if (this._oldActiveItem > 0) {
            this._animate();
        }
    }
    activeItemRef;
    get hostClasses() {
        return [
            'q-carousel',
            `q-carousel-${this.type}`,
            `q-carousel-${this.size}`,
            this.centered && 'q-carousel-centered',
            this.absolute && 'q-carousel-absolute',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _activeItemIndicatorXPosition = 0;
    _activeItem = 0;
    _animateRight = false;
    _animateLeft = false;
    _indicatorsCount = 0;
    _oldActiveItem;
    _activeOffset = 0;
    _destroy$ = injectDestroy();
    _resizeObserver = inject(QSharedResizeObserverService);
    _elementRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    ngOnInit() {
        this._initializeResizeObserver();
        if (!this._activeItem) {
            this._activeItem = 1;
        }
    }
    ngOnChanges(changes) {
        const { type, size } = changes;
        if (type?.currentValue || size?.currentValue) {
            this._resetActiveItem();
        }
    }
    ngAfterViewInit() {
        this._resetActiveItem();
    }
    _numSequence(n) {
        return Array(n);
    }
    _onClick(active) {
        this._updateActiveIndicator(active);
    }
    get gapSize() {
        return this.type === 'tight'
            ? parseInt(this._getComputedStyle().getPropertyValue('--ads-size-micro'))
            : parseInt(this._getComputedStyle().getPropertyValue('--ads-size-xxxs'));
    }
    get growSize() {
        return this._activeOffset > 0
            ? this.itemSize + this._activeOffset * (this.itemSize + this.gapSize)
            : this._activeOffset < 0
                ? this.itemSize + Math.abs(this._activeOffset * (this.itemSize + this.gapSize))
                : this.itemSize;
    }
    get itemSize() {
        const sizeMap = {
            small: '--ads-size-nano',
            medium: '--ads-size-micro',
            large: '--ads-size-xxxs',
        };
        return parseInt(this._getComputedStyle().getPropertyValue(sizeMap[this.size]));
    }
    _getComputedStyle() {
        return getComputedStyle(this._elementRef.nativeElement);
    }
    _initializeResizeObserver() {
        this._resizeObserver
            .observe(this._elementRef.nativeElement)
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => this._resetActiveItem());
    }
    _getGapSize() {
        return this.type === 'tight'
            ? parseInt(this._getComputedStyle().getPropertyValue('--ads-size-micro'))
            : parseInt(this._getComputedStyle().getPropertyValue('--ads-size-xxxs'));
    }
    _getItemSize() {
        const sizeMap = {
            small: '--ads-size-nano',
            medium: '--ads-size-micro',
            large: '--ads-size-xxxs',
        };
        return parseInt(this._getComputedStyle().getPropertyValue(sizeMap[this.size]));
    }
    _resetActiveItem() {
        if (this.activeItemRef) {
            this._activeItemIndicatorXPosition =
                (this._activeItem - 1) * (this._getItemSize() + this._getGapSize());
            this._renderer.setStyle(this.activeItemRef.nativeElement, 'transform', `translate(${this._activeItemIndicatorXPosition}px)`);
        }
    }
    _updateActiveIndicator(active) {
        this._oldActiveItem = this._activeItem;
        this._activeItem = active > MAX_INDICATORS ? MAX_INDICATORS : active;
        this.changed.emit(active);
        this._animate();
    }
    _animate() {
        this._activeOffset = this._activeItem - this._oldActiveItem;
        this._activeItemIndicatorXPosition += this._activeOffset * (this.itemSize + this.gapSize);
        if (this._activeOffset > 0) {
            this._animateRight = true;
        }
        else {
            this._animateLeft = true;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCarouselComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QCarouselComponent, isStandalone: true, selector: "q-carousel", inputs: { centered: ["centered", "centered", booleanAttribute], absolute: ["absolute", "absolute", booleanAttribute], type: "type", size: "size", dataQt: "dataQt", marginTop: "marginTop", marginBottom: "marginBottom", items: "items", active: "active" }, outputs: { changed: "changed" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, viewQueries: [{ propertyName: "activeItemRef", first: true, predicate: ["activeItem"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"q-carousel-container\">\n  <ul class=\"q-carousel-list\">\n    <li\n      *ngFor=\"let item of _numSequence(_indicatorsCount); let i = index\"\n      class=\"q-carousel-item\"\n      role=\"listitem\"\n      [attr.aria-selected]=\"i === _activeItem\"\n      (click)=\"_onClick(i + 1)\"\n      (keyup.enter)=\"_onClick(i + 1)\"\n      (keyup.space)=\"_onClick(i + 1)\">\n      <div class=\"q-carousel-indicator\"></div>\n    </li>\n  </ul>\n  <div\n    *ngIf=\"_indicatorsCount\"\n    #activeItem\n    class=\"q-carousel-active-item\"\n    [@animateRight]=\"{\n      value: _animateRight,\n      params: { itemSize, growSize, xValue: _activeItemIndicatorXPosition },\n    }\"\n    [@animateLeft]=\"{\n      value: _animateLeft,\n      params: { itemSize, growSize, xValue: _activeItemIndicatorXPosition },\n    }\"\n    (@animateRight.done)=\"_animateRight = false\"\n    (@animateLeft.done)=\"_animateLeft = false\">\n    <div class=\"q-carousel-indicator\"></div>\n  </div>\n</div>\n", styles: [".q-carousel{display:flex;-webkit-tap-highlight-color:transparent}.q-carousel-container{position:relative}.q-carousel.q-carousel-centered{justify-content:center;align-items:center;inset:0}.q-carousel.q-carousel-absolute{position:absolute}.q-carousel-list{margin:0;padding:0;list-style:none;display:flex}.q-carousel-tight .q-carousel-list{column-gap:var(--ads-size-micro)}.q-carousel-comfortable .q-carousel-list{column-gap:var(--ads-size-xxxs)}.q-carousel-item{display:flex}.q-carousel-indicator{border-radius:var(--ads-border-radius-xl);cursor:pointer;background-color:var(--ads-color-body-400);margin:auto}.q-carousel-small .q-carousel-indicator{width:var(--ads-size-nano);height:var(--ads-size-nano)}.q-carousel-medium .q-carousel-indicator{width:var(--ads-size-micro);height:var(--ads-size-micro)}.q-carousel-large .q-carousel-indicator{width:var(--ads-size-xxxs);height:var(--ads-size-xxxs)}.q-carousel-active-item{cursor:pointer;position:absolute;display:flex;top:0}.q-carousel-active-item .q-carousel-indicator{background-color:var(--ads-color-primary-400)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [carouselAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCarouselComponent, decorators: [{
            type: Component,
            args: [{ imports: [NgIf, NgFor], selector: 'q-carousel', animations: [carouselAnimation], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"q-carousel-container\">\n  <ul class=\"q-carousel-list\">\n    <li\n      *ngFor=\"let item of _numSequence(_indicatorsCount); let i = index\"\n      class=\"q-carousel-item\"\n      role=\"listitem\"\n      [attr.aria-selected]=\"i === _activeItem\"\n      (click)=\"_onClick(i + 1)\"\n      (keyup.enter)=\"_onClick(i + 1)\"\n      (keyup.space)=\"_onClick(i + 1)\">\n      <div class=\"q-carousel-indicator\"></div>\n    </li>\n  </ul>\n  <div\n    *ngIf=\"_indicatorsCount\"\n    #activeItem\n    class=\"q-carousel-active-item\"\n    [@animateRight]=\"{\n      value: _animateRight,\n      params: { itemSize, growSize, xValue: _activeItemIndicatorXPosition },\n    }\"\n    [@animateLeft]=\"{\n      value: _animateLeft,\n      params: { itemSize, growSize, xValue: _activeItemIndicatorXPosition },\n    }\"\n    (@animateRight.done)=\"_animateRight = false\"\n    (@animateLeft.done)=\"_animateLeft = false\">\n    <div class=\"q-carousel-indicator\"></div>\n  </div>\n</div>\n", styles: [".q-carousel{display:flex;-webkit-tap-highlight-color:transparent}.q-carousel-container{position:relative}.q-carousel.q-carousel-centered{justify-content:center;align-items:center;inset:0}.q-carousel.q-carousel-absolute{position:absolute}.q-carousel-list{margin:0;padding:0;list-style:none;display:flex}.q-carousel-tight .q-carousel-list{column-gap:var(--ads-size-micro)}.q-carousel-comfortable .q-carousel-list{column-gap:var(--ads-size-xxxs)}.q-carousel-item{display:flex}.q-carousel-indicator{border-radius:var(--ads-border-radius-xl);cursor:pointer;background-color:var(--ads-color-body-400);margin:auto}.q-carousel-small .q-carousel-indicator{width:var(--ads-size-nano);height:var(--ads-size-nano)}.q-carousel-medium .q-carousel-indicator{width:var(--ads-size-micro);height:var(--ads-size-micro)}.q-carousel-large .q-carousel-indicator{width:var(--ads-size-xxxs);height:var(--ads-size-xxxs)}.q-carousel-active-item{cursor:pointer;position:absolute;display:flex;top:0}.q-carousel-active-item .q-carousel-indicator{background-color:var(--ads-color-primary-400)}\n"] }]
        }], propDecorators: { changed: [{
                type: Output
            }], centered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], absolute: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], type: [{
                type: Input
            }], size: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], marginTop: [{
                type: Input
            }], marginBottom: [{
                type: Input
            }], items: [{
                type: Input
            }], active: [{
                type: Input
            }], activeItemRef: [{
                type: ViewChild,
                args: ['activeItem']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QCarouselComponent };
//# sourceMappingURL=questrade-allspark-angular-components-carousel.mjs.map
