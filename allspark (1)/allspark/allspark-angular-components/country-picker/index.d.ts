import * as _angular_core from '@angular/core';
import { OnInit, AfterContentInit, DoCheck, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { QDropdownOption } from '@questrade/allspark-angular-components/dropdown';
import * as i1 from '@questrade/allspark-angular-components/dropmenu';
import { QDropmenuComponent, QDropmenuOriginDirective, QDropmenuSelectionChange } from '@questrade/allspark-angular-components/dropmenu';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';

type QCountryPickerCountryName = 'Afghanistan' | 'Aland Islands' | 'Albania' | 'Algeria' | 'American Samoa' | 'Andorra' | 'Angola' | 'Anguilla' | 'Antarctica' | 'Antigua and Barbuda' | 'Argentina' | 'Armenia' | 'Aruba' | 'Ascension Island' | 'Australia' | 'Austria' | 'Azerbaijan' | 'Bahamas' | 'Bahrain' | 'Bangladesh' | 'Barbados' | 'Belarus' | 'Belgium' | 'Belize' | 'Benin' | 'Bermuda' | 'Bhutan' | 'Bolivia' | 'Bosnia and Herzegovina' | 'Botswana' | 'Bouvet Island' | 'Brazil' | 'British Indian Ocean Territory' | 'Brunei Darussalam' | 'Bulgaria' | 'Burkina Faso' | 'Burundi' | 'Cambodia' | 'Cameroon' | 'Canada' | 'Canary Islands' | 'Cape Verde' | 'Caribbean Netherlands' | 'Cayman Islands' | 'Central African Republic' | 'Ceuta & Melilla' | 'Chad' | 'Chile' | 'China' | 'Christmas Island' | 'Cocos Islands' | 'Colombia' | 'Comoros' | 'Congo' | 'Cook Islands' | 'Corsica' | 'Costa Rica' | 'Ivory Coast' | 'Croatia' | 'Cuba' | 'Curaçao' | 'Cyprus' | 'Czech Republic' | 'Denmark' | 'Diego Garcia' | 'Djibouti' | 'Dominica' | 'Dominican Republic' | 'Ecuador' | 'Egypt' | 'El Salvador' | 'Equatorial Guinea' | 'Eritrea' | 'Estonia' | 'Eswatini' | 'Ethiopia' | 'Falkland Islands' | 'Faroe Islands' | 'Fiji' | 'Finland' | 'France' | 'French Guiana' | 'French Polynesia' | 'French Southern Territories' | 'Gabon' | 'Gambia' | 'Georgia' | 'Germany' | 'Ghana' | 'Gibraltar' | 'Greece' | 'Greenland' | 'Grenada' | 'Guadeloupe' | 'Guam' | 'Guatemala' | 'Guernsey' | 'Guinea' | 'Guinea-Bissau' | 'Guyana' | 'Haiti' | 'Heard & McDonald Islands' | 'Honduras' | 'Hong Kong' | 'Hungary' | 'Iceland' | 'India' | 'Indonesia' | 'Iran' | 'Iraq' | 'Ireland' | 'Isle of Man' | 'Israel' | 'Italy' | 'Jamaica' | 'Japan' | 'Jersey' | 'Jordan' | 'Kazakhstan' | 'Kenya' | 'Kiribati' | 'Kosovo' | 'Kuwait' | 'Kyrgyzstan' | 'Laos' | 'Latvia' | 'Lebanon' | 'Lesotho' | 'Liberia' | 'Libyan Arab Jamahiriya' | 'Liechtenstein' | 'Lithuania' | 'Luxembourg' | 'Macao' | 'Macedonia' | 'Madagascar' | 'Malawi' | 'Malaysia' | 'Maldives' | 'Mali' | 'Malta' | 'Marshall Islands' | 'Martinique' | 'Mauritania' | 'Mauritius' | 'Mayotte' | 'Mexico' | 'Micronesia' | 'Minor Outlying Islands' | 'Moldova' | 'Monaco' | 'Mongolia' | 'Montenegro' | 'Montserrat' | 'Morocco' | 'Mozambique' | 'Myanmar (Burma)' | 'Namibia' | 'Nauru' | 'Nepal' | 'Netherlands' | 'New Caledonia' | 'New Zealand' | 'Nicaragua' | 'Niger' | 'Nigeria' | 'Niue' | 'Norfolk Island' | 'North Korea' | 'Northern Mariana Islands' | 'Norway' | 'Oman' | 'Pakistan' | 'Palau' | 'Palestinian Territory' | 'Panama' | 'Papua New Guinea' | 'Paraguay' | 'Peru' | 'Philippines' | 'Pitcairn' | 'Poland' | 'Portugal' | 'Puerto Rico' | 'Qatar' | 'Republic of the Congo' | 'Reunion' | 'Romania' | 'Russia' | 'Rwanda' | 'Saint Barthelemy' | 'Saint Helena' | 'Saint Kitts and Nevis' | 'Saint Lucia' | 'Saint Martin' | 'Saint Pierre and Miquelon' | 'Saint Vincent and the Grenadines' | 'Samoa' | 'San Marino' | 'Sao Tome and Principe' | 'Saudi Arabia' | 'Senegal' | 'Serbia' | 'Seychelles' | 'Sierra Leone' | 'Singapore' | 'Sint Maarten' | 'Slovakia' | 'Slovenia' | 'Solomon Islands' | 'Somalia' | 'South Africa' | 'South Georgia' | 'South Korea' | 'South Sudan' | 'Spain' | 'Sri Lanka' | 'Sudan' | 'Suriname' | 'Svalbard and Jan Mayen' | 'Sweden' | 'Switzerland' | 'Syrian Arab Republic' | 'Taiwan' | 'Tajikistan' | 'Tanzania' | 'Thailand' | 'Timor-Leste' | 'Togo' | 'Tokelau' | 'Tonga' | 'Trinidad and Tobago' | 'Tristan da Cunha' | 'Tunisia' | 'Turkey' | 'Turkmenistan' | 'Turks and Caicos Islands' | 'Tuvalu' | 'Uganda' | 'Ukraine' | 'United Arab Emirates' | 'United Kingdom' | 'United States' | 'Uruguay' | 'Uzbekistan' | 'Vanuatu' | 'Vatican' | 'Venezuela' | 'Vietnam' | 'Virgin Islands, British' | 'Virgin Islands, U.S.' | 'Wallis and Futuna' | 'Western Sahara' | 'Yemen' | 'Zambia' | 'Zimbabwe';

type QCountryPickerIsoCode = '' | 'AF' | 'AX' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AC' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BV' | 'BR' | 'IO' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'IC' | 'CV' | 'BQ' | 'KY' | 'CF' | 'EA' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CG' | 'CK' | 'FR-20R' | 'CR' | 'CI' | 'HR' | 'CU' | 'CW' | 'CY' | 'CZ' | 'DK' | 'DG' | 'DJ' | 'DM' | 'DO' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'SZ' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'GF' | 'PF' | 'TF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GP' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HM' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'XK' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MQ' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'UM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'NF' | 'KP' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PS' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'CD' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SX' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'GS' | 'KR' | 'SS' | 'ES' | 'LK' | 'SD' | 'SR' | 'SJ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TL' | 'TG' | 'TK' | 'TO' | 'TT' | 'TA' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UY' | 'UZ' | 'VU' | 'VA' | 'VE' | 'VN' | 'VG' | 'VI' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW';

type QCountryPickerCountry = {
    name: QCountryPickerCountryName;
    code: string;
    emoji: string;
    groupId?: string;
    isoCode?: QCountryPickerIsoCode;
};

declare const Q_COUNTRY_PICKER_COUNTRIES: QCountryPickerCountry[];

type QCountryPickerOptionDensity = 'default' | 'compact';

type QCountryPickerGroup = {
    id: string;
    countries: QCountryPickerCountryName[];
};

declare class QCountryPickerComponent extends ErrorState implements OnInit, AfterContentInit, DoCheck, ControlValueAccessor, FormFieldControl {
    readonly countrySelected: _angular_core.OutputEmitterRef<QCountryPickerCountry>;
    readonly value: _angular_core.ModelSignal<QCountryPickerIsoCode>;
    readonly density: _angular_core.InputSignal<QCountryPickerOptionDensity>;
    readonly readonly: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly hasError: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly visibleCountries: _angular_core.InputSignal<QCountryPickerCountryName[]>;
    readonly groups: _angular_core.InputSignal<QCountryPickerGroup[]>;
    readonly showTriggerFlag: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly dataQt: _angular_core.InputSignal<string>;
    disabled: boolean;
    errorStateMatcher: ErrorStateMatcherInterface;
    protected readonly dropmenuRef: _angular_core.Signal<QDropmenuComponent<QCountryPickerCountry> | undefined>;
    protected readonly searchInput: _angular_core.Signal<ElementRef<HTMLInputElement> | undefined>;
    protected readonly clearIconRef: _angular_core.Signal<ElementRef<HTMLElement> | undefined>;
    controlId: string;
    searchPlaceholder: _angular_core.Signal<string>;
    searchEmptyStateMessage: _angular_core.Signal<string>;
    triggerPlaceholder: _angular_core.Signal<string>;
    countryOptions: _angular_core.WritableSignal<QDropdownOption<QCountryPickerCountry>[]>;
    /** @private */
    customHostElement: ElementRef<HTMLElement> | null;
    /** @private */
    showTriggerCountryName: boolean;
    /** @private */
    showTriggerCode: boolean;
    /** @private */
    showOptionCode: boolean;
    protected readonly dropmenuOrigin: QDropmenuOriginDirective;
    protected useFallbackEmojis: boolean;
    protected selectedCountry: QCountryPickerCountry | null;
    protected filteredCountryOptions: _angular_core.WritableSignal<QDropdownOption<QCountryPickerCountry>[]>;
    protected dropmenuMinWidth: number;
    protected searchValue: string;
    private _value;
    private _onChange;
    private _onTouched;
    private readonly _injector;
    private readonly _cdr;
    private readonly _document;
    private readonly _iconRegistry;
    private readonly _elementRef;
    private readonly _resizeObserver;
    private readonly _destroy$;
    private readonly _transloco;
    constructor();
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngDoCheck(): void;
    onBlur(): void;
    writeValue(value: QCountryPickerIsoCode): void;
    registerOnChange(fn: (value: QCountryPickerIsoCode) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected onHostClick(): void;
    protected onHostKeydown(event: KeyboardEvent): void;
    protected onDropmenuChange(event: QDropmenuSelectionChange<QCountryPickerCountry>): void;
    protected onDropmenuOpened(): void;
    protected onDropmenuClosed(): void;
    protected onSearchInput(event: Event): void;
    protected clearSearch(): void;
    protected showClearIcon(): boolean;
    private _findSelectedCountryByIsoCode;
    private _registerIcons;
    private _setFallbackEmojis;
    private _setComponentControl;
    private _updateSelectedCountryFromValue;
    private _subscribeToStateChanges;
    private _disableDropmenuTypeahead;
    /**
     * Checks if the current platform supports emojis.
     *
     * This method creates a canvas element and draws an emoji on it. It then checks the pixel data of the emoji
     * to determine if the platform supports emojis. If the pixel data is not all zeros, it indicates that the
     * platform supports emojis. This technique is commonly used to detect emoji support in web browsers, as
     * some browsers may not support all emojis or may render them differently.
     *
     */
    private _platformSupportsEmojis;
    private _createCountryOptions;
    private _getCountryGroupProp;
    private _handleWidthChanges;
    private _setDropmenuWidth;
    private _handleTranslationChange;
    private _filterCountries;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<QCountryPickerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<QCountryPickerComponent, "q-country-picker", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "density": { "alias": "density"; "required": false; "isSignal": true; }; "readonly": { "alias": "readonly"; "required": false; "isSignal": true; }; "hasError": { "alias": "hasError"; "required": false; "isSignal": true; }; "visibleCountries": { "alias": "visibleCountries"; "required": false; "isSignal": true; }; "groups": { "alias": "groups"; "required": false; "isSignal": true; }; "showTriggerFlag": { "alias": "showTriggerFlag"; "required": false; "isSignal": true; }; "dataQt": { "alias": "dataQt"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; }; "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; }, { "countrySelected": "countrySelected"; "value": "valueChange"; }, never, never, true, [{ directive: typeof i1.QDropmenuOriginDirective; inputs: {}; outputs: {}; }]>;
    static ngAcceptInputType_disabled: unknown;
}

export { QCountryPickerComponent, Q_COUNTRY_PICKER_COUNTRIES };
export type { QCountryPickerCountry, QCountryPickerCountryName, QCountryPickerGroup, QCountryPickerIsoCode, QCountryPickerOptionDensity };
