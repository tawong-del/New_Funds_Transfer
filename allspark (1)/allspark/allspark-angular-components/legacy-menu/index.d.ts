import { FocusOrigin, FocusableOption } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import { EventEmitter, QueryList, AfterContentInit, AfterViewInit, OnDestroy, InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import { QOverlayPositionX, QOverlayPositionY, QOverlayPriorityPosition, QOverlayComponent } from '@questrade/allspark-angular-components/overlay';

type QMenuCloseReason = undefined | 'click' | 'keydown' | 'tab';

interface QMenuPanel {
    open: () => void;
    close: (reason: QMenuCloseReason) => void;
    focusFirstItem: (openedBy: FocusOrigin) => void;
    isOpened: boolean;
    openedBy: CdkOverlayOrigin;
    isSubmenu: boolean;
    xPosition: QOverlayPositionX;
    yPosition: QOverlayPositionY;
    priorityPositions: QOverlayPriorityPosition;
    offsetX: number;
    offsetY: number;
    positions: ConnectionPositionPair[];
    itemHovered: () => Observable<QLegacyMenuItemComponent>;
    readonly closed: EventEmitter<QMenuCloseReason>;
    directDescendantItems: QueryList<QLegacyMenuItemComponent>;
}

/**
 * @deprecated Use QMenuComponent instead, To be removed.
 * @breaking-change First major after Fev 26, 2026
 */
declare class QLegacyMenuComponent implements QMenuPanel, AfterContentInit {
    readonly opened: EventEmitter<void>;
    readonly closed: EventEmitter<QMenuCloseReason>;
    xPosition: QOverlayPositionX;
    yPosition: QOverlayPositionY;
    priorityPositions: QOverlayPriorityPosition;
    offsetY: number;
    offsetX: number;
    dataQt: string;
    get overlayPanelClass(): string | string[];
    set overlayPanelClass(value: string | string[]);
    private _allMenuItems;
    _overlay: QOverlayComponent;
    _hostClass: string;
    openedBy: CdkOverlayOrigin;
    directDescendantItems: QueryList<QLegacyMenuItemComponent>;
    _isSubmenu: boolean;
    private _overlayPanelClass;
    private _keyManager;
    private readonly _destroy$;
    ngAfterContentInit(): void;
    open(): void;
    close(reason: QMenuCloseReason): void;
    _handleKeydown(event: KeyboardEvent): void;
    itemHovered(): Observable<QLegacyMenuItemComponent>;
    focusFirstItem(openedBy: FocusOrigin): void;
    get isSubmenu(): boolean;
    set isSubmenu(value: boolean);
    get isOpened(): boolean;
    set positions(positions: ConnectionPositionPair[]);
    /**
     * Sets up a stream that will keep track of any newly-added menu items and will update the list
     * of direct descendants. We collect the descendants this way, because `allMenuItems` can include
     * items that are part of child menus, and using a custom way of registering items is unreliable
     * when it comes to maintaining the item order.
     */
    private _updateDirectDescendants;
    static ɵfac: i0.ɵɵFactoryDeclaration<QLegacyMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QLegacyMenuComponent, "q-menu", never, { "xPosition": { "alias": "xPosition"; "required": false; }; "yPosition": { "alias": "yPosition"; "required": false; }; "priorityPositions": { "alias": "priorityPositions"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "overlayPanelClass": { "alias": "overlayPanelClass"; "required": false; }; }, { "opened": "opened"; "closed": "closed"; }, ["_allMenuItems"], ["*"], true, never>;
}

/**
 * @deprecated Use QMenuItemComponent instead, To be removed.
 * @breaking-change First major after Fev 26, 2026
 */
declare class QLegacyMenuItemComponent implements AfterViewInit, OnDestroy, FocusableOption {
    disabled: boolean;
    dataQt: string;
    set _parentMenu(value: QLegacyMenuComponent | undefined);
    _onItemClick(event: Event): void;
    _handleMouseEnter(): void;
    _handleMouseLeave(): void;
    _handleMouseDown(): void;
    _handleMouseUp(): void;
    _highlighted: boolean;
    _selected: boolean;
    triggersSubmenu: boolean;
    parentMenu: QLegacyMenuComponent;
    readonly hovered: Subject<QLegacyMenuItemComponent>;
    readonly focused: Subject<QLegacyMenuItemComponent>;
    private readonly _iconRegistry;
    private readonly _elementRef;
    private readonly _focusMonitor;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _getTabIndex(): string;
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    getHostElement(): HTMLElement;
    getLabel(): string;
    setHighlighted(isHighlighted: boolean): void;
    setSelected(isSelected: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QLegacyMenuItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QLegacyMenuItemComponent, "[q-menu-item]", never, { "disabled": { "alias": "disabled"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "_parentMenu": { "alias": "parentMenu"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_disabled: unknown;
}

/**
 * @deprecated Use QMenuTriggerDirective instead, To be removed.
 * @breaking-change First major after Fev 26, 2026
 */
declare class QLegacyMenuTriggerDirective implements AfterContentInit {
    get menu(): QMenuPanel;
    set menu(menu: QMenuPanel);
    _handleClick(event: Event): void;
    _handleMouseLeave({ relatedTarget }: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    private _menu;
    private _overlayOrigin;
    private readonly _destroy$;
    private readonly _elementRef;
    private readonly menuItemInstance;
    private readonly parentMenu;
    constructor();
    ngAfterContentInit(): void;
    get isTriggerForSubmenu(): boolean;
    private _highlightMenuItem;
    private _toggle;
    private _openMenu;
    private _closeMenu;
    private _menuClosingActions;
    private _handleHover;
    static ɵfac: i0.ɵɵFactoryDeclaration<QLegacyMenuTriggerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QLegacyMenuTriggerDirective, "[qMenuTriggerFor], [q-menu-trigger-for]", never, { "menu": { "alias": "qMenuTriggerFor"; "required": false; }; }, {}, never, never, true, never>;
}

declare const Q_MENU_PANEL: InjectionToken<QMenuPanel>;

declare const Q_LEGACY_MENU_COMPONENTS: readonly [typeof QLegacyMenuComponent, typeof QLegacyMenuItemComponent, typeof QLegacyMenuTriggerDirective];

export { QLegacyMenuComponent, QLegacyMenuItemComponent, QLegacyMenuTriggerDirective, Q_LEGACY_MENU_COMPONENTS, Q_MENU_PANEL };
export type { QMenuCloseReason, QMenuPanel };
