import * as i0 from '@angular/core';
import { isDevMode, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';

class QSpinnerComponent {
    variant = 'primary';
    size = 'medium';
    dataQt = 'q-spinner';
    // These static values come from the "Ellipse" element used in the Spinner Figma file.
    static _svgViewBox = {
        'x-small': '0 0 16 16',
        small: '0 0 18 18',
        medium: '0 0 34 34',
        large: '0 0 53 53',
    };
    static _size = {
        'x-small': 16,
        small: 18,
        medium: 34,
        large: 53,
    };
    static _stroke = {
        'x-small': 2,
        small: 2,
        medium: 4,
        large: 5,
    };
    static _svgData = {
        'x-small': {
            path: 'M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8',
        },
        small: {
            path: 'M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9',
        },
        medium: {
            path: 'M17 32C25.2843 32 32 25.2843 32 17C32 8.71573 25.2843 2 17 2C8.71573 2 2 8.71573 2 17',
        },
        large: {
            path: 'M26.5 50.5C39.7548 50.5 50.5 39.7548 50.5 26.5C50.5 13.2452 39.7548 2.5 26.5 2.5C13.2452 2.5 2.5 13.2452 2.5 26.5',
        },
    };
    ngOnInit() {
        // TODO: Remove this warning in version 23
        if (isDevMode()) {
            console.warn(`QSpinnerComponent: The spinner is no longer absolutely positioned. 
If your implementation relies on absolute positioning, please update your code to handle positioning. 
The spinner now uses default static position and will follow normal document flow.`);
        }
    }
    get viewBox() {
        return QSpinnerComponent._svgViewBox[this.size];
    }
    get path() {
        return QSpinnerComponent._svgData[this.size].path;
    }
    get sizeValue() {
        return QSpinnerComponent._size[this.size];
    }
    get strokeWidth() {
        return QSpinnerComponent._stroke[this.size];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QSpinnerComponent, isStandalone: true, selector: "q-spinner", inputs: { variant: "variant", size: "size", dataQt: "dataQt" }, host: { properties: { "class": "\n        [\n          'q-spinner',\n          'q-spinner-' + size,\n          'q-spinner-' + variant\n        ].join(' ')\n      ", "attr.data-qt": "this.dataQt" } }, ngImport: i0, template: "<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"q-spinner-svg\"\n  fill=\"none\"\n  [attr.width]=\"sizeValue\"\n  [attr.height]=\"sizeValue\"\n  [attr.viewBox]=\"viewBox\">\n  <path\n    class=\"q-spinner-path\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n    [attr.d]=\"path\"\n    [attr.stroke-width]=\"strokeWidth\"></path>\n</svg>\n", styles: [".q-spinner{display:flex;justify-content:center;align-items:center}.q-spinner-x-small{width:var(--awds-spinner-x-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-xs)));height:var(--awds-spinner-x-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-xs)))}.q-spinner-small{width:var(--awds-spinner-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-s)));height:var(--awds-spinner-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-s)))}.q-spinner-medium{width:var(--awds-spinner-medium-dimensions, var(--awds-spinner-dimensions, var(--ads-size-l)));height:var(--awds-spinner-medium-dimensions, var(--awds-spinner-dimensions, var(--ads-size-l)))}.q-spinner-large{width:var(--awds-spinner-large-dimensions, var(--awds-spinner-dimensions, var(--ads-size-huge)));height:var(--awds-spinner-large-dimensions, var(--awds-spinner-dimensions, var(--ads-size-huge)))}.q-spinner-primary .q-spinner-svg .q-spinner-path{stroke:var(--ads-color-primary-400)}.q-spinner-secondary .q-spinner-svg .q-spinner-path{stroke:var(--ads-color-body-100)}.q-spinner-inherit .q-spinner-svg .q-spinner-path{stroke:currentColor}@keyframes rotate-initial-spinner{0%{transform:rotate(270deg)}to{transform:rotate(990deg)}}.q-spinner .q-spinner-svg{animation-name:rotate-initial-spinner;animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:linear}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-spinner', host: {
                        '[class]': `
        [
          'q-spinner',
          'q-spinner-' + size,
          'q-spinner-' + variant
        ].join(' ')
      `,
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"q-spinner-svg\"\n  fill=\"none\"\n  [attr.width]=\"sizeValue\"\n  [attr.height]=\"sizeValue\"\n  [attr.viewBox]=\"viewBox\">\n  <path\n    class=\"q-spinner-path\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n    [attr.d]=\"path\"\n    [attr.stroke-width]=\"strokeWidth\"></path>\n</svg>\n", styles: [".q-spinner{display:flex;justify-content:center;align-items:center}.q-spinner-x-small{width:var(--awds-spinner-x-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-xs)));height:var(--awds-spinner-x-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-xs)))}.q-spinner-small{width:var(--awds-spinner-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-s)));height:var(--awds-spinner-small-dimensions, var(--awds-spinner-dimensions, var(--ads-size-s)))}.q-spinner-medium{width:var(--awds-spinner-medium-dimensions, var(--awds-spinner-dimensions, var(--ads-size-l)));height:var(--awds-spinner-medium-dimensions, var(--awds-spinner-dimensions, var(--ads-size-l)))}.q-spinner-large{width:var(--awds-spinner-large-dimensions, var(--awds-spinner-dimensions, var(--ads-size-huge)));height:var(--awds-spinner-large-dimensions, var(--awds-spinner-dimensions, var(--ads-size-huge)))}.q-spinner-primary .q-spinner-svg .q-spinner-path{stroke:var(--ads-color-primary-400)}.q-spinner-secondary .q-spinner-svg .q-spinner-path{stroke:var(--ads-color-body-100)}.q-spinner-inherit .q-spinner-svg .q-spinner-path{stroke:currentColor}@keyframes rotate-initial-spinner{0%{transform:rotate(270deg)}to{transform:rotate(990deg)}}.q-spinner .q-spinner-svg{animation-name:rotate-initial-spinner;animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:linear}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QSpinnerComponent };
//# sourceMappingURL=questrade-allspark-angular-components-spinner.mjs.map
