import * as i0 from '@angular/core';
import { EventEmitter, inject, ElementRef, ChangeDetectorRef, booleanAttribute, HostListener, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component, ViewChild, ContentChildren } from '@angular/core';
import { ENTER, SPACE, UP_ARROW, DOWN_ARROW, isMobilePhone } from '@questrade/allspark-angular-components/core/utils';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { NgIf } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { QDestroyService, QSharedResizeObserverService } from '@questrade/allspark-angular-components/core/services';
import { QDividerComponent } from '@questrade/allspark-angular-components/divider';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { chevronLeft, chevronRight } from '@questrade/allspark-icons/icons';
import { ReplaySubject, merge, fromEvent, takeUntil, debounceTime, startWith, map, combineLatest, distinctUntilChanged, observeOn, asyncScheduler, delay, switchMap, filter, take } from 'rxjs';

class QTabControl {
}

class QTabComponent {
    tabClick = new EventEmitter();
    tabFocus = new EventEmitter();
    key;
    disabled = false;
    dataQt = 'q-tab';
    ariaControls = null;
    isActive = false;
    hostClass = 'q-tab';
    _pressed = false;
    role = 'tab';
    get tabindexAttr() {
        return !this.disabled && this.isActive ? 0 : -1;
    }
    _onClick(event) {
        if (this.disabled)
            return;
        this.tabClick.emit(event);
    }
    _onTabKeyUp(event) {
        if (this.disabled || this.isActive)
            return;
        if (event.code === ENTER || event.code === SPACE) {
            this._pressed = this._pressed && false;
            this.tabClick.emit(event);
            event.preventDefault();
        }
    }
    _onTabIndexEnter(event) {
        if (this.disabled)
            return;
        if (event.code === ENTER || event.code === SPACE) {
            this._pressed = !this.isActive;
            event.preventDefault();
        }
    }
    _onTabFocus() {
        if (this.disabled || this.isActive)
            return;
        this.tabFocus.emit(this);
    }
    translateValue = '0px';
    _elementRef = inject(ElementRef);
    _changeDetectorRef = inject(ChangeDetectorRef);
    getKey() {
        return this.key;
    }
    getIsActive() {
        return this.isActive;
    }
    /** @hidden */
    focus() {
        this._elementRef.nativeElement.focus();
        setTimeout(() => this.scrollTabIntoView('smooth'), 100);
    }
    scrollTabIntoView(behavior) {
        const tabsContainer = this._elementRef.nativeElement.closest('.q-tabs-items');
        const element = this._elementRef.nativeElement;
        const elementRect = element.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const elementCenter = elementRect.left + elementRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const scrollLeft = tabsContainer.scrollLeft + elementCenter - containerCenter;
        if (behavior === 'smooth') {
            tabsContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth',
            });
        }
        else {
            tabsContainer.scrollLeft = scrollLeft;
        }
    }
    setActiveState(isActive) {
        if (isActive !== this.isActive) {
            this.isActive = isActive;
            this.translateValue = isActive ? `${this.getElementWidth()}px` : '0px';
            this._changeDetectorRef.markForCheck();
        }
    }
    getElementWidth() {
        return parseInt(getComputedStyle(this._elementRef.nativeElement).width);
    }
    getElementLeft() {
        return this._elementRef.nativeElement.offsetLeft;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QTabComponent, isStandalone: true, selector: "q-tab", inputs: { key: "key", disabled: ["disabled", "disabled", booleanAttribute], dataQt: "dataQt", ariaControls: "ariaControls", isActive: ["isActive", "isActive", booleanAttribute] }, outputs: { tabClick: "tabClick", tabFocus: "tabFocus" }, host: { listeners: { "click": "_onClick($event)", "keyup": "_onTabKeyUp($event)", "keydown": "_onTabIndexEnter($event)", "focus": "_onTabFocus($event)" }, properties: { "class.q-tab-disabled": "this.disabled", "attr.data-qt": "this.dataQt", "attr.aria-controls": "this.ariaControls", "class.q-tab-selected": "this.isActive", "attr.aria-selected": "this.isActive", "class": "this.hostClass", "class.pressed": "this._pressed", "attr.role": "this.role", "attr.tabindex": "this.tabindexAttr" } }, providers: [{ provide: QTabControl, useExisting: QTabComponent }], ngImport: i0, template: '<ng-content />', isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-tab{font-family:var(--awds-tab-container-font-family, var(--ads-font-family-body));font-size:var(--awds-tab-container-font-size, var(--ads-font-size-xxs));font-style:var(--awds-tab-container-font-style, inherit);font-weight:var(--awds-tab-container-font-weight, var(--ads-font-weight-bold));letter-spacing:var(--awds-tab-container-letter-spacing, .1em);line-height:var(--awds-tab-container-line-height, var(--ads-font-line-height-xxs));text-transform:var(--awds-tab-container-text-transform, uppercase);display:flex;-webkit-user-select:none;user-select:none;align-items:center;cursor:pointer;transition:all .1s ease-out;outline:none;color:var(--awds-tab-container-color, var(--ads-color-body-600));background:var(--awds-tab-container-background, transparent);padding:var(--awds-tab-container-padding, var(--ads-size-micro) var(--ads-size-nano));margin:var(--awds-tab-container-margin, 0 0 var(--ads-size-nano) 0);border-radius:var(--awds-tab-container-border-radius, var(--ads-border-radius-s));-webkit-tap-highlight-color:transparent}.q-tab:hover{color:var(--awds-tab-hover-container-color, var(--ads-color-primary-500));background:var(--awds-tab-hover-container-background, transparent);transition:color .15s ease-out}.q-tab:active{color:var(--awds-tab-active-container-color, currentcolor);background:var(--awds-tab-active-container-background, transparent);transition:color .15s ease-out}.q-tab:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}.q-tab.q-tab-selected{color:var(--awds-tab-selected-container-color, var(--ads-color-primary-500));background:var(--awds-tab-selected-container-background, transparent);cursor:default}.q-tab.q-tab-selected.q-tab-disabled{color:var(--awds-tab-selected-disabled-container-color, var(--ads-color-primary-200));background:var(--awds-tab-selected-disabled-container-background, transparent)}.q-tab.q-tab-disabled{color:var(--awds-tab-disabled-container-color, var(--ads-color-body-400));background:var(--awds-tab-disabled-container-background, transparent);opacity:var(--awds-tab-disabled-container-opacity, 1);cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-tab', template: '<ng-content />', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [{ provide: QTabControl, useExisting: QTabComponent }], styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-tab{font-family:var(--awds-tab-container-font-family, var(--ads-font-family-body));font-size:var(--awds-tab-container-font-size, var(--ads-font-size-xxs));font-style:var(--awds-tab-container-font-style, inherit);font-weight:var(--awds-tab-container-font-weight, var(--ads-font-weight-bold));letter-spacing:var(--awds-tab-container-letter-spacing, .1em);line-height:var(--awds-tab-container-line-height, var(--ads-font-line-height-xxs));text-transform:var(--awds-tab-container-text-transform, uppercase);display:flex;-webkit-user-select:none;user-select:none;align-items:center;cursor:pointer;transition:all .1s ease-out;outline:none;color:var(--awds-tab-container-color, var(--ads-color-body-600));background:var(--awds-tab-container-background, transparent);padding:var(--awds-tab-container-padding, var(--ads-size-micro) var(--ads-size-nano));margin:var(--awds-tab-container-margin, 0 0 var(--ads-size-nano) 0);border-radius:var(--awds-tab-container-border-radius, var(--ads-border-radius-s));-webkit-tap-highlight-color:transparent}.q-tab:hover{color:var(--awds-tab-hover-container-color, var(--ads-color-primary-500));background:var(--awds-tab-hover-container-background, transparent);transition:color .15s ease-out}.q-tab:active{color:var(--awds-tab-active-container-color, currentcolor);background:var(--awds-tab-active-container-background, transparent);transition:color .15s ease-out}.q-tab:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}.q-tab.q-tab-selected{color:var(--awds-tab-selected-container-color, var(--ads-color-primary-500));background:var(--awds-tab-selected-container-background, transparent);cursor:default}.q-tab.q-tab-selected.q-tab-disabled{color:var(--awds-tab-selected-disabled-container-color, var(--ads-color-primary-200));background:var(--awds-tab-selected-disabled-container-background, transparent)}.q-tab.q-tab-disabled{color:var(--awds-tab-disabled-container-color, var(--ads-color-body-400));background:var(--awds-tab-disabled-container-background, transparent);opacity:var(--awds-tab-disabled-container-opacity, 1);cursor:default}\n"] }]
        }], propDecorators: { tabClick: [{
                type: Output
            }], tabFocus: [{
                type: Output
            }], key: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-tab-disabled']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], ariaControls: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.aria-controls']
            }], isActive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-tab-selected']
            }, {
                type: HostBinding,
                args: ['attr.aria-selected']
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], _pressed: [{
                type: HostBinding,
                args: ['class.pressed']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], tabindexAttr: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], _onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _onTabKeyUp: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], _onTabIndexEnter: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], _onTabFocus: [{
                type: HostListener,
                args: ['focus', ['$event']]
            }] } });

class QTabsComponent {
    tabClick = new EventEmitter();
    variant = 'subtle';
    hasExtraPadding = false;
    hasBottomLine = false;
    ariaLabelledBy = null;
    dataQt = 'q-tabs';
    set active(key) {
        this._activeKey$.next(key);
    }
    get hostClasses() {
        return ['q-tabs', `q-tabs-${this.variant}`, this.hasExtraPadding && 'q-tabs-extra-padding']
            .filter(Boolean)
            .join(' ');
    }
    _tabItems;
    _tabList;
    _leftScroll = false;
    _rightScroll = false;
    _disableTransition = true;
    _activeItemLeft = '0px';
    _activeItemWidth = '0px';
    _gapSize = 0;
    _keyManager = null;
    _activeKey$ = new ReplaySubject(undefined);
    _iconRegistry = inject(QIconRegistryService);
    _changeDetectorRef = inject(ChangeDetectorRef);
    _destroy$ = inject(QDestroyService);
    _resizeObserver = inject(QSharedResizeObserverService);
    _translocoService = inject(TranslocoService);
    constructor() {
        this._iconRegistry.registerIcons([chevronLeft, chevronRight]);
    }
    ngAfterViewInit() {
        const tabList = this._tabList.nativeElement;
        this._updateScrollShadowVisibility();
        merge(fromEvent(tabList, 'scroll'))
            .pipe(takeUntil(this._destroy$), debounceTime(100))
            .subscribe(() => this._updateScrollShadowVisibility());
        this._resizeObserver
            .observe(tabList)
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            this._disableTransition = true;
            this._updateUnderlinePosition();
            this._updateScrollShadowVisibility();
        });
        const tabItems$ = this._tabItems.changes.pipe(takeUntil(this._destroy$), startWith(this._tabItems), map((queryList) => queryList.toArray()));
        const activeOrItemsChanges$ = combineLatest([
            this._activeKey$.pipe(takeUntil(this._destroy$), distinctUntilChanged()),
            tabItems$,
        ])
            // As first execution happens during AfterContentInit we need to do
            // the changes in the next event loop
            .pipe(observeOn(asyncScheduler));
        // Set active state for selected tab and remove it from previously selected
        // it will be executed on each tab items change or active key change
        activeOrItemsChanges$.subscribe(([activeKey, tabItems]) => {
            tabItems.forEach((tabItem) => {
                tabItem.setActiveState(activeKey === tabItem.getKey());
            });
            this._updateUnderlinePosition();
        });
        this._translocoService.langChanges$
            .pipe(takeUntil(this._destroy$), delay(100))
            .subscribe(() => {
            this._updateUnderlinePosition();
        });
        // listen to the tab item click events in order to propagate the event outside of the component
        tabItems$
            .pipe(switchMap((tabItems) => merge(...tabItems.map((tabItem) => tabItem.tabClick.pipe(filter(() => !tabItem.getIsActive()), map((domEvent) => ({
            domEvent,
            key: tabItem.getKey(),
        })))))))
            .subscribe(this._tabClickEvent.bind(this));
        // listen to the tab focus event to update the keyFocusManager's activeItem
        tabItems$
            .pipe(switchMap((tabItems) => merge(...tabItems.map((tabItem) => tabItem.tabFocus))))
            .subscribe((tab) => this._keyManager?.setActiveItem(tab));
        activeOrItemsChanges$
            .pipe(take(1))
            .subscribe(([activeKey, tabItems]) => this._focusActiveOnInit(tabItems, activeKey));
        tabItems$.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._updateFocusKeyManagerEntries();
        });
    }
    ngOnDestroy() {
        this._keyManager?.destroy();
    }
    _handleStartScrollClick() {
        this._moveTabsScroll(-1 * (this._getScrollSize() - 70));
    }
    _handleEndScrollClick() {
        this._moveTabsScroll(this._getScrollSize() - 70);
    }
    _handleKeydown(event) {
        if ([UP_ARROW, DOWN_ARROW].includes(event.code)) {
            return;
        }
        this._keyManager?.onKeydown(event);
    }
    _enableTransition() {
        requestAnimationFrame(() => {
            this._disableTransition = false;
            this._changeDetectorRef.markForCheck();
        });
    }
    _calculateUnderlinePosition(activeIndex) {
        const leftOffset = this._tabItems.get(activeIndex)?.getElementLeft() || 0;
        const activeTabWidth = this._tabItems.get(activeIndex)?.getElementWidth();
        return { left: `${leftOffset}px`, width: `${activeTabWidth}px` };
    }
    _updateUnderlinePosition() {
        if (!this._tabItems)
            return;
        const activeIndex = this._tabItems.toArray().findIndex((tab) => tab.getIsActive());
        if (activeIndex === -1) {
            return;
        }
        const { left, width } = this._calculateUnderlinePosition(activeIndex);
        this._activeItemLeft = left;
        this._activeItemWidth = width;
        this._changeDetectorRef.markForCheck();
        this._enableTransition();
    }
    get translateX() {
        return `translateX(${this._activeItemLeft})`;
    }
    get _isMobile() {
        return isMobilePhone();
    }
    get currentChildren() {
        return Array.from(this._tabList.nativeElement.children);
    }
    _tabClickEvent(eventData) {
        const clickedTabRect = eventData.domEvent.target.getBoundingClientRect();
        const tabListRect = this._tabList.nativeElement.getBoundingClientRect();
        const iconSpace = this.variant === 'emphasized' ? 42 : 34;
        const leftOverflow = clickedTabRect.left - tabListRect.left - iconSpace;
        const rightOverflow = tabListRect.right - clickedTabRect.right - iconSpace;
        if (leftOverflow > 0) {
            if (rightOverflow <= 0) {
                const nextScrollStart = this._tabList.nativeElement.scrollLeft + leftOverflow;
                this._scroll(nextScrollStart);
            }
        }
        else if (rightOverflow > 0) {
            const nextScrollStart = this._tabList.nativeElement.scrollLeft - rightOverflow;
            this._scroll(nextScrollStart);
        }
        this._activeKey$.next(eventData.key);
        this.tabClick.emit(eventData);
    }
    _moveTabsScroll(scrollDistance) {
        let scrollValue = this._tabList.nativeElement['scrollLeft'];
        scrollValue += scrollDistance;
        this._scroll(scrollValue);
    }
    _scroll(scrollValue) {
        const tabList = this._tabList.nativeElement;
        const currentScrollValue = tabList.scrollLeft;
        const distance = scrollValue - currentScrollValue;
        const startTime = performance.now();
        const animateScroll = (timestamp) => {
            const progress = Math.min(1, (timestamp - startTime) / 250);
            const easedProgress = this._getCubicAnimationValue(progress);
            const newScrollValue = currentScrollValue + distance * easedProgress;
            tabList.scrollLeft = newScrollValue;
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        requestAnimationFrame(animateScroll);
    }
    _getCubicAnimationValue(progressRatio) {
        const accelerationPhase = 4 * progressRatio ** 3;
        const decelerationPhase = 1 - (-2 * progressRatio + 2) ** 3 / 2;
        return progressRatio < 0.5 ? accelerationPhase : decelerationPhase;
    }
    _getScrollSize() {
        const containerSize = this._tabList.nativeElement.clientWidth;
        let totalSize = 0;
        const currentChildren = Array.from(this._tabList.nativeElement.children);
        for (const tab of currentChildren) {
            const tabWidth = this.variant === 'emphasized' ? tab.clientWidth + 32 : tab.clientWidth;
            if (totalSize + tabWidth > containerSize) {
                break;
            }
            totalSize += tab.clientWidth;
        }
        return totalSize;
    }
    _updateScrollShadowVisibility() {
        if (!this._tabList)
            return;
        const { scrollWidth, clientWidth, scrollLeft } = this._tabList.nativeElement;
        this._leftScroll = scrollLeft > 0;
        this._rightScroll = scrollWidth > clientWidth + Math.round(scrollLeft) + 1;
        this._changeDetectorRef.detach();
        this._changeDetectorRef.detectChanges();
        this._changeDetectorRef.reattach();
    }
    _focusActiveOnInit(tabItems, activeKey) {
        tabItems.forEach((tabItem) => {
            if (activeKey === tabItem.getKey()) {
                tabItem.scrollTabIntoView('instant');
            }
        });
    }
    _updateFocusKeyManagerEntries() {
        this._keyManager = new FocusKeyManager(this._tabItems)
            .withWrap()
            .withHomeAndEnd()
            .withHorizontalOrientation('ltr');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QTabsComponent, isStandalone: true, selector: "q-tabs", inputs: { variant: "variant", hasExtraPadding: ["hasExtraPadding", "hasExtraPadding", booleanAttribute], hasBottomLine: ["hasBottomLine", "hasBottomLine", booleanAttribute], ariaLabelledBy: "ariaLabelledBy", dataQt: "dataQt", active: "active" }, outputs: { tabClick: "tabClick" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, providers: [QDestroyService], queries: [{ propertyName: "_tabItems", predicate: QTabControl }], viewQueries: [{ propertyName: "_tabList", first: true, predicate: ["tabList"], descendants: true }], ngImport: i0, template: "<q-icon\n  *ngIf=\"_leftScroll\"\n  class=\"q-icon-left\"\n  [size]=\"'16'\"\n  [class.is-mobile]=\"_isMobile\"\n  [name]=\"'chevronLeft'\"\n  [dataQt]=\"'q-left-icon'\"\n  (click)=\"_handleStartScrollClick()\" />\n\n<q-icon\n  *ngIf=\"_rightScroll\"\n  class=\"q-icon-right\"\n  [size]=\"'16'\"\n  [class.is-mobile]=\"_isMobile\"\n  [name]=\"'chevronRight'\"\n  [dataQt]=\"'q-right-icon'\"\n  (click)=\"_handleEndScrollClick()\" />\n\n<div\n  #tabList\n  class=\"q-tabs-items\"\n  role=\"tablist\"\n  [attr.aria-labelledby]=\"ariaLabelledBy\"\n  [class.q-tabs-extra-padding]=\"hasExtraPadding\"\n  [class.q-tabs-scroll-left]=\"_leftScroll\"\n  [class.q-tabs-scroll-right]=\"_rightScroll\"\n  (keydown)=\"_handleKeydown($event)\">\n  <ng-content select=\"q-tab\" />\n  <div\n    class=\"q-tab-underline\"\n    [class.q-tab-underline-no-transition]=\"_disableTransition\"\n    [style.transform]=\"translateX\"\n    [style.width]=\"_activeItemWidth\"></div>\n</div>\n\n<q-divider *ngIf=\"hasBottomLine\" />\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-tabs{position:relative;outline:none;display:flex;flex-direction:column;max-width:var(--awds-tabs-container-max-width, 100%);padding:var(--awds-tabs-container-padding, 0)}.q-tabs.q-tabs-extra-padding{--awds-tabs-container-padding: 0 var(--ads-size-s)}.q-tabs .q-tabs-scroll-left:not(.q-tabs-scroll-right){mask-image:var(--awds-tabs-navigation-left-mask-image, linear-gradient(270deg, rgb(255, 255, 255) 0, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 30px) , rgba(255, 255, 255, 0) 100%));-webkit-mask-image:var(--awds-tabs-navigation-left-mask-image, linear-gradient(270deg, rgb(255, 255, 255) 0, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 30px) , rgba(255, 255, 255, 0) 100%))}.q-tabs .q-tabs-scroll-right:not(.q-tabs-scroll-left){mask-image:var(--awds-tabs-navigation-right-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 30px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) 100%));-webkit-mask-image:var(--awds-tabs-navigation-right-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 30px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) 100%))}.q-tabs .q-tabs-scroll-left.q-tabs-scroll-right{mask-image:var(--awds-tabs-navigation-both-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 10px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 10px) , rgba(255, 255, 255, 0) 100%));-webkit-mask-image:var(--awds-tabs-navigation-both-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 10px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 10px) , rgba(255, 255, 255, 0) 100%))}.q-tabs .q-tabs-items{display:flex;flex-direction:row;flex-wrap:nowrap;white-space:nowrap;position:relative;overflow-x:scroll;gap:var(--awds-tabs-items-gap, var(--ads-size-xxs))}@-moz-document url-prefix(){.q-tabs .q-tabs-items{scrollbar-width:none}}.q-tabs .q-tabs-items::-webkit-scrollbar{display:none}.q-tabs .q-icon{position:absolute;top:var(--awds-tabs-navigation-icon-top, var(--ads-size-micro));z-index:15;cursor:pointer}.q-tabs .q-icon-left{right:var(--awds-tabs-left-navigation-icon-right, auto);left:var(--awds-tabs-left-navigation-icon-left, var(--ads-size-nano))}.q-tabs .q-icon-right{left:var(--awds-tabs-right-navigation-icon-left, auto);right:var(--awds-tabs-right-navigation-icon-right, var(--ads-size-nano))}.q-tabs .q-icon:before{content:\"\";position:absolute;left:50%;transform:translate(-50%);z-index:-1;border-radius:var(--awds-tabs-navigation-icon-container-border-radius, var(--ads-border-radius-xl));background:var(--awds-tabs-navigation-icon-container-background, var(--ads-color-body-300));width:var(--awds-tabs-navigation-icon-container-width, var(--ads-size-s));height:var(--awds-tabs-navigation-icon-container-height, var(--ads-size-s))}.q-tabs.q-tabs-emphasized .q-tab{font-family:var(--awds-tab-emphasized-container-font-family, var(--ads-font-family-body));font-size:var(--awds-tab-emphasized-container-font-size, var(--ads-font-size-s));font-style:var(--awds-tab-emphasized-container-font-style, inherit);font-weight:var(--awds-tab-emphasized-container-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-tab-emphasized-container-letter-spacing, 0);line-height:var(--awds-tab-emphasized-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-tab-emphasized-container-text-transform, none);padding:var(--awds-tab-emphasized-container-padding, var(--ads-size-micro) var(--ads-size-nano));margin:var(--awds-tab-emphasized-container-margin, 0 0 var(--ads-size-micro) 0)}.q-tabs.q-tabs-emphasized .q-tabs-items{gap:var(--awds-tabs-emphasized-items-gap, var(--ads-size-s))}.q-tabs.q-tabs-emphasized .q-icon{top:var(--awds-tabs-emphasized-navigation-icon-top, 10px);width:var(--awds-tabs-emphasized-navigation-icon-width, var(--ads-size-xs));height:var(--awds-tabs-emphasized-navigation-icon-height, var(--ads-size-xs))}.q-tabs.q-tabs-emphasized .q-icon:before{width:var(--awds-tabs-emphasized-navigation-icon-container-width, var(--ads-size-m));height:var(--awds-tabs-emphasized-navigation-icon-container-height, var(--ads-size-m))}.q-tabs .q-tab-underline{transition:transform .2s ease-in-out,width .2s ease-in-out;position:absolute;bottom:var(--awds-tabs-selected-indicator-bottom, 0);left:0;display:block;background-clip:content-box;height:var(--awds-tabs-selected-indicator-height, var(--tab-active-underline-height, var(--ads-size-nano)));padding:var(--awds-tabs-selected-indicator-padding, 0);background:var(--awds-tabs-selected-indicator-background, var(--ads-color-primary-400));mask-image:var(--awds-tabs-selected-indicator-mask-image, none);mask-size:var(--awds-tabs-selected-indicator-mask-size, auto);-webkit-mask-image:var(--awds-tabs-selected-indicator-mask-image, none);-webkit-mask-size:var(--awds-tabs-selected-indicator-mask-size, auto)}.q-tabs .q-tab-underline-no-transition{transition:none}@media(max-width:599px){.q-tabs .q-tabs-items{gap:var(--awds-tabs-mobile-items-gap, var(--ads-size-xxs))}}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QDividerComponent, selector: "q-divider", inputs: ["type", "style", "orientation", "dataQt"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-tabs', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf, QIconComponent, QDividerComponent], encapsulation: ViewEncapsulation.None, providers: [QDestroyService], template: "<q-icon\n  *ngIf=\"_leftScroll\"\n  class=\"q-icon-left\"\n  [size]=\"'16'\"\n  [class.is-mobile]=\"_isMobile\"\n  [name]=\"'chevronLeft'\"\n  [dataQt]=\"'q-left-icon'\"\n  (click)=\"_handleStartScrollClick()\" />\n\n<q-icon\n  *ngIf=\"_rightScroll\"\n  class=\"q-icon-right\"\n  [size]=\"'16'\"\n  [class.is-mobile]=\"_isMobile\"\n  [name]=\"'chevronRight'\"\n  [dataQt]=\"'q-right-icon'\"\n  (click)=\"_handleEndScrollClick()\" />\n\n<div\n  #tabList\n  class=\"q-tabs-items\"\n  role=\"tablist\"\n  [attr.aria-labelledby]=\"ariaLabelledBy\"\n  [class.q-tabs-extra-padding]=\"hasExtraPadding\"\n  [class.q-tabs-scroll-left]=\"_leftScroll\"\n  [class.q-tabs-scroll-right]=\"_rightScroll\"\n  (keydown)=\"_handleKeydown($event)\">\n  <ng-content select=\"q-tab\" />\n  <div\n    class=\"q-tab-underline\"\n    [class.q-tab-underline-no-transition]=\"_disableTransition\"\n    [style.transform]=\"translateX\"\n    [style.width]=\"_activeItemWidth\"></div>\n</div>\n\n<q-divider *ngIf=\"hasBottomLine\" />\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-tabs{position:relative;outline:none;display:flex;flex-direction:column;max-width:var(--awds-tabs-container-max-width, 100%);padding:var(--awds-tabs-container-padding, 0)}.q-tabs.q-tabs-extra-padding{--awds-tabs-container-padding: 0 var(--ads-size-s)}.q-tabs .q-tabs-scroll-left:not(.q-tabs-scroll-right){mask-image:var(--awds-tabs-navigation-left-mask-image, linear-gradient(270deg, rgb(255, 255, 255) 0, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 30px) , rgba(255, 255, 255, 0) 100%));-webkit-mask-image:var(--awds-tabs-navigation-left-mask-image, linear-gradient(270deg, rgb(255, 255, 255) 0, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 30px) , rgba(255, 255, 255, 0) 100%))}.q-tabs .q-tabs-scroll-right:not(.q-tabs-scroll-left){mask-image:var(--awds-tabs-navigation-right-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 30px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) 100%));-webkit-mask-image:var(--awds-tabs-navigation-right-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 30px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) 100%))}.q-tabs .q-tabs-scroll-left.q-tabs-scroll-right{mask-image:var(--awds-tabs-navigation-both-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 10px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 10px) , rgba(255, 255, 255, 0) 100%));-webkit-mask-image:var(--awds-tabs-navigation-both-mask-image, linear-gradient(270deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 10px, rgb(255, 255, 255) 70px, rgb(255, 255, 255) calc(100% - 70px) , rgba(255, 255, 255, 0) calc(100% - 10px) , rgba(255, 255, 255, 0) 100%))}.q-tabs .q-tabs-items{display:flex;flex-direction:row;flex-wrap:nowrap;white-space:nowrap;position:relative;overflow-x:scroll;gap:var(--awds-tabs-items-gap, var(--ads-size-xxs))}@-moz-document url-prefix(){.q-tabs .q-tabs-items{scrollbar-width:none}}.q-tabs .q-tabs-items::-webkit-scrollbar{display:none}.q-tabs .q-icon{position:absolute;top:var(--awds-tabs-navigation-icon-top, var(--ads-size-micro));z-index:15;cursor:pointer}.q-tabs .q-icon-left{right:var(--awds-tabs-left-navigation-icon-right, auto);left:var(--awds-tabs-left-navigation-icon-left, var(--ads-size-nano))}.q-tabs .q-icon-right{left:var(--awds-tabs-right-navigation-icon-left, auto);right:var(--awds-tabs-right-navigation-icon-right, var(--ads-size-nano))}.q-tabs .q-icon:before{content:\"\";position:absolute;left:50%;transform:translate(-50%);z-index:-1;border-radius:var(--awds-tabs-navigation-icon-container-border-radius, var(--ads-border-radius-xl));background:var(--awds-tabs-navigation-icon-container-background, var(--ads-color-body-300));width:var(--awds-tabs-navigation-icon-container-width, var(--ads-size-s));height:var(--awds-tabs-navigation-icon-container-height, var(--ads-size-s))}.q-tabs.q-tabs-emphasized .q-tab{font-family:var(--awds-tab-emphasized-container-font-family, var(--ads-font-family-body));font-size:var(--awds-tab-emphasized-container-font-size, var(--ads-font-size-s));font-style:var(--awds-tab-emphasized-container-font-style, inherit);font-weight:var(--awds-tab-emphasized-container-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-tab-emphasized-container-letter-spacing, 0);line-height:var(--awds-tab-emphasized-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-tab-emphasized-container-text-transform, none);padding:var(--awds-tab-emphasized-container-padding, var(--ads-size-micro) var(--ads-size-nano));margin:var(--awds-tab-emphasized-container-margin, 0 0 var(--ads-size-micro) 0)}.q-tabs.q-tabs-emphasized .q-tabs-items{gap:var(--awds-tabs-emphasized-items-gap, var(--ads-size-s))}.q-tabs.q-tabs-emphasized .q-icon{top:var(--awds-tabs-emphasized-navigation-icon-top, 10px);width:var(--awds-tabs-emphasized-navigation-icon-width, var(--ads-size-xs));height:var(--awds-tabs-emphasized-navigation-icon-height, var(--ads-size-xs))}.q-tabs.q-tabs-emphasized .q-icon:before{width:var(--awds-tabs-emphasized-navigation-icon-container-width, var(--ads-size-m));height:var(--awds-tabs-emphasized-navigation-icon-container-height, var(--ads-size-m))}.q-tabs .q-tab-underline{transition:transform .2s ease-in-out,width .2s ease-in-out;position:absolute;bottom:var(--awds-tabs-selected-indicator-bottom, 0);left:0;display:block;background-clip:content-box;height:var(--awds-tabs-selected-indicator-height, var(--tab-active-underline-height, var(--ads-size-nano)));padding:var(--awds-tabs-selected-indicator-padding, 0);background:var(--awds-tabs-selected-indicator-background, var(--ads-color-primary-400));mask-image:var(--awds-tabs-selected-indicator-mask-image, none);mask-size:var(--awds-tabs-selected-indicator-mask-size, auto);-webkit-mask-image:var(--awds-tabs-selected-indicator-mask-image, none);-webkit-mask-size:var(--awds-tabs-selected-indicator-mask-size, auto)}.q-tabs .q-tab-underline-no-transition{transition:none}@media(max-width:599px){.q-tabs .q-tabs-items{gap:var(--awds-tabs-mobile-items-gap, var(--ads-size-xxs))}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { tabClick: [{
                type: Output
            }], variant: [{
                type: Input
            }], hasExtraPadding: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hasBottomLine: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaLabelledBy: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], active: [{
                type: Input
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }], _tabItems: [{
                type: ContentChildren,
                args: [QTabControl]
            }], _tabList: [{
                type: ViewChild,
                args: ['tabList']
            }] } });

const Q_TABS_COMPONENTS = [QTabComponent, QTabsComponent];

/**
 * Generated bundle index. Do not edit.
 */

export { QTabComponent, QTabControl, QTabsComponent, Q_TABS_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-tabs.mjs.map
