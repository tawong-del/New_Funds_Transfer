import * as i0 from '@angular/core';
import { AfterViewInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

declare class QSwitchComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    readonly checkedChange: EventEmitter<{
        value: boolean;
        nativeEvent: Event;
    }>;
    checked: boolean;
    disabled: boolean;
    dataQt: string;
    _onKeyDown(event: KeyboardEvent): void;
    readonly inputElementRef: i0.Signal<ElementRef<HTMLInputElement> | undefined>;
    private _onChange;
    private _onTouch;
    private readonly _changeDetectorRef;
    private readonly _focusMonitor;
    private readonly _elementRef;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** @hidden */
    writeValue(value: boolean): void;
    /** @hidden */
    registerOnChange(fn: (_: boolean) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    protected onTouchTargetClick(event: Event): void;
    protected onInputBlur(): void;
    private _onInputInteraction;
    private _emitChangeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QSwitchComponent, "q-switch", never, { "checked": { "alias": "checked"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "checkedChange": "checkedChange"; }, never, ["*"], true, never>;
    static ngAcceptInputType_checked: unknown;
    static ngAcceptInputType_disabled: unknown;
}

export { QSwitchComponent };
