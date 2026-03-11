import * as i0 from '@angular/core';
import { EventEmitter, inject, Renderer2, ElementRef, Injector, forwardRef, Input, Output, Directive, ChangeDetectorRef, booleanAttribute, numberAttribute, HostListener, HostBinding, ViewChild, ContentChild, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupDirective, NgForm, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorState, voidFn, ENTER, SPACE, UP_ARROW, DOWN_ARROW, nGramScore } from '@questrade/allspark-angular-components/core/utils';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';
import { hasModifierKey } from '@angular/cdk/keycodes';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { QDropmenuComponent, QDropmenuOriginDirective } from '@questrade/allspark-angular-components/dropmenu';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { QInputGroupComponent, QInputDirective } from '@questrade/allspark-angular-components/input';
import { search, cancelOutline, locationOutline } from '@questrade/allspark-icons/icons';
import { BehaviorSubject, debounceTime, takeUntil, fromEvent, delay } from 'rxjs';

class QAutocompleteInputDirective extends ErrorState {
    valueChange = new EventEmitter();
    errorStateMatcher = new ErrorStateMatcher();
    value = null;
    controlId = '';
    _onChange = voidFn;
    _onTouch = voidFn;
    _renderer = inject(Renderer2);
    _input = inject(ElementRef);
    _injector = inject(Injector);
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
    }
    ngOnInit() {
        this._setComponentControl();
    }
    ngAfterViewInit() {
        this.controlId = this._input.nativeElement.getAttribute('id') || '';
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
        }
    }
    /** @hidden */
    writeValue(value) {
        this._onChange(value);
        this.value = value;
        this.valueChange.emit(this.value);
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
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._input.nativeElement, 'disabled', isDisabled);
    }
    _searchTermChanged() {
        this._onTouch();
    }
    _setComponentControl() {
        const injectedControl = this._injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QAutocompleteInputDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QAutocompleteInputDirective, isStandalone: true, selector: "input[qInput][qAutocompleteInput]", inputs: { errorStateMatcher: "errorStateMatcher", value: "value" }, outputs: { valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QAutocompleteInputDirective),
                multi: true,
            },
            { provide: FormFieldControl, useExisting: QAutocompleteInputDirective },
        ], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QAutocompleteInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[qInput][qAutocompleteInput]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QAutocompleteInputDirective),
                            multi: true,
                        },
                        { provide: FormFieldControl, useExisting: QAutocompleteInputDirective },
                    ],
                }]
        }], ctorParameters: () => [], propDecorators: { valueChange: [{
                type: Output
            }], errorStateMatcher: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

class QAutocompleteComponent {
    valueChange = new EventEmitter();
    dropmenuOpened = new EventEmitter();
    dropmenuClosed = new EventEmitter();
    dropmenuWidth = 'full';
    dropmenuDensity = 'default';
    variant = 'search';
    dropmenuMinWidth = 0;
    dropmenuMinHeight = 0;
    /**
     * @deprecated Use `dropmenuOffset` instead.
     * @breaking-change First major after 16 Apr 2026
     */
    dropmenuOffsetY = 4;
    dropmenuOffset = 4;
    customSearch = false;
    searchCaseSensitive = false;
    searchResultsSize = 10;
    searchDebounce = 0;
    searchGramSize = 2;
    loading = false;
    footerMessage = '';
    inputValueFormatter = null;
    emptyStateTemplate = null;
    optionTemplate = null;
    footerTemplate = null;
    loadingVariant = 'spinner';
    loadingSkeletonTemplate = null;
    dataQt = 'q-autocomplete';
    get options() {
        return this._filteredOptions ?? this._options;
    }
    set options(value) {
        this._options = value;
        this._selectedOption = this._findSelectedOption();
    }
    _input;
    _autocompleteInput;
    _dropMenu;
    _clearIcon;
    _rootClass = 'q-autocomplete';
    _clickedOutside() {
        if (this._isOpened) {
            this._dropMenu.close();
        }
    }
    _value = null;
    _selectedOption = null;
    _searchStringObservable = null;
    _inputHasFocus = false;
    _clearIconCanHaveFocus = false;
    _searchString$ = new BehaviorSubject('');
    _options = [];
    _filteredOptions = null;
    _inputHasAriaExpanded = false;
    _iconRegistry = inject(QIconRegistryService);
    _destroy$ = inject(QDestroyService);
    _changeDetectorRef = inject(ChangeDetectorRef);
    _renderer = inject(Renderer2);
    ngOnInit() {
        this._iconRegistry.registerIcons([search, cancelOutline, locationOutline]);
        this._searchString$
            .pipe(debounceTime(this.searchDebounce), takeUntil(this._destroy$))
            .subscribe(this._search.bind(this));
        this._searchStringObservable = this._searchString$.asObservable();
        this._dropMenu._withTypeahead = false;
        this._dropMenu._selectKeys = [ENTER];
    }
    ngAfterViewInit() {
        if (!this._input)
            return;
        this._bindAriaAttributes();
        this._setInputChangeEvent();
        this._setInputClickEvent();
        this._setInputFocusEvent();
        this._setInputBlurEvent();
        this._setInputKeydownEvent();
        this._setClearIconBlurEvent();
        this._monitorInputAutocompleteValueChanges();
        this._value = this._autocompleteInput?.value;
        this._updateInputValue();
    }
    _clear() {
        if (this._input) {
            this._dropMenu.close();
            this._clearPreviousValue();
            this._autocompleteInput?._searchTermChanged();
            this._input.nativeElement.focus();
        }
    }
    _onClearIconKeydown(event) {
        if (!hasModifierKey(event) && [SPACE, ENTER].includes(event.code)) {
            event.preventDefault();
            this._clear();
        }
    }
    _onDropmenuOpened() {
        this._toggleAriaExpanded('true');
        this.dropmenuOpened.emit();
    }
    _onDropmenuClosed() {
        this._clearIconCanHaveFocus = false;
        this._toggleAriaExpanded('false');
        this.dropmenuClosed.emit();
    }
    _onValueChange(event) {
        this._value = event?.value;
        this._selectedOption = this._findSelectedOption();
        this._autocompleteInput?.writeValue(this._value);
        this.valueChange.emit(event);
    }
    _preventDropmenuClose(event) {
        if (this._isOpened) {
            event.stopPropagation();
            return;
        }
        this._input?.nativeElement?.focus();
    }
    get _isOpened() {
        return this._dropMenu?.isOpened;
    }
    get _showClearIcon() {
        if (!this._input) {
            return false;
        }
        if (this._input.nativeElement.disabled || !this._input.nativeElement.value) {
            return false;
        }
        return this._inputHasFocus || this._clearIconCanHaveFocus || this._isOpened;
    }
    _bindAriaAttributes() {
        const inputHasAriaAutoComplete = this._input.nativeElement.hasAttribute('aria-autocomplete');
        if (!inputHasAriaAutoComplete) {
            this._renderer.setAttribute(this._input.nativeElement, 'aria-autocomplete', 'list');
        }
        this._inputHasAriaExpanded = this._input?.nativeElement.hasAttribute('aria-expanded');
    }
    _setInputChangeEvent() {
        fromEvent(this._input.nativeElement, 'input')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            this._autocompleteInput?._searchTermChanged();
            const emptySearchTerm = !this._input.nativeElement.value;
            if (emptySearchTerm) {
                this._clearPreviousValue();
                this._toggleAriaExpanded('false');
                this._dropMenu.close();
            }
            else if (this.customSearch) {
                this._dropMenu.open();
            }
            this._searchString$.next(this._input.nativeElement.value);
            this._changeDetectorRef.markForCheck();
        });
    }
    _setInputFocusEvent() {
        fromEvent(this._input.nativeElement, 'focus')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            this._inputHasFocus = true;
            this._clearIconCanHaveFocus = true;
            this._changeDetectorRef.markForCheck();
        });
    }
    _setInputClickEvent() {
        fromEvent(this._input.nativeElement, 'click')
            .pipe(takeUntil(this._destroy$), delay(0))
            .subscribe(() => {
            if (this._input.nativeElement.value) {
                this._dropMenu.open();
            }
        });
    }
    _setInputBlurEvent() {
        fromEvent(this._input.nativeElement, 'blur')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            this._inputHasFocus = false;
            this._changeDetectorRef.markForCheck();
        });
    }
    _setInputKeydownEvent() {
        fromEvent(this._input.nativeElement, 'keydown')
            .pipe(takeUntil(this._destroy$))
            .subscribe((event) => {
            if (!this._input.nativeElement.disabled) {
                this._handleInputButtonKeyDown(event);
            }
        });
    }
    _handleInputButtonKeyDown(event) {
        const handleKeyDown = () => {
            event.preventDefault();
            if (!this._isOpened) {
                event.stopPropagation();
                this._dropMenu.open();
            }
        };
        switch (event.code) {
            case DOWN_ARROW:
            case UP_ARROW:
            case ENTER:
                handleKeyDown();
                break;
        }
    }
    _setClearIconBlurEvent() {
        fromEvent(this._clearIcon.nativeElement, 'blur')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            this._clearIconCanHaveFocus = false;
            this._inputHasFocus = false;
            this._changeDetectorRef.markForCheck();
        });
    }
    _monitorInputAutocompleteValueChanges() {
        this._autocompleteInput?.valueChange
            .pipe(takeUntil(this._destroy$))
            .subscribe((value) => {
            this._value = value;
            this._updateInputValue();
        });
    }
    _toggleAriaExpanded(expanded) {
        if (this._inputHasAriaExpanded) {
            return;
        }
        this._renderer.setAttribute(this._input?.nativeElement, 'aria-expanded', expanded);
    }
    _updateInputValue() {
        this._selectedOption = this._findSelectedOption();
        this._renderer.setProperty(this._input.nativeElement, 'value', this._getFormattedLabel());
    }
    _getFormattedLabel() {
        if (!this._selectedOption) {
            return '';
        }
        if (this.inputValueFormatter && typeof this.inputValueFormatter === 'function') {
            return this.inputValueFormatter(this._selectedOption);
        }
        const getSubLabelValue = () => {
            const subLabel = this._selectedOption?.subLabel ? ', ' + this._selectedOption.subLabel : '';
            return this._selectedOption?.label + subLabel;
        };
        return this.variant === 'search' ? this._selectedOption.label : getSubLabelValue();
    }
    _findSelectedOption() {
        return this._options?.find((option) => option.value === this._value) ?? null;
    }
    _clearPreviousValue() {
        this._autocompleteInput?.writeValue(null);
    }
    _search(value) {
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
            this._dropMenu.open();
        }
        this._changeDetectorRef.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QAutocompleteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QAutocompleteComponent, isStandalone: true, selector: "q-autocomplete", inputs: { dropmenuWidth: "dropmenuWidth", dropmenuDensity: "dropmenuDensity", variant: "variant", dropmenuMinWidth: ["dropmenuMinWidth", "dropmenuMinWidth", numberAttribute], dropmenuMinHeight: ["dropmenuMinHeight", "dropmenuMinHeight", numberAttribute], dropmenuOffsetY: ["dropmenuOffsetY", "dropmenuOffsetY", numberAttribute], dropmenuOffset: ["dropmenuOffset", "dropmenuOffset", numberAttribute], customSearch: ["customSearch", "customSearch", booleanAttribute], searchCaseSensitive: ["searchCaseSensitive", "searchCaseSensitive", booleanAttribute], searchResultsSize: ["searchResultsSize", "searchResultsSize", numberAttribute], searchDebounce: ["searchDebounce", "searchDebounce", numberAttribute], searchGramSize: ["searchGramSize", "searchGramSize", numberAttribute], loading: ["loading", "loading", booleanAttribute], footerMessage: "footerMessage", inputValueFormatter: "inputValueFormatter", emptyStateTemplate: "emptyStateTemplate", optionTemplate: "optionTemplate", footerTemplate: "footerTemplate", loadingVariant: "loadingVariant", loadingSkeletonTemplate: "loadingSkeletonTemplate", dataQt: "dataQt", options: "options" }, outputs: { valueChange: "valueChange", dropmenuOpened: "dropmenuOpened", dropmenuClosed: "dropmenuClosed" }, host: { listeners: { "document:click": "_clickedOutside()" }, properties: { "attr.data-qt": "this.dataQt", "class": "this._rootClass" } }, providers: [QDestroyService], queries: [{ propertyName: "_input", first: true, predicate: QInputDirective, descendants: true, read: ElementRef }, { propertyName: "_autocompleteInput", first: true, predicate: QAutocompleteInputDirective, descendants: true }], viewQueries: [{ propertyName: "_dropMenu", first: true, predicate: ["dropmenu"], descendants: true, static: true }, { propertyName: "_clearIcon", first: true, predicate: ["clearIconRef"], descendants: true, read: ElementRef }], ngImport: i0, template: "<q-input-group\n  [prefix]=\"prefixIcon\"\n  [suffix]=\"suffixIcon\"\n  qDropmenuOrigin\n  #menuTrigger=\"qDropmenuOrigin\"\n  (click)=\"_preventDropmenuClose($event)\">\n  <ng-content select=\"input[qInput]\" />\n</q-input-group>\n\n<ng-template #prefixIcon>\n  <q-icon [name]=\"variant === 'search' ? 'search' : 'locationOutline'\" size=\"24\" />\n</ng-template>\n\n<ng-template #suffixIcon>\n  <q-icon\n    #clearIconRef\n    class=\"q-autocomplete-clear-icon q-focus-indicator\"\n    [class.q-autocomplete-clear-icon-hidden]=\"!_showClearIcon\"\n    name=\"cancelOutline\"\n    size=\"24\"\n    tabindex=\"0\"\n    (click)=\"_clear()\"\n    (mouseover)=\"_clearIconCanHaveFocus = true\"\n    (mouseout)=\"_clearIconCanHaveFocus = false\"\n    (keydown)=\"_onClearIconKeydown($event)\" />\n</ng-template>\n\n<q-dropmenu\n  #dropmenu\n  [options]=\"options\"\n  [value]=\"_value\"\n  [loading]=\"loading\"\n  [density]=\"dropmenuDensity\"\n  [minWidth]=\"dropmenuMinWidth\"\n  [minHeight]=\"dropmenuMinHeight\"\n  [offsetY]=\"dropmenuOffsetY\"\n  [offset]=\"dropmenuOffset\"\n  [fitOverlayWidth]=\"dropmenuWidth === 'full'\"\n  [footerMessage]=\"footerMessage\"\n  [dropmenuTrigger]=\"menuTrigger\"\n  [textToHighlight]=\"(_searchStringObservable | async) || ''\"\n  [highlightCaseSensitive]=\"searchCaseSensitive\"\n  [footerTemplate]=\"footerTemplate\"\n  [optionTemplate]=\"optionTemplate\"\n  [emptyStateTemplate]=\"emptyStateTemplate\"\n  [loadingVariant]=\"loadingVariant\"\n  [loadingSkeletonTemplate]=\"loadingSkeletonTemplate\"\n  [overlayHasBackdrop]=\"false\"\n  (opened)=\"_onDropmenuOpened()\"\n  (closed)=\"_onDropmenuClosed()\"\n  (valueChange)=\"_onValueChange($event)\" />\n", styles: [".q-autocomplete-clear-icon{cursor:pointer}.q-autocomplete-clear-icon:active{box-shadow:none}.q-autocomplete-clear-icon-hidden{visibility:hidden;max-width:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: QInputGroupComponent, selector: "q-input-group", inputs: ["prefix", "suffix", "dataQt"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QDropmenuComponent, selector: "q-dropmenu", inputs: ["backdropEnabled", "fitTriggerWidth", "density", "highlightCaseSensitive", "loading", "disableSelectionTracking", "textToHighlight", "loadingVariant", "loadingSkeletonTemplate", "footerMessage", "footerTemplate", "emptyStateTemplate", "optionTemplate", "groupLabelTemplate", "headerTemplate", "aria-label", "aria-labelledby", "id", "dataQt", "dropmenuTrigger", "groupBy", "groupLabel", "options", "value", "minWidth", "minHeight", "offsetY", "offsetX", "xPosition", "yPosition", "fitOverlayWidth", "useOverlay", "overlayHasBackdrop"], outputs: ["selectionChange", "valueChange", "opened", "closed", "backdropEnabledChange", "fitTriggerWidthChange"] }, { kind: "directive", type: QDropmenuOriginDirective, selector: "[qDropmenuOrigin]", exportAs: ["qDropmenuOrigin"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ imports: [
                        CommonModule,
                        QInputGroupComponent,
                        QIconComponent,
                        QDropmenuComponent,
                        QDropmenuOriginDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-autocomplete', providers: [QDestroyService], template: "<q-input-group\n  [prefix]=\"prefixIcon\"\n  [suffix]=\"suffixIcon\"\n  qDropmenuOrigin\n  #menuTrigger=\"qDropmenuOrigin\"\n  (click)=\"_preventDropmenuClose($event)\">\n  <ng-content select=\"input[qInput]\" />\n</q-input-group>\n\n<ng-template #prefixIcon>\n  <q-icon [name]=\"variant === 'search' ? 'search' : 'locationOutline'\" size=\"24\" />\n</ng-template>\n\n<ng-template #suffixIcon>\n  <q-icon\n    #clearIconRef\n    class=\"q-autocomplete-clear-icon q-focus-indicator\"\n    [class.q-autocomplete-clear-icon-hidden]=\"!_showClearIcon\"\n    name=\"cancelOutline\"\n    size=\"24\"\n    tabindex=\"0\"\n    (click)=\"_clear()\"\n    (mouseover)=\"_clearIconCanHaveFocus = true\"\n    (mouseout)=\"_clearIconCanHaveFocus = false\"\n    (keydown)=\"_onClearIconKeydown($event)\" />\n</ng-template>\n\n<q-dropmenu\n  #dropmenu\n  [options]=\"options\"\n  [value]=\"_value\"\n  [loading]=\"loading\"\n  [density]=\"dropmenuDensity\"\n  [minWidth]=\"dropmenuMinWidth\"\n  [minHeight]=\"dropmenuMinHeight\"\n  [offsetY]=\"dropmenuOffsetY\"\n  [offset]=\"dropmenuOffset\"\n  [fitOverlayWidth]=\"dropmenuWidth === 'full'\"\n  [footerMessage]=\"footerMessage\"\n  [dropmenuTrigger]=\"menuTrigger\"\n  [textToHighlight]=\"(_searchStringObservable | async) || ''\"\n  [highlightCaseSensitive]=\"searchCaseSensitive\"\n  [footerTemplate]=\"footerTemplate\"\n  [optionTemplate]=\"optionTemplate\"\n  [emptyStateTemplate]=\"emptyStateTemplate\"\n  [loadingVariant]=\"loadingVariant\"\n  [loadingSkeletonTemplate]=\"loadingSkeletonTemplate\"\n  [overlayHasBackdrop]=\"false\"\n  (opened)=\"_onDropmenuOpened()\"\n  (closed)=\"_onDropmenuClosed()\"\n  (valueChange)=\"_onValueChange($event)\" />\n", styles: [".q-autocomplete-clear-icon{cursor:pointer}.q-autocomplete-clear-icon:active{box-shadow:none}.q-autocomplete-clear-icon-hidden{visibility:hidden;max-width:0}\n"] }]
        }], propDecorators: { valueChange: [{
                type: Output
            }], dropmenuOpened: [{
                type: Output
            }], dropmenuClosed: [{
                type: Output
            }], dropmenuWidth: [{
                type: Input
            }], dropmenuDensity: [{
                type: Input
            }], variant: [{
                type: Input
            }], dropmenuMinWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], dropmenuMinHeight: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], dropmenuOffsetY: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], dropmenuOffset: [{
                type: Input,
                args: [{ transform: numberAttribute }]
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
            }], footerMessage: [{
                type: Input
            }], inputValueFormatter: [{
                type: Input
            }], emptyStateTemplate: [{
                type: Input
            }], optionTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], loadingVariant: [{
                type: Input
            }], loadingSkeletonTemplate: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], options: [{
                type: Input
            }], _input: [{
                type: ContentChild,
                args: [QInputDirective, { read: ElementRef }]
            }], _autocompleteInput: [{
                type: ContentChild,
                args: [QAutocompleteInputDirective]
            }], _dropMenu: [{
                type: ViewChild,
                args: ['dropmenu', { static: true }]
            }], _clearIcon: [{
                type: ViewChild,
                args: ['clearIconRef', { read: ElementRef }]
            }], _rootClass: [{
                type: HostBinding,
                args: ['class']
            }], _clickedOutside: [{
                type: HostListener,
                args: ['document:click']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QAutocompleteComponent, QAutocompleteInputDirective };
//# sourceMappingURL=questrade-allspark-angular-components-autocomplete.mjs.map
