import * as i0 from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

type QListItemRightColumnAlignment = 'left' | 'right';

type QListItemDensity = 'default' | 'compact' | 'comfortable';

type QListItemIconPosition = 'top' | 'center' | 'bottom';

type QListItemRowGap = 0 | 4 | 8;

type QListItemVariant = 'primary' | 'secondary';

declare const leftColumnWidthLabel = "_leftColumnWidth";
declare const rightColumnWidthLabel = "_rightColumnWidth";
declare class QListItemComponent implements AfterViewInit, OnChanges {
    variant: QListItemVariant;
    density: QListItemDensity;
    rightColumnAlignment: QListItemRightColumnAlignment;
    interactiveIconPosition: QListItemIconPosition;
    /**
     * @deprecated Use `--awds-list-item-row-gap` token instead.
     * @breaking-change First major after 13 Aug 2026
     */
    rowGap: QListItemRowGap;
    done: boolean;
    dataQt: string;
    disabled: boolean | null;
    set leftColumnWidth(value: number | string);
    get leftColumnWidth(): string;
    set rightColumnWidth(value: number | string);
    get rightColumnWidth(): string;
    get tabIndex(): number;
    set tabIndex(value: number);
    get hostClassNames(): string;
    _onKeyDown(event: Event): void;
    _onKeyUp(event: Event): void;
    private [leftColumnWidthLabel];
    private [rightColumnWidthLabel];
    private _pressed;
    private _tabIndex;
    private _leftRows;
    private _rightRows;
    private readonly _changeDetectorRef;
    private readonly _elementRef;
    private readonly _sharedResizeObserverService;
    private readonly _destroy$;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    _onContentChange(): void;
    private _updateColumnWidth;
    private _setRows;
    private _adjustRowsMinHeight;
    private _removeRowsMinHeight;
    private _setMinHeightStyle;
    private _removeMinHeightStyle;
    private _setupResizeObserver;
    static ɵfac: i0.ɵɵFactoryDeclaration<QListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QListItemComponent, "li[q-list-item], li[qListItem], a[q-nav-list-item], a[qNavListItem], button[q-nav-list-item], button[qNavListItem]", never, { "variant": { "alias": "variant"; "required": false; }; "density": { "alias": "density"; "required": false; }; "rightColumnAlignment": { "alias": "rightColumnAlignment"; "required": false; }; "interactiveIconPosition": { "alias": "interactiveIconPosition"; "required": false; }; "rowGap": { "alias": "rowGap"; "required": false; }; "done": { "alias": "done"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "leftColumnWidth": { "alias": "leftColumnWidth"; "required": false; }; "rightColumnWidth": { "alias": "rightColumnWidth"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; }, {}, never, ["*", "q-interactive-icon[left], q-icon[left]", "[leftColumn]", "[rightColumn]", "q-interactive-icon[right], q-icon[right]", "button[right]", "q-chip[right]", "q-switch[right]", "button[bottom]", "q-chip[bottom]", "q-switch[bottom]"], true, never>;
    static ngAcceptInputType_rowGap: unknown;
    static ngAcceptInputType_done: unknown;
}

declare class QListComponent {
    dataQt: string;
    inset: boolean;
    get hostClassNames(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QListComponent, "ul[q-list], ul[qList], ol[q-list], ol[qList], nav[q-nav-list], nav[qNavList]", never, { "dataQt": { "alias": "dataQt"; "required": false; }; "inset": { "alias": "inset"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_inset: unknown;
}

declare const Q_LIST_COMPONENTS: readonly [typeof QListComponent, typeof QListItemComponent];

export { QListComponent, QListItemComponent, Q_LIST_COMPONENTS };
export type { QListItemDensity, QListItemIconPosition, QListItemRightColumnAlignment, QListItemRowGap, QListItemVariant };
