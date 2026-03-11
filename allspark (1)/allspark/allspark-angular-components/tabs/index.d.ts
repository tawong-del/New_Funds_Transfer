import * as i0 from '@angular/core';
import { EventEmitter, AfterViewInit, OnDestroy, QueryList, ElementRef } from '@angular/core';
import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';

declare abstract class QTabControl<T> implements FocusableOption {
    abstract readonly tabClick: EventEmitter<MouseEvent | KeyboardEvent>;
    abstract readonly tabFocus: EventEmitter<QTabControl<T>>;
    abstract disabled: boolean;
    abstract translateValue: string;
    abstract getKey(): T;
    abstract getIsActive(): boolean;
    abstract getLabel?(): string;
    abstract getElementWidth(): number;
    abstract getElementLeft(): number;
    abstract setActiveState(isActive: boolean): void;
    abstract focus(origin?: FocusOrigin): void;
    abstract scrollTabIntoView(behavior: ScrollBehavior): void;
}

declare class QTabComponent<T> implements QTabControl<T> {
    readonly tabClick: EventEmitter<KeyboardEvent | MouseEvent>;
    readonly tabFocus: EventEmitter<QTabControl<T>>;
    key: T;
    disabled: boolean;
    dataQt: string;
    ariaControls: string | null;
    isActive: boolean;
    hostClass: string;
    _pressed: boolean;
    role: string;
    get tabindexAttr(): number;
    _onClick(event: MouseEvent): void;
    _onTabKeyUp(event: KeyboardEvent): void;
    _onTabIndexEnter(event: KeyboardEvent): void;
    _onTabFocus(): void;
    translateValue: string;
    private readonly _elementRef;
    private readonly _changeDetectorRef;
    getKey(): T;
    getIsActive(): boolean;
    /** @hidden */
    focus(): void;
    scrollTabIntoView(behavior: ScrollBehavior): void;
    setActiveState(isActive: boolean): void;
    getElementWidth(): number;
    getElementLeft(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTabComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTabComponent<any>, "q-tab", never, { "key": { "alias": "key"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "ariaControls": { "alias": "ariaControls"; "required": false; }; "isActive": { "alias": "isActive"; "required": false; }; }, { "tabClick": "tabClick"; "tabFocus": "tabFocus"; }, never, ["*"], true, never>;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_isActive: unknown;
}

type QTabsVariant = 'subtle' | 'emphasized';

declare class QTabsComponent<T> implements AfterViewInit, OnDestroy {
    readonly tabClick: EventEmitter<{
        domEvent: MouseEvent | KeyboardEvent;
        key: T;
    }>;
    variant: QTabsVariant;
    hasExtraPadding: boolean;
    hasBottomLine: boolean;
    ariaLabelledBy: string | null;
    dataQt: string;
    set active(key: T);
    get hostClasses(): string;
    _tabItems: QueryList<QTabControl<T>>;
    _tabList: ElementRef<HTMLElement>;
    _leftScroll: boolean;
    _rightScroll: boolean;
    _disableTransition: boolean;
    _activeItemLeft: string;
    _activeItemWidth: string;
    _gapSize: number;
    private _keyManager;
    private _activeKey$;
    private readonly _iconRegistry;
    private readonly _changeDetectorRef;
    private readonly _destroy$;
    private readonly _resizeObserver;
    private readonly _translocoService;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _handleStartScrollClick(): void;
    _handleEndScrollClick(): void;
    _handleKeydown(event: KeyboardEvent): void;
    private _enableTransition;
    private _calculateUnderlinePosition;
    private _updateUnderlinePosition;
    protected get translateX(): string;
    get _isMobile(): boolean;
    get currentChildren(): Element[];
    private _tabClickEvent;
    private _moveTabsScroll;
    private _scroll;
    private _getCubicAnimationValue;
    private _getScrollSize;
    private _updateScrollShadowVisibility;
    private _focusActiveOnInit;
    private _updateFocusKeyManagerEntries;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTabsComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTabsComponent<any>, "q-tabs", never, { "variant": { "alias": "variant"; "required": false; }; "hasExtraPadding": { "alias": "hasExtraPadding"; "required": false; }; "hasBottomLine": { "alias": "hasBottomLine"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "active": { "alias": "active"; "required": false; }; }, { "tabClick": "tabClick"; }, ["_tabItems"], ["q-tab"], true, never>;
    static ngAcceptInputType_hasExtraPadding: unknown;
    static ngAcceptInputType_hasBottomLine: unknown;
}

declare const Q_TABS_COMPONENTS: readonly [typeof QTabComponent, typeof QTabsComponent];

export { QTabComponent, QTabControl, QTabsComponent, Q_TABS_COMPONENTS };
export type { QTabsVariant };
