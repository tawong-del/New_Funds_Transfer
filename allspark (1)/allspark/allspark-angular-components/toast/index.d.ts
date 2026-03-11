import { OverlayRef, ComponentType } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { ViewContainerRef, OnDestroy, ElementRef, ComponentRef, EmbeddedViewRef, EventEmitter, InjectionToken } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal, DomPortal } from '@angular/cdk/portal';
import { QButtonVariant } from '@questrade/allspark-angular-components/button';

type QToastButtonVariant = 'primary' | 'secondary' | 'danger' | 'primary text' | 'secondary text';

type QToastButtonsPosition = 'side' | 'bottom';

interface QToastConfigData {
    message: string;
    action: string;
    actionAdditional: string;
    dismissIcon: boolean;
    icon: string;
    buttonType: QToastButtonVariant;
    buttonAdditionalType: QToastButtonVariant;
    buttonsPosition: QToastButtonsPosition;
}

type QToastHorizontalPosition = 'left' | 'center' | 'right';

type QToastSize = 'standard' | 'large';

type QToastVariant = 'primary' | 'secondary' | 'error' | 'warning' | 'caution' | 'promo' | 'status';

type QToastVerticalPosition = 'top' | 'bottom';

declare class QToastConfig {
    icon: string;
    viewContainerRef: ViewContainerRef | null;
    autoDismiss: boolean;
    type: QToastVariant;
    data: QToastConfigData | null;
    size: QToastSize;
    horizontalPosition: QToastHorizontalPosition;
    verticalPosition: QToastVerticalPosition;
    buttonsPosition: QToastButtonsPosition;
    buttonType: QToastButtonVariant;
    buttonAdditionalType: QToastButtonVariant;
    dismissIcon: boolean;
    sourceDialogElement: HTMLDialogElement | null;
    sourcePopoverElement: HTMLElement | null;
}

declare class QToastComponent extends BasePortalOutlet implements OnDestroy {
    dataQt: string;
    _portalOutlet: CdkPortalOutlet;
    _animationState: string;
    toastConfig: QToastConfig;
    readonly _onExit: Subject<void>;
    readonly _onEnter: Subject<void>;
    protected _elementRef: ElementRef<HTMLElement>;
    private _destroyed;
    private readonly _changeDetectorRef;
    private readonly _ngZone;
    constructor();
    ngOnDestroy(): void;
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    attachDomPortal: (portal: DomPortal) => void;
    onAnimationEnd(event: AnimationEvent): void;
    enter(): void;
    exit(): Observable<void>;
    protected _afterPortalAttached(): void;
    get hasLeftIcon(): boolean;
    get hasRightActions(): boolean;
    private _completeExit;
    private _assertNotAttached;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QToastComponent, "q-toast", never, { "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, never, true, never>;
}

interface QToastDismiss {
    dismissedByAction: boolean;
}

declare class QToastRef<T> {
    containerInstance: QToastComponent;
    private _overlayRef;
    instance: T;
    private readonly _afterDismissed;
    private readonly _afterOpened;
    private readonly _onAction;
    private _durationTimeoutId;
    private _dismissedByAction;
    constructor(containerInstance: QToastComponent, _overlayRef: OverlayRef);
    dismiss(): void;
    dismissWithAction(): void;
    closeWithAction(): void;
    _dismissAfter(duration: number): void;
    _open(): void;
    afterDismissed(): Observable<QToastDismiss>;
    afterOpened(): Observable<void>;
    onAction(): Observable<void>;
    private _finishDismiss;
}

interface QTextOnlyToast {
    actionClicked: EventEmitter<void>;
    additionalActionClicked: EventEmitter<void>;
    closeIconClicked: EventEmitter<void>;
    data: {
        message: string;
        action: string;
        dismissIcon: boolean;
        icon: string;
    };
    toastRef: QToastRef<QTextOnlyToast>;
    hasAction: boolean;
}

declare function Q_TOAST_DEFAULT_OPTIONS_FACTORY(): QToastConfig;
declare const Q_TOAST_DEFAULT_OPTIONS: InjectionToken<QToastConfig>;
declare class QToast implements OnDestroy {
    private _toastRefAtThisLevel;
    private _toastSimpleComponent;
    private _toastContainerComponent;
    private _dismissTimeout;
    private readonly _destroy$;
    private readonly _overlayContainer;
    private readonly _sharedMutationObserverService;
    private readonly _document;
    private readonly _overlay;
    private readonly _injector;
    private readonly _parentToast;
    private readonly _defaultConfig;
    get _openedToastRef(): QToastRef<QTextOnlyToast | EmbeddedViewRef<QTextOnlyToast>> | null;
    set _openedToastRef(value: QToastRef<QTextOnlyToast | EmbeddedViewRef<QTextOnlyToast>> | null);
    ngOnDestroy(): void;
    openFromComponent(component: ComponentType<QTextOnlyToast>, config?: QToastConfig): QToastRef<QTextOnlyToast | EmbeddedViewRef<QTextOnlyToast>>;
    open(message: string, action?: string, actionAdditional?: string, config?: QToastConfig): QToastRef<QTextOnlyToast | EmbeddedViewRef<QTextOnlyToast>>;
    dismiss(): void;
    private _attachToastContainer;
    private _attach;
    private _animateToast;
    private _createOverlay;
    private _createInjector;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToast, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QToast>;
}

declare class QToastActionDirective {
    hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToastActionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QToastActionDirective, "[qToastAction]", never, {}, {}, never, never, true, never>;
}

declare class QToastActionsDirective {
    hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToastActionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QToastActionsDirective, "[qToastActions]", never, {}, {}, never, never, true, never>;
}

declare class QToastLabelDirective {
    hostClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToastLabelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QToastLabelDirective, "[qToastLabel]", never, {}, {}, never, never, true, never>;
}

declare class QToastSimpleComponent implements QTextOnlyToast {
    readonly actionClicked: EventEmitter<void>;
    readonly additionalActionClicked: EventEmitter<void>;
    readonly closeIconClicked: EventEmitter<void>;
    hostClass: string;
    iconName: string;
    actionsPosition: QToastButtonsPosition;
    data: QToastConfigData;
    toastRef: QToastRef<QToastSimpleComponent>;
    private readonly _iconRegistry;
    constructor();
    dismiss(): void;
    actionClick(): void;
    additionalActionClick(): void;
    closeIconClick(): void;
    get hasAction(): boolean;
    get hasActionAdditional(): boolean;
    get isDismissible(): boolean;
    get isTextButtonType(): boolean;
    get isTextButtonAdditionalType(): boolean;
    get buttonVariant(): QButtonVariant;
    get buttonAdditionalVariant(): QButtonVariant;
    static ɵfac: i0.ɵɵFactoryDeclaration<QToastSimpleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QToastSimpleComponent, "q-toast-simple", never, {}, { "actionClicked": "actionClicked"; "additionalActionClicked": "additionalActionClicked"; "closeIconClicked": "closeIconClicked"; }, never, never, true, never>;
}

declare class QToastModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<QToastModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<QToastModule, never, [typeof QToastComponent, typeof QToastLabelDirective, typeof QToastActionsDirective, typeof QToastActionDirective], [typeof QToastComponent, typeof QToastLabelDirective, typeof QToastActionsDirective, typeof QToastActionDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<QToastModule>;
}

declare const Q_TOAST_DATA: InjectionToken<QToastConfigData>;

export { QToast, QToastActionDirective, QToastActionsDirective, QToastComponent, QToastConfig, QToastLabelDirective, QToastModule, QToastRef, QToastSimpleComponent, Q_TOAST_DATA, Q_TOAST_DEFAULT_OPTIONS, Q_TOAST_DEFAULT_OPTIONS_FACTORY };
export type { QTextOnlyToast, QToastButtonVariant, QToastButtonsPosition, QToastConfigData, QToastDismiss, QToastHorizontalPosition, QToastSize, QToastVariant, QToastVerticalPosition };
