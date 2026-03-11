import * as i0 from '@angular/core';
import { inject, ElementRef, Renderer2, Directive, ChangeDetectorRef, booleanAttribute, HostBinding, ContentChildren, Input, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormGroupDirective } from '@angular/forms';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { takeUntil } from 'rxjs/operators';

class QErrorDirective {
    _elementRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    ngOnInit() {
        this._renderer.addClass(this._elementRef.nativeElement, 'q-error');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QErrorDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QErrorDirective, isStandalone: true, selector: "[qError]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QErrorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qError]',
                }]
        }] });

class FormFieldControl {
    controlId;
    errorState;
    invalidState;
    stateChanges;
    ngControl;
    errorStateMatcher;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: FormFieldControl, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: FormFieldControl, isStandalone: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: FormFieldControl, decorators: [{
            type: Directive
        }] });

class QFormControlComponent {
    preserveFooterSpace = true;
    showErrorIcon = true;
    dataQt = 'q-form-control';
    _formFieldControls;
    get hostClasses() {
        return [
            'q-form-control',
            this._isErrorState() && 'invalid',
            this.showErrorIcon && 'q-form-control-with-error-icon',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _destroy$ = inject(QDestroyService);
    _cdr = inject(ChangeDetectorRef);
    _formGroup = inject(FormGroupDirective, { optional: true });
    ngAfterContentInit() {
        this._handleFormControlChanges();
        this._handleFormGroupChanges();
    }
    _getDisplayedMessages() {
        return this._isErrorState() ? 'error' : 'hint';
    }
    get isRadioButtonComponent() {
        return (this._formFieldControls.get(0)?.dataQt === 'q-radio-button');
    }
    get isRadioGroup() {
        return (this._formFieldControls.get(0)?.dataQt === 'q-radio-group');
    }
    get isCheckbox() {
        return (this._formFieldControls.get(0)?.dataQt === 'q-checkbox');
    }
    _isErrorState() {
        return (this._formFieldControls.some((control) => control.errorState) ||
            (!!this._formGroup?.touched && !!this._formGroup?.control?.errors));
    }
    _handleFormControlChanges() {
        this._formFieldControls.forEach((control) => {
            control.stateChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._cdr.markForCheck();
            });
            control.ngControl?.valueChanges
                ?.pipe(takeUntil(this._destroy$))
                .subscribe(() => this._cdr.markForCheck());
        });
    }
    _handleFormGroupChanges() {
        this._formGroup?.valueChanges?.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QFormControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QFormControlComponent, isStandalone: true, selector: "q-form-control", inputs: { preserveFooterSpace: ["preserveFooterSpace", "preserveFooterSpace", booleanAttribute], showErrorIcon: ["showErrorIcon", "showErrorIcon", booleanAttribute], dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, providers: [QDestroyService], queries: [{ propertyName: "_formFieldControls", predicate: FormFieldControl, descendants: true }], ngImport: i0, template: "<div class=\"q-form-control-head\">\n  <label\n    class=\"q-form-control-label\"\n    [attr.for]=\"_formFieldControls.length && _formFieldControls.get(0)?.controlId\">\n    <ng-content select=\"[qLabel]\" />\n  </label>\n</div>\n\n<div class=\"q-form-control-body\">\n  <ng-content />\n</div>\n\n<div\n  class=\"q-form-control-foot\"\n  [ngClass]=\"{\n    'q-form-control-rb-error': isRadioButtonComponent,\n    'q-form-control-rg-error': isRadioGroup,\n    'q-form-control-checkbox-error': isCheckbox,\n    'q-form-control-preserve-space': preserveFooterSpace,\n  }\"\n  [ngSwitch]=\"_getDisplayedMessages()\">\n  <ng-container *ngSwitchCase=\"'error'\">\n    <label class=\"q-form-control-error\">\n      <ng-content select=\"[qError]\" />\n    </label>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"'hint'\">\n    <label class=\"q-form-control-hint\">\n      <ng-content select=\"[qHint]\" />\n    </label>\n  </ng-container>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-form-control{display:flex;flex-direction:column;gap:var(--awds-form-control-container-gap, var(--ads-size-nano))}.q-form-control-head{display:flex;justify-content:space-between}.q-form-control-head .q-form-control-label{font-family:var(--awds-form-control-label-font-family, var(--ads-font-family-body));font-size:var(--awds-form-control-label-font-size, var(--ads-font-size-xs));font-style:var(--awds-form-control-label-font-style, inherit);font-weight:var(--awds-form-control-label-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-form-control-label-letter-spacing, 0);line-height:var(--awds-form-control-label-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-form-control-label-text-transform, none);color:var(--awds-form-control-label-color, var(--ads-color-body-contrast-100))}.q-form-control-body{position:relative;display:flex;gap:var(--awds-form-control-body-gap, var(--ads-size-micro));align-items:center}.q-form-control-with-error-icon .q-error:before{content:\"\";-webkit-mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M11 15h2v2h-2Zm0-8h2v6h-2Zm.99-5A10 10 0 1 0 22 12 10 10 0 0 0 11.99 2M12 20a8 8 0 1 1 8-8 8 8 0 0 1-8 8\"></path></svg>');mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M11 15h2v2h-2Zm0-8h2v6h-2Zm.99-5A10 10 0 1 0 22 12 10 10 0 0 0 11.99 2M12 20a8 8 0 1 1 8-8 8 8 0 0 1-8 8\"></path></svg>');mask-type:alpha;align-self:flex-start;width:var(--awds-form-control-hint-error-icon-dimensions, var(--ads-size-xs));height:var(--awds-form-control-hint-error-icon-dimensions, var(--ads-size-xs));background-color:currentColor;display:block;flex-shrink:0}.q-form-control-foot{font-family:var(--awds-form-control-hint-font-family, var(--ads-font-family-body));font-size:var(--awds-form-control-hint-font-size, var(--ads-font-size-xxs));font-style:var(--awds-form-control-hint-font-style, inherit);font-weight:var(--awds-form-control-hint-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-form-control-hint-letter-spacing, 0);line-height:var(--awds-form-control-hint-line-height, var(--ads-font-line-height-xxs));text-transform:var(--awds-form-control-hint-text-transform, none)}.q-form-control-foot .q-form-control-hint{display:flex;flex-direction:column;color:var(--awds-form-control-hint-color, var(--ads-color-body-500));gap:var(--awds-form-control-hint-gap, var(--ads-size-nano))}.q-form-control-foot .q-form-control-error{display:flex;flex-direction:column;color:var(--awds-form-control-hint-error-color, var(--ads-color-danger-500));gap:var(--awds-form-control-hint-error-gap, var(--ads-size-nano))}.q-form-control-foot .q-error{display:flex;align-items:center;gap:var(--awds-form-control-hint-error-gap, var(--ads-size-nano))}.q-form-control-foot.q-form-control-rb-error,.q-form-control-foot.q-form-control-rg-error{margin:var(--awds-form-control-hint-error-margin, 0 0 0 var(--ads-size-micro))}.q-form-control-foot.q-form-control-checkbox-error{margin:var(--awds-form-control-hint-error-margin, var(--ads-size-nano) 0 0 var(--ads-size-micro))}.q-form-control-foot.q-form-control-preserve-space{min-height:var(--awds-form-control-hint-min-height, var(--ads-size-xs))}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QFormControlComponent, decorators: [{
            type: Component,
            args: [{ imports: [NgClass, NgSwitch, NgSwitchCase], selector: 'q-form-control', providers: [QDestroyService], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"q-form-control-head\">\n  <label\n    class=\"q-form-control-label\"\n    [attr.for]=\"_formFieldControls.length && _formFieldControls.get(0)?.controlId\">\n    <ng-content select=\"[qLabel]\" />\n  </label>\n</div>\n\n<div class=\"q-form-control-body\">\n  <ng-content />\n</div>\n\n<div\n  class=\"q-form-control-foot\"\n  [ngClass]=\"{\n    'q-form-control-rb-error': isRadioButtonComponent,\n    'q-form-control-rg-error': isRadioGroup,\n    'q-form-control-checkbox-error': isCheckbox,\n    'q-form-control-preserve-space': preserveFooterSpace,\n  }\"\n  [ngSwitch]=\"_getDisplayedMessages()\">\n  <ng-container *ngSwitchCase=\"'error'\">\n    <label class=\"q-form-control-error\">\n      <ng-content select=\"[qError]\" />\n    </label>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"'hint'\">\n    <label class=\"q-form-control-hint\">\n      <ng-content select=\"[qHint]\" />\n    </label>\n  </ng-container>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-form-control{display:flex;flex-direction:column;gap:var(--awds-form-control-container-gap, var(--ads-size-nano))}.q-form-control-head{display:flex;justify-content:space-between}.q-form-control-head .q-form-control-label{font-family:var(--awds-form-control-label-font-family, var(--ads-font-family-body));font-size:var(--awds-form-control-label-font-size, var(--ads-font-size-xs));font-style:var(--awds-form-control-label-font-style, inherit);font-weight:var(--awds-form-control-label-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-form-control-label-letter-spacing, 0);line-height:var(--awds-form-control-label-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-form-control-label-text-transform, none);color:var(--awds-form-control-label-color, var(--ads-color-body-contrast-100))}.q-form-control-body{position:relative;display:flex;gap:var(--awds-form-control-body-gap, var(--ads-size-micro));align-items:center}.q-form-control-with-error-icon .q-error:before{content:\"\";-webkit-mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M11 15h2v2h-2Zm0-8h2v6h-2Zm.99-5A10 10 0 1 0 22 12 10 10 0 0 0 11.99 2M12 20a8 8 0 1 1 8-8 8 8 0 0 1-8 8\"></path></svg>');mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M11 15h2v2h-2Zm0-8h2v6h-2Zm.99-5A10 10 0 1 0 22 12 10 10 0 0 0 11.99 2M12 20a8 8 0 1 1 8-8 8 8 0 0 1-8 8\"></path></svg>');mask-type:alpha;align-self:flex-start;width:var(--awds-form-control-hint-error-icon-dimensions, var(--ads-size-xs));height:var(--awds-form-control-hint-error-icon-dimensions, var(--ads-size-xs));background-color:currentColor;display:block;flex-shrink:0}.q-form-control-foot{font-family:var(--awds-form-control-hint-font-family, var(--ads-font-family-body));font-size:var(--awds-form-control-hint-font-size, var(--ads-font-size-xxs));font-style:var(--awds-form-control-hint-font-style, inherit);font-weight:var(--awds-form-control-hint-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-form-control-hint-letter-spacing, 0);line-height:var(--awds-form-control-hint-line-height, var(--ads-font-line-height-xxs));text-transform:var(--awds-form-control-hint-text-transform, none)}.q-form-control-foot .q-form-control-hint{display:flex;flex-direction:column;color:var(--awds-form-control-hint-color, var(--ads-color-body-500));gap:var(--awds-form-control-hint-gap, var(--ads-size-nano))}.q-form-control-foot .q-form-control-error{display:flex;flex-direction:column;color:var(--awds-form-control-hint-error-color, var(--ads-color-danger-500));gap:var(--awds-form-control-hint-error-gap, var(--ads-size-nano))}.q-form-control-foot .q-error{display:flex;align-items:center;gap:var(--awds-form-control-hint-error-gap, var(--ads-size-nano))}.q-form-control-foot.q-form-control-rb-error,.q-form-control-foot.q-form-control-rg-error{margin:var(--awds-form-control-hint-error-margin, 0 0 0 var(--ads-size-micro))}.q-form-control-foot.q-form-control-checkbox-error{margin:var(--awds-form-control-hint-error-margin, var(--ads-size-nano) 0 0 var(--ads-size-micro))}.q-form-control-foot.q-form-control-preserve-space{min-height:var(--awds-form-control-hint-min-height, var(--ads-size-xs))}\n"] }]
        }], propDecorators: { preserveFooterSpace: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showErrorIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _formFieldControls: [{
                type: ContentChildren,
                args: [FormFieldControl, { descendants: true }]
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QHintDirective {
    _elementRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    ngOnInit() {
        this._renderer.addClass(this._elementRef.nativeElement, 'q-hint');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QHintDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QHintDirective, isStandalone: true, selector: "[qHint]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QHintDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[qHint]' }]
        }] });

class QLabelDirective {
    _elementRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    ngOnInit() {
        this._renderer.addClass(this._elementRef.nativeElement, 'q-label');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLabelDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QLabelDirective, isStandalone: true, selector: "[qLabel]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLabelDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[qLabel]' }]
        }] });

class ErrorStateMatcher {
    isErrorState(control, form) {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.touched || isSubmitted));
    }
}

const Q_FORM_CONTROL_COMPONENTS = [
    QFormControlComponent,
    QLabelDirective,
    QHintDirective,
    QErrorDirective,
];

/**
 * Generated bundle index. Do not edit.
 */

export { ErrorStateMatcher, FormFieldControl, QErrorDirective, QFormControlComponent, QHintDirective, QLabelDirective, Q_FORM_CONTROL_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-form-control.mjs.map
