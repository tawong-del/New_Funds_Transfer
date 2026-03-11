import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { NgClass } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, inject, booleanAttribute, HostListener, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { accordionAnimations } from '@questrade/allspark-angular-components/core/animations';
import { ENTER, SPACE } from '@questrade/allspark-angular-components/core/utils';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { chevronDown } from '@questrade/allspark-icons/icons';

class QExpansionTriggerComponent {
    activeChange = new EventEmitter();
    active = false;
    get tabIndex() {
        return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = coerceNumberProperty(value, 0);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this.disabled) {
            this.active = false;
        }
    }
    _role = 'button';
    get _hostClasses() {
        return ['q-expansion-trigger', this._tabIndex > -1 && !this.disabled && 'q-focus-indicator']
            .filter(Boolean)
            .join(' ');
    }
    _onClick = () => this.onTriggerInteraction();
    _onKeydown = (event) => this.onKeydown(event);
    _disabled = false;
    _tabIndex = 0;
    _iconRegistry = inject(QIconRegistryService);
    constructor() {
        this._iconRegistry.registerIcon(chevronDown);
    }
    onTriggerInteraction() {
        if (!this.disabled) {
            this.toggle();
            this.activeChange.emit(this.active);
        }
    }
    toggle() {
        this.active = !this.active;
    }
    onKeydown(event) {
        switch (event.code) {
            case SPACE:
            case ENTER:
                if (!hasModifierKey(event)) {
                    event.preventDefault();
                    this.onTriggerInteraction();
                }
                break;
            default:
                return;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QExpansionTriggerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QExpansionTriggerComponent, isStandalone: true, selector: "q-expansion-trigger", inputs: { active: ["active", "active", booleanAttribute], tabIndex: "tabIndex", disabled: "disabled" }, outputs: { activeChange: "activeChange" }, host: { listeners: { "click": "_onClick($event)", "keydown": "_onKeydown($event)" }, properties: { "attr.aria-expanded": "this.active", "attr.tabIndex": "this.tabIndex", "attr.role": "this._role", "attr.class": "this._hostClasses" } }, ngImport: i0, template: `
    <q-icon
      [name]="'chevronDown'"
      class="q-expansion-trigger-icon"
      [ngClass]="{ 'q-expansion-trigger-disabled': disabled }"
      [size]="'24'"
      [dataQt]="'q-expansion-trigger-chevron'"
      [@triggerRotate]="active ? 'expanded' : 'collapsed'" />
  `, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-expansion-trigger{display:block;width:fit-content}q-icon.q-icon.q-expansion-trigger-icon{display:block;cursor:pointer;outline:none;fill:var(--ads-color-body-contrast-100)}q-icon.q-icon.q-expansion-trigger-icon.q-expansion-trigger-disabled{cursor:default;fill:var(--ads-color-body-400)}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }], animations: [accordionAnimations.triggerRotate], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QExpansionTriggerComponent, decorators: [{
            type: Component,
            args: [{ imports: [NgClass, QIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, animations: [accordionAnimations.triggerRotate], selector: 'q-expansion-trigger', template: `
    <q-icon
      [name]="'chevronDown'"
      class="q-expansion-trigger-icon"
      [ngClass]="{ 'q-expansion-trigger-disabled': disabled }"
      [size]="'24'"
      [dataQt]="'q-expansion-trigger-chevron'"
      [@triggerRotate]="active ? 'expanded' : 'collapsed'" />
  `, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-expansion-trigger{display:block;width:fit-content}q-icon.q-icon.q-expansion-trigger-icon{display:block;cursor:pointer;outline:none;fill:var(--ads-color-body-contrast-100)}q-icon.q-icon.q-expansion-trigger-icon.q-expansion-trigger-disabled{cursor:default;fill:var(--ads-color-body-400)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { activeChange: [{
                type: Output
            }], active: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['attr.aria-expanded']
            }], tabIndex: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.tabIndex']
            }], disabled: [{
                type: Input
            }], _role: [{
                type: HostBinding,
                args: ['attr.role']
            }], _hostClasses: [{
                type: HostBinding,
                args: ['attr.class']
            }], _onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QExpansionTriggerComponent };
//# sourceMappingURL=questrade-allspark-angular-components-core-components.mjs.map
