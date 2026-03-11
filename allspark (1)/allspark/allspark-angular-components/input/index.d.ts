import * as i0 from '@angular/core';
import { OnInit, TemplateRef, DoCheck, OnDestroy } from '@angular/core';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { FormFieldControl, ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';

declare class QInputGroupComponent implements OnInit {
    prefix: TemplateRef<HTMLElement> | null;
    suffix: TemplateRef<HTMLElement> | null;
    dataQt: string;
    get hostClasses(): string;
    private readonly _focusMonitor;
    private readonly _elementRef;
    private readonly _destroy$;
    private readonly _cdr;
    private _focused;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QInputGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QInputGroupComponent, "q-input-group", never, { "prefix": { "alias": "prefix"; "required": false; }; "suffix": { "alias": "suffix"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class QInputDirective extends ErrorState implements OnInit, FormFieldControl, DoCheck, OnDestroy {
    errorStateMatcher: ErrorStateMatcherInterface;
    invalidState: boolean;
    controlId: string;
    dataQt: string;
    get hostClasses(): string;
    private readonly _focusMonitor;
    private readonly _elementRef;
    private readonly _injector;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private _setComponentControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<QInputDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QInputDirective, "input[qInput]", never, { "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "invalidState": { "alias": "invalidState"; "required": false; }; "controlId": { "alias": "controlId"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_invalidState: unknown;
}

type QInputTextAlign = 'left' | 'center' | 'right';

type QInputVariant = 'text' | 'password' | 'number';

declare const Q_INPUT_COMPONENTS: readonly [typeof QInputDirective, typeof QInputGroupComponent];

export { QInputDirective, QInputGroupComponent, Q_INPUT_COMPONENTS };
export type { QInputTextAlign, QInputVariant };
