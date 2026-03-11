import * as i0 from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';
import { QIconSize } from '@questrade/allspark-angular-components/icon';
import { QTooltipPosition } from '@questrade/allspark-angular-components/tooltip';

type QInteractiveIconColor = 'grey' | 'green' | 'red' | 'blue';

type QInteractiveIconContext = 'informative' | 'success' | 'warning' | 'caution' | 'danger' | 'accent' | 'info';

type QInteractiveIconSize = 'small' | 'medium';

type QLegacyInteractiveIconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

declare class QInteractiveIconComponent implements OnChanges {
    icon: string;
    context: QInteractiveIconContext;
    size: QInteractiveIconSize;
    tooltipValue: string;
    tooltipPosition: QTooltipPosition;
    disabled: boolean;
    tabindex: number;
    tooltipShowDelay: number;
    tooltipHideDelay: number;
    tooltipLongPressDelay: number;
    dataQt: string;
    /**
     * @deprecated Use `size` api instead, To be removed.
     * @breaking-change First major after Apr 29, 2026
     */
    iconSize?: QLegacyInteractiveIconSize;
    /**
     * @deprecated Use `context` api instead, To be removed.
     * @breaking-change First major after Apr 29, 2026
     */
    get color(): QInteractiveIconColor;
    set color(value: QInteractiveIconColor);
    _hostClassName: string;
    protected iconNumericSize: QIconSize;
    private _color;
    private readonly COLOR_CONTEXT_MAPPING;
    private readonly ICON_SIZE_MAPPING;
    private readonly LEGACY_ICON_SIZE_MAPPING;
    ngOnChanges({ iconSize, size }: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QInteractiveIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QInteractiveIconComponent, "q-interactive-icon", never, { "icon": { "alias": "icon"; "required": false; }; "context": { "alias": "context"; "required": false; }; "size": { "alias": "size"; "required": false; }; "tooltipValue": { "alias": "tooltipValue"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "tooltipShowDelay": { "alias": "tooltipShowDelay"; "required": false; }; "tooltipHideDelay": { "alias": "tooltipHideDelay"; "required": false; }; "tooltipLongPressDelay": { "alias": "tooltipLongPressDelay"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "iconSize": { "alias": "iconSize"; "required": false; }; "color": { "alias": "color"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_tabindex: unknown;
    static ngAcceptInputType_tooltipShowDelay: unknown;
    static ngAcceptInputType_tooltipHideDelay: unknown;
    static ngAcceptInputType_tooltipLongPressDelay: unknown;
}

export { QInteractiveIconComponent };
export type { QInteractiveIconColor, QInteractiveIconContext, QInteractiveIconSize, QLegacyInteractiveIconSize };
