import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty, coerceCssPixelValue } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { NgIf, NgClass, NgTemplateOutlet, NgStyle, NgSwitch, NgSwitchCase } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, booleanAttribute, HostListener, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component, forwardRef, inject, ChangeDetectorRef, Injector, ContentChildren, ElementRef, ViewChild } from '@angular/core';
import { QExpansionTriggerComponent } from '@questrade/allspark-angular-components/core/components';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { ErrorState, voidFn, randomString } from '@questrade/allspark-angular-components/core/utils';
import { Subject, takeUntil } from 'rxjs';
import { accordionAnimations } from '@questrade/allspark-angular-components/core/animations';
import { CDK_ACCORDION, CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, NgModel, NgControl } from '@angular/forms';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';
import * as i1 from '@questrade/allspark-angular-components/core/directives';
import { QLineClampDirective } from '@questrade/allspark-angular-components/core/directives';

class QRadioContainerComponent {
    radioContainerChange = new EventEmitter();
    expanded = false;
    extraContent = null;
    extraContentContext = null;
    extraContentDensity = 'xs';
    extraContentPosition = 'below';
    variant;
    disabled;
    radioInputId;
    dataQt = 'q-radio-container';
    _hostClassName = 'q-radio-container';
    _onClick = (event) => this._onContainerInteraction(event);
    ngOnChanges(changes) {
        const { disabled } = changes || {};
        if (disabled?.currentValue) {
            this.expanded = false;
        }
    }
    _onContainerInteraction(event) {
        this.radioContainerChange.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QRadioContainerComponent, isStandalone: true, selector: "q-radio-container", inputs: { expanded: ["expanded", "expanded", booleanAttribute], extraContent: "extraContent", extraContentContext: "extraContentContext", extraContentDensity: "extraContentDensity", extraContentPosition: "extraContentPosition", variant: "variant", disabled: "disabled", radioInputId: "radioInputId", dataQt: "dataQt" }, outputs: { radioContainerChange: "radioContainerChange" }, host: { listeners: { "click": "_onClick()" }, properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClassName" } }, usesOnChanges: true, ngImport: i0, template: "<div class=\"q-radio-container-header\" [class.q-radio-container-header-expanded]=\"expanded\">\n  <ng-content />\n</div>\n\n<div\n  *ngIf=\"extraContent && extraContentPosition === 'below'\"\n  class=\"q-radio-container-extra-content\"\n  role=\"region\"\n  [attr.id]=\"radioInputId + '-container'\"\n  [attr.aria-labelledby]=\"radioInputId\"\n  [ngClass]=\"'q-radio-extra-content-density-' + extraContentDensity\"\n  [@bodyExpansion]=\"variant === 'expandable' ? (expanded ? 'expanded' : 'collapsed') : null\"\n  [attr.data-qt]=\"'q-radio-extra-content-below'\">\n  <ng-container *ngTemplateOutlet=\"extraContent; context: { $implicit: extraContentContext }\" />\n</div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-radio-container{font-family:var(--awds-radio-container-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-container-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-container-font-style, inherit);font-weight:var(--awds-radio-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-container-letter-spacing, 0);line-height:var(--awds-radio-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-container-text-transform, none);display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:100%;border-radius:var(--awds-radio-container-border-radius, var(--ads-border-radius-s));outline:var(--awds-radio-container-outline, var(--ads-border-width-hairline) solid var(--ads-color-body-400));background:var(--awds-radio-container-background, var(--ads-color-body-100));overflow:hidden}.q-radio-container-header{display:flex;align-items:center;width:var(--awds-radio-container-panel-header-width, 100%);border-radius:var(--awds-radio-container-panel-header-border-radius, var(--ads-border-radius-s) var(--ads-border-radius-s) 0 0);background:var(--awds-radio-container-panel-header-background, var(--ads-color-body-100));position:relative}.q-radio-container-header .q-radio-button-input-container{padding-top:var(--awds-radio-container-panel-header-input-padding-top, var(--ads-size-quark));margin:var(--awds-radio-container-panel-header-input-margin, var(--ads-size-xxs) var(--ads-size-xxxs) auto var(--ads-size-xxs))}.q-radio-container-header:hover{cursor:pointer;background:var(--awds-radio-container-hover-panel-header-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));border-color:var(--awds-radio-container-hover-panel-header-border-color, transparent)}.q-radio-container-extra-content{padding:var(--awds-radio-container-extra-content-padding, 0 var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxl))}.q-radio-container .q-radio-button-container{padding:var(--awds-radio-container-padding, 0)}.q-radio-container .q-radio-button-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-unselected-indicator-border-color, var(--ads-color-body-500))}.q-radio-container .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-container-hover-unselected-indicator-border-width, var(--ads-border-width-hairline))}.q-radio-container .q-radio-container-header .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background:before{transform:scale(0)}.q-radio-button-checked .q-radio-container{outline:var(--awds-radio-container-checked-outline, var(--ads-border-width-thin) solid var(--ads-color-primary-400))}.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover{background:var(--awds-radio-container-hover-panel-body-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover .q-radio-container-header{background:var(--awds-radio-container-hover-panel-header-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container-extra-content{cursor:pointer}.q-radio-button-container-density-compact .q-radio-button-input-container{margin-top:var(--awds-radio-container-compact-input-container-margin-top, var(--ads-size-micro))}.q-radio-button-container-density-compact .q-radio-button-label{padding-top:var(--awds-radio-container-compact-label-padding-top, var(--ads-size-micro));padding-bottom:var(--awds-radio-container-compact-label-padding-bottom, var(--ads-size-micro))}.q-radio-button-container-density-compact .q-radio-container-extra-content{padding-bottom:var(--awds-radio-container-compact-extra-content-padding-bottom, var(--ads-size-micro))}.q-radio-button-container-density-comfort .q-radio-button-input-container{margin-top:var(--awds-radio-container-comfort-input-container-margin-top, var(--ads-size-xs));margin-left:var(--awds-radio-container-comfort-input-container-margin-left, var(--ads-size-s))}.q-radio-button-container-density-comfort .q-radio-button-label{padding-top:var(--awds-radio-container-comfort-label-padding-top, var(--ads-size-xs));padding-bottom:var(--awds-radio-container-comfort-label-padding-bottom, var(--ads-size-xs));padding-right:var(--awds-radio-container-comfort-label-padding-right, var(--ads-size-s))}.q-radio-button-container-density-comfort .q-radio-container-extra-content{padding-bottom:var(--awds-radio-container-comfort-extra-content-padding-bottom, var(--ads-size-xs));padding-left:var(--awds-radio-container-comfort-extra-content-padding-left, var(--ads-size-xxxl))}.q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-container,.q-radio-button-checked .q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid{outline:var(--awds-radio-container-invalid-outline, var(--ads-border-width-hairline) solid var(--ads-color-danger-400))}.q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle,.q-radio-button-checked .q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-invalid-unselected-indicator-border-color, var(--ads-color-danger-500))}.q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-container-header:hover,.q-radio-button-checked .q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid-header:hover{background:var(--awds-radio-container-invalid-hover-header-background-color, var(--ads-color-danger-100))}.q-radio-button-invalid.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover{background:var(--awds-radio-container-invalid-hover-panel-body-background, var(--ads-color-danger-100))}.q-radio-button-invalid.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover .q-radio-container-header{background:var(--awds-radio-container-invalid-hover-panel-header-background, var(--ads-color-danger-100))}.q-radio-button-disabled .q-radio-container{background:var(--awds-radio-container-disabled-background, var(--ads-color-body-200))}.q-radio-button-disabled .q-radio-container .q-radio-container-header{background:var(--awds-radio-container-disabled-panel-header-background, var(--ads-color-body-200));color:var(--awds-radio-container-disabled-panel-header-label-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-container .q-radio-container-header:hover{background:var(--awds-radio-container-hover-disabled-panel-header-background, var(--ads-color-body-200))}.q-radio-button-disabled .q-radio-container .q-radio-container-header .q-radio-button-label{cursor:default}.q-radio-button-disabled .q-radio-container .q-radio-container-header .q-radio-button-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-disabled-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-disabled.q-radio-button-checked .q-radio-container{outline:var(--awds-radio-container-disabled-outline, var(--ads-border-width-hairline) solid var(--ads-color-primary-200))}.q-radio-button-readonly .q-radio-container{background:var(--awds-radio-container-readonly-background, var(--ads-color-body-200))}.q-radio-button-readonly .q-radio-container .q-radio-container-header{background:var(--awds-radio-container-readonly-panel-header-background, var(--ads-color-body-200))}.q-radio-button-readonly .q-radio-container .q-radio-container-header:hover{background:var(--awds-radio-container-hover-readonly-panel-header, var(--ads-color-body-200))}.q-radio-button-readonly .q-radio-container .q-radio-container-header .q-radio-button-label{cursor:default}.q-radio-button-readonly .q-radio-container .q-radio-container-header .q-radio-button-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-readonly-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-readonly.q-radio-button-checked .q-radio-container{outline:var(--awds-radio-container-readonly-outline, var(--ads-border-width-hairline) solid var(--ads-color-primary-200))}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-container .q-radio-container{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-container.q-radio-button-invalid .q-radio-container{outline:var(--awds-radio-button-container-variant-invalid-focused-outline, none)}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable .q-radio-container{background:inherit}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable .q-radio-container-header{background:var(--awds-radio-expandable-focused-panel-header-background, var(--ads-color-primary-100))}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable.q-radio-button-invalid .q-radio-container:hover{background-color:inherit}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable.q-radio-button-invalid .q-radio-container-header{background-color:inherit}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable.q-radio-button-invalid .q-radio-container-header:hover{background:var(--awds-radio-expandable-hover-invalid-panel-header-background, var(--ads-color-danger-100))}.cdk-keyboard-focused.q-radio-button-readonly .q-radio-container{outline:var(--awds-radio-button-readonly-focused-outline, var(--ads-border-width-thin) solid var(--ads-color-primary-400))}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], animations: [accordionAnimations.bodyExpansion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioContainerComponent, decorators: [{
            type: Component,
            args: [{ imports: [NgIf, NgClass, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, animations: [accordionAnimations.bodyExpansion], selector: 'q-radio-container', template: "<div class=\"q-radio-container-header\" [class.q-radio-container-header-expanded]=\"expanded\">\n  <ng-content />\n</div>\n\n<div\n  *ngIf=\"extraContent && extraContentPosition === 'below'\"\n  class=\"q-radio-container-extra-content\"\n  role=\"region\"\n  [attr.id]=\"radioInputId + '-container'\"\n  [attr.aria-labelledby]=\"radioInputId\"\n  [ngClass]=\"'q-radio-extra-content-density-' + extraContentDensity\"\n  [@bodyExpansion]=\"variant === 'expandable' ? (expanded ? 'expanded' : 'collapsed') : null\"\n  [attr.data-qt]=\"'q-radio-extra-content-below'\">\n  <ng-container *ngTemplateOutlet=\"extraContent; context: { $implicit: extraContentContext }\" />\n</div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-radio-container{font-family:var(--awds-radio-container-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-container-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-container-font-style, inherit);font-weight:var(--awds-radio-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-container-letter-spacing, 0);line-height:var(--awds-radio-container-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-container-text-transform, none);display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:100%;border-radius:var(--awds-radio-container-border-radius, var(--ads-border-radius-s));outline:var(--awds-radio-container-outline, var(--ads-border-width-hairline) solid var(--ads-color-body-400));background:var(--awds-radio-container-background, var(--ads-color-body-100));overflow:hidden}.q-radio-container-header{display:flex;align-items:center;width:var(--awds-radio-container-panel-header-width, 100%);border-radius:var(--awds-radio-container-panel-header-border-radius, var(--ads-border-radius-s) var(--ads-border-radius-s) 0 0);background:var(--awds-radio-container-panel-header-background, var(--ads-color-body-100));position:relative}.q-radio-container-header .q-radio-button-input-container{padding-top:var(--awds-radio-container-panel-header-input-padding-top, var(--ads-size-quark));margin:var(--awds-radio-container-panel-header-input-margin, var(--ads-size-xxs) var(--ads-size-xxxs) auto var(--ads-size-xxs))}.q-radio-container-header:hover{cursor:pointer;background:var(--awds-radio-container-hover-panel-header-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));border-color:var(--awds-radio-container-hover-panel-header-border-color, transparent)}.q-radio-container-extra-content{padding:var(--awds-radio-container-extra-content-padding, 0 var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxl))}.q-radio-container .q-radio-button-container{padding:var(--awds-radio-container-padding, 0)}.q-radio-container .q-radio-button-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-unselected-indicator-border-color, var(--ads-color-body-500))}.q-radio-container .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-container-hover-unselected-indicator-border-width, var(--ads-border-width-hairline))}.q-radio-container .q-radio-container-header .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background:before{transform:scale(0)}.q-radio-button-checked .q-radio-container{outline:var(--awds-radio-container-checked-outline, var(--ads-border-width-thin) solid var(--ads-color-primary-400))}.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover{background:var(--awds-radio-container-hover-panel-body-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover .q-radio-container-header{background:var(--awds-radio-container-hover-panel-header-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container-extra-content{cursor:pointer}.q-radio-button-container-density-compact .q-radio-button-input-container{margin-top:var(--awds-radio-container-compact-input-container-margin-top, var(--ads-size-micro))}.q-radio-button-container-density-compact .q-radio-button-label{padding-top:var(--awds-radio-container-compact-label-padding-top, var(--ads-size-micro));padding-bottom:var(--awds-radio-container-compact-label-padding-bottom, var(--ads-size-micro))}.q-radio-button-container-density-compact .q-radio-container-extra-content{padding-bottom:var(--awds-radio-container-compact-extra-content-padding-bottom, var(--ads-size-micro))}.q-radio-button-container-density-comfort .q-radio-button-input-container{margin-top:var(--awds-radio-container-comfort-input-container-margin-top, var(--ads-size-xs));margin-left:var(--awds-radio-container-comfort-input-container-margin-left, var(--ads-size-s))}.q-radio-button-container-density-comfort .q-radio-button-label{padding-top:var(--awds-radio-container-comfort-label-padding-top, var(--ads-size-xs));padding-bottom:var(--awds-radio-container-comfort-label-padding-bottom, var(--ads-size-xs));padding-right:var(--awds-radio-container-comfort-label-padding-right, var(--ads-size-s))}.q-radio-button-container-density-comfort .q-radio-container-extra-content{padding-bottom:var(--awds-radio-container-comfort-extra-content-padding-bottom, var(--ads-size-xs));padding-left:var(--awds-radio-container-comfort-extra-content-padding-left, var(--ads-size-xxxl))}.q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-container,.q-radio-button-checked .q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid{outline:var(--awds-radio-container-invalid-outline, var(--ads-border-width-hairline) solid var(--ads-color-danger-400))}.q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle,.q-radio-button-checked .q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-invalid-unselected-indicator-border-color, var(--ads-color-danger-500))}.q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid .q-radio-container-header:hover,.q-radio-button-checked .q-radio-button:not(.q-radio-button-disabled):not(.q-radio-button-readonly).q-radio-button-invalid-header:hover{background:var(--awds-radio-container-invalid-hover-header-background-color, var(--ads-color-danger-100))}.q-radio-button-invalid.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover{background:var(--awds-radio-container-invalid-hover-panel-body-background, var(--ads-color-danger-100))}.q-radio-button-invalid.q-radio-button-variant-container:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-container:hover .q-radio-container-header{background:var(--awds-radio-container-invalid-hover-panel-header-background, var(--ads-color-danger-100))}.q-radio-button-disabled .q-radio-container{background:var(--awds-radio-container-disabled-background, var(--ads-color-body-200))}.q-radio-button-disabled .q-radio-container .q-radio-container-header{background:var(--awds-radio-container-disabled-panel-header-background, var(--ads-color-body-200));color:var(--awds-radio-container-disabled-panel-header-label-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-container .q-radio-container-header:hover{background:var(--awds-radio-container-hover-disabled-panel-header-background, var(--ads-color-body-200))}.q-radio-button-disabled .q-radio-container .q-radio-container-header .q-radio-button-label{cursor:default}.q-radio-button-disabled .q-radio-container .q-radio-container-header .q-radio-button-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-disabled-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-disabled.q-radio-button-checked .q-radio-container{outline:var(--awds-radio-container-disabled-outline, var(--ads-border-width-hairline) solid var(--ads-color-primary-200))}.q-radio-button-readonly .q-radio-container{background:var(--awds-radio-container-readonly-background, var(--ads-color-body-200))}.q-radio-button-readonly .q-radio-container .q-radio-container-header{background:var(--awds-radio-container-readonly-panel-header-background, var(--ads-color-body-200))}.q-radio-button-readonly .q-radio-container .q-radio-container-header:hover{background:var(--awds-radio-container-hover-readonly-panel-header, var(--ads-color-body-200))}.q-radio-button-readonly .q-radio-container .q-radio-container-header .q-radio-button-label{cursor:default}.q-radio-button-readonly .q-radio-container .q-radio-container-header .q-radio-button-container .q-radio-button-input-container .q-radio-button-background .q-radio-button-background-outer-circle{border-color:var(--awds-radio-container-readonly-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-readonly.q-radio-button-checked .q-radio-container{outline:var(--awds-radio-container-readonly-outline, var(--ads-border-width-hairline) solid var(--ads-color-primary-200))}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-container .q-radio-container{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-container.q-radio-button-invalid .q-radio-container{outline:var(--awds-radio-button-container-variant-invalid-focused-outline, none)}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable .q-radio-container{background:inherit}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable .q-radio-container-header{background:var(--awds-radio-expandable-focused-panel-header-background, var(--ads-color-primary-100))}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable.q-radio-button-invalid .q-radio-container:hover{background-color:inherit}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable.q-radio-button-invalid .q-radio-container-header{background-color:inherit}.cdk-keyboard-focused:not(.q-radio-button-readonly).q-radio-button-variant-expandable.q-radio-button-invalid .q-radio-container-header:hover{background:var(--awds-radio-expandable-hover-invalid-panel-header-background, var(--ads-color-danger-100))}.cdk-keyboard-focused.q-radio-button-readonly .q-radio-container{outline:var(--awds-radio-button-readonly-focused-outline, var(--ads-border-width-thin) solid var(--ads-color-primary-400))}\n"] }]
        }], propDecorators: { radioContainerChange: [{
                type: Output
            }], expanded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], extraContent: [{
                type: Input
            }], extraContentContext: [{
                type: Input
            }], extraContentDensity: [{
                type: Input
            }], extraContentPosition: [{
                type: Input
            }], variant: [{
                type: Input
            }], disabled: [{
                type: Input
            }], radioInputId: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], _onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

const RADIO_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QRadioGroupComponent),
    multi: true,
};
class QRadioGroupComponent extends ErrorState {
    radioGroupChange = new EventEmitter();
    errorStateMatcher = new ErrorStateMatcher();
    labelGap = 's';
    variant = 'default';
    invalidState = false;
    dataQt = 'q-radio-group';
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._updateSelectedRadioFromValue();
            this._checkSelectedRadioButton();
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this._updateRadioButtonNames();
    }
    get selected() {
        return this._selected;
    }
    set selected(selected) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
        this._checkSelectedRadioButton();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._markRadiosForCheck();
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this._markRadiosForCheck();
    }
    _radios;
    hostClass = 'q-radio-group';
    hostRole = 'radiogroup';
    _controlValueAccessorChangeFn = voidFn;
    _onTouched = voidFn;
    // #region: CdkAccordion implementation
    _stateChanges = new Subject();
    _openCloseAllActions = new Subject();
    id = `q-radio-group-${randomString()}`;
    multi = false;
    // #endregion
    _value = null;
    _name = `q-radio-group-${randomString()}`;
    _selected = null;
    _isInitialized = false;
    _disabled = false;
    _required = false;
    _cdr = inject(ChangeDetectorRef);
    _destroy$ = inject(QDestroyService);
    injector = inject(Injector);
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
    }
    ngOnInit() {
        this._setComponentControl();
    }
    ngOnChanges(changes) {
        this._stateChanges.next(changes);
    }
    ngOnDestroy() {
        this._stateChanges.complete();
        this._openCloseAllActions.complete();
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
            if (!(this.ngControl instanceof NgModel)) {
                this.invalidState = this.errorState;
            }
        }
    }
    ngAfterContentInit() {
        this._isInitialized = true;
        this._setRadiosSub();
    }
    // CdkAccordion implementation
    openAll() {
        if (this.multi) {
            this._openCloseAllActions.next(true);
        }
    }
    // CdkAccordion implementation
    closeAll() {
        this._openCloseAllActions.next(false);
    }
    _checkSelectedRadioButton() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }
    _touch() {
        if (this._onTouched) {
            this._onTouched();
        }
    }
    _emitChangeEvent() {
        if (this._isInitialized) {
            this.radioGroupChange.emit({
                value: this._value,
                ...(this._selected && { source: this._selected }),
                ...(this._selected && { target: this._selected._elementRef }),
            });
        }
    }
    _markRadiosForCheck() {
        if (this._radios) {
            this._radios.forEach((radio) => radio._markForCheck());
        }
    }
    _setRadiosSub() {
        this._radios.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            if (this.selected && !this._radios.find((radio) => radio === this.selected)) {
                this._selected = null;
            }
        });
    }
    writeValue(value) {
        this.value = value;
        this._cdr.markForCheck();
    }
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cdr.markForCheck();
    }
    _setComponentControl() {
        const injectedControl = this.injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    _updateRadioButtonNames() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.name = this.name;
                radio._markForCheck();
            });
        }
    }
    _updateSelectedRadioFromValue() {
        const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this._radios && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach((radio) => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QRadioGroupComponent, isStandalone: true, selector: "q-radio-group", inputs: { errorStateMatcher: "errorStateMatcher", labelGap: "labelGap", variant: "variant", invalidState: ["invalidState", "invalidState", booleanAttribute], dataQt: "dataQt", value: "value", name: "name", selected: "selected", disabled: "disabled", required: "required" }, outputs: { radioGroupChange: "radioGroupChange" }, host: { properties: { "class.q-radio-group-invalid": "this.invalidState", "attr.data-qt": "this.dataQt", "class": "this.hostClass", "attr.role": "this.hostRole" } }, providers: [
            QDestroyService,
            RADIO_GROUP_VALUE_ACCESSOR,
            { provide: FormFieldControl, useExisting: QRadioGroupComponent },
            { provide: CDK_ACCORDION, useExisting: forwardRef(() => QRadioGroupComponent) },
        ], queries: [{ propertyName: "_radios", predicate: i0.forwardRef(() => QRadioButtonComponent), descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `<ng-content />`, isInline: true, styles: ["@use \"../../styles/typography\";.q-radio-group{@include typography.q-body-m;display:flex;flex-direction:var(--awds-radio-group-flex-direction, column);gap:var(--awds-radio-group-gap, var(--ads-size-xxxs) 0)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioGroupComponent, decorators: [{
            type: Component,
            args: [{ providers: [
                        QDestroyService,
                        RADIO_GROUP_VALUE_ACCESSOR,
                        { provide: FormFieldControl, useExisting: QRadioGroupComponent },
                        { provide: CDK_ACCORDION, useExisting: forwardRef(() => QRadioGroupComponent) },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-radio-group', template: `<ng-content />`, styles: ["@use \"../../styles/typography\";.q-radio-group{@include typography.q-body-m;display:flex;flex-direction:var(--awds-radio-group-flex-direction, column);gap:var(--awds-radio-group-gap, var(--ads-size-xxxs) 0)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { radioGroupChange: [{
                type: Output
            }], errorStateMatcher: [{
                type: Input
            }], labelGap: [{
                type: Input
            }], variant: [{
                type: Input
            }], invalidState: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-radio-group-invalid']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], value: [{
                type: Input
            }], name: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], _radios: [{
                type: ContentChildren,
                args: [forwardRef(() => QRadioButtonComponent), { descendants: true }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], hostRole: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });

class QRadioExpandableComponent extends CdkAccordionItem {
    containerRef;
    dataQt = 'q-radio-expandable';
    _hostClassName = 'q-radio-expandable';
    accordion = inject(CDK_ACCORDION);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioExpandableComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QRadioExpandableComponent, isStandalone: true, selector: "q-radio-expandable", inputs: { containerRef: "containerRef", dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClassName" } }, usesInheritance: true, ngImport: i0, template: `<ng-content />`, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-radio-expandable{font-family:var(--awds-radio-expandable-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-expandable-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-expandable-font-style, inherit);font-weight:var(--awds-radio-expandable-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-expandable-letter-spacing, 0);line-height:var(--awds-radio-expandable-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-expandable-text-transform, none);position:relative}.q-radio-expandable .q-expansion-trigger{position:absolute;top:var(--awds-radio-expandable-trigger-top, var(--ads-size-xxs));right:var(--awds-radio-expandable-trigger-right, var(--ads-size-xxs));outline:none}.q-radio-expandable .q-expansion-trigger.q-focus-indicator:before{width:var(--awds-radio-expandable-trigger-focus-indicator-width, var(--ads-size-l));height:var(--awds-radio-expandable-trigger-focus-indicator-height, var(--ads-size-l))}.q-radio-expandable .q-expansion-trigger:hover{cursor:pointer}.q-radio-button-container-density-compact .q-expansion-trigger{top:var(--awds-radio-expandable-compact-trigger-top, var(--ads-size-micro))}.q-radio-button-container-density-comfort .q-expansion-trigger{top:var(--awds-radio-expandable-comfort-trigger-top, var(--ads-size-xs));right:var(--awds-radio-expandable-comfort-trigger-right, var(--ads-size-s))}\n"], dependencies: [{ kind: "ngmodule", type: CdkAccordionModule }], viewProviders: [{ provide: CDK_ACCORDION, useExisting: QRadioGroupComponent }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioExpandableComponent, decorators: [{
            type: Component,
            args: [{ imports: [CdkAccordionModule], viewProviders: [{ provide: CDK_ACCORDION, useExisting: QRadioGroupComponent }], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-radio-expandable', template: `<ng-content />`, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-radio-expandable{font-family:var(--awds-radio-expandable-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-expandable-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-expandable-font-style, inherit);font-weight:var(--awds-radio-expandable-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-expandable-letter-spacing, 0);line-height:var(--awds-radio-expandable-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-expandable-text-transform, none);position:relative}.q-radio-expandable .q-expansion-trigger{position:absolute;top:var(--awds-radio-expandable-trigger-top, var(--ads-size-xxs));right:var(--awds-radio-expandable-trigger-right, var(--ads-size-xxs));outline:none}.q-radio-expandable .q-expansion-trigger.q-focus-indicator:before{width:var(--awds-radio-expandable-trigger-focus-indicator-width, var(--ads-size-l));height:var(--awds-radio-expandable-trigger-focus-indicator-height, var(--ads-size-l))}.q-radio-expandable .q-expansion-trigger:hover{cursor:pointer}.q-radio-button-container-density-compact .q-expansion-trigger{top:var(--awds-radio-expandable-compact-trigger-top, var(--ads-size-micro))}.q-radio-button-container-density-comfort .q-expansion-trigger{top:var(--awds-radio-expandable-comfort-trigger-top, var(--ads-size-xs));right:var(--awds-radio-expandable-comfort-trigger-right, var(--ads-size-s))}\n"] }]
        }], propDecorators: { containerRef: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _hostClassName: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QRadioButtonComponent {
    radioButtonChange = new EventEmitter();
    expandedChange = new EventEmitter();
    ariaLabel;
    ariaLabelledby;
    ariaDescribedby;
    containerDensity = 'default';
    extraContent = null;
    extraContentContext = null;
    extraContentDensity = 'xs';
    extraContentPosition = 'below';
    id = `q-radio-button-${randomString()}`;
    labelGap = 's';
    name;
    variant = 'default';
    readonly = false;
    expanded = false;
    dataQt = 'q-radio-button';
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._updateCheckedState(coerceBooleanProperty(value));
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._updateValue(value);
    }
    get disabled() {
        return this._disabled || (this._radioGroup !== null && this._radioGroup.disabled);
    }
    set disabled(value) {
        this._setDisabled(coerceBooleanProperty(value));
    }
    get required() {
        return this._required || !!(this._radioGroup && this._radioGroup.required);
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    get tabIndex() {
        return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = coerceNumberProperty(value, 0);
    }
    get extraContentRightWidth() {
        return this._rightExtraContentWidth;
    }
    set extraContentRightWidth(value) {
        this._rightExtraContentWidth = coerceCssPixelValue(value);
    }
    get invalidState() {
        return this._invalidState;
    }
    set invalidState(value) {
        this._invalidState = coerceBooleanProperty(value);
    }
    _inputElement;
    _radioExpandable;
    _expansionTrigger;
    hostTabIndex = null;
    hostAriaLabel = null;
    hostAriaLabelledBy = null;
    hostAriaDescribedBy = null;
    get hostId() {
        return this.id;
    }
    get hostClassNames() {
        return [
            'q-radio-button',
            `q-radio-button-variant-${this.currentVariant}`,
            `q-radio-button-container-density-${this.containerDensity}`,
            this.checked && 'q-radio-button-checked',
            this.disabled && 'q-radio-button-disabled',
            this.readonly && 'q-radio-button-readonly',
            this.currentInvalidState && 'q-radio-button-invalid',
        ]
            .filter(Boolean)
            .join(' ');
    }
    onFocus() {
        this._inputElement.nativeElement.focus();
    }
    _radioGroup = inject(QRadioGroupComponent, { optional: true });
    _elementRef = inject(ElementRef);
    _checked = false;
    _value = null;
    _disabled = false;
    _required = false;
    _invalidState = false;
    _tabIndex = 0;
    _rightExtraContentWidth = '';
    _previousTabIndex;
    _removeUniqueSelectionListener = () => voidFn;
    _cdr = inject(ChangeDetectorRef);
    _radioDispatcher = inject(UniqueSelectionDispatcher);
    _focusMonitor = inject(FocusMonitor);
    _destroy$ = inject(QDestroyService);
    ngOnInit() {
        this._setInitialState();
        this._setRadioDispatcher();
    }
    ngAfterViewInit() {
        this._updateTabIndex();
        this._setFocusMonitor();
    }
    ngDoCheck() {
        this._updateTabIndex();
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
        this._removeUniqueSelectionListener();
    }
    _onLabelInteraction() {
        if (this.currentVariant === 'expandable' && !this.disabled && !this.readonly) {
            this._expansionTrigger.onTriggerInteraction();
        }
    }
    _onExpandedChange(expanded) {
        this.expanded = expanded;
        this.expandedChange.emit(expanded);
    }
    _onRadioContainerChange(event) {
        if (this.currentVariant === 'container') {
            this._onInputInteraction(event);
        }
    }
    _markForCheck() {
        this._cdr.markForCheck();
    }
    _onInputInteraction(event) {
        event?.stopPropagation();
        if (!this.checked && !this.disabled && !this.readonly) {
            const groupValueChanged = this._radioGroup && this.value !== this._radioGroup.value;
            this.checked = true;
            this._radioGroup?._markRadiosForCheck();
            this._emitChangeEvent();
            if (this._radioGroup) {
                this._radioGroup?._controlValueAccessorChangeFn(this.value);
                if (groupValueChanged) {
                    this._radioGroup._emitChangeEvent();
                }
            }
        }
    }
    _onTouchTargetClick(event) {
        if (this.currentVariant === 'expandable') {
            return;
        }
        this._onInputInteraction(event);
        if (!this.disabled) {
            this._inputElement.nativeElement.focus();
        }
    }
    _onInputClick(event) {
        if (this.readonly) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    get currentVariant() {
        return this._radioGroup?.variant || this.variant;
    }
    get currentInvalidState() {
        return this._radioGroup?.invalidState || this.invalidState;
    }
    get currentLabelGap() {
        return this._radioGroup?.labelGap || this.labelGap;
    }
    get canRenderExtraContentBelow() {
        return (this.currentVariant === 'default' &&
            this.extraContentPosition === 'below' &&
            !!this.extraContent);
    }
    get canRenderExtraContentRight() {
        return (this.currentVariant === 'container' &&
            this.extraContentPosition === 'right' &&
            !!this.extraContent);
    }
    _updateCheckedState(newCheckedState) {
        if (this._checked !== newCheckedState) {
            this._checked = newCheckedState;
            if (newCheckedState && this._radioGroup && this._radioGroup.value !== this.value) {
                this._radioGroup.selected = this;
            }
            else if (!newCheckedState && this._radioGroup && this._radioGroup.value === this.value) {
                this._radioGroup.selected = null;
            }
            if (newCheckedState) {
                this._radioDispatcher.notify(this.id, this.name);
            }
            this._cdr.markForCheck();
        }
    }
    _updateValue(value) {
        if (this._value !== value) {
            this._value = value;
            if (this._radioGroup !== null) {
                if (!this.checked) {
                    this.checked = this._radioGroup.value === value;
                }
                if (this.checked) {
                    this._radioGroup.selected = this;
                }
            }
        }
    }
    _setInitialState() {
        if (this._radioGroup) {
            this.checked = this._radioGroup.value === this._value;
            if (this.checked) {
                this._radioGroup.selected = this;
            }
            this.name = this._radioGroup.name;
        }
    }
    _setRadioDispatcher() {
        this._removeUniqueSelectionListener = this._radioDispatcher.listen((id, name) => {
            if (id !== this.id && name === this.name) {
                this.checked = false;
            }
        });
    }
    _setFocusMonitor() {
        this._focusMonitor
            .monitor(this._elementRef, true)
            .pipe(takeUntil(this._destroy$))
            .subscribe((focusOrigin) => {
            if (!focusOrigin && this._radioGroup) {
                this._radioGroup._touch();
            }
        });
    }
    _emitChangeEvent() {
        this.radioButtonChange.emit({ value: this._value, source: this, target: this._elementRef });
    }
    _setDisabled(value) {
        if (this._disabled !== value) {
            this._disabled = value;
            this._cdr.markForCheck();
        }
    }
    _updateTabIndex() {
        const group = this._radioGroup;
        let value;
        if (!group || !group.selected || this.disabled) {
            value = this.tabIndex;
        }
        else {
            value = group.selected === this ? this.tabIndex : -1;
        }
        if (value !== this._previousTabIndex) {
            const inputElement = this._inputElement?.nativeElement;
            if (inputElement) {
                inputElement.setAttribute('tabindex', value + '');
                this._previousTabIndex = value;
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QRadioButtonComponent, isStandalone: true, selector: "q-radio-button", inputs: { ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], ariaDescribedby: ["aria-describedby", "ariaDescribedby"], containerDensity: "containerDensity", extraContent: "extraContent", extraContentContext: "extraContentContext", extraContentDensity: "extraContentDensity", extraContentPosition: "extraContentPosition", id: "id", labelGap: "labelGap", name: "name", variant: "variant", readonly: ["readonly", "readonly", booleanAttribute], expanded: ["expanded", "expanded", booleanAttribute], dataQt: "dataQt", checked: "checked", value: "value", disabled: "disabled", required: "required", tabIndex: "tabIndex", extraContentRightWidth: "extraContentRightWidth", invalidState: "invalidState" }, outputs: { radioButtonChange: "radioButtonChange", expandedChange: "expandedChange" }, host: { listeners: { "focus": "onFocus()" }, properties: { "attr.data-qt": "this.dataQt", "attr.tabindex": "this.hostTabIndex", "attr.aria-label": "this.hostAriaLabel", "attr.aria-labelledby": "this.hostAriaLabelledBy", "attr.aria-describedby": "this.hostAriaDescribedBy", "attr.id": "this.hostId", "class": "this.hostClassNames" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "_inputElement", first: true, predicate: ["inputRef"], descendants: true }, { propertyName: "_radioExpandable", first: true, predicate: QRadioExpandableComponent, descendants: true }, { propertyName: "_expansionTrigger", first: true, predicate: QExpansionTriggerComponent, descendants: true }], ngImport: i0, template: "<ng-container [ngSwitch]=\"currentVariant\">\n  <ng-container *ngSwitchCase=\"'default'\">\n    <ng-container *ngTemplateOutlet=\"radioDefaultVariant\" />\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'container'\">\n    <ng-container *ngTemplateOutlet=\"radioContainerVariant\" />\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'expandable'\">\n    <ng-container *ngTemplateOutlet=\"radioExpandableVariant\" />\n  </ng-container>\n</ng-container>\n\n<ng-template #radioDefaultVariant>\n  <div\n    class=\"q-radio-button-container\"\n    [class.q-radio-button-container-disabled]=\"disabled\"\n    (click)=\"_onTouchTargetClick($event)\">\n    <div class=\"q-radio-button-input-container\">\n      <input\n        #inputRef\n        class=\"q-radio-button-native-control\"\n        type=\"radio\"\n        [id]=\"id\"\n        [checked]=\"checked\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        [tabIndex]=\"tabIndex\"\n        [attr.data-qt]=\"'q-radio-button-native-control-' + id\"\n        [attr.name]=\"name\"\n        [attr.value]=\"value\"\n        [required]=\"required\"\n        [attr.aria-label]=\"ariaLabel\"\n        [attr.aria-labelledby]=\"ariaLabelledby\"\n        [attr.aria-describedby]=\"ariaDescribedby\"\n        (click)=\"_onInputClick($event)\"\n        (change)=\"_onInputInteraction($event)\" />\n\n      <div class=\"q-radio-button-background\">\n        <div class=\"q-radio-button-background-outer-circle\"></div>\n        <div class=\"q-radio-button-background-inner-circle\"></div>\n      </div>\n    </div>\n\n    <label\n      class=\"q-radio-button-label\"\n      [class.q-radio-button-label-with-extra-right]=\"canRenderExtraContentRight\"\n      [for]=\"id\"\n      (click)=\"_onLabelInteraction()\">\n      <div\n        class=\"q-radio-button-label-content\"\n        [ngClass]=\"'q-radio-button-label-content-gap-' + currentLabelGap\">\n        <ng-content />\n      </div>\n\n      <ng-content select=\"q-badge\" />\n\n      <ng-container *ngIf=\"currentVariant !== 'expandable'\">\n        <ng-content select=\"q-link\" />\n      </ng-container>\n\n      <div\n        *ngIf=\"canRenderExtraContentRight\"\n        role=\"region\"\n        class=\"q-radio-extra-content q-radio-extra-content-position-right\"\n        [ngStyle]=\"{ width: extraContentRightWidth }\"\n        [attr.aria-labelledby]=\"id\"\n        [attr.data-qt]=\"'q-radio-extra-content-right'\">\n        <ng-container\n          *ngTemplateOutlet=\"extraContent; context: { $implicit: extraContentContext }\" />\n      </div>\n    </label>\n    <q-expansion-trigger\n      #expansionTrigger\n      *ngIf=\"currentVariant === 'expandable'\"\n      [disabled]=\"disabled || readonly\"\n      [active]=\"expanded\"\n      [tabIndex]=\"!_radioGroup?.value || checked ? 0 : -1\"\n      [attr.aria-controls]=\"id + '-container'\"\n      (activeChange)=\"_radioExpandable.toggle()\" />\n  </div>\n\n  <div\n    *ngIf=\"canRenderExtraContentBelow\"\n    class=\"q-radio-extra-content\"\n    [ngClass]=\"'q-radio-extra-content-density-' + extraContentDensity\"\n    role=\"region\"\n    [attr.id]=\"id + '-container'\"\n    [attr.aria-labelledby]=\"id\"\n    [attr.data-qt]=\"'q-radio-extra-content-below'\">\n    <ng-container *ngTemplateOutlet=\"extraContent; context: { $implicit: extraContentContext }\" />\n  </div>\n</ng-template>\n\n<ng-template #radioContainerVariant>\n  <q-radio-container\n    [expanded]=\"expanded\"\n    [radioInputId]=\"id\"\n    [extraContent]=\"extraContent\"\n    [extraContentContext]=\"extraContentContext\"\n    [extraContentDensity]=\"extraContentDensity\"\n    [extraContentPosition]=\"extraContentPosition\"\n    [variant]=\"currentVariant\"\n    [disabled]=\"disabled\"\n    (radioContainerChange)=\"_onRadioContainerChange($event)\">\n    <ng-container *ngTemplateOutlet=\"radioDefaultVariant\" />\n  </q-radio-container>\n</ng-template>\n\n<ng-template #radioExpandableVariant>\n  <q-radio-expandable\n    [containerRef]=\"radioContainerVariant.elementRef\"\n    [disabled]=\"disabled\"\n    [expanded]=\"expanded\"\n    (expandedChange)=\"_onExpandedChange($event)\">\n    <ng-container *ngTemplateOutlet=\"radioContainerVariant\" />\n  </q-radio-expandable>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-radio-button{font-family:var(--awds-radio-button-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-button-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-button-font-style, inherit);font-weight:var(--awds-radio-button-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-button-letter-spacing, 0);line-height:var(--awds-radio-button-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-button-text-transform, none);-webkit-tap-highlight-color:transparent}.q-radio-button-container{display:inline-flex;padding:var(--awds-radio-button-default-container-padding, var(--ads-size-xxxs) var(--ads-size-micro));width:100%}.q-radio-button-container:hover:not(.q-radio-button-container-disabled){cursor:pointer}.q-radio-button-container:hover:not(.q-radio-button-container-disabled) .q-radio-button-label{cursor:pointer}.q-radio-button-container .q-radio-button-input-container{display:inline-block;position:relative;flex:0 0 auto;width:var(--awds-radio-button-default-input-container-width, var(--ads-size-xs));height:var(--awds-radio-button-default-input-container-height, var(--ads-size-xs));cursor:inherit}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background:before{background:var(--awds-radio-button-hover-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));transform:scale(1) translate(-25%,-25%);transition:background-color .15s ease-out,transform .15s ease-out,box-shadow .15s ease-out}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-hover-unselected-indicator-border-width, var(--ads-border-width-thin));transition:border-width .1s ease-out}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background:before{background:var(--awds-radio-button-active-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));transform:scale(1) translate(-25%,-25%);transition:background-color .15s ease-out,transform .15s ease-out,box-shadow .15s ease-out}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-active-unselected-indicator-border-width, var(--ads-border-width-thin));transition:border-width .1s ease-out}.q-radio-button-container .q-radio-button-input-container .q-radio-button-native-control{top:0;right:0;left:0;width:var(--awds-radio-button-default-native-control-width, var(--ads-size-xs));height:var(--awds-radio-button-default-native-control-height, var(--ads-size-xs));position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.q-radio-button-container .q-radio-button-input-container .q-radio-button-native-control:checked+.q-radio-button-background .q-radio-button-background-inner-circle{transform:scale(1);transition:transform .12s 0ms cubic-bezier(0,0,.2,1)}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background{display:inline-block;position:relative;width:var(--awds-radio-button-default-background-width, var(--ads-size-xs));height:var(--awds-radio-button-default-background-height, var(--ads-size-xs))}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background:before{content:\"\";position:absolute;width:var(--awds-radio-button-highlight-width, var(--ads-size-l));height:var(--awds-radio-button-highlight-height, var(--ads-size-l));transform:scale(0) translate(-60%,-60%);border-radius:var(--awds-radio-button-highlight-border-radius, var(--ads-border-radius-xl));pointer-events:none;transition:background-color .15s ease-out,transform .15s ease-in,box-shadow .15s ease-in}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-unselected-indicator-border-color, var(--ads-color-body-500));background:var(--awds-radio-button-unselected-indicator-background, var(--ads-color-body-100));position:absolute;top:0;left:0;width:100%;height:100%;border-width:var(--awds-radio-button-unselected-indicator-border-width, var(--ads-border-width-hairline));border-style:var(--awds-radio-button-unselected-indicator-border-style, solid);border-radius:var(--awds-radio-button-unselected-indicator-border-radius, var(--ads-border-radius-xl));transition:border-width .1s ease-in}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-selected-indicator-border-color, var(--ads-color-primary-400));position:absolute;top:0;left:0;width:var(--awds-radio-button-selected-indicator-width, var(--ads-size-xs));height:var(--awds-radio-button-selected-indicator-height, var(--ads-size-xs));transform:scale(0);border-width:var(--awds-radio-button-selected-indicator-border-width, calc((var(--ads-size-xs) - var(--ads-size-micro)) / 2));border-style:var(--awds-radio-button-selected-indicator-border-style, solid);border-radius:var(--awds-radio-button-selected-indicator-border-radius, var(--ads-border-radius-xl));transition:transform .12s 0ms cubic-bezier(0,0,.2,1)}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background-inner-circle:before{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:var(--awds-radio-button-selected-indicator-inner-background, var(--ads-color-body-100));border-radius:var(--awds-radio-button-selected-indicator-inner-border-radius, 50%);content:\"\";width:var(--awds-radio-button-selected-indicator-inner-width, var(--ads-size-micro));height:var(--awds-radio-button-selected-indicator-inner-height, var(--ads-size-micro))}.q-radio-button-container .q-radio-button-label{display:flex;align-items:center;flex:1;padding:var(--awds-radio-button-label-padding, var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxs) 0)}.q-radio-button-container .q-radio-button-label-with-extra-right .q-radio-button-label-content{margin-bottom:var(--awds-radio-button-label-extra-right-content-margin-bottom, auto);flex:1;margin-right:var(--awds-radio-button-label-extra-right-content-margin-right, var(--ads-size-l))}.q-radio-button-container .q-radio-button-label-with-extra-right .q-radio-extra-content{padding-left:var(--awds-radio-button-label-extra-right-content-padding, 0)}.q-radio-button-container .q-radio-button-label .q-badge{display:flex;align-items:center;margin:0 0 auto auto}.q-radio-button-container .q-radio-button-label .q-link{margin:0 0 auto auto}.q-radio-button-container .q-radio-button-label-content{display:flex;flex-direction:column;margin-left:0;order:0;color:var(--awds-radio-button-label-color, var(--ads-color-body-contrast-400));cursor:inherit}.q-radio-button-container .q-radio-button-label-content-gap-xxs{gap:var(--awds-radio-button-label-content-gap-xxs, var(--ads-size-nano))}.q-radio-button-container .q-radio-button-label-content-gap-xs{gap:var(--awds-radio-button-label-content-gap-xs, var(--ads-size-micro))}.q-radio-button-container .q-radio-button-label-content-gap-s{gap:var(--awds-radio-button-label-content-gap-s, var(--ads-size-xxxs))}.q-radio-button .q-radio-extra-content-density-xxs{padding-top:var(--awds-radio-button-extra-content-density-xxs-padding-top, var(--ads-size-nano))}.q-radio-button .q-radio-extra-content-density-xs{padding-top:var(--awds-radio-button-extra-content-density-xs-padding-top, var(--ads-size-micro))}.q-radio-button .q-radio-extra-content-density-s{padding-top:var(--awds-radio-button-extra-content-density-s-padding-top, var(--ads-size-xxxs))}.q-radio-button .q-radio-extra-content-density-m{padding-top:var(--awds-radio-button-extra-content-density-m-padding-top, var(--ads-size-xxs))}.q-radio-button .q-radio-extra-content-density-l{padding-top:var(--awds-radio-button-extra-content-density-l-padding-top, var(--ads-size-xs))}.q-radio-button .q-radio-extra-content-density-xl{padding-top:var(--awds-radio-button-extra-content-density-xl-padding-top, var(--ads-size-s))}.q-radio-button .q-radio-extra-content-density-xxl{padding-top:var(--awds-radio-button-extra-content-density-xxl-padding-top, var(--ads-size-m))}.q-radio-button .q-radio-extra-content-density-xxxl{padding-top:var(--awds-radio-button-extra-content-density-xxxl-padding-top, var(--ads-size-l))}.q-radio-extra-content{padding-left:var(--awds-radio-button-extra-content-padding-left, var(--ads-size-m))}.q-radio-extra-content:empty{display:none}.q-radio-button-variant-default .q-radio-button-container{align-items:center;width:var(--awds-radio-button-default-variant-container-width, auto);padding:var(--awds-radio-button-default-variant-container-padding, var(--ads-size-micro) var(--ads-size-micro));min-height:var(--awds-radio-button-default-variant-container-min-height, var(--ads-size-xl))}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-input-container{margin-bottom:auto;transform:translateY(var(--ads-size-quark));margin-top:var(--awds-radio-button-default-variant-input-container-margin-top, var(--ads-size-quark))}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label{padding:var(--awds-radio-button-default-variant-label-padding, 0)}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label .q-radio-button-label-content{margin-left:var(--awds-radio-button-default-variant-label-content-margin-left, var(--ads-size-xxxs))}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label .q-radio-button-label-content:empty{margin-left:0}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label:has(.q-badge) .q-radio-button-label-content{margin-right:var(--awds-radio-button-default-variant-label-content-badge-margin-right, var(--ads-size-xxs))}.q-radio-button-variant-default .q-radio-extra-content{padding-left:var(--awds-radio-button-default-variant-extra-content-padding-left, var(--ads-size-l))}.q-radio-button-variant-expandable .q-radio-button-container .q-radio-button-label{padding-right:var(--awds-radio-button-expandable-variant-label-padding-right, var(--ads-size-xxl))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-invalid-unselected-indicator-border-color, var(--ads-color-danger-400))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-invalid-selected-indicator-border-color, var(--ads-color-danger-400))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background:before{background:var(--awds-radio-button-invalid-hover-highlight-background, var(--ads-color-danger-100))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-invalid-hover-unselected-indicator-border-width, var(--ads-border-width-hairline))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background:before{background:var(--awds-radio-button-invalid-active-highlight-background, var(--ads-color-danger-100))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-invalid-active-unselected-indicator-border-width, var(--ads-border-width-hairline))}.q-radio-button-disabled .q-radio-button-container:hover{cursor:default}.q-radio-button-disabled .q-radio-button-container .q-radio-button-label-content{color:var(--awds-radio-button-disabled-label-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-button-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-disabled-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-button-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-disabled-selected-indicator-border-color, var(--ads-color-primary-200))}.q-radio-button-readonly .q-radio-button-container:hover,.q-radio-button-readonly .q-radio-button-container:hover .q-radio-button-label{cursor:default}.q-radio-button-readonly .q-radio-button-container .q-radio-button-label-content{color:var(--awds-radio-button-readonly-label-color, var(--ads-color-body-contrast-400))}.q-radio-button-readonly .q-radio-button-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-readonly-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-readonly .q-radio-button-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-readonly-selected-indicator-border-color, var(--ads-color-primary-200))}.q-radio-button-readonly .q-radio-button-container .q-radio-button:not(.q-radio-button-container-disabled .q-radio-button):hover .q-radio-button-background:before{transform:scale(0)}.q-radio-button-readonly .q-radio-button-container .q-radio-button:not(.q-radio-button-container-disabled .q-radio-button):hover .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-readonly-hover-unselected-indicator-border-width, var(--ads-border-width-hairline))}.cdk-keyboard-focused:not(.q-radio-button-variant-container) input.q-radio-button-native-control:focus+.q-radio-button-background:before{background-color:var(--awds-radio-button-focus-highlight-background, var(--ads-color-primary-100));outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset;transform:scale(1) translate(-25%,-25%);transition:background-color .15s ease-out,transform .15s ease-out}.cdk-keyboard-focused:not(.q-radio-button-variant-container) input.q-radio-button-native-control:focus+.q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-focus-unselected-indicator-border-width, var(--ads-border-width-thin));transition:border-width .1s ease-out}.cdk-keyboard-focused:not(.q-radio-button-variant-container).q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-input-container-background:before{background:var(--awds-radio-button-invalid-focus-highlight-background, var(--ads-color-danger-100))}.cdk-keyboard-focused:not(.q-radio-button-variant-container).q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-input-container-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-invalid-focus-unselected-indicator-border-width, var(--ads-border-width-hairline))}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QRadioContainerComponent, selector: "q-radio-container", inputs: ["expanded", "extraContent", "extraContentContext", "extraContentDensity", "extraContentPosition", "variant", "disabled", "radioInputId", "dataQt"], outputs: ["radioContainerChange"] }, { kind: "component", type: QRadioExpandableComponent, selector: "q-radio-expandable", inputs: ["containerRef", "dataQt"] }, { kind: "component", type: QExpansionTriggerComponent, selector: "q-expansion-trigger", inputs: ["active", "tabIndex", "disabled"], outputs: ["activeChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioButtonComponent, decorators: [{
            type: Component,
            args: [{ imports: [
                        NgIf,
                        NgClass,
                        NgStyle,
                        NgSwitch,
                        NgSwitchCase,
                        NgTemplateOutlet,
                        QRadioContainerComponent,
                        QRadioExpandableComponent,
                        QExpansionTriggerComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-radio-button', providers: [QDestroyService], template: "<ng-container [ngSwitch]=\"currentVariant\">\n  <ng-container *ngSwitchCase=\"'default'\">\n    <ng-container *ngTemplateOutlet=\"radioDefaultVariant\" />\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'container'\">\n    <ng-container *ngTemplateOutlet=\"radioContainerVariant\" />\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'expandable'\">\n    <ng-container *ngTemplateOutlet=\"radioExpandableVariant\" />\n  </ng-container>\n</ng-container>\n\n<ng-template #radioDefaultVariant>\n  <div\n    class=\"q-radio-button-container\"\n    [class.q-radio-button-container-disabled]=\"disabled\"\n    (click)=\"_onTouchTargetClick($event)\">\n    <div class=\"q-radio-button-input-container\">\n      <input\n        #inputRef\n        class=\"q-radio-button-native-control\"\n        type=\"radio\"\n        [id]=\"id\"\n        [checked]=\"checked\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        [tabIndex]=\"tabIndex\"\n        [attr.data-qt]=\"'q-radio-button-native-control-' + id\"\n        [attr.name]=\"name\"\n        [attr.value]=\"value\"\n        [required]=\"required\"\n        [attr.aria-label]=\"ariaLabel\"\n        [attr.aria-labelledby]=\"ariaLabelledby\"\n        [attr.aria-describedby]=\"ariaDescribedby\"\n        (click)=\"_onInputClick($event)\"\n        (change)=\"_onInputInteraction($event)\" />\n\n      <div class=\"q-radio-button-background\">\n        <div class=\"q-radio-button-background-outer-circle\"></div>\n        <div class=\"q-radio-button-background-inner-circle\"></div>\n      </div>\n    </div>\n\n    <label\n      class=\"q-radio-button-label\"\n      [class.q-radio-button-label-with-extra-right]=\"canRenderExtraContentRight\"\n      [for]=\"id\"\n      (click)=\"_onLabelInteraction()\">\n      <div\n        class=\"q-radio-button-label-content\"\n        [ngClass]=\"'q-radio-button-label-content-gap-' + currentLabelGap\">\n        <ng-content />\n      </div>\n\n      <ng-content select=\"q-badge\" />\n\n      <ng-container *ngIf=\"currentVariant !== 'expandable'\">\n        <ng-content select=\"q-link\" />\n      </ng-container>\n\n      <div\n        *ngIf=\"canRenderExtraContentRight\"\n        role=\"region\"\n        class=\"q-radio-extra-content q-radio-extra-content-position-right\"\n        [ngStyle]=\"{ width: extraContentRightWidth }\"\n        [attr.aria-labelledby]=\"id\"\n        [attr.data-qt]=\"'q-radio-extra-content-right'\">\n        <ng-container\n          *ngTemplateOutlet=\"extraContent; context: { $implicit: extraContentContext }\" />\n      </div>\n    </label>\n    <q-expansion-trigger\n      #expansionTrigger\n      *ngIf=\"currentVariant === 'expandable'\"\n      [disabled]=\"disabled || readonly\"\n      [active]=\"expanded\"\n      [tabIndex]=\"!_radioGroup?.value || checked ? 0 : -1\"\n      [attr.aria-controls]=\"id + '-container'\"\n      (activeChange)=\"_radioExpandable.toggle()\" />\n  </div>\n\n  <div\n    *ngIf=\"canRenderExtraContentBelow\"\n    class=\"q-radio-extra-content\"\n    [ngClass]=\"'q-radio-extra-content-density-' + extraContentDensity\"\n    role=\"region\"\n    [attr.id]=\"id + '-container'\"\n    [attr.aria-labelledby]=\"id\"\n    [attr.data-qt]=\"'q-radio-extra-content-below'\">\n    <ng-container *ngTemplateOutlet=\"extraContent; context: { $implicit: extraContentContext }\" />\n  </div>\n</ng-template>\n\n<ng-template #radioContainerVariant>\n  <q-radio-container\n    [expanded]=\"expanded\"\n    [radioInputId]=\"id\"\n    [extraContent]=\"extraContent\"\n    [extraContentContext]=\"extraContentContext\"\n    [extraContentDensity]=\"extraContentDensity\"\n    [extraContentPosition]=\"extraContentPosition\"\n    [variant]=\"currentVariant\"\n    [disabled]=\"disabled\"\n    (radioContainerChange)=\"_onRadioContainerChange($event)\">\n    <ng-container *ngTemplateOutlet=\"radioDefaultVariant\" />\n  </q-radio-container>\n</ng-template>\n\n<ng-template #radioExpandableVariant>\n  <q-radio-expandable\n    [containerRef]=\"radioContainerVariant.elementRef\"\n    [disabled]=\"disabled\"\n    [expanded]=\"expanded\"\n    (expandedChange)=\"_onExpandedChange($event)\">\n    <ng-container *ngTemplateOutlet=\"radioContainerVariant\" />\n  </q-radio-expandable>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-radio-button{font-family:var(--awds-radio-button-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-button-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-button-font-style, inherit);font-weight:var(--awds-radio-button-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-button-letter-spacing, 0);line-height:var(--awds-radio-button-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-button-text-transform, none);-webkit-tap-highlight-color:transparent}.q-radio-button-container{display:inline-flex;padding:var(--awds-radio-button-default-container-padding, var(--ads-size-xxxs) var(--ads-size-micro));width:100%}.q-radio-button-container:hover:not(.q-radio-button-container-disabled){cursor:pointer}.q-radio-button-container:hover:not(.q-radio-button-container-disabled) .q-radio-button-label{cursor:pointer}.q-radio-button-container .q-radio-button-input-container{display:inline-block;position:relative;flex:0 0 auto;width:var(--awds-radio-button-default-input-container-width, var(--ads-size-xs));height:var(--awds-radio-button-default-input-container-height, var(--ads-size-xs));cursor:inherit}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background:before{background:var(--awds-radio-button-hover-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));transform:scale(1) translate(-25%,-25%);transition:background-color .15s ease-out,transform .15s ease-out,box-shadow .15s ease-out}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-hover-unselected-indicator-border-width, var(--ads-border-width-thin));transition:border-width .1s ease-out}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background:before{background:var(--awds-radio-button-active-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)));transform:scale(1) translate(-25%,-25%);transition:background-color .15s ease-out,transform .15s ease-out,box-shadow .15s ease-out}.q-radio-button:not(.q-radio-button-disabled) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-active-unselected-indicator-border-width, var(--ads-border-width-thin));transition:border-width .1s ease-out}.q-radio-button-container .q-radio-button-input-container .q-radio-button-native-control{top:0;right:0;left:0;width:var(--awds-radio-button-default-native-control-width, var(--ads-size-xs));height:var(--awds-radio-button-default-native-control-height, var(--ads-size-xs));position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.q-radio-button-container .q-radio-button-input-container .q-radio-button-native-control:checked+.q-radio-button-background .q-radio-button-background-inner-circle{transform:scale(1);transition:transform .12s 0ms cubic-bezier(0,0,.2,1)}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background{display:inline-block;position:relative;width:var(--awds-radio-button-default-background-width, var(--ads-size-xs));height:var(--awds-radio-button-default-background-height, var(--ads-size-xs))}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background:before{content:\"\";position:absolute;width:var(--awds-radio-button-highlight-width, var(--ads-size-l));height:var(--awds-radio-button-highlight-height, var(--ads-size-l));transform:scale(0) translate(-60%,-60%);border-radius:var(--awds-radio-button-highlight-border-radius, var(--ads-border-radius-xl));pointer-events:none;transition:background-color .15s ease-out,transform .15s ease-in,box-shadow .15s ease-in}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-unselected-indicator-border-color, var(--ads-color-body-500));background:var(--awds-radio-button-unselected-indicator-background, var(--ads-color-body-100));position:absolute;top:0;left:0;width:100%;height:100%;border-width:var(--awds-radio-button-unselected-indicator-border-width, var(--ads-border-width-hairline));border-style:var(--awds-radio-button-unselected-indicator-border-style, solid);border-radius:var(--awds-radio-button-unselected-indicator-border-radius, var(--ads-border-radius-xl));transition:border-width .1s ease-in}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-selected-indicator-border-color, var(--ads-color-primary-400));position:absolute;top:0;left:0;width:var(--awds-radio-button-selected-indicator-width, var(--ads-size-xs));height:var(--awds-radio-button-selected-indicator-height, var(--ads-size-xs));transform:scale(0);border-width:var(--awds-radio-button-selected-indicator-border-width, calc((var(--ads-size-xs) - var(--ads-size-micro)) / 2));border-style:var(--awds-radio-button-selected-indicator-border-style, solid);border-radius:var(--awds-radio-button-selected-indicator-border-radius, var(--ads-border-radius-xl));transition:transform .12s 0ms cubic-bezier(0,0,.2,1)}.q-radio-button-container .q-radio-button-input-container .q-radio-button-background-inner-circle:before{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:var(--awds-radio-button-selected-indicator-inner-background, var(--ads-color-body-100));border-radius:var(--awds-radio-button-selected-indicator-inner-border-radius, 50%);content:\"\";width:var(--awds-radio-button-selected-indicator-inner-width, var(--ads-size-micro));height:var(--awds-radio-button-selected-indicator-inner-height, var(--ads-size-micro))}.q-radio-button-container .q-radio-button-label{display:flex;align-items:center;flex:1;padding:var(--awds-radio-button-label-padding, var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxs) 0)}.q-radio-button-container .q-radio-button-label-with-extra-right .q-radio-button-label-content{margin-bottom:var(--awds-radio-button-label-extra-right-content-margin-bottom, auto);flex:1;margin-right:var(--awds-radio-button-label-extra-right-content-margin-right, var(--ads-size-l))}.q-radio-button-container .q-radio-button-label-with-extra-right .q-radio-extra-content{padding-left:var(--awds-radio-button-label-extra-right-content-padding, 0)}.q-radio-button-container .q-radio-button-label .q-badge{display:flex;align-items:center;margin:0 0 auto auto}.q-radio-button-container .q-radio-button-label .q-link{margin:0 0 auto auto}.q-radio-button-container .q-radio-button-label-content{display:flex;flex-direction:column;margin-left:0;order:0;color:var(--awds-radio-button-label-color, var(--ads-color-body-contrast-400));cursor:inherit}.q-radio-button-container .q-radio-button-label-content-gap-xxs{gap:var(--awds-radio-button-label-content-gap-xxs, var(--ads-size-nano))}.q-radio-button-container .q-radio-button-label-content-gap-xs{gap:var(--awds-radio-button-label-content-gap-xs, var(--ads-size-micro))}.q-radio-button-container .q-radio-button-label-content-gap-s{gap:var(--awds-radio-button-label-content-gap-s, var(--ads-size-xxxs))}.q-radio-button .q-radio-extra-content-density-xxs{padding-top:var(--awds-radio-button-extra-content-density-xxs-padding-top, var(--ads-size-nano))}.q-radio-button .q-radio-extra-content-density-xs{padding-top:var(--awds-radio-button-extra-content-density-xs-padding-top, var(--ads-size-micro))}.q-radio-button .q-radio-extra-content-density-s{padding-top:var(--awds-radio-button-extra-content-density-s-padding-top, var(--ads-size-xxxs))}.q-radio-button .q-radio-extra-content-density-m{padding-top:var(--awds-radio-button-extra-content-density-m-padding-top, var(--ads-size-xxs))}.q-radio-button .q-radio-extra-content-density-l{padding-top:var(--awds-radio-button-extra-content-density-l-padding-top, var(--ads-size-xs))}.q-radio-button .q-radio-extra-content-density-xl{padding-top:var(--awds-radio-button-extra-content-density-xl-padding-top, var(--ads-size-s))}.q-radio-button .q-radio-extra-content-density-xxl{padding-top:var(--awds-radio-button-extra-content-density-xxl-padding-top, var(--ads-size-m))}.q-radio-button .q-radio-extra-content-density-xxxl{padding-top:var(--awds-radio-button-extra-content-density-xxxl-padding-top, var(--ads-size-l))}.q-radio-extra-content{padding-left:var(--awds-radio-button-extra-content-padding-left, var(--ads-size-m))}.q-radio-extra-content:empty{display:none}.q-radio-button-variant-default .q-radio-button-container{align-items:center;width:var(--awds-radio-button-default-variant-container-width, auto);padding:var(--awds-radio-button-default-variant-container-padding, var(--ads-size-micro) var(--ads-size-micro));min-height:var(--awds-radio-button-default-variant-container-min-height, var(--ads-size-xl))}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-input-container{margin-bottom:auto;transform:translateY(var(--ads-size-quark));margin-top:var(--awds-radio-button-default-variant-input-container-margin-top, var(--ads-size-quark))}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label{padding:var(--awds-radio-button-default-variant-label-padding, 0)}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label .q-radio-button-label-content{margin-left:var(--awds-radio-button-default-variant-label-content-margin-left, var(--ads-size-xxxs))}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label .q-radio-button-label-content:empty{margin-left:0}.q-radio-button-variant-default .q-radio-button-container .q-radio-button-label:has(.q-badge) .q-radio-button-label-content{margin-right:var(--awds-radio-button-default-variant-label-content-badge-margin-right, var(--ads-size-xxs))}.q-radio-button-variant-default .q-radio-extra-content{padding-left:var(--awds-radio-button-default-variant-extra-content-padding-left, var(--ads-size-l))}.q-radio-button-variant-expandable .q-radio-button-container .q-radio-button-label{padding-right:var(--awds-radio-button-expandable-variant-label-padding-right, var(--ads-size-xxl))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-invalid-unselected-indicator-border-color, var(--ads-color-danger-400))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-invalid-selected-indicator-border-color, var(--ads-color-danger-400))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background:before{background:var(--awds-radio-button-invalid-hover-highlight-background, var(--ads-color-danger-100))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:hover .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-invalid-hover-unselected-indicator-border-width, var(--ads-border-width-hairline))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background:before{background:var(--awds-radio-button-invalid-active-highlight-background, var(--ads-color-danger-100))}.q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-container .q-radio-button-input-container:active .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-invalid-active-unselected-indicator-border-width, var(--ads-border-width-hairline))}.q-radio-button-disabled .q-radio-button-container:hover{cursor:default}.q-radio-button-disabled .q-radio-button-container .q-radio-button-label-content{color:var(--awds-radio-button-disabled-label-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-button-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-disabled-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-button-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-disabled-selected-indicator-border-color, var(--ads-color-primary-200))}.q-radio-button-readonly .q-radio-button-container:hover,.q-radio-button-readonly .q-radio-button-container:hover .q-radio-button-label{cursor:default}.q-radio-button-readonly .q-radio-button-container .q-radio-button-label-content{color:var(--awds-radio-button-readonly-label-color, var(--ads-color-body-contrast-400))}.q-radio-button-readonly .q-radio-button-container .q-radio-button-background-outer-circle{border-color:var(--awds-radio-button-readonly-unselected-indicator-border-color, var(--ads-color-body-400))}.q-radio-button-readonly .q-radio-button-container .q-radio-button-background-inner-circle{border-color:var(--awds-radio-button-readonly-selected-indicator-border-color, var(--ads-color-primary-200))}.q-radio-button-readonly .q-radio-button-container .q-radio-button:not(.q-radio-button-container-disabled .q-radio-button):hover .q-radio-button-background:before{transform:scale(0)}.q-radio-button-readonly .q-radio-button-container .q-radio-button:not(.q-radio-button-container-disabled .q-radio-button):hover .q-radio-button-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-readonly-hover-unselected-indicator-border-width, var(--ads-border-width-hairline))}.cdk-keyboard-focused:not(.q-radio-button-variant-container) input.q-radio-button-native-control:focus+.q-radio-button-background:before{background-color:var(--awds-radio-button-focus-highlight-background, var(--ads-color-primary-100));outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset;transform:scale(1) translate(-25%,-25%);transition:background-color .15s ease-out,transform .15s ease-out}.cdk-keyboard-focused:not(.q-radio-button-variant-container) input.q-radio-button-native-control:focus+.q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-focus-unselected-indicator-border-width, var(--ads-border-width-thin));transition:border-width .1s ease-out}.cdk-keyboard-focused:not(.q-radio-button-variant-container).q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-input-container-background:before{background:var(--awds-radio-button-invalid-focus-highlight-background, var(--ads-color-danger-100))}.cdk-keyboard-focused:not(.q-radio-button-variant-container).q-radio-button-invalid:not(.q-radio-button-disabled):not(.q-radio-button-readonly) .q-radio-button-input-container-background .q-radio-button-background-outer-circle{border-width:var(--awds-radio-button-invalid-focus-unselected-indicator-border-width, var(--ads-border-width-hairline))}\n"] }]
        }], propDecorators: { radioButtonChange: [{
                type: Output
            }], expandedChange: [{
                type: Output
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], ariaDescribedby: [{
                type: Input,
                args: ['aria-describedby']
            }], containerDensity: [{
                type: Input
            }], extraContent: [{
                type: Input
            }], extraContentContext: [{
                type: Input
            }], extraContentDensity: [{
                type: Input
            }], extraContentPosition: [{
                type: Input
            }], id: [{
                type: Input
            }], labelGap: [{
                type: Input
            }], name: [{
                type: Input
            }], variant: [{
                type: Input
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], expanded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], checked: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], extraContentRightWidth: [{
                type: Input
            }], invalidState: [{
                type: Input
            }], _inputElement: [{
                type: ViewChild,
                args: ['inputRef']
            }], _radioExpandable: [{
                type: ViewChild,
                args: [QRadioExpandableComponent]
            }], _expansionTrigger: [{
                type: ViewChild,
                args: [QExpansionTriggerComponent]
            }], hostTabIndex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], hostAriaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], hostAriaLabelledBy: [{
                type: HostBinding,
                args: ['attr.aria-labelledby']
            }], hostAriaDescribedBy: [{
                type: HostBinding,
                args: ['attr.aria-describedby']
            }], hostId: [{
                type: HostBinding,
                args: ['attr.id']
            }], hostClassNames: [{
                type: HostBinding,
                args: ['class']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }] } });

class QRadioLabelComponent {
    dataQt = 'q-radio-label';
    hostClass = 'q-radio-label';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QRadioLabelComponent, isStandalone: true, selector: "q-radio-label", inputs: { dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, hostDirectives: [{ directive: i1.QLineClampDirective, inputs: ["lineClamp", "lineClamp"] }], ngImport: i0, template: `<ng-content />`, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-radio-label{font-family:var(--awds-radio-label-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-label-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-label-font-style, inherit);font-weight:var(--awds-radio-label-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-label-letter-spacing, 0);line-height:var(--awds-radio-label-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-label-text-transform, none);color:var(--awds-radio-label-color, var(--ads-color-body-contrast-400))}.q-radio-button-disabled{color:var(--awds-radio-button-disabled-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-label{color:var(--awds-radio-label-disabled-color, var(--ads-color-body-400))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QRadioLabelComponent, decorators: [{
            type: Component,
            args: [{ hostDirectives: [{ directive: QLineClampDirective, inputs: ['lineClamp'] }], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-radio-label', template: `<ng-content />`, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-radio-label{font-family:var(--awds-radio-label-font-family, var(--ads-font-family-body));font-size:var(--awds-radio-label-font-size, var(--ads-font-size-s));font-style:var(--awds-radio-label-font-style, inherit);font-weight:var(--awds-radio-label-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-radio-label-letter-spacing, 0);line-height:var(--awds-radio-label-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-radio-label-text-transform, none);color:var(--awds-radio-label-color, var(--ads-color-body-contrast-400))}.q-radio-button-disabled{color:var(--awds-radio-button-disabled-color, var(--ads-color-body-400))}.q-radio-button-disabled .q-radio-label{color:var(--awds-radio-label-disabled-color, var(--ads-color-body-400))}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_RADIO_COMPONENTS = [
    QRadioButtonComponent,
    QRadioGroupComponent,
    QRadioLabelComponent,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QRadioButtonComponent, QRadioGroupComponent, QRadioLabelComponent, Q_RADIO_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-radio.mjs.map
