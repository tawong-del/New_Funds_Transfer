import * as i0 from '@angular/core';
import { OnInit, OnDestroy, EventEmitter, TemplateRef } from '@angular/core';

declare class QAccordionPanelComponent implements OnInit, OnDestroy {
    readonly activeChange: EventEmitter<boolean>;
    title: string;
    subTitle: string;
    active: boolean;
    disabled: boolean;
    showIcon: boolean;
    headerAdditionalContentTemplate: TemplateRef<unknown> | null;
    headerAdditionalContentContext: unknown | null;
    dataQt: string;
    get hostClasses(): string;
    private readonly _cdr;
    private readonly _iconRegistry;
    private readonly _accordionComponent;
    ngOnInit(): void;
    ngOnDestroy(): void;
    _onHeaderClick(): void;
    _markForCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QAccordionPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QAccordionPanelComponent, "q-accordion-panel", never, { "title": { "alias": "title"; "required": false; }; "subTitle": { "alias": "subTitle"; "required": false; }; "active": { "alias": "active"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "showIcon": { "alias": "showIcon"; "required": false; }; "headerAdditionalContentTemplate": { "alias": "headerAdditionalContentTemplate"; "required": false; }; "headerAdditionalContentContext": { "alias": "headerAdditionalContentContext"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "activeChange": "activeChange"; }, never, ["q-badge[top]", "[q-accordion-title]", "q-badge[left], q-badge[right]", "*"], true, never>;
    static ngAcceptInputType_active: unknown;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_showIcon: unknown;
}

type QAccordionHeaderSize = 'small' | 'medium' | 'large';

type QAccordionIconPosition = 'left' | 'right';

type QAccordionVariant = 'primary' | 'secondary';

declare class QAccordionComponent {
    singleOpen: boolean;
    inset: boolean;
    /**
     * @deprecated There's no replacement for this input. If you need the trigger icon to be on the left
     * side, please contact the Allspark design system team.
     * @breaking-change First major after Jul 12, 2026
     */
    iconPosition: QAccordionIconPosition;
    headerSize: QAccordionHeaderSize;
    variant: QAccordionVariant;
    dataQt: string;
    get hostClasses(): string;
    private _accordionPanels;
    _addPanel(collapsePanel: QAccordionPanelComponent): void;
    _removePanel(collapsePanel: QAccordionPanelComponent): void;
    _click(clickedPanel: QAccordionPanelComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QAccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QAccordionComponent, "q-accordion", never, { "singleOpen": { "alias": "singleOpen"; "required": false; }; "inset": { "alias": "inset"; "required": false; }; "iconPosition": { "alias": "iconPosition"; "required": false; }; "headerSize": { "alias": "headerSize"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
    static ngAcceptInputType_singleOpen: unknown;
    static ngAcceptInputType_inset: unknown;
}

declare const Q_ACCORDION_COMPONENTS: readonly [typeof QAccordionComponent, typeof QAccordionPanelComponent];

export { QAccordionComponent, QAccordionPanelComponent, Q_ACCORDION_COMPONENTS };
export type { QAccordionHeaderSize, QAccordionIconPosition, QAccordionVariant };
