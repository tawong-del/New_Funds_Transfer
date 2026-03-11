import * as i0 from '@angular/core';
import { AfterViewInit, DoCheck, OnInit, AfterContentInit } from '@angular/core';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';

declare class QTextareaAutosizeDirective implements AfterViewInit, DoCheck {
    get minRows(): number | null;
    set minRows(value: number | null);
    get maxRows(): number | null;
    set maxRows(value: number | null);
    hostRows: string;
    onInput: () => void;
    private _previousValue;
    private _cachedLineHeight;
    private _previousMinRows;
    private _minRows;
    private _maxRows;
    private _maxHeight;
    private _minHeight;
    private _inputGap;
    private readonly _destroy$;
    private readonly _textareaElement;
    private readonly _ngZone;
    private readonly _platformService;
    private readonly _sharedResizeObserver;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    _resizeToFitContent(force?: boolean): void;
    _cacheTextareaLineHeight(): void;
    private _setMinHeight;
    private _setMaxHeight;
    private _noopInputHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTextareaAutosizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QTextareaAutosizeDirective, "textarea[qTextareaAutosize][qTextarea], textarea[q-textarea-autosize][q-textarea]", never, { "minRows": { "alias": "minRows"; "required": false; }; "maxRows": { "alias": "maxRows"; "required": false; }; }, {}, never, never, true, never>;
}

declare class QTextareaDirective extends ErrorState implements OnInit, FormFieldControl, DoCheck, AfterContentInit {
    errorStateMatcher: ErrorStateMatcherInterface;
    controlId: string;
    dataQt: string;
    errorState: boolean;
    hostClass: string;
    onInput(): void;
    private _maxLength;
    private _counterElement;
    private _containerElement;
    private readonly _destroy$;
    private readonly _focusMonitor;
    private readonly _textareaElement;
    private readonly _injector;
    private readonly _renderer;
    private readonly _sharedMutationObserver;
    constructor();
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngDoCheck(): void;
    _setCounterElement(): void;
    private _createCounterElements;
    private _updateCounter;
    private _toggleCounterVisibility;
    private _listenForDisabledAndInvalidChanges;
    private _listenForControlChanges;
    private _setComponentControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTextareaDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QTextareaDirective, "textarea[q-textarea], textarea[qTextarea]", never, { "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "controlId": { "alias": "id"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "errorState": { "alias": "errorState"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_errorState: unknown;
}

declare const Q_TEXTAREA_DIRECTIVES: (typeof QTextareaAutosizeDirective | typeof QTextareaDirective)[];

export { QTextareaAutosizeDirective, QTextareaDirective, Q_TEXTAREA_DIRECTIVES };
