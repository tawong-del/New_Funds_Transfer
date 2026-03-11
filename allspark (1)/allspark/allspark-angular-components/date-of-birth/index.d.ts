import * as i0 from '@angular/core';
import { OnInit, EventEmitter } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, FormControl } from '@angular/forms';

type QDateOfBirthErrorPath = {
    control: AbstractControl;
    error: string;
    path: string;
};

declare class QDateOfBirthComponent implements OnInit, ControlValueAccessor {
    readonly dayChanged: EventEmitter<number>;
    readonly monthChanged: EventEmitter<number>;
    readonly yearChanged: EventEmitter<number>;
    readonly dateChanged: EventEmitter<Date>;
    minAge: number;
    readonly: boolean;
    maxAge: number | null;
    customTranslocoPath: string;
    customErrorPaths: QDateOfBirthErrorPath[];
    dataQt: string;
    get day(): number;
    set day(value: number);
    get month(): number;
    set month(value: number);
    get year(): number;
    set year(value: number);
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    hostClass: string;
    _months: {
        label: string;
        value: number;
    }[];
    _dateOfBirthFormGroup: FormGroup<{
        day: FormControl<number | null>;
        month: FormControl<number | null>;
        year: FormControl<number | null>;
    }>;
    _translocoCurrentErrorPath: string;
    private _onTouched;
    private _onChange;
    private _year;
    private _month;
    private _day;
    private _disabled;
    private readonly _destroy$;
    private readonly _translocoService;
    ngOnInit(): void;
    /** @hidden */
    writeValue(dateOfBirth: Date): void;
    /** @hidden */
    registerOnChange(fn: (value: Date) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    onNumberInput(event: Event, control: FormControl<number | null>): void;
    _onMonthFocus(): void;
    private _subscribeToChanges;
    private _handleFormTouch;
    private _handleFormValueChanges;
    private _handleFormDayChange;
    private _handleFormMonthChange;
    private _handleFormYearChange;
    private _updateDateOfBirthError;
    private _setCustomValidators;
    private _onlyDigits;
    private _getMonthNames;
    private _setMonthNames;
    private _format;
    private _dayValidator;
    private _yearValidator;
    private _ageValidator;
    private _futureDateOfBirthValidator;
    private _getValidDateOfBirth;
    private _calculateAge;
    private _updateAllValueAndValidity;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDateOfBirthComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDateOfBirthComponent, "q-date-of-birth", never, { "minAge": { "alias": "minAge"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "maxAge": { "alias": "maxAge"; "required": false; }; "customTranslocoPath": { "alias": "customTranslocoPath"; "required": false; }; "customErrorPaths": { "alias": "customErrorPaths"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "day": { "alias": "day"; "required": false; }; "month": { "alias": "month"; "required": false; }; "year": { "alias": "year"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "dayChanged": "dayChanged"; "monthChanged": "monthChanged"; "yearChanged": "yearChanged"; "dateChanged": "dateChanged"; }, never, never, true, never>;
    static ngAcceptInputType_minAge: unknown;
    static ngAcceptInputType_readonly: unknown;
}

export { QDateOfBirthComponent };
export type { QDateOfBirthErrorPath };
