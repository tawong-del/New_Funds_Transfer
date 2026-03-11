import { coerceCssPixelValue } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';

class QSkeletonComponent {
    width = '100%';
    height = 'var(--ads-size-s)';
    radius = 'var(--ads-border-radius-xl)';
    dataQt = 'q-skeleton';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QSkeletonComponent, isStandalone: true, selector: "q-skeleton", inputs: { width: ["width", "width", coerceCssPixelValue], height: ["height", "height", coerceCssPixelValue], radius: ["radius", "radius", coerceCssPixelValue], dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt" } }, ngImport: i0, template: `
    <div
      class="q-skeleton"
      aria-hidden="true"
      [style.width]="width"
      [style.height]="height"
      [style.border-radius]="radius"></div>
  `, isInline: true, styles: [".q-skeleton{background:var(--ads-color-body-700);opacity:.05;animation:q-skeleton-loading 1.5s ease-in-out infinite}@keyframes q-skeleton-loading{0%{opacity:.05}50%{opacity:.03}to{opacity:.05}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSkeletonComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, selector: 'q-skeleton', template: `
    <div
      class="q-skeleton"
      aria-hidden="true"
      [style.width]="width"
      [style.height]="height"
      [style.border-radius]="radius"></div>
  `, styles: [".q-skeleton{background:var(--ads-color-body-700);opacity:.05;animation:q-skeleton-loading 1.5s ease-in-out infinite}@keyframes q-skeleton-loading{0%{opacity:.05}50%{opacity:.03}to{opacity:.05}}\n"] }]
        }], propDecorators: { width: [{
                type: Input,
                args: [{ transform: coerceCssPixelValue }]
            }], height: [{
                type: Input,
                args: [{ transform: coerceCssPixelValue }]
            }], radius: [{
                type: Input,
                args: [{ transform: coerceCssPixelValue }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QSkeletonComponent };
//# sourceMappingURL=questrade-allspark-angular-components-skeleton.mjs.map
