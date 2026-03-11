import { FocusMonitor } from '@angular/cdk/a11y';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, ElementRef, ChangeDetectorRef, HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, Injector, booleanAttribute, Directive } from '@angular/core';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { takeUntil } from 'rxjs';
import { FormGroupDirective, NgForm, NgModel, NgControl } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';

class QInputGroupComponent {
    prefix = null;
    suffix = null;
    dataQt = 'q-input-group';
    get hostClasses() {
        return ['q-input-group', this._focused && 'q-input-group-focused', 'q-focus-indicator']
            .filter(Boolean)
            .join(' ');
    }
    _focusMonitor = inject(FocusMonitor);
    _elementRef = inject(ElementRef);
    _destroy$ = inject(QDestroyService);
    _cdr = inject(ChangeDetectorRef);
    _focused = false;
    ngOnInit() {
        this._focusMonitor
            .monitor(this._elementRef, true)
            .pipe(takeUntil(this._destroy$))
            .subscribe((focusOrigin) => {
            this._focused = !!focusOrigin;
            this._cdr.markForCheck();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QInputGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QInputGroupComponent, isStandalone: true, selector: "q-input-group", inputs: { prefix: "prefix", suffix: "suffix", dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, providers: [QDestroyService], ngImport: i0, template: `
    <span *ngIf="prefix" #prefixTemplate class="q-input-group-prefix">
      <ng-container *ngTemplateOutlet="prefix" />
    </span>

    <ng-content />

    <span *ngIf="suffix" #suffixTemplate class="q-input-group-suffix">
      <ng-container *ngTemplateOutlet="suffix" />
    </span>
  `, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-input-group{font-family:var(--awds-input-container-font-family, var(--ads-font-family-body));font-size:var(--awds-input-container-font-size, var(--ads-font-size-s));font-style:var(--awds-input-container-font-style, inherit);font-weight:var(--awds-input-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-input-container-letter-spacing, 0);line-height:var(--awds-input-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-input-container-text-transform, none);display:inline-flex;position:relative;align-items:center;border-radius:var(--awds-input-container-border-radius, var(--ads-border-radius-s));background:var(--awds-input-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));padding:var(--awds-input-container-padding, var(--ads-size-micro) var(--ads-size-xxs));min-height:var(--awds-input-container-min-height, var(--ads-size-xl));max-height:var(--awds-input-container-max-height, auto);min-width:var(--awds-input-container-min-width, auto);margin:var(--awds-input-container-margin, 0);width:var(--awds-input-container-width, 100%)}.q-input-group:has(.q-input-group-suffix){padding-right:var(--awds-input-suffix-padding-right, var(--ads-size-xxxs))}.q-input-group:has(.q-input-group-prefix){padding-left:var(--awds-input-prefix-padding-left, var(--ads-size-xxxs))}.q-input-group-prefix,.q-input-group-suffix{color:var(--awds-input-affix-color, var(--ads-color-body-contrast-100));display:flex;flex:none;align-items:center;max-width:var(--awds-input-affix-max-width, var(--ads-size-mega));overflow:hidden;word-wrap:break-word;word-break:break-all;height:fit-content}.q-input-group-prefix{margin:var(--awds-input-prefix-margin, 0 var(--ads-size-nano) 0 0);text-align:left}.q-input-group-suffix{margin:var(--awds-input-suffix-margin, 0 0 0 var(--ads-size-nano));text-align:right}.q-input-group:hover{box-shadow:var(--awds-input-hover-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-600));background:var(--awds-input-hover-container-background, var(--ads-color-body-100))}.q-input-group:has(.q-input:focus){box-shadow:var(--awds-input-focus-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400));background:var(--awds-input-focus-container-background, var(--ads-color-body-100));transition:box-shadow 10ms}.q-input-group:has(.q-input.q-input-invalid){background:var(--awds-input-invalid-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-invalid-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-input-group:has(.q-input.q-input-invalid):hover{background:var(--awds-input-invalid-hover-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-invalid-hover-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-input-group:has(.q-input.q-input-invalid:focus){background:var(--awds-input-invalid-focus-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-invalid-focus-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-input-group:has(.q-input[readonly]){background:var(--awds-input-readonly-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-readonly-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-input-group:has(.q-input[readonly]):hover{background:var(--awds-input-readonly-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-readonly-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-input-group:has(.q-input[readonly]:focus){background:var(--awds-input-readonly-focus-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-readonly-focus-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-input-group:has(.q-input.cdk-keyboard-focused:focus){outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-input-group:has(.q-input[disabled]){background:var(--awds-input-disabled-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-disabled-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));opacity:var(--awds-input-disabled-container-opacity, 1)}.q-input-group:has(.q-input[disabled]) .q-input-group-prefix,.q-input-group:has(.q-input[disabled]) .q-input-group-suffix{color:var(--awds-input-disabled-container-color, var(--ads-color-body-400))}.q-input-group:has(.q-input[disabled]) .q-input-group-prefix .q-icon,.q-input-group:has(.q-input[disabled]) .q-input-group-suffix .q-icon{fill:var(--awds-input-disabled-container-color, var(--ads-color-body-400))}.q-input-group:has(.q-input[disabled]):hover{background:var(--awds-input-disabled-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-disabled-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-input-group .q-input[qInput]{box-shadow:none;background:none;padding:0;min-height:auto;border-radius:0;margin:0;opacity:1}.q-input-group .q-input[qInput].cdk-keyboard-focused{background:none;border:none;box-shadow:none}.q-input-group .q-input[qInput]:focus,.q-input-group .q-input[qInput]:hover,.q-input-group .q-input[qInput].q-input-invalid:focus,.q-input-group .q-input[qInput].q-input-invalid:hover{background:none;border:none;box-shadow:none}.q-input-group.cdk-keyboard-focused.q-focus-indicator:before{opacity:1}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QInputGroupComponent, decorators: [{
            type: Component,
            args: [{ imports: [NgIf, NgTemplateOutlet], providers: [QDestroyService], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-input-group', template: `
    <span *ngIf="prefix" #prefixTemplate class="q-input-group-prefix">
      <ng-container *ngTemplateOutlet="prefix" />
    </span>

    <ng-content />

    <span *ngIf="suffix" #suffixTemplate class="q-input-group-suffix">
      <ng-container *ngTemplateOutlet="suffix" />
    </span>
  `, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-input-group{font-family:var(--awds-input-container-font-family, var(--ads-font-family-body));font-size:var(--awds-input-container-font-size, var(--ads-font-size-s));font-style:var(--awds-input-container-font-style, inherit);font-weight:var(--awds-input-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-input-container-letter-spacing, 0);line-height:var(--awds-input-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-input-container-text-transform, none);display:inline-flex;position:relative;align-items:center;border-radius:var(--awds-input-container-border-radius, var(--ads-border-radius-s));background:var(--awds-input-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-500));padding:var(--awds-input-container-padding, var(--ads-size-micro) var(--ads-size-xxs));min-height:var(--awds-input-container-min-height, var(--ads-size-xl));max-height:var(--awds-input-container-max-height, auto);min-width:var(--awds-input-container-min-width, auto);margin:var(--awds-input-container-margin, 0);width:var(--awds-input-container-width, 100%)}.q-input-group:has(.q-input-group-suffix){padding-right:var(--awds-input-suffix-padding-right, var(--ads-size-xxxs))}.q-input-group:has(.q-input-group-prefix){padding-left:var(--awds-input-prefix-padding-left, var(--ads-size-xxxs))}.q-input-group-prefix,.q-input-group-suffix{color:var(--awds-input-affix-color, var(--ads-color-body-contrast-100));display:flex;flex:none;align-items:center;max-width:var(--awds-input-affix-max-width, var(--ads-size-mega));overflow:hidden;word-wrap:break-word;word-break:break-all;height:fit-content}.q-input-group-prefix{margin:var(--awds-input-prefix-margin, 0 var(--ads-size-nano) 0 0);text-align:left}.q-input-group-suffix{margin:var(--awds-input-suffix-margin, 0 0 0 var(--ads-size-nano));text-align:right}.q-input-group:hover{box-shadow:var(--awds-input-hover-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-600));background:var(--awds-input-hover-container-background, var(--ads-color-body-100))}.q-input-group:has(.q-input:focus){box-shadow:var(--awds-input-focus-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400));background:var(--awds-input-focus-container-background, var(--ads-color-body-100));transition:box-shadow 10ms}.q-input-group:has(.q-input.q-input-invalid){background:var(--awds-input-invalid-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-invalid-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-input-group:has(.q-input.q-input-invalid):hover{background:var(--awds-input-invalid-hover-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-invalid-hover-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-danger-400))}.q-input-group:has(.q-input.q-input-invalid:focus){background:var(--awds-input-invalid-focus-container-background, var(--ads-color-body-100));box-shadow:var(--awds-input-invalid-focus-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-danger-400))}.q-input-group:has(.q-input[readonly]){background:var(--awds-input-readonly-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-readonly-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-input-group:has(.q-input[readonly]):hover{background:var(--awds-input-readonly-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-readonly-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-input-group:has(.q-input[readonly]:focus){background:var(--awds-input-readonly-focus-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-readonly-focus-container-box-shadow, inset 0 0 0 var(--ads-border-width-thin) var(--ads-color-primary-400))}.q-input-group:has(.q-input.cdk-keyboard-focused:focus){outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-input-group:has(.q-input[disabled]){background:var(--awds-input-disabled-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-disabled-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400));opacity:var(--awds-input-disabled-container-opacity, 1)}.q-input-group:has(.q-input[disabled]) .q-input-group-prefix,.q-input-group:has(.q-input[disabled]) .q-input-group-suffix{color:var(--awds-input-disabled-container-color, var(--ads-color-body-400))}.q-input-group:has(.q-input[disabled]) .q-input-group-prefix .q-icon,.q-input-group:has(.q-input[disabled]) .q-input-group-suffix .q-icon{fill:var(--awds-input-disabled-container-color, var(--ads-color-body-400))}.q-input-group:has(.q-input[disabled]):hover{background:var(--awds-input-disabled-container-background, var(--ads-color-body-200));box-shadow:var(--awds-input-disabled-container-box-shadow, inset 0 0 0 var(--ads-border-width-hairline) var(--ads-color-body-400))}.q-input-group .q-input[qInput]{box-shadow:none;background:none;padding:0;min-height:auto;border-radius:0;margin:0;opacity:1}.q-input-group .q-input[qInput].cdk-keyboard-focused{background:none;border:none;box-shadow:none}.q-input-group .q-input[qInput]:focus,.q-input-group .q-input[qInput]:hover,.q-input-group .q-input[qInput].q-input-invalid:focus,.q-input-group .q-input[qInput].q-input-invalid:hover{background:none;border:none;box-shadow:none}.q-input-group.cdk-keyboard-focused.q-focus-indicator:before{opacity:1}\n"] }]
        }], propDecorators: { prefix: [{
                type: Input
            }], suffix: [{
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

let nextUniqueId = 0;
class QInputDirective extends ErrorState {
    errorStateMatcher = new ErrorStateMatcher();
    invalidState = false;
    controlId = `q-input-${nextUniqueId++}`;
    dataQt = 'q-input';
    get hostClasses() {
        return ['q-input', this.invalidState && 'q-input-invalid'].filter(Boolean).join(' ');
    }
    _focusMonitor = inject(FocusMonitor);
    _elementRef = inject(ElementRef);
    _injector = inject(Injector);
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
    }
    ngOnInit() {
        this._setComponentControl();
        this._focusMonitor.monitor(this._elementRef);
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
            if (!(this.ngControl instanceof NgModel)) {
                this.invalidState = this.errorState;
            }
        }
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
    _setComponentControl() {
        const injectedControl = this._injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QInputDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: QInputDirective, isStandalone: true, selector: "input[qInput]", inputs: { errorStateMatcher: "errorStateMatcher", invalidState: ["invalidState", "invalidState", booleanAttribute], controlId: "controlId", dataQt: "dataQt" }, host: { properties: { "attr.id": "this.controlId", "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, providers: [{ provide: FormFieldControl, useExisting: QInputDirective }], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[qInput]',
                    providers: [{ provide: FormFieldControl, useExisting: QInputDirective }],
                }]
        }], ctorParameters: () => [], propDecorators: { errorStateMatcher: [{
                type: Input
            }], invalidState: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], controlId: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.id']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_INPUT_COMPONENTS = [QInputDirective, QInputGroupComponent];

/**
 * Generated bundle index. Do not edit.
 */

export { QInputDirective, QInputGroupComponent, Q_INPUT_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-input.mjs.map
