import * as i0 from '@angular/core';
import { inject, ChangeDetectorRef, ElementRef, booleanAttribute, numberAttribute, HostListener, HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/cdk/observers';
import { ObserversModule } from '@angular/cdk/observers';
import { QSharedResizeObserverService, QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { SPACE, ENTER } from '@questrade/allspark-angular-components/core/utils';
import { takeUntil } from 'rxjs';

const leftColumnWidthLabel = '_leftColumnWidth';
const rightColumnWidthLabel = '_rightColumnWidth';
class QListItemComponent {
    variant = 'primary';
    density = 'default';
    rightColumnAlignment = 'left';
    interactiveIconPosition = 'center';
    /**
     * @deprecated Use `--awds-list-item-row-gap` token instead.
     * @breaking-change First major after 13 Aug 2026
     */
    rowGap = 4;
    done = false;
    dataQt = 'q-list-item';
    disabled = null;
    set leftColumnWidth(value) {
        this._updateColumnWidth(value, leftColumnWidthLabel);
    }
    get leftColumnWidth() {
        return this[leftColumnWidthLabel];
    }
    set rightColumnWidth(value) {
        this._updateColumnWidth(value, rightColumnWidthLabel);
    }
    get rightColumnWidth() {
        return this[rightColumnWidthLabel];
    }
    get tabIndex() {
        return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
    }
    get hostClassNames() {
        return [
            'q-list-item',
            'q-focus-indicator-inset',
            `q-list-item-${this.done ? 'done' : ''}`,
            `q-list-item-${this.rightColumnAlignment}`,
            `q-list-item-${this.density}`,
            `q-list-item-${this.variant}`,
            `q-list-item-icon-${this.interactiveIconPosition}`,
            this._pressed ? 'q-list-item-pressed' : '',
        ].join(' ');
    }
    _onKeyDown(event) {
        if (!(event instanceof KeyboardEvent))
            return;
        if (this.disabled)
            return;
        if ([SPACE, ENTER].includes(event.code)) {
            this._pressed = true;
            event.stopPropagation();
            event.preventDefault();
        }
    }
    _onKeyUp(event) {
        if (!(event instanceof KeyboardEvent))
            return;
        if (this.disabled)
            return;
        if ([SPACE, ENTER].includes(event.code)) {
            this._pressed = false;
            this._elementRef.nativeElement.click();
            event.stopPropagation();
            event.preventDefault();
        }
    }
    [leftColumnWidthLabel] = 'auto';
    [rightColumnWidthLabel] = 'auto';
    _pressed = false;
    _tabIndex = 0;
    _leftRows = [];
    _rightRows = [];
    _changeDetectorRef = inject(ChangeDetectorRef);
    _elementRef = inject(ElementRef);
    _sharedResizeObserverService = inject(QSharedResizeObserverService);
    _destroy$ = inject(QDestroyService);
    ngOnChanges(changes) {
        if (changes['rowGap']) {
            //TODO: Remove this once the deprecated input is removed
            this._elementRef.nativeElement.style.setProperty('--awds-list-item-row-gap', `${this.rowGap}px`);
        }
    }
    ngAfterViewInit() {
        this._setupResizeObserver();
        this._setRows();
        this._adjustRowsMinHeight();
    }
    _onContentChange() {
        this._setRows();
        this._removeRowsMinHeight();
        this._adjustRowsMinHeight();
    }
    _updateColumnWidth(value, column) {
        if (isNaN(Number(value.toString()))) {
            this[column] = value;
        }
        else {
            this[column] = `${value}px`;
        }
        this._changeDetectorRef.markForCheck();
    }
    _setRows() {
        this._leftRows = Array.from(this._elementRef.nativeElement.querySelectorAll('[leftcolumn]'));
        this._rightRows = Array.from(this._elementRef.nativeElement.querySelectorAll('[rightcolumn]'));
    }
    _adjustRowsMinHeight() {
        if (this._leftRows.length && this._rightRows.length) {
            const rowsLength = Math.max(this._leftRows.length, this._rightRows.length);
            for (let index = 0; index < rowsLength; index++) {
                const leftRowHeight = this._leftRows[index]?.offsetHeight ?? 0;
                const rightRowHeight = this._rightRows[index]?.offsetHeight ?? 0;
                if (leftRowHeight > rightRowHeight) {
                    this._setMinHeightStyle(this._rightRows[index], leftRowHeight);
                }
                else if (rightRowHeight > leftRowHeight)
                    this._setMinHeightStyle(this._leftRows[index], rightRowHeight);
            }
        }
    }
    _removeRowsMinHeight() {
        if (this._leftRows.length || this._rightRows.length) {
            const rows = [...this._leftRows, ...this._rightRows];
            for (const row of rows) {
                this._removeMinHeightStyle(row);
            }
        }
    }
    _setMinHeightStyle(row, minHeight) {
        if (!row) {
            return;
        }
        row.style.setProperty('min-height', `${minHeight}px`);
    }
    _removeMinHeightStyle(row) {
        if (!row) {
            return;
        }
        if (row.style.minHeight) {
            row.style.removeProperty('min-height');
        }
    }
    _setupResizeObserver() {
        this._sharedResizeObserverService
            .observe(this._elementRef.nativeElement)
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            this._removeRowsMinHeight();
            this._adjustRowsMinHeight();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QListItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QListItemComponent, isStandalone: true, selector: "li[q-list-item], li[qListItem], a[q-nav-list-item], a[qNavListItem], button[q-nav-list-item], button[qNavListItem]", inputs: { variant: "variant", density: "density", rightColumnAlignment: "rightColumnAlignment", interactiveIconPosition: "interactiveIconPosition", rowGap: ["rowGap", "rowGap", numberAttribute], done: ["done", "done", booleanAttribute], dataQt: "dataQt", disabled: "disabled", leftColumnWidth: "leftColumnWidth", rightColumnWidth: "rightColumnWidth", tabIndex: "tabIndex" }, host: { listeners: { "keydown": "_onKeyDown($event)", "keyup": "_onKeyUp($event)" }, properties: { "attr.data-qt": "this.dataQt", "attr.disabled": "this.disabled", "attr.tabindex": "this.tabIndex", "class": "this.hostClassNames" } }, providers: [QDestroyService], usesOnChanges: true, ngImport: i0, template: "<ng-content />\n\n<div class=\"q-list-item-grid-container\">\n  <div class=\"q-list-item-icon-left\">\n    <ng-content select=\"q-interactive-icon[left], q-icon[left]\" />\n  </div>\n\n  <div class=\"q-list-item-content\" (cdkObserveContent)=\"_onContentChange()\" [debounce]=\"500\">\n    <div\n      [style.width]=\"leftColumnWidth\"\n      class=\"q-list-item-content-left q-body-s\"\n      [attr.data-qt]=\"'q-list-item-left-column'\">\n      <ng-content select=\"[leftColumn]\" />\n    </div>\n\n    <div\n      [style.width]=\"rightColumnWidth\"\n      class=\"q-list-item-content-right q-body-s\"\n      [attr.data-qt]=\"'q-list-item-right-column'\">\n      <ng-content select=\"[rightColumn]\" />\n    </div>\n  </div>\n\n  <div class=\"q-list-item-right-container\">\n    <div class=\"q-list-item-icon-right\">\n      <ng-content select=\"q-interactive-icon[right], q-icon[right]\" />\n    </div>\n\n    <div class=\"q-list-item-action-right\">\n      <ng-content select=\"button[right]\" />\n      <ng-content select=\"q-chip[right]\" />\n      <ng-content select=\"q-switch[right]\" />\n    </div>\n  </div>\n\n  <!-- vvasylevskyy: It is required, do not remove -->\n  <div></div>\n\n  <div class=\"q-list-item-action-bottom\">\n    <ng-content select=\"button[bottom]\" />\n    <ng-content select=\"q-chip[bottom]\" />\n    <ng-content select=\"q-switch[bottom]\" />\n  </div>\n</div>\n", styles: [".q-list-item{color:var(--awds-list-item-color, var(--ads-color-body-contrast-400));list-style-type:none;margin-block-start:0;margin-block-end:0;padding-inline-start:0;display:grid;border-radius:var(--awds-list-item-border-radius, 0);min-height:var(--awds-list-item-min-height, auto);-webkit-tap-highlight-color:transparent}.q-list-item-grid-container{display:grid;grid-template-columns:min-content minmax(0,1fr) min-content;grid-template-rows:min-content min-content;grid-auto-flow:row}.q-list-item[disabled=true]{background:var(--awds-list-disabled-item-background, var(--ads-color-body-100));color:var(--awds-list-disabled-item-color, var(--ads-color-body-400));opacity:var(--awds-list-disabled-item-opacity, 1);pointer-events:none}.q-list-item[disabled=true] .q-icon{fill:var(--awds-list-disabled-item-icon-fill, var(--ads-color-body-400))}.q-list-item-done{background:var(--awds-list-done-item-background, var(--ads-color-primary-100))}.q-list-item-right .q-list-item-content{justify-content:space-between}.q-list-item-right .q-list-item-content .q-list-item-content-right{align-items:flex-end;text-align:right}.q-list-item-primary{padding-left:var(--awds-list-primary-item-padding-left, 0);padding-right:var(--awds-list-primary-item-padding-right, 0)}.q-list-item-secondary{padding-left:var(--awds-list-secondary-item-padding-left, var(--ads-size-s));padding-right:var(--awds-list-secondary-item-padding-right, var(--ads-size-s))}.q-list-item-default{padding-top:var(--awds-list-default-item-padding-top, var(--ads-size-micro));padding-bottom:var(--awds-list-default-item-padding-bottom, var(--ads-size-micro))}.q-list-item-compact{padding-top:var(--awds-list-compact-item-padding-top, var(--ads-size-xxs));padding-bottom:var(--awds-list-compact-item-padding-bottom, var(--ads-size-xxs))}.q-list-item-comfortable{padding-top:var(--awds-list-comfortable-item-padding-top, var(--ads-size-s));padding-bottom:var(--awds-list-comfortable-item-padding-bottom, var(--ads-size-s))}.q-list-item-icon-top .q-list-item-icon-left,.q-list-item-icon-top .q-list-item-icon-right{justify-content:flex-start}.q-list-item-icon-center .q-list-item-icon-left,.q-list-item-icon-center .q-list-item-icon-right{justify-content:center}.q-list-item-icon-bottom .q-list-item-icon-left,.q-list-item-icon-bottom .q-list-item-icon-right{justify-content:flex-end}.q-list-item .q-list-item-content{display:flex;flex-direction:row;align-items:center;gap:var(--awds-list-item-content-gap, var(--ads-size-xxs))}.q-list-item .q-list-item-content:has(.q-list-item-content-left:not(:empty)):has(.q-list-item-content-right:not(:empty)){align-items:stretch}.q-list-item .q-list-item-content-left,.q-list-item .q-list-item-content-right{display:flex;overflow:hidden;flex-direction:column;gap:var(--awds-list-item-row-gap, var(--ads-size-nano))}.q-list-item .q-list-item-content-right{align-items:flex-start;text-align:left}.q-list-item .q-list-item-icon-left,.q-list-item .q-list-item-icon-right{display:flex;flex-direction:column}.q-list-item .q-list-item-icon-left:not(:empty){padding-right:var(--awds-list-item-icon-left-padding-right, var(--ads-size-xxxs))}.q-list-item .q-list-item-icon-right:not(:empty){padding-left:var(--awds-list-item-icon-right-padding-left, var(--ads-size-xxxs))}.q-list-item .q-list-item-right-container{display:flex;height:100%}.q-list-item .q-list-item-action-right,.q-list-item .q-list-item-action-bottom{display:flex;align-items:center;height:100%}.q-list-item .q-list-item-action-right:not(:empty){padding-left:var(--awds-list-item-action-right-padding-left, var(--ads-size-xxxs))}.q-list-item .q-list-item-action-bottom:not(:empty){padding-top:var(--awds-list-item-action-bottom-padding-top, var(--ads-size-xxxs))}a.q-list-item,button.q-list-item{text-decoration:none;width:100%}a.q-list-item:hover:not([disabled=true]),button.q-list-item:hover:not([disabled=true]){background:var(--awds-list-hover-item-background, var(--ads-color-body-200))}a.q-list-item-pressed,a.q-list-item:active:not([disabled=true]),button.q-list-item-pressed,button.q-list-item:active:not([disabled=true]){background:var(--awds-list-active-item-background, var(--ads-color-body-300))}\n"], dependencies: [{ kind: "ngmodule", type: ObserversModule }, { kind: "directive", type: i1.CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'li[q-list-item], li[qListItem], a[q-nav-list-item], a[qNavListItem], button[q-nav-list-item], button[qNavListItem]', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [ObserversModule], providers: [QDestroyService], template: "<ng-content />\n\n<div class=\"q-list-item-grid-container\">\n  <div class=\"q-list-item-icon-left\">\n    <ng-content select=\"q-interactive-icon[left], q-icon[left]\" />\n  </div>\n\n  <div class=\"q-list-item-content\" (cdkObserveContent)=\"_onContentChange()\" [debounce]=\"500\">\n    <div\n      [style.width]=\"leftColumnWidth\"\n      class=\"q-list-item-content-left q-body-s\"\n      [attr.data-qt]=\"'q-list-item-left-column'\">\n      <ng-content select=\"[leftColumn]\" />\n    </div>\n\n    <div\n      [style.width]=\"rightColumnWidth\"\n      class=\"q-list-item-content-right q-body-s\"\n      [attr.data-qt]=\"'q-list-item-right-column'\">\n      <ng-content select=\"[rightColumn]\" />\n    </div>\n  </div>\n\n  <div class=\"q-list-item-right-container\">\n    <div class=\"q-list-item-icon-right\">\n      <ng-content select=\"q-interactive-icon[right], q-icon[right]\" />\n    </div>\n\n    <div class=\"q-list-item-action-right\">\n      <ng-content select=\"button[right]\" />\n      <ng-content select=\"q-chip[right]\" />\n      <ng-content select=\"q-switch[right]\" />\n    </div>\n  </div>\n\n  <!-- vvasylevskyy: It is required, do not remove -->\n  <div></div>\n\n  <div class=\"q-list-item-action-bottom\">\n    <ng-content select=\"button[bottom]\" />\n    <ng-content select=\"q-chip[bottom]\" />\n    <ng-content select=\"q-switch[bottom]\" />\n  </div>\n</div>\n", styles: [".q-list-item{color:var(--awds-list-item-color, var(--ads-color-body-contrast-400));list-style-type:none;margin-block-start:0;margin-block-end:0;padding-inline-start:0;display:grid;border-radius:var(--awds-list-item-border-radius, 0);min-height:var(--awds-list-item-min-height, auto);-webkit-tap-highlight-color:transparent}.q-list-item-grid-container{display:grid;grid-template-columns:min-content minmax(0,1fr) min-content;grid-template-rows:min-content min-content;grid-auto-flow:row}.q-list-item[disabled=true]{background:var(--awds-list-disabled-item-background, var(--ads-color-body-100));color:var(--awds-list-disabled-item-color, var(--ads-color-body-400));opacity:var(--awds-list-disabled-item-opacity, 1);pointer-events:none}.q-list-item[disabled=true] .q-icon{fill:var(--awds-list-disabled-item-icon-fill, var(--ads-color-body-400))}.q-list-item-done{background:var(--awds-list-done-item-background, var(--ads-color-primary-100))}.q-list-item-right .q-list-item-content{justify-content:space-between}.q-list-item-right .q-list-item-content .q-list-item-content-right{align-items:flex-end;text-align:right}.q-list-item-primary{padding-left:var(--awds-list-primary-item-padding-left, 0);padding-right:var(--awds-list-primary-item-padding-right, 0)}.q-list-item-secondary{padding-left:var(--awds-list-secondary-item-padding-left, var(--ads-size-s));padding-right:var(--awds-list-secondary-item-padding-right, var(--ads-size-s))}.q-list-item-default{padding-top:var(--awds-list-default-item-padding-top, var(--ads-size-micro));padding-bottom:var(--awds-list-default-item-padding-bottom, var(--ads-size-micro))}.q-list-item-compact{padding-top:var(--awds-list-compact-item-padding-top, var(--ads-size-xxs));padding-bottom:var(--awds-list-compact-item-padding-bottom, var(--ads-size-xxs))}.q-list-item-comfortable{padding-top:var(--awds-list-comfortable-item-padding-top, var(--ads-size-s));padding-bottom:var(--awds-list-comfortable-item-padding-bottom, var(--ads-size-s))}.q-list-item-icon-top .q-list-item-icon-left,.q-list-item-icon-top .q-list-item-icon-right{justify-content:flex-start}.q-list-item-icon-center .q-list-item-icon-left,.q-list-item-icon-center .q-list-item-icon-right{justify-content:center}.q-list-item-icon-bottom .q-list-item-icon-left,.q-list-item-icon-bottom .q-list-item-icon-right{justify-content:flex-end}.q-list-item .q-list-item-content{display:flex;flex-direction:row;align-items:center;gap:var(--awds-list-item-content-gap, var(--ads-size-xxs))}.q-list-item .q-list-item-content:has(.q-list-item-content-left:not(:empty)):has(.q-list-item-content-right:not(:empty)){align-items:stretch}.q-list-item .q-list-item-content-left,.q-list-item .q-list-item-content-right{display:flex;overflow:hidden;flex-direction:column;gap:var(--awds-list-item-row-gap, var(--ads-size-nano))}.q-list-item .q-list-item-content-right{align-items:flex-start;text-align:left}.q-list-item .q-list-item-icon-left,.q-list-item .q-list-item-icon-right{display:flex;flex-direction:column}.q-list-item .q-list-item-icon-left:not(:empty){padding-right:var(--awds-list-item-icon-left-padding-right, var(--ads-size-xxxs))}.q-list-item .q-list-item-icon-right:not(:empty){padding-left:var(--awds-list-item-icon-right-padding-left, var(--ads-size-xxxs))}.q-list-item .q-list-item-right-container{display:flex;height:100%}.q-list-item .q-list-item-action-right,.q-list-item .q-list-item-action-bottom{display:flex;align-items:center;height:100%}.q-list-item .q-list-item-action-right:not(:empty){padding-left:var(--awds-list-item-action-right-padding-left, var(--ads-size-xxxs))}.q-list-item .q-list-item-action-bottom:not(:empty){padding-top:var(--awds-list-item-action-bottom-padding-top, var(--ads-size-xxxs))}a.q-list-item,button.q-list-item{text-decoration:none;width:100%}a.q-list-item:hover:not([disabled=true]),button.q-list-item:hover:not([disabled=true]){background:var(--awds-list-hover-item-background, var(--ads-color-body-200))}a.q-list-item-pressed,a.q-list-item:active:not([disabled=true]),button.q-list-item-pressed,button.q-list-item:active:not([disabled=true]){background:var(--awds-list-active-item-background, var(--ads-color-body-300))}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], density: [{
                type: Input
            }], rightColumnAlignment: [{
                type: Input
            }], interactiveIconPosition: [{
                type: Input
            }], rowGap: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], done: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.disabled']
            }], leftColumnWidth: [{
                type: Input
            }], rightColumnWidth: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.tabindex']
            }], hostClassNames: [{
                type: HostBinding,
                args: ['class']
            }], _onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], _onKeyUp: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }] } });

class QListComponent {
    dataQt = 'q-list';
    inset = false;
    get hostClassNames() {
        return ['q-list', this.inset ? 'q-list-inset' : ''].join(' ');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QListComponent, isStandalone: true, selector: "ul[q-list], ul[qList], ol[q-list], ol[qList], nav[q-nav-list], nav[qNavList]", inputs: { dataQt: "dataQt", inset: ["inset", "inset", booleanAttribute] }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this.hostClassNames" } }, ngImport: i0, template: `<ng-content />`, isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-list{font-family:var(--awds-list-font-family, var(--ads-font-family-body));font-size:var(--awds-list-font-size, var(--ads-font-size-xs));font-style:var(--awds-list-font-style, inherit);font-weight:var(--awds-list-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-list-letter-spacing, 0);line-height:var(--awds-list-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-list-text-transform, none)}ul.q-list,ol.q-list{list-style-type:none;margin-block-start:0;margin-block-end:0;padding-inline-start:0}ul.q-list .q-list-item:nth-child(odd):not(.q-list-item-done):not([disabled=true]),ol.q-list .q-list-item:nth-child(odd):not(.q-list-item-done):not([disabled=true]){background:var(--awds-list-odd-item-background, var(--ads-color-body-100))}ul.q-list .q-list-item:nth-child(2n):not(.q-list-item-done):not([disabled=true]),ol.q-list .q-list-item:nth-child(2n):not(.q-list-item-done):not([disabled=true]){background:var(--awds-list-even-item-background, var(--ads-color-body-200))}nav.q-list-inset{padding:var(--awds-list-inset-container-padding, var(--ads-size-xxxs))}nav.q-list-inset .q-list-item{border-radius:var(--awds-list-inset-item-border-radius, var(--ads-border-radius-m))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ul[q-list], ul[qList], ol[q-list], ol[qList], nav[q-nav-list], nav[qNavList]', template: `<ng-content />`, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-list{font-family:var(--awds-list-font-family, var(--ads-font-family-body));font-size:var(--awds-list-font-size, var(--ads-font-size-xs));font-style:var(--awds-list-font-style, inherit);font-weight:var(--awds-list-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-list-letter-spacing, 0);line-height:var(--awds-list-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-list-text-transform, none)}ul.q-list,ol.q-list{list-style-type:none;margin-block-start:0;margin-block-end:0;padding-inline-start:0}ul.q-list .q-list-item:nth-child(odd):not(.q-list-item-done):not([disabled=true]),ol.q-list .q-list-item:nth-child(odd):not(.q-list-item-done):not([disabled=true]){background:var(--awds-list-odd-item-background, var(--ads-color-body-100))}ul.q-list .q-list-item:nth-child(2n):not(.q-list-item-done):not([disabled=true]),ol.q-list .q-list-item:nth-child(2n):not(.q-list-item-done):not([disabled=true]){background:var(--awds-list-even-item-background, var(--ads-color-body-200))}nav.q-list-inset{padding:var(--awds-list-inset-container-padding, var(--ads-size-xxxs))}nav.q-list-inset .q-list-item{border-radius:var(--awds-list-inset-item-border-radius, var(--ads-border-radius-m))}\n"] }]
        }], propDecorators: { dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], inset: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hostClassNames: [{
                type: HostBinding,
                args: ['class']
            }] } });

const Q_LIST_COMPONENTS = [QListComponent, QListItemComponent];

/**
 * Generated bundle index. Do not edit.
 */

export { QListComponent, QListItemComponent, Q_LIST_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-list.mjs.map
