import * as i0 from '@angular/core';
import { ElementRef, OnInit, AfterViewInit, EventEmitter, TemplateRef } from '@angular/core';
import { QSpinnerSize } from '@questrade/allspark-angular-components/spinner';
import * as i1 from '@questrade/allspark-angular-components/popover';

declare class QAdvancedDropdownOriginDirective {
    elementRef: ElementRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<QAdvancedDropdownOriginDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QAdvancedDropdownOriginDirective, "[qAdvancedDropdownOrigin]", ["qAdvancedDropdownOrigin"], {}, {}, never, never, true, never>;
}

type QAdvancedDropdownLoadingVariant = 'spinner' | 'skeleton';

type QFooterButtons = 'single' | 'dual';

declare class QAdvancedDropdownComponent implements OnInit, AfterViewInit {
    readonly primaryButtonClicked: EventEmitter<Event>;
    readonly secondaryButtonClicked: EventEmitter<Event>;
    readonly linkClicked: EventEmitter<Event>;
    readonly opened: EventEmitter<void>;
    readonly closed: EventEmitter<void>;
    title: string;
    linkButtonText: string;
    secondaryButtonText: string;
    primaryButtonText: string;
    footerButtons: QFooterButtons;
    loadingVariant: QAdvancedDropdownLoadingVariant;
    loadingSpinnerSize: QSpinnerSize;
    loadingSkeletonTemplate: TemplateRef<unknown> | null;
    showHeaderIcon: boolean;
    showHeader: boolean;
    showFooter: boolean;
    showSecondaryButton: boolean;
    fitTriggerWidth: boolean;
    loading: boolean;
    dataQt: string;
    get dropdownTrigger(): QAdvancedDropdownOriginDirective | null;
    set dropdownTrigger(value: QAdvancedDropdownOriginDirective | null);
    _dropdownContentTemplate: TemplateRef<HTMLElement>;
    readonly _rootClass: string;
    _popoverAttr: string;
    isMobileView: boolean;
    isOpened: boolean;
    private _dropdownTrigger;
    private readonly _destroy$;
    private readonly _iconRegistry;
    private readonly _cdr;
    private readonly _breakpointObserver;
    private readonly _popoverDirective;
    private readonly _elementRef;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    open(): void;
    close(): void;
    /**
     * @param force A boolean, which causes toggle to behave like open or close.
     * If set to true, the advanced dropdown is opened if it was initially closed. If it was initially opened, nothing happens.
     * If set to false, the advanced dropdown is closed if it was initially opened. If it was initially closed, nothing happens.
     */
    toggle(force?: boolean): void;
    onPrimaryButtonClick(event: Event): void;
    onSecondaryButtonClick(event: Event): void;
    onLinkClicked(event: Event): void;
    get isSkeleton(): boolean;
    private _fitContainerToTrigger;
    static ɵfac: i0.ɵɵFactoryDeclaration<QAdvancedDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QAdvancedDropdownComponent, "q-advanced-dropdown", never, { "title": { "alias": "title"; "required": false; }; "linkButtonText": { "alias": "linkButtonText"; "required": false; }; "secondaryButtonText": { "alias": "secondaryButtonText"; "required": false; }; "primaryButtonText": { "alias": "primaryButtonText"; "required": false; }; "footerButtons": { "alias": "footerButtons"; "required": false; }; "loadingVariant": { "alias": "loadingVariant"; "required": false; }; "loadingSpinnerSize": { "alias": "loadingSpinnerSize"; "required": false; }; "loadingSkeletonTemplate": { "alias": "loadingSkeletonTemplate"; "required": false; }; "showHeaderIcon": { "alias": "showHeaderIcon"; "required": false; }; "showHeader": { "alias": "showHeader"; "required": false; }; "showFooter": { "alias": "showFooter"; "required": false; }; "showSecondaryButton": { "alias": "showSecondaryButton"; "required": false; }; "fitTriggerWidth": { "alias": "fitTriggerWidth"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "dropdownTrigger": { "alias": "dropdownTrigger"; "required": false; }; }, { "primaryButtonClicked": "primaryButtonClicked"; "secondaryButtonClicked": "secondaryButtonClicked"; "linkClicked": "linkClicked"; "opened": "opened"; "closed": "closed"; }, ["_dropdownContentTemplate"], never, true, [{ directive: typeof i1.QPopoverDirective; inputs: { "qPopoverOffset": "offset"; "qPopoverPlacement": "placement"; }; outputs: {}; }]>;
    static ngAcceptInputType_showHeaderIcon: unknown;
    static ngAcceptInputType_showHeader: unknown;
    static ngAcceptInputType_showFooter: unknown;
    static ngAcceptInputType_showSecondaryButton: unknown;
    static ngAcceptInputType_fitTriggerWidth: unknown;
    static ngAcceptInputType_loading: unknown;
}

export { QAdvancedDropdownComponent, QAdvancedDropdownOriginDirective };
export type { QAdvancedDropdownLoadingVariant, QFooterButtons };
