import { TRANSLOCO_MISSING_HANDLER, TRANSLOCO_SCOPE, TranslocoTestingModule } from '@jsverse/transloco';

const SUPPORTED_LANGUAGES = [
    { code: 'en', icon: '🇨🇦', title: 'English' },
    { code: 'fr', icon: '🇫🇷', title: 'French' },
];
const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

const mergeTranslations = (translation, custom) => {
    const result = translation;
    Object.keys(custom).forEach((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (translation.hasOwnProperty(key)) {
            if (typeof translation[key] === 'string' || typeof translation[key] === 'number') {
                result[key] = custom[key];
            }
            else if (typeof translation[key] === 'object') {
                result[key] = mergeTranslations(translation[key], custom[key]);
            }
        }
    });
    return result;
};

var banner$1 = {
	actions: {
		ok: "OK",
		cancel: "Cancel"
	}
};
var datepicker$1 = {
	chooseDate: "Choose date",
	actions: {
		done: "Done",
		clear: "Clear"
	},
	header: {
		selectMonth: "Select a month",
		selectYear: "Select a year",
		previousMonth: "Previous month",
		nextMonth: "Next month"
	},
	weekdays: {
		short: {
			monday: "M",
			tuesday: "T",
			wednesday: "W",
			thursday: "T",
			friday: "F",
			saturday: "S",
			sunday: "S"
		}
	}
};
var dropmenu$1 = {
	notFoundMessage: "Could not find any results"
};
var modal$1 = {
	actions: {
		ok: "OK",
		cancel: "Cancel",
		link: "Link"
	}
};
var spoiler$1 = {
	show: "Show",
	hide: "Hide"
};
var dateOfBirth$1 = {
	label: "Date of birth",
	hint: "Day / Month / Year",
	requiredDay: "Day is required",
	invalidDay: "Day is not valid",
	invalidMinAge: "You must be at least {{minAge}} years old",
	invalidMaxAge: "Age cannot be greater than {{maxAge}} years",
	requiredMonth: "Month is required",
	requiredYear: "Year is required",
	invalidYear: "Year is not valid",
	maxYear: "Year can't be more than current year",
	futureDate: "Date of birth cannot be in the future",
	invalidDate: "Date of birth is not valid",
	day: "Day",
	month: "Month",
	year: "Year"
};
var wizard$1 = {
	next: "Next",
	back: "Back",
	moreOptions: "More options"
};
var table$1 = {
	footer: {
		showMore: "Show {{nextBatchSize}} more",
		showingZero: "Showing no items",
		showingOne: "Showing 1 item",
		showingMultiple: "Showing {{totalItems}} items"
	}
};
var en = {
	"advanced-dropdown": {
	title: "",
	actions: {
		ok: "OK",
		cancel: "Cancel",
		link: "Link"
	}
},
	banner: banner$1,
	"chip-datepicker": {
	startDate: "Start date",
	endDate: "End date"
},
	datepicker: datepicker$1,
	dropmenu: dropmenu$1,
	modal: modal$1,
	spoiler: spoiler$1,
	dateOfBirth: dateOfBirth$1,
	wizard: wizard$1,
	table: table$1
};

var banner = {
	actions: {
		ok: "D'accord",
		cancel: "Annuler"
	}
};
var datepicker = {
	chooseDate: "Choisir date",
	actions: {
		done: "Fait",
		clear: "Dégager"
	},
	header: {
		selectMonth: "Sélectionnez un mois",
		selectYear: "Sélectionnez une année",
		previousMonth: "Mois précédent",
		nextMonth: "Mois suivant"
	},
	weekdays: {
		short: {
			monday: "L",
			tuesday: "M",
			wednesday: "M",
			thursday: "J",
			friday: "V",
			saturday: "S",
			sunday: "D"
		}
	}
};
var dropmenu = {
	notFoundMessage: "Aucun résultat n'a été trouvé"
};
var modal = {
	actions: {
		ok: "D'accord",
		cancel: "Annuler",
		link: "Lien"
	}
};
var spoiler = {
	show: "Ouvrir",
	hide: "Cacher"
};
var dateOfBirth = {
	label: "Date de naissance",
	hint: "Jour / Mois / Année",
	requiredDay: "Le jour est requis",
	invalidDay: "Le jour n'est pas valide",
	invalidMinAge: "Vous devez avoir au moins {{minAge}} ans",
	invalidMaxAge: "L'âge ne peut pas dépasser {{maxAge}} ans",
	requiredMonth: "Le mois est requis",
	requiredYear: "L'année est requise",
	invalidYear: "L'année n'est pas valide",
	futureDate: "La date de naissance ne peut pas être dans le futur",
	invalidDate: "La date de naissance n'est pas valide",
	maxYear: "L'année ne peut pas être supérieure à l'année en cours",
	day: "Jour",
	month: "Mois",
	year: "Année"
};
var wizard = {
	next: "Suivante",
	back: "Retour",
	moreOptions: "Plus d'options"
};
var table = {
	footer: {
		showMore: "Afficher {{ nextBatchSize }} autres",
		showingZero: "Affichage d'aucun élément",
		showingOne: "Affichage de 1 élément",
		showingMultiple: "Affichage de {{ totalItems }} éléments"
	}
};
var fr = {
	"advanced-dropdown": {
	title: "",
	actions: {
		ok: "D'accord",
		cancel: "Annuler",
		link: "Lien"
	}
},
	banner: banner,
	"chip-datepicker": {
	startDate: "Date de début",
	endDate: "Date de fin"
},
	datepicker: datepicker,
	dropmenu: dropmenu,
	modal: modal,
	spoiler: spoiler,
	dateOfBirth: dateOfBirth,
	wizard: wizard,
	table: table
};

const normalizeKey = (key) => {
    if (key.includes('allspark')) {
        const split = key.split(/allspark[^.]*\./);
        return split[1] ?? split[0];
    }
    return key;
};
const getTranslationByKey = (key) => {
    const normalizedKey = normalizeKey(key);
    const keySplit = normalizedKey.split('.');
    let objectTranslation = en;
    for (const keyAttribute of keySplit) {
        const translation = objectTranslation[keyAttribute];
        if (translation !== undefined) {
            objectTranslation = translation;
        }
        else {
            return key;
        }
    }
    if (typeof objectTranslation === 'string') {
        return objectTranslation;
    }
    return key;
};
class CustomHandler {
    handle(key) {
        return getTranslationByKey(key);
    }
}
const MISSING_KEY_HANDLER = {
    provide: TRANSLOCO_MISSING_HANDLER,
    useClass: CustomHandler,
};

const ALLSPARK_SCOPE_NAME = 'allspark';
const ALLSPARK_SCOPE = { provide: TRANSLOCO_SCOPE, useValue: ALLSPARK_SCOPE_NAME };

function getTranslocoModule(options = {}) {
    return TranslocoTestingModule.forRoot({
        langs: { en, fr, 'allspark/en': en, 'allspark/fr': fr },
        translocoConfig: {
            availableLangs: ['en', 'fr'],
            defaultLang: 'en',
        },
        preloadLangs: true,
        ...options,
    });
}

/**
 * Generated bundle index. Do not edit.
 */

export { ALLSPARK_SCOPE, ALLSPARK_SCOPE_NAME, CustomHandler, DEFAULT_LANGUAGE, MISSING_KEY_HANDLER, SUPPORTED_LANGUAGES, getTranslocoModule, mergeTranslations };
//# sourceMappingURL=questrade-allspark-angular-components-transloco.mjs.map
