import * as i0 from '@angular/core';
import { AfterContentInit } from '@angular/core';

type QGridRowContentVariant = 'primary' | 'secondary';

declare class QGridRowComponent {
    contentType: QGridRowContentVariant;
    extraSpacingRight: boolean;
    extraSpacingLeft: boolean;
    dataQt: string;
    get xxs(): number;
    set xxs(value: number);
    get xs(): number;
    set xs(value: number);
    get sm(): number;
    set sm(value: number);
    get md(): number;
    set md(value: number);
    get lg(): number;
    set lg(value: number);
    get xl(): number;
    set xl(value: number);
    get hostClasses(): string;
    private _xxs;
    private _xs;
    private _sm;
    private _md;
    private _lg;
    private _xl;
    _addExtraPaddingRight(): void;
    _addExtraPaddingLeft(): void;
    _classNames(): string;
    private getSizeClass;
    static ɵfac: i0.ɵɵFactoryDeclaration<QGridRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QGridRowComponent, "q-grid-row", never, { "contentType": { "alias": "contentType"; "required": false; }; "extraSpacingRight": { "alias": "extraSpacingRight"; "required": false; }; "extraSpacingLeft": { "alias": "extraSpacingLeft"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "xxs": { "alias": "xxs"; "required": false; }; "xs": { "alias": "xs"; "required": false; }; "sm": { "alias": "sm"; "required": false; }; "md": { "alias": "md"; "required": false; }; "lg": { "alias": "lg"; "required": false; }; "xl": { "alias": "xl"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_extraSpacingRight: unknown;
    static ngAcceptInputType_extraSpacingLeft: unknown;
}

declare class QGridComponent implements AfterContentInit {
    dataQt: string;
    private _gridRows;
    hostClass: string;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QGridComponent, "q-grid", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, ["_gridRows"], ["*"], true, never>;
}

declare const Q_GRID_COMPONENTS: readonly [typeof QGridComponent, typeof QGridRowComponent];

export { QGridComponent, QGridRowComponent, Q_GRID_COMPONENTS };
