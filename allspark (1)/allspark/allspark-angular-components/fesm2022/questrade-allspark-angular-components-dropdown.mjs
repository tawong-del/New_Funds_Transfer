import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injector, EventEmitter, ChangeDetectorRef, forwardRef, booleanAttribute, numberAttribute, HostBinding, ViewChild, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/forms';
import { FormGroupDirective, NgForm, NgControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dropdownAnimations } from '@questrade/allspark-angular-components/core/animations';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { ErrorState, voidFn, ENTER, DOWN_ARROW, UP_ARROW, nGramScore } from '@questrade/allspark-angular-components/core/utils';
import { QDropmenuComponent, QDropmenuOriginDirective } from '@questrade/allspark-angular-components/dropmenu';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { QInputDirective, QInputGroupComponent } from '@questrade/allspark-angular-components/input';
import { check, dropArrowDown, dropArrowUp } from '@questrade/allspark-icons/icons';
import { BehaviorSubject, takeUntil, debounceTime } from 'rxjs';

let nextUniqueId = 0;
class QDropdownComponent extends ErrorState {
    injector = inject(Injector);
    valueChange = new EventEmitter();
    inputChange = new EventEmitter();
    inputFocus = new EventEmitter();
    inputBlur = new EventEmitter();
    errorStateMatcher = new ErrorStateMatcher();
    controlId = `q-dropdown-${nextUniqueId++}`;
    loadingVariant = 'spinner';
    loadingSkeletonTemplate = null;
    placeholder = '';
    disabled = false;
    readonly = false;
    customSearch = false;
    searchCaseSensitive = false;
    searchResultsSize = 10;
    searchDebounce = 0;
    searchGramSize = 2;
    loading = false;
    searchable = true;
    dataQt = 'q-dropdown';
    dropmenuWidth = 'full';
    dropmenuDensity = 'default';
    dropmenuFooterMessage = '';
    dropmenuFooterTemplate = null;
    dropmenuEmptyStateTemplate = null;
    dropmenuOptionTemplate = null;
    groupLabelTemplate = null;
    groupBy = null;
    groupLabel = null;
    get options() {
        return this._filteredOptions ?? this._options;
    }
    set options(value) {
        this._options = value;
        this._selectedOption = this._findSelectedOption();
        this._triggerValue = this._selectedOption?.label || '';
        this._inputValue = this._selectedOption?.label ?? '';
    }
    get hasError() {
        return this._hasError || this.errorState;
    }
    set hasError(value) {
        this._hasError = value;
        this.stateChanges.next();
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this._selectedOption = this._findSelectedOption();
        this._triggerValue = this._selectedOption?.label || '';
        this._inputValue = this._selectedOption?.label ?? '';
        this._cdr.markForCheck();
    }
    _buttonRef;
    _inputRef;
    _dropmenuRef;
    _hostClass = 'q-dropdown';
    _selectedOption = null;
    _searchStringObservable$ = null;
    _inputValue = '';
    _hasError = false;
    _triggerValue = '';
    _onChange = voidFn;
    _onTouch = voidFn;
    _options = [];
    _searchString$ = new BehaviorSubject('');
    _filteredOptions = null;
    _value;
    _destroy$ = inject(QDestroyService);
    _cdr = inject(ChangeDetectorRef);
    _iconRegistry = inject(QIconRegistryService);
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
        this.stateChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._cdr.markForCheck();
        });
        this._searchStringObservable$ = this._searchString$.asObservable();
        this._iconRegistry.registerIcons([check, dropArrowDown, dropArrowUp]);
    }
    ngOnInit() {
        this.setComponentControl();
        this._searchString$
            .pipe(debounceTime(this.searchDebounce), takeUntil(this._destroy$))
            .subscribe(this._onSearchStringUpdate.bind(this));
        if (this.searchable) {
            this._dropmenuRef._withTypeahead = false;
            this._dropmenuRef._selectKeys = [ENTER];
        }
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
        }
    }
    ngOnChanges(changes) {
        const { disabled, readonly } = changes;
        if ((disabled || readonly) && this.isDropdownOpened) {
            this._toggle();
        }
    }
    _onValueChanged(event) {
        this.valueChange.emit(event);
    }
    _onDropmenuSelection({ option }) {
        const selectedValue = option.value;
        if (!selectedValue)
            return;
        this.value = selectedValue;
        this._triggerValue = option.label;
        this._searchString$.next('');
        this._onChange(this.value);
    }
    _onInputChange(event) {
        const value = event.target.value;
        this._searchString$.next(value);
        if (this._dropmenuRef) {
            this._dropmenuRef._getDropmenuHostElement().scrollTop = 8;
        }
        this.inputChange.emit(value);
        if (!this._dropmenuRef.isOpened && !this.readonly) {
            this._dropmenuRef.open();
        }
    }
    _onInputBlur(event) {
        const value = event.target.value;
        if ((!value || !this._dropmenuRef.options.length) && this._selectedOption) {
            this._inputValue = this._selectedOption.label;
            this._searchString$.next('');
        }
        this.inputBlur.emit(event);
    }
    _onInputFocus(event) {
        this.inputFocus.emit(event);
    }
    _onArrowIconClick() {
        if (this.searchable && !this.disabled && !this.readonly) {
            this._toggle();
        }
    }
    _onInputClick() {
        if (!this.disabled && !this.readonly && !this._dropmenuRef.isOpened) {
            this._dropmenuRef.open();
        }
    }
    _onButtonTriggerClick() {
        if (this.disabled || this.readonly || this._dropmenuRef.isOpened)
            return;
        this._dropmenuRef.open();
    }
    _onButtonTriggerKeydown(event) {
        if (this.disabled || this.readonly)
            return;
        if ([DOWN_ARROW, UP_ARROW].includes(event.code) && !this._dropmenuRef.isOpened) {
            event.stopPropagation();
            this._dropmenuRef.open();
        }
    }
    _onInputTriggerKeyDown(event) {
        if (this.disabled || this.readonly)
            return;
        if ([DOWN_ARROW, UP_ARROW, ENTER].includes(event.code) && !this._dropmenuRef.isOpened) {
            event.stopPropagation();
            this._dropmenuRef.open();
        }
    }
    _onDropmenuClose() {
        this._onTouch();
    }
    /** @hidden */
    writeValue(value) {
        this.value = value;
    }
    /** @hidden */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /** @hidden */
    registerOnTouched(fn) {
        this._onTouch = fn;
    }
    /** @hidden */
    setDisabledState(disabled) {
        this.disabled = disabled;
        this._cdr.markForCheck();
    }
    get isDropdownOpened() {
        return !!this._dropmenuRef?.isOpened;
    }
    setComponentControl() {
        const injectedControl = this.injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    _toggle() {
        if (this.isDropdownOpened) {
            this._dropmenuRef.close();
        }
        else {
            this._dropmenuRef.open();
        }
    }
    _findSelectedOption() {
        return this._options?.find((option) => option.value === this.value) ?? null;
    }
    _onSearchStringUpdate(value) {
        if (value === '' || this.customSearch) {
            this._filteredOptions = null;
        }
        else {
            this._filteredOptions = [...this._options]
                .filter((option) => !option.disabled &&
                nGramScore(option.label, value, this.searchCaseSensitive, this.searchGramSize) > 0)
                .sort((a, b) => nGramScore(b.label, value, this.searchCaseSensitive, this.searchGramSize) -
                nGramScore(a.label, value, this.searchCaseSensitive, this.searchGramSize))
                .slice(0, this.searchResultsSize);
        }
        this._cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QDropdownComponent, isStandalone: true, selector: "q-dropdown", inputs: { errorStateMatcher: "errorStateMatcher", controlId: "controlId", loadingVariant: "loadingVariant", loadingSkeletonTemplate: "loadingSkeletonTemplate", placeholder: "placeholder", disabled: ["disabled", "disabled", booleanAttribute], readonly: ["readonly", "readonly", booleanAttribute], customSearch: ["customSearch", "customSearch", booleanAttribute], searchCaseSensitive: ["searchCaseSensitive", "searchCaseSensitive", booleanAttribute], searchResultsSize: ["searchResultsSize", "searchResultsSize", numberAttribute], searchDebounce: ["searchDebounce", "searchDebounce", numberAttribute], searchGramSize: ["searchGramSize", "searchGramSize", numberAttribute], loading: ["loading", "loading", booleanAttribute], searchable: ["searchable", "searchable", booleanAttribute], dataQt: "dataQt", dropmenuWidth: "dropmenuWidth", dropmenuDensity: "dropmenuDensity", dropmenuFooterMessage: "dropmenuFooterMessage", dropmenuFooterTemplate: "dropmenuFooterTemplate", dropmenuEmptyStateTemplate: "dropmenuEmptyStateTemplate", dropmenuOptionTemplate: "dropmenuOptionTemplate", groupLabelTemplate: "groupLabelTemplate", groupBy: "groupBy", groupLabel: "groupLabel", options: "options", hasError: "hasError", value: "value" }, outputs: { valueChange: "valueChange", inputChange: "inputChange", inputFocus: "inputFocus", inputBlur: "inputBlur" }, host: { properties: { "class.q-dropdown-searchable": "this.searchable", "attr.data-qt": "this.dataQt", "class": "this._hostClass" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QDropdownComponent),
                multi: true,
            },
            { provide: FormFieldControl, useExisting: QDropdownComponent },
            QDestroyService,
        ], viewQueries: [{ propertyName: "_buttonRef", first: true, predicate: ["button"], descendants: true }, { propertyName: "_inputRef", first: true, predicate: ["input"], descendants: true }, { propertyName: "_dropmenuRef", first: true, predicate: QDropmenuComponent, descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"q-dropdown-trigger\"\n  qDropmenuOrigin\n  #dropdownTrigger=\"qDropmenuOrigin\"\n  [class.q-dropdown-trigger-expanded]=\"isDropdownOpened\">\n  <ng-container *ngIf=\"searchable; else buttonTrigger\">\n    <q-input-group\n      [prefix]=\"_selectedOption?.icon && _inputValue === _selectedOption?.label ? prefixIcon : null\"\n      [suffix]=\"arrowIcon\">\n      <input\n        qInput\n        #input\n        class=\"q-dropdown-input\"\n        autocomplete=\"off\"\n        [(ngModel)]=\"_inputValue\"\n        [placeholder]=\"placeholder\"\n        [invalidState]=\"hasError\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        [dataQt]=\"`${dataQt}-input`\"\n        [attr.id]=\"controlId\"\n        (focus)=\"_onInputFocus($event)\"\n        (blur)=\"_onInputBlur($event)\"\n        (input)=\"_onInputChange($event)\"\n        (keydown)=\"_onInputTriggerKeyDown($event)\"\n        (click)=\"_onInputClick()\" />\n    </q-input-group>\n  </ng-container>\n</div>\n\n<q-dropmenu\n  #dropmenuRef\n  [density]=\"dropmenuDensity\"\n  [options]=\"options\"\n  [dropmenuTrigger]=\"dropdownTrigger\"\n  [value]=\"value\"\n  [minWidth]=\"0\"\n  [fitOverlayWidth]=\"dropmenuWidth === 'full'\"\n  [textToHighlight]=\"(_searchStringObservable$ | async) || ''\"\n  [highlightCaseSensitive]=\"searchCaseSensitive\"\n  [loading]=\"loading\"\n  [loadingVariant]=\"loadingVariant\"\n  [loadingSkeletonTemplate]=\"loadingSkeletonTemplate\"\n  [footerMessage]=\"dropmenuFooterMessage\"\n  [footerTemplate]=\"dropmenuFooterTemplate\"\n  [dataQt]=\"`${dataQt}-dropmenu`\"\n  [optionTemplate]=\"dropmenuOptionTemplate\"\n  [emptyStateTemplate]=\"dropmenuEmptyStateTemplate\"\n  [groupBy]=\"groupBy\"\n  [groupLabel]=\"groupLabel\"\n  [groupLabelTemplate]=\"groupLabelTemplate\"\n  (valueChange)=\"_onValueChanged($event)\"\n  (selectionChange)=\"_onDropmenuSelection($event)\"\n  (closed)=\"_onDropmenuClose()\" />\n\n<ng-template #buttonTrigger>\n  <button\n    #button\n    type=\"button\"\n    class=\"q-dropdown-button q-focus-indicator-inset\"\n    [class.q-dropdown-button-readonly]=\"readonly\"\n    [class.error]=\"hasError\"\n    [attr.id]=\"controlId\"\n    [disabled]=\"disabled\"\n    (click)=\"_onButtonTriggerClick()\"\n    (keydown)=\"_onButtonTriggerKeydown($event)\">\n    <ng-container *ngIf=\"_selectedOption?.icon\" [ngTemplateOutlet]=\"prefixIcon\" />\n\n    <div *ngIf=\"_triggerValue; else placeholderBlock\" class=\"q-dropdown-content\">\n      {{ _triggerValue }}\n    </div>\n\n    <ng-template #placeholderBlock>\n      <span class=\"q-dropdown-placeholder\" [class.q-dropdown-placeholder-readonly]=\"readonly\">\n        {{ placeholder }}\n      </span>\n    </ng-template>\n\n    <ng-container [ngTemplateOutlet]=\"arrowIcon\" />\n  </button>\n</ng-template>\n\n<ng-template #arrowIcon>\n  <q-icon\n    [name]=\"'dropArrowDown'\"\n    [@triggerRotate]=\"isDropdownOpened ? 'expanded' : 'collapsed'\"\n    (click)=\"_onArrowIconClick()\"\n    class=\"q-icon-arrow\"\n    [size]=\"'24'\"\n    [dataQt]=\"`${dataQt}-arrow-icon`\" />\n</ng-template>\n\n<ng-template #prefixIcon>\n  <q-icon\n    class=\"q-dropdown-icon\"\n    [size]=\"'24'\"\n    [name]=\"_selectedOption?.icon ?? ''\"\n    [dataQt]=\"`${dataQt}-option-icon`\" />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropdown{display:block;width:100%}.q-dropdown-button{background:none;border:none;outline:none;padding:0;margin:0;cursor:pointer;font-size:inherit;color:inherit;-webkit-user-select:none;user-select:none;width:var(--awds-dropdown-trigger-width, 100%);min-width:var(--awds-dropdown-trigger-min-width, auto);height:var(--awds-dropdown-trigger-height, var(--ads-size-xl));min-height:var(--awds-dropdown-trigger-min-height, var(--ads-size-xl));background:var(--awds-dropdown-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));border-radius:var(--awds-dropdown-trigger-border-radius, var(--ads-border-radius-s));color:var(--awds-dropdown-trigger-color, var(--ads-color-body-contrast-100));font-family:unset;text-align:inherit;white-space:nowrap;overflow:auto;justify-content:space-between;display:flex;align-items:center;appearance:none;font-size:var(--ads-font-size-s);line-height:var(--ads-font-line-height-s);text-decoration:none;padding:var(--awds-dropdown-trigger-padding, 0 var(--ads-size-xxxs) 0 var(--ads-size-xxxs));gap:var(--awds-dropdown-trigger-gap, var(--ads-size-nano))}.q-dropdown-button:hover:not(.error):not([disabled]):not(:focus),.q-dropdown-button[aria-expanded=false]{background:var(--awds-dropdown-hover-trigger-background, var(--ads-color-body-100))}.q-dropdown-button:focus,.q-dropdown-button.q-dropdown-trigger-readonly:focus,.q-dropdown-button[aria-expanded=true]{background:var(--awds-dropdown-focus-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-focus-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400));outline:var(--awds-dropdown-focus-trigger-outline, none)}.q-dropdown-button.error:not([disabled]){color:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));background:var(--awds-dropdown-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown-button.error:not([disabled]) .q-dropdown-icon,.q-dropdown-button.error:not([disabled]) .q-icon-arrow{fill:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));cursor:pointer}.q-dropdown-button.error:not([disabled]):hover:not([disabled]):not(:focus),.q-dropdown-button.error:not([disabled])[aria-expanded=true]:not(:focus){background:var(--awds-dropdown-hover-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-hover-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown-button.error:not([disabled]):focus,.q-dropdown-button.error:not([disabled]):focus:hover,.q-dropdown-button.error:not([disabled])[aria-expanded=true]:focus{box-shadow:var(--awds-dropdown-focus-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-dropdown-button[disabled]{color:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));background:var(--awds-dropdown-disabled-trigger-background, var(--ads-color-body-200));opacity:var(--awds-dropdown-disabled-trigger-opacity);box-shadow:var(--awds-dropdown-disabled-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:auto}.q-dropdown-button[disabled] .q-dropdown-icon,.q-dropdown-button[disabled] .q-icon.q-icon-arrow{fill:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));cursor:default}.q-dropdown-button[disabled] .q-dropdown-placeholder{color:var(--awds-dropdown-disabled-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown-button.q-dropdown-button-readonly{background:var(--awds-dropdown-readonly-trigger-background, var(--ads-color-body-200));box-shadow:var(--awds-dropdown-readonly-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:auto;color:var(--awds-dropdown-readonly-trigger-color, var(--ads-color-body-contrast-100))}.q-dropdown-button.q-dropdown-button-readonly .q-icon-arrow{fill:var(--awds-dropdown-readonly-icon-fill, var(--ads-color-body-400));cursor:default}.q-dropdown-button.q-dropdown-button-readonly .q-dropdown-placeholder{color:var(--awds-dropdown-readonly-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown-content{font-family:var(--awds-dropdown-content-font-family, var(--ads-font-family-body));font-size:var(--awds-dropdown-content-font-size, var(--ads-font-size-s));font-style:var(--awds-dropdown-content-font-style, inherit);font-weight:var(--awds-dropdown-content-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropdown-content-letter-spacing, 0);line-height:var(--awds-dropdown-content-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropdown-content-text-transform, none);text-overflow:ellipsis;overflow:hidden;flex:1}.q-dropdown-placeholder{font-family:var(--awds-dropdown-placeholder-font-family, var(--ads-font-family-body));font-size:var(--awds-dropdown-placeholder-font-size, var(--ads-font-size-s));font-style:var(--awds-dropdown-placeholder-font-style, inherit);font-weight:var(--awds-dropdown-placeholder-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropdown-placeholder-letter-spacing, 0);line-height:var(--awds-dropdown-placeholder-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropdown-placeholder-text-transform, none);font-style:var(--awds-dropdown-placeholder-font-style, italic);color:var(--awds-dropdown-placeholder-color, var(--ads-color-body-600));text-overflow:ellipsis;overflow:hidden;padding-right:var(--ads-size-quark);padding-left:var(--ads-size-nano)}.q-dropdown .q-input-group{width:var(--awds-dropdown-trigger-width, 100%);min-width:var(--awds-dropdown-trigger-min-width, auto);height:var(--awds-dropdown-trigger-height, var(--ads-size-xl));min-height:var(--awds-dropdown-trigger-min-height, var(--ads-size-xl));background:var(--awds-dropdown-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));border-radius:var(--awds-dropdown-trigger-border-radius, var(--ads-border-radius-s));color:var(--awds-dropdown-trigger-color, var(--ads-color-body-contrast-100));padding:var(--awds-dropdown-trigger-input-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropdown .q-input-group .q-input::placeholder{font-style:var(--awds-dropdown-placeholder-font-style, italic);color:var(--awds-dropdown-placeholder-color, var(--ads-color-body-600))}.q-dropdown .q-input-group:hover:not([disabled]){box-shadow:var(--awds-dropdown-hover-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));background:var(--awds-dropdown-hover-trigger-background, var(--ads-color-body-100))}.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])){color:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));background:var(--awds-dropdown-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])) .q-dropdown-icon,.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])) .q-icon-arrow{fill:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));cursor:pointer}.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])):hover:not([disabled]):not(:has(.q-input:focus)){background:var(--awds-dropdown-hover-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-hover-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown .q-input-group:has(.q-input[disabled]){color:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));background:var(--awds-dropdown-disabled-trigger-background, var(--ads-color-body-200));opacity:var(--awds-dropdown-disabled-trigger-opacity);box-shadow:var(--awds-dropdown-disabled-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:auto}.q-dropdown .q-input-group:has(.q-input[disabled]) .q-dropdown-icon,.q-dropdown .q-input-group:has(.q-input[disabled]) .q-icon.q-icon-arrow{fill:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));cursor:default}.q-dropdown .q-input-group:has(.q-input[disabled]):has(.q-input[disabled]) .q-input::placeholder{color:var(--awds-dropdown-disabled-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown .q-input-group:has(.q-input[disabled]):hover{background:var(--awds-dropdown-disabled-trigger-background, var(--ads-color-body-200));box-shadow:var(--awds-dropdown-disabled-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-dropdown .q-input-group:has(.q-input[readonly]){background:var(--awds-dropdown-readonly-trigger-background, var(--ads-color-body-200));box-shadow:var(--awds-dropdown-readonly-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-dropdown .q-input-group:has(.q-input[readonly]) .q-icon-arrow{fill:var(--awds-dropdown-readonly-icon-fill, var(--ads-color-body-400));cursor:default}.q-dropdown .q-input-group:has(.q-input[readonly]) .q-input[readonly]{color:var(--awds-dropdown-readonly-trigger-color, var(--ads-color-body-contrast-100))}.q-dropdown .q-input-group:has(.q-input[readonly]):has(.q-input[readonly]) .q-input::placeholder{color:var(--awds-dropdown-readonly-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown-searchable .q-dropdown-trigger{position:relative;width:100%}.q-dropdown-searchable .q-dropdown-trigger-expanded{z-index:1010}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group{background:var(--awds-dropdown-focus-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-focus-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:hover,.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:focus{background-color:var(--awds-dropdown-focus-hover-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-focus-hover-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:has(.q-input-invalid:focus),.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:has(.q-input.q-input-invalid){box-shadow:var(--awds-dropdown-focus-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:has(.q-input.q-input-invalid:not([disabled])):hover:not([disabled]):not(:has(.q-input:focus)){background:var(--awds-dropdown-hover-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-hover-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown .q-icon.q-icon-arrow{fill:var(--awds-dropdown-icon-arrow-fill, currentColor);cursor:pointer}.q-dropdown .q-icon.q-dropdown-icon{fill:var(--awds-dropdown-icon-fill, currentColor);cursor:pointer}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QDropmenuComponent, selector: "q-dropmenu", inputs: ["backdropEnabled", "fitTriggerWidth", "density", "highlightCaseSensitive", "loading", "disableSelectionTracking", "textToHighlight", "loadingVariant", "loadingSkeletonTemplate", "footerMessage", "footerTemplate", "emptyStateTemplate", "optionTemplate", "groupLabelTemplate", "headerTemplate", "aria-label", "aria-labelledby", "id", "dataQt", "dropmenuTrigger", "groupBy", "groupLabel", "options", "value", "minWidth", "minHeight", "offsetY", "offsetX", "xPosition", "yPosition", "fitOverlayWidth", "useOverlay", "overlayHasBackdrop"], outputs: ["selectionChange", "valueChange", "opened", "closed", "backdropEnabledChange", "fitTriggerWidthChange"] }, { kind: "directive", type: QInputDirective, selector: "input[qInput]", inputs: ["errorStateMatcher", "invalidState", "controlId", "dataQt"] }, { kind: "component", type: QInputGroupComponent, selector: "q-input-group", inputs: ["prefix", "suffix", "dataQt"] }, { kind: "directive", type: QDropmenuOriginDirective, selector: "[qDropmenuOrigin]", exportAs: ["qDropmenuOrigin"] }, { kind: "pipe", type: AsyncPipe, name: "async" }], animations: [dropdownAnimations.triggerRotate], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-dropdown', animations: [dropdownAnimations.triggerRotate], imports: [
                        AsyncPipe,
                        NgIf,
                        NgTemplateOutlet,
                        FormsModule,
                        QIconComponent,
                        QDropmenuComponent,
                        QInputDirective,
                        QInputGroupComponent,
                        QDropmenuOriginDirective,
                    ], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QDropdownComponent),
                            multi: true,
                        },
                        { provide: FormFieldControl, useExisting: QDropdownComponent },
                        QDestroyService,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  class=\"q-dropdown-trigger\"\n  qDropmenuOrigin\n  #dropdownTrigger=\"qDropmenuOrigin\"\n  [class.q-dropdown-trigger-expanded]=\"isDropdownOpened\">\n  <ng-container *ngIf=\"searchable; else buttonTrigger\">\n    <q-input-group\n      [prefix]=\"_selectedOption?.icon && _inputValue === _selectedOption?.label ? prefixIcon : null\"\n      [suffix]=\"arrowIcon\">\n      <input\n        qInput\n        #input\n        class=\"q-dropdown-input\"\n        autocomplete=\"off\"\n        [(ngModel)]=\"_inputValue\"\n        [placeholder]=\"placeholder\"\n        [invalidState]=\"hasError\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        [dataQt]=\"`${dataQt}-input`\"\n        [attr.id]=\"controlId\"\n        (focus)=\"_onInputFocus($event)\"\n        (blur)=\"_onInputBlur($event)\"\n        (input)=\"_onInputChange($event)\"\n        (keydown)=\"_onInputTriggerKeyDown($event)\"\n        (click)=\"_onInputClick()\" />\n    </q-input-group>\n  </ng-container>\n</div>\n\n<q-dropmenu\n  #dropmenuRef\n  [density]=\"dropmenuDensity\"\n  [options]=\"options\"\n  [dropmenuTrigger]=\"dropdownTrigger\"\n  [value]=\"value\"\n  [minWidth]=\"0\"\n  [fitOverlayWidth]=\"dropmenuWidth === 'full'\"\n  [textToHighlight]=\"(_searchStringObservable$ | async) || ''\"\n  [highlightCaseSensitive]=\"searchCaseSensitive\"\n  [loading]=\"loading\"\n  [loadingVariant]=\"loadingVariant\"\n  [loadingSkeletonTemplate]=\"loadingSkeletonTemplate\"\n  [footerMessage]=\"dropmenuFooterMessage\"\n  [footerTemplate]=\"dropmenuFooterTemplate\"\n  [dataQt]=\"`${dataQt}-dropmenu`\"\n  [optionTemplate]=\"dropmenuOptionTemplate\"\n  [emptyStateTemplate]=\"dropmenuEmptyStateTemplate\"\n  [groupBy]=\"groupBy\"\n  [groupLabel]=\"groupLabel\"\n  [groupLabelTemplate]=\"groupLabelTemplate\"\n  (valueChange)=\"_onValueChanged($event)\"\n  (selectionChange)=\"_onDropmenuSelection($event)\"\n  (closed)=\"_onDropmenuClose()\" />\n\n<ng-template #buttonTrigger>\n  <button\n    #button\n    type=\"button\"\n    class=\"q-dropdown-button q-focus-indicator-inset\"\n    [class.q-dropdown-button-readonly]=\"readonly\"\n    [class.error]=\"hasError\"\n    [attr.id]=\"controlId\"\n    [disabled]=\"disabled\"\n    (click)=\"_onButtonTriggerClick()\"\n    (keydown)=\"_onButtonTriggerKeydown($event)\">\n    <ng-container *ngIf=\"_selectedOption?.icon\" [ngTemplateOutlet]=\"prefixIcon\" />\n\n    <div *ngIf=\"_triggerValue; else placeholderBlock\" class=\"q-dropdown-content\">\n      {{ _triggerValue }}\n    </div>\n\n    <ng-template #placeholderBlock>\n      <span class=\"q-dropdown-placeholder\" [class.q-dropdown-placeholder-readonly]=\"readonly\">\n        {{ placeholder }}\n      </span>\n    </ng-template>\n\n    <ng-container [ngTemplateOutlet]=\"arrowIcon\" />\n  </button>\n</ng-template>\n\n<ng-template #arrowIcon>\n  <q-icon\n    [name]=\"'dropArrowDown'\"\n    [@triggerRotate]=\"isDropdownOpened ? 'expanded' : 'collapsed'\"\n    (click)=\"_onArrowIconClick()\"\n    class=\"q-icon-arrow\"\n    [size]=\"'24'\"\n    [dataQt]=\"`${dataQt}-arrow-icon`\" />\n</ng-template>\n\n<ng-template #prefixIcon>\n  <q-icon\n    class=\"q-dropdown-icon\"\n    [size]=\"'24'\"\n    [name]=\"_selectedOption?.icon ?? ''\"\n    [dataQt]=\"`${dataQt}-option-icon`\" />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropdown{display:block;width:100%}.q-dropdown-button{background:none;border:none;outline:none;padding:0;margin:0;cursor:pointer;font-size:inherit;color:inherit;-webkit-user-select:none;user-select:none;width:var(--awds-dropdown-trigger-width, 100%);min-width:var(--awds-dropdown-trigger-min-width, auto);height:var(--awds-dropdown-trigger-height, var(--ads-size-xl));min-height:var(--awds-dropdown-trigger-min-height, var(--ads-size-xl));background:var(--awds-dropdown-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));border-radius:var(--awds-dropdown-trigger-border-radius, var(--ads-border-radius-s));color:var(--awds-dropdown-trigger-color, var(--ads-color-body-contrast-100));font-family:unset;text-align:inherit;white-space:nowrap;overflow:auto;justify-content:space-between;display:flex;align-items:center;appearance:none;font-size:var(--ads-font-size-s);line-height:var(--ads-font-line-height-s);text-decoration:none;padding:var(--awds-dropdown-trigger-padding, 0 var(--ads-size-xxxs) 0 var(--ads-size-xxxs));gap:var(--awds-dropdown-trigger-gap, var(--ads-size-nano))}.q-dropdown-button:hover:not(.error):not([disabled]):not(:focus),.q-dropdown-button[aria-expanded=false]{background:var(--awds-dropdown-hover-trigger-background, var(--ads-color-body-100))}.q-dropdown-button:focus,.q-dropdown-button.q-dropdown-trigger-readonly:focus,.q-dropdown-button[aria-expanded=true]{background:var(--awds-dropdown-focus-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-focus-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400));outline:var(--awds-dropdown-focus-trigger-outline, none)}.q-dropdown-button.error:not([disabled]){color:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));background:var(--awds-dropdown-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown-button.error:not([disabled]) .q-dropdown-icon,.q-dropdown-button.error:not([disabled]) .q-icon-arrow{fill:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));cursor:pointer}.q-dropdown-button.error:not([disabled]):hover:not([disabled]):not(:focus),.q-dropdown-button.error:not([disabled])[aria-expanded=true]:not(:focus){background:var(--awds-dropdown-hover-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-hover-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown-button.error:not([disabled]):focus,.q-dropdown-button.error:not([disabled]):focus:hover,.q-dropdown-button.error:not([disabled])[aria-expanded=true]:focus{box-shadow:var(--awds-dropdown-focus-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-dropdown-button[disabled]{color:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));background:var(--awds-dropdown-disabled-trigger-background, var(--ads-color-body-200));opacity:var(--awds-dropdown-disabled-trigger-opacity);box-shadow:var(--awds-dropdown-disabled-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:auto}.q-dropdown-button[disabled] .q-dropdown-icon,.q-dropdown-button[disabled] .q-icon.q-icon-arrow{fill:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));cursor:default}.q-dropdown-button[disabled] .q-dropdown-placeholder{color:var(--awds-dropdown-disabled-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown-button.q-dropdown-button-readonly{background:var(--awds-dropdown-readonly-trigger-background, var(--ads-color-body-200));box-shadow:var(--awds-dropdown-readonly-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:auto;color:var(--awds-dropdown-readonly-trigger-color, var(--ads-color-body-contrast-100))}.q-dropdown-button.q-dropdown-button-readonly .q-icon-arrow{fill:var(--awds-dropdown-readonly-icon-fill, var(--ads-color-body-400));cursor:default}.q-dropdown-button.q-dropdown-button-readonly .q-dropdown-placeholder{color:var(--awds-dropdown-readonly-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown-content{font-family:var(--awds-dropdown-content-font-family, var(--ads-font-family-body));font-size:var(--awds-dropdown-content-font-size, var(--ads-font-size-s));font-style:var(--awds-dropdown-content-font-style, inherit);font-weight:var(--awds-dropdown-content-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropdown-content-letter-spacing, 0);line-height:var(--awds-dropdown-content-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropdown-content-text-transform, none);text-overflow:ellipsis;overflow:hidden;flex:1}.q-dropdown-placeholder{font-family:var(--awds-dropdown-placeholder-font-family, var(--ads-font-family-body));font-size:var(--awds-dropdown-placeholder-font-size, var(--ads-font-size-s));font-style:var(--awds-dropdown-placeholder-font-style, inherit);font-weight:var(--awds-dropdown-placeholder-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropdown-placeholder-letter-spacing, 0);line-height:var(--awds-dropdown-placeholder-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropdown-placeholder-text-transform, none);font-style:var(--awds-dropdown-placeholder-font-style, italic);color:var(--awds-dropdown-placeholder-color, var(--ads-color-body-600));text-overflow:ellipsis;overflow:hidden;padding-right:var(--ads-size-quark);padding-left:var(--ads-size-nano)}.q-dropdown .q-input-group{width:var(--awds-dropdown-trigger-width, 100%);min-width:var(--awds-dropdown-trigger-min-width, auto);height:var(--awds-dropdown-trigger-height, var(--ads-size-xl));min-height:var(--awds-dropdown-trigger-min-height, var(--ads-size-xl));background:var(--awds-dropdown-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));border-radius:var(--awds-dropdown-trigger-border-radius, var(--ads-border-radius-s));color:var(--awds-dropdown-trigger-color, var(--ads-color-body-contrast-100));padding:var(--awds-dropdown-trigger-input-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropdown .q-input-group .q-input::placeholder{font-style:var(--awds-dropdown-placeholder-font-style, italic);color:var(--awds-dropdown-placeholder-color, var(--ads-color-body-600))}.q-dropdown .q-input-group:hover:not([disabled]){box-shadow:var(--awds-dropdown-hover-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));background:var(--awds-dropdown-hover-trigger-background, var(--ads-color-body-100))}.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])){color:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));background:var(--awds-dropdown-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])) .q-dropdown-icon,.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])) .q-icon-arrow{fill:var(--awds-dropdown-error-trigger-color, var(--ads-color-body-contrast-100));cursor:pointer}.q-dropdown .q-input-group:has(.q-input.q-input-invalid:not([disabled])):hover:not([disabled]):not(:has(.q-input:focus)){background:var(--awds-dropdown-hover-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-hover-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown .q-input-group:has(.q-input[disabled]){color:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));background:var(--awds-dropdown-disabled-trigger-background, var(--ads-color-body-200));opacity:var(--awds-dropdown-disabled-trigger-opacity);box-shadow:var(--awds-dropdown-disabled-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:auto}.q-dropdown .q-input-group:has(.q-input[disabled]) .q-dropdown-icon,.q-dropdown .q-input-group:has(.q-input[disabled]) .q-icon.q-icon-arrow{fill:var(--awds-dropdown-disabled-trigger-color, var(--ads-color-body-400));cursor:default}.q-dropdown .q-input-group:has(.q-input[disabled]):has(.q-input[disabled]) .q-input::placeholder{color:var(--awds-dropdown-disabled-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown .q-input-group:has(.q-input[disabled]):hover{background:var(--awds-dropdown-disabled-trigger-background, var(--ads-color-body-200));box-shadow:var(--awds-dropdown-disabled-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-dropdown .q-input-group:has(.q-input[readonly]){background:var(--awds-dropdown-readonly-trigger-background, var(--ads-color-body-200));box-shadow:var(--awds-dropdown-readonly-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-dropdown .q-input-group:has(.q-input[readonly]) .q-icon-arrow{fill:var(--awds-dropdown-readonly-icon-fill, var(--ads-color-body-400));cursor:default}.q-dropdown .q-input-group:has(.q-input[readonly]) .q-input[readonly]{color:var(--awds-dropdown-readonly-trigger-color, var(--ads-color-body-contrast-100))}.q-dropdown .q-input-group:has(.q-input[readonly]):has(.q-input[readonly]) .q-input::placeholder{color:var(--awds-dropdown-readonly-trigger-placeholder-color, var(--ads-color-body-400))}.q-dropdown-searchable .q-dropdown-trigger{position:relative;width:100%}.q-dropdown-searchable .q-dropdown-trigger-expanded{z-index:1010}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group{background:var(--awds-dropdown-focus-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-focus-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:hover,.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:focus{background-color:var(--awds-dropdown-focus-hover-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-focus-hover-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:has(.q-input-invalid:focus),.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:has(.q-input.q-input-invalid){box-shadow:var(--awds-dropdown-focus-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-dropdown-searchable .q-dropdown-trigger-expanded .q-input-group:has(.q-input.q-input-invalid:not([disabled])):hover:not([disabled]):not(:has(.q-input:focus)){background:var(--awds-dropdown-hover-error-trigger-background, var(--ads-color-body-100));box-shadow:var(--awds-dropdown-hover-error-trigger-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-dropdown .q-icon.q-icon-arrow{fill:var(--awds-dropdown-icon-arrow-fill, currentColor);cursor:pointer}.q-dropdown .q-icon.q-dropdown-icon{fill:var(--awds-dropdown-icon-fill, currentColor);cursor:pointer}\n"] }]
        }], ctorParameters: () => [], propDecorators: { valueChange: [{
                type: Output
            }], inputChange: [{
                type: Output
            }], inputFocus: [{
                type: Output
            }], inputBlur: [{
                type: Output
            }], errorStateMatcher: [{
                type: Input
            }], controlId: [{
                type: Input
            }], loadingVariant: [{
                type: Input
            }], loadingSkeletonTemplate: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], customSearch: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], searchCaseSensitive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], searchResultsSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], searchDebounce: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], searchGramSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], searchable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-dropdown-searchable']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], dropmenuWidth: [{
                type: Input
            }], dropmenuDensity: [{
                type: Input
            }], dropmenuFooterMessage: [{
                type: Input
            }], dropmenuFooterTemplate: [{
                type: Input
            }], dropmenuEmptyStateTemplate: [{
                type: Input
            }], dropmenuOptionTemplate: [{
                type: Input
            }], groupLabelTemplate: [{
                type: Input
            }], groupBy: [{
                type: Input
            }], groupLabel: [{
                type: Input
            }], options: [{
                type: Input
            }], hasError: [{
                type: Input
            }], value: [{
                type: Input
            }], _buttonRef: [{
                type: ViewChild,
                args: ['button']
            }], _inputRef: [{
                type: ViewChild,
                args: ['input']
            }], _dropmenuRef: [{
                type: ViewChild,
                args: [QDropmenuComponent, { static: true }]
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QDropdownComponent };
//# sourceMappingURL=questrade-allspark-angular-components-dropdown.mjs.map
