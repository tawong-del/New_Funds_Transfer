import { FocusMonitor } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import { input, forwardRef, ViewEncapsulation, ChangeDetectionStrategy, Component, EventEmitter, viewChild, inject, ChangeDetectorRef, ElementRef, booleanAttribute, HostListener, Input, HostBinding, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENTER, voidFn, isPresent } from '@questrade/allspark-angular-components/core/utils';

class QSwitchIconComponent {
    checked = input.required(...(ngDevMode ? [{ debugName: "checked" }] : []));
    disabled = input.required(...(ngDevMode ? [{ debugName: "disabled" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSwitchIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.16", type: QSwitchIconComponent, isStandalone: true, selector: "q-switch-icon", inputs: { checked: { classPropertyName: "checked", publicName: "checked", isSignal: true, isRequired: true, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class.q-switch-icon-checked": "checked()", "class.q-switch-icon-disabled": "disabled()" }, classAttribute: "q-switch-icon" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QSwitchIconComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"q-switch-icon-primary-stroke\"></div>\n<div class=\"q-switch-icon-secondary-stroke\"></div>\n", styles: [".q-switch-icon{position:relative;height:var(--awds-switch-icon-height, var(--ads-size-micro));width:var(--awds-switch-icon-width, var(--ads-size-micro));background:var(--awds-switch-icon-background, transparent);border-radius:var(--awds-switch-icon-border-radius, 0)}.q-switch-icon .q-switch-icon-primary-stroke,.q-switch-icon .q-switch-icon-secondary-stroke{position:absolute;content:\"\";top:50%;left:50%;width:100%;height:var(--awds-switch-icon-thickness, var(--ads-border-width-hairline));border-radius:var(--awds-switch-icon-stroke-border-radius, var(--ads-border-radius-s));background:var(--awds-switch-icon-color, var(--ads-color-primary-contrast-400));transition:transform .3s ease-in-out,width .3s ease-in-out}.q-switch-icon .q-switch-icon-primary-stroke{transform:translate(-50%,-50%) rotate(45deg)}.q-switch-icon .q-switch-icon-secondary-stroke{transform:translate(-50%,-50%) rotate(-45deg)}.q-switch-icon-checked .q-switch-icon-primary-stroke{transform:translate(-30%,-50%) rotate(135deg)}.q-switch-icon-checked .q-switch-icon-secondary-stroke{transform:translate(-100%,95%) rotate(225deg);width:50%}.q-switch-icon-disabled .q-switch-icon-primary-stroke,.q-switch-icon-disabled .q-switch-icon-secondary-stroke{background:var(--awds-switch-icon-disabled-color, var(--ads-color-body-400))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSwitchIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-switch-icon', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QSwitchIconComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'q-switch-icon',
                        '[class.q-switch-icon-checked]': 'checked()',
                        '[class.q-switch-icon-disabled]': 'disabled()',
                    }, template: "<div class=\"q-switch-icon-primary-stroke\"></div>\n<div class=\"q-switch-icon-secondary-stroke\"></div>\n", styles: [".q-switch-icon{position:relative;height:var(--awds-switch-icon-height, var(--ads-size-micro));width:var(--awds-switch-icon-width, var(--ads-size-micro));background:var(--awds-switch-icon-background, transparent);border-radius:var(--awds-switch-icon-border-radius, 0)}.q-switch-icon .q-switch-icon-primary-stroke,.q-switch-icon .q-switch-icon-secondary-stroke{position:absolute;content:\"\";top:50%;left:50%;width:100%;height:var(--awds-switch-icon-thickness, var(--ads-border-width-hairline));border-radius:var(--awds-switch-icon-stroke-border-radius, var(--ads-border-radius-s));background:var(--awds-switch-icon-color, var(--ads-color-primary-contrast-400));transition:transform .3s ease-in-out,width .3s ease-in-out}.q-switch-icon .q-switch-icon-primary-stroke{transform:translate(-50%,-50%) rotate(45deg)}.q-switch-icon .q-switch-icon-secondary-stroke{transform:translate(-50%,-50%) rotate(-45deg)}.q-switch-icon-checked .q-switch-icon-primary-stroke{transform:translate(-30%,-50%) rotate(135deg)}.q-switch-icon-checked .q-switch-icon-secondary-stroke{transform:translate(-100%,95%) rotate(225deg);width:50%}.q-switch-icon-disabled .q-switch-icon-primary-stroke,.q-switch-icon-disabled .q-switch-icon-secondary-stroke{background:var(--awds-switch-icon-disabled-color, var(--ads-color-body-400))}\n"] }]
        }], propDecorators: { checked: [{ type: i0.Input, args: [{ isSignal: true, alias: "checked", required: true }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: true }] }] } });

class QSwitchComponent {
    checkedChange = new EventEmitter();
    checked = false;
    disabled = false;
    dataQt = 'q-switch';
    _onKeyDown(event) {
        if (event.code === ENTER && !this.disabled) {
            this._onInputInteraction(event);
        }
    }
    inputElementRef = viewChild('inputRef', ...(ngDevMode ? [{ debugName: "inputElementRef" }] : []));
    _onChange = voidFn;
    _onTouch = voidFn;
    _changeDetectorRef = inject(ChangeDetectorRef);
    _focusMonitor = inject(FocusMonitor);
    _elementRef = inject(ElementRef);
    ngAfterViewInit() {
        const inputElement = this.inputElementRef();
        if (inputElement) {
            this._focusMonitor.monitor(inputElement.nativeElement, true);
        }
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
    /** @hidden */
    writeValue(value) {
        this.checked = isPresent(value) && value;
        this._emitChangeEvent(new Event('change'));
    }
    /** @hidden */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /** @hidden */
    registerOnTouched(fn) {
        this._onTouch = fn;
    }
    /** @hidden */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }
    onTouchTargetClick(event) {
        if (this.disabled)
            return;
        this.inputElementRef()?.nativeElement.focus();
        this._onInputInteraction(event);
    }
    onInputBlur() {
        this._onTouch();
    }
    _onInputInteraction(event) {
        this.checked = !this.checked;
        this._emitChangeEvent(event);
    }
    _emitChangeEvent(event) {
        this._onChange(this.checked);
        this.checkedChange.emit({
            value: this.checked,
            nativeEvent: event,
        });
        this._changeDetectorRef.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.16", type: QSwitchComponent, isStandalone: true, selector: "q-switch", inputs: { checked: ["checked", "checked", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute], dataQt: "dataQt" }, outputs: { checkedChange: "checkedChange" }, host: { listeners: { "click": "onTouchTargetClick($event)", "keydown": "_onKeyDown($event)" }, properties: { "class.q-switch-checked": "this.checked", "class.q-switch-disabled": "this.disabled", "attr.data-qt": "this.dataQt" }, classAttribute: "q-switch" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QSwitchComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "inputElementRef", first: true, predicate: ["inputRef"], descendants: true, isSignal: true }], ngImport: i0, template: "<input\n  #inputRef\n  role=\"switch\"\n  class=\"q-switch-input\"\n  type=\"checkbox\"\n  [checked]=\"checked\"\n  [disabled]=\"disabled\"\n  (blur)=\"onInputBlur()\" />\n\n<div class=\"q-switch-highlight\"></div>\n\n<div class=\"q-switch-handle\">\n  <q-switch-icon [checked]=\"checked\" [disabled]=\"disabled\" />\n</div>\n\n<div class=\"q-switch-track\"></div>\n\n<ng-content />\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-switch{display:inline-flex;position:relative;align-items:center;padding:var(--awds-switch-container-padding, var(--ads-size-quark) var(--ads-size-nano));border-radius:var(--awds-switch-container-border-radius, 0);height:var(--awds-switch-container-height, var(--ads-size-s));width:var(--awds-switch-container-width, auto);gap:var(--awds-switch-container-gap, 0 var(--ads-size-micro));outline:var(--awds-switch-container-outline, none);cursor:pointer;-webkit-tap-highlight-color:transparent}.q-switch .q-switch-track{background:var(--awds-switch-track-background, var(--ads-color-body-400));border-radius:var(--awds-switch-track-border-radius, var(--ads-border-radius-xl));outline:var(--awds-switch-track-outline, none);width:var(--awds-switch-track-width, var(--ads-size-m));height:var(--awds-switch-track-height, var(--ads-size-xxxs))}.q-switch .q-switch-highlight{position:absolute;z-index:-1;transform:translate(-25%);transition:transform .4s;border-radius:var(--awds-switch-highlight-border-radius, var(--ads-border-radius-xl));outline:var(--awds-switch-highlight-outline, none);height:var(--awds-switch-highlight-height, var(--ads-size-l));width:var(--awds-switch-highlight-width, var(--ads-size-l))}.q-switch .q-switch-handle{display:flex;position:absolute;align-items:center;justify-content:center;transition:transform .4s,background .4s;transform:var(--awds-switch-handle-transform, translateX(0));border-radius:var(--awds-switch-handle-border-radius, var(--ads-border-radius-xl));height:var(--awds-switch-handle-height, var(--ads-size-xs));width:var(--awds-switch-handle-width, var(--ads-size-xs));background:var(--awds-switch-handle-background, var(--ads-color-body-500));box-shadow:var(--awds-switch-handle-box-shadow, 0 1px 2px rgba(0, 0, 0, .24))}.q-switch .q-switch-input{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;width:1px;margin:-1px;overflow:hidden;padding:0;position:absolute}.q-switch .q-switch-input:checked~.q-switch-track{background:var(--awds-switch-checked-track-background, var(--ads-color-primary-200))}.q-switch .q-switch-input:checked~.q-switch-handle{transform:var(--awds-switch-checked-handle-transform, translateX(var(--ads-size-xxxs)));background:var(--awds-switch-checked-handle-background, var(--ads-color-primary-400))}.q-switch .q-switch-input:checked~.q-switch-highlight{transform:var(--awds-switch-checked-highlight-transform, translateX(calc(-25% + var(--ads-size-xxxs))))}.q-switch .q-switch-input:focus-visible.cdk-keyboard-focused~.q-switch-highlight{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-switch .q-switch-input:disabled~.q-switch-track{background:var(--awds-switch-disabled-track-background, var(--ads-color-body-400))}.q-switch .q-switch-input:disabled~.q-switch-handle{background:var(--awds-switch-disabled-handle-background, var(--ads-color-body-300))}.q-switch .q-switch-input:disabled:checked~.q-switch-track{background:var(--awds-switch-disabled-checked-track-background, var(--ads-color-primary-200))}.q-switch .q-switch-input:disabled:checked~.q-switch-handle{background:var(--awds-switch-disabled-checked-handle-background, var(--ads-color-primary-100))}.q-switch:hover .q-switch-highlight{background:var(--awds-switch-hover-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-switch:active .q-switch-highlight{background:var(--awds-switch-active-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-pressed-complement) * 100%), rgb(from var(--ads-color-state-no-background-pressed) r g b/100%) calc((1 - var(--ads-color-state-no-background-pressed-complement)) * 100%)))}.q-switch-disabled{cursor:default;pointer-events:none}\n"], dependencies: [{ kind: "component", type: QSwitchIconComponent, selector: "q-switch-icon", inputs: ["checked", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-switch', imports: [QSwitchIconComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => QSwitchComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'q-switch',
                        '[class.q-switch-checked]': 'checked',
                        '[class.q-switch-disabled]': 'disabled',
                        '(click)': 'onTouchTargetClick($event)',
                    }, template: "<input\n  #inputRef\n  role=\"switch\"\n  class=\"q-switch-input\"\n  type=\"checkbox\"\n  [checked]=\"checked\"\n  [disabled]=\"disabled\"\n  (blur)=\"onInputBlur()\" />\n\n<div class=\"q-switch-highlight\"></div>\n\n<div class=\"q-switch-handle\">\n  <q-switch-icon [checked]=\"checked\" [disabled]=\"disabled\" />\n</div>\n\n<div class=\"q-switch-track\"></div>\n\n<ng-content />\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-switch{display:inline-flex;position:relative;align-items:center;padding:var(--awds-switch-container-padding, var(--ads-size-quark) var(--ads-size-nano));border-radius:var(--awds-switch-container-border-radius, 0);height:var(--awds-switch-container-height, var(--ads-size-s));width:var(--awds-switch-container-width, auto);gap:var(--awds-switch-container-gap, 0 var(--ads-size-micro));outline:var(--awds-switch-container-outline, none);cursor:pointer;-webkit-tap-highlight-color:transparent}.q-switch .q-switch-track{background:var(--awds-switch-track-background, var(--ads-color-body-400));border-radius:var(--awds-switch-track-border-radius, var(--ads-border-radius-xl));outline:var(--awds-switch-track-outline, none);width:var(--awds-switch-track-width, var(--ads-size-m));height:var(--awds-switch-track-height, var(--ads-size-xxxs))}.q-switch .q-switch-highlight{position:absolute;z-index:-1;transform:translate(-25%);transition:transform .4s;border-radius:var(--awds-switch-highlight-border-radius, var(--ads-border-radius-xl));outline:var(--awds-switch-highlight-outline, none);height:var(--awds-switch-highlight-height, var(--ads-size-l));width:var(--awds-switch-highlight-width, var(--ads-size-l))}.q-switch .q-switch-handle{display:flex;position:absolute;align-items:center;justify-content:center;transition:transform .4s,background .4s;transform:var(--awds-switch-handle-transform, translateX(0));border-radius:var(--awds-switch-handle-border-radius, var(--ads-border-radius-xl));height:var(--awds-switch-handle-height, var(--ads-size-xs));width:var(--awds-switch-handle-width, var(--ads-size-xs));background:var(--awds-switch-handle-background, var(--ads-color-body-500));box-shadow:var(--awds-switch-handle-box-shadow, 0 1px 2px rgba(0, 0, 0, .24))}.q-switch .q-switch-input{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;width:1px;margin:-1px;overflow:hidden;padding:0;position:absolute}.q-switch .q-switch-input:checked~.q-switch-track{background:var(--awds-switch-checked-track-background, var(--ads-color-primary-200))}.q-switch .q-switch-input:checked~.q-switch-handle{transform:var(--awds-switch-checked-handle-transform, translateX(var(--ads-size-xxxs)));background:var(--awds-switch-checked-handle-background, var(--ads-color-primary-400))}.q-switch .q-switch-input:checked~.q-switch-highlight{transform:var(--awds-switch-checked-highlight-transform, translateX(calc(-25% + var(--ads-size-xxxs))))}.q-switch .q-switch-input:focus-visible.cdk-keyboard-focused~.q-switch-highlight{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-switch .q-switch-input:disabled~.q-switch-track{background:var(--awds-switch-disabled-track-background, var(--ads-color-body-400))}.q-switch .q-switch-input:disabled~.q-switch-handle{background:var(--awds-switch-disabled-handle-background, var(--ads-color-body-300))}.q-switch .q-switch-input:disabled:checked~.q-switch-track{background:var(--awds-switch-disabled-checked-track-background, var(--ads-color-primary-200))}.q-switch .q-switch-input:disabled:checked~.q-switch-handle{background:var(--awds-switch-disabled-checked-handle-background, var(--ads-color-primary-100))}.q-switch:hover .q-switch-highlight{background:var(--awds-switch-hover-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-hover-complement) * 100%), rgb(from var(--ads-color-state-no-background-hover) r g b/100%) calc((1 - var(--ads-color-state-no-background-hover-complement)) * 100%)))}.q-switch:active .q-switch-highlight{background:var(--awds-switch-active-highlight-background, color-mix(in srgb, var(--ads-color-primary-400) calc(var(--ads-color-state-no-background-pressed-complement) * 100%), rgb(from var(--ads-color-state-no-background-pressed) r g b/100%) calc((1 - var(--ads-color-state-no-background-pressed-complement)) * 100%)))}.q-switch-disabled{cursor:default;pointer-events:none}\n"] }]
        }], propDecorators: { checkedChange: [{
                type: Output
            }], checked: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-switch-checked']
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-switch-disabled']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], inputElementRef: [{ type: i0.ViewChild, args: ['inputRef', { isSignal: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QSwitchComponent };
//# sourceMappingURL=questrade-allspark-angular-components-switch.mjs.map
