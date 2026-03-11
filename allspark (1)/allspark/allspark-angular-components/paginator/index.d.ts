import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';
import { QDropmenuOption } from '@questrade/allspark-angular-components/dropmenu';
import { BehaviorSubject } from 'rxjs';

type QItemsInfoPosition = 'left' | 'right';

declare class QPaginatorComponent {
    readonly changed: EventEmitter<number>;
    itemsInfoPosition: QItemsInfoPosition;
    showPagesInfo: boolean;
    dataQt: string;
    get currentPage(): number;
    set currentPage(value: number);
    get totalItems(): number;
    set totalItems(value: number);
    get pageSize(): number;
    set pageSize(value: number);
    _hostClass: string;
    _currentPageFirstItem$: BehaviorSubject<number>;
    _currentPageLastItem$: BehaviorSubject<number>;
    _numberOfPages$: BehaviorSubject<number>;
    _dropdownOptions: QDropmenuOption<number>[];
    private _currentPage;
    private _totalItems;
    private _pageSize;
    private readonly _cd;
    private readonly _iconRegistry;
    constructor();
    _changePage(event: QDropmenuOption<number> | QDropmenuOption<number>[]): void;
    _goNextPage(): void;
    _goPreviousPage(): void;
    _isFirstPage(): boolean;
    _isLastPage(): boolean;
    private _getNumberOfPages;
    private _updateLabels;
    private _updatePagesOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<QPaginatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QPaginatorComponent, "q-paginator", never, { "itemsInfoPosition": { "alias": "itemsInfoPosition"; "required": false; }; "showPagesInfo": { "alias": "showPagesInfo"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "currentPage": { "alias": "currentPage"; "required": false; }; "totalItems": { "alias": "totalItems"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; }, { "changed": "changed"; }, never, never, true, never>;
    static ngAcceptInputType_showPagesInfo: unknown;
}

export { QPaginatorComponent };
export type { QItemsInfoPosition };
