import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';

type QCarouselSize = 'small' | 'medium' | 'large';

type QCarouselVariant = 'tight' | 'comfortable';

declare class QCarouselComponent implements OnInit, AfterViewInit, OnChanges {
    readonly changed: EventEmitter<number>;
    centered: boolean;
    absolute: boolean;
    type: QCarouselVariant;
    size: QCarouselSize;
    dataQt: string;
    set marginTop(value: number);
    set marginBottom(value: number);
    set items(value: number);
    set active(value: number);
    activeItemRef: ElementRef<HTMLElement>;
    get hostClasses(): string;
    _activeItemIndicatorXPosition: number;
    _activeItem: number;
    _animateRight: boolean;
    _animateLeft: boolean;
    _indicatorsCount: number;
    private _oldActiveItem;
    private _activeOffset;
    private readonly _destroy$;
    private readonly _resizeObserver;
    private readonly _elementRef;
    private readonly _renderer;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    _numSequence(n: number): number[];
    _onClick(active: number): void;
    get gapSize(): number;
    get growSize(): number;
    get itemSize(): number;
    private _getComputedStyle;
    private _initializeResizeObserver;
    private _getGapSize;
    private _getItemSize;
    private _resetActiveItem;
    private _updateActiveIndicator;
    private _animate;
    static ɵfac: i0.ɵɵFactoryDeclaration<QCarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QCarouselComponent, "q-carousel", never, { "centered": { "alias": "centered"; "required": false; }; "absolute": { "alias": "absolute"; "required": false; }; "type": { "alias": "type"; "required": false; }; "size": { "alias": "size"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "marginTop": { "alias": "marginTop"; "required": false; }; "marginBottom": { "alias": "marginBottom"; "required": false; }; "items": { "alias": "items"; "required": false; }; "active": { "alias": "active"; "required": false; }; }, { "changed": "changed"; }, never, never, true, never>;
    static ngAcceptInputType_centered: unknown;
    static ngAcceptInputType_absolute: unknown;
}

export { QCarouselComponent };
export type { QCarouselSize, QCarouselVariant };
