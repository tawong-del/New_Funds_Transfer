import * as i0 from '@angular/core';
import { OnInit, EventEmitter, TemplateRef, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { QOverlayPositionX, QOverlayPositionY } from '@questrade/allspark-angular-components/overlay';
import { ListKeyManagerOption, Highlightable } from '@angular/cdk/a11y';
import * as i1 from '@questrade/allspark-angular-components/popover';

interface QDropmenuOptionSelectionChange<T> {
    source: QDropmenuOptionComponent<T>;
    isUserInput: boolean;
}

declare class QDropmenuOptionComponent<T> implements OnInit, ListKeyManagerOption, Highlightable {
    readonly selectionChange: EventEmitter<QDropmenuOptionSelectionChange<T>>;
    value: T | null;
    label: string;
    subLabel: string;
    icon: string;
    index: number | null;
    textToHighlight: string;
    optionTemplate: TemplateRef<unknown> | null;
    highlightCaseSensitive: boolean;
    useOverlay: boolean;
    disabled: boolean;
    _role: string;
    id: string;
    selected: boolean;
    _dataQt: string;
    get _hostClasses(): string;
    _onClick: () => void;
    onKeyDown: (event: KeyboardEvent) => void;
    active: boolean;
    readonly _dropmenu: QDropmenuComponent<any>;
    private readonly _iconRegistry;
    private readonly _elementRef;
    private readonly _renderer;
    ngOnInit(): void;
    select(emitEvent?: boolean): void;
    deselect(emitEvent?: boolean): void;
    selectViaInteraction(): void;
    /**
     * Implemented as a part of `Highlightable`.
     */
    setActiveStyles(): void;
    /**
     * Implemented as a part of `Highlightable`.
     */
    setInactiveStyles(): void;
    /** Used internally by the ActiveDescendantKeyManager.withTypeAhead when determining
     *  whether the option should be focused.
     */
    getLabel(): string;
    getHostElement(): HTMLElement;
    handleKeydown(event: KeyboardEvent): void;
    private _emitSelectionChangeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDropmenuOptionComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDropmenuOptionComponent<any>, "q-dropmenu-option", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "subLabel": { "alias": "subLabel"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "index": { "alias": "index"; "required": false; }; "textToHighlight": { "alias": "textToHighlight"; "required": false; }; "optionTemplate": { "alias": "optionTemplate"; "required": false; }; "highlightCaseSensitive": { "alias": "highlightCaseSensitive"; "required": false; }; "useOverlay": { "alias": "useOverlay"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "selectionChange": "selectionChange"; }, never, never, true, never>;
    static ngAcceptInputType_highlightCaseSensitive: unknown;
    static ngAcceptInputType_useOverlay: unknown;
    static ngAcceptInputType_disabled: unknown;
}

declare class QDropmenuOriginDirective {
    elementRef: ElementRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDropmenuOriginDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QDropmenuOriginDirective, "[qDropmenuOrigin]", ["qDropmenuOrigin"], {}, {}, never, never, true, never>;
}

type QDropmenuDensity = 'default' | 'compact';

type QDropmenuLoadingVariant = 'spinner' | 'skeleton';

interface QDropmenuOption<T> {
    value: T;
    label: string;
    subLabel?: string;
    icon?: string;
    trackById?: string | number;
    disabled?: boolean;
}

interface QDropmenuSelectionChange<T> {
    source: QDropmenuComponent<T>;
    option: QDropmenuOptionComponent<T>;
}

declare class QDropmenuComponent<T> implements OnInit, AfterViewInit {
    readonly selectionChange: EventEmitter<QDropmenuSelectionChange<T>>;
    readonly valueChange: EventEmitter<QDropmenuOption<T> | QDropmenuOption<T>[]>;
    readonly opened: EventEmitter<void>;
    readonly closed: EventEmitter<void>;
    backdropEnabled: i0.ModelSignal<boolean>;
    fitTriggerWidth: i0.ModelSignal<boolean>;
    density: QDropmenuDensity;
    highlightCaseSensitive: boolean;
    loading: boolean;
    disableSelectionTracking: boolean;
    textToHighlight: string;
    loadingVariant: QDropmenuLoadingVariant;
    loadingSkeletonTemplate: TemplateRef<unknown> | null;
    footerMessage: string;
    footerTemplate: TemplateRef<unknown> | null;
    emptyStateTemplate: TemplateRef<unknown> | null;
    optionTemplate: TemplateRef<unknown> | null;
    groupLabelTemplate: TemplateRef<unknown> | null;
    /**
     * @internal
     * This input is used internally for rendering the phone-number search header.
     */
    headerTemplate: TemplateRef<unknown> | null;
    ariaLabel: string;
    ariaLabelledby: string;
    id: string;
    dataQt: string;
    /**
     * `CdkOverlayOrigin` directive usage is deprecated. Use `qDropmenuOrigin` directive instead.
     */
    get dropmenuTrigger(): CdkOverlayOrigin | QDropmenuOriginDirective | null;
    set dropmenuTrigger(value: CdkOverlayOrigin | QDropmenuOriginDirective | null);
    get groupBy(): string | ((option: QDropmenuOption<T>) => unknown) | null;
    set groupBy(value: string | ((option: QDropmenuOption<T>) => unknown) | null);
    get groupLabel(): string | ((groupKey: unknown, options: QDropmenuOption<T>[]) => string | null) | Record<string, string> | null;
    set groupLabel(value: string | ((groupKey: unknown, options: QDropmenuOption<T>[]) => string | null) | Record<string, string> | null);
    get options(): QDropmenuOption<T>[];
    set options(value: QDropmenuOption<T>[]);
    get value(): T | T[] | null;
    set value(value: T | T[] | null);
    /**
     * @deprecated Use `--awds-dropmenu-container-min-width` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get minWidth(): number;
    set minWidth(value: number);
    /**
     * @deprecated Use `--awds-dropmenu-container-min-height` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get minHeight(): number;
    set minHeight(value: number);
    /**
     * @deprecated Use `offset` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get offsetY(): number;
    set offsetY(value: number);
    /**
     * @deprecated Use `offset` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get offsetX(): number;
    set offsetX(value: number);
    /**
     * @deprecated Use `placement` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get xPosition(): QOverlayPositionX;
    set xPosition(value: QOverlayPositionX);
    /**
     * @deprecated Use `placement` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get yPosition(): QOverlayPositionY;
    set yPosition(value: QOverlayPositionY);
    /**
     * @deprecated Use `fitTriggerWidth` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get fitOverlayWidth(): boolean;
    set fitOverlayWidth(value: boolean);
    /**
     * @deprecated There's no replacement for this.
     * @breaking-change First major after 25 Feb 2026
     */
    get useOverlay(): boolean;
    set useOverlay(value: boolean);
    /**
     * @deprecated Use `backdropEnabled` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get overlayHasBackdrop(): boolean;
    set overlayHasBackdrop(value: boolean);
    optionsQuery: QueryList<QDropmenuOptionComponent<T>>;
    _tabIndex: number;
    _hostClass: string;
    _popover: i0.Signal<string | null>;
    _groupedOptions: {
        groupLabel: string | null;
        options: QDropmenuOption<T>[];
    }[];
    _options: QDropmenuOption<T>[];
    _value: T | T[] | null;
    _withTypeahead: boolean;
    _selectKeys: string[];
    _groupBy: string | ((option: QDropmenuOption<T>) => unknown) | null;
    _groupLabel: string | ((groupKey: unknown, options: QDropmenuOption<T>[]) => string | null) | Record<string, string> | null;
    isOpened: boolean;
    private _useOverlay;
    private _xPosition;
    private _yPosition;
    private _dropmenuTrigger;
    private _isKeyboardNavigation;
    private _selectionModel;
    private _keyManager;
    private readonly _cdr;
    private readonly _document;
    private readonly _iconRegistry;
    private readonly _destroy$;
    private readonly _focusMonitor;
    private readonly _renderer;
    private readonly _elementRef;
    private readonly _popoverDirective;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    open(): void;
    close(): void;
    /**
     * @param force A boolean, which causes toggle to behave like open or close.
     * If set to true, the dropmenu is opened if it was initially closed. If it was initially opened, nothing happens.
     * If set to false, the dropmenu is closed if it was initially opened. If it was initially closed, nothing happens.
     */
    toggle(force?: boolean): void;
    _getAriaActiveDescendant(): string;
    _handleKeydown: (event: KeyboardEvent) => void;
    _onOptionSelectionChange(event: QDropmenuOptionSelectionChange<T>): void;
    _trackOptionByFn(_index: number, displayOption: QDropmenuOption<T>): string | number;
    _getGlobalIndex(groupIndex: number, optionIndex: number): number;
    _getTriggerHostElement(): HTMLElement | null;
    _getDropmenuHostElement(): HTMLElement;
    resetActiveAfterOptionsChange(): void;
    scrollOptionIntoView(option: QDropmenuOptionComponent<T>, alignment?: 'top' | 'nearest'): void;
    _handleKeyManagerTabOut(): void;
    get selected(): QDropmenuOptionComponent<T>;
    get empty(): boolean;
    get hasFooter(): boolean;
    /**
     * @deprecated There's no replacement for this.
     * @breaking-change First major after 25 Feb 2026
     */
    get overlayMinHeight(): number;
    /**
     * @deprecated There's no replacement for this.
     * @breaking-change First major after 25 Feb 2026
     */
    get overlayWidth(): number;
    get triggerValue(): string;
    private _handlePopoverOpened;
    private _handlePopoverClosed;
    private _handleGroupedOptions;
    private _getGroupedOptions;
    private _getGroupLabel;
    private _handleOpenKeydown;
    private _initializeSelection;
    private _setSelectionByValue;
    private _selectOptionByValue;
    private _setKeyManager;
    private _onSelect;
    private _propagateChanges;
    private _highlightCorrectOption;
    private _getGroupHeaderTop;
    private _hasGroupLabelsBeforeOption;
    private _scrollOptionIntoView;
    private _handleOptionsChange;
    private _handleSelectionModelChange;
    private _handleTriggerDynamicArias;
    private _setTriggerStaticArias;
    private _updateTriggerAriaControls;
    private _updateTriggerAriaExpanded;
    private _updateTriggerAriaActiveDescendant;
    private _monitorKeyboardNavigation;
    private _setKeydownListener;
    private _handleCleanups;
    private _computerPopover;
    private _fitContainerToTrigger;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDropmenuComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDropmenuComponent<any>, "q-dropmenu", never, { "backdropEnabled": { "alias": "backdropEnabled"; "required": false; "isSignal": true; }; "fitTriggerWidth": { "alias": "fitTriggerWidth"; "required": false; "isSignal": true; }; "density": { "alias": "density"; "required": false; }; "highlightCaseSensitive": { "alias": "highlightCaseSensitive"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "disableSelectionTracking": { "alias": "disableSelectionTracking"; "required": false; }; "textToHighlight": { "alias": "textToHighlight"; "required": false; }; "loadingVariant": { "alias": "loadingVariant"; "required": false; }; "loadingSkeletonTemplate": { "alias": "loadingSkeletonTemplate"; "required": false; }; "footerMessage": { "alias": "footerMessage"; "required": false; }; "footerTemplate": { "alias": "footerTemplate"; "required": false; }; "emptyStateTemplate": { "alias": "emptyStateTemplate"; "required": false; }; "optionTemplate": { "alias": "optionTemplate"; "required": false; }; "groupLabelTemplate": { "alias": "groupLabelTemplate"; "required": false; }; "headerTemplate": { "alias": "headerTemplate"; "required": false; }; "ariaLabel": { "alias": "aria-label"; "required": false; }; "ariaLabelledby": { "alias": "aria-labelledby"; "required": false; }; "id": { "alias": "id"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "dropmenuTrigger": { "alias": "dropmenuTrigger"; "required": false; }; "groupBy": { "alias": "groupBy"; "required": false; }; "groupLabel": { "alias": "groupLabel"; "required": false; }; "options": { "alias": "options"; "required": false; }; "value": { "alias": "value"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "minHeight": { "alias": "minHeight"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "xPosition": { "alias": "xPosition"; "required": false; }; "yPosition": { "alias": "yPosition"; "required": false; }; "fitOverlayWidth": { "alias": "fitOverlayWidth"; "required": false; }; "useOverlay": { "alias": "useOverlay"; "required": false; }; "overlayHasBackdrop": { "alias": "overlayHasBackdrop"; "required": false; }; }, { "selectionChange": "selectionChange"; "valueChange": "valueChange"; "opened": "opened"; "closed": "closed"; "backdropEnabled": "backdropEnabledChange"; "fitTriggerWidth": "fitTriggerWidthChange"; }, never, never, true, [{ directive: typeof i1.QPopoverDirective; inputs: { "qPopoverPlacement": "placement"; "qPopoverOffset": "offset"; }; outputs: {}; }]>;
    static ngAcceptInputType_highlightCaseSensitive: unknown;
    static ngAcceptInputType_loading: unknown;
    static ngAcceptInputType_disableSelectionTracking: unknown;
    static ngAcceptInputType_minWidth: unknown;
    static ngAcceptInputType_minHeight: unknown;
    static ngAcceptInputType_offsetY: unknown;
    static ngAcceptInputType_offsetX: unknown;
    static ngAcceptInputType_fitOverlayWidth: unknown;
    static ngAcceptInputType_useOverlay: unknown;
    static ngAcceptInputType_overlayHasBackdrop: unknown;
}

declare class QDropmenuMultiSelectComponent<T> extends QDropmenuComponent<T> {
    label: string;
    set value(value: T[]);
    get value(): T[];
    _selectedOptions: QDropmenuOption<T>[];
    _value: T[];
    private _isLastFocused;
    _onFocus(isLast: boolean): void;
    _onTabKeydown(): void;
    _handleKeyManagerTabOut(): void;
    isOptionSelected(option: QDropmenuOption<T>): boolean;
    _onOptionClick(option: QDropmenuOption<T>): void;
    get displayValue(): string;
    private _onMultiSelectChange;
    private _calculateMultiSelection;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDropmenuMultiSelectComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDropmenuMultiSelectComponent<any>, "q-dropmenu-multiselect", never, { "label": { "alias": "label"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, true, never>;
}

type QDropmenuOpenedBy = 'mouse' | 'keyboard' | 'program';

export { QDropmenuComponent, QDropmenuMultiSelectComponent, QDropmenuOriginDirective };
export type { QDropmenuDensity, QDropmenuLoadingVariant, QDropmenuOpenedBy, QDropmenuOption, QDropmenuSelectionChange };
