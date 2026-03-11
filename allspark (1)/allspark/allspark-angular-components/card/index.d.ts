import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';

type QCardVariant = 'outline' | 'elevated' | 'regular';

declare class QCardComponent {
    readonly selectedChange: EventEmitter<boolean>;
    selected: boolean;
    selectable: boolean;
    variant: QCardVariant;
    dataQt: string;
    get hostTabindex(): number | null;
    get hostClasses(): string;
    _onCardClick(event: Event): void;
    _onKeyDown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QCardComponent, "q-card", never, { "selected": { "alias": "selected"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "selectedChange": "selectedChange"; }, never, ["*"], true, never>;
    static ngAcceptInputType_selected: unknown;
    static ngAcceptInputType_selectable: unknown;
}

export { QCardComponent };
export type { QCardVariant };
