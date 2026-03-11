import * as _angular_core from '@angular/core';
import { OnInit, AfterViewInit, OnDestroy, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import * as i1 from '@questrade/allspark-angular-components/popover';
import { QPopoverDirective } from '@questrade/allspark-angular-components/popover';
import { Subject, Observable } from 'rxjs';

declare class QMenuItemComponent implements FocusableOption, OnInit, AfterViewInit, OnDestroy {
    disabled: boolean;
    dataQt: _angular_core.InputSignal<string>;
    _highlighted: boolean;
    _triggersSubmenu: boolean;
    readonly _parentMenu: QMenuComponent | null;
    readonly _hovered: Subject<QMenuItemComponent>;
    readonly _focused: Subject<QMenuItemComponent>;
    private readonly _elementRef;
    private readonly _document;
    private readonly _focusMonitor;
    private readonly _cdr;
    private readonly _iconRegistry;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    getLabel(): string;
    _getTabIndex(): string;
    _handleClick(event: Event): void;
    _handleMouseEnter(): void;
    _setHighlighted(isHighlighted: boolean): void;
    _setTriggersSubmenu(triggersSubmenu: boolean): void;
    _hasFocus(): boolean;
    private _getHostElement;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<QMenuItemComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<QMenuItemComponent, "[q-menu-item]", never, { "disabled": { "alias": "qMenuItemDisabled"; "required": false; }; "dataQt": { "alias": "qMenuItemDataQt"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_disabled: unknown;
}

type QMenuCloseReason = 'click' | 'keydown' | 'tab' | 'none';

declare class QMenuComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    readonly closed: _angular_core.OutputEmitterRef<QMenuCloseReason>;
    ariaLabel: _angular_core.InputSignal<string>;
    ariaLabelledby: _angular_core.InputSignal<string>;
    ariaDescribedby: _angular_core.InputSignal<string>;
    dataQt: _angular_core.InputSignal<string>;
    _allItems: _angular_core.Signal<readonly any[]>;
    _parentMenu: QMenuComponent | null;
    readonly _menuId: string;
    readonly _popoverDirective: QPopoverDirective;
    private _directDescendantItems;
    private _hasDirectEmission;
    private _keyManager;
    private _firstItemFocusRef;
    private readonly _elementRef;
    private readonly _injector;
    constructor();
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focusFirstItem(origin?: FocusOrigin): void;
    resetActiveItem(): void;
    _hovered(): Observable<QMenuItemComponent>;
    _handleKeydown(event: KeyboardEvent): void;
    _handleClick(event: Event): void;
    _getHostElement(): HTMLElement;
    _setDirectEmissionFlag(): void;
    private _setupPopoverClosedSubscription;
    private _setupKeyManager;
    private _setupTabOutSubscription;
    private _setupFocusedItemTracking;
    private _setupItemsChangesHandling;
    private _resolvePanel;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<QMenuComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<QMenuComponent, "q-menu", ["qMenu"], { "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "ariaLabelledby": { "alias": "ariaLabelledby"; "required": false; "isSignal": true; }; "ariaDescribedby": { "alias": "ariaDescribedby"; "required": false; "isSignal": true; }; "dataQt": { "alias": "dataQt"; "required": false; "isSignal": true; }; }, { "closed": "closed"; }, ["_allItems"], ["*"], true, [{ directive: typeof i1.QPopoverDirective; inputs: { "qPopoverPlacement": "placement"; "qPopoverOffset": "offset"; }; outputs: {}; }]>;
}

declare class QContextMenuTriggerDirective implements OnDestroy {
    readonly menuOpened: _angular_core.OutputEmitterRef<void>;
    readonly menuClosed: _angular_core.OutputEmitterRef<void>;
    menu: _angular_core.InputSignal<QMenuComponent | null>;
    disabled: _angular_core.InputSignal<boolean>;
    dataQt: _angular_core.InputSignal<string>;
    private _document;
    private _element;
    private _anchorEl;
    private _menuOpen;
    private _openedBy;
    private _triggerPressedControl;
    private _cleanupManualDismiss;
    ngOnDestroy(): void;
    _handleContextMenuEvent(event: MouseEvent): void;
    _ariaControls(): string | null;
    private _openContextMenuAt;
    private _ensureAnchor;
    private _positionAnchor;
    private _cleanupAnchor;
    private _focus;
    private _suppressNextOutsidePointerBurst;
    private _installManualDismissHandlers;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<QContextMenuTriggerDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<QContextMenuTriggerDirective, "[qContextMenuTriggerFor]", ["qContextMenuTrigger"], { "menu": { "alias": "qContextMenuTriggerFor"; "required": false; "isSignal": true; }; "disabled": { "alias": "qContextMenuTriggerDisabled"; "required": false; "isSignal": true; }; "dataQt": { "alias": "qContextMenuTriggerDataQt"; "required": false; "isSignal": true; }; }, { "menuOpened": "menuOpened"; "menuClosed": "menuClosed"; }, never, never, true, never>;
}

type QMenuTriggerMode = 'click' | 'hover' | 'programmatic';

declare class QMenuTriggerDirective implements AfterContentInit, OnChanges, OnDestroy, OnInit {
    readonly menuOpened: _angular_core.OutputEmitterRef<void>;
    readonly menuClosed: _angular_core.OutputEmitterRef<void>;
    menu: _angular_core.InputSignal<QMenuComponent | null>;
    dataQt: _angular_core.InputSignal<string>;
    triggerMode: _angular_core.InputSignal<QMenuTriggerMode>;
    _openedBy: Exclude<FocusOrigin, 'program' | null> | null;
    _menuOpen: boolean;
    private _hoverSubscription;
    private _menuClosedSubscription;
    private _isMenuConnectionSetup;
    private _cleanupTouchstart;
    private _cleanupRootHover;
    private _cleanupPanelHover;
    private _cleanupDocumentHover;
    private _hideTimer;
    private _hasPointerEntered;
    private _submenuHideTimer;
    private _submenuCloseToken;
    private readonly _parentMenu;
    private readonly _renderer;
    private readonly _element;
    private readonly _menuItemInstance;
    private readonly _focusMonitor;
    private readonly _cdr;
    private readonly _document;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    triggersSubmenu(): boolean;
    toggleMenu(): void;
    openMenu(): void;
    closeMenu(): void;
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    _handleMousedown(event: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    _handleClick(): void;
    private _setPopoverDefaults;
    private _setupMenuConnection;
    private _cleanupMenuConnection;
    private _destroyMenu;
    private _setIsMenuOpen;
    private _handleHover;
    private _initializeMenuConnection;
    private _setupTouchEventListener;
    private _ownsMenu;
    private _setupRootHoverListeners;
    private _setupKeyboardFocusListeners;
    private _setupPanelHoverListeners;
    private _scheduleSubmenuClose;
    private _clearSubmenuHideTimer;
    private _startHideTimer;
    private _clearHideTimer;
    private _handleTriggerModeChange;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<QMenuTriggerDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<QMenuTriggerDirective, "[qMenuTriggerFor]", ["qMenuTrigger"], { "menu": { "alias": "qMenuTriggerFor"; "required": false; "isSignal": true; }; "dataQt": { "alias": "qMenuTriggerDataQt"; "required": false; "isSignal": true; }; "triggerMode": { "alias": "qMenuTriggerMode"; "required": false; "isSignal": true; }; }, { "menuOpened": "menuOpened"; "menuClosed": "menuClosed"; }, never, never, true, never>;
}

declare const Q_MENU_COMPONENTS: (typeof QMenuItemComponent | typeof QMenuComponent | typeof QContextMenuTriggerDirective | typeof QMenuTriggerDirective)[];

export { QContextMenuTriggerDirective, QMenuComponent, QMenuItemComponent, QMenuTriggerDirective, Q_MENU_COMPONENTS };
export type { QMenuCloseReason, QMenuTriggerMode };
