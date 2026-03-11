import * as i0 from '@angular/core';
import { ElementRef, OnInit, AfterViewInit, DoCheck, OnDestroy, EventEmitter, TemplateRef } from '@angular/core';
import * as i1 from '@questrade/allspark-angular-components/core/directives';
import { ControlValueAccessor } from '@angular/forms';
import { ErrorState } from '@questrade/allspark-angular-components/core/utils';
import { ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { QExpansionTriggerComponent } from '@questrade/allspark-angular-components/core/components';

type QCheckboxLabelColor = 'grey-primary' | 'grey-secondary' | 'grey-disabled' | 'green' | 'blue' | 'red' | 'yellow' | 'orange' | 'purple';

type QCheckboxLabelTypography = 'display-xl' | 'display-l' | 'display-m' | 'display-s' | 'display-xs' | 'subtitle' | 'overline' | 'cta-1' | 'cta-2' | 'body-l' | 'body-m' | 'body-s' | 'note';

declare class QCheckboxLabelComponent {
    labelTypography: QCheckboxLabelTypography;
    labelColor: QCheckboxLabelColor;
    dataQt: string;
    get hostClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QCheckboxLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QCheckboxLabelComponent, "q-checkbox-label", never, { "labelTypography": { "alias": "labelTypography"; "required": false; }; "labelColor": { "alias": "labelColor"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, [{ directive: typeof i1.QLineClampDirective; inputs: { "lineClamp": "lineClamp"; }; outputs: {}; }]>;
}

declare class QCheckboxExpandableComponent extends CdkAccordionItem {
    containerRef: ElementRef;
    dataQt: string;
    _expansionTrigger: QExpansionTriggerComponent;
    _hostClassName: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QCheckboxExpandableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QCheckboxExpandableComponent, "q-checkbox-expandable", never, { "containerRef": { "alias": "containerRef"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, ["*"], true, never>;
}

interface QCheckboxChange {
    checked: boolean;
    source: QCheckboxComponent;
    target: ElementRef<HTMLElement>;
}

type QCheckboxContainerDensity = 'compact' | 'default' | 'comfort';

type QCheckboxExtraContentDensity = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

type QCheckboxExtraContentPosition = 'below' | 'right';

type QCheckboxLabelGap = 'xxs' | 'xs' | 's';

type QCheckboxVariant = 'default' | 'container' | 'expandable';

declare class QCheckboxComponent extends ErrorState implements OnInit, AfterViewInit, DoCheck, OnDestroy, ControlValueAccessor {
    readonly checkboxChange: EventEmitter<QCheckboxChange>;
    readonly indeterminateChange: EventEmitter<boolean>;
    readonly expandedChange: EventEmitter<boolean>;
    ariaLabel: string | null;
    ariaLabelledby: string | null;
    ariaDescribedby: string | null;
    containerDensity: QCheckboxContainerDensity;
    extraContent: TemplateRef<unknown> | null;
    extraContentContext: unknown | null;
    extraContentDensity: QCheckboxExtraContentDensity;
    extraContentPosition: QCheckboxExtraContentPosition;
    id: string;
    labelGap: QCheckboxLabelGap;
    name: string | null;
    variant: QCheckboxVariant;
    errorStateMatcher: ErrorStateMatcherInterface;
    required: boolean;
    tabIndex: number;
    extraContentRightWidth: string;
    invalidState: boolean;
    expanded: boolean;
    readonly: boolean;
    dataQt: string;
    get checked(): boolean;
    set checked(value: boolean);
    get indeterminate(): boolean;
    set indeterminate(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    _inputElement: ElementRef<HTMLInputElement>;
    _checkboxExpandable: QCheckboxExpandableComponent;
    _hostTabIndex: string | null;
    _hostAriaLabel: string | null;
    _hostAriaLabelledBy: string | null;
    _hostAriaDescribedBy: string | null;
    _hostId: string;
    get hostClassNames(): string;
    _controlValueAccessorChangeFn: (value: unknown) => void;
    _onTouched: () => unknown;
    private _currentAnimationClass;
    private _currentCheckState;
    private _disabled;
    private _checked;
    private _indeterminate;
    private readonly _injector;
    private readonly _cdr;
    private readonly _ngZone;
    private readonly _focusMonitor;
    private readonly _destroy$;
    readonly _elementRef: ElementRef<any>;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _onLabelInteraction(): void;
    _onExpandedChange(expanded: boolean): void;
    _onCheckboxContainerChange(event: Event): void;
    _onTouchTargetClick(event: Event): void;
    _onChangeEvent(event: Event): void;
    _onInputInteraction(event: Event): void;
    _onBlur(): void;
    /** @hidden */
    writeValue(value: unknown): void;
    /** @hidden */
    registerOnChange(fn: (value: unknown) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => unknown): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    get canRenderExtraContentBelow(): boolean;
    get canRenderExtraContentRight(): boolean;
    private _handleIndeterminateChanged;
    private _transitionCheckState;
    private _getAnimationClassForCheckStateTransition;
    private _emitChangeEvent;
    private _syncIndeterminate;
    private _setComponentControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<QCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QCheckboxComponent, "q-checkbox", never, { "ariaLabel": { "alias": "aria-label"; "required": false; }; "ariaLabelledby": { "alias": "aria-labelledby"; "required": false; }; "ariaDescribedby": { "alias": "aria-describedby"; "required": false; }; "containerDensity": { "alias": "containerDensity"; "required": false; }; "extraContent": { "alias": "extraContent"; "required": false; }; "extraContentContext": { "alias": "extraContentContext"; "required": false; }; "extraContentDensity": { "alias": "extraContentDensity"; "required": false; }; "extraContentPosition": { "alias": "extraContentPosition"; "required": false; }; "id": { "alias": "id"; "required": false; }; "labelGap": { "alias": "labelGap"; "required": false; }; "name": { "alias": "name"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "required": { "alias": "required"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "extraContentRightWidth": { "alias": "extraContentRightWidth"; "required": false; }; "invalidState": { "alias": "invalidState"; "required": false; }; "expanded": { "alias": "expanded"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "checkboxChange": "checkboxChange"; "indeterminateChange": "indeterminateChange"; "expandedChange": "expandedChange"; }, never, ["*", "q-badge", "q-link"], true, never>;
    static ngAcceptInputType_required: unknown;
    static ngAcceptInputType_tabIndex: unknown;
    static ngAcceptInputType_extraContentRightWidth: any;
    static ngAcceptInputType_invalidState: unknown;
    static ngAcceptInputType_expanded: unknown;
    static ngAcceptInputType_readonly: unknown;
    static ngAcceptInputType_checked: unknown;
    static ngAcceptInputType_indeterminate: unknown;
    static ngAcceptInputType_disabled: unknown;
}

declare const Q_CHECKBOX_COMPONENTS: readonly [typeof QCheckboxComponent, typeof QCheckboxLabelComponent];

export { QCheckboxComponent, QCheckboxLabelComponent, Q_CHECKBOX_COMPONENTS };
export type { QCheckboxChange, QCheckboxContainerDensity, QCheckboxExtraContentPosition, QCheckboxLabelColor, QCheckboxLabelGap, QCheckboxLabelTypography, QCheckboxVariant };
