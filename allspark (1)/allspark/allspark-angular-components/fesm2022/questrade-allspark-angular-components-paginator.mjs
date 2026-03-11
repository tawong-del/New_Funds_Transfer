import { NgIf, AsyncPipe } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, inject, ChangeDetectorRef, booleanAttribute, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { QChipComponent } from '@questrade/allspark-angular-components/chip';
import { QDropmenuComponent, QDropmenuOriginDirective } from '@questrade/allspark-angular-components/dropmenu';
import { QIconRegistryService } from '@questrade/allspark-angular-components/icon';
import { QInteractiveIconComponent } from '@questrade/allspark-angular-components/interactive-icon';
import { chevronLeft, chevronRight } from '@questrade/allspark-icons/icons';
import { BehaviorSubject } from 'rxjs';

class QPaginatorComponent {
    changed = new EventEmitter();
    itemsInfoPosition = 'left';
    showPagesInfo = true;
    dataQt = 'q-paginator';
    get currentPage() {
        return this._currentPage;
    }
    set currentPage(value) {
        if (value < 1) {
            this._currentPage = 1;
        }
        else if (value > this._getNumberOfPages()) {
            this._currentPage = this._getNumberOfPages();
        }
        else {
            this._currentPage = value;
        }
        this._cd.detectChanges();
        this._updateLabels();
    }
    get totalItems() {
        return this._totalItems;
    }
    set totalItems(value) {
        this._totalItems = value || 0;
        this._updateLabels();
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = value < 1 ? 1 : value;
        this._updateLabels();
    }
    _hostClass = 'q-paginator';
    _currentPageFirstItem$ = new BehaviorSubject(0);
    _currentPageLastItem$ = new BehaviorSubject(0);
    _numberOfPages$ = new BehaviorSubject(0);
    _dropdownOptions = [];
    _currentPage = 1;
    _totalItems = 0;
    _pageSize = 25;
    _cd = inject(ChangeDetectorRef);
    _iconRegistry = inject(QIconRegistryService);
    constructor() {
        this._iconRegistry.registerIcons([chevronLeft, chevronRight]);
    }
    _changePage(event) {
        const pageValue = event?.value;
        if (pageValue <= this._getNumberOfPages()) {
            this.currentPage = pageValue;
            this.changed.emit(this.currentPage);
        }
    }
    _goNextPage() {
        if (!this._isLastPage()) {
            this.currentPage++;
            this.changed.emit(this.currentPage);
        }
    }
    _goPreviousPage() {
        if (!this._isFirstPage()) {
            this.currentPage--;
            this.changed.emit(this.currentPage);
        }
    }
    _isFirstPage() {
        return this.currentPage === 1;
    }
    _isLastPage() {
        return this.currentPage === this._getNumberOfPages();
    }
    _getNumberOfPages() {
        return this.pageSize ? Math.ceil(this.totalItems / this.pageSize) || 1 : 1;
    }
    _updateLabels() {
        this._currentPageFirstItem$.next(this.totalItems ? (this.currentPage - 1) * this.pageSize + 1 : 0);
        const lastPossible = this.currentPage * this.pageSize;
        this._currentPageLastItem$.next(this.totalItems > lastPossible ? lastPossible : this.totalItems);
        this._numberOfPages$.next(this._getNumberOfPages() || 1);
        this._updatePagesOptions();
    }
    _updatePagesOptions() {
        this._dropdownOptions = Array(this._getNumberOfPages() || 1)
            .fill(null)
            .map((_, index) => ({
            value: index + 1,
            label: (index + 1).toString(),
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPaginatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QPaginatorComponent, isStandalone: true, selector: "q-paginator", inputs: { itemsInfoPosition: "itemsInfoPosition", showPagesInfo: ["showPagesInfo", "showPagesInfo", booleanAttribute], dataQt: "dataQt", currentPage: "currentPage", totalItems: "totalItems", pageSize: "pageSize" }, outputs: { changed: "changed" }, host: { properties: { "attr.data-qt": "this.dataQt", "class": "this._hostClass" } }, ngImport: i0, template: "<div class=\"q-paginator-container\">\n  <div class=\"q-paginator-info\">\n    <div class=\"q-paginator-items\" [class.q-paginator-items-right]=\"itemsInfoPosition === 'right'\">\n      {{ _currentPageFirstItem$ | async }} - {{ _currentPageLastItem$ | async }} of {{ totalItems }}\n    </div>\n\n    <div *ngIf=\"showPagesInfo\" class=\"q-paginator-pages\">\n      <q-chip\n        #chip\n        qDropmenuOrigin\n        #chipTrigger=\"qDropmenuOrigin\"\n        [isDropdown]=\"true\"\n        [type]=\"'text'\"\n        [disabled]=\"_dropdownOptions.length < 2\"\n        (changed)=\"dropmenu.open()\"\n        (keydown.enter)=\"dropmenu.open()\"\n        (keyup.space)=\"dropmenu.open()\">\n        {{ dropmenu.value }}\n      </q-chip>\n      <q-dropmenu\n        #dropmenu\n        [dropmenuTrigger]=\"chipTrigger\"\n        [options]=\"_dropdownOptions\"\n        [value]=\"currentPage\"\n        (valueChange)=\"_changePage($event)\"\n        (closed)=\"chip.setActiveValue(false)\" />\n      of {{ _numberOfPages$ | async }}\n      {{ (_numberOfPages$ | async) === 1 ? 'page' : 'pages' }}\n    </div>\n  </div>\n\n  <div class=\"q-paginator-actions\">\n    <q-interactive-icon\n      [icon]=\"'chevronLeft'\"\n      [size]=\"'medium'\"\n      [disabled]=\"_isFirstPage()\"\n      (click)=\"_goPreviousPage()\" />\n\n    <q-interactive-icon\n      [icon]=\"'chevronRight'\"\n      [size]=\"'medium'\"\n      [disabled]=\"_isLastPage()\"\n      (click)=\"_goNextPage()\" />\n  </div>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-paginator-container{width:100%;height:var(--ads-size-xxl);display:flex;align-items:center;background:var(--ads-color-body-100);color:var(--ads-color-body-contrast-100)}.q-paginator-info{display:flex;flex:1;align-items:center}.q-paginator-items{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;margin:0 var(--ads-size-s)}.q-paginator-items-right{margin-left:auto}.q-paginator-pages{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;margin:0 var(--ads-size-s);margin-left:auto}.q-paginator-pages .q-chip{margin-right:var(--ads-size-micro)}.q-paginator-actions{display:flex;margin-left:auto;margin-right:var(--ads-size-xs)}@media(max-width:599px){.q-paginator-pages{display:none}}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: QInteractiveIconComponent, selector: "q-interactive-icon", inputs: ["icon", "context", "size", "tooltipValue", "tooltipPosition", "disabled", "tabindex", "tooltipShowDelay", "tooltipHideDelay", "tooltipLongPressDelay", "dataQt", "iconSize", "color"] }, { kind: "component", type: QChipComponent, selector: "q-chip", inputs: ["isIconChip", "toggleActiveIconColor", "toggleOnClick", "isDropdown", "error", "readonly", "value", "iconPosition", "textStyle", "dataQt", "type", "showCheckIcon", "checkType", "active", "toggleActiveIcon", "disabled", "icon", "toggleRightIcon"], outputs: ["changed", "iconClicked"] }, { kind: "component", type: QDropmenuComponent, selector: "q-dropmenu", inputs: ["backdropEnabled", "fitTriggerWidth", "density", "highlightCaseSensitive", "loading", "disableSelectionTracking", "textToHighlight", "loadingVariant", "loadingSkeletonTemplate", "footerMessage", "footerTemplate", "emptyStateTemplate", "optionTemplate", "groupLabelTemplate", "headerTemplate", "aria-label", "aria-labelledby", "id", "dataQt", "dropmenuTrigger", "groupBy", "groupLabel", "options", "value", "minWidth", "minHeight", "offsetY", "offsetX", "xPosition", "yPosition", "fitOverlayWidth", "useOverlay", "overlayHasBackdrop"], outputs: ["selectionChange", "valueChange", "opened", "closed", "backdropEnabledChange", "fitTriggerWidthChange"] }, { kind: "directive", type: QDropmenuOriginDirective, selector: "[qDropmenuOrigin]", exportAs: ["qDropmenuOrigin"] }, { kind: "pipe", type: AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPaginatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-paginator', imports: [
                        NgIf,
                        AsyncPipe,
                        QInteractiveIconComponent,
                        QChipComponent,
                        QDropmenuComponent,
                        QDropmenuOriginDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"q-paginator-container\">\n  <div class=\"q-paginator-info\">\n    <div class=\"q-paginator-items\" [class.q-paginator-items-right]=\"itemsInfoPosition === 'right'\">\n      {{ _currentPageFirstItem$ | async }} - {{ _currentPageLastItem$ | async }} of {{ totalItems }}\n    </div>\n\n    <div *ngIf=\"showPagesInfo\" class=\"q-paginator-pages\">\n      <q-chip\n        #chip\n        qDropmenuOrigin\n        #chipTrigger=\"qDropmenuOrigin\"\n        [isDropdown]=\"true\"\n        [type]=\"'text'\"\n        [disabled]=\"_dropdownOptions.length < 2\"\n        (changed)=\"dropmenu.open()\"\n        (keydown.enter)=\"dropmenu.open()\"\n        (keyup.space)=\"dropmenu.open()\">\n        {{ dropmenu.value }}\n      </q-chip>\n      <q-dropmenu\n        #dropmenu\n        [dropmenuTrigger]=\"chipTrigger\"\n        [options]=\"_dropdownOptions\"\n        [value]=\"currentPage\"\n        (valueChange)=\"_changePage($event)\"\n        (closed)=\"chip.setActiveValue(false)\" />\n      of {{ _numberOfPages$ | async }}\n      {{ (_numberOfPages$ | async) === 1 ? 'page' : 'pages' }}\n    </div>\n  </div>\n\n  <div class=\"q-paginator-actions\">\n    <q-interactive-icon\n      [icon]=\"'chevronLeft'\"\n      [size]=\"'medium'\"\n      [disabled]=\"_isFirstPage()\"\n      (click)=\"_goPreviousPage()\" />\n\n    <q-interactive-icon\n      [icon]=\"'chevronRight'\"\n      [size]=\"'medium'\"\n      [disabled]=\"_isLastPage()\"\n      (click)=\"_goNextPage()\" />\n  </div>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-paginator-container{width:100%;height:var(--ads-size-xxl);display:flex;align-items:center;background:var(--ads-color-body-100);color:var(--ads-color-body-contrast-100)}.q-paginator-info{display:flex;flex:1;align-items:center}.q-paginator-items{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;margin:0 var(--ads-size-s)}.q-paginator-items-right{margin-left:auto}.q-paginator-pages{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none;margin:0 var(--ads-size-s);margin-left:auto}.q-paginator-pages .q-chip{margin-right:var(--ads-size-micro)}.q-paginator-actions{display:flex;margin-left:auto;margin-right:var(--ads-size-xs)}@media(max-width:599px){.q-paginator-pages{display:none}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { changed: [{
                type: Output
            }], itemsInfoPosition: [{
                type: Input
            }], showPagesInfo: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], currentPage: [{
                type: Input
            }], totalItems: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QPaginatorComponent };
//# sourceMappingURL=questrade-allspark-angular-components-paginator.mjs.map
