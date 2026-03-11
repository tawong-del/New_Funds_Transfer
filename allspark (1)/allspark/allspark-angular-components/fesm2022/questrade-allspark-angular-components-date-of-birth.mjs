import { coerceNumberProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { EventEmitter, inject, forwardRef, booleanAttribute, numberAttribute, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/forms';
import { FormGroup, FormControl, Validators, TouchedChangeEvent, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, FormGroupDirective } from '@angular/forms';
import * as i3 from '@jsverse/transloco';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { voidFn, range } from '@questrade/allspark-angular-components/core/utils';
import { QDropdownComponent } from '@questrade/allspark-angular-components/dropdown';
import * as i1 from '@questrade/allspark-angular-components/form-control';
import { Q_FORM_CONTROL_COMPONENTS } from '@questrade/allspark-angular-components/form-control';
import { QInputDirective } from '@questrade/allspark-angular-components/input';
import { MISSING_KEY_HANDLER, ALLSPARK_SCOPE } from '@questrade/allspark-angular-components/transloco';
import { takeUntil } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

class QDateOfBirthComponent {
    dayChanged = new EventEmitter();
    monthChanged = new EventEmitter();
    yearChanged = new EventEmitter();
    dateChanged = new EventEmitter();
    minAge = 18;
    readonly = false;
    maxAge = null;
    customTranslocoPath = '';
    customErrorPaths = [];
    dataQt = 'q-date-of-birth';
    get day() {
        return this._day;
    }
    set day(value) {
        if (this._day === value)
            return;
        this._dateOfBirthFormGroup.controls.day.setValue(coerceNumberProperty(value, null));
        this._day = value;
    }
    get month() {
        return this._month;
    }
    set month(value) {
        if (this._month === value)
            return;
        this._dateOfBirthFormGroup.controls.month.setValue(coerceNumberProperty(value, null));
        this._month = value;
    }
    get year() {
        return this._year;
    }
    set year(value) {
        if (this._year === value)
            return;
        this._dateOfBirthFormGroup.controls.year.setValue(coerceNumberProperty(value, null));
        this._year = value;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(isDisabled) {
        if (this._disabled === isDisabled)
            return;
        this._dateOfBirthFormGroup.disable();
        this._disabled = isDisabled;
    }
    hostClass = 'q-dob';
    _months = [];
    _dateOfBirthFormGroup = new FormGroup({
        day: new FormControl(null, [Validators.required, Validators.min(1)]),
        month: new FormControl(null, [Validators.required]),
        year: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
    _translocoCurrentErrorPath = '';
    _onTouched = voidFn;
    _onChange = voidFn;
    _year = 0;
    _month = 0;
    _day = 0;
    _disabled = false;
    _destroy$ = inject(QDestroyService);
    _translocoService = inject(TranslocoService);
    ngOnInit() {
        this._subscribeToChanges();
        this._setCustomValidators();
        this._translocoService.langChanges$
            .pipe(takeUntil(this._destroy$), distinctUntilChanged())
            .subscribe(() => this._setMonthNames());
    }
    /** @hidden */
    writeValue(dateOfBirth) {
        if (dateOfBirth) {
            this._dateOfBirthFormGroup.setValue({
                day: dateOfBirth.getDate(),
                month: dateOfBirth.getMonth() + 1,
                year: dateOfBirth.getFullYear(),
            }, { emitEvent: false });
        }
    }
    /** @hidden */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /** @hidden */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /** @hidden */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onNumberInput(event, control) {
        const target = event.target;
        let inputValue = target.value.slice(0, target.maxLength);
        if (!this._onlyDigits(inputValue)) {
            inputValue = inputValue.replace(/[^0-9]/g, '');
            target.value = inputValue;
            if (inputValue) {
                control.setValue(+inputValue, { emitEvent: false });
            }
        }
    }
    _onMonthFocus() {
        this._dateOfBirthFormGroup.controls.month.markAsTouched();
    }
    _subscribeToChanges() {
        this._dateOfBirthFormGroup.valueChanges
            .pipe(takeUntil(this._destroy$), distinctUntilChanged())
            .subscribe(this._handleFormValueChanges.bind(this));
        this._dateOfBirthFormGroup.events
            .pipe(takeUntil(this._destroy$), filter((event) => event instanceof TouchedChangeEvent))
            .subscribe(this._handleFormTouch.bind(this));
    }
    _handleFormTouch() {
        this._updateDateOfBirthError();
        this._onTouched();
    }
    _handleFormValueChanges({ day, month, year, }) {
        const finalDate = this._getValidDateOfBirth(this._dateOfBirthFormGroup);
        this._handleFormDayChange(day);
        this._handleFormMonthChange(month);
        this._handleFormYearChange(year);
        this._updateAllValueAndValidity();
        this._updateDateOfBirthError();
        if (!finalDate)
            return;
        this._onChange(finalDate);
        this.dateChanged.emit(finalDate);
    }
    _handleFormDayChange(value) {
        const day = coerceNumberProperty(value);
        if (!day || this._day === day || !this._onlyDigits(day))
            return;
        this._day = day;
        this.dayChanged.emit(day);
    }
    _handleFormMonthChange(value) {
        const month = coerceNumberProperty(value);
        if (!month || this._month === month)
            return;
        this._month = month;
        this.monthChanged.emit(month);
    }
    _handleFormYearChange(value) {
        const year = coerceNumberProperty(value);
        if (!year || this._year === year || !this._onlyDigits(year))
            return;
        this._year = year;
        this.yearChanged.emit(year);
    }
    _updateDateOfBirthError() {
        if (this._dateOfBirthFormGroup.untouched) {
            return;
        }
        const translateSlice = 'allspark.dateOfBirth.';
        const translatePath = `${this.customTranslocoPath || translateSlice}`;
        const defaultErrorPaths = [
            {
                control: this._dateOfBirthFormGroup.controls.day,
                error: 'required',
                path: `${translatePath}requiredDay`,
            },
            {
                control: this._dateOfBirthFormGroup.controls.day,
                error: 'invalidDay',
                path: `${translatePath}invalidDay`,
            },
            {
                control: this._dateOfBirthFormGroup.controls.day,
                error: 'min',
                path: `${translatePath}invalidDay`,
            },
            {
                control: this._dateOfBirthFormGroup.controls.month,
                error: 'required',
                path: `${translatePath}requiredMonth`,
            },
            {
                control: this._dateOfBirthFormGroup.controls.year,
                error: 'required',
                path: `${translatePath}requiredYear`,
            },
            {
                control: this._dateOfBirthFormGroup.controls.year,
                error: 'min',
                path: `${translatePath}invalidYear`,
            },
            {
                control: this._dateOfBirthFormGroup,
                error: 'futureDate',
                path: `${translatePath}futureDate`,
            },
            {
                control: this._dateOfBirthFormGroup,
                error: 'invalidMinAge',
                path: `${translatePath}invalidMinAge`,
            },
            {
                control: this._dateOfBirthFormGroup,
                error: 'invalidMaxAge',
                path: `${translatePath}invalidMaxAge`,
            },
        ];
        const errorPaths = [...defaultErrorPaths, ...this.customErrorPaths];
        for (const { control, error, path } of errorPaths) {
            if (control.touched && control.hasError(error)) {
                // TODO: Remove this once maxYear it's removed from the translation file
                this._translocoCurrentErrorPath =
                    this._translocoService.translate(path) === 'allspark.dateOfBirth.futureDate'
                        ? `${translatePath}maxYear`
                        : path;
                return;
            }
        }
        this._translocoCurrentErrorPath = this._dateOfBirthFormGroup.invalid
            ? `${translatePath}invalidDate`
            : '';
    }
    _setCustomValidators() {
        this._dateOfBirthFormGroup.controls.day.addValidators([this._dayValidator]);
        this._dateOfBirthFormGroup.controls.year.addValidators([this._yearValidator]);
        this._dateOfBirthFormGroup.addValidators([
            this._ageValidator,
            this._futureDateOfBirthValidator,
        ]);
        this._updateAllValueAndValidity();
    }
    _onlyDigits(value) {
        return /^[0-9]+$/.test(String(value));
    }
    _getMonthNames(style) {
        const activeLanguage = this._translocoService.getActiveLang();
        const dtf = new Intl.DateTimeFormat(activeLanguage, { month: style, timeZone: 'utc' });
        return range(12, (i) => this._format(dtf, new Date(2017, i, 1)));
    }
    _setMonthNames() {
        this._months = this._getMonthNames('long').map((monthName, index) => ({
            label: monthName,
            value: index + 1,
        }));
    }
    _format(dtf, date) {
        const d = new Date();
        d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return dtf.format(d);
    }
    _dayValidator = (control) => {
        const selectedDay = control.value;
        const daysInTheMonth = new Date(this._dateOfBirthFormGroup.controls.year.value || new Date().getFullYear(), this._dateOfBirthFormGroup.controls.month.value || new Date().getMonth(), 0).getDate();
        if (isNaN(daysInTheMonth))
            return null;
        if (!this._onlyDigits(selectedDay)) {
            return { required: true };
        }
        else if (daysInTheMonth >= selectedDay) {
            return null;
        }
        else {
            return { invalidDay: true };
        }
    };
    _yearValidator = (control) => {
        return this._onlyDigits(control.value) ? null : { required: true };
    };
    _ageValidator = (control) => {
        const validDateOfBirth = this._getValidDateOfBirth(control);
        if (!validDateOfBirth)
            return null;
        const age = this._calculateAge(validDateOfBirth);
        if (age < this.minAge) {
            return { invalidMinAge: true };
        }
        else if (this.maxAge && age > this.maxAge) {
            return { invalidMaxAge: true };
        }
        else {
            return null;
        }
    };
    _futureDateOfBirthValidator = (control) => {
        const validDateOfBirth = this._getValidDateOfBirth(control);
        if (!validDateOfBirth)
            return null;
        const today = new Date();
        return validDateOfBirth > today ? { futureDate: true } : null;
    };
    _getValidDateOfBirth(control) {
        const day = control.get('day')?.value;
        const month = control.get('month')?.value;
        const year = control.get('year')?.value;
        if ([day, month, year].some((value) => (value && isNaN(value)) || !value))
            return null;
        const birthDate = new Date(year, month - 1, day);
        // Date constructor returns 1900-1999 to values from 0 to 99
        // so we need to update the year to the correct value
        if (year < 100)
            birthDate.setFullYear(year);
        return birthDate;
    }
    _calculateAge(dateOfBirth) {
        const today = new Date();
        const age = today.getFullYear() - dateOfBirth.getFullYear();
        const ageMonth = today.getMonth() - dateOfBirth.getMonth();
        if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < dateOfBirth.getDate())) {
            return age - 1;
        }
        return age;
    }
    _updateAllValueAndValidity() {
        this._dateOfBirthFormGroup.controls.day.updateValueAndValidity({ emitEvent: false });
        this._dateOfBirthFormGroup.controls.month.updateValueAndValidity({ emitEvent: false });
        this._dateOfBirthFormGroup.controls.year.updateValueAndValidity({ emitEvent: false });
        this._dateOfBirthFormGroup.updateValueAndValidity({ emitEvent: false });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDateOfBirthComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QDateOfBirthComponent, isStandalone: true, selector: "q-date-of-birth", inputs: { minAge: ["minAge", "minAge", numberAttribute], readonly: ["readonly", "readonly", booleanAttribute], maxAge: "maxAge", customTranslocoPath: "customTranslocoPath", customErrorPaths: "customErrorPaths", dataQt: "dataQt", day: "day", month: "month", year: "year", disabled: "disabled" }, outputs: { dayChanged: "dayChanged", monthChanged: "monthChanged", yearChanged: "yearChanged", dateChanged: "dateChanged" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QDateOfBirthComponent),
                multi: true,
            },
            QDestroyService,
            MISSING_KEY_HANDLER,
            ALLSPARK_SCOPE,
            FormGroupDirective,
        ], ngImport: i0, template: "<ng-container *transloco=\"let t\">\n  <q-form-control class=\"q-dob-form-control\" [formGroup]=\"_dateOfBirthFormGroup\">\n    <div qLabel>{{ t('allspark.dateOfBirth.label') }}</div>\n\n    <input\n      type=\"text\"\n      qInput\n      maxlength=\"2\"\n      class=\"q-dob-day\"\n      [readonly]=\"readonly\"\n      [formControl]=\"_dateOfBirthFormGroup.controls.day\"\n      [placeholder]=\"t('allspark.dateOfBirth.day')\"\n      [dataQt]=\"`${dataQt}-day`\"\n      (input)=\"onNumberInput($event, _dateOfBirthFormGroup.controls.day)\" />\n\n    <q-dropdown\n      class=\"q-dob-month\"\n      [formControl]=\"_dateOfBirthFormGroup.controls.month\"\n      [readonly]=\"readonly\"\n      [options]=\"_months\"\n      [placeholder]=\"t('allspark.dateOfBirth.month')\"\n      [dataQt]=\"`${dataQt}-month`\"\n      (inputFocus)=\"_onMonthFocus()\" />\n\n    <input\n      type=\"text\"\n      qInput\n      maxlength=\"4\"\n      class=\"q-dob-year\"\n      [readonly]=\"readonly\"\n      [formControl]=\"_dateOfBirthFormGroup.controls.year\"\n      [placeholder]=\"t('allspark.dateOfBirth.year')\"\n      [dataQt]=\"`${dataQt}-year`\"\n      (input)=\"onNumberInput($event, _dateOfBirthFormGroup.controls.year)\" />\n\n    <div qHint>{{ t('allspark.dateOfBirth.hint') }}</div>\n    <div qError>{{ t(_translocoCurrentErrorPath, { minAge, maxAge }) }}</div>\n  </q-form-control>\n</ng-container>\n", styles: [".q-dob-day{width:var(--awds-date-of-birth-day-input-width, 106px);min-width:var(--awds-date-of-birth-day-input-min-width, 66px)}.q-dob-month{max-width:var(--awds-date-of-birth-month-input-width, 155px);min-width:var(--awds-date-of-birth-month-input-min-width, 139px)}.q-dob-year{width:var(--awds-date-of-birth-year-input-width, 106px);min-width:var(--awds-date-of-birth-year-input-min-width, 71px)}\n"], dependencies: [{ kind: "component", type: i1.QFormControlComponent, selector: "q-form-control", inputs: ["preserveFooterSpace", "showErrorIcon", "dataQt"] }, { kind: "directive", type: i1.QLabelDirective, selector: "[qLabel]" }, { kind: "directive", type: i1.QHintDirective, selector: "[qHint]" }, { kind: "directive", type: i1.QErrorDirective, selector: "[qError]" }, { kind: "component", type: QDropdownComponent, selector: "q-dropdown", inputs: ["errorStateMatcher", "controlId", "loadingVariant", "loadingSkeletonTemplate", "placeholder", "disabled", "readonly", "customSearch", "searchCaseSensitive", "searchResultsSize", "searchDebounce", "searchGramSize", "loading", "searchable", "dataQt", "dropmenuWidth", "dropmenuDensity", "dropmenuFooterMessage", "dropmenuFooterTemplate", "dropmenuEmptyStateTemplate", "dropmenuOptionTemplate", "groupLabelTemplate", "groupBy", "groupLabel", "options", "hasError", "value"], outputs: ["valueChange", "inputChange", "inputFocus", "inputBlur"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: QInputDirective, selector: "input[qInput]", inputs: ["errorStateMatcher", "invalidState", "controlId", "dataQt"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: i3.TranslocoDirective, selector: "[transloco]", inputs: ["transloco", "translocoParams", "translocoScope", "translocoRead", "translocoPrefix", "translocoLang", "translocoLoadingTpl"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDateOfBirthComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-date-of-birth', imports: [
                        Q_FORM_CONTROL_COMPONENTS,
                        QDropdownComponent,
                        FormsModule,
                        QInputDirective,
                        ReactiveFormsModule,
                        TranslocoModule,
                    ], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QDateOfBirthComponent),
                            multi: true,
                        },
                        QDestroyService,
                        MISSING_KEY_HANDLER,
                        ALLSPARK_SCOPE,
                        FormGroupDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *transloco=\"let t\">\n  <q-form-control class=\"q-dob-form-control\" [formGroup]=\"_dateOfBirthFormGroup\">\n    <div qLabel>{{ t('allspark.dateOfBirth.label') }}</div>\n\n    <input\n      type=\"text\"\n      qInput\n      maxlength=\"2\"\n      class=\"q-dob-day\"\n      [readonly]=\"readonly\"\n      [formControl]=\"_dateOfBirthFormGroup.controls.day\"\n      [placeholder]=\"t('allspark.dateOfBirth.day')\"\n      [dataQt]=\"`${dataQt}-day`\"\n      (input)=\"onNumberInput($event, _dateOfBirthFormGroup.controls.day)\" />\n\n    <q-dropdown\n      class=\"q-dob-month\"\n      [formControl]=\"_dateOfBirthFormGroup.controls.month\"\n      [readonly]=\"readonly\"\n      [options]=\"_months\"\n      [placeholder]=\"t('allspark.dateOfBirth.month')\"\n      [dataQt]=\"`${dataQt}-month`\"\n      (inputFocus)=\"_onMonthFocus()\" />\n\n    <input\n      type=\"text\"\n      qInput\n      maxlength=\"4\"\n      class=\"q-dob-year\"\n      [readonly]=\"readonly\"\n      [formControl]=\"_dateOfBirthFormGroup.controls.year\"\n      [placeholder]=\"t('allspark.dateOfBirth.year')\"\n      [dataQt]=\"`${dataQt}-year`\"\n      (input)=\"onNumberInput($event, _dateOfBirthFormGroup.controls.year)\" />\n\n    <div qHint>{{ t('allspark.dateOfBirth.hint') }}</div>\n    <div qError>{{ t(_translocoCurrentErrorPath, { minAge, maxAge }) }}</div>\n  </q-form-control>\n</ng-container>\n", styles: [".q-dob-day{width:var(--awds-date-of-birth-day-input-width, 106px);min-width:var(--awds-date-of-birth-day-input-min-width, 66px)}.q-dob-month{max-width:var(--awds-date-of-birth-month-input-width, 155px);min-width:var(--awds-date-of-birth-month-input-min-width, 139px)}.q-dob-year{width:var(--awds-date-of-birth-year-input-width, 106px);min-width:var(--awds-date-of-birth-year-input-min-width, 71px)}\n"] }]
        }], propDecorators: { dayChanged: [{
                type: Output
            }], monthChanged: [{
                type: Output
            }], yearChanged: [{
                type: Output
            }], dateChanged: [{
                type: Output
            }], minAge: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], maxAge: [{
                type: Input
            }], customTranslocoPath: [{
                type: Input
            }], customErrorPaths: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], day: [{
                type: Input
            }], month: [{
                type: Input
            }], year: [{
                type: Input
            }], disabled: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QDateOfBirthComponent };
//# sourceMappingURL=questrade-allspark-angular-components-date-of-birth.mjs.map
