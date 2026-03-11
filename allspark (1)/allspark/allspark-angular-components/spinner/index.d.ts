import * as i0 from '@angular/core';
import { OnInit } from '@angular/core';

type QSpinnerSize = 'large' | 'medium' | 'small' | 'x-small';

type QSpinnerVariant = 'primary' | 'secondary' | 'inherit';

declare class QSpinnerComponent implements OnInit {
    variant: QSpinnerVariant;
    size: QSpinnerSize;
    dataQt: string;
    private static readonly _svgViewBox;
    private static readonly _size;
    private static readonly _stroke;
    private static readonly _svgData;
    ngOnInit(): void;
    get viewBox(): string;
    get path(): string;
    get sizeValue(): number;
    get strokeWidth(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSpinnerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QSpinnerComponent, "q-spinner", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, never, true, never>;
}

export { QSpinnerComponent };
export type { QSpinnerSize, QSpinnerVariant };
