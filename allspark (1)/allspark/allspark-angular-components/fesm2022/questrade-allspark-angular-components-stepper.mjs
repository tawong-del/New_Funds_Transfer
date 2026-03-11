import { FocusKeyManager, CdkTrapFocus, A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgIf, NgClass, NgTemplateOutlet, NgFor } from '@angular/common';
import * as i0 from '@angular/core';
import { HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, EventEmitter, inject, ViewChild, Output, ViewChildren, ChangeDetectorRef, booleanAttribute } from '@angular/core';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { isPresent, SPACE, ENTER, RIGHT_ARROW, LEFT_ARROW } from '@questrade/allspark-angular-components/core/utils';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { QInteractiveIconComponent } from '@questrade/allspark-angular-components/interactive-icon';
import { QOverlayComponent } from '@questrade/allspark-angular-components/overlay';
import { QProgressBarComponent } from '@questrade/allspark-angular-components/progress-bar';
import { chevronDown, clear, thickCheck, lockOutline, moreVertical, unfoldMore } from '@questrade/allspark-icons/icons';
import { Subscription, of, take, takeUntil, Subject } from 'rxjs';

class QStaticStepComponent {
    step;
    index;
    last = false;
    previousStepCompleted = false;
    dataQt = 'q-static-step';
    get hostClasses() {
        return [
            'q-static-step',
            this.step?.status === 'completed' && 'q-static-step-completed',
            this.previousStepCompleted && 'q-static-step-previous-completed',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _getProgressValue() {
        return ['completed', 'pending'].includes(this.step.status) ? 100 : 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QStaticStepComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QStaticStepComponent, isStandalone: true, selector: "q-static-step", inputs: { step: "step", index: "index", last: "last", previousStepCompleted: "previousStepCompleted", dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, providers: [QDestroyService], ngImport: i0, template: "<div class=\"q-static-step-container\" [ngClass]=\"{ 'q-static-step-bottom-margin': !last }\">\n  <div class=\"q-static-step-header\">\n    <q-progress-bar\n      class=\"q-static-step-progress-bar\"\n      [variant]=\"'circular'\"\n      [progress]=\"_getProgressValue()\"\n      [selectedState]=\"step.status === 'pending'\" />\n    <span class=\"q-static-step-title q-display-xs\">{{ step.title }}</span>\n  </div>\n\n  <div *ngIf=\"step.staticStepContent\" #stepContent class=\"q-static-step-content\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        step.staticStepContent;\n        context: {\n          $implicit: step,\n          index: index,\n          staticStepContext: step?.staticStepContext,\n        }\n      \" />\n  </div>\n</div>\n", styles: [".q-static-step-container{position:relative;display:flex;flex-direction:column}.q-static-step-container.q-static-step-bottom-margin{padding-bottom:var(--ads-size-m)}.q-static-step-container:before{content:\"\";position:absolute;background:var(--ads-color-body-400);width:1px;height:var(--ads-size-m);left:calc(var(--ads-size-m) / 2 - var(--ads-size-quark) / 2);bottom:0;z-index:0}.q-static-step-header{display:flex;align-items:center;position:relative}.q-static-step-header:before,.q-static-step-header:after{content:\"\";position:absolute;background:var(--ads-color-body-400);left:calc(var(--ads-size-m) / 2 - var(--ads-size-quark) / 2);width:1px;z-index:0}.q-static-step-header:before{top:0;height:50%}.q-static-step-header:after{top:50%;height:50%}.q-static-step-content{padding-top:var(--ads-size-micro);padding-left:var(--ads-size-xxxl);position:relative}.q-static-step-content:before{content:\"\";position:absolute;background:var(--ads-color-body-400);left:calc(var(--ads-size-m) / 2 - var(--ads-size-quark) / 2);width:1px;z-index:0;top:0;height:100%}.q-static-step:first-child .q-static-step-header:before{content:none}.q-static-step:last-child .q-static-step-header:after{content:none}.q-static-step:last-child .q-static-step-content:before,.q-static-step:last-child .q-static-step-container:before{content:none}.q-static-step-completed .q-static-step-header:after,.q-static-step-completed .q-static-step-content:before,.q-static-step-completed .q-static-step-container:before{width:var(--ads-size-quark);background:var(--ads-color-success-400)}.q-static-step-previous-completed .q-static-step-header:before{width:var(--ads-size-quark);background:var(--ads-color-success-400)}.q-static-step-progress-bar{z-index:1}.q-static-step-progress-bar .q-progress-bar-circular,.q-static-step-progress-bar .q-progress-bar-circular.not-started{width:var(--ads-size-m);height:var(--ads-size-m)}.q-static-step-progress-bar .q-progress-bar-circular .q-progress-bar-circular-icon-success,.q-static-step-progress-bar .q-progress-bar-circular.not-started .q-progress-bar-circular-icon-success{width:var(--ads-size-xxs)}.q-static-step-title{margin-left:var(--ads-size-s)}@media(max-width:1019px){.q-static-step-progress-bar .q-progress-bar-circular,.q-static-step-progress-bar .q-progress-bar-circular.not-started{width:var(--ads-size-m);height:var(--ads-size-m)}.q-static-step-progress-bar .q-progress-bar-circular .q-progress-bar-circular-icon-success,.q-static-step-progress-bar .q-progress-bar-circular.not-started .q-progress-bar-circular-icon-success{width:var(--ads-size-xxs)}}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QProgressBarComponent, selector: "q-progress-bar", inputs: ["variant", "size", "circularProgressLabel", "selectedState", "segmentInReviewIndex", "disabled", "dataQt", "segments", "progress"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QStaticStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-static-step', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [NgIf, NgClass, NgTemplateOutlet, QProgressBarComponent], providers: [QDestroyService], template: "<div class=\"q-static-step-container\" [ngClass]=\"{ 'q-static-step-bottom-margin': !last }\">\n  <div class=\"q-static-step-header\">\n    <q-progress-bar\n      class=\"q-static-step-progress-bar\"\n      [variant]=\"'circular'\"\n      [progress]=\"_getProgressValue()\"\n      [selectedState]=\"step.status === 'pending'\" />\n    <span class=\"q-static-step-title q-display-xs\">{{ step.title }}</span>\n  </div>\n\n  <div *ngIf=\"step.staticStepContent\" #stepContent class=\"q-static-step-content\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        step.staticStepContent;\n        context: {\n          $implicit: step,\n          index: index,\n          staticStepContext: step?.staticStepContext,\n        }\n      \" />\n  </div>\n</div>\n", styles: [".q-static-step-container{position:relative;display:flex;flex-direction:column}.q-static-step-container.q-static-step-bottom-margin{padding-bottom:var(--ads-size-m)}.q-static-step-container:before{content:\"\";position:absolute;background:var(--ads-color-body-400);width:1px;height:var(--ads-size-m);left:calc(var(--ads-size-m) / 2 - var(--ads-size-quark) / 2);bottom:0;z-index:0}.q-static-step-header{display:flex;align-items:center;position:relative}.q-static-step-header:before,.q-static-step-header:after{content:\"\";position:absolute;background:var(--ads-color-body-400);left:calc(var(--ads-size-m) / 2 - var(--ads-size-quark) / 2);width:1px;z-index:0}.q-static-step-header:before{top:0;height:50%}.q-static-step-header:after{top:50%;height:50%}.q-static-step-content{padding-top:var(--ads-size-micro);padding-left:var(--ads-size-xxxl);position:relative}.q-static-step-content:before{content:\"\";position:absolute;background:var(--ads-color-body-400);left:calc(var(--ads-size-m) / 2 - var(--ads-size-quark) / 2);width:1px;z-index:0;top:0;height:100%}.q-static-step:first-child .q-static-step-header:before{content:none}.q-static-step:last-child .q-static-step-header:after{content:none}.q-static-step:last-child .q-static-step-content:before,.q-static-step:last-child .q-static-step-container:before{content:none}.q-static-step-completed .q-static-step-header:after,.q-static-step-completed .q-static-step-content:before,.q-static-step-completed .q-static-step-container:before{width:var(--ads-size-quark);background:var(--ads-color-success-400)}.q-static-step-previous-completed .q-static-step-header:before{width:var(--ads-size-quark);background:var(--ads-color-success-400)}.q-static-step-progress-bar{z-index:1}.q-static-step-progress-bar .q-progress-bar-circular,.q-static-step-progress-bar .q-progress-bar-circular.not-started{width:var(--ads-size-m);height:var(--ads-size-m)}.q-static-step-progress-bar .q-progress-bar-circular .q-progress-bar-circular-icon-success,.q-static-step-progress-bar .q-progress-bar-circular.not-started .q-progress-bar-circular-icon-success{width:var(--ads-size-xxs)}.q-static-step-title{margin-left:var(--ads-size-s)}@media(max-width:1019px){.q-static-step-progress-bar .q-progress-bar-circular,.q-static-step-progress-bar .q-progress-bar-circular.not-started{width:var(--ads-size-m);height:var(--ads-size-m)}.q-static-step-progress-bar .q-progress-bar-circular .q-progress-bar-circular-icon-success,.q-static-step-progress-bar .q-progress-bar-circular.not-started .q-progress-bar-circular-icon-success{width:var(--ads-size-xxs)}}\n"] }]
        }], propDecorators: { step: [{
                type: Input,
                args: [{ required: true }]
            }], index: [{
                type: Input,
                args: [{ required: true }]
            }], last: [{
                type: Input
            }], previousStepCompleted: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QSubStepComponent {
    completedChange = new EventEmitter();
    activeIndexChange = new EventEmitter();
    subStepFocus = new EventEmitter();
    beforeActiveStepChange = null;
    parentIndex;
    subStep;
    index;
    activeIndex;
    parentExpanded = false;
    get dataQt() {
        return `q-sub-step-${this.subStep.title.replaceAll(' ', '-').toLowerCase()}`;
    }
    _subStepContent;
    beforeActiveStepChangeSub = Subscription.EMPTY;
    _destroy$ = inject(QDestroyService);
    ngOnChanges(changes) {
        const { subStep } = changes;
        if (subStep?.currentValue?.completed) {
            this.completedChange.emit();
        }
    }
    ngOnDestroy() {
        this.beforeActiveStepChangeSub?.unsubscribe();
    }
    _onSubStepClick() {
        if (!this.isActive) {
            const nextIndex = { stepIndex: this.parentIndex, subStepIndex: this.index };
            const beforeActiveStepChange$ = this.beforeActiveStepChange
                ? this.beforeActiveStepChange(this.activeIndex, nextIndex)
                : of(true);
            beforeActiveStepChange$.pipe(take(1), takeUntil(this._destroy$)).subscribe({
                next: (success) => {
                    if (success) {
                        this.activeIndex = nextIndex;
                        this.activeIndexChange.emit(this.activeIndex);
                    }
                },
            });
        }
    }
    _onSubStepFocus() {
        this.subStepFocus.emit();
    }
    /** @hidden */
    focus() {
        this._subStepContent.nativeElement.focus();
    }
    /** @hidden */
    getLabel() {
        return this.subStep?.title;
    }
    get isActive() {
        return (this.parentIndex === this.activeIndex?.stepIndex &&
            this.index === this.activeIndex?.subStepIndex);
    }
    get disabled() {
        return !this.parentExpanded;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSubStepComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QSubStepComponent, isStandalone: true, selector: "q-sub-step", inputs: { beforeActiveStepChange: "beforeActiveStepChange", parentIndex: "parentIndex", subStep: "subStep", index: "index", activeIndex: "activeIndex", parentExpanded: "parentExpanded", dataQt: "dataQt" }, outputs: { completedChange: "completedChange", activeIndexChange: "activeIndexChange", subStepFocus: "subStepFocus" }, host: { properties: { "attr.data-qt": "this.dataQt" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "_subStepContent", first: true, predicate: ["subStepContent"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  #subStepContent\n  role=\"treeitem\"\n  class=\"q-sub-step-content q-focus-indicator-inset\"\n  [class.q-sub-step-first]=\"index === 0\"\n  [attr.tabindex]=\"isActive ? 0 : -1\"\n  [attr.aria-selected]=\"parentExpanded && isActive\"\n  [attr.aria-current]=\"isActive ? 'step' : null\"\n  (focus)=\"_onSubStepFocus()\"\n  (click)=\"_onSubStepClick()\"\n  (keyup.enter)=\"_onSubStepClick()\"\n  (keyup.space)=\"_onSubStepClick()\">\n  <span class=\"q-sub-step-title q-body-s\" [class.q-sub-step-active]=\"isActive\">\n    {{ subStep.title }}\n  </span>\n  <div class=\"q-sub-step-tail\"></div>\n</div>\n", styles: [".q-sub-step-content{color:var(--ads-color-body-contrast-400);position:relative;display:flex;align-items:center;min-height:var(--ads-size-m);padding-left:var(--ads-size-xxxs);margin-top:var(--ads-size-nano);cursor:pointer;outline:none}.q-sub-step-tail{position:absolute;width:var(--ads-size-micro);height:var(--ads-size-micro);background:var(--ads-color-success-400);left:calc((var(--ads-size-micro) / 2 + var(--ads-size-xxxs) + var(--ads-size-l) / 2) * -1);border-radius:var(--ads-border-radius-xl)}.q-sub-step-first{margin-top:var(--ads-size-micro)}.q-sub-step-active{color:var(--ads-color-primary-500);font-weight:var(--ads-font-weight-semi-bold)}@media(max-width:1019px){.q-sub-step-content{padding-left:0}.q-sub-step-tail{left:calc((var(--ads-size-micro) + var(--ads-size-xxxs) + var(--ads-size-s) / 2) * -1)}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSubStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-sub-step', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [QDestroyService], template: "<div\n  #subStepContent\n  role=\"treeitem\"\n  class=\"q-sub-step-content q-focus-indicator-inset\"\n  [class.q-sub-step-first]=\"index === 0\"\n  [attr.tabindex]=\"isActive ? 0 : -1\"\n  [attr.aria-selected]=\"parentExpanded && isActive\"\n  [attr.aria-current]=\"isActive ? 'step' : null\"\n  (focus)=\"_onSubStepFocus()\"\n  (click)=\"_onSubStepClick()\"\n  (keyup.enter)=\"_onSubStepClick()\"\n  (keyup.space)=\"_onSubStepClick()\">\n  <span class=\"q-sub-step-title q-body-s\" [class.q-sub-step-active]=\"isActive\">\n    {{ subStep.title }}\n  </span>\n  <div class=\"q-sub-step-tail\"></div>\n</div>\n", styles: [".q-sub-step-content{color:var(--ads-color-body-contrast-400);position:relative;display:flex;align-items:center;min-height:var(--ads-size-m);padding-left:var(--ads-size-xxxs);margin-top:var(--ads-size-nano);cursor:pointer;outline:none}.q-sub-step-tail{position:absolute;width:var(--ads-size-micro);height:var(--ads-size-micro);background:var(--ads-color-success-400);left:calc((var(--ads-size-micro) / 2 + var(--ads-size-xxxs) + var(--ads-size-l) / 2) * -1);border-radius:var(--ads-border-radius-xl)}.q-sub-step-first{margin-top:var(--ads-size-micro)}.q-sub-step-active{color:var(--ads-color-primary-500);font-weight:var(--ads-font-weight-semi-bold)}@media(max-width:1019px){.q-sub-step-content{padding-left:0}.q-sub-step-tail{left:calc((var(--ads-size-micro) + var(--ads-size-xxxs) + var(--ads-size-s) / 2) * -1)}}\n"] }]
        }], propDecorators: { completedChange: [{
                type: Output
            }], activeIndexChange: [{
                type: Output
            }], subStepFocus: [{
                type: Output
            }], beforeActiveStepChange: [{
                type: Input
            }], parentIndex: [{
                type: Input,
                args: [{ required: true }]
            }], subStep: [{
                type: Input,
                args: [{ required: true }]
            }], index: [{
                type: Input,
                args: [{ required: true }]
            }], activeIndex: [{
                type: Input,
                args: [{ required: true }]
            }], parentExpanded: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _subStepContent: [{
                type: ViewChild,
                args: ['subStepContent']
            }] } });

class QStepComponent extends CdkAccordionItem {
    activeIndexChange = new EventEmitter();
    stepProgressChange = new EventEmitter();
    stepFocus = new EventEmitter();
    subStepFocus = new EventEmitter();
    index;
    step;
    activeIndex;
    last = false;
    horizontalView = false;
    showProgressOnActive = false;
    showProgressOnCompleted = false;
    previousStepCompleted = false;
    beforeActiveStepChange = null;
    get dataQt() {
        return `q-step-${this.step?.title?.replaceAll(' ', '-').toLowerCase()}`;
    }
    _subStepList;
    _stepHeader;
    get hostClasses() {
        return [
            'q-step',
            this.isCompleted && 'q-step-completed',
            this.previousStepCompleted && 'q-step-previous-completed',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _inReview = false;
    _stepExpanded = false;
    _progress = 0;
    _stepRelativeProgress = 0;
    _iconRegistry = inject(QIconRegistryService);
    _destroy$ = inject(QDestroyService);
    ngOnInit() {
        this._iconRegistry.registerIcon(chevronDown);
        this._setRelativeProgress();
        this._updateProgress();
        this._setDefaultValues();
    }
    ngOnChanges(changes) {
        const { activeIndex } = changes;
        if (this.isActive && !this.step?.subSteps?.some((sub) => sub.completed)) {
            this._updateProgress();
        }
        if (activeIndex) {
            this._activateStep();
            this._resetNonClicked();
            this._updateProgress();
        }
    }
    _onStepClick() {
        if (!this.isLocked && this._progress > 0) {
            if (this.isCompleted) {
                this._setToggleState();
            }
            if (this.showAccordion)
                return;
            this._changeActiveIndex();
        }
    }
    _changeActiveIndex() {
        if (!this.isActive) {
            const nextIndex = {
                stepIndex: this.index,
                ...(this.hasSubSteps && { subStepIndex: 0 }),
            };
            const beforeActiveStepChange$ = this.beforeActiveStepChange
                ? this.beforeActiveStepChange(this.activeIndex, nextIndex)
                : of(true);
            beforeActiveStepChange$.pipe(take(1), takeUntil(this._destroy$)).subscribe({
                next: (success) => {
                    if (success) {
                        this.activeIndex = nextIndex;
                        this.activeIndexChange.emit(this.activeIndex);
                    }
                },
            });
        }
    }
    _onActiveIndexChange(activeIndex) {
        this.activeIndex = activeIndex;
        this.activeIndexChange.emit(this.activeIndex);
    }
    _onSubStepCompleted() {
        this._updateProgress();
    }
    _updateProgress() {
        const completedSubSteps = this.step?.subSteps?.filter((sub) => sub.completed).length || 0;
        let currentProgress = 0;
        if (this.isCompleted) {
            currentProgress = 100;
        }
        else if (!completedSubSteps && this.isActive) {
            currentProgress = 2;
        }
        else {
            currentProgress = completedSubSteps * this._stepRelativeProgress;
        }
        this._progress = Math.trunc(currentProgress);
        this.stepProgressChange.emit({
            index: this.index,
            progress: this._progress,
        });
    }
    _onStepFocus() {
        this.stepFocus.emit();
    }
    _onSubStepFocus(subStep) {
        this.subStepFocus.emit(subStep);
    }
    /** @hidden */
    focus() {
        this._stepHeader.nativeElement.focus();
    }
    /** @hidden */
    getLabel() {
        return this.step?.title;
    }
    get isActive() {
        return this.index === this.activeIndex?.stepIndex;
    }
    get isLocked() {
        return !this.step?.editable && this.isCompleted;
    }
    get isCompleted() {
        return this.hasSubSteps
            ? !!this.step?.subSteps?.every((sub) => sub.completed)
            : !!this.step?.completed;
    }
    get showAccordion() {
        return (this.isCompleted &&
            (this.step?.editable || !isPresent(this.step?.editable)) &&
            this.hasSubSteps);
    }
    get hasSubSteps() {
        return !!this.step?.subSteps?.length;
    }
    get circularProgressLabel() {
        return String(this.index + 1);
    }
    get showProgress() {
        return ((this.showProgressOnActive && this._progress > 0 && !this.isCompleted) ||
            (this.showProgressOnCompleted && this.isCompleted));
    }
    get ariaGroupId() {
        return this.step.subSteps?.length
            ? `${this.step.title?.toLowerCase().replace(/ /g, '-')}-idx${this.index}-subtree`
            : null;
    }
    _setDefaultValues() {
        this.step = {
            ...this.step,
            editable: !isPresent(this.step?.editable) ? true : this.step?.editable,
        };
    }
    _setToggleState() {
        if (this.isCompleted && !this.isLocked) {
            this._inReview = !this._inReview;
        }
        if (this.showAccordion) {
            this._stepExpanded = !this._stepExpanded;
        }
    }
    _activateStep() {
        if (this.isCompleted) {
            if (!this._stepExpanded && !this._inReview) {
                this._inReview = true;
                if (this.showAccordion) {
                    this._stepExpanded = true;
                }
            }
        }
    }
    _resetNonClicked() {
        if (!this.isActive && this.isCompleted && (this._stepExpanded || this._inReview)) {
            this._resetToggleState();
        }
    }
    _resetToggleState() {
        this._stepExpanded = false;
        this._inReview = false;
    }
    _setRelativeProgress() {
        const subStepLength = this.step?.subSteps?.length;
        this._stepRelativeProgress = subStepLength ? 100 / subStepLength : 1;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QStepComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QStepComponent, isStandalone: true, selector: "q-step", inputs: { index: "index", step: "step", activeIndex: "activeIndex", last: "last", horizontalView: "horizontalView", showProgressOnActive: "showProgressOnActive", showProgressOnCompleted: "showProgressOnCompleted", previousStepCompleted: "previousStepCompleted", beforeActiveStepChange: "beforeActiveStepChange", dataQt: "dataQt" }, outputs: { activeIndexChange: "activeIndexChange", stepProgressChange: "stepProgressChange", stepFocus: "stepFocus", subStepFocus: "subStepFocus" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "_stepHeader", first: true, predicate: ["stepHeader"], descendants: true }, { propertyName: "_subStepList", predicate: QSubStepComponent, descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"q-step-container\" [class.q-step-expanded]=\"_stepExpanded\">\n  <div class=\"q-step-accordion\" role=\"button\">\n    <div class=\"q-step-header-container\">\n      <q-progress-bar\n        class=\"q-step-progress-bar\"\n        [variant]=\"'circular'\"\n        [circularProgressLabel]=\"circularProgressLabel\"\n        [progress]=\"_progress\"\n        [selectedState]=\"_inReview && index === activeIndex.stepIndex\"\n        [disabled]=\"_progress === 0 || isLocked\" />\n\n      <div\n        #stepHeader\n        role=\"treeitem\"\n        class=\"q-step-header q-focus-indicator-inset\"\n        [attr.tabindex]=\"isActive && !_stepExpanded ? 0 : -1\"\n        [attr.aria-owns]=\"ariaGroupId\"\n        [attr.aria-current]=\"isActive && !step.subSteps?.length ? 'step' : null\"\n        [attr.aria-expanded]=\"_stepExpanded\"\n        [attr.aria-selected]=\"isActive && !_stepExpanded\"\n        [attr.aria-disabled]=\"_progress === 0 || isLocked\"\n        [class.q-step-header-pointer]=\"_progress > 0 && !isLocked\"\n        (focus)=\"_onStepFocus()\"\n        (click)=\"_onStepClick()\"\n        (keyup.enter)=\"_onStepClick()\"\n        (keyup.space)=\"_onStepClick()\">\n        <div class=\"q-stepper-title-container\">\n          <span *ngIf=\"showProgress\" class=\"step-progress q-note\">\n            {{ _progress === 2 ? 0 : _progress }}%\n          </span>\n          <span class=\"q-step-title q-display-xs\" [class.q-step-upcoming-state]=\"_progress === 0\">\n            {{ step.title }}\n          </span>\n        </div>\n\n        <q-icon\n          *ngIf=\"showAccordion\"\n          name=\"chevronDown\"\n          class=\"chevron-down q-step-accordion-icon\"\n          [size]=\"'24'\"\n          [dataQt]=\"'q-step-chevron-down-icon'\"\n          [class.q-step-accordion-expanded-icon]=\"_stepExpanded\" />\n\n        <q-interactive-icon\n          *ngIf=\"isLocked\"\n          [tabindex]=\"-1\"\n          [tooltipPosition]=\"'right'\"\n          [tooltipValue]=\"'Locked'\"\n          class=\"q-icon--md q-step-accordion-icon\"\n          [dataQt]=\"'q-step-lock-outline-icon'\"\n          [icon]=\"'lockOutline'\" />\n      </div>\n    </div>\n  </div>\n\n  <div\n    *ngIf=\"step?.subSteps?.length\"\n    class=\"q-sub-step-container\"\n    role=\"group\"\n    [attr.id]=\"ariaGroupId\"\n    [attr.aria-label]=\"step.title\"\n    [style.display]=\"_stepExpanded ? '' : 'none'\">\n    <q-sub-step\n      #subStepEl\n      role=\"none\"\n      *ngFor=\"let subStep of step?.subSteps; let subStepIndex = index\"\n      [subStep]=\"subStep\"\n      [index]=\"subStepIndex\"\n      [activeIndex]=\"activeIndex\"\n      [parentIndex]=\"index\"\n      [beforeActiveStepChange]=\"beforeActiveStepChange\"\n      [parentExpanded]=\"_stepExpanded\"\n      (completedChange)=\"_onSubStepCompleted()\"\n      (activeIndexChange)=\"_onActiveIndexChange($event)\"\n      (subStepFocus)=\"_onSubStepFocus(subStepEl)\">\n    </q-sub-step>\n  </div>\n</div>\n", styles: [".q-step-title.q-step-upcoming-state{color:var(--ads-color-body-600)}.q-sub-step-container{display:flex;flex-direction:column;position:relative;margin-left:calc(var(--ads-size-l) + var(--ads-size-xxxs))}.q-sub-step-container:before{content:\"\";position:absolute;width:var(--ads-size-quark);height:100%;background-color:var(--ads-color-success-400);left:calc((var(--ads-size-l) / 2 + var(--ads-size-xxxs) + var(--ads-size-quark) / 2) * -1)}.q-step-accordion.q-accordion-variant-primary .q-accordion-panel{border-width:0}.q-step-accordion.q-accordion-variant-primary .q-accordion-panel .q-accordion-body{background-color:transparent;padding-bottom:0}.q-step-container{position:relative;padding-bottom:var(--ads-size-m)}.q-step-container.q-step-expanded{padding-bottom:var(--ads-size-s)}.q-step-container:before{content:\"\";position:absolute;width:var(--ads-size-quark);height:var(--ads-size-m);background-color:var(--ads-color-body-400);left:calc(var(--ads-size-l) / 2 - var(--ads-size-quark) / 2);bottom:0;z-index:1}.q-step-header-container{display:flex;align-items:center;width:100%;position:relative}.q-step-header-container:before,.q-step-header-container:after{content:\"\";position:absolute;width:var(--ads-size-quark);background-color:var(--ads-color-body-400);left:calc(var(--ads-size-l) / 2 - var(--ads-size-quark) / 2);z-index:0}.q-step-header-container:before{height:50%;top:0}.q-step-header-container:after{top:50%;height:50%}.q-step-progress-bar{display:inline-block;margin-right:var(--ads-size-xxxs);z-index:1}.q-step:first-child .q-step-header-container:before{content:none}.q-step:last-child .q-step-container:before,.q-step:last-child .q-step-header-container:after{content:none}.q-step-previous-completed .q-step-header-container:before{background-color:var(--ads-color-success-400);transition:background-color 1ms cubic-bezier(.645,.045,.355,1)}.q-step-completed .q-step-header-container:before,.q-step-completed .q-step-header-container:after,.q-step-completed .q-step-container:before,.q-step-completed .q-step-container:after{background-color:var(--ads-color-success-400);transition:background-color 1ms cubic-bezier(.645,.045,.355,1)}.q-step-header{color:var(--ads-color-body-contrast-400);display:flex;align-items:center;min-height:var(--ads-size-xxl);flex:1;padding-left:var(--ads-size-xxxs);cursor:default;position:relative;outline:none}.q-step-header .q-stepper-title-container{display:flex;flex-direction:column}.q-step-header.q-step-header-pointer{cursor:pointer}.q-step-accordion-icon{margin-left:auto;transform:rotate(0);transition:transform .24s ease}.q-step-accordion-icon.q-step-accordion-expanded-icon{transform:rotate(180deg)}@media(max-width:1019px){.q-step-container{padding-bottom:var(--ads-size-micro)}.q-step-container.q-step-expanded{padding-bottom:var(--ads-size-xxxs)}.q-step-container:before{height:var(--ads-size-xxxs);left:calc(var(--ads-size-s) / 2 - var(--ads-size-quark) / 2)}.q-sub-step-container{margin-left:calc(var(--ads-size-s) + var(--ads-size-micro) + var(--ads-size-micro))}.q-sub-step-container:before{left:calc((var(--ads-size-s) / 2 + var(--ads-size-micro) + var(--ads-size-micro) + var(--ads-size-quark) / 2) * -1)}.q-step-progress-bar{margin-right:var(--ads-size-micro);height:var(--ads-size-s);width:var(--ads-size-s);display:flex;align-items:center;justify-content:center}.q-step-header{padding-left:var(--ads-size-micro)}.q-step-header-container:before,.q-step-header-container:after{left:calc(var(--ads-size-s) / 2 - var(--ads-size-quark) / 2);width:var(--ads-size-quark)}}\n"], dependencies: [{ kind: "ngmodule", type: CdkAccordionModule }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: QSubStepComponent, selector: "q-sub-step", inputs: ["beforeActiveStepChange", "parentIndex", "subStep", "index", "activeIndex", "parentExpanded", "dataQt"], outputs: ["completedChange", "activeIndexChange", "subStepFocus"] }, { kind: "component", type: QProgressBarComponent, selector: "q-progress-bar", inputs: ["variant", "size", "circularProgressLabel", "selectedState", "segmentInReviewIndex", "disabled", "dataQt", "segments", "progress"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QInteractiveIconComponent, selector: "q-interactive-icon", inputs: ["icon", "context", "size", "tooltipValue", "tooltipPosition", "disabled", "tabindex", "tooltipShowDelay", "tooltipHideDelay", "tooltipLongPressDelay", "dataQt", "iconSize", "color"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-step', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [
                        CdkAccordionModule,
                        NgIf,
                        NgFor,
                        QSubStepComponent,
                        QProgressBarComponent,
                        QIconComponent,
                        QInteractiveIconComponent,
                    ], providers: [QDestroyService], template: "<div class=\"q-step-container\" [class.q-step-expanded]=\"_stepExpanded\">\n  <div class=\"q-step-accordion\" role=\"button\">\n    <div class=\"q-step-header-container\">\n      <q-progress-bar\n        class=\"q-step-progress-bar\"\n        [variant]=\"'circular'\"\n        [circularProgressLabel]=\"circularProgressLabel\"\n        [progress]=\"_progress\"\n        [selectedState]=\"_inReview && index === activeIndex.stepIndex\"\n        [disabled]=\"_progress === 0 || isLocked\" />\n\n      <div\n        #stepHeader\n        role=\"treeitem\"\n        class=\"q-step-header q-focus-indicator-inset\"\n        [attr.tabindex]=\"isActive && !_stepExpanded ? 0 : -1\"\n        [attr.aria-owns]=\"ariaGroupId\"\n        [attr.aria-current]=\"isActive && !step.subSteps?.length ? 'step' : null\"\n        [attr.aria-expanded]=\"_stepExpanded\"\n        [attr.aria-selected]=\"isActive && !_stepExpanded\"\n        [attr.aria-disabled]=\"_progress === 0 || isLocked\"\n        [class.q-step-header-pointer]=\"_progress > 0 && !isLocked\"\n        (focus)=\"_onStepFocus()\"\n        (click)=\"_onStepClick()\"\n        (keyup.enter)=\"_onStepClick()\"\n        (keyup.space)=\"_onStepClick()\">\n        <div class=\"q-stepper-title-container\">\n          <span *ngIf=\"showProgress\" class=\"step-progress q-note\">\n            {{ _progress === 2 ? 0 : _progress }}%\n          </span>\n          <span class=\"q-step-title q-display-xs\" [class.q-step-upcoming-state]=\"_progress === 0\">\n            {{ step.title }}\n          </span>\n        </div>\n\n        <q-icon\n          *ngIf=\"showAccordion\"\n          name=\"chevronDown\"\n          class=\"chevron-down q-step-accordion-icon\"\n          [size]=\"'24'\"\n          [dataQt]=\"'q-step-chevron-down-icon'\"\n          [class.q-step-accordion-expanded-icon]=\"_stepExpanded\" />\n\n        <q-interactive-icon\n          *ngIf=\"isLocked\"\n          [tabindex]=\"-1\"\n          [tooltipPosition]=\"'right'\"\n          [tooltipValue]=\"'Locked'\"\n          class=\"q-icon--md q-step-accordion-icon\"\n          [dataQt]=\"'q-step-lock-outline-icon'\"\n          [icon]=\"'lockOutline'\" />\n      </div>\n    </div>\n  </div>\n\n  <div\n    *ngIf=\"step?.subSteps?.length\"\n    class=\"q-sub-step-container\"\n    role=\"group\"\n    [attr.id]=\"ariaGroupId\"\n    [attr.aria-label]=\"step.title\"\n    [style.display]=\"_stepExpanded ? '' : 'none'\">\n    <q-sub-step\n      #subStepEl\n      role=\"none\"\n      *ngFor=\"let subStep of step?.subSteps; let subStepIndex = index\"\n      [subStep]=\"subStep\"\n      [index]=\"subStepIndex\"\n      [activeIndex]=\"activeIndex\"\n      [parentIndex]=\"index\"\n      [beforeActiveStepChange]=\"beforeActiveStepChange\"\n      [parentExpanded]=\"_stepExpanded\"\n      (completedChange)=\"_onSubStepCompleted()\"\n      (activeIndexChange)=\"_onActiveIndexChange($event)\"\n      (subStepFocus)=\"_onSubStepFocus(subStepEl)\">\n    </q-sub-step>\n  </div>\n</div>\n", styles: [".q-step-title.q-step-upcoming-state{color:var(--ads-color-body-600)}.q-sub-step-container{display:flex;flex-direction:column;position:relative;margin-left:calc(var(--ads-size-l) + var(--ads-size-xxxs))}.q-sub-step-container:before{content:\"\";position:absolute;width:var(--ads-size-quark);height:100%;background-color:var(--ads-color-success-400);left:calc((var(--ads-size-l) / 2 + var(--ads-size-xxxs) + var(--ads-size-quark) / 2) * -1)}.q-step-accordion.q-accordion-variant-primary .q-accordion-panel{border-width:0}.q-step-accordion.q-accordion-variant-primary .q-accordion-panel .q-accordion-body{background-color:transparent;padding-bottom:0}.q-step-container{position:relative;padding-bottom:var(--ads-size-m)}.q-step-container.q-step-expanded{padding-bottom:var(--ads-size-s)}.q-step-container:before{content:\"\";position:absolute;width:var(--ads-size-quark);height:var(--ads-size-m);background-color:var(--ads-color-body-400);left:calc(var(--ads-size-l) / 2 - var(--ads-size-quark) / 2);bottom:0;z-index:1}.q-step-header-container{display:flex;align-items:center;width:100%;position:relative}.q-step-header-container:before,.q-step-header-container:after{content:\"\";position:absolute;width:var(--ads-size-quark);background-color:var(--ads-color-body-400);left:calc(var(--ads-size-l) / 2 - var(--ads-size-quark) / 2);z-index:0}.q-step-header-container:before{height:50%;top:0}.q-step-header-container:after{top:50%;height:50%}.q-step-progress-bar{display:inline-block;margin-right:var(--ads-size-xxxs);z-index:1}.q-step:first-child .q-step-header-container:before{content:none}.q-step:last-child .q-step-container:before,.q-step:last-child .q-step-header-container:after{content:none}.q-step-previous-completed .q-step-header-container:before{background-color:var(--ads-color-success-400);transition:background-color 1ms cubic-bezier(.645,.045,.355,1)}.q-step-completed .q-step-header-container:before,.q-step-completed .q-step-header-container:after,.q-step-completed .q-step-container:before,.q-step-completed .q-step-container:after{background-color:var(--ads-color-success-400);transition:background-color 1ms cubic-bezier(.645,.045,.355,1)}.q-step-header{color:var(--ads-color-body-contrast-400);display:flex;align-items:center;min-height:var(--ads-size-xxl);flex:1;padding-left:var(--ads-size-xxxs);cursor:default;position:relative;outline:none}.q-step-header .q-stepper-title-container{display:flex;flex-direction:column}.q-step-header.q-step-header-pointer{cursor:pointer}.q-step-accordion-icon{margin-left:auto;transform:rotate(0);transition:transform .24s ease}.q-step-accordion-icon.q-step-accordion-expanded-icon{transform:rotate(180deg)}@media(max-width:1019px){.q-step-container{padding-bottom:var(--ads-size-micro)}.q-step-container.q-step-expanded{padding-bottom:var(--ads-size-xxxs)}.q-step-container:before{height:var(--ads-size-xxxs);left:calc(var(--ads-size-s) / 2 - var(--ads-size-quark) / 2)}.q-sub-step-container{margin-left:calc(var(--ads-size-s) + var(--ads-size-micro) + var(--ads-size-micro))}.q-sub-step-container:before{left:calc((var(--ads-size-s) / 2 + var(--ads-size-micro) + var(--ads-size-micro) + var(--ads-size-quark) / 2) * -1)}.q-step-progress-bar{margin-right:var(--ads-size-micro);height:var(--ads-size-s);width:var(--ads-size-s);display:flex;align-items:center;justify-content:center}.q-step-header{padding-left:var(--ads-size-micro)}.q-step-header-container:before,.q-step-header-container:after{left:calc(var(--ads-size-s) / 2 - var(--ads-size-quark) / 2);width:var(--ads-size-quark)}}\n"] }]
        }], propDecorators: { activeIndexChange: [{
                type: Output
            }], stepProgressChange: [{
                type: Output
            }], stepFocus: [{
                type: Output
            }], subStepFocus: [{
                type: Output
            }], index: [{
                type: Input,
                args: [{ required: true }]
            }], step: [{
                type: Input,
                args: [{ required: true }]
            }], activeIndex: [{
                type: Input,
                args: [{ required: true }]
            }], last: [{
                type: Input
            }], horizontalView: [{
                type: Input
            }], showProgressOnActive: [{
                type: Input
            }], showProgressOnCompleted: [{
                type: Input
            }], previousStepCompleted: [{
                type: Input
            }], beforeActiveStepChange: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _subStepList: [{
                type: ViewChildren,
                args: [QSubStepComponent]
            }], _stepHeader: [{
                type: ViewChild,
                args: ['stepHeader']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QStepperComponent {
    activeIndexChange = new EventEmitter();
    overallProgressChange = new EventEmitter();
    steps = [];
    staticSteps = [];
    variant = 'standard';
    showProgressOnActive = false;
    showProgressOnCompleted = false;
    beforeActiveStepChange = null;
    dataQt = 'q-stepper';
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(value) {
        if (value) {
            this._activeIndex = value;
        }
    }
    _stepList;
    _overlay;
    hostClass = 'q-stepper';
    _horizontalView = false;
    _stepsViewOpen = false;
    _overallProgress = 0;
    _isMobileView = false;
    _stepActivatedByKeyboard$ = new Subject();
    _activeIndex = { stepIndex: 0, subStepIndex: 0 };
    _keyManager = null;
    _iconRegistry = inject(QIconRegistryService);
    _breakpointObserver = inject(BreakpointObserver);
    _cdr = inject(ChangeDetectorRef);
    _destroy$ = inject(QDestroyService);
    ngOnInit() {
        this._registerIcons();
        this._breakpointObserver
            .observe(['(max-width: 599px)', '(max-width: 1019px)'])
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            this._isMobileView = result.breakpoints['(max-width: 599px)'];
            this._horizontalView = result.breakpoints['(max-width: 1019px)'];
            this._updateViewPositionStrategy();
            this._calculateOverallProgress();
            this._cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { steps, activeIndex } = changes;
        if (steps?.currentValue?.length || activeIndex?.currentValue) {
            this._calculateOverallProgress();
        }
    }
    ngAfterViewInit() {
        this._stepList.changes
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this._updateFocusKeyManagerEntries());
        this._updateFocusKeyManagerEntries();
    }
    ngOnDestroy() {
        this._keyManager?.destroy();
    }
    get isActiveStepCompleted() {
        return this.activeStep?.subSteps?.length
            ? !!this.activeStep?.subSteps?.every((sub) => sub.completed)
            : !!this.activeStep?.completed;
    }
    get activeSubStep() {
        return this.activeStep?.subSteps?.find((_, index) => this.activeIndex?.subStepIndex === index);
    }
    get activeStep() {
        if (!this.activeIndex)
            return;
        return this.steps?.[this.activeIndex.stepIndex];
    }
    get stepActivatedByKeyboard() {
        return this._stepActivatedByKeyboard$;
    }
    _onActiveIndexChange(activeIndex) {
        this.activeIndex = activeIndex;
        this.activeIndexChange.emit(this.activeIndex);
        this._stepsViewOpen = false;
        this._overlay?.close();
    }
    _calculateOverallProgress() {
        if (!this.steps.length || !this._horizontalView)
            return;
        let completedSteps = 0;
        let totalWeight = 0;
        this.steps.forEach((step) => {
            if (step.subSteps?.length) {
                const completedSubSteps = step.subSteps.filter((subStep) => subStep.completed).length;
                const subStepProgress = Math.floor((completedSubSteps / step.subSteps.length) * 100);
                completedSteps += subStepProgress;
            }
            else if (step.completed) {
                completedSteps += 100;
            }
            totalWeight += 100;
        });
        this._overallProgress = Math.floor((completedSteps / totalWeight) * 100);
        this.overallProgressChange.emit(this._overallProgress);
        /*
            This is necessary because the design spec requires a "just-started" step to have
            a small portion of the bar filled. This helps users understand that it is the active step.
            We add the value at the end, so in the next run, the added value doesn't mess with the calculation.
            */
        if (completedSteps % 100 === 0) {
            this._overallProgress += 2;
        }
    }
    _handleKeydown(event) {
        const activeItem = this._keyManager?.activeItem;
        if (!activeItem) {
            this._keyManager?.onKeydown(event);
            return;
        }
        let callStepActiveByKeyboard = false;
        switch (event.code) {
            case LEFT_ARROW:
            case RIGHT_ARROW:
                if (activeItem instanceof QStepComponent) {
                    if (event.code === LEFT_ARROW && activeItem._stepExpanded) {
                        activeItem._onStepClick();
                    }
                    if (event.code === RIGHT_ARROW && activeItem.showAccordion) {
                        const stepElement = this._getStepElement(activeItem.index);
                        if (!activeItem._stepExpanded) {
                            activeItem._onStepClick();
                            this._updateFocusKeyManagerEntries();
                            this._cdr.detectChanges();
                            if (stepElement) {
                                this._keyManager?.setActiveItem(stepElement);
                            }
                        }
                        else {
                            const subStepElement = stepElement?._subStepList.get(0);
                            if (subStepElement) {
                                this._keyManager?.setActiveItem(subStepElement);
                            }
                        }
                    }
                }
                if (activeItem instanceof QSubStepComponent && event.code === LEFT_ARROW) {
                    const parentStepElement = this._getStepElement(activeItem.parentIndex);
                    if (parentStepElement) {
                        this._keyManager?.setActiveItem(parentStepElement);
                    }
                }
                break;
            case ENTER:
            case SPACE:
                callStepActiveByKeyboard =
                    activeItem instanceof QSubStepComponent ||
                        (activeItem instanceof QStepComponent && !activeItem.showAccordion);
                if (callStepActiveByKeyboard) {
                    this._stepActivatedByKeyboard$.next();
                }
                break;
            default:
                this._keyManager?.onKeydown(event);
        }
    }
    _onStepFocus(stepComponent) {
        this._keyManager?.setActiveItem(stepComponent);
    }
    _toggleOverlay() {
        this._overlay.isOpened ? this._overlay.close() : this._overlay.open();
        if (this._overlay.isOpened) {
            this._updateViewPositionStrategy();
        }
    }
    _updateViewPositionStrategy() {
        if (!this._overlay)
            return;
        this._overlay.updateSize({
            width: this._isMobileView ? '100%' : '360px',
            height: this._isMobileView ? '100%' : 'auto',
            maxHeight: this._isMobileView ? '100%' : '550px',
        });
        this._overlay.updatePositionStrategy(this._isMobileView ? 'global' : 'connected');
    }
    _isPreviousStepCompleted(index) {
        if (index === 0)
            return false;
        const previousStep = this.steps[index - 1];
        return previousStep.subSteps?.every((sub) => sub.completed) || previousStep.completed || false;
    }
    _isPreviousStaticStepCompleted(index) {
        if (index === 0)
            return false;
        return this.staticSteps[index - 1].status === 'completed';
    }
    _registerIcons() {
        this._iconRegistry.registerIcons([clear, thickCheck, lockOutline, moreVertical, unfoldMore]);
    }
    _getStepElement(stepIndex) {
        return this._stepList.find((step) => step.index === stepIndex);
    }
    _updateFocusKeyManagerEntries() {
        const flattenedSteps = this._stepList
            .toArray()
            .flatMap((step) => step._subStepList?.length ? [step, ...step._subStepList.toArray()] : step);
        this._keyManager = new FocusKeyManager(flattenedSteps).withHomeAndEnd().withTypeAhead();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QStepperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QStepperComponent, isStandalone: true, selector: "q-stepper", inputs: { steps: "steps", staticSteps: "staticSteps", variant: "variant", showProgressOnActive: ["showProgressOnActive", "showProgressOnActive", booleanAttribute], showProgressOnCompleted: ["showProgressOnCompleted", "showProgressOnCompleted", booleanAttribute], beforeActiveStepChange: "beforeActiveStepChange", dataQt: "dataQt", activeIndex: "activeIndex" }, outputs: { activeIndexChange: "activeIndexChange", overallProgressChange: "overallProgressChange" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "_overlay", first: true, predicate: QOverlayComponent, descendants: true }, { propertyName: "_stepList", predicate: QStepComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"variant === 'static' && staticSteps.length; else standard\">\n  <q-static-step\n    *ngFor=\"let step of staticSteps; let last = last; let index = index\"\n    [step]=\"step\"\n    [last]=\"last\"\n    [index]=\"index\"\n    [previousStepCompleted]=\"_isPreviousStaticStepCompleted(index)\" />\n</ng-container>\n\n<ng-template #standard>\n  <ng-container *ngIf=\"_horizontalView; else verticalView\">\n    <div class=\"q-stepper-horizontal-view\" role=\"tree\" aria-label=\"stepper\">\n      <span class=\"active-step-title q-display-xs\">{{ activeStep?.title }}</span>\n\n      <q-progress-bar\n        *ngIf=\"steps.length\"\n        class=\"q-stepper-progress-bar\"\n        [size]=\"'thin'\"\n        [variant]=\"'steps'\"\n        [progress]=\"_overallProgress\"\n        [segments]=\"steps.length\"\n        [segmentInReviewIndex]=\"activeIndex.stepIndex\" />\n\n      <q-interactive-icon\n        #trigger=\"cdkOverlayOrigin\"\n        class=\"menu-icon\"\n        cdkOverlayOrigin\n        [class.steps-view-open]=\"_stepsViewOpen\"\n        [icon]=\"'unfoldMore'\"\n        [size]=\"'medium'\"\n        [dataQt]=\"'q-stepper-header-desktop-icon'\"\n        (click)=\"_toggleOverlay()\"\n        (keydown.enter)=\"_toggleOverlay()\"\n        (keydown.space)=\"_toggleOverlay()\" />\n\n      <q-overlay\n        #overlay\n        [overlayOrigin]=\"trigger\"\n        [offsetY]=\"0\"\n        (opened)=\"_stepsViewOpen = true\"\n        (closed)=\"_stepsViewOpen = false\"\n        [panelClass]=\"['q-overlay-panel', 'q-stepper-overlay-panel']\">\n        <ng-template #overlayContentTemplate>\n          <div\n            cdkTrapFocus\n            cdkTrapFocusAutoCapture\n            class=\"stepper-horizontal-container\"\n            [class.stepper-horizontal-container-mobile]=\"_isMobileView\">\n            <q-icon\n              *ngIf=\"_isMobileView\"\n              class=\"close-icon\"\n              [name]=\"'clear'\"\n              [size]=\"'24'\"\n              (click)=\"_overlay.close()\" />\n\n            <div class=\"stepper-steps\">\n              <div class=\"steps-inner\" (keydown)=\"_handleKeydown($event)\">\n                <ng-container *ngTemplateOutlet=\"stepsRef\" />\n              </div>\n            </div>\n          </div>\n        </ng-template>\n      </q-overlay>\n    </div>\n  </ng-container>\n\n  <ng-template #verticalView>\n    <div class=\"q-stepper-vertical-view\" role=\"tree\" (keydown)=\"_handleKeydown($event)\">\n      <ng-container *ngTemplateOutlet=\"stepsRef\" />\n    </div>\n  </ng-template>\n</ng-template>\n\n<ng-template #stepsRef>\n  <ng-container *ngIf=\"steps.length\">\n    <q-step\n      #stepEl\n      *ngFor=\"let step of steps; let i = index; let last = last\"\n      [step]=\"step\"\n      [activeIndex]=\"activeIndex\"\n      [index]=\"i\"\n      [last]=\"last\"\n      [horizontalView]=\"_horizontalView\"\n      [showProgressOnActive]=\"showProgressOnActive\"\n      [showProgressOnCompleted]=\"showProgressOnCompleted\"\n      [beforeActiveStepChange]=\"beforeActiveStepChange\"\n      [previousStepCompleted]=\"_isPreviousStepCompleted(i)\"\n      (activeIndexChange)=\"_onActiveIndexChange($event)\"\n      (stepFocus)=\"_onStepFocus(stepEl)\"\n      (subStepFocus)=\"_onStepFocus($event)\" />\n  </ng-container>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-stepper{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-stepper-vertical-view{height:100%;overflow-x:hidden;overflow-y:auto}.q-stepper-horizontal-view{--horizontal-padding: var(--ads-size-s);color:var(--ads-color-body-contrast-400);position:relative;display:flex;flex-direction:column;background-color:var(--ads-color-body-200);border-radius:0 0 var(--ads-border-radius-l) var(--ads-border-radius-l);padding:var(--ads-size-s) var(--horizontal-padding) var(--ads-size-xs) var(--horizontal-padding)}@media(min-width:600px)and (max-width:839px){.q-stepper-horizontal-view{--horizontal-padding: var(--ads-size-l)}}@media(min-width:840px)and (max-width:1019px){.q-stepper-horizontal-view{--horizontal-padding: 138px}}.q-stepper-horizontal-view .active-step-title{margin-bottom:var(--ads-size-xxxs);padding-right:var(--ads-size-l)}.q-stepper-horizontal-view .menu-icon{display:block;position:absolute;right:var(--horizontal-padding);top:var(--ads-size-xxs)}.q-stepper-horizontal-view .menu-icon.steps-view-open .interactive-icon__button{background-color:var(--ads-color-body-300)}.stepper-horizontal-container{display:block;width:100%;height:100%}.stepper-horizontal-container .close-icon{display:block;margin:var(--ads-size-xs) var(--ads-size-s) var(--ads-size-xs) auto;cursor:pointer}.stepper-horizontal-container .stepper-steps{background-color:var(--ads-color-body-contrast-700);padding:var(--ads-size-s);height:100%;border-radius:var(--ads-border-radius-s);overflow:hidden}.stepper-horizontal-container-mobile{height:fit-content}.stepper-horizontal-container-mobile .stepper-steps{padding-top:0}@media(max-width:599px){.q-overlay-panel.q-stepper-overlay-panel{border-radius:0;border:none}}\n"], dependencies: [{ kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QStepComponent, selector: "q-step", inputs: ["index", "step", "activeIndex", "last", "horizontalView", "showProgressOnActive", "showProgressOnCompleted", "previousStepCompleted", "beforeActiveStepChange", "dataQt"], outputs: ["activeIndexChange", "stepProgressChange", "stepFocus", "subStepFocus"] }, { kind: "component", type: QStaticStepComponent, selector: "q-static-step", inputs: ["step", "index", "last", "previousStepCompleted", "dataQt"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QInteractiveIconComponent, selector: "q-interactive-icon", inputs: ["icon", "context", "size", "tooltipValue", "tooltipPosition", "disabled", "tabindex", "tooltipShowDelay", "tooltipHideDelay", "tooltipLongPressDelay", "dataQt", "iconSize", "color"] }, { kind: "component", type: QOverlayComponent, selector: "q-overlay", inputs: ["top", "bottom", "left", "right", "offsetY", "offsetX", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "yPosition", "xPosition", "positions", "overlayOrigin", "panelClass", "backdropClass", "scrollStrategy", "closeAnimationDone", "priorityPositions", "closeOnBackdropClick", "flexibleDimensions", "disableClose", "hasBackdrop", "closeOnEsc"], outputs: ["opened", "closed", "overlayOriginChange"] }, { kind: "component", type: QProgressBarComponent, selector: "q-progress-bar", inputs: ["variant", "size", "circularProgressLabel", "selectedState", "segmentInReviewIndex", "disabled", "dataQt", "segments", "progress"] }, { kind: "ngmodule", type: CdkAccordionModule }, { kind: "directive", type: CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { kind: "ngmodule", type: A11yModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QStepperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-stepper', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [
                        OverlayModule,
                        NgIf,
                        NgFor,
                        NgTemplateOutlet,
                        QStepComponent,
                        QStaticStepComponent,
                        QIconComponent,
                        QInteractiveIconComponent,
                        QOverlayComponent,
                        QProgressBarComponent,
                        CdkAccordionModule,
                        CdkTrapFocus,
                        A11yModule,
                    ], providers: [QDestroyService], template: "<ng-container *ngIf=\"variant === 'static' && staticSteps.length; else standard\">\n  <q-static-step\n    *ngFor=\"let step of staticSteps; let last = last; let index = index\"\n    [step]=\"step\"\n    [last]=\"last\"\n    [index]=\"index\"\n    [previousStepCompleted]=\"_isPreviousStaticStepCompleted(index)\" />\n</ng-container>\n\n<ng-template #standard>\n  <ng-container *ngIf=\"_horizontalView; else verticalView\">\n    <div class=\"q-stepper-horizontal-view\" role=\"tree\" aria-label=\"stepper\">\n      <span class=\"active-step-title q-display-xs\">{{ activeStep?.title }}</span>\n\n      <q-progress-bar\n        *ngIf=\"steps.length\"\n        class=\"q-stepper-progress-bar\"\n        [size]=\"'thin'\"\n        [variant]=\"'steps'\"\n        [progress]=\"_overallProgress\"\n        [segments]=\"steps.length\"\n        [segmentInReviewIndex]=\"activeIndex.stepIndex\" />\n\n      <q-interactive-icon\n        #trigger=\"cdkOverlayOrigin\"\n        class=\"menu-icon\"\n        cdkOverlayOrigin\n        [class.steps-view-open]=\"_stepsViewOpen\"\n        [icon]=\"'unfoldMore'\"\n        [size]=\"'medium'\"\n        [dataQt]=\"'q-stepper-header-desktop-icon'\"\n        (click)=\"_toggleOverlay()\"\n        (keydown.enter)=\"_toggleOverlay()\"\n        (keydown.space)=\"_toggleOverlay()\" />\n\n      <q-overlay\n        #overlay\n        [overlayOrigin]=\"trigger\"\n        [offsetY]=\"0\"\n        (opened)=\"_stepsViewOpen = true\"\n        (closed)=\"_stepsViewOpen = false\"\n        [panelClass]=\"['q-overlay-panel', 'q-stepper-overlay-panel']\">\n        <ng-template #overlayContentTemplate>\n          <div\n            cdkTrapFocus\n            cdkTrapFocusAutoCapture\n            class=\"stepper-horizontal-container\"\n            [class.stepper-horizontal-container-mobile]=\"_isMobileView\">\n            <q-icon\n              *ngIf=\"_isMobileView\"\n              class=\"close-icon\"\n              [name]=\"'clear'\"\n              [size]=\"'24'\"\n              (click)=\"_overlay.close()\" />\n\n            <div class=\"stepper-steps\">\n              <div class=\"steps-inner\" (keydown)=\"_handleKeydown($event)\">\n                <ng-container *ngTemplateOutlet=\"stepsRef\" />\n              </div>\n            </div>\n          </div>\n        </ng-template>\n      </q-overlay>\n    </div>\n  </ng-container>\n\n  <ng-template #verticalView>\n    <div class=\"q-stepper-vertical-view\" role=\"tree\" (keydown)=\"_handleKeydown($event)\">\n      <ng-container *ngTemplateOutlet=\"stepsRef\" />\n    </div>\n  </ng-template>\n</ng-template>\n\n<ng-template #stepsRef>\n  <ng-container *ngIf=\"steps.length\">\n    <q-step\n      #stepEl\n      *ngFor=\"let step of steps; let i = index; let last = last\"\n      [step]=\"step\"\n      [activeIndex]=\"activeIndex\"\n      [index]=\"i\"\n      [last]=\"last\"\n      [horizontalView]=\"_horizontalView\"\n      [showProgressOnActive]=\"showProgressOnActive\"\n      [showProgressOnCompleted]=\"showProgressOnCompleted\"\n      [beforeActiveStepChange]=\"beforeActiveStepChange\"\n      [previousStepCompleted]=\"_isPreviousStepCompleted(i)\"\n      (activeIndexChange)=\"_onActiveIndexChange($event)\"\n      (stepFocus)=\"_onStepFocus(stepEl)\"\n      (subStepFocus)=\"_onStepFocus($event)\" />\n  </ng-container>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-stepper{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-stepper-vertical-view{height:100%;overflow-x:hidden;overflow-y:auto}.q-stepper-horizontal-view{--horizontal-padding: var(--ads-size-s);color:var(--ads-color-body-contrast-400);position:relative;display:flex;flex-direction:column;background-color:var(--ads-color-body-200);border-radius:0 0 var(--ads-border-radius-l) var(--ads-border-radius-l);padding:var(--ads-size-s) var(--horizontal-padding) var(--ads-size-xs) var(--horizontal-padding)}@media(min-width:600px)and (max-width:839px){.q-stepper-horizontal-view{--horizontal-padding: var(--ads-size-l)}}@media(min-width:840px)and (max-width:1019px){.q-stepper-horizontal-view{--horizontal-padding: 138px}}.q-stepper-horizontal-view .active-step-title{margin-bottom:var(--ads-size-xxxs);padding-right:var(--ads-size-l)}.q-stepper-horizontal-view .menu-icon{display:block;position:absolute;right:var(--horizontal-padding);top:var(--ads-size-xxs)}.q-stepper-horizontal-view .menu-icon.steps-view-open .interactive-icon__button{background-color:var(--ads-color-body-300)}.stepper-horizontal-container{display:block;width:100%;height:100%}.stepper-horizontal-container .close-icon{display:block;margin:var(--ads-size-xs) var(--ads-size-s) var(--ads-size-xs) auto;cursor:pointer}.stepper-horizontal-container .stepper-steps{background-color:var(--ads-color-body-contrast-700);padding:var(--ads-size-s);height:100%;border-radius:var(--ads-border-radius-s);overflow:hidden}.stepper-horizontal-container-mobile{height:fit-content}.stepper-horizontal-container-mobile .stepper-steps{padding-top:0}@media(max-width:599px){.q-overlay-panel.q-stepper-overlay-panel{border-radius:0;border:none}}\n"] }]
        }], propDecorators: { activeIndexChange: [{
                type: Output
            }], overallProgressChange: [{
                type: Output
            }], steps: [{
                type: Input
            }], staticSteps: [{
                type: Input
            }], variant: [{
                type: Input
            }], showProgressOnActive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showProgressOnCompleted: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], beforeActiveStepChange: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], activeIndex: [{
                type: Input
            }], _stepList: [{
                type: ViewChildren,
                args: [QStepComponent]
            }], _overlay: [{
                type: ViewChild,
                args: [QOverlayComponent]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QStepperComponent };
//# sourceMappingURL=questrade-allspark-angular-components-stepper.mjs.map
