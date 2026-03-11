import * as i0 from '@angular/core';
import { OnInit, DoCheck, OnChanges, EventEmitter, TemplateRef, ElementRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { QDropmenuLoadingVariant, QDropmenuDensity, QDropmenuOption, QDropmenuComponent, QDropmenuSelectionChange } from '@questrade/allspark-angular-components/dropmenu';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';
import { Observable } from 'rxjs';

interface QDropdownOption<T> {
    value: T;
    label: string;
    icon?: string;
    trackById?: string | number;
    disabled?: boolean;
}

type QDropdownWidth = 'fit' | 'full';

declare class QDropdownComponent<T> extends ErrorState implements OnInit, ControlValueAccessor, FormFieldControl, DoCheck, OnChanges {
    private injector;
    readonly valueChange: EventEmitter<QDropdownOption<T>>;
    readonly inputChange: EventEmitter<string>;
    readonly inputFocus: EventEmitter<FocusEvent>;
    readonly inputBlur: EventEmitter<FocusEvent>;
    errorStateMatcher: ErrorStateMatcherInterface;
    controlId: string;
    loadingVariant: QDropmenuLoadingVariant;
    loadingSkeletonTemplate: TemplateRef<unknown> | null;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    customSearch: boolean;
    searchCaseSensitive: boolean;
    searchResultsSize: number;
    searchDebounce: number;
    searchGramSize: number;
    loading: boolean;
    searchable: boolean;
    dataQt: string;
    dropmenuWidth: QDropdownWidth;
    dropmenuDensity: QDropmenuDensity;
    dropmenuFooterMessage: string;
    dropmenuFooterTemplate: TemplateRef<unknown> | null;
    dropmenuEmptyStateTemplate: TemplateRef<unknown> | null;
    dropmenuOptionTemplate: TemplateRef<unknown> | null;
    groupLabelTemplate: TemplateRef<unknown> | null;
    groupBy: string | ((option: QDropmenuOption<T>) => unknown) | null;
    groupLabel: string | ((groupKey: unknown, options: QDropmenuOption<T>[]) => string | null) | Record<string, string> | null;
    get options(): QDropdownOption<T>[];
    set options(value: QDropdownOption<T>[]);
    get hasError(): boolean;
    set hasError(value: boolean);
    get value(): T;
    set value(value: T);
    _buttonRef: ElementRef<HTMLElement>;
    _inputRef: ElementRef<HTMLElement>;
    _dropmenuRef: QDropmenuComponent<T>;
    _hostClass: string;
    _selectedOption: QDropdownOption<T> | null;
    _searchStringObservable$: Observable<string> | null;
    _inputValue: string;
    _hasError: boolean;
    _triggerValue: string;
    private _onChange;
    private _onTouch;
    private _options;
    private _searchString$;
    private _filteredOptions;
    private _value;
    private readonly _destroy$;
    private readonly _cdr;
    private readonly _iconRegistry;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _onValueChanged(event: QDropmenuOption<T> | QDropmenuOption<T>[]): void;
    _onDropmenuSelection({ option }: QDropmenuSelectionChange<T>): void;
    _onInputChange(event: Event): void;
    _onInputBlur(event: FocusEvent): void;
    _onInputFocus(event: FocusEvent): void;
    _onArrowIconClick(): void;
    _onInputClick(): void;
    _onButtonTriggerClick(): void;
    _onButtonTriggerKeydown(event: KeyboardEvent): void;
    _onInputTriggerKeyDown(event: KeyboardEvent): void;
    _onDropmenuClose(): void;
    /** @hidden */
    writeValue(value: T): void;
    /** @hidden */
    registerOnChange(fn: (_: T) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(disabled: boolean): void;
    get isDropdownOpened(): boolean;
    private setComponentControl;
    private _toggle;
    private _findSelectedOption;
    private _onSearchStringUpdate;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDropdownComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDropdownComponent<any>, "q-dropdown", never, { "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "controlId": { "alias": "controlId"; "required": false; }; "loadingVariant": { "alias": "loadingVariant"; "required": false; }; "loadingSkeletonTemplate": { "alias": "loadingSkeletonTemplate"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "customSearch": { "alias": "customSearch"; "required": false; }; "searchCaseSensitive": { "alias": "searchCaseSensitive"; "required": false; }; "searchResultsSize": { "alias": "searchResultsSize"; "required": false; }; "searchDebounce": { "alias": "searchDebounce"; "required": false; }; "searchGramSize": { "alias": "searchGramSize"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "searchable": { "alias": "searchable"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "dropmenuWidth": { "alias": "dropmenuWidth"; "required": false; }; "dropmenuDensity": { "alias": "dropmenuDensity"; "required": false; }; "dropmenuFooterMessage": { "alias": "dropmenuFooterMessage"; "required": false; }; "dropmenuFooterTemplate": { "alias": "dropmenuFooterTemplate"; "required": false; }; "dropmenuEmptyStateTemplate": { "alias": "dropmenuEmptyStateTemplate"; "required": false; }; "dropmenuOptionTemplate": { "alias": "dropmenuOptionTemplate"; "required": false; }; "groupLabelTemplate": { "alias": "groupLabelTemplate"; "required": false; }; "groupBy": { "alias": "groupBy"; "required": false; }; "groupLabel": { "alias": "groupLabel"; "required": false; }; "options": { "alias": "options"; "required": false; }; "hasError": { "alias": "hasError"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "inputChange": "inputChange"; "inputFocus": "inputFocus"; "inputBlur": "inputBlur"; }, never, never, true, never>;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_readonly: unknown;
    static ngAcceptInputType_customSearch: unknown;
    static ngAcceptInputType_searchCaseSensitive: unknown;
    static ngAcceptInputType_searchResultsSize: unknown;
    static ngAcceptInputType_searchDebounce: unknown;
    static ngAcceptInputType_searchGramSize: unknown;
    static ngAcceptInputType_loading: unknown;
    static ngAcceptInputType_searchable: unknown;
}

type QDropmenuOpenedBy = 'mouse' | 'keyboard' | 'program';

export { QDropdownComponent };
export type { QDropdownOption, QDropdownWidth, QDropmenuOpenedBy };
