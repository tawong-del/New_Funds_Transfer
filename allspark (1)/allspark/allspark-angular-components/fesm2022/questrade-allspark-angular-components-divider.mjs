import * as i0 from '@angular/core';
import { HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';

class QDividerComponent {
    type = 'normal';
    style = 'line';
    orientation = 'horizontal';
    dataQt = 'q-divider';
    _role = 'separator';
    get ariaOrientation() {
        return this.orientation;
    }
    get hostClasses() {
        return [
            'q-divider',
            `q-divider-${this.type}`,
            `q-divider-${this.style}`,
            `q-divider-${this.orientation}`,
        ].join(' ');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QDividerComponent, isStandalone: true, selector: "q-divider", inputs: { type: "type", style: "style", orientation: "orientation", dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "attr.role": "this._role", "attr.aria-orientation": "this.ariaOrientation", "class": "this.hostClasses" } }, ngImport: i0, template: '', isInline: true, styles: [".q-divider{display:block;margin:var(--awds-divider-container-margin, 0);border-color:var(--awds-divider-container-border-color, var(--ads-color-body-400));border-style:solid;border-width:var(--awds-divider-container-border-width, var(--ads-border-width-hairline));flex-shrink:1;opacity:var(--awds-divider-container-opacity, 1)}.q-divider.q-divider-thick{border-width:var(--awds-divider-thick-container-border-width, var(--ads-border-width-heavy))}.q-divider.q-divider-dash{border-style:dashed}.q-divider.q-divider-light{opacity:var(--awds-divider-light-container-opacity, .5)}.q-divider.q-divider-faded{border-color:var(--awds-divider-faded-container-border-color, var(--ads-color-body-300));opacity:var(--awds-divider-faded-container-opacity, 1)}.q-divider.q-divider-horizontal{border-bottom:0;height:0}.q-divider.q-divider-vertical{border-right:0;width:0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-divider', template: '', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".q-divider{display:block;margin:var(--awds-divider-container-margin, 0);border-color:var(--awds-divider-container-border-color, var(--ads-color-body-400));border-style:solid;border-width:var(--awds-divider-container-border-width, var(--ads-border-width-hairline));flex-shrink:1;opacity:var(--awds-divider-container-opacity, 1)}.q-divider.q-divider-thick{border-width:var(--awds-divider-thick-container-border-width, var(--ads-border-width-heavy))}.q-divider.q-divider-dash{border-style:dashed}.q-divider.q-divider-light{opacity:var(--awds-divider-light-container-opacity, .5)}.q-divider.q-divider-faded{border-color:var(--awds-divider-faded-container-border-color, var(--ads-color-body-300));opacity:var(--awds-divider-faded-container-opacity, 1)}.q-divider.q-divider-horizontal{border-bottom:0;height:0}.q-divider.q-divider-vertical{border-right:0;width:0}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], style: [{
                type: Input
            }], orientation: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaOrientation: [{
                type: HostBinding,
                args: ['attr.aria-orientation']
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QDividerComponent };
//# sourceMappingURL=questrade-allspark-angular-components-divider.mjs.map
