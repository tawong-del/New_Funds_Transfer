import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import * as i0 from '@angular/core';
import { EventEmitter, inject, booleanAttribute, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { QChipComponent } from '@questrade/allspark-angular-components/chip';
import { QIconRegistryService } from '@questrade/allspark-angular-components/icon';
import { chevronUp, chevronDown } from '@questrade/allspark-icons/icons';

class QSpoilerComponent {
    changed = new EventEmitter();
    chipTextStyle = 'primary';
    chipType = 'regular';
    showChipIcon = false;
    disabled = false;
    dataQt = 'q-spoiler';
    showText = 'Show';
    hideText = 'Hide';
    _hostClass = 'q-spoiler';
    _opened = false;
    _iconRegistry = inject(QIconRegistryService);
    constructor() {
        this._iconRegistry.registerIcons([chevronUp, chevronDown]);
    }
    _onChipChanged(event) {
        this._opened = event.active;
        this.changed.emit({ opened: event.active });
    }
    get chipIcon() {
        return this.showChipIcon ? (this._opened ? 'chevronUp' : 'chevronDown') : '';
    }
    get chipText() {
        return this._opened ? this.hideText : this.showText;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSpoilerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QSpoilerComponent, isStandalone: true, selector: "q-spoiler", inputs: { chipTextStyle: "chipTextStyle", chipType: "chipType", showChipIcon: ["showChipIcon", "showChipIcon", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute], dataQt: "dataQt", showText: "showText", hideText: "hideText" }, outputs: { changed: "changed" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClass" } }, ngImport: i0, template: "<span [attr.hidden]=\"!_opened || null\" [@expansionFade]=\"_opened ? 'expanded' : 'collapsed'\">\n  <ng-content />\n</span>\n\n<div class=\"q-spoiler-chip\">\n  <q-chip\n    [type]=\"chipType\"\n    [textStyle]=\"chipTextStyle === 'primary' ? 'secondary' : 'primary'\"\n    [checkType]=\"'none'\"\n    [icon]=\"chipIcon\"\n    [iconPosition]=\"'right'\"\n    [toggleOnClick]=\"true\"\n    [disabled]=\"disabled\"\n    (changed)=\"_onChipChanged($event)\">\n    <span [@textTransition]=\"_opened ? 'showText' : 'hideText'\">{{ chipText }}</span>\n  </q-chip>\n</div>\n", styles: [".q-spoiler-chip{margin-top:6px}\n"], dependencies: [{ kind: "component", type: QChipComponent, selector: "q-chip", inputs: ["isIconChip", "toggleActiveIconColor", "toggleOnClick", "isDropdown", "error", "readonly", "value", "iconPosition", "textStyle", "dataQt", "type", "showCheckIcon", "checkType", "active", "toggleActiveIcon", "disabled", "icon", "toggleRightIcon"], outputs: ["changed", "iconClicked"] }], animations: [
            trigger('expansionFade', [
                state('collapsed', style({ opacity: 0 })),
                state('expanded', style({ opacity: 1 })),
                transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
            ]),
            trigger('textTransition', [
                state('showText', style({ opacity: 1 })),
                transition('showText <=> hideText', [
                    animate('300ms ease-in-out', keyframes([style({ opacity: 0, offset: 0 }), style({ opacity: 1, offset: 1 })])),
                ]),
            ]),
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSpoilerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-spoiler', imports: [QChipComponent], animations: [
                        trigger('expansionFade', [
                            state('collapsed', style({ opacity: 0 })),
                            state('expanded', style({ opacity: 1 })),
                            transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
                        ]),
                        trigger('textTransition', [
                            state('showText', style({ opacity: 1 })),
                            transition('showText <=> hideText', [
                                animate('300ms ease-in-out', keyframes([style({ opacity: 0, offset: 0 }), style({ opacity: 1, offset: 1 })])),
                            ]),
                        ]),
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<span [attr.hidden]=\"!_opened || null\" [@expansionFade]=\"_opened ? 'expanded' : 'collapsed'\">\n  <ng-content />\n</span>\n\n<div class=\"q-spoiler-chip\">\n  <q-chip\n    [type]=\"chipType\"\n    [textStyle]=\"chipTextStyle === 'primary' ? 'secondary' : 'primary'\"\n    [checkType]=\"'none'\"\n    [icon]=\"chipIcon\"\n    [iconPosition]=\"'right'\"\n    [toggleOnClick]=\"true\"\n    [disabled]=\"disabled\"\n    (changed)=\"_onChipChanged($event)\">\n    <span [@textTransition]=\"_opened ? 'showText' : 'hideText'\">{{ chipText }}</span>\n  </q-chip>\n</div>\n", styles: [".q-spoiler-chip{margin-top:6px}\n"] }]
        }], ctorParameters: () => [], propDecorators: { changed: [{
                type: Output
            }], chipTextStyle: [{
                type: Input
            }], chipType: [{
                type: Input
            }], showChipIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], showText: [{
                type: Input
            }], hideText: [{
                type: Input
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QSpoilerComponent };
//# sourceMappingURL=questrade-allspark-angular-components-spoiler.mjs.map
