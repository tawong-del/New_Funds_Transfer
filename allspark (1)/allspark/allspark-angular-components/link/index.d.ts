import * as i0 from '@angular/core';

type QLinkSize = '12' | '14' | '16' | '18' | 'auto';

type QLinkVariant = 'primary' | 'secondary' | 'body-primary' | 'body-secondary';

declare class QLinkDirective {
    variant: QLinkVariant;
    size: QLinkSize;
    underlined: boolean;
    disabled: boolean;
    tabindex: number | null;
    analyticsCssClassIdentifier: boolean;
    dataQt: string;
    get _hostTabindex(): number | null;
    get _hostClass(): string;
    _onClick(event: MouseEvent): void;
    private readonly _elementRef;
    private readonly _window;
    private readonly _analytics;
    private _sendAnalyticsEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<QLinkDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QLinkDirective, "a[qLink], a[q-link]", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "underlined": { "alias": "underlined"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "analyticsCssClassIdentifier": { "alias": "analyticsCssClassIdentifier"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_underlined: unknown;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_tabindex: unknown;
    static ngAcceptInputType_analyticsCssClassIdentifier: unknown;
}

type QLinkClickAnalyticsEvent = {
    event: 'link_click_navigation' | 'link_click_outbound_to_questrade' | 'link_click_outbound';
    link_text: string;
    link_url: string;
    link_classes: string;
    outbound?: true;
};

export { QLinkDirective };
export type { QLinkClickAnalyticsEvent, QLinkSize, QLinkVariant };
