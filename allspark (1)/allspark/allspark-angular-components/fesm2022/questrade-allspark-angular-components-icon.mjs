import * as i0 from '@angular/core';
import { Injectable, inject, ElementRef, Renderer2, DOCUMENT, HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';

class QIconRegistryService {
    _registry = new Map();
    registerIcon(icon) {
        this._registry.set(icon.name, icon.data);
    }
    registerIcons(icons) {
        icons.forEach((icon) => this.registerIcon(icon));
    }
    hasIcon(iconName) {
        return this._registry.has(iconName);
    }
    getIcon(iconName) {
        if (!this._registry.has(iconName)) {
            console.warn(`We couldn't find the icon with the name '${iconName}', did you add it to the Icon registry?`);
            return '';
        }
        return this._registry.get(iconName) || '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QIconRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QIconRegistryService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QIconRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

const SIZE_CLASS_MAP = {
    '12': 'q-icon--xxs',
    '16': 'q-icon--xs',
    '20': 'q-icon--sm',
    '24': 'q-icon--md',
    '40': 'q-icon--lg',
    '48': 'q-icon--xl',
    '56': 'q-icon--56',
    '80': 'q-icon--80',
    '128': 'q-icon--128',
    '400': 'q-icon--400',
    'w-86': 'q-icon-logo--xs',
    'w-103': 'q-icon-logo--s',
    'w-120': 'q-icon-logo--m',
};
/** @dynamic */
class QIconComponent {
    dataQt = 'q-icon';
    get name() {
        return this._name;
    }
    set name(iconName) {
        if (iconName) {
            this._name = iconName;
            this._updateSvgIcon(iconName);
            this._size && this._updateSize(this._size);
        }
    }
    get size() {
        return this._size;
    }
    set size(size) {
        size && this._updateSize(size);
        this._size = size;
    }
    /** @hidden */
    hostClass = 'q-icon';
    get isFlag() {
        return this.name.startsWith('flag');
    }
    _name = '';
    _size;
    _svgIcon = null;
    _elementRef = inject(ElementRef);
    _renderer2 = inject(Renderer2);
    _iconRegistry = inject(QIconRegistryService);
    _document = inject(DOCUMENT);
    _svgElementFromString(svgContent) {
        const div = this._document.createElement('DIV');
        div.innerHTML = svgContent ?? '';
        return (div.querySelector('svg') ||
            this._document.createElementNS('http://www.w3.org/2000/svg', 'path'));
    }
    _updateSvgIcon(iconName) {
        if (this._svgIcon) {
            this._renderer2.removeChild(this._elementRef.nativeElement, this._svgIcon);
        }
        const svgData = this._iconRegistry.getIcon(iconName) || null;
        this._svgIcon = this._svgElementFromString(svgData);
        if (this._svgIcon) {
            this._renderer2.appendChild(this._elementRef.nativeElement, this._svgIcon);
        }
    }
    _updateSize(size) {
        if (this._size) {
            this._renderer2.removeClass(this._elementRef.nativeElement, SIZE_CLASS_MAP[this._size]);
        }
        this._renderer2.addClass(this._elementRef.nativeElement, SIZE_CLASS_MAP[size]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QIconComponent, isStandalone: true, selector: "q-icon", inputs: { dataQt: "dataQt", name: "name", size: "size" }, host: { properties: { "attr.data-qt": "this.dataQt", "attr.name": "this.name", "class": "this.hostClass", "class.q-icon-flag": "this.isFlag" } }, ngImport: i0, template: `<ng-content />`, isInline: true, styles: [".q-icon{display:inline-flex;align-items:center;flex:0 0 auto}.q-icon:not(.q-icon-flag){fill:var(--awds-icon-fill, var(--ads-color-body-700))}.q-icon svg{flex:1}.q-icon.q-icon--xxs{width:var(--awds-icon-xxs-dimensions, var(--awds-icon-dimensions, 12px));height:var(--awds-icon-xxs-dimensions, var(--awds-icon-dimensions, 12px))}.q-icon.q-icon--xs{width:var(--awds-icon-xs-dimensions, var(--awds-icon-dimensions, 16px));height:var(--awds-icon-xs-dimensions, var(--awds-icon-dimensions, 16px))}.q-icon.q-icon--sm{width:var(--awds-icon-sm-dimensions, var(--awds-icon-dimensions, 20px));height:var(--awds-icon-sm-dimensions, var(--awds-icon-dimensions, 20px))}.q-icon.q-icon--md{width:var(--awds-icon-md-dimensions, var(--awds-icon-dimensions, 24px));height:var(--awds-icon-md-dimensions, var(--awds-icon-dimensions, 24px))}.q-icon.q-icon--lg{width:var(--awds-icon-lg-dimensions, var(--awds-icon-dimensions, 40px));height:var(--awds-icon-lg-dimensions, var(--awds-icon-dimensions, 40px))}.q-icon.q-icon--xl{width:var(--awds-icon-xl-dimensions, var(--awds-icon-dimensions, 48px));height:var(--awds-icon-xl-dimensions, var(--awds-icon-dimensions, 48px))}.q-icon.q-icon--56{width:var(--awds-icon-56-dimensions, var(--awds-icon-dimensions, 56px));height:var(--awds-icon-56-dimensions, var(--awds-icon-dimensions, 56px))}.q-icon.q-icon--80{width:var(--awds-icon-80-dimensions, var(--awds-icon-dimensions, 80px));height:var(--awds-icon-80-dimensions, var(--awds-icon-dimensions, 80px))}.q-icon.q-icon--128{width:var(--awds-icon-128-dimensions, var(--awds-icon-dimensions, 128px));height:var(--awds-icon-128-dimensions, var(--awds-icon-dimensions, 128px))}.q-icon.q-icon--400{width:var(--awds-icon-400-dimensions, var(--awds-icon-dimensions, 400px));height:var(--awds-icon-400-dimensions, var(--awds-icon-dimensions, 400px))}.q-icon.q-icon-logo--m{width:var(--awds-icon-logo-m-width, 120px)}.q-icon.q-icon-logo--s{width:var(--awds-icon-logo-s-width, 103px)}.q-icon.q-icon-logo--xs{width:var(--awds-icon-logo-xs-width, 86px)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-icon', template: `<ng-content />`, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".q-icon{display:inline-flex;align-items:center;flex:0 0 auto}.q-icon:not(.q-icon-flag){fill:var(--awds-icon-fill, var(--ads-color-body-700))}.q-icon svg{flex:1}.q-icon.q-icon--xxs{width:var(--awds-icon-xxs-dimensions, var(--awds-icon-dimensions, 12px));height:var(--awds-icon-xxs-dimensions, var(--awds-icon-dimensions, 12px))}.q-icon.q-icon--xs{width:var(--awds-icon-xs-dimensions, var(--awds-icon-dimensions, 16px));height:var(--awds-icon-xs-dimensions, var(--awds-icon-dimensions, 16px))}.q-icon.q-icon--sm{width:var(--awds-icon-sm-dimensions, var(--awds-icon-dimensions, 20px));height:var(--awds-icon-sm-dimensions, var(--awds-icon-dimensions, 20px))}.q-icon.q-icon--md{width:var(--awds-icon-md-dimensions, var(--awds-icon-dimensions, 24px));height:var(--awds-icon-md-dimensions, var(--awds-icon-dimensions, 24px))}.q-icon.q-icon--lg{width:var(--awds-icon-lg-dimensions, var(--awds-icon-dimensions, 40px));height:var(--awds-icon-lg-dimensions, var(--awds-icon-dimensions, 40px))}.q-icon.q-icon--xl{width:var(--awds-icon-xl-dimensions, var(--awds-icon-dimensions, 48px));height:var(--awds-icon-xl-dimensions, var(--awds-icon-dimensions, 48px))}.q-icon.q-icon--56{width:var(--awds-icon-56-dimensions, var(--awds-icon-dimensions, 56px));height:var(--awds-icon-56-dimensions, var(--awds-icon-dimensions, 56px))}.q-icon.q-icon--80{width:var(--awds-icon-80-dimensions, var(--awds-icon-dimensions, 80px));height:var(--awds-icon-80-dimensions, var(--awds-icon-dimensions, 80px))}.q-icon.q-icon--128{width:var(--awds-icon-128-dimensions, var(--awds-icon-dimensions, 128px));height:var(--awds-icon-128-dimensions, var(--awds-icon-dimensions, 128px))}.q-icon.q-icon--400{width:var(--awds-icon-400-dimensions, var(--awds-icon-dimensions, 400px));height:var(--awds-icon-400-dimensions, var(--awds-icon-dimensions, 400px))}.q-icon.q-icon-logo--m{width:var(--awds-icon-logo-m-width, 120px)}.q-icon.q-icon-logo--s{width:var(--awds-icon-logo-s-width, 103px)}.q-icon.q-icon-logo--xs{width:var(--awds-icon-logo-xs-width, 86px)}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], name: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.name']
            }], size: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], isFlag: [{
                type: HostBinding,
                args: ['class.q-icon-flag']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QIconComponent, QIconRegistryService };
//# sourceMappingURL=questrade-allspark-angular-components-icon.mjs.map
