import { CdkOverlayOrigin, ConnectionPositionPair, ConnectedPosition } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { QOverlayComponent } from '@questrade/allspark-angular-components/overlay';

interface QPromotionalMessagePanel {
    open: () => void;
    close: () => void;
    isOpened: boolean;
    openedBy: CdkOverlayOrigin;
    positions: ConnectionPositionPair[];
    readonly closed: EventEmitter<void>;
}

declare class QPromotionalMessageTriggerDirective {
    get message(): QPromotionalMessagePanel;
    set message(message: QPromotionalMessagePanel);
    hostClass: string;
    private _message;
    private readonly _elementRef;
    private readonly _destroy$;
    private _overlayOrigin;
    constructor();
    private _closeMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<QPromotionalMessageTriggerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QPromotionalMessageTriggerDirective, "[qPromotionalMessageTrigger]", never, { "message": { "alias": "qPromotionalMessageTrigger"; "required": false; }; }, {}, never, never, true, never>;
}

type QPromotionalMessagePosition = 'top' | 'bottom' | 'left' | 'right';

declare class QPromotionalMessageComponent implements QPromotionalMessagePanel, OnInit, AfterViewInit {
    readonly closed: EventEmitter<void>;
    title: string;
    message: string;
    icon: string;
    position: QPromotionalMessagePosition;
    primaryButtonText: string;
    secondaryButtonText: string;
    hasSecondaryButton: boolean;
    openMessageOnInit: boolean;
    dataQt: string;
    _overlay: QOverlayComponent;
    hostClass: string;
    openedBy: CdkOverlayOrigin;
    positions: ConnectedPosition[];
    private _positionsMap;
    private readonly _destroy$;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    open(): void;
    close(): void;
    _getPositions(): ConnectedPosition[];
    get isOpened(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<QPromotionalMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QPromotionalMessageComponent, "q-promotional-message", never, { "title": { "alias": "title"; "required": false; }; "message": { "alias": "message"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "position": { "alias": "position"; "required": false; }; "primaryButtonText": { "alias": "primaryButtonText"; "required": false; }; "secondaryButtonText": { "alias": "secondaryButtonText"; "required": false; }; "hasSecondaryButton": { "alias": "hasSecondaryButton"; "required": false; }; "openMessageOnInit": { "alias": "openMessageOnInit"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, { "closed": "closed"; }, never, ["*"], true, never>;
    static ngAcceptInputType_hasSecondaryButton: unknown;
    static ngAcceptInputType_openMessageOnInit: unknown;
}

declare const Q_PROMOTIONAL_MESSAGE_COMPONENTS: readonly [typeof QPromotionalMessageComponent, typeof QPromotionalMessageTriggerDirective];

export { QPromotionalMessageComponent, QPromotionalMessageTriggerDirective, Q_PROMOTIONAL_MESSAGE_COMPONENTS };
export type { QPromotionalMessagePanel, QPromotionalMessagePosition };
