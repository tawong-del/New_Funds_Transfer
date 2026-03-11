import * as i0 from '@angular/core';
import { AfterViewInit, OnDestroy, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { QButtonVariant, QButtonIconPosition, QButtonComponent } from '@questrade/allspark-angular-components/button';
import { Observable } from 'rxjs';

type QModalSize = 'medium' | 'large' | 'xlarge';

declare class QModalComponent implements AfterViewInit, OnDestroy {
    readonly primaryButtonClicked: EventEmitter<Event>;
    readonly secondaryButtonClicked: EventEmitter<Event>;
    readonly linkClicked: EventEmitter<Event>;
    readonly overlayClicked: EventEmitter<Event>;
    readonly escClicked: EventEmitter<Event>;
    title: string;
    size: QModalSize;
    primaryButtonType: QButtonVariant;
    primaryButtonText: string;
    primaryButtonIcon: string;
    primaryButtonIconPosition: QButtonIconPosition;
    secondaryButtonType: QButtonVariant;
    secondaryButtonText: string;
    secondaryButtonIcon: string;
    secondaryButtonIconPosition: QButtonIconPosition;
    linkText: string;
    linkUrl: string;
    showSecondaryButton: boolean;
    showLink: boolean;
    stackedActionsOnMobile: boolean;
    disablePrimaryButton: boolean;
    disableSecondaryButton: boolean;
    disableLink: boolean;
    showHeader: boolean;
    showFooter: boolean;
    tabIndex: number;
    dataQt: string;
    _modalHeaderTemplate: TemplateRef<HTMLElement>;
    _modalContentTemplate: TemplateRef<HTMLElement>;
    _modalFooterTemplate: TemplateRef<HTMLElement>;
    _secondaryButton: QButtonComponent;
    _contentRef: ElementRef<HTMLElement>;
    _modalToggleState: unknown;
    _onWindowResize(): void;
    _onKeydownHandler(event: Event): void;
    _currentContentTemplate: TemplateRef<HTMLElement> | null;
    _boxShadow$: Observable<string> | null;
    _containerScrollHeight: number;
    readonly _rootClass = "q-modal";
    private _boxShadowClass;
    private readonly _contentTemplateHistory;
    private readonly _boxShadowSubject$;
    private readonly _cdr;
    private readonly _iconRegistry;
    private readonly _breakpointObserver;
    private readonly _destroy$;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    showTemplate(template: TemplateRef<HTMLElement>): void;
    /** @hidden */
    previousContent(): void;
    /** @hidden */
    onSecondaryButtonClick(event: Event): void;
    /** @hidden */
    onPrimaryButtonClick(event: Event): void;
    /** @hidden */
    onLinkClicked(event: Event): void;
    /** @hidden */
    onOverlayClicked(event: Event): void;
    _calculateAnimationState(): void;
    /** @hidden */
    onContainerScroll(event: Event): void;
    get isAlternativeContent(): boolean;
    private _observeBreakpoints;
    private isMobileScreen;
    private _updateCurrentContentTemplate;
    static ɵfac: i0.ɵɵFactoryDeclaration<QModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QModalComponent, "q-modal", never, { "title": { "alias": "title"; "required": false; }; "size": { "alias": "size"; "required": false; }; "primaryButtonType": { "alias": "primaryButtonType"; "required": false; }; "primaryButtonText": { "alias": "primaryButtonText"; "required": false; }; "primaryButtonIcon": { "alias": "primaryButtonIcon"; "required": false; }; "primaryButtonIconPosition": { "alias": "primaryButtonIconPosition"; "required": false; }; "secondaryButtonType": { "alias": "secondaryButtonType"; "required": false; }; "secondaryButtonText": { "alias": "secondaryButtonText"; "required": false; }; "secondaryButtonIcon": { "alias": "secondaryButtonIcon"; "required": false; }; "secondaryButtonIconPosition": { "alias": "secondaryButtonIconPosition"; "required": false; }; "linkText": { "alias": "linkText"; "required": false; }; "linkUrl": { "alias": "linkUrl"; "required": false; }; "showSecondaryButton": { "alias": "showSecondaryButton"; "required": false; }; "showLink": { "alias": "showLink"; "required": false; }; "stackedActionsOnMobile": { "alias": "stackedActionsOnMobile"; "required": false; }; "disablePrimaryButton": { "alias": "disablePrimaryButton"; "required": false; }; "disableSecondaryButton": { "alias": "disableSecondaryButton"; "required": false; }; "disableLink": { "alias": "disableLink"; "required": false; }; "showHeader": { "alias": "showHeader"; "required": false; }; "showFooter": { "alias": "showFooter"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "primaryButtonClicked": "primaryButtonClicked"; "secondaryButtonClicked": "secondaryButtonClicked"; "linkClicked": "linkClicked"; "overlayClicked": "overlayClicked"; "escClicked": "escClicked"; }, ["_modalHeaderTemplate", "_modalContentTemplate", "_modalFooterTemplate"], ["*"], true, never>;
    static ngAcceptInputType_showSecondaryButton: unknown;
    static ngAcceptInputType_showLink: unknown;
    static ngAcceptInputType_stackedActionsOnMobile: unknown;
    static ngAcceptInputType_disablePrimaryButton: unknown;
    static ngAcceptInputType_disableSecondaryButton: unknown;
    static ngAcceptInputType_disableLink: unknown;
    static ngAcceptInputType_showHeader: unknown;
    static ngAcceptInputType_showFooter: unknown;
    static ngAcceptInputType_tabIndex: unknown;
}

export { QModalComponent };
export type { QModalSize };
