import { AnimationEvent } from '@angular/animations';
import * as i0 from '@angular/core';
import { EventEmitter, OnDestroy, AfterViewInit, InjectionToken } from '@angular/core';
import { OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';

interface TooltipAnimationPosition {
    x: number;
    y: number;
}
declare class QTooltipComponent {
    readonly closeAnimationDone: EventEmitter<void>;
    value: string;
    dataQt: string;
    showDelay: number;
    hideDelay: number;
    get isOpen(): boolean;
    set isOpen(value: boolean);
    get position(): string | null;
    set position(value: string | null);
    hostClass: string;
    _isOpen: boolean;
    _position: string | null;
    private readonly _changeDetectorRef;
    _markForCheck(): void;
    _onAnimationDone(event: AnimationEvent): void;
    get translationValues(): TooltipAnimationPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QTooltipComponent, "q-tooltip", never, { "value": { "alias": "value"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "showDelay": { "alias": "showDelay"; "required": false; }; "hideDelay": { "alias": "hideDelay"; "required": false; }; }, { "closeAnimationDone": "closeAnimationDone"; }, never, never, true, never>;
    static ngAcceptInputType_showDelay: unknown;
    static ngAcceptInputType_hideDelay: unknown;
}

type QTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

declare class QTooltipDirective implements OnDestroy, AfterViewInit {
    placement: QTooltipPosition;
    showDelay: number;
    hideDelay: number;
    longPressDelay: number;
    tooltipValue: string;
    dataQt: string;
    touchendHideDelay: number;
    _onMouseEnter(): void;
    _onMouseLeave(event: MouseEvent): void;
    _onWheelMove(event: WheelEvent): void;
    _onTouchStart(): void;
    _onTouchEnd(): void;
    _overlayRef: OverlayRef | null;
    private _tooltipComponent;
    private _hideTimeout;
    private _showTimeout;
    private readonly _overlay;
    private readonly _elementRef;
    private readonly _destroy$;
    private readonly _platform;
    private readonly _ngZone;
    private readonly _focusMonitor;
    private readonly _document;
    private readonly _isMobilePlatform;
    private readonly _scrollDispatcher;
    private readonly _overlayContainer;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    _getPositions(): ConnectedPosition[];
    _getTooltipElement(): QTooltipComponent | null;
    private _show;
    private _hide;
    private _createAndAttachTooltip;
    private _disposeTooltip;
    private _initializeTooltipProperties;
    private _relocateOverlayContainer;
    private _clearShowTimer;
    private _clearHideTimer;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QTooltipDirective, "[qTooltip]", never, { "placement": { "alias": "qTooltipPosition"; "required": false; }; "showDelay": { "alias": "qTooltipShowDelay"; "required": false; }; "hideDelay": { "alias": "qTooltipHideDelay"; "required": false; }; "longPressDelay": { "alias": "qTooltipLongPressDelay"; "required": false; }; "tooltipValue": { "alias": "qTooltip"; "required": false; }; "dataQt": { "alias": "qTooltipDataQt"; "required": false; }; "touchendHideDelay": { "alias": "qTooltipTouchendHideDelay"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_showDelay: unknown;
    static ngAcceptInputType_hideDelay: unknown;
    static ngAcceptInputType_longPressDelay: unknown;
    static ngAcceptInputType_touchendHideDelay: unknown;
}

interface QTooltipOptions {
    showDelay?: number;
    hideDelay?: number;
}

declare const TOOLTIP_DEFAULT_OPTIONS: QTooltipOptions;
declare const TOOLTIP_OPTIONS: InjectionToken<QTooltipOptions>;

export { QTooltipComponent, QTooltipDirective, TOOLTIP_DEFAULT_OPTIONS, TOOLTIP_OPTIONS };
export type { QTooltipOptions, QTooltipPosition };
