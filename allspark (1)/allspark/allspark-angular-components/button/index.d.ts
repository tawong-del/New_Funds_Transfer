import { QIconSize } from '@questrade/allspark-angular-components/icon';
import { QSpinnerSize } from '@questrade/allspark-angular-components/spinner';
import * as i0 from '@angular/core';

type QButtonIconPosition = 'left' | 'right';

type QButtonSize = 'small' | 'medium';

type QButtonVariant = 'primary' | 'secondary' | 'danger';

declare class QButtonComponent {
    icon: string;
    loadingText: string;
    size: QButtonSize;
    variant: QButtonVariant;
    iconPosition: QButtonIconPosition;
    loading: boolean;
    analyticsCssClassIdentifier: boolean;
    dataQt: string;
    get disabled(): boolean | null;
    set disabled(value: boolean | null);
    get tabindexAttr(): number | null;
    get ariaDisabledAttr(): boolean;
    get classNames(): string;
    _onKeyDown({ code }: KeyboardEvent): void;
    _onKeyUp({ code }: KeyboardEvent): void;
    _onClick(): void;
    private _active;
    private _disabled;
    private readonly _platform;
    private readonly _elementRef;
    private readonly _analytics;
    _isTextButton(): boolean;
    _isIconButton(): boolean;
    _isSecondary(): boolean;
    get spinnerSize(): QSpinnerSize;
    get iconSize(): QIconSize;
    private _sendAnalyticsEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<QButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QButtonComponent, "    button[q-button],    button[q-text-button],    button[q-icon-button],  ", never, { "icon": { "alias": "icon"; "required": false; }; "loadingText": { "alias": "loadingText"; "required": false; }; "size": { "alias": "size"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "iconPosition": { "alias": "iconPosition"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "analyticsCssClassIdentifier": { "alias": "analyticsCssClassIdentifier"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_loading: unknown;
    static ngAcceptInputType_analyticsCssClassIdentifier: unknown;
    static ngAcceptInputType_disabled: unknown;
}

type QButtonClickAnalyticsEvent = {
    event: 'button_click';
    link_text: string;
    link_classes: string;
    button_name: string;
};

export { QButtonComponent };
export type { QButtonClickAnalyticsEvent, QButtonIconPosition, QButtonSize, QButtonVariant };
