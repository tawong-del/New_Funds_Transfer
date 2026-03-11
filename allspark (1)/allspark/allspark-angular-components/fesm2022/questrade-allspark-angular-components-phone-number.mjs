import * as i0 from '@angular/core';
import { EventEmitter, inject, ChangeDetectorRef, Injector, ElementRef, forwardRef, booleanAttribute, HostBinding, ViewChild, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupDirective, NgForm, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { translateSignal, TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { ErrorState, voidFn, injectDestroy } from '@questrade/allspark-angular-components/core/utils';
import { QCountryPickerComponent } from '@questrade/allspark-angular-components/country-picker';
import { QDropmenuOriginDirective } from '@questrade/allspark-angular-components/dropmenu';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';
import { QInputDirective } from '@questrade/allspark-angular-components/input';
import { MISSING_KEY_HANDLER } from '@questrade/allspark-angular-components/transloco';
import { takeUntil } from 'rxjs';

let nextUniqueId = 0;
class QPhoneNumberComponent extends ErrorState {
    countryChange = new EventEmitter();
    phoneNumberChange = new EventEmitter();
    countryIsoCode = 'CA';
    value = '';
    dropmenuDensity = 'default';
    disabled = false;
    readonly = false;
    visibleCountries = [];
    groups = [];
    errorStateMatcher = new ErrorStateMatcher();
    dataQt = 'q-phone-number';
    set hasError(value) {
        this._hasError = value;
        this.errorState = value;
        this.stateChanges.next();
    }
    get hasError() {
        return this._hasError || this.errorState;
    }
    countryPicker;
    controlId = `q-phone-number-${nextUniqueId++}`;
    hostClass = 'q-phone-number';
    onChange = voidFn;
    onTouch = voidFn;
    phoneNumberPlaceholder = translateSignal('phoneNumberPlaceholder');
    selectedCountry = null;
    _hasError = false;
    _changeDetectorRef = inject(ChangeDetectorRef);
    _injector = inject(Injector);
    _elementRef = inject(ElementRef);
    _destroy$ = injectDestroy();
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
    }
    ngOnInit() {
        this._setCountryPickerConfig();
        this._setComponentControl();
        this._subscribeToStateChanges();
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
        }
    }
    onInputChange(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value;
        if (this.value === value)
            return;
        this.value = value;
        this.onChange(this.value);
        this._updateErrorState();
        this.phoneNumberChange.emit(this.value);
        this._changeDetectorRef.markForCheck();
    }
    onCountryChange(event) {
        this.countryChange.emit(event);
    }
    onBlur() {
        this.onTouch();
    }
    /** @hidden */
    writeValue(value) {
        this.value = value;
        this._changeDetectorRef.markForCheck();
    }
    /** @hidden */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /** @hidden */
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /** @hidden */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }
    _setComponentControl() {
        const injectedControl = this._injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    _subscribeToStateChanges() {
        this.stateChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
    _setCountryPickerConfig() {
        this.countryPicker.customHostElement = this._elementRef;
        this.countryPicker.showTriggerCountryName = false;
        this.countryPicker.showTriggerCode = true;
        this.countryPicker.showOptionCode = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPhoneNumberComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QPhoneNumberComponent, isStandalone: true, selector: "q-phone-number", inputs: { countryIsoCode: "countryIsoCode", value: "value", dropmenuDensity: "dropmenuDensity", disabled: ["disabled", "disabled", booleanAttribute], readonly: ["readonly", "readonly", booleanAttribute], visibleCountries: "visibleCountries", groups: "groups", errorStateMatcher: "errorStateMatcher", dataQt: "dataQt", hasError: "hasError" }, outputs: { countryChange: "countryChange", phoneNumberChange: "phoneNumberChange" }, host: { properties: { "attr.data-qt": "this.dataQt", "attr.id": "this.controlId", "class": "this.hostClass" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QPhoneNumberComponent),
                multi: true,
            },
            { provide: FormFieldControl, useExisting: QPhoneNumberComponent },
            provideTranslocoScope({ scope: 'allspark-phone-number' }),
            MISSING_KEY_HANDLER,
        ], viewQueries: [{ propertyName: "countryPicker", first: true, predicate: QCountryPickerComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"q-phone-number-container\">\n  <q-country-picker\n    [value]=\"countryIsoCode\"\n    [density]=\"dropmenuDensity\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [visibleCountries]=\"visibleCountries\"\n    [groups]=\"groups\"\n    [hasError]=\"hasError\"\n    [errorStateMatcher]=\"errorStateMatcher\"\n    [dataQt]=\"`${dataQt}-country-picker`\"\n    (countrySelected)=\"onCountryChange($event)\" />\n\n  <input\n    qInput\n    #input\n    type=\"tel\"\n    autocomplete=\"off\"\n    [placeholder]=\"phoneNumberPlaceholder()\"\n    [attr.value]=\"value\"\n    [dataQt]=\"`${dataQt}-input`\"\n    [invalidState]=\"hasError\"\n    [attr.readonly]=\"readonly || null\"\n    [attr.disabled]=\"disabled || null\"\n    (input)=\"onInputChange($event)\"\n    (blur)=\"onBlur()\" />\n</div>\n", styles: [".q-phone-number{--awds-country-picker-container-width: auto;--awds-country-picker-container-padding: var(--ads-size-micro) var(--ads-size-xxxs);display:block}.q-phone-number-container{display:flex;gap:var(--ads-size-micro)}\n"], dependencies: [{ kind: "directive", type: QInputDirective, selector: "input[qInput]", inputs: ["errorStateMatcher", "invalidState", "controlId", "dataQt"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "component", type: QCountryPickerComponent, selector: "q-country-picker", inputs: ["value", "density", "readonly", "hasError", "visibleCountries", "groups", "showTriggerFlag", "dataQt", "disabled", "errorStateMatcher"], outputs: ["countrySelected", "valueChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPhoneNumberComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-phone-number', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [QInputDirective, TranslocoModule, QDropmenuOriginDirective, QCountryPickerComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QPhoneNumberComponent),
                            multi: true,
                        },
                        { provide: FormFieldControl, useExisting: QPhoneNumberComponent },
                        provideTranslocoScope({ scope: 'allspark-phone-number' }),
                        MISSING_KEY_HANDLER,
                    ], template: "<div class=\"q-phone-number-container\">\n  <q-country-picker\n    [value]=\"countryIsoCode\"\n    [density]=\"dropmenuDensity\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [visibleCountries]=\"visibleCountries\"\n    [groups]=\"groups\"\n    [hasError]=\"hasError\"\n    [errorStateMatcher]=\"errorStateMatcher\"\n    [dataQt]=\"`${dataQt}-country-picker`\"\n    (countrySelected)=\"onCountryChange($event)\" />\n\n  <input\n    qInput\n    #input\n    type=\"tel\"\n    autocomplete=\"off\"\n    [placeholder]=\"phoneNumberPlaceholder()\"\n    [attr.value]=\"value\"\n    [dataQt]=\"`${dataQt}-input`\"\n    [invalidState]=\"hasError\"\n    [attr.readonly]=\"readonly || null\"\n    [attr.disabled]=\"disabled || null\"\n    (input)=\"onInputChange($event)\"\n    (blur)=\"onBlur()\" />\n</div>\n", styles: [".q-phone-number{--awds-country-picker-container-width: auto;--awds-country-picker-container-padding: var(--ads-size-micro) var(--ads-size-xxxs);display:block}.q-phone-number-container{display:flex;gap:var(--ads-size-micro)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { countryChange: [{
                type: Output
            }], phoneNumberChange: [{
                type: Output
            }], countryIsoCode: [{
                type: Input
            }], value: [{
                type: Input
            }], dropmenuDensity: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], visibleCountries: [{
                type: Input
            }], groups: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], hasError: [{
                type: Input
            }], countryPicker: [{
                type: ViewChild,
                args: [QCountryPickerComponent, { static: true }]
            }], controlId: [{
                type: HostBinding,
                args: ['attr.id']
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/*
 * This file was automatically generated. Do not edit it manually.
 * If you need to update the ISO codes type, update the source file and run the command to generate this file.
 * Command: npm run types:country-iso-code
 */

/*
 * This file was automatically generated. Do not edit it manually.
 * If you need to update the country names type, update the source file and run the command to generate this file.
 * Command: npm run types:phone-number
 */

/**
 * Generated bundle index. Do not edit.
 */

export { QPhoneNumberComponent };
//# sourceMappingURL=questrade-allspark-angular-components-phone-number.mjs.map
