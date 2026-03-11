import { NumberInput, BooleanInput } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';

declare class QExpansionTriggerComponent {
    readonly activeChange: EventEmitter<boolean>;
    active: boolean;
    get tabIndex(): number;
    set tabIndex(value: NumberInput);
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    _role: string;
    get _hostClasses(): string;
    _onClick: () => void;
    _onKeydown: (event: KeyboardEvent) => void;
    private _disabled;
    private _tabIndex;
    private _iconRegistry;
    constructor();
    onTriggerInteraction(): void;
    toggle(): void;
    onKeydown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QExpansionTriggerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QExpansionTriggerComponent, "q-expansion-trigger", never, { "active": { "alias": "active"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "activeChange": "activeChange"; }, never, never, true, never>;
    static ngAcceptInputType_active: unknown;
}

export { QExpansionTriggerComponent };
