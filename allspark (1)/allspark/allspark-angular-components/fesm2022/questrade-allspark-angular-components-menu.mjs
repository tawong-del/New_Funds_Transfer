import * as i0 from '@angular/core';
import { output, input, inject, DOCUMENT, ElementRef, Directive, contentChildren, forwardRef, QueryList, Injector, effect, afterNextRender, ViewEncapsulation, ChangeDetectionStrategy, Component, ChangeDetectorRef, booleanAttribute, Input, Renderer2 } from '@angular/core';
import { FocusKeyManager, FocusMonitor, isFakeMousedownFromScreenReader, isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { chevronRight } from '@questrade/allspark-icons/icons';
import { merge, Subject, Subscription } from 'rxjs';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { randomString, UP_ARROW, DOWN_ARROW, LEFT_ARROW, ESCAPE, ENTER, SPACE, RIGHT_ARROW } from '@questrade/allspark-angular-components/core/utils';
import * as i1 from '@questrade/allspark-angular-components/popover';
import { QPopoverDirective } from '@questrade/allspark-angular-components/popover';
import { startWith, switchMap } from 'rxjs/operators';

class QContextMenuTriggerDirective {
    menuOpened = output();
    menuClosed = output();
    menu = input(null, ...(ngDevMode ? [{ debugName: "menu", alias: 'qContextMenuTriggerFor' }] : [{ alias: 'qContextMenuTriggerFor' }]));
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", alias: 'qContextMenuTriggerDisabled' }] : [{ alias: 'qContextMenuTriggerDisabled' }]));
    dataQt = input('q-context-menu-trigger', ...(ngDevMode ? [{ debugName: "dataQt", alias: 'qContextMenuTriggerDataQt' }] : [{ alias: 'qContextMenuTriggerDataQt' }]));
    _document = inject(DOCUMENT);
    _element = inject(ElementRef);
    _anchorEl = null;
    _menuOpen = false;
    _openedBy = null;
    _triggerPressedControl = false;
    _cleanupManualDismiss = null;
    ngOnDestroy() {
        this._cleanupAnchor();
    }
    _handleContextMenuEvent(event) {
        if (this.disabled())
            return;
        event.preventDefault();
        event.stopPropagation();
        const x = event.clientX;
        const y = event.clientY;
        const ctrl = !!event.ctrlKey;
        if (this._menuOpen) {
            const menu = this.menu();
            if (menu) {
                const host = menu._getHostElement();
                if (host) {
                    const closedSub = menu._popoverDirective.closed.subscribe(() => {
                        closedSub.unsubscribe();
                        this._positionAnchor(x, y);
                        this._openContextMenuAt(x, y, ctrl);
                    });
                    host.hidePopover();
                    this._menuOpen = false;
                    this._cleanupManualDismiss?.();
                    this._cleanupManualDismiss = null;
                    this.menuClosed.emit();
                }
            }
        }
        else {
            this._openContextMenuAt(x, y, ctrl);
        }
    }
    _ariaControls() {
        const menu = this.menu();
        return this._menuOpen && menu ? menu._menuId : null;
    }
    _openContextMenuAt(x, y, ctrlKey) {
        const menu = this.menu();
        if (!menu)
            return;
        this._openedBy = 'mouse';
        this._triggerPressedControl = ctrlKey;
        this._ensureAnchor();
        this._positionAnchor(x, y);
        menu._popoverDirective.setPopoverTriggerElement(this._anchorEl);
        const host = menu._getHostElement();
        if (!host)
            return;
        host.setAttribute('popover', 'manual');
        host.showPopover();
        this._suppressNextOutsidePointerBurst(menu);
        this._installManualDismissHandlers(menu);
        this._menuOpen = true;
        this.menuOpened.emit();
        host.focus();
        const sub = menu.closed.subscribe(() => {
            if (this._menuOpen) {
                this._menuOpen = false;
                const hostEl = menu._getHostElement();
                const handleAfterPopoverClosed = () => {
                    hostEl?.setAttribute('popover', 'auto');
                    this._cleanupManualDismiss?.();
                    this._cleanupManualDismiss = null;
                    this._cleanupAnchor();
                    this._focus();
                    this.menuClosed.emit();
                };
                if (hostEl && hostEl.matches(':popover-open')) {
                    const popoverClosedSub = menu._popoverDirective.closed.subscribe(() => {
                        popoverClosedSub.unsubscribe();
                        handleAfterPopoverClosed();
                    });
                    hostEl.hidePopover();
                }
                else {
                    handleAfterPopoverClosed();
                }
            }
            sub.unsubscribe();
        });
    }
    _ensureAnchor() {
        if (!this._anchorEl) {
            const el = this._document.createElement('div');
            el.style.position = 'fixed';
            el.style.width = '0';
            el.style.height = '0';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '0';
            this._document.body.appendChild(el);
            this._anchorEl = el;
        }
    }
    _positionAnchor(x, y) {
        if (this._anchorEl) {
            this._anchorEl.style.left = `${x}px`;
            this._anchorEl.style.top = `${y}px`;
        }
    }
    _cleanupAnchor() {
        if (this._anchorEl && this._anchorEl.isConnected) {
            this._anchorEl.remove();
        }
        this._anchorEl = null;
    }
    _focus() {
        this._element.nativeElement.focus({ preventScroll: true });
    }
    _suppressNextOutsidePointerBurst(menu) {
        const opts = { capture: true, once: true, passive: false };
        let firstAux = true;
        const isWithinMenuOrTrigger = (target) => {
            if (!target)
                return false;
            const triggerEl = this._element.nativeElement;
            if (target === triggerEl || triggerEl.contains(target))
                return true;
            const panelEl = menu._getHostElement();
            return !!panelEl && (target === panelEl || panelEl.contains(target));
        };
        const swallowIfOutside = (ev) => {
            if (!this._menuOpen)
                return;
            const e = ev;
            let target = ev.target;
            if (ev.type === 'auxclick' && (!target || target === this._document.body)) {
                target = this._document.elementFromPoint(e.clientX, e.clientY);
            }
            const inside = isWithinMenuOrTrigger(target);
            if (ev.type === 'mouseup' || ev.type === 'pointerup') {
                e.stopPropagation();
                e.stopImmediatePropagation?.();
                return;
            }
            if (inside) {
                return;
            }
            if (ev.type === 'auxclick') {
                if (firstAux) {
                    firstAux = false;
                }
                else {
                    return;
                }
            }
            e.stopPropagation();
            e.stopImmediatePropagation?.();
        };
        this._document.addEventListener('mouseup', swallowIfOutside, opts);
        this._document.addEventListener('pointerup', swallowIfOutside, opts);
    }
    _installManualDismissHandlers(menu) {
        this._cleanupManualDismiss?.();
        const doc = this._document;
        const panelEl = menu._getHostElement();
        if (!panelEl) {
            this._cleanupManualDismiss = null;
            return;
        }
        const onPointerDown = (ev) => {
            if (!this._menuOpen)
                return;
            const target = ev.target;
            if (target && (target.closest('.q-menu') || panelEl.contains(target))) {
                return;
            }
            panelEl.hidePopover();
        };
        doc.addEventListener('pointerdown', onPointerDown, false);
        this._cleanupManualDismiss = () => {
            doc.removeEventListener('pointerdown', onPointerDown, false);
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QContextMenuTriggerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.16", type: QContextMenuTriggerDirective, isStandalone: true, selector: "[qContextMenuTriggerFor]", inputs: { menu: { classPropertyName: "menu", publicName: "qContextMenuTriggerFor", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "qContextMenuTriggerDisabled", isSignal: true, isRequired: false, transformFunction: null }, dataQt: { classPropertyName: "dataQt", publicName: "qContextMenuTriggerDataQt", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { menuOpened: "menuOpened", menuClosed: "menuClosed" }, host: { listeners: { "contextmenu": "_handleContextMenuEvent($event)" }, properties: { "attr.data-qt": "dataQt()", "attr.aria-controls": "_ariaControls()" }, classAttribute: "q-context-menu-trigger" }, exportAs: ["qContextMenuTrigger"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QContextMenuTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qContextMenuTriggerFor]',
                    exportAs: 'qContextMenuTrigger',
                    host: {
                        'class': 'q-context-menu-trigger',
                        '[attr.data-qt]': 'dataQt()',
                        '[attr.aria-controls]': '_ariaControls()',
                        '(contextmenu)': '_handleContextMenuEvent($event)',
                    },
                }]
        }], propDecorators: { menuOpened: [{ type: i0.Output, args: ["menuOpened"] }], menuClosed: [{ type: i0.Output, args: ["menuClosed"] }], menu: [{ type: i0.Input, args: [{ isSignal: true, alias: "qContextMenuTriggerFor", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "qContextMenuTriggerDisabled", required: false }] }], dataQt: [{ type: i0.Input, args: [{ isSignal: true, alias: "qContextMenuTriggerDataQt", required: false }] }] } });

class QMenuComponent {
    closed = output();
    ariaLabel = input('', ...(ngDevMode ? [{ debugName: "ariaLabel" }] : []));
    ariaLabelledby = input('', ...(ngDevMode ? [{ debugName: "ariaLabelledby" }] : []));
    ariaDescribedby = input('', ...(ngDevMode ? [{ debugName: "ariaDescribedby" }] : []));
    dataQt = input('q-menu', ...(ngDevMode ? [{ debugName: "dataQt" }] : []));
    _allItems = contentChildren(forwardRef(() => QMenuItemComponent), ...(ngDevMode ? [{ debugName: "_allItems", descendants: true }] : [{ descendants: true }]));
    _parentMenu = null;
    _menuId = `q-menu-${randomString()}`;
    _popoverDirective = inject(QPopoverDirective, { host: true });
    _directDescendantItems = new QueryList();
    _hasDirectEmission = false;
    _keyManager = null;
    _firstItemFocusRef = null;
    _elementRef = inject(ElementRef);
    _injector = inject(Injector);
    constructor() {
        effect(() => {
            const items = this._allItems();
            this._directDescendantItems.reset(items.filter((item) => item._parentMenu === this));
            this._directDescendantItems.notifyOnChanges();
        });
    }
    ngAfterViewInit() {
        this._setupPopoverClosedSubscription();
    }
    ngAfterContentInit() {
        this._setupKeyManager();
        this._setupTabOutSubscription();
        this._setupFocusedItemTracking();
        this._setupItemsChangesHandling();
    }
    ngOnDestroy() {
        this._keyManager?.destroy();
        this._directDescendantItems.destroy();
        this._firstItemFocusRef?.destroy();
    }
    focusFirstItem(origin = 'program') {
        this._firstItemFocusRef?.destroy();
        this._firstItemFocusRef = afterNextRender(() => {
            const menuPanel = this._resolvePanel();
            if (!menuPanel || !menuPanel.contains(document.activeElement)) {
                const manager = this._keyManager;
                manager?.setFocusOrigin(origin).setFirstItemActive();
                if (!manager?.activeItem && menuPanel) {
                    menuPanel.focus();
                }
            }
        }, { injector: this._injector });
    }
    resetActiveItem() {
        this._keyManager?.setActiveItem(-1);
    }
    _hovered() {
        const itemChanges = this._directDescendantItems.changes;
        return itemChanges.pipe(startWith(this._directDescendantItems), switchMap((items) => merge(...items.map((item) => item._hovered))));
    }
    _handleKeydown(event) {
        const code = event.code;
        const manager = this._keyManager;
        switch (code) {
            case ESCAPE:
                // Prevent native popover Escape behavior even with modifiers.
                event.preventDefault();
                if (!hasModifierKey(event)) {
                    this._hasDirectEmission = true;
                    this.closed.emit('keydown');
                }
                break;
            case LEFT_ARROW:
                if (this._parentMenu) {
                    this._hasDirectEmission = true;
                    this.closed.emit('keydown');
                }
                break;
            default:
                if (code === UP_ARROW || code === DOWN_ARROW) {
                    manager?.setFocusOrigin('keyboard');
                }
                manager?.onKeydown(event);
                return;
        }
    }
    _handleClick(event) {
        const target = event.target;
        const menuItem = target?.closest('[q-menu-item]');
        if (menuItem && !event.defaultPrevented) {
            this._setDirectEmissionFlag();
            this.closed.emit('click');
        }
    }
    _getHostElement() {
        return this._elementRef.nativeElement;
    }
    _setDirectEmissionFlag() {
        this._hasDirectEmission = true;
    }
    _setupPopoverClosedSubscription() {
        this._popoverDirective.closed.subscribe(() => {
            if (!this._hasDirectEmission) {
                this.closed.emit('none');
            }
            this._hasDirectEmission = false;
        });
    }
    _setupKeyManager() {
        this._keyManager = new FocusKeyManager(this._directDescendantItems)
            .withWrap()
            .withTypeAhead()
            .withHomeAndEnd();
    }
    _setupTabOutSubscription() {
        this._keyManager?.tabOut.subscribe(() => {
            this._hasDirectEmission = true;
            this.closed.emit('tab');
        });
    }
    _setupFocusedItemTracking() {
        this._directDescendantItems.changes
            .pipe(startWith(this._directDescendantItems), switchMap((items) => merge(...items.map((item) => item._focused))))
            .subscribe((focusedItem) => this._keyManager?.updateActiveItem(focusedItem));
    }
    _setupItemsChangesHandling() {
        this._directDescendantItems.changes.subscribe((itemsList) => {
            const manager = this._keyManager;
            if (manager?.activeItem?._hasFocus()) {
                const items = itemsList.toArray();
                const index = Math.max(0, Math.min(items.length - 1, manager.activeItemIndex || 0));
                if (items[index] && !items[index].disabled) {
                    manager.setActiveItem(index);
                }
                else {
                    manager.setNextItemActive();
                }
            }
        });
    }
    _resolvePanel() {
        let menuPanel = null;
        if (this._directDescendantItems.length) {
            menuPanel = this._elementRef.nativeElement;
        }
        return menuPanel;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.16", type: QMenuComponent, isStandalone: true, selector: "q-menu", inputs: { ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "ariaLabelledby", isSignal: true, isRequired: false, transformFunction: null }, ariaDescribedby: { classPropertyName: "ariaDescribedby", publicName: "ariaDescribedby", isSignal: true, isRequired: false, transformFunction: null }, dataQt: { classPropertyName: "dataQt", publicName: "dataQt", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed" }, host: { attributes: { "role": "menu", "tabindex": "-1", "popover": "auto" }, listeners: { "keydown": "_handleKeydown($event)", "click": "_handleClick($event)" }, properties: { "attr.id": "_menuId", "attr.data-qt": "dataQt()", "attr.aria-label": "ariaLabel() || null", "attr.aria-labelledby": "ariaLabelledby() || null", "attr.aria-describedby": "ariaDescribedby() || null" }, classAttribute: "q-menu" }, queries: [{ propertyName: "_allItems", predicate: i0.forwardRef(() => QMenuItemComponent), descendants: true, isSignal: true }], exportAs: ["qMenu"], hostDirectives: [{ directive: i1.QPopoverDirective, inputs: ["qPopoverPlacement", "placement", "qPopoverOffset", "offset"] }], ngImport: i0, template: `<ng-content />`, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-menu{font-family:var(--awds-menu-container-font-family, var(--ads-font-family-body));font-size:var(--awds-menu-container-font-size, var(--ads-font-size-s));font-style:var(--awds-menu-container-font-style, inherit);font-weight:var(--awds-menu-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-menu-container-letter-spacing, 0);line-height:var(--awds-menu-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-menu-container-text-transform, none);border:var(--awds-menu-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400));box-shadow:var(--awds-menu-container-box-shadow, 0 4px 8px rgba(0, 0, 0, .08));border-radius:var(--awds-menu-container-border-radius, var(--ads-border-radius-m));background:var(--awds-menu-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-menu-container-backdrop-filter, none);backdrop-filter:var(--awds-menu-container-backdrop-filter, none);max-height:var(--awds-menu-container-max-height, calc(100vh - 50px) );min-height:var(--awds-menu-container-min-height, 46px);min-width:var(--awds-menu-container-min-width, 146px);max-width:var(--awds-menu-container-max-width, 312px);padding:var(--awds-menu-container-padding, 0);outline:0;overflow:auto;scroll-padding-top:var(--awds-menu-container-scroll-padding-top, var(--ads-size-micro));scroll-padding-bottom:var(--awds-menu-container-scroll-padding-bottom, var(--ads-size-micro))}.q-menu:before,.q-menu:after{content:\"\";display:block;height:var(--awds-menu-container-spacing-height, var(--ads-size-micro));width:var(--awds-menu-container-spacing-width, 100%)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-menu', exportAs: 'qMenu', template: `<ng-content />`, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'q-menu',
                        'role': 'menu',
                        'tabindex': '-1',
                        'popover': 'auto',
                        '[attr.id]': '_menuId',
                        '[attr.data-qt]': 'dataQt()',
                        '[attr.aria-label]': 'ariaLabel() || null',
                        '[attr.aria-labelledby]': 'ariaLabelledby() || null',
                        '[attr.aria-describedby]': 'ariaDescribedby() || null',
                        '(keydown)': '_handleKeydown($event)',
                        '(click)': '_handleClick($event)',
                    }, hostDirectives: [
                        {
                            directive: QPopoverDirective,
                            inputs: ['qPopoverPlacement: placement', 'qPopoverOffset: offset'],
                        },
                    ], styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-menu{font-family:var(--awds-menu-container-font-family, var(--ads-font-family-body));font-size:var(--awds-menu-container-font-size, var(--ads-font-size-s));font-style:var(--awds-menu-container-font-style, inherit);font-weight:var(--awds-menu-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-menu-container-letter-spacing, 0);line-height:var(--awds-menu-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-menu-container-text-transform, none);border:var(--awds-menu-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400));box-shadow:var(--awds-menu-container-box-shadow, 0 4px 8px rgba(0, 0, 0, .08));border-radius:var(--awds-menu-container-border-radius, var(--ads-border-radius-m));background:var(--awds-menu-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-menu-container-backdrop-filter, none);backdrop-filter:var(--awds-menu-container-backdrop-filter, none);max-height:var(--awds-menu-container-max-height, calc(100vh - 50px) );min-height:var(--awds-menu-container-min-height, 46px);min-width:var(--awds-menu-container-min-width, 146px);max-width:var(--awds-menu-container-max-width, 312px);padding:var(--awds-menu-container-padding, 0);outline:0;overflow:auto;scroll-padding-top:var(--awds-menu-container-scroll-padding-top, var(--ads-size-micro));scroll-padding-bottom:var(--awds-menu-container-scroll-padding-bottom, var(--ads-size-micro))}.q-menu:before,.q-menu:after{content:\"\";display:block;height:var(--awds-menu-container-spacing-height, var(--ads-size-micro));width:var(--awds-menu-container-spacing-width, 100%)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { closed: [{ type: i0.Output, args: ["closed"] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], ariaLabelledby: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabelledby", required: false }] }], ariaDescribedby: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaDescribedby", required: false }] }], dataQt: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataQt", required: false }] }], _allItems: [{ type: i0.ContentChildren, args: [forwardRef(() => QMenuItemComponent), { ...{ descendants: true }, isSignal: true }] }] } });

class QMenuItemComponent {
    disabled = false;
    dataQt = input('q-menu-item', ...(ngDevMode ? [{ debugName: "dataQt", alias: 'qMenuItemDataQt' }] : [{ alias: 'qMenuItemDataQt' }]));
    _highlighted = false;
    _triggersSubmenu = false;
    _parentMenu = inject(QMenuComponent, { optional: true });
    _hovered = new Subject();
    _focused = new Subject();
    _elementRef = inject(ElementRef);
    _document = inject(DOCUMENT);
    _focusMonitor = inject(FocusMonitor);
    _cdr = inject(ChangeDetectorRef);
    _iconRegistry = inject(QIconRegistryService);
    ngOnInit() {
        this._iconRegistry.registerIcons([chevronRight]);
    }
    ngAfterViewInit() {
        if (this._focusMonitor) {
            this._focusMonitor.monitor(this._elementRef, false);
        }
    }
    ngOnDestroy() {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef);
        }
        this._hovered.complete();
        this._focused.complete();
    }
    focus(origin, options) {
        if (this._focusMonitor && origin) {
            this._focusMonitor.focusVia(this._getHostElement(), origin, options);
        }
        else {
            this._getHostElement().focus(options);
        }
        this._focused.next(this);
    }
    getLabel() {
        const clone = this._elementRef.nativeElement.cloneNode(true);
        const icons = clone.querySelectorAll('q-icon');
        for (const icon of icons) {
            icon.remove();
        }
        return clone.textContent?.trim() || '';
    }
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    _handleClick(event) {
        if (this.disabled || this._triggersSubmenu) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
    }
    _handleMouseEnter() {
        this._hovered.next(this);
    }
    _setHighlighted(isHighlighted) {
        this._highlighted = isHighlighted;
        this._cdr.markForCheck();
    }
    _setTriggersSubmenu(triggersSubmenu) {
        this._triggersSubmenu = triggersSubmenu;
        this._cdr.markForCheck();
    }
    _hasFocus() {
        return this._document && this._document.activeElement === this._getHostElement();
    }
    _getHostElement() {
        return this._elementRef.nativeElement;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMenuItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QMenuItemComponent, isStandalone: true, selector: "[q-menu-item]", inputs: { disabled: { classPropertyName: "disabled", publicName: "qMenuItemDisabled", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, dataQt: { classPropertyName: "dataQt", publicName: "qMenuItemDataQt", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "_handleClick($event)", "mouseenter": "_handleMouseEnter()" }, properties: { "class.q-menu-item-highlighted": "_highlighted", "attr.role": "'menuitem'", "attr.tabindex": "_getTabIndex()", "attr.data-qt": "dataQt()", "attr.aria-disabled": "disabled", "attr.disabled": "disabled || null" }, classAttribute: "q-menu-item q-focus-indicator-inset" }, ngImport: i0, template: "<div class=\"q-menu-item-content\">\n  <ng-content />\n</div>\n\n@if (_triggersSubmenu) {\n  <q-icon\n    name=\"chevronRight\"\n    class=\"q-menu-item-submenu-indicator\"\n    [size]=\"'20'\"\n    [dataQt]=\"'q-menu-item-submenu-indicator'\" />\n}\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-menu-item{display:flex;align-items:center;color:var(--awds-menu-item-container-color, var(--ads-color-body-contrast-100));gap:var(--awds-menu-item-container-gap, var(--ads-size-micro));min-height:var(--awds-menu-item-container-min-height, var(--ads-size-xxl));padding:var(--awds-menu-item-container-padding, var(--ads-size-xxxs) var(--ads-size-xxs));background:transparent;border:0;width:100%;box-sizing:border-box;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}.q-menu-item:not([aria-disabled=true]):not(:active):hover{background:var(--awds-menu-item-hover-container-background, var(--ads-color-body-200))}.q-menu-item:active{background:var(--awds-menu-item-pressed-container-background, var(--ads-color-body-300))}.q-menu-item[aria-disabled=true]{cursor:default;pointer-events:none;color:var(--awds-menu-item-disabled-container-color, var(--ads-color-body-400));opacity:var(--awds-menu-item-disabled-container-opacity, 1)}.q-menu-item[aria-disabled=true] .q-icon{fill:currentColor}.q-menu-item-content{font-family:var(--awds-menu-item-content-font-family, var(--ads-font-family-body));font-size:var(--awds-menu-item-content-font-size, var(--ads-font-size-s));font-style:var(--awds-menu-item-content-font-style, inherit);font-weight:var(--awds-menu-item-content-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-menu-item-content-letter-spacing, 0);line-height:var(--awds-menu-item-content-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-menu-item-content-text-transform, none);display:flex;flex:auto;align-items:center;gap:var(--awds-menu-item-content-gap, var(--ads-size-micro));text-align:var(--awds-menu-item-content-text-align, left);overflow:var(--awds-menu-item-content-overflow, hidden);max-height:var(--awds-menu-item-content-max-height, 100%)}.q-menu-item .q-menu-item-submenu-indicator.q-icon{margin:var(--awds-menu-item-submenu-indicator-margin, 0 0 0 auto);min-width:var(--awds-menu-item-submenu-indicator-min-width, var(--ads-size-s));fill:var(--awds-menu-item-submenu-indicator-color, var(--ads-color-body-contrast-100))}.q-menu-item[aria-disabled=true] .q-menu-item .q-menu-item-submenu-indicator.q-icon{fill:var(--awds-menu-item-disabled-submenu-indicator-color, var(--ads-color-body-400))}.q-menu-item-highlighted{background:var(--awds-menu-item-pressed-container-background, var(--ads-color-body-300))}\n"], dependencies: [{ kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMenuItemComponent, decorators: [{
            type: Component,
            args: [{ selector: '[q-menu-item]', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [QIconComponent], host: {
                        'class': 'q-menu-item q-focus-indicator-inset',
                        '[class.q-menu-item-highlighted]': '_highlighted',
                        '[attr.role]': "'menuitem'",
                        '[attr.tabindex]': '_getTabIndex()',
                        '[attr.data-qt]': 'dataQt()',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': '_handleClick($event)',
                        '(mouseenter)': '_handleMouseEnter()',
                    }, template: "<div class=\"q-menu-item-content\">\n  <ng-content />\n</div>\n\n@if (_triggersSubmenu) {\n  <q-icon\n    name=\"chevronRight\"\n    class=\"q-menu-item-submenu-indicator\"\n    [size]=\"'20'\"\n    [dataQt]=\"'q-menu-item-submenu-indicator'\" />\n}\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-menu-item{display:flex;align-items:center;color:var(--awds-menu-item-container-color, var(--ads-color-body-contrast-100));gap:var(--awds-menu-item-container-gap, var(--ads-size-micro));min-height:var(--awds-menu-item-container-min-height, var(--ads-size-xxl));padding:var(--awds-menu-item-container-padding, var(--ads-size-xxxs) var(--ads-size-xxs));background:transparent;border:0;width:100%;box-sizing:border-box;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}.q-menu-item:not([aria-disabled=true]):not(:active):hover{background:var(--awds-menu-item-hover-container-background, var(--ads-color-body-200))}.q-menu-item:active{background:var(--awds-menu-item-pressed-container-background, var(--ads-color-body-300))}.q-menu-item[aria-disabled=true]{cursor:default;pointer-events:none;color:var(--awds-menu-item-disabled-container-color, var(--ads-color-body-400));opacity:var(--awds-menu-item-disabled-container-opacity, 1)}.q-menu-item[aria-disabled=true] .q-icon{fill:currentColor}.q-menu-item-content{font-family:var(--awds-menu-item-content-font-family, var(--ads-font-family-body));font-size:var(--awds-menu-item-content-font-size, var(--ads-font-size-s));font-style:var(--awds-menu-item-content-font-style, inherit);font-weight:var(--awds-menu-item-content-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-menu-item-content-letter-spacing, 0);line-height:var(--awds-menu-item-content-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-menu-item-content-text-transform, none);display:flex;flex:auto;align-items:center;gap:var(--awds-menu-item-content-gap, var(--ads-size-micro));text-align:var(--awds-menu-item-content-text-align, left);overflow:var(--awds-menu-item-content-overflow, hidden);max-height:var(--awds-menu-item-content-max-height, 100%)}.q-menu-item .q-menu-item-submenu-indicator.q-icon{margin:var(--awds-menu-item-submenu-indicator-margin, 0 0 0 auto);min-width:var(--awds-menu-item-submenu-indicator-min-width, var(--ads-size-s));fill:var(--awds-menu-item-submenu-indicator-color, var(--ads-color-body-contrast-100))}.q-menu-item[aria-disabled=true] .q-menu-item .q-menu-item-submenu-indicator.q-icon{fill:var(--awds-menu-item-disabled-submenu-indicator-color, var(--ads-color-body-400))}.q-menu-item-highlighted{background:var(--awds-menu-item-pressed-container-background, var(--ads-color-body-300))}\n"] }]
        }], propDecorators: { disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute, alias: 'qMenuItemDisabled' }]
            }], dataQt: [{ type: i0.Input, args: [{ isSignal: true, alias: "qMenuItemDataQt", required: false }] }] } });

/**
 * Tracks the trigger instance associated with each menu panel.
 * Why: the same `q-menu` can be referenced by multiple triggers. We need to
 * know which trigger currently owns the panel in order to close the previous
 * one when a different trigger opens it and to manage focus/hover semantics
 * consistently (single owner at a time).
 */
const PANELS_TO_TRIGGERS = new WeakMap();
/**
 * Delay used for hover-initiated submenu closes.
 * Why: prevents accidental, premature closes while the pointer travels toward
 * overlapping/stacked submenus, aligning behavior with popover hint.
 * Keyboard and click closes remain instant.
 */
const SUBMENU_HIDE_DELAY_MS = 100;
class QMenuTriggerDirective {
    menuOpened = output();
    menuClosed = output();
    menu = input(null, ...(ngDevMode ? [{ debugName: "menu", alias: 'qMenuTriggerFor' }] : [{ alias: 'qMenuTriggerFor' }]));
    dataQt = input('q-menu-trigger', ...(ngDevMode ? [{ debugName: "dataQt", alias: 'qMenuTriggerDataQt' }] : [{ alias: 'qMenuTriggerDataQt' }]));
    triggerMode = input('click', ...(ngDevMode ? [{ debugName: "triggerMode", alias: 'qMenuTriggerMode' }] : [{ alias: 'qMenuTriggerMode' }]));
    _openedBy = null;
    _menuOpen = false;
    _hoverSubscription = Subscription.EMPTY;
    _menuClosedSubscription = null;
    _isMenuConnectionSetup = false;
    _cleanupTouchstart = null;
    _cleanupRootHover = null;
    _cleanupPanelHover = null;
    _cleanupDocumentHover = null;
    _hideTimer = null;
    _hasPointerEntered = false;
    _submenuHideTimer = null;
    _submenuCloseToken = 0;
    _parentMenu = inject(QMenuComponent, { optional: true });
    _renderer = inject(Renderer2);
    _element = inject(ElementRef);
    _menuItemInstance = inject(QMenuItemComponent, { optional: true, self: true });
    _focusMonitor = inject(FocusMonitor);
    _cdr = inject(ChangeDetectorRef);
    _document = inject(DOCUMENT);
    ngOnInit() {
        this._setupTouchEventListener();
        this._setPopoverDefaults();
    }
    ngOnChanges(changes) {
        const { menu, triggerMode } = changes;
        if (menu) {
            this._cleanupMenuConnection();
            this._initializeMenuConnection();
        }
        if (triggerMode) {
            this._setupRootHoverListeners();
            this._handleTriggerModeChange();
        }
    }
    ngAfterContentInit() {
        this._handleHover();
        if (!this._isMenuConnectionSetup) {
            this._initializeMenuConnection();
        }
        this._setupRootHoverListeners();
        this._setupKeyboardFocusListeners();
    }
    ngOnDestroy() {
        this._cleanupMenuConnection();
        const menu = this.menu();
        if (menu && this._ownsMenu(menu)) {
            PANELS_TO_TRIGGERS.delete(menu);
        }
        this._cleanupTouchstart?.();
        this._hoverSubscription.unsubscribe();
        this._cleanupRootHover?.();
        this._cleanupRootHover = null;
        this._cleanupPanelHover?.();
        this._cleanupPanelHover = null;
        this._cleanupDocumentHover?.();
        this._cleanupDocumentHover = null;
        this._clearHideTimer();
        this._clearSubmenuHideTimer();
    }
    triggersSubmenu() {
        return !!(this._menuItemInstance && this._parentMenu && this.menu());
    }
    toggleMenu() {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    }
    openMenu() {
        const menu = this.menu();
        if (this._menuOpen || !menu)
            return;
        const previousTrigger = PANELS_TO_TRIGGERS.get(menu);
        PANELS_TO_TRIGGERS.set(menu, this);
        if (previousTrigger && previousTrigger !== this) {
            previousTrigger.closeMenu();
        }
        const host = menu._getHostElement();
        if (!host)
            return;
        const submenuPlacement = 'right-start';
        const rootPlacement = menu._popoverDirective.placement;
        menu._popoverDirective.placement = this.triggersSubmenu() ? submenuPlacement : rootPlacement;
        menu._parentMenu = this.triggersSubmenu() ? this._parentMenu : null;
        if (this.triggerMode() === 'programmatic' && !this.triggersSubmenu()) {
            host.setAttribute('popover', 'manual');
        }
        host.showPopover({ source: this._element.nativeElement });
        this._hasPointerEntered = false;
        const openedWithMouse = this._openedBy === 'mouse';
        const shouldFocusFirstItem = this._openedBy === 'keyboard' || (!this.triggersSubmenu() && this.triggerMode() !== 'hover');
        if (shouldFocusFirstItem) {
            menu.focusFirstItem(this._openedBy || 'program');
        }
        else if (openedWithMouse && host) {
            host.focus();
        }
        this._setIsMenuOpen(true);
    }
    closeMenu() {
        const menu = this.menu();
        if (!menu)
            return;
        const host = menu._getHostElement();
        if (host) {
            if (this.triggerMode() === 'programmatic' && !this.triggersSubmenu()) {
                host.setAttribute('popover', 'auto');
            }
            host.hidePopover();
        }
    }
    focus(origin, options) {
        if (this._focusMonitor && origin) {
            this._focusMonitor.focusVia(this._element, origin, options);
        }
        else {
            this._element.nativeElement.focus(options);
        }
    }
    _handleMousedown(event) {
        if (!isFakeMousedownFromScreenReader(event)) {
            this._openedBy = event.button === 0 ? 'mouse' : null;
            if (this.triggersSubmenu()) {
                event.preventDefault();
            }
        }
    }
    _handleKeydown(event) {
        const code = event.code;
        if (code === ENTER || code === SPACE) {
            this._openedBy = 'keyboard';
            if (this.triggersSubmenu()) {
                event.preventDefault();
                event.stopPropagation();
                this.openMenu();
            }
            else if (this.triggerMode() === 'hover') {
                event.preventDefault();
                event.stopPropagation();
                this.openMenu();
            }
        }
        if (this.triggersSubmenu() && code === RIGHT_ARROW) {
            this._openedBy = 'keyboard';
            this.openMenu();
        }
    }
    _handleClick() {
        if (this.triggersSubmenu()) {
            return;
        }
        else if (this.triggerMode() === 'click') {
            this.toggleMenu();
        }
    }
    _setPopoverDefaults() {
        const menu = this.menu();
        if (menu) {
            menu._popoverDirective.placement = 'bottom-start';
        }
    }
    _setupMenuConnection(menu) {
        if (menu) {
            menu._popoverDirective.setPopoverTriggerElement(this._element.nativeElement);
            const triggerId = this._element.nativeElement.id || `q-menu-trigger-${menu._menuId}`;
            if (!this._element.nativeElement.id) {
                this._element.nativeElement.id = triggerId;
            }
            if (this.triggersSubmenu()) {
                this._element.nativeElement.setAttribute('popovertarget', menu._menuId);
                this._element.nativeElement.setAttribute('popovertargetaction', 'show');
            }
            this._menuClosedSubscription = menu.closed.subscribe((reason) => {
                this._destroyMenu(reason);
                if ((reason === 'click' || reason === 'tab') && this._parentMenu) {
                    this._parentMenu._setDirectEmissionFlag();
                    this._parentMenu.closed.emit(reason);
                }
            });
        }
        this._isMenuConnectionSetup = true;
    }
    _cleanupMenuConnection() {
        this._menuClosedSubscription?.unsubscribe();
        this._menuClosedSubscription = null;
        this._isMenuConnectionSetup = false;
    }
    _destroyMenu(reason) {
        const menu = this.menu();
        if (!this._menuOpen) {
            return;
        }
        this._setIsMenuOpen(false);
        if (menu) {
            const host = menu._getHostElement();
            if (host) {
                host.hidePopover();
            }
        }
        if (menu && this._ownsMenu(menu)) {
            PANELS_TO_TRIGGERS.delete(menu);
        }
        if (reason === 'keydown') {
            this.focus('keyboard');
        }
        this._openedBy = null;
        this._clearHideTimer();
        this._hasPointerEntered = false;
    }
    _setIsMenuOpen(isOpen) {
        if (isOpen !== this._menuOpen) {
            this._menuOpen = isOpen;
            this._menuOpen ? this.menuOpened.emit() : this.menuClosed.emit();
            if (this.triggersSubmenu()) {
                this._menuItemInstance?._setHighlighted(isOpen);
            }
            this._cdr.markForCheck();
        }
    }
    _handleHover() {
        if (this.triggersSubmenu() && this._parentMenu) {
            this._hoverSubscription = this._parentMenu._hovered().subscribe((active) => {
                if (active === this._menuItemInstance && !active.disabled) {
                    this._clearSubmenuHideTimer();
                    this._openedBy = 'mouse';
                    this.openMenu();
                }
                else if (this._menuOpen) {
                    this._scheduleSubmenuClose();
                }
            });
        }
    }
    _initializeMenuConnection() {
        const menu = this.menu();
        this._setupMenuConnection(menu);
        this._menuItemInstance?._setTriggersSubmenu(this.triggersSubmenu());
    }
    _setupTouchEventListener() {
        this._cleanupTouchstart = this._renderer.listen(this._element.nativeElement, 'touchstart', (event) => {
            if (!isFakeTouchstartFromScreenReader(event)) {
                this._openedBy = 'touch';
            }
        }, { passive: true });
    }
    _ownsMenu(menu) {
        return PANELS_TO_TRIGGERS.get(menu) === this;
    }
    _setupRootHoverListeners() {
        this._cleanupRootHover?.();
        this._cleanupRootHover = null;
        this._cleanupDocumentHover?.();
        this._cleanupDocumentHover = null;
        if (this.triggersSubmenu() || this.triggerMode() !== 'hover') {
            this._cleanupPanelHover?.();
            this._cleanupPanelHover = null;
            this._clearHideTimer();
            return;
        }
        const triggerEl = this._element.nativeElement;
        const menu = this.menu();
        const panelEl = menu?._getHostElement() || null;
        const offEnter = this._renderer.listen(triggerEl, 'mouseenter', () => {
            this._openedBy = 'mouse';
            this._hasPointerEntered = true;
            this._clearHideTimer();
            this.openMenu();
            this._setupPanelHoverListeners();
        });
        const offLeave = this._renderer.listen(triggerEl, 'mouseleave', () => {
            this._startHideTimer();
        });
        this._cleanupRootHover = () => {
            offEnter();
            offLeave();
        };
        if (panelEl) {
            this._setupPanelHoverListeners();
        }
        this._cleanupDocumentHover = this._renderer.listen('document', 'mouseover', (event) => {
            const target = event.target;
            if (!target)
                return;
            const isOverAnyMenu = !!target.closest('.q-menu');
            const isOverTrigger = this._element.nativeElement.contains(target);
            if (isOverAnyMenu || isOverTrigger) {
                this._hasPointerEntered = true;
                this._clearHideTimer();
            }
            else if (this._hasPointerEntered) {
                this._startHideTimer();
            }
        });
    }
    _setupKeyboardFocusListeners() {
        if (this.triggersSubmenu() || this.triggerMode() !== 'hover')
            return;
        const triggerEl = this._element.nativeElement;
        const offFocus = this._renderer.listen(triggerEl, 'focus', () => {
            this._openedBy = 'keyboard';
            this.openMenu();
        });
        const offBlur = this._renderer.listen(triggerEl, 'blur', () => {
            setTimeout(() => {
                const active = this._document.activeElement;
                const isOverAnyMenu = !!active?.closest('.q-menu');
                const isOverTrigger = !!active && triggerEl.contains(active);
                if (!isOverAnyMenu && !isOverTrigger) {
                    this._startHideTimer();
                }
            }, 0);
        });
        const previousCleanup = this._cleanupRootHover;
        this._cleanupRootHover = () => {
            previousCleanup?.();
            offFocus();
            offBlur();
        };
    }
    _setupPanelHoverListeners() {
        this._cleanupPanelHover?.();
        this._cleanupPanelHover = null;
        if (this.triggerMode() !== 'hover')
            return;
        const menu = this.menu();
        const panelEl = menu?._getHostElement();
        if (!panelEl)
            return;
        const offEnter = this._renderer.listen(panelEl, 'mouseenter', () => {
            this._hasPointerEntered = true;
            this._clearHideTimer();
            this._clearSubmenuHideTimer();
        });
        const offLeave = this._renderer.listen(panelEl, 'mouseleave', () => {
            this._scheduleSubmenuClose();
        });
        this._cleanupPanelHover = () => {
            offEnter();
            offLeave();
        };
    }
    _scheduleSubmenuClose() {
        if (!this.triggersSubmenu())
            return;
        this._clearSubmenuHideTimer();
        const tokenAtSchedule = ++this._submenuCloseToken;
        this._submenuHideTimer = setTimeout(() => {
            if (tokenAtSchedule === this._submenuCloseToken && this._menuOpen) {
                this.closeMenu();
            }
            this._submenuHideTimer = null;
        }, SUBMENU_HIDE_DELAY_MS);
    }
    _clearSubmenuHideTimer() {
        if (this._submenuHideTimer) {
            clearTimeout(this._submenuHideTimer);
            this._submenuHideTimer = null;
        }
    }
    _startHideTimer() {
        this._clearHideTimer();
        this._hideTimer = setTimeout(() => {
            if (this._menuOpen) {
                this.closeMenu();
            }
            this._hideTimer = null;
        }, SUBMENU_HIDE_DELAY_MS);
    }
    _clearHideTimer() {
        if (this._hideTimer) {
            clearTimeout(this._hideTimer);
            this._hideTimer = null;
        }
    }
    _handleTriggerModeChange() {
        const menu = this.menu();
        if (!menu)
            return;
        const host = menu._getHostElement();
        if (!host)
            return;
        if (this.triggerMode() === 'programmatic' && !this.triggersSubmenu()) {
            if (this._menuOpen) {
                host.setAttribute('popover', 'manual');
            }
        }
        else {
            if (this._menuOpen) {
                host.setAttribute('popover', 'auto');
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMenuTriggerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.16", type: QMenuTriggerDirective, isStandalone: true, selector: "[qMenuTriggerFor]", inputs: { menu: { classPropertyName: "menu", publicName: "qMenuTriggerFor", isSignal: true, isRequired: false, transformFunction: null }, dataQt: { classPropertyName: "dataQt", publicName: "qMenuTriggerDataQt", isSignal: true, isRequired: false, transformFunction: null }, triggerMode: { classPropertyName: "triggerMode", publicName: "qMenuTriggerMode", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { menuOpened: "menuOpened", menuClosed: "menuClosed" }, host: { listeners: { "click": "_handleClick()", "mousedown": "_handleMousedown($event)", "keydown": "_handleKeydown($event)" }, properties: { "attr.data-qt": "dataQt()", "attr.aria-haspopup": "menu() ? \"menu\" : null", "attr.aria-expanded": "_menuOpen", "attr.aria-controls": "_menuOpen ? menu()?._menuId : null" }, classAttribute: "q-menu-trigger" }, exportAs: ["qMenuTrigger"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMenuTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: `[qMenuTriggerFor]`,
                    exportAs: 'qMenuTrigger',
                    host: {
                        'class': 'q-menu-trigger',
                        '[attr.data-qt]': 'dataQt()',
                        '[attr.aria-haspopup]': 'menu() ? "menu" : null',
                        '[attr.aria-expanded]': '_menuOpen',
                        '[attr.aria-controls]': '_menuOpen ? menu()?._menuId : null',
                        '(click)': '_handleClick()',
                        '(mousedown)': '_handleMousedown($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], propDecorators: { menuOpened: [{ type: i0.Output, args: ["menuOpened"] }], menuClosed: [{ type: i0.Output, args: ["menuClosed"] }], menu: [{ type: i0.Input, args: [{ isSignal: true, alias: "qMenuTriggerFor", required: false }] }], dataQt: [{ type: i0.Input, args: [{ isSignal: true, alias: "qMenuTriggerDataQt", required: false }] }], triggerMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "qMenuTriggerMode", required: false }] }] } });

const Q_MENU_COMPONENTS = [
    QMenuComponent,
    QMenuItemComponent,
    QMenuTriggerDirective,
    QContextMenuTriggerDirective,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QContextMenuTriggerDirective, QMenuComponent, QMenuItemComponent, QMenuTriggerDirective, Q_MENU_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-menu.mjs.map
