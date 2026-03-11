import * as i0 from '@angular/core';
import { OnInit, OnChanges, EventEmitter, TemplateRef, SimpleChanges } from '@angular/core';

type QBannerDensity = 'default' | 'compact';

type QBannerHierarchy = 'low' | 'high';

type QBannerStackButtonsMode = 'always' | 'never' | 'auto';

type QBannerVariant = 'informative' | 'auxiliary' | 'highlight' | 'success' | 'danger' | 'warning';

declare class QBannerComponent implements OnInit, OnChanges {
    readonly closeIconClick: EventEmitter<Event>;
    title: string;
    icon: string;
    variant: QBannerVariant;
    density: QBannerDensity;
    hierarchy: QBannerHierarchy;
    titleTemplate: TemplateRef<unknown> | null;
    stackButtonsMode: QBannerStackButtonsMode;
    stackButtonsBreakpoint: number;
    rounded: boolean;
    showCloseIcon: boolean;
    dataQt: string;
    _hostRole: string;
    _hostTitle: string;
    get hostClasses(): string;
    private _bannerButtonsStacked;
    private readonly _iconRegistry;
    private readonly _destroy$;
    private readonly _breakpointObserver;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _onCloseIconClick(event: Event): void;
    get _titleVisible(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<QBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QBannerComponent, "q-banner", never, { "title": { "alias": "title"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "density": { "alias": "density"; "required": false; }; "hierarchy": { "alias": "hierarchy"; "required": false; }; "titleTemplate": { "alias": "titleTemplate"; "required": false; }; "stackButtonsMode": { "alias": "stackButtonsMode"; "required": false; }; "stackButtonsBreakpoint": { "alias": "stackButtonsBreakpoint"; "required": false; }; "rounded": { "alias": "rounded"; "required": false; }; "showCloseIcon": { "alias": "showCloseIcon"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "closeIconClick": "closeIconClick"; }, never, ["*", "[q-banner-actions]"], true, never>;
    static ngAcceptInputType_stackButtonsBreakpoint: unknown;
    static ngAcceptInputType_rounded: unknown;
    static ngAcceptInputType_showCloseIcon: unknown;
}

export { QBannerComponent };
export type { QBannerDensity, QBannerStackButtonsMode, QBannerVariant };
