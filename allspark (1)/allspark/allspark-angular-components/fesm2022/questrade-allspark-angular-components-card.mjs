import * as i0 from '@angular/core';
import { EventEmitter, booleanAttribute, HostListener, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { ENTER } from '@questrade/allspark-angular-components/core/utils';

class QCardComponent {
    selectedChange = new EventEmitter();
    selected = false;
    selectable = false;
    variant = 'outline';
    dataQt = 'q-card';
    get hostTabindex() {
        return this.selectable ? 0 : null;
    }
    get hostClasses() {
        return [
            'q-card',
            this.selectable && 'q-card-selectable',
            this.selected && 'q-card-selected',
            `q-card-${this.variant}`,
            'q-focus-indicator-inset',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _onCardClick(event) {
        if (!this.selectable)
            return;
        event.stopPropagation();
        this.selected = !this.selected;
        this.selectedChange.emit(this.selected);
    }
    _onKeyDown(event) {
        if (event.code === ENTER)
            this._onCardClick(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QCardComponent, isStandalone: true, selector: "q-card", inputs: { selected: ["selected", "selected", booleanAttribute], selectable: ["selectable", "selectable", booleanAttribute], variant: "variant", dataQt: "dataQt" }, outputs: { selectedChange: "selectedChange" }, host: { listeners: { "click": "_onCardClick($event)", "keydown": "_onKeyDown($event)" }, properties: { "attr.data-qt": "this.dataQt", "attr.tabindex": "this.hostTabindex", "class": "this.hostClasses" } }, ngImport: i0, template: '<ng-content />', isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-card{font-family:var(--awds-card-container-font-family, var(--ads-font-family-body));font-size:var(--awds-card-container-font-size, var(--ads-font-size-xs));font-style:var(--awds-card-container-font-style, inherit);font-weight:var(--awds-card-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-card-container-letter-spacing, 0);line-height:var(--awds-card-container-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-card-container-text-transform, none);display:block;background:var(--awds-card-container-background, var(--ads-color-elevation-raised, var(--ads-color-body-100)));border-radius:var(--awds-card-container-border-radius, var(--ads-border-radius-s));padding:var(--awds-card-container-padding, var(--ads-size-s));min-width:var(--awds-card-container-min-width);min-height:var(--awds-card-container-min-height)}.q-card-selectable:hover{cursor:pointer;background:var(--awds-card-selectable-hover-container-background, var(--ads-color-body-200))}.q-card-outline{background:var(--awds-card-outline-container-background, var(--ads-color-body-100));outline:var(--awds-card-outline-container-outline, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-card-elevated,.q-card-selected,.q-card:focus-visible{outline:none}.q-card-elevated{box-shadow:var(--awds-card-elevated-container-box-shadow, var(--ads-elevation-raised-shadow-position-x) var(--ads-elevation-raised-shadow-position-y) var(--ads-elevation-raised-shadow-blur) var(--ads-elevation-raised-shadow-spread) var(--ads-elevation-raised-shadow-color))}.q-card-selected{box-shadow:var(--awds-card-selected-container-box-shadow, 0 0 0 2px var(--ads-color-primary-400))}.q-card-elevated.q-card-selected{box-shadow:var(--awds-card-elevated-selected-container-box-shadow, 0 0 0 2px var(--ads-color-primary-400), 1px 3px 1px rgba(0, 0, 0, .25))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QCardComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-card', template: '<ng-content />', styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-card{font-family:var(--awds-card-container-font-family, var(--ads-font-family-body));font-size:var(--awds-card-container-font-size, var(--ads-font-size-xs));font-style:var(--awds-card-container-font-style, inherit);font-weight:var(--awds-card-container-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-card-container-letter-spacing, 0);line-height:var(--awds-card-container-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-card-container-text-transform, none);display:block;background:var(--awds-card-container-background, var(--ads-color-elevation-raised, var(--ads-color-body-100)));border-radius:var(--awds-card-container-border-radius, var(--ads-border-radius-s));padding:var(--awds-card-container-padding, var(--ads-size-s));min-width:var(--awds-card-container-min-width);min-height:var(--awds-card-container-min-height)}.q-card-selectable:hover{cursor:pointer;background:var(--awds-card-selectable-hover-container-background, var(--ads-color-body-200))}.q-card-outline{background:var(--awds-card-outline-container-background, var(--ads-color-body-100));outline:var(--awds-card-outline-container-outline, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-card-elevated,.q-card-selected,.q-card:focus-visible{outline:none}.q-card-elevated{box-shadow:var(--awds-card-elevated-container-box-shadow, var(--ads-elevation-raised-shadow-position-x) var(--ads-elevation-raised-shadow-position-y) var(--ads-elevation-raised-shadow-blur) var(--ads-elevation-raised-shadow-spread) var(--ads-elevation-raised-shadow-color))}.q-card-selected{box-shadow:var(--awds-card-selected-container-box-shadow, 0 0 0 2px var(--ads-color-primary-400))}.q-card-elevated.q-card-selected{box-shadow:var(--awds-card-elevated-selected-container-box-shadow, 0 0 0 2px var(--ads-color-primary-400), 1px 3px 1px rgba(0, 0, 0, .25))}\n"] }]
        }], propDecorators: { selectedChange: [{
                type: Output
            }], selected: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], variant: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], hostTabindex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }], _onCardClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QCardComponent };
//# sourceMappingURL=questrade-allspark-angular-components-card.mjs.map
