import * as i0 from '@angular/core';
import { InjectionToken, inject, ElementRef, ChangeDetectorRef, HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, DOCUMENT, Injector, forwardRef, ViewChild, ContentChildren } from '@angular/core';
import { FormGroupDirective, NgForm, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QSharedResizeObserverService, QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { ErrorState, voidFn } from '@questrade/allspark-angular-components/core/utils';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';
import { takeUntil } from 'rxjs';

const Q_TOGGLE_BUTTON_GROUP = new InjectionToken('QToggleButtonGroupComponent');

class QToggleButtonComponent {
    value = null;
    dataQt = 'q-toggle-button';
    get disabled() {
        return this._disabled || !!this.toggleButtonGroup?.disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    set type(value) {
        this._type = value;
    }
    get type() {
        return this.toggleButtonGroup?.type || this._type;
    }
    get selected() {
        return (this._selected || (!!this.toggleButtonGroup && this.toggleButtonGroup.value === this.value));
    }
    set selected(value) {
        if (this.toggleButtonGroup) {
            if (value) {
                this.toggleButtonGroup.value = this.value;
            }
            else if (!value && this.toggleButtonGroup.value === this.value) {
                this.toggleButtonGroup.value = null;
                this.toggleButtonGroup = null;
            }
        }
        else {
            this._selected = value;
            this._markForCheck();
        }
    }
    // TODO: revisit it when migrated to viewEncapsulation.none (can be done on parent via css).
    get widthStyle() {
        return this.width === '100%' ? 'inherit' : '';
    }
    toggleButtonGroup = inject(Q_TOGGLE_BUTTON_GROUP, {
        optional: true,
    });
    _elementRef = inject(ElementRef);
    _selected = false;
    _disabled = false;
    _type = 'standard';
    _changeDetector = inject(ChangeDetectorRef);
    onButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled)
            return;
        this.selected = true;
        this.toggleButtonGroup?._onTouched();
    }
    _markForCheck() {
        this._changeDetector.markForCheck();
    }
    get standalone() {
        return this.toggleButtonGroup === null;
    }
    get width() {
        return this.toggleButtonGroup?.widthStrategy ?? 'auto';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToggleButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QToggleButtonComponent, isStandalone: true, selector: "q-toggle-button", inputs: { value: "value", dataQt: "dataQt", disabled: "disabled", type: "type", selected: "selected" }, host: { properties: { "attr.data-qt": "this.dataQt", "style.width": "this.widthStyle" } }, ngImport: i0, template: "<button\n  class=\"q-toggle-button q-toggle-button-{{ type }}\"\n  [class.q-toggle-button-width-full]=\"width === '100%'\"\n  [class.q-toggle-button-standalone]=\"standalone\"\n  [class.q-toggle-button-selected]=\"selected\"\n  [class.q-toggle-button-disabled]=\"disabled\"\n  [class.q-focus-indicator]=\"!disabled\"\n  [tabindex]=\"disabled ? -1 : 0\"\n  (click)=\"onButtonClick($event)\">\n  <ng-content />\n</button>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-toggle-button{background:none;border:none;outline:none;padding:0;margin:0;cursor:pointer;font-size:inherit;color:inherit;-webkit-user-select:none;user-select:none;font-family:var(--awds-toggle-button-font-family, var(--ads-font-family-body));font-size:var(--awds-toggle-button-font-size, var(--ads-font-size-xs));font-style:var(--awds-toggle-button-font-style, inherit);font-weight:var(--awds-toggle-button-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-toggle-button-letter-spacing, 0);line-height:var(--awds-toggle-button-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-toggle-button-text-transform, none);text-align:center;padding:var(--awds-toggle-button-container-padding, var(--ads-size-nano) var(--ads-size-xxs));min-width:var(--awds-toggle-button-container-min-width, 90px);border-radius:var(--awds-toggle-button-container-border-radius, var(--ads-border-radius-xl));position:relative;display:inline-flex;gap:var(--awds-toggle-button-container-gap, var(--ads-size-micro));align-items:center;justify-content:center;height:var(--awds-toggle-button-container-height, 100%);color:var(--awds-toggle-button-container-color, var(--ads-color-body-contrast-400));-webkit-tap-highlight-color:transparent}.q-toggle-button .q-icon{width:var(--awds-toggle-button-icon-width, var(--ads-size-s));height:var(--awds-toggle-button-icon-height, var(--ads-size-s));fill:var(--awds-toggle-button-container-color, var(--ads-color-body-contrast-400))}.q-toggle-button.q-toggle-button-standalone{background:var(--awds-toggle-button-standalone-container-background, transparent);box-shadow:var(--awds-toggle-button-standalone-container-box-shadow, 0 0 0 1px var(--ads-color-body-400))}.q-toggle-button:hover:not(.q-toggle-button-selected){background:var(--awds-toggle-button-hover-container-background, transparent);box-shadow:var(--awds-toggle-button-hover-container-box-shadow, 0 0 0 1px var(--ads-color-body-500))}.q-toggle-button:active:not(.q-toggle-button-selected){background:var(--awds-toggle-button-active-container-background, var(--ads-color-body-400));box-shadow:var(--awds-toggle-button-active-container-box-shadow, 0 0 0 1px var(--ads-color-body-400))}.q-toggle-button.q-toggle-button-selected{color:var(--awds-toggle-button-selected-container-color, var(--ads-color-body-contrast-400))}.q-toggle-button.q-toggle-button-selected .q-icon{fill:var(--awds-toggle-button-selected-container-color, var(--ads-color-body-contrast-400))}.q-toggle-button.q-toggle-button-selected.q-toggle-button-disabled{color:var(--awds-toggle-button-disabled-selected-container-color, var(--ads-color-body-400))}.q-toggle-button.q-toggle-button-disabled{color:var(--awds-toggle-button-disabled-container-color, var(--ads-color-body-400));pointer-events:none;-webkit-user-select:none;user-select:none;opacity:var(--awds-toggle-button-disabled-container-opacity)}.q-toggle-button.q-toggle-button-disabled .q-icon{fill:var(--awds-toggle-button-disabled-container-color, var(--ads-color-body-400))}.q-toggle-button.q-toggle-button-width-full{width:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToggleButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-toggle-button', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<button\n  class=\"q-toggle-button q-toggle-button-{{ type }}\"\n  [class.q-toggle-button-width-full]=\"width === '100%'\"\n  [class.q-toggle-button-standalone]=\"standalone\"\n  [class.q-toggle-button-selected]=\"selected\"\n  [class.q-toggle-button-disabled]=\"disabled\"\n  [class.q-focus-indicator]=\"!disabled\"\n  [tabindex]=\"disabled ? -1 : 0\"\n  (click)=\"onButtonClick($event)\">\n  <ng-content />\n</button>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-toggle-button{background:none;border:none;outline:none;padding:0;margin:0;cursor:pointer;font-size:inherit;color:inherit;-webkit-user-select:none;user-select:none;font-family:var(--awds-toggle-button-font-family, var(--ads-font-family-body));font-size:var(--awds-toggle-button-font-size, var(--ads-font-size-xs));font-style:var(--awds-toggle-button-font-style, inherit);font-weight:var(--awds-toggle-button-font-weight, var(--ads-font-weight-semi-bold));letter-spacing:var(--awds-toggle-button-letter-spacing, 0);line-height:var(--awds-toggle-button-line-height, var(--ads-font-line-height-xs));text-transform:var(--awds-toggle-button-text-transform, none);text-align:center;padding:var(--awds-toggle-button-container-padding, var(--ads-size-nano) var(--ads-size-xxs));min-width:var(--awds-toggle-button-container-min-width, 90px);border-radius:var(--awds-toggle-button-container-border-radius, var(--ads-border-radius-xl));position:relative;display:inline-flex;gap:var(--awds-toggle-button-container-gap, var(--ads-size-micro));align-items:center;justify-content:center;height:var(--awds-toggle-button-container-height, 100%);color:var(--awds-toggle-button-container-color, var(--ads-color-body-contrast-400));-webkit-tap-highlight-color:transparent}.q-toggle-button .q-icon{width:var(--awds-toggle-button-icon-width, var(--ads-size-s));height:var(--awds-toggle-button-icon-height, var(--ads-size-s));fill:var(--awds-toggle-button-container-color, var(--ads-color-body-contrast-400))}.q-toggle-button.q-toggle-button-standalone{background:var(--awds-toggle-button-standalone-container-background, transparent);box-shadow:var(--awds-toggle-button-standalone-container-box-shadow, 0 0 0 1px var(--ads-color-body-400))}.q-toggle-button:hover:not(.q-toggle-button-selected){background:var(--awds-toggle-button-hover-container-background, transparent);box-shadow:var(--awds-toggle-button-hover-container-box-shadow, 0 0 0 1px var(--ads-color-body-500))}.q-toggle-button:active:not(.q-toggle-button-selected){background:var(--awds-toggle-button-active-container-background, var(--ads-color-body-400));box-shadow:var(--awds-toggle-button-active-container-box-shadow, 0 0 0 1px var(--ads-color-body-400))}.q-toggle-button.q-toggle-button-selected{color:var(--awds-toggle-button-selected-container-color, var(--ads-color-body-contrast-400))}.q-toggle-button.q-toggle-button-selected .q-icon{fill:var(--awds-toggle-button-selected-container-color, var(--ads-color-body-contrast-400))}.q-toggle-button.q-toggle-button-selected.q-toggle-button-disabled{color:var(--awds-toggle-button-disabled-selected-container-color, var(--ads-color-body-400))}.q-toggle-button.q-toggle-button-disabled{color:var(--awds-toggle-button-disabled-container-color, var(--ads-color-body-400));pointer-events:none;-webkit-user-select:none;user-select:none;opacity:var(--awds-toggle-button-disabled-container-opacity)}.q-toggle-button.q-toggle-button-disabled .q-icon{fill:var(--awds-toggle-button-disabled-container-color, var(--ads-color-body-400))}.q-toggle-button.q-toggle-button-width-full{width:inherit}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], selected: [{
                type: Input
            }], widthStyle: [{
                type: HostBinding,
                args: ['style.width']
            }] } });

let nextUniqueId = 0;
class QToggleButtonGroupComponent extends ErrorState {
    controlId = `q-toggle-button-group-${nextUniqueId++}`;
    widthStrategy = 'auto';
    errorStateMatcher = new ErrorStateMatcher();
    dataQt = 'q-toggle-button-group';
    set type(value) {
        this._type = value;
        this.markButtonsForCheck();
    }
    get type() {
        return this._type;
    }
    set value(value) {
        this._value = value;
        this.markButtonsForCheck();
        this._controlValueAccessorChangeFn(value);
        this.setIndicatorPosition();
    }
    get value() {
        return this._value;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
        this.markButtonsForCheck();
    }
    _buttons;
    _indicatorRef;
    _selectedElementIndex = null;
    _onTouched = voidFn;
    _controlValueAccessorChangeFn = voidFn;
    _type = 'standard';
    _value = null;
    _disabled = false;
    _sharedResizeObserverService = inject(QSharedResizeObserverService);
    _document = inject(DOCUMENT);
    _destroy$ = inject(QDestroyService);
    _elementRef = inject(ElementRef);
    _changeDetector = inject(ChangeDetectorRef);
    injector = inject(Injector);
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
    }
    ngOnChanges(changes) {
        if (changes.widthStrategy?.currentValue && !changes.widthStrategy?.isFirstChange()) {
            this.markButtonsForCheck();
            setTimeout(() => {
                this.setIndicatorPosition();
            });
        }
    }
    ngOnInit() {
        this.setComponentControl();
    }
    ngAfterViewInit() {
        this._sharedResizeObserverService
            .observe(this._document.body)
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            if (this.widthStrategy === '100%') {
                this.setIndicatorPosition();
            }
        });
        this.setIndicatorPosition();
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
        }
    }
    /** @hidden */
    writeValue(value) {
        this.value = value;
    }
    /** @hidden */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /** @hidden */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /** @hidden */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** @hidden */
    markButtonsForCheck() {
        this._buttons?.forEach((button) => button._markForCheck());
    }
    get selectedElementWidth() {
        if (this.selectedElement) {
            return this.selectedElement.nativeElement.clientWidth;
        }
        return null;
    }
    get selectedElement() {
        for (let i = 0; i < this._buttons.length; i++) {
            const button = this._buttons.get(i);
            if (button?.selected) {
                this._selectedElementIndex = i;
                return button._elementRef;
            }
        }
        return null;
    }
    get indicatorLeftPosition() {
        if (this.selectedElement) {
            const selectedElementLeft = this.selectedElement.nativeElement.getBoundingClientRect().left;
            const formGroupLeft = this._elementRef.nativeElement.getBoundingClientRect().left;
            const borderWidth = 1;
            return selectedElementLeft - formGroupLeft - borderWidth;
        }
        return null;
    }
    setComponentControl() {
        const injectedControl = this.injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    setIndicatorPosition() {
        if (this._indicatorRef) {
            const leftPosition = this.indicatorLeftPosition;
            const selectedElementWidth = this.selectedElementWidth;
            if (leftPosition !== null && selectedElementWidth !== null) {
                this._indicatorRef.nativeElement.style.left = `${leftPosition}px`;
                this._indicatorRef.nativeElement.style.width = `${selectedElementWidth}px`;
                this._indicatorRef.nativeElement.style.visibility = 'visible';
            }
            else {
                this._indicatorRef.nativeElement.style.visibility = 'hidden';
            }
            this._changeDetector.markForCheck();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToggleButtonGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: QToggleButtonGroupComponent, isStandalone: true, selector: "q-toggle-button-group", inputs: { controlId: "controlId", widthStrategy: "widthStrategy", errorStateMatcher: "errorStateMatcher", dataQt: "dataQt", type: "type", value: "value", disabled: "disabled" }, host: { properties: { "attr.id": "controlId", "attr.data-qt": "this.dataQt" } }, providers: [
            { provide: Q_TOGGLE_BUTTON_GROUP, useExisting: QToggleButtonGroupComponent },
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QToggleButtonGroupComponent),
                multi: true,
            },
            { provide: FormFieldControl, useExisting: QToggleButtonGroupComponent },
            QDestroyService,
        ], queries: [{ propertyName: "_buttons", predicate: i0.forwardRef(() => QToggleButtonComponent), descendants: true }], viewQueries: [{ propertyName: "_indicatorRef", first: true, predicate: ["indicator"], descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"q-toggle-button-group q-toggle-button-group-{{ type }}\"\n  [class.q-toggle-button-group-disabled]=\"disabled\"\n  [class.q-toggle-button-group-width-full]=\"widthStrategy === '100%'\">\n  <div #indicator class=\"q-toggle-button-group-indicator\"></div>\n  <div class=\"q-toggle-button-group-options\">\n    <ng-content />\n  </div>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-toggle-button-group{font-family:var(--awds-toggle-button-group-font-family, var(--ads-font-family-body));font-size:var(--awds-toggle-button-group-font-size, var(--ads-font-size-s));font-style:var(--awds-toggle-button-group-font-style, inherit);font-weight:var(--awds-toggle-button-group-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-toggle-button-group-letter-spacing, 0);line-height:var(--awds-toggle-button-group-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-toggle-button-group-text-transform, none);display:inline-flex;position:relative;border-radius:var(--awds-toggle-button-group-container-border-radius, var(--ads-border-radius-xl))}.q-toggle-button-group .q-toggle-button-group-options{display:inline-flex;gap:var(--awds-toggle-button-group-container-gap, var(--ads-size-quark))}.q-toggle-button-group .q-toggle-button-group-indicator{min-width:var(--awds-toggle-button-group-indicator-min-width, 90px);border-radius:var(--awds-toggle-button-group-indicator-border-radius, var(--ads-border-radius-xl));height:var(--awds-toggle-button-group-indicator-height, 100%);width:var(--awds-toggle-button-group-indicator-width, 0);position:absolute;transition:all .2s}.q-toggle-button-group.q-toggle-button-group-standard{background:var(--awds-toggle-button-group-standard-container-background, transparent);border:var(--awds-toggle-button-group-standard-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-toggle-button-group.q-toggle-button-group-standard .q-toggle-button-group-indicator{background:var(--awds-toggle-button-group-standard-indicator-background, transparent);box-shadow:var(--awds-toggle-button-group-standard-indicator-box-shadow, 0 0 0 1px var(--ads-color-primary-400))}.q-toggle-button-group.q-toggle-button-group-alternate{background:var(--awds-toggle-button-group-alternate-container-background, transparent);border:var(--awds-toggle-button-group-alternate-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-toggle-button-group.q-toggle-button-group-alternate .q-toggle-button-group-indicator{background:var(--awds-toggle-button-group-alternate-indicator-background, var(--ads-color-primary-100));box-shadow:var(--awds-toggle-button-group-alternate-indicator-box-shadow, 0 0 0 1px var(--ads-color-primary-400))}.q-toggle-button-group.q-toggle-button-group-disabled{border:1px solid var(--awds-toggle-button-group-disabled-container-border, var(--ads-color-body-400))}.q-toggle-button-group.q-toggle-button-group-disabled .q-toggle-button-group-indicator{background:var(--awds-toggle-button-group-disabled-indicator-background, transparent);box-shadow:var(--awds-toggle-button-group-disabled-indicator-box-shadow, 0 0 0 1px var(--ads-color-secondary-400));opacity:var(--awds-toggle-button-group-disabled-indicator-opacity, 1)}.q-toggle-button-group.q-toggle-button-group-width-full{width:var(--awds-toggle-button-group-container-width, 100%)}.q-toggle-button-group.q-toggle-button-group-width-full .q-toggle-button-group-options{width:var(--awds-toggle-button-group-container-options-width, inherit)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QToggleButtonGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-toggle-button-group', providers: [
                        { provide: Q_TOGGLE_BUTTON_GROUP, useExisting: QToggleButtonGroupComponent },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QToggleButtonGroupComponent),
                            multi: true,
                        },
                        { provide: FormFieldControl, useExisting: QToggleButtonGroupComponent },
                        QDestroyService,
                    ], host: { '[attr.id]': 'controlId' }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"q-toggle-button-group q-toggle-button-group-{{ type }}\"\n  [class.q-toggle-button-group-disabled]=\"disabled\"\n  [class.q-toggle-button-group-width-full]=\"widthStrategy === '100%'\">\n  <div #indicator class=\"q-toggle-button-group-indicator\"></div>\n  <div class=\"q-toggle-button-group-options\">\n    <ng-content />\n  </div>\n</div>\n", styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-toggle-button-group{font-family:var(--awds-toggle-button-group-font-family, var(--ads-font-family-body));font-size:var(--awds-toggle-button-group-font-size, var(--ads-font-size-s));font-style:var(--awds-toggle-button-group-font-style, inherit);font-weight:var(--awds-toggle-button-group-font-weight, var(--ads-font-weight-regular));letter-spacing:var(--awds-toggle-button-group-letter-spacing, 0);line-height:var(--awds-toggle-button-group-line-height, var(--ads-font-line-height-s));text-transform:var(--awds-toggle-button-group-text-transform, none);display:inline-flex;position:relative;border-radius:var(--awds-toggle-button-group-container-border-radius, var(--ads-border-radius-xl))}.q-toggle-button-group .q-toggle-button-group-options{display:inline-flex;gap:var(--awds-toggle-button-group-container-gap, var(--ads-size-quark))}.q-toggle-button-group .q-toggle-button-group-indicator{min-width:var(--awds-toggle-button-group-indicator-min-width, 90px);border-radius:var(--awds-toggle-button-group-indicator-border-radius, var(--ads-border-radius-xl));height:var(--awds-toggle-button-group-indicator-height, 100%);width:var(--awds-toggle-button-group-indicator-width, 0);position:absolute;transition:all .2s}.q-toggle-button-group.q-toggle-button-group-standard{background:var(--awds-toggle-button-group-standard-container-background, transparent);border:var(--awds-toggle-button-group-standard-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-toggle-button-group.q-toggle-button-group-standard .q-toggle-button-group-indicator{background:var(--awds-toggle-button-group-standard-indicator-background, transparent);box-shadow:var(--awds-toggle-button-group-standard-indicator-box-shadow, 0 0 0 1px var(--ads-color-primary-400))}.q-toggle-button-group.q-toggle-button-group-alternate{background:var(--awds-toggle-button-group-alternate-container-background, transparent);border:var(--awds-toggle-button-group-alternate-container-border, var(--ads-border-width-hairline) solid var(--ads-color-body-400))}.q-toggle-button-group.q-toggle-button-group-alternate .q-toggle-button-group-indicator{background:var(--awds-toggle-button-group-alternate-indicator-background, var(--ads-color-primary-100));box-shadow:var(--awds-toggle-button-group-alternate-indicator-box-shadow, 0 0 0 1px var(--ads-color-primary-400))}.q-toggle-button-group.q-toggle-button-group-disabled{border:1px solid var(--awds-toggle-button-group-disabled-container-border, var(--ads-color-body-400))}.q-toggle-button-group.q-toggle-button-group-disabled .q-toggle-button-group-indicator{background:var(--awds-toggle-button-group-disabled-indicator-background, transparent);box-shadow:var(--awds-toggle-button-group-disabled-indicator-box-shadow, 0 0 0 1px var(--ads-color-secondary-400));opacity:var(--awds-toggle-button-group-disabled-indicator-opacity, 1)}.q-toggle-button-group.q-toggle-button-group-width-full{width:var(--awds-toggle-button-group-container-width, 100%)}.q-toggle-button-group.q-toggle-button-group-width-full .q-toggle-button-group-options{width:var(--awds-toggle-button-group-container-options-width, inherit)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { controlId: [{
                type: Input
            }], widthStrategy: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _buttons: [{
                type: ContentChildren,
                args: [forwardRef(() => QToggleButtonComponent), { descendants: true }]
            }], _indicatorRef: [{
                type: ViewChild,
                args: ['indicator']
            }] } });

const Q_TOGGLE_BUTTON_COMPONENTS = [
    QToggleButtonComponent,
    QToggleButtonGroupComponent,
];

/**
 * Generated bundle index. Do not edit.
 */

export { QToggleButtonComponent, QToggleButtonGroupComponent, Q_TOGGLE_BUTTON_COMPONENTS };
//# sourceMappingURL=questrade-allspark-angular-components-toggle-button.mjs.map
