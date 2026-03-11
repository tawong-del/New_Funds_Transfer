import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, EventEmitter, ElementRef, SimpleChanges, OnDestroy } from '@angular/core';

type QDrawerPosition = 'top' | 'bottom' | 'left' | 'right';

interface QDrawerSnap {
    value: number;
    type: 'px' | '%';
}

declare class QDrawerContainerComponent implements OnInit, AfterViewInit, OnChanges {
    readonly closeRequested: EventEmitter<void>;
    readonly closeIconClicked: EventEmitter<void>;
    readonly fullscreenChange: EventEmitter<boolean>;
    title: string;
    position: QDrawerPosition;
    showHeader: boolean;
    showHeaderIcon: boolean;
    disableDefaultClose: boolean;
    disableResize: boolean;
    snapList: QDrawerSnap[];
    width: string;
    height: string;
    titleCentered: boolean;
    _header: ElementRef<HTMLElement>;
    _content: ElementRef<HTMLElement>;
    _closeIcon: ElementRef<HTMLElement> | null;
    _dataQt: string;
    get _minHeight(): string;
    get _width(): string;
    get _marginLeft(): string;
    get _marginRight(): string;
    get _hostClasses(): string;
    _isMobile: boolean;
    private _resizing;
    private _fullscreen;
    private _snapEnabled;
    private _dragStartYValue;
    private _dragStartDrawerHeight;
    private readonly _document;
    private readonly _elementRef;
    private readonly _cdr;
    private readonly _destroy$;
    private readonly _iconRegistry;
    private readonly _breakpointObserver;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    _onTouchStart(event: TouchEvent): void;
    _onTouchCancel(event: TouchEvent): void;
    _onTouchMove(event: TouchEvent): void;
    _onTouchEnd(event: TouchEvent): void;
    _onHandleMouseDown(event: MouseEvent): void;
    _onCloseIconClick(event: Event): void;
    _setInitialHeight(): void;
    private _prepareToResize;
    private _stopResize;
    private _resize;
    private _subscribeToHeaderTouchEvents;
    private _subscribeToDocumentMouseEvents;
    private _onDocumentMouseMove;
    private _onDocumentMouseUp;
    private _snap;
    private _percentToPx;
    private _getClosestSnapValue;
    private get _el();
    private get _totalHeight();
    private get _sortedSnapValues();
    private get _topOrBottom();
    private _targetIsCloseIcon;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDrawerContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDrawerContainerComponent, "q-drawer-container", never, { "title": { "alias": "title"; "required": false; }; "position": { "alias": "position"; "required": false; }; "showHeader": { "alias": "showHeader"; "required": false; }; "showHeaderIcon": { "alias": "showHeaderIcon"; "required": false; }; "disableDefaultClose": { "alias": "disableDefaultClose"; "required": false; }; "disableResize": { "alias": "disableResize"; "required": false; }; "snapList": { "alias": "snapList"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "titleCentered": { "alias": "titleCentered"; "required": false; }; }, { "closeRequested": "closeRequested"; "closeIconClicked": "closeIconClicked"; "fullscreenChange": "fullscreenChange"; }, never, ["*"], true, never>;
    static ngAcceptInputType_showHeader: unknown;
    static ngAcceptInputType_showHeaderIcon: unknown;
    static ngAcceptInputType_disableDefaultClose: unknown;
    static ngAcceptInputType_disableResize: unknown;
    static ngAcceptInputType_titleCentered: unknown;
}

declare class QDrawerComponent implements AfterViewInit, OnDestroy {
    readonly openStateChange: EventEmitter<boolean>;
    title: string;
    hasBorder: boolean;
    showHeader: boolean;
    hasBoxShadow: boolean;
    showHeaderIcon: boolean;
    titleCentered: boolean;
    disableResize: boolean;
    disableDefaultClose: boolean;
    closeOnBackdropClick: boolean;
    closeOnEsc: boolean;
    dataQt: string;
    position: QDrawerPosition;
    snapList: QDrawerSnap[];
    get hasBackdrop(): boolean;
    set hasBackdrop(value: boolean);
    get openState(): boolean;
    set openState(value: boolean);
    /**
     * @deprecated Use --awds-drawer-container-width token instead.
     * @breaking-change First major after 10 Mar 2026
     */
    width: string;
    /**
     *  @deprecated Use --awds-drawer-container-height token instead.
     *  @breaking-change First major after 10 Mar 2026
     */
    height: string;
    /**
     * @deprecated Use `--awds-drawer-offset-top` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetTop: number;
    /**
     * @deprecated Use `--awds-drawer-offset-left` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetLeft: number;
    /**
     * @deprecated Use `--awds-drawer-offset-right` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetRight: number;
    /**
     * @deprecated Use `--awds-drawer-offset-bottom` Component Level Tokens instead.
     * @breaking-change First major after 10 Mar 2026
     */
    offsetBottom: number;
    get hostClasses(): string;
    get _hostStyle(): string;
    _popoverAttr: string | null;
    _drawerContainer: QDrawerContainerComponent;
    private readonly _cdr;
    private readonly _hostElement;
    private _openState;
    private _fullscreen;
    private _hasBackdrop;
    private _focusOrigin;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    open(focusOrigin?: HTMLElement): void;
    close(): void;
    toggle(): void;
    _onDrawerContainerClose(): void;
    _onFullscreenChanged(isFullscreen: boolean): void;
    get isOpened(): boolean;
    private _getCssTokensOffsetValue;
    get _rounded(): boolean;
    private readonly _onDialogCancel;
    private readonly _onDialogMouseDown;
    private readonly _onDialogKeyDown;
    private _handleBeforeToggle;
    private _setupDialogEventListeners;
    private cleanUp;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDrawerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDrawerComponent, "dialog[q-drawer], dialog[qDrawer]", never, { "title": { "alias": "title"; "required": false; }; "hasBorder": { "alias": "hasBorder"; "required": false; }; "showHeader": { "alias": "showHeader"; "required": false; }; "hasBoxShadow": { "alias": "hasBoxShadow"; "required": false; }; "showHeaderIcon": { "alias": "showHeaderIcon"; "required": false; }; "titleCentered": { "alias": "titleCentered"; "required": false; }; "disableResize": { "alias": "disableResize"; "required": false; }; "disableDefaultClose": { "alias": "disableDefaultClose"; "required": false; }; "closeOnBackdropClick": { "alias": "closeOnBackdropClick"; "required": false; }; "closeOnEsc": { "alias": "closeOnEsc"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "position": { "alias": "position"; "required": false; }; "snapList": { "alias": "snapList"; "required": false; }; "hasBackdrop": { "alias": "hasBackdrop"; "required": false; }; "openState": { "alias": "openState"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "offsetTop": { "alias": "offsetTop"; "required": false; }; "offsetLeft": { "alias": "offsetLeft"; "required": false; }; "offsetRight": { "alias": "offsetRight"; "required": false; }; "offsetBottom": { "alias": "offsetBottom"; "required": false; }; }, { "openStateChange": "openStateChange"; }, never, ["*"], true, never>;
    static ngAcceptInputType_hasBorder: unknown;
    static ngAcceptInputType_showHeader: unknown;
    static ngAcceptInputType_hasBoxShadow: unknown;
    static ngAcceptInputType_showHeaderIcon: unknown;
    static ngAcceptInputType_titleCentered: unknown;
    static ngAcceptInputType_disableResize: unknown;
    static ngAcceptInputType_disableDefaultClose: unknown;
    static ngAcceptInputType_closeOnBackdropClick: unknown;
    static ngAcceptInputType_closeOnEsc: unknown;
    static ngAcceptInputType_hasBackdrop: unknown;
    static ngAcceptInputType_offsetTop: unknown;
    static ngAcceptInputType_offsetLeft: unknown;
    static ngAcceptInputType_offsetRight: unknown;
    static ngAcceptInputType_offsetBottom: unknown;
}

export { QDrawerComponent };
export type { QDrawerPosition, QDrawerSnap };
