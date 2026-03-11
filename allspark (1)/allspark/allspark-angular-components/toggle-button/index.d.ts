import * as i0 from '@angular/core';
import { DoCheck, OnInit, OnChanges, AfterViewInit, ElementRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';

type QToggleButtonGroupVariant = 'standard' | 'alternate';

interface QToggleButtonGroup<T> {
    value: T | null;
    type: QToggleButtonGroupVariant;
    widthStrategy: 'auto' | '100%';
    disabled: boolean;
    _onTouched: () => void;
}

declare class QToggleButtonGroupComponent<T> extends ErrorState implements ControlValueAccessor, FormFieldControl, DoCheck, OnInit, OnChanges, AfterViewInit, QToggleButtonGroup<T> {
    controlId: string;
    widthStrategy: 'auto' | '100%';
    errorStateMatcher: ErrorStateMatcherInterface;
    dataQt: string;
    set type(value: QToggleButtonGroupVariant);
    get type(): QToggleButtonGroupVariant;
    set value(value: T | null);
    get value(): T | null;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _buttons;
    _indicatorRef: ElementRef<HTMLElement>;
    _selectedElementIndex: number | null;
    _onTouched: () => void;
    _controlValueAccessorChangeFn: (value: T | null) => void;
    private _type;
    private _value;
    private _disabled;
    private readonly _sharedResizeObserverService;
    private readonly _document;
    private readonly _destroy$;
    private readonly _elementRef;
    private readonly _changeDetector;
    private readonly injector;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    /** @hidden */
    writeValue(value: T): void;
    /** @hidden */
    registerOnChange(fn: (value: T | null) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    /** @hidden */
    markButtonsForCheck(): void;
    get selectedElementWidth(): number | null;
    get selectedElement(): ElementRef<HTMLButtonElement> | null;
    get indicatorLeftPosition(): number | null;
    private setComponentControl;
    private setIndicatorPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToggleButtonGroupComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QToggleButtonGroupComponent<any>, "q-toggle-button-group", never, { "controlId": { "alias": "controlId"; "required": false; }; "widthStrategy": { "alias": "widthStrategy"; "required": false; }; "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, ["_buttons"], ["*"], true, never>;
}

declare class QToggleButtonComponent<T> {
    value: T | null;
    dataQt: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    set type(value: QToggleButtonGroupVariant);
    get type(): QToggleButtonGroupVariant;
    get selected(): boolean;
    set selected(value: boolean);
    get widthStyle(): string;
    toggleButtonGroup: QToggleButtonGroup<T> | null;
    readonly _elementRef: ElementRef<any>;
    private _selected;
    private _disabled;
    private _type;
    private readonly _changeDetector;
    onButtonClick(event: Event): void;
    _markForCheck(): void;
    get standalone(): boolean;
    get width(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToggleButtonComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QToggleButtonComponent<any>, "q-toggle-button", never, { "value": { "alias": "value"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare const Q_TOGGLE_BUTTON_COMPONENTS: readonly [typeof QToggleButtonComponent, typeof QToggleButtonGroupComponent];

export { QToggleButtonComponent, QToggleButtonGroupComponent, Q_TOGGLE_BUTTON_COMPONENTS };
export type { QToggleButtonGroup, QToggleButtonGroupVariant };
