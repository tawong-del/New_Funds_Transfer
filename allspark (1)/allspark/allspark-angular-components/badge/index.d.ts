import * as i0 from '@angular/core';

type QBadgeContext = 'danger' | 'success' | 'caution' | 'warning' | 'auxiliary' | 'highlight' | 'accent';

type QBadgePlacement = 'corner' | 'corner-inside';

type QBadgePosition = 'above after' | 'above before' | 'below after' | 'below before';

type QBadgeVariant = 'primary' | 'secondary' | 'dot';

declare class QBadgeComponent {
    iconName: string;
    text: string;
    variant: QBadgeVariant;
    position: QBadgePosition;
    placement: QBadgePlacement;
    context: QBadgeContext;
    hide: boolean;
    dataQt: string;
    get _hostClasses(): string;
    get verticalPosition(): string;
    get horizontalPosition(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QBadgeComponent, "q-badge", never, { "iconName": { "alias": "iconName"; "required": false; }; "text": { "alias": "text"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "position": { "alias": "position"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "context": { "alias": "context"; "required": false; }; "hide": { "alias": "hide"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_hide: unknown;
}

export { QBadgeComponent };
export type { QBadgeContext, QBadgePlacement, QBadgePosition, QBadgeVariant };
