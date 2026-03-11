import * as i0 from '@angular/core';
import { OnChanges, OnDestroy, EventEmitter, ElementRef, SimpleChanges, OnInit, QueryList, TemplateRef, AfterViewInit } from '@angular/core';
import { QOverlayComponent } from '@questrade/allspark-angular-components/overlay';
import { Observable } from 'rxjs';
import { FocusableOption } from '@angular/cdk/a11y';
import { CdkAccordionItem } from '@angular/cdk/accordion';

interface QStepperActiveIndex {
    stepIndex: number;
    subStepIndex?: number;
}

type QStepperBeforeStepChangeEvent = (fromIndex: QStepperActiveIndex, toIndex: QStepperActiveIndex) => Observable<boolean>;

interface QStepperSubStep {
    title: string;
    completed?: boolean;
}

declare class QSubStepComponent implements OnChanges, OnDestroy, FocusableOption {
    readonly completedChange: EventEmitter<void>;
    readonly activeIndexChange: EventEmitter<QStepperActiveIndex>;
    readonly subStepFocus: EventEmitter<void>;
    beforeActiveStepChange: QStepperBeforeStepChangeEvent | null;
    parentIndex: number;
    subStep: QStepperSubStep;
    index: number;
    activeIndex: QStepperActiveIndex;
    parentExpanded: boolean;
    get dataQt(): string;
    _subStepContent: ElementRef;
    private beforeActiveStepChangeSub;
    private readonly _destroy$;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    _onSubStepClick(): void;
    _onSubStepFocus(): void;
    /** @hidden */
    focus(): void;
    /** @hidden */
    getLabel(): string;
    get isActive(): boolean;
    get disabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSubStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QSubStepComponent, "q-sub-step", never, { "beforeActiveStepChange": { "alias": "beforeActiveStepChange"; "required": false; }; "parentIndex": { "alias": "parentIndex"; "required": true; }; "subStep": { "alias": "subStep"; "required": true; }; "index": { "alias": "index"; "required": true; }; "activeIndex": { "alias": "activeIndex"; "required": true; }; "parentExpanded": { "alias": "parentExpanded"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "completedChange": "completedChange"; "activeIndexChange": "activeIndexChange"; "subStepFocus": "subStepFocus"; }, never, never, true, never>;
}

interface QStepperStep {
    title: string;
    subSteps?: QStepperSubStep[];
    completed?: boolean;
    editable?: boolean;
}

declare class QStepComponent extends CdkAccordionItem implements OnInit, OnChanges, FocusableOption {
    readonly activeIndexChange: EventEmitter<QStepperActiveIndex>;
    readonly stepProgressChange: EventEmitter<{
        index: number;
        progress: number;
    }>;
    readonly stepFocus: EventEmitter<void>;
    readonly subStepFocus: EventEmitter<QSubStepComponent>;
    index: number;
    step: QStepperStep;
    activeIndex: QStepperActiveIndex;
    last: boolean;
    horizontalView: boolean;
    showProgressOnActive: boolean;
    showProgressOnCompleted: boolean;
    previousStepCompleted: boolean;
    beforeActiveStepChange: QStepperBeforeStepChangeEvent | null;
    get dataQt(): string;
    _subStepList: QueryList<QSubStepComponent>;
    _stepHeader: ElementRef;
    get hostClasses(): string;
    _inReview: boolean;
    _stepExpanded: boolean;
    _progress: number;
    _stepRelativeProgress: number;
    private readonly _iconRegistry;
    private readonly _destroy$;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _onStepClick(): void;
    _changeActiveIndex(): void;
    _onActiveIndexChange(activeIndex: QStepperActiveIndex): void;
    _onSubStepCompleted(): void;
    _updateProgress(): void;
    _onStepFocus(): void;
    _onSubStepFocus(subStep: QSubStepComponent): void;
    /** @hidden */
    focus(): void;
    /** @hidden */
    getLabel(): string;
    get isActive(): boolean;
    get isLocked(): boolean;
    get isCompleted(): boolean;
    get showAccordion(): boolean;
    get hasSubSteps(): boolean;
    get circularProgressLabel(): string;
    get showProgress(): boolean;
    get ariaGroupId(): string | null;
    private _setDefaultValues;
    private _setToggleState;
    private _activateStep;
    private _resetNonClicked;
    private _resetToggleState;
    private _setRelativeProgress;
    static ɵfac: i0.ɵɵFactoryDeclaration<QStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QStepComponent, "q-step", never, { "index": { "alias": "index"; "required": true; }; "step": { "alias": "step"; "required": true; }; "activeIndex": { "alias": "activeIndex"; "required": true; }; "last": { "alias": "last"; "required": false; }; "horizontalView": { "alias": "horizontalView"; "required": false; }; "showProgressOnActive": { "alias": "showProgressOnActive"; "required": false; }; "showProgressOnCompleted": { "alias": "showProgressOnCompleted"; "required": false; }; "previousStepCompleted": { "alias": "previousStepCompleted"; "required": false; }; "beforeActiveStepChange": { "alias": "beforeActiveStepChange"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "activeIndexChange": "activeIndexChange"; "stepProgressChange": "stepProgressChange"; "stepFocus": "stepFocus"; "subStepFocus": "subStepFocus"; }, never, never, true, never>;
}

type QStepperStaticStepStatus = 'in-progress' | 'upcoming' | 'completed' | 'pending';

interface QStepperStaticStep {
    title: string;
    status: QStepperStaticStepStatus;
    staticStepContent?: TemplateRef<unknown>;
    staticStepContext?: unknown;
}

type QStepperVariant = 'standard' | 'static';

declare class QStepperComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    readonly activeIndexChange: EventEmitter<QStepperActiveIndex>;
    readonly overallProgressChange: EventEmitter<number>;
    steps: QStepperStep[];
    staticSteps: QStepperStaticStep[];
    variant: QStepperVariant;
    showProgressOnActive: boolean;
    showProgressOnCompleted: boolean;
    beforeActiveStepChange: QStepperBeforeStepChangeEvent | null;
    dataQt: string;
    get activeIndex(): QStepperActiveIndex;
    set activeIndex(value: QStepperActiveIndex | null);
    _stepList: QueryList<QStepComponent>;
    _overlay: QOverlayComponent;
    hostClass: string;
    _horizontalView: boolean;
    _stepsViewOpen: boolean;
    _overallProgress: number;
    _isMobileView: boolean;
    private _stepActivatedByKeyboard$;
    private _activeIndex;
    private _keyManager;
    private readonly _iconRegistry;
    private readonly _breakpointObserver;
    private readonly _cdr;
    private readonly _destroy$;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    get isActiveStepCompleted(): boolean;
    get activeSubStep(): QStepperSubStep | undefined;
    get activeStep(): QStepperStep | undefined;
    get stepActivatedByKeyboard(): Observable<void>;
    _onActiveIndexChange(activeIndex: QStepperActiveIndex): void;
    _calculateOverallProgress(): void;
    _handleKeydown(event: KeyboardEvent): void;
    _onStepFocus(stepComponent: QStepComponent | QSubStepComponent): void;
    _toggleOverlay(): void;
    _updateViewPositionStrategy(): void;
    _isPreviousStepCompleted(index: number): boolean;
    _isPreviousStaticStepCompleted(index: number): boolean;
    private _registerIcons;
    private _getStepElement;
    private _updateFocusKeyManagerEntries;
    static ɵfac: i0.ɵɵFactoryDeclaration<QStepperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QStepperComponent, "q-stepper", never, { "steps": { "alias": "steps"; "required": false; }; "staticSteps": { "alias": "staticSteps"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "showProgressOnActive": { "alias": "showProgressOnActive"; "required": false; }; "showProgressOnCompleted": { "alias": "showProgressOnCompleted"; "required": false; }; "beforeActiveStepChange": { "alias": "beforeActiveStepChange"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "activeIndex": { "alias": "activeIndex"; "required": false; }; }, { "activeIndexChange": "activeIndexChange"; "overallProgressChange": "overallProgressChange"; }, never, never, true, never>;
    static ngAcceptInputType_showProgressOnActive: unknown;
    static ngAcceptInputType_showProgressOnCompleted: unknown;
}

export { QStepperComponent };
export type { QStepperActiveIndex, QStepperBeforeStepChangeEvent, QStepperStaticStep, QStepperStaticStepStatus, QStepperStep, QStepperSubStep, QStepperVariant };
