import { Observable } from 'rxjs';
import * as i0 from '@angular/core';
import { TemplateRef, ElementRef, OnInit, AfterViewInit, OnDestroy, EventEmitter, QueryList } from '@angular/core';
import { QStepperActiveIndex, QStepperComponent } from '@questrade/allspark-angular-components/stepper';

interface QWizardStep {
    id: string;
    title: string;
    pageTitle?: string;
    routerLink?: string;
    completed?: boolean;
    editable?: boolean;
    parentStepId?: string;
    subSteps?: QWizardStep[];
    template?: TemplateRef<unknown>;
    templateContext?: unknown;
}

type QWizardBeforeStepChangeEvent = (fromStep: QWizardStep, toStep: QWizardStep) => Observable<boolean>;

interface QWizardStepChangeEvent {
    activeStep?: QWizardStep;
    parentStep?: QWizardStep;
    steps: QWizardStep[];
}

interface QWizardStepCompleteEvent {
    completedStep?: QWizardStep;
    parentStep?: QWizardStep;
    steps: QWizardStep[];
}

declare class QWizardStepComponent {
    title: string;
    wizardName: string;
    parentStepTitle: string;
    isScreenSmallDown: boolean;
    template: TemplateRef<HTMLElement> | null;
    showPageTitle: boolean;
    dataQt: string;
    _titleElement: ElementRef;
    hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QWizardStepComponent, "q-wizard-step", never, { "title": { "alias": "title"; "required": false; }; "wizardName": { "alias": "wizardName"; "required": false; }; "parentStepTitle": { "alias": "parentStepTitle"; "required": false; }; "isScreenSmallDown": { "alias": "isScreenSmallDown"; "required": false; }; "template": { "alias": "template"; "required": false; }; "showPageTitle": { "alias": "showPageTitle"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_showPageTitle: unknown;
}

declare class QWizardService {
    activeStepId: string;
    parentStep: QWizardStep | null;
    stepIndexes: QStepperActiveIndex | null;
    private _flatStepsSubject;
    private _stepsSubject;
    steps$: Observable<QWizardStep[] | null>;
    private _activeStepSubject;
    activeStep$: Observable<QWizardStep | null>;
    private _completedStepSubject;
    completedStep$: Observable<QWizardStep>;
    updateSteps(steps: QWizardStep[] | null): void;
    updateActiveStepById(id: string): void;
    goBack(): void;
    goNext(): void;
    getStepById(id: string): QWizardStep | undefined;
    getPreviousStep(stepsToSkip?: number): QWizardStep | undefined;
    getNextStep(stepsToSkip?: number): QWizardStep | undefined;
    getParentStep(id: string | undefined): QWizardStep | undefined;
    getWizardStepByStepperIndex(index: QStepperActiveIndex): QWizardStep | undefined;
    reset(): void;
    get steps(): QWizardStep[];
    get flatSteps(): QWizardStep[];
    get activeStep(): QWizardStep | null;
    get activeStepFlatIndex(): number;
    private _getStepIndexes;
    private _isEditableStep;
    private _completeActiveStep;
    static ɵfac: i0.ɵɵFactoryDeclaration<QWizardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QWizardService>;
}

declare class QWizardComponent implements OnInit, AfterViewInit, OnDestroy {
    readonly stepChanged: EventEmitter<QWizardStepChangeEvent>;
    readonly stepCompleted: EventEmitter<QWizardStepCompleteEvent>;
    readonly primaryButtonClicked: EventEmitter<Event>;
    readonly secondaryButtonClicked: EventEmitter<Event>;
    wizardName: string;
    customStepFooterTemplate: TemplateRef<HTMLElement> | null;
    beforeActiveStepChangeJob: QWizardBeforeStepChangeEvent | null;
    beforeBackStepJob: Observable<boolean>;
    beforeNextStepJob: Observable<boolean>;
    primaryButtonTranslationKey: string;
    secondaryButtonTranslationKey: string;
    showDefaultStepFooter: boolean;
    disablePrimaryButton: boolean;
    disableSecondaryButton: boolean;
    hidePrimaryButton: boolean;
    hideSecondaryButton: boolean;
    stepperShowProgressOnActive: boolean;
    stepperShowProgressOnCompleted: boolean;
    showPageTitle: boolean;
    dataQt: string;
    get steps(): QWizardStep[];
    set steps(value: QWizardStep[]);
    get activeStepId(): string;
    set activeStepId(id: string);
    _stepper: QStepperComponent;
    _wizardStep: QWizardStepComponent;
    _banners: QueryList<ElementRef>;
    _isScreenSmallDown: boolean;
    _stepContainerHeight: string;
    readonly wizardService: QWizardService;
    private _activeStepId;
    private _steps;
    private readonly _breakpointObserver;
    private readonly _destroy$;
    private readonly _cdr;
    private readonly _ngZone;
    private readonly _document;
    private readonly _sharedResizeObserverService;
    private _isBackLoading$;
    isBackLoading$: Observable<boolean>;
    private _isNextLoading$;
    isNextLoading$: Observable<boolean>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _isSecondaryButtonHidden(): boolean;
    _onPrimaryButtonClicked(): void;
    _onSecondaryButtonClicked(): void;
    _onStepperActiveIndexChange(indexes: QStepperActiveIndex): void;
    _onBeforeActiveStepChange: (fromIndex: QStepperActiveIndex, toIndex: QStepperActiveIndex) => Observable<boolean>;
    private _setBreakpointObserver;
    private _beforeBackStepJobFail;
    private _beforeNextStepJobFail;
    private _beforeNextStepJobSuccess;
    private _beforeBackStepJobSuccess;
    private _emitStepChange;
    private _emitStepCompleted;
    private _calcStepContainerHeigh;
    static ɵfac: i0.ɵɵFactoryDeclaration<QWizardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QWizardComponent, "q-wizard", never, { "wizardName": { "alias": "wizardName"; "required": false; }; "customStepFooterTemplate": { "alias": "customStepFooterTemplate"; "required": false; }; "beforeActiveStepChangeJob": { "alias": "beforeActiveStepChangeJob"; "required": false; }; "beforeBackStepJob": { "alias": "beforeBackStepJob"; "required": false; }; "beforeNextStepJob": { "alias": "beforeNextStepJob"; "required": false; }; "primaryButtonTranslationKey": { "alias": "primaryButtonTranslationKey"; "required": false; }; "secondaryButtonTranslationKey": { "alias": "secondaryButtonTranslationKey"; "required": false; }; "showDefaultStepFooter": { "alias": "showDefaultStepFooter"; "required": false; }; "disablePrimaryButton": { "alias": "disablePrimaryButton"; "required": false; }; "disableSecondaryButton": { "alias": "disableSecondaryButton"; "required": false; }; "hidePrimaryButton": { "alias": "hidePrimaryButton"; "required": false; }; "hideSecondaryButton": { "alias": "hideSecondaryButton"; "required": false; }; "stepperShowProgressOnActive": { "alias": "stepperShowProgressOnActive"; "required": false; }; "stepperShowProgressOnCompleted": { "alias": "stepperShowProgressOnCompleted"; "required": false; }; "showPageTitle": { "alias": "showPageTitle"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "steps": { "alias": "steps"; "required": false; }; "activeStepId": { "alias": "activeStepId"; "required": false; }; }, { "stepChanged": "stepChanged"; "stepCompleted": "stepCompleted"; "primaryButtonClicked": "primaryButtonClicked"; "secondaryButtonClicked": "secondaryButtonClicked"; }, ["_banners"], ["q-banner"], true, never>;
    static ngAcceptInputType_showDefaultStepFooter: unknown;
    static ngAcceptInputType_disablePrimaryButton: unknown;
    static ngAcceptInputType_disableSecondaryButton: unknown;
    static ngAcceptInputType_hidePrimaryButton: unknown;
    static ngAcceptInputType_hideSecondaryButton: unknown;
    static ngAcceptInputType_stepperShowProgressOnActive: unknown;
    static ngAcceptInputType_stepperShowProgressOnCompleted: unknown;
    static ngAcceptInputType_showPageTitle: unknown;
}

export { QWizardComponent, QWizardService, QWizardStepComponent };
export type { QWizardBeforeStepChangeEvent, QWizardStep, QWizardStepChangeEvent, QWizardStepCompleteEvent };
