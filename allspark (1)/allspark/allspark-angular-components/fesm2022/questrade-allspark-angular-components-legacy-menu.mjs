import { FocusMonitor, FocusKeyManager } from '@angular/cdk/a11y';
import { NgIf } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, inject, ElementRef, booleanAttribute, HostListener, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, Component, Directive, EventEmitter, QueryList, ViewChild, forwardRef, ContentChildren, Output } from '@angular/core';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { chevronRight } from '@questrade/allspark-icons/icons';
import { Subject, takeUntil, of, filter, merge, delay, asapScheduler, startWith, switchMap } from 'rxjs';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { RIGHT_ARROW, ENTER, LEFT_ARROW, TAB, ESCAPE } from '@questrade/allspark-angular-components/core/utils';
import { coerceArray } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { QOverlayComponent } from '@questrade/allspark-angular-components/overlay';

const Q_MENU_PANEL = new InjectionToken('Q_MENU_PANEL');

/**
 * @deprecated Use QMenuItemComponent instead, To be removed.
 * @breaking-change First major after Fev 26, 2026
 */
class QLegacyMenuItemComponent {
    disabled = false;
    dataQt = 'q-menu-item';
    set _parentMenu(value) {
        if (!value) {
            return;
        }
        this.parentMenu = value;
    }
    // Prevents the default element actions if it is disabled.
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten
    _onItemClick(event) {
        if (this.disabled || this.triggersSubmenu) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this.parentMenu?.closed.emit('click');
    }
    // Emits to the hover stream.
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _handleMouseEnter() {
        this.hovered.next(this);
    }
    _handleMouseLeave() {
        this._selected = false;
    }
    _handleMouseDown() {
        this._selected = true;
    }
    _handleMouseUp() {
        this._selected = false;
    }
    _highlighted = false;
    _selected = false;
    triggersSubmenu = false;
    parentMenu;
    hovered = new Subject();
    focused = new Subject();
    _iconRegistry = inject(QIconRegistryService);
    _elementRef = inject((ElementRef));
    _focusMonitor = inject(FocusMonitor);
    constructor() {
        const parentMenu = inject(Q_MENU_PANEL, { optional: true });
        this._parentMenu = parentMenu ?? undefined;
        this._iconRegistry.registerIcons([chevronRight]);
    }
    ngAfterViewInit() {
        if (this._focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for menu items only when the focus was not caused by a
            // mouse or touch interaction.
            this._focusMonitor.monitor(this._elementRef, false);
        }
    }
    ngOnDestroy() {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef);
        }
        this.hovered.complete();
        this.focused.complete();
    }
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    focus(origin, options) {
        if (this._focusMonitor && origin) {
            this._focusMonitor.focusVia(this.getHostElement(), origin, options);
        }
        else {
            this.getHostElement().focus(options);
        }
        this.focused.next(this);
    }
    getHostElement() {
        return this._elementRef.nativeElement;
    }
    getLabel() {
        const clone = this._elementRef.nativeElement.cloneNode(true);
        return clone.textContent?.trim() || '';
    }
    setHighlighted(isHighlighted) {
        this._highlighted = isHighlighted;
    }
    setSelected(isSelected) {
        this._selected = isSelected;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLegacyMenuItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QLegacyMenuItemComponent, isStandalone: true, selector: "[q-menu-item]", inputs: { disabled: ["disabled", "disabled", booleanAttribute], dataQt: "dataQt", _parentMenu: ["parentMenu", "_parentMenu"] }, host: { listeners: { "click": "_onItemClick($event)", "mouseenter": "_handleMouseEnter()", "mouseleave": "_handleMouseLeave()", "mousedown": "_handleMouseDown()", "mouseup": "_handleMouseUp()" }, properties: { "attr.role": "'menuitem'", "attr.disabled": "disabled || null", "attr.tabindex": "_getTabIndex()", "class.highlighted": "_highlighted", "class.selected": "_selected", "attr.data-qt": "this.dataQt" }, classAttribute: "q-legacy-menu-item q-focus-indicator-inset" }, ngImport: i0, template: "<div class=\"q-legacy-menu-item-content\">\n  <ng-content />\n</div>\n\n<q-icon\n  *ngIf=\"triggersSubmenu\"\n  name=\"chevronRight\"\n  class=\"q-legacy-menu-item-submenu-indicator\"\n  [size]=\"'20'\"\n  [dataQt]=\"'q-chevron-right-icon'\" />\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-legacy-menu-item{display:flex;align-items:center;font-family:inherit;color:var(--awds-legacy-menu-item-container-color, var(--ads-color-body-contrast-100));gap:var(--awds-legacy-menu-item-container-gap, var(--ads-size-micro));min-height:var(--awds-legacy-menu-item-container-min-height, var(--ads-size-xxl));padding:var(--awds-legacy-menu-item-container-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-legacy-menu-item:not([disabled]):not(:active):hover{background:var(--awds-legacy-menu-item-hover-container-background, var(--ads-color-body-200))}.q-legacy-menu-item:not(:hover).selected,.q-legacy-menu-item:active{background:var(--awds-legacy-menu-item-pressed-container-background, var(--ads-color-body-300))}.q-legacy-menu-item:disabled{cursor:default;pointer-events:none;color:var(--awds-legacy-menu-item-disabled-container-color, var(--ads-color-body-400));opacity:var(--awds-legacy-menu-item-disabled-container-opacity, 1)}.q-legacy-menu-item:disabled .q-icon{fill:currentColor}.q-legacy-menu-item:disabled .q-legacy-menu-item-submenu-indicator.q-icon{fill:var(--awds-legacy-menu-item-disabled-submenu-indicator-color, var(--ads-color-body-400))}.q-legacy-menu-item .q-legacy-menu-item-submenu-indicator.q-icon{margin:var(--awds-legacy-menu-item-submenu-indicator-margin, 0 0 0 auto);min-width:var(--awds-legacy-menu-item-submenu-indicator-min-width, var(--ads-size-s));fill:var(--awds-legacy-menu-item-submenu-indicator-color, var(--ads-color-body-contrast-100))}.q-legacy-menu-item .q-legacy-menu-item-content{font-family:var(--awds-legacy-menu-item-font-family, var(--ads-font-family-body));font-size:var(--awds-legacy-menu-item-font-size, var(--ads-font-size-s));font-style:var(--awds-legacy-menu-item-font-style, inherit);font-weight:var(--awds-legacy-menu-item-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-legacy-menu-item-letter-spacing, 0);line-height:var(--awds-legacy-menu-item-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-legacy-menu-item-text-transform, none);display:flex;flex:auto;align-items:center;gap:var(--awds-legacy-menu-item-content-gap, var(--ads-size-micro));text-align:var(--awds-legacy-menu-item-content-text-align, left);overflow:var(--awds-legacy-menu-item-content-overflow, hidden);max-height:var(--awds-legacy-menu-item-content-max-height, 100%)}.q-legacy-menu-item .q-legacy-menu-item-content .q-icon{fill:currentColor}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLegacyMenuItemComponent, decorators: [{
            type: Component,
            args: [{ selector: '[q-menu-item]', imports: [NgIf, QIconComponent], host: {
                        class: 'q-legacy-menu-item q-focus-indicator-inset',
                        '[attr.role]': "'menuitem'",
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[class.highlighted]': '_highlighted',
                        '[class.selected]': '_selected',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"q-legacy-menu-item-content\">\n  <ng-content />\n</div>\n\n<q-icon\n  *ngIf=\"triggersSubmenu\"\n  name=\"chevronRight\"\n  class=\"q-legacy-menu-item-submenu-indicator\"\n  [size]=\"'20'\"\n  [dataQt]=\"'q-chevron-right-icon'\" />\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-legacy-menu-item{display:flex;align-items:center;font-family:inherit;color:var(--awds-legacy-menu-item-container-color, var(--ads-color-body-contrast-100));gap:var(--awds-legacy-menu-item-container-gap, var(--ads-size-micro));min-height:var(--awds-legacy-menu-item-container-min-height, var(--ads-size-xxl));padding:var(--awds-legacy-menu-item-container-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-legacy-menu-item:not([disabled]):not(:active):hover{background:var(--awds-legacy-menu-item-hover-container-background, var(--ads-color-body-200))}.q-legacy-menu-item:not(:hover).selected,.q-legacy-menu-item:active{background:var(--awds-legacy-menu-item-pressed-container-background, var(--ads-color-body-300))}.q-legacy-menu-item:disabled{cursor:default;pointer-events:none;color:var(--awds-legacy-menu-item-disabled-container-color, var(--ads-color-body-400));opacity:var(--awds-legacy-menu-item-disabled-container-opacity, 1)}.q-legacy-menu-item:disabled .q-icon{fill:currentColor}.q-legacy-menu-item:disabled .q-legacy-menu-item-submenu-indicator.q-icon{fill:var(--awds-legacy-menu-item-disabled-submenu-indicator-color, var(--ads-color-body-400))}.q-legacy-menu-item .q-legacy-menu-item-submenu-indicator.q-icon{margin:var(--awds-legacy-menu-item-submenu-indicator-margin, 0 0 0 auto);min-width:var(--awds-legacy-menu-item-submenu-indicator-min-width, var(--ads-size-s));fill:var(--awds-legacy-menu-item-submenu-indicator-color, var(--ads-color-body-contrast-100))}.q-legacy-menu-item .q-legacy-menu-item-content{font-family:var(--awds-legacy-menu-item-font-family, var(--ads-font-family-body));font-size:var(--awds-legacy-menu-item-font-size, var(--ads-font-size-s));font-style:var(--awds-legacy-menu-item-font-style, inherit);font-weight:var(--awds-legacy-menu-item-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-legacy-menu-item-letter-spacing, 0);line-height:var(--awds-legacy-menu-item-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-legacy-menu-item-text-transform, none);display:flex;flex:auto;align-items:center;gap:var(--awds-legacy-menu-item-content-gap, var(--ads-size-micro));text-align:var(--awds-legacy-menu-item-content-text-align, left);overflow:var(--awds-legacy-menu-item-content-overflow, hidden);max-height:var(--awds-legacy-menu-item-content-max-height, 100%)}.q-legacy-menu-item .q-legacy-menu-item-content .q-icon{fill:currentColor}\n"] }]
        }], ctorParameters: () => [], propDecorators: { disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _parentMenu: [{
                type: Input,
                args: ['parentMenu']
            }], _onItemClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _handleMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], _handleMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], _handleMouseDown: [{
                type: HostListener,
                args: ['mousedown']
            }], _handleMouseUp: [{
                type: HostListener,
                args: ['mouseup']
            }] } });

/**
 * @deprecated Use QMenuTriggerDirective instead, To be removed.
 * @breaking-change First major after Fev 26, 2026
 */
class QLegacyMenuTriggerDirective {
    get menu() {
        return this._menu;
    }
    set menu(menu) {
        if (menu === this._menu) {
            return;
        }
        if (this._overlayOrigin) {
            menu.openedBy = this._overlayOrigin;
        }
        this._menu = menu;
        this.menu.closed.pipe(takeUntil(this._destroy$)).subscribe((reason) => {
            this._closeMenu(reason);
            if ((reason === 'click' || reason === 'tab') && this.parentMenu) {
                this.parentMenu.closed.emit(reason);
            }
        });
    }
    _handleClick(event) {
        if (this.isTriggerForSubmenu) {
            event.stopPropagation();
        }
        else {
            this._toggle();
        }
    }
    _handleMouseLeave({ relatedTarget }) {
        if (this.menuItemInstance
            ?.getHostElement()
            ?.parentElement?.parentElement?.isEqualNode(relatedTarget)) {
            this._highlightMenuItem(false);
            this.menu.closed.emit();
        }
        else {
            this._highlightMenuItem(this.menu.isOpened);
        }
        this.parentMenu?.directDescendantItems.forEach((item) => {
            if (item?.getHostElement()?.parentElement?.contains(relatedTarget)) {
                this.menu.closed.emit();
            }
        });
    }
    _handleKeydown(event) {
        const code = event.code;
        if (this.isTriggerForSubmenu && [RIGHT_ARROW, ENTER].includes(code)) {
            this._openMenu('keyboard');
            event.stopPropagation();
            event.preventDefault();
        }
    }
    _menu;
    _overlayOrigin = null;
    _destroy$ = inject(QDestroyService);
    _elementRef = inject(ElementRef);
    menuItemInstance = inject(QLegacyMenuItemComponent, {
        optional: true,
        self: true,
    });
    parentMenu = inject(Q_MENU_PANEL, { optional: true });
    constructor() {
        const menuItemInstance = this.menuItemInstance;
        const parentMenu = this.parentMenu;
        this._overlayOrigin = new CdkOverlayOrigin(this._elementRef);
        if (parentMenu) {
            this.parentMenu.closed
                .pipe(takeUntil(this._destroy$))
                .subscribe((reason) => {
                if (this.menu.isOpened) {
                    this._closeMenu(reason);
                }
            });
        }
        if (menuItemInstance) {
            menuItemInstance.triggersSubmenu = this.isTriggerForSubmenu;
        }
    }
    ngAfterContentInit() {
        this._handleHover();
    }
    get isTriggerForSubmenu() {
        return !!this.parentMenu;
    }
    _highlightMenuItem(selected) {
        this.menuItemInstance?.setHighlighted(selected);
        this.menuItemInstance?.setSelected(selected);
    }
    _toggle() {
        if (this.menu.isOpened) {
            this._closeMenu(undefined);
        }
        else {
            this._openMenu();
        }
    }
    _openMenu(openedBy = 'program') {
        if (this.menu.isOpened)
            return;
        this.menu.isSubmenu = this.isTriggerForSubmenu;
        this._menuClosingActions()
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this._closeMenu(undefined));
        this.menu.open();
        this.menu.focusFirstItem(openedBy);
    }
    _closeMenu(reason) {
        if (this.menu.isOpened) {
            this.menu?.close(reason);
            this._highlightMenuItem(false);
            if (reason === 'keydown') {
                this._elementRef.nativeElement.focus();
            }
        }
    }
    _menuClosingActions() {
        const parentClose = this.parentMenu ? this.parentMenu.closed : of();
        const hover = this.parentMenu
            ? this.parentMenu.itemHovered().pipe(filter((active) => active !== this.menuItemInstance), filter(() => this.menu.isOpened))
            : of();
        return merge(parentClose, hover);
    }
    _handleHover() {
        if (!this.isTriggerForSubmenu || !this.parentMenu) {
            return;
        }
        this.parentMenu
            .itemHovered()
            // Since we might have multiple competing triggers for the same menu (e.g. a sub-menu
            // with different data and triggers), we have to delay it by a tick to ensure that
            // it won't be closed immediately after it is opened.
            .pipe(filter((active) => active === this.menuItemInstance && !active.disabled), delay(0, asapScheduler), takeUntil(this._destroy$))
            .subscribe(() => {
            this._openMenu('mouse');
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLegacyMenuTriggerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QLegacyMenuTriggerDirective, isStandalone: true, selector: "[qMenuTriggerFor], [q-menu-trigger-for]", inputs: { menu: ["qMenuTriggerFor", "menu"] }, host: { listeners: { "click": "_handleClick($event)", "mouseleave": "_handleMouseLeave($event)", "keydown": "_handleKeydown($event)" } }, providers: [QDestroyService], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLegacyMenuTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qMenuTriggerFor], [q-menu-trigger-for]',
                    providers: [QDestroyService],
                }]
        }], ctorParameters: () => [], propDecorators: { menu: [{
                type: Input,
                args: ['qMenuTriggerFor']
            }], _handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _handleMouseLeave: [{
                type: HostListener,
                args: ['mouseleave', ['$event']]
            }], _handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

/**
 * @deprecated Use QMenuComponent instead, To be removed.
 * @breaking-change First major after Fev 26, 2026
 */
class QLegacyMenuComponent {
    opened = new EventEmitter();
    closed = new EventEmitter();
    xPosition = 'start';
    yPosition = 'below';
    priorityPositions = 'vertical';
    offsetY = 4;
    offsetX = 4;
    dataQt = 'q-menu';
    get overlayPanelClass() {
        return this._overlayPanelClass;
    }
    set overlayPanelClass(value) {
        const overlayClasses = coerceArray(value || []).filter((clName) => !!clName);
        this._overlayPanelClass = ['q-overlay-panel', 'q-legacy-menu-overlay-panel', ...overlayClasses];
    }
    _allMenuItems;
    _overlay;
    _hostClass = 'q-legacy-menu';
    openedBy;
    directDescendantItems = new QueryList();
    _isSubmenu = false;
    _overlayPanelClass = [
        'q-overlay-panel',
        'q-legacy-menu-overlay-panel',
    ];
    _keyManager = null;
    _destroy$ = inject(QDestroyService);
    ngAfterContentInit() {
        this._updateDirectDescendants();
        this._keyManager = new FocusKeyManager(this.directDescendantItems)
            .withWrap()
            .withTypeAhead()
            .withHomeAndEnd();
        this.directDescendantItems.changes
            .pipe(startWith(this.directDescendantItems), switchMap((items) => merge(...items.map((item) => item.focused))), takeUntil(this._destroy$))
            .subscribe((focusedItem) => this._keyManager?.updateActiveItem(focusedItem));
    }
    open() {
        this._overlay.opened.pipe(takeUntil(this._destroy$)).subscribe(() => this.opened.emit());
        this._overlay.closed
            .pipe(takeUntil(this._destroy$))
            .subscribe((event) => {
            if (event instanceof MouseEvent) {
                this.closed.emit('click');
            }
            else if (event instanceof KeyboardEvent) {
                this.closed.emit('keydown');
            }
        });
        if (this.isSubmenu) {
            this._overlay.xPosition = 'right';
            this._overlay.yPosition = 'above';
            this._overlay.priorityPositions = 'horizontal';
        }
        this._overlay.open();
    }
    close(reason) {
        this._overlay.close();
        this.closed.emit(reason);
    }
    _handleKeydown(event) {
        const keyCode = event.code;
        switch (keyCode) {
            case ESCAPE:
                if (!hasModifierKey(event)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.closed.emit('keydown');
                }
                break;
            case TAB:
                event.preventDefault();
                this.closed.emit('tab');
                break;
            case LEFT_ARROW:
                if (this.isSubmenu) {
                    this.closed.emit('keydown');
                }
                break;
            default:
                this._keyManager?.onKeydown(event);
        }
    }
    itemHovered() {
        const itemChanges = this.directDescendantItems.changes;
        return itemChanges.pipe(startWith(this.directDescendantItems), switchMap((items) => merge(...items.map((item) => item.hovered))));
    }
    focusFirstItem(openedBy) {
        if (openedBy === 'mouse')
            return;
        this._keyManager?.setFocusOrigin(openedBy).setFirstItemActive();
        if (!this._keyManager?.activeItem && this.directDescendantItems.length) {
            let element = this.directDescendantItems.first.getHostElement().parentElement;
            while (element) {
                if (element.getAttribute('role') === 'menu') {
                    element.focus();
                    break;
                }
                element = element.parentElement;
            }
        }
    }
    get isSubmenu() {
        return this._isSubmenu;
    }
    set isSubmenu(value) {
        this._isSubmenu = value;
        this._overlay.hasBackdrop = !value;
    }
    get isOpened() {
        return this._overlay?.isOpened;
    }
    set positions(positions) {
        this._overlay.positions = positions;
    }
    /**
     * Sets up a stream that will keep track of any newly-added menu items and will update the list
     * of direct descendants. We collect the descendants this way, because `allMenuItems` can include
     * items that are part of child menus, and using a custom way of registering items is unreliable
     * when it comes to maintaining the item order.
     */
    _updateDirectDescendants() {
        this._allMenuItems.changes
            .pipe(startWith(this._allMenuItems), takeUntil(this._destroy$))
            .subscribe((items) => {
            this.directDescendantItems.reset(items.filter((item) => item.parentMenu === this));
            this.directDescendantItems.notifyOnChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLegacyMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QLegacyMenuComponent, isStandalone: true, selector: "q-menu", inputs: { xPosition: "xPosition", yPosition: "yPosition", priorityPositions: "priorityPositions", offsetY: "offsetY", offsetX: "offsetX", dataQt: "dataQt", overlayPanelClass: "overlayPanelClass" }, outputs: { opened: "opened", closed: "closed" }, host: { properties: { "class": "this._hostClass" } }, providers: [{ provide: Q_MENU_PANEL, useExisting: QLegacyMenuComponent }, QDestroyService], queries: [{ propertyName: "_allMenuItems", predicate: i0.forwardRef(() => QLegacyMenuItemComponent), descendants: true }], viewQueries: [{ propertyName: "_overlay", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: "<q-overlay\n  #overlay\n  [xPosition]=\"xPosition\"\n  [yPosition]=\"yPosition\"\n  [priorityPositions]=\"priorityPositions\"\n  [(overlayOrigin)]=\"openedBy\"\n  [panelClass]=\"overlayPanelClass\"\n  [backdropClass]=\"'q-legacy-menu-backdrop'\">\n  <div\n    class=\"q-legacy-menu-container\"\n    tabindex=\"-1\"\n    role=\"menu\"\n    [attr.data-qt]=\"dataQt\"\n    (keydown)=\"_handleKeydown($event)\">\n    <div class=\"q-legacy-menu-content\">\n      <ng-content />\n    </div>\n  </div>\n</q-overlay>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-legacy-menu-backdrop.cdk-overlay-backdrop{background:var(--awds-legacy-menu-backdrop-background, transparent);-webkit-backdrop-filter:var(--awds-legacy-menu-backdrop-panel-backdrop-filter, none);backdrop-filter:var(--awds-legacy-menu-backdrop-panel-backdrop-filter, none)}.q-legacy-menu-overlay-panel.cdk-overlay-pane.q-overlay-panel{border:var(--awds-legacy-menu-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400));box-shadow:var(--awds-legacy-menu-container-box-shadow, 0 4px 8px rgba(0, 0, 0, .08));border-radius:var(--awds-legacy-menu-container-border-radius, var(--ads-border-radius-m));background:var(--awds-legacy-menu-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-legacy-menu-container-backdrop-filter, none);backdrop-filter:var(--awds-legacy-menu-container-backdrop-filter, none);overflow:auto}.q-legacy-menu-container{font-family:var(--awds-legacy-menu-container-font-family, var(--ads-font-family-body));font-size:var(--awds-legacy-menu-container-font-size, var(--ads-font-size-s));font-style:var(--awds-legacy-menu-container-font-style, inherit);font-weight:var(--awds-legacy-menu-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-legacy-menu-container-letter-spacing, 0);line-height:var(--awds-legacy-menu-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-legacy-menu-container-text-transform, none);max-height:var(--awds-legacy-menu-container-max-height, calc(100vh - 50px) );min-height:var(--awds-legacy-menu-container-min-height, 46px);min-width:var(--awds-legacy-menu-container-min-width, 146px);max-width:var(--awds-legacy-menu-container-max-width, 312px);padding:var(--awds-legacy-menu-container-padding, 0);box-sizing:border-box;outline:0}.q-legacy-menu-container .q-legacy-menu-content{display:flex;flex-direction:column}\n"], dependencies: [{ kind: "component", type: QOverlayComponent, selector: "q-overlay", inputs: ["top", "bottom", "left", "right", "offsetY", "offsetX", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "yPosition", "xPosition", "positions", "overlayOrigin", "panelClass", "backdropClass", "scrollStrategy", "closeAnimationDone", "priorityPositions", "closeOnBackdropClick", "flexibleDimensions", "disableClose", "hasBackdrop", "closeOnEsc"], outputs: ["opened", "closed", "overlayOriginChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLegacyMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-menu', imports: [QOverlayComponent], providers: [{ provide: Q_MENU_PANEL, useExisting: QLegacyMenuComponent }, QDestroyService], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<q-overlay\n  #overlay\n  [xPosition]=\"xPosition\"\n  [yPosition]=\"yPosition\"\n  [priorityPositions]=\"priorityPositions\"\n  [(overlayOrigin)]=\"openedBy\"\n  [panelClass]=\"overlayPanelClass\"\n  [backdropClass]=\"'q-legacy-menu-backdrop'\">\n  <div\n    class=\"q-legacy-menu-container\"\n    tabindex=\"-1\"\n    role=\"menu\"\n    [attr.data-qt]=\"dataQt\"\n    (keydown)=\"_handleKeydown($event)\">\n    <div class=\"q-legacy-menu-content\">\n      <ng-content />\n    </div>\n  </div>\n</q-overlay>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-legacy-menu-backdrop.cdk-overlay-backdrop{background:var(--awds-legacy-menu-backdrop-background, transparent);-webkit-backdrop-filter:var(--awds-legacy-menu-backdrop-panel-backdrop-filter, none);backdrop-filter:var(--awds-legacy-menu-backdrop-panel-backdrop-filter, none)}.q-legacy-menu-overlay-panel.cdk-overlay-pane.q-overlay-panel{border:var(--awds-legacy-menu-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400));box-shadow:var(--awds-legacy-menu-container-box-shadow, 0 4px 8px rgba(0, 0, 0, .08));border-radius:var(--awds-legacy-menu-container-border-radius, var(--ads-border-radius-m));background:var(--awds-legacy-menu-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-legacy-menu-container-backdrop-filter, none);backdrop-filter:var(--awds-legacy-menu-container-backdrop-filter, none);overflow:auto}.q-legacy-menu-container{font-family:var(--awds-legacy-menu-container-font-family, var(--ads-font-family-body));font-size:var(--awds-legacy-menu-container-font-size, var(--ads-font-size-s));font-style:var(--awds-legacy-menu-container-font-style, inherit);font-weight:var(--awds-legacy-menu-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-legacy-menu-container-letter-spacing, 0);line-height:var(--awds-legacy-menu-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-legacy-menu-container-text-transform, none);max-height:var(--awds-legacy-menu-container-max-height, calc(100vh - 50px) );min-height:var(--awds-legacy-menu-container-min-height, 46px);min-width:var(--awds-legacy-menu-container-min-width, 146px);max-width:var(--awds-legacy-menu-container-max-width, 312px);padding:var(--awds-legacy-menu-container-padding, 0);box-sizing:border-box;outline:0}.q-legacy-menu-container .q-legacy-menu-content{display:flex;flex-direction:column}\n"] }]
        }], propDecorators: { opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], xPosition: [{
                type: Input
            }], yPosition: [{
                type: Input
            }], priorityPositions: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], dataQt: [{
                type: Input
            }], overlayPanelClass: [{
                type: Input
            }], _allMenuItems: [{
                type: ContentChildren,
                args: [forwardRef(() => QLegacyMenuItemComponent), { descendants: true }]
            }], _overlay: [{
                type: ViewChild,
                args: ['overlay']
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_LEGACY_MENU_COMPONENTS = [
    QLegacyMenuComponent,
    QLegacyMenuItemComponent,
    QLegacyMenuTriggerDirective,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QLegacyMenuComponent, QLegacyMenuItemComponent, QLegacyMenuTriggerDirective, Q_LEGACY_MENU_COMPONENTS, Q_MENU_PANEL };
//# sourceMappingURL=questrade-allspark-angular-components-legacy-menu.mjs.map
