import * as i0 from '@angular/core';
import { EventEmitter, TemplateRef, OnInit, AfterContentInit, AfterViewInit, QueryList, OnDestroy, ElementRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

declare class QExpandComponent {
    readonly qExpandChange: EventEmitter<boolean>;
    qExpand: boolean;
    hostClass: string;
    get hostClasses(): string;
    dataQt: string;
    onExpandChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QExpandComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QExpandComponent, "span[qExpand]", never, { "qExpand": { "alias": "qExpand"; "required": false; }; }, { "qExpandChange": "qExpandChange"; }, never, ["*"], true, never>;
    static ngAcceptInputType_qExpand: unknown;
}

type QTableCellDensity = 'small' | 'medium' | 'large';

type QTableCellVariant = 'default' | 'radio' | 'checkbox';

declare class QTableDataCellComponent {
    isNumber: boolean;
    variant: QTableCellVariant;
    density: QTableCellDensity;
    centered: boolean;
    dataQt: string;
    get hostClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableDataCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableDataCellComponent, "td[q-table-cell]", never, { "isNumber": { "alias": "isNumber"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "density": { "alias": "density"; "required": false; }; "centered": { "alias": "centered"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*", "[secondaryValue]", "[primaryDescription]", "[secondaryDescription]", "q-radio-button", "q-checkbox"], true, never>;
    static ngAcceptInputType_isNumber: unknown;
    static ngAcceptInputType_centered: unknown;
}

type QTableSortOrder = string | 'ascend' | 'descend' | null;

type QTableSortFn<T = unknown> = (a: T, b: T, sortOrder?: QTableSortOrder) => number;

declare class QTableHeaderCellComponent<T = unknown> {
    readonly sortChanged: EventEmitter<QTableSortOrder>;
    sortOrder: QTableSortOrder | null;
    sortFn: QTableSortFn<T> | null;
    columnKey: string;
    isSortable: boolean;
    get dataQt(): string;
    _onClick: () => void;
    _onKeyDown: ({ code }: KeyboardEvent) => void;
    clickSubject$: Subject<QTableHeaderCellComponent<T>>;
    private readonly _cdr;
    clearSortOrder(): void;
    private _sortUpdateOnKeyCodeMatch;
    private _updateSortOrder;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableHeaderCellComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableHeaderCellComponent<any>, "th[q-table-cell]", never, { "sortOrder": { "alias": "sortOrder"; "required": false; }; "sortFn": { "alias": "sortFn"; "required": false; }; "columnKey": { "alias": "columnKey"; "required": false; }; "isSortable": { "alias": "isSortable"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "sortChanged": "sortChanged"; }, never, ["*"], true, never>;
    static ngAcceptInputType_isSortable: unknown;
}

declare class QTableSorterComponent {
    sortOrder: QTableSortOrder | null;
    contentTemplate: TemplateRef<unknown> | null;
    dataQt: string;
    get hostClasses(): string;
    private readonly _iconRegistryService;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableSorterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableSorterComponent, "q-table-sorter", never, { "sortOrder": { "alias": "sortOrder"; "required": false; }; "contentTemplate": { "alias": "contentTemplate"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, never, true, never>;
}

type QTablePaginationType = 'button' | 'paginator' | 'infinite';

declare class QTableFooterComponent implements OnInit {
    paginationType: QTablePaginationType;
    totalItems: number;
    currentPage: number;
    pageSize: number;
    infiniteLoading: boolean;
    dataQt: string;
    roundedCorners: boolean;
    readonly rootClass = "q-table-footer";
    private _initialBatchSize;
    private readonly _tableService;
    private readonly _iconRegistry;
    ngOnInit(): void;
    _onPageChanged(page: number): void;
    _increasePageSize(): void;
    _getTranslationPluralization(): string;
    get nextBatchSize(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableFooterComponent, "q-table-footer", never, { "paginationType": { "alias": "paginationType"; "required": false; }; "totalItems": { "alias": "totalItems"; "required": false; }; "currentPage": { "alias": "currentPage"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "infiniteLoading": { "alias": "infiniteLoading"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "roundedCorners": { "alias": "roundedCorners"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_totalItems: unknown;
    static ngAcceptInputType_currentPage: unknown;
    static ngAcceptInputType_pageSize: unknown;
    static ngAcceptInputType_infiniteLoading: unknown;
    static ngAcceptInputType_roundedCorners: unknown;
}

declare class QTableHeaderComponent implements OnInit, AfterContentInit, AfterViewInit {
    dataQt: string;
    _listOfQHeaderCellComponent: QueryList<QTableHeaderCellComponent>;
    _templateRef: TemplateRef<unknown>;
    hostClass: string;
    _isInsideTable: boolean;
    private readonly _tableService;
    private readonly _elementRef;
    private readonly _renderer;
    private readonly _destroy$;
    constructor();
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    private _subscribeToSortUpdates;
    private _removeHeaderInsideTable;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableHeaderComponent, "thead:not(.q-table-thead)", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, ["_listOfQHeaderCellComponent"], ["*"], true, never>;
}

type QTablePaginationMode = 'client' | 'server';

interface QTableSortOperator {
    columnKey: string;
    sortFn: QTableSortFn | null;
    sortOrder: QTableSortOrder;
}

declare class QTableService implements OnDestroy {
    tableData$: Observable<unknown[]>;
    currentPage$: Observable<number>;
    pageSize$: Observable<number>;
    theadTemplate$: Observable<TemplateRef<unknown>>;
    sortOperator$: Observable<QTableSortOperator | null>;
    currentPageData$: Observable<unknown[]>;
    columnCount$: Observable<number>;
    private _tableDataSubject;
    private _currentPageSubject;
    private _pageSizeSubject;
    private _theadTemplateSubject;
    private _sortOperatorSubject;
    private _currentPageDataSubject;
    private _columnCountSubject;
    private _totalItems;
    private _paginationMode;
    private _destroy$;
    constructor();
    ngOnDestroy(): void;
    updateColumnCount(columnCount: number): void;
    updateSortOperator(sortOperator: QTableSortOperator): void;
    updateCurrentPage(pageIndex: number): void;
    updatePageSize(pageSize: number): void;
    setTheadTemplate(template: TemplateRef<unknown>): void;
    updateTableData(data: unknown[]): void;
    updateTotalItems(totalItems: number): void;
    setPaginationMode(mode: QTablePaginationMode): void;
    private _calcCurrentPageData;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QTableService>;
}

declare class QTableRowExpandComponent {
    get qExpand(): boolean;
    set qExpand(value: boolean);
    hostClass: string;
    dataQt: string;
    get hidden(): boolean | null;
    readonly _tableService: QTableService;
    private _qExpand;
    private _hidden;
    _onAnimationDone(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableRowExpandComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableRowExpandComponent, "tr[qExpand]", never, { "qExpand": { "alias": "qExpand"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class QTableRowComponent implements OnInit {
    dataQt: string;
    columns: QueryList<QTableDataCellComponent>;
    hostClass: string;
    _isInsideHeader: boolean;
    private readonly _renderer;
    private readonly _elementRef;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableRowComponent, "tr[q-table-row]", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, ["columns"], ["*"], true, never>;
}

type QTableLayout = 'fixed' | 'auto';

type QTableContentState = 'loading' | 'error' | 'empty' | null;
declare class QTableContentComponent {
    tableLayout: QTableLayout;
    theadTemplate: TemplateRef<unknown> | null;
    contentTemplate: TemplateRef<unknown> | null;
    listOfColWidth: readonly (string | null)[];
    scrollX: string | null;
    scrollY: string | null;
    loading: boolean;
    errorState: boolean;
    empty: boolean;
    showEmptyStateIcon: boolean;
    errorStateTitle: string;
    errorStateDescription: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    emptyStateButton: TemplateRef<unknown> | null;
    dataQt: string;
    private readonly _iconRegistryService;
    get currentState(): QTableContentState;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableContentComponent, "table[q-table-content]", never, { "tableLayout": { "alias": "tableLayout"; "required": false; }; "theadTemplate": { "alias": "theadTemplate"; "required": false; }; "contentTemplate": { "alias": "contentTemplate"; "required": false; }; "listOfColWidth": { "alias": "listOfColWidth"; "required": false; }; "scrollX": { "alias": "scrollX"; "required": false; }; "scrollY": { "alias": "scrollY"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "errorState": { "alias": "errorState"; "required": false; }; "empty": { "alias": "empty"; "required": false; }; "showEmptyStateIcon": { "alias": "showEmptyStateIcon"; "required": false; }; "errorStateTitle": { "alias": "errorStateTitle"; "required": false; }; "errorStateDescription": { "alias": "errorStateDescription"; "required": false; }; "emptyStateTitle": { "alias": "emptyStateTitle"; "required": false; }; "emptyStateDescription": { "alias": "emptyStateDescription"; "required": false; }; "emptyStateButton": { "alias": "emptyStateButton"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_loading: unknown;
    static ngAcceptInputType_errorState: unknown;
    static ngAcceptInputType_empty: unknown;
    static ngAcceptInputType_showEmptyStateIcon: unknown;
}

declare class QTableComponent<T = unknown> implements OnInit, AfterViewInit {
    readonly pageSizeChanged: EventEmitter<number>;
    readonly pageNumberChanged: EventEmitter<number>;
    readonly hitBottom: EventEmitter<boolean>;
    paginationType: QTablePaginationType;
    tableLayout: QTableLayout;
    listOfColWidth: readonly (string | null)[];
    showFooter: boolean;
    infiniteLoading: boolean;
    flexScroll: boolean;
    loading: boolean;
    errorState: boolean;
    showEmptyStateIcon: boolean;
    roundedCorners: boolean;
    dataQt: string;
    errorStateTitle: string;
    errorStateDescription: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    scrollY: string | null;
    scrollX: string | null;
    get totalItems(): number;
    set totalItems(value: number);
    get tableData(): T[];
    set tableData(value: T[]);
    get currentPage(): number;
    set currentPage(value: number);
    get pageSize(): number;
    set pageSize(value: number);
    get paginationMode(): QTablePaginationMode;
    set paginationMode(value: QTablePaginationMode);
    _trList: QueryList<QTableRowComponent>;
    _tableHeaderElement: ElementRef;
    _tableBodyElement: ElementRef;
    currentTableData: T[];
    theadTemplate: TemplateRef<unknown> | null;
    columnCount: number;
    private _tableData;
    private _totalItems;
    private _currentPage;
    private _pageSize;
    private _scroll$;
    private _paginationMode;
    private readonly _tableService;
    private readonly _cdr;
    private readonly _ngZone;
    private readonly _destroy$;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Expand or collapse all rows
     * @param {boolean} expand - Expand or collapse all.
     */
    expandAllRows(expand: boolean): void;
    /**
     * Collapse all rows but expanded one
     * @param {boolean} expanded - Expand state of a row, no logic will be performed if a row was collapsed.
     * @param {string | number} expandedItemId - Expanded row item unique id, so we know which item to keep expanded.
     */
    collapseOtherRows(expanded: boolean, expandedItemId: string | number): void;
    get isEmpty(): boolean;
    get hasFooter(): boolean;
    private _registerTableServiceSubscriptions;
    private _synchronizeHorizontalScroll;
    private _triggerInfiniteScroll;
    private _updateColumnCount;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTableComponent<any>, "q-table", never, { "paginationType": { "alias": "paginationType"; "required": false; }; "tableLayout": { "alias": "tableLayout"; "required": false; }; "listOfColWidth": { "alias": "listOfColWidth"; "required": false; }; "showFooter": { "alias": "showFooter"; "required": false; }; "infiniteLoading": { "alias": "infiniteLoading"; "required": false; }; "flexScroll": { "alias": "flexScroll"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "errorState": { "alias": "errorState"; "required": false; }; "showEmptyStateIcon": { "alias": "showEmptyStateIcon"; "required": false; }; "roundedCorners": { "alias": "roundedCorners"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "errorStateTitle": { "alias": "errorStateTitle"; "required": false; }; "errorStateDescription": { "alias": "errorStateDescription"; "required": false; }; "emptyStateTitle": { "alias": "emptyStateTitle"; "required": false; }; "emptyStateDescription": { "alias": "emptyStateDescription"; "required": false; }; "scrollY": { "alias": "scrollY"; "required": false; }; "scrollX": { "alias": "scrollX"; "required": false; }; "totalItems": { "alias": "totalItems"; "required": false; }; "tableData": { "alias": "tableData"; "required": false; }; "currentPage": { "alias": "currentPage"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "paginationMode": { "alias": "paginationMode"; "required": false; }; }, { "pageSizeChanged": "pageSizeChanged"; "pageNumberChanged": "pageNumberChanged"; "hitBottom": "hitBottom"; }, ["_trList"], ["*", "[q-button][q-table-empty-button],[q-text-button][q-table-empty-button]"], true, never>;
    static ngAcceptInputType_showFooter: unknown;
    static ngAcceptInputType_infiniteLoading: unknown;
    static ngAcceptInputType_flexScroll: unknown;
    static ngAcceptInputType_loading: unknown;
    static ngAcceptInputType_errorState: unknown;
    static ngAcceptInputType_showEmptyStateIcon: unknown;
    static ngAcceptInputType_roundedCorners: unknown;
}

declare class QTableModule {
    private _iconRegistryService;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<QTableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<QTableModule, never, [typeof QTableComponent, typeof QTableRowComponent, typeof QTableHeaderCellComponent, typeof QTableDataCellComponent, typeof QTableSorterComponent, typeof QTableHeaderComponent, typeof QTableContentComponent, typeof QTableFooterComponent, typeof QTableRowExpandComponent, typeof QExpandComponent], [typeof QTableComponent, typeof QTableRowComponent, typeof QTableHeaderCellComponent, typeof QTableDataCellComponent, typeof QTableHeaderComponent, typeof QTableContentComponent, typeof QTableFooterComponent, typeof QTableRowExpandComponent, typeof QExpandComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<QTableModule>;
}

declare const Q_TABLE_COMPONENTS: readonly [typeof QTableComponent, typeof QTableContentComponent, typeof QTableRowComponent, typeof QTableRowExpandComponent, typeof QTableHeaderComponent, typeof QTableFooterComponent, typeof QTableHeaderCellComponent, typeof QTableDataCellComponent, typeof QExpandComponent, typeof QTableSorterComponent];

export { QExpandComponent, QTableComponent, QTableContentComponent, QTableDataCellComponent, QTableFooterComponent, QTableHeaderCellComponent, QTableHeaderComponent, QTableModule, QTableRowComponent, QTableRowExpandComponent, QTableSorterComponent, Q_TABLE_COMPONENTS };
export type { QTableCellDensity, QTableCellVariant, QTableLayout, QTablePaginationType, QTableSortFn, QTableSortOperator, QTableSortOrder };
