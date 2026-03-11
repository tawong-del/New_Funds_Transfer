import * as i0 from '@angular/core';
import { EventEmitter, booleanAttribute, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component, inject, ChangeDetectorRef, HostListener, Injectable, numberAttribute, ElementRef, Renderer2, ViewChild, ContentChildren, NgZone, NgModule } from '@angular/core';
import { QExpansionTriggerComponent } from '@questrade/allspark-angular-components/core/components';
import { NgSwitch, NgSwitchCase, NgIf, NgTemplateOutlet, NgSwitchDefault, AsyncPipe, NgFor } from '@angular/common';
import { ENTER, SPACE } from '@questrade/allspark-angular-components/core/utils';
import { Subject, BehaviorSubject, combineLatest, takeUntil, merge, startWith, delay, switchMap, fromEvent, distinctUntilChanged } from 'rxjs';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { arrowBack, add, infoOutline } from '@questrade/allspark-icons/icons';
import * as i1 from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { QChipComponent } from '@questrade/allspark-angular-components/chip';
import { QPaginatorComponent } from '@questrade/allspark-angular-components/paginator';
import { QSpinnerComponent } from '@questrade/allspark-angular-components/spinner';
import { MISSING_KEY_HANDLER, ALLSPARK_SCOPE } from '@questrade/allspark-angular-components/transloco';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { accordionAnimations } from '@questrade/allspark-angular-components/core/animations';
import { error128 } from '@questrade/allspark-icons/illustrations-128';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { QScrollShadowDirective } from '@questrade/allspark-angular-components/core/directives';

class QExpandComponent {
    qExpandChange = new EventEmitter();
    qExpand = false;
    hostClass = 'q-expand';
    get hostClasses() {
        return ['q-expand', this.qExpand && 'q-table-row-expanded'].filter(Boolean).join(' ');
    }
    dataQt = 'q-expand';
    onExpandChange() {
        this.qExpand = !this.qExpand;
        this.qExpandChange.emit(this.qExpand);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QExpandComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QExpandComponent, isStandalone: true, selector: "span[qExpand]", inputs: { qExpand: ["qExpand", "qExpand", booleanAttribute] }, outputs: { qExpandChange: "qExpandChange" }, host: { properties: { "class": "this.hostClasses", "attr.data-qt": "this.dataQt" } }, ngImport: i0, template: `
    <q-expansion-trigger
      class="q-expansion-icon"
      [active]="qExpand"
      (activeChange)="onExpandChange()" />
    <ng-content />
  `, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}td[q-table-cell]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;text-align:left}td[q-table-cell].q-table-cell-centered{vertical-align:middle;text-align:center}td[q-table-cell]:has(q-radio-button){align-content:center}td[q-table-cell]:has(q-radio-button) .q-table-cell-content{justify-content:center;align-items:center;padding:0 var(--ads-size-micro)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container{display:flex;padding:0;min-height:auto;height:var(--ads-size-xs)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container .q-radio-button-input-container{margin:0}td[q-table-cell]:has(q-checkbox) .q-table-cell-content{align-items:center}td[q-table-cell]:has(q-checkbox) .q-checkbox{height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container{padding:0;min-height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container .q-checkbox-input-container{margin:0}td[q-table-cell] .q-expand{display:flex;align-items:flex-start;width:fit-content}td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:center}.q-table-group td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:flex-start}td[q-table-cell].q-table-cell-small{padding:var(--ads-size-xxxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-medium{padding:var(--ads-size-xxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-large{padding:var(--ads-size-s) var(--ads-size-micro)}td[q-table-cell].q-table-cell:first-child{padding-left:var(--ads-size-xs)}td[q-table-cell].q-table-cell:last-child{padding-right:var(--ads-size-xs)}td[q-table-cell].q-table-cell .q-table-cell-content{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;color:var(--ads-color-body-contrast-400);display:flex;flex-direction:column;gap:var(--ads-size-nano)}td[q-table-cell].q-table-cell .q-table-cell-content [primaryDescription],td[q-table-cell].q-table-cell .q-table-cell-content [secondaryDescription]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-500)}td[q-table-cell].q-table-cell-is-number{text-align:right}\n"], dependencies: [{ kind: "component", type: QExpansionTriggerComponent, selector: "q-expansion-trigger", inputs: ["active", "tabIndex", "disabled"], outputs: ["activeChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QExpandComponent, decorators: [{
            type: Component,
            args: [{ selector: 'span[qExpand]', imports: [QExpansionTriggerComponent], template: `
    <q-expansion-trigger
      class="q-expansion-icon"
      [active]="qExpand"
      (activeChange)="onExpandChange()" />
    <ng-content />
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}td[q-table-cell]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;text-align:left}td[q-table-cell].q-table-cell-centered{vertical-align:middle;text-align:center}td[q-table-cell]:has(q-radio-button){align-content:center}td[q-table-cell]:has(q-radio-button) .q-table-cell-content{justify-content:center;align-items:center;padding:0 var(--ads-size-micro)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container{display:flex;padding:0;min-height:auto;height:var(--ads-size-xs)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container .q-radio-button-input-container{margin:0}td[q-table-cell]:has(q-checkbox) .q-table-cell-content{align-items:center}td[q-table-cell]:has(q-checkbox) .q-checkbox{height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container{padding:0;min-height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container .q-checkbox-input-container{margin:0}td[q-table-cell] .q-expand{display:flex;align-items:flex-start;width:fit-content}td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:center}.q-table-group td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:flex-start}td[q-table-cell].q-table-cell-small{padding:var(--ads-size-xxxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-medium{padding:var(--ads-size-xxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-large{padding:var(--ads-size-s) var(--ads-size-micro)}td[q-table-cell].q-table-cell:first-child{padding-left:var(--ads-size-xs)}td[q-table-cell].q-table-cell:last-child{padding-right:var(--ads-size-xs)}td[q-table-cell].q-table-cell .q-table-cell-content{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;color:var(--ads-color-body-contrast-400);display:flex;flex-direction:column;gap:var(--ads-size-nano)}td[q-table-cell].q-table-cell .q-table-cell-content [primaryDescription],td[q-table-cell].q-table-cell .q-table-cell-content [secondaryDescription]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-500)}td[q-table-cell].q-table-cell-is-number{text-align:right}\n"] }]
        }], propDecorators: { qExpandChange: [{
                type: Output
            }], qExpand: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }], dataQt: [{
                type: HostBinding,
                args: ['attr.data-qt']
            }] } });

class QTableDataCellComponent {
    isNumber = false;
    variant = 'default';
    density = 'medium';
    centered = false;
    dataQt = 'q-table-cell';
    get hostClasses() {
        return ['q-table-cell', `q-table-cell-${this.density}`, `q-table-cell-${this.variant}`].join(' ');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableDataCellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QTableDataCellComponent, isStandalone: true, selector: "td[q-table-cell]", inputs: { isNumber: ["isNumber", "isNumber", booleanAttribute], variant: "variant", density: "density", centered: ["centered", "centered", booleanAttribute], dataQt: "dataQt" }, host: { properties: { "class.q-table-cell-is-number": "this.isNumber", "class.q-table-cell-centered": "this.centered", "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, ngImport: i0, template: "<div class=\"q-table-cell-content\">\n  <ng-container [ngSwitch]=\"variant\">\n    <ng-container *ngSwitchCase=\"'default'\">\n      <ng-content />\n      <ng-content select=\"[secondaryValue]\" />\n      <ng-content select=\"[primaryDescription]\" />\n      <ng-content select=\"[secondaryDescription]\" />\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"'radio'\">\n      <ng-content select=\"q-radio-button\" />\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"'checkbox'\">\n      <ng-content select=\"q-checkbox\" />\n    </ng-container>\n  </ng-container>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}td[q-table-cell]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;text-align:left}td[q-table-cell].q-table-cell-centered{vertical-align:middle;text-align:center}td[q-table-cell]:has(q-radio-button){align-content:center}td[q-table-cell]:has(q-radio-button) .q-table-cell-content{justify-content:center;align-items:center;padding:0 var(--ads-size-micro)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container{display:flex;padding:0;min-height:auto;height:var(--ads-size-xs)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container .q-radio-button-input-container{margin:0}td[q-table-cell]:has(q-checkbox) .q-table-cell-content{align-items:center}td[q-table-cell]:has(q-checkbox) .q-checkbox{height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container{padding:0;min-height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container .q-checkbox-input-container{margin:0}td[q-table-cell] .q-expand{display:flex;align-items:flex-start;width:fit-content}td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:center}.q-table-group td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:flex-start}td[q-table-cell].q-table-cell-small{padding:var(--ads-size-xxxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-medium{padding:var(--ads-size-xxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-large{padding:var(--ads-size-s) var(--ads-size-micro)}td[q-table-cell].q-table-cell:first-child{padding-left:var(--ads-size-xs)}td[q-table-cell].q-table-cell:last-child{padding-right:var(--ads-size-xs)}td[q-table-cell].q-table-cell .q-table-cell-content{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;color:var(--ads-color-body-contrast-400);display:flex;flex-direction:column;gap:var(--ads-size-nano)}td[q-table-cell].q-table-cell .q-table-cell-content [primaryDescription],td[q-table-cell].q-table-cell .q-table-cell-content [secondaryDescription]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-500)}td[q-table-cell].q-table-cell-is-number{text-align:right}\n"], dependencies: [{ kind: "directive", type: NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableDataCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'td[q-table-cell]', imports: [NgSwitch, NgSwitchCase], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"q-table-cell-content\">\n  <ng-container [ngSwitch]=\"variant\">\n    <ng-container *ngSwitchCase=\"'default'\">\n      <ng-content />\n      <ng-content select=\"[secondaryValue]\" />\n      <ng-content select=\"[primaryDescription]\" />\n      <ng-content select=\"[secondaryDescription]\" />\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"'radio'\">\n      <ng-content select=\"q-radio-button\" />\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"'checkbox'\">\n      <ng-content select=\"q-checkbox\" />\n    </ng-container>\n  </ng-container>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}td[q-table-cell]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;text-align:left}td[q-table-cell].q-table-cell-centered{vertical-align:middle;text-align:center}td[q-table-cell]:has(q-radio-button){align-content:center}td[q-table-cell]:has(q-radio-button) .q-table-cell-content{justify-content:center;align-items:center;padding:0 var(--ads-size-micro)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container{display:flex;padding:0;min-height:auto;height:var(--ads-size-xs)}td[q-table-cell]:has(q-radio-button) .q-radio-button-container .q-radio-button-input-container{margin:0}td[q-table-cell]:has(q-checkbox) .q-table-cell-content{align-items:center}td[q-table-cell]:has(q-checkbox) .q-checkbox{height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container{padding:0;min-height:var(--ads-size-xs)}td[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container .q-checkbox-input-container{margin:0}td[q-table-cell] .q-expand{display:flex;align-items:flex-start;width:fit-content}td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:center}.q-table-group td[q-table-cell]:has(.q-expand) .q-table-cell-content{align-items:flex-start}td[q-table-cell].q-table-cell-small{padding:var(--ads-size-xxxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-medium{padding:var(--ads-size-xxs) var(--ads-size-micro)}td[q-table-cell].q-table-cell-large{padding:var(--ads-size-s) var(--ads-size-micro)}td[q-table-cell].q-table-cell:first-child{padding-left:var(--ads-size-xs)}td[q-table-cell].q-table-cell:last-child{padding-right:var(--ads-size-xs)}td[q-table-cell].q-table-cell .q-table-cell-content{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;color:var(--ads-color-body-contrast-400);display:flex;flex-direction:column;gap:var(--ads-size-nano)}td[q-table-cell].q-table-cell .q-table-cell-content [primaryDescription],td[q-table-cell].q-table-cell .q-table-cell-content [secondaryDescription]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-500)}td[q-table-cell].q-table-cell-is-number{text-align:right}\n"] }]
        }], propDecorators: { isNumber: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-table-cell-is-number']
            }], variant: [{
                type: Input
            }], density: [{
                type: Input
            }], centered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-table-cell-centered']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QTableSorterComponent {
    sortOrder = null;
    contentTemplate = null;
    dataQt = 'q-table-sorter';
    get hostClasses() {
        return `q-table-sorter ${this.sortOrder ? `q-table-sorter-${this.sortOrder}` : ''}`;
    }
    _iconRegistryService = inject(QIconRegistryService);
    constructor() {
        this._iconRegistryService.registerIcons([arrowBack]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableSorterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QTableSorterComponent, isStandalone: true, selector: "q-table-sorter", inputs: { sortOrder: "sortOrder", contentTemplate: "contentTemplate", dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, ngImport: i0, template: "<span class=\"q-note\">\n  <ng-template [ngTemplateOutlet]=\"contentTemplate\" />\n</span>\n\n<q-icon\n  *ngIf=\"!!sortOrder\"\n  [name]=\"'arrowBack'\"\n  [dataQt]=\"'q-table-sort-icon'\"\n  class=\"q-icon q-icon--xs fill-grey\" />\n", styles: [".q-table-sorter{display:flex;gap:var(--ads-size-nano)}.q-table-sorter-ascend>.q-icon{transform:rotate(90deg)}.q-table-sorter-descend>.q-icon{transform:rotate(-90deg)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableSorterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-table-sorter', imports: [NgIf, NgTemplateOutlet, QIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<span class=\"q-note\">\n  <ng-template [ngTemplateOutlet]=\"contentTemplate\" />\n</span>\n\n<q-icon\n  *ngIf=\"!!sortOrder\"\n  [name]=\"'arrowBack'\"\n  [dataQt]=\"'q-table-sort-icon'\"\n  class=\"q-icon q-icon--xs fill-grey\" />\n", styles: [".q-table-sorter{display:flex;gap:var(--ads-size-nano)}.q-table-sorter-ascend>.q-icon{transform:rotate(90deg)}.q-table-sorter-descend>.q-icon{transform:rotate(-90deg)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { sortOrder: [{
                type: Input
            }], contentTemplate: [{
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

class QTableHeaderCellComponent {
    sortChanged = new EventEmitter();
    sortOrder = null;
    sortFn = null;
    columnKey = '';
    isSortable = false;
    get dataQt() {
        return `q-table-header-cell-${this.columnKey}`;
    }
    _onClick = () => this._updateSortOrder();
    _onKeyDown = ({ code }) => this._sortUpdateOnKeyCodeMatch(code);
    clickSubject$ = new Subject();
    _cdr = inject(ChangeDetectorRef);
    clearSortOrder() {
        if (this.sortOrder !== null) {
            this.sortOrder = null;
            this._cdr.markForCheck();
        }
    }
    _sortUpdateOnKeyCodeMatch(code) {
        if ([ENTER, SPACE].includes(code)) {
            this._updateSortOrder();
        }
    }
    _updateSortOrder() {
        if (!this.sortFn && !this.isSortable)
            return;
        switch (this.sortOrder) {
            case 'ascend':
                this.sortOrder = 'descend';
                break;
            case 'descend':
                this.sortOrder = null;
                break;
            default:
                this.sortOrder = 'ascend';
                break;
        }
        this.clickSubject$.next(this);
        this.sortChanged.emit(this.sortOrder);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableHeaderCellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QTableHeaderCellComponent, isStandalone: true, selector: "th[q-table-cell]", inputs: { sortOrder: "sortOrder", sortFn: "sortFn", columnKey: "columnKey", isSortable: ["isSortable", "isSortable", booleanAttribute], dataQt: "dataQt" }, outputs: { sortChanged: "sortChanged" }, host: { listeners: { "click": "_onClick()", "keydown": "_onKeyDown($event)" }, properties: { "class.q-table-sortable": "!!sortFn || isSortable", "attr.tabIndex": "!!sortFn || isSortable ? \"0\" : \"-1\"", "attr.data-qt": "this.dataQt" }, classAttribute: "q-note" }, ngImport: i0, template: "<ng-container *ngIf=\"!!sortFn || isSortable; else contentTemplate\">\n  <q-table-sorter [sortOrder]=\"sortOrder\" [contentTemplate]=\"contentTemplate\" />\n</ng-container>\n\n<ng-template #contentTemplate>\n  <ng-content />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}th[q-table-cell]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;text-align:left;color:var(--ads-color-body-600);background-color:var(--ads-color-body-100);padding:var(--ads-size-xxxs) var(--ads-size-micro);outline:none;vertical-align:middle}th[q-table-cell]:has(q-checkbox){text-align:center}th[q-table-cell]:has(q-checkbox) .q-checkbox{display:block;height:var(--ads-size-xs)}th[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container{padding:0;min-height:var(--ads-size-xs)}th[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container .q-checkbox-input-container{margin:0}th[q-table-cell].q-table-sortable{cursor:pointer}th[q-table-cell]:first-child{padding-left:var(--ads-size-xs)}th[q-table-cell]:last-child{padding-right:var(--ads-size-xs)}th[q-table-cell]:hover{background-color:var(--ads-color-body-200)}th[q-table-cell]:active{background-color:var(--ads-color-body-300)}th[q-table-cell]:focus-visible{box-shadow:inset 0 0 0 2px var(--ads-color-body-contrast-400);border-radius:var(--ads-border-radius-s)}th[q-table-cell] .q-expand{display:block;width:fit-content}th[q-table-cell]:has(.q-expand){display:flex;align-items:center}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: QTableSorterComponent, selector: "q-table-sorter", inputs: ["sortOrder", "contentTemplate", "dataQt"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableHeaderCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'th[q-table-cell]', imports: [NgIf, QTableSorterComponent], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'q-note',
                        '[class.q-table-sortable]': '!!sortFn || isSortable',
                        '[attr.tabIndex]': '!!sortFn || isSortable ? "0" : "-1"',
                    }, template: "<ng-container *ngIf=\"!!sortFn || isSortable; else contentTemplate\">\n  <q-table-sorter [sortOrder]=\"sortOrder\" [contentTemplate]=\"contentTemplate\" />\n</ng-container>\n\n<ng-template #contentTemplate>\n  <ng-content />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}th[q-table-cell]{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;text-align:left;color:var(--ads-color-body-600);background-color:var(--ads-color-body-100);padding:var(--ads-size-xxxs) var(--ads-size-micro);outline:none;vertical-align:middle}th[q-table-cell]:has(q-checkbox){text-align:center}th[q-table-cell]:has(q-checkbox) .q-checkbox{display:block;height:var(--ads-size-xs)}th[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container{padding:0;min-height:var(--ads-size-xs)}th[q-table-cell]:has(q-checkbox) .q-checkbox .q-checkbox-base-container .q-checkbox-input-container{margin:0}th[q-table-cell].q-table-sortable{cursor:pointer}th[q-table-cell]:first-child{padding-left:var(--ads-size-xs)}th[q-table-cell]:last-child{padding-right:var(--ads-size-xs)}th[q-table-cell]:hover{background-color:var(--ads-color-body-200)}th[q-table-cell]:active{background-color:var(--ads-color-body-300)}th[q-table-cell]:focus-visible{box-shadow:inset 0 0 0 2px var(--ads-color-body-contrast-400);border-radius:var(--ads-border-radius-s)}th[q-table-cell] .q-expand{display:block;width:fit-content}th[q-table-cell]:has(.q-expand){display:flex;align-items:center}\n"] }]
        }], propDecorators: { sortChanged: [{
                type: Output
            }], sortOrder: [{
                type: Input
            }], sortFn: [{
                type: Input
            }], columnKey: [{
                type: Input
            }], isSortable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _onClick: [{
                type: HostListener,
                args: ['click']
            }], _onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

class QTableService {
    tableData$;
    currentPage$;
    pageSize$;
    theadTemplate$;
    sortOperator$;
    currentPageData$;
    columnCount$;
    _tableDataSubject = new BehaviorSubject([]);
    _currentPageSubject = new BehaviorSubject(1);
    _pageSizeSubject = new BehaviorSubject(25);
    _theadTemplateSubject = new Subject();
    _sortOperatorSubject = new BehaviorSubject(null);
    _currentPageDataSubject = new BehaviorSubject([]);
    _columnCountSubject = new BehaviorSubject(1);
    _totalItems = new BehaviorSubject(0);
    _paginationMode = 'client';
    _destroy$ = new Subject();
    constructor() {
        this.tableData$ = this._tableDataSubject.asObservable();
        this.currentPage$ = this._currentPageSubject.asObservable();
        this.pageSize$ = this._pageSizeSubject.asObservable();
        this.theadTemplate$ = this._theadTemplateSubject.asObservable();
        this.sortOperator$ = this._sortOperatorSubject.asObservable();
        this.currentPageData$ = this._currentPageDataSubject.asObservable();
        this.columnCount$ = this._columnCountSubject.asObservable();
        combineLatest([this.tableData$, this.currentPage$, this.pageSize$, this.sortOperator$])
            .pipe(takeUntil(this._destroy$))
            .subscribe(([tableData, currentPage, pageSize, sortOperator]) => {
            const dataClone = tableData?.slice();
            if (this._paginationMode === 'client' && !!dataClone) {
                if (sortOperator?.sortFn && sortOperator?.sortOrder) {
                    const { sortFn, sortOrder, columnKey } = sortOperator;
                    this._currentPageDataSubject.next(this._calcCurrentPageData(dataClone.sort((a, b) => sortFn
                        ? sortFn(a[columnKey], b[columnKey], sortOrder)
                        : 0), currentPage, pageSize));
                }
                else {
                    this._currentPageDataSubject.next(this._calcCurrentPageData(dataClone, currentPage, pageSize));
                }
            }
            else if (this._paginationMode === 'server') {
                this._currentPageDataSubject.next(tableData);
            }
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    updateColumnCount(columnCount) {
        this._columnCountSubject.next(columnCount);
    }
    updateSortOperator(sortOperator) {
        this._sortOperatorSubject.next(sortOperator);
    }
    updateCurrentPage(pageIndex) {
        this._currentPageSubject.next(pageIndex);
    }
    updatePageSize(pageSize) {
        this._pageSizeSubject.next(pageSize);
    }
    setTheadTemplate(template) {
        this._theadTemplateSubject.next(template);
    }
    updateTableData(data) {
        this._tableDataSubject.next(data);
    }
    updateTotalItems(totalItems) {
        this._totalItems.next(totalItems);
    }
    setPaginationMode(mode) {
        this._paginationMode = mode;
    }
    _calcCurrentPageData(data, currentPage, pageSize) {
        return data?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

class QTableFooterComponent {
    paginationType = 'button';
    totalItems = 0;
    currentPage = 1;
    pageSize = 25;
    infiniteLoading = false;
    dataQt = 'q-table-footer';
    roundedCorners = false;
    rootClass = 'q-table-footer';
    _initialBatchSize = 0;
    _tableService = inject(QTableService);
    _iconRegistry = inject(QIconRegistryService);
    ngOnInit() {
        this._initialBatchSize = this.pageSize;
        this._iconRegistry.registerIcon(add);
    }
    _onPageChanged(page) {
        this.currentPage = page;
        this._tableService.updateCurrentPage(page);
    }
    _increasePageSize() {
        const newPageSize = this.pageSize + this.nextBatchSize;
        this.pageSize = newPageSize;
        this._tableService.updatePageSize(newPageSize);
    }
    _getTranslationPluralization() {
        const translateSlice = 'allspark.table.footer.';
        if (this.totalItems === 0) {
            return `${translateSlice}showingZero`;
        }
        else if (this.totalItems === 1) {
            return `${translateSlice}showingOne`;
        }
        else {
            return `${translateSlice}showingMultiple`;
        }
    }
    get nextBatchSize() {
        return this.totalItems > this.pageSize
            ? Math.min(this.totalItems - this.pageSize, this._initialBatchSize)
            : this.totalItems;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QTableFooterComponent, isStandalone: true, selector: "q-table-footer", inputs: { paginationType: "paginationType", totalItems: ["totalItems", "totalItems", numberAttribute], currentPage: ["currentPage", "currentPage", numberAttribute], pageSize: ["pageSize", "pageSize", numberAttribute], infiniteLoading: ["infiniteLoading", "infiniteLoading", booleanAttribute], dataQt: "dataQt", roundedCorners: ["roundedCorners", "roundedCorners", booleanAttribute] }, host: { properties: { "attr.data-qt": "this.dataQt", "class.q-table-footer-rounded-corners": "this.roundedCorners" } }, providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], ngImport: i0, template: "<div\n  *transloco=\"let t\"\n  class=\"{{ rootClass }}-container\"\n  [class.q-table-footer-medium]=\"paginationType !== 'button'\"\n  [class.q-table-footer-large]=\"paginationType === 'button'\"\n  [ngSwitch]=\"paginationType\">\n  <div *ngSwitchCase=\"'paginator'\" class=\"{{ rootClass }}-paginator-container\">\n    <q-paginator\n      [totalItems]=\"totalItems\"\n      [currentPage]=\"currentPage\"\n      [pageSize]=\"pageSize\"\n      (changed)=\"_onPageChanged($event)\" />\n  </div>\n\n  <div *ngSwitchCase=\"'infinite'\" class=\"{{ rootClass }}-spinner\">\n    <q-spinner *ngIf=\"totalItems !== pageSize && infiniteLoading\" [size]=\"'x-small'\" />\n    <span *ngIf=\"totalItems === pageSize\" class=\"q-note\">\n      {{ t(_getTranslationPluralization(), { totalItems }) }}\n    </span>\n  </div>\n\n  <div *ngSwitchDefault>\n    <q-chip\n      *ngIf=\"totalItems > pageSize\"\n      [type]=\"'text'\"\n      [icon]=\"'add'\"\n      (changed)=\"_increasePageSize()\">\n      {{ t('allspark.table.footer.showMore', { nextBatchSize }) }}\n    </q-chip>\n    <span *ngIf=\"totalItems <= pageSize\" class=\"q-note\">\n      {{ t(_getTranslationPluralization(), { totalItems }) }}\n    </span>\n  </div>\n</div>\n", styles: [".q-table-footer-container{display:flex;justify-content:center;align-items:center;width:100%}.q-table-footer-large{height:var(--ads-size-mega);padding:var(--ads-size-s) 0}.q-table-footer-medium{height:var(--ads-size-xxl);padding:var(--ads-size-xxs) 0}.q-table-footer-spinner{position:relative}.q-table-footer-paginator-container{width:100%}.q-table-footer-rounded-corners .q-paginator-container{border-radius:var(--ads-border-radius-s)}\n"], dependencies: [{ kind: "ngmodule", type: TranslocoModule }, { kind: "directive", type: i1.TranslocoDirective, selector: "[transloco]", inputs: ["transloco", "translocoParams", "translocoScope", "translocoRead", "translocoPrefix", "translocoLang", "translocoLoadingTpl"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: QPaginatorComponent, selector: "q-paginator", inputs: ["itemsInfoPosition", "showPagesInfo", "dataQt", "currentPage", "totalItems", "pageSize"], outputs: ["changed"] }, { kind: "component", type: QSpinnerComponent, selector: "q-spinner", inputs: ["variant", "size", "dataQt"] }, { kind: "component", type: QChipComponent, selector: "q-chip", inputs: ["isIconChip", "toggleActiveIconColor", "toggleOnClick", "isDropdown", "error", "readonly", "value", "iconPosition", "textStyle", "dataQt", "type", "showCheckIcon", "checkType", "active", "toggleActiveIcon", "disabled", "icon", "toggleRightIcon"], outputs: ["changed", "iconClicked"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-table-footer', imports: [
                        TranslocoModule,
                        NgIf,
                        NgSwitch,
                        NgSwitchCase,
                        NgSwitchDefault,
                        QPaginatorComponent,
                        QSpinnerComponent,
                        QChipComponent,
                    ], providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  *transloco=\"let t\"\n  class=\"{{ rootClass }}-container\"\n  [class.q-table-footer-medium]=\"paginationType !== 'button'\"\n  [class.q-table-footer-large]=\"paginationType === 'button'\"\n  [ngSwitch]=\"paginationType\">\n  <div *ngSwitchCase=\"'paginator'\" class=\"{{ rootClass }}-paginator-container\">\n    <q-paginator\n      [totalItems]=\"totalItems\"\n      [currentPage]=\"currentPage\"\n      [pageSize]=\"pageSize\"\n      (changed)=\"_onPageChanged($event)\" />\n  </div>\n\n  <div *ngSwitchCase=\"'infinite'\" class=\"{{ rootClass }}-spinner\">\n    <q-spinner *ngIf=\"totalItems !== pageSize && infiniteLoading\" [size]=\"'x-small'\" />\n    <span *ngIf=\"totalItems === pageSize\" class=\"q-note\">\n      {{ t(_getTranslationPluralization(), { totalItems }) }}\n    </span>\n  </div>\n\n  <div *ngSwitchDefault>\n    <q-chip\n      *ngIf=\"totalItems > pageSize\"\n      [type]=\"'text'\"\n      [icon]=\"'add'\"\n      (changed)=\"_increasePageSize()\">\n      {{ t('allspark.table.footer.showMore', { nextBatchSize }) }}\n    </q-chip>\n    <span *ngIf=\"totalItems <= pageSize\" class=\"q-note\">\n      {{ t(_getTranslationPluralization(), { totalItems }) }}\n    </span>\n  </div>\n</div>\n", styles: [".q-table-footer-container{display:flex;justify-content:center;align-items:center;width:100%}.q-table-footer-large{height:var(--ads-size-mega);padding:var(--ads-size-s) 0}.q-table-footer-medium{height:var(--ads-size-xxl);padding:var(--ads-size-xxs) 0}.q-table-footer-spinner{position:relative}.q-table-footer-paginator-container{width:100%}.q-table-footer-rounded-corners .q-paginator-container{border-radius:var(--ads-border-radius-s)}\n"] }]
        }], propDecorators: { paginationType: [{
                type: Input
            }], totalItems: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], currentPage: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], pageSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], infiniteLoading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], roundedCorners: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-table-footer-rounded-corners']
            }] } });

class QTableHeaderComponent {
    dataQt = 'q-table-header';
    _listOfQHeaderCellComponent;
    _templateRef;
    hostClass = 'q-table-header';
    _isInsideTable = false;
    _tableService = inject(QTableService);
    _elementRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    _destroy$ = inject(QDestroyService);
    constructor() {
        this._isInsideTable = !!this._tableService;
    }
    ngOnInit() {
        if (this._isInsideTable) {
            this._tableService.setTheadTemplate(this._templateRef);
        }
    }
    ngAfterContentInit() {
        this._subscribeToSortUpdates();
    }
    ngAfterViewInit() {
        this._removeHeaderInsideTable();
    }
    _subscribeToSortUpdates() {
        const manualSort$ = merge(...this._listOfQHeaderCellComponent.map((th) => th.clickSubject$)).pipe(takeUntil(this._destroy$));
        manualSort$.subscribe((data) => {
            this._listOfQHeaderCellComponent.forEach((th) => {
                if (th === data) {
                    this._tableService.updateSortOperator({
                        columnKey: th.columnKey,
                        sortFn: th.sortFn,
                        sortOrder: th.sortOrder,
                    });
                }
                else {
                    th.clearSortOrder();
                }
            });
        });
    }
    _removeHeaderInsideTable() {
        if (this._isInsideTable) {
            this._renderer.removeChild(this._renderer.parentNode(this._elementRef.nativeElement), this._elementRef.nativeElement);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QTableHeaderComponent, isStandalone: true, selector: "thead:not(.q-table-thead)", inputs: { dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, providers: [QDestroyService], queries: [{ propertyName: "_listOfQHeaderCellComponent", predicate: QTableHeaderCellComponent, descendants: true }], viewQueries: [{ propertyName: "_templateRef", first: true, predicate: ["contentTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ng-template #contentTemplate>\n  <ng-content />\n</ng-template>\n\n<ng-container *ngIf=\"!_isInsideTable\">\n  <ng-template [ngTemplateOutlet]=\"contentTemplate\" />\n</ng-container>\n", styles: [".q-table-header::-webkit-scrollbar{visibility:hidden;height:0}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'thead:not(.q-table-thead)', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf, NgTemplateOutlet], providers: [QDestroyService], encapsulation: ViewEncapsulation.None, template: "<ng-template #contentTemplate>\n  <ng-content />\n</ng-template>\n\n<ng-container *ngIf=\"!_isInsideTable\">\n  <ng-template [ngTemplateOutlet]=\"contentTemplate\" />\n</ng-container>\n", styles: [".q-table-header::-webkit-scrollbar{visibility:hidden;height:0}\n"] }]
        }], ctorParameters: () => [], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _listOfQHeaderCellComponent: [{
                type: ContentChildren,
                args: [QTableHeaderCellComponent, { descendants: true }]
            }], _templateRef: [{
                type: ViewChild,
                args: ['contentTemplate', { static: true }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QTableRowExpandComponent {
    get qExpand() {
        return this._qExpand;
    }
    set qExpand(value) {
        this._qExpand = value;
        if (this._qExpand) {
            this._hidden = false;
        }
    }
    hostClass = 'q-table-row-expand';
    dataQt = 'q-table-row-expand';
    get hidden() {
        return this._hidden || null;
    }
    _tableService = inject(QTableService);
    _qExpand = false;
    _hidden = true;
    _onAnimationDone() {
        if (!this.qExpand) {
            this._hidden = true;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableRowExpandComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QTableRowExpandComponent, isStandalone: true, selector: "tr[qExpand]", inputs: { qExpand: "qExpand" }, host: { properties: { "class": "this.hostClass", "attr.data-qt": "this.dataQt", "attr.hidden": "this.hidden" } }, ngImport: i0, template: `
    <td [colSpan]="_tableService.columnCount$ | async">
      <div
        class="q-expand-cell-container"
        [@bodyExpansion]="qExpand ? 'expanded' : 'collapsed'"
        (@bodyExpansion.done)="_onAnimationDone()">
        <ng-content />
      </div>
    </td>
  `, isInline: true, styles: ["tbody>tr.q-table-row-expand[hidden]{display:none}tbody>tr.q-table-row-expand>td .q-expand-cell-container{overflow:auto;padding:0 var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxs)}tbody :nth-child(odd of tr.q-table-row) td,tbody :nth-child(odd of tr.q-table-row-expand) td{background-color:var(--ads-color-body-200)}tbody :nth-child(2n of tr.q-table-row) td,tbody :nth-child(2n of tr.q-table-row-expand) td{background-color:var(--ads-color-body-100)}tbody>tr.q-table-row{outline:none}tbody>tr.q-table-row:hover>td{background-color:var(--ads-color-body-300)}@media(pointer:coarse){tbody>tr.q-table-row:hover>td{background-color:inherit}tbody>tr.q-table-row:active>td{background-color:var(--ads-color-body-300)}}\n"], dependencies: [{ kind: "pipe", type: AsyncPipe, name: "async" }], animations: [accordionAnimations.bodyExpansion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableRowExpandComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tr[qExpand]', imports: [AsyncPipe], template: `
    <td [colSpan]="_tableService.columnCount$ | async">
      <div
        class="q-expand-cell-container"
        [@bodyExpansion]="qExpand ? 'expanded' : 'collapsed'"
        (@bodyExpansion.done)="_onAnimationDone()">
        <ng-content />
      </div>
    </td>
  `, animations: [accordionAnimations.bodyExpansion], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["tbody>tr.q-table-row-expand[hidden]{display:none}tbody>tr.q-table-row-expand>td .q-expand-cell-container{overflow:auto;padding:0 var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxs)}tbody :nth-child(odd of tr.q-table-row) td,tbody :nth-child(odd of tr.q-table-row-expand) td{background-color:var(--ads-color-body-200)}tbody :nth-child(2n of tr.q-table-row) td,tbody :nth-child(2n of tr.q-table-row-expand) td{background-color:var(--ads-color-body-100)}tbody>tr.q-table-row{outline:none}tbody>tr.q-table-row:hover>td{background-color:var(--ads-color-body-300)}@media(pointer:coarse){tbody>tr.q-table-row:hover>td{background-color:inherit}tbody>tr.q-table-row:active>td{background-color:var(--ads-color-body-300)}}\n"] }]
        }], propDecorators: { qExpand: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], dataQt: [{
                type: HostBinding,
                args: ['attr.data-qt']
            }], hidden: [{
                type: HostBinding,
                args: ['attr.hidden']
            }] } });

class QTableRowComponent {
    dataQt = 'q-table-row';
    columns;
    hostClass = 'q-table-row';
    _isInsideHeader = false;
    _renderer = inject(Renderer2);
    _elementRef = inject(ElementRef);
    ngOnInit() {
        this._isInsideHeader = !this._renderer.parentNode(this._elementRef.nativeElement);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QTableRowComponent, isStandalone: true, selector: "tr[q-table-row]", inputs: { dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, queries: [{ propertyName: "columns", predicate: QTableDataCellComponent, descendants: true }], ngImport: i0, template: `<ng-content />`, isInline: true, styles: ["tbody>tr.q-table-row-expand[hidden]{display:none}tbody>tr.q-table-row-expand>td .q-expand-cell-container{overflow:auto;padding:0 var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxs)}tbody :nth-child(odd of tr.q-table-row) td,tbody :nth-child(odd of tr.q-table-row-expand) td{background-color:var(--ads-color-body-200)}tbody :nth-child(2n of tr.q-table-row) td,tbody :nth-child(2n of tr.q-table-row-expand) td{background-color:var(--ads-color-body-100)}tbody>tr.q-table-row{outline:none}tbody>tr.q-table-row:hover>td{background-color:var(--ads-color-body-300)}@media(pointer:coarse){tbody>tr.q-table-row:hover>td{background-color:inherit}tbody>tr.q-table-row:active>td{background-color:var(--ads-color-body-300)}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tr[q-table-row]', template: `<ng-content />`, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["tbody>tr.q-table-row-expand[hidden]{display:none}tbody>tr.q-table-row-expand>td .q-expand-cell-container{overflow:auto;padding:0 var(--ads-size-xxs) var(--ads-size-xxs) var(--ads-size-xxs)}tbody :nth-child(odd of tr.q-table-row) td,tbody :nth-child(odd of tr.q-table-row-expand) td{background-color:var(--ads-color-body-200)}tbody :nth-child(2n of tr.q-table-row) td,tbody :nth-child(2n of tr.q-table-row-expand) td{background-color:var(--ads-color-body-100)}tbody>tr.q-table-row{outline:none}tbody>tr.q-table-row:hover>td{background-color:var(--ads-color-body-300)}@media(pointer:coarse){tbody>tr.q-table-row:hover>td{background-color:inherit}tbody>tr.q-table-row:active>td{background-color:var(--ads-color-body-300)}}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], columns: [{
                type: ContentChildren,
                args: [QTableDataCellComponent, { descendants: true }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QTableContentComponent {
    tableLayout = 'auto';
    theadTemplate = null;
    contentTemplate = null;
    listOfColWidth = [];
    scrollX = null;
    scrollY = null;
    loading = false;
    errorState = false;
    empty = false;
    showEmptyStateIcon = false;
    errorStateTitle = '';
    errorStateDescription = '';
    emptyStateTitle = '';
    emptyStateDescription = '';
    emptyStateButton = null;
    dataQt = 'q-table-content';
    _iconRegistryService = inject(QIconRegistryService);
    get currentState() {
        if (this.loading)
            return 'loading';
        if (this.errorState)
            return 'error';
        if (this.empty)
            return 'empty';
        return null;
    }
    constructor() {
        this._iconRegistryService.registerIcons([infoOutline, error128]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QTableContentComponent, isStandalone: true, selector: "table[q-table-content]", inputs: { tableLayout: "tableLayout", theadTemplate: "theadTemplate", contentTemplate: "contentTemplate", listOfColWidth: "listOfColWidth", scrollX: "scrollX", scrollY: "scrollY", loading: ["loading", "loading", booleanAttribute], errorState: ["errorState", "errorState", booleanAttribute], empty: ["empty", "empty", booleanAttribute], showEmptyStateIcon: ["showEmptyStateIcon", "showEmptyStateIcon", booleanAttribute], errorStateTitle: "errorStateTitle", errorStateDescription: "errorStateDescription", emptyStateTitle: "emptyStateTitle", emptyStateDescription: "emptyStateDescription", emptyStateButton: "emptyStateButton", dataQt: "dataQt" }, host: { properties: { "style.table-layout": "tableLayout", "style.width": "scrollX", "style.min-width": "scrollX ? '100%': null", "style.max-height": "scrollY ? '100%': null", "attr.data-qt": "this.dataQt" }, classAttribute: "q-table-content" }, ngImport: i0, template: "<colgroup *ngIf=\"listOfColWidth.length\">\n  <col *ngFor=\"let width of listOfColWidth\" [style.width.px]=\"width\" [style.minWidth.px]=\"width\" />\n</colgroup>\n\n<thead *ngIf=\"theadTemplate\" class=\"q-table-thead\">\n  <ng-template [ngTemplateOutlet]=\"theadTemplate\" />\n</thead>\n\n@if (!loading && !errorState) {\n  <ng-template [ngTemplateOutlet]=\"contentTemplate\" />\n  <ng-content />\n}\n\n@if (loading || errorState || empty) {\n  <tbody>\n    <tr>\n      <td colspan=\"100%\">\n        <div class=\"q-table-{{ currentState }}-container\">\n          @switch (currentState) {\n            @case ('loading') {\n              <q-spinner [size]=\"'medium'\" />\n            }\n            @case ('error') {\n              <q-icon class=\"q-table-error-container-icon\" [name]=\"'infoOutline'\" [size]=\"'20'\" />\n              @if (errorStateTitle) {\n                <span class=\"q-table-error-container-title\">\n                  {{ errorStateTitle }}\n                </span>\n              }\n              @if (errorStateDescription) {\n                <span class=\"q-table-error-container-description\">\n                  {{ errorStateDescription }}\n                </span>\n              }\n            }\n            @case ('empty') {\n              @if (showEmptyStateIcon) {\n                <q-icon class=\"q-table-empty-container-icon\" [name]=\"'error128'\" [size]=\"'128'\" />\n              }\n              @if (emptyStateTitle) {\n                <span class=\"q-table-empty-container-title\">\n                  {{ emptyStateTitle }}\n                </span>\n              }\n              @if (emptyStateDescription) {\n                <span class=\"q-table-empty-container-description\">\n                  {{ emptyStateDescription }}\n                </span>\n              }\n              @if (emptyStateButton) {\n                <div class=\"q-table-empty-container-button\">\n                  <ng-template [ngTemplateOutlet]=\"emptyStateButton\" />\n                </div>\n              }\n            }\n          }\n        </div>\n      </td>\n    </tr>\n  </tbody>\n}\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}table.q-table-content{width:100%}table.q-table-content:has(tbody:not(:empty)):has(.q-table-loading-container,.q-table-error-container,.q-table-empty-container) thead th{width:100%}.q-table-empty-container,.q-table-error-container,.q-table-loading-container{background-color:var(--ads-color-body-200);min-height:388px;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;overflow-wrap:anywhere}.q-table-loading-container .q-spinner{position:relative;overflow:hidden}.q-table-error-container-icon{margin-bottom:var(--ads-size-xxs)}.q-table-error-container-title{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;margin-bottom:var(--ads-size-xxs);color:var(--ads-color-body-contrast-400)}.q-table-error-container-description{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-600)}.q-table-empty-container-icon{margin-bottom:var(--ads-size-xxs)}.q-table-empty-container-title{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;margin-bottom:var(--ads-size-micro);color:var(--ads-color-body-contrast-400)}.q-table-empty-container-description{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-600)}.q-table-empty-container-button{margin-top:var(--ads-size-xs)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QSpinnerComponent, selector: "q-spinner", inputs: ["variant", "size", "dataQt"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'table[q-table-content]', imports: [NgIf, NgFor, NgTemplateOutlet, QSpinnerComponent, QIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'q-table-content',
                        '[style.table-layout]': 'tableLayout',
                        '[style.width]': 'scrollX',
                        '[style.min-width]': "scrollX ? '100%': null",
                        '[style.max-height]': "scrollY ? '100%': null",
                    }, template: "<colgroup *ngIf=\"listOfColWidth.length\">\n  <col *ngFor=\"let width of listOfColWidth\" [style.width.px]=\"width\" [style.minWidth.px]=\"width\" />\n</colgroup>\n\n<thead *ngIf=\"theadTemplate\" class=\"q-table-thead\">\n  <ng-template [ngTemplateOutlet]=\"theadTemplate\" />\n</thead>\n\n@if (!loading && !errorState) {\n  <ng-template [ngTemplateOutlet]=\"contentTemplate\" />\n  <ng-content />\n}\n\n@if (loading || errorState || empty) {\n  <tbody>\n    <tr>\n      <td colspan=\"100%\">\n        <div class=\"q-table-{{ currentState }}-container\">\n          @switch (currentState) {\n            @case ('loading') {\n              <q-spinner [size]=\"'medium'\" />\n            }\n            @case ('error') {\n              <q-icon class=\"q-table-error-container-icon\" [name]=\"'infoOutline'\" [size]=\"'20'\" />\n              @if (errorStateTitle) {\n                <span class=\"q-table-error-container-title\">\n                  {{ errorStateTitle }}\n                </span>\n              }\n              @if (errorStateDescription) {\n                <span class=\"q-table-error-container-description\">\n                  {{ errorStateDescription }}\n                </span>\n              }\n            }\n            @case ('empty') {\n              @if (showEmptyStateIcon) {\n                <q-icon class=\"q-table-empty-container-icon\" [name]=\"'error128'\" [size]=\"'128'\" />\n              }\n              @if (emptyStateTitle) {\n                <span class=\"q-table-empty-container-title\">\n                  {{ emptyStateTitle }}\n                </span>\n              }\n              @if (emptyStateDescription) {\n                <span class=\"q-table-empty-container-description\">\n                  {{ emptyStateDescription }}\n                </span>\n              }\n              @if (emptyStateButton) {\n                <div class=\"q-table-empty-container-button\">\n                  <ng-template [ngTemplateOutlet]=\"emptyStateButton\" />\n                </div>\n              }\n            }\n          }\n        </div>\n      </td>\n    </tr>\n  </tbody>\n}\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}table.q-table-content{width:100%}table.q-table-content:has(tbody:not(:empty)):has(.q-table-loading-container,.q-table-error-container,.q-table-empty-container) thead th{width:100%}.q-table-empty-container,.q-table-error-container,.q-table-loading-container{background-color:var(--ads-color-body-200);min-height:388px;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;overflow-wrap:anywhere}.q-table-loading-container .q-spinner{position:relative;overflow:hidden}.q-table-error-container-icon{margin-bottom:var(--ads-size-xxs)}.q-table-error-container-title{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;margin-bottom:var(--ads-size-xxs);color:var(--ads-color-body-contrast-400)}.q-table-error-container-description{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-600)}.q-table-empty-container-icon{margin-bottom:var(--ads-size-xxs)}.q-table-empty-container-title{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;margin-bottom:var(--ads-size-micro);color:var(--ads-color-body-contrast-400)}.q-table-empty-container-description{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--ads-color-body-600)}.q-table-empty-container-button{margin-top:var(--ads-size-xs)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { tableLayout: [{
                type: Input
            }], theadTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], scrollX: [{
                type: Input
            }], scrollY: [{
                type: Input
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], errorState: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], empty: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showEmptyStateIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], errorStateTitle: [{
                type: Input
            }], errorStateDescription: [{
                type: Input
            }], emptyStateTitle: [{
                type: Input
            }], emptyStateDescription: [{
                type: Input
            }], emptyStateButton: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }] } });

class QTableComponent {
    pageSizeChanged = new EventEmitter();
    pageNumberChanged = new EventEmitter();
    hitBottom = new EventEmitter();
    paginationType = 'button';
    tableLayout = 'auto';
    listOfColWidth = [];
    showFooter = false;
    infiniteLoading = false;
    flexScroll = false;
    loading = false;
    errorState = false;
    showEmptyStateIcon = false;
    roundedCorners = false;
    dataQt = 'q-table';
    errorStateTitle = '';
    errorStateDescription = '';
    emptyStateTitle = '';
    emptyStateDescription = '';
    scrollY = null;
    scrollX = null;
    get totalItems() {
        return this._totalItems;
    }
    set totalItems(value) {
        this._totalItems = coerceNumberProperty(value, 0);
        this._tableService.updateTotalItems(coerceNumberProperty(value, 0));
    }
    get tableData() {
        return this._tableData;
    }
    set tableData(value) {
        this._tableData = value;
        this._tableService.updateTableData(value);
    }
    get currentPage() {
        return this._currentPage;
    }
    set currentPage(value) {
        this._tableService.updateCurrentPage(value);
        this._currentPage = value;
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._tableService.updatePageSize(value);
        this._pageSize = value;
    }
    get paginationMode() {
        return this._paginationMode;
    }
    set paginationMode(value) {
        this._paginationMode = value;
        this._tableService.setPaginationMode(value);
    }
    _trList;
    _tableHeaderElement;
    _tableBodyElement;
    currentTableData = [];
    theadTemplate = null;
    columnCount = 0;
    _tableData = [];
    _totalItems = 0;
    _currentPage = 1;
    _pageSize = 25;
    _scroll$ = new Subject();
    _paginationMode = 'client';
    _tableService = inject(QTableService);
    _cdr = inject(ChangeDetectorRef);
    _ngZone = inject(NgZone);
    _destroy$ = inject(QDestroyService);
    ngOnInit() {
        this._registerTableServiceSubscriptions();
    }
    ngAfterViewInit() {
        this._synchronizeHorizontalScroll();
        this._triggerInfiniteScroll();
        this._updateColumnCount();
        this._trList.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._updateColumnCount();
        });
    }
    /**
     * Expand or collapse all rows
     * @param {boolean} expand - Expand or collapse all.
     */
    expandAllRows(expand) {
        this.currentTableData.forEach((item) => {
            item.expanded = expand;
        });
    }
    /**
     * Collapse all rows but expanded one
     * @param {boolean} expanded - Expand state of a row, no logic will be performed if a row was collapsed.
     * @param {string | number} expandedItemId - Expanded row item unique id, so we know which item to keep expanded.
     */
    collapseOtherRows(expanded, expandedItemId) {
        if (!expanded)
            return;
        this.currentTableData.forEach((item) => {
            const currentRow = item;
            if (currentRow.id !== expandedItemId) {
                currentRow.expanded = false;
            }
        });
    }
    get isEmpty() {
        return !this._tableData.length;
    }
    get hasFooter() {
        return this.showFooter && !this.loading && !this.errorState && !this.isEmpty;
    }
    _registerTableServiceSubscriptions() {
        const { theadTemplate$, currentPageData$, pageSize$, currentPage$ } = this._tableService;
        currentPageData$.pipe(takeUntil(this._destroy$)).subscribe((tableData) => {
            this.currentTableData = tableData;
            this._cdr.markForCheck();
        });
        theadTemplate$.pipe(takeUntil(this._destroy$)).subscribe((theadTemplate) => {
            this.theadTemplate = theadTemplate;
            this._cdr.markForCheck();
        });
        pageSize$.pipe(takeUntil(this._destroy$)).subscribe((pageSize) => {
            this._pageSize = pageSize;
            this.pageSizeChanged.emit(pageSize);
            this._cdr.markForCheck();
        });
        currentPage$.pipe(takeUntil(this._destroy$)).subscribe((pageNumber) => {
            this._currentPage = pageNumber;
            this.pageNumberChanged.emit(pageNumber);
            this._cdr.markForCheck();
        });
    }
    _synchronizeHorizontalScroll() {
        if (!this.scrollX)
            return;
        this._ngZone.runOutsideAngular(() => {
            const scrollBodyEvent$ = this._scroll$.pipe(startWith(null), delay(0), switchMap(() => fromEvent(this._tableBodyElement?.nativeElement, 'scroll').pipe(startWith(true))), takeUntil(this._destroy$));
            const scrollHeaderEvent$ = this._scroll$.pipe(startWith(null), delay(0), switchMap(() => fromEvent(this._tableHeaderElement?.nativeElement, 'scroll').pipe(startWith(true))), takeUntil(this._destroy$));
            scrollBodyEvent$.subscribe(() => {
                this._tableHeaderElement.nativeElement.scrollLeft =
                    this._tableBodyElement?.nativeElement.scrollLeft;
            });
            scrollHeaderEvent$.subscribe(() => {
                this._tableBodyElement.nativeElement.scrollLeft =
                    this._tableHeaderElement?.nativeElement.scrollLeft;
            });
        });
    }
    _triggerInfiniteScroll() {
        if (this.paginationType !== 'infinite' || !this.scrollY)
            return;
        this._ngZone.runOutsideAngular(() => {
            fromEvent(this._tableBodyElement?.nativeElement, 'scroll')
                .pipe(delay(0), takeUntil(this._destroy$), distinctUntilChanged())
                .subscribe(() => {
                const { clientHeight, scrollHeight, scrollTop } = this._tableBodyElement
                    ?.nativeElement;
                const hitTheBottom = scrollTop + clientHeight === scrollHeight;
                if (hitTheBottom) {
                    const newPageSize = this.pageSize + Math.min(this.tableData.length - this.pageSize, 25);
                    this._tableService.updatePageSize(newPageSize);
                    this.hitBottom.emit(true);
                }
            });
        });
    }
    _updateColumnCount() {
        const maxColumnCount = Math.max(...this._trList.map((row) => row.columns.length));
        this.columnCount = maxColumnCount;
        this._tableService.updateColumnCount(maxColumnCount);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QTableComponent, isStandalone: true, selector: "q-table", inputs: { paginationType: "paginationType", tableLayout: "tableLayout", listOfColWidth: "listOfColWidth", showFooter: ["showFooter", "showFooter", booleanAttribute], infiniteLoading: ["infiniteLoading", "infiniteLoading", booleanAttribute], flexScroll: ["flexScroll", "flexScroll", booleanAttribute], loading: ["loading", "loading", booleanAttribute], errorState: ["errorState", "errorState", booleanAttribute], showEmptyStateIcon: ["showEmptyStateIcon", "showEmptyStateIcon", booleanAttribute], roundedCorners: ["roundedCorners", "roundedCorners", booleanAttribute], dataQt: "dataQt", errorStateTitle: "errorStateTitle", errorStateDescription: "errorStateDescription", emptyStateTitle: "emptyStateTitle", emptyStateDescription: "emptyStateDescription", scrollY: "scrollY", scrollX: "scrollX", totalItems: "totalItems", tableData: "tableData", currentPage: "currentPage", pageSize: "pageSize", paginationMode: "paginationMode" }, outputs: { pageSizeChanged: "pageSizeChanged", pageNumberChanged: "pageNumberChanged", hitBottom: "hitBottom" }, host: { properties: { "attr.data-qt": "this.dataQt" } }, providers: [QTableService, QDestroyService], queries: [{ propertyName: "_trList", predicate: QTableRowComponent, descendants: true }], viewQueries: [{ propertyName: "_tableHeaderElement", first: true, predicate: ["tableHeaderElement"], descendants: true, read: ElementRef }, { propertyName: "_tableBodyElement", first: true, predicate: ["tableBodyElement"], descendants: true, read: ElementRef }], ngImport: i0, template: "<div\n  class=\"q-table\"\n  [class.q-table-flex-scroll]=\"flexScroll\"\n  [class.q-table-rounded-corners]=\"roundedCorners\">\n  <ng-container *ngIf=\"scrollY || scrollX; else defaultTemplate\">\n    <div #tableHeaderElement class=\"q-table-header\" [style.width]=\"scrollX\">\n      <table\n        q-table-content\n        tableLayout=\"fixed\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [theadTemplate]=\"theadTemplate\"\n        [scrollX]=\"scrollX\"\n        [scrollY]=\"scrollY\"></table>\n    </div>\n\n    <div\n      #tableBodyElement\n      qScrollShadow\n      class=\"q-table-body\"\n      [style.height]=\"scrollY\"\n      [style.width]=\"scrollX\">\n      <table\n        q-table-content\n        tableLayout=\"fixed\"\n        [scrollX]=\"scrollX\"\n        [scrollY]=\"scrollY\"\n        [style.max-height]=\"scrollY\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [contentTemplate]=\"contentTemplate\"\n        [loading]=\"loading\"\n        [errorState]=\"errorState\"\n        [errorStateTitle]=\"errorStateTitle\"\n        [errorStateDescription]=\"errorStateDescription\"\n        [empty]=\"isEmpty\"\n        [emptyStateTitle]=\"emptyStateTitle\"\n        [emptyStateDescription]=\"emptyStateDescription\"\n        [showEmptyStateIcon]=\"showEmptyStateIcon\"\n        [emptyStateButton]=\"emptyStateButton\"></table>\n    </div>\n  </ng-container>\n\n  <ng-template #defaultTemplate>\n    <div class=\"q-table-default-table-content\">\n      <table\n        q-table-content\n        [theadTemplate]=\"theadTemplate\"\n        [contentTemplate]=\"contentTemplate\"\n        [tableLayout]=\"tableLayout\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [loading]=\"loading\"\n        [errorState]=\"errorState\"\n        [errorStateTitle]=\"errorStateTitle\"\n        [errorStateDescription]=\"errorStateDescription\"\n        [empty]=\"isEmpty\"\n        [emptyStateTitle]=\"emptyStateTitle\"\n        [emptyStateDescription]=\"emptyStateDescription\"\n        [showEmptyStateIcon]=\"showEmptyStateIcon\"\n        [emptyStateButton]=\"emptyStateButton\"></table>\n    </div>\n  </ng-template>\n\n  <q-table-footer\n    *ngIf=\"hasFooter\"\n    [totalItems]=\"totalItems || tableData.length\"\n    [pageSize]=\"pageSize\"\n    [currentPage]=\"currentPage\"\n    [paginationType]=\"paginationType\"\n    [infiniteLoading]=\"infiniteLoading\"\n    [roundedCorners]=\"roundedCorners\" />\n</div>\n\n<ng-template #contentTemplate>\n  <ng-content />\n</ng-template>\n\n<ng-template #emptyStateButton>\n  <ng-content select=\"[q-button][q-table-empty-button],[q-text-button][q-table-empty-button]\" />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-table{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;display:flex;flex-direction:column;width:fit-content;position:relative}.q-table table,.q-table caption,.q-table tbody,.q-table tfoot,.q-table thead,.q-table tr,.q-table th,.q-table td{margin:0;padding:0;border:0}.q-table table{border-collapse:collapse;border-spacing:0}.q-table-rounded-corners td:first-child,.q-table-rounded-corners th:first-child{border-radius:var(--ads-border-radius-s) 0 0 var(--ads-border-radius-s)}.q-table-rounded-corners td:last-child,.q-table-rounded-corners th:last-child{border-radius:0 var(--ads-border-radius-s) var(--ads-border-radius-s) 0}.q-table-rounded-corners .q-table-row-expand td{border-radius:0 0 var(--ads-border-radius-s) var(--ads-border-radius-s)}.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) td:first-child,.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) th:first-child{border-radius:var(--ads-border-radius-s) 0 0 0}.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) td:last-child,.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) th:last-child{border-radius:0 var(--ads-border-radius-s) 0 0}.q-table-body,.q-table-header{overflow-y:overlay;overflow-x:overlay}.q-table-flex-scroll{height:100%}.q-table-flex-scroll .q-table-header{min-height:var(--ads-size-m)}.q-table-flex-scroll .q-table-default-table-content{display:block;overflow:auto}.q-table-flex-scroll .q-table-thead{position:sticky;top:0;z-index:1}@media(max-width:599px){.q-table,.q-table-body,.q-table-header{min-width:100%}}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: QTableContentComponent, selector: "table[q-table-content]", inputs: ["tableLayout", "theadTemplate", "contentTemplate", "listOfColWidth", "scrollX", "scrollY", "loading", "errorState", "empty", "showEmptyStateIcon", "errorStateTitle", "errorStateDescription", "emptyStateTitle", "emptyStateDescription", "emptyStateButton", "dataQt"] }, { kind: "directive", type: QScrollShadowDirective, selector: "[qScrollShadow]", inputs: ["qScrollShadowAuditTimeMs", "qScrollShadowEnabled"] }, { kind: "component", type: QTableFooterComponent, selector: "q-table-footer", inputs: ["paginationType", "totalItems", "currentPage", "pageSize", "infiniteLoading", "dataQt", "roundedCorners"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-table', imports: [NgIf, QTableContentComponent, QScrollShadowDirective, QTableFooterComponent], providers: [QTableService, QDestroyService], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"q-table\"\n  [class.q-table-flex-scroll]=\"flexScroll\"\n  [class.q-table-rounded-corners]=\"roundedCorners\">\n  <ng-container *ngIf=\"scrollY || scrollX; else defaultTemplate\">\n    <div #tableHeaderElement class=\"q-table-header\" [style.width]=\"scrollX\">\n      <table\n        q-table-content\n        tableLayout=\"fixed\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [theadTemplate]=\"theadTemplate\"\n        [scrollX]=\"scrollX\"\n        [scrollY]=\"scrollY\"></table>\n    </div>\n\n    <div\n      #tableBodyElement\n      qScrollShadow\n      class=\"q-table-body\"\n      [style.height]=\"scrollY\"\n      [style.width]=\"scrollX\">\n      <table\n        q-table-content\n        tableLayout=\"fixed\"\n        [scrollX]=\"scrollX\"\n        [scrollY]=\"scrollY\"\n        [style.max-height]=\"scrollY\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [contentTemplate]=\"contentTemplate\"\n        [loading]=\"loading\"\n        [errorState]=\"errorState\"\n        [errorStateTitle]=\"errorStateTitle\"\n        [errorStateDescription]=\"errorStateDescription\"\n        [empty]=\"isEmpty\"\n        [emptyStateTitle]=\"emptyStateTitle\"\n        [emptyStateDescription]=\"emptyStateDescription\"\n        [showEmptyStateIcon]=\"showEmptyStateIcon\"\n        [emptyStateButton]=\"emptyStateButton\"></table>\n    </div>\n  </ng-container>\n\n  <ng-template #defaultTemplate>\n    <div class=\"q-table-default-table-content\">\n      <table\n        q-table-content\n        [theadTemplate]=\"theadTemplate\"\n        [contentTemplate]=\"contentTemplate\"\n        [tableLayout]=\"tableLayout\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [loading]=\"loading\"\n        [errorState]=\"errorState\"\n        [errorStateTitle]=\"errorStateTitle\"\n        [errorStateDescription]=\"errorStateDescription\"\n        [empty]=\"isEmpty\"\n        [emptyStateTitle]=\"emptyStateTitle\"\n        [emptyStateDescription]=\"emptyStateDescription\"\n        [showEmptyStateIcon]=\"showEmptyStateIcon\"\n        [emptyStateButton]=\"emptyStateButton\"></table>\n    </div>\n  </ng-template>\n\n  <q-table-footer\n    *ngIf=\"hasFooter\"\n    [totalItems]=\"totalItems || tableData.length\"\n    [pageSize]=\"pageSize\"\n    [currentPage]=\"currentPage\"\n    [paginationType]=\"paginationType\"\n    [infiniteLoading]=\"infiniteLoading\"\n    [roundedCorners]=\"roundedCorners\" />\n</div>\n\n<ng-template #contentTemplate>\n  <ng-content />\n</ng-template>\n\n<ng-template #emptyStateButton>\n  <ng-content select=\"[q-button][q-table-empty-button],[q-text-button][q-table-empty-button]\" />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-table{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;display:flex;flex-direction:column;width:fit-content;position:relative}.q-table table,.q-table caption,.q-table tbody,.q-table tfoot,.q-table thead,.q-table tr,.q-table th,.q-table td{margin:0;padding:0;border:0}.q-table table{border-collapse:collapse;border-spacing:0}.q-table-rounded-corners td:first-child,.q-table-rounded-corners th:first-child{border-radius:var(--ads-border-radius-s) 0 0 var(--ads-border-radius-s)}.q-table-rounded-corners td:last-child,.q-table-rounded-corners th:last-child{border-radius:0 var(--ads-border-radius-s) var(--ads-border-radius-s) 0}.q-table-rounded-corners .q-table-row-expand td{border-radius:0 0 var(--ads-border-radius-s) var(--ads-border-radius-s)}.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) td:first-child,.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) th:first-child{border-radius:var(--ads-border-radius-s) 0 0 0}.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) td:last-child,.q-table-rounded-corners tr.q-table-row:has(.q-table-row-expanded) th:last-child{border-radius:0 var(--ads-border-radius-s) 0 0}.q-table-body,.q-table-header{overflow-y:overlay;overflow-x:overlay}.q-table-flex-scroll{height:100%}.q-table-flex-scroll .q-table-header{min-height:var(--ads-size-m)}.q-table-flex-scroll .q-table-default-table-content{display:block;overflow:auto}.q-table-flex-scroll .q-table-thead{position:sticky;top:0;z-index:1}@media(max-width:599px){.q-table,.q-table-body,.q-table-header{min-width:100%}}\n"] }]
        }], propDecorators: { pageSizeChanged: [{
                type: Output
            }], pageNumberChanged: [{
                type: Output
            }], hitBottom: [{
                type: Output
            }], paginationType: [{
                type: Input
            }], tableLayout: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], showFooter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], infiniteLoading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], flexScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], errorState: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showEmptyStateIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], roundedCorners: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], errorStateTitle: [{
                type: Input
            }], errorStateDescription: [{
                type: Input
            }], emptyStateTitle: [{
                type: Input
            }], emptyStateDescription: [{
                type: Input
            }], scrollY: [{
                type: Input
            }], scrollX: [{
                type: Input
            }], totalItems: [{
                type: Input
            }], tableData: [{
                type: Input
            }], currentPage: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], paginationMode: [{
                type: Input
            }], _trList: [{
                type: ContentChildren,
                args: [QTableRowComponent, { descendants: true }]
            }], _tableHeaderElement: [{
                type: ViewChild,
                args: ['tableHeaderElement', { read: ElementRef }]
            }], _tableBodyElement: [{
                type: ViewChild,
                args: ['tableBodyElement', { read: ElementRef }]
            }] } });

// vvasylevskyy: We can't deprecate this module because some projects still depend on QTableService module provider (see ADS-748).
class QTableModule {
    _iconRegistryService = inject(QIconRegistryService);
    constructor() {
        this._iconRegistryService.registerIcons([arrowBack, infoOutline, error128]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: QTableModule, imports: [QTableComponent,
            QTableRowComponent,
            QTableHeaderCellComponent,
            QTableDataCellComponent,
            QTableSorterComponent,
            QTableHeaderComponent,
            QTableContentComponent,
            QTableFooterComponent,
            QTableRowExpandComponent,
            QExpandComponent], exports: [QTableComponent,
            QTableRowComponent,
            QTableHeaderCellComponent,
            QTableDataCellComponent,
            QTableHeaderComponent,
            QTableContentComponent,
            QTableFooterComponent,
            QTableRowExpandComponent,
            QExpandComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableModule, providers: [QTableService], imports: [QTableComponent,
            QTableHeaderCellComponent,
            QTableSorterComponent,
            QTableContentComponent,
            QTableFooterComponent,
            QExpandComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        QTableComponent,
                        QTableRowComponent,
                        QTableHeaderCellComponent,
                        QTableDataCellComponent,
                        QTableSorterComponent,
                        QTableHeaderComponent,
                        QTableContentComponent,
                        QTableFooterComponent,
                        QTableRowExpandComponent,
                        QExpandComponent,
                    ],
                    exports: [
                        QTableComponent,
                        QTableRowComponent,
                        QTableHeaderCellComponent,
                        QTableDataCellComponent,
                        QTableHeaderComponent,
                        QTableContentComponent,
                        QTableFooterComponent,
                        QTableRowExpandComponent,
                        QExpandComponent,
                    ],
                    providers: [QTableService],
                }]
        }], ctorParameters: () => [] });

const Q_TABLE_COMPONENTS = [
    QTableComponent,
    QTableContentComponent,
    QTableRowComponent,
    QTableRowExpandComponent,
    QTableHeaderComponent,
    QTableFooterComponent,
    QTableHeaderCellComponent,
    QTableDataCellComponent,
    QExpandComponent,
    QTableSorterComponent,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QExpandComponent, QTableComponent, QTableContentComponent, QTableDataCellComponent, QTableFooterComponent, QTableHeaderCellComponent, QTableHeaderComponent, QTableModule, QTableRowComponent, QTableRowExpandComponent, QTableSorterComponent, Q_TABLE_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-table.mjs.map
