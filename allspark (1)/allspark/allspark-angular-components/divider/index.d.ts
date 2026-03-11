import * as i0 from '@angular/core';

type QDividerOrientation = 'horizontal' | 'vertical';

type QDividerStyle = 'thick' | 'line' | 'dash';

type QDividerVariant = 'normal' | 'light' | 'faded';

declare class QDividerComponent {
    type: QDividerVariant;
    style: QDividerStyle;
    orientation: QDividerOrientation;
    dataQt: string;
    _role: string;
    get ariaOrientation(): QDividerOrientation;
    get hostClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDividerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QDividerComponent, "q-divider", never, { "type": { "alias": "type"; "required": false; }; "style": { "alias": "style"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, never, true, never>;
}

export { QDividerComponent };
export type { QDividerOrientation, QDividerStyle, QDividerVariant };
