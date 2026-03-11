import { NgIf, NgTemplateOutlet, NgFor } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, inject, ElementRef, Renderer2, booleanAttribute, HostListener, HostBinding, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, Component, model, computed, signal, ChangeDetectorRef, DOCUMENT, effect, numberAttribute, ViewChildren, Directive } from '@angular/core';
import * as i2 from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { QCheckboxComponent } from '@questrade/allspark-angular-components/checkbox';
import { QIconRegistryService, QIconComponent } from '@questrade/allspark-angular-components/icon';
import { QSkeletonComponent } from '@questrade/allspark-angular-components/skeleton';
import { QSpinnerComponent } from '@questrade/allspark-angular-components/spinner';
import { MISSING_KEY_HANDLER, ALLSPARK_SCOPE } from '@questrade/allspark-angular-components/transloco';
import { FocusMonitor, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ENTER, SPACE, injectDestroy, isPresent, UP_ARROW } from '@questrade/allspark-angular-components/core/utils';
import { QDividerComponent } from '@questrade/allspark-angular-components/divider';
import * as i1 from '@questrade/allspark-angular-components/popover';
import { QPopoverDirective } from '@questrade/allspark-angular-components/popover';
import { check, search } from '@questrade/allspark-icons/icons';
import { takeUntil, startWith } from 'rxjs';
import { QTextHighlightDirective } from '@questrade/allspark-angular-components/core/directives';

let _uniqueIdCounter$1 = 0;
class QDropmenuOptionComponent {
    selectionChange = new EventEmitter();
    value = null;
    label = '';
    subLabel = '';
    icon = '';
    index = null;
    textToHighlight = '';
    optionTemplate = null;
    highlightCaseSensitive = false;
    useOverlay = true;
    disabled = false;
    _role = 'option';
    id = `q-dropmenu-option-${_uniqueIdCounter$1++}`;
    selected = false;
    _dataQt = this.id;
    get _hostClasses() {
        return [
            'q-dropmenu-option',
            `q-dropmenu-option-density-${this._dropmenu.density}`,
            this.disabled && 'q-dropmenu-option-disabled',
            this.selected && !this._dropmenu.disableSelectionTracking && 'q-dropmenu-option-selected',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _onClick = () => this.selectViaInteraction();
    onKeyDown = (event) => this.handleKeydown(event);
    active = false;
    _dropmenu = inject(QDropmenuComponent);
    _iconRegistry = inject(QIconRegistryService);
    _elementRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    ngOnInit() {
        this._iconRegistry.registerIcon(check);
    }
    select(emitEvent = true) {
        if (this.selected)
            return;
        this.selected = true;
        if (emitEvent) {
            this._emitSelectionChangeEvent();
        }
    }
    deselect(emitEvent = true) {
        if (!this.selected)
            return;
        this.selected = false;
        if (emitEvent) {
            this._emitSelectionChangeEvent();
        }
    }
    selectViaInteraction() {
        if (this.disabled)
            return;
        this.selected = true;
        this._emitSelectionChangeEvent(true);
    }
    /**
     * Implemented as a part of `Highlightable`.
     */
    setActiveStyles() {
        if (this.active)
            return;
        this.active = true;
        this._renderer.addClass(this.getHostElement(), 'q-dropmenu-option-active');
        this._dropmenu.scrollOptionIntoView(this, 'nearest');
    }
    /**
     * Implemented as a part of `Highlightable`.
     */
    setInactiveStyles() {
        if (!this.active)
            return;
        this.active = false;
        this._renderer.removeClass(this.getHostElement(), 'q-dropmenu-option-active');
    }
    /** Used internally by the ActiveDescendantKeyManager.withTypeAhead when determining
     *  whether the option should be focused.
     */
    getLabel() {
        return this.label || this.subLabel;
    }
    getHostElement() {
        return this._elementRef.nativeElement;
    }
    handleKeydown(event) {
        if ([ENTER, SPACE].includes(event.code) && !hasModifierKey(event)) {
            this.selectViaInteraction();
            event.preventDefault();
        }
    }
    _emitSelectionChangeEvent(isUserInput = false) {
        this.selectionChange.emit({ source: this, isUserInput });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QDropmenuOptionComponent, isStandalone: true, selector: "q-dropmenu-option", inputs: { value: "value", label: "label", subLabel: "subLabel", icon: "icon", index: "index", textToHighlight: "textToHighlight", optionTemplate: "optionTemplate", highlightCaseSensitive: ["highlightCaseSensitive", "highlightCaseSensitive", booleanAttribute], useOverlay: ["useOverlay", "useOverlay", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute] }, outputs: { selectionChange: "selectionChange" }, host: { listeners: { "click": "_onClick()", "keydown": "onKeyDown($event)" }, properties: { "attr.aria-disabled": "this.disabled", "attr.role": "this._role", "attr.id": "this.id", "attr.aria-selected": "this.selected", "attr.data-qt": "this._dataQt", "class": "this._hostClasses" } }, ngImport: i0, template: "<ng-container\n  *ngTemplateOutlet=\"\n    optionTemplate || defaultOptionTemplate;\n    context: { $implicit: { value, label, subLabel, disabled, icon }, index }\n  \" />\n<ng-template #defaultOptionTemplate>\n  <div class=\"q-dropmenu-option-label-wrapper\">\n    <q-icon\n      *ngIf=\"icon\"\n      [size]=\"'24'\"\n      [class.q-dropmenu-icon-default]=\"useOverlay\"\n      [name]=\"icon\"\n      [dataQt]=\"'q-dropmenu-option-icon'\" />\n\n    <div class=\"q-dropmenu-option-label\">\n      <span\n        [qTextHighlight]=\"disabled ? '' : textToHighlight\"\n        [caseSensitive]=\"highlightCaseSensitive\"\n        [text]=\"label\"></span>\n      <div *ngIf=\"subLabel\" class=\"q-dropmenu-option-sublabel\">\n        {{ subLabel }}\n      </div>\n    </div>\n  </div>\n\n  <q-icon\n    *ngIf=\"selected && !_dropmenu.disableSelectionTracking\"\n    aria-hidden=\"true\"\n    class=\"q-dropmenu-icon-check-mark\"\n    [size]=\"'24'\"\n    [name]=\"'check'\"\n    [dataQt]=\"'q-dropmenu-check-icon'\" />\n</ng-template>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu-option{font-family:var(--awds-dropmenu-option-item-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-option-item-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-option-item-font-style, inherit);font-weight:var(--awds-dropmenu-option-item-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-option-item-letter-spacing, 0);line-height:var(--awds-dropmenu-option-item-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-option-item-text-transform, none);display:flex;flex-direction:row;gap:var(--awds-dropmenu-option-item-gap, var(--ads-size-micro));align-items:flex-start;cursor:pointer;outline:var(--awds-dropmenu-option-item-outline, none);-webkit-user-select:var(--awds-dropmenu-option-item-user-select, none);user-select:var(--awds-dropmenu-option-item-user-select, none);background:var(--awds-dropmenu-option-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-density-default{padding:var(--awds-dropmenu-option-item-default-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-option.q-dropmenu-option-density-compact{padding:var(--awds-dropmenu-option-item-compact-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-option .q-dropmenu-multiple-select-checkbox{padding-left:var(--awds-dropmenu-option-item-input-padding-left, var(--ads-size-nano))}.q-dropmenu-option .q-dropmenu-option-label{color:var(--awds-dropmenu-option-item-label-color, var(--ads-color-body-contrast-100));display:flex;flex-direction:column;gap:var(--awds-dropmenu-option-item-label-gap, var(--ads-size-nano));overflow:hidden;text-overflow:ellipsis}.q-dropmenu-option .q-dropmenu-option-label-wrapper{display:flex;align-items:center;gap:var(--awds-dropmenu-option-item-label-wrapper-gap, var(--ads-size-micro))}.q-dropmenu-option .q-dropmenu-option-sublabel{font-family:var(--awds-dropmenu-item-sublabel-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-item-sublabel-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-item-sublabel-font-style, inherit);font-weight:var(--awds-dropmenu-item-sublabel-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-item-sublabel-letter-spacing, 0);line-height:var(--awds-dropmenu-item-sublabel-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-item-sublabel-text-transform, none);color:var(--awds-dropmenu-option-item-sublabel-color, var(--ads-color-body-500))}.q-dropmenu-option q-icon.q-dropmenu-icon-check-mark{fill:var(--awds-dropmenu-option-icon-check-mark-fill, var(--ads-color-primary-400));margin-left:var(--awds-dropmenu-option-icon-check-mark-margin-left, auto)}.q-dropmenu-option q-icon.q-dropmenu-icon-default{fill:var(--awds-dropmenu-option-icon-fill, var(--ads-color-body-contrast-100))}.q-dropmenu-option:hover{background:var(--awds-dropmenu-option-hover-item-background, var(--ads-color-body-200))}.q-dropmenu-option:active{background:var(--awds-dropmenu-option-pressed-item-background, var(--ads-color-body-200))}.q-dropmenu-option.q-dropmenu-option-disabled{color:var(--awds-dropmenu-option-disabled-item-color, var(--ads-color-body-400));opacity:var(--awds-dropmenu-option-disabled-item-opacity, 1);pointer-events:none}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label{color:var(--awds-dropmenu-option-disabled-item-label-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label-wrapper .q-icon{fill:var(--awds-dropmenu-option-disabled-icon-fill, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-sublabel{color:var(--awds-dropmenu-option-disabled-item-sublabel-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-selected{background:var(--awds-dropmenu-option-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:hover{background:var(--awds-dropmenu-option-hover-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:active{background:var(--awds-dropmenu-option-pressed-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:focus-visible{background:var(--awds-dropmenu-option-focus-visible-selected-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-active{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "directive", type: QTextHighlightDirective, selector: "[qTextHighlight], [q-text-highlight]", inputs: ["qTextHighlight", "caseSensitive", "exactMatch", "text"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-dropmenu-option', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [NgIf, NgTemplateOutlet, QIconComponent, QTextHighlightDirective], template: "<ng-container\n  *ngTemplateOutlet=\"\n    optionTemplate || defaultOptionTemplate;\n    context: { $implicit: { value, label, subLabel, disabled, icon }, index }\n  \" />\n<ng-template #defaultOptionTemplate>\n  <div class=\"q-dropmenu-option-label-wrapper\">\n    <q-icon\n      *ngIf=\"icon\"\n      [size]=\"'24'\"\n      [class.q-dropmenu-icon-default]=\"useOverlay\"\n      [name]=\"icon\"\n      [dataQt]=\"'q-dropmenu-option-icon'\" />\n\n    <div class=\"q-dropmenu-option-label\">\n      <span\n        [qTextHighlight]=\"disabled ? '' : textToHighlight\"\n        [caseSensitive]=\"highlightCaseSensitive\"\n        [text]=\"label\"></span>\n      <div *ngIf=\"subLabel\" class=\"q-dropmenu-option-sublabel\">\n        {{ subLabel }}\n      </div>\n    </div>\n  </div>\n\n  <q-icon\n    *ngIf=\"selected && !_dropmenu.disableSelectionTracking\"\n    aria-hidden=\"true\"\n    class=\"q-dropmenu-icon-check-mark\"\n    [size]=\"'24'\"\n    [name]=\"'check'\"\n    [dataQt]=\"'q-dropmenu-check-icon'\" />\n</ng-template>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu-option{font-family:var(--awds-dropmenu-option-item-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-option-item-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-option-item-font-style, inherit);font-weight:var(--awds-dropmenu-option-item-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-option-item-letter-spacing, 0);line-height:var(--awds-dropmenu-option-item-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-option-item-text-transform, none);display:flex;flex-direction:row;gap:var(--awds-dropmenu-option-item-gap, var(--ads-size-micro));align-items:flex-start;cursor:pointer;outline:var(--awds-dropmenu-option-item-outline, none);-webkit-user-select:var(--awds-dropmenu-option-item-user-select, none);user-select:var(--awds-dropmenu-option-item-user-select, none);background:var(--awds-dropmenu-option-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-density-default{padding:var(--awds-dropmenu-option-item-default-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-option.q-dropmenu-option-density-compact{padding:var(--awds-dropmenu-option-item-compact-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-option .q-dropmenu-multiple-select-checkbox{padding-left:var(--awds-dropmenu-option-item-input-padding-left, var(--ads-size-nano))}.q-dropmenu-option .q-dropmenu-option-label{color:var(--awds-dropmenu-option-item-label-color, var(--ads-color-body-contrast-100));display:flex;flex-direction:column;gap:var(--awds-dropmenu-option-item-label-gap, var(--ads-size-nano));overflow:hidden;text-overflow:ellipsis}.q-dropmenu-option .q-dropmenu-option-label-wrapper{display:flex;align-items:center;gap:var(--awds-dropmenu-option-item-label-wrapper-gap, var(--ads-size-micro))}.q-dropmenu-option .q-dropmenu-option-sublabel{font-family:var(--awds-dropmenu-item-sublabel-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-item-sublabel-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-item-sublabel-font-style, inherit);font-weight:var(--awds-dropmenu-item-sublabel-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-item-sublabel-letter-spacing, 0);line-height:var(--awds-dropmenu-item-sublabel-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-item-sublabel-text-transform, none);color:var(--awds-dropmenu-option-item-sublabel-color, var(--ads-color-body-500))}.q-dropmenu-option q-icon.q-dropmenu-icon-check-mark{fill:var(--awds-dropmenu-option-icon-check-mark-fill, var(--ads-color-primary-400));margin-left:var(--awds-dropmenu-option-icon-check-mark-margin-left, auto)}.q-dropmenu-option q-icon.q-dropmenu-icon-default{fill:var(--awds-dropmenu-option-icon-fill, var(--ads-color-body-contrast-100))}.q-dropmenu-option:hover{background:var(--awds-dropmenu-option-hover-item-background, var(--ads-color-body-200))}.q-dropmenu-option:active{background:var(--awds-dropmenu-option-pressed-item-background, var(--ads-color-body-200))}.q-dropmenu-option.q-dropmenu-option-disabled{color:var(--awds-dropmenu-option-disabled-item-color, var(--ads-color-body-400));opacity:var(--awds-dropmenu-option-disabled-item-opacity, 1);pointer-events:none}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label{color:var(--awds-dropmenu-option-disabled-item-label-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label-wrapper .q-icon{fill:var(--awds-dropmenu-option-disabled-icon-fill, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-sublabel{color:var(--awds-dropmenu-option-disabled-item-sublabel-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-selected{background:var(--awds-dropmenu-option-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:hover{background:var(--awds-dropmenu-option-hover-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:active{background:var(--awds-dropmenu-option-pressed-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:focus-visible{background:var(--awds-dropmenu-option-focus-visible-selected-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-active{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}\n"] }]
        }], propDecorators: { selectionChange: [{
                type: Output
            }], value: [{
                type: Input
            }], label: [{
                type: Input
            }], subLabel: [{
                type: Input
            }], icon: [{
                type: Input
            }], index: [{
                type: Input
            }], textToHighlight: [{
                type: Input
            }], optionTemplate: [{
                type: Input
            }], highlightCaseSensitive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], useOverlay: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['attr.aria-disabled']
            }], _role: [{
                type: HostBinding,
                args: ['attr.role']
            }], id: [{
                type: HostBinding,
                args: ['attr.id']
            }], selected: [{
                type: HostBinding,
                args: ['attr.aria-selected']
            }], _dataQt: [{
                type: HostBinding,
                args: ['attr.data-qt']
            }], _hostClasses: [{
                type: HostBinding,
                args: ['class']
            }], _onClick: [{
                type: HostListener,
                args: ['click']
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

let _uniqueIdCounter = 0;
// TODO: Remove this once the overlay related features are removed.
const OVERLAY_POSITION_PLACEMENT_MAP = {
    'above-start': 'top-start',
    'above-end': 'top-end',
    'above-right': 'right-start',
    'above-left': 'left-start',
    'above-center': 'top',
    'below-right': 'right-end',
    'below-start': 'bottom-start',
    'below-end': 'bottom-end',
    'below-left': 'left-end',
    'below-center': 'bottom',
};
class QDropmenuComponent {
    selectionChange = new EventEmitter();
    valueChange = new EventEmitter();
    opened = new EventEmitter();
    closed = new EventEmitter();
    backdropEnabled = model(true, ...(ngDevMode ? [{ debugName: "backdropEnabled" }] : []));
    fitTriggerWidth = model(false, ...(ngDevMode ? [{ debugName: "fitTriggerWidth" }] : []));
    density = 'default';
    highlightCaseSensitive = false;
    loading = false;
    disableSelectionTracking = false;
    textToHighlight = '';
    loadingVariant = 'spinner';
    loadingSkeletonTemplate = null;
    footerMessage = '';
    footerTemplate = null;
    emptyStateTemplate = null;
    optionTemplate = null;
    groupLabelTemplate = null;
    /**
     * @internal
     * This input is used internally for rendering the phone-number search header.
     */
    headerTemplate = null;
    ariaLabel = '';
    ariaLabelledby = '';
    id = `q-dropmenu-${_uniqueIdCounter++}`;
    dataQt = 'q-dropmenu';
    /**
     * `CdkOverlayOrigin` directive usage is deprecated. Use `qDropmenuOrigin` directive instead.
     */
    get dropmenuTrigger() {
        return this._dropmenuTrigger;
    }
    set dropmenuTrigger(value) {
        this._dropmenuTrigger = value;
        this._popoverDirective.setPopoverTriggerElement(this.dropmenuTrigger?.elementRef.nativeElement);
    }
    get groupBy() {
        return this._groupBy;
    }
    set groupBy(value) {
        this._groupBy = value;
        if (this.options) {
            this._handleGroupedOptions(this.options);
        }
    }
    get groupLabel() {
        return this._groupLabel;
    }
    set groupLabel(value) {
        this._groupLabel = value;
        if (this.groupBy && this.options) {
            this._handleGroupedOptions(this.options);
        }
    }
    get options() {
        return this._options;
    }
    set options(value) {
        if (this.groupBy) {
            this._handleGroupedOptions(value);
        }
        else {
            this._options = value;
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (value === this._value)
            return;
        this._value = value;
    }
    /**
     * @deprecated Use `--awds-dropmenu-container-min-width` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get minWidth() {
        return this._elementRef.nativeElement.style.getPropertyValue('--awds-dropmenu-container-min-width');
    }
    set minWidth(value) {
        this._elementRef.nativeElement.style.setProperty('--awds-dropmenu-container-min-width', `${value}px`);
    }
    /**
     * @deprecated Use `--awds-dropmenu-container-min-height` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get minHeight() {
        return this._elementRef.nativeElement.style.getPropertyValue('--awds-dropmenu-container-min-height');
    }
    set minHeight(value) {
        this._elementRef.nativeElement.style.setProperty('--awds-dropmenu-container-min-height', `${value}px`);
    }
    /**
     * @deprecated Use `offset` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get offsetY() {
        return this._popoverDirective.offset;
    }
    set offsetY(value) {
        this._popoverDirective.offset = value;
    }
    /**
     * @deprecated Use `offset` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get offsetX() {
        return this._popoverDirective.offset;
    }
    set offsetX(value) {
        this._popoverDirective.offset = value;
    }
    /**
     * @deprecated Use `placement` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get xPosition() {
        return this._xPosition;
    }
    set xPosition(value) {
        this._xPosition = value;
        this._popoverDirective.placement =
            OVERLAY_POSITION_PLACEMENT_MAP[`${this.yPosition}-${this._xPosition}`];
    }
    /**
     * @deprecated Use `placement` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get yPosition() {
        return this._yPosition;
    }
    set yPosition(value) {
        this._yPosition = value;
        this._popoverDirective.placement =
            OVERLAY_POSITION_PLACEMENT_MAP[`${this._yPosition}-${this._xPosition}`];
    }
    /**
     * @deprecated Use `fitTriggerWidth` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get fitOverlayWidth() {
        return this.fitTriggerWidth();
    }
    set fitOverlayWidth(value) {
        this.fitTriggerWidth.set(value);
    }
    /**
     * @deprecated There's no replacement for this.
     * @breaking-change First major after 25 Feb 2026
     */
    get useOverlay() {
        return this._useOverlay();
    }
    set useOverlay(value) {
        this._useOverlay.set(value);
    }
    /**
     * @deprecated Use `backdropEnabled` instead.
     * @breaking-change First major after 25 Feb 2026
     */
    get overlayHasBackdrop() {
        return this.backdropEnabled();
    }
    set overlayHasBackdrop(value) {
        this.backdropEnabled.set(value);
    }
    optionsQuery;
    _tabIndex = -1;
    _hostClass = 'q-dropmenu';
    _popover = computed(this._computerPopover.bind(this), ...(ngDevMode ? [{ debugName: "_popover" }] : []));
    _groupedOptions = [];
    _options = [];
    _value = null;
    _withTypeahead = true;
    _selectKeys = [ENTER, SPACE];
    _groupBy = null;
    _groupLabel = null;
    isOpened = false;
    _useOverlay = signal(true, ...(ngDevMode ? [{ debugName: "_useOverlay" }] : []));
    _xPosition = 'start';
    _yPosition = 'below';
    _dropmenuTrigger = null;
    _isKeyboardNavigation = false;
    _selectionModel = new SelectionModel();
    _keyManager = null;
    _cdr = inject(ChangeDetectorRef);
    _document = inject(DOCUMENT);
    _iconRegistry = inject(QIconRegistryService);
    _destroy$ = injectDestroy();
    _focusMonitor = inject(FocusMonitor);
    _renderer = inject(Renderer2);
    _elementRef = inject(ElementRef);
    _popoverDirective = inject(QPopoverDirective, { host: true });
    constructor() {
        effect(() => {
            this._fitContainerToTrigger();
        });
        this._popoverDirective.placement = 'bottom-start';
    }
    ngOnInit() {
        this._iconRegistry.registerIcons([search]);
        this._handleCleanups();
    }
    ngAfterViewInit() {
        this._setKeyManager();
        this._handleKeyManagerTabOut();
        this._setTriggerStaticArias();
        this._updateTriggerAriaControls();
        this._handleTriggerDynamicArias();
        this._setKeydownListener();
        this._handleSelectionModelChange();
        this._handleOptionsChange();
        this._monitorKeyboardNavigation();
        this._updateTriggerAriaExpanded(this.isOpened);
        this._handlePopoverOpened();
        this._handlePopoverClosed();
    }
    open() {
        if (this.isOpened)
            return;
        this._fitContainerToTrigger();
        this._elementRef.nativeElement.showPopover({
            source: this.dropmenuTrigger?.elementRef.nativeElement,
        });
        this._initializeSelection();
        this._highlightCorrectOption();
        this._scrollOptionIntoView(this._keyManager?.activeItemIndex || 0);
        this._cdr.markForCheck();
    }
    close() {
        this._elementRef.nativeElement.hidePopover();
    }
    /**
     * @param force A boolean, which causes toggle to behave like open or close.
     * If set to true, the dropmenu is opened if it was initially closed. If it was initially opened, nothing happens.
     * If set to false, the dropmenu is closed if it was initially opened. If it was initially closed, nothing happens.
     */
    toggle(force) {
        this._elementRef.nativeElement.togglePopover({
            force: force,
            source: this.dropmenuTrigger?.elementRef.nativeElement,
        });
    }
    _getAriaActiveDescendant() {
        if (this.isOpened && this._keyManager && this._keyManager.activeItem) {
            return this._keyManager.activeItem.id;
        }
        return '';
    }
    _handleKeydown = (event) => {
        if (!this.isOpened)
            return;
        if (!this._withTypeahead) {
            const isCharacterKey = !!event.key && event.key.length === 1 && !hasModifierKey(event);
            if (isCharacterKey)
                return;
        }
        this._handleOpenKeydown(event);
    };
    _onOptionSelectionChange(event) {
        this._onSelect(event.source, event.isUserInput);
        if (event.isUserInput && this.isOpened) {
            this.close();
        }
    }
    _trackOptionByFn(_index, displayOption) {
        return displayOption.trackById ?? _index;
    }
    _getGlobalIndex(groupIndex, optionIndex) {
        let cumulativeIndex = 0;
        for (let i = 0; i < groupIndex; i++) {
            cumulativeIndex += this._groupedOptions[i].options.length;
        }
        return cumulativeIndex + optionIndex;
    }
    _getTriggerHostElement() {
        return this.dropmenuTrigger?.elementRef.nativeElement;
    }
    _getDropmenuHostElement() {
        return this._elementRef.nativeElement;
    }
    resetActiveAfterOptionsChange() {
        if (!this._keyManager)
            return;
        const optionsCount = this.optionsQuery.length;
        if (optionsCount === 0) {
            this._keyManager.updateActiveItem(-1);
            this._updateTriggerAriaActiveDescendant(true);
            this._cdr.markForCheck();
            return;
        }
        const selectedOption = this._selectionModel.selected[0] || null;
        const selectedInList = selectedOption && this.optionsQuery.find((o) => o === selectedOption);
        if (selectedInList && selectedOption) {
            this._keyManager.setActiveItem(selectedOption);
        }
        else {
            this._keyManager.setActiveItem(this.optionsQuery.first);
        }
        const activeIndex = this._keyManager.activeItemIndex ?? 0;
        this._scrollOptionIntoView(activeIndex);
        this._updateTriggerAriaActiveDescendant(true);
        this._cdr.markForCheck();
    }
    scrollOptionIntoView(option, alignment = 'nearest') {
        if (!option)
            return;
        const container = this._elementRef.nativeElement.querySelector('.q-dropmenu-list');
        if (!container)
            return;
        const optionElement = option.getHostElement();
        const scrollPaddingTop = parseFloat(this._document.defaultView?.getComputedStyle(container).scrollPaddingTop || '0');
        const scrollPaddingBottom = parseFloat(this._document.defaultView?.getComputedStyle(container).scrollPaddingBottom || '0');
        const containerRect = container.getBoundingClientRect();
        const optionRect = optionElement.getBoundingClientRect();
        const relativeTop = optionRect.top - containerRect.top + container.scrollTop;
        let elementTop = relativeTop - scrollPaddingTop;
        const optionIndex = this.optionsQuery.toArray().indexOf(option);
        const hasGroupLabels = this._hasGroupLabelsBeforeOption(optionIndex);
        if (hasGroupLabels) {
            const currentGroup = this._groupedOptions.find((group) => group.options.some((groupOption) => groupOption.value === option.value));
            const isFirstOptionInGroup = currentGroup?.options[0].value === option.value;
            if (isFirstOptionInGroup) {
                const headerTop = this._getGroupHeaderTop(optionElement, container);
                if (isPresent(headerTop)) {
                    elementTop = headerTop - scrollPaddingTop;
                }
            }
        }
        if (alignment === 'top') {
            container.scrollTop = elementTop;
        }
        else {
            const elementBottom = relativeTop + optionElement.offsetHeight + scrollPaddingBottom;
            const containerTop = container.scrollTop;
            const containerBottom = containerTop + container.offsetHeight;
            if (elementTop < containerTop) {
                container.scrollTop = elementTop;
            }
            else if (elementBottom > containerBottom) {
                container.scrollTop = Math.max(0, elementBottom - container.offsetHeight);
            }
        }
    }
    _handleKeyManagerTabOut() {
        this._keyManager?.tabOut.pipe(takeUntil(this._destroy$)).subscribe(() => {
            if (!this.isOpened)
                return;
            if (this._keyManager?.activeItem) {
                this._keyManager?.activeItem.selectViaInteraction();
            }
            this.close();
        });
    }
    get selected() {
        return this._selectionModel.selected[0];
    }
    get empty() {
        return !this._selectionModel || this._selectionModel.isEmpty();
    }
    get hasFooter() {
        return ((!!this.footerMessage || !!this.footerTemplate) && !this.loading && !!this.options.length);
    }
    /**
     * @deprecated There's no replacement for this.
     * @breaking-change First major after 25 Feb 2026
     */
    get overlayMinHeight() {
        return !!this.minHeight && !this.loading && !!this.options.length ? this.minHeight : 0;
    }
    /**
     * @deprecated There's no replacement for this.
     * @breaking-change First major after 25 Feb 2026
     */
    get overlayWidth() {
        return this.dropmenuTrigger?.elementRef.nativeElement?.clientWidth || 0;
    }
    get triggerValue() {
        return this.empty ? '' : this.selected.getLabel();
    }
    _handlePopoverOpened() {
        this._popoverDirective.opened.subscribe(() => {
            this.isOpened = true;
            this._cdr.markForCheck();
            this.opened.emit();
            this._updateTriggerAriaExpanded(true);
            this._updateTriggerAriaActiveDescendant(true);
        });
    }
    _handlePopoverClosed() {
        this._popoverDirective.closed.subscribe(() => {
            this.isOpened = false;
            this._cdr.markForCheck();
            this.closed.emit();
            this._updateTriggerAriaExpanded(false);
            this._updateTriggerAriaActiveDescendant(false);
        });
    }
    _handleGroupedOptions(options) {
        if (!this.groupBy)
            return;
        const groups = this._getGroupedOptions(options, this.groupBy);
        this._groupedOptions = groups.map(({ groupKey, options: groupOptions }) => ({
            groupLabel: this._getGroupLabel(groupKey, groupOptions),
            options: groupOptions,
        }));
        this._options = options;
    }
    _getGroupedOptions(options, groupBy) {
        const groupsMap = new Map();
        options.forEach((item) => {
            const groupKey = typeof groupBy === 'string' ? item.value[groupBy] : groupBy(item);
            if (!groupsMap.has(groupKey)) {
                groupsMap.set(groupKey, []);
            }
            groupsMap.get(groupKey)?.push(item);
        });
        const undefinedGroup = groupsMap.get(undefined);
        if (undefinedGroup) {
            groupsMap.delete(undefined);
        }
        const existingGroups = Array.from(groupsMap.entries()).map(([groupKey, options]) => ({
            groupKey,
            options,
        }));
        return undefinedGroup
            ? [...existingGroups, { groupKey: undefined, options: undefinedGroup }]
            : existingGroups;
    }
    _getGroupLabel(groupKey, options) {
        if (!this._groupLabel) {
            return null;
        }
        if (typeof this._groupLabel === 'object' && this._groupLabel !== null) {
            const key = groupKey?.toString() || '';
            return this._groupLabel[key] || key;
        }
        if (typeof this._groupLabel === 'string') {
            return (groupKey?.[this._groupLabel]?.toString() ||
                groupKey?.toString() ||
                '');
        }
        if (typeof this._groupLabel === 'function') {
            return this._groupLabel(groupKey, options);
        }
        return groupKey?.toString() || '';
    }
    _handleOpenKeydown(event) {
        this._isKeyboardNavigation = true;
        const manager = this._keyManager;
        const code = event.code;
        const isTyping = manager?.isTyping();
        if (code === UP_ARROW && event.altKey) {
            event.preventDefault();
            manager?.activeItem?.selectViaInteraction();
            this.close();
        }
        else if (!isTyping &&
            this._selectKeys.includes(code) &&
            manager?.activeItem &&
            !hasModifierKey(event)) {
            event.preventDefault();
            manager.activeItem.selectViaInteraction();
        }
        else {
            manager?.onKeydown(event);
        }
    }
    _initializeSelection() {
        this._setSelectionByValue(this._value);
    }
    _setSelectionByValue(value) {
        this.optionsQuery?.forEach((option) => option.setInactiveStyles());
        this._selectionModel.clear();
        const correspondingOption = this._selectOptionByValue(value);
        if (correspondingOption) {
            this._keyManager?.updateActiveItem(correspondingOption);
        }
        else if (!this.isOpened) {
            this._keyManager?.updateActiveItem(-1);
        }
        this._cdr.detectChanges();
    }
    _selectOptionByValue(value) {
        const correspondingOption = this.optionsQuery.find((option) => option.value === value) ||
            null;
        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }
        else if (this.empty) {
            this._selectionModel.clear();
        }
        return correspondingOption;
    }
    _setKeyManager() {
        if (!this.optionsQuery)
            return;
        this._keyManager = new ActiveDescendantKeyManager(this.optionsQuery)
            .withHomeAndEnd()
            .withPageUpDown();
        if (this._withTypeahead) {
            this._keyManager.withTypeAhead();
        }
    }
    _onSelect(option, isUserInput) {
        const wasSelected = this._selectionModel.isSelected(option);
        if (wasSelected !== option.selected) {
            option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
            this._propagateChanges();
        }
        if (isUserInput) {
            this._keyManager?.setActiveItem(option);
        }
    }
    _propagateChanges() {
        this._value = this.selected.value;
        this.valueChange.emit(this.options.find((option) => option.value === this.value));
        this.selectionChange.emit({ source: this, option: this.selected });
        this._cdr.markForCheck();
    }
    _highlightCorrectOption() {
        if (!this._keyManager || !this._isKeyboardNavigation)
            return;
        this.empty
            ? this._keyManager.setFirstItemActive()
            : this._keyManager.setActiveItem(this.selected);
    }
    _getGroupHeaderTop(optionElement, container) {
        let currentElement = optionElement.previousElementSibling;
        let headerTop = null;
        const containerRect = container.getBoundingClientRect();
        while (currentElement) {
            if (currentElement.tagName.toLowerCase() === 'q-divider' ||
                currentElement.tagName.toLowerCase() === 'q-dropmenu-option') {
                break;
            }
            const elementRect = currentElement.getBoundingClientRect();
            headerTop = elementRect.top - containerRect.top + container.scrollTop;
            currentElement = currentElement.previousElementSibling;
        }
        return headerTop;
    }
    _hasGroupLabelsBeforeOption(optionIndex) {
        if (!this.groupBy)
            return false;
        let currentOptionCount = 0;
        for (const group of this._groupedOptions) {
            if (currentOptionCount > optionIndex)
                break;
            if (group.groupLabel !== null || this.groupLabelTemplate) {
                return true;
            }
            currentOptionCount += group.options.length;
        }
        return false;
    }
    _scrollOptionIntoView(index) {
        if (index < 0)
            return;
        const option = this.optionsQuery.get(index);
        if (!option)
            return;
        this.scrollOptionIntoView(option, 'top');
    }
    _handleOptionsChange() {
        this.optionsQuery?.changes
            .pipe(startWith(null), takeUntil(this._destroy$))
            .subscribe(() => this._initializeSelection());
    }
    _handleSelectionModelChange() {
        this._selectionModel.changed
            .pipe(takeUntil(this._destroy$))
            .subscribe((event) => {
            event.added.forEach((option) => option.select());
            event.removed.forEach((option) => option.deselect());
        });
    }
    _handleTriggerDynamicArias() {
        this._keyManager?.change
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this._updateTriggerAriaActiveDescendant());
    }
    _setTriggerStaticArias() {
        const trigger = this._getTriggerHostElement();
        if (!trigger)
            return;
        this._renderer.setAttribute(trigger, 'role', 'combobox');
        this._renderer.setAttribute(trigger, 'aria-haspopup', 'listbox');
    }
    _updateTriggerAriaControls() {
        const trigger = this._getTriggerHostElement();
        if (!trigger)
            return;
        this._renderer.setAttribute(trigger, 'aria-controls', this.id);
    }
    _updateTriggerAriaExpanded(isOpen) {
        const trigger = this._getTriggerHostElement();
        if (!trigger)
            return;
        this._renderer.setAttribute(trigger, 'aria-expanded', isOpen ? 'true' : 'false');
    }
    _updateTriggerAriaActiveDescendant(isOpen = true) {
        const trigger = this._getTriggerHostElement();
        if (!trigger)
            return;
        isOpen
            ? this._renderer.setAttribute(trigger, 'aria-activedescendant', this._getAriaActiveDescendant())
            : this._renderer.removeAttribute(trigger, 'aria-activedescendant');
    }
    _monitorKeyboardNavigation() {
        const trigger = this._getTriggerHostElement();
        if (!trigger)
            return;
        this._focusMonitor
            .monitor(trigger)
            .pipe(takeUntil(this._destroy$))
            .subscribe((event) => (this._isKeyboardNavigation = event === 'keyboard'));
    }
    _setKeydownListener() {
        const trigger = this._getTriggerHostElement();
        if (!trigger)
            return;
        trigger.addEventListener('keydown', this._handleKeydown);
    }
    _handleCleanups() {
        const trigger = this._getTriggerHostElement();
        this._destroy$.onDestroy(() => {
            this._keyManager?.destroy();
            if (trigger) {
                this._focusMonitor.stopMonitoring(trigger);
                trigger.removeEventListener('keydown', this._handleKeydown);
            }
        });
    }
    _computerPopover() {
        if (!this._useOverlay()) {
            this._popoverDirective._hostClass = '';
            return null;
        }
        return this.backdropEnabled() ? 'auto' : 'manual';
    }
    _fitContainerToTrigger() {
        if (this.fitTriggerWidth()) {
            this._elementRef.nativeElement.style.setProperty('--awds-dropmenu-container-width', `${this.dropmenuTrigger?.elementRef.nativeElement.clientWidth}px`);
        }
        else {
            this._elementRef.nativeElement.style.removeProperty('--awds-dropmenu-container-width');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QDropmenuComponent, isStandalone: true, selector: "q-dropmenu", inputs: { backdropEnabled: { classPropertyName: "backdropEnabled", publicName: "backdropEnabled", isSignal: true, isRequired: false, transformFunction: null }, fitTriggerWidth: { classPropertyName: "fitTriggerWidth", publicName: "fitTriggerWidth", isSignal: true, isRequired: false, transformFunction: null }, density: { classPropertyName: "density", publicName: "density", isSignal: false, isRequired: false, transformFunction: null }, highlightCaseSensitive: { classPropertyName: "highlightCaseSensitive", publicName: "highlightCaseSensitive", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, disableSelectionTracking: { classPropertyName: "disableSelectionTracking", publicName: "disableSelectionTracking", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, textToHighlight: { classPropertyName: "textToHighlight", publicName: "textToHighlight", isSignal: false, isRequired: false, transformFunction: null }, loadingVariant: { classPropertyName: "loadingVariant", publicName: "loadingVariant", isSignal: false, isRequired: false, transformFunction: null }, loadingSkeletonTemplate: { classPropertyName: "loadingSkeletonTemplate", publicName: "loadingSkeletonTemplate", isSignal: false, isRequired: false, transformFunction: null }, footerMessage: { classPropertyName: "footerMessage", publicName: "footerMessage", isSignal: false, isRequired: false, transformFunction: null }, footerTemplate: { classPropertyName: "footerTemplate", publicName: "footerTemplate", isSignal: false, isRequired: false, transformFunction: null }, emptyStateTemplate: { classPropertyName: "emptyStateTemplate", publicName: "emptyStateTemplate", isSignal: false, isRequired: false, transformFunction: null }, optionTemplate: { classPropertyName: "optionTemplate", publicName: "optionTemplate", isSignal: false, isRequired: false, transformFunction: null }, groupLabelTemplate: { classPropertyName: "groupLabelTemplate", publicName: "groupLabelTemplate", isSignal: false, isRequired: false, transformFunction: null }, headerTemplate: { classPropertyName: "headerTemplate", publicName: "headerTemplate", isSignal: false, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "aria-label", isSignal: false, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "aria-labelledby", isSignal: false, isRequired: false, transformFunction: null }, id: { classPropertyName: "id", publicName: "id", isSignal: false, isRequired: false, transformFunction: null }, dataQt: { classPropertyName: "dataQt", publicName: "dataQt", isSignal: false, isRequired: false, transformFunction: null }, dropmenuTrigger: { classPropertyName: "dropmenuTrigger", publicName: "dropmenuTrigger", isSignal: false, isRequired: false, transformFunction: null }, groupBy: { classPropertyName: "groupBy", publicName: "groupBy", isSignal: false, isRequired: false, transformFunction: null }, groupLabel: { classPropertyName: "groupLabel", publicName: "groupLabel", isSignal: false, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: false, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: false, isRequired: false, transformFunction: null }, minWidth: { classPropertyName: "minWidth", publicName: "minWidth", isSignal: false, isRequired: false, transformFunction: numberAttribute }, minHeight: { classPropertyName: "minHeight", publicName: "minHeight", isSignal: false, isRequired: false, transformFunction: numberAttribute }, offsetY: { classPropertyName: "offsetY", publicName: "offsetY", isSignal: false, isRequired: false, transformFunction: numberAttribute }, offsetX: { classPropertyName: "offsetX", publicName: "offsetX", isSignal: false, isRequired: false, transformFunction: numberAttribute }, xPosition: { classPropertyName: "xPosition", publicName: "xPosition", isSignal: false, isRequired: false, transformFunction: null }, yPosition: { classPropertyName: "yPosition", publicName: "yPosition", isSignal: false, isRequired: false, transformFunction: null }, fitOverlayWidth: { classPropertyName: "fitOverlayWidth", publicName: "fitOverlayWidth", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, useOverlay: { classPropertyName: "useOverlay", publicName: "useOverlay", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, overlayHasBackdrop: { classPropertyName: "overlayHasBackdrop", publicName: "overlayHasBackdrop", isSignal: false, isRequired: false, transformFunction: booleanAttribute } }, outputs: { selectionChange: "selectionChange", valueChange: "valueChange", opened: "opened", closed: "closed", backdropEnabled: "backdropEnabledChange", fitTriggerWidth: "fitTriggerWidthChange" }, host: { properties: { "attr.popover": "_popover()", "attr.data-qt": "this.dataQt", "attr.tabindex": "this._tabIndex", "class": "this._hostClass" } }, providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], viewQueries: [{ propertyName: "optionsQuery", predicate: QDropmenuOptionComponent, descendants: true }], hostDirectives: [{ directive: i1.QPopoverDirective, inputs: ["qPopoverPlacement", "placement", "qPopoverOffset", "offset"] }], ngImport: i0, template: "@if (useOverlay) {\n  @if (loading) {\n    <div class=\"q-dropmenu-loading-container\">\n      @if (loadingVariant === 'spinner') {\n        <q-spinner [size]=\"'small'\" />\n      } @else {\n        @if (loadingSkeletonTemplate) {\n          <ng-container [ngTemplateOutlet]=\"loadingSkeletonTemplate\" />\n        } @else {\n          <div class=\"q-dropmenu-skeleton-container\">\n            @for (_ of [1, 2, 3, 4]; track $index) {\n              <div class=\"q-dropmenu-skeleton-item\">\n                <q-skeleton class=\"q-dropmenu-skeleton-item-avatar\" [height]=\"24\" [width]=\"24\" />\n                <q-skeleton class=\"q-dropmenu-skeleton-item-label\" [height]=\"14\" />\n              </div>\n            }\n          </div>\n        }\n      }\n    </div>\n  } @else {\n    @if (headerTemplate) {\n      <ng-container [ngTemplateOutlet]=\"headerTemplate\" />\n    }\n\n    @if (!options.length) {\n      <div\n        [class.q-dropmenu-empty-custom-container]=\"emptyStateTemplate\"\n        [class.q-dropmenu-empty-container]=\"!emptyStateTemplate\">\n        <div\n          [class.q-dropmenu-empty-custom-message]=\"emptyStateTemplate\"\n          [class.q-dropmenu-empty-message]=\"!emptyStateTemplate\">\n          @if (emptyStateTemplate) {\n            <ng-container [ngTemplateOutlet]=\"emptyStateTemplate\" />\n          } @else {\n            <q-icon [size]=\"'24'\" name=\"search\" />\n            <span class=\"q-dropmenu-empty-message-label\">\n              {{ 'allspark.dropmenu.notFoundMessage' | transloco }}\n            </span>\n          }\n        </div>\n      </div>\n    } @else {\n      <ng-container [ngTemplateOutlet]=\"menulist\" />\n    }\n  }\n\n  @if (hasFooter) {\n    <div class=\"q-dropmenu-footer\">\n      @if (footerTemplate) {\n        <ng-container [ngTemplateOutlet]=\"footerTemplate\" />\n      } @else {\n        <span> {{ footerMessage }} </span>\n      }\n    </div>\n  }\n} @else {\n  <ng-container [ngTemplateOutlet]=\"menulist\" />\n}\n\n<ng-template #menulist>\n  <div\n    role=\"listbox\"\n    tabindex=\"-1\"\n    class=\"q-dropmenu-list\"\n    [attr.id]=\"id\"\n    [attr.aria-label]=\"ariaLabel || null\"\n    [attr.aria-labelledby]=\"ariaLabel ? null : ariaLabelledby || null\"\n    [style.minHeight.px]=\"overlayMinHeight\">\n    @if (groupBy) {\n      @for (groupData of _groupedOptions; track $index; let groupIndex = $index) {\n        @if (groupData.groupLabel !== null || groupLabelTemplate) {\n          @if (groupLabelTemplate) {\n            <ng-container\n              [ngTemplateOutlet]=\"groupLabelTemplate\"\n              [ngTemplateOutletContext]=\"{\n                $implicit: groupData.groupLabel,\n                options: groupData.options,\n                density: density,\n                index: groupIndex,\n              }\" />\n          } @else {\n            <div class=\"q-dropmenu-group-header q-dropmenu-density-{{ density }}\">\n              <div class=\"q-dropmenu-group-label\">\n                {{ groupData.groupLabel }}\n              </div>\n            </div>\n          }\n        }\n\n        @for (\n          option of groupData.options;\n          track _trackOptionByFn($index, option);\n          let optionIndex = $index\n        ) {\n          <ng-container\n            [ngTemplateOutlet]=\"optionRef\"\n            [ngTemplateOutletContext]=\"{\n              option: option,\n              index: _getGlobalIndex(groupIndex, optionIndex),\n            }\" />\n        }\n\n        @if (groupIndex < _groupedOptions.length - 1) {\n          <q-divider />\n        }\n      }\n    } @else {\n      @for (option of options; track _trackOptionByFn($index, option); let index = $index) {\n        <ng-container\n          [ngTemplateOutlet]=\"optionRef\"\n          [ngTemplateOutletContext]=\"{ option: option, index: index }\" />\n      }\n    }\n  </div>\n</ng-template>\n\n<ng-template #optionRef let-option=\"option\" let-index=\"index\">\n  <q-dropmenu-option\n    [value]=\"option.value\"\n    [label]=\"option.label\"\n    [subLabel]=\"option.subLabel || ''\"\n    [icon]=\"option.icon || ''\"\n    [index]=\"index\"\n    [textToHighlight]=\"textToHighlight\"\n    [optionTemplate]=\"optionTemplate\"\n    [disabled]=\"option.disabled\"\n    [highlightCaseSensitive]=\"highlightCaseSensitive\"\n    [useOverlay]=\"useOverlay\"\n    (selectionChange)=\"_onOptionSelectionChange($event)\" />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu{grid-template-areas:\"list\" \"footer\";grid-template-rows:1fr auto;grid-template-columns:100%;margin:var(--awds-dropmenu-container-margin, 0);padding:var(--awds-dropmenu-container-padding, 0);height:var(--awds-dropmenu-container-height, fit-content);width:var(--awds-dropmenu-container-width, fit-content);max-height:var(--awds-dropmenu-container-max-height, calc(208px + 2 * var(--ads-border-width-hairline)));max-width:var(--awds-dropmenu-container-max-width, none);-webkit-backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);outline:var(--awds-dropmenu-container-outline, none);overflow:hidden;border:var(--awds-dropmenu-container-border, var(--awds-dropmenu-overlay-panel-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400)));box-shadow:var(--awds-dropmenu-container-box-shadow, var(--awds-dropmenu-overlay-panel-box-shadow, 0 4px 8px rgba(0, 0, 0, .08)));border-radius:var(--awds-dropmenu-container-border-radius, var(--awds-dropmenu-overlay-panel-border-radius, var(--ads-border-radius-m)));background:var(--awds-dropmenu-container-background, var(--awds-dropmenu-overlay-panel-background, var(--ads-color-body-100)))}.q-dropmenu:popover-open{display:grid}.q-dropmenu:not(:has(.q-dropmenu-empty-container,.q-dropmenu-loading-container)){min-width:var(--awds-dropmenu-container-min-width, 168px);min-height:var(--awds-dropmenu-container-min-height, auto)}.q-dropmenu-list{box-sizing:border-box;grid-area:list;overflow:auto;list-style:var(--awds-dropmenu-container-list-style, none);scroll-padding-top:var(--awds-dropmenu-container-scroll-padding-top, var(--ads-size-micro));scroll-padding-bottom:var(--awds-dropmenu-container-scroll-padding-bottom, var(--ads-size-micro))}.q-dropmenu-list:before,.q-dropmenu-list:after{content:\"\";display:block;height:var(--awds-dropmenu-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-container-spacing-width, 100%)}.q-dropmenu-empty-container{display:flex;align-items:center;width:var(--awds-dropmenu-empty-container-width, 100%);min-width:var(--awds-dropmenu-empty-container-min-width, 166px);height:var(--awds-dropmenu-empty-container-height, 208px);padding:var(--awds-dropmenu-empty-container-padding, var(--ads-size-xxxs))}.q-dropmenu-empty-message{display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--awds-dropmenu-empty-message-width, 100%);height:var(--awds-dropmenu-empty-message-height, 58px);gap:var(--awds-dropmenu-empty-message-gap, var(--ads-size-xxxs))}.q-dropmenu-empty-message-label{font-family:var(--awds-dropmenu-empty-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-message-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-empty-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-message-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-empty-message-text-transform, none);text-align:center}.q-dropmenu-empty-custom-container{width:var(--awds-dropmenu-empty-custom-container-width, 100%);min-width:var(--awds-dropmenu-empty-custom-container-min-width, 166px)}.q-dropmenu-empty-custom-container:before,.q-dropmenu-empty-custom-container:after{content:\"\";display:block;height:var(--awds-dropmenu-empty-custom-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-empty-custom-container-spacing-width, 100%)}.q-dropmenu-empty-custom-message{font-family:var(--awds-dropmenu-empty-custom-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-custom-message-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-empty-custom-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-custom-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-custom-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-custom-message-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-empty-custom-message-text-transform, none);width:var(--awds-dropmenu-empty-custom-message-width, 100%);padding:var(--awds-dropmenu-empty-custom-message-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-loading-container{display:flex;align-items:center;justify-content:center;width:var(--awds-dropmenu-loading-container-width, 100%);min-width:var(--awds-dropmenu-loading-container-min-width, 166px);height:var(--awds-dropmenu-loading-container-height, 208px);padding:var(--awds-dropmenu-loading-container-padding, var(--ads-size-xxxs))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container{display:flex;flex-direction:column;height:var(--awds-dropmenu-loading-skeleton-container-height, 100%);flex:1}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item{display:flex;align-items:center;flex:1;width:var(--awds-dropmenu-loading-skeleton-item-width, 60%);margin-left:var(--awds-dropmenu-loading-skeleton-item-margin-left, var(--ads-size-nano))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-avatar{margin-right:var(--awds-dropmenu-loading-skeleton-item-avatar-margin-right, var(--ads-size-micro))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-label{flex:1}.q-dropmenu-loading-container .q-spinner{position:relative}.q-dropmenu-footer{font-family:var(--awds-dropmenu-footer-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-footer-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-footer-font-style, inherit);font-weight:var(--awds-dropmenu-footer-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-footer-letter-spacing, 0);line-height:var(--awds-dropmenu-footer-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-footer-text-transform, none);background:var(--awds-dropmenu-footer-background, var(--ads-color-body-200));padding:var(--awds-dropmenu-footer-padding, var(--ads-size-xxxs) var(--ads-size-xxs) var(--ads-size-xs) var(--ads-size-xxs));grid-area:footer}.q-dropmenu[popover]{color:inherit}.q-dropmenu-group-header{display:flex;flex-direction:column;padding:var(--awds-dropmenu-group-header-padding, var(--ads-size-xxxs) var(--ads-size-xxs));background:var(--awds-dropmenu-group-header-background, var(--ads-color-body-100));gap:var(--awds-dropmenu-group-header-gap, var(--ads-size-nano))}.q-dropmenu-group-header.q-dropmenu-density-compact{padding:var(--awds-dropmenu-compact-group-header-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-group-label{font-family:var(--awds-dropmenu-group-label-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-group-label-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-group-label-font-style, inherit);font-weight:var(--awds-dropmenu-group-label-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-dropmenu-group-label-letter-spacing, 0);line-height:var(--awds-dropmenu-group-label-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-group-label-text-transform, none);color:var(--awds-dropmenu-group-label-color, var(--ads-color-body-500))}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "component", type: QSpinnerComponent, selector: "q-spinner", inputs: ["variant", "size", "dataQt"] }, { kind: "component", type: QSkeletonComponent, selector: "q-skeleton", inputs: ["width", "height", "radius", "dataQt"] }, { kind: "component", type: QDropmenuOptionComponent, selector: "q-dropmenu-option", inputs: ["value", "label", "subLabel", "icon", "index", "textToHighlight", "optionTemplate", "highlightCaseSensitive", "useOverlay", "disabled"], outputs: ["selectionChange"] }, { kind: "component", type: QDividerComponent, selector: "q-divider", inputs: ["type", "style", "orientation", "dataQt"] }, { kind: "pipe", type: i2.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-dropmenu', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [
                        NgTemplateOutlet,
                        TranslocoModule,
                        QIconComponent,
                        QSpinnerComponent,
                        QSkeletonComponent,
                        QDropmenuOptionComponent,
                        QDividerComponent,
                    ], providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], hostDirectives: [
                        {
                            directive: QPopoverDirective,
                            inputs: ['qPopoverPlacement: placement', 'qPopoverOffset: offset'],
                        },
                    ], host: {
                        '[attr.popover]': '_popover()',
                    }, template: "@if (useOverlay) {\n  @if (loading) {\n    <div class=\"q-dropmenu-loading-container\">\n      @if (loadingVariant === 'spinner') {\n        <q-spinner [size]=\"'small'\" />\n      } @else {\n        @if (loadingSkeletonTemplate) {\n          <ng-container [ngTemplateOutlet]=\"loadingSkeletonTemplate\" />\n        } @else {\n          <div class=\"q-dropmenu-skeleton-container\">\n            @for (_ of [1, 2, 3, 4]; track $index) {\n              <div class=\"q-dropmenu-skeleton-item\">\n                <q-skeleton class=\"q-dropmenu-skeleton-item-avatar\" [height]=\"24\" [width]=\"24\" />\n                <q-skeleton class=\"q-dropmenu-skeleton-item-label\" [height]=\"14\" />\n              </div>\n            }\n          </div>\n        }\n      }\n    </div>\n  } @else {\n    @if (headerTemplate) {\n      <ng-container [ngTemplateOutlet]=\"headerTemplate\" />\n    }\n\n    @if (!options.length) {\n      <div\n        [class.q-dropmenu-empty-custom-container]=\"emptyStateTemplate\"\n        [class.q-dropmenu-empty-container]=\"!emptyStateTemplate\">\n        <div\n          [class.q-dropmenu-empty-custom-message]=\"emptyStateTemplate\"\n          [class.q-dropmenu-empty-message]=\"!emptyStateTemplate\">\n          @if (emptyStateTemplate) {\n            <ng-container [ngTemplateOutlet]=\"emptyStateTemplate\" />\n          } @else {\n            <q-icon [size]=\"'24'\" name=\"search\" />\n            <span class=\"q-dropmenu-empty-message-label\">\n              {{ 'allspark.dropmenu.notFoundMessage' | transloco }}\n            </span>\n          }\n        </div>\n      </div>\n    } @else {\n      <ng-container [ngTemplateOutlet]=\"menulist\" />\n    }\n  }\n\n  @if (hasFooter) {\n    <div class=\"q-dropmenu-footer\">\n      @if (footerTemplate) {\n        <ng-container [ngTemplateOutlet]=\"footerTemplate\" />\n      } @else {\n        <span> {{ footerMessage }} </span>\n      }\n    </div>\n  }\n} @else {\n  <ng-container [ngTemplateOutlet]=\"menulist\" />\n}\n\n<ng-template #menulist>\n  <div\n    role=\"listbox\"\n    tabindex=\"-1\"\n    class=\"q-dropmenu-list\"\n    [attr.id]=\"id\"\n    [attr.aria-label]=\"ariaLabel || null\"\n    [attr.aria-labelledby]=\"ariaLabel ? null : ariaLabelledby || null\"\n    [style.minHeight.px]=\"overlayMinHeight\">\n    @if (groupBy) {\n      @for (groupData of _groupedOptions; track $index; let groupIndex = $index) {\n        @if (groupData.groupLabel !== null || groupLabelTemplate) {\n          @if (groupLabelTemplate) {\n            <ng-container\n              [ngTemplateOutlet]=\"groupLabelTemplate\"\n              [ngTemplateOutletContext]=\"{\n                $implicit: groupData.groupLabel,\n                options: groupData.options,\n                density: density,\n                index: groupIndex,\n              }\" />\n          } @else {\n            <div class=\"q-dropmenu-group-header q-dropmenu-density-{{ density }}\">\n              <div class=\"q-dropmenu-group-label\">\n                {{ groupData.groupLabel }}\n              </div>\n            </div>\n          }\n        }\n\n        @for (\n          option of groupData.options;\n          track _trackOptionByFn($index, option);\n          let optionIndex = $index\n        ) {\n          <ng-container\n            [ngTemplateOutlet]=\"optionRef\"\n            [ngTemplateOutletContext]=\"{\n              option: option,\n              index: _getGlobalIndex(groupIndex, optionIndex),\n            }\" />\n        }\n\n        @if (groupIndex < _groupedOptions.length - 1) {\n          <q-divider />\n        }\n      }\n    } @else {\n      @for (option of options; track _trackOptionByFn($index, option); let index = $index) {\n        <ng-container\n          [ngTemplateOutlet]=\"optionRef\"\n          [ngTemplateOutletContext]=\"{ option: option, index: index }\" />\n      }\n    }\n  </div>\n</ng-template>\n\n<ng-template #optionRef let-option=\"option\" let-index=\"index\">\n  <q-dropmenu-option\n    [value]=\"option.value\"\n    [label]=\"option.label\"\n    [subLabel]=\"option.subLabel || ''\"\n    [icon]=\"option.icon || ''\"\n    [index]=\"index\"\n    [textToHighlight]=\"textToHighlight\"\n    [optionTemplate]=\"optionTemplate\"\n    [disabled]=\"option.disabled\"\n    [highlightCaseSensitive]=\"highlightCaseSensitive\"\n    [useOverlay]=\"useOverlay\"\n    (selectionChange)=\"_onOptionSelectionChange($event)\" />\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu{grid-template-areas:\"list\" \"footer\";grid-template-rows:1fr auto;grid-template-columns:100%;margin:var(--awds-dropmenu-container-margin, 0);padding:var(--awds-dropmenu-container-padding, 0);height:var(--awds-dropmenu-container-height, fit-content);width:var(--awds-dropmenu-container-width, fit-content);max-height:var(--awds-dropmenu-container-max-height, calc(208px + 2 * var(--ads-border-width-hairline)));max-width:var(--awds-dropmenu-container-max-width, none);-webkit-backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);outline:var(--awds-dropmenu-container-outline, none);overflow:hidden;border:var(--awds-dropmenu-container-border, var(--awds-dropmenu-overlay-panel-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400)));box-shadow:var(--awds-dropmenu-container-box-shadow, var(--awds-dropmenu-overlay-panel-box-shadow, 0 4px 8px rgba(0, 0, 0, .08)));border-radius:var(--awds-dropmenu-container-border-radius, var(--awds-dropmenu-overlay-panel-border-radius, var(--ads-border-radius-m)));background:var(--awds-dropmenu-container-background, var(--awds-dropmenu-overlay-panel-background, var(--ads-color-body-100)))}.q-dropmenu:popover-open{display:grid}.q-dropmenu:not(:has(.q-dropmenu-empty-container,.q-dropmenu-loading-container)){min-width:var(--awds-dropmenu-container-min-width, 168px);min-height:var(--awds-dropmenu-container-min-height, auto)}.q-dropmenu-list{box-sizing:border-box;grid-area:list;overflow:auto;list-style:var(--awds-dropmenu-container-list-style, none);scroll-padding-top:var(--awds-dropmenu-container-scroll-padding-top, var(--ads-size-micro));scroll-padding-bottom:var(--awds-dropmenu-container-scroll-padding-bottom, var(--ads-size-micro))}.q-dropmenu-list:before,.q-dropmenu-list:after{content:\"\";display:block;height:var(--awds-dropmenu-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-container-spacing-width, 100%)}.q-dropmenu-empty-container{display:flex;align-items:center;width:var(--awds-dropmenu-empty-container-width, 100%);min-width:var(--awds-dropmenu-empty-container-min-width, 166px);height:var(--awds-dropmenu-empty-container-height, 208px);padding:var(--awds-dropmenu-empty-container-padding, var(--ads-size-xxxs))}.q-dropmenu-empty-message{display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--awds-dropmenu-empty-message-width, 100%);height:var(--awds-dropmenu-empty-message-height, 58px);gap:var(--awds-dropmenu-empty-message-gap, var(--ads-size-xxxs))}.q-dropmenu-empty-message-label{font-family:var(--awds-dropmenu-empty-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-message-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-empty-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-message-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-empty-message-text-transform, none);text-align:center}.q-dropmenu-empty-custom-container{width:var(--awds-dropmenu-empty-custom-container-width, 100%);min-width:var(--awds-dropmenu-empty-custom-container-min-width, 166px)}.q-dropmenu-empty-custom-container:before,.q-dropmenu-empty-custom-container:after{content:\"\";display:block;height:var(--awds-dropmenu-empty-custom-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-empty-custom-container-spacing-width, 100%)}.q-dropmenu-empty-custom-message{font-family:var(--awds-dropmenu-empty-custom-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-custom-message-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-empty-custom-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-custom-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-custom-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-custom-message-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-empty-custom-message-text-transform, none);width:var(--awds-dropmenu-empty-custom-message-width, 100%);padding:var(--awds-dropmenu-empty-custom-message-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-loading-container{display:flex;align-items:center;justify-content:center;width:var(--awds-dropmenu-loading-container-width, 100%);min-width:var(--awds-dropmenu-loading-container-min-width, 166px);height:var(--awds-dropmenu-loading-container-height, 208px);padding:var(--awds-dropmenu-loading-container-padding, var(--ads-size-xxxs))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container{display:flex;flex-direction:column;height:var(--awds-dropmenu-loading-skeleton-container-height, 100%);flex:1}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item{display:flex;align-items:center;flex:1;width:var(--awds-dropmenu-loading-skeleton-item-width, 60%);margin-left:var(--awds-dropmenu-loading-skeleton-item-margin-left, var(--ads-size-nano))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-avatar{margin-right:var(--awds-dropmenu-loading-skeleton-item-avatar-margin-right, var(--ads-size-micro))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-label{flex:1}.q-dropmenu-loading-container .q-spinner{position:relative}.q-dropmenu-footer{font-family:var(--awds-dropmenu-footer-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-footer-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-footer-font-style, inherit);font-weight:var(--awds-dropmenu-footer-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-footer-letter-spacing, 0);line-height:var(--awds-dropmenu-footer-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-footer-text-transform, none);background:var(--awds-dropmenu-footer-background, var(--ads-color-body-200));padding:var(--awds-dropmenu-footer-padding, var(--ads-size-xxxs) var(--ads-size-xxs) var(--ads-size-xs) var(--ads-size-xxs));grid-area:footer}.q-dropmenu[popover]{color:inherit}.q-dropmenu-group-header{display:flex;flex-direction:column;padding:var(--awds-dropmenu-group-header-padding, var(--ads-size-xxxs) var(--ads-size-xxs));background:var(--awds-dropmenu-group-header-background, var(--ads-color-body-100));gap:var(--awds-dropmenu-group-header-gap, var(--ads-size-nano))}.q-dropmenu-group-header.q-dropmenu-density-compact{padding:var(--awds-dropmenu-compact-group-header-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-group-label{font-family:var(--awds-dropmenu-group-label-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-group-label-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-group-label-font-style, inherit);font-weight:var(--awds-dropmenu-group-label-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-dropmenu-group-label-letter-spacing, 0);line-height:var(--awds-dropmenu-group-label-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-group-label-text-transform, none);color:var(--awds-dropmenu-group-label-color, var(--ads-color-body-500))}\n"] }]
        }], ctorParameters: () => [], propDecorators: { selectionChange: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], backdropEnabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "backdropEnabled", required: false }] }, { type: i0.Output, args: ["backdropEnabledChange"] }], fitTriggerWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "fitTriggerWidth", required: false }] }, { type: i0.Output, args: ["fitTriggerWidthChange"] }], density: [{
                type: Input
            }], highlightCaseSensitive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableSelectionTracking: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], textToHighlight: [{
                type: Input
            }], loadingVariant: [{
                type: Input
            }], loadingSkeletonTemplate: [{
                type: Input
            }], footerMessage: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], emptyStateTemplate: [{
                type: Input
            }], optionTemplate: [{
                type: Input
            }], groupLabelTemplate: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], id: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], dropmenuTrigger: [{
                type: Input
            }], groupBy: [{
                type: Input
            }], groupLabel: [{
                type: Input
            }], options: [{
                type: Input
            }], value: [{
                type: Input
            }], minWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], minHeight: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], offsetY: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], offsetX: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], xPosition: [{
                type: Input
            }], yPosition: [{
                type: Input
            }], fitOverlayWidth: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], useOverlay: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], overlayHasBackdrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], optionsQuery: [{
                type: ViewChildren,
                args: [QDropmenuOptionComponent]
            }], _tabIndex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QDropmenuMultiSelectComponent extends QDropmenuComponent {
    label = 'Items selected {}';
    set value(value) {
        this._value = value;
        if (this._value) {
            this._calculateMultiSelection();
        }
    }
    get value() {
        return this._value;
    }
    _selectedOptions = [];
    _value = [];
    _isLastFocused = false;
    _onFocus(isLast) {
        this._isLastFocused = isLast;
    }
    _onTabKeydown() {
        if (this._isLastFocused)
            this.close();
    }
    _handleKeyManagerTabOut() {
        return;
    }
    isOptionSelected(option) {
        return this.value.includes(option.value);
    }
    _onOptionClick(option) {
        this._onMultiSelectChange(option);
    }
    get displayValue() {
        return this.label.replace('{}', `(${this.value?.length})`);
    }
    _onMultiSelectChange(option) {
        if (!this.isOptionSelected(option)) {
            this.value.push(option.value);
        }
        else {
            this.value = this.value.filter((value) => value !== option.value);
        }
        this._calculateMultiSelection();
        this.valueChange.emit(this._selectedOptions);
    }
    _calculateMultiSelection() {
        this._selectedOptions = this._options.filter((option) => this.value.includes(option.value));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuMultiSelectComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QDropmenuMultiSelectComponent, isStandalone: true, selector: "q-dropmenu-multiselect", inputs: { label: "label", value: "value" }, providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"useOverlay; else menulist\">\n  <ng-container *ngIf=\"loading; else menuListTemplate\">\n    <div class=\"q-dropmenu-loading-container\">\n      <q-spinner *ngIf=\"loadingVariant === 'spinner'; else loadingSkeleton\" [size]=\"'small'\" />\n\n      <ng-template #loadingSkeleton>\n        <ng-container\n          *ngIf=\"loadingSkeletonTemplate; else skeletonDefault\"\n          [ngTemplateOutlet]=\"loadingSkeletonTemplate\" />\n\n        <ng-template #skeletonDefault>\n          <div class=\"skeleton-container\">\n            <div class=\"skeleton-item\" *ngFor=\"let _ of [1, 2, 3, 4]\">\n              <q-skeleton class=\"skeleton-item-avatar\" [height]=\"24\" [width]=\"24\" />\n              <q-skeleton class=\"skeleton-item-label\" [height]=\"14\" />\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <ng-template #menuListTemplate>\n    <ng-container *ngIf=\"!options.length; else menulist\">\n      <div\n        [class.q-dropmenu-empty-custom-container]=\"emptyStateTemplate\"\n        [class.q-dropmenu-empty-container]=\"!emptyStateTemplate\">\n        <div\n          [class.q-dropmenu-empty-custom-message]=\"emptyStateTemplate\"\n          [class.q-dropmenu-empty-message]=\"!emptyStateTemplate\">\n          <ng-container *ngTemplateOutlet=\"emptyStateTemplate || defaultEmptyStateTemplate\" />\n        </div>\n      </div>\n      <ng-template #defaultEmptyStateTemplate>\n        <q-icon [size]=\"'24'\" name=\"search\" />\n        <span class=\"q-dropmenu-empty-message-label\">\n          {{ 'allspark.dropmenu.notFoundMessage' | transloco }}\n        </span>\n      </ng-template>\n    </ng-container>\n  </ng-template>\n\n  <div *ngIf=\"hasFooter\" class=\"q-dropmenu-footer\">\n    <ng-container *ngTemplateOutlet=\"footerTemplate || defaultFooterTemplate\" />\n    <ng-template #defaultFooterTemplate>\n      <span>\n        {{ footerMessage }}\n      </span>\n    </ng-template>\n  </div>\n</ng-container>\n\n<ng-template #menulist>\n  <div #dropmenu class=\"q-dropmenu-list\" role=\"listbox\" tabindex=\"-1\">\n    <div\n      *ngFor=\"let option of options; trackBy: _trackOptionByFn; index as index; last as last\"\n      #optionItem\n      role=\"option\"\n      class=\"q-dropmenu-option q-focus-indicator-inset\"\n      [class.q-dropmenu-disabled]=\"option.disabled\"\n      [attr.aria-selected]=\"isOptionSelected(option)\"\n      [tabindex]=\"option.disabled ? -1 : 0\"\n      [attr.data-qt]=\"'q-' + dataQt + '-item'\"\n      (click)=\"_onOptionClick(option)\"\n      (keyup.enter)=\"_onOptionClick(option)\"\n      (keyup.space)=\"_onOptionClick(option)\"\n      (keydown.tab)=\"_onTabKeydown()\"\n      (focus)=\"_onFocus(last)\">\n      <q-checkbox\n        [tabIndex]=\"-1\"\n        class=\"q-dropmenu-multiple-select-checkbox\"\n        (checkboxChange)=\"_onOptionClick(option)\"\n        [checked]=\"isOptionSelected(option)\"\n        [disabled]=\"option.disabled\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            optionTemplate || defaultOptionTemplate;\n            context: { $implicit: option, index: index }\n          \" />\n        <ng-template #defaultOptionTemplate>\n          {{ option.label }}\n        </ng-template>\n      </q-checkbox>\n    </div>\n  </div>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu{grid-template-areas:\"list\" \"footer\";grid-template-rows:1fr auto;grid-template-columns:100%;margin:var(--awds-dropmenu-container-margin, 0);padding:var(--awds-dropmenu-container-padding, 0);height:var(--awds-dropmenu-container-height, fit-content);width:var(--awds-dropmenu-container-width, fit-content);max-height:var(--awds-dropmenu-container-max-height, calc(208px + 2 * var(--ads-border-width-hairline)));max-width:var(--awds-dropmenu-container-max-width, none);-webkit-backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);outline:var(--awds-dropmenu-container-outline, none);overflow:hidden;border:var(--awds-dropmenu-container-border, var(--awds-dropmenu-overlay-panel-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400)));box-shadow:var(--awds-dropmenu-container-box-shadow, var(--awds-dropmenu-overlay-panel-box-shadow, 0 4px 8px rgba(0, 0, 0, .08)));border-radius:var(--awds-dropmenu-container-border-radius, var(--awds-dropmenu-overlay-panel-border-radius, var(--ads-border-radius-m)));background:var(--awds-dropmenu-container-background, var(--awds-dropmenu-overlay-panel-background, var(--ads-color-body-100)))}.q-dropmenu:popover-open{display:grid}.q-dropmenu:not(:has(.q-dropmenu-empty-container,.q-dropmenu-loading-container)){min-width:var(--awds-dropmenu-container-min-width, 168px);min-height:var(--awds-dropmenu-container-min-height, auto)}.q-dropmenu-list{box-sizing:border-box;grid-area:list;overflow:auto;list-style:var(--awds-dropmenu-container-list-style, none);scroll-padding-top:var(--awds-dropmenu-container-scroll-padding-top, var(--ads-size-micro));scroll-padding-bottom:var(--awds-dropmenu-container-scroll-padding-bottom, var(--ads-size-micro))}.q-dropmenu-list:before,.q-dropmenu-list:after{content:\"\";display:block;height:var(--awds-dropmenu-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-container-spacing-width, 100%)}.q-dropmenu-empty-container{display:flex;align-items:center;width:var(--awds-dropmenu-empty-container-width, 100%);min-width:var(--awds-dropmenu-empty-container-min-width, 166px);height:var(--awds-dropmenu-empty-container-height, 208px);padding:var(--awds-dropmenu-empty-container-padding, var(--ads-size-xxxs))}.q-dropmenu-empty-message{display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--awds-dropmenu-empty-message-width, 100%);height:var(--awds-dropmenu-empty-message-height, 58px);gap:var(--awds-dropmenu-empty-message-gap, var(--ads-size-xxxs))}.q-dropmenu-empty-message-label{font-family:var(--awds-dropmenu-empty-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-message-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-empty-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-message-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-empty-message-text-transform, none);text-align:center}.q-dropmenu-empty-custom-container{width:var(--awds-dropmenu-empty-custom-container-width, 100%);min-width:var(--awds-dropmenu-empty-custom-container-min-width, 166px)}.q-dropmenu-empty-custom-container:before,.q-dropmenu-empty-custom-container:after{content:\"\";display:block;height:var(--awds-dropmenu-empty-custom-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-empty-custom-container-spacing-width, 100%)}.q-dropmenu-empty-custom-message{font-family:var(--awds-dropmenu-empty-custom-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-custom-message-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-empty-custom-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-custom-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-custom-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-custom-message-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-empty-custom-message-text-transform, none);width:var(--awds-dropmenu-empty-custom-message-width, 100%);padding:var(--awds-dropmenu-empty-custom-message-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-loading-container{display:flex;align-items:center;justify-content:center;width:var(--awds-dropmenu-loading-container-width, 100%);min-width:var(--awds-dropmenu-loading-container-min-width, 166px);height:var(--awds-dropmenu-loading-container-height, 208px);padding:var(--awds-dropmenu-loading-container-padding, var(--ads-size-xxxs))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container{display:flex;flex-direction:column;height:var(--awds-dropmenu-loading-skeleton-container-height, 100%);flex:1}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item{display:flex;align-items:center;flex:1;width:var(--awds-dropmenu-loading-skeleton-item-width, 60%);margin-left:var(--awds-dropmenu-loading-skeleton-item-margin-left, var(--ads-size-nano))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-avatar{margin-right:var(--awds-dropmenu-loading-skeleton-item-avatar-margin-right, var(--ads-size-micro))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-label{flex:1}.q-dropmenu-loading-container .q-spinner{position:relative}.q-dropmenu-footer{font-family:var(--awds-dropmenu-footer-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-footer-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-footer-font-style, inherit);font-weight:var(--awds-dropmenu-footer-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-footer-letter-spacing, 0);line-height:var(--awds-dropmenu-footer-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-footer-text-transform, none);background:var(--awds-dropmenu-footer-background, var(--ads-color-body-200));padding:var(--awds-dropmenu-footer-padding, var(--ads-size-xxxs) var(--ads-size-xxs) var(--ads-size-xs) var(--ads-size-xxs));grid-area:footer}.q-dropmenu[popover]{color:inherit}.q-dropmenu-group-header{display:flex;flex-direction:column;padding:var(--awds-dropmenu-group-header-padding, var(--ads-size-xxxs) var(--ads-size-xxs));background:var(--awds-dropmenu-group-header-background, var(--ads-color-body-100));gap:var(--awds-dropmenu-group-header-gap, var(--ads-size-nano))}.q-dropmenu-group-header.q-dropmenu-density-compact{padding:var(--awds-dropmenu-compact-group-header-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-group-label{font-family:var(--awds-dropmenu-group-label-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-group-label-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-group-label-font-style, inherit);font-weight:var(--awds-dropmenu-group-label-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-dropmenu-group-label-letter-spacing, 0);line-height:var(--awds-dropmenu-group-label-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-group-label-text-transform, none);color:var(--awds-dropmenu-group-label-color, var(--ads-color-body-500))}\n", ".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu-option{font-family:var(--awds-dropmenu-option-item-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-option-item-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-option-item-font-style, inherit);font-weight:var(--awds-dropmenu-option-item-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-option-item-letter-spacing, 0);line-height:var(--awds-dropmenu-option-item-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-option-item-text-transform, none);display:flex;flex-direction:row;gap:var(--awds-dropmenu-option-item-gap, var(--ads-size-micro));align-items:flex-start;cursor:pointer;outline:var(--awds-dropmenu-option-item-outline, none);-webkit-user-select:var(--awds-dropmenu-option-item-user-select, none);user-select:var(--awds-dropmenu-option-item-user-select, none);background:var(--awds-dropmenu-option-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-density-default{padding:var(--awds-dropmenu-option-item-default-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-option.q-dropmenu-option-density-compact{padding:var(--awds-dropmenu-option-item-compact-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-option .q-dropmenu-multiple-select-checkbox{padding-left:var(--awds-dropmenu-option-item-input-padding-left, var(--ads-size-nano))}.q-dropmenu-option .q-dropmenu-option-label{color:var(--awds-dropmenu-option-item-label-color, var(--ads-color-body-contrast-100));display:flex;flex-direction:column;gap:var(--awds-dropmenu-option-item-label-gap, var(--ads-size-nano));overflow:hidden;text-overflow:ellipsis}.q-dropmenu-option .q-dropmenu-option-label-wrapper{display:flex;align-items:center;gap:var(--awds-dropmenu-option-item-label-wrapper-gap, var(--ads-size-micro))}.q-dropmenu-option .q-dropmenu-option-sublabel{font-family:var(--awds-dropmenu-item-sublabel-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-item-sublabel-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-item-sublabel-font-style, inherit);font-weight:var(--awds-dropmenu-item-sublabel-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-item-sublabel-letter-spacing, 0);line-height:var(--awds-dropmenu-item-sublabel-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-item-sublabel-text-transform, none);color:var(--awds-dropmenu-option-item-sublabel-color, var(--ads-color-body-500))}.q-dropmenu-option q-icon.q-dropmenu-icon-check-mark{fill:var(--awds-dropmenu-option-icon-check-mark-fill, var(--ads-color-primary-400));margin-left:var(--awds-dropmenu-option-icon-check-mark-margin-left, auto)}.q-dropmenu-option q-icon.q-dropmenu-icon-default{fill:var(--awds-dropmenu-option-icon-fill, var(--ads-color-body-contrast-100))}.q-dropmenu-option:hover{background:var(--awds-dropmenu-option-hover-item-background, var(--ads-color-body-200))}.q-dropmenu-option:active{background:var(--awds-dropmenu-option-pressed-item-background, var(--ads-color-body-200))}.q-dropmenu-option.q-dropmenu-option-disabled{color:var(--awds-dropmenu-option-disabled-item-color, var(--ads-color-body-400));opacity:var(--awds-dropmenu-option-disabled-item-opacity, 1);pointer-events:none}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label{color:var(--awds-dropmenu-option-disabled-item-label-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label-wrapper .q-icon{fill:var(--awds-dropmenu-option-disabled-icon-fill, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-sublabel{color:var(--awds-dropmenu-option-disabled-item-sublabel-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-selected{background:var(--awds-dropmenu-option-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:hover{background:var(--awds-dropmenu-option-hover-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:active{background:var(--awds-dropmenu-option-pressed-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:focus-visible{background:var(--awds-dropmenu-option-focus-visible-selected-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-active{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: QCheckboxComponent, selector: "q-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "containerDensity", "extraContent", "extraContentContext", "extraContentDensity", "extraContentPosition", "id", "labelGap", "name", "variant", "errorStateMatcher", "required", "tabIndex", "extraContentRightWidth", "invalidState", "expanded", "readonly", "dataQt", "checked", "indeterminate", "disabled"], outputs: ["checkboxChange", "indeterminateChange", "expandedChange"] }, { kind: "component", type: QIconComponent, selector: "q-icon", inputs: ["dataQt", "name", "size"] }, { kind: "ngmodule", type: TranslocoModule }, { kind: "component", type: QSpinnerComponent, selector: "q-spinner", inputs: ["variant", "size", "dataQt"] }, { kind: "component", type: QSkeletonComponent, selector: "q-skeleton", inputs: ["width", "height", "radius", "dataQt"] }, { kind: "pipe", type: i2.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuMultiSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-dropmenu-multiselect', imports: [
                        NgIf,
                        NgFor,
                        NgTemplateOutlet,
                        QCheckboxComponent,
                        QIconComponent,
                        TranslocoModule,
                        QSpinnerComponent,
                        QSkeletonComponent,
                    ], providers: [MISSING_KEY_HANDLER, ALLSPARK_SCOPE], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"useOverlay; else menulist\">\n  <ng-container *ngIf=\"loading; else menuListTemplate\">\n    <div class=\"q-dropmenu-loading-container\">\n      <q-spinner *ngIf=\"loadingVariant === 'spinner'; else loadingSkeleton\" [size]=\"'small'\" />\n\n      <ng-template #loadingSkeleton>\n        <ng-container\n          *ngIf=\"loadingSkeletonTemplate; else skeletonDefault\"\n          [ngTemplateOutlet]=\"loadingSkeletonTemplate\" />\n\n        <ng-template #skeletonDefault>\n          <div class=\"skeleton-container\">\n            <div class=\"skeleton-item\" *ngFor=\"let _ of [1, 2, 3, 4]\">\n              <q-skeleton class=\"skeleton-item-avatar\" [height]=\"24\" [width]=\"24\" />\n              <q-skeleton class=\"skeleton-item-label\" [height]=\"14\" />\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <ng-template #menuListTemplate>\n    <ng-container *ngIf=\"!options.length; else menulist\">\n      <div\n        [class.q-dropmenu-empty-custom-container]=\"emptyStateTemplate\"\n        [class.q-dropmenu-empty-container]=\"!emptyStateTemplate\">\n        <div\n          [class.q-dropmenu-empty-custom-message]=\"emptyStateTemplate\"\n          [class.q-dropmenu-empty-message]=\"!emptyStateTemplate\">\n          <ng-container *ngTemplateOutlet=\"emptyStateTemplate || defaultEmptyStateTemplate\" />\n        </div>\n      </div>\n      <ng-template #defaultEmptyStateTemplate>\n        <q-icon [size]=\"'24'\" name=\"search\" />\n        <span class=\"q-dropmenu-empty-message-label\">\n          {{ 'allspark.dropmenu.notFoundMessage' | transloco }}\n        </span>\n      </ng-template>\n    </ng-container>\n  </ng-template>\n\n  <div *ngIf=\"hasFooter\" class=\"q-dropmenu-footer\">\n    <ng-container *ngTemplateOutlet=\"footerTemplate || defaultFooterTemplate\" />\n    <ng-template #defaultFooterTemplate>\n      <span>\n        {{ footerMessage }}\n      </span>\n    </ng-template>\n  </div>\n</ng-container>\n\n<ng-template #menulist>\n  <div #dropmenu class=\"q-dropmenu-list\" role=\"listbox\" tabindex=\"-1\">\n    <div\n      *ngFor=\"let option of options; trackBy: _trackOptionByFn; index as index; last as last\"\n      #optionItem\n      role=\"option\"\n      class=\"q-dropmenu-option q-focus-indicator-inset\"\n      [class.q-dropmenu-disabled]=\"option.disabled\"\n      [attr.aria-selected]=\"isOptionSelected(option)\"\n      [tabindex]=\"option.disabled ? -1 : 0\"\n      [attr.data-qt]=\"'q-' + dataQt + '-item'\"\n      (click)=\"_onOptionClick(option)\"\n      (keyup.enter)=\"_onOptionClick(option)\"\n      (keyup.space)=\"_onOptionClick(option)\"\n      (keydown.tab)=\"_onTabKeydown()\"\n      (focus)=\"_onFocus(last)\">\n      <q-checkbox\n        [tabIndex]=\"-1\"\n        class=\"q-dropmenu-multiple-select-checkbox\"\n        (checkboxChange)=\"_onOptionClick(option)\"\n        [checked]=\"isOptionSelected(option)\"\n        [disabled]=\"option.disabled\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            optionTemplate || defaultOptionTemplate;\n            context: { $implicit: option, index: index }\n          \" />\n        <ng-template #defaultOptionTemplate>\n          {{ option.label }}\n        </ng-template>\n      </q-checkbox>\n    </div>\n  </div>\n</ng-template>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu{grid-template-areas:\"list\" \"footer\";grid-template-rows:1fr auto;grid-template-columns:100%;margin:var(--awds-dropmenu-container-margin, 0);padding:var(--awds-dropmenu-container-padding, 0);height:var(--awds-dropmenu-container-height, fit-content);width:var(--awds-dropmenu-container-width, fit-content);max-height:var(--awds-dropmenu-container-max-height, calc(208px + 2 * var(--ads-border-width-hairline)));max-width:var(--awds-dropmenu-container-max-width, none);-webkit-backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);backdrop-filter:var(--awds-dropmenu-container-backdrop-filter, none);outline:var(--awds-dropmenu-container-outline, none);overflow:hidden;border:var(--awds-dropmenu-container-border, var(--awds-dropmenu-overlay-panel-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400)));box-shadow:var(--awds-dropmenu-container-box-shadow, var(--awds-dropmenu-overlay-panel-box-shadow, 0 4px 8px rgba(0, 0, 0, .08)));border-radius:var(--awds-dropmenu-container-border-radius, var(--awds-dropmenu-overlay-panel-border-radius, var(--ads-border-radius-m)));background:var(--awds-dropmenu-container-background, var(--awds-dropmenu-overlay-panel-background, var(--ads-color-body-100)))}.q-dropmenu:popover-open{display:grid}.q-dropmenu:not(:has(.q-dropmenu-empty-container,.q-dropmenu-loading-container)){min-width:var(--awds-dropmenu-container-min-width, 168px);min-height:var(--awds-dropmenu-container-min-height, auto)}.q-dropmenu-list{box-sizing:border-box;grid-area:list;overflow:auto;list-style:var(--awds-dropmenu-container-list-style, none);scroll-padding-top:var(--awds-dropmenu-container-scroll-padding-top, var(--ads-size-micro));scroll-padding-bottom:var(--awds-dropmenu-container-scroll-padding-bottom, var(--ads-size-micro))}.q-dropmenu-list:before,.q-dropmenu-list:after{content:\"\";display:block;height:var(--awds-dropmenu-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-container-spacing-width, 100%)}.q-dropmenu-empty-container{display:flex;align-items:center;width:var(--awds-dropmenu-empty-container-width, 100%);min-width:var(--awds-dropmenu-empty-container-min-width, 166px);height:var(--awds-dropmenu-empty-container-height, 208px);padding:var(--awds-dropmenu-empty-container-padding, var(--ads-size-xxxs))}.q-dropmenu-empty-message{display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--awds-dropmenu-empty-message-width, 100%);height:var(--awds-dropmenu-empty-message-height, 58px);gap:var(--awds-dropmenu-empty-message-gap, var(--ads-size-xxxs))}.q-dropmenu-empty-message-label{font-family:var(--awds-dropmenu-empty-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-message-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-empty-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-message-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-empty-message-text-transform, none);text-align:center}.q-dropmenu-empty-custom-container{width:var(--awds-dropmenu-empty-custom-container-width, 100%);min-width:var(--awds-dropmenu-empty-custom-container-min-width, 166px)}.q-dropmenu-empty-custom-container:before,.q-dropmenu-empty-custom-container:after{content:\"\";display:block;height:var(--awds-dropmenu-empty-custom-container-spacing-height, var(--ads-size-micro));width:var(--awds-dropmenu-empty-custom-container-spacing-width, 100%)}.q-dropmenu-empty-custom-message{font-family:var(--awds-dropmenu-empty-custom-message-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-empty-custom-message-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-empty-custom-message-font-style, inherit);font-weight:var(--awds-dropmenu-empty-custom-message-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-empty-custom-message-letter-spacing, 0);line-height:var(--awds-dropmenu-empty-custom-message-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-empty-custom-message-text-transform, none);width:var(--awds-dropmenu-empty-custom-message-width, 100%);padding:var(--awds-dropmenu-empty-custom-message-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-loading-container{display:flex;align-items:center;justify-content:center;width:var(--awds-dropmenu-loading-container-width, 100%);min-width:var(--awds-dropmenu-loading-container-min-width, 166px);height:var(--awds-dropmenu-loading-container-height, 208px);padding:var(--awds-dropmenu-loading-container-padding, var(--ads-size-xxxs))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container{display:flex;flex-direction:column;height:var(--awds-dropmenu-loading-skeleton-container-height, 100%);flex:1}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item{display:flex;align-items:center;flex:1;width:var(--awds-dropmenu-loading-skeleton-item-width, 60%);margin-left:var(--awds-dropmenu-loading-skeleton-item-margin-left, var(--ads-size-nano))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-avatar{margin-right:var(--awds-dropmenu-loading-skeleton-item-avatar-margin-right, var(--ads-size-micro))}.q-dropmenu-loading-container .q-dropmenu-skeleton-container .q-dropmenu-skeleton-item-label{flex:1}.q-dropmenu-loading-container .q-spinner{position:relative}.q-dropmenu-footer{font-family:var(--awds-dropmenu-footer-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-footer-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-footer-font-style, inherit);font-weight:var(--awds-dropmenu-footer-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-footer-letter-spacing, 0);line-height:var(--awds-dropmenu-footer-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-footer-text-transform, none);background:var(--awds-dropmenu-footer-background, var(--ads-color-body-200));padding:var(--awds-dropmenu-footer-padding, var(--ads-size-xxxs) var(--ads-size-xxs) var(--ads-size-xs) var(--ads-size-xxs));grid-area:footer}.q-dropmenu[popover]{color:inherit}.q-dropmenu-group-header{display:flex;flex-direction:column;padding:var(--awds-dropmenu-group-header-padding, var(--ads-size-xxxs) var(--ads-size-xxs));background:var(--awds-dropmenu-group-header-background, var(--ads-color-body-100));gap:var(--awds-dropmenu-group-header-gap, var(--ads-size-nano))}.q-dropmenu-group-header.q-dropmenu-density-compact{padding:var(--awds-dropmenu-compact-group-header-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-group-label{font-family:var(--awds-dropmenu-group-label-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-group-label-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-group-label-font-style, inherit);font-weight:var(--awds-dropmenu-group-label-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-dropmenu-group-label-letter-spacing, 0);line-height:var(--awds-dropmenu-group-label-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-group-label-text-transform, none);color:var(--awds-dropmenu-group-label-color, var(--ads-color-body-500))}\n", ".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-dropmenu-option{font-family:var(--awds-dropmenu-option-item-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-option-item-font-size, var(--ads-font-size-s));font-style:var(--awds-dropmenu-option-item-font-style, inherit);font-weight:var(--awds-dropmenu-option-item-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-option-item-letter-spacing, 0);line-height:var(--awds-dropmenu-option-item-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-dropmenu-option-item-text-transform, none);display:flex;flex-direction:row;gap:var(--awds-dropmenu-option-item-gap, var(--ads-size-micro));align-items:flex-start;cursor:pointer;outline:var(--awds-dropmenu-option-item-outline, none);-webkit-user-select:var(--awds-dropmenu-option-item-user-select, none);user-select:var(--awds-dropmenu-option-item-user-select, none);background:var(--awds-dropmenu-option-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-density-default{padding:var(--awds-dropmenu-option-item-default-padding, var(--ads-size-xxxs) var(--ads-size-xxs))}.q-dropmenu-option.q-dropmenu-option-density-compact{padding:var(--awds-dropmenu-option-item-compact-padding, var(--ads-size-micro) var(--ads-size-xxs))}.q-dropmenu-option .q-dropmenu-multiple-select-checkbox{padding-left:var(--awds-dropmenu-option-item-input-padding-left, var(--ads-size-nano))}.q-dropmenu-option .q-dropmenu-option-label{color:var(--awds-dropmenu-option-item-label-color, var(--ads-color-body-contrast-100));display:flex;flex-direction:column;gap:var(--awds-dropmenu-option-item-label-gap, var(--ads-size-nano));overflow:hidden;text-overflow:ellipsis}.q-dropmenu-option .q-dropmenu-option-label-wrapper{display:flex;align-items:center;gap:var(--awds-dropmenu-option-item-label-wrapper-gap, var(--ads-size-micro))}.q-dropmenu-option .q-dropmenu-option-sublabel{font-family:var(--awds-dropmenu-item-sublabel-font-family, var(--ads-font-family-body));font-size:var(--awds-dropmenu-item-sublabel-font-size, var(--ads-font-size-xs));font-style:var(--awds-dropmenu-item-sublabel-font-style, inherit);font-weight:var(--awds-dropmenu-item-sublabel-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-dropmenu-item-sublabel-letter-spacing, 0);line-height:var(--awds-dropmenu-item-sublabel-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-dropmenu-item-sublabel-text-transform, none);color:var(--awds-dropmenu-option-item-sublabel-color, var(--ads-color-body-500))}.q-dropmenu-option q-icon.q-dropmenu-icon-check-mark{fill:var(--awds-dropmenu-option-icon-check-mark-fill, var(--ads-color-primary-400));margin-left:var(--awds-dropmenu-option-icon-check-mark-margin-left, auto)}.q-dropmenu-option q-icon.q-dropmenu-icon-default{fill:var(--awds-dropmenu-option-icon-fill, var(--ads-color-body-contrast-100))}.q-dropmenu-option:hover{background:var(--awds-dropmenu-option-hover-item-background, var(--ads-color-body-200))}.q-dropmenu-option:active{background:var(--awds-dropmenu-option-pressed-item-background, var(--ads-color-body-200))}.q-dropmenu-option.q-dropmenu-option-disabled{color:var(--awds-dropmenu-option-disabled-item-color, var(--ads-color-body-400));opacity:var(--awds-dropmenu-option-disabled-item-opacity, 1);pointer-events:none}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label{color:var(--awds-dropmenu-option-disabled-item-label-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-label-wrapper .q-icon{fill:var(--awds-dropmenu-option-disabled-icon-fill, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-disabled .q-dropmenu-option-sublabel{color:var(--awds-dropmenu-option-disabled-item-sublabel-color, var(--ads-color-body-400))}.q-dropmenu-option.q-dropmenu-option-selected{background:var(--awds-dropmenu-option-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:hover{background:var(--awds-dropmenu-option-hover-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:active{background:var(--awds-dropmenu-option-pressed-selected-item-background, var(--ads-color-body-300))}.q-dropmenu-option.q-dropmenu-option-selected:focus-visible{background:var(--awds-dropmenu-option-focus-visible-selected-item-background, var(--ads-color-body-100))}.q-dropmenu-option.q-dropmenu-option-active{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400) inset,0 0 0 calc(var(--ads-size-quark) * 2) var(--ads-color-focus-indicator-contrast-400) inset}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

class QDropmenuOriginDirective {
    elementRef = inject(ElementRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuOriginDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QDropmenuOriginDirective, isStandalone: true, selector: "[qDropmenuOrigin]", exportAs: ["qDropmenuOrigin"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDropmenuOriginDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qDropmenuOrigin]',
                    exportAs: 'qDropmenuOrigin',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { QDropmenuComponent, QDropmenuMultiSelectComponent, QDropmenuOriginDirective };
//# sourceMappingURL=questrade-allspark-angular-components-dropmenu.mjs.map
