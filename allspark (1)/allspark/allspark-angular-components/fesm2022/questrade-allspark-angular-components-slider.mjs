import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, inject, Injector, NgZone, ElementRef, ChangeDetectorRef, numberAttribute, booleanAttribute, forwardRef, HostListener, HostBinding, Input, Output, Optional, Directive, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, Component, ViewChildren, ContentChild, ContentChildren } from '@angular/core';
import * as i1 from '@angular/forms';
import { NgControl, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm } from '@angular/forms';
import { QPlatformService, QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';
import { ErrorState, voidFn, isPresent } from '@questrade/allspark-angular-components/core/utils';
import { fromEvent, filter, takeUntil, debounceTime, delay } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { NgIf, NgFor } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';
import { QTooltipDirective } from '@questrade/allspark-angular-components/tooltip';

var QSliderThumbPosition;
(function (QSliderThumbPosition) {
    QSliderThumbPosition[QSliderThumbPosition["START"] = 1] = "START";
    QSliderThumbPosition[QSliderThumbPosition["END"] = 2] = "END";
})(QSliderThumbPosition || (QSliderThumbPosition = {}));

const Q_SLIDER_THUMB = new InjectionToken('QSliderThumb');
const Q_SLIDER_VISUAL_THUMB = new InjectionToken('QSliderVisualThumb');
const Q_SLIDER_RANGE_THUMB = new InjectionToken('QSliderRangeThumb');
const Q_SLIDER = new InjectionToken('QSlider');

class QSliderThumbDirective extends ErrorState {
    valueChange = new EventEmitter();
    dragStart = new EventEmitter();
    dragEnd = new EventEmitter();
    errorStateMatcher = new ErrorStateMatcher();
    get value() {
        return +this._hostElement.value;
    }
    set value(value) {
        value = isNaN(value) ? 0 : value;
        const stringValue = value + '';
        if (!this._hasSetInitialValue) {
            this._initialValue = stringValue;
            return;
        }
        if (this._isActive)
            return;
        this._setValue(stringValue);
    }
    hostClass = 'q-slider-input';
    hostType = 'range';
    get ariaValueText() {
        return this._valueText;
    }
    _onBlur() {
        this._setIsFocused(false);
        this._onTouchedFn();
    }
    _onFocus() {
        this._slider._setTransition(false);
        this._slider._updateTrackUI(this);
        this._setIsFocused(true);
    }
    _onChange() {
        this.valueChange.emit(this.value);
        if (this._isActive) {
            this._updateThumbUIByValue({ withAnimation: true });
        }
    }
    _onInput() {
        this._onChangeFn(this.value);
        if (this._slider.step || !this._isActive) {
            this._updateThumbUIByValue({ withAnimation: true });
        }
        this._slider._onValueChange(this);
    }
    controlId = '';
    _thumbPosition = QSliderThumbPosition.END;
    _hostElement;
    _valueText = '';
    _initialValue = '';
    _knobRadius = 8;
    _tickMarkOffset = 4;
    _isActive = false;
    _isFocused = false;
    _skipUIUpdate = false;
    _touched = false;
    _onChangeFn = voidFn;
    _isControlInitialized = false;
    _slider = inject(Q_SLIDER);
    _injector = inject(Injector);
    _translateX;
    _hasSetInitialValue = false;
    _formControl = null;
    _onTouchedFn = () => {
        this._touched = true;
    };
    _platform = inject(QPlatformService);
    _ngZone = inject(NgZone);
    _elementRef = inject((ElementRef));
    _cdr = inject(ChangeDetectorRef);
    _destroy$ = inject(QDestroyService);
    constructor(parentFormGroup, parentForm) {
        super(parentFormGroup, parentForm);
        this._hostElement = this._elementRef.nativeElement;
        this.controlId = this._hostElement.getAttribute('id') || '';
        this._attachInputEventListeners();
    }
    ngOnInit() {
        this._setComponentControl();
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
        }
    }
    initProps() {
        this._updateWidthInactive();
        if (this.disabled !== this._slider.disabled) {
            this._slider.disabled = true;
        }
        this.step = this._slider.step;
        this.min = this._slider.min;
        this.max = this._slider.max;
        this._initValue();
    }
    initUI() {
        this._updateThumbUIByValue();
    }
    _initValue() {
        this._hasSetInitialValue = true;
        if (!isPresent(this._initialValue)) {
            this.value = this._getDefaultValue();
        }
        else {
            this._hostElement.value = this._initialValue;
            this._updateThumbUIByValue();
            this._slider._onValueChange(this);
            this._cdr.detectChanges();
        }
    }
    _getDefaultValue() {
        return this.min;
    }
    _onNgControlValueChange() {
        if (!this._isActive || !this._isFocused) {
            this._slider._onValueChange(this);
            this._updateThumbUIByValue();
        }
        this._slider.disabled = this._formControl?.disabled ?? false;
    }
    _onPointerDown(event) {
        const pointerEvent = event;
        if (this.disabled || pointerEvent.button !== 0)
            return;
        if (this._platform.IOS) {
            const isCursorOnSliderThumb = this._slider._isCursorOnSliderThumb(pointerEvent, this._slider._getThumb(this._thumbPosition)._hostElement.getBoundingClientRect());
            this._isActive = isCursorOnSliderThumb;
            this._updateWidthActive();
            this._slider._updateDimensions();
            return;
        }
        this._isActive = true;
        this._setIsFocused(true);
        this._updateWidthActive();
        this._slider._updateDimensions();
        if (!this._slider.step) {
            this._updateThumbUIByPointerEvent(pointerEvent, { withAnimation: true });
        }
        if (!this.disabled) {
            this._handleValueCorrection(pointerEvent);
            this.dragStart.emit({ source: this, parent: this._slider, value: this.value });
        }
    }
    _fixValue(event) {
        const xPos = event.clientX - this._slider._cachedLeft;
        const width = this._slider._cachedWidth;
        const step = this._slider.step === 0 ? 1 : this._slider.step;
        const numSteps = Math.floor((this._slider.max - this._slider.min) / step);
        const percentage = xPos / width;
        const fixedPercentage = Math.round(percentage * numSteps) / numSteps;
        const impreciseValue = fixedPercentage * (this._slider.max - this._slider.min) + this._slider.min;
        const value = Math.round(impreciseValue / step) * step;
        const prevValue = this.value;
        if (value === prevValue) {
            this._slider._onValueChange(this);
            this._slider.step > 0
                ? this._updateThumbUIByValue()
                : this._updateThumbUIByPointerEvent(event, { withAnimation: this._slider._hasAnimation });
            return;
        }
        this.value = value;
        this.valueChange.emit(this.value);
        this._onChangeFn(this.value);
        this._slider._onValueChange(this);
        this._slider.step > 0
            ? this._updateThumbUIByValue()
            : this._updateThumbUIByPointerEvent(event, { withAnimation: this._slider._hasAnimation });
    }
    _onPointerMove(event) {
        if (!this._slider.step && this._isActive) {
            this._updateThumbUIByPointerEvent(event);
        }
    }
    _onPointerUp() {
        if (this._isActive) {
            this._isActive = false;
            if (this._platform.SAFARI) {
                this._setIsFocused(false);
            }
            this.dragEnd.emit({ source: this, parent: this._slider, value: this.value });
            setTimeout(() => this._updateWidthInactive(), this._platform.IOS ? 10 : 0);
        }
    }
    _clamp(value) {
        const min = this._tickMarkOffset;
        const max = this._slider._cachedWidth - this._tickMarkOffset;
        return Math.max(Math.min(value, max), min);
    }
    _calcTranslateXByValue() {
        return (this.percentage * (this._slider._cachedWidth - this._tickMarkOffset * 2) +
            this._tickMarkOffset);
    }
    _calcTranslateXByPointerEvent(event) {
        return event.clientX - this._slider._cachedLeft;
    }
    _updateWidthActive() {
        if (!this._slider._isRange)
            return;
        const minWidth = this._slider._inputPadding * 2;
        const maxWidth = this._slider._cachedWidth + this._slider._inputPadding - minWidth - this._tickMarkOffset * 2;
        const percentage = this._slider.min < this._slider.max
            ? (this.max - this.min) / (this._slider.max - this._slider.min)
            : 1;
        const width = maxWidth * percentage + minWidth;
        this._hostElement.style.width = `${width}px`;
        this._hostElement.style.padding = `0 ${this._slider._inputPadding}px`;
    }
    _updateWidthInactive() {
        this._hostElement.style.width = `calc(100% + ${this._slider._inputPadding * 2 - this._tickMarkOffset * 2}px)`;
        this._hostElement.style.left = `-${this._slider._inputPadding - this._tickMarkOffset}px`;
    }
    _updateThumbUIByValue(options) {
        this.translateX = this._clamp(this._calcTranslateXByValue());
        this._updateThumbUI(options);
    }
    _updateThumbUIByPointerEvent(event, options) {
        this.translateX = this._clamp(this._calcTranslateXByPointerEvent(event));
        this._updateThumbUI(options);
    }
    _updateThumbUI(options) {
        this._slider._setTransition(!!options?.withAnimation);
        this._slider._onTranslateXChange(this);
    }
    // #region ControlValueAccessor implementation
    /** @hidden */
    writeValue(value) {
        if (this._isControlInitialized || value !== null) {
            this.value = value;
        }
    }
    /** @hidden */
    registerOnChange(fn) {
        this._onChangeFn = fn;
        this._isControlInitialized = true;
    }
    /** @hidden */
    registerOnTouched(fn) {
        this._onTouchedFn = fn;
    }
    /** @hidden */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    // #endregion
    focus() {
        this._hostElement.focus();
    }
    blur() {
        this._hostElement.blur();
    }
    get translateX() {
        if (this._slider.min >= this._slider.max) {
            this._translateX = this._tickMarkOffset;
            return this._translateX;
        }
        if (!isPresent(this._translateX)) {
            this._translateX = this._calcTranslateXByValue();
        }
        return this._translateX;
    }
    set translateX(value) {
        this._translateX = value;
    }
    get min() {
        return numberAttribute(this._hostElement.min, 0);
    }
    set min(value) {
        this._hostElement.min = value + '';
        this._cdr.markForCheck();
    }
    get max() {
        return numberAttribute(this._hostElement.max, 0);
    }
    set max(value) {
        this._hostElement.max = value + '';
        this._cdr.markForCheck();
    }
    get step() {
        return numberAttribute(this._hostElement.step, 0);
    }
    set step(value) {
        this._hostElement.step = value + '';
        this._cdr.markForCheck();
    }
    get disabled() {
        return booleanAttribute(this._hostElement.disabled);
    }
    set disabled(value) {
        this._hostElement.disabled = value;
        this._cdr.markForCheck();
        if (this._slider.disabled !== this.disabled) {
            this._slider.disabled = this.disabled;
        }
    }
    /** Calculates the percentage of the current slider value (compared to the max slider value). */
    get percentage() {
        if (this._slider.min >= this._slider.max)
            return 0;
        return (this.value - this._slider.min) / (this._slider.max - this._slider.min);
    }
    /** Calculates the percentage of the active/filled track */
    get fillPercentage() {
        if (!this._slider._cachedWidth || this._translateX === 0)
            return 0;
        return this.translateX / this._slider._cachedWidth;
    }
    _setValue(value) {
        this._hostElement.value = value;
        this._updateThumbUIByValue();
        this._slider._onValueChange(this);
        this._cdr.markForCheck();
    }
    _attachInputEventListeners() {
        this._ngZone.runOutsideAngular(() => {
            fromEvent(this._hostElement, 'pointerdown')
                .pipe(filter(() => !this.disabled), takeUntil(this._destroy$))
                .subscribe(this._onPointerDown.bind(this));
            fromEvent(this._hostElement, 'pointermove')
                .pipe(filter(() => !this.disabled), takeUntil(this._destroy$))
                .subscribe(this._onPointerMove.bind(this));
            fromEvent(this._hostElement, 'pointerup')
                .pipe(filter(() => !this.disabled), takeUntil(this._destroy$))
                .subscribe(this._onPointerUp.bind(this));
        });
    }
    _setIsFocused(value) {
        this._isFocused = value;
    }
    _handleValueCorrection(event) {
        this._skipUIUpdate = true;
        setTimeout(() => {
            this._skipUIUpdate = false;
            this._fixValue(event);
        }, 0);
    }
    _setComponentControl() {
        const injectedControl = this._injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderThumbDirective, deps: [{ token: i1.FormGroupDirective, optional: true }, { token: i1.NgForm, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: QSliderThumbDirective, isStandalone: true, selector: "input[qSliderThumb]", inputs: { errorStateMatcher: "errorStateMatcher", value: ["value", "value", numberAttribute] }, outputs: { valueChange: "valueChange", dragStart: "dragStart", dragEnd: "dragEnd" }, host: { listeners: { "blur": "_onBlur()", "focus": "_onFocus()", "change": "_onChange()", "input": "_onInput()" }, properties: { "class": "this.hostClass", "attr.type": "this.hostType", "attr.aria-valuetext": "this.ariaValueText" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QSliderThumbDirective),
                multi: true,
            },
            { provide: Q_SLIDER_THUMB, useExisting: QSliderThumbDirective },
            { provide: FormFieldControl, useExisting: QSliderThumbDirective },
            QDestroyService,
        ], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderThumbDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[qSliderThumb]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QSliderThumbDirective),
                            multi: true,
                        },
                        { provide: Q_SLIDER_THUMB, useExisting: QSliderThumbDirective },
                        { provide: FormFieldControl, useExisting: QSliderThumbDirective },
                        QDestroyService,
                    ],
                }]
        }], ctorParameters: () => [{ type: i1.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i1.NgForm, decorators: [{
                    type: Optional
                }] }], propDecorators: { valueChange: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], errorStateMatcher: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], hostType: [{
                type: HostBinding,
                args: ['attr.type']
            }], ariaValueText: [{
                type: HostBinding,
                args: ['attr.aria-valuetext']
            }], _onBlur: [{
                type: HostListener,
                args: ['blur']
            }], _onFocus: [{
                type: HostListener,
                args: ['focus']
            }], _onChange: [{
                type: HostListener,
                args: ['change']
            }], _onInput: [{
                type: HostListener,
                args: ['input']
            }] } });

class QSliderRangeThumbDirective extends QSliderThumbDirective {
    _isLeftThumb = false;
    _isEndThumb = false;
    _sibling = null;
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
        this._isEndThumb = this._hostElement.hasAttribute('qSliderEndThumb');
        this._isLeftThumb = !this._isEndThumb;
        this._thumbPosition = this._isEndThumb ? QSliderThumbPosition.END : QSliderThumbPosition.START;
    }
    getSibling() {
        if (!this._sibling) {
            this._sibling = this._slider._getInput(this._isEndThumb ? QSliderThumbPosition.START : QSliderThumbPosition.END);
        }
        return this._sibling;
    }
    getMinPos() {
        const sibling = this.getSibling();
        if (!this._isLeftThumb && sibling) {
            return sibling.translateX - this._slider.minDistance;
        }
        return this._tickMarkOffset;
    }
    getMaxPos() {
        const sibling = this.getSibling();
        if (this._isLeftThumb && sibling) {
            return sibling.translateX + this._slider.minDistance;
        }
        return this._slider._cachedWidth - this._tickMarkOffset;
    }
    _setIsLeftThumb() {
        this._isLeftThumb = !this._isEndThumb;
    }
    _updateMinMax() {
        const sibling = this.getSibling();
        if (!sibling)
            return;
        if (this._isEndThumb) {
            this.min = Math.max(this._slider.min, sibling.value + this._slider.minDistance);
            this.max = this._slider.max;
        }
        else {
            this.min = this._slider.min;
            this.max = Math.min(this._slider.max, sibling.value - this._slider.minDistance);
        }
    }
    _updateStaticStyles() {
        this._hostElement.classList.toggle('q-slider-right-input', !this._isLeftThumb);
    }
    _getDefaultValue() {
        return this._isEndThumb && this._slider._isRange ? this.max : this.min;
    }
    _onInput() {
        super._onInput();
        this._updateSibling();
        if (!this._isActive) {
            this._updateWidthInactive();
        }
    }
    _onNgControlValueChange() {
        super._onNgControlValueChange();
        this.getSibling()?._updateMinMax();
    }
    _onPointerDown(event) {
        if (this.disabled || event.button !== 0)
            return;
        if (this._sibling) {
            this._sibling._updateWidthActive();
            this._sibling._hostElement.classList.add('q-slider-input-no-pointer-events');
        }
        super._onPointerDown(event);
    }
    _onPointerUp() {
        super._onPointerUp();
        setTimeout(() => {
            if (this._sibling) {
                this._sibling._updateWidthInactive();
                this._sibling._hostElement.classList.remove('q-slider-input-no-pointer-events');
            }
        });
    }
    _onPointerMove(event) {
        super._onPointerMove(event);
        if (!this._slider.step && this._isActive) {
            this._updateSibling();
        }
    }
    _fixValue(event) {
        super._fixValue(event);
        this._sibling?._updateMinMax();
    }
    _clamp(value) {
        return Math.max(Math.min(value, this.getMaxPos()), this.getMinPos());
    }
    _updateWidthInactive() {
        const sibling = this.getSibling();
        if (!sibling)
            return;
        const maxWidth = this._slider._cachedWidth - this._tickMarkOffset * 2;
        const midValue = this._isEndThumb
            ? this.value - (this.value - sibling.value) / 2
            : this.value + (sibling.value - this.value) / 2;
        const _percentage = this._isEndThumb
            ? (this.max - midValue) / (this._slider.max - this._slider.min)
            : (midValue - this.min) / (this._slider.max - this._slider.min);
        const percentage = this._slider.min < this._slider.max ? _percentage : 1;
        const width = maxWidth * percentage;
        this._hostElement.style.width = `${width}px`;
        this._hostElement.style.padding = '0px';
        if (this._isLeftThumb) {
            this._hostElement.style.left = `-${this._tickMarkOffset}px`;
            this._hostElement.style.right = 'auto';
        }
        else {
            this._hostElement.style.left = 'auto';
            this._hostElement.style.right = `-${this._tickMarkOffset}px`;
        }
    }
    writeValue(value) {
        if (this._isControlInitialized || value !== null) {
            this.value = value;
            this._updateWidthInactive();
            this._updateSibling();
        }
    }
    _setValue(value) {
        super._setValue(value);
        this._updateWidthInactive();
        this._updateSibling();
        return value;
    }
    _updateSibling() {
        const sibling = this.getSibling();
        if (!sibling)
            return;
        sibling._updateMinMax();
        if (this._isActive) {
            sibling._updateWidthActive();
        }
        else {
            sibling._updateWidthInactive();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderRangeThumbDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QSliderRangeThumbDirective, isStandalone: true, selector: "input[qSliderStartThumb], input[qSliderEndThumb]", providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QSliderRangeThumbDirective),
                multi: true,
            },
            { provide: Q_SLIDER_RANGE_THUMB, useExisting: QSliderRangeThumbDirective },
            { provide: FormFieldControl, useExisting: QSliderRangeThumbDirective },
            QDestroyService,
        ], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderRangeThumbDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[qSliderStartThumb], input[qSliderEndThumb]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QSliderRangeThumbDirective),
                            multi: true,
                        },
                        { provide: Q_SLIDER_RANGE_THUMB, useExisting: QSliderRangeThumbDirective },
                        { provide: FormFieldControl, useExisting: QSliderRangeThumbDirective },
                        QDestroyService,
                    ],
                }]
        }], ctorParameters: () => [] });

class QSliderVisualThumbComponent {
    focusChange = new EventEmitter();
    keyboardFocusChange = new EventEmitter();
    hoverChange = new EventEmitter();
    tooltip = false;
    disabled = false;
    thumbPosition = QSliderThumbPosition.END;
    valueIndicatorText = '';
    _knob;
    _tooltipDirective;
    hostClass = 'q-slider-thumb';
    _isActive = false;
    _isValueIndicatorVisible = false;
    _hostElement;
    _isFocused = false;
    _isHovered = false;
    _sliderInput = null;
    _sliderInputEl = null;
    _ngZone = inject(NgZone);
    _elementRef = inject((ElementRef));
    _slider = inject(Q_SLIDER);
    _destroy$ = inject(QDestroyService);
    _focusMonitor = inject(FocusMonitor);
    _platform = inject(QPlatformService);
    constructor() {
        this._hostElement = this._elementRef.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes.valueIndicatorText) {
            this._onChange();
        }
    }
    ngAfterViewInit() {
        this._sliderInput = this._slider._getInput(this.thumbPosition);
        this._sliderInputEl = this._sliderInput?._hostElement ?? null;
        this._attachInputEventListeners();
        if (this._sliderInputEl) {
            this._focusMonitor
                .monitor(this._sliderInputEl)
                .pipe(takeUntil(this._destroy$))
                .subscribe((focusOrigin) => {
                this.keyboardFocusChange.emit(focusOrigin === 'keyboard');
            });
        }
    }
    ngOnDestroy() {
        if (this._sliderInputEl)
            this._focusMonitor.stopMonitoring(this._sliderInputEl);
    }
    _getSibling() {
        return this._slider._getThumb(this.thumbPosition === QSliderThumbPosition.START
            ? QSliderThumbPosition.END
            : QSliderThumbPosition.START);
    }
    _getKnob() {
        return this._knob.nativeElement;
    }
    _hideTooltip() {
        this._dispatchKnobMouseEvent(this.isMobile ? 'touchend' : 'mouseleave');
    }
    _showTooltip() {
        if (!this.tooltip)
            return;
        this._dispatchKnobMouseEvent(this.isMobile ? 'touchstart' : 'mouseenter');
    }
    get isMobile() {
        return this._platform.IOS || this._platform.ANDROID;
    }
    get isFocused() {
        return this._isFocused;
    }
    set isFocused(value) {
        if (this._isFocused !== value) {
            this._isFocused = value;
            this.focusChange.emit(this._isFocused);
        }
    }
    get isHovered() {
        return this._isHovered;
    }
    set isHovered(value) {
        this._hostElement.dispatchEvent(new Event('mouseenter'));
        if (this._isHovered !== value) {
            this._isHovered = value;
            this.hoverChange.emit(this._isHovered);
        }
    }
    _attachInputEventListeners() {
        this._ngZone.runOutsideAngular(() => {
            if (this._sliderInputEl) {
                fromEvent(this._sliderInputEl, 'pointermove')
                    .pipe(filter(() => !this.disabled), debounceTime(30), takeUntil(this._destroy$))
                    .subscribe(this._onPointerMove);
                fromEvent(this._sliderInputEl, 'pointerup')
                    .pipe(filter(() => !this.disabled), takeUntil(this._destroy$))
                    .subscribe(this._onDragEnd);
                fromEvent(this._sliderInputEl, 'pointerdown')
                    .pipe(filter(() => !this.disabled), delay(0), takeUntil(this._destroy$))
                    .subscribe(this._onDragStart);
                fromEvent(this._sliderInputEl, 'pointerleave')
                    .pipe(filter(() => !this.disabled), debounceTime(30), takeUntil(this._destroy$))
                    .subscribe(this._onMouseLeave);
                fromEvent(this._sliderInputEl, 'focus')
                    .pipe(filter(() => !this.disabled), takeUntil(this._destroy$))
                    .subscribe(this._onFocus);
                fromEvent(this._sliderInputEl, 'blur')
                    .pipe(filter(() => !this.disabled), takeUntil(this._destroy$))
                    .subscribe(this._onBlur);
                fromEvent(this._sliderInputEl, 'change')
                    .pipe(filter(() => !this.disabled), takeUntil(this._destroy$))
                    .subscribe(this._onChange);
            }
        });
    }
    _onPointerMove = (event) => {
        const rect = this._hostElement.getBoundingClientRect();
        this.isHovered = this._slider._isCursorOnSliderThumb(event, rect);
        this.tooltip && this.isHovered ? this._showTooltip() : this._hideTooltip();
    };
    _onMouseLeave = () => {
        this.isHovered = false;
        this._hideTooltip();
    };
    _onFocus = () => {
        this.isFocused = true;
        this.isHovered = false;
        this._showTooltip();
    };
    _onBlur = () => {
        this.isFocused = false;
        this.isHovered = false;
        this._hideTooltip();
    };
    _onDragStart = (event) => {
        if (event.button !== 0)
            return;
        this._isActive = true;
        this.keyboardFocusChange.emit(false);
        this._showTooltip();
        this._updateTooltipPosition();
    };
    _onDragEnd = () => {
        this._isActive = false;
    };
    _onChange = () => {
        this._updateTooltipPosition();
    };
    _dispatchKnobMouseEvent(eventType) {
        this._knob?.nativeElement?.dispatchEvent(new Event(eventType));
    }
    _updateTooltipPosition() {
        if (!this.tooltip)
            return;
        const tooltipEl = this._tooltipDirective?._getTooltipElement();
        if (tooltipEl) {
            tooltipEl.value = this.valueIndicatorText;
            this._tooltipDirective._overlayRef?.updatePosition();
            tooltipEl._markForCheck();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderVisualThumbComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QSliderVisualThumbComponent, isStandalone: true, selector: "q-slider-visual-thumb", inputs: { tooltip: "tooltip", disabled: ["disabled", "disabled", booleanAttribute], thumbPosition: "thumbPosition", valueIndicatorText: "valueIndicatorText" }, outputs: { focusChange: "focusChange", keyboardFocusChange: "keyboardFocusChange", hoverChange: "hoverChange" }, host: { properties: { "class": "this.hostClass" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QSliderVisualThumbComponent),
                multi: true,
            },
            { provide: Q_SLIDER_VISUAL_THUMB, useExisting: QSliderVisualThumbComponent },
            QDestroyService,
        ], viewQueries: [{ propertyName: "_knob", first: true, predicate: ["knob"], descendants: true }, { propertyName: "_tooltipDirective", first: true, predicate: QTooltipDirective, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"tooltip && !disabled; else noTooltip\">\n  <div\n    #knob\n    class=\"q-slider-thumb-knob\"\n    [qTooltip]=\"valueIndicatorText\"\n    qTooltipPosition=\"top\"></div>\n</ng-container>\n\n<ng-template #noTooltip>\n  <div #knob class=\"q-slider-thumb-knob\"></div>\n</ng-template>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-slider-thumb{display:flex;align-items:center;flex-shrink:1;outline:none;position:absolute;-webkit-user-select:none;user-select:none;z-index:1}.q-slider-thumb-top{z-index:1}.q-slider-thumb-hover{width:var(--ads-size-l);height:var(--ads-size-l);background:var(--awds-slider-hover-thumb-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));position:absolute;border-radius:var(--awds-slider-thumb-highlight-border-radius, var(--ads-border-radius-xl));z-index:-1}.q-slider-thumb-focus{width:var(--ads-size-l);height:var(--ads-size-l);background:var(--awds-slider-selected-thumb-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-pressed-complement) * 100%), rgb(from var(--ads-color-state-no-background-pressed) r g b/100%) calc((1 - var(--ads-color-state-no-background-pressed-complement)) * 100%)));position:absolute;border-radius:var(--awds-slider-thumb-highlight-border-radius, var(--ads-border-radius-xl));z-index:-2}.q-slider-thumb-keyboard-focus{opacity:1;position:absolute;width:var(--ads-size-l);height:var(--ads-size-l);border-radius:var(--awds-slider-thumb-highlight-border-radius, var(--ads-border-radius-xl));z-index:-1;outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-slider-thumb-knob{cursor:pointer;box-sizing:border-box;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:var(--awds-slider-thumb-border-radius, 20px);background:var(--awds-slider-thumb-background, var(--ads-color-body-contrast-700));border:var(--awds-slider-thumb-border-width, var(--ads-border-width-thick)) solid var(--awds-slider-thumb-border-color, var(--ads-color-primary-400));pointer-events:auto}.q-slider-small .q-slider-thumb,.q-slider-small .q-slider-thumb-hover,.q-slider-small .q-slider-thumb-focus,.q-slider-small .q-slider-thumb-keyboard-focus{height:var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l));width:var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l));left:calc(var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l)) / 2 * -1);top:calc((var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l)) - var(--ads-size-s)) / 2 * -1)}.q-slider-small .q-slider-thumb-knob,.q-slider-small .q-slider-thumb-hover-knob,.q-slider-small .q-slider-thumb-focus-knob,.q-slider-small .q-slider-thumb-keyboard-focus-knob{width:var(--awds-slider-small-thumb-dimensions, var(--ads-size-s));height:var(--awds-slider-small-thumb-dimensions, var(--ads-size-s))}.q-slider-medium .q-slider-thumb,.q-slider-medium .q-slider-thumb-hover,.q-slider-medium .q-slider-thumb-focus,.q-slider-medium .q-slider-thumb-keyboard-focus{width:var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl));height:var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl));left:calc(var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl)) / 2 * -1);top:calc((var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl)) - var(--ads-size-m)) / 2 * -1)}.q-slider-medium .q-slider-thumb-knob,.q-slider-medium .q-slider-thumb-hover-knob,.q-slider-medium .q-slider-thumb-focus-knob,.q-slider-medium .q-slider-thumb-keyboard-focus-knob{width:var(--awds-slider-medium-thumb-dimensions, var(--ads-size-m));height:var(--awds-slider-medium-thumb-dimensions, var(--ads-size-m))}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: QTooltipDirective, selector: "[qTooltip]", inputs: ["qTooltipPosition", "qTooltipShowDelay", "qTooltipHideDelay", "qTooltipLongPressDelay", "qTooltip", "qTooltipDataQt", "qTooltipTouchendHideDelay"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderVisualThumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-slider-visual-thumb', imports: [NgIf, QTooltipDirective], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QSliderVisualThumbComponent),
                            multi: true,
                        },
                        { provide: Q_SLIDER_VISUAL_THUMB, useExisting: QSliderVisualThumbComponent },
                        QDestroyService,
                    ], template: "<ng-container *ngIf=\"tooltip && !disabled; else noTooltip\">\n  <div\n    #knob\n    class=\"q-slider-thumb-knob\"\n    [qTooltip]=\"valueIndicatorText\"\n    qTooltipPosition=\"top\"></div>\n</ng-container>\n\n<ng-template #noTooltip>\n  <div #knob class=\"q-slider-thumb-knob\"></div>\n</ng-template>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-slider-thumb{display:flex;align-items:center;flex-shrink:1;outline:none;position:absolute;-webkit-user-select:none;user-select:none;z-index:1}.q-slider-thumb-top{z-index:1}.q-slider-thumb-hover{width:var(--ads-size-l);height:var(--ads-size-l);background:var(--awds-slider-hover-thumb-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));position:absolute;border-radius:var(--awds-slider-thumb-highlight-border-radius, var(--ads-border-radius-xl));z-index:-1}.q-slider-thumb-focus{width:var(--ads-size-l);height:var(--ads-size-l);background:var(--awds-slider-selected-thumb-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-pressed-complement) * 100%), rgb(from var(--ads-color-state-no-background-pressed) r g b/100%) calc((1 - var(--ads-color-state-no-background-pressed-complement)) * 100%)));position:absolute;border-radius:var(--awds-slider-thumb-highlight-border-radius, var(--ads-border-radius-xl));z-index:-2}.q-slider-thumb-keyboard-focus{opacity:1;position:absolute;width:var(--ads-size-l);height:var(--ads-size-l);border-radius:var(--awds-slider-thumb-highlight-border-radius, var(--ads-border-radius-xl));z-index:-1;outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-slider-thumb-knob{cursor:pointer;box-sizing:border-box;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:var(--awds-slider-thumb-border-radius, 20px);background:var(--awds-slider-thumb-background, var(--ads-color-body-contrast-700));border:var(--awds-slider-thumb-border-width, var(--ads-border-width-thick)) solid var(--awds-slider-thumb-border-color, var(--ads-color-primary-400));pointer-events:auto}.q-slider-small .q-slider-thumb,.q-slider-small .q-slider-thumb-hover,.q-slider-small .q-slider-thumb-focus,.q-slider-small .q-slider-thumb-keyboard-focus{height:var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l));width:var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l));left:calc(var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l)) / 2 * -1);top:calc((var(--awds-slider-small-thumb-highlight-dimensions, var(--ads-size-l)) - var(--ads-size-s)) / 2 * -1)}.q-slider-small .q-slider-thumb-knob,.q-slider-small .q-slider-thumb-hover-knob,.q-slider-small .q-slider-thumb-focus-knob,.q-slider-small .q-slider-thumb-keyboard-focus-knob{width:var(--awds-slider-small-thumb-dimensions, var(--ads-size-s));height:var(--awds-slider-small-thumb-dimensions, var(--ads-size-s))}.q-slider-medium .q-slider-thumb,.q-slider-medium .q-slider-thumb-hover,.q-slider-medium .q-slider-thumb-focus,.q-slider-medium .q-slider-thumb-keyboard-focus{width:var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl));height:var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl));left:calc(var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl)) / 2 * -1);top:calc((var(--awds-slider-medium-thumb-highlight-dimensions, var(--ads-size-xxl)) - var(--ads-size-m)) / 2 * -1)}.q-slider-medium .q-slider-thumb-knob,.q-slider-medium .q-slider-thumb-hover-knob,.q-slider-medium .q-slider-thumb-focus-knob,.q-slider-medium .q-slider-thumb-keyboard-focus-knob{width:var(--awds-slider-medium-thumb-dimensions, var(--ads-size-m));height:var(--awds-slider-medium-thumb-dimensions, var(--ads-size-m))}\n"] }]
        }], ctorParameters: () => [], propDecorators: { focusChange: [{
                type: Output
            }], keyboardFocusChange: [{
                type: Output
            }], hoverChange: [{
                type: Output
            }], tooltip: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], thumbPosition: [{
                type: Input
            }], valueIndicatorText: [{
                type: Input
            }], _knob: [{
                type: ViewChild,
                args: ['knob']
            }], _tooltipDirective: [{
                type: ViewChild,
                args: [QTooltipDirective]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

var QSliderTickMark;
(function (QSliderTickMark) {
    QSliderTickMark[QSliderTickMark["ACTIVE"] = 0] = "ACTIVE";
    QSliderTickMark[QSliderTickMark["INACTIVE"] = 1] = "INACTIVE";
})(QSliderTickMark || (QSliderTickMark = {}));

class QSliderComponent {
    size = 'small';
    valueLabel = false;
    displayWith = (value) => `${value}`;
    dataQt = 'q-slider';
    get showTickMarks() {
        return this._showTickMarks;
    }
    set showTickMarks(value) {
        this._showTickMarks = value;
        if (this._showTickMarks) {
            this._updateTickMarkUI();
            this._updateTickMarkTrackUI();
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
        const endInput = this._getInput(QSliderThumbPosition.END);
        const startInput = this._getInput(QSliderThumbPosition.START);
        if (endInput) {
            endInput.disabled = this._disabled;
        }
        if (startInput) {
            startInput.disabled = this._disabled;
        }
    }
    get tooltip() {
        return this._tooltip;
    }
    set tooltip(value) {
        this._tooltip = value;
        this._updateValueIndicatorUIs();
    }
    get min() {
        return this._min;
    }
    set min(value) {
        const min = isNaN(value) ? this._min : value;
        if (this._min !== min) {
            this._updateMin(min);
        }
    }
    get max() {
        return this._max;
    }
    set max(value) {
        const max = isNaN(value) ? this._max : value;
        if (this._max !== max) {
            this._updateMax(max);
        }
    }
    get step() {
        return this._step;
    }
    set step(value) {
        const step = isNaN(value) ? this._step : value;
        if (this._step !== step) {
            this._updateStep(step);
        }
    }
    get minDistance() {
        return this._minDistance;
    }
    set minDistance(value) {
        this._minDistance = isNaN(value) ? this._minDistance : value;
    }
    _inputs;
    _input;
    _thumbs;
    _trackActive;
    _startThumbFocusIndicator;
    _endThumbFocusIndicator;
    _startVisualThumb;
    _endVisualThumb;
    get hostClassNames() {
        return [
            'q-slider',
            `q-slider-${this.size}`,
            this.disabled && 'q-slider-disabled',
            this.tooltip && 'q-slider-tooltip',
            this._isRange && 'q-slider-range',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _tickMarks = [];
    _cachedWidth; // actual width of the slider (offsetWidth, margins are not part of it)
    _cachedLeft;
    _inputPadding;
    _tickMarkTrackWidth = 0;
    _knobRadius = 8;
    _startValueIndicatorText = '';
    _endValueIndicatorText = '';
    _endThumbTransform = '';
    _startThumbTransform = '';
    _isRange = false;
    _hasAnimation = false;
    _startThumbHoverVisible = false;
    _endThumbHoverVisible = false;
    _startThumbFocusVisible = false;
    _endThumbFocusVisible = false;
    _startThumbKeyboardFocusVisible = false;
    _endThumbKeyboardFocusVisible = false;
    _disabled = false;
    _tooltip = false;
    _min = 0;
    _max = 100;
    _minDistance = 0;
    _step = 1;
    _showTickMarks = false;
    _dirChangeSubscription = null;
    _resizeObserver = null;
    _hasViewInitialized = false;
    _resizeTimer = null;
    _thumbsOverlap = false;
    _platform = inject(Platform);
    _ngZone = inject(NgZone);
    _cdr = inject(ChangeDetectorRef);
    _elementRef = inject((ElementRef));
    ngAfterViewInit() {
        if (this._platform.isBrowser) {
            this._updateDimensions();
        }
        const eInput = this._getInput(QSliderThumbPosition.END);
        const sInput = this._getInput(QSliderThumbPosition.START);
        this._isRange = !!eInput && !!sInput;
        this._cdr.markForCheck();
        this._inputPadding = this._knobRadius;
        this._isRange
            ? this._initUIRange(eInput, sInput)
            : this._initUINonRange(eInput);
        this._updateTrackUI(eInput);
        this._updateTickMarkUI();
        this._updateTickMarkTrackUI();
        this._observeHostResize();
        this._cdr.markForCheck();
    }
    ngOnDestroy() {
        this._dirChangeSubscription?.unsubscribe();
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
    }
    _updateDimensions() {
        this._cachedWidth = this._elementRef.nativeElement.offsetWidth;
        this._cachedLeft = this._elementRef.nativeElement.getBoundingClientRect().left;
    }
    _setTrackActiveStyles(styles) {
        const trackStyle = this._trackActive.nativeElement.style;
        trackStyle.left = styles.left;
        trackStyle.right = styles.right;
        trackStyle.transformOrigin = styles.transformOrigin;
        trackStyle.transform = styles.transform;
    }
    _calcTickMarkTransform(index) {
        const tickLeftOffset = index * (this._tickMarkTrackWidth / (this._tickMarks.length - 1));
        return `translateX(${tickLeftOffset}px)`;
    }
    _onTranslateXChange(source) {
        if (!this._hasViewInitialized)
            return;
        if (this._isRange) {
            const startInput = this._getInput(QSliderThumbPosition.START);
            const endInput = this._getInput(QSliderThumbPosition.END);
            if (source._thumbPosition === QSliderThumbPosition.START) {
                if (source.value + this._minDistance > endInput.value) {
                    source.value = endInput.value - this._minDistance;
                    source.translateX =
                        endInput.translateX - this._minDistance * (this._cachedWidth / (this._max - this._min));
                }
            }
            else {
                if (source.value - this._minDistance < startInput.value) {
                    source.value = startInput.value + this._minDistance;
                    source.translateX =
                        startInput.translateX +
                            this._minDistance * (this._cachedWidth / (this._max - this._min));
                }
            }
        }
        this._updateThumbUI(source);
        this._updateTrackUI(source);
        this._updateOverlappingThumbUI(source);
    }
    _onTranslateXChangeBySideEffect(input1, input2) {
        if (!this._hasViewInitialized)
            return;
        input1._updateThumbUIByValue();
        input2._updateThumbUIByValue();
    }
    _onValueChange(source) {
        if (!this._hasViewInitialized)
            return;
        this._updateValueIndicatorUI(source);
        this._updateTickMarkUI();
        this._cdr.markForCheck();
    }
    _onMinMaxOrStepChange() {
        if (!this._hasViewInitialized)
            return;
        this._updateTickMarkUI();
        this._updateTickMarkTrackUI();
        this._cdr.markForCheck();
    }
    _onResize() {
        if (!this._hasViewInitialized)
            return;
        this._updateDimensions();
        if (this._isRange) {
            const eInput = this._getInput(QSliderThumbPosition.END);
            const sInput = this._getInput(QSliderThumbPosition.START);
            eInput._updateThumbUIByValue();
            sInput._updateThumbUIByValue();
            eInput._updateStaticStyles();
            sInput._updateStaticStyles();
            eInput._updateMinMax();
            sInput._updateMinMax();
            eInput._updateWidthInactive();
            sInput._updateWidthInactive();
        }
        else {
            const eInput = this._getInput(QSliderThumbPosition.END);
            if (eInput) {
                eInput._updateThumbUIByValue();
            }
        }
        this._updateTickMarkUI();
        this._updateTickMarkTrackUI();
        this._cdr.detectChanges();
    }
    _updateThumbUI(source) {
        if (this._skipUpdate())
            return;
        const thumb = this._getThumb(source._thumbPosition === QSliderThumbPosition.END
            ? QSliderThumbPosition.END
            : QSliderThumbPosition.START);
        if (!thumb) {
            throw new Error('Thumb not found for the specified position');
        }
        thumb._hostElement.style.transform = `translateX(${source.translateX}px)`;
        if (this._startThumbFocusIndicator?.nativeElement) {
            this._startThumbFocusIndicator.nativeElement.style.transform = `translateX(${source.translateX}px)`;
        }
        if (this._endThumbFocusIndicator?.nativeElement) {
            this._endThumbFocusIndicator.nativeElement.style.transform = `translateX(${source.translateX}px)`;
        }
    }
    _updateValueIndicatorUI(source) {
        if (this._skipUpdate())
            return;
        const valueText = this.displayWith(source.value);
        this._hasViewInitialized
            ? (source._valueText = valueText)
            : source._hostElement?.setAttribute('aria-valuetext', valueText);
        if (this.tooltip) {
            source._thumbPosition === QSliderThumbPosition.START
                ? (this._startValueIndicatorText = valueText)
                : (this._endValueIndicatorText = valueText);
            const visualThumb = this._getThumb(source._thumbPosition);
            valueText.length < 3
                ? visualThumb._hostElement.classList.add('q-slider-thumb-short-value')
                : visualThumb._hostElement.classList.remove('q-slider-thumb-short-value');
        }
    }
    _updateTickMarkUI() {
        if (!this.showTickMarks ||
            !isPresent(this.step) ||
            !isPresent(this.min) ||
            !isPresent(this.max))
            return;
        const step = this.step > 0 ? this.step : 1;
        this._isRange ? this._updateTickMarkUIRange(step) : this._updateTickMarkUINonRange(step);
    }
    _updateTrackUI(source) {
        if (!source || this._skipUpdate())
            return;
        this._isRange
            ? this._updateTrackUIRange(source)
            : this._updateTrackUINonRange(source);
    }
    _getInput(thumbPosition) {
        if (thumbPosition === QSliderThumbPosition.END && this._input) {
            return this._input;
        }
        if (this._inputs?.length) {
            return thumbPosition === QSliderThumbPosition.START ? this._inputs.first : this._inputs.last;
        }
        return null;
    }
    _getThumb(thumbPosition) {
        return thumbPosition === QSliderThumbPosition.END ? this._thumbs?.last : this._thumbs?.first;
    }
    _setTransition(withAnimation) {
        this._hasAnimation = !this._platform.IOS && withAnimation;
        this._elementRef.nativeElement.classList.toggle('q-slider-with-animation', this._hasAnimation);
    }
    _isCursorOnSliderThumb(event, rect) {
        const radius = rect.width / 2;
        const centerX = rect.x + radius;
        const centerY = rect.y + radius;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(radius, 2);
    }
    _thumbFocusChange(focused, thumb) {
        if (!focused) {
            this._startThumbHoverVisible = false;
            this._endThumbHoverVisible = false;
        }
        this._startThumbFocusVisible = focused && thumb.thumbPosition === QSliderThumbPosition.START;
        this._endThumbFocusVisible = focused && thumb.thumbPosition === QSliderThumbPosition.END;
        this._cdr.detectChanges();
    }
    _thumbKeyboardFocusChange(focused, thumb) {
        if (!focused) {
            this._startThumbHoverVisible = false;
            this._endThumbHoverVisible = false;
        }
        this._startThumbKeyboardFocusVisible =
            focused && thumb.thumbPosition === QSliderThumbPosition.START;
        this._endThumbKeyboardFocusVisible =
            focused && thumb.thumbPosition === QSliderThumbPosition.END;
        this._cdr.detectChanges();
    }
    _thumbHoverChange(hovered, thumb) {
        this._startThumbHoverVisible = hovered && thumb.thumbPosition === QSliderThumbPosition.START;
        this._endThumbHoverVisible = hovered && thumb.thumbPosition === QSliderThumbPosition.END;
        this._handleTooltipVisibility(thumb.thumbPosition);
        this._cdr.detectChanges();
    }
    _handleTooltipVisibility(activeThumbPosition) {
        if (!this._isRange || !this.tooltip)
            return;
        activeThumbPosition === QSliderThumbPosition.START
            ? this._endVisualThumb._hideTooltip()
            : this._startVisualThumb._hideTooltip();
    }
    _initUINonRange(eInput) {
        if (!eInput)
            return;
        eInput.initProps();
        eInput.initUI();
        this._updateValueIndicatorUI(eInput);
        this._hasViewInitialized = true;
        eInput._updateThumbUIByValue();
    }
    _initUIRange(eInput, sInput) {
        eInput.initProps();
        eInput.initUI();
        sInput.initProps();
        sInput.initUI();
        eInput._updateMinMax();
        sInput._updateMinMax();
        eInput._updateStaticStyles();
        sInput._updateStaticStyles();
        this._updateValueIndicatorUIs();
        this._hasViewInitialized = true;
        eInput._updateThumbUIByValue();
        sInput._updateThumbUIByValue();
    }
    _updateMin(min) {
        const prevMin = this._min;
        this._min = min;
        this._isRange ? this._updateMinRange({ old: prevMin, new: min }) : this._updateMinNonRange(min);
        this._onMinMaxOrStepChange();
    }
    _updateMax(max) {
        const prevMax = this._max;
        this._max = max;
        this._isRange ? this._updateMaxRange({ old: prevMax, new: max }) : this._updateMaxNonRange(max);
        this._onMinMaxOrStepChange();
    }
    _updateMinRange(min) {
        const endInput = this._getInput(QSliderThumbPosition.END);
        const startInput = this._getInput(QSliderThumbPosition.START);
        const oldEndValue = endInput.value;
        const oldStartValue = startInput.value;
        startInput.min = min.new;
        endInput.min = Math.max(min.new, startInput.value);
        startInput.max = Math.min(endInput.max, endInput.value);
        startInput._updateWidthInactive();
        endInput._updateWidthInactive();
        min.new < min.old
            ? this._onTranslateXChangeBySideEffect(endInput, startInput)
            : this._onTranslateXChangeBySideEffect(startInput, endInput);
        if (oldEndValue !== endInput.value) {
            this._onValueChange(endInput);
        }
        if (oldStartValue !== startInput.value) {
            this._onValueChange(startInput);
        }
    }
    _updateMinNonRange(min) {
        const input = this._getInput(QSliderThumbPosition.END);
        if (input) {
            const oldValue = input.value;
            input.min = min;
            input._updateThumbUIByValue();
            this._updateTrackUI(input);
            if (oldValue !== input.value) {
                this._onValueChange(input);
            }
        }
    }
    _observeHostResize() {
        if (typeof ResizeObserver === 'undefined' || !ResizeObserver)
            return;
        this._ngZone.runOutsideAngular(() => {
            this._resizeObserver = new ResizeObserver(() => {
                if (this._isActive())
                    return;
                if (this._resizeTimer) {
                    clearTimeout(this._resizeTimer);
                }
                this._onResize();
            });
            this._resizeObserver.observe(this._elementRef.nativeElement);
        });
    }
    _isActive() {
        return (this._getThumb(QSliderThumbPosition.START)._isActive ||
            this._getThumb(QSliderThumbPosition.END)._isActive);
    }
    _getValue(thumbPosition = QSliderThumbPosition.END) {
        const input = this._getInput(thumbPosition);
        if (!input)
            return this.min;
        return input.value;
    }
    _skipUpdate() {
        return !!(this._getInput(QSliderThumbPosition.START)?._skipUIUpdate ||
            this._getInput(QSliderThumbPosition.END)?._skipUIUpdate);
    }
    _areThumbsOverlapping() {
        const startInput = this._getInput(QSliderThumbPosition.START);
        const endInput = this._getInput(QSliderThumbPosition.END);
        if (!startInput || !endInput)
            return false;
        return endInput.translateX - startInput.translateX < 20;
    }
    _updateOverlappingThumbClassNames(source) {
        const sibling = source.getSibling();
        const sourceThumb = this._getThumb(source._thumbPosition);
        sourceThumb._hostElement.classList.toggle('q-slider-thumb-top', this._thumbsOverlap);
        if (sibling) {
            const siblingThumb = this._getThumb(sibling._thumbPosition);
            siblingThumb._hostElement.classList.remove('q-slider-thumb-top');
        }
    }
    _updateOverlappingThumbUI(source) {
        if (!this._isRange || this._skipUpdate())
            return;
        if (this._thumbsOverlap !== this._areThumbsOverlapping()) {
            this._thumbsOverlap = !this._thumbsOverlap;
            this._updateOverlappingThumbClassNames(source);
        }
    }
    _updateValueIndicatorUIs() {
        const eInput = this._getInput(QSliderThumbPosition.END);
        const sInput = this._getInput(QSliderThumbPosition.START);
        if (eInput) {
            this._updateValueIndicatorUI(eInput);
        }
        if (sInput) {
            this._updateValueIndicatorUI(sInput);
        }
    }
    _updateTickMarkTrackUI() {
        if (!this.showTickMarks || this._skipUpdate())
            return;
        const step = this._step && this._step > 0 ? this._step : 1;
        const maxValue = Math.floor(this.max / step) * step;
        const percentage = (maxValue - this.min) / (this.max - this.min);
        this._tickMarkTrackWidth = this._cachedWidth * percentage - 10;
        if (this.size === 'medium') {
            this._tickMarkTrackWidth = this._cachedWidth * percentage - 12;
        }
    }
    _updateTrackUIRange(source) {
        const sibling = source.getSibling();
        if (!sibling || !this._cachedWidth)
            return;
        const activePercentage = Math.abs(sibling.translateX - source.translateX) / this._cachedWidth;
        if (source._isLeftThumb && this._cachedWidth) {
            this._setTrackActiveStyles({
                left: 'auto',
                right: `${this._cachedWidth - sibling.translateX}px`,
                transformOrigin: 'right',
                transform: `scaleX(${activePercentage})`,
            });
        }
        else {
            this._setTrackActiveStyles({
                left: `${sibling.translateX}px`,
                right: 'auto',
                transformOrigin: 'left',
                transform: `scaleX(${activePercentage})`,
            });
        }
    }
    _updateTrackUINonRange(source) {
        this._setTrackActiveStyles({
            left: '0px',
            right: 'auto',
            transformOrigin: 'left',
            transform: `scaleX(${source.fillPercentage})`,
        });
    }
    _updateTickMarkUINonRange(step) {
        const value = this._getValue();
        const numActive = Math.max(Math.floor((value - this.min) / step), 0);
        let numInactive = Math.max(Math.floor((this.max - value) / step), 0);
        numInactive++;
        this._tickMarks = Array(numActive)
            .fill(QSliderTickMark.ACTIVE)
            .concat(Array(numInactive).fill(QSliderTickMark.INACTIVE));
    }
    _updateTickMarkUIRange(step) {
        const endValue = this._getValue();
        const startValue = this._getValue(QSliderThumbPosition.START);
        const numInactiveBeforeStartThumb = Math.max(Math.floor((startValue - this.min) / step), 0);
        const numActive = Math.max(Math.floor((endValue - startValue) / step) + 1, 0);
        const numInactiveAfterEndThumb = Math.max(Math.floor((this.max - endValue) / step), 0);
        this._tickMarks = Array(numInactiveBeforeStartThumb)
            .fill(QSliderTickMark.INACTIVE)
            .concat(Array(numActive).fill(QSliderTickMark.ACTIVE), Array(numInactiveAfterEndThumb).fill(QSliderTickMark.INACTIVE));
    }
    _updateStep(step) {
        this._step = step;
        this._isRange ? this._updateStepRange() : this._updateStepNonRange();
        this._onMinMaxOrStepChange();
    }
    _updateStepRange() {
        const endInput = this._getInput(QSliderThumbPosition.END);
        const startInput = this._getInput(QSliderThumbPosition.START);
        const oldEndValue = endInput.value;
        const oldStartValue = startInput.value;
        const prevStartValue = startInput.value;
        endInput.min = this._min;
        startInput.max = this._max;
        endInput.step = this._step;
        startInput.step = this._step;
        endInput.min = Math.max(this._min, startInput.value);
        startInput.max = Math.min(this._max, endInput.value);
        startInput._updateWidthInactive();
        endInput._updateWidthInactive();
        endInput.value < prevStartValue
            ? this._onTranslateXChangeBySideEffect(startInput, endInput)
            : this._onTranslateXChangeBySideEffect(endInput, startInput);
        if (oldEndValue !== endInput.value) {
            this._onValueChange(endInput);
        }
        if (oldStartValue !== startInput.value) {
            this._onValueChange(startInput);
        }
    }
    _updateStepNonRange() {
        const input = this._getInput(QSliderThumbPosition.END);
        if (input) {
            const oldValue = input.value;
            input.step = this._step;
            input._updateThumbUIByValue();
            if (oldValue !== input.value) {
                this._onValueChange(input);
            }
        }
    }
    _updateMaxRange(max) {
        const endInput = this._getInput(QSliderThumbPosition.END);
        const startInput = this._getInput(QSliderThumbPosition.START);
        const oldEndValue = endInput.value;
        const oldStartValue = startInput.value;
        endInput.max = max.new;
        startInput.max = Math.min(max.new, endInput.value);
        endInput.min = startInput.value;
        endInput._updateWidthInactive();
        startInput._updateWidthInactive();
        max.new > max.old
            ? this._onTranslateXChangeBySideEffect(startInput, endInput)
            : this._onTranslateXChangeBySideEffect(endInput, startInput);
        if (oldEndValue !== endInput.value) {
            this._onValueChange(endInput);
        }
        if (oldStartValue !== startInput.value) {
            this._onValueChange(startInput);
        }
    }
    _updateMaxNonRange(max) {
        const input = this._getInput(QSliderThumbPosition.END);
        if (input) {
            const oldValue = input.value;
            input.max = max;
            input._updateThumbUIByValue();
            this._updateTrackUI(input);
            if (oldValue !== input.value) {
                this._onValueChange(input);
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QSliderComponent, isStandalone: true, selector: "q-slider", inputs: { size: "size", valueLabel: ["valueLabel", "valueLabel", booleanAttribute], displayWith: "displayWith", dataQt: "dataQt", showTickMarks: ["showTickMarks", "showTickMarks", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute], tooltip: ["tooltip", "tooltip", booleanAttribute], min: ["min", "min", numberAttribute], max: ["max", "max", numberAttribute], step: ["step", "step", numberAttribute], minDistance: ["minDistance", "minDistance", numberAttribute] }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClassNames" } }, providers: [{ provide: Q_SLIDER, useExisting: QSliderComponent }], queries: [{ propertyName: "_input", first: true, predicate: Q_SLIDER_THUMB, descendants: true }, { propertyName: "_inputs", predicate: Q_SLIDER_RANGE_THUMB }], viewQueries: [{ propertyName: "_trackActive", first: true, predicate: ["trackActive"], descendants: true }, { propertyName: "_startThumbFocusIndicator", first: true, predicate: ["startThumbFocusIndicator"], descendants: true }, { propertyName: "_endThumbFocusIndicator", first: true, predicate: ["endThumbFocusIndicator"], descendants: true }, { propertyName: "_startVisualThumb", first: true, predicate: ["startThumb"], descendants: true }, { propertyName: "_endVisualThumb", first: true, predicate: ["endThumb"], descendants: true }, { propertyName: "_thumbs", predicate: Q_SLIDER_VISUAL_THUMB, descendants: true }], ngImport: i0, template: "<ng-content />\n\n<div class=\"q-slider-track\">\n  <div class=\"q-slider-track-inactive\"></div>\n  <div class=\"q-slider-track-active\">\n    <div #trackActive class=\"q-slider-track-active-fill\"></div>\n  </div>\n\n  <ng-container *ngIf=\"!showTickMarks\">\n    <div\n      class=\"q-slider-tick-mark-fixed q-slider-left\"\n      [class.q-slider-left-single]=\"!_isRange\"></div>\n    <div class=\"q-slider-tick-mark-fixed q-slider-right\"></div>\n  </ng-container>\n\n  <div *ngIf=\"showTickMarks && _cachedWidth\" class=\"q-slider-tick-marks\">\n    <div\n      *ngFor=\"let tickMark of _tickMarks; let i = index\"\n      [class]=\"tickMark === 0 ? 'q-slider-tick-mark-active' : 'q-slider-tick-mark-inactive'\"\n      [style.transform]=\"_calcTickMarkTransform(i)\"></div>\n  </div>\n</div>\n\n<ng-container *ngIf=\"_isRange\">\n  <q-slider-visual-thumb\n    #startThumb\n    [thumbPosition]=\"1\"\n    [tooltip]=\"tooltip\"\n    [valueIndicatorText]=\"_startValueIndicatorText\"\n    [disabled]=\"disabled\"\n    (focusChange)=\"_thumbFocusChange($event, startThumb)\"\n    (keyboardFocusChange)=\"_thumbKeyboardFocusChange($event, startThumb)\"\n    (hoverChange)=\"_thumbHoverChange($event, startThumb)\" />\n\n  <div\n    class=\"q-slider-thumb-hover\"\n    *ngIf=\"_startThumbHoverVisible\"\n    [style.transform]=\"startThumb?._hostElement?.style?.transform\"></div>\n\n  <div\n    *ngIf=\"_startThumbFocusVisible\"\n    #startThumbFocusIndicator\n    class=\"q-slider-thumb-focus\"\n    [style.transform]=\"startThumb?._hostElement?.style?.transform\"></div>\n\n  <div\n    [class.q-slider-thumb-keyboard-focus]=\"_startThumbKeyboardFocusVisible\"\n    [style.transform]=\"startThumb?._hostElement?.style?.transform\"></div>\n</ng-container>\n\n<q-slider-visual-thumb\n  #endThumb\n  [tooltip]=\"tooltip\"\n  [thumbPosition]=\"2\"\n  [valueIndicatorText]=\"_endValueIndicatorText\"\n  [disabled]=\"disabled\"\n  (focusChange)=\"_thumbFocusChange($event, endThumb)\"\n  (keyboardFocusChange)=\"_thumbKeyboardFocusChange($event, endThumb)\"\n  (hoverChange)=\"_thumbHoverChange($event, endThumb)\" />\n\n<div\n  *ngIf=\"_endThumbHoverVisible\"\n  class=\"q-slider-thumb-hover\"\n  [style.transform]=\"endThumb?._hostElement?.style?.transform\"></div>\n\n<div\n  *ngIf=\"_endThumbFocusVisible\"\n  #endThumbFocusIndicator\n  class=\"q-slider-thumb-focus\"\n  [style.transform]=\"endThumb?._hostElement?.style?.transform\"></div>\n\n<div\n  [class.q-slider-thumb-keyboard-focus]=\"_endThumbKeyboardFocusVisible\"\n  [style.transform]=\"endThumb?._hostElement?.style?.transform\"></div>\n\n<span class=\"q-slider-label-container\" *ngIf=\"valueLabel\">\n  <span class=\"q-slider-left-label\">{{ min }}</span>\n  <span class=\"q-slider-right-label\">{{ max }}</span>\n</span>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-slider{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;display:inline-block;box-sizing:border-box;outline:none;position:relative;-webkit-tap-highlight-color:transparent;vertical-align:middle;touch-action:pan-y;height:var(--ads-size-s)}.q-slider-track{position:absolute;transform:translateY(-50%);width:100%}.q-slider-track-active,.q-slider-track-inactive{display:flex;height:100%;position:absolute;width:100%}.q-slider-track-active{pointer-events:none;border-radius:var(--awds-slider-track-inactive-border-radius, var(--ads-border-radius-xl));background:var(--awds-slider-track-inactive-background, var(--ads-color-body-300));overflow:hidden}.q-slider-track-inactive{left:0;top:0}.q-slider-track-active-fill{border:var(--awds-slider-track-active-border-width, var(--ads-border-width-thick)) solid var(--awds-slider-track-active-border-color, var(--ads-color-primary-400));box-sizing:border-box;height:100%;width:100%;position:absolute;transform-origin:left}.q-slider-tick-marks{box-sizing:border-box;display:flex;align-items:center;justify-content:flex-start;pointer-events:none;position:relative}.q-slider-tick-mark-fixed{position:absolute;top:1px;background:var(--awds-slider-tick-mark-inactive-background, var(--ads-color-body-500));border-radius:var(--awds-slider-tick-mark-border-radius, var(--ads-border-radius-xl))}.q-slider-tick-mark-fixed.q-slider-left-single{background:var(--awds-slider-tick-mark-active-background, var(--ads-color-body-100));z-index:3}.q-slider-tick-mark-fixed.q-slider-left{left:var(--ads-size-nano)}.q-slider-tick-mark-fixed.q-slider-right{right:var(--ads-size-nano)}.q-slider-tick-mark-active,.q-slider-tick-mark-inactive{border-radius:var(--awds-slider-tick-mark-border-radius, var(--ads-border-radius-xl));position:absolute;left:var(--ads-size-nano)}.q-slider-tick-mark-active{background:var(--awds-slider-tick-mark-active-background, var(--ads-color-body-100))}.q-slider-tick-mark-inactive{background:var(--awds-slider-tick-mark-inactive-background, var(--ads-color-body-500))}.q-slider-input{box-sizing:content-box;pointer-events:auto;cursor:pointer;margin:0;height:var(--ads-size-s);opacity:0;position:absolute;top:0;z-index:2}.q-slider-input.q-slider-input-no-pointer-events{pointer-events:none}.q-slider-input.q-slider-right-input{left:auto;right:0}.q-slider-disabled{cursor:none}.q-slider-disabled .q-slider-tick-mark-active,.q-slider-disabled .q-slider-tick-mark-fixed.q-slider-left-single{background:var(--awds-slider-disabled-tick-mark-active-background, var(--ads-color-body-500))}.q-slider-disabled .q-slider-tick-mark-inactive,.q-slider-disabled .q-slider-tick-mark-fixed:not(.q-slider-left-single){background:var(--awds-slider-disabled-tick-mark-inactive-background, var(--ads-color-body-500))}.q-slider-disabled .q-slider-track-active{background:var(--awds-slider-disabled-track-inactive-background, var(--ads-color-body-400))}.q-slider-disabled .q-slider-track-active-fill{border-color:var(--awds-slider-disabled-track-active-border-color, var(--ads-color-body-400))}.q-slider-disabled .q-slider-thumb{pointer-events:none}.q-slider-disabled .q-slider-thumb-knob{background:var(--awds-slider-disabled-thumb-background, var(--ads-color-body-contrast-700));border-color:var(--awds-slider-disabled-thumb-border-color, var(--ads-color-body-400))}.q-slider-disabled .q-slider-thumb-knob-hovered{box-shadow:none}.q-slider-disabled .q-slider-input{cursor:default}.q-slider-label-container{font-family:var(--awds-slider-label-font-family, var(--ads-font-family-body));font-size:var(--awds-slider-label-font-size, var(--ads-font-size-xxs));font-style:var(--awds-slider-label-font-style, inherit);font-weight:var(--awds-slider-label-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-slider-label-letter-spacing, 0);line-height:var(--awds-slider-label-line-height, var(--ads-font-line-height-xxs));text-transform:var(--awds-slider-label-text-transform, none);display:flex;justify-content:space-between;width:100%;cursor:default;pointer-events:none;position:absolute;left:0}.q-slider-label-container .q-slider-left-label{display:block;color:var(--awds-slider-min-label-color, var(--ads-color-body-500))}.q-slider-label-container .q-slider-right-label{display:block;color:var(--awds-slider-max-label-color, var(--ads-color-body-500))}.q-slider-small{margin:0 var(--ads-size-micro);width:calc(100% - 2 * var(--ads-size-micro))}.q-slider-small .q-slider-track{top:calc((var(--ads-size-s) - var(--awds-slider-small-track-height, var(--ads-size-nano))) / 2)}.q-slider-small .q-slider-track-active{height:var(--awds-slider-small-track-height, var(--ads-size-nano))}.q-slider-small .q-slider-tick-mark-active,.q-slider-small .q-slider-tick-mark-inactive,.q-slider-small .q-slider-tick-mark-fixed{width:var(--awds-slider-small-tick-mark-width, var(--ads-size-quark));height:var(--awds-slider-small-tick-mark-height, var(--ads-size-quark));top:calc((var(--awds-slider-small-track-height, var(--ads-size-nano)) - var(--awds-slider-small-tick-mark-height, var(--ads-size-quark))) / 2)}.q-slider-small .q-slider-label-container{top:calc(var(--ads-size-s) + var(--ads-size-micro))}.q-slider-small:has(.q-slider-label-container){height:calc(var(--ads-size-s) + var(--ads-size-micro) + 18px)}.q-slider-medium{margin:0 var(--ads-size-xxxs);width:calc(100% - 2 * var(--ads-size-xxxs));height:var(--ads-size-m)}.q-slider-medium .q-slider-input{height:var(--ads-size-m)}.q-slider-medium .q-slider-track{top:calc((var(--ads-size-m) - var(--awds-slider-medium-track-height, var(--ads-size-micro))) / 2)}.q-slider-medium .q-slider-track-active{height:var(--awds-slider-medium-track-height, var(--ads-size-micro))}.q-slider-medium .q-slider-tick-mark-active,.q-slider-medium .q-slider-tick-mark-inactive,.q-slider-medium .q-slider-tick-mark-fixed{width:var(--awds-slider-medium-tick-mark-width, var(--ads-size-nano));height:var(--awds-slider-medium-tick-mark-height, var(--ads-size-nano));top:calc((var(--awds-slider-medium-track-height, var(--ads-size-micro)) - var(--awds-slider-medium-tick-mark-height, var(--ads-size-nano))) / 2)}.q-slider-medium .q-slider-label-container{top:calc(var(--ads-size-m) + var(--ads-size-micro))}.q-slider-medium:has(.q-slider-label-container){height:calc(var(--ads-size-m) + var(--ads-size-micro) + 18px)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: QSliderVisualThumbComponent, selector: "q-slider-visual-thumb", inputs: ["tooltip", "disabled", "thumbPosition", "valueIndicatorText"], outputs: ["focusChange", "keyboardFocusChange", "hoverChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-slider', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [NgIf, NgFor, QSliderVisualThumbComponent], providers: [{ provide: Q_SLIDER, useExisting: QSliderComponent }], template: "<ng-content />\n\n<div class=\"q-slider-track\">\n  <div class=\"q-slider-track-inactive\"></div>\n  <div class=\"q-slider-track-active\">\n    <div #trackActive class=\"q-slider-track-active-fill\"></div>\n  </div>\n\n  <ng-container *ngIf=\"!showTickMarks\">\n    <div\n      class=\"q-slider-tick-mark-fixed q-slider-left\"\n      [class.q-slider-left-single]=\"!_isRange\"></div>\n    <div class=\"q-slider-tick-mark-fixed q-slider-right\"></div>\n  </ng-container>\n\n  <div *ngIf=\"showTickMarks && _cachedWidth\" class=\"q-slider-tick-marks\">\n    <div\n      *ngFor=\"let tickMark of _tickMarks; let i = index\"\n      [class]=\"tickMark === 0 ? 'q-slider-tick-mark-active' : 'q-slider-tick-mark-inactive'\"\n      [style.transform]=\"_calcTickMarkTransform(i)\"></div>\n  </div>\n</div>\n\n<ng-container *ngIf=\"_isRange\">\n  <q-slider-visual-thumb\n    #startThumb\n    [thumbPosition]=\"1\"\n    [tooltip]=\"tooltip\"\n    [valueIndicatorText]=\"_startValueIndicatorText\"\n    [disabled]=\"disabled\"\n    (focusChange)=\"_thumbFocusChange($event, startThumb)\"\n    (keyboardFocusChange)=\"_thumbKeyboardFocusChange($event, startThumb)\"\n    (hoverChange)=\"_thumbHoverChange($event, startThumb)\" />\n\n  <div\n    class=\"q-slider-thumb-hover\"\n    *ngIf=\"_startThumbHoverVisible\"\n    [style.transform]=\"startThumb?._hostElement?.style?.transform\"></div>\n\n  <div\n    *ngIf=\"_startThumbFocusVisible\"\n    #startThumbFocusIndicator\n    class=\"q-slider-thumb-focus\"\n    [style.transform]=\"startThumb?._hostElement?.style?.transform\"></div>\n\n  <div\n    [class.q-slider-thumb-keyboard-focus]=\"_startThumbKeyboardFocusVisible\"\n    [style.transform]=\"startThumb?._hostElement?.style?.transform\"></div>\n</ng-container>\n\n<q-slider-visual-thumb\n  #endThumb\n  [tooltip]=\"tooltip\"\n  [thumbPosition]=\"2\"\n  [valueIndicatorText]=\"_endValueIndicatorText\"\n  [disabled]=\"disabled\"\n  (focusChange)=\"_thumbFocusChange($event, endThumb)\"\n  (keyboardFocusChange)=\"_thumbKeyboardFocusChange($event, endThumb)\"\n  (hoverChange)=\"_thumbHoverChange($event, endThumb)\" />\n\n<div\n  *ngIf=\"_endThumbHoverVisible\"\n  class=\"q-slider-thumb-hover\"\n  [style.transform]=\"endThumb?._hostElement?.style?.transform\"></div>\n\n<div\n  *ngIf=\"_endThumbFocusVisible\"\n  #endThumbFocusIndicator\n  class=\"q-slider-thumb-focus\"\n  [style.transform]=\"endThumb?._hostElement?.style?.transform\"></div>\n\n<div\n  [class.q-slider-thumb-keyboard-focus]=\"_endThumbKeyboardFocusVisible\"\n  [style.transform]=\"endThumb?._hostElement?.style?.transform\"></div>\n\n<span class=\"q-slider-label-container\" *ngIf=\"valueLabel\">\n  <span class=\"q-slider-left-label\">{{ min }}</span>\n  <span class=\"q-slider-right-label\">{{ max }}</span>\n</span>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-slider{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;display:inline-block;box-sizing:border-box;outline:none;position:relative;-webkit-tap-highlight-color:transparent;vertical-align:middle;touch-action:pan-y;height:var(--ads-size-s)}.q-slider-track{position:absolute;transform:translateY(-50%);width:100%}.q-slider-track-active,.q-slider-track-inactive{display:flex;height:100%;position:absolute;width:100%}.q-slider-track-active{pointer-events:none;border-radius:var(--awds-slider-track-inactive-border-radius, var(--ads-border-radius-xl));background:var(--awds-slider-track-inactive-background, var(--ads-color-body-300));overflow:hidden}.q-slider-track-inactive{left:0;top:0}.q-slider-track-active-fill{border:var(--awds-slider-track-active-border-width, var(--ads-border-width-thick)) solid var(--awds-slider-track-active-border-color, var(--ads-color-primary-400));box-sizing:border-box;height:100%;width:100%;position:absolute;transform-origin:left}.q-slider-tick-marks{box-sizing:border-box;display:flex;align-items:center;justify-content:flex-start;pointer-events:none;position:relative}.q-slider-tick-mark-fixed{position:absolute;top:1px;background:var(--awds-slider-tick-mark-inactive-background, var(--ads-color-body-500));border-radius:var(--awds-slider-tick-mark-border-radius, var(--ads-border-radius-xl))}.q-slider-tick-mark-fixed.q-slider-left-single{background:var(--awds-slider-tick-mark-active-background, var(--ads-color-body-100));z-index:3}.q-slider-tick-mark-fixed.q-slider-left{left:var(--ads-size-nano)}.q-slider-tick-mark-fixed.q-slider-right{right:var(--ads-size-nano)}.q-slider-tick-mark-active,.q-slider-tick-mark-inactive{border-radius:var(--awds-slider-tick-mark-border-radius, var(--ads-border-radius-xl));position:absolute;left:var(--ads-size-nano)}.q-slider-tick-mark-active{background:var(--awds-slider-tick-mark-active-background, var(--ads-color-body-100))}.q-slider-tick-mark-inactive{background:var(--awds-slider-tick-mark-inactive-background, var(--ads-color-body-500))}.q-slider-input{box-sizing:content-box;pointer-events:auto;cursor:pointer;margin:0;height:var(--ads-size-s);opacity:0;position:absolute;top:0;z-index:2}.q-slider-input.q-slider-input-no-pointer-events{pointer-events:none}.q-slider-input.q-slider-right-input{left:auto;right:0}.q-slider-disabled{cursor:none}.q-slider-disabled .q-slider-tick-mark-active,.q-slider-disabled .q-slider-tick-mark-fixed.q-slider-left-single{background:var(--awds-slider-disabled-tick-mark-active-background, var(--ads-color-body-500))}.q-slider-disabled .q-slider-tick-mark-inactive,.q-slider-disabled .q-slider-tick-mark-fixed:not(.q-slider-left-single){background:var(--awds-slider-disabled-tick-mark-inactive-background, var(--ads-color-body-500))}.q-slider-disabled .q-slider-track-active{background:var(--awds-slider-disabled-track-inactive-background, var(--ads-color-body-400))}.q-slider-disabled .q-slider-track-active-fill{border-color:var(--awds-slider-disabled-track-active-border-color, var(--ads-color-body-400))}.q-slider-disabled .q-slider-thumb{pointer-events:none}.q-slider-disabled .q-slider-thumb-knob{background:var(--awds-slider-disabled-thumb-background, var(--ads-color-body-contrast-700));border-color:var(--awds-slider-disabled-thumb-border-color, var(--ads-color-body-400))}.q-slider-disabled .q-slider-thumb-knob-hovered{box-shadow:none}.q-slider-disabled .q-slider-input{cursor:default}.q-slider-label-container{font-family:var(--awds-slider-label-font-family, var(--ads-font-family-body));font-size:var(--awds-slider-label-font-size, var(--ads-font-size-xxs));font-style:var(--awds-slider-label-font-style, inherit);font-weight:var(--awds-slider-label-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-slider-label-letter-spacing, 0);line-height:var(--awds-slider-label-line-height, var(--ads-font-line-height-xxs));text-transform:var(--awds-slider-label-text-transform, none);display:flex;justify-content:space-between;width:100%;cursor:default;pointer-events:none;position:absolute;left:0}.q-slider-label-container .q-slider-left-label{display:block;color:var(--awds-slider-min-label-color, var(--ads-color-body-500))}.q-slider-label-container .q-slider-right-label{display:block;color:var(--awds-slider-max-label-color, var(--ads-color-body-500))}.q-slider-small{margin:0 var(--ads-size-micro);width:calc(100% - 2 * var(--ads-size-micro))}.q-slider-small .q-slider-track{top:calc((var(--ads-size-s) - var(--awds-slider-small-track-height, var(--ads-size-nano))) / 2)}.q-slider-small .q-slider-track-active{height:var(--awds-slider-small-track-height, var(--ads-size-nano))}.q-slider-small .q-slider-tick-mark-active,.q-slider-small .q-slider-tick-mark-inactive,.q-slider-small .q-slider-tick-mark-fixed{width:var(--awds-slider-small-tick-mark-width, var(--ads-size-quark));height:var(--awds-slider-small-tick-mark-height, var(--ads-size-quark));top:calc((var(--awds-slider-small-track-height, var(--ads-size-nano)) - var(--awds-slider-small-tick-mark-height, var(--ads-size-quark))) / 2)}.q-slider-small .q-slider-label-container{top:calc(var(--ads-size-s) + var(--ads-size-micro))}.q-slider-small:has(.q-slider-label-container){height:calc(var(--ads-size-s) + var(--ads-size-micro) + 18px)}.q-slider-medium{margin:0 var(--ads-size-xxxs);width:calc(100% - 2 * var(--ads-size-xxxs));height:var(--ads-size-m)}.q-slider-medium .q-slider-input{height:var(--ads-size-m)}.q-slider-medium .q-slider-track{top:calc((var(--ads-size-m) - var(--awds-slider-medium-track-height, var(--ads-size-micro))) / 2)}.q-slider-medium .q-slider-track-active{height:var(--awds-slider-medium-track-height, var(--ads-size-micro))}.q-slider-medium .q-slider-tick-mark-active,.q-slider-medium .q-slider-tick-mark-inactive,.q-slider-medium .q-slider-tick-mark-fixed{width:var(--awds-slider-medium-tick-mark-width, var(--ads-size-nano));height:var(--awds-slider-medium-tick-mark-height, var(--ads-size-nano));top:calc((var(--awds-slider-medium-track-height, var(--ads-size-micro)) - var(--awds-slider-medium-tick-mark-height, var(--ads-size-nano))) / 2)}.q-slider-medium .q-slider-label-container{top:calc(var(--ads-size-m) + var(--ads-size-micro))}.q-slider-medium:has(.q-slider-label-container){height:calc(var(--ads-size-m) + var(--ads-size-micro) + 18px)}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], valueLabel: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], displayWith: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], showTickMarks: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tooltip: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], min: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], max: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], step: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], minDistance: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], _inputs: [{
                type: ContentChildren,
                args: [Q_SLIDER_RANGE_THUMB, { descendants: false }]
            }], _input: [{
                type: ContentChild,
                args: [Q_SLIDER_THUMB]
            }], _thumbs: [{
                type: ViewChildren,
                args: [Q_SLIDER_VISUAL_THUMB]
            }], _trackActive: [{
                type: ViewChild,
                args: ['trackActive']
            }], _startThumbFocusIndicator: [{
                type: ViewChild,
                args: ['startThumbFocusIndicator']
            }], _endThumbFocusIndicator: [{
                type: ViewChild,
                args: ['endThumbFocusIndicator']
            }], _startVisualThumb: [{
                type: ViewChild,
                args: ['startThumb']
            }], _endVisualThumb: [{
                type: ViewChild,
                args: ['endThumb']
            }], hostClassNames: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_SLIDER_COMPONENTS = [
    QSliderComponent,
    QSliderThumbDirective,
    QSliderRangeThumbDirective,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QSliderComponent, QSliderRangeThumbDirective, QSliderThumbDirective, QSliderThumbPosition, QSliderTickMark, Q_SLIDER_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-slider.mjs.map
