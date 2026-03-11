import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';
import { QChipTextStyle, QChipVariant, QChipChangeEvent } from '@questrade/allspark-angular-components/chip';

interface QSpoilerChangeEvent {
    opened: boolean;
}

declare class QSpoilerComponent {
    readonly changed: EventEmitter<QSpoilerChangeEvent>;
    chipTextStyle: QChipTextStyle;
    chipType: QChipVariant;
    showChipIcon: boolean;
    disabled: boolean;
    dataQt: string;
    showText: string;
    hideText: string;
    _hostClass: string;
    _opened: boolean;
    private readonly _iconRegistry;
    constructor();
    _onChipChanged(event: QChipChangeEvent<boolean>): void;
    get chipIcon(): string;
    get chipText(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSpoilerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QSpoilerComponent, "q-spoiler", never, { "chipTextStyle": { "alias": "chipTextStyle"; "required": false; }; "chipType": { "alias": "chipType"; "required": false; }; "showChipIcon": { "alias": "showChipIcon"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "showText": { "alias": "showText"; "required": false; }; "hideText": { "alias": "hideText"; "required": false; }; }, { "changed": "changed"; }, never, ["*"], true, never>;
    static ngAcceptInputType_showChipIcon: unknown;
    static ngAcceptInputType_disabled: unknown;
}

export { QSpoilerComponent };
export type { QSpoilerChangeEvent };
