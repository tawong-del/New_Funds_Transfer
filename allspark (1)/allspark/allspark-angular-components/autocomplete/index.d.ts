import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, DoCheck, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';
import { QDropmenuOption, QDropmenuDensity, QDropmenuLoadingVariant, QDropmenuComponent } from '@questrade/allspark-angular-components/dropmenu';
import { Observable } from 'rxjs';

declare class QAutocompleteInputDirective<T> extends ErrorState implements OnInit, AfterViewInit, DoCheck, ControlValueAccessor, FormFieldControl {
    readonly valueChange: EventEmitter<T | null>;
    errorStateMatcher: ErrorStateMatcherInterface;
    value: T | null;
    controlId: string;
    private _onChange;
    private _onTouch;
    private readonly _renderer;
    private readonly _input;
    private _injector;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    /** @hidden */
    writeValue(value: T | null): void;
    /** @hidden */
    registerOnChange(fn: (_: T | null) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    _searchTermChanged(): void;
    private _setComponentControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<QAutocompleteInputDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QAutocompleteInputDirective<any>, "input[qInput][qAutocompleteInput]", never, { "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}

type QAutocompleteDropmenuWidth = 'fit' | 'full';

type QAutocompleteVariant = 'search' | 'address';

declare class QAutocompleteComponent<T> implements OnInit, AfterViewInit {
    readonly valueChange: EventEmitter<QDropmenuOption<T>>;
    readonly dropmenuOpened: EventEmitter<void>;
    readonly dropmenuClosed: EventEmitter<void>;
    dropmenuWidth: QAutocompleteDropmenuWidth;
    dropmenuDensity: QDropmenuDensity;
    variant: QAutocompleteVariant;
    dropmenuMinWidth: number;
    dropmenuMinHeight: number;
    /**
     * @deprecated Use `dropmenuOffset` instead.
     * @breaking-change First major after 16 Apr 2026
     */
    dropmenuOffsetY: number;
    dropmenuOffset: number;
    customSearch: boolean;
    searchCaseSensitive: boolean;
    searchResultsSize: number;
    searchDebounce: number;
    searchGramSize: number;
    loading: boolean;
    footerMessage: string;
    inputValueFormatter: ((option: QDropmenuOption<T>) => string) | null;
    emptyStateTemplate: TemplateRef<unknown> | null;
    optionTemplate: TemplateRef<unknown> | null;
    footerTemplate: TemplateRef<unknown> | null;
    loadingVariant: QDropmenuLoadingVariant;
    loadingSkeletonTemplate: TemplateRef<unknown> | null;
    dataQt: string;
    get options(): QDropmenuOption<T>[];
    set options(value: QDropmenuOption<T>[]);
    _input: ElementRef<HTMLInputElement>;
    _autocompleteInput: QAutocompleteInputDirective<T>;
    _dropMenu: QDropmenuComponent<T>;
    _clearIcon: ElementRef<HTMLElement>;
    _rootClass: string;
    _clickedOutside(): void;
    _value: T | null;
    _selectedOption: QDropmenuOption<T> | null;
    _searchStringObservable: Observable<string> | null;
    _inputHasFocus: boolean;
    _clearIconCanHaveFocus: boolean;
    private _searchString$;
    private _options;
    private _filteredOptions;
    private _inputHasAriaExpanded;
    private readonly _iconRegistry;
    private readonly _destroy$;
    private readonly _changeDetectorRef;
    private readonly _renderer;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    _clear(): void;
    _onClearIconKeydown(event: KeyboardEvent): void;
    _onDropmenuOpened(): void;
    _onDropmenuClosed(): void;
    _onValueChange(event: QDropmenuOption<T> | QDropmenuOption<T>[]): void;
    _preventDropmenuClose(event: MouseEvent | KeyboardEvent): void;
    get _isOpened(): boolean;
    get _showClearIcon(): boolean;
    private _bindAriaAttributes;
    private _setInputChangeEvent;
    private _setInputFocusEvent;
    private _setInputClickEvent;
    private _setInputBlurEvent;
    private _setInputKeydownEvent;
    private _handleInputButtonKeyDown;
    private _setClearIconBlurEvent;
    private _monitorInputAutocompleteValueChanges;
    private _toggleAriaExpanded;
    private _updateInputValue;
    private _getFormattedLabel;
    private _findSelectedOption;
    private _clearPreviousValue;
    private _search;
    static ɵfac: i0.ɵɵFactoryDeclaration<QAutocompleteComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QAutocompleteComponent<any>, "q-autocomplete", never, { "dropmenuWidth": { "alias": "dropmenuWidth"; "required": false; }; "dropmenuDensity": { "alias": "dropmenuDensity"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "dropmenuMinWidth": { "alias": "dropmenuMinWidth"; "required": false; }; "dropmenuMinHeight": { "alias": "dropmenuMinHeight"; "required": false; }; "dropmenuOffsetY": { "alias": "dropmenuOffsetY"; "required": false; }; "dropmenuOffset": { "alias": "dropmenuOffset"; "required": false; }; "customSearch": { "alias": "customSearch"; "required": false; }; "searchCaseSensitive": { "alias": "searchCaseSensitive"; "required": false; }; "searchResultsSize": { "alias": "searchResultsSize"; "required": false; }; "searchDebounce": { "alias": "searchDebounce"; "required": false; }; "searchGramSize": { "alias": "searchGramSize"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "footerMessage": { "alias": "footerMessage"; "required": false; }; "inputValueFormatter": { "alias": "inputValueFormatter"; "required": false; }; "emptyStateTemplate": { "alias": "emptyStateTemplate"; "required": false; }; "optionTemplate": { "alias": "optionTemplate"; "required": false; }; "footerTemplate": { "alias": "footerTemplate"; "required": false; }; "loadingVariant": { "alias": "loadingVariant"; "required": false; }; "loadingSkeletonTemplate": { "alias": "loadingSkeletonTemplate"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "options": { "alias": "options"; "required": false; }; }, { "valueChange": "valueChange"; "dropmenuOpened": "dropmenuOpened"; "dropmenuClosed": "dropmenuClosed"; }, ["_input", "_autocompleteInput"], ["input[qInput]"], true, never>;
    static ngAcceptInputType_dropmenuMinWidth: unknown;
    static ngAcceptInputType_dropmenuMinHeight: unknown;
    static ngAcceptInputType_dropmenuOffsetY: unknown;
    static ngAcceptInputType_dropmenuOffset: unknown;
    static ngAcceptInputType_customSearch: unknown;
    static ngAcceptInputType_searchCaseSensitive: unknown;
    static ngAcceptInputType_searchResultsSize: unknown;
    static ngAcceptInputType_searchDebounce: unknown;
    static ngAcceptInputType_searchGramSize: unknown;
    static ngAcceptInputType_loading: unknown;
}

export { QAutocompleteComponent, QAutocompleteInputDirective };
export type { QAutocompleteDropmenuWidth, QAutocompleteVariant };
