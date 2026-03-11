import * as i0 from '@angular/core';
import { output, model, input, booleanAttribute, viewChild, signal, inject, Injector, ChangeDetectorRef, DOCUMENT, ElementRef, effect, forwardRef, Input, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupDirective, NgForm, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { translateSignal, TranslocoService, TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { QTextHighlightDirective } from '@questrade/allspark-angular-components/core/directives';
import { QSharedResizeObserverService } from '@questrade/allspark-angular-components/core/services';
import { ErrorState, voidFn, injectDestroy, SPACE, ENTER } from '@questrade/allspark-angular-components/core/utils';
import * as i1 from '@questrade/allspark-angular-components/dropmenu';
import { QDropmenuComponent, QDropmenuOriginDirective } from '@questrade/allspark-angular-components/dropmenu';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { QInputDirective, QInputGroupComponent } from '@questrade/allspark-angular-components/input';
import { MISSING_KEY_HANDLER } from '@questrade/allspark-angular-components/transloco';
import { chevronDown, search, cancelOutline, thickCheck } from '@questrade/allspark-icons/icons';
import { takeUntil, debounceTime } from 'rxjs';

const Q_COUNTRY_PICKER_COUNTRIES = [
    {
        name: 'Afghanistan',
        emoji: '🇦🇫',
        code: '+93',
        isoCode: 'AF',
    },
    {
        name: 'Aland Islands',
        emoji: '🇦🇽',
        code: '+358',
        isoCode: 'AX',
    },
    {
        name: 'Albania',
        emoji: '🇦🇱',
        code: '+355',
        isoCode: 'AL',
    },
    {
        name: 'Algeria',
        emoji: '🇩🇿',
        code: '+213',
        isoCode: 'DZ',
    },
    {
        name: 'American Samoa',
        emoji: '🇦🇸',
        code: '+1684',
        isoCode: 'AS',
    },
    {
        name: 'Andorra',
        emoji: '🇦🇩',
        code: '+376',
        isoCode: 'AD',
    },
    {
        name: 'Angola',
        emoji: '🇦🇴',
        code: '+244',
        isoCode: 'AO',
    },
    {
        name: 'Anguilla',
        emoji: '🇦🇮',
        code: '+1264',
        isoCode: 'AI',
    },
    {
        name: 'Antarctica',
        emoji: '🇦🇶',
        code: '+672',
        isoCode: 'AQ',
    },
    {
        name: 'Antigua and Barbuda',
        emoji: '🇦🇬',
        code: '+1268',
        isoCode: 'AG',
    },
    {
        name: 'Argentina',
        emoji: '🇦🇷',
        code: '+54',
        isoCode: 'AR',
    },
    {
        name: 'Armenia',
        emoji: '🇦🇲',
        code: '+374',
        isoCode: 'AM',
    },
    {
        name: 'Aruba',
        emoji: '🇦🇼',
        code: '+297',
        isoCode: 'AW',
    },
    {
        name: 'Ascension Island',
        emoji: '🇦🇨',
        code: '+247',
        isoCode: 'AC',
    },
    {
        name: 'Australia',
        emoji: '🇦🇺',
        code: '+61',
        isoCode: 'AU',
    },
    {
        name: 'Austria',
        emoji: '🇦🇹',
        code: '+43',
        isoCode: 'AT',
    },
    {
        name: 'Azerbaijan',
        emoji: '🇦🇿',
        code: '+994',
        isoCode: 'AZ',
    },
    {
        name: 'Bahamas',
        emoji: '🇧🇸',
        code: '+1242',
        isoCode: 'BS',
    },
    {
        name: 'Bahrain',
        emoji: '🇧🇭',
        code: '+973',
        isoCode: 'BH',
    },
    {
        name: 'Bangladesh',
        emoji: '🇧🇩',
        code: '+880',
        isoCode: 'BD',
    },
    {
        name: 'Barbados',
        emoji: '🇧🇧',
        code: '+1246',
        isoCode: 'BB',
    },
    {
        name: 'Belarus',
        emoji: '🇧🇾',
        code: '+375',
        isoCode: 'BY',
    },
    {
        name: 'Belgium',
        emoji: '🇧🇪',
        code: '+32',
        isoCode: 'BE',
    },
    {
        name: 'Belize',
        emoji: '🇧🇿',
        code: '+501',
        isoCode: 'BZ',
    },
    {
        name: 'Benin',
        emoji: '🇧🇯',
        code: '+229',
        isoCode: 'BJ',
    },
    {
        name: 'Bermuda',
        emoji: '🇧🇲',
        code: '+1441',
        isoCode: 'BM',
    },
    {
        name: 'Bhutan',
        emoji: '🇧🇹',
        code: '+975',
        isoCode: 'BT',
    },
    {
        name: 'Bolivia',
        emoji: '🇧🇴',
        code: '+591',
        isoCode: 'BO',
    },
    {
        name: 'Bosnia and Herzegovina',
        emoji: '🇧🇦',
        code: '+387',
        isoCode: 'BA',
    },
    {
        name: 'Botswana',
        emoji: '🇧🇼',
        code: '+267',
        isoCode: 'BW',
    },
    {
        name: 'Bouvet Island',
        emoji: '🇧🇻',
        code: '+47',
        isoCode: 'BV',
    },
    {
        name: 'Brazil',
        emoji: '🇧🇷',
        code: '+55',
        isoCode: 'BR',
    },
    {
        name: 'British Indian Ocean Territory',
        emoji: '🇮🇴',
        code: '+246',
        isoCode: 'IO',
    },
    {
        name: 'Brunei Darussalam',
        emoji: '🇧🇳',
        code: '+673',
        isoCode: 'BN',
    },
    {
        name: 'Bulgaria',
        emoji: '🇧🇬',
        code: '+359',
        isoCode: 'BG',
    },
    {
        name: 'Burkina Faso',
        emoji: '🇧🇫',
        code: '+226',
        isoCode: 'BF',
    },
    {
        name: 'Burundi',
        emoji: '🇧🇮',
        code: '+257',
        isoCode: 'BI',
    },
    {
        name: 'Cambodia',
        emoji: '🇰🇭',
        code: '+855',
        isoCode: 'KH',
    },
    {
        name: 'Cameroon',
        emoji: '🇨🇲',
        code: '+237',
        isoCode: 'CM',
    },
    {
        name: 'Canada',
        emoji: '🇨🇦',
        code: '+1',
        isoCode: 'CA',
    },
    {
        name: 'Canary Islands',
        emoji: '🇮🇨',
        code: '+34',
        isoCode: 'IC',
    },
    {
        name: 'Cape Verde',
        emoji: '🇨🇻',
        code: '+238',
        isoCode: 'CV',
    },
    {
        name: 'Caribbean Netherlands',
        emoji: '🇧🇶',
        code: '+599',
        isoCode: 'BQ',
    },
    {
        name: 'Cayman Islands',
        emoji: '🇰🇾',
        code: '+345',
        isoCode: 'KY',
    },
    {
        name: 'Central African Republic',
        emoji: '🇨🇫',
        code: '+236',
        isoCode: 'CF',
    },
    {
        name: 'Ceuta & Melilla',
        emoji: '🇪🇦',
        code: '+34',
        isoCode: 'EA',
    },
    {
        name: 'Chad',
        emoji: '🇹🇩',
        code: '+235',
        isoCode: 'TD',
    },
    {
        name: 'Chile',
        emoji: '🇨🇱',
        code: '+56',
        isoCode: 'CL',
    },
    {
        name: 'China',
        emoji: '🇨🇳',
        code: '+86',
        isoCode: 'CN',
    },
    {
        name: 'Christmas Island',
        emoji: '🇨🇽',
        code: '+61',
        isoCode: 'CX',
    },
    {
        name: 'Cocos Islands',
        emoji: '🇨🇨',
        code: '+61',
        isoCode: 'CC',
    },
    {
        name: 'Colombia',
        emoji: '🇨🇴',
        code: '+57',
        isoCode: 'CO',
    },
    {
        name: 'Comoros',
        emoji: '🇰🇲',
        code: '+269',
        isoCode: 'KM',
    },
    {
        name: 'Congo',
        emoji: '🇨🇬',
        code: '+242',
        isoCode: 'CG',
    },
    {
        name: 'Cook Islands',
        emoji: '🇨🇰',
        code: '+682',
        isoCode: 'CK',
    },
    {
        name: 'Corsica',
        emoji: '🇨🇵',
        code: '+33',
        isoCode: 'FR-20R',
    },
    {
        name: 'Costa Rica',
        emoji: '🇨🇷',
        code: '+506',
        isoCode: 'CR',
    },
    {
        name: 'Ivory Coast',
        emoji: '🇨🇮',
        code: '+225',
        isoCode: 'CI',
    },
    {
        name: 'Croatia',
        emoji: '🇭🇷',
        code: '+385',
        isoCode: 'HR',
    },
    {
        name: 'Cuba',
        emoji: '🇨🇺',
        code: '+53',
        isoCode: 'CU',
    },
    {
        name: 'Curaçao',
        emoji: '🇨🇼',
        code: '+599',
        isoCode: 'CW',
    },
    {
        name: 'Cyprus',
        emoji: '🇨🇾',
        code: '+357',
        isoCode: 'CY',
    },
    {
        name: 'Czech Republic',
        emoji: '🇨🇿',
        code: '+420',
        isoCode: 'CZ',
    },
    {
        name: 'Denmark',
        emoji: '🇩🇰',
        code: '+45',
        isoCode: 'DK',
    },
    {
        name: 'Diego Garcia',
        emoji: '🇩🇬',
        code: '+246',
        isoCode: 'DG',
    },
    {
        name: 'Djibouti',
        emoji: '🇩🇯',
        code: '+253',
        isoCode: 'DJ',
    },
    {
        name: 'Dominica',
        emoji: '🇩🇲',
        code: '+1767',
        isoCode: 'DM',
    },
    {
        name: 'Dominican Republic',
        emoji: '🇩🇴',
        code: '+1849',
        isoCode: 'DO',
    },
    {
        name: 'Ecuador',
        emoji: '🇪🇨',
        code: '+593',
        isoCode: 'EC',
    },
    {
        name: 'Egypt',
        emoji: '🇪🇬',
        code: '+20',
        isoCode: 'EG',
    },
    {
        name: 'El Salvador',
        emoji: '🇸🇻',
        code: '+503',
        isoCode: 'SV',
    },
    {
        name: 'Equatorial Guinea',
        emoji: '🇬🇶',
        code: '+240',
        isoCode: 'GQ',
    },
    {
        name: 'Eritrea',
        emoji: '🇪🇷',
        code: '+291',
        isoCode: 'ER',
    },
    {
        name: 'Estonia',
        emoji: '🇪🇪',
        code: '+372',
        isoCode: 'EE',
    },
    {
        name: 'Eswatini',
        emoji: '🇸🇿',
        code: '+268',
        isoCode: 'SZ',
    },
    {
        name: 'Ethiopia',
        emoji: '🇪🇹',
        code: '+251',
        isoCode: 'ET',
    },
    {
        name: 'Falkland Islands',
        emoji: '🇫🇰',
        code: '+500',
        isoCode: 'FK',
    },
    {
        name: 'Faroe Islands',
        emoji: '🇫🇴',
        code: '+298',
        isoCode: 'FO',
    },
    {
        name: 'Fiji',
        emoji: '🇫🇯',
        code: '+679',
        isoCode: 'FJ',
    },
    {
        name: 'Finland',
        emoji: '🇫🇮',
        code: '+358',
        isoCode: 'FI',
    },
    {
        name: 'France',
        emoji: '🇫🇷',
        code: '+33',
        isoCode: 'FR',
    },
    {
        name: 'French Guiana',
        emoji: '🇬🇫',
        code: '+594',
        isoCode: 'GF',
    },
    {
        name: 'French Polynesia',
        emoji: '🇵🇫',
        code: '+689',
        isoCode: 'PF',
    },
    {
        name: 'French Southern Territories',
        emoji: '🇹🇫',
        code: '+262',
        isoCode: 'TF',
    },
    {
        name: 'Gabon',
        emoji: '🇬🇦',
        code: '+241',
        isoCode: 'GA',
    },
    {
        name: 'Gambia',
        emoji: '🇬🇲',
        code: '+220',
        isoCode: 'GM',
    },
    {
        name: 'Georgia',
        emoji: '🇬🇪',
        code: '+995',
        isoCode: 'GE',
    },
    {
        name: 'Germany',
        emoji: '🇩🇪',
        code: '+49',
        isoCode: 'DE',
    },
    {
        name: 'Ghana',
        emoji: '🇬🇭',
        code: '+233',
        isoCode: 'GH',
    },
    {
        name: 'Gibraltar',
        emoji: '🇬🇮',
        code: '+350',
        isoCode: 'GI',
    },
    {
        name: 'Greece',
        emoji: '🇬🇷',
        code: '+30',
        isoCode: 'GR',
    },
    {
        name: 'Greenland',
        emoji: '🇬🇱',
        code: '+299',
        isoCode: 'GL',
    },
    {
        name: 'Grenada',
        emoji: '🇬🇩',
        code: '+1473',
        isoCode: 'GD',
    },
    {
        name: 'Guadeloupe',
        emoji: '🇬🇵',
        code: '+590',
        isoCode: 'GP',
    },
    {
        name: 'Guam',
        emoji: '🇬🇺',
        code: '+1671',
        isoCode: 'GU',
    },
    {
        name: 'Guatemala',
        emoji: '🇬🇹',
        code: '+502',
        isoCode: 'GT',
    },
    {
        name: 'Guernsey',
        emoji: '🇬🇬',
        code: '+44',
        isoCode: 'GG',
    },
    {
        name: 'Guinea',
        emoji: '🇬🇳',
        code: '+224',
        isoCode: 'GN',
    },
    {
        name: 'Guinea-Bissau',
        emoji: '🇬🇼',
        code: '+245',
        isoCode: 'GW',
    },
    {
        name: 'Guyana',
        emoji: '🇬🇾',
        code: '+595',
        isoCode: 'GY',
    },
    {
        name: 'Haiti',
        emoji: '🇭🇹',
        code: '+509',
        isoCode: 'HT',
    },
    {
        name: 'Heard & McDonald Islands',
        emoji: '🇭🇲',
        code: '+672',
        isoCode: 'HM',
    },
    {
        name: 'Honduras',
        emoji: '🇭🇳',
        code: '+504',
        isoCode: 'HN',
    },
    {
        name: 'Hong Kong',
        emoji: '🇭🇰',
        code: '+852',
        isoCode: 'HK',
    },
    {
        name: 'Hungary',
        emoji: '🇭🇺',
        code: '+36',
        isoCode: 'HU',
    },
    {
        name: 'Iceland',
        emoji: '🇮🇸',
        code: '+354',
        isoCode: 'IS',
    },
    {
        name: 'India',
        emoji: '🇮🇳',
        code: '+91',
        isoCode: 'IN',
    },
    {
        name: 'Indonesia',
        emoji: '🇮🇩',
        code: '+62',
        isoCode: 'ID',
    },
    {
        name: 'Iran',
        emoji: '🇮🇷',
        code: '+98',
        isoCode: 'IR',
    },
    {
        name: 'Iraq',
        emoji: '🇮🇶',
        code: '+964',
        isoCode: 'IQ',
    },
    {
        name: 'Ireland',
        emoji: '🇮🇪',
        code: '+353',
        isoCode: 'IE',
    },
    {
        name: 'Isle of Man',
        emoji: '🇮🇲',
        code: '+44',
        isoCode: 'IM',
    },
    {
        name: 'Israel',
        emoji: '🇮🇱',
        code: '+972',
        isoCode: 'IL',
    },
    {
        name: 'Italy',
        emoji: '🇮🇹',
        code: '+39',
        isoCode: 'IT',
    },
    {
        name: 'Jamaica',
        emoji: '🇯🇲',
        code: '+1876',
        isoCode: 'JM',
    },
    {
        name: 'Japan',
        emoji: '🇯🇵',
        code: '+81',
        isoCode: 'JP',
    },
    {
        name: 'Jersey',
        emoji: '🇯🇪',
        code: '+44',
        isoCode: 'JE',
    },
    {
        name: 'Jordan',
        emoji: '🇯🇴',
        code: '+962',
        isoCode: 'JO',
    },
    {
        name: 'Kazakhstan',
        emoji: '🇰🇿',
        code: '+77',
        isoCode: 'KZ',
    },
    {
        name: 'Kenya',
        emoji: '🇰🇪',
        code: '+254',
        isoCode: 'KE',
    },
    {
        name: 'Kiribati',
        emoji: '🇰🇮',
        code: '+686',
        isoCode: 'KI',
    },
    {
        name: 'Kosovo',
        emoji: '🇽🇰',
        code: '+383',
        isoCode: 'XK',
    },
    {
        name: 'Kuwait',
        emoji: '🇰🇼',
        code: '+965',
        isoCode: 'KW',
    },
    {
        name: 'Kyrgyzstan',
        emoji: '🇰🇬',
        code: '+996',
        isoCode: 'KG',
    },
    {
        name: 'Laos',
        emoji: '🇱🇦',
        code: '+856',
        isoCode: 'LA',
    },
    {
        name: 'Latvia',
        emoji: '🇱🇻',
        code: '+371',
        isoCode: 'LV',
    },
    {
        name: 'Lebanon',
        emoji: '🇱🇧',
        code: '+961',
        isoCode: 'LB',
    },
    {
        name: 'Lesotho',
        emoji: '🇱🇸',
        code: '+266',
        isoCode: 'LS',
    },
    {
        name: 'Liberia',
        emoji: '🇱🇷',
        code: '+231',
        isoCode: 'LR',
    },
    {
        name: 'Libyan Arab Jamahiriya',
        emoji: '🇱🇾',
        code: '+218',
        isoCode: 'LY',
    },
    {
        name: 'Liechtenstein',
        emoji: '🇱🇮',
        code: '+423',
        isoCode: 'LI',
    },
    {
        name: 'Lithuania',
        emoji: '🇱🇹',
        code: '+370',
        isoCode: 'LT',
    },
    {
        name: 'Luxembourg',
        emoji: '🇱🇺',
        code: '+352',
        isoCode: 'LU',
    },
    {
        name: 'Macao',
        emoji: '🇲🇴',
        code: '+853',
        isoCode: 'MO',
    },
    {
        name: 'Macedonia',
        emoji: '🇲🇰',
        code: '+389',
        isoCode: 'MK',
    },
    {
        name: 'Madagascar',
        emoji: '🇲🇬',
        code: '+261',
        isoCode: 'MG',
    },
    {
        name: 'Malawi',
        emoji: '🇲🇼',
        code: '+265',
        isoCode: 'MW',
    },
    {
        name: 'Malaysia',
        emoji: '🇲🇾',
        code: '+60',
        isoCode: 'MY',
    },
    {
        name: 'Maldives',
        emoji: '🇲🇻',
        code: '+960',
        isoCode: 'MV',
    },
    {
        name: 'Mali',
        emoji: '🇲🇱',
        code: '+223',
        isoCode: 'ML',
    },
    {
        name: 'Malta',
        emoji: '🇲🇹',
        code: '+356',
        isoCode: 'MT',
    },
    {
        name: 'Marshall Islands',
        emoji: '🇲🇭',
        code: '+692',
        isoCode: 'MH',
    },
    {
        name: 'Martinique',
        emoji: '🇲🇶',
        code: '+596',
        isoCode: 'MQ',
    },
    {
        name: 'Mauritania',
        emoji: '🇲🇷',
        code: '+222',
        isoCode: 'MR',
    },
    {
        name: 'Mauritius',
        emoji: '🇲🇺',
        code: '+230',
        isoCode: 'MU',
    },
    {
        name: 'Mayotte',
        emoji: '🇾🇹',
        code: '+262',
        isoCode: 'YT',
    },
    {
        name: 'Mexico',
        emoji: '🇲🇽',
        code: '+52',
        isoCode: 'MX',
    },
    {
        name: 'Micronesia',
        emoji: '🇫🇲',
        code: '+691',
        isoCode: 'FM',
    },
    {
        name: 'Minor Outlying Islands',
        emoji: '🇺🇲',
        code: '+1',
        isoCode: 'UM',
    },
    {
        name: 'Moldova',
        emoji: '🇲🇩',
        code: '+373',
        isoCode: 'MD',
    },
    {
        name: 'Monaco',
        emoji: '🇲🇨',
        code: '+377',
        isoCode: 'MC',
    },
    {
        name: 'Mongolia',
        emoji: '🇲🇳',
        code: '+976',
        isoCode: 'MN',
    },
    {
        name: 'Montenegro',
        emoji: '🇲🇪',
        code: '+382',
        isoCode: 'ME',
    },
    {
        name: 'Montserrat',
        emoji: '🇲🇸',
        code: '+1664',
        isoCode: 'MS',
    },
    {
        name: 'Morocco',
        emoji: '🇲🇦',
        code: '+212',
        isoCode: 'MA',
    },
    {
        name: 'Mozambique',
        emoji: '🇲🇿',
        code: '+258',
        isoCode: 'MZ',
    },
    {
        name: 'Myanmar (Burma)',
        emoji: '🇲🇲',
        code: '+95',
        isoCode: 'MM',
    },
    {
        name: 'Namibia',
        emoji: '🇳🇦',
        code: '+264',
        isoCode: 'NA',
    },
    {
        name: 'Nauru',
        emoji: '🇳🇷',
        code: '+674',
        isoCode: 'NR',
    },
    {
        name: 'Nepal',
        emoji: '🇳🇵',
        code: '+977',
        isoCode: 'NP',
    },
    {
        name: 'Netherlands',
        emoji: '🇳🇱',
        code: '+31',
        isoCode: 'NL',
    },
    {
        name: 'New Caledonia',
        emoji: '🇳🇨',
        code: '+687',
        isoCode: 'NC',
    },
    {
        name: 'New Zealand',
        emoji: '🇳🇿',
        code: '+64',
        isoCode: 'NZ',
    },
    {
        name: 'Nicaragua',
        emoji: '🇳🇮',
        code: '+505',
        isoCode: 'NI',
    },
    {
        name: 'Niger',
        emoji: '🇳🇪',
        code: '+227',
        isoCode: 'NE',
    },
    {
        name: 'Nigeria',
        emoji: '🇳🇬',
        code: '+234',
        isoCode: 'NG',
    },
    {
        name: 'Niue',
        emoji: '🇳🇺',
        code: '+683',
        isoCode: 'NU',
    },
    {
        name: 'Norfolk Island',
        emoji: '🇳🇫',
        code: '+672',
        isoCode: 'NF',
    },
    {
        name: 'North Korea',
        emoji: '🇰🇵',
        code: '+850',
        isoCode: 'KP',
    },
    {
        name: 'Northern Mariana Islands',
        emoji: '🇲🇵',
        code: '+1670',
        isoCode: 'MP',
    },
    {
        name: 'Norway',
        emoji: '🇳🇴',
        code: '+47',
        isoCode: 'NO',
    },
    {
        name: 'Oman',
        emoji: '🇴🇲',
        code: '+968',
        isoCode: 'OM',
    },
    {
        name: 'Pakistan',
        emoji: '🇵🇰',
        code: '+92',
        isoCode: 'PK',
    },
    {
        name: 'Palau',
        emoji: '🇵🇼',
        code: '+680',
        isoCode: 'PW',
    },
    {
        name: 'Palestinian Territory',
        emoji: '🇵🇸',
        code: '+970',
        isoCode: 'PS',
    },
    {
        name: 'Panama',
        emoji: '🇵🇦',
        code: '+507',
        isoCode: 'PA',
    },
    {
        name: 'Papua New Guinea',
        emoji: '🇵🇬',
        code: '+675',
        isoCode: 'PG',
    },
    {
        name: 'Paraguay',
        emoji: '🇵🇾',
        code: '+595',
        isoCode: 'PY',
    },
    {
        name: 'Peru',
        emoji: '🇵🇪',
        code: '+51',
        isoCode: 'PE',
    },
    {
        name: 'Philippines',
        emoji: '🇵🇭',
        code: '+63',
        isoCode: 'PH',
    },
    {
        name: 'Pitcairn',
        emoji: '🇵🇳',
        code: '+872',
        isoCode: 'PN',
    },
    {
        name: 'Poland',
        emoji: '🇵🇱',
        code: '+48',
        isoCode: 'PL',
    },
    {
        name: 'Portugal',
        emoji: '🇵🇹',
        code: '+351',
        isoCode: 'PT',
    },
    {
        name: 'Puerto Rico',
        emoji: '🇵🇷',
        code: '+1939',
        isoCode: 'PR',
    },
    {
        name: 'Qatar',
        emoji: '🇶🇦',
        code: '+974',
        isoCode: 'QA',
    },
    {
        name: 'Republic of the Congo',
        emoji: '🇨🇩',
        code: '+243',
        isoCode: 'CD',
    },
    {
        name: 'Reunion',
        emoji: '🇷🇪',
        code: '+262',
        isoCode: 'RE',
    },
    {
        name: 'Romania',
        emoji: '🇷🇴',
        code: '+40',
        isoCode: 'RO',
    },
    {
        name: 'Russia',
        emoji: '🇷🇺',
        code: '+7',
        isoCode: 'RU',
    },
    {
        name: 'Rwanda',
        emoji: '🇷🇼',
        code: '+250',
        isoCode: 'RW',
    },
    {
        name: 'Saint Barthelemy',
        emoji: '🇧🇱',
        code: '+590',
        isoCode: 'BL',
    },
    {
        name: 'Saint Helena',
        emoji: '🇸🇭',
        code: '+290',
        isoCode: 'SH',
    },
    {
        name: 'Saint Kitts and Nevis',
        emoji: '🇰🇳',
        code: '+1869',
        isoCode: 'KN',
    },
    {
        name: 'Saint Lucia',
        emoji: '🇱🇨',
        code: '+1758',
        isoCode: 'LC',
    },
    {
        name: 'Saint Martin',
        emoji: '🇲🇫',
        code: '+590',
        isoCode: 'MF',
    },
    {
        name: 'Saint Pierre and Miquelon',
        emoji: '🇵🇲',
        code: '+508',
        isoCode: 'PM',
    },
    {
        name: 'Saint Vincent and the Grenadines',
        emoji: '🇻🇨',
        code: '+1784',
        isoCode: 'VC',
    },
    {
        name: 'Samoa',
        emoji: '🇼🇸',
        code: '+685',
        isoCode: 'WS',
    },
    {
        name: 'San Marino',
        emoji: '🇸🇲',
        code: '+378',
        isoCode: 'SM',
    },
    {
        name: 'Sao Tome and Principe',
        emoji: '🇸🇹',
        code: '+239',
        isoCode: 'ST',
    },
    {
        name: 'Saudi Arabia',
        emoji: '🇸🇦',
        code: '+966',
        isoCode: 'SA',
    },
    {
        name: 'Senegal',
        emoji: '🇸🇳',
        code: '+221',
        isoCode: 'SN',
    },
    {
        name: 'Serbia',
        emoji: '🇷🇸',
        code: '+381',
        isoCode: 'RS',
    },
    {
        name: 'Seychelles',
        emoji: '🇸🇨',
        code: '+248',
        isoCode: 'SC',
    },
    {
        name: 'Sierra Leone',
        emoji: '🇸🇱',
        code: '+232',
        isoCode: 'SL',
    },
    {
        name: 'Singapore',
        emoji: '🇸🇬',
        code: '+65',
        isoCode: 'SG',
    },
    {
        name: 'Sint Maarten',
        emoji: '🇸🇽',
        code: '+1721',
        isoCode: 'SX',
    },
    {
        name: 'Slovakia',
        emoji: '🇸🇰',
        code: '+421',
        isoCode: 'SK',
    },
    {
        name: 'Slovenia',
        emoji: '🇸🇮',
        code: '+386',
        isoCode: 'SI',
    },
    {
        name: 'Solomon Islands',
        emoji: '🇸🇧',
        code: '+677',
        isoCode: 'SB',
    },
    {
        name: 'Somalia',
        emoji: '🇸🇴',
        code: '+252',
        isoCode: 'SO',
    },
    {
        name: 'South Africa',
        emoji: '🇿🇦',
        code: '+27',
        isoCode: 'ZA',
    },
    {
        name: 'South Georgia',
        emoji: '🇬🇸',
        code: '+500',
        isoCode: 'GS',
    },
    {
        name: 'South Korea',
        emoji: '🇰🇷',
        code: '+82',
        isoCode: 'KR',
    },
    {
        name: 'South Sudan',
        emoji: '🇸🇸',
        code: '+211',
        isoCode: 'SS',
    },
    {
        name: 'Spain',
        emoji: '🇪🇸',
        code: '+34',
        isoCode: 'ES',
    },
    {
        name: 'Sri Lanka',
        emoji: '🇱🇰',
        code: '+94',
        isoCode: 'LK',
    },
    {
        name: 'Sudan',
        emoji: '🇸🇩',
        code: '+249',
        isoCode: 'SD',
    },
    {
        name: 'Suriname',
        emoji: '🇸🇷',
        code: '+597',
        isoCode: 'SR',
    },
    {
        name: 'Svalbard and Jan Mayen',
        emoji: '🇸🇯',
        code: '+47',
        isoCode: 'SJ',
    },
    {
        name: 'Sweden',
        emoji: '🇸🇪',
        code: '+46',
        isoCode: 'SE',
    },
    {
        name: 'Switzerland',
        emoji: '🇨🇭',
        code: '+41',
        isoCode: 'CH',
    },
    {
        name: 'Syrian Arab Republic',
        emoji: '🇸🇾',
        code: '+963',
        isoCode: 'SY',
    },
    {
        name: 'Taiwan',
        emoji: '🇹🇼',
        code: '+886',
        isoCode: 'TW',
    },
    {
        name: 'Tajikistan',
        emoji: '🇹🇯',
        code: '+992',
        isoCode: 'TJ',
    },
    {
        name: 'Tanzania',
        emoji: '🇹🇿',
        code: '+255',
        isoCode: 'TZ',
    },
    {
        name: 'Thailand',
        emoji: '🇹🇭',
        code: '+66',
        isoCode: 'TH',
    },
    {
        name: 'Timor-Leste',
        emoji: '🇹🇱',
        code: '+670',
        isoCode: 'TL',
    },
    {
        name: 'Togo',
        emoji: '🇹🇬',
        code: '+228',
        isoCode: 'TG',
    },
    {
        name: 'Tokelau',
        emoji: '🇹🇰',
        code: '+690',
        isoCode: 'TK',
    },
    {
        name: 'Tonga',
        emoji: '🇹🇴',
        code: '+676',
        isoCode: 'TO',
    },
    {
        name: 'Trinidad and Tobago',
        emoji: '🇹🇹',
        code: '+1868',
        isoCode: 'TT',
    },
    {
        name: 'Tristan da Cunha',
        emoji: '🇹🇦',
        code: '+290',
        isoCode: 'TA',
    },
    {
        name: 'Tunisia',
        emoji: '🇹🇳',
        code: '+216',
        isoCode: 'TN',
    },
    {
        name: 'Turkey',
        emoji: '🇹🇷',
        code: '+90',
        isoCode: 'TR',
    },
    {
        name: 'Turkmenistan',
        emoji: '🇹🇲',
        code: '+993',
        isoCode: 'TM',
    },
    {
        name: 'Turks and Caicos Islands',
        emoji: '🇹🇨',
        code: '+1649',
        isoCode: 'TC',
    },
    {
        name: 'Tuvalu',
        emoji: '🇹🇻',
        code: '+688',
        isoCode: 'TV',
    },
    {
        name: 'Uganda',
        emoji: '🇺🇬',
        code: '+256',
        isoCode: 'UG',
    },
    {
        name: 'Ukraine',
        emoji: '🇺🇦',
        code: '+380',
        isoCode: 'UA',
    },
    {
        name: 'United Arab Emirates',
        emoji: '🇦🇪',
        code: '+971',
        isoCode: 'AE',
    },
    {
        name: 'United Kingdom',
        emoji: '🇬🇧',
        code: '+44',
        isoCode: 'GB',
    },
    {
        name: 'United States',
        emoji: '🇺🇸',
        code: '+1',
        isoCode: 'US',
    },
    {
        name: 'Uruguay',
        emoji: '🇺🇾',
        code: '+598',
        isoCode: 'UY',
    },
    {
        name: 'Uzbekistan',
        emoji: '🇺🇿',
        code: '+998',
        isoCode: 'UZ',
    },
    {
        name: 'Vanuatu',
        emoji: '🇻🇺',
        code: '+678',
        isoCode: 'VU',
    },
    {
        name: 'Vatican',
        emoji: '🇻🇦',
        code: '+379',
        isoCode: 'VA',
    },
    {
        name: 'Venezuela',
        emoji: '🇻🇪',
        code: '+58',
        isoCode: 'VE',
    },
    {
        name: 'Vietnam',
        emoji: '🇻🇳',
        code: '+84',
        isoCode: 'VN',
    },
    {
        name: 'Virgin Islands, British',
        emoji: '🇻🇬',
        code: '+1284',
        isoCode: 'VG',
    },
    {
        name: 'Virgin Islands, U.S.',
        emoji: '🇻🇮',
        code: '+1340',
        isoCode: 'VI',
    },
    {
        name: 'Wallis and Futuna',
        emoji: '🇼🇫',
        code: '+681',
        isoCode: 'WF',
    },
    {
        name: 'Western Sahara',
        emoji: '🇪🇭',
        code: '+212',
        isoCode: 'EH',
    },
    {
        name: 'Yemen',
        emoji: '🇾🇪',
        code: '+967',
        isoCode: 'YE',
    },
    {
        name: 'Zambia',
        emoji: '🇿🇲',
        code: '+260',
        isoCode: 'ZM',
    },
    {
        name: 'Zimbabwe',
        emoji: '🇿🇼',
        code: '+263',
        isoCode: 'ZW',
    },
];

let nextUniqueId = 0;
class QCountryPickerComponent extends ErrorState {
    countrySelected = output();
    value = model('', ...(ngDevMode ? [{ debugName: "value" }] : []));
    density = input('default', ...(ngDevMode ? [{ debugName: "density" }] : []));
    readonly = input(false, ...(ngDevMode ? [{ debugName: "readonly", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    hasError = input(false, ...(ngDevMode ? [{ debugName: "hasError", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    visibleCountries = input([], ...(ngDevMode ? [{ debugName: "visibleCountries" }] : []));
    groups = input([], ...(ngDevMode ? [{ debugName: "groups" }] : []));
    showTriggerFlag = input(true, ...(ngDevMode ? [{ debugName: "showTriggerFlag", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    dataQt = input('q-country-picker', ...(ngDevMode ? [{ debugName: "dataQt" }] : []));
    disabled = false;
    errorStateMatcher = new ErrorStateMatcher();
    dropmenuRef = viewChild((QDropmenuComponent), ...(ngDevMode ? [{ debugName: "dropmenuRef" }] : []));
    searchInput = viewChild('searchInput', ...(ngDevMode ? [{ debugName: "searchInput" }] : []));
    clearIconRef = viewChild('clearIconRef', ...(ngDevMode ? [{ debugName: "clearIconRef" }] : []));
    controlId = `q-country-picker-${nextUniqueId++}`;
    searchPlaceholder = translateSignal('searchPlaceholder');
    searchEmptyStateMessage = translateSignal('searchEmptyStateMessage');
    triggerPlaceholder = translateSignal('triggerPlaceholder');
    countryOptions = signal([], ...(ngDevMode ? [{ debugName: "countryOptions" }] : []));
    /** @private */
    customHostElement = null;
    /** @private */
    showTriggerCountryName = true;
    /** @private */
    showTriggerCode = false;
    /** @private */
    showOptionCode = false;
    dropmenuOrigin = inject(QDropmenuOriginDirective);
    useFallbackEmojis = false;
    selectedCountry = null;
    filteredCountryOptions = signal([], ...(ngDevMode ? [{ debugName: "filteredCountryOptions" }] : []));
    dropmenuMinWidth = 168;
    searchValue = '';
    _value = '';
    _onChange = voidFn;
    _onTouched = voidFn;
    _injector = inject(Injector);
    _cdr = inject(ChangeDetectorRef);
    _document = inject(DOCUMENT);
    _iconRegistry = inject(QIconRegistryService);
    _elementRef = inject(ElementRef);
    _resizeObserver = inject(QSharedResizeObserverService);
    _destroy$ = injectDestroy();
    _transloco = inject(TranslocoService);
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
        this._registerIcons();
        effect(() => {
            const inputValue = this.value();
            if (inputValue !== this._value) {
                this._value = inputValue;
                this._updateSelectedCountryFromValue();
                this._cdr.markForCheck();
            }
        });
        effect(() => {
            const hasError = this.hasError();
            this.errorState = hasError;
            this.stateChanges.next();
        });
    }
    ngOnInit() {
        this._setFallbackEmojis();
        this._setComponentControl();
        this._subscribeToStateChanges();
        this._disableDropmenuTypeahead();
    }
    ngAfterContentInit() {
        this._transloco
            .selectTranslation('allspark-country-picker')
            .pipe(takeUntil(this._destroy$))
            .subscribe((translations) => this._handleTranslationChange(translations));
        this._handleWidthChanges();
    }
    ngDoCheck() {
        this._updateErrorState();
    }
    onBlur() {
        this._onTouched();
    }
    writeValue(value) {
        this._value = value;
        this.value.set(value);
        this._updateSelectedCountryFromValue();
        this._cdr.markForCheck();
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cdr.markForCheck();
    }
    onHostClick() {
        if (!this.disabled && !this.readonly()) {
            this.dropmenuRef()?.open();
        }
    }
    onHostKeydown(event) {
        if (this.disabled || this.readonly())
            return;
        if ([SPACE, ENTER].includes(event.code) && !this.dropmenuRef()?.isOpened) {
            event.stopImmediatePropagation();
            this.dropmenuRef()?.open();
        }
    }
    onDropmenuChange(event) {
        const selectedValue = event.option.value;
        if (!selectedValue?.isoCode)
            return;
        this.selectedCountry = selectedValue;
        this._value = selectedValue.isoCode;
        this._onChange(this._value);
        this.value.set(this._value);
        this.countrySelected.emit(this.selectedCountry);
    }
    onDropmenuOpened() {
        this.searchInput()?.nativeElement.focus();
        this._setDropmenuWidth();
    }
    onDropmenuClosed() {
        this.searchValue = '';
        this.clearSearch();
    }
    onSearchInput(event) {
        this.searchValue = event.target.value;
        this._filterCountries();
        setTimeout(() => {
            this.dropmenuRef()?.resetActiveAfterOptionsChange();
        });
    }
    clearSearch() {
        const searchInputEl = this.searchInput();
        if (searchInputEl) {
            this.searchValue = '';
            searchInputEl.nativeElement.value = '';
            this._filterCountries();
            searchInputEl.nativeElement.focus();
            this._cdr.markForCheck();
        }
    }
    showClearIcon() {
        return !!this.searchInput() && !!this.dropmenuRef()?.isOpened && !!this.searchValue;
    }
    _findSelectedCountryByIsoCode(isoCode) {
        return (this.countryOptions().find((country) => country.value.isoCode === isoCode)?.value ?? null);
    }
    _registerIcons() {
        this._iconRegistry.registerIcons([chevronDown, search, cancelOutline, thickCheck]);
    }
    _setFallbackEmojis() {
        this.useFallbackEmojis = !this._platformSupportsEmojis();
    }
    _setComponentControl() {
        const ngControl = this._injector.get(NgControl, null, { optional: true });
        if (ngControl) {
            this.ngControl = ngControl;
        }
    }
    _updateSelectedCountryFromValue() {
        const isoCode = this._value || this.value();
        this.selectedCountry = this._findSelectedCountryByIsoCode(isoCode);
    }
    _subscribeToStateChanges() {
        this.stateChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }
    _disableDropmenuTypeahead() {
        const dropmenu = this.dropmenuRef();
        if (dropmenu) {
            dropmenu._withTypeahead = false;
        }
    }
    /**
     * Checks if the current platform supports emojis.
     *
     * This method creates a canvas element and draws an emoji on it. It then checks the pixel data of the emoji
     * to determine if the platform supports emojis. If the pixel data is not all zeros, it indicates that the
     * platform supports emojis. This technique is commonly used to detect emoji support in web browsers, as
     * some browsers may not support all emojis or may render them differently.
     *
     */
    _platformSupportsEmojis() {
        const FONT_FAMILY = '"Twemoji Mozilla","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",' +
            '"Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif';
        const canvas = this._document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const canvasContext = canvas.getContext('2d', { willReadFrequently: true });
        if (!canvasContext)
            return false;
        canvasContext.textBaseline = 'top';
        canvasContext.font = `100px ${FONT_FAMILY}`;
        canvasContext.scale(0.01, 0.01);
        canvasContext.clearRect(0, 0, 100, 100);
        canvasContext.fillStyle = '#000';
        canvasContext.fillText('🇨🇦', 0, 0);
        const pixelRGBAArray = canvasContext.getImageData(0, 0, 1, 1).data;
        const emojiColor = pixelRGBAArray.join(',');
        return !emojiColor.startsWith('0,0,0,');
    }
    _createCountryOptions(translations) {
        const visible = this.visibleCountries();
        return Q_COUNTRY_PICKER_COUNTRIES.filter((country) => !visible?.length || visible.includes(country.name))
            .map((country) => {
            const translationKey = 'countries.' + country.isoCode;
            const displayName = translations[translationKey] || country.name;
            const groupProp = this._getCountryGroupProp(country.name);
            return {
                label: displayName,
                value: {
                    ...country,
                    ...groupProp,
                    name: displayName,
                },
            };
        })
            .sort((a, b) => a.label.localeCompare(b.label));
    }
    _getCountryGroupProp(name) {
        const countryGroup = this.groups()?.find((group) => group.countries.includes(name));
        return { ...(countryGroup && { groupId: countryGroup?.id }) };
    }
    _handleWidthChanges() {
        const host = this.customHostElement?.nativeElement || this._elementRef.nativeElement;
        let previousWidth = host.offsetWidth;
        this._resizeObserver
            .observe(host)
            ?.pipe(debounceTime(300), takeUntil(this._destroy$))
            .subscribe(() => {
            const currentWidth = host.offsetWidth;
            if (currentWidth !== previousWidth) {
                previousWidth = currentWidth;
                this._setDropmenuWidth();
            }
        });
    }
    _setDropmenuWidth() {
        const host = this.customHostElement?.nativeElement || this._elementRef.nativeElement;
        const hostWidth = host.offsetWidth;
        this.dropmenuMinWidth = hostWidth;
        const dropmenu = this.dropmenuRef();
        if (dropmenu) {
            const dropmenuElement = dropmenu._getDropmenuHostElement();
            dropmenuElement.style.setProperty('--awds-dropmenu-container-width', `${hostWidth}px`);
        }
    }
    _handleTranslationChange(translations) {
        this.countryOptions.set(this._createCountryOptions(translations));
        this.filteredCountryOptions.set(this.countryOptions());
        this._updateSelectedCountryFromValue();
        this._cdr.markForCheck();
    }
    _filterCountries() {
        if (!this.searchValue) {
            this.filteredCountryOptions.set(this.countryOptions());
            return;
        }
        const searchLower = this.searchValue.toLowerCase();
        const filtered = this.countryOptions().filter((country) => country.label.toLowerCase().includes(searchLower) ||
            country.value.code.includes(searchLower));
        this.filteredCountryOptions.set(filtered);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCountryPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QCountryPickerComponent, isStandalone: true, selector: "q-country-picker", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, density: { classPropertyName: "density", publicName: "density", isSignal: true, isRequired: false, transformFunction: null }, readonly: { classPropertyName: "readonly", publicName: "readonly", isSignal: true, isRequired: false, transformFunction: null }, hasError: { classPropertyName: "hasError", publicName: "hasError", isSignal: true, isRequired: false, transformFunction: null }, visibleCountries: { classPropertyName: "visibleCountries", publicName: "visibleCountries", isSignal: true, isRequired: false, transformFunction: null }, groups: { classPropertyName: "groups", publicName: "groups", isSignal: true, isRequired: false, transformFunction: null }, showTriggerFlag: { classPropertyName: "showTriggerFlag", publicName: "showTriggerFlag", isSignal: true, isRequired: false, transformFunction: null }, dataQt: { classPropertyName: "dataQt", publicName: "dataQt", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, errorStateMatcher: { classPropertyName: "errorStateMatcher", publicName: "errorStateMatcher", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { countrySelected: "countrySelected", value: "valueChange" }, host: { listeners: { "click": "onHostClick()", "keydown": "onHostKeydown($event)", "blur": "onBlur()" }, properties: { "class.q-country-picker-open": "dropmenuRef()?.isOpened", "class.q-country-picker-error": "hasError() || errorState", "class.q-fallback-emoji": "useFallbackEmojis", "attr.id": "controlId", "attr.data-qt": "dataQt()", "attr.tabindex": "disabled ? -1 : 0", "attr.disabled": "disabled || null", "attr.readonly": "readonly() || null" }, classAttribute: "q-country-picker q-focus-indicator" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QCountryPickerComponent),
                multi: true,
            },
            { provide: FormFieldControl, useExisting: QCountryPickerComponent },
            provideTranslocoScope({ scope: 'allspark-country-picker' }),
            MISSING_KEY_HANDLER,
        ], viewQueries: [{ propertyName: "dropmenuRef", first: true, predicate: (QDropmenuComponent), descendants: true, isSignal: true }, { propertyName: "searchInput", first: true, predicate: ["searchInput"], descendants: true, isSignal: true }, { propertyName: "clearIconRef", first: true, predicate: ["clearIconRef"], descendants: true, isSignal: true }], usesInheritance: true, hostDirectives: [{ directive: i1.QDropmenuOriginDirective }], ngImport: i0, template: "@if (selectedCountry) {\n  @if (showTriggerFlag() && selectedCountry.emoji) {\n    <span class=\"q-country-picker-flag\" [attr.data-qt]=\"`${dataQt()}-flag`\">\n      {{ selectedCountry.emoji }}\n    </span>\n  }\n  @if (showTriggerCountryName) {\n    <span class=\"q-country-picker-name\" [attr.data-qt]=\"`${dataQt()}-name`\">\n      {{ selectedCountry.name }}\n    </span>\n  }\n  @if (showTriggerCode) {\n    <span class=\"q-country-picker-code\" [attr.data-qt]=\"`${dataQt()}-code`\">\n      {{ selectedCountry.code }}\n    </span>\n  }\n} @else {\n  <span class=\"q-country-picker-placeholder\">{{ triggerPlaceholder() }}</span>\n}\n<q-icon\n  class=\"q-country-picker-arrow\"\n  [class.q-country-picker-arrow-open]=\"dropmenuRef.isOpened\"\n  name=\"chevronDown\"\n  size=\"24\"\n  [dataQt]=\"`${dataQt()}-arrow-down-icon`\" />\n\n<q-dropmenu\n  #dropmenuRef\n  [options]=\"filteredCountryOptions()\"\n  [dropmenuTrigger]=\"dropmenuOrigin\"\n  [optionTemplate]=\"countryOptionTemplate\"\n  [headerTemplate]=\"searchHeaderTemplate\"\n  [emptyStateTemplate]=\"emptyStateTemplate\"\n  [value]=\"selectedCountry\"\n  [density]=\"density()\"\n  [groupBy]=\"'groupId'\"\n  (selectionChange)=\"onDropmenuChange($event)\"\n  (opened)=\"onDropmenuOpened()\"\n  (closed)=\"onDropmenuClosed()\" />\n\n<ng-template #searchHeaderTemplate>\n  <div class=\"q-country-picker-search\">\n    <q-input-group [prefix]=\"searchIcon\" [suffix]=\"clearIcon\">\n      <input\n        #searchInput\n        qInput\n        autocomplete=\"off\"\n        [dataQt]=\"`${dataQt()}-search-input`\"\n        [placeholder]=\"searchPlaceholder()\"\n        [attr.aria-label]=\"searchPlaceholder()\"\n        (input)=\"onSearchInput($event)\" />\n    </q-input-group>\n  </div>\n</ng-template>\n\n<ng-template #emptyStateTemplate>\n  <div class=\"q-country-picker-search-empty-state\">\n    <span>{{ searchEmptyStateMessage() }}</span>\n  </div>\n</ng-template>\n\n<ng-template #searchIcon>\n  <q-icon name=\"search\" size=\"24\" />\n</ng-template>\n\n<ng-template #clearIcon>\n  @if (showClearIcon()) {\n    <q-icon\n      #clearIconRef\n      class=\"q-country-picker-search-clear-icon\"\n      name=\"cancelOutline\"\n      size=\"24\"\n      (click)=\"clearSearch()\" />\n  }\n</ng-template>\n\n<ng-template #countryOptionTemplate let-option let-index=\"index\">\n  <div class=\"q-country-picker-option\">\n    <div class=\"q-country-picker-option-country\">\n      @if (selectedCountry === option?.value) {\n        <q-icon class=\"q-country-picker-option-country-check-icon\" name=\"thickCheck\" size=\"16\" />\n      }\n      <span\n        class=\"q-country-picker-option-country-flag\"\n        [class.q-fallback-emoji]=\"useFallbackEmojis\">\n        {{ option?.value?.emoji }}\n      </span>\n      <div class=\"q-country-picker-option-country-name\">\n        <span [qTextHighlight]=\"searchValue\" [text]=\"option.label\"></span>\n      </div>\n    </div>\n    @if (showOptionCode) {\n      <div class=\"q-country-picker-option-code\" [attr.data-qt]=\"`${dataQt()}-option-code`\">\n        <span [qTextHighlight]=\"searchValue\" [text]=\"option?.value?.code\"></span>\n      </div>\n    }\n  </div>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-country-picker{--awds-dropmenu-option-item-default-padding: var(--ads-size-xxxs) var(--ads-size-s);--awds-dropmenu-option-item-compact-padding: var(--ads-size-micro) var(--ads-size-s);--awds-dropmenu-container-max-height: 282px;--awds-dropmenu-empty-custom-message-padding: var(--ads-size-xxxs) var(--ads-size-s);font-family:var(--awds-country-picker-container-font-family, var(--ads-font-family-body));font-size:var(--awds-country-picker-container-font-size, var(--ads-font-size-s));font-style:var(--awds-country-picker-container-font-style, inherit);font-weight:var(--awds-country-picker-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-container-letter-spacing, 0);line-height:var(--awds-country-picker-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-country-picker-container-text-transform, none);display:flex;align-items:center;gap:var(--awds-country-picker-container-gap, var(--ads-size-nano));box-shadow:var(--awds-country-picker-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));border-radius:var(--awds-country-picker-container-border-radius, var(--ads-border-radius-s));padding:var(--awds-country-picker-container-padding, var(--ads-size-micro) var(--ads-size-xxxs) var(--ads-size-micro) var(--ads-size-xxs));background-color:var(--awds-country-picker-container-background, var(--ads-color-body-100));width:var(--awds-country-picker-container-width, 100%);min-height:var(--awds-country-picker-container-min-height, 44px);cursor:pointer}.q-country-picker.q-fallback-emoji{font-family:Twemoji Country Flags}.q-country-picker .q-dropmenu{overflow:hidden;grid-template-areas:\"header\" \"list\" \"footer\";grid-template-rows:auto 1fr auto}.q-country-picker .q-dropmenu-option{position:relative}.q-country-picker .q-dropmenu-list:before{content:none}.q-country-picker-flag{font-family:var(--awds-country-picker-flag-font-family, var(--ads-font-family-heading));font-size:var(--awds-country-picker-flag-font-size, var(--ads-font-size-l));font-style:var(--awds-country-picker-flag-font-style, inherit);font-weight:var(--awds-country-picker-flag-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-flag-letter-spacing, 0);line-height:var(--awds-country-picker-flag-line-height, var(--ads-font-line-height-l));text-transform:var(--awds-country-picker-flag-text-transform, none);height:28px;margin-top:-2px}.q-country-picker-name{flex:1;color:var(--awds-country-picker-name-color, var(--ads-color-body-contrast-100))}.q-country-picker-code{color:var(--awds-country-picker-code-color, var(--ads-color-body-contrast-100))}.q-country-picker-placeholder{flex:1;color:var(--awds-country-picker-placeholder-color, var(--ads-color-body-600));font-style:var(--awds-country-picker-placeholder-font-style, italic);white-space:nowrap}.q-country-picker-open{box-shadow:var(--awds-country-picker-open-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-country-picker-error{box-shadow:var(--awds-country-picker-error-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-country-picker-open.q-country-picker-error{box-shadow:var(--awds-country-picker-open-error-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-country-picker-arrow{fill:var(--awds-country-picker-arrow-fill, var(--ads-color-body-contrast-100));transition:transform .15s cubic-bezier(.4,0,.2,1);transform:rotate(0)}.q-country-picker-arrow-open{transform:rotate(180deg)}.q-country-picker[disabled]{background-color:var(--awds-country-picker-disabled-container-background, var(--ads-color-body-200));box-shadow:var(--awds-country-picker-disabled-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:default}.q-country-picker[disabled] .q-country-picker-arrow{fill:var(--awds-country-picker-disabled-arrow-fill, var(--ads-color-body-400))}.q-country-picker[disabled] .q-country-picker-name,.q-country-picker[disabled] .q-country-picker-code{color:var(--awds-country-picker-disabled-text-color, var(--ads-color-body-400))}.q-country-picker[readonly]{background-color:var(--awds-country-picker-readonly-container-background, var(--ads-color-body-200));box-shadow:var(--awds-country-picker-readonly-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:default}.q-country-picker[readonly] .q-country-picker-arrow{fill:var(--awds-country-picker-readonly-arrow-fill, var(--ads-color-body-400))}.q-country-picker-option{display:flex;align-items:center;justify-content:space-between;flex:1}.q-country-picker-option-country{font-family:var(--awds-country-picker-option-font-family, var(--ads-font-family-body));font-size:var(--awds-country-picker-option-font-size, var(--ads-font-size-s));font-style:var(--awds-country-picker-option-font-style, inherit);font-weight:var(--awds-country-picker-option-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-option-letter-spacing, 0);line-height:var(--awds-country-picker-option-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-country-picker-option-text-transform, none);display:flex;align-items:center;gap:var(--awds-country-picker-option-country-gap, var(--ads-size-micro))}.q-country-picker-option-country-check-icon{position:absolute;left:var(--awds-country-picker-option-check-icon-left, var(--ads-size-nano));fill:var(--awds-country-picker-option-check-icon-fill, var(--ads-color-body-contrast-100))}.q-country-picker-option-country-flag.q-fallback-emoji{font-family:Twemoji Country Flags}.q-country-picker-option-country-name{color:var(--awds-country-picker-option-name-color, var(--ads-color-body-contrast-100))}.q-country-picker-option-code{color:var(--awds-country-picker-option-code-color, var(--ads-color-body-600))}.q-country-picker-search{grid-area:header;background:var(--awds-country-picker-search-background, var(--ads-color-body-100));padding:var(--awds-country-picker-search-padding, var(--ads-size-xs) var(--ads-size-s) var(--ads-size-micro) var(--ads-size-s))}.q-country-picker-search-clear-icon{cursor:pointer}.q-country-picker-search-clear-icon-hidden{display:none}.q-country-picker-search-empty-state{font-family:var(--awds-country-picker-search-empty-state-font-family, var(--ads-font-family-body));font-size:var(--awds-country-picker-search-empty-state-font-size, var(--ads-font-size-s));font-style:var(--awds-country-picker-search-empty-state-font-style, inherit);font-weight:var(--awds-country-picker-search-empty-state-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-search-empty-state-letter-spacing, 0);line-height:var(--awds-country-picker-search-empty-state-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-country-picker-search-empty-state-text-transform, none);color:var(--awds-country-picker-search-empty-state-color, var(--ads-color-body-contrast-100));text-align:center}\n"], dependencies: [{ kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "directive", type: QInputDirective, selector: "input[qInput]", inputs: ["errorStateMatcher", "invalidState", "controlId", "dataQt"] }, { kind: "component", type: QInputGroupComponent, selector: "q-input-group", inputs: ["prefix", "suffix", "dataQt"] }, { kind: "component", type: QDropmenuComponent, selector: "q-dropmenu", inputs: ["backdropEnabled", "fitTriggerWidth", "density", "highlightCaseSensitive", "loading", "disableSelectionTracking", "textToHighlight", "loadingVariant", "loadingSkeletonTemplate", "footerMessage", "footerTemplate", "emptyStateTemplate", "optionTemplate", "groupLabelTemplate", "headerTemplate", "aria-label", "aria-labelledby", "id", "dataQt", "dropmenuTrigger", "groupBy", "groupLabel", "options", "value", "minWidth", "minHeight", "offsetY", "offsetX", "xPosition", "yPosition", "fitOverlayWidth", "useOverlay", "overlayHasBackdrop"], outputs: ["selectionChange", "valueChange", "opened", "closed", "backdropEnabledChange", "fitTriggerWidthChange"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: QTextHighlightDirective, selector: "[qTextHighlight], [q-text-highlight]", inputs: ["qTextHighlight", "caseSensitive", "exactMatch", "text"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCountryPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-country-picker', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'q-country-picker q-focus-indicator',
                        '[class.q-country-picker-open]': 'dropmenuRef()?.isOpened',
                        '[class.q-country-picker-error]': 'hasError() || errorState',
                        '[class.q-fallback-emoji]': 'useFallbackEmojis',
                        '[attr.id]': 'controlId',
                        '[attr.data-qt]': 'dataQt()',
                        '[attr.tabindex]': 'disabled ? -1 : 0',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.readonly]': 'readonly() || null',
                        '(click)': 'onHostClick()',
                        '(keydown)': 'onHostKeydown($event)',
                        '(blur)': 'onBlur()',
                    }, hostDirectives: [QDropmenuOriginDirective], imports: [
                        QIconComponent,
                        QInputDirective,
                        QInputGroupComponent,
                        QDropmenuComponent,
                        TranslocoModule,
                        QTextHighlightDirective,
                    ], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QCountryPickerComponent),
                            multi: true,
                        },
                        { provide: FormFieldControl, useExisting: QCountryPickerComponent },
                        provideTranslocoScope({ scope: 'allspark-country-picker' }),
                        MISSING_KEY_HANDLER,
                    ], template: "@if (selectedCountry) {\n  @if (showTriggerFlag() && selectedCountry.emoji) {\n    <span class=\"q-country-picker-flag\" [attr.data-qt]=\"`${dataQt()}-flag`\">\n      {{ selectedCountry.emoji }}\n    </span>\n  }\n  @if (showTriggerCountryName) {\n    <span class=\"q-country-picker-name\" [attr.data-qt]=\"`${dataQt()}-name`\">\n      {{ selectedCountry.name }}\n    </span>\n  }\n  @if (showTriggerCode) {\n    <span class=\"q-country-picker-code\" [attr.data-qt]=\"`${dataQt()}-code`\">\n      {{ selectedCountry.code }}\n    </span>\n  }\n} @else {\n  <span class=\"q-country-picker-placeholder\">{{ triggerPlaceholder() }}</span>\n}\n<q-icon\n  class=\"q-country-picker-arrow\"\n  [class.q-country-picker-arrow-open]=\"dropmenuRef.isOpened\"\n  name=\"chevronDown\"\n  size=\"24\"\n  [dataQt]=\"`${dataQt()}-arrow-down-icon`\" />\n\n<q-dropmenu\n  #dropmenuRef\n  [options]=\"filteredCountryOptions()\"\n  [dropmenuTrigger]=\"dropmenuOrigin\"\n  [optionTemplate]=\"countryOptionTemplate\"\n  [headerTemplate]=\"searchHeaderTemplate\"\n  [emptyStateTemplate]=\"emptyStateTemplate\"\n  [value]=\"selectedCountry\"\n  [density]=\"density()\"\n  [groupBy]=\"'groupId'\"\n  (selectionChange)=\"onDropmenuChange($event)\"\n  (opened)=\"onDropmenuOpened()\"\n  (closed)=\"onDropmenuClosed()\" />\n\n<ng-template #searchHeaderTemplate>\n  <div class=\"q-country-picker-search\">\n    <q-input-group [prefix]=\"searchIcon\" [suffix]=\"clearIcon\">\n      <input\n        #searchInput\n        qInput\n        autocomplete=\"off\"\n        [dataQt]=\"`${dataQt()}-search-input`\"\n        [placeholder]=\"searchPlaceholder()\"\n        [attr.aria-label]=\"searchPlaceholder()\"\n        (input)=\"onSearchInput($event)\" />\n    </q-input-group>\n  </div>\n</ng-template>\n\n<ng-template #emptyStateTemplate>\n  <div class=\"q-country-picker-search-empty-state\">\n    <span>{{ searchEmptyStateMessage() }}</span>\n  </div>\n</ng-template>\n\n<ng-template #searchIcon>\n  <q-icon name=\"search\" size=\"24\" />\n</ng-template>\n\n<ng-template #clearIcon>\n  @if (showClearIcon()) {\n    <q-icon\n      #clearIconRef\n      class=\"q-country-picker-search-clear-icon\"\n      name=\"cancelOutline\"\n      size=\"24\"\n      (click)=\"clearSearch()\" />\n  }\n</ng-template>\n\n<ng-template #countryOptionTemplate let-option let-index=\"index\">\n  <div class=\"q-country-picker-option\">\n    <div class=\"q-country-picker-option-country\">\n      @if (selectedCountry === option?.value) {\n        <q-icon class=\"q-country-picker-option-country-check-icon\" name=\"thickCheck\" size=\"16\" />\n      }\n      <span\n        class=\"q-country-picker-option-country-flag\"\n        [class.q-fallback-emoji]=\"useFallbackEmojis\">\n        {{ option?.value?.emoji }}\n      </span>\n      <div class=\"q-country-picker-option-country-name\">\n        <span [qTextHighlight]=\"searchValue\" [text]=\"option.label\"></span>\n      </div>\n    </div>\n    @if (showOptionCode) {\n      <div class=\"q-country-picker-option-code\" [attr.data-qt]=\"`${dataQt()}-option-code`\">\n        <span [qTextHighlight]=\"searchValue\" [text]=\"option?.value?.code\"></span>\n      </div>\n    }\n  </div>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-country-picker{--awds-dropmenu-option-item-default-padding: var(--ads-size-xxxs) var(--ads-size-s);--awds-dropmenu-option-item-compact-padding: var(--ads-size-micro) var(--ads-size-s);--awds-dropmenu-container-max-height: 282px;--awds-dropmenu-empty-custom-message-padding: var(--ads-size-xxxs) var(--ads-size-s);font-family:var(--awds-country-picker-container-font-family, var(--ads-font-family-body));font-size:var(--awds-country-picker-container-font-size, var(--ads-font-size-s));font-style:var(--awds-country-picker-container-font-style, inherit);font-weight:var(--awds-country-picker-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-container-letter-spacing, 0);line-height:var(--awds-country-picker-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-country-picker-container-text-transform, none);display:flex;align-items:center;gap:var(--awds-country-picker-container-gap, var(--ads-size-nano));box-shadow:var(--awds-country-picker-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));border-radius:var(--awds-country-picker-container-border-radius, var(--ads-border-radius-s));padding:var(--awds-country-picker-container-padding, var(--ads-size-micro) var(--ads-size-xxxs) var(--ads-size-micro) var(--ads-size-xxs));background-color:var(--awds-country-picker-container-background, var(--ads-color-body-100));width:var(--awds-country-picker-container-width, 100%);min-height:var(--awds-country-picker-container-min-height, 44px);cursor:pointer}.q-country-picker.q-fallback-emoji{font-family:Twemoji Country Flags}.q-country-picker .q-dropmenu{overflow:hidden;grid-template-areas:\"header\" \"list\" \"footer\";grid-template-rows:auto 1fr auto}.q-country-picker .q-dropmenu-option{position:relative}.q-country-picker .q-dropmenu-list:before{content:none}.q-country-picker-flag{font-family:var(--awds-country-picker-flag-font-family, var(--ads-font-family-heading));font-size:var(--awds-country-picker-flag-font-size, var(--ads-font-size-l));font-style:var(--awds-country-picker-flag-font-style, inherit);font-weight:var(--awds-country-picker-flag-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-flag-letter-spacing, 0);line-height:var(--awds-country-picker-flag-line-height, var(--ads-font-line-height-l));text-transform:var(--awds-country-picker-flag-text-transform, none);height:28px;margin-top:-2px}.q-country-picker-name{flex:1;color:var(--awds-country-picker-name-color, var(--ads-color-body-contrast-100))}.q-country-picker-code{color:var(--awds-country-picker-code-color, var(--ads-color-body-contrast-100))}.q-country-picker-placeholder{flex:1;color:var(--awds-country-picker-placeholder-color, var(--ads-color-body-600));font-style:var(--awds-country-picker-placeholder-font-style, italic);white-space:nowrap}.q-country-picker-open{box-shadow:var(--awds-country-picker-open-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-country-picker-error{box-shadow:var(--awds-country-picker-error-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-country-picker-open.q-country-picker-error{box-shadow:var(--awds-country-picker-open-error-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-country-picker-arrow{fill:var(--awds-country-picker-arrow-fill, var(--ads-color-body-contrast-100));transition:transform .15s cubic-bezier(.4,0,.2,1);transform:rotate(0)}.q-country-picker-arrow-open{transform:rotate(180deg)}.q-country-picker[disabled]{background-color:var(--awds-country-picker-disabled-container-background, var(--ads-color-body-200));box-shadow:var(--awds-country-picker-disabled-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:default}.q-country-picker[disabled] .q-country-picker-arrow{fill:var(--awds-country-picker-disabled-arrow-fill, var(--ads-color-body-400))}.q-country-picker[disabled] .q-country-picker-name,.q-country-picker[disabled] .q-country-picker-code{color:var(--awds-country-picker-disabled-text-color, var(--ads-color-body-400))}.q-country-picker[readonly]{background-color:var(--awds-country-picker-readonly-container-background, var(--ads-color-body-200));box-shadow:var(--awds-country-picker-readonly-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));cursor:default}.q-country-picker[readonly] .q-country-picker-arrow{fill:var(--awds-country-picker-readonly-arrow-fill, var(--ads-color-body-400))}.q-country-picker-option{display:flex;align-items:center;justify-content:space-between;flex:1}.q-country-picker-option-country{font-family:var(--awds-country-picker-option-font-family, var(--ads-font-family-body));font-size:var(--awds-country-picker-option-font-size, var(--ads-font-size-s));font-style:var(--awds-country-picker-option-font-style, inherit);font-weight:var(--awds-country-picker-option-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-option-letter-spacing, 0);line-height:var(--awds-country-picker-option-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-country-picker-option-text-transform, none);display:flex;align-items:center;gap:var(--awds-country-picker-option-country-gap, var(--ads-size-micro))}.q-country-picker-option-country-check-icon{position:absolute;left:var(--awds-country-picker-option-check-icon-left, var(--ads-size-nano));fill:var(--awds-country-picker-option-check-icon-fill, var(--ads-color-body-contrast-100))}.q-country-picker-option-country-flag.q-fallback-emoji{font-family:Twemoji Country Flags}.q-country-picker-option-country-name{color:var(--awds-country-picker-option-name-color, var(--ads-color-body-contrast-100))}.q-country-picker-option-code{color:var(--awds-country-picker-option-code-color, var(--ads-color-body-600))}.q-country-picker-search{grid-area:header;background:var(--awds-country-picker-search-background, var(--ads-color-body-100));padding:var(--awds-country-picker-search-padding, var(--ads-size-xs) var(--ads-size-s) var(--ads-size-micro) var(--ads-size-s))}.q-country-picker-search-clear-icon{cursor:pointer}.q-country-picker-search-clear-icon-hidden{display:none}.q-country-picker-search-empty-state{font-family:var(--awds-country-picker-search-empty-state-font-family, var(--ads-font-family-body));font-size:var(--awds-country-picker-search-empty-state-font-size, var(--ads-font-size-s));font-style:var(--awds-country-picker-search-empty-state-font-style, inherit);font-weight:var(--awds-country-picker-search-empty-state-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-country-picker-search-empty-state-letter-spacing, 0);line-height:var(--awds-country-picker-search-empty-state-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-country-picker-search-empty-state-text-transform, none);color:var(--awds-country-picker-search-empty-state-color, var(--ads-color-body-contrast-100));text-align:center}\n"] }]
        }], ctorParameters: () => [], propDecorators: { countrySelected: [{ type: i0.Output, args: ["countrySelected"] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], density: [{ type: i0.Input, args: [{ isSignal: true, alias: "density", required: false }] }], readonly: [{ type: i0.Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], hasError: [{ type: i0.Input, args: [{ isSignal: true, alias: "hasError", required: false }] }], visibleCountries: [{ type: i0.Input, args: [{ isSignal: true, alias: "visibleCountries", required: false }] }], groups: [{ type: i0.Input, args: [{ isSignal: true, alias: "groups", required: false }] }], showTriggerFlag: [{ type: i0.Input, args: [{ isSignal: true, alias: "showTriggerFlag", required: false }] }], dataQt: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataQt", required: false }] }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], errorStateMatcher: [{
                type: Input
            }], dropmenuRef: [{ type: i0.ViewChild, args: [i0.forwardRef(() => QDropmenuComponent), { isSignal: true }] }], searchInput: [{ type: i0.ViewChild, args: ['searchInput', { isSignal: true }] }], clearIconRef: [{ type: i0.ViewChild, args: ['clearIconRef', { isSignal: true }] }] } });

/*
 * This file was automatically generated. Do not edit it manually.
 * If you need to update the country names type, update the source file and run the command to generate this file.
 * Command: npm run types:country-name
 */

/*
 * This file was automatically generated. Do not edit it manually.
 * If you need to update the ISO codes type, update the source file and run the command to generate this file.
 * Command: npm run types:country-iso-code
 */

/**
 * Generated bundle index. Do not edit.
 */

export { QCountryPickerComponent, Q_COUNTRY_PICKER_COUNTRIES };
//# sourceMappingURL=questrade-allspark-angular-components-country-picker.mjs.map
