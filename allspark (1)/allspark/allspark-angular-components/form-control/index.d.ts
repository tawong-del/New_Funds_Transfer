import * as i0 from '@angular/core';
import { OnInit, AfterContentInit, QueryList } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm, NgControl, AbstractControlDirective } from '@angular/forms';
import { Observable } from 'rxjs';

declare class QErrorDirective implements OnInit {
    private readonly _elementRef;
    private readonly _renderer;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QErrorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QErrorDirective, "[qError]", never, {}, {}, never, never, true, never>;
}

interface ErrorStateMatcherInterface {
    isErrorState: (control: AbstractControl | null, form?: FormGroupDirective | NgForm | null) => boolean;
}

declare abstract class FormFieldControl {
    readonly controlId: string;
    readonly errorState: boolean;
    readonly invalidState?: boolean;
    readonly stateChanges: Observable<void>;
    readonly ngControl: NgControl | AbstractControlDirective | null;
    readonly errorStateMatcher: ErrorStateMatcherInterface;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormFieldControl, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FormFieldControl, never, never, {}, {}, never, never, true, never>;
}

declare class QFormControlComponent implements AfterContentInit {
    preserveFooterSpace: boolean;
    showErrorIcon: boolean;
    dataQt: string;
    _formFieldControls: QueryList<FormFieldControl>;
    get hostClasses(): string;
    private readonly _destroy$;
    private readonly _cdr;
    private readonly _formGroup;
    ngAfterContentInit(): void;
    _getDisplayedMessages(): 'error' | 'hint';
    get isRadioButtonComponent(): boolean;
    get isRadioGroup(): boolean;
    get isCheckbox(): boolean;
    private _isErrorState;
    private _handleFormControlChanges;
    private _handleFormGroupChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<QFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QFormControlComponent, "q-form-control", never, { "preserveFooterSpace": { "alias": "preserveFooterSpace"; "required": false; }; "showErrorIcon": { "alias": "showErrorIcon"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, ["_formFieldControls"], ["[qLabel]", "*", "[qError]", "[qHint]"], true, never>;
    static ngAcceptInputType_preserveFooterSpace: unknown;
    static ngAcceptInputType_showErrorIcon: unknown;
}

declare class QHintDirective implements OnInit {
    private readonly _elementRef;
    private readonly _renderer;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QHintDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QHintDirective, "[qHint]", never, {}, {}, never, never, true, never>;
}

declare class QLabelDirective implements OnInit {
    private readonly _elementRef;
    private readonly _renderer;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QLabelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QLabelDirective, "[qLabel]", never, {}, {}, never, never, true, never>;
}

declare class ErrorStateMatcher implements ErrorStateMatcherInterface {
    isErrorState(control: AbstractControl | null, form?: FormGroupDirective | NgForm | null): boolean;
}

declare const Q_FORM_CONTROL_COMPONENTS: readonly [typeof QFormControlComponent, typeof QLabelDirective, typeof QHintDirective, typeof QErrorDirective];

export { ErrorStateMatcher, FormFieldControl, QErrorDirective, QFormControlComponent, QHintDirective, QLabelDirective, Q_FORM_CONTROL_COMPONENTS };
export type { ErrorStateMatcherInterface };
