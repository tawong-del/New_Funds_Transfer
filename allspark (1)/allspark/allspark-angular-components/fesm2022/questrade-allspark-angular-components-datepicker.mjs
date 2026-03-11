import * as i0 from '@angular/core';
import { inject, Injectable, EventEmitter, ChangeDetectorRef, booleanAttribute, ViewChild, Input, Output, ChangeDetectionStrategy, ViewEncapsulation, Component, ElementRef, numberAttribute, HostListener, ViewChildren, HostBinding, signal, effect, forwardRef } from '@angular/core';
import * as i1 from '@jsverse/transloco';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { range, isPresent, TAB, PAGE_DOWN, PAGE_UP, END, HOME, RIGHT_ARROW, LEFT_ARROW, DOWN_ARROW, UP_ARROW, voidFn } from '@questrade/allspark-angular-components/core/utils';
import { FocusKeyManager, A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as i2 from '@angular/cdk/scrolling';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgSwitch, NgSwitchCase, TitleCasePipe, NgFor, NgIf, AsyncPipe } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { QButtonComponent } from '@questrade/allspark-angular-components/button';
import { QScrollShadowDirective } from '@questrade/allspark-angular-components/core/directives';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { MISSING_KEY_HANDLER, ALLSPARK_SCOPE } from '@questrade/allspark-angular-components/transloco';
import { Subject, BehaviorSubject, takeUntil } from 'rxjs';
import { QChipComponent } from '@questrade/allspark-angular-components/chip';
import { QDropmenuComponent, QDropmenuOriginDirective } from '@questrade/allspark-angular-components/dropmenu';
import { QIconRegistryService } from '@questrade/allspark-angular-components/icon';
import { QInteractiveIconComponent } from '@questrade/allspark-angular-components/interactive-icon';
import { chevronLeft, chevronRight } from '@questrade/allspark-icons/icons';

class DateRange {
    start;
    end;
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class DateAdapter {
    _translocoService = inject(TranslocoService);
    _format(dtf, date) {
        const d = new Date();
        d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return dtf.format(d);
    }
    sameDate(first, second) {
        if (first && second) {
            const firstValid = this.isValid(first);
            const secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
    }
    sameDateObject(first, second) {
        if (first instanceof Date && second instanceof Date) {
            return this.sameDate(first, second);
        }
        else if (first instanceof DateRange && second instanceof DateRange) {
            return this.sameDate(first.start, second.start) && this.sameDate(first.end, second.end);
        }
        return false;
    }
    isValid(date) {
        return date ? date && !isNaN(date.getTime()) : false;
    }
    isValidDateObject(date) {
        if (date instanceof Date) {
            return this.isValid(date);
        }
        else if (date instanceof DateRange && date.start && date.end) {
            return this.isValid(date.start) && this.isValid(date.end);
        }
        return false;
    }
    compareDate(first, second) {
        return (first.getFullYear() - second.getFullYear() ||
            first.getMonth() - second.getMonth() ||
            first.getDate() - second.getDate());
    }
    getNumDaysInMonth(date) {
        const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return d.getDate();
    }
    clampDate(date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    }
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    getMonthName(date, style = 'long') {
        const activeLanguage = this._translocoService.getActiveLang();
        const dtf = new Intl.DateTimeFormat(activeLanguage, { month: style, timeZone: 'utc' });
        return this._format(dtf, date);
    }
    getMonthNames(style) {
        const activeLanguage = this._translocoService.getActiveLang();
        const dtf = new Intl.DateTimeFormat(activeLanguage, { month: style, timeZone: 'utc' });
        return range(12, (i) => this._format(dtf, new Date(2017, i, 1)));
    }
    getYearName(date) {
        const activeLanguage = this._translocoService.getActiveLang();
        const dtf = new Intl.DateTimeFormat(activeLanguage, { year: 'numeric', timeZone: 'utc' });
        return this._format(dtf, date);
    }
    getMonthsInRange(minDate, maxDate) {
        const months = [];
        let year = minDate.getFullYear();
        let month = minDate.getMonth();
        while (year < maxDate.getFullYear() ||
            (year === maxDate.getFullYear() && month <= maxDate.getMonth())) {
            months.push({ month, year });
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
        }
        return months;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: DateAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: DateAdapter, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: DateAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class DatepickerService {
    _preview = new Subject();
    _selectedValue = new BehaviorSubject(null);
    _selection = new BehaviorSubject(null);
    _activeDateFirstCalendar = new BehaviorSubject(null);
    _activeDateSecondCalendar = new BehaviorSubject(null);
    _disableWeekends = new BehaviorSubject(false);
    _disabledDates = new BehaviorSubject([]);
    preview$ = this._preview.asObservable();
    selectedValue$ = this._selectedValue.asObservable();
    selection$ = this._selection.asObservable();
    activeDateFirstCalendar$ = this._activeDateFirstCalendar.asObservable();
    activeDateSecondCalendar$ = this._activeDateSecondCalendar.asObservable();
    disableWeekends$ = this._disableWeekends.asObservable();
    disabledDates$ = this._disabledDates.asObservable();
    updateDisableWeekends(value) {
        this._disableWeekends.next(value);
    }
    updateDisabledDates(datesDisabled) {
        this._disabledDates.next(datesDisabled);
    }
    updatePreview(value) {
        this._preview.next(value);
    }
    updateSelection(value) {
        this._selection.next(value);
    }
    updateSelectedValue(value) {
        this._selectedValue.next(value);
    }
    updateActiveDates(sourceCalendarLocation, date) {
        if (sourceCalendarLocation === 'left') {
            this._activeDateFirstCalendar.next(date);
            this._activeDateSecondCalendar.next(this._createDateWithDelta(date, 1));
        }
        else if (sourceCalendarLocation === 'right') {
            this._activeDateFirstCalendar.next(this._createDateWithDelta(date, -1));
            this._activeDateSecondCalendar.next(date);
        }
    }
    shiftActiveDatesByDelta(delta) {
        this._activeDateFirstCalendar.next(this._createDateWithDelta(this.activeDateFirstCalendar, delta));
        this._activeDateSecondCalendar.next(this._createDateWithDelta(this.activeDateSecondCalendar, delta));
    }
    isValidSelection(isRange) {
        const isValidDate = (d) => !isNaN(d?.valueOf()) && d instanceof Date;
        if (isRange) {
            const { start, end } = this.selection;
            if (!start || !end)
                return false;
            return isValidDate(start) && isValidDate(end);
        }
        else {
            return isValidDate(this.selection);
        }
    }
    getFirstDayOfNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    get selectedValue() {
        return this._selectedValue.getValue();
    }
    get selection() {
        return this._selection.getValue();
    }
    get activeDateFirstCalendar() {
        return this._activeDateFirstCalendar.getValue();
    }
    get activeDateSecondCalendar() {
        return this._activeDateSecondCalendar.getValue();
    }
    _getLastDayOfMonth(date) {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return newDate.getDate();
    }
    _createDateWithDelta(originDate, delta) {
        if (!originDate)
            return null;
        const newDate = new Date(originDate.getFullYear(), originDate.getMonth() + delta, 1);
        const lastDayOfNewMonth = this._getLastDayOfMonth(newDate);
        if (originDate.getDate() > lastDayOfNewMonth) {
            newDate.setDate(lastDayOfNewMonth);
        }
        else {
            newDate.setDate(originDate.getDate());
        }
        return newDate;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: DatepickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: DatepickerService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: DatepickerService, decorators: [{
            type: Injectable
        }] });

class QCalendarHeaderComponent {
    previousClicked = new EventEmitter();
    nextClicked = new EventEmitter();
    monthSelected = new EventEmitter();
    yearSelected = new EventEmitter();
    isMobile = false;
    displaySingleCalendar = false;
    currentView = 'month';
    calendarLocation = 'left';
    activeDate = null;
    minDate = null;
    maxDate = null;
    previousMonthButtonAriaLabel = '';
    nextMonthButtonAriaLabel = '';
    multiYearViewId = '';
    monthViewId = '';
    calendarHeaderRef;
    _yearOptions = [];
    _monthNames = [];
    _dateAdapter = inject(DateAdapter);
    _iconRegistry = inject(QIconRegistryService);
    _cdr = inject(ChangeDetectorRef);
    constructor() {
        this._iconRegistry.registerIcons([chevronLeft, chevronRight]);
    }
    ngOnChanges(changes) {
        if (changes['activeDate'] || changes['minDate'] || changes['maxDate']) {
            this._setMonthNames();
        }
        if (changes['minDate'] || changes['maxDate']) {
            this._setYearOptions();
        }
    }
    _isYearAndMonthSameOrAfterMaxDate() {
        if (this.maxDate && this.activeDate) {
            const maxYear = this.maxDate.getFullYear();
            const maxMonth = this.maxDate.getMonth();
            const activeYear = this.activeDate.getFullYear();
            const activeMonth = this.activeDate.getMonth();
            return activeYear > maxYear || (activeYear === maxYear && activeMonth >= maxMonth);
        }
        return false;
    }
    _isYearAndMonthSameOrBeforeMinDate() {
        if (this.minDate && this.activeDate) {
            const minYear = this.minDate.getFullYear();
            const minMonth = this.minDate.getMonth();
            const activeYear = this.activeDate.getFullYear();
            const activeMonth = this.activeDate.getMonth();
            return activeYear < minYear || (activeYear === minYear && activeMonth <= minMonth);
        }
        return false;
    }
    _onPreviousClicked(event) {
        if (this._isYearAndMonthSameOrBeforeMinDate())
            return;
        this.previousClicked.emit(event);
    }
    _onNextClicked(event) {
        if (this._isYearAndMonthSameOrAfterMaxDate())
            return;
        this.nextClicked.emit(event);
    }
    _setFocus() {
        this.calendarHeaderRef?.nativeElement?.focus();
    }
    _setMonthNames = () => {
        const year = this.activeDate?.getFullYear() ?? new Date().getFullYear();
        const minMonth = this.minDate && this.minDate.getFullYear() === year ? this.minDate.getMonth() : 0;
        const maxMonth = this.maxDate && this.maxDate.getFullYear() === year ? this.maxDate.getMonth() : 11;
        const monthNames = this._dateAdapter.getMonthNames('long');
        this._monthNames = monthNames.map((name, i) => ({
            label: name,
            value: i,
            disabled: i < minMonth || i > maxMonth,
        }));
        this._cdr.markForCheck();
    };
    get monthNames() {
        return this._monthNames;
    }
    get selectedMonthLabel() {
        const monthIndex = this.activeDate?.getMonth() ?? 0;
        return this.monthNames[monthIndex]?.label ?? '';
    }
    get yearOptions() {
        return this._yearOptions;
    }
    _generateYearOptions(minYear, maxYear) {
        const currentYear = new Date().getFullYear();
        const endYear = typeof maxYear === 'number' && maxYear > currentYear ? maxYear : currentYear;
        const startYear = endYear - 99;
        return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
            const year = startYear + i;
            return {
                label: String(year),
                value: year,
                disabled: (isPresent(minYear) && year < minYear) || (isPresent(maxYear) && year > maxYear),
            };
        });
    }
    _setYearOptions() {
        const minYear = this.minDate?.getFullYear();
        const maxYear = this.maxDate?.getFullYear();
        this._yearOptions = this._generateYearOptions(minYear, maxYear);
        this._cdr.markForCheck();
    }
    get showChevronLeft() {
        return this.displaySingleCalendar || (!this.isMobile && this.calendarLocation === 'left');
    }
    get showChevronRight() {
        return this.displaySingleCalendar || (!this.isMobile && this.calendarLocation === 'right');
    }
    get activeMonth() {
        return this.activeDate ? this.activeDate.getMonth() : 0;
    }
    get activeYear() {
        return this.activeDate ? this.activeDate.getFullYear() : 0;
    }
    onMonthSelectionChange(event) {
        if (!this.activeDate)
            return;
        const month = event.option.value;
        if (!isPresent(month)) {
            return;
        }
        const selectedMonth = new Date(this.activeDate.getFullYear(), month, 1);
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(selectedMonth);
        const selectedDate = new Date(this.activeDate.getFullYear(), month, Math.min(this.activeDate.getDate(), daysInMonth));
        this.monthSelected.emit(selectedDate);
    }
    onYearSelectionChange(event) {
        if (!this.activeDate)
            return;
        const year = event.option.value;
        if (typeof year === 'number') {
            const month = this.activeDate.getMonth();
            const day = this.activeDate.getDate();
            const daysInMonth = this._dateAdapter.getNumDaysInMonth(new Date(year, month, 1));
            const selectedDate = new Date(year, month, Math.min(day, daysInMonth));
            this.yearSelected.emit(selectedDate);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCalendarHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QCalendarHeaderComponent, isStandalone: true, selector: "q-calendar-header", inputs: { isMobile: ["isMobile", "isMobile", booleanAttribute], displaySingleCalendar: ["displaySingleCalendar", "displaySingleCalendar", booleanAttribute], currentView: "currentView", calendarLocation: "calendarLocation", activeDate: "activeDate", minDate: "minDate", maxDate: "maxDate", previousMonthButtonAriaLabel: "previousMonthButtonAriaLabel", nextMonthButtonAriaLabel: "nextMonthButtonAriaLabel", multiYearViewId: "multiYearViewId", monthViewId: "monthViewId" }, outputs: { previousClicked: "previousClicked", nextClicked: "nextClicked", monthSelected: "monthSelected", yearSelected: "yearSelected" }, providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], viewQueries: [{ propertyName: "calendarHeaderRef", first: true, predicate: ["calendarHeaderRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  #calendarHeaderRef\n  class=\"q-calendar-header\"\n  *transloco=\"let t\"\n  tabindex=\"-1\"\n  [ngSwitch]=\"currentView\">\n  <div class=\"q-calendar-header-navigation\" *ngSwitchCase=\"'month'\">\n    <q-interactive-icon\n      [style.visibility]=\"showChevronLeft ? 'visible' : 'hidden'\"\n      [icon]=\"'chevronLeft'\"\n      [size]=\"'medium'\"\n      [disabled]=\"_isYearAndMonthSameOrBeforeMinDate()\"\n      [dataQt]=\"'q-calendar-header-chevron-left-icon'\"\n      (click)=\"_onPreviousClicked($event)\"\n      [tabindex]=\"_isYearAndMonthSameOrBeforeMinDate() ? -1 : 0\"\n      [attr.aria-label]=\"\n        previousMonthButtonAriaLabel || t('allspark.datepicker.header.previousMonth')\n      \" />\n    <div class=\"q-calendar-chip-container\">\n      <q-chip\n        qDropmenuOrigin\n        #monthTrigger=\"qDropmenuOrigin\"\n        class=\"q-calendar-header-chip\"\n        [type]=\"'text'\"\n        isDropdown\n        [attr.id]=\"monthViewId\"\n        [active]=\"monthDropmenu.isOpened\"\n        (changed)=\"monthDropmenu.open()\"\n        aria-live=\"polite\">\n        {{ selectedMonthLabel | titlecase }}\n      </q-chip>\n      <q-dropmenu\n        [dropmenuTrigger]=\"monthTrigger\"\n        #monthDropmenu\n        [options]=\"monthNames\"\n        [value]=\"activeMonth\"\n        [density]=\"'compact'\"\n        (selectionChange)=\"onMonthSelectionChange($event)\"\n        [optionTemplate]=\"monthsTemplateRef\">\n      </q-dropmenu>\n\n      <ng-template #monthsTemplateRef let-option let-index=\"index\">\n        <div>{{ option.label }}</div>\n      </ng-template>\n\n      <q-chip\n        qDropmenuOrigin\n        #yearTrigger=\"qDropmenuOrigin\"\n        class=\"q-calendar-header-chip\"\n        [type]=\"'text'\"\n        isDropdown\n        aria-live=\"polite\"\n        [active]=\"yearDropmenu.isOpened\"\n        (changed)=\"yearDropmenu.open()\">\n        {{ activeDate?.getFullYear() }}\n      </q-chip>\n      <q-dropmenu\n        #yearDropmenu\n        [dropmenuTrigger]=\"yearTrigger\"\n        [options]=\"yearOptions\"\n        [value]=\"activeYear\"\n        [density]=\"'compact'\"\n        (selectionChange)=\"onYearSelectionChange($event)\"\n        [optionTemplate]=\"yearsTemplateRef\">\n      </q-dropmenu>\n\n      <ng-template #yearsTemplateRef let-option let-index=\"index\">\n        <div>{{ option.label }}</div>\n      </ng-template>\n    </div>\n\n    <q-interactive-icon\n      [style.visibility]=\"showChevronRight ? 'visible' : 'hidden'\"\n      [icon]=\"'chevronRight'\"\n      [size]=\"'medium'\"\n      [dataQt]=\"'q-calendar-header-chevron-right-icon'\"\n      [disabled]=\"_isYearAndMonthSameOrAfterMaxDate()\"\n      (click)=\"_onNextClicked($event)\"\n      [tabindex]=\"_isYearAndMonthSameOrAfterMaxDate() ? -1 : 0\"\n      [attr.aria-label]=\"nextMonthButtonAriaLabel || t('allspark.datepicker.header.nextMonth')\" />\n  </div>\n\n  <div\n    *ngSwitchCase=\"'multi-year'\"\n    [attr.id]=\"multiYearViewId\"\n    class=\"q-calendar-header-title\"\n    aria-live=\"polite\">\n    {{ t('allspark.datepicker.header.selectYear') }}\n  </div>\n</div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-calendar-header{display:flex;align-items:center;justify-content:center;-webkit-user-select:none;user-select:none;color:var(--awds-datepicker-header-color, var(--ads-color-body-contrast-400));background:var(--awds-datepicker-header-background, transparent);height:var(--awds-calendar-header-height, auto);width:var(--awds-calendar-header-width, 100%)}.q-calendar-header-navigation{display:flex;justify-content:space-between;align-items:center;width:100%;padding:var(--awds-calendar-header-padding, var(--ads-size-s) 0 var(--ads-size-xxs) 0)}.q-calendar-header-title{font-family:var(--awds-calendar-header-title-font-family, var(--ads-font-family-body));font-size:var(--awds-calendar-header-title-font-size, var(--ads-font-size-xs));font-style:var(--awds-calendar-header-title-font-style, inherit);font-weight:var(--awds-calendar-header-title-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-calendar-header-title-letter-spacing, 0);line-height:var(--awds-calendar-header-title-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-calendar-header-title-text-transform, none);display:flex;justify-content:center;padding-top:28px;padding-bottom:20px}.q-calendar-header .q-calendar-chip-container{display:flex;gap:var(--awds-calendar-month-year-container-gap, 0)}\n"], dependencies: [{ kind: "directive", type: NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: i1.TranslocoDirective, selector: "[transloco]", inputs: ["transloco", "translocoParams", "translocoScope", "translocoRead", "translocoPrefix", "translocoLang", "translocoLoadingTpl"] }, { kind: "component", type: QChipComponent, selector: "q-chip", inputs: ["isIconChip", "toggleActiveIconColor", "toggleOnClick", "isDropdown", "error", "readonly", "value", "iconPosition", "textStyle", "dataQt", "type", "showCheckIcon", "checkType", "active", "toggleActiveIcon", "disabled", "icon", "toggleRightIcon"], outputs: ["changed", "iconClicked"] }, { kind: "component", type: QInteractiveIconComponent, selector: "q-interactive-icon", inputs: ["icon", "context", "size", "tooltipValue", "tooltipPosition", "disabled", "tabindex", "tooltipShowDelay", "tooltipHideDelay", "tooltipLongPressDelay", "dataQt", "iconSize", "color"] }, { kind: "component", type: QDropmenuComponent, selector: "q-dropmenu", inputs: ["backdropEnabled", "fitTriggerWidth", "density", "highlightCaseSensitive", "loading", "disableSelectionTracking", "textToHighlight", "loadingVariant", "loadingSkeletonTemplate", "footerMessage", "footerTemplate", "emptyStateTemplate", "optionTemplate", "groupLabelTemplate", "headerTemplate", "aria-label", "aria-labelledby", "id", "dataQt", "dropmenuTrigger", "groupBy", "groupLabel", "options", "value", "minWidth", "minHeight", "offsetY", "offsetX", "xPosition", "yPosition", "fitOverlayWidth", "useOverlay", "overlayHasBackdrop"], outputs: ["selectionChange", "valueChange", "opened", "closed", "backdropEnabledChange", "fitTriggerWidthChange"] }, { kind: "directive", type: QDropmenuOriginDirective, selector: "[qDropmenuOrigin]", exportAs: ["qDropmenuOrigin"] }, { kind: "pipe", type: TitleCasePipe, name: "titlecase" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCalendarHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-calendar-header', imports: [
                        NgSwitch,
                        NgSwitchCase,
                        TranslocoModule,
                        TitleCasePipe,
                        QChipComponent,
                        QInteractiveIconComponent,
                        QDropmenuComponent,
                        QDropmenuOriginDirective,
                    ], providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  #calendarHeaderRef\n  class=\"q-calendar-header\"\n  *transloco=\"let t\"\n  tabindex=\"-1\"\n  [ngSwitch]=\"currentView\">\n  <div class=\"q-calendar-header-navigation\" *ngSwitchCase=\"'month'\">\n    <q-interactive-icon\n      [style.visibility]=\"showChevronLeft ? 'visible' : 'hidden'\"\n      [icon]=\"'chevronLeft'\"\n      [size]=\"'medium'\"\n      [disabled]=\"_isYearAndMonthSameOrBeforeMinDate()\"\n      [dataQt]=\"'q-calendar-header-chevron-left-icon'\"\n      (click)=\"_onPreviousClicked($event)\"\n      [tabindex]=\"_isYearAndMonthSameOrBeforeMinDate() ? -1 : 0\"\n      [attr.aria-label]=\"\n        previousMonthButtonAriaLabel || t('allspark.datepicker.header.previousMonth')\n      \" />\n    <div class=\"q-calendar-chip-container\">\n      <q-chip\n        qDropmenuOrigin\n        #monthTrigger=\"qDropmenuOrigin\"\n        class=\"q-calendar-header-chip\"\n        [type]=\"'text'\"\n        isDropdown\n        [attr.id]=\"monthViewId\"\n        [active]=\"monthDropmenu.isOpened\"\n        (changed)=\"monthDropmenu.open()\"\n        aria-live=\"polite\">\n        {{ selectedMonthLabel | titlecase }}\n      </q-chip>\n      <q-dropmenu\n        [dropmenuTrigger]=\"monthTrigger\"\n        #monthDropmenu\n        [options]=\"monthNames\"\n        [value]=\"activeMonth\"\n        [density]=\"'compact'\"\n        (selectionChange)=\"onMonthSelectionChange($event)\"\n        [optionTemplate]=\"monthsTemplateRef\">\n      </q-dropmenu>\n\n      <ng-template #monthsTemplateRef let-option let-index=\"index\">\n        <div>{{ option.label }}</div>\n      </ng-template>\n\n      <q-chip\n        qDropmenuOrigin\n        #yearTrigger=\"qDropmenuOrigin\"\n        class=\"q-calendar-header-chip\"\n        [type]=\"'text'\"\n        isDropdown\n        aria-live=\"polite\"\n        [active]=\"yearDropmenu.isOpened\"\n        (changed)=\"yearDropmenu.open()\">\n        {{ activeDate?.getFullYear() }}\n      </q-chip>\n      <q-dropmenu\n        #yearDropmenu\n        [dropmenuTrigger]=\"yearTrigger\"\n        [options]=\"yearOptions\"\n        [value]=\"activeYear\"\n        [density]=\"'compact'\"\n        (selectionChange)=\"onYearSelectionChange($event)\"\n        [optionTemplate]=\"yearsTemplateRef\">\n      </q-dropmenu>\n\n      <ng-template #yearsTemplateRef let-option let-index=\"index\">\n        <div>{{ option.label }}</div>\n      </ng-template>\n    </div>\n\n    <q-interactive-icon\n      [style.visibility]=\"showChevronRight ? 'visible' : 'hidden'\"\n      [icon]=\"'chevronRight'\"\n      [size]=\"'medium'\"\n      [dataQt]=\"'q-calendar-header-chevron-right-icon'\"\n      [disabled]=\"_isYearAndMonthSameOrAfterMaxDate()\"\n      (click)=\"_onNextClicked($event)\"\n      [tabindex]=\"_isYearAndMonthSameOrAfterMaxDate() ? -1 : 0\"\n      [attr.aria-label]=\"nextMonthButtonAriaLabel || t('allspark.datepicker.header.nextMonth')\" />\n  </div>\n\n  <div\n    *ngSwitchCase=\"'multi-year'\"\n    [attr.id]=\"multiYearViewId\"\n    class=\"q-calendar-header-title\"\n    aria-live=\"polite\">\n    {{ t('allspark.datepicker.header.selectYear') }}\n  </div>\n</div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-calendar-header{display:flex;align-items:center;justify-content:center;-webkit-user-select:none;user-select:none;color:var(--awds-datepicker-header-color, var(--ads-color-body-contrast-400));background:var(--awds-datepicker-header-background, transparent);height:var(--awds-calendar-header-height, auto);width:var(--awds-calendar-header-width, 100%)}.q-calendar-header-navigation{display:flex;justify-content:space-between;align-items:center;width:100%;padding:var(--awds-calendar-header-padding, var(--ads-size-s) 0 var(--ads-size-xxs) 0)}.q-calendar-header-title{font-family:var(--awds-calendar-header-title-font-family, var(--ads-font-family-body));font-size:var(--awds-calendar-header-title-font-size, var(--ads-font-size-xs));font-style:var(--awds-calendar-header-title-font-style, inherit);font-weight:var(--awds-calendar-header-title-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-calendar-header-title-letter-spacing, 0);line-height:var(--awds-calendar-header-title-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-calendar-header-title-text-transform, none);display:flex;justify-content:center;padding-top:28px;padding-bottom:20px}.q-calendar-header .q-calendar-chip-container{display:flex;gap:var(--awds-calendar-month-year-container-gap, 0)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { previousClicked: [{
                type: Output
            }], nextClicked: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], isMobile: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], displaySingleCalendar: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], currentView: [{
                type: Input
            }], calendarLocation: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], previousMonthButtonAriaLabel: [{
                type: Input
            }], nextMonthButtonAriaLabel: [{
                type: Input
            }], multiYearViewId: [{
                type: Input
            }], monthViewId: [{
                type: Input
            }], calendarHeaderRef: [{
                type: ViewChild,
                args: ['calendarHeaderRef']
            }] } });

class FocusableElement {
    _element;
    constructor(_element) {
        this._element = _element;
    }
    focus() {
        this._element.nativeElement.focus();
    }
}
class QCalendarBodyComponent {
    selectedValueChange = new EventEmitter();
    todayValue = null;
    numCols = 7;
    startValue = null;
    endValue = null;
    cellAspectRatio = 0.9475;
    isRange = false;
    calendarLocation = 'left';
    minDate = null;
    maxDate = null;
    disabledDates = [];
    disableWeekends = false;
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._firstRowOffset = value.length ? this.numCols - value[0].length : 0;
        this._rows = value;
    }
    calendarCellButtons;
    onKeydown(event) {
        if (event.key === TAB) {
            if (this._focusApplied) {
                this._focusApplied = false;
                return;
            }
            else {
                this._applyFocus();
                event.preventDefault();
            }
        }
        else {
            this._handleKeydown(event);
        }
    }
    onFocusIn() {
        this._applyFocus();
    }
    _firstRowOffset = 0;
    _cellWidth = '';
    _cellPadding = '';
    _previewStart = null;
    _previewEnd = null;
    _selection = { start: null, end: null };
    _rows = [];
    _dateAdapter = inject(DateAdapter);
    _destroy$ = inject(QDestroyService);
    _datepickerService = inject(DatepickerService);
    _changeDetectorRef = inject(ChangeDetectorRef);
    _keyManager = null;
    _focusedDate = new Date();
    _focusApplied = false;
    ngOnInit() {
        this._datepickerService.preview$
            .pipe(takeUntil(this._destroy$))
            .subscribe((preview) => {
            this._previewStart = preview.start?.getTime() ?? null;
            this._previewEnd = preview.end?.getTime() ?? null;
            this._changeDetectorRef.detectChanges();
        });
        this._datepickerService.selection$
            .pipe(takeUntil(this._destroy$))
            .subscribe((selection) => {
            this._selection = selection;
        });
        this._cellWidth = `${100 / this.numCols}%`;
        this._cellPadding = `${(50 * this.cellAspectRatio) / this.numCols}%`;
    }
    ngOnChanges(changes) {
        const columnChanges = changes.numCols;
        const { rows, numCols } = this;
        if (changes.rows || columnChanges) {
            this._firstRowOffset = rows && rows[0].length ? numCols - rows[0].length : 0;
        }
    }
    ngAfterViewInit() {
        const focusableElements = this.calendarCellButtons.map((button) => new FocusableElement(button));
        this._keyManager = new FocusKeyManager(focusableElements).withWrap();
    }
    ngAfterContentInit() {
        this.subscribeToActiveDate();
    }
    subscribeToActiveDate() {
        const activeDate$ = this.calendarLocation === 'left'
            ? this._datepickerService.activeDateFirstCalendar$
            : this._datepickerService.activeDateSecondCalendar$;
        activeDate$.pipe(takeUntil(this._destroy$)).subscribe((date) => this._updateFocusedDate(date));
    }
    _updateFocusedDate(date) {
        if (!date)
            return;
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const today = new Date();
        const isCurrentMonth = date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        this._focusedDate = isCurrentMonth ? today : this._getFirstEnabledDate(firstDayOfMonth, date);
        this._changeDetectorRef.markForCheck();
    }
    _getFirstEnabledDate(firstDayOfMonth, date) {
        if (this._nextEnableDate(firstDayOfMonth) && !this._isDateDisabled(firstDayOfMonth)) {
            return firstDayOfMonth;
        }
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const activeDate = new Date(date.getFullYear(), date.getMonth(), day);
            if (this._nextEnableDate(activeDate) && !this._isDateDisabled(activeDate)) {
                return activeDate;
            }
        }
        return firstDayOfMonth;
    }
    _applyFocus() {
        if (this._focusApplied || !this.calendarCellButtons)
            return;
        let focusedIndex = this.calendarCellButtons
            .toArray()
            .findIndex((button) => button.nativeElement.getAttribute('aria-selected') === 'true');
        if (focusedIndex === -1) {
            focusedIndex = this._getDayIndex(this._focusedDate) || 0;
        }
        if (focusedIndex >= 0 && focusedIndex < this.calendarCellButtons.length) {
            const cell = this._rows
                .flat()
                .find((cell) => cell.date && this._getDayIndex(cell.date) === focusedIndex);
            if (cell) {
                this._updateCellFocus(cell);
            }
            this._focusApplied = true;
        }
    }
    _handleKeydown(event) {
        this._keyManager?.onKeydown(event);
        switch (event.key) {
            case UP_ARROW:
                this._moveFocusByDays(-this.numCols);
                break;
            case DOWN_ARROW:
                this._moveFocusByDays(this.numCols);
                break;
            case LEFT_ARROW:
                this._moveFocusByDays(-1);
                break;
            case RIGHT_ARROW:
                this._moveFocusByDays(1);
                break;
            case HOME:
                this._moveFocusToStartOfWeek();
                event.preventDefault();
                break;
            case END:
                this._moveFocusToEndOfWeek();
                event.preventDefault();
                break;
            case PAGE_UP:
                if (event.shiftKey) {
                    this._moveFocusByYears(-1);
                }
                else {
                    this._moveFocusByMonths(-1);
                }
                event.preventDefault();
                break;
            case PAGE_DOWN:
                if (event.shiftKey) {
                    this._moveFocusByYears(1);
                }
                else {
                    this._moveFocusByMonths(1);
                }
                event.preventDefault();
                break;
        }
    }
    _updateFocusCalendarBody(newDate) {
        const newMonth = newDate.getMonth();
        const currentMonth = this._focusedDate.getMonth();
        const newYear = newDate.getFullYear();
        const currentYear = this._focusedDate.getFullYear();
        if (newMonth !== currentMonth || newYear !== currentYear) {
            const isNextMonth = newMonth > currentMonth || (newMonth === 0 && currentMonth === 11) || newYear > currentYear;
            const isPreviousMonth = newMonth < currentMonth || (newMonth === 11 && currentMonth === 0) || newYear < currentYear;
            if (isPreviousMonth || isNextMonth) {
                this._datepickerService.updateActiveDates(this.calendarLocation, newDate);
            }
            setTimeout(() => {
                const newIndex = this._getDayIndex(newDate);
                const newIndexValid = newIndex >= 0 && newIndex < this.calendarCellButtons.length;
                this._focusedDate = newDate;
                this._updateFocus(newIndexValid ? newIndex : 0);
                this._changeDetectorRef.detach();
                this._changeDetectorRef.detectChanges();
                this._changeDetectorRef.reattach();
            });
        }
        else {
            const newIndex = this._getDayIndex(newDate);
            if (newIndex >= 0 && newIndex < this.calendarCellButtons.length) {
                this._focusedDate = newDate;
                this._updateFocus(newIndex);
            }
        }
    }
    _isDateDisabled(date) {
        if (!date) {
            return false;
        }
        const isDisabledDate = this.disabledDates.some((disabledDate) => disabledDate.getDate() === date.getDate() &&
            disabledDate.getMonth() === date.getMonth() &&
            disabledDate.getFullYear() === date.getFullYear());
        const isWeekend = this.disableWeekends && (date.getDay() === 0 || date.getDay() === 6);
        return isDisabledDate || isWeekend;
    }
    _nextEnableDate(date) {
        const updateDate = (sourceDate) => {
            date.setDate(sourceDate.getDate());
            date.setMonth(sourceDate.getMonth());
            date.setFullYear(sourceDate.getFullYear());
        };
        if (this.maxDate && date > this.maxDate) {
            updateDate(this.maxDate);
        }
        else if (this.minDate && date < this.minDate) {
            updateDate(this.minDate);
        }
        return true;
    }
    _findNextEnabledDate(date, offset, isDisabled) {
        while (isDisabled(date)) {
            date.setDate(date.getDate() + offset);
        }
        return date;
    }
    _moveFocusByDays(days) {
        const currentDate = this._focusedDate;
        let newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        const offset = Math.abs(days) === 1 ? (days > 0 ? 1 : -1) : days > 0 ? this.numCols : -this.numCols;
        newDate = this._findNextEnabledDate(newDate, offset, this._isDateDisabled.bind(this));
        this._nextEnableDate(newDate);
        this._updateFocusCalendarBody(newDate);
    }
    _moveFocusByMonths(numMonths) {
        const currentDate = this._focusedDate;
        const isPrev = numMonths < 0;
        const numYears = Math.trunc(Math.abs(numMonths) / 12);
        numMonths = Math.abs(numMonths) % 12;
        const newYear = isPrev
            ? currentDate.getFullYear() - numYears
            : currentDate.getFullYear() + numYears;
        const newMonth = isPrev
            ? currentDate.getMonth() - numMonths
            : currentDate.getMonth() + numMonths;
        let newDate = new Date(newYear, newMonth, 1);
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(newDate);
        if (currentDate.getDate() > daysInMonth) {
            newDate.setDate(daysInMonth);
        }
        else {
            newDate.setDate(currentDate.getDate());
        }
        newDate = this._findNextEnabledDate(newDate, isPrev ? 1 : -1, this._isDateDisabled.bind(this));
        this._nextEnableDate(newDate);
        this._updateFocusCalendarBody(newDate);
    }
    _moveFocusByYears(years) {
        const currentDate = this._focusedDate;
        let newDate = new Date(currentDate);
        const targetYear = newDate.getFullYear() + years;
        const targetDaysInMonth = this._dateAdapter.getNumDaysInMonth(new Date(targetYear, newDate.getMonth(), 1));
        if (currentDate.getDate() > targetDaysInMonth) {
            newDate.setDate(targetDaysInMonth);
        }
        newDate.setFullYear(targetYear);
        newDate = this._findNextEnabledDate(newDate, years > 0 ? -1 : 1, this._isDateDisabled.bind(this));
        this._nextEnableDate(newDate);
        this._updateFocusCalendarBody(newDate);
    }
    _moveFocusToStartOfWeek() {
        const currentDate = this._focusedDate;
        let newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - newDate.getDay());
        newDate = this._findNextEnabledDate(newDate, 1, this._isDateDisabled.bind(this));
        this._nextEnableDate(newDate);
        this._updateFocusCalendarBody(newDate);
    }
    _moveFocusToEndOfWeek() {
        const currentDate = this._focusedDate;
        let newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (6 - newDate.getDay()));
        newDate = this._findNextEnabledDate(newDate, -1, this._isDateDisabled.bind(this));
        this._nextEnableDate(newDate);
        this._updateFocusCalendarBody(newDate);
    }
    _updateCellFocus(cell) {
        const newIndex = cell.date ? this._getDayIndex(cell.date) : -1;
        if (cell.date) {
            this._focusedDate = cell.date;
        }
        this._updateFocus(newIndex);
    }
    _updateFocus(newIndex) {
        if (newIndex >= 0 && newIndex < this.calendarCellButtons.length) {
            const targetButton = this.calendarCellButtons.toArray()[newIndex];
            this._keyManager?.setActiveItem(newIndex);
            targetButton.nativeElement.focus();
        }
    }
    getTabIndex(item) {
        if (!item.date)
            return 0;
        const focusedDay = this._focusedDate.getDate();
        const itemDay = item.date.getDate();
        return itemDay === focusedDay ? 0 : -1;
    }
    _getDayIndex(date) {
        const day = date.getDate();
        const cellbutton = this.calendarCellButtons.find((button) => parseInt(button.nativeElement.textContent.trim(), 10) === day);
        return cellbutton ? this.calendarCellButtons.toArray().indexOf(cellbutton) : 0;
    }
    onMouseEnter(cell) {
        if (cell && this.isRange) {
            const newPreviewRange = this._createPreview(cell.date ?? null, this._selection);
            this._datepickerService.updatePreview(newPreviewRange);
        }
    }
    onMouseLeave = () => {
        if (this._previewEnd !== null && this.isRange) {
            this._datepickerService.updatePreview(new DateRange(null, null));
        }
    };
    _isSelected(value) {
        const valueDate = new Date(value);
        const startValueDate = new Date(this.startValue ?? 0);
        const endValueDate = new Date(this.endValue ?? 0);
        return (this._dateAdapter.sameDate(valueDate, startValueDate) ||
            this._dateAdapter.sameDate(valueDate, endValueDate));
    }
    _isYearSelected(year) {
        return year === this.startValue && year === this.endValue;
    }
    _cellClicked(cell, event) {
        if (cell.enabled) {
            this.selectedValueChange.emit({ value: cell.value, event });
            this._updateCellFocus(cell);
        }
    }
    _showHighlightEnd(item) {
        return (item.date &&
            (item.date.getDay() === 6 || item.value === this._dateAdapter.getNumDaysInMonth(item.date)));
    }
    _isRangeStart(value) {
        return (value && this._isStart(value.getTime(), this.startValue, this.endValue)) || false;
    }
    _isRangeEnd(value) {
        return (value && this._isEnd(value.getTime(), this.startValue, this.endValue)) || false;
    }
    _isInRange(value) {
        return value ? this._isDateInRange(value, this.startValue, this.endValue) : false;
    }
    _isPreviewStart(value) {
        return (value && this._isStart(value.getTime(), this._previewStart, this._previewEnd)) || false;
    }
    _isPreviewEnd(value) {
        return (value && this._isEnd(value.getTime(), this._previewStart, this._previewEnd)) || false;
    }
    _isInPreview(value) {
        return !!value && this._isDateInRange(value, this._previewStart, this._previewEnd);
    }
    _isCalendarItemSelected(cell) {
        if (!cell.date) {
            return this._isYearSelected(cell.value);
        }
        return this._isSelected(cell.date.getTime());
    }
    _isDateInRange(value, start, end) {
        if (!value || !start || !end)
            return false;
        const valueDate = new Date(value);
        const startValueDate = new Date(start);
        const endValueDate = new Date(end);
        return (this.isRange &&
            start !== null &&
            end !== null &&
            start !== end &&
            this._dateAdapter.compareDate(valueDate, startValueDate) >= 0 &&
            this._dateAdapter.compareDate(valueDate, endValueDate) <= 0);
    }
    _isStart(value, start, end) {
        if (!value || !start || !end)
            return false;
        const valueDate = new Date(value);
        const startValueDate = new Date(start);
        return (end !== null &&
            start !== end &&
            value < end &&
            this._dateAdapter.sameDate(valueDate, startValueDate));
    }
    _isEnd(value, start, end) {
        if (!value || !start || !end)
            return false;
        const valueDate = new Date(value);
        const endValueDate = new Date(end);
        return (start !== null &&
            start !== end &&
            value >= start &&
            this._dateAdapter.sameDate(valueDate, endValueDate));
    }
    _createPreview(activeDate, selection) {
        let start = null;
        let end = null;
        if (selection.start && !selection.end && activeDate) {
            start = selection.start;
            end = activeDate;
        }
        return new DateRange(start, end);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCalendarBodyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QCalendarBodyComponent, isStandalone: true, selector: "[q-calendar-body]", inputs: { todayValue: ["todayValue", "todayValue", numberAttribute], numCols: ["numCols", "numCols", numberAttribute], startValue: ["startValue", "startValue", numberAttribute], endValue: ["endValue", "endValue", numberAttribute], cellAspectRatio: ["cellAspectRatio", "cellAspectRatio", numberAttribute], isRange: ["isRange", "isRange", booleanAttribute], calendarLocation: "calendarLocation", minDate: "minDate", maxDate: "maxDate", disabledDates: "disabledDates", disableWeekends: "disableWeekends", rows: "rows" }, outputs: { selectedValueChange: "selectedValueChange" }, host: { attributes: { "aria-readonly": "true" }, listeners: { "keydown": "onKeydown($event)", "focusin": "onFocusIn()" }, classAttribute: "q-calendar-body" }, providers: [QDestroyService], viewQueries: [{ propertyName: "calendarCellButtons", predicate: ["calendarCellButton"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<tr class=\"q-calendar-row\" *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n  <td\n    *ngIf=\"rowIndex === 0 && _firstRowOffset\"\n    aria-hidden=\"true\"\n    [attr.colspan]=\"_firstRowOffset\"\n    [style.paddingTop]=\"_cellPadding\"\n    [style.paddingBottom]=\"_cellPadding\"></td>\n  <td\n    *ngFor=\"let item of row; let colIndex = index\"\n    role=\"gridcell\"\n    class=\"q-calendar-cell-container\"\n    [attr.row]=\"rowIndex\"\n    [attr.aria-selected]=\"_isCalendarItemSelected(item)\"\n    [attr.col]=\"colIndex\"\n    (mouseenter)=\"onMouseEnter(item)\"\n    (mouseleave)=\"onMouseLeave()\">\n    <button\n      type=\"button\"\n      class=\"q-calendar-cell\"\n      #calendarCellButton\n      [attr.disabled]=\"!item.enabled ? true : null\"\n      [class.q-calendar-range-start]=\"_isRangeStart(item.date)\"\n      [class.q-calendar-range-end]=\"_isRangeEnd(item.date)\"\n      [class.q-calendar-in-range]=\"_isInRange(item.date?.getTime())\"\n      [class.q-calendar-preview-start]=\"_isPreviewStart(item.date)\"\n      [class.q-calendar-preview-end]=\"_isPreviewEnd(item.date)\"\n      [class.q-calendar-in-preview]=\"_isInPreview(item.date?.getTime())\"\n      [class.q-calendar-row-start]=\"item.date?.getDay() === 0 || item.value === 1\"\n      [class.q-calendar-row-end]=\"_showHighlightEnd(item)\"\n      [attr.tabindex]=\"getTabIndex(item)\"\n      (click)=\"_cellClicked(item, $event)\">\n      <div\n        class=\"q-calendar-cell-content\"\n        [class.q-calendar-today]=\"item.date && todayValue === item.date.getTime()\"\n        [class.q-calendar-selected]=\"_isCalendarItemSelected(item)\">\n        {{ item.displayValue }}\n      </div>\n    </button>\n  </td>\n</tr>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-calendar-cell-container{position:relative;line-height:0;cursor:pointer;height:var(--awds-datepicker-day-container-height, calc(var(--ads-size-m) + var(--ads-size-nano)));width:var(--awds-datepicker-day-container-width, 100%);padding:var(--awds-datepicker-day-container-padding, 0);-webkit-tap-highlight-color:transparent}.q-calendar-cell-container:has(.q-calendar-cell:disabled){cursor:default}.q-calendar-cell-container .q-calendar-cell{background:none;border:none;outline:none;padding:0;margin:0;cursor:pointer;font-size:inherit;color:inherit;-webkit-user-select:none;user-select:none;text-align:center}.q-calendar-cell-container .q-calendar-cell-content{z-index:1;display:flex;align-items:center;justify-content:center;border:var(--awds-datepicker-day-cell-border, var(--ads-border-width-hairline) solid transparent);width:var(--awds-datepicker-day-cell-width, var(--ads-size-m));height:var(--awds-datepicker-day-cell-height, var(--ads-size-m));border-radius:var(--awds-datepicker-day-cell-border-radius, var(--ads-border-radius-xl));color:var(--awds-datepicker-day-cell-color, var(--ads-color-body-contrast-100))}.q-calendar-cell-container .q-calendar-cell:disabled{cursor:default}.q-calendar-cell-container .q-calendar-cell:disabled .q-calendar-cell-content{color:var(--awds-datepicker-disabled-day-cell-color, var(--ads-color-body-400))}.q-calendar-cell-container .q-calendar-cell:focus-visible .q-calendar-cell-content{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}.q-calendar-cell-container:last-child{padding-right:0}\n"], dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCalendarBodyComponent, decorators: [{
            type: Component,
            args: [{ selector: '[q-calendar-body]', host: {
                        class: 'q-calendar-body',
                        'aria-readonly': 'true',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [NgFor, NgIf], providers: [QDestroyService], template: "<tr class=\"q-calendar-row\" *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n  <td\n    *ngIf=\"rowIndex === 0 && _firstRowOffset\"\n    aria-hidden=\"true\"\n    [attr.colspan]=\"_firstRowOffset\"\n    [style.paddingTop]=\"_cellPadding\"\n    [style.paddingBottom]=\"_cellPadding\"></td>\n  <td\n    *ngFor=\"let item of row; let colIndex = index\"\n    role=\"gridcell\"\n    class=\"q-calendar-cell-container\"\n    [attr.row]=\"rowIndex\"\n    [attr.aria-selected]=\"_isCalendarItemSelected(item)\"\n    [attr.col]=\"colIndex\"\n    (mouseenter)=\"onMouseEnter(item)\"\n    (mouseleave)=\"onMouseLeave()\">\n    <button\n      type=\"button\"\n      class=\"q-calendar-cell\"\n      #calendarCellButton\n      [attr.disabled]=\"!item.enabled ? true : null\"\n      [class.q-calendar-range-start]=\"_isRangeStart(item.date)\"\n      [class.q-calendar-range-end]=\"_isRangeEnd(item.date)\"\n      [class.q-calendar-in-range]=\"_isInRange(item.date?.getTime())\"\n      [class.q-calendar-preview-start]=\"_isPreviewStart(item.date)\"\n      [class.q-calendar-preview-end]=\"_isPreviewEnd(item.date)\"\n      [class.q-calendar-in-preview]=\"_isInPreview(item.date?.getTime())\"\n      [class.q-calendar-row-start]=\"item.date?.getDay() === 0 || item.value === 1\"\n      [class.q-calendar-row-end]=\"_showHighlightEnd(item)\"\n      [attr.tabindex]=\"getTabIndex(item)\"\n      (click)=\"_cellClicked(item, $event)\">\n      <div\n        class=\"q-calendar-cell-content\"\n        [class.q-calendar-today]=\"item.date && todayValue === item.date.getTime()\"\n        [class.q-calendar-selected]=\"_isCalendarItemSelected(item)\">\n        {{ item.displayValue }}\n      </div>\n    </button>\n  </td>\n</tr>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-calendar-cell-container{position:relative;line-height:0;cursor:pointer;height:var(--awds-datepicker-day-container-height, calc(var(--ads-size-m) + var(--ads-size-nano)));width:var(--awds-datepicker-day-container-width, 100%);padding:var(--awds-datepicker-day-container-padding, 0);-webkit-tap-highlight-color:transparent}.q-calendar-cell-container:has(.q-calendar-cell:disabled){cursor:default}.q-calendar-cell-container .q-calendar-cell{background:none;border:none;outline:none;padding:0;margin:0;cursor:pointer;font-size:inherit;color:inherit;-webkit-user-select:none;user-select:none;text-align:center}.q-calendar-cell-container .q-calendar-cell-content{z-index:1;display:flex;align-items:center;justify-content:center;border:var(--awds-datepicker-day-cell-border, var(--ads-border-width-hairline) solid transparent);width:var(--awds-datepicker-day-cell-width, var(--ads-size-m));height:var(--awds-datepicker-day-cell-height, var(--ads-size-m));border-radius:var(--awds-datepicker-day-cell-border-radius, var(--ads-border-radius-xl));color:var(--awds-datepicker-day-cell-color, var(--ads-color-body-contrast-100))}.q-calendar-cell-container .q-calendar-cell:disabled{cursor:default}.q-calendar-cell-container .q-calendar-cell:disabled .q-calendar-cell-content{color:var(--awds-datepicker-disabled-day-cell-color, var(--ads-color-body-400))}.q-calendar-cell-container .q-calendar-cell:focus-visible .q-calendar-cell-content{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}.q-calendar-cell-container:last-child{padding-right:0}\n"] }]
        }], propDecorators: { selectedValueChange: [{
                type: Output
            }], todayValue: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], numCols: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], startValue: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], endValue: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], cellAspectRatio: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], isRange: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], calendarLocation: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], disabledDates: [{
                type: Input
            }], disableWeekends: [{
                type: Input
            }], rows: [{
                type: Input
            }], calendarCellButtons: [{
                type: ViewChildren,
                args: ['calendarCellButton', { read: ElementRef }]
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onFocusIn: [{
                type: HostListener,
                args: ['focusin']
            }] } });

class QCalendarCell {
    value;
    displayValue;
    enabled;
    date;
    constructor(value, displayValue, enabled, date) {
        this.value = value;
        this.displayValue = displayValue;
        this.enabled = enabled;
        this.date = date;
    }
}

const DAYS_PER_WEEK = 7;
class QMonthViewComponent {
    daySelected = new EventEmitter();
    activeDateChange = new EventEmitter();
    calendarLocation = 'left';
    monthViewId = '';
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        this._minDate = value;
        this._createWeekCells();
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        this._maxDate = value;
        this._createWeekCells();
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        if (value) {
            const oldActiveDate = this._activeDate;
            this._activeDate = value;
            if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
                this._init();
            }
        }
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this._setRanges(this._selected);
    }
    _weeks = [];
    _firstWeekOffset = 0;
    _todayDate = null;
    _rangeStart = null;
    _rangeEnd = null;
    _isRange = false;
    _disableWeekends = false;
    _disabledDates = [];
    _minDate = null;
    _maxDate = null;
    _activeDate;
    _selected = null;
    _datepickerService = inject(DatepickerService);
    _destroy$ = inject(QDestroyService);
    _dateAdapter = inject(DateAdapter);
    _changeDetectorRef = inject(ChangeDetectorRef);
    constructor() {
        this._activeDate = new Date();
    }
    ngOnInit() {
        this._init();
        this._datepickerService.disableWeekends$
            .pipe(takeUntil(this._destroy$))
            .subscribe((disableWeekends) => {
            this._disableWeekends = disableWeekends;
            this._createWeekCells();
            this._changeDetectorRef.markForCheck();
        });
        this._datepickerService.disabledDates$
            .pipe(takeUntil(this._destroy$))
            .subscribe((disabledDates) => {
            this._disabledDates = disabledDates;
            this._createWeekCells();
            this._changeDetectorRef.markForCheck();
        });
    }
    _dateSelected(event) {
        const date = event.value;
        const selectedDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), date, 0, 0, 0);
        this.daySelected.emit({ value: selectedDate, event: event.event });
        this._datepickerService.updatePreview(new DateRange(null, null));
        this._changeDetectorRef.markForCheck();
    }
    _isWeekend(weekDay) {
        const weekend = ['sunday', 'saturday'];
        return weekend.includes(weekDay);
    }
    get _weekDays() {
        return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    }
    _init() {
        this._setRanges(this.selected);
        this._todayDate = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
        const firstOfMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), 1);
        this._firstWeekOffset = (DAYS_PER_WEEK + firstOfMonth.getDay()) % DAYS_PER_WEEK;
        this._createWeekCells();
        this._changeDetectorRef.markForCheck();
    }
    _createWeekCells() {
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        this._weeks = [[]];
        for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            const date = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), i + 1);
            const isEnabled = this._shouldEnableDate(date);
            this._weeks[this._weeks.length - 1].push(new QCalendarCell(i + 1, String(i + 1), isEnabled, date));
        }
    }
    _setRanges(selectedValue) {
        if (selectedValue instanceof DateRange) {
            this._rangeStart = selectedValue.start?.getTime() || null;
            this._rangeEnd = selectedValue.end?.getTime() || null;
            this._isRange = true;
        }
        else {
            this._rangeStart = this._rangeEnd = selectedValue?.getTime() || null;
            this._isRange = false;
        }
    }
    _hasSameMonthAndYear(d1, d2) {
        return !!(d1 && d2 && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear());
    }
    _shouldEnableDate(date) {
        return (!!date &&
            (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0) &&
            !(this._isDisabledWeekend(date) || this._isDisabledDate(date)));
    }
    _isDisabledDate(date) {
        return !!this._disabledDates?.some((disableDate) => !this._dateAdapter.compareDate(disableDate, date));
    }
    _isDisabledWeekend(date) {
        return this._disableWeekends && this._isWeekend(this._weekDays[date.getDay()]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMonthViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QMonthViewComponent, isStandalone: true, selector: "q-month-view", inputs: { calendarLocation: "calendarLocation", monthViewId: "monthViewId", minDate: "minDate", maxDate: "maxDate", activeDate: "activeDate", selected: "selected" }, outputs: { daySelected: "daySelected", activeDateChange: "activeDateChange" }, providers: [QDestroyService, MISSING_KEY_HANDLER, ALLSPARK_SCOPE], ngImport: i0, template: "<ng-container *transloco=\"let t\">\n  <table class=\"q-month-view-table\" role=\"grid\" [attr.aria-labelledby]=\"monthViewId\">\n    <thead class=\"q-calendar-table-header\">\n      <tr>\n        <th\n          *ngFor=\"let weekDay of _weekDays\"\n          scope=\"col\"\n          [class.q-calendar-disabled]=\"_disableWeekends && _isWeekend(weekDay)\">\n          {{ t('allspark.datepicker.weekdays.short.' + weekDay) }}\n        </th>\n      </tr>\n    </thead>\n    <tbody\n      q-calendar-body\n      role=\"rowgroup\"\n      [rows]=\"_weeks\"\n      [todayValue]=\"_todayDate\"\n      [isRange]=\"_isRange\"\n      [startValue]=\"_rangeStart\"\n      [endValue]=\"_rangeEnd\"\n      [minDate]=\"minDate\"\n      [maxDate]=\"maxDate\"\n      [disabledDates]=\"_disabledDates\"\n      [disableWeekends]=\"_disableWeekends\"\n      [calendarLocation]=\"calendarLocation\"\n      (selectedValueChange)=\"_dateSelected($event)\"></tbody>\n  </table>\n</ng-container>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-month-view-table{border-spacing:0;border-collapse:collapse;width:100%;table-layout:auto}.q-month-view-table .q-calendar-cell-container{padding-right:var(--awds-datepicker-day-container-gap, var(--ads-size-micro))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content.q-calendar-today{background:var(--awds-datepicker-today-background, transparent);color:var(--awds-datepicker-today-color, var(--ads-color-primary-contrast-100))}.q-month-view-table .q-calendar-cell-container .q-calendar-in-range .q-calendar-cell-content.q-calendar-today,.q-month-view-table .q-calendar-cell-container .q-calendar-in-preview .q-calendar-cell-content.q-calendar-today{color:var(--awds-datepicker-today-in-range-color, inherit)}.q-month-view-table .q-calendar-cell-container:last-child{padding-right:0}.q-month-view-table .q-calendar-cell-container .q-calendar-cell{background:none;text-align:center;outline:none;margin:0;-webkit-user-select:none;user-select:none}.q-month-view-table .q-calendar-cell-container .q-calendar-cell:not(:disabled):hover .q-calendar-cell-content:not(.q-calendar-selected){background:var(--awds-datepicker-hover-day-container-background, color-mix(in srgb, var(--ads-color-primary-500) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell:not(:disabled):active .q-calendar-cell-content:not(.q-calendar-selected){background:var(--awds-datepicker-pressed-day-container-background, color-mix(in srgb, var(--ads-color-primary-500) calc(var(--ads-color-state-neutral-background-pressed-complement) * 100%), rgb(from var(--ads-color-state-neutral-background-pressed) r g b/100%) calc((1 - var(--ads-color-state-neutral-background-pressed-complement)) * 100%)));color:var(--awds-datepicker-selected-day-container-color, var(--ads-color-primary-contrast-600))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range:before{width:100%;background:var(--awds-datepicker-range-background, var(--ads-color-primary-100));z-index:-1}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-start:before{left:var(--awds-datepicker-range-start-offset, var(--ads-size-nano));background-position:center;border-top-left-radius:var(--awds-datepicker-range-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-start-left-radius, var(--ads-border-radius-xl));border-top-right-radius:var(--awds-datepicker-range-start-right-radius, 0);border-bottom-right-radius:var(--awds-datepicker-range-start-right-radius, 0)}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-end:before{background-position:center;width:var(--awds-datepicker-range-end-width, var(--ads-size-m));border-top-left-radius:var(--awds-datepicker-range-end-left-radius, 0);border-bottom-left-radius:var(--awds-datepicker-range-end-left-radius, 0);border-top-right-radius:var(--awds-datepicker-range-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-end-right-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-row-start:before{background-position:center;border-top-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-row-end:before{background-position:center;border-top-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-end.q-calendar-row-start:before{left:var(--awds-datepicker-range-start-offset, var(--ads-size-nano))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-start.q-calendar-row-end:before,.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-end.q-calendar-row-start:before{left:0;width:var(--awds-datepicker-range-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview:before{background:var(--awds-datepicker-range-preview-background, none);border-top:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-bottom:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));width:var(--awds-datepicker-range-preview-width, 96%);z-index:-1}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-row-start:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-preview-start:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-preview-end:before{border-right:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-row-start.q-calendar-preview-end:before{left:0;border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-row-end.q-calendar-preview-start:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell:before{content:\"\";position:absolute;left:0;z-index:0;height:var(--awds-datepicker-range-height, var(--ads-size-m));width:100%}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;z-index:1;display:flex;align-items:center;justify-content:center;background:var(--awds-datepicker-day-cell-background, transparent)}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content.q-calendar-today:after{position:absolute;content:var(--awds-datepicker-today-indicator-content, \"\");border-radius:var(--ads-border-radius-xl);height:var(--ads-size-nano);width:var(--ads-size-nano);bottom:var(--ads-size-nano);background:var(--awds-datepicker-today-indicator-background, var(--ads-color-primary-500))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content.q-calendar-selected{background:var(--awds-datepicker-selected-day-container-background, var(--ads-color-primary-500));color:var(--awds-datepicker-selected-day-container-color, var(--ads-color-primary-contrast-600));border:var(--awds-datepicker-selected-day-container-border)}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range:not(.q-calendar-range-start):not(.q-calendar-range-end) .q-calendar-selected{background:var(--awds-datepicker-selected-day-container-background, color-mix(in srgb, var(--ads-color-primary-500) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-month-view-table .q-calendar-cell-container:first-child .q-calendar-in-preview:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container:first-child .q-calendar-in-range:before{background-position:center;border-top-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl));left:0}.q-month-view-table .q-calendar-cell-container:last-child .q-calendar-in-preview:before{border-right:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-width, 96%)}.q-month-view-table .q-calendar-cell-container:last-child .q-calendar-in-range:before{background-position:center;border-top-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl));left:0}.q-month-view-table .q-calendar-cell-container:last-child .q-calendar-row-end:before{width:var(--awds-datepicker-range-end-width, var(--ads-size-m))}.q-calendar-table-header th{color:var(--awds-datepicker-weekday-container-color, var(--ads-color-body-contrast-400));padding-right:var(--awds-datepicker-weekday-container-gap, var(--ads-size-micro));font-weight:inherit;text-align:center}.q-calendar-table-header th:last-child{padding-right:0}.q-calendar-table-header th.q-calendar-disabled{color:var(--awds-datepicker-disabled-weekday-container-color, var(--ads-color-body-400))}\n"], dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: i1.TranslocoDirective, selector: "[transloco]", inputs: ["transloco", "translocoParams", "translocoScope", "translocoRead", "translocoPrefix", "translocoLang", "translocoLoadingTpl"] }, { kind: "component", type: QCalendarBodyComponent, selector: "[q-calendar-body]", inputs: ["todayValue", "numCols", "startValue", "endValue", "cellAspectRatio", "isRange", "calendarLocation", "minDate", "maxDate", "disabledDates", "disableWeekends", "rows"], outputs: ["selectedValueChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QMonthViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-month-view', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [NgFor, TranslocoModule, QCalendarBodyComponent], providers: [QDestroyService, MISSING_KEY_HANDLER, ALLSPARK_SCOPE], template: "<ng-container *transloco=\"let t\">\n  <table class=\"q-month-view-table\" role=\"grid\" [attr.aria-labelledby]=\"monthViewId\">\n    <thead class=\"q-calendar-table-header\">\n      <tr>\n        <th\n          *ngFor=\"let weekDay of _weekDays\"\n          scope=\"col\"\n          [class.q-calendar-disabled]=\"_disableWeekends && _isWeekend(weekDay)\">\n          {{ t('allspark.datepicker.weekdays.short.' + weekDay) }}\n        </th>\n      </tr>\n    </thead>\n    <tbody\n      q-calendar-body\n      role=\"rowgroup\"\n      [rows]=\"_weeks\"\n      [todayValue]=\"_todayDate\"\n      [isRange]=\"_isRange\"\n      [startValue]=\"_rangeStart\"\n      [endValue]=\"_rangeEnd\"\n      [minDate]=\"minDate\"\n      [maxDate]=\"maxDate\"\n      [disabledDates]=\"_disabledDates\"\n      [disableWeekends]=\"_disableWeekends\"\n      [calendarLocation]=\"calendarLocation\"\n      (selectedValueChange)=\"_dateSelected($event)\"></tbody>\n  </table>\n</ng-container>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-month-view-table{border-spacing:0;border-collapse:collapse;width:100%;table-layout:auto}.q-month-view-table .q-calendar-cell-container{padding-right:var(--awds-datepicker-day-container-gap, var(--ads-size-micro))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content.q-calendar-today{background:var(--awds-datepicker-today-background, transparent);color:var(--awds-datepicker-today-color, var(--ads-color-primary-contrast-100))}.q-month-view-table .q-calendar-cell-container .q-calendar-in-range .q-calendar-cell-content.q-calendar-today,.q-month-view-table .q-calendar-cell-container .q-calendar-in-preview .q-calendar-cell-content.q-calendar-today{color:var(--awds-datepicker-today-in-range-color, inherit)}.q-month-view-table .q-calendar-cell-container:last-child{padding-right:0}.q-month-view-table .q-calendar-cell-container .q-calendar-cell{background:none;text-align:center;outline:none;margin:0;-webkit-user-select:none;user-select:none}.q-month-view-table .q-calendar-cell-container .q-calendar-cell:not(:disabled):hover .q-calendar-cell-content:not(.q-calendar-selected){background:var(--awds-datepicker-hover-day-container-background, color-mix(in srgb, var(--ads-color-primary-500) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell:not(:disabled):active .q-calendar-cell-content:not(.q-calendar-selected){background:var(--awds-datepicker-pressed-day-container-background, color-mix(in srgb, var(--ads-color-primary-500) calc(var(--ads-color-state-neutral-background-pressed-complement) * 100%), rgb(from var(--ads-color-state-neutral-background-pressed) r g b/100%) calc((1 - var(--ads-color-state-neutral-background-pressed-complement)) * 100%)));color:var(--awds-datepicker-selected-day-container-color, var(--ads-color-primary-contrast-600))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range:before{width:100%;background:var(--awds-datepicker-range-background, var(--ads-color-primary-100));z-index:-1}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-start:before{left:var(--awds-datepicker-range-start-offset, var(--ads-size-nano));background-position:center;border-top-left-radius:var(--awds-datepicker-range-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-start-left-radius, var(--ads-border-radius-xl));border-top-right-radius:var(--awds-datepicker-range-start-right-radius, 0);border-bottom-right-radius:var(--awds-datepicker-range-start-right-radius, 0)}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-end:before{background-position:center;width:var(--awds-datepicker-range-end-width, var(--ads-size-m));border-top-left-radius:var(--awds-datepicker-range-end-left-radius, 0);border-bottom-left-radius:var(--awds-datepicker-range-end-left-radius, 0);border-top-right-radius:var(--awds-datepicker-range-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-end-right-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-row-start:before{background-position:center;border-top-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-row-end:before{background-position:center;border-top-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-end.q-calendar-row-start:before{left:var(--awds-datepicker-range-start-offset, var(--ads-size-nano))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-start.q-calendar-row-end:before,.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range.q-calendar-range-end.q-calendar-row-start:before{left:0;width:var(--awds-datepicker-range-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview:before{background:var(--awds-datepicker-range-preview-background, none);border-top:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-bottom:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));width:var(--awds-datepicker-range-preview-width, 96%);z-index:-1}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-row-start:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-preview-start:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-preview-end:before{border-right:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-row-start.q-calendar-preview-end:before{left:0;border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-preview.q-calendar-row-end.q-calendar-preview-start:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-end-width, var(--ads-size-m))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell:before{content:\"\";position:absolute;left:0;z-index:0;height:var(--awds-datepicker-range-height, var(--ads-size-m));width:100%}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;z-index:1;display:flex;align-items:center;justify-content:center;background:var(--awds-datepicker-day-cell-background, transparent)}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content.q-calendar-today:after{position:absolute;content:var(--awds-datepicker-today-indicator-content, \"\");border-radius:var(--ads-border-radius-xl);height:var(--ads-size-nano);width:var(--ads-size-nano);bottom:var(--ads-size-nano);background:var(--awds-datepicker-today-indicator-background, var(--ads-color-primary-500))}.q-month-view-table .q-calendar-cell-container .q-calendar-cell-content.q-calendar-selected{background:var(--awds-datepicker-selected-day-container-background, var(--ads-color-primary-500));color:var(--awds-datepicker-selected-day-container-color, var(--ads-color-primary-contrast-600));border:var(--awds-datepicker-selected-day-container-border)}.q-month-view-table .q-calendar-cell-container .q-calendar-cell.q-calendar-in-range:not(.q-calendar-range-start):not(.q-calendar-range-end) .q-calendar-selected{background:var(--awds-datepicker-selected-day-container-background, color-mix(in srgb, var(--ads-color-primary-500) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-month-view-table .q-calendar-cell-container:first-child .q-calendar-in-preview:before{border-left:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-preview-start-left-radius, var(--ads-border-radius-xl))}.q-month-view-table .q-calendar-cell-container:first-child .q-calendar-in-range:before{background-position:center;border-top-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl));border-bottom-left-radius:var(--awds-datepicker-range-row-start-left-radius, var(--ads-border-radius-xl));left:0}.q-month-view-table .q-calendar-cell-container:last-child .q-calendar-in-preview:before{border-right:var(--awds-datepicker-range-preview-border, var(--ads-border-width-hairline) dashed var(--ads-color-body-500));border-top-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-preview-end-right-radius, var(--ads-border-radius-xl));width:var(--awds-datepicker-range-preview-width, 96%)}.q-month-view-table .q-calendar-cell-container:last-child .q-calendar-in-range:before{background-position:center;border-top-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl));border-bottom-right-radius:var(--awds-datepicker-range-row-end-right-radius, var(--ads-border-radius-xl));left:0}.q-month-view-table .q-calendar-cell-container:last-child .q-calendar-row-end:before{width:var(--awds-datepicker-range-end-width, var(--ads-size-m))}.q-calendar-table-header th{color:var(--awds-datepicker-weekday-container-color, var(--ads-color-body-contrast-400));padding-right:var(--awds-datepicker-weekday-container-gap, var(--ads-size-micro));font-weight:inherit;text-align:center}.q-calendar-table-header th:last-child{padding-right:0}.q-calendar-table-header th.q-calendar-disabled{color:var(--awds-datepicker-disabled-weekday-container-color, var(--ads-color-body-400))}\n"] }]
        }], ctorParameters: () => [], propDecorators: { daySelected: [{
                type: Output
            }], activeDateChange: [{
                type: Output
            }], calendarLocation: [{
                type: Input
            }], monthViewId: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });

const BOX_SHADOW_CLASSES = {
    TOP: 'inset 0 8px 8px -8px rgba(0, 0, 0, 0.08)',
    BOTTOM: 'inset 0 -8px 8px -8px rgba(0, 0, 0, 0.08)',
};
let nextUniqueId = 0;
class QCalendarComponent {
    selectedChange = new EventEmitter();
    _userSelection = new EventEmitter();
    yearSelected = new EventEmitter();
    monthSelected = new EventEmitter();
    monthChangedByArrow = new EventEmitter();
    viewChanged = new EventEmitter(true);
    calendarLocation = 'left';
    isMobile = false;
    displaySingleCalendar = false;
    selected = null;
    minDate = null;
    maxDate = null;
    previousMonthButtonAriaLabel = '';
    nextMonthButtonAriaLabel = '';
    get currentView() {
        return this._currentView;
    }
    set currentView(value) {
        if (this._currentView !== value) {
            this._currentView = value;
            this.viewChanged.emit(value);
        }
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        this._activeDate = value;
        this._cdr.markForCheck();
    }
    hostClass = 'q-calendar';
    calendarHeaderComponentRef;
    multiYearViewId = `multi-year-view-header-${nextUniqueId++}`;
    monthViewId = `month-view-header-${nextUniqueId++}`;
    _datepickerService = inject(DatepickerService);
    _boxShadowClass = 'none';
    _boxShadowSubject$ = new BehaviorSubject(this._boxShadowClass);
    boxShadow$ = this._boxShadowSubject$.asObservable();
    _currentView = 'month';
    _activeDate;
    _destroy$ = inject(QDestroyService);
    _dateAdapter = inject(DateAdapter);
    _cdr = inject(ChangeDetectorRef);
    ngAfterContentInit() {
        const activeDateObservable = this.calendarLocation === 'left'
            ? this._datepickerService.activeDateFirstCalendar$
            : this._datepickerService.activeDateSecondCalendar$;
        activeDateObservable.pipe(takeUntil(this._destroy$)).subscribe((date) => {
            this.activeDate = date;
        });
    }
    _getSelectedYear() {
        if (this.selected instanceof DateRange) {
            return null;
        }
        return this.selected?.getFullYear() || null;
    }
    _changeMonth(delta) {
        this.monthChangedByArrow.emit(delta);
    }
    _dateSelected(event) {
        const date = event.value;
        if (this.selected instanceof DateRange ||
            (date && !this._dateAdapter.sameDate(date, this.selected))) {
            this.selectedChange.emit(date);
        }
    }
    _yearSelectedInMultiYearView(year) {
        const yearAsDate = new Date(year, 6, 1);
        this.yearSelected.emit(yearAsDate);
        this._updateActiveDates(yearAsDate);
    }
    _onMonthSelected(month) {
        this.monthSelected.emit(month);
        this._updateActiveDates(month);
    }
    _onYearSelected(year) {
        this.yearSelected.emit(year);
        this._updateActiveDates(year);
    }
    _updateActiveDates(date) {
        this._datepickerService.updateActiveDates(this.calendarLocation, date);
    }
    _calculateBoxShadows(el) {
        if (!el)
            return;
        const element = el;
        const showTopShadow = element.scrollTop > 0;
        const scrolledToBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
        const showBottomShadow = element.scrollHeight > element.clientHeight && !scrolledToBottom;
        const showTopAndBottomShadow = showTopShadow && showBottomShadow;
        if (showTopAndBottomShadow) {
            this._boxShadowClass = `${BOX_SHADOW_CLASSES.TOP}, ${BOX_SHADOW_CLASSES.BOTTOM}`;
        }
        else {
            this._boxShadowClass = showTopShadow
                ? BOX_SHADOW_CLASSES.TOP
                : showBottomShadow
                    ? BOX_SHADOW_CLASSES.BOTTOM
                    : 'none';
        }
        this._boxShadowSubject$.next(this._boxShadowClass);
    }
    _setCalendarHeaderComponentFocus() {
        this.calendarHeaderComponentRef?._setFocus();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCalendarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QCalendarComponent, isStandalone: true, selector: "q-calendar", inputs: { calendarLocation: "calendarLocation", isMobile: ["isMobile", "isMobile", booleanAttribute], displaySingleCalendar: ["displaySingleCalendar", "displaySingleCalendar", booleanAttribute], selected: "selected", minDate: "minDate", maxDate: "maxDate", previousMonthButtonAriaLabel: "previousMonthButtonAriaLabel", nextMonthButtonAriaLabel: "nextMonthButtonAriaLabel", currentView: "currentView", activeDate: "activeDate" }, outputs: { selectedChange: "selectedChange", _userSelection: "_userSelection", yearSelected: "yearSelected", monthSelected: "monthSelected", monthChangedByArrow: "monthChangedByArrow", viewChanged: "viewChanged" }, host: { properties: { "class": "this.hostClass" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "calendarHeaderComponentRef", first: true, predicate: QCalendarHeaderComponent, descendants: true }], ngImport: i0, template: "<q-calendar-header\n  [activeDate]=\"activeDate\"\n  [currentView]=\"currentView\"\n  [maxDate]=\"maxDate\"\n  [minDate]=\"minDate\"\n  [isMobile]=\"isMobile\"\n  [displaySingleCalendar]=\"displaySingleCalendar\"\n  [calendarLocation]=\"calendarLocation\"\n  [previousMonthButtonAriaLabel]=\"previousMonthButtonAriaLabel\"\n  [nextMonthButtonAriaLabel]=\"nextMonthButtonAriaLabel\"\n  (previousClicked)=\"_changeMonth(-1)\"\n  (nextClicked)=\"_changeMonth(1)\"\n  (monthSelected)=\"_onMonthSelected($event)\"\n  (yearSelected)=\"_onYearSelected($event)\"\n  [monthViewId]=\"monthViewId\"\n  [multiYearViewId]=\"multiYearViewId\" />\n\n<div\n  class=\"q-calendar-content q-calendar-content-{{ currentView }}\"\n  [style.box-shadow]=\"boxShadow$ | async\"\n  (scroll)=\"_calculateBoxShadows($event.target)\">\n  <q-month-view\n    [selected]=\"selected\"\n    [maxDate]=\"maxDate\"\n    [minDate]=\"minDate\"\n    [(activeDate)]=\"activeDate\"\n    [monthViewId]=\"monthViewId\"\n    [calendarLocation]=\"calendarLocation\"\n    [attr.data-qt]=\"'q-calendar-month-view'\"\n    (daySelected)=\"_dateSelected($event)\" />\n</div>\n", styles: [".q-calendar{display:flex;flex-direction:column;z-index:1}.q-calendar-content{display:flex;justify-content:center}.q-calendar-content-multi-year{overflow-y:scroll}.q-calendar-content:has(q-multi-year-view){padding:0}q-month-view:focus,q-month-view:focus-visible{outline:none}\n"], dependencies: [{ kind: "component", type: QCalendarHeaderComponent, selector: "q-calendar-header", inputs: ["isMobile", "displaySingleCalendar", "currentView", "calendarLocation", "activeDate", "minDate", "maxDate", "previousMonthButtonAriaLabel", "nextMonthButtonAriaLabel", "multiYearViewId", "monthViewId"], outputs: ["previousClicked", "nextClicked", "monthSelected", "yearSelected"] }, { kind: "component", type: QMonthViewComponent, selector: "q-month-view", inputs: ["calendarLocation", "monthViewId", "minDate", "maxDate", "activeDate", "selected"], outputs: ["daySelected", "activeDateChange"] }, { kind: "pipe", type: AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-calendar', imports: [AsyncPipe, QCalendarHeaderComponent, QMonthViewComponent], providers: [QDestroyService], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<q-calendar-header\n  [activeDate]=\"activeDate\"\n  [currentView]=\"currentView\"\n  [maxDate]=\"maxDate\"\n  [minDate]=\"minDate\"\n  [isMobile]=\"isMobile\"\n  [displaySingleCalendar]=\"displaySingleCalendar\"\n  [calendarLocation]=\"calendarLocation\"\n  [previousMonthButtonAriaLabel]=\"previousMonthButtonAriaLabel\"\n  [nextMonthButtonAriaLabel]=\"nextMonthButtonAriaLabel\"\n  (previousClicked)=\"_changeMonth(-1)\"\n  (nextClicked)=\"_changeMonth(1)\"\n  (monthSelected)=\"_onMonthSelected($event)\"\n  (yearSelected)=\"_onYearSelected($event)\"\n  [monthViewId]=\"monthViewId\"\n  [multiYearViewId]=\"multiYearViewId\" />\n\n<div\n  class=\"q-calendar-content q-calendar-content-{{ currentView }}\"\n  [style.box-shadow]=\"boxShadow$ | async\"\n  (scroll)=\"_calculateBoxShadows($event.target)\">\n  <q-month-view\n    [selected]=\"selected\"\n    [maxDate]=\"maxDate\"\n    [minDate]=\"minDate\"\n    [(activeDate)]=\"activeDate\"\n    [monthViewId]=\"monthViewId\"\n    [calendarLocation]=\"calendarLocation\"\n    [attr.data-qt]=\"'q-calendar-month-view'\"\n    (daySelected)=\"_dateSelected($event)\" />\n</div>\n", styles: [".q-calendar{display:flex;flex-direction:column;z-index:1}.q-calendar-content{display:flex;justify-content:center}.q-calendar-content-multi-year{overflow-y:scroll}.q-calendar-content:has(q-multi-year-view){padding:0}q-month-view:focus,q-month-view:focus-visible{outline:none}\n"] }]
        }], propDecorators: { selectedChange: [{
                type: Output
            }], _userSelection: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }], monthChangedByArrow: [{
                type: Output
            }], viewChanged: [{
                type: Output
            }], calendarLocation: [{
                type: Input
            }], isMobile: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], displaySingleCalendar: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selected: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], previousMonthButtonAriaLabel: [{
                type: Input
            }], nextMonthButtonAriaLabel: [{
                type: Input
            }], currentView: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], calendarHeaderComponentRef: [{
                type: ViewChild,
                args: [QCalendarHeaderComponent]
            }] } });

class QDatePickerComponent {
    clearButtonClicked = new EventEmitter();
    doneButtonClicked = new EventEmitter();
    valueChanged = new EventEmitter();
    viewChanged = new EventEmitter(true);
    startAt = null;
    displayDoneButton = true;
    displayClearButton = true;
    displaySingleCalendar = false;
    mobileBreakpoint = 599;
    ariaLabel = null;
    clearButtonAriaLabel = '';
    doneButtonAriaLabel = '';
    previousMonthButtonAriaLabel = '';
    nextMonthButtonAriaLabel = '';
    dataQt = 'q-datepicker';
    get disableWeekends() {
        return this._disableWeekends;
    }
    set disableWeekends(value) {
        this._disableWeekends = value;
        this._datepickerService.updateDisableWeekends(value);
    }
    get disabledDates() {
        return this._disabledDates;
    }
    set disabledDates(value) {
        this._disabledDates = value;
        this._datepickerService.updateDisabledDates(value);
    }
    get isRangePicker() {
        return this._isRangePicker;
    }
    set isRangePicker(value) {
        this._isRangePicker = value;
        this._updateSelection();
    }
    get displayLastDisabledMonth() {
        return this._displayLastDisabledMonth;
    }
    set displayLastDisabledMonth(value) {
        if (this._displayLastDisabledMonth !== value) {
            this._displayLastDisabledMonth = value;
            this._init();
        }
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        if (!this._dateAdapter.sameDate(value, this._minDate)) {
            this._minDate = value;
        }
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        if (!this._dateAdapter.sameDate(value, this._maxDate)) {
            this._maxDate = value;
        }
    }
    set isMobile(value) {
        if (this._isMobile !== value) {
            this._isMobile = value;
            this._isReadyToScroll.set(false);
            this._init();
        }
    }
    get isMobile() {
        return this._isMobile;
    }
    hostClass = 'q-datepicker';
    ariaLabelAttr = null;
    get isFullCalendarView() {
        return (!this.isMobile &&
            !this.displaySingleCalendar &&
            this._currentViewFirstCalendar !== 'multi-year');
    }
    viewport;
    _onBlur = () => this._onTouched();
    _activeDateFirstCalendar = null;
    _activeDateSecondCalendar = null;
    _selection = null;
    _currentViewFirstCalendar = 'month';
    _currentViewSecondCalendar = 'month';
    _calendarList = [];
    _isMobile = false;
    _isReadyToScroll = signal(false, ...(ngDevMode ? [{ debugName: "_isReadyToScroll" }] : []));
    _onChangeFn = voidFn;
    _onTouched = voidFn;
    _datepickerService = inject(DatepickerService);
    _controlAccessorValue = null;
    _isRangePicker = false;
    _displayLastDisabledMonth = false;
    _minDate = null;
    _maxDate = null;
    _disableWeekends = false;
    _disabledDates = [];
    _destroy$ = inject(QDestroyService);
    _dateAdapter = inject(DateAdapter);
    _breakpointObserver = inject(BreakpointObserver);
    _cdr = inject(ChangeDetectorRef);
    _translocoService = inject(TranslocoService);
    constructor() {
        effect(() => {
            if (this._isReadyToScroll())
                this._init();
        });
    }
    ngOnInit() {
        this._breakpointObserver
            .observe([`(max-width: ${this.mobileBreakpoint}px)`])
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            this.isMobile = result.matches;
            this._cdr.markForCheck();
        });
        this._calendarList = this._generateCalendarList();
        this._init();
        this._datepickerService.selection$
            .pipe(takeUntil(this._destroy$))
            .subscribe((selection) => {
            this._selection = selection;
        });
        this.ariaLabelAttr = this.ariaLabel;
        this._translocoService
            .selectTranslate('datepicker.chooseDate', {}, 'allspark')
            .pipe(takeUntil(this._destroy$))
            .subscribe((translation) => {
            this.ariaLabelAttr = this.ariaLabel || translation;
        });
    }
    createDate(year, month, day) {
        return new Date(year, month, day);
    }
    _generateCalendarList() {
        if (this.minDate && this.maxDate) {
            return this._dateAdapter.getMonthsInRange(this.minDate, this.maxDate);
        }
        else {
            const now = new Date();
            const min = new Date(now.getFullYear(), now.getMonth() - 1200, 1);
            const max = new Date(now.getFullYear(), now.getMonth() + 1200, 1);
            return this._dateAdapter.getMonthsInRange(min, max);
        }
    }
    _onScrolledIndexChange() {
        if (!this._isReadyToScroll())
            this._isReadyToScroll.set(true);
    }
    _addCalendar() {
        const last = this._calendarList[this._calendarList.length - 1];
        let nextMonth = last.month + 1;
        let nextYear = last.year;
        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }
        this._calendarList.push({ month: nextMonth, year: nextYear });
        this.viewport?.checkViewportSize();
    }
    _scrollToMonthYear(month, year) {
        const index = this._calendarList.findIndex((cal) => cal.month === month && cal.year === year);
        if (index >= 0 && this.viewport) {
            this.viewport.scrollToIndex(index, 'auto');
        }
    }
    _yearSelected(date) {
        this._scrollToMonthYear(date.getMonth(), date.getFullYear());
    }
    _onMonthSelected(date) {
        this._scrollToMonthYear(date.getMonth(), date.getFullYear());
    }
    _onClearClick() {
        this._clearSelection();
        this.clearButtonClicked.emit();
    }
    _clearSelection() {
        if (this._controlAccessorValue &&
            this._dateAdapter.isValidDateObject(this._controlAccessorValue) &&
            !this._dateAdapter.sameDateObject(this._controlAccessorValue, this._datepickerService.selection)) {
            this._datepickerService.updateSelection(this._controlAccessorValue);
            if (!this.displayDoneButton) {
                this._updateSelectedValue();
            }
            this._init();
        }
        else {
            this._updateSelection(null);
            this._onSelectedChange(null);
            this._controlAccessorValue = null;
            this._setDatepickerVisibilityToDate();
        }
    }
    _init() {
        this._updateSelection(this._datepickerService.selectedValue);
        if (this._currentViewFirstCalendar === 'multi-year')
            return;
        if (this._isRange() &&
            this._dateAdapter.isValid(this._datepickerService.selectedValue?.start)) {
            const leftCalendarActiveDate = this._datepickerService.selectedValue?.start;
            this._setDatepickerVisibilityToDate(leftCalendarActiveDate);
        }
        else if (!this._isRange() &&
            this._dateAdapter.isValid(this._datepickerService.selectedValue)) {
            const leftCalendarActiveDate = this._datepickerService.selectedValue;
            this._setDatepickerVisibilityToDate(leftCalendarActiveDate);
        }
        else {
            this._setDatepickerVisibilityToDate();
        }
    }
    _reset() {
        this._currentViewFirstCalendar = this._currentViewSecondCalendar = 'month';
        this._activeDateFirstCalendar = null;
        this._activeDateSecondCalendar = null;
        this._clearSelection();
        this._datepickerService.updateSelectedValue(null);
        this._cdr.markForCheck();
        this._init();
    }
    _onMonthChangedByArrow(delta) {
        this._datepickerService.shiftActiveDatesByDelta(delta);
    }
    _onDoneClick() {
        this._updateSelectedValue();
        this.doneButtonClicked.emit();
    }
    _isRange() {
        return this._selection instanceof DateRange;
    }
    _getSelected() {
        return this._selection;
    }
    _onYearSelected(date) {
        if (this._currentViewFirstCalendar !== 'multi-year')
            return;
        this._datepickerService.updateSelection(date);
        if (!this.displayDoneButton) {
            this._updateSelectedValue();
        }
    }
    _onSelectedChange(date) {
        if (this._isRange()) {
            let { start, end } = this._selection;
            if (start === null) {
                start = date;
            }
            else if (end === null && date && this._dateAdapter.compareDate(date, start) >= 0) {
                end = date;
            }
            else if (date) {
                start = date;
                end = null;
            }
            this._datepickerService.updateSelection(new DateRange(start, end));
        }
        else {
            this._datepickerService.updateSelection(date);
        }
        if (!this.displayDoneButton) {
            this._updateSelectedValue();
        }
    }
    _viewChanged(view, source, calendar) {
        if (source === 'firstCalendar') {
            this._currentViewFirstCalendar = view;
        }
        else if (source === 'secondCalendar') {
            this._currentViewSecondCalendar = view;
        }
        if (view === 'month') {
            calendar?._setCalendarHeaderComponentFocus();
        }
        this.viewChanged.emit(view);
    }
    _showFirstCalendar() {
        return this._currentViewSecondCalendar === 'month';
    }
    _showSecondCalendar() {
        return (!this.isMobile && !this.displaySingleCalendar && this._currentViewFirstCalendar === 'month');
    }
    _showFooter() {
        const anyButtonEnabled = this.displayClearButton || this.displayDoneButton;
        return (this._currentViewFirstCalendar === 'month' &&
            this._currentViewSecondCalendar === 'month' &&
            anyButtonEnabled);
    }
    // #region ControlValueAccessor implementation
    /** @hidden */
    writeValue(value) {
        const oldSelection = this._selection;
        const sameValueAndOldSelection = this._dateAdapter.sameDateObject(value, oldSelection);
        this._datepickerService.updateSelectedValue(value);
        this._updateSelection(value);
        this._cdr.markForCheck();
        if (this._dateAdapter.isValidDateObject(value) && !sameValueAndOldSelection) {
            this._controlAccessorValue = value;
        }
        if (!sameValueAndOldSelection) {
            this._init();
        }
    }
    /** @hidden */
    registerOnChange(fn) {
        this._onChangeFn = fn;
    }
    /** @hidden */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // #endregion
    _updateSelection(value) {
        if (!value) {
            this._datepickerService.updateSelection(this.isRangePicker ? new DateRange(null, null) : null);
        }
        else {
            this._datepickerService.updateSelection(value);
        }
    }
    _updateSelectedValue() {
        this._onChangeFn(this._selection);
        this._datepickerService.updateSelectedValue(this._selection);
        this.valueChanged.emit(this._selection);
    }
    _setDatepickerVisibilityToDate(date) {
        let showDate = date || this.startAt || new Date();
        let startOfNextMonth = this._datepickerService.getFirstDayOfNextMonth(showDate);
        if (!date && this.maxDate && this._dateAdapter.compareDate(showDate, this.maxDate) > 0) {
            showDate = this.maxDate;
            startOfNextMonth = this._datepickerService.getFirstDayOfNextMonth(showDate);
        }
        const source = this.isMobile ||
            this.displaySingleCalendar ||
            this.displayLastDisabledMonth ||
            !this.maxDate ||
            (this.maxDate && this._dateAdapter.compareDate(startOfNextMonth, this.maxDate) <= 0)
            ? 'left'
            : 'right';
        this._datepickerService.updateActiveDates(source, showDate);
        if (this.isMobile && showDate) {
            this._scrollToMonthYear(showDate.getMonth(), showDate.getFullYear());
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDatePickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QDatePickerComponent, isStandalone: true, selector: "q-datepicker", inputs: { startAt: "startAt", displayDoneButton: ["displayDoneButton", "displayDoneButton", booleanAttribute], displayClearButton: ["displayClearButton", "displayClearButton", booleanAttribute], displaySingleCalendar: ["displaySingleCalendar", "displaySingleCalendar", booleanAttribute], mobileBreakpoint: ["mobileBreakpoint", "mobileBreakpoint", numberAttribute], ariaLabel: ["aria-label", "ariaLabel"], clearButtonAriaLabel: "clearButtonAriaLabel", doneButtonAriaLabel: "doneButtonAriaLabel", previousMonthButtonAriaLabel: "previousMonthButtonAriaLabel", nextMonthButtonAriaLabel: "nextMonthButtonAriaLabel", dataQt: "dataQt", disableWeekends: ["disableWeekends", "disableWeekends", booleanAttribute], disabledDates: "disabledDates", isRangePicker: "isRangePicker", displayLastDisabledMonth: "displayLastDisabledMonth", minDate: "minDate", maxDate: "maxDate" }, outputs: { clearButtonClicked: "clearButtonClicked", doneButtonClicked: "doneButtonClicked", valueChanged: "valueChanged", viewChanged: "viewChanged" }, host: { listeners: { "blur": "_onBlur()" }, properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass", "attr.aria-label": "this.ariaLabelAttr", "class.q-datepicker-full": "this.isFullCalendarView" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QDatePickerComponent),
                multi: true,
            },
            DatepickerService,
            QDestroyService,
            MISSING_KEY_HANDLER,
            ALLSPARK_SCOPE,
        ], viewQueries: [{ propertyName: "viewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true }], ngImport: i0, template: "<ng-container *transloco=\"let t\">\n  @if (isMobile) {\n    <cdk-virtual-scroll-viewport\n      itemSize=\"340\"\n      class=\"q-datepicker-mobile-container\"\n      qScrollShadow\n      (scrolledIndexChange)=\"_onScrolledIndexChange()\">\n      <q-calendar\n        *cdkVirtualFor=\"let cal of _calendarList\"\n        [calendarLocation]=\"'left'\"\n        [isMobile]=\"isMobile\"\n        [selected]=\"_getSelected()\"\n        [activeDate]=\"createDate(cal.year, cal.month, 1)\"\n        [currentView]=\"_currentViewFirstCalendar\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (yearSelected)=\"_yearSelected($event)\"\n        (monthSelected)=\"_onMonthSelected($event)\"\n        (selectedChange)=\"_onSelectedChange($event)\">\n      </q-calendar>\n    </cdk-virtual-scroll-viewport>\n  } @else {\n    <q-calendar\n      #firstCalendar\n      *ngIf=\"_showFirstCalendar() || !isMobile\"\n      [calendarLocation]=\"'left'\"\n      [displaySingleCalendar]=\"displaySingleCalendar\"\n      [selected]=\"_getSelected()\"\n      [currentView]=\"_currentViewFirstCalendar\"\n      [minDate]=\"minDate\"\n      [maxDate]=\"maxDate\"\n      [previousMonthButtonAriaLabel]=\"previousMonthButtonAriaLabel\"\n      [nextMonthButtonAriaLabel]=\"nextMonthButtonAriaLabel\"\n      (selectedChange)=\"_onSelectedChange($event)\"\n      (yearSelected)=\"_onYearSelected($event)\"\n      (viewChanged)=\"_viewChanged($event, 'firstCalendar', firstCalendar)\"\n      (monthChangedByArrow)=\"_onMonthChangedByArrow($event)\" />\n\n    @if (_showSecondCalendar()) {\n      <q-calendar\n        #secondCalendar\n        [calendarLocation]=\"'right'\"\n        [displaySingleCalendar]=\"displaySingleCalendar\"\n        [selected]=\"_getSelected()\"\n        [currentView]=\"_currentViewSecondCalendar\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [previousMonthButtonAriaLabel]=\"previousMonthButtonAriaLabel\"\n        [nextMonthButtonAriaLabel]=\"nextMonthButtonAriaLabel\"\n        (selectedChange)=\"_onSelectedChange($event)\"\n        (viewChanged)=\"_viewChanged($event, 'secondCalendar', secondCalendar)\"\n        (monthChangedByArrow)=\"_onMonthChangedByArrow($event)\" />\n    }\n  }\n\n  @if (_showFooter()) {\n    <div class=\"q-datepicker-footer\" [class.q-datepicker-footer-mobile]=\"isMobile\">\n      @if (displayClearButton) {\n        <button\n          #clearButton\n          q-text-button\n          [variant]=\"'secondary'\"\n          [size]=\"'small'\"\n          [dataQt]=\"'q-datepicker-clear-button'\"\n          (click)=\"_onClearClick()\"\n          [attr.aria-label]=\"clearButtonAriaLabel || t('allspark.datepicker.actions.clear')\">\n          {{ t('allspark.datepicker.actions.clear') }}\n        </button>\n      }\n      @if (displayDoneButton) {\n        <button\n          #doneButton\n          q-text-button\n          [variant]=\"'secondary'\"\n          [size]=\"'small'\"\n          [dataQt]=\"'q-datepicker-done-button'\"\n          (click)=\"_onDoneClick()\"\n          [attr.aria-label]=\"doneButtonAriaLabel || t('allspark.datepicker.actions.done')\">\n          {{ t('allspark.datepicker.actions.done') }}\n        </button>\n      }\n    </div>\n  }\n</ng-container>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-datepicker{font-family:var(--awds-datepicker-container-font-family, var(--ads-font-family-body));font-size:var(--awds-datepicker-container-font-size, var(--ads-font-size-xs));font-style:var(--awds-datepicker-container-font-style, inherit);font-weight:var(--awds-datepicker-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-datepicker-container-letter-spacing, 0);line-height:var(--awds-datepicker-container-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-datepicker-container-text-transform, none);display:flex;flex-direction:column;background:var(--awds-datepicker-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-datepicker-container-backdrop-filter, none);backdrop-filter:var(--awds-datepicker-container-backdrop-filter, none);width:var(--awds-datepicker-container-width, fit-content);height:var(--awds-datepicker-container-height, fit-content);padding:var(--awds-datepicker-container-padding, 0 var(--ads-size-s));box-shadow:var(--awds-datepicker-container-box-shadow, none);border-radius:var(--awds-datepicker-container-border-radius, 0)}.q-datepicker .q-datepicker-mobile-container{display:flex;width:var(--awds-datepicker-mobile-container-width, 280px);height:var(--awds-datepicker-mobile-container-height, 70dvh);overflow-y:auto}.q-datepicker .q-datepicker-mobile-container .q-calendar{height:var(--awds-datepicker-mobile-calendar-height, 340px)}.q-datepicker .q-calendar:nth-child(2){grid-area:1/2/1/2}.q-datepicker .q-datepicker-footer{display:flex;justify-content:flex-end;align-items:center;height:var(--awds-datepicker-footer-height, 72px);padding:var(--awds-datepicker-footer-padding, 14px 0 var(--ads-size-s) 0);gap:var(--awds-datepicker-footer-gap, var(--ads-size-xxs));grid-area:2/1/2/1}.q-datepicker-full{display:grid;gap:var(--awds-datepicker-gap, 0 var(--ads-size-s))}.q-datepicker-full .q-datepicker-footer{grid-area:2/2/2/2}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: i1.TranslocoDirective, selector: "[transloco]", inputs: ["transloco", "translocoParams", "translocoScope", "translocoRead", "translocoPrefix", "translocoLang", "translocoLoadingTpl"] }, { kind: "component", type: QButtonComponent, selector: "    button[q-button],    button[q-text-button],    button[q-icon-button],  ", inputs: ["icon", "loadingText", "size", "variant", "iconPosition", "loading", "analyticsCssClassIdentifier", "dataQt", "disabled"] }, { kind: "component", type: QCalendarComponent, selector: "q-calendar", inputs: ["calendarLocation", "isMobile", "displaySingleCalendar", "selected", "minDate", "maxDate", "previousMonthButtonAriaLabel", "nextMonthButtonAriaLabel", "currentView", "activeDate"], outputs: ["selectedChange", "_userSelection", "yearSelected", "monthSelected", "monthChangedByArrow", "viewChanged"] }, { kind: "ngmodule", type: A11yModule }, { kind: "ngmodule", type: ScrollingModule }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "directive", type: QScrollShadowDirective, selector: "[qScrollShadow]", inputs: ["qScrollShadowAuditTimeMs", "qScrollShadowEnabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-datepicker', imports: [
                        NgIf,
                        TranslocoModule,
                        QButtonComponent,
                        QCalendarComponent,
                        A11yModule,
                        ScrollingModule,
                        QScrollShadowDirective,
                    ], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QDatePickerComponent),
                            multi: true,
                        },
                        DatepickerService,
                        QDestroyService,
                        MISSING_KEY_HANDLER,
                        ALLSPARK_SCOPE,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *transloco=\"let t\">\n  @if (isMobile) {\n    <cdk-virtual-scroll-viewport\n      itemSize=\"340\"\n      class=\"q-datepicker-mobile-container\"\n      qScrollShadow\n      (scrolledIndexChange)=\"_onScrolledIndexChange()\">\n      <q-calendar\n        *cdkVirtualFor=\"let cal of _calendarList\"\n        [calendarLocation]=\"'left'\"\n        [isMobile]=\"isMobile\"\n        [selected]=\"_getSelected()\"\n        [activeDate]=\"createDate(cal.year, cal.month, 1)\"\n        [currentView]=\"_currentViewFirstCalendar\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (yearSelected)=\"_yearSelected($event)\"\n        (monthSelected)=\"_onMonthSelected($event)\"\n        (selectedChange)=\"_onSelectedChange($event)\">\n      </q-calendar>\n    </cdk-virtual-scroll-viewport>\n  } @else {\n    <q-calendar\n      #firstCalendar\n      *ngIf=\"_showFirstCalendar() || !isMobile\"\n      [calendarLocation]=\"'left'\"\n      [displaySingleCalendar]=\"displaySingleCalendar\"\n      [selected]=\"_getSelected()\"\n      [currentView]=\"_currentViewFirstCalendar\"\n      [minDate]=\"minDate\"\n      [maxDate]=\"maxDate\"\n      [previousMonthButtonAriaLabel]=\"previousMonthButtonAriaLabel\"\n      [nextMonthButtonAriaLabel]=\"nextMonthButtonAriaLabel\"\n      (selectedChange)=\"_onSelectedChange($event)\"\n      (yearSelected)=\"_onYearSelected($event)\"\n      (viewChanged)=\"_viewChanged($event, 'firstCalendar', firstCalendar)\"\n      (monthChangedByArrow)=\"_onMonthChangedByArrow($event)\" />\n\n    @if (_showSecondCalendar()) {\n      <q-calendar\n        #secondCalendar\n        [calendarLocation]=\"'right'\"\n        [displaySingleCalendar]=\"displaySingleCalendar\"\n        [selected]=\"_getSelected()\"\n        [currentView]=\"_currentViewSecondCalendar\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [previousMonthButtonAriaLabel]=\"previousMonthButtonAriaLabel\"\n        [nextMonthButtonAriaLabel]=\"nextMonthButtonAriaLabel\"\n        (selectedChange)=\"_onSelectedChange($event)\"\n        (viewChanged)=\"_viewChanged($event, 'secondCalendar', secondCalendar)\"\n        (monthChangedByArrow)=\"_onMonthChangedByArrow($event)\" />\n    }\n  }\n\n  @if (_showFooter()) {\n    <div class=\"q-datepicker-footer\" [class.q-datepicker-footer-mobile]=\"isMobile\">\n      @if (displayClearButton) {\n        <button\n          #clearButton\n          q-text-button\n          [variant]=\"'secondary'\"\n          [size]=\"'small'\"\n          [dataQt]=\"'q-datepicker-clear-button'\"\n          (click)=\"_onClearClick()\"\n          [attr.aria-label]=\"clearButtonAriaLabel || t('allspark.datepicker.actions.clear')\">\n          {{ t('allspark.datepicker.actions.clear') }}\n        </button>\n      }\n      @if (displayDoneButton) {\n        <button\n          #doneButton\n          q-text-button\n          [variant]=\"'secondary'\"\n          [size]=\"'small'\"\n          [dataQt]=\"'q-datepicker-done-button'\"\n          (click)=\"_onDoneClick()\"\n          [attr.aria-label]=\"doneButtonAriaLabel || t('allspark.datepicker.actions.done')\">\n          {{ t('allspark.datepicker.actions.done') }}\n        </button>\n      }\n    </div>\n  }\n</ng-container>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-datepicker{font-family:var(--awds-datepicker-container-font-family, var(--ads-font-family-body));font-size:var(--awds-datepicker-container-font-size, var(--ads-font-size-xs));font-style:var(--awds-datepicker-container-font-style, inherit);font-weight:var(--awds-datepicker-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-datepicker-container-letter-spacing, 0);line-height:var(--awds-datepicker-container-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-datepicker-container-text-transform, none);display:flex;flex-direction:column;background:var(--awds-datepicker-container-background, var(--ads-color-body-100));-webkit-backdrop-filter:var(--awds-datepicker-container-backdrop-filter, none);backdrop-filter:var(--awds-datepicker-container-backdrop-filter, none);width:var(--awds-datepicker-container-width, fit-content);height:var(--awds-datepicker-container-height, fit-content);padding:var(--awds-datepicker-container-padding, 0 var(--ads-size-s));box-shadow:var(--awds-datepicker-container-box-shadow, none);border-radius:var(--awds-datepicker-container-border-radius, 0)}.q-datepicker .q-datepicker-mobile-container{display:flex;width:var(--awds-datepicker-mobile-container-width, 280px);height:var(--awds-datepicker-mobile-container-height, 70dvh);overflow-y:auto}.q-datepicker .q-datepicker-mobile-container .q-calendar{height:var(--awds-datepicker-mobile-calendar-height, 340px)}.q-datepicker .q-calendar:nth-child(2){grid-area:1/2/1/2}.q-datepicker .q-datepicker-footer{display:flex;justify-content:flex-end;align-items:center;height:var(--awds-datepicker-footer-height, 72px);padding:var(--awds-datepicker-footer-padding, 14px 0 var(--ads-size-s) 0);gap:var(--awds-datepicker-footer-gap, var(--ads-size-xxs));grid-area:2/1/2/1}.q-datepicker-full{display:grid;gap:var(--awds-datepicker-gap, 0 var(--ads-size-s))}.q-datepicker-full .q-datepicker-footer{grid-area:2/2/2/2}\n"] }]
        }], ctorParameters: () => [], propDecorators: { clearButtonClicked: [{
                type: Output
            }], doneButtonClicked: [{
                type: Output
            }], valueChanged: [{
                type: Output
            }], viewChanged: [{
                type: Output
            }], startAt: [{
                type: Input
            }], displayDoneButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], displayClearButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], displaySingleCalendar: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], mobileBreakpoint: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], clearButtonAriaLabel: [{
                type: Input
            }], doneButtonAriaLabel: [{
                type: Input
            }], previousMonthButtonAriaLabel: [{
                type: Input
            }], nextMonthButtonAriaLabel: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], disableWeekends: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabledDates: [{
                type: Input
            }], isRangePicker: [{
                type: Input
            }], displayLastDisabledMonth: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], ariaLabelAttr: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], isFullCalendarView: [{
                type: HostBinding,
                args: ['class.q-datepicker-full']
            }], viewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], _onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DateAdapter, DateRange, DatepickerService, QDatePickerComponent };
//# sourceMappingURL=questrade-allspark-angular-components-datepicker.mjs.map
