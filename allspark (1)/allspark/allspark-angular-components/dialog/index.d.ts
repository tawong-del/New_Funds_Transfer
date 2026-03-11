import * as i0 from '@angular/core';
import { AfterViewInit } from '@angular/core';
import * as i1 from '@questrade/allspark-angular-components/core/directives';

declare class QDialogContentComponent {
    dataQt: string;
    _hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDialogContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDialogContentComponent, "q-dialog-content, [q-dialog-content], [qDialogContent]", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, [{ directive: typeof i1.QScrollShadowDirective; inputs: {}; outputs: {}; }]>;
}

declare class QDialogFooterComponent {
    dataQt: string;
    _hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDialogFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDialogFooterComponent, "q-dialog-footer, [q-dialog-footer], [qDialogFooter]", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["[q-dialog-footer-aside-action]", "*"], true, never>;
}

declare class QDialogHeaderComponent {
    dataQt: string;
    _hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDialogHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDialogHeaderComponent, "q-dialog-header, [q-dialog-header], [qDialogHeader]", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
}

type QDialogClosedBy = 'any' | 'closerequest' | 'none';

type QDialogSize = 'medium' | 'large' | 'xlarge';

declare class QDialogComponent implements AfterViewInit {
    size: QDialogSize | null;
    dataQt: string;
    closedby: QDialogClosedBy | null;
    get _hostClasses(): string;
    _onClick: (event: MouseEvent) => void;
    _onEscapeKeydown: (event: KeyboardEvent) => void;
    private readonly _destroy$;
    private readonly _elementRef;
    private readonly _dialogElement;
    private readonly _breakpointObserver;
    private readonly _cdr;
    ngAfterViewInit(): void;
    showModal(): void;
    close(returnValue?: string): void;
    private _observeBreakpoints;
    private _handleClickOutside;
    private _handleEscapeKeydown;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDialogComponent, "dialog[q-dialog], dialog[qDialog]", never, { "size": { "alias": "size"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "closedby": { "alias": "closedby"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare const Q_DIALOG_COMPONENTS: readonly [typeof QDialogComponent, typeof QDialogHeaderComponent, typeof QDialogContentComponent, typeof QDialogFooterComponent];

export { QDialogComponent, QDialogContentComponent, QDialogFooterComponent, QDialogHeaderComponent, Q_DIALOG_COMPONENTS };
export type { QDialogClosedBy, QDialogSize };
