import * as i0 from '@angular/core';
import { EventEmitter, inject, DOCUMENT, ElementRef, ChangeDetectorRef, booleanAttribute, HostBinding, ViewChild, Input, Output, ChangeDetectionStrategy, ViewEncapsulation, Component, numberAttribute } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgTemplateOutlet } from '@angular/common';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { QIconRegistryService } from '@questrade/allspark-angular-components/icon';
import { QInteractiveIconComponent } from '@questrade/allspark-angular-components/interactive-icon';
import { clear } from '@questrade/allspark-icons/icons';
import { takeUntil, fromEvent, takeWhile } from 'rxjs';

const MIN_HEIGHT = 146;
const CLICK_DRAG_THRESHOLD_PX = 5;
class QDrawerContainerComponent {
    closeRequested = new EventEmitter();
    closeIconClicked = new EventEmitter();
    fullscreenChange = new EventEmitter();
    title = '';
    position = 'bottom';
    showHeader = true;
    showHeaderIcon = true;
    disableDefaultClose = false;
    disableResize = false;
    snapList = [
        { value: 0, type: '%' },
        { value: 50, type: '%' },
        { value: 100, type: '%' },
    ];
    // TODO: Remove this width input when the deprecation from Drawer component is removed
    width = '';
    // TODO: Remove this height input when the deprecation from Drawer component is removed
    height = '146px';
    // TODO: Remove this titleCentered input when the deprecation from Drawer component is removed
    titleCentered = false;
    _header;
    _content;
    _closeIcon = null;
    _dataQt = 'q-drawer-container';
    get _minHeight() {
        return !this._isMobile && this._topOrBottom
            ? `var(--awds-drawer-container-min-height, ${MIN_HEIGHT}px)`
            : '';
    }
    get _width() {
        if (this._isMobile && this._topOrBottom)
            return '100vw';
        const fallbackWidth = this.width || '100%';
        return `var(--awds-drawer-container-width, ${fallbackWidth})`;
    }
    get _marginLeft() {
        return this._topOrBottom && !!this.width ? 'auto' : '';
    }
    get _marginRight() {
        return this._topOrBottom && !!this.width ? 'auto' : '';
    }
    get _hostClasses() {
        return [
            'q-drawer-container',
            `q-drawer-container-${this.position}`,
            this._resizing && 'q-drawer-container-resizing',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _isMobile = false;
    _resizing = false;
    _fullscreen = false;
    _snapEnabled = true;
    _dragStartYValue = 0;
    _dragStartDrawerHeight = 0;
    _document = inject(DOCUMENT);
    _elementRef = inject(ElementRef);
    _cdr = inject(ChangeDetectorRef);
    _destroy$ = inject(QDestroyService);
    _iconRegistry = inject(QIconRegistryService);
    _breakpointObserver = inject(BreakpointObserver);
    ngOnInit() {
        this._iconRegistry.registerIcons([clear]);
        this._breakpointObserver
            .observe(['(max-width: 599px)'])
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            this._isMobile = result.matches;
            this._cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { height, position, snapList } = changes;
        if (height || position || snapList) {
            this._setInitialHeight();
            this._cdr.markForCheck();
        }
    }
    ngAfterViewInit() {
        this._subscribeToDocumentMouseEvents();
        if (this.position === 'bottom' && this._header) {
            this._subscribeToHeaderTouchEvents();
        }
    }
    _onTouchStart(event) {
        if (!this._targetIsCloseIcon(event.target) && event.cancelable) {
            event.preventDefault();
        }
        if (event.touches[0]) {
            this._prepareToResize(event.touches[0].clientY);
        }
    }
    _onTouchCancel(event) {
        if (!this._targetIsCloseIcon(event.target)) {
            event.preventDefault();
        }
        if (event.touches[0]) {
            this._stopResize(event.touches[0].clientY);
        }
    }
    _onTouchMove(event) {
        if (!this._targetIsCloseIcon(event.target) && event.cancelable) {
            event.preventDefault();
        }
        if (event.touches[0]) {
            this._resize(event.touches[0].clientY);
        }
    }
    _onTouchEnd(event) {
        if (!this._targetIsCloseIcon(event.target)) {
            event.preventDefault();
        }
        if (event.changedTouches[0]) {
            this._stopResize(event.changedTouches[0].clientY);
        }
    }
    _onHandleMouseDown(event) {
        this._prepareToResize(event.clientY);
    }
    _onCloseIconClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disableDefaultClose)
            return;
        this.closeIconClicked.emit();
    }
    _setInitialHeight() {
        if (this.position === 'left' || this.position === 'right') {
            this._el.style.height = '100%';
        }
        else {
            let usePercentageValue = false;
            let percentageValue = 0;
            if (this.height.endsWith('%')) {
                const strValue = this.height.slice(0, -1);
                const isValidPercentageValue = !isNaN(+strValue);
                if (isValidPercentageValue) {
                    usePercentageValue = true;
                    percentageValue = +strValue;
                }
            }
            const heightValueToUse = this.height || MIN_HEIGHT + 'px';
            const defaultHeight = usePercentageValue
                ? `calc(100vh * ${percentageValue / 100})`
                : heightValueToUse;
            const finalHeight = `var(--awds-drawer-container-height, ${defaultHeight})`;
            const filteredSnapValues = this._sortedSnapValues.filter((i) => i !== 0);
            const getMobileHeight = () => filteredSnapValues.length ? `${filteredSnapValues[0]}px` : finalHeight;
            this._el.style.height = this._isMobile ? getMobileHeight() : finalHeight;
        }
    }
    _prepareToResize(dragStartYValue) {
        if (!this._isMobile || this.disableResize)
            return;
        this._dragStartDrawerHeight = this._el.getBoundingClientRect().height;
        this._dragStartYValue = dragStartYValue;
        this._resizing = true;
        this._fullscreen = false;
        this.fullscreenChange.emit(this._fullscreen);
        this._cdr.markForCheck();
    }
    _stopResize(releasedAtY) {
        if (!this._isMobile || this.disableResize)
            return;
        const movedDistance = Math.abs(this._dragStartYValue - releasedAtY);
        this._dragStartDrawerHeight = 0;
        this._resizing = false;
        this._cdr.markForCheck();
        if (movedDistance < CLICK_DRAG_THRESHOLD_PX) {
            return;
        }
        if (this._snapEnabled) {
            this._snap(releasedAtY);
        }
    }
    _resize(clientY) {
        if (!this._resizing || !this._dragStartDrawerHeight)
            return;
        const hightDelta = this._dragStartYValue - clientY;
        this._el.style.height =
            this.position === 'bottom'
                ? this._dragStartDrawerHeight + hightDelta + 'px'
                : this._dragStartDrawerHeight - hightDelta + 'px';
    }
    _subscribeToHeaderTouchEvents() {
        fromEvent(this._header.nativeElement, 'touchstart')
            .pipe(takeWhile(() => this.position === 'bottom'), takeUntil(this._destroy$))
            .subscribe((event) => {
            this._onTouchStart(event);
        });
        fromEvent(this._header.nativeElement, 'touchend')
            .pipe(takeWhile(() => this.position === 'bottom'), takeUntil(this._destroy$))
            .subscribe((event) => {
            this._onTouchEnd(event);
        });
        fromEvent(this._header.nativeElement, 'touchcancel')
            .pipe(takeWhile(() => this.position === 'bottom'), takeUntil(this._destroy$))
            .subscribe((event) => {
            this._onTouchCancel(event);
        });
        fromEvent(this._header.nativeElement, 'touchmove')
            .pipe(takeWhile(() => this.position === 'bottom'), takeUntil(this._destroy$))
            .subscribe((event) => {
            this._onTouchMove(event);
        });
        fromEvent(this._header.nativeElement, 'mousedown')
            .pipe(takeWhile(() => this.position === 'bottom'), takeUntil(this._destroy$))
            .subscribe((event) => {
            this._onHandleMouseDown(event);
        });
    }
    _subscribeToDocumentMouseEvents() {
        fromEvent(document, 'mousemove')
            .pipe(takeUntil(this._destroy$))
            .subscribe((event) => {
            this._onDocumentMouseMove(event);
        });
        fromEvent(document, 'mouseup')
            .pipe(takeUntil(this._destroy$))
            .subscribe((event) => {
            this._onDocumentMouseUp(event);
        });
    }
    _onDocumentMouseMove(event) {
        if (!this._resizing)
            return;
        this._resize(event.clientY);
    }
    _onDocumentMouseUp(event) {
        if (!this._resizing)
            return;
        this._stopResize(event.clientY);
    }
    _snap(releasedAtY) {
        if (!this._snapEnabled)
            return;
        const releasedAt = this.position === 'bottom' ? this._totalHeight - releasedAtY : releasedAtY;
        const closestSnapValue = this._getClosestSnapValue(releasedAt);
        if (closestSnapValue === 0) {
            this.closeRequested.emit();
        }
        else {
            // wait for css changes that enable animation
            setTimeout(() => {
                this._el.style.height = closestSnapValue + 'px';
                this._fullscreen = closestSnapValue === this._totalHeight;
                this.fullscreenChange.emit(this._fullscreen);
                this._cdr.markForCheck();
            }, 0);
        }
    }
    _percentToPx = (percent) => {
        return (this._totalHeight * percent) / 100;
    };
    _getClosestSnapValue(releasedAt) {
        return this._sortedSnapValues.reduce((prev, curr) => Math.abs(curr - releasedAt) < Math.abs(prev - releasedAt) ? curr : prev);
    }
    get _el() {
        return this._elementRef.nativeElement;
    }
    get _totalHeight() {
        return this._document.documentElement.clientHeight;
    }
    get _sortedSnapValues() {
        const sortedSnapValues = this.snapList
            .map((item) => (item.type === 'px' ? item.value : this._percentToPx(item.value)))
            .sort((a, b) => a - b);
        return this.disableDefaultClose ? sortedSnapValues.filter((i) => i !== 0) : sortedSnapValues;
    }
    get _topOrBottom() {
        return this.position === 'top' || this.position === 'bottom';
    }
    _targetIsCloseIcon(target) {
        if (!target)
            return false;
        return this._closeIcon?.nativeElement.contains(target) ?? false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDrawerContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QDrawerContainerComponent, isStandalone: true, selector: "q-drawer-container", inputs: { title: "title", position: "position", showHeader: ["showHeader", "showHeader", booleanAttribute], showHeaderIcon: ["showHeaderIcon", "showHeaderIcon", booleanAttribute], disableDefaultClose: ["disableDefaultClose", "disableDefaultClose", booleanAttribute], disableResize: ["disableResize", "disableResize", booleanAttribute], snapList: "snapList", width: "width", height: "height", titleCentered: ["titleCentered", "titleCentered", booleanAttribute] }, outputs: { closeRequested: "closeRequested", closeIconClicked: "closeIconClicked", fullscreenChange: "fullscreenChange" }, host: { properties: { "attr.data-qt": "this._dataQt", "style.min-height": "this._minHeight", "style.width": "this._width", "style.margin-left": "this._marginLeft", "style.margin-right": "this._marginRight", "class": "this._hostClasses" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "_header", first: true, predicate: ["header"], descendants: true }, { propertyName: "_content", first: true, predicate: ["content"], descendants: true }, { propertyName: "_closeIcon", first: true, predicate: ["closeIcon"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "@if (position === 'bottom') {\n  <ng-container [ngTemplateOutlet]=\"handle\" />\n}\n\n@if (showHeader) {\n  <div #header class=\"q-drawer-header\" data-qt=\"q-drawer-header\">\n    @if (title) {\n      <div class=\"q-drawer-header-title\" [class.q-drawer-header-title-centered]=\"titleCentered\">\n        {{ title }}\n      </div>\n    }\n    @if (showHeaderIcon) {\n      <q-interactive-icon\n        autofocus\n        #closeIcon\n        class=\"q-drawer-header-close-icon\"\n        data-qt=\"q-drawer-header-close-icon\"\n        [icon]=\"'clear'\"\n        [size]=\"'medium'\"\n        (click)=\"_onCloseIconClick($event)\" />\n    }\n  </div>\n}\n\n<div class=\"q-drawer-content-container\" data-qt=\"q-drawer-content-container\">\n  <div #content class=\"q-drawer-content\">\n    <ng-content />\n  </div>\n</div>\n\n@if (position === 'top') {\n  <ng-container [ngTemplateOutlet]=\"handle\" />\n}\n\n<ng-template #handle>\n  @if (_isMobile && !disableResize) {\n    <div\n      class=\"q-drawer-handle\"\n      [class.q-drawer-handle-inverse]=\"position === 'top'\"\n      data-qt=\"q-drawer-handle\"\n      (touchstart)=\"_onTouchStart($event)\"\n      (touchcancel)=\"_onTouchCancel($event)\"\n      (touchmove)=\"_onTouchMove($event)\"\n      (touchend)=\"_onTouchEnd($event)\"\n      (mousedown)=\"_onHandleMouseDown($event)\">\n      <div class=\"q-drawer-handle-content\"></div>\n    </div>\n  }\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-drawer-container{font-family:var(--awds-drawer-container-font-family, var(--ads-font-family-body));font-size:var(--awds-drawer-container-font-size, var(--ads-font-size-s));font-style:var(--awds-drawer-container-font-style, inherit);font-weight:var(--awds-drawer-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-drawer-container-letter-spacing, 0);line-height:var(--awds-drawer-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-drawer-container-text-transform, none);display:flex;flex-direction:column;max-height:var(--awds-drawer-container-max-height, 100vh);min-height:var(--awds-drawer-container-min-height, 146px);max-width:var(--awds-drawer-container-max-width, 100vw);width:var(--awds-drawer-container-width, 100%);height:var(--awds-drawer-container-height, 100%);color:var(--awds-drawer-container-color, var(--ads-color-body-contrast-100));-webkit-backdrop-filter:var(--awds-drawer-container-backdrop-filter);backdrop-filter:var(--awds-drawer-container-backdrop-filter);overflow:auto;transition:height .2s cubic-bezier(0,0,.2,1);outline:none}.q-drawer-container-resizing{--awds-drawer-container-min-height: 0;transition:none;overflow:hidden}.q-drawer-container-left,.q-drawer-container-right{min-width:var(--awds-drawer-container-min-width, 240px)}.q-drawer-container-top,.q-drawer-container-bottom{height:auto}.q-drawer-handle{min-height:var(--ads-size-xxxs);display:flex;flex-direction:column-reverse;cursor:row-resize}.q-drawer-handle-content{width:var(--awds-drawer-handle-width, var(--ads-size-xxl));height:var(--awds-drawer-handle-height, var(--ads-size-nano));background-color:var(--awds-drawer-handle-background, var(--ads-color-body-400));border-radius:var(--awds-drawer-handle-border-radius, var(--ads-border-radius-xl));margin:0 auto}.q-drawer-handle-inverse{margin-top:auto;transform:rotateX(180deg)}.q-drawer-header{max-width:1120px;padding:var(--awds-drawer-header-padding, var(--ads-size-xs));min-height:var(--awds-drawer-header-min-height);display:flex;align-items:center;justify-content:var(--awds-drawer-header-justify-content);position:relative;flex-shrink:0}.q-drawer-header-title{font-family:var(--awds-drawer-header-title-font-family, var(--ads-font-family-heading));font-size:var(--awds-drawer-header-title-font-size, var(--ads-font-size-m));font-style:var(--awds-drawer-header-title-font-style, inherit);font-weight:var(--awds-drawer-header-title-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-drawer-header-title-letter-spacing, 0);line-height:var(--awds-drawer-header-title-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-drawer-header-title-text-transform, none);margin:var(--awds-drawer-header-title-margin)}.q-drawer-header-title-centered{margin:0 auto}.q-drawer-header:has(.q-drawer-header-close-icon) .q-drawer-header-title{padding-right:calc(var(--ads-size-xxxs) + var(--awds-drawer-header-close-dimensions, var(--ads-size-s)))}.q-drawer-header:has(.q-drawer-header-close-icon) .q-drawer-header-title-centered{padding:0 calc(var(--ads-size-xxxs) + var(--awds-drawer-header-close-dimensions, var(--ads-size-s)))}.q-drawer-header-close-icon{position:absolute;right:var(--ads-size-micro)}.q-drawer-content-container{overflow:auto}.q-drawer-content{max-width:1120px;padding:var(--awds-drawer-content-padding, 0 var(--ads-size-xs) var(--ads-size-xs));margin:0 auto}@media(max-width:599px){.q-drawer-header{min-height:var(--awds-drawer-header-min-height, var(--ads-size-xxxl));padding:var(--awds-drawer-header-padding, var(--ads-size-xxs) var(--ads-size-s));box-sizing:border-box}.q-drawer-content{padding:var(--awds-drawer-content-padding, 0 var(--ads-size-s) var(--ads-size-s))}}@media(min-width:600px){.q-drawer-container-top,.q-drawer-container-bottom{min-width:400px}.q-drawer-header{width:100%;margin:0 auto}.q-drawer-header-title{font-family:var(--awds-drawer-header-title-font-family, var(--ads-font-family-heading));font-size:var(--awds-drawer-header-title-font-size, var(--ads-font-size-l));font-style:var(--awds-drawer-header-title-font-style, inherit);font-weight:var(--awds-drawer-header-title-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-drawer-header-title-letter-spacing, 0);line-height:var(--awds-drawer-header-title-line-height, var(--ads-font-line-height-l));text-transform:var(--awds-drawer-header-title-text-transform, none)}}\n"], dependencies: [{ kind: "component", type: QInteractiveIconComponent, selector: "q-interactive-icon", inputs: ["icon", "context", "size", "tooltipValue", "tooltipPosition", "disabled", "tabindex", "tooltipShowDelay", "tooltipHideDelay", "tooltipLongPressDelay", "dataQt", "iconSize", "color"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: A11yModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDrawerContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-drawer-container', imports: [QInteractiveIconComponent, NgTemplateOutlet, A11yModule], providers: [QDestroyService], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (position === 'bottom') {\n  <ng-container [ngTemplateOutlet]=\"handle\" />\n}\n\n@if (showHeader) {\n  <div #header class=\"q-drawer-header\" data-qt=\"q-drawer-header\">\n    @if (title) {\n      <div class=\"q-drawer-header-title\" [class.q-drawer-header-title-centered]=\"titleCentered\">\n        {{ title }}\n      </div>\n    }\n    @if (showHeaderIcon) {\n      <q-interactive-icon\n        autofocus\n        #closeIcon\n        class=\"q-drawer-header-close-icon\"\n        data-qt=\"q-drawer-header-close-icon\"\n        [icon]=\"'clear'\"\n        [size]=\"'medium'\"\n        (click)=\"_onCloseIconClick($event)\" />\n    }\n  </div>\n}\n\n<div class=\"q-drawer-content-container\" data-qt=\"q-drawer-content-container\">\n  <div #content class=\"q-drawer-content\">\n    <ng-content />\n  </div>\n</div>\n\n@if (position === 'top') {\n  <ng-container [ngTemplateOutlet]=\"handle\" />\n}\n\n<ng-template #handle>\n  @if (_isMobile && !disableResize) {\n    <div\n      class=\"q-drawer-handle\"\n      [class.q-drawer-handle-inverse]=\"position === 'top'\"\n      data-qt=\"q-drawer-handle\"\n      (touchstart)=\"_onTouchStart($event)\"\n      (touchcancel)=\"_onTouchCancel($event)\"\n      (touchmove)=\"_onTouchMove($event)\"\n      (touchend)=\"_onTouchEnd($event)\"\n      (mousedown)=\"_onHandleMouseDown($event)\">\n      <div class=\"q-drawer-handle-content\"></div>\n    </div>\n  }\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-drawer-container{font-family:var(--awds-drawer-container-font-family, var(--ads-font-family-body));font-size:var(--awds-drawer-container-font-size, var(--ads-font-size-s));font-style:var(--awds-drawer-container-font-style, inherit);font-weight:var(--awds-drawer-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-drawer-container-letter-spacing, 0);line-height:var(--awds-drawer-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-drawer-container-text-transform, none);display:flex;flex-direction:column;max-height:var(--awds-drawer-container-max-height, 100vh);min-height:var(--awds-drawer-container-min-height, 146px);max-width:var(--awds-drawer-container-max-width, 100vw);width:var(--awds-drawer-container-width, 100%);height:var(--awds-drawer-container-height, 100%);color:var(--awds-drawer-container-color, var(--ads-color-body-contrast-100));-webkit-backdrop-filter:var(--awds-drawer-container-backdrop-filter);backdrop-filter:var(--awds-drawer-container-backdrop-filter);overflow:auto;transition:height .2s cubic-bezier(0,0,.2,1);outline:none}.q-drawer-container-resizing{--awds-drawer-container-min-height: 0;transition:none;overflow:hidden}.q-drawer-container-left,.q-drawer-container-right{min-width:var(--awds-drawer-container-min-width, 240px)}.q-drawer-container-top,.q-drawer-container-bottom{height:auto}.q-drawer-handle{min-height:var(--ads-size-xxxs);display:flex;flex-direction:column-reverse;cursor:row-resize}.q-drawer-handle-content{width:var(--awds-drawer-handle-width, var(--ads-size-xxl));height:var(--awds-drawer-handle-height, var(--ads-size-nano));background-color:var(--awds-drawer-handle-background, var(--ads-color-body-400));border-radius:var(--awds-drawer-handle-border-radius, var(--ads-border-radius-xl));margin:0 auto}.q-drawer-handle-inverse{margin-top:auto;transform:rotateX(180deg)}.q-drawer-header{max-width:1120px;padding:var(--awds-drawer-header-padding, var(--ads-size-xs));min-height:var(--awds-drawer-header-min-height);display:flex;align-items:center;justify-content:var(--awds-drawer-header-justify-content);position:relative;flex-shrink:0}.q-drawer-header-title{font-family:var(--awds-drawer-header-title-font-family, var(--ads-font-family-heading));font-size:var(--awds-drawer-header-title-font-size, var(--ads-font-size-m));font-style:var(--awds-drawer-header-title-font-style, inherit);font-weight:var(--awds-drawer-header-title-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-drawer-header-title-letter-spacing, 0);line-height:var(--awds-drawer-header-title-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-drawer-header-title-text-transform, none);margin:var(--awds-drawer-header-title-margin)}.q-drawer-header-title-centered{margin:0 auto}.q-drawer-header:has(.q-drawer-header-close-icon) .q-drawer-header-title{padding-right:calc(var(--ads-size-xxxs) + var(--awds-drawer-header-close-dimensions, var(--ads-size-s)))}.q-drawer-header:has(.q-drawer-header-close-icon) .q-drawer-header-title-centered{padding:0 calc(var(--ads-size-xxxs) + var(--awds-drawer-header-close-dimensions, var(--ads-size-s)))}.q-drawer-header-close-icon{position:absolute;right:var(--ads-size-micro)}.q-drawer-content-container{overflow:auto}.q-drawer-content{max-width:1120px;padding:var(--awds-drawer-content-padding, 0 var(--ads-size-xs) var(--ads-size-xs));margin:0 auto}@media(max-width:599px){.q-drawer-header{min-height:var(--awds-drawer-header-min-height, var(--ads-size-xxxl));padding:var(--awds-drawer-header-padding, var(--ads-size-xxs) var(--ads-size-s));box-sizing:border-box}.q-drawer-content{padding:var(--awds-drawer-content-padding, 0 var(--ads-size-s) var(--ads-size-s))}}@media(min-width:600px){.q-drawer-container-top,.q-drawer-container-bottom{min-width:400px}.q-drawer-header{width:100%;margin:0 auto}.q-drawer-header-title{font-family:var(--awds-drawer-header-title-font-family, var(--ads-font-family-heading));font-size:var(--awds-drawer-header-title-font-size, var(--ads-font-size-l));font-style:var(--awds-drawer-header-title-font-style, inherit);font-weight:var(--awds-drawer-header-title-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-drawer-header-title-letter-spacing, 0);line-height:var(--awds-drawer-header-title-line-height, var(--ads-font-line-height-l));text-transform:var(--awds-drawer-header-title-text-transform, none)}}\n"] }]
        }], propDecorators: { closeRequested: [{
                type: Output
            }], closeIconClicked: [{
                type: Output
            }], fullscreenChange: [{
                type: Output
            }], title: [{
                type: Input
            }], position: [{
                type: Input
            }], showHeader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showHeaderIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableDefaultClose: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableResize: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], snapList: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], titleCentered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], _header: [{
                type: ViewChild,
                args: ['header']
            }], _content: [{
                type: ViewChild,
                args: ['content']
            }], _closeIcon: [{
                type: ViewChild,
                args: ['closeIcon', { read: ElementRef }]
            }], _dataQt: [{
                type: HostBinding,
                args: ['attr.data-qt']
            }], _minHeight: [{
                type: HostBinding,
                args: ['style.min-height']
            }], _width: [{
                type: HostBinding,
                args: ['style.width']
            }], _marginLeft: [{
                type: HostBinding,
                args: ['style.margin-left']
            }], _marginRight: [{
                type: HostBinding,
                args: ['style.margin-right']
            }], _hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QDrawerComponent {
    openStateChange = new EventEmitter();
    title = '';
    hasBorder = true;
    showHeader = true;
    hasBoxShadow = true;
    showHeaderIcon = true;
    titleCentered = false;
    disableResize = false;
    disableDefaultClose = false;
    closeOnBackdropClick = true;
    closeOnEsc = true;
    dataQt = 'q-drawer';
    position = 'bottom';
    snapList = [
        { value: 0, type: '%' },
        { value: 50, type: '%' },
        { value: 100, type: '%' },
    ];
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        if (!value) {
            this._popoverAttr = 'manual';
        }
        else {
            this._popoverAttr = 'auto';
        }
        this._hasBackdrop = value;
    }
    get openState() {
        return this._openState;
    }
    set openState(value) {
        if (value === this._openState)
            return;
        this._openState = value;
        if (value) {
            this.open();
        }
        else {
            this.close();
        }
        this._cdr.markForCheck();
    }
    /**
     * @deprecated Use --awds-drawer-container-width token instead.
     * @breaking-change First major after 10 Mar 2026
     */
    width = '';
    /**
     *  @deprecated Use --awds-drawer-container-height token instead.
     *  @breaking-change First major after 10 Mar 2026
     */
    height = '146px';
    /**
     * @deprecated Use `--awds-drawer-offset-top` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetTop = 0;
    /**
     * @deprecated Use `--awds-drawer-offset-left` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetLeft = 0;
    /**
     * @deprecated Use `--awds-drawer-offset-right` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetRight = 0;
    /**
     * @deprecated Use `--awds-drawer-offset-bottom` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetBottom = 0;
    get hostClasses() {
        return [
            'q-drawer',
            `q-drawer-${this.position}`,
            this.hasBorder && 'q-drawer-with-border',
            this.hasBoxShadow && 'q-drawer-with-box-shadow',
            this._rounded && 'q-drawer-rounded',
            this._fullscreen && 'q-drawer-fullscreen',
        ]
            .filter(Boolean)
            .join(' ');
    }
    get _hostStyle() {
        return [
            `--drawer-offset-top: ${this.offsetTop}px`,
            `--drawer-offset-bottom: ${this.offsetBottom}px`,
            `--drawer-offset-left: ${this.offsetLeft}px`,
            `--drawer-offset-right: ${this.offsetRight}px`,
        ].join('; ');
    }
    _popoverAttr = 'auto';
    _drawerContainer;
    _cdr = inject(ChangeDetectorRef);
    _hostElement = inject(ElementRef).nativeElement;
    _openState = false;
    _fullscreen = false;
    _hasBackdrop = true;
    _focusOrigin = null;
    ngAfterViewInit() {
        this._setupDialogEventListeners();
    }
    ngOnDestroy() {
        this.cleanUp();
    }
    open(focusOrigin) {
        if (this.isOpened)
            return;
        this._drawerContainer._setInitialHeight();
        if (this.hasBackdrop) {
            this._hostElement.showModal();
        }
        else {
            this._focusOrigin = focusOrigin ?? document.activeElement;
            this._hostElement.showPopover({ source: this._focusOrigin });
        }
        this._openState = true;
    }
    close() {
        this._hostElement.hidePopover();
        this._hostElement.close();
        this._focusOrigin?.focus();
        this._focusOrigin = null;
    }
    toggle() {
        if (this.isOpened) {
            this.close();
        }
        else {
            this.open();
        }
    }
    _onDrawerContainerClose() {
        if (!this.isOpened)
            return;
        this.close();
    }
    _onFullscreenChanged(isFullscreen) {
        this._fullscreen = isFullscreen;
        this._cdr.markForCheck();
    }
    get isOpened() {
        return this._hostElement.open || this._hostElement.matches(':popover-open');
    }
    _getCssTokensOffsetValue(name) {
        const cssVarValue = getComputedStyle(this._hostElement).getPropertyValue(name).trim();
        const offsetValue = parseFloat(cssVarValue);
        return isNaN(offsetValue) ? 0 : offsetValue;
    }
    get _rounded() {
        const byInput = {
            top: this.offsetTop,
            bottom: this.offsetBottom,
            left: this.offsetLeft,
            right: this.offsetRight,
        }[this.position];
        if ((byInput ?? 0) > 0)
            return true;
        const byTokenName = {
            top: '--awds-drawer-offset-top',
            bottom: '--awds-drawer-offset-bottom',
            left: '--awds-drawer-offset-left',
            right: '--awds-drawer-offset-right',
        }[this.position];
        return this._getCssTokensOffsetValue(byTokenName) > 0;
    }
    _onDialogCancel = (event) => {
        if (this.disableDefaultClose || !this.closeOnEsc) {
            event.preventDefault();
        }
    };
    _onDialogMouseDown = (event) => {
        if (this.disableDefaultClose || !this.closeOnBackdropClick || !this.hasBackdrop)
            return;
        if (event.target === this._hostElement) {
            this.close();
        }
    };
    _onDialogKeyDown = (event) => {
        if (event.key !== 'Escape')
            return;
        if (this.hasBackdrop) {
            if (this.disableDefaultClose || !this.closeOnEsc) {
                event.preventDefault();
                event.stopPropagation();
            }
            return;
        }
        if (this.disableDefaultClose || !this.closeOnEsc) {
            event.preventDefault();
            return;
        }
        this.close();
    };
    _handleBeforeToggle = (event) => {
        const toggleEvent = event;
        if (toggleEvent.newState === 'open') {
            requestAnimationFrame(() => {
                this._openState = true;
                this.openStateChange.emit(true);
            });
        }
        else if (toggleEvent.newState === 'closed') {
            requestAnimationFrame(() => {
                this._openState = false;
                this.openStateChange.emit(false);
            });
        }
    };
    _setupDialogEventListeners() {
        this._hostElement.addEventListener('cancel', this._onDialogCancel);
        this._hostElement.addEventListener('mousedown', this._onDialogMouseDown);
        this._hostElement.addEventListener('keydown', this._onDialogKeyDown);
        this._hostElement.addEventListener('beforetoggle', this._handleBeforeToggle);
    }
    cleanUp() {
        this._hostElement.removeEventListener('cancel', this._onDialogCancel);
        this._hostElement.removeEventListener('mousedown', this._onDialogMouseDown);
        this._hostElement.removeEventListener('keydown', this._onDialogKeyDown);
        this._hostElement.removeEventListener('beforetoggle', this._handleBeforeToggle);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDrawerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QDrawerComponent, isStandalone: true, selector: "dialog[q-drawer], dialog[qDrawer]", inputs: { title: "title", hasBorder: ["hasBorder", "hasBorder", booleanAttribute], showHeader: ["showHeader", "showHeader", booleanAttribute], hasBoxShadow: ["hasBoxShadow", "hasBoxShadow", booleanAttribute], showHeaderIcon: ["showHeaderIcon", "showHeaderIcon", booleanAttribute], titleCentered: ["titleCentered", "titleCentered", booleanAttribute], disableResize: ["disableResize", "disableResize", booleanAttribute], disableDefaultClose: ["disableDefaultClose", "disableDefaultClose", booleanAttribute], closeOnBackdropClick: ["closeOnBackdropClick", "closeOnBackdropClick", booleanAttribute], closeOnEsc: ["closeOnEsc", "closeOnEsc", booleanAttribute], dataQt: "dataQt", position: "position", snapList: "snapList", hasBackdrop: ["hasBackdrop", "hasBackdrop", booleanAttribute], openState: "openState", width: "width", height: "height", offsetTop: ["offsetTop", "offsetTop", numberAttribute], offsetLeft: ["offsetLeft", "offsetLeft", numberAttribute], offsetRight: ["offsetRight", "offsetRight", numberAttribute], offsetBottom: ["offsetBottom", "offsetBottom", numberAttribute] }, outputs: { openStateChange: "openStateChange" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses", "style": "this._hostStyle", "attr.popover": "this._popoverAttr" } }, viewQueries: [{ propertyName: "_drawerContainer", first: true, predicate: ["drawerContainer"], descendants: true }], ngImport: i0, template: "<q-drawer-container\n  #drawerContainer\n  [title]=\"title\"\n  [titleCentered]=\"titleCentered\"\n  [showHeader]=\"showHeader\"\n  [showHeaderIcon]=\"showHeaderIcon\"\n  [disableResize]=\"disableResize\"\n  [disableDefaultClose]=\"disableDefaultClose\"\n  [position]=\"position\"\n  [width]=\"width\"\n  [height]=\"height\"\n  [snapList]=\"snapList\"\n  (closeIconClicked)=\"close()\"\n  (closeRequested)=\"_onDrawerContainerClose()\"\n  (fullscreenChange)=\"_onFullscreenChanged($event)\">\n  <ng-content />\n</q-drawer-container>\n", styles: [".q-drawer{padding:0;border:none;outline:none;background:var(--awds-drawer-background, var(--ads-color-body-100));max-width:100vw;max-height:100vh;z-index:1000}.q-drawer-top{top:var(--awds-drawer-offset-top, var(--drawer-offset-top, 0));bottom:auto;border-top:none;border-bottom-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-bottom-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-bottom{bottom:var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0));top:auto;border-bottom:none;border-top-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-top-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-left{margin-top:0;left:var(--awds-drawer-offset-left, var(--drawer-offset-left, 0));top:var(--awds-drawer-offset-top, var(--drawer-offset-top, 0));bottom:var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0));right:auto;height:calc(100vh - var(--awds-drawer-offset-top, var(--drawer-offset-top, 0)) - var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0)));border-left:none;border-top-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-bottom-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-right{margin-top:0;right:var(--awds-drawer-offset-right, var(--drawer-offset-right, 0));top:var(--awds-drawer-offset-top, var(--drawer-offset-top, 0));bottom:var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0));left:auto;height:calc(100vh - var(--awds-drawer-offset-top, var(--drawer-offset-top, 0)) - var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0)));border-right:none;border-top-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-bottom-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer::backdrop{background:var(--awds-drawer-backdrop-background, var(--ads-color-overlay-400));-webkit-backdrop-filter:var(--awds-drawer-backdrop-filter, none);backdrop-filter:var(--awds-drawer-backdrop-filter, none)}.q-drawer-with-border{border:var(--awds-drawer-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-drawer-with-box-shadow{box-shadow:var(--awds-drawer-box-shadow, 0 4px 8px 0 rgba(0, 0, 0, .16))}.q-drawer-rounded{border-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-fullscreen{border-radius:0;border:none}.q-drawer[popover=manual]{--awds-drawer-backdrop-background: transparent;--awds-drawer-backdrop-filter: none}@media(max-width:599px){.q-drawer{box-sizing:content-box}}\n"], dependencies: [{ kind: "component", type: QDrawerContainerComponent, selector: "q-drawer-container", inputs: ["title", "position", "showHeader", "showHeaderIcon", "disableDefaultClose", "disableResize", "snapList", "width", "height", "titleCentered"], outputs: ["closeRequested", "closeIconClicked", "fullscreenChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDrawerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dialog[q-drawer], dialog[qDrawer]', imports: [QDrawerContainerComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<q-drawer-container\n  #drawerContainer\n  [title]=\"title\"\n  [titleCentered]=\"titleCentered\"\n  [showHeader]=\"showHeader\"\n  [showHeaderIcon]=\"showHeaderIcon\"\n  [disableResize]=\"disableResize\"\n  [disableDefaultClose]=\"disableDefaultClose\"\n  [position]=\"position\"\n  [width]=\"width\"\n  [height]=\"height\"\n  [snapList]=\"snapList\"\n  (closeIconClicked)=\"close()\"\n  (closeRequested)=\"_onDrawerContainerClose()\"\n  (fullscreenChange)=\"_onFullscreenChanged($event)\">\n  <ng-content />\n</q-drawer-container>\n", styles: [".q-drawer{padding:0;border:none;outline:none;background:var(--awds-drawer-background, var(--ads-color-body-100));max-width:100vw;max-height:100vh;z-index:1000}.q-drawer-top{top:var(--awds-drawer-offset-top, var(--drawer-offset-top, 0));bottom:auto;border-top:none;border-bottom-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-bottom-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-bottom{bottom:var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0));top:auto;border-bottom:none;border-top-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-top-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-left{margin-top:0;left:var(--awds-drawer-offset-left, var(--drawer-offset-left, 0));top:var(--awds-drawer-offset-top, var(--drawer-offset-top, 0));bottom:var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0));right:auto;height:calc(100vh - var(--awds-drawer-offset-top, var(--drawer-offset-top, 0)) - var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0)));border-left:none;border-top-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-bottom-right-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-right{margin-top:0;right:var(--awds-drawer-offset-right, var(--drawer-offset-right, 0));top:var(--awds-drawer-offset-top, var(--drawer-offset-top, 0));bottom:var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0));left:auto;height:calc(100vh - var(--awds-drawer-offset-top, var(--drawer-offset-top, 0)) - var(--awds-drawer-offset-bottom, var(--drawer-offset-bottom, 0)));border-right:none;border-top-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m));border-bottom-left-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer::backdrop{background:var(--awds-drawer-backdrop-background, var(--ads-color-overlay-400));-webkit-backdrop-filter:var(--awds-drawer-backdrop-filter, none);backdrop-filter:var(--awds-drawer-backdrop-filter, none)}.q-drawer-with-border{border:var(--awds-drawer-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-drawer-with-box-shadow{box-shadow:var(--awds-drawer-box-shadow, 0 4px 8px 0 rgba(0, 0, 0, .16))}.q-drawer-rounded{border-radius:var(--awds-drawer-border-radius, var(--ads-border-radius-m))}.q-drawer-fullscreen{border-radius:0;border:none}.q-drawer[popover=manual]{--awds-drawer-backdrop-background: transparent;--awds-drawer-backdrop-filter: none}@media(max-width:599px){.q-drawer{box-sizing:content-box}}\n"] }]
        }], propDecorators: { openStateChange: [{
                type: Output
            }], title: [{
                type: Input
            }], hasBorder: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showHeader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hasBoxShadow: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showHeaderIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], titleCentered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableResize: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableDefaultClose: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], closeOnBackdropClick: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], closeOnEsc: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], position: [{
                type: Input
            }], snapList: [{
                type: Input
            }], hasBackdrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], openState: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], offsetTop: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], offsetLeft: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], offsetRight: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], offsetBottom: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }], _hostStyle: [{
                type: HostBinding,
                args: ['style']
            }], _popoverAttr: [{
                type: HostBinding,
                args: ['attr.popover']
            }], _drawerContainer: [{
                type: ViewChild,
                args: ['drawerContainer']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QDrawerComponent };
//# sourceMappingURL=questrade-allspark-angular-components-drawer.mjs.map
