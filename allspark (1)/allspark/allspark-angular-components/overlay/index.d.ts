import { CdkOverlayOrigin, ConnectionPositionPair, OverlaySizeConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type QOverlayPositionStrategy = 'connected' | 'global';

type QOverlayPositionX = 'start' | 'center' | 'end' | 'left' | 'right';

type QOverlayPositionY = 'above' | 'below';

type QOverlayPriorityPosition = 'horizontal' | 'vertical' | null;

type QOverlayScrollStrategy = 'noop' | 'reposition' | 'close' | 'block';

declare class QOverlayComponent {
    readonly opened: EventEmitter<void>;
    readonly closed: EventEmitter<KeyboardEvent | MouseEvent | undefined>;
    readonly overlayOriginChange: EventEmitter<CdkOverlayOrigin>;
    top: string;
    bottom: string;
    left: string;
    right: string;
    offsetY: number;
    offsetX: number;
    width: number | string;
    minWidth: number | string;
    maxWidth: number | string;
    height: number | string;
    minHeight: number | string;
    maxHeight: number | string;
    yPosition: QOverlayPositionY;
    xPosition: QOverlayPositionX;
    positions: ConnectionPositionPair[];
    overlayOrigin: CdkOverlayOrigin | null;
    panelClass: string | string[];
    backdropClass: string;
    scrollStrategy: QOverlayScrollStrategy;
    closeAnimationDone: BehaviorSubject<boolean>;
    priorityPositions: QOverlayPriorityPosition;
    closeOnBackdropClick: boolean;
    flexibleDimensions: boolean;
    disableClose: boolean;
    hasBackdrop: boolean;
    closeOnEsc: boolean;
    _overlayContentTemplate: TemplateRef<HTMLTemplateElement>;
    _overlayTemplatePortal: CdkPortal;
    private _isOpened$;
    isOpened$: Observable<boolean>;
    private _overlayRef;
    private readonly _overlay;
    private readonly _destroy$;
    private readonly _scrollStrategies;
    private readonly _overlayContainer;
    private readonly _document;
    open(): void;
    close(event?: KeyboardEvent | MouseEvent): void;
    detachBackdrop(): void;
    toggle(): void;
    updateSize(sizeConfig: OverlaySizeConfig): void;
    updateScrollStrategy(strategy: QOverlayScrollStrategy): void;
    updatePositionStrategy(strategy: QOverlayPositionStrategy): void;
    get isOpened(): boolean;
    private _createAndOpenOverlay;
    private _relocateOverlayContainer;
    private _getGlobalPositionStrategy;
    private _getFlexibleConnectedPositionStrategy;
    private _getDefaultPositions;
    private _getCloseStream;
    get closeStream(): Observable<undefined | KeyboardEvent | MouseEvent> | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<QOverlayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QOverlayComponent, "q-overlay", never, { "top": { "alias": "top"; "required": false; }; "bottom": { "alias": "bottom"; "required": false; }; "left": { "alias": "left"; "required": false; }; "right": { "alias": "right"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "width": { "alias": "width"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "maxWidth": { "alias": "maxWidth"; "required": false; }; "height": { "alias": "height"; "required": false; }; "minHeight": { "alias": "minHeight"; "required": false; }; "maxHeight": { "alias": "maxHeight"; "required": false; }; "yPosition": { "alias": "yPosition"; "required": false; }; "xPosition": { "alias": "xPosition"; "required": false; }; "positions": { "alias": "positions"; "required": false; }; "overlayOrigin": { "alias": "overlayOrigin"; "required": false; }; "panelClass": { "alias": "panelClass"; "required": false; }; "backdropClass": { "alias": "backdropClass"; "required": false; }; "scrollStrategy": { "alias": "scrollStrategy"; "required": false; }; "closeAnimationDone": { "alias": "closeAnimationDone"; "required": false; }; "priorityPositions": { "alias": "priorityPositions"; "required": false; }; "closeOnBackdropClick": { "alias": "closeOnBackdropClick"; "required": false; }; "flexibleDimensions": { "alias": "flexibleDimensions"; "required": false; }; "disableClose": { "alias": "disableClose"; "required": false; }; "hasBackdrop": { "alias": "hasBackdrop"; "required": false; }; "closeOnEsc": { "alias": "closeOnEsc"; "required": false; }; }, { "opened": "opened"; "closed": "closed"; "overlayOriginChange": "overlayOriginChange"; }, ["_overlayContentTemplate"], ["*"], true, never>;
    static ngAcceptInputType_closeOnBackdropClick: unknown;
    static ngAcceptInputType_flexibleDimensions: unknown;
    static ngAcceptInputType_disableClose: unknown;
    static ngAcceptInputType_hasBackdrop: unknown;
    static ngAcceptInputType_closeOnEsc: unknown;
}

export { QOverlayComponent };
export type { QOverlayPositionX, QOverlayPositionY, QOverlayPriorityPosition, QOverlayScrollStrategy };
