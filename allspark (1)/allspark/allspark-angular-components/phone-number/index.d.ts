import * as i0 from '@angular/core';
import { OnInit, DoCheck, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { QCountryPickerComponent, QCountryPickerCountry } from '@questrade/allspark-angular-components/country-picker';
import { QDropmenuDensity } from '@questrade/allspark-angular-components/dropmenu';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';

type QPhoneNumberCountryIsoCode = '' | 'AF' | 'AX' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AC' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BV' | 'BR' | 'IO' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'IC' | 'CV' | 'BQ' | 'KY' | 'CF' | 'EA' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CG' | 'CK' | 'FR-20R' | 'CR' | 'CI' | 'HR' | 'CU' | 'CW' | 'CY' | 'CZ' | 'DK' | 'DG' | 'DJ' | 'DM' | 'DO' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'SZ' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'GF' | 'PF' | 'TF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GP' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HM' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'XK' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MQ' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'UM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'NF' | 'KP' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PS' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'CD' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SX' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'GS' | 'KR' | 'SS' | 'ES' | 'LK' | 'SD' | 'SR' | 'SJ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TL' | 'TG' | 'TK' | 'TO' | 'TT' | 'TA' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UY' | 'UZ' | 'VU' | 'VA' | 'VE' | 'VN' | 'VG' | 'VI' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW';

type QPhoneNumberCountryName = 'Afghanistan' | 'Aland Islands' | 'Albania' | 'Algeria' | 'American Samoa' | 'Andorra' | 'Angola' | 'Anguilla' | 'Antarctica' | 'Antigua and Barbuda' | 'Argentina' | 'Armenia' | 'Aruba' | 'Ascension Island' | 'Australia' | 'Austria' | 'Azerbaijan' | 'Bahamas' | 'Bahrain' | 'Bangladesh' | 'Barbados' | 'Belarus' | 'Belgium' | 'Belize' | 'Benin' | 'Bermuda' | 'Bhutan' | 'Bolivia' | 'Bosnia and Herzegovina' | 'Botswana' | 'Bouvet Island' | 'Brazil' | 'British Indian Ocean Territory' | 'Brunei Darussalam' | 'Bulgaria' | 'Burkina Faso' | 'Burundi' | 'Cambodia' | 'Cameroon' | 'Canada' | 'Canary Islands' | 'Cape Verde' | 'Caribbean Netherlands' | 'Cayman Islands' | 'Central African Republic' | 'Ceuta & Melilla' | 'Chad' | 'Chile' | 'China' | 'Christmas Island' | 'Cocos Islands' | 'Colombia' | 'Comoros' | 'Congo' | 'Cook Islands' | 'Corsica' | 'Costa Rica' | 'Ivory Coast' | 'Croatia' | 'Cuba' | 'Curaçao' | 'Cyprus' | 'Czech Republic' | 'Denmark' | 'Diego Garcia' | 'Djibouti' | 'Dominica' | 'Dominican Republic' | 'Ecuador' | 'Egypt' | 'El Salvador' | 'Equatorial Guinea' | 'Eritrea' | 'Estonia' | 'Eswatini' | 'Ethiopia' | 'Falkland Islands' | 'Faroe Islands' | 'Fiji' | 'Finland' | 'France' | 'French Guiana' | 'French Polynesia' | 'French Southern Territories' | 'Gabon' | 'Gambia' | 'Georgia' | 'Germany' | 'Ghana' | 'Gibraltar' | 'Greece' | 'Greenland' | 'Grenada' | 'Guadeloupe' | 'Guam' | 'Guatemala' | 'Guernsey' | 'Guinea' | 'Guinea-Bissau' | 'Guyana' | 'Haiti' | 'Heard & McDonald Islands' | 'Honduras' | 'Hong Kong' | 'Hungary' | 'Iceland' | 'India' | 'Indonesia' | 'Iran' | 'Iraq' | 'Ireland' | 'Isle of Man' | 'Israel' | 'Italy' | 'Jamaica' | 'Japan' | 'Jersey' | 'Jordan' | 'Kazakhstan' | 'Kenya' | 'Kiribati' | 'Kosovo' | 'Kuwait' | 'Kyrgyzstan' | 'Laos' | 'Latvia' | 'Lebanon' | 'Lesotho' | 'Liberia' | 'Libyan Arab Jamahiriya' | 'Liechtenstein' | 'Lithuania' | 'Luxembourg' | 'Macao' | 'Macedonia' | 'Madagascar' | 'Malawi' | 'Malaysia' | 'Maldives' | 'Mali' | 'Malta' | 'Marshall Islands' | 'Martinique' | 'Mauritania' | 'Mauritius' | 'Mayotte' | 'Mexico' | 'Micronesia' | 'Minor Outlying Islands' | 'Moldova' | 'Monaco' | 'Mongolia' | 'Montenegro' | 'Montserrat' | 'Morocco' | 'Mozambique' | 'Myanmar (Burma)' | 'Namibia' | 'Nauru' | 'Nepal' | 'Netherlands' | 'New Caledonia' | 'New Zealand' | 'Nicaragua' | 'Niger' | 'Nigeria' | 'Niue' | 'Norfolk Island' | 'North Korea' | 'Northern Mariana Islands' | 'Norway' | 'Oman' | 'Pakistan' | 'Palau' | 'Palestinian Territory' | 'Panama' | 'Papua New Guinea' | 'Paraguay' | 'Peru' | 'Philippines' | 'Pitcairn' | 'Poland' | 'Portugal' | 'Puerto Rico' | 'Qatar' | 'Republic of the Congo' | 'Reunion' | 'Romania' | 'Russia' | 'Rwanda' | 'Saint Barthelemy' | 'Saint Helena' | 'Saint Kitts and Nevis' | 'Saint Lucia' | 'Saint Martin' | 'Saint Pierre and Miquelon' | 'Saint Vincent and the Grenadines' | 'Samoa' | 'San Marino' | 'Sao Tome and Principe' | 'Saudi Arabia' | 'Senegal' | 'Serbia' | 'Seychelles' | 'Sierra Leone' | 'Singapore' | 'Sint Maarten' | 'Slovakia' | 'Slovenia' | 'Solomon Islands' | 'Somalia' | 'South Africa' | 'South Georgia' | 'South Korea' | 'South Sudan' | 'Spain' | 'Sri Lanka' | 'Sudan' | 'Suriname' | 'Svalbard and Jan Mayen' | 'Sweden' | 'Switzerland' | 'Syrian Arab Republic' | 'Taiwan' | 'Tajikistan' | 'Tanzania' | 'Thailand' | 'Timor-Leste' | 'Togo' | 'Tokelau' | 'Tonga' | 'Trinidad and Tobago' | 'Tristan da Cunha' | 'Tunisia' | 'Turkey' | 'Turkmenistan' | 'Turks and Caicos Islands' | 'Tuvalu' | 'Uganda' | 'Ukraine' | 'United Arab Emirates' | 'United Kingdom' | 'United States' | 'Uruguay' | 'Uzbekistan' | 'Vanuatu' | 'Vatican' | 'Venezuela' | 'Vietnam' | 'Virgin Islands, British' | 'Virgin Islands, U.S.' | 'Wallis and Futuna' | 'Western Sahara' | 'Yemen' | 'Zambia' | 'Zimbabwe';

type QPhoneNumberCountry = {
    name: QPhoneNumberCountryName;
    code: string;
    emoji: string;
    groupId?: string;
    isoCode?: QPhoneNumberCountryIsoCode;
};

type QPhoneNumberGroup = {
    id: string;
    countries: QPhoneNumberCountryName[];
};

declare class QPhoneNumberComponent extends ErrorState implements OnInit, ControlValueAccessor, FormFieldControl, DoCheck {
    readonly countryChange: EventEmitter<QPhoneNumberCountry>;
    readonly phoneNumberChange: EventEmitter<string>;
    countryIsoCode: QPhoneNumberCountryIsoCode;
    value: string;
    dropmenuDensity: QDropmenuDensity;
    disabled: boolean;
    readonly: boolean;
    visibleCountries: QPhoneNumberCountryName[];
    groups: QPhoneNumberGroup[];
    errorStateMatcher: ErrorStateMatcherInterface;
    dataQt: string;
    set hasError(value: boolean);
    get hasError(): boolean;
    protected countryPicker: QCountryPickerComponent;
    controlId: string;
    protected hostClass: string;
    onChange: (value: string) => void;
    onTouch: () => void;
    phoneNumberPlaceholder: i0.Signal<string>;
    protected selectedCountry: QPhoneNumberCountry | null;
    private _hasError;
    private readonly _changeDetectorRef;
    private readonly _injector;
    private readonly _elementRef;
    private readonly _destroy$;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    onInputChange(event: Event): void;
    onCountryChange(event: QCountryPickerCountry): void;
    onBlur(): void;
    /** @hidden */
    writeValue(value: string): void;
    /** @hidden */
    registerOnChange(fn: (_: string) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    private _setComponentControl;
    private _subscribeToStateChanges;
    private _setCountryPickerConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<QPhoneNumberComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QPhoneNumberComponent, "q-phone-number", never, { "countryIsoCode": { "alias": "countryIsoCode"; "required": false; }; "value": { "alias": "value"; "required": false; }; "dropmenuDensity": { "alias": "dropmenuDensity"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "visibleCountries": { "alias": "visibleCountries"; "required": false; }; "groups": { "alias": "groups"; "required": false; }; "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "hasError": { "alias": "hasError"; "required": false; }; }, { "countryChange": "countryChange"; "phoneNumberChange": "phoneNumberChange"; }, never, never, true, never>;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_readonly: unknown;
}

export { QPhoneNumberComponent };
export type { QPhoneNumberCountry, QPhoneNumberCountryIsoCode, QPhoneNumberCountryName, QPhoneNumberGroup };
