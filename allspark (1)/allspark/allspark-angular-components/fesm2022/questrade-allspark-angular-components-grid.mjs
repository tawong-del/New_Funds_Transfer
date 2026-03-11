import * as i0 from '@angular/core';
import { booleanAttribute, HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, forwardRef, ContentChildren } from '@angular/core';

const MIN_VALUE = 1;
const MAX_VALUES = {
    xxs: 4,
    xs: 8,
    sm: 8,
    md: 12,
    lg: 12,
    xl: 12,
};
class QGridRowComponent {
    contentType = 'primary';
    extraSpacingRight = false;
    extraSpacingLeft = false;
    dataQt = 'q-grid-row';
    get xxs() {
        return this._xxs;
    }
    set xxs(value) {
        if (value > MAX_VALUES.xxs) {
            this._xxs = MAX_VALUES.xxs;
        }
        else if (value < MIN_VALUE) {
            this._xxs = MIN_VALUE;
        }
        else {
            this._xxs = value;
        }
    }
    get xs() {
        return this._xs;
    }
    set xs(value) {
        if (value > MAX_VALUES.xs) {
            this._xs = MAX_VALUES.xs;
        }
        else if (value < MIN_VALUE) {
            this._xs = MIN_VALUE;
        }
        else {
            this._xs = value;
        }
    }
    get sm() {
        return this._sm;
    }
    set sm(value) {
        if (value > MAX_VALUES.sm) {
            this._sm = MAX_VALUES.sm;
        }
        else if (value < MIN_VALUE) {
            this._sm = MIN_VALUE;
        }
        else {
            this._sm = value;
        }
    }
    get md() {
        return this._md;
    }
    set md(value) {
        if (value > MAX_VALUES.md) {
            this._md = MAX_VALUES.md;
        }
        else if (value < MIN_VALUE) {
            this._md = MIN_VALUE;
        }
        else {
            this._md = value;
        }
    }
    get lg() {
        return this._lg;
    }
    set lg(value) {
        if (value > MAX_VALUES.lg) {
            this._lg = MAX_VALUES.lg;
        }
        else if (value < MIN_VALUE) {
            this._lg = MIN_VALUE;
        }
        else {
            this._lg = value;
        }
    }
    get xl() {
        return this._xl;
    }
    set xl(value) {
        if (value > MAX_VALUES.xl) {
            this._xl = MAX_VALUES.xl;
        }
        else if (value < MIN_VALUE) {
            this._xl = MIN_VALUE;
        }
        else {
            this._xl = value;
        }
    }
    get hostClasses() {
        return this._classNames();
    }
    _xxs = MAX_VALUES.xxs;
    _xs = 0;
    _sm = 0;
    _md = 0;
    _lg = 0;
    _xl = 0;
    _addExtraPaddingRight() {
        this.extraSpacingRight = true;
    }
    _addExtraPaddingLeft() {
        this.extraSpacingLeft = true;
    }
    _classNames() {
        return `
      q-grid-row
      ${this.getSizeClass('xxs')}
      ${this.getSizeClass('xs')}
      ${this.getSizeClass('sm')}
      ${this.getSizeClass('md')}
      ${this.getSizeClass('lg')}
      ${this.getSizeClass('xl')}
      ${this.contentType}
      ${this.extraSpacingRight ? 'x-spacing-r' : ''}
      ${this.extraSpacingLeft ? 'x-spacing-l' : ''}
    `;
    }
    getSizeClass(size) {
        const thisSizeClass = this[size];
        if (thisSizeClass) {
            return `${size}-${thisSizeClass}`;
        }
        return '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QGridRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QGridRowComponent, isStandalone: true, selector: "q-grid-row", inputs: { contentType: "contentType", extraSpacingRight: ["extraSpacingRight", "extraSpacingRight", booleanAttribute], extraSpacingLeft: ["extraSpacingLeft", "extraSpacingLeft", booleanAttribute], dataQt: "dataQt", xxs: "xxs", xs: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClasses" } }, ngImport: i0, template: `<ng-content />`, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-grid-row{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;flex-grow:0;flex-shrink:0}.q-grid-row.xxs-1{width:25%}.q-grid-row.xxs-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xxs-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xxs-2{width:50%}.q-grid-row.xxs-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xxs-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xxs-3{width:75%}.q-grid-row.xxs-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xxs-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xxs-4{width:100%}@media(min-width:600px){.q-grid-row.xs-1{width:12.5%}.q-grid-row.xs-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-2{width:25%}.q-grid-row.xs-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-3{width:37.5%}.q-grid-row.xs-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-4{width:50%}.q-grid-row.xs-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-5{width:62.5%}.q-grid-row.xs-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-6{width:75%}.q-grid-row.xs-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-7{width:87.5%}.q-grid-row.xs-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-8{width:100%}}@media(min-width:840px){.q-grid-row.sm-1{width:12.5%}.q-grid-row.sm-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-2{width:25%}.q-grid-row.sm-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-3{width:37.5%}.q-grid-row.sm-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-4{width:50%}.q-grid-row.sm-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-5{width:62.5%}.q-grid-row.sm-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-6{width:75%}.q-grid-row.sm-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-7{width:87.5%}.q-grid-row.sm-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-8{width:100%}}@media(min-width:1020px){.q-grid-row.md-1{width:8.3333333333%}.q-grid-row.md-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-2{width:16.6666666667%}.q-grid-row.md-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-3{width:25%}.q-grid-row.md-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-4{width:33.3333333333%}.q-grid-row.md-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-5{width:41.6666666667%}.q-grid-row.md-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-6{width:50%}.q-grid-row.md-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-7{width:58.3333333333%}.q-grid-row.md-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-8{width:66.6666666667%}.q-grid-row.md-8.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-8.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-9{width:75%}.q-grid-row.md-9.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-9.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-10{width:83.3333333333%}.q-grid-row.md-10.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-10.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-11{width:91.6666666667%}.q-grid-row.md-11.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-11.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-12{width:100%}}@media(min-width:1280px){.q-grid-row.lg-1{width:8.3333333333%}.q-grid-row.lg-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-2{width:16.6666666667%}.q-grid-row.lg-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-3{width:25%}.q-grid-row.lg-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-4{width:33.3333333333%}.q-grid-row.lg-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-5{width:41.6666666667%}.q-grid-row.lg-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-6{width:50%}.q-grid-row.lg-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-7{width:58.3333333333%}.q-grid-row.lg-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-8{width:66.6666666667%}.q-grid-row.lg-8.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-8.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-9{width:75%}.q-grid-row.lg-9.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-9.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-10{width:83.3333333333%}.q-grid-row.lg-10.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-10.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-11{width:91.6666666667%}.q-grid-row.lg-11.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-11.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-12{width:100%}}@media(min-width:1920px){.q-grid-row.xl-1{width:8.3333333333%}.q-grid-row.xl-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-2{width:16.6666666667%}.q-grid-row.xl-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-3{width:25%}.q-grid-row.xl-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-4{width:33.3333333333%}.q-grid-row.xl-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-5{width:41.6666666667%}.q-grid-row.xl-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-6{width:50%}.q-grid-row.xl-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-7{width:58.3333333333%}.q-grid-row.xl-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-8{width:66.6666666667%}.q-grid-row.xl-8.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-8.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-9{width:75%}.q-grid-row.xl-9.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-9.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-10{width:83.3333333333%}.q-grid-row.xl-10.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-10.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-11{width:91.6666666667%}.q-grid-row.xl-11.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-11.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-12{width:100%}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QGridRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-grid-row', template: `<ng-content />`, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-grid-row{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;flex-grow:0;flex-shrink:0}.q-grid-row.xxs-1{width:25%}.q-grid-row.xxs-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xxs-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xxs-2{width:50%}.q-grid-row.xxs-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xxs-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xxs-3{width:75%}.q-grid-row.xxs-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xxs-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xxs-4{width:100%}@media(min-width:600px){.q-grid-row.xs-1{width:12.5%}.q-grid-row.xs-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-2{width:25%}.q-grid-row.xs-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-3{width:37.5%}.q-grid-row.xs-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-4{width:50%}.q-grid-row.xs-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-5{width:62.5%}.q-grid-row.xs-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-6{width:75%}.q-grid-row.xs-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-7{width:87.5%}.q-grid-row.xs-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xs-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xs-8{width:100%}}@media(min-width:840px){.q-grid-row.sm-1{width:12.5%}.q-grid-row.sm-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-2{width:25%}.q-grid-row.sm-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-3{width:37.5%}.q-grid-row.sm-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-4{width:50%}.q-grid-row.sm-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-5{width:62.5%}.q-grid-row.sm-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-6{width:75%}.q-grid-row.sm-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-7{width:87.5%}.q-grid-row.sm-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.sm-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.sm-8{width:100%}}@media(min-width:1020px){.q-grid-row.md-1{width:8.3333333333%}.q-grid-row.md-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-2{width:16.6666666667%}.q-grid-row.md-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-3{width:25%}.q-grid-row.md-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-4{width:33.3333333333%}.q-grid-row.md-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-5{width:41.6666666667%}.q-grid-row.md-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-6{width:50%}.q-grid-row.md-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-7{width:58.3333333333%}.q-grid-row.md-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-8{width:66.6666666667%}.q-grid-row.md-8.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-8.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-9{width:75%}.q-grid-row.md-9.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-9.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-10{width:83.3333333333%}.q-grid-row.md-10.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-10.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-11{width:91.6666666667%}.q-grid-row.md-11.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.md-11.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.md-12{width:100%}}@media(min-width:1280px){.q-grid-row.lg-1{width:8.3333333333%}.q-grid-row.lg-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-2{width:16.6666666667%}.q-grid-row.lg-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-3{width:25%}.q-grid-row.lg-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-4{width:33.3333333333%}.q-grid-row.lg-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-5{width:41.6666666667%}.q-grid-row.lg-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-6{width:50%}.q-grid-row.lg-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-7{width:58.3333333333%}.q-grid-row.lg-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-8{width:66.6666666667%}.q-grid-row.lg-8.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-8.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-9{width:75%}.q-grid-row.lg-9.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-9.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-10{width:83.3333333333%}.q-grid-row.lg-10.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-10.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-11{width:91.6666666667%}.q-grid-row.lg-11.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.lg-11.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.lg-12{width:100%}}@media(min-width:1920px){.q-grid-row.xl-1{width:8.3333333333%}.q-grid-row.xl-1.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-1.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-2{width:16.6666666667%}.q-grid-row.xl-2.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-2.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-3{width:25%}.q-grid-row.xl-3.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-3.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-4{width:33.3333333333%}.q-grid-row.xl-4.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-4.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-5{width:41.6666666667%}.q-grid-row.xl-5.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-5.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-6{width:50%}.q-grid-row.xl-6.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-6.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-7{width:58.3333333333%}.q-grid-row.xl-7.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-7.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-8{width:66.6666666667%}.q-grid-row.xl-8.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-8.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-9{width:75%}.q-grid-row.xl-9.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-9.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-10{width:83.3333333333%}.q-grid-row.xl-10.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-10.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-11{width:91.6666666667%}.q-grid-row.xl-11.x-spacing-r{padding-right:var(--ads-size-xs)}.q-grid-row.xl-11.x-spacing-l{padding-left:var(--ads-size-xs)}.q-grid-row.xl-12{width:100%}}\n"] }]
        }], propDecorators: { contentType: [{
                type: Input
            }], extraSpacingRight: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], extraSpacingLeft: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], xxs: [{
                type: Input
            }], xs: [{
                type: Input
            }], sm: [{
                type: Input
            }], md: [{
                type: Input
            }], lg: [{
                type: Input
            }], xl: [{
                type: Input
            }], hostClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QGridComponent {
    dataQt = 'q-grid';
    _gridRows;
    hostClass = 'q-grid';
    ngAfterContentInit() {
        for (let i = 0; i < this._gridRows.length; i++) {
            const prev = this._gridRows.get(i - 1);
            const current = this._gridRows.get(i);
            const next = this._gridRows.get(i + 1);
            if (current?._classNames().includes('primary') && next?._classNames().includes('secondary')) {
                current?._addExtraPaddingRight();
            }
            if (current?._classNames().includes('primary') && prev?._classNames().includes('secondary')) {
                current?._addExtraPaddingLeft();
            }
            if (current?._classNames().includes('secondary') && prev?._classNames().includes('primary')) {
                current?._addExtraPaddingLeft();
            }
            if (current?._classNames().includes('secondary') && next?._classNames().includes('primary')) {
                current?._addExtraPaddingRight();
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QGridComponent, isStandalone: true, selector: "q-grid", inputs: { dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClass" } }, queries: [{ propertyName: "_gridRows", predicate: i0.forwardRef(() => QGridRowComponent), descendants: true }], ngImport: i0, template: `
    <div class="q-grid-content">
      <ng-content />
    </div>
  `, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-grid{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;display:block}.q-grid-content{display:flex;align-items:stretch;flex-wrap:wrap;margin:0 auto;gap:var(--ads-size-l) 0;max-width:calc(1280px + 2 * var(--ads-size-l))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-grid', template: `
    <div class="q-grid-content">
      <ng-content />
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-grid{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;display:block}.q-grid-content{display:flex;align-items:stretch;flex-wrap:wrap;margin:0 auto;gap:var(--ads-size-l) 0;max-width:calc(1280px + 2 * var(--ads-size-l))}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _gridRows: [{
                type: ContentChildren,
                args: [forwardRef(() => QGridRowComponent), { descendants: true }]
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_GRID_COMPONENTS = [QGridComponent, QGridRowComponent];

/**
 * Generated bundle index. Do not edit.
 */

export { QGridComponent, QGridRowComponent, Q_GRID_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-grid.mjs.map
