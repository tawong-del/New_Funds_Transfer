import * as i0 from '@angular/core';
import { input, numberAttribute, booleanAttribute, computed, signal, inject, ChangeDetectorRef, NgZone, HostListener, HostBinding, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { QScrollShadowDirective } from '@questrade/allspark-angular-components/core/directives';
import { QSharedResizeObserverService } from '@questrade/allspark-angular-components/core/services';
import { randomString, injectDestroy } from '@questrade/allspark-angular-components/core/utils';
import { takeUntil } from 'rxjs/operators';

class QScrollAreaComponent {
    viewportRef;
    scrollbarXRef;
    scrollbarYRef;
    thumbXRef;
    thumbYRef;
    cornerRef;
    _hostClass = 'q-scroll-area';
    get _dataQtBinding() {
        return this.dataQt();
    }
    _onMouseEnter = () => this._handleMouseenter();
    _onMouseleave = () => this._handleMouseleave();
    handlePointermove = (event) => this._handlePointermove(event);
    handlePointerUp = (event) => this._handlePointerup(event);
    visibilityMode = input('hover', ...(ngDevMode ? [{ debugName: "visibilityMode" }] : []));
    displayMode = input('overlay', ...(ngDevMode ? [{ debugName: "displayMode" }] : []));
    hideDelay = input(600, ...(ngDevMode ? [{ debugName: "hideDelay", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    enableScrollShadow = input(false, ...(ngDevMode ? [{ debugName: "enableScrollShadow", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    dataQt = input('q-scroll-area', ...(ngDevMode ? [{ debugName: "dataQt" }] : []));
    _showScrollbarX = computed(() => this._getShowScrollbarX(), ...(ngDevMode ? [{ debugName: "_showScrollbarX" }] : []));
    _showScrollbarY = computed(() => this._getShowScrollbarY(), ...(ngDevMode ? [{ debugName: "_showScrollbarY" }] : []));
    _shouldReserveSpaceX = computed(() => this._getShouldReserveSpaceX(), ...(ngDevMode ? [{ debugName: "_shouldReserveSpaceX" }] : []));
    _shouldReserveSpaceY = computed(() => this._getShouldReserveSpaceY(), ...(ngDevMode ? [{ debugName: "_shouldReserveSpaceY" }] : []));
    _showCorner = computed(() => this._showScrollbarX() && this._showScrollbarY(), ...(ngDevMode ? [{ debugName: "_showCorner" }] : []));
    _viewportPaddingRight = computed(() => this._getViewportPaddingRight(), ...(ngDevMode ? [{ debugName: "_viewportPaddingRight" }] : []));
    _viewportPaddingBottom = computed(() => this._getViewportPaddingBottom(), ...(ngDevMode ? [{ debugName: "_viewportPaddingBottom" }] : []));
    _thumbPositionX = 0;
    _thumbPositionY = 0;
    _ariaValueNowX = 0;
    _ariaValueNowY = 0;
    _thumbSizeX = 0;
    _thumbSizeY = 0;
    _scrollbarXSize = 0;
    _scrollbarYSize = 0;
    _cornerWidth = 0;
    _cornerHeight = 0;
    _viewportId = `q-scroll-area-viewport-id-${randomString()}`;
    _hasOverflowX = signal(false, ...(ngDevMode ? [{ debugName: "_hasOverflowX" }] : []));
    _hasOverflowY = signal(false, ...(ngDevMode ? [{ debugName: "_hasOverflowY" }] : []));
    _scrollState = signal('hidden', ...(ngDevMode ? [{ debugName: "_scrollState" }] : []));
    _hideTimeout = null;
    _dragAxis = null;
    _dragStartPos = { x: 0, y: 0 };
    _initialScrollPos = { left: 0, top: 0 };
    _pointerOffset = { x: 0, y: 0 };
    _originalScrollBehavior = '';
    _resizeRAF = 0;
    _isDragging = false;
    _isDestroyed = false;
    _scrollListenerCleanup = null;
    _debouncedScrollEndCleanup = null;
    _debouncedResizeCleanup = null;
    _debouncedScrollEnd = () => { };
    _debouncedResize = () => { };
    _resizeObserverService = inject(QSharedResizeObserverService);
    _cdr = inject(ChangeDetectorRef);
    _zone = inject(NgZone);
    _destroy$ = injectDestroy();
    ngAfterViewInit() {
        this._initializeResizeObserver();
        this._initializeScrollListener();
        this._initializeScrollbarSizes();
        this._initializeDebouncedCallbacks();
    }
    ngOnDestroy() {
        this._isDestroyed = true;
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
        }
        if (this._scrollListenerCleanup) {
            this._scrollListenerCleanup();
        }
        if (this._resizeRAF) {
            cancelAnimationFrame(this._resizeRAF);
        }
        if (this._debouncedScrollEndCleanup) {
            this._debouncedScrollEndCleanup();
        }
        if (this._debouncedResizeCleanup) {
            this._debouncedResizeCleanup();
        }
    }
    handleWheel(event) {
        const viewport = this.viewportRef.nativeElement;
        if (!viewport)
            return;
        viewport.offsetHeight;
        const hasOverflowX = viewport.scrollWidth > viewport.clientWidth;
        const hasOverflowY = viewport.scrollHeight > viewport.clientHeight;
        const isVerticalWheel = Math.abs(event.deltaY) > Math.abs(event.deltaX);
        const wheelDelta = isVerticalWheel ? event.deltaY : event.deltaX;
        const hasOverflow = isVerticalWheel ? hasOverflowY : hasOverflowX;
        if (hasOverflow && wheelDelta !== 0) {
            const currentScroll = isVerticalWheel ? viewport.scrollTop : viewport.scrollLeft;
            const maxScroll = isVerticalWheel
                ? viewport.scrollHeight - viewport.clientHeight
                : viewport.scrollWidth - viewport.clientWidth;
            const targetScrollPos = currentScroll + wheelDelta;
            if (this._isScrollingWithinScrollbarBounds(targetScrollPos, maxScroll)) {
                event.stopPropagation();
            }
            if (this.visibilityMode() === 'scroll') {
                this._handleInteraction();
            }
        }
    }
    handlePointerDown(event, axis) {
        event.preventDefault();
        const thumb = axis === 'x' ? this.thumbXRef.nativeElement : this.thumbYRef.nativeElement;
        if (event.target === thumb) {
            event.stopPropagation();
            this._handleThumbDrag(event, axis, thumb);
        }
        else {
            this._handleTrackClick(event, axis);
        }
    }
    _handleTrackClick(event, axis) {
        const viewport = this.viewportRef.nativeElement;
        const track = axis === 'x' ? this.scrollbarXRef.nativeElement : this.scrollbarYRef.nativeElement;
        const trackRect = track.getBoundingClientRect();
        const clickPosition = axis === 'x' ? event.clientX - trackRect.left : event.clientY - trackRect.top;
        const thumbSize = axis === 'x' ? this._thumbSizeX : this._thumbSizeY;
        const thumbCenter = thumbSize / 2;
        const scrollPos = this._getScrollPositionFromPointer(clickPosition, thumbCenter, axis);
        if (axis === 'x') {
            viewport.scrollLeft = scrollPos;
        }
        else {
            viewport.scrollTop = scrollPos;
        }
    }
    _handleThumbDrag(event, axis, thumb) {
        this._isDragging = true;
        this._dragAxis = axis;
        const viewport = this.viewportRef.nativeElement;
        this._originalScrollBehavior = viewport.style.scrollBehavior;
        viewport.style.scrollBehavior = 'auto';
        const thumbRect = thumb.getBoundingClientRect();
        this._pointerOffset = {
            x: event.clientX - thumbRect.left,
            y: event.clientY - thumbRect.top,
        };
        thumb.setPointerCapture(event.pointerId);
        this._dragStartPos = { x: event.clientX, y: event.clientY };
        this._initialScrollPos = {
            left: viewport.scrollLeft,
            top: viewport.scrollTop,
        };
    }
    _handleInteraction() {
        if (this.visibilityMode() !== 'scroll') {
            return;
        }
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
        }
        this._scrollState.set('interacting');
        this._startHideTimeout();
    }
    _initializeScrollListener() {
        this._zone.runOutsideAngular(() => {
            const viewport = this.viewportRef.nativeElement;
            let prevPosition = { left: viewport.scrollLeft, top: viewport.scrollTop };
            let rAF = 0;
            let removeUnlinkedListener = null;
            const addUnlinkedScrollListener = (handler) => {
                const loop = () => {
                    if (this._isDestroyed)
                        return;
                    const position = { left: viewport.scrollLeft, top: viewport.scrollTop };
                    const isHorizontalScroll = prevPosition.left !== position.left;
                    const isVerticalScroll = prevPosition.top !== position.top;
                    if (isHorizontalScroll || isVerticalScroll) {
                        handler();
                    }
                    prevPosition = position;
                    rAF = requestAnimationFrame(loop);
                };
                rAF = requestAnimationFrame(loop);
                return () => cancelAnimationFrame(rAF);
            };
            const debounceScrollEnd = this._createDebounceCallback(() => {
                if (removeUnlinkedListener) {
                    removeUnlinkedListener();
                    removeUnlinkedListener = null;
                }
                if (this.visibilityMode() === 'scroll') {
                    this._debouncedScrollEnd();
                }
            }, 100).fn;
            const handleScroll = () => {
                debounceScrollEnd();
                if (this.visibilityMode() === 'scroll') {
                    const currentState = this._scrollState();
                    if (currentState !== 'interacting') {
                        this._scrollState.set('scrolling');
                    }
                }
                if (!removeUnlinkedListener) {
                    removeUnlinkedListener = addUnlinkedScrollListener(() => {
                        this._updateThumbPositions();
                        this._cdr.detectChanges();
                    });
                }
                this._updateThumbPositions();
                this._cdr.detectChanges();
            };
            this._updateCornerSizes();
            this._updateThumbPositions();
            viewport.addEventListener('scroll', handleScroll);
            this._scrollListenerCleanup = () => {
                viewport.removeEventListener('scroll', handleScroll);
                if (removeUnlinkedListener) {
                    removeUnlinkedListener();
                }
            };
        });
    }
    _initializeResizeObserver() {
        this._zone.runOutsideAngular(() => {
            const viewport = this.viewportRef.nativeElement;
            const content = viewport.firstElementChild;
            const handleResize = () => {
                if (this._isDestroyed)
                    return;
                if (this._resizeRAF)
                    cancelAnimationFrame(this._resizeRAF);
                this._resizeRAF = requestAnimationFrame(() => {
                    if (this._isDestroyed)
                        return;
                    this._debouncedResize();
                });
            };
            this._resizeObserverService
                .observe(viewport)
                ?.pipe(takeUntil(this._destroy$))
                .subscribe(() => handleResize());
            if (content) {
                this._resizeObserverService
                    .observe(content)
                    ?.pipe(takeUntil(this._destroy$))
                    .subscribe(() => handleResize());
            }
            requestAnimationFrame(() => {
                if (this._isDestroyed)
                    return;
                this._updateScrollbar(true);
                this._updateCornerSizes();
                this._updateThumbPositions();
            });
        });
    }
    _startHideTimeout() {
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
        }
        this._hideTimeout = setTimeout(() => {
            this._zone.run(() => {
                if (this.visibilityMode() === 'hover') {
                    this._scrollState.set('hidden');
                    return;
                }
                if (this._isDragging) {
                    return;
                }
                this._scrollState.set('hidden');
            });
        }, this.hideDelay());
    }
    _updateScrollbar(runChangeDetection = true) {
        const viewport = this.viewportRef.nativeElement;
        const hasOverflowX = viewport.scrollWidth > viewport.clientWidth;
        const hasOverflowY = viewport.scrollHeight > viewport.clientHeight;
        this._hasOverflowX.set(hasOverflowX);
        this._hasOverflowY.set(hasOverflowY);
        if (runChangeDetection) {
            this._cdr.detectChanges();
        }
    }
    _updateThumbPositions() {
        const viewport = this.viewportRef.nativeElement;
        if (this._showScrollbarX()) {
            const scrollbar = this.scrollbarXRef.nativeElement;
            const computedStyle = getComputedStyle(scrollbar);
            const sizes = {
                content: viewport.scrollWidth,
                viewport: viewport.clientWidth,
                scrollbar: {
                    size: scrollbar.clientWidth - (this._showCorner() ? this._cornerWidth : 0),
                    paddingStart: this._toInt(computedStyle.paddingLeft),
                    paddingEnd: this._toInt(computedStyle.paddingRight),
                },
            };
            this._thumbSizeX = this._getThumbSize(sizes);
            this._thumbPositionX = this._getThumbOffsetFromScroll(viewport.scrollLeft, sizes);
            this._ariaValueNowX =
                (viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth)) * 100;
        }
        if (this._showScrollbarY()) {
            const scrollbar = this.scrollbarYRef.nativeElement;
            const computedStyle = getComputedStyle(scrollbar);
            const sizes = {
                content: viewport.scrollHeight,
                viewport: viewport.clientHeight,
                scrollbar: {
                    size: scrollbar.clientHeight - (this._showCorner() ? this._cornerHeight : 0),
                    paddingStart: this._toInt(computedStyle.paddingTop),
                    paddingEnd: this._toInt(computedStyle.paddingBottom),
                },
            };
            this._thumbSizeY = this._getThumbSize(sizes);
            this._thumbPositionY = this._getThumbOffsetFromScroll(viewport.scrollTop, sizes);
            this._ariaValueNowY =
                (viewport.scrollTop / (viewport.scrollHeight - viewport.clientHeight)) * 100;
        }
    }
    _updateCornerSizes() {
        if (this._showCorner()) {
            this._cornerWidth = this.scrollbarYRef.nativeElement.offsetWidth;
            this._cornerHeight = this.scrollbarXRef.nativeElement.offsetHeight;
        }
        else {
            this._cornerWidth = 0;
            this._cornerHeight = 0;
        }
        this._cdr.detectChanges();
    }
    _createDebounceCallback(callback, delay) {
        let timeoutId = null;
        const fn = (...args) => {
            if (timeoutId)
                clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                this._zone.run(() => callback(...args));
            }, delay);
        };
        const cleanup = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };
        return { fn, cleanup };
    }
    _handleMouseenter() {
        if (this.visibilityMode() === 'hover') {
            if (this._hideTimeout) {
                clearTimeout(this._hideTimeout);
                this._hideTimeout = null;
            }
            this._scrollState.set('interacting');
            this._updateScrollbar(true);
            this._updateThumbPositions();
        }
        else if (this.visibilityMode() === 'scroll') {
            const currentState = this._scrollState();
            if (currentState === 'scrolling' || currentState === 'idle') {
                this._scrollState.set('interacting');
            }
        }
    }
    _handleMouseleave() {
        if (this.visibilityMode() === 'hover') {
            this._startHideTimeout();
        }
        else if (this.visibilityMode() === 'scroll') {
            const currentState = this._scrollState();
            if (currentState === 'interacting') {
                this._scrollState.set('idle');
                this._startHideTimeout();
            }
        }
    }
    _handlePointermove(event) {
        if (!this._isDragging || !this._dragAxis)
            return;
        this._zone.runOutsideAngular(() => {
            const viewport = this.viewportRef.nativeElement;
            const scrollbar = this._dragAxis === 'x'
                ? this.scrollbarXRef.nativeElement
                : this.scrollbarYRef.nativeElement;
            const scrollbarRect = scrollbar.getBoundingClientRect();
            const pointerPos = this._dragAxis === 'x'
                ? event.clientX - scrollbarRect.left
                : event.clientY - scrollbarRect.top;
            const pointerOffset = this._dragAxis === 'x' ? this._pointerOffset.x : this._pointerOffset.y;
            const scrollPos = this._getScrollPositionFromPointer(pointerPos, pointerOffset, this._dragAxis);
            if (this._dragAxis === 'x') {
                viewport.scrollLeft = scrollPos;
            }
            else {
                viewport.scrollTop = scrollPos;
            }
        });
    }
    _handlePointerup(event) {
        if (!this._isDragging)
            return;
        const thumb = this._dragAxis === 'x' ? this.thumbXRef.nativeElement : this.thumbYRef.nativeElement;
        if (thumb.hasPointerCapture(event.pointerId)) {
            thumb.releasePointerCapture(event.pointerId);
        }
        const viewport = this.viewportRef.nativeElement;
        viewport.style.scrollBehavior = this._originalScrollBehavior || '';
        this._isDragging = false;
        this._dragAxis = null;
    }
    _getShowScrollbarX() {
        const state = this._scrollState();
        const hasOverflowX = this._hasOverflowX();
        const visibilityMode = this.visibilityMode();
        if (!hasOverflowX)
            return false;
        switch (visibilityMode) {
            case 'always':
            case 'auto':
                return true;
            case 'scroll':
            case 'hover':
                return state === 'scrolling' || state === 'interacting' || state === 'idle';
            default:
                return false;
        }
    }
    _getShowScrollbarY() {
        const state = this._scrollState();
        const hasOverflowY = this._hasOverflowY();
        const visibilityMode = this.visibilityMode();
        if (!hasOverflowY)
            return false;
        switch (visibilityMode) {
            case 'always':
            case 'auto':
                return true;
            case 'scroll':
            case 'hover':
                return state === 'scrolling' || state === 'interacting' || state === 'idle';
            default:
                return false;
        }
    }
    _getShouldReserveSpaceX() {
        const hasOverflowX = this._hasOverflowX();
        const displayMode = this.displayMode();
        const visibilityMode = this.visibilityMode();
        if (displayMode === 'overlay')
            return false;
        switch (visibilityMode) {
            case 'always':
            case 'scroll':
            case 'hover':
                return true;
            case 'auto':
                return hasOverflowX;
            default:
                return false;
        }
    }
    _getShouldReserveSpaceY() {
        const hasOverflowY = this._hasOverflowY();
        const displayMode = this.displayMode();
        const visibilityMode = this.visibilityMode();
        if (displayMode === 'overlay')
            return false;
        switch (visibilityMode) {
            case 'always':
            case 'scroll':
            case 'hover':
                return true;
            case 'auto':
                return hasOverflowY;
            default:
                return false;
        }
    }
    _getViewportPaddingRight() {
        if (!this._shouldReserveSpaceY())
            return null;
        if (this._showCorner()) {
            return Math.max(this._scrollbarYSize, this._cornerWidth);
        }
        return this._scrollbarYSize;
    }
    _getViewportPaddingBottom() {
        if (!this._shouldReserveSpaceX())
            return null;
        if (this._showCorner()) {
            return Math.max(this._scrollbarXSize, this._cornerHeight);
        }
        return this._scrollbarXSize;
    }
    _initializeScrollbarSizes() {
        this._scrollbarXSize = this.scrollbarXRef.nativeElement.offsetHeight;
        this._scrollbarYSize = this.scrollbarYRef.nativeElement.offsetWidth;
    }
    _initializeDebouncedCallbacks() {
        const scrollEndCallback = this._createDebounceCallback(() => {
            if (this.visibilityMode() === 'hover') {
                return;
            }
            this._scrollState.set('idle');
            this._startHideTimeout();
        }, 100);
        this._debouncedScrollEnd = scrollEndCallback.fn;
        this._debouncedScrollEndCleanup = scrollEndCallback.cleanup;
        const resizeCallback = this._createDebounceCallback(() => {
            this._updateScrollbar();
            this._updateCornerSizes();
            this._updateThumbPositions();
        }, 10);
        this._debouncedResize = resizeCallback.fn;
        this._debouncedResizeCleanup = resizeCallback.cleanup;
    }
    _isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
        return scrollPos > 0 && scrollPos < maxScrollPos;
    }
    _linearScale(input, output) {
        return (value) => {
            if (input[0] === input[1] || output[0] === output[1])
                return output[0];
            const ratio = (output[1] - output[0]) / (input[1] - input[0]);
            return output[0] + ratio * (value - input[0]);
        };
    }
    _clamp(value, [min, max]) {
        return Math.min(max, Math.max(min, value));
    }
    _toInt(value) {
        return value ? parseInt(value, 10) : 0;
    }
    _getThumbRatio(viewportSize, contentSize) {
        const ratio = viewportSize / contentSize;
        return isNaN(ratio) ? 0 : ratio;
    }
    _getThumbSize(sizes) {
        const ratio = this._getThumbRatio(sizes.viewport, sizes.content);
        const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
        const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
        return Math.max(thumbSize, 18);
    }
    _getThumbOffsetFromScroll(scrollPos, sizes) {
        const thumbSizePx = this._getThumbSize(sizes);
        const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
        const scrollbar = sizes.scrollbar.size - scrollbarPadding;
        const maxScrollPos = sizes.content - sizes.viewport;
        const maxThumbPos = scrollbar - thumbSizePx;
        const scrollClampRange = [0, maxScrollPos];
        const scrollWithoutMomentum = this._clamp(scrollPos, scrollClampRange);
        const interpolate = this._linearScale([0, maxScrollPos], [0, maxThumbPos]);
        return interpolate(scrollWithoutMomentum);
    }
    _getScrollPositionFromPointer(pointerPos, pointerOffset, axis) {
        const viewport = this.viewportRef.nativeElement;
        const scrollbar = axis === 'x' ? this.scrollbarXRef.nativeElement : this.scrollbarYRef.nativeElement;
        const isHorizontal = axis === 'x';
        const contentSize = isHorizontal ? viewport.scrollWidth : viewport.scrollHeight;
        const viewportSize = isHorizontal ? viewport.clientWidth : viewport.clientHeight;
        let scrollbarSize = isHorizontal ? scrollbar.clientWidth : scrollbar.clientHeight;
        if (this._showCorner()) {
            scrollbarSize -= isHorizontal ? this._cornerWidth : this._cornerHeight;
        }
        const computedStyle = getComputedStyle(scrollbar);
        const sizes = {
            content: contentSize,
            viewport: viewportSize,
            scrollbar: {
                size: scrollbarSize,
                paddingStart: isHorizontal
                    ? this._toInt(computedStyle.paddingLeft)
                    : this._toInt(computedStyle.paddingTop),
                paddingEnd: isHorizontal
                    ? this._toInt(computedStyle.paddingRight)
                    : this._toInt(computedStyle.paddingBottom),
            },
        };
        const thumbSizePx = this._getThumbSize(sizes);
        const thumbCenter = thumbSizePx / 2;
        const offset = pointerOffset || thumbCenter;
        const thumbOffsetFromEnd = thumbSizePx - offset;
        const minPointerPos = sizes.scrollbar.paddingStart + offset;
        const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
        const maxScrollPos = sizes.content - sizes.viewport;
        const scrollRange = [0, maxScrollPos];
        const interpolate = this._linearScale([minPointerPos, maxPointerPos], scrollRange);
        return interpolate(pointerPos);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QScrollAreaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.16", type: QScrollAreaComponent, isStandalone: true, selector: "q-scroll-area, [q-scroll-area], [qScrollArea]", inputs: { visibilityMode: { classPropertyName: "visibilityMode", publicName: "visibilityMode", isSignal: true, isRequired: false, transformFunction: null }, displayMode: { classPropertyName: "displayMode", publicName: "displayMode", isSignal: true, isRequired: false, transformFunction: null }, hideDelay: { classPropertyName: "hideDelay", publicName: "hideDelay", isSignal: true, isRequired: false, transformFunction: null }, enableScrollShadow: { classPropertyName: "enableScrollShadow", publicName: "enableScrollShadow", isSignal: true, isRequired: false, transformFunction: null }, dataQt: { classPropertyName: "dataQt", publicName: "dataQt", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "mouseenter": "_onMouseEnter()", "mouseleave": "_onMouseleave()", "window:pointermove": "handlePointermove($event)", "window:pointerup": "handlePointerUp($event)" }, properties: { "class": "this._hostClass", "attr.data-qt": "this._dataQtBinding" } }, viewQueries: [{ propertyName: "viewportRef", first: true, predicate: ["scrollAreaViewport"], descendants: true, static: true }, { propertyName: "scrollbarXRef", first: true, predicate: ["scrollbarX"], descendants: true, static: true }, { propertyName: "scrollbarYRef", first: true, predicate: ["scrollbarY"], descendants: true, static: true }, { propertyName: "thumbXRef", first: true, predicate: ["thumbX"], descendants: true, static: true }, { propertyName: "thumbYRef", first: true, predicate: ["thumbY"], descendants: true, static: true }, { propertyName: "cornerRef", first: true, predicate: ["corner"], descendants: true, static: true }], ngImport: i0, template: "<div\n  #scrollAreaViewport\n  qScrollShadow\n  [qScrollShadowEnabled]=\"enableScrollShadow()\"\n  [id]=\"_viewportId\"\n  class=\"q-scroll-area-viewport\"\n  (wheel)=\"handleWheel($event)\"\n  [style.padding-right.px]=\"_viewportPaddingRight()\"\n  [style.padding-bottom.px]=\"_viewportPaddingBottom()\">\n  <ng-content />\n</div>\n\n<div\n  #scrollbarX\n  role=\"scrollbar\"\n  aria-orientation=\"horizontal\"\n  [attr.aria-controls]=\"_viewportId\"\n  [attr.aria-valuenow]=\"_ariaValueNowX\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n  class=\"q-scroll-area-scrollbar q-scroll-area-scrollbar-x\"\n  [class.q-scroll-area-is-visible]=\"_showScrollbarX()\"\n  [style.right.px]=\"_showCorner() ? _cornerWidth : 0\"\n  (pointerdown)=\"handlePointerDown($event, 'x')\">\n  <div\n    #thumbX\n    class=\"q-scroll-area-thumb\"\n    [style.width.px]=\"_thumbSizeX\"\n    [style.transform]=\"'translateX(' + _thumbPositionX + 'px)'\"></div>\n</div>\n\n<div\n  #scrollbarY\n  role=\"scrollbar\"\n  aria-orientation=\"vertical\"\n  [attr.aria-controls]=\"_viewportId\"\n  [attr.aria-valuenow]=\"_ariaValueNowY\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n  class=\"q-scroll-area-scrollbar q-scroll-area-scrollbar-y\"\n  [class.q-scroll-area-is-visible]=\"_showScrollbarY()\"\n  [style.bottom.px]=\"_showCorner() ? _cornerHeight : 0\"\n  (pointerdown)=\"handlePointerDown($event, 'y')\">\n  <div\n    #thumbY\n    class=\"q-scroll-area-thumb\"\n    [style.height.px]=\"_thumbSizeY\"\n    [style.transform]=\"'translateY(' + _thumbPositionY + 'px)'\"></div>\n</div>\n\n<div\n  #corner\n  class=\"q-scroll-area-corner\"\n  [class.q-scroll-area-is-visible]=\"_showCorner()\"\n  [style.width.px]=\"_cornerWidth\"\n  [style.height.px]=\"_cornerHeight\"></div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-scroll-area{display:block;position:relative;overflow:hidden;width:100%;height:100%}.q-scroll-area-viewport{scrollbar-width:none;overflow:scroll;position:relative;width:100%;height:100%}.q-scroll-area-viewport::-webkit-scrollbar{display:none}.q-scroll-area-viewport:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}.q-scroll-area-scrollbar{position:absolute;display:flex;-webkit-user-select:none;user-select:none;touch-action:none;background:var(--awds-scroll-area-track-background, transparent);border-radius:var(--awds-scroll-area-track-border-radius, 0);opacity:0;pointer-events:none}.q-scroll-area-scrollbar-x{flex-direction:row;align-items:center;height:var(--awds-scroll-area-track-thickness, var(--ads-size-micro));bottom:0;left:0;width:100%}.q-scroll-area-scrollbar-x .q-scroll-area-thumb{height:var(--awds-scroll-area-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-scrollbar-y{flex-direction:column;align-items:center;width:var(--awds-scroll-area-track-thickness, var(--ads-size-micro));top:0;right:0;height:100%}.q-scroll-area-scrollbar-y .q-scroll-area-thumb{width:var(--awds-scroll-area-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-thumb{position:relative;display:block;opacity:var(--awds-scroll-area-thumb-opacity, .4);background:var(--awds-scroll-area-thumb-background, var(--ads-color-body-700));border-radius:var(--awds-scroll-area-thumb-border-radius, var(--ads-border-radius-xl))}.q-scroll-area-corner{position:absolute;bottom:0;right:0;background:var(--awds-scroll-area-corner-background, transparent);opacity:0;pointer-events:none}.q-scroll-area-is-visible{opacity:1;pointer-events:auto}.q-scroll-area-scrollbar:hover{background:var(--awds-scroll-area-hover-track-background, transparent)}.q-scroll-area-scrollbar-x:hover{height:var(--awds-scroll-area-hover-track-thickness, var(--ads-size-micro))}.q-scroll-area-scrollbar-x:hover .q-scroll-area-thumb,.q-scroll-area-scrollbar-x .q-scroll-area-thumb:hover{height:var(--awds-scroll-area-track-hover-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-scrollbar-x:hover .q-scroll-area-thumb:hover{height:var(--awds-scroll-area-hover-thumb-thickness, 6px)}.q-scroll-area-scrollbar-y:hover{width:var(--awds-scroll-area-hover-track-thickness, var(--ads-size-micro))}.q-scroll-area-scrollbar-y:hover .q-scroll-area-thumb,.q-scroll-area-scrollbar-y .q-scroll-area-thumb:hover{width:var(--awds-scroll-area-track-hover-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-scrollbar-y:hover .q-scroll-area-thumb:hover{width:var(--awds-scroll-area-hover-thumb-thickness, 6px)}.q-scroll-area-thumb:hover{opacity:var(--awds-scroll-area-hover-thumb-opacity, .4);background:var(--awds-scroll-area-hover-thumb-background, var(--ads-color-body-700))}\n"], dependencies: [{ kind: "directive", type: QScrollShadowDirective, selector: "[qScrollShadow]", inputs: ["qScrollShadowAuditTimeMs", "qScrollShadowEnabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QScrollAreaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-scroll-area, [q-scroll-area], [qScrollArea]', imports: [QScrollShadowDirective], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  #scrollAreaViewport\n  qScrollShadow\n  [qScrollShadowEnabled]=\"enableScrollShadow()\"\n  [id]=\"_viewportId\"\n  class=\"q-scroll-area-viewport\"\n  (wheel)=\"handleWheel($event)\"\n  [style.padding-right.px]=\"_viewportPaddingRight()\"\n  [style.padding-bottom.px]=\"_viewportPaddingBottom()\">\n  <ng-content />\n</div>\n\n<div\n  #scrollbarX\n  role=\"scrollbar\"\n  aria-orientation=\"horizontal\"\n  [attr.aria-controls]=\"_viewportId\"\n  [attr.aria-valuenow]=\"_ariaValueNowX\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n  class=\"q-scroll-area-scrollbar q-scroll-area-scrollbar-x\"\n  [class.q-scroll-area-is-visible]=\"_showScrollbarX()\"\n  [style.right.px]=\"_showCorner() ? _cornerWidth : 0\"\n  (pointerdown)=\"handlePointerDown($event, 'x')\">\n  <div\n    #thumbX\n    class=\"q-scroll-area-thumb\"\n    [style.width.px]=\"_thumbSizeX\"\n    [style.transform]=\"'translateX(' + _thumbPositionX + 'px)'\"></div>\n</div>\n\n<div\n  #scrollbarY\n  role=\"scrollbar\"\n  aria-orientation=\"vertical\"\n  [attr.aria-controls]=\"_viewportId\"\n  [attr.aria-valuenow]=\"_ariaValueNowY\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n  class=\"q-scroll-area-scrollbar q-scroll-area-scrollbar-y\"\n  [class.q-scroll-area-is-visible]=\"_showScrollbarY()\"\n  [style.bottom.px]=\"_showCorner() ? _cornerHeight : 0\"\n  (pointerdown)=\"handlePointerDown($event, 'y')\">\n  <div\n    #thumbY\n    class=\"q-scroll-area-thumb\"\n    [style.height.px]=\"_thumbSizeY\"\n    [style.transform]=\"'translateY(' + _thumbPositionY + 'px)'\"></div>\n</div>\n\n<div\n  #corner\n  class=\"q-scroll-area-corner\"\n  [class.q-scroll-area-is-visible]=\"_showCorner()\"\n  [style.width.px]=\"_cornerWidth\"\n  [style.height.px]=\"_cornerHeight\"></div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-scroll-area{display:block;position:relative;overflow:hidden;width:100%;height:100%}.q-scroll-area-viewport{scrollbar-width:none;overflow:scroll;position:relative;width:100%;height:100%}.q-scroll-area-viewport::-webkit-scrollbar{display:none}.q-scroll-area-viewport:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}.q-scroll-area-scrollbar{position:absolute;display:flex;-webkit-user-select:none;user-select:none;touch-action:none;background:var(--awds-scroll-area-track-background, transparent);border-radius:var(--awds-scroll-area-track-border-radius, 0);opacity:0;pointer-events:none}.q-scroll-area-scrollbar-x{flex-direction:row;align-items:center;height:var(--awds-scroll-area-track-thickness, var(--ads-size-micro));bottom:0;left:0;width:100%}.q-scroll-area-scrollbar-x .q-scroll-area-thumb{height:var(--awds-scroll-area-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-scrollbar-y{flex-direction:column;align-items:center;width:var(--awds-scroll-area-track-thickness, var(--ads-size-micro));top:0;right:0;height:100%}.q-scroll-area-scrollbar-y .q-scroll-area-thumb{width:var(--awds-scroll-area-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-thumb{position:relative;display:block;opacity:var(--awds-scroll-area-thumb-opacity, .4);background:var(--awds-scroll-area-thumb-background, var(--ads-color-body-700));border-radius:var(--awds-scroll-area-thumb-border-radius, var(--ads-border-radius-xl))}.q-scroll-area-corner{position:absolute;bottom:0;right:0;background:var(--awds-scroll-area-corner-background, transparent);opacity:0;pointer-events:none}.q-scroll-area-is-visible{opacity:1;pointer-events:auto}.q-scroll-area-scrollbar:hover{background:var(--awds-scroll-area-hover-track-background, transparent)}.q-scroll-area-scrollbar-x:hover{height:var(--awds-scroll-area-hover-track-thickness, var(--ads-size-micro))}.q-scroll-area-scrollbar-x:hover .q-scroll-area-thumb,.q-scroll-area-scrollbar-x .q-scroll-area-thumb:hover{height:var(--awds-scroll-area-track-hover-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-scrollbar-x:hover .q-scroll-area-thumb:hover{height:var(--awds-scroll-area-hover-thumb-thickness, 6px)}.q-scroll-area-scrollbar-y:hover{width:var(--awds-scroll-area-hover-track-thickness, var(--ads-size-micro))}.q-scroll-area-scrollbar-y:hover .q-scroll-area-thumb,.q-scroll-area-scrollbar-y .q-scroll-area-thumb:hover{width:var(--awds-scroll-area-track-hover-thumb-thickness, var(--ads-size-nano))}.q-scroll-area-scrollbar-y:hover .q-scroll-area-thumb:hover{width:var(--awds-scroll-area-hover-thumb-thickness, 6px)}.q-scroll-area-thumb:hover{opacity:var(--awds-scroll-area-hover-thumb-opacity, .4);background:var(--awds-scroll-area-hover-thumb-background, var(--ads-color-body-700))}\n"] }]
        }], propDecorators: { viewportRef: [{
                type: ViewChild,
                args: ['scrollAreaViewport', { static: true }]
            }], scrollbarXRef: [{
                type: ViewChild,
                args: ['scrollbarX', { static: true }]
            }], scrollbarYRef: [{
                type: ViewChild,
                args: ['scrollbarY', { static: true }]
            }], thumbXRef: [{
                type: ViewChild,
                args: ['thumbX', { static: true }]
            }], thumbYRef: [{
                type: ViewChild,
                args: ['thumbY', { static: true }]
            }], cornerRef: [{
                type: ViewChild,
                args: ['corner', { static: true }]
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }], _dataQtBinding: [{
                type: HostBinding,
                args: ['attr.data-qt']
            }], _onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], _onMouseleave: [{
                type: HostListener,
                args: ['mouseleave']
            }], handlePointermove: [{
                type: HostListener,
                args: ['window:pointermove', ['$event']]
            }], handlePointerUp: [{
                type: HostListener,
                args: ['window:pointerup', ['$event']]
            }], visibilityMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "visibilityMode", required: false }] }], displayMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "displayMode", required: false }] }], hideDelay: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideDelay", required: false }] }], enableScrollShadow: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableScrollShadow", required: false }] }], dataQt: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataQt", required: false }] }] } });

const QScrollAreaDisplayModeValues = ['overlay', 'inline'];

const QScrollAreaVisibilityModeValues = ['auto', 'always', 'scroll', 'hover'];

/**
 * Generated bundle index. Do not edit.
 */

export { QScrollAreaComponent, QScrollAreaDisplayModeValues, QScrollAreaVisibilityModeValues };
//# sourceMappingURL=questrade-allspark-angular-components-scroll-area.mjs.map
