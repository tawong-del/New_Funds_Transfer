import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf, NgSwitch, NgSwitchCase, NgFor, NgClass } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, ChangeDetectorRef, booleanAttribute, HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { isPresent } from '@questrade/allspark-angular-components/core/utils';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { thickCheck } from '@questrade/allspark-icons/icons';
import { takeUntil } from 'rxjs';

class QProgressBarComponent {
    variant = 'standard';
    size = 'default';
    circularProgressLabel = '';
    selectedState = false;
    segmentInReviewIndex = null;
    disabled = false;
    dataQt = 'q-progress-bar';
    get segments() {
        return this._segments;
    }
    set segments(value) {
        this._segments = Math.max(this._minSegments, Math.min(this._maxSegments, coerceNumberProperty(value)));
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
        this._progress = Math.max(this._minProgress, Math.min(this._maxProgress, coerceNumberProperty(value)));
    }
    get hostClasses() {
        return ['q-progress-bar', `q-progress-bar--${this.size}`].join(' ');
    }
    // This value is not in pixels, it's based on the coordinate system of the SVG viewBox.
    _circularStrokeWidth = 11;
    _pathString = '';
    _progressCirclePath = { strokeDasharray: '' };
    _progressTrailPath = { strokeDasharray: '' };
    _showSuccess = false;
    _segmentPercents = [];
    _segmentsInReview = [];
    _minSegments = 2;
    _maxSegments = 50;
    _minProgress = 0;
    _maxProgress = 100;
    _strokeWidthSmallView = 15;
    _strokeWidthDefault = 11;
    _segments = this._minSegments;
    _progress = this._minProgress;
    _iconRegistryService = inject(QIconRegistryService);
    _breakpointObserver = inject(BreakpointObserver);
    _destroy$ = inject(QDestroyService);
    _cdr = inject(ChangeDetectorRef);
    ngOnInit() {
        this._registerIcons();
        this._setBreakpointObserver();
    }
    ngOnChanges(changes) {
        const { progress, selectedState, segmentInReviewIndex } = changes;
        if (this.segments && this.variant === 'steps') {
            if (segmentInReviewIndex) {
                this.segmentInReviewIndex = coerceNumberProperty(segmentInReviewIndex.currentValue, null);
            }
            this._setSegments();
        }
        if (progress && this.variant === 'circular') {
            this._setCirclePaths();
        }
        if (selectedState && this.variant === 'circular') {
            this.selectedState = coerceBooleanProperty(selectedState.currentValue && this.progress === 100);
            if (!selectedState.currentValue && this.progress === 100) {
                this._showSuccess = true;
            }
        }
    }
    _setSegments() {
        const segmentWidth = 100 / this.segments;
        const filledSegments = Math.floor(this.progress / segmentWidth);
        const remainingProgress = this.progress - filledSegments * segmentWidth;
        const partialSegmentWidth = remainingProgress / segmentWidth;
        this._segmentPercents = Array.from({ length: this.segments }, (_, index) => index < filledSegments ? 100 : index === filledSegments ? partialSegmentWidth * 100 : 0);
        if (isPresent(this.segmentInReviewIndex)) {
            const segmentsInReview = this._segmentPercents.reduce((accumulator, currentValue, currentIndex) => {
                if (currentValue > 0) {
                    if (currentIndex === this.segmentInReviewIndex && currentValue === 100) {
                        accumulator.push(currentIndex);
                    }
                    else if (currentIndex > this.segmentInReviewIndex) {
                        accumulator.push(currentIndex);
                    }
                }
                return accumulator;
            }, []);
            this._segmentsInReview = segmentsInReview;
        }
    }
    _isSegmentInReview(index) {
        return this._segmentsInReview.some((value) => value === index);
    }
    _setCirclePaths() {
        const radius = 50 - this._circularStrokeWidth / 2;
        const len = Math.PI * 2 * radius;
        const endPositionY = radius * -2;
        this._pathString = `M 50,50 m 0,${-radius} a ${radius},${radius} 0 1 1 0,${-endPositionY} a ${radius},${radius} 0 1 1 -0,${endPositionY}`;
        this._progressTrailPath = { strokeDasharray: `${len - 0}px ${len}px` };
        this._progressCirclePath = {
            strokeDasharray: `${((this.progress || 0) / 100) * (len - 0)}px ${len}px`,
        };
        this._showSuccess = this.progress === 100 && !this.selectedState;
    }
    get inProgress() {
        return this.progress > 0 && this.progress < 100;
    }
    _setBreakpointObserver() {
        this._breakpointObserver
            .observe(['(max-width: 1019px)'])
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            if (this.variant === 'circular') {
                this._circularStrokeWidth = result.matches
                    ? this._strokeWidthSmallView
                    : this._strokeWidthDefault;
                this._setCirclePaths();
                this._cdr.markForCheck();
            }
        });
    }
    _registerIcons() {
        this._iconRegistryService.registerIcon(thickCheck);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QProgressBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QProgressBarComponent, isStandalone: true, selector: "q-progress-bar", inputs: { variant: "variant", size: "size", circularProgressLabel: "circularProgressLabel", selectedState: "selectedState", segmentInReviewIndex: "segmentInReviewIndex", disabled: ["disabled", "disabled", booleanAttribute], dataQt: "dataQt", segments: "segments", progress: "progress" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, providers: [QDestroyService], usesOnChanges: true, ngImport: i0, template: "<ng-container [ngSwitch]=\"variant\">\n  <!-- standard -->\n  <ng-container *ngSwitchCase=\"'standard'\">\n    <div class=\"q-progress-bar-standard\">\n      <div class=\"q-progress-bar-background\">\n        <div class=\"q-progress-bar-background-filler\" [style.width.%]=\"progress\"></div>\n      </div>\n    </div>\n  </ng-container>\n\n  <!-- steps -->\n  <ng-container *ngSwitchCase=\"'steps'\">\n    <div class=\"q-progress-bar-steps\">\n      <div\n        *ngFor=\"let percent of _segmentPercents; let i = index\"\n        class=\"q-progress-bar-background q-progress-bar-segment-radius\">\n        <div\n          class=\"q-progress-bar-background-filler\"\n          [style.width.%]=\"percent\"\n          [class.in-review-state]=\"_isSegmentInReview(i)\"></div>\n      </div>\n    </div>\n  </ng-container>\n\n  <!-- circular -->\n  <ng-container *ngSwitchCase=\"'circular'\">\n    <div\n      class=\"q-progress-bar-circular\"\n      [ngClass]=\"{\n        'q-progress-bar-not-started': progress === 0,\n        'q-progress-bar-selected-state': progress === 100 && selectedState,\n        'q-progress-bar-disabled-state':\n          disabled && ((progress === 100 && !selectedState) || progress === 0),\n        'q-progress-bar-in-progress': progress > 0 && progress < 100,\n      }\">\n      <svg viewBox=\"0 0 100 100\">\n        <path\n          class=\"q-progress-bar-circular-trail\"\n          [ngClass]=\"{ 'q-progress-bar-circular-trail--selected': selectedState }\"\n          [attr.stroke-width]=\"progress ? _circularStrokeWidth : 1\"\n          [attr.d]=\"_pathString\"\n          [attr.stroke-dasharray]=\"_progressTrailPath.strokeDasharray\"></path>\n        <path\n          class=\"q-progress-bar-circular-path\"\n          [ngClass]=\"{\n            'q-progress-bar-circular-path--success': _showSuccess,\n            'q-progress-bar-circular-path--selected': selectedState,\n          }\"\n          [attr.d]=\"_pathString\"\n          [attr.stroke-width]=\"progress ? _circularStrokeWidth : 0\"\n          [attr.stroke-dasharray]=\"_progressCirclePath.strokeDasharray\"></path>\n      </svg>\n\n      <q-icon\n        *ngIf=\"_showSuccess && !selectedState; else circleLabel\"\n        name=\"thickCheck\"\n        class=\"q-progress-bar-circular-icon-success\" />\n      <ng-template #circleLabel>\n        <span class=\"q-progress-bar-circular-label q-display-xs\">{{ circularProgressLabel }}</span>\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <!-- loading -->\n  <ng-container *ngSwitchCase=\"'loading'\">\n    <div class=\"q-pbl\">\n      <div class=\"q-pbl-background\">\n        <div class=\"q-pbl-background-filler\" [style.width.%]=\"progress\"></div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", styles: [".q-progress-bar-background{width:100%;height:100%;background-color:var(--ads-color-body-400);border-radius:var(--ads-border-radius-xl)}.q-progress-bar-background-filler{height:100%;background-color:var(--ads-color-primary-400);border-radius:var(--ads-border-radius-xl);transition:width .3s ease}.q-progress-bar-steps .q-progress-bar-segment-radius .q-progress-bar-background-filler,.q-progress-bar-steps .q-progress-bar-segment-radius{border-radius:0}.q-progress-bar-steps{display:flex;justify-content:center;align-items:center;gap:var(--ads-size-xxxs)}.q-progress-bar-steps .q-progress-bar-segment-radius:first-of-type{border-radius:var(--ads-border-radius-xl) 0 0 var(--ads-border-radius-xl)}.q-progress-bar-steps .q-progress-bar-segment-radius:first-of-type .q-progress-bar-background-filler{border-radius:var(--ads-border-radius-xl) 0 0 var(--ads-border-radius-xl)}.q-progress-bar-steps .q-progress-bar-segment-radius:last-of-type{border-radius:0 var(--ads-border-radius-xl) var(--ads-border-radius-xl) 0}.q-progress-bar-steps .q-progress-bar-segment-radius:last-of-type .q-progress-bar-background-filler{border-radius:0 var(--ads-border-radius-xl) var(--ads-border-radius-xl) 0}.q-progress-bar-circular{position:relative;width:var(--ads-size-l);height:var(--ads-size-l);border-radius:var(--ads-border-radius-xl);background-color:var(--ads-color-body-100)}.q-progress-bar-circular-trail{stroke:var(--ads-color-body-400);stroke-dashoffset:0;fill-opacity:0}.q-progress-bar-circular-trail--selected{stroke:var(--ads-color-primary-400);stroke-width:var(--ads-size-nano)}.q-progress-bar-circular-path{stroke:var(--ads-color-primary-400);stroke-dashoffset:0;fill-opacity:0;stroke-linecap:round;transition:stroke-dashoffset .3s ease 0s,stroke-dasharray .3s ease 0s,stroke .3s}.q-progress-bar-circular-path--success{fill:var(--ads-color-primary-400);fill-opacity:1}.q-progress-bar-circular-path--selected{display:none}.q-progress-bar-circular-label{color:var(--ads-color-body-contrast-100);position:absolute;top:50%;left:50%;width:100%;transform:translate(-50%,-50%);text-align:center}.q-progress-bar-circular-icon-success{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:var(--ads-color-primary-400);width:var(--ads-size-xs);height:var(--ads-size-xs)}.q-progress-bar-circular-icon-success svg path{fill:var(--ads-color-body-100)}.q-progress-bar-circular.q-progress-bar-disabled-state .q-progress-bar-circular-path{fill:var(--ads-color-primary-200);stroke:var(--ads-color-primary-200)}.q-progress-bar-circular.q-progress-bar-disabled-state .q-progress-bar-circular-icon-success{background-color:var(--ads-color-primary-200)}.q-progress-bar-circular.q-progress-bar-disabled-state .q-progress-bar-circular-label{color:var(--ads-color-body-600)}.q-progress-bar-circular.q-progress-bar-selected-state{border:var(--ads-border-width-thin) solid var(--ads-color-primary-400)}.q-progress-bar-circular.q-progress-bar-selected-state .q-progress-bar-circular-trail{stroke-width:0}.q-progress-bar-circular.q-progress-bar-not-started{border:var(--ads-border-width-hairline) solid var(--ads-color-secondary-400)}.q-progress-bar-circular.q-progress-bar-not-started .q-progress-bar-circular-trail{stroke-width:0}.q-pbl{position:absolute;top:0;left:0;width:100%;background-color:var(--ads-color-body-100)}.q-pbl-background{width:100%;height:1px;background-color:var(--ads-color-body-400)}.q-pbl-background-filler{height:var(--ads-size-nano);background-color:var(--ads-color-primary-400)}.in-review-state{background-color:var(--ads-color-primary-200)}.q-progress-bar--large .q-progress-bar-standard,.q-progress-bar--large .q-progress-bar-steps{height:var(--ads-size-xxxs)}.q-progress-bar--default .q-progress-bar-standard,.q-progress-bar--default .q-progress-bar-steps{height:var(--ads-size-micro)}.q-progress-bar--thin .q-progress-bar-standard,.q-progress-bar--thin .q-progress-bar-steps{height:var(--ads-size-nano)}@media(max-width:1019px){.q-progress-bar-circular{height:var(--ads-size-s);width:var(--ads-size-s)}.q-progress-bar-circular-label{font-size:var(--ads-font-size-xxs);line-height:var(--ads-font-line-height-xxs);font-weight:var(--ads-font-weight-bold)}.q-progress-bar-circular.q-progress-bar-not-started{height:var(--ads-size-xxs);width:var(--ads-size-xxs)}.q-progress-bar-circular.q-progress-bar-in-progress .q-progress-bar-circular-label,.q-progress-bar-circular.q-progress-bar-not-started .q-progress-bar-circular-label{display:none}.q-progress-bar-circular-icon-success{width:var(--ads-size-xxxs);height:var(--ads-size-xxxs)}}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QProgressBarComponent, decorators: [{
            type: Component,
            args: [{ imports: [NgIf, NgSwitch, NgSwitchCase, NgFor, NgClass, QIconComponent], providers: [QDestroyService], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-progress-bar', template: "<ng-container [ngSwitch]=\"variant\">\n  <!-- standard -->\n  <ng-container *ngSwitchCase=\"'standard'\">\n    <div class=\"q-progress-bar-standard\">\n      <div class=\"q-progress-bar-background\">\n        <div class=\"q-progress-bar-background-filler\" [style.width.%]=\"progress\"></div>\n      </div>\n    </div>\n  </ng-container>\n\n  <!-- steps -->\n  <ng-container *ngSwitchCase=\"'steps'\">\n    <div class=\"q-progress-bar-steps\">\n      <div\n        *ngFor=\"let percent of _segmentPercents; let i = index\"\n        class=\"q-progress-bar-background q-progress-bar-segment-radius\">\n        <div\n          class=\"q-progress-bar-background-filler\"\n          [style.width.%]=\"percent\"\n          [class.in-review-state]=\"_isSegmentInReview(i)\"></div>\n      </div>\n    </div>\n  </ng-container>\n\n  <!-- circular -->\n  <ng-container *ngSwitchCase=\"'circular'\">\n    <div\n      class=\"q-progress-bar-circular\"\n      [ngClass]=\"{\n        'q-progress-bar-not-started': progress === 0,\n        'q-progress-bar-selected-state': progress === 100 && selectedState,\n        'q-progress-bar-disabled-state':\n          disabled && ((progress === 100 && !selectedState) || progress === 0),\n        'q-progress-bar-in-progress': progress > 0 && progress < 100,\n      }\">\n      <svg viewBox=\"0 0 100 100\">\n        <path\n          class=\"q-progress-bar-circular-trail\"\n          [ngClass]=\"{ 'q-progress-bar-circular-trail--selected': selectedState }\"\n          [attr.stroke-width]=\"progress ? _circularStrokeWidth : 1\"\n          [attr.d]=\"_pathString\"\n          [attr.stroke-dasharray]=\"_progressTrailPath.strokeDasharray\"></path>\n        <path\n          class=\"q-progress-bar-circular-path\"\n          [ngClass]=\"{\n            'q-progress-bar-circular-path--success': _showSuccess,\n            'q-progress-bar-circular-path--selected': selectedState,\n          }\"\n          [attr.d]=\"_pathString\"\n          [attr.stroke-width]=\"progress ? _circularStrokeWidth : 0\"\n          [attr.stroke-dasharray]=\"_progressCirclePath.strokeDasharray\"></path>\n      </svg>\n\n      <q-icon\n        *ngIf=\"_showSuccess && !selectedState; else circleLabel\"\n        name=\"thickCheck\"\n        class=\"q-progress-bar-circular-icon-success\" />\n      <ng-template #circleLabel>\n        <span class=\"q-progress-bar-circular-label q-display-xs\">{{ circularProgressLabel }}</span>\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <!-- loading -->\n  <ng-container *ngSwitchCase=\"'loading'\">\n    <div class=\"q-pbl\">\n      <div class=\"q-pbl-background\">\n        <div class=\"q-pbl-background-filler\" [style.width.%]=\"progress\"></div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", styles: [".q-progress-bar-background{width:100%;height:100%;background-color:var(--ads-color-body-400);border-radius:var(--ads-border-radius-xl)}.q-progress-bar-background-filler{height:100%;background-color:var(--ads-color-primary-400);border-radius:var(--ads-border-radius-xl);transition:width .3s ease}.q-progress-bar-steps .q-progress-bar-segment-radius .q-progress-bar-background-filler,.q-progress-bar-steps .q-progress-bar-segment-radius{border-radius:0}.q-progress-bar-steps{display:flex;justify-content:center;align-items:center;gap:var(--ads-size-xxxs)}.q-progress-bar-steps .q-progress-bar-segment-radius:first-of-type{border-radius:var(--ads-border-radius-xl) 0 0 var(--ads-border-radius-xl)}.q-progress-bar-steps .q-progress-bar-segment-radius:first-of-type .q-progress-bar-background-filler{border-radius:var(--ads-border-radius-xl) 0 0 var(--ads-border-radius-xl)}.q-progress-bar-steps .q-progress-bar-segment-radius:last-of-type{border-radius:0 var(--ads-border-radius-xl) var(--ads-border-radius-xl) 0}.q-progress-bar-steps .q-progress-bar-segment-radius:last-of-type .q-progress-bar-background-filler{border-radius:0 var(--ads-border-radius-xl) var(--ads-border-radius-xl) 0}.q-progress-bar-circular{position:relative;width:var(--ads-size-l);height:var(--ads-size-l);border-radius:var(--ads-border-radius-xl);background-color:var(--ads-color-body-100)}.q-progress-bar-circular-trail{stroke:var(--ads-color-body-400);stroke-dashoffset:0;fill-opacity:0}.q-progress-bar-circular-trail--selected{stroke:var(--ads-color-primary-400);stroke-width:var(--ads-size-nano)}.q-progress-bar-circular-path{stroke:var(--ads-color-primary-400);stroke-dashoffset:0;fill-opacity:0;stroke-linecap:round;transition:stroke-dashoffset .3s ease 0s,stroke-dasharray .3s ease 0s,stroke .3s}.q-progress-bar-circular-path--success{fill:var(--ads-color-primary-400);fill-opacity:1}.q-progress-bar-circular-path--selected{display:none}.q-progress-bar-circular-label{color:var(--ads-color-body-contrast-100);position:absolute;top:50%;left:50%;width:100%;transform:translate(-50%,-50%);text-align:center}.q-progress-bar-circular-icon-success{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:var(--ads-color-primary-400);width:var(--ads-size-xs);height:var(--ads-size-xs)}.q-progress-bar-circular-icon-success svg path{fill:var(--ads-color-body-100)}.q-progress-bar-circular.q-progress-bar-disabled-state .q-progress-bar-circular-path{fill:var(--ads-color-primary-200);stroke:var(--ads-color-primary-200)}.q-progress-bar-circular.q-progress-bar-disabled-state .q-progress-bar-circular-icon-success{background-color:var(--ads-color-primary-200)}.q-progress-bar-circular.q-progress-bar-disabled-state .q-progress-bar-circular-label{color:var(--ads-color-body-600)}.q-progress-bar-circular.q-progress-bar-selected-state{border:var(--ads-border-width-thin) solid var(--ads-color-primary-400)}.q-progress-bar-circular.q-progress-bar-selected-state .q-progress-bar-circular-trail{stroke-width:0}.q-progress-bar-circular.q-progress-bar-not-started{border:var(--ads-border-width-hairline) solid var(--ads-color-secondary-400)}.q-progress-bar-circular.q-progress-bar-not-started .q-progress-bar-circular-trail{stroke-width:0}.q-pbl{position:absolute;top:0;left:0;width:100%;background-color:var(--ads-color-body-100)}.q-pbl-background{width:100%;height:1px;background-color:var(--ads-color-body-400)}.q-pbl-background-filler{height:var(--ads-size-nano);background-color:var(--ads-color-primary-400)}.in-review-state{background-color:var(--ads-color-primary-200)}.q-progress-bar--large .q-progress-bar-standard,.q-progress-bar--large .q-progress-bar-steps{height:var(--ads-size-xxxs)}.q-progress-bar--default .q-progress-bar-standard,.q-progress-bar--default .q-progress-bar-steps{height:var(--ads-size-micro)}.q-progress-bar--thin .q-progress-bar-standard,.q-progress-bar--thin .q-progress-bar-steps{height:var(--ads-size-nano)}@media(max-width:1019px){.q-progress-bar-circular{height:var(--ads-size-s);width:var(--ads-size-s)}.q-progress-bar-circular-label{font-size:var(--ads-font-size-xxs);line-height:var(--ads-font-line-height-xxs);font-weight:var(--ads-font-weight-bold)}.q-progress-bar-circular.q-progress-bar-not-started{height:var(--ads-size-xxs);width:var(--ads-size-xxs)}.q-progress-bar-circular.q-progress-bar-in-progress .q-progress-bar-circular-label,.q-progress-bar-circular.q-progress-bar-not-started .q-progress-bar-circular-label{display:none}.q-progress-bar-circular-icon-success{width:var(--ads-size-xxxs);height:var(--ads-size-xxxs)}}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], circularProgressLabel: [{
                type: Input
            }], selectedState: [{
                type: Input
            }], segmentInReviewIndex: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], segments: [{
                type: Input
            }], progress: [{
                type: Input
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QProgressBarComponent };
//# sourceMappingURL=questrade-allspark-angular-components-progress-bar.mjs.map
