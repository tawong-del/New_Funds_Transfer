import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';
import * as i0 from '@angular/core';
import { ElementRef, booleanAttribute, HostBinding, ViewChild, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, Injectable, EventEmitter, inject, ChangeDetectorRef, NgZone, DOCUMENT, ContentChildren, Output } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as i1 from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { QBannerComponent } from '@questrade/allspark-angular-components/banner';
import { QButtonComponent } from '@questrade/allspark-angular-components/button';
import { QKebabCasePipe } from '@questrade/allspark-angular-components/core/pipes';
import { QDestroyService, QSharedResizeObserverService } from '@questrade/allspark-angular-components/core/services';
import { isPresent } from '@questrade/allspark-angular-components/core/utils';
import { QStepperComponent } from '@questrade/allspark-angular-components/stepper';
import { BehaviorSubject, Subject, skip, takeUntil, delay, debounceTime, of, take } from 'rxjs';
import { MISSING_KEY_HANDLER, ALLSPARK_SCOPE } from '@questrade/allspark-angular-components/transloco';

class QWizardStepComponent {
    title = '';
    wizardName = '';
    parentStepTitle = '';
    isScreenSmallDown = false;
    template = null;
    showPageTitle = true;
    dataQt = 'q-wizard-step';
    _titleElement;
    hostClass = 'q-wizard-step';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QWizardStepComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QWizardStepComponent, isStandalone: true, selector: "q-wizard-step", inputs: { title: "title", wizardName: "wizardName", parentStepTitle: "parentStepTitle", isScreenSmallDown: "isScreenSmallDown", template: "template", showPageTitle: ["showPageTitle", "showPageTitle", booleanAttribute], dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, viewQueries: [{ propertyName: "_titleElement", first: true, predicate: ["stepTitleEl"], descendants: true, read: ElementRef }], ngImport: i0, template: "@if (showPageTitle) {\n  <div class=\"q-wizard-step-header\">\n    <div *ngIf=\"isScreenSmallDown\" class=\"q-wizard-step-header-name q-overline\">\n      {{ parentStepTitle || wizardName }}\n    </div>\n    <div #stepTitleEl class=\"q-wizard-step-title q-display-m q-focus-indicator\" tabindex=\"-1\">\n      {{ title }}\n    </div>\n  </div>\n}\n\n<ng-container *ngTemplateOutlet=\"template || ngContentTemplate\" />\n<ng-template #ngContentTemplate>\n  <ng-content />\n</ng-template>\n", styles: [".q-wizard-step{color:var(--ads-color-body-700)}.q-wizard-step-header{margin-bottom:var(--ads-size-s)}.q-wizard-step-header-name{color:var(--ads-color-body-500);margin-bottom:var(--ads-size-nano)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QWizardStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-wizard-step', imports: [NgIf, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "@if (showPageTitle) {\n  <div class=\"q-wizard-step-header\">\n    <div *ngIf=\"isScreenSmallDown\" class=\"q-wizard-step-header-name q-overline\">\n      {{ parentStepTitle || wizardName }}\n    </div>\n    <div #stepTitleEl class=\"q-wizard-step-title q-display-m q-focus-indicator\" tabindex=\"-1\">\n      {{ title }}\n    </div>\n  </div>\n}\n\n<ng-container *ngTemplateOutlet=\"template || ngContentTemplate\" />\n<ng-template #ngContentTemplate>\n  <ng-content />\n</ng-template>\n", styles: [".q-wizard-step{color:var(--ads-color-body-700)}.q-wizard-step-header{margin-bottom:var(--ads-size-s)}.q-wizard-step-header-name{color:var(--ads-color-body-500);margin-bottom:var(--ads-size-nano)}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], wizardName: [{
                type: Input
            }], parentStepTitle: [{
                type: Input
            }], isScreenSmallDown: [{
                type: Input
            }], template: [{
                type: Input
            }], showPageTitle: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _titleElement: [{
                type: ViewChild,
                args: ['stepTitleEl', { read: ElementRef }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QWizardService {
    activeStepId = '';
    parentStep = null;
    stepIndexes = null;
    _flatStepsSubject = new BehaviorSubject([]);
    _stepsSubject = new BehaviorSubject([]);
    steps$ = this._stepsSubject.asObservable();
    _activeStepSubject = new BehaviorSubject(null);
    activeStep$ = this._activeStepSubject.asObservable();
    _completedStepSubject = new Subject();
    completedStep$ = this._completedStepSubject.asObservable();
    updateSteps(steps) {
        if (!steps)
            return;
        const flatSteps = steps.flatMap((step) => step.subSteps?.length ? [step, ...step.subSteps] : step);
        this._flatStepsSubject.next(flatSteps);
        this._stepsSubject.next(steps);
    }
    updateActiveStepById(id) {
        if (!id || !this.steps)
            return;
        const newActiveStep = this.flatSteps?.find((step) => step.id === id);
        if (!newActiveStep)
            return;
        if (newActiveStep.subSteps?.length) {
            const firstSubStepId = newActiveStep.subSteps[0].id;
            this.updateActiveStepById(firstSubStepId);
            return;
        }
        this.activeStepId = id;
        this.parentStep =
            this.flatSteps?.find((step) => newActiveStep.parentStepId === step.id) || null;
        this.stepIndexes = this._getStepIndexes(id);
        this._activeStepSubject.next(newActiveStep);
    }
    goBack() {
        if (this.activeStepFlatIndex === 0)
            return;
        let stepsToSkip = 0;
        const activatePrevFirstEditableStep = () => {
            const previousStep = this.getPreviousStep(stepsToSkip);
            if (!previousStep)
                return;
            const isEditable = this._isEditableStep(previousStep);
            if (!isEditable) {
                stepsToSkip++;
                activatePrevFirstEditableStep();
            }
            else {
                this.updateActiveStepById(previousStep.id);
            }
        };
        activatePrevFirstEditableStep();
    }
    goNext() {
        const flatStepsLength = this.flatSteps?.length || 0;
        if (this.activeStepFlatIndex === flatStepsLength - 1)
            return;
        let stepsToSkip = 0;
        const activateNextFirstEditableStep = () => {
            const nextStep = this.getNextStep(stepsToSkip);
            if (!nextStep)
                return;
            const isEditable = this._isEditableStep(nextStep);
            if (!isEditable) {
                stepsToSkip++;
                activateNextFirstEditableStep();
            }
            else {
                this._completeActiveStep();
                this.updateActiveStepById(nextStep.id);
            }
        };
        activateNextFirstEditableStep();
    }
    getStepById(id) {
        return this.flatSteps?.find((step) => step.id === id);
    }
    getPreviousStep(stepsToSkip = 0) {
        if (!this.flatSteps)
            return undefined;
        const previousStep = this.flatSteps[this.activeStepFlatIndex - stepsToSkip - 1];
        const isParent = previousStep?.id === this.activeStep?.parentStepId;
        return isParent ? this.flatSteps[this.activeStepFlatIndex - stepsToSkip - 2] : previousStep;
    }
    getNextStep(stepsToSkip = 0) {
        if (!this.flatSteps)
            return undefined;
        const nextStep = this.flatSteps[this.activeStepFlatIndex + stepsToSkip + 1];
        const hasSubSteps = !nextStep.parentStepId && nextStep.subSteps?.length;
        return hasSubSteps ? nextStep.subSteps?.[0] : nextStep;
    }
    getParentStep(id) {
        return this.steps?.find((step) => step.id === id);
    }
    getWizardStepByStepperIndex(index) {
        let step = this.steps[index.stepIndex];
        if (isPresent(index.subStepIndex) && step?.subSteps?.length) {
            step = step.subSteps[index.subStepIndex];
        }
        return step;
    }
    reset() {
        this.parentStep = null;
        this.activeStepId = '';
        this.stepIndexes = null;
        this._stepsSubject.next([]);
        this._flatStepsSubject.next([]);
        this._activeStepSubject.next(null);
    }
    get steps() {
        return this._stepsSubject.value;
    }
    get flatSteps() {
        return this._flatStepsSubject.value;
    }
    get activeStep() {
        return this._activeStepSubject.value;
    }
    get activeStepFlatIndex() {
        return this.flatSteps?.findIndex((step) => step.id === this.activeStep?.id) || 0;
    }
    _getStepIndexes(id) {
        let stepIndex = 0;
        let subStepIndex;
        this.steps?.every((step, index) => {
            if (step.id === id) {
                stepIndex = index;
                subStepIndex = undefined;
                return false;
            }
            subStepIndex = step.subSteps?.findIndex((subStep) => subStep.id === id);
            if (subStepIndex !== -1 && isPresent(subStepIndex)) {
                stepIndex = index;
                return false;
            }
            return true;
        });
        return { stepIndex, ...(isPresent(subStepIndex) && { subStepIndex }) };
    }
    _isEditableStep(step) {
        const isTopLvlStepEditable = (_step) => _step.editable === undefined || (_step.editable !== undefined && _step.editable);
        const parentStep = this.getParentStep(step.parentStepId);
        return isTopLvlStepEditable(parentStep || step);
    }
    _completeActiveStep() {
        if (!this.activeStep || !this.flatSteps || !this.steps || !this.stepIndexes)
            return;
        if (this.activeStep.completed)
            return;
        const { stepIndex, subStepIndex } = this.stepIndexes;
        const subSteps = this.steps[stepIndex].subSteps;
        const newCompletedStep = {
            ...this.flatSteps[this.activeStepFlatIndex],
            completed: true,
        };
        if (this.parentStep && subSteps && isPresent(subStepIndex)) {
            subSteps[subStepIndex] = newCompletedStep;
        }
        else {
            this.steps[stepIndex] = newCompletedStep;
        }
        this.activeStep.completed = true;
        this._completedStepSubject.next(this.activeStep);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QWizardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QWizardService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QWizardService, decorators: [{
            type: Injectable
        }] });

class QWizardComponent {
    stepChanged = new EventEmitter();
    stepCompleted = new EventEmitter();
    primaryButtonClicked = new EventEmitter();
    secondaryButtonClicked = new EventEmitter();
    wizardName = '';
    customStepFooterTemplate = null;
    beforeActiveStepChangeJob = null;
    beforeBackStepJob;
    beforeNextStepJob;
    primaryButtonTranslationKey = 'allspark.wizard.next';
    secondaryButtonTranslationKey = 'allspark.wizard.back';
    showDefaultStepFooter = true;
    disablePrimaryButton = false;
    disableSecondaryButton = false;
    hidePrimaryButton = false;
    hideSecondaryButton = false;
    stepperShowProgressOnActive = false;
    stepperShowProgressOnCompleted = false;
    showPageTitle = true;
    dataQt = 'q-wizard';
    get steps() {
        return this._steps;
    }
    set steps(value) {
        this._steps = value;
        this.wizardService.updateSteps(value);
    }
    get activeStepId() {
        return this._activeStepId;
    }
    set activeStepId(id) {
        this._activeStepId = id;
        const updateActiveStep = id && id !== this.wizardService.activeStep?.id && this.wizardService.steps?.length;
        if (updateActiveStep) {
            this.wizardService.updateActiveStepById(id);
        }
    }
    _stepper;
    _wizardStep;
    _banners;
    _isScreenSmallDown = false;
    _stepContainerHeight = '100%';
    wizardService = inject(QWizardService);
    _activeStepId = '';
    _steps = [];
    _breakpointObserver = inject(BreakpointObserver);
    _destroy$ = inject(QDestroyService);
    _cdr = inject(ChangeDetectorRef);
    _ngZone = inject(NgZone);
    _document = inject(DOCUMENT);
    _sharedResizeObserverService = inject(QSharedResizeObserverService);
    _isBackLoading$ = new BehaviorSubject(false);
    isBackLoading$ = this._isBackLoading$.asObservable();
    _isNextLoading$ = new BehaviorSubject(false);
    isNextLoading$ = this._isNextLoading$.asObservable();
    ngOnInit() {
        this._setBreakpointObserver();
        this.wizardService.steps$.pipe(skip(1), takeUntil(this._destroy$)).subscribe(() => {
            if (this._activeStepId) {
                this.wizardService.updateActiveStepById(this.activeStepId);
            }
        });
        this.wizardService.activeStep$
            .pipe(skip(1), takeUntil(this._destroy$))
            .subscribe(() => this._emitStepChange());
        this.wizardService.completedStep$
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this._emitStepCompleted());
    }
    ngAfterViewInit() {
        this._stepper?.stepActivatedByKeyboard
            .pipe(takeUntil(this._destroy$), delay(150))
            .subscribe(() => {
            this._wizardStep?._titleElement?.nativeElement?.focus();
        });
        this._banners.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._calcStepContainerHeigh();
        });
        this._sharedResizeObserverService
            .observe(this._document.body)
            ?.pipe(takeUntil(this._destroy$), debounceTime(150))
            .subscribe(() => {
            this._ngZone.run(() => {
                this._calcStepContainerHeigh();
            });
        });
    }
    ngOnDestroy() {
        this.wizardService.reset();
    }
    _isSecondaryButtonHidden() {
        let firstStep = this.wizardService.steps?.[0];
        if (firstStep?.subSteps?.length) {
            firstStep = firstStep.subSteps[0];
        }
        return this.wizardService.activeStep?.id === firstStep?.id;
    }
    _onPrimaryButtonClicked() {
        this._isNextLoading$.next(true);
        (this.beforeNextStepJob || of(true)).pipe(take(1)).subscribe({
            next: (success) => {
                if (success) {
                    this._beforeNextStepJobSuccess();
                }
                else {
                    this._beforeNextStepJobFail();
                }
            },
            error: () => this._beforeNextStepJobFail(),
            complete: () => this._isNextLoading$.next(false),
        });
        this.primaryButtonClicked.emit();
    }
    _onSecondaryButtonClicked() {
        this._isBackLoading$.next(true);
        (this.beforeBackStepJob || of(true)).pipe(take(1)).subscribe({
            next: (success) => {
                if (success) {
                    this._beforeBackStepJobSuccess();
                }
                else {
                    this._beforeBackStepJobFail();
                }
            },
            error: () => this._beforeBackStepJobFail(),
            complete: () => this._isBackLoading$.next(false),
        });
        this.secondaryButtonClicked.emit();
    }
    _onStepperActiveIndexChange(indexes) {
        const { stepIndex, subStepIndex } = indexes;
        const steps = this.wizardService.steps;
        if (!steps?.length)
            return;
        const stepIdToActivate = !isPresent(subStepIndex)
            ? steps[stepIndex].id
            : steps[stepIndex]?.subSteps?.[subStepIndex].id;
        if (!stepIdToActivate)
            return;
        this.wizardService.updateActiveStepById(stepIdToActivate);
    }
    _onBeforeActiveStepChange = (fromIndex, toIndex) => {
        if (this.beforeActiveStepChangeJob) {
            const fromWizardStep = this.wizardService.getWizardStepByStepperIndex(fromIndex);
            const toWizardStep = this.wizardService.getWizardStepByStepperIndex(toIndex);
            if (fromWizardStep && toWizardStep) {
                return this.beforeActiveStepChangeJob(fromWizardStep, toWizardStep);
            }
            // if fromWizardStep and toWizardStep are not found, block the navigation as fallback
            return of(false);
        }
        return of(true);
    };
    _setBreakpointObserver() {
        this._breakpointObserver
            .observe(['(max-width: 1019px)'])
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            this._isScreenSmallDown = result.matches;
            this._cdr.markForCheck();
        });
    }
    _beforeBackStepJobFail() {
        this._isBackLoading$.next(false);
    }
    _beforeNextStepJobFail() {
        this._isNextLoading$.next(false);
    }
    _beforeNextStepJobSuccess() {
        this._isNextLoading$.next(false);
        this.wizardService.goNext();
    }
    _beforeBackStepJobSuccess() {
        this._isBackLoading$.next(false);
        this.wizardService.goBack();
    }
    _emitStepChange() {
        this.stepChanged.emit({
            ...(this.wizardService.activeStep && { activeStep: this.wizardService.activeStep }),
            ...(this.wizardService.parentStep && { parentStep: this.wizardService.parentStep }),
            steps: this.wizardService.steps,
        });
    }
    _emitStepCompleted() {
        this.stepCompleted.emit({
            ...(this.wizardService.activeStep && { completedStep: this.wizardService.activeStep }),
            ...(this.wizardService.parentStep && { parentStep: this.wizardService.parentStep }),
            steps: this.wizardService.steps,
        });
    }
    _calcStepContainerHeigh() {
        let calculatedHeight = '100%';
        if (this._banners.length > 0) {
            const totalHeight = this._banners
                .map((bannerEl) => bannerEl.nativeElement?.offsetHeight)
                .reduce((prevHeight, currHeight) => prevHeight + currHeight, 0);
            calculatedHeight = `calc(100% - ${totalHeight}px)`;
        }
        if (this._stepContainerHeight !== calculatedHeight) {
            this._stepContainerHeight = calculatedHeight;
            this._cdr.markForCheck();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QWizardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QWizardComponent, isStandalone: true, selector: "q-wizard", inputs: { wizardName: "wizardName", customStepFooterTemplate: "customStepFooterTemplate", beforeActiveStepChangeJob: "beforeActiveStepChangeJob", beforeBackStepJob: "beforeBackStepJob", beforeNextStepJob: "beforeNextStepJob", primaryButtonTranslationKey: "primaryButtonTranslationKey", secondaryButtonTranslationKey: "secondaryButtonTranslationKey", showDefaultStepFooter: ["showDefaultStepFooter", "showDefaultStepFooter", booleanAttribute], disablePrimaryButton: ["disablePrimaryButton", "disablePrimaryButton", booleanAttribute], disableSecondaryButton: ["disableSecondaryButton", "disableSecondaryButton", booleanAttribute], hidePrimaryButton: ["hidePrimaryButton", "hidePrimaryButton", booleanAttribute], hideSecondaryButton: ["hideSecondaryButton", "hideSecondaryButton", booleanAttribute], stepperShowProgressOnActive: ["stepperShowProgressOnActive", "stepperShowProgressOnActive", booleanAttribute], stepperShowProgressOnCompleted: ["stepperShowProgressOnCompleted", "stepperShowProgressOnCompleted", booleanAttribute], showPageTitle: ["showPageTitle", "showPageTitle", booleanAttribute], dataQt: "dataQt", steps: "steps", activeStepId: "activeStepId" }, outputs: { stepChanged: "stepChanged", stepCompleted: "stepCompleted", primaryButtonClicked: "primaryButtonClicked", secondaryButtonClicked: "secondaryButtonClicked" }, host: { properties: { "attr.data-qt": "this.dataQt" } }, providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE, QWizardService, QDestroyService], queries: [{ propertyName: "_banners", predicate: QBannerComponent, read: ElementRef }], viewQueries: [{ propertyName: "_stepper", first: true, predicate: QStepperComponent, descendants: true }, { propertyName: "_wizardStep", first: true, predicate: ["wizardStepEl"], descendants: true }], ngImport: i0, template: "<ng-container *transloco=\"let t\">\n  <div class=\"q-wizard\">\n    <div class=\"q-wizard-stepper-section\">\n      <div *ngIf=\"!_isScreenSmallDown\" class=\"q-wizard-stepper-name q-overline\">\n        {{ wizardName }}\n      </div>\n\n      <div class=\"q-wizard-stepper-content\">\n        <q-stepper\n          *ngIf=\"wizardService.steps$ | async as steps\"\n          [steps]=\"steps\"\n          [activeIndex]=\"wizardService.stepIndexes\"\n          [showProgressOnActive]=\"stepperShowProgressOnActive\"\n          [showProgressOnCompleted]=\"stepperShowProgressOnCompleted\"\n          [beforeActiveStepChange]=\"_onBeforeActiveStepChange\"\n          (activeIndexChange)=\"_onStepperActiveIndexChange($event)\" />\n      </div>\n    </div>\n\n    <div class=\"q-wizard-step-section\" tabindex=\"-1\">\n      <ng-content select=\"q-banner\" />\n      <div class=\"q-wizard-step-scrollable-content\" [style.height]=\"_stepContainerHeight\">\n        <div class=\"q-wizard-step-container\">\n          <q-wizard-step\n            #wizardStepEl\n            *ngIf=\"wizardService.activeStep$ | async as activeStep\"\n            [parentStepTitle]=\"\n              wizardService.parentStep?.pageTitle || wizardService.parentStep?.title || ''\n            \"\n            [title]=\"activeStep.pageTitle || activeStep.title\"\n            [dataQt]=\"'q-step-' + (activeStep.title | qKebabCase)\"\n            [wizardName]=\"wizardName\"\n            [isScreenSmallDown]=\"_isScreenSmallDown\"\n            [showPageTitle]=\"showPageTitle\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                activeStep.template || null;\n                context: {\n                  $implicit: activeStep,\n                  stepId: activeStep.id,\n                  templateContext: activeStep.templateContext,\n                }\n              \" />\n          </q-wizard-step>\n\n          <ng-container *ngIf=\"wizardService.activeStep$ | async\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                showDefaultStepFooter ? defaultFooterTemplate : customStepFooterTemplate\n              \" />\n\n            <ng-template #defaultFooterTemplate>\n              <div class=\"q-wizard-step-footer\">\n                <div class=\"q-wizard-step-footer-actions\">\n                  <button\n                    *ngIf=\"!_isSecondaryButtonHidden() && !hideSecondaryButton\"\n                    q-text-button\n                    [variant]=\"'secondary'\"\n                    [disabled]=\"disableSecondaryButton\"\n                    [loading]=\"isBackLoading$ | async\"\n                    [dataQt]=\"'q-button-wizard-back'\"\n                    (click)=\"_onSecondaryButtonClicked()\">\n                    {{ t(secondaryButtonTranslationKey) }}\n                  </button>\n                  <button\n                    *ngIf=\"!hidePrimaryButton\"\n                    q-button\n                    [disabled]=\"disablePrimaryButton\"\n                    [loading]=\"isNextLoading$ | async\"\n                    [dataQt]=\"'q-button-wizard-next'\"\n                    (click)=\"_onPrimaryButtonClicked()\">\n                    {{ t(primaryButtonTranslationKey) }}\n                  </button>\n                </div>\n              </div>\n            </ng-template>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-wizard{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;width:100%;height:100%;display:flex;flex-direction:column}.q-wizard-active-step-link{color:green}.q-wizard-disabled-step-link{color:#d3d3d3;pointer-events:none}.q-wizard-stepper-name{color:var(--ads-color-body-600);margin-bottom:var(--ads-size-l)}.q-wizard-stepper-content{overflow:auto}.q-wizard-stepper-section{position:fixed;left:0;right:0;top:var(--wizard-y-offset, 0);background-color:var(--ads-color-body-200);padding-bottom:var(--ads-size-xxs);display:flex;flex-direction:column;border-bottom-left-radius:var(--ads-size-xxs);border-bottom-right-radius:var(--ads-size-xxs);z-index:1}.q-wizard-stepper-section a,.q-wizard-stepper-section li{text-decoration:none}.q-wizard-step-section{flex:auto;margin-top:100px;overflow:hidden}.q-wizard-step-scrollable-content{padding:var(--ads-size-s) var(--ads-size-s) var(--ads-size-l) var(--ads-size-s)}.q-wizard-step-footer{margin-top:var(--ads-size-l)}.q-wizard-step-footer-actions{display:flex;flex-direction:column-reverse;gap:var(--ads-size-xxs)}.q-wizard-step-scrollable-content{overflow-y:overlay}@media(min-width:600px)and (max-width:839px){.q-wizard-step-scrollable-content{padding-left:var(--ads-size-l);padding-right:var(--ads-size-l)}}@media(min-width:600px){.q-wizard .q-wizard-step-footer{flex-direction:row;margin-top:var(--ads-size-huge)}.q-wizard .q-wizard-step-footer-actions{gap:var(ads-size-s);flex-direction:row}}@media(min-width:840px)and (max-width:1019px){.q-wizard-step-scrollable-content{padding-left:138px;padding-right:138px}}@media(min-width:1020px){.q-wizard{flex-direction:row}.q-wizard-stepper-section{top:var(--wizard-y-offset, 0);bottom:0;left:0;min-width:320px;max-width:320px;padding:var(--ads-size-huge) var(--ads-size-l) 0;min-height:auto;max-height:none;height:calc(100% - var(--wizard-y-offset, 0));border-bottom-left-radius:0;border-bottom-right-radius:0}.q-wizard-step-section{margin-top:0;height:100%;margin-left:320px}.q-wizard-step-scrollable-content{padding:64px 120px}.q-wizard-step-container{max-width:630px}}@media(min-width:1280px){.q-wizard-stepper-section{min-width:407px;max-width:407px;padding:var(--ads-size-huge) 63px 0 var(--ads-size-l)}.q-wizard-step-section{margin-left:407px}.q-wizard-step-scrollable-content{padding:var(--ads-size-huge) 141px}}@media(min-width:1920px){.q-wizard-stepper-section{min-width:713px;max-width:713px;padding:var(--ads-size-huge) 89px 0 320px}.q-wizard-step-section{margin-left:713px}.q-wizard-step-scrollable-content{padding:var(--ads-size-huge) 149px}}\n"], dependencies: [{ kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: i1.TranslocoDirective, selector: "[transloco]", inputs: ["transloco", "translocoParams", "translocoScope", "translocoRead", "translocoPrefix", "translocoLang", "translocoLoadingTpl"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QWizardStepComponent, selector: "q-wizard-step", inputs: ["title", "wizardName", "parentStepTitle", "isScreenSmallDown", "template", "showPageTitle", "dataQt"] }, { kind: "component", type: QButtonComponent, selector: "    button[q-button],    button[q-text-button],    button[q-icon-button],  ", inputs: ["icon", "loadingText", "size", "variant", "iconPosition", "loading", "analyticsCssClassIdentifier", "dataQt", "disabled"] }, { kind: "component", type: QStepperComponent, selector: "q-stepper", inputs: ["steps", "staticSteps", "variant", "showProgressOnActive", "showProgressOnCompleted", "beforeActiveStepChange", "dataQt", "activeIndex"], outputs: ["activeIndexChange", "overallProgressChange"] }, { kind: "pipe", type: AsyncPipe, name: "async" }, { kind: "pipe", type: QKebabCasePipe, name: "qKebabCase" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QWizardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-wizard', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [
                        TranslocoModule,
                        NgIf,
                        NgTemplateOutlet,
                        AsyncPipe,
                        QKebabCasePipe,
                        QWizardStepComponent,
                        QButtonComponent,
                        QStepperComponent,
                    ], providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE, QWizardService, QDestroyService], template: "<ng-container *transloco=\"let t\">\n  <div class=\"q-wizard\">\n    <div class=\"q-wizard-stepper-section\">\n      <div *ngIf=\"!_isScreenSmallDown\" class=\"q-wizard-stepper-name q-overline\">\n        {{ wizardName }}\n      </div>\n\n      <div class=\"q-wizard-stepper-content\">\n        <q-stepper\n          *ngIf=\"wizardService.steps$ | async as steps\"\n          [steps]=\"steps\"\n          [activeIndex]=\"wizardService.stepIndexes\"\n          [showProgressOnActive]=\"stepperShowProgressOnActive\"\n          [showProgressOnCompleted]=\"stepperShowProgressOnCompleted\"\n          [beforeActiveStepChange]=\"_onBeforeActiveStepChange\"\n          (activeIndexChange)=\"_onStepperActiveIndexChange($event)\" />\n      </div>\n    </div>\n\n    <div class=\"q-wizard-step-section\" tabindex=\"-1\">\n      <ng-content select=\"q-banner\" />\n      <div class=\"q-wizard-step-scrollable-content\" [style.height]=\"_stepContainerHeight\">\n        <div class=\"q-wizard-step-container\">\n          <q-wizard-step\n            #wizardStepEl\n            *ngIf=\"wizardService.activeStep$ | async as activeStep\"\n            [parentStepTitle]=\"\n              wizardService.parentStep?.pageTitle || wizardService.parentStep?.title || ''\n            \"\n            [title]=\"activeStep.pageTitle || activeStep.title\"\n            [dataQt]=\"'q-step-' + (activeStep.title | qKebabCase)\"\n            [wizardName]=\"wizardName\"\n            [isScreenSmallDown]=\"_isScreenSmallDown\"\n            [showPageTitle]=\"showPageTitle\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                activeStep.template || null;\n                context: {\n                  $implicit: activeStep,\n                  stepId: activeStep.id,\n                  templateContext: activeStep.templateContext,\n                }\n              \" />\n          </q-wizard-step>\n\n          <ng-container *ngIf=\"wizardService.activeStep$ | async\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                showDefaultStepFooter ? defaultFooterTemplate : customStepFooterTemplate\n              \" />\n\n            <ng-template #defaultFooterTemplate>\n              <div class=\"q-wizard-step-footer\">\n                <div class=\"q-wizard-step-footer-actions\">\n                  <button\n                    *ngIf=\"!_isSecondaryButtonHidden() && !hideSecondaryButton\"\n                    q-text-button\n                    [variant]=\"'secondary'\"\n                    [disabled]=\"disableSecondaryButton\"\n                    [loading]=\"isBackLoading$ | async\"\n                    [dataQt]=\"'q-button-wizard-back'\"\n                    (click)=\"_onSecondaryButtonClicked()\">\n                    {{ t(secondaryButtonTranslationKey) }}\n                  </button>\n                  <button\n                    *ngIf=\"!hidePrimaryButton\"\n                    q-button\n                    [disabled]=\"disablePrimaryButton\"\n                    [loading]=\"isNextLoading$ | async\"\n                    [dataQt]=\"'q-button-wizard-next'\"\n                    (click)=\"_onPrimaryButtonClicked()\">\n                    {{ t(primaryButtonTranslationKey) }}\n                  </button>\n                </div>\n              </div>\n            </ng-template>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-wizard{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;width:100%;height:100%;display:flex;flex-direction:column}.q-wizard-active-step-link{color:green}.q-wizard-disabled-step-link{color:#d3d3d3;pointer-events:none}.q-wizard-stepper-name{color:var(--ads-color-body-600);margin-bottom:var(--ads-size-l)}.q-wizard-stepper-content{overflow:auto}.q-wizard-stepper-section{position:fixed;left:0;right:0;top:var(--wizard-y-offset, 0);background-color:var(--ads-color-body-200);padding-bottom:var(--ads-size-xxs);display:flex;flex-direction:column;border-bottom-left-radius:var(--ads-size-xxs);border-bottom-right-radius:var(--ads-size-xxs);z-index:1}.q-wizard-stepper-section a,.q-wizard-stepper-section li{text-decoration:none}.q-wizard-step-section{flex:auto;margin-top:100px;overflow:hidden}.q-wizard-step-scrollable-content{padding:var(--ads-size-s) var(--ads-size-s) var(--ads-size-l) var(--ads-size-s)}.q-wizard-step-footer{margin-top:var(--ads-size-l)}.q-wizard-step-footer-actions{display:flex;flex-direction:column-reverse;gap:var(--ads-size-xxs)}.q-wizard-step-scrollable-content{overflow-y:overlay}@media(min-width:600px)and (max-width:839px){.q-wizard-step-scrollable-content{padding-left:var(--ads-size-l);padding-right:var(--ads-size-l)}}@media(min-width:600px){.q-wizard .q-wizard-step-footer{flex-direction:row;margin-top:var(--ads-size-huge)}.q-wizard .q-wizard-step-footer-actions{gap:var(ads-size-s);flex-direction:row}}@media(min-width:840px)and (max-width:1019px){.q-wizard-step-scrollable-content{padding-left:138px;padding-right:138px}}@media(min-width:1020px){.q-wizard{flex-direction:row}.q-wizard-stepper-section{top:var(--wizard-y-offset, 0);bottom:0;left:0;min-width:320px;max-width:320px;padding:var(--ads-size-huge) var(--ads-size-l) 0;min-height:auto;max-height:none;height:calc(100% - var(--wizard-y-offset, 0));border-bottom-left-radius:0;border-bottom-right-radius:0}.q-wizard-step-section{margin-top:0;height:100%;margin-left:320px}.q-wizard-step-scrollable-content{padding:64px 120px}.q-wizard-step-container{max-width:630px}}@media(min-width:1280px){.q-wizard-stepper-section{min-width:407px;max-width:407px;padding:var(--ads-size-huge) 63px 0 var(--ads-size-l)}.q-wizard-step-section{margin-left:407px}.q-wizard-step-scrollable-content{padding:var(--ads-size-huge) 141px}}@media(min-width:1920px){.q-wizard-stepper-section{min-width:713px;max-width:713px;padding:var(--ads-size-huge) 89px 0 320px}.q-wizard-step-section{margin-left:713px}.q-wizard-step-scrollable-content{padding:var(--ads-size-huge) 149px}}\n"] }]
        }], propDecorators: { stepChanged: [{
                type: Output
            }], stepCompleted: [{
                type: Output
            }], primaryButtonClicked: [{
                type: Output
            }], secondaryButtonClicked: [{
                type: Output
            }], wizardName: [{
                type: Input
            }], customStepFooterTemplate: [{
                type: Input
            }], beforeActiveStepChangeJob: [{
                type: Input
            }], beforeBackStepJob: [{
                type: Input
            }], beforeNextStepJob: [{
                type: Input
            }], primaryButtonTranslationKey: [{
                type: Input
            }], secondaryButtonTranslationKey: [{
                type: Input
            }], showDefaultStepFooter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disablePrimaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableSecondaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hidePrimaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hideSecondaryButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], stepperShowProgressOnActive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], stepperShowProgressOnCompleted: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showPageTitle: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], steps: [{
                type: Input
            }], activeStepId: [{
                type: Input
            }], _stepper: [{
                type: ViewChild,
                args: [QStepperComponent]
            }], _wizardStep: [{
                type: ViewChild,
                args: ['wizardStepEl']
            }], _banners: [{
                type: ContentChildren,
                args: [QBannerComponent, { read: ElementRef }]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QWizardComponent, QWizardService, QWizardStepComponent };
//# sourceMappingURL=questrade-allspark-angular-components-wizard.mjs.map
