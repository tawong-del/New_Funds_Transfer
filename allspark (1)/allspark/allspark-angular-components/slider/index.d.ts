import * as i0 from '@angular/core';
import { OnInit, DoCheck, EventEmitter, Injector, OnChanges, AfterViewInit, OnDestroy, ElementRef, SimpleChanges, QueryList } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';
import { QTooltipDirective } from '@questrade/allspark-angular-components/tooltip';

declare enum QSliderThumbPosition {
    START = 1,
    END = 2
}

interface QSliderThumb {
    min: number;
    max: number;
    step: number;
    value: number;
    translateX: number;
    fillPercentage: number;
    disabled: boolean;
    _thumbPosition: QSliderThumbPosition;
    _hostElement: HTMLInputElement;
    _isFocused: boolean;
    _valueText: string;
    _skipUIUpdate: boolean;
    initProps: () => void;
    initUI: () => void;
    _calcTranslateXByValue: () => number;
    _updateThumbUIByValue: () => void;
    _updateWidthInactive: () => void;
    _updateWidthActive: () => void;
}

interface QSliderRangeThumb extends QSliderThumb {
    _isLeftThumb: boolean;
    getSibling: () => QSliderRangeThumb | null;
    _setIsLeftThumb: () => void;
    _updateStaticStyles: () => void;
    _updateMinMax: () => void;
}

interface QSliderVisualThumb {
    _isActive: boolean;
    _hostElement: HTMLElement;
}

interface QSlider {
    min: number;
    max: number;
    step: number;
    minDistance: number;
    disabled: boolean;
    _isRange: boolean;
    _cachedWidth: number;
    _cachedLeft: number;
    _inputPadding: number;
    _hasAnimation: boolean;
    _getInput: (thumbPosition: QSliderThumbPosition) => QSliderThumb | QSliderRangeThumb | null;
    _getThumb: (thumbPosition: QSliderThumbPosition) => QSliderVisualThumb;
    _isCursorOnSliderThumb: (event: PointerEvent, rect: DOMRect) => boolean;
    _onValueChange: (source: QSliderThumb) => void;
    _onTranslateXChange: (source: QSliderThumb) => void;
    _updateDimensions: () => void;
    _updateTrackUI: (source: QSliderThumb) => void;
    _setTransition: (withAnimation: boolean) => void;
}

interface QSliderDragEvent {
    source: QSliderThumb;
    parent: QSlider;
    value: number;
}

declare class QSliderThumbDirective extends ErrorState implements QSliderThumb, OnInit, DoCheck, ControlValueAccessor, FormFieldControl {
    readonly valueChange: EventEmitter<number>;
    readonly dragStart: EventEmitter<QSliderDragEvent>;
    readonly dragEnd: EventEmitter<QSliderDragEvent>;
    errorStateMatcher: ErrorStateMatcherInterface;
    get value(): number;
    set value(value: number);
    hostClass: string;
    hostType: string;
    get ariaValueText(): string;
    _onBlur(): void;
    _onFocus(): void;
    _onChange(): void;
    _onInput(): void;
    controlId: string;
    _thumbPosition: QSliderThumbPosition;
    _hostElement: HTMLInputElement;
    _valueText: string;
    _initialValue: string;
    _knobRadius: number;
    _tickMarkOffset: number;
    _isActive: boolean;
    _isFocused: boolean;
    _skipUIUpdate: boolean;
    _touched: boolean;
    protected _onChangeFn: (value: number) => void;
    protected _isControlInitialized: boolean;
    protected readonly _slider: QSlider;
    protected readonly _injector: Injector;
    private _translateX;
    private _hasSetInitialValue;
    private _formControl;
    private _onTouchedFn;
    private readonly _platform;
    private readonly _ngZone;
    private readonly _elementRef;
    private readonly _cdr;
    private readonly _destroy$;
    constructor(parentFormGroup: FormGroupDirective | null, parentForm: NgForm | null);
    ngOnInit(): void;
    ngDoCheck(): void;
    initProps(): void;
    initUI(): void;
    _initValue(): void;
    _getDefaultValue(): number;
    _onNgControlValueChange(): void;
    _onPointerDown(event: Event): void;
    _fixValue(event: PointerEvent): void;
    _onPointerMove(event: Event): void;
    _onPointerUp(): void;
    _clamp(value: number): number;
    _calcTranslateXByValue(): number;
    _calcTranslateXByPointerEvent(event: PointerEvent): number;
    _updateWidthActive(): void;
    _updateWidthInactive(): void;
    _updateThumbUIByValue(options?: {
        withAnimation: boolean;
    }): void;
    _updateThumbUIByPointerEvent(event: PointerEvent, options?: {
        withAnimation: boolean;
    }): void;
    _updateThumbUI(options?: {
        withAnimation: boolean;
    }): void;
    /** @hidden */
    writeValue(value: number): void;
    /** @hidden */
    registerOnChange(fn: (value: number) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    focus(): void;
    blur(): void;
    get translateX(): number;
    set translateX(value: number);
    get min(): number;
    set min(value: number);
    get max(): number;
    set max(value: number);
    get step(): number;
    set step(value: number);
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Calculates the percentage of the current slider value (compared to the max slider value). */
    get percentage(): number;
    /** Calculates the percentage of the active/filled track */
    get fillPercentage(): number;
    protected _setValue(value: string): void;
    private _attachInputEventListeners;
    private _setIsFocused;
    private _handleValueCorrection;
    private _setComponentControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSliderThumbDirective, [{ optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QSliderThumbDirective, "input[qSliderThumb]", never, { "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "dragStart": "dragStart"; "dragEnd": "dragEnd"; }, never, never, true, never>;
    static ngAcceptInputType_value: unknown;
}

declare class QSliderRangeThumbDirective extends QSliderThumbDirective implements QSliderRangeThumb {
    _isLeftThumb: boolean;
    _isEndThumb: boolean;
    private _sibling;
    constructor();
    getSibling(): QSliderRangeThumb | null;
    getMinPos(): number;
    getMaxPos(): number;
    _setIsLeftThumb(): void;
    _updateMinMax(): void;
    _updateStaticStyles(): void;
    _getDefaultValue(): number;
    _onInput(): void;
    _onNgControlValueChange(): void;
    _onPointerDown(event: PointerEvent): void;
    _onPointerUp(): void;
    _onPointerMove(event: PointerEvent): void;
    _fixValue(event: PointerEvent): void;
    _clamp(value: number): number;
    _updateWidthInactive(): void;
    writeValue(value: number): void;
    _setValue(value: string): string;
    private _updateSibling;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSliderRangeThumbDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QSliderRangeThumbDirective, "input[qSliderStartThumb], input[qSliderEndThumb]", never, {}, {}, never, never, true, never>;
}

declare class QSliderVisualThumbComponent implements QSliderVisualThumb, OnChanges, AfterViewInit, OnDestroy {
    readonly focusChange: EventEmitter<boolean>;
    readonly keyboardFocusChange: EventEmitter<boolean>;
    readonly hoverChange: EventEmitter<boolean>;
    tooltip: boolean;
    disabled: boolean;
    thumbPosition: QSliderThumbPosition;
    valueIndicatorText: string;
    _knob: ElementRef<HTMLElement>;
    _tooltipDirective: QTooltipDirective;
    hostClass: string;
    _isActive: boolean;
    _isValueIndicatorVisible: boolean;
    _hostElement: HTMLElement;
    private _isFocused;
    private _isHovered;
    private _sliderInput;
    private _sliderInputEl;
    private readonly _ngZone;
    private readonly _elementRef;
    private readonly _slider;
    private readonly _destroy$;
    private readonly _focusMonitor;
    private readonly _platform;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _getSibling(): QSliderVisualThumb;
    _getKnob(): HTMLElement;
    _hideTooltip(): void;
    _showTooltip(): void;
    get isMobile(): boolean;
    get isFocused(): boolean;
    set isFocused(value: boolean);
    get isHovered(): boolean;
    set isHovered(value: boolean);
    private _attachInputEventListeners;
    private _onPointerMove;
    private _onMouseLeave;
    private _onFocus;
    private _onBlur;
    private _onDragStart;
    private _onDragEnd;
    private _onChange;
    private _dispatchKnobMouseEvent;
    private _updateTooltipPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSliderVisualThumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QSliderVisualThumbComponent, "q-slider-visual-thumb", never, { "tooltip": { "alias": "tooltip"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "thumbPosition": { "alias": "thumbPosition"; "required": false; }; "valueIndicatorText": { "alias": "valueIndicatorText"; "required": false; }; }, { "focusChange": "focusChange"; "keyboardFocusChange": "keyboardFocusChange"; "hoverChange": "hoverChange"; }, never, never, true, never>;
    static ngAcceptInputType_disabled: unknown;
}

type QSliderSize = 'small' | 'medium';

declare enum QSliderTickMark {
    ACTIVE = 0,
    INACTIVE = 1
}

declare class QSliderComponent implements AfterViewInit, OnDestroy, QSlider {
    size: QSliderSize;
    valueLabel: boolean;
    displayWith: (value: number) => string;
    dataQt: string;
    get showTickMarks(): boolean;
    set showTickMarks(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get tooltip(): boolean;
    set tooltip(value: boolean);
    get min(): number;
    set min(value: number);
    get max(): number;
    set max(value: number);
    get step(): number;
    set step(value: number);
    get minDistance(): number;
    set minDistance(value: number);
    _inputs: QueryList<QSliderRangeThumb>;
    _input: QSliderThumb;
    _thumbs: QueryList<QSliderVisualThumb>;
    _trackActive: ElementRef<HTMLElement>;
    _startThumbFocusIndicator: ElementRef<HTMLElement>;
    _endThumbFocusIndicator: ElementRef<HTMLElement>;
    _startVisualThumb: QSliderVisualThumbComponent;
    _endVisualThumb: QSliderVisualThumbComponent;
    get hostClassNames(): string;
    _tickMarks: QSliderTickMark[];
    _cachedWidth: number;
    _cachedLeft: number;
    _inputPadding: number;
    _tickMarkTrackWidth: number;
    _knobRadius: number;
    _startValueIndicatorText: string;
    _endValueIndicatorText: string;
    _endThumbTransform: string;
    _startThumbTransform: string;
    _isRange: boolean;
    _hasAnimation: boolean;
    _startThumbHoverVisible: boolean;
    _endThumbHoverVisible: boolean;
    _startThumbFocusVisible: boolean;
    _endThumbFocusVisible: boolean;
    _startThumbKeyboardFocusVisible: boolean;
    _endThumbKeyboardFocusVisible: boolean;
    private _disabled;
    private _tooltip;
    private _min;
    private _max;
    private _minDistance;
    private _step;
    private _showTickMarks;
    private _dirChangeSubscription;
    private _resizeObserver;
    private _hasViewInitialized;
    private _resizeTimer;
    private _thumbsOverlap;
    private readonly _platform;
    private readonly _ngZone;
    private readonly _cdr;
    private readonly _elementRef;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _updateDimensions(): void;
    _setTrackActiveStyles(styles: {
        left: string;
        right: string;
        transform: string;
        transformOrigin: string;
    }): void;
    _calcTickMarkTransform(index: number): string;
    _onTranslateXChange(source: QSliderThumb): void;
    _onTranslateXChangeBySideEffect(input1: QSliderRangeThumb, input2: QSliderRangeThumb): void;
    _onValueChange(source: QSliderThumb): void;
    _onMinMaxOrStepChange(): void;
    _onResize(): void;
    _updateThumbUI(source: QSliderThumb): void;
    _updateValueIndicatorUI(source: QSliderThumb): void;
    _updateTickMarkUI(): void;
    _updateTrackUI(source: QSliderThumb | null): void;
    _getInput(thumbPosition: QSliderThumbPosition): QSliderThumb | QSliderRangeThumb | null;
    _getThumb(thumbPosition: QSliderThumbPosition): QSliderVisualThumb;
    _setTransition(withAnimation: boolean): void;
    _isCursorOnSliderThumb(event: PointerEvent, rect: DOMRect): boolean;
    _thumbFocusChange(focused: boolean, thumb: QSliderVisualThumbComponent): void;
    _thumbKeyboardFocusChange(focused: boolean, thumb: QSliderVisualThumbComponent): void;
    _thumbHoverChange(hovered: boolean, thumb: QSliderVisualThumbComponent): void;
    private _handleTooltipVisibility;
    private _initUINonRange;
    private _initUIRange;
    private _updateMin;
    private _updateMax;
    private _updateMinRange;
    private _updateMinNonRange;
    private _observeHostResize;
    private _isActive;
    private _getValue;
    private _skipUpdate;
    private _areThumbsOverlapping;
    private _updateOverlappingThumbClassNames;
    private _updateOverlappingThumbUI;
    private _updateValueIndicatorUIs;
    private _updateTickMarkTrackUI;
    private _updateTrackUIRange;
    private _updateTrackUINonRange;
    private _updateTickMarkUINonRange;
    private _updateTickMarkUIRange;
    private _updateStep;
    private _updateStepRange;
    private _updateStepNonRange;
    private _updateMaxRange;
    private _updateMaxNonRange;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QSliderComponent, "q-slider", never, { "size": { "alias": "size"; "required": false; }; "valueLabel": { "alias": "valueLabel"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "showTickMarks": { "alias": "showTickMarks"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "step": { "alias": "step"; "required": false; }; "minDistance": { "alias": "minDistance"; "required": false; }; }, {}, ["_input", "_inputs"], ["*"], true, never>;
    static ngAcceptInputType_valueLabel: unknown;
    static ngAcceptInputType_showTickMarks: unknown;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_tooltip: unknown;
    static ngAcceptInputType_min: unknown;
    static ngAcceptInputType_max: unknown;
    static ngAcceptInputType_step: unknown;
    static ngAcceptInputType_minDistance: unknown;
}

declare const Q_SLIDER_COMPONENTS: readonly [typeof QSliderComponent, typeof QSliderThumbDirective, typeof QSliderRangeThumbDirective];

export { QSliderComponent, QSliderRangeThumbDirective, QSliderThumbDirective, QSliderThumbPosition, QSliderTickMark, Q_SLIDER_COMPONENTS };
export type { QSliderDragEvent, QSliderSize };
