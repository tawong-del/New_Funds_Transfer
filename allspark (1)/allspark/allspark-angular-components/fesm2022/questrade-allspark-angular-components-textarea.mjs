import { coerceNumberProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { inject, ElementRef, NgZone, HostListener, HostBinding, Input, Directive, Injector, Renderer2, numberAttribute, booleanAttribute } from '@angular/core';
import { QPlatformService, QSharedResizeObserverService, QSharedMutationObserverService } from '@questrade/allspark-angular-components/core/services';
import { injectDestroy, isPresent, ErrorState, randomString } from '@questrade/allspark-angular-components/core/utils';
import { takeUntil } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormGroupDirective, NgForm, NgControl } from '@angular/forms';
import { ErrorStateMatcher, FormFieldControl } from '@questrade/allspark-angular-components/form-control';

class QTextareaAutosizeDirective {
    get minRows() {
        return this._minRows;
    }
    set minRows(value) {
        this._minRows = coerceNumberProperty(value);
        this._setMinHeight();
    }
    get maxRows() {
        return this._maxRows;
    }
    set maxRows(value) {
        this._maxRows = coerceNumberProperty(value);
        this._setMaxHeight();
    }
    // Textarea elements that have the directive applied should have a single row by default.
    // Browsers show two rows by default and therefore this limits the minRows binding.
    hostRows = '1';
    onInput = () => this._noopInputHandler();
    _previousValue = '';
    _cachedLineHeight = null;
    _previousMinRows = null;
    _minRows = null;
    _maxRows = null;
    _maxHeight = null;
    _minHeight = null;
    _inputGap = 20;
    _destroy$ = injectDestroy();
    _textareaElement = inject(ElementRef).nativeElement;
    _ngZone = inject(NgZone);
    _platformService = inject(QPlatformService);
    _sharedResizeObserver = inject(QSharedResizeObserverService);
    ngAfterViewInit() {
        if (this._platformService.isBrowser) {
            this._resizeToFitContent();
            this._sharedResizeObserver
                .observe(this._textareaElement)
                ?.pipe(takeUntil(this._destroy$))
                .subscribe(() => this._resizeToFitContent(true));
        }
    }
    ngDoCheck() {
        if (this._platformService.isBrowser) {
            setTimeout(() => this._resizeToFitContent());
        }
    }
    _resizeToFitContent(force = false) {
        this._cacheTextareaLineHeight();
        if (!this._cachedLineHeight)
            return;
        const textarea = this._textareaElement;
        const value = textarea.value;
        if (!force && this._minRows === this._previousMinRows && value === this._previousValue) {
            return;
        }
        const placeholderText = textarea.placeholder;
        textarea.style.height = 'auto';
        textarea.style.overflow = 'hidden';
        textarea.placeholder = '';
        let height = Math.round((textarea.scrollHeight - this._inputGap) / this._cachedLineHeight) *
            this._cachedLineHeight +
            this._inputGap;
        if (isPresent(this._maxHeight)) {
            height = Math.max(height, this._maxHeight);
        }
        if (isPresent(this._minHeight)) {
            height = Math.min(height, this._minHeight);
        }
        textarea.style.height = `${height}px`;
        textarea.style.overflow = 'auto';
        textarea.placeholder = placeholderText;
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(() => requestAnimationFrame(() => {
                const { selectionStart, selectionEnd } = textarea;
                textarea.setSelectionRange(selectionStart, selectionEnd);
            }));
        }
        this._previousValue = value;
        this._previousMinRows = this._minRows;
    }
    _cacheTextareaLineHeight() {
        if (isPresent(this._cachedLineHeight))
            return;
        const textareaClone = this._textareaElement.cloneNode(false);
        textareaClone.rows = 1;
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '0';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        textareaClone.style.overflow = 'hidden';
        this._textareaElement.parentNode?.appendChild(textareaClone);
        this._cachedLineHeight = textareaClone.clientHeight;
        textareaClone.remove();
        this._setMinHeight();
        this._setMaxHeight();
    }
    _setMinHeight() {
        const minHeight = this._minRows && this._cachedLineHeight
            ? this._minRows * this._cachedLineHeight + this._inputGap
            : null;
        if (isPresent(minHeight)) {
            this._textareaElement.style.minHeight = `${minHeight}px`;
        }
    }
    _setMaxHeight() {
        const maxHeight = this._maxRows && this._cachedLineHeight
            ? this._maxRows * this._cachedLineHeight + this._inputGap
            : null;
        if (isPresent(maxHeight)) {
            this._textareaElement.style.maxHeight = `${maxHeight}px`;
        }
    }
    _noopInputHandler() {
        // noop handler that ensures we're running change detection on input events.
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTextareaAutosizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: QTextareaAutosizeDirective, isStandalone: true, selector: "textarea[qTextareaAutosize][qTextarea], textarea[q-textarea-autosize][q-textarea]", inputs: { minRows: "minRows", maxRows: "maxRows" }, host: { listeners: { "input": "onInput()" }, properties: { "rows": "this.hostRows" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTextareaAutosizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'textarea[qTextareaAutosize][qTextarea], textarea[q-textarea-autosize][q-textarea]',
                }]
        }], propDecorators: { minRows: [{
                type: Input
            }], maxRows: [{
                type: Input
            }], hostRows: [{
                type: HostBinding,
                args: ['rows']
            }], onInput: [{
                type: HostListener,
                args: ['input']
            }] } });

class QTextareaDirective extends ErrorState {
    errorStateMatcher = new ErrorStateMatcher();
    controlId = `q-textarea-${randomString()}`;
    dataQt = 'q-textarea';
    errorState = false;
    hostClass = 'q-textarea';
    onInput() {
        if (this._maxLength && !this.ngControl) {
            this._updateCounter();
        }
    }
    _maxLength = 0;
    _counterElement = null;
    _containerElement = null;
    _destroy$ = injectDestroy();
    _focusMonitor = inject(FocusMonitor);
    _textareaElement = inject(ElementRef).nativeElement;
    _injector = inject(Injector);
    _renderer = inject(Renderer2);
    _sharedMutationObserver = inject(QSharedMutationObserverService);
    constructor() {
        super(inject(FormGroupDirective, { optional: true }), inject(NgForm, { optional: true }));
    }
    ngOnInit() {
        this._setComponentControl();
        this._focusMonitor.monitor(this._textareaElement);
        this._destroy$.onDestroy(() => this._focusMonitor.stopMonitoring(this._textareaElement));
    }
    ngAfterContentInit() {
        this._setCounterElement();
        this._listenForDisabledAndInvalidChanges();
        this._listenForControlChanges();
    }
    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
        }
    }
    _setCounterElement() {
        const maxLength = numberAttribute(this._textareaElement.getAttribute('maxlength'), 0);
        this._maxLength = maxLength > 0 ? maxLength : 0;
        if (this._maxLength) {
            this._createCounterElements();
            this._updateCounter();
        }
    }
    _createCounterElements() {
        this._containerElement = this._renderer.createElement('div');
        this._renderer.addClass(this._containerElement, 'q-textarea-container');
        const parent = this._renderer.parentNode(this._textareaElement);
        this._renderer.insertBefore(parent, this._containerElement, this._textareaElement);
        this._renderer.appendChild(this._containerElement, this._textareaElement);
        this._counterElement = this._renderer.createElement('span');
        this._renderer.addClass(this._counterElement, 'q-textarea-counter');
        this._renderer.appendChild(this._containerElement, this._counterElement);
    }
    _updateCounter() {
        if (this._counterElement) {
            const valueLength = this._textareaElement.value.length;
            this._renderer.setProperty(this._counterElement, 'textContent', `${valueLength}/${this._maxLength}`);
        }
    }
    _toggleCounterVisibility(isDisabledOrInvalid) {
        if (this._counterElement) {
            this._renderer[isDisabledOrInvalid ? 'addClass' : 'removeClass'](this._counterElement, 'q-textarea-counter-hidden');
        }
    }
    _listenForDisabledAndInvalidChanges() {
        this._sharedMutationObserver
            .observe(this._textareaElement, {
            characterData: true,
            subtree: true,
            attributes: true,
        })
            ?.pipe(takeUntil(this._destroy$))
            .subscribe((mutations) => {
            mutations.forEach((mutation) => {
                if (['disabled', 'class'].includes(mutation.attributeName || '')) {
                    const mutationTarget = mutation.target;
                    const isTargetDisabled = mutationTarget.hasAttribute('disabled');
                    const isTargetInvalid = mutationTarget.classList.contains('q-textarea-invalid');
                    this._toggleCounterVisibility(isTargetDisabled || isTargetInvalid);
                }
                if (mutation.type === 'characterData') {
                    this._updateCounter();
                }
            });
        });
    }
    _listenForControlChanges() {
        this.ngControl?.valueChanges
            ?.pipe(takeUntil(this._destroy$))
            .subscribe(() => this._updateCounter());
    }
    _setComponentControl() {
        const injectedControl = this._injector.get(NgControl, null);
        if (injectedControl) {
            this.ngControl = injectedControl;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTextareaDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: QTextareaDirective, isStandalone: true, selector: "textarea[q-textarea], textarea[qTextarea]", inputs: { errorStateMatcher: "errorStateMatcher", controlId: ["id", "controlId"], dataQt: "dataQt", errorState: ["errorState", "errorState", booleanAttribute] }, host: { listeners: { "input": "onInput()" }, properties: { "attr.id": "this.controlId", "attr.data-qt": "this.dataQt", "class.q-textarea-invalid": "this.errorState", "class": "this.hostClass" } }, providers: [{ provide: FormFieldControl, useExisting: QTextareaDirective }], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTextareaDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'textarea[q-textarea], textarea[qTextarea]',
                    providers: [{ provide: FormFieldControl, useExisting: QTextareaDirective }],
                }]
        }], ctorParameters: () => [], propDecorators: { errorStateMatcher: [{
                type: Input
            }], controlId: [{
                type: Input,
                args: [{ alias: 'id' }]
            }, {
                type: HostBinding,
                args: ['attr.id']
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], errorState: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.q-textarea-invalid']
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], onInput: [{
                type: HostListener,
                args: ['input']
            }] } });

const Q_TEXTAREA_DIRECTIVES = [QTextareaDirective, QTextareaAutosizeDirective];

/**
 * Generated bundle index. Do not edit.
 */

export { QTextareaAutosizeDirective, QTextareaDirective, Q_TEXTAREA_DIRECTIVES };
//# sourceMappingURL=questrade-allspark-angular-components-textarea.mjs.map
