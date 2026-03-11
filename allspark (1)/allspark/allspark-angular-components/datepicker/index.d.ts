import * as i0 from '@angular/core';
import { OnChanges, EventEmitter, ElementRef, SimpleChanges, AfterContentInit, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ControlValueAccessor } from '@angular/forms';
import * as rxjs from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { QDropmenuSelectionChange } from '@questrade/allspark-angular-components/dropmenu';

declare class DateRange {
    readonly start: Date | null;
    readonly end: Date | null;
    constructor(start: Date | null, end: Date | null);
}

declare class DateAdapter {
    private readonly _translocoService;
    private _format;
    sameDate(first: Date | null, second: Date | null): boolean;
    sameDateObject(first: Date | DateRange | null, second: Date | DateRange | null): boolean;
    isValid(date: Date | null): boolean;
    isValidDateObject(date: Date | DateRange): boolean;
    compareDate(first: Date, second: Date): number;
    getNumDaysInMonth(date: Date): number;
    clampDate(date: Date, min?: Date | null, max?: Date | null): Date;
    isDateInstance(obj: unknown): boolean;
    getMonthName(date: Date, style?: 'long' | 'short' | 'narrow'): string;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Date): string;
    getMonthsInRange(minDate: Date, maxDate: Date): {
        month: number;
        year: number;
    }[];
    static ɵfac: i0.ɵɵFactoryDeclaration<DateAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateAdapter>;
}

type QCalendarLocation = 'left' | 'right';

declare class DatepickerService {
    private _preview;
    private _selectedValue;
    private _selection;
    private _activeDateFirstCalendar;
    private _activeDateSecondCalendar;
    private _disableWeekends;
    private _disabledDates;
    preview$: Observable<DateRange>;
    selectedValue$: Observable<Date | DateRange | null>;
    selection$: Observable<Date | DateRange | null>;
    activeDateFirstCalendar$: Observable<Date | null>;
    activeDateSecondCalendar$: Observable<Date | null>;
    disableWeekends$: Observable<boolean>;
    disabledDates$: Observable<Date[]>;
    updateDisableWeekends(value: boolean): void;
    updateDisabledDates(datesDisabled: Date[]): void;
    updatePreview(value: DateRange): void;
    updateSelection(value: Date | DateRange | null): void;
    updateSelectedValue(value: Date | DateRange | null): void;
    updateActiveDates(sourceCalendarLocation: QCalendarLocation, date: Date): void;
    shiftActiveDatesByDelta(delta: number): void;
    isValidSelection(isRange: boolean): boolean;
    getFirstDayOfNextMonth(date: Date): Date;
    get selectedValue(): Date | DateRange | null;
    get selection(): Date | DateRange | null;
    get activeDateFirstCalendar(): Date | null;
    get activeDateSecondCalendar(): Date | null;
    private _getLastDayOfMonth;
    private _createDateWithDelta;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatepickerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DatepickerService>;
}

type QCalendarView = 'month' | 'multi-year';

interface QCalendarUserEvent<D> {
    value: D;
    event: Event;
}

declare class QCalendarHeaderComponent implements OnChanges {
    readonly previousClicked: EventEmitter<Event>;
    readonly nextClicked: EventEmitter<Event>;
    readonly monthSelected: EventEmitter<Date>;
    readonly yearSelected: EventEmitter<Date>;
    isMobile: boolean;
    displaySingleCalendar: boolean;
    currentView: QCalendarView;
    calendarLocation: QCalendarLocation;
    activeDate: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
    previousMonthButtonAriaLabel: string;
    nextMonthButtonAriaLabel: string;
    multiYearViewId: string;
    monthViewId: string;
    calendarHeaderRef: ElementRef<HTMLElement>;
    private _yearOptions;
    private _monthNames;
    private _dateAdapter;
    private _iconRegistry;
    private _cdr;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    _isYearAndMonthSameOrAfterMaxDate(): boolean;
    _isYearAndMonthSameOrBeforeMinDate(): boolean;
    _onPreviousClicked(event: Event): void;
    _onNextClicked(event: Event): void;
    _setFocus(): void;
    private _setMonthNames;
    get monthNames(): {
        label: string;
        value: number;
        disabled: boolean;
    }[];
    get selectedMonthLabel(): string;
    get yearOptions(): {
        label: string;
        value: number;
        disabled: boolean;
    }[];
    private _generateYearOptions;
    private _setYearOptions;
    get showChevronLeft(): boolean;
    get showChevronRight(): boolean;
    get activeMonth(): number;
    get activeYear(): number;
    onMonthSelectionChange(event: QDropmenuSelectionChange<number>): void;
    onYearSelectionChange(event: QDropmenuSelectionChange<number>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QCalendarHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QCalendarHeaderComponent, "q-calendar-header", never, { "isMobile": { "alias": "isMobile"; "required": false; }; "displaySingleCalendar": { "alias": "displaySingleCalendar"; "required": false; }; "currentView": { "alias": "currentView"; "required": false; }; "calendarLocation": { "alias": "calendarLocation"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "previousMonthButtonAriaLabel": { "alias": "previousMonthButtonAriaLabel"; "required": false; }; "nextMonthButtonAriaLabel": { "alias": "nextMonthButtonAriaLabel"; "required": false; }; "multiYearViewId": { "alias": "multiYearViewId"; "required": false; }; "monthViewId": { "alias": "monthViewId"; "required": false; }; }, { "previousClicked": "previousClicked"; "nextClicked": "nextClicked"; "monthSelected": "monthSelected"; "yearSelected": "yearSelected"; }, never, never, true, never>;
    static ngAcceptInputType_isMobile: unknown;
    static ngAcceptInputType_displaySingleCalendar: unknown;
}

declare class QCalendarComponent implements AfterContentInit {
    readonly selectedChange: EventEmitter<Date | null>;
    readonly _userSelection: EventEmitter<QCalendarUserEvent<Date | null>>;
    readonly yearSelected: EventEmitter<Date>;
    readonly monthSelected: EventEmitter<Date>;
    readonly monthChangedByArrow: EventEmitter<number>;
    readonly viewChanged: EventEmitter<QCalendarView>;
    calendarLocation: QCalendarLocation;
    isMobile: boolean;
    displaySingleCalendar: boolean;
    selected: DateRange | Date | null;
    minDate: Date | null;
    maxDate: Date | null;
    previousMonthButtonAriaLabel: string;
    nextMonthButtonAriaLabel: string;
    get currentView(): QCalendarView;
    set currentView(value: QCalendarView);
    get activeDate(): Date;
    set activeDate(value: Date);
    hostClass: string;
    calendarHeaderComponentRef: QCalendarHeaderComponent;
    multiYearViewId: string;
    monthViewId: string;
    readonly _datepickerService: DatepickerService;
    private _boxShadowClass;
    readonly _boxShadowSubject$: BehaviorSubject<string>;
    boxShadow$: rxjs.Observable<string>;
    private _currentView;
    private _activeDate;
    private readonly _destroy$;
    private readonly _dateAdapter;
    private readonly _cdr;
    ngAfterContentInit(): void;
    _getSelectedYear(): number | null;
    _changeMonth(delta: number): void;
    _dateSelected(event: QCalendarUserEvent<Date | null>): void;
    _yearSelectedInMultiYearView(year: number): void;
    _onMonthSelected(month: Date): void;
    _onYearSelected(year: Date): void;
    _updateActiveDates(date: Date): void;
    _calculateBoxShadows(el: EventTarget | null): void;
    _setCalendarHeaderComponentFocus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QCalendarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QCalendarComponent, "q-calendar", never, { "calendarLocation": { "alias": "calendarLocation"; "required": false; }; "isMobile": { "alias": "isMobile"; "required": false; }; "displaySingleCalendar": { "alias": "displaySingleCalendar"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "previousMonthButtonAriaLabel": { "alias": "previousMonthButtonAriaLabel"; "required": false; }; "nextMonthButtonAriaLabel": { "alias": "nextMonthButtonAriaLabel"; "required": false; }; "currentView": { "alias": "currentView"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; }, { "selectedChange": "selectedChange"; "_userSelection": "_userSelection"; "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; "monthChangedByArrow": "monthChangedByArrow"; "viewChanged": "viewChanged"; }, never, never, true, never>;
    static ngAcceptInputType_isMobile: unknown;
    static ngAcceptInputType_displaySingleCalendar: unknown;
}

declare class QDatePickerComponent implements OnInit, ControlValueAccessor {
    readonly clearButtonClicked: EventEmitter<void>;
    readonly doneButtonClicked: EventEmitter<void>;
    readonly valueChanged: EventEmitter<Date | DateRange | null>;
    readonly viewChanged: EventEmitter<QCalendarView>;
    startAt: Date | null;
    displayDoneButton: boolean;
    displayClearButton: boolean;
    displaySingleCalendar: boolean;
    mobileBreakpoint: number;
    ariaLabel: string | null;
    clearButtonAriaLabel: string;
    doneButtonAriaLabel: string;
    previousMonthButtonAriaLabel: string;
    nextMonthButtonAriaLabel: string;
    dataQt: string;
    get disableWeekends(): boolean;
    set disableWeekends(value: boolean);
    get disabledDates(): Date[];
    set disabledDates(value: Date[]);
    get isRangePicker(): boolean;
    set isRangePicker(value: boolean);
    get displayLastDisabledMonth(): boolean;
    set displayLastDisabledMonth(value: boolean);
    get minDate(): Date | null;
    set minDate(value: Date | null);
    get maxDate(): Date | null;
    set maxDate(value: Date | null);
    set isMobile(value: boolean);
    get isMobile(): boolean;
    hostClass: string;
    ariaLabelAttr: string | null;
    get isFullCalendarView(): boolean;
    viewport?: CdkVirtualScrollViewport;
    _onBlur: () => void;
    _activeDateFirstCalendar: Date | null;
    _activeDateSecondCalendar: Date | null;
    _selection: Date | DateRange | null;
    _currentViewFirstCalendar: QCalendarView;
    _currentViewSecondCalendar: QCalendarView;
    _calendarList: {
        month: number;
        year: number;
    }[];
    _isMobile: boolean;
    _isReadyToScroll: i0.WritableSignal<boolean>;
    _onChangeFn: (_: Date | DateRange | null) => void;
    _onTouched: () => void;
    readonly _datepickerService: DatepickerService;
    private _controlAccessorValue;
    private _isRangePicker;
    private _displayLastDisabledMonth;
    private _minDate;
    private _maxDate;
    private _disableWeekends;
    private _disabledDates;
    private readonly _destroy$;
    private readonly _dateAdapter;
    private readonly _breakpointObserver;
    private readonly _cdr;
    private readonly _translocoService;
    constructor();
    ngOnInit(): void;
    createDate(year: number, month: number, day: number): Date;
    private _generateCalendarList;
    _onScrolledIndexChange(): void;
    _addCalendar(): void;
    _scrollToMonthYear(month: number, year: number): void;
    _yearSelected(date: Date): void;
    _onMonthSelected(date: Date): void;
    _onClearClick(): void;
    _clearSelection(): void;
    _init(): void;
    _reset(): void;
    _onMonthChangedByArrow(delta: number): void;
    _onDoneClick(): void;
    _isRange(): boolean;
    _getSelected(): Date | DateRange | null;
    _onYearSelected(date: Date | null): void;
    _onSelectedChange(date: Date | null): void;
    _viewChanged(view: QCalendarView, source: string, calendar?: QCalendarComponent): void;
    _showFirstCalendar(): boolean;
    _showSecondCalendar(): boolean;
    _showFooter(): boolean;
    /** @hidden */
    writeValue(value: DateRange | Date): void;
    /** @hidden */
    registerOnChange(fn: (_: DateRange | Date | null) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    private _updateSelection;
    private _updateSelectedValue;
    private _setDatepickerVisibilityToDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDatePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDatePickerComponent, "q-datepicker", never, { "startAt": { "alias": "startAt"; "required": false; }; "displayDoneButton": { "alias": "displayDoneButton"; "required": false; }; "displayClearButton": { "alias": "displayClearButton"; "required": false; }; "displaySingleCalendar": { "alias": "displaySingleCalendar"; "required": false; }; "mobileBreakpoint": { "alias": "mobileBreakpoint"; "required": false; }; "ariaLabel": { "alias": "aria-label"; "required": false; }; "clearButtonAriaLabel": { "alias": "clearButtonAriaLabel"; "required": false; }; "doneButtonAriaLabel": { "alias": "doneButtonAriaLabel"; "required": false; }; "previousMonthButtonAriaLabel": { "alias": "previousMonthButtonAriaLabel"; "required": false; }; "nextMonthButtonAriaLabel": { "alias": "nextMonthButtonAriaLabel"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "disableWeekends": { "alias": "disableWeekends"; "required": false; }; "disabledDates": { "alias": "disabledDates"; "required": false; }; "isRangePicker": { "alias": "isRangePicker"; "required": false; }; "displayLastDisabledMonth": { "alias": "displayLastDisabledMonth"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; }, { "clearButtonClicked": "clearButtonClicked"; "doneButtonClicked": "doneButtonClicked"; "valueChanged": "valueChanged"; "viewChanged": "viewChanged"; }, never, never, true, never>;
    static ngAcceptInputType_displayDoneButton: unknown;
    static ngAcceptInputType_displayClearButton: unknown;
    static ngAcceptInputType_displaySingleCalendar: unknown;
    static ngAcceptInputType_mobileBreakpoint: unknown;
    static ngAcceptInputType_disableWeekends: unknown;
}

export { DateAdapter, DateRange, DatepickerService, QDatePickerComponent };
export type { QCalendarLocation, QCalendarView };
