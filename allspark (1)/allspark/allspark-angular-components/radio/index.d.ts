import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { ElementRef, OnInit, AfterContentInit, DoCheck, OnDestroy, OnChanges, EventEmitter, QueryList, SimpleChanges, AfterViewInit, TemplateRef } from '@angular/core';
import { QExpansionTriggerComponent } from '@questrade/allspark-angular-components/core/components';
import * as _angular_cdk_accordion from '@angular/cdk/accordion';
import { CdkAccordionItem, CdkAccordion } from '@angular/cdk/accordion';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';
import { Subject } from 'rxjs';
import * as i1 from '@questrade/allspark-angular-components/core/directives';

declare class QRadioExpandableComponent extends CdkAccordionItem {
    containerRef: ElementRef;
    dataQt: string;
    _hostClassName: string;
    accordion: _angular_cdk_accordion.CdkAccordion;
    static ɵfac: i0.ɵɵFactoryDeclaration<QRadioExpandableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QRadioExpandableComponent, "q-radio-expandable", never, { "containerRef": { "alias": "containerRef"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
}

interface QRadioButtonChangeEvent {
    value: unknown;
    source?: QRadioButtonComponent;
    target?: ElementRef<HTMLElement>;
}

type QRadioButtonVariant = 'default' | 'container' | 'expandable';

type QRadioLabelGap = 'xxs' | 'xs' | 's';

declare class QRadioGroupComponent extends ErrorState implements OnInit, AfterContentInit, DoCheck, OnDestroy, CdkAccordion, OnChanges {
    readonly radioGroupChange: EventEmitter<QRadioButtonChangeEvent>;
    errorStateMatcher: ErrorStateMatcherInterface;
    labelGap: QRadioLabelGap | null;
    variant: QRadioButtonVariant | null;
    invalidState: boolean;
    dataQt: string;
    get value(): unknown;
    set value(newValue: unknown);
    get name(): string;
    set name(value: string);
    get selected(): QRadioButtonComponent | null;
    set selected(selected: QRadioButtonComponent | null);
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    get required(): boolean;
    set required(value: BooleanInput);
    _radios: QueryList<QRadioButtonComponent>;
    hostClass: string;
    hostRole: string;
    _controlValueAccessorChangeFn: (value: unknown) => void;
    _onTouched: () => unknown;
    readonly _stateChanges: Subject<SimpleChanges>;
    readonly _openCloseAllActions: Subject<boolean>;
    readonly id: string;
    multi: boolean;
    private _value;
    private _name;
    private _selected;
    private _isInitialized;
    private _disabled;
    private _required;
    private readonly _cdr;
    private readonly _destroy$;
    private readonly injector;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    ngAfterContentInit(): void;
    openAll(): void;
    closeAll(): void;
    _checkSelectedRadioButton(): void;
    _touch(): void;
    _emitChangeEvent(): void;
    _markRadiosForCheck(): void;
    _setRadiosSub(): void;
    writeValue(value: unknown): void;
    registerOnChange(fn: (value: unknown) => void): void;
    registerOnTouched(fn: () => unknown): void;
    setDisabledState(isDisabled: boolean): void;
    private _setComponentControl;
    private _updateRadioButtonNames;
    private _updateSelectedRadioFromValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<QRadioGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QRadioGroupComponent, "q-radio-group", never, { "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "labelGap": { "alias": "labelGap"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "invalidState": { "alias": "invalidState"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "value": { "alias": "value"; "required": false; }; "name": { "alias": "name"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; }, { "radioGroupChange": "radioGroupChange"; }, ["_radios"], ["*"], true, never>;
    static ngAcceptInputType_invalidState: unknown;
}

type QRadioContainerDensity = 'compact' | 'default' | 'comfort';

type QRadioExtraContentDensity = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

type QRadioExtraContentPosition = 'below' | 'right';

declare class QRadioButtonComponent implements OnInit, AfterViewInit, OnDestroy, DoCheck {
    readonly radioButtonChange: EventEmitter<QRadioButtonChangeEvent>;
    readonly expandedChange: EventEmitter<boolean>;
    ariaLabel: string;
    ariaLabelledby: string;
    ariaDescribedby: string;
    containerDensity: QRadioContainerDensity;
    extraContent: TemplateRef<unknown> | null;
    extraContentContext: unknown | null;
    extraContentDensity: QRadioExtraContentDensity;
    extraContentPosition: QRadioExtraContentPosition;
    id: string;
    labelGap: QRadioLabelGap;
    name: string;
    variant: QRadioButtonVariant;
    readonly: boolean;
    expanded: boolean;
    dataQt: string;
    get checked(): boolean;
    set checked(value: BooleanInput);
    get value(): unknown;
    set value(value: unknown);
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    get required(): boolean;
    set required(value: BooleanInput);
    get tabIndex(): number;
    set tabIndex(value: NumberInput);
    get extraContentRightWidth(): string;
    set extraContentRightWidth(value: NumberInput);
    get invalidState(): boolean;
    set invalidState(value: BooleanInput);
    _inputElement: ElementRef<HTMLInputElement>;
    _radioExpandable: QRadioExpandableComponent;
    _expansionTrigger: QExpansionTriggerComponent;
    hostTabIndex: string | null;
    hostAriaLabel: string | null;
    hostAriaLabelledBy: string | null;
    hostAriaDescribedBy: string | null;
    get hostId(): string;
    get hostClassNames(): string;
    onFocus(): void;
    _radioGroup: QRadioGroupComponent | null;
    readonly _elementRef: ElementRef<any>;
    private _checked;
    private _value;
    private _disabled;
    private _required;
    private _invalidState;
    private _tabIndex;
    private _rightExtraContentWidth;
    private _previousTabIndex;
    private _removeUniqueSelectionListener;
    private readonly _cdr;
    private readonly _radioDispatcher;
    private readonly _focusMonitor;
    private readonly _destroy$;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    _onLabelInteraction(): void;
    _onExpandedChange(expanded: boolean): void;
    _onRadioContainerChange(event: Event): void;
    _markForCheck(): void;
    _onInputInteraction(event: Event | null): void;
    _onTouchTargetClick(event: Event): void;
    _onInputClick(event: Event): void;
    get currentVariant(): QRadioButtonVariant;
    get currentInvalidState(): boolean;
    get currentLabelGap(): QRadioLabelGap;
    get canRenderExtraContentBelow(): boolean;
    get canRenderExtraContentRight(): boolean;
    private _updateCheckedState;
    private _updateValue;
    private _setInitialState;
    private _setRadioDispatcher;
    private _setFocusMonitor;
    private _emitChangeEvent;
    private _setDisabled;
    private _updateTabIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<QRadioButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QRadioButtonComponent, "q-radio-button", never, { "ariaLabel": { "alias": "aria-label"; "required": false; }; "ariaLabelledby": { "alias": "aria-labelledby"; "required": false; }; "ariaDescribedby": { "alias": "aria-describedby"; "required": false; }; "containerDensity": { "alias": "containerDensity"; "required": false; }; "extraContent": { "alias": "extraContent"; "required": false; }; "extraContentContext": { "alias": "extraContentContext"; "required": false; }; "extraContentDensity": { "alias": "extraContentDensity"; "required": false; }; "extraContentPosition": { "alias": "extraContentPosition"; "required": false; }; "id": { "alias": "id"; "required": false; }; "labelGap": { "alias": "labelGap"; "required": false; }; "name": { "alias": "name"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "expanded": { "alias": "expanded"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "extraContentRightWidth": { "alias": "extraContentRightWidth"; "required": false; }; "invalidState": { "alias": "invalidState"; "required": false; }; }, { "radioButtonChange": "radioButtonChange"; "expandedChange": "expandedChange"; }, never, ["*", "q-badge", "q-link"], true, never>;
    static ngAcceptInputType_readonly: unknown;
    static ngAcceptInputType_expanded: unknown;
}

declare class QRadioLabelComponent {
    dataQt: string;
    hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QRadioLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QRadioLabelComponent, "q-radio-label", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, [{ directive: typeof i1.QLineClampDirective; inputs: { "lineClamp": "lineClamp"; }; outputs: {}; }]>;
}

declare const Q_RADIO_COMPONENTS: readonly [typeof QRadioButtonComponent, typeof QRadioGroupComponent, typeof QRadioLabelComponent];

export { QRadioButtonComponent, QRadioGroupComponent, QRadioLabelComponent, Q_RADIO_COMPONENTS };
export type { QRadioButtonChangeEvent, QRadioButtonVariant, QRadioContainerDensity, QRadioExtraContentPosition, QRadioLabelGap };
