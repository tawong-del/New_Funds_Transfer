import { Overlay, ScrollStrategyOptions, OverlayContainer, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import * as i1 from '@angular/cdk/portal';
import { PortalModule } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, inject, DOCUMENT, booleanAttribute, ViewChild, ContentChild, Input, Output, ChangeDetectionStrategy, Component } from '@angular/core';
import { QDestroyService } from '@questrade/allspark-angular-components/core/services';
import { ESCAPE } from '@questrade/allspark-angular-components/core/utils';
import { BehaviorSubject, merge } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';

var QOverlayPositions;
(function (QOverlayPositions) {
    QOverlayPositions["AboveStart"] = "above-start";
    QOverlayPositions["AboveEnd"] = "above-end";
    QOverlayPositions["AboveLeft"] = "above-left";
    QOverlayPositions["AboveRight"] = "above-right";
    QOverlayPositions["AboveCenter"] = "above-center";
    QOverlayPositions["BelowStart"] = "below-start";
    QOverlayPositions["BelowEnd"] = "below-end";
    QOverlayPositions["BelowLeft"] = "below-left";
    QOverlayPositions["BelowRight"] = "below-right";
    QOverlayPositions["BelowCenter"] = "below-center";
})(QOverlayPositions || (QOverlayPositions = {}));
const Q_OVERLAY_SUPPORTED_POSITIONS = {
    [QOverlayPositions.AboveStart]: {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: 0,
        offsetY: -1,
    },
    [QOverlayPositions.AboveEnd]: {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetX: 0,
        offsetY: -1,
    },
    [QOverlayPositions.AboveLeft]: {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
        offsetX: -1,
        offsetY: 0,
    },
    [QOverlayPositions.AboveRight]: {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: 1,
        offsetY: 0,
    },
    [QOverlayPositions.AboveCenter]: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetX: 0,
        offsetY: -1,
    },
    [QOverlayPositions.BelowStart]: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: 0,
        offsetY: 1,
    },
    [QOverlayPositions.BelowEnd]: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetX: 0,
        offsetY: 1,
    },
    [QOverlayPositions.BelowLeft]: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetX: -1,
        offsetY: 0,
    },
    [QOverlayPositions.BelowRight]: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: 1,
        offsetY: 0,
    },
    [QOverlayPositions.BelowCenter]: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetX: 0,
        offsetY: 1,
    },
};
const Q_HORIZONTAL_PRIORITY_POSITIONS = [
    QOverlayPositions.AboveRight,
    QOverlayPositions.AboveLeft,
    QOverlayPositions.BelowRight,
    QOverlayPositions.BelowLeft,
    QOverlayPositions.BelowStart,
    QOverlayPositions.AboveStart,
    QOverlayPositions.BelowEnd,
    QOverlayPositions.AboveEnd,
    QOverlayPositions.AboveCenter,
    QOverlayPositions.BelowCenter,
];
const Q_VERTICAL_PRIORITY_POSITIONS = [
    QOverlayPositions.BelowStart,
    QOverlayPositions.AboveStart,
    QOverlayPositions.BelowEnd,
    QOverlayPositions.AboveEnd,
    QOverlayPositions.BelowCenter,
    QOverlayPositions.AboveCenter,
    QOverlayPositions.BelowLeft,
    QOverlayPositions.BelowRight,
    QOverlayPositions.AboveLeft,
    QOverlayPositions.AboveRight,
];

class QOverlayComponent {
    opened = new EventEmitter();
    closed = new EventEmitter();
    overlayOriginChange = new EventEmitter();
    top = '';
    bottom = '';
    left = '';
    right = '';
    offsetY = 4;
    offsetX = 4;
    width = '';
    minWidth = '';
    maxWidth = '';
    height = '';
    minHeight = '';
    maxHeight = '';
    yPosition = 'below';
    xPosition = 'start';
    positions = [];
    overlayOrigin = null;
    panelClass = 'q-overlay-panel';
    backdropClass = 'cdk-overlay-transparent-backdrop';
    scrollStrategy = 'reposition';
    closeAnimationDone = new BehaviorSubject(false);
    priorityPositions = 'vertical';
    closeOnBackdropClick = true;
    flexibleDimensions = false;
    disableClose = false;
    hasBackdrop = true;
    closeOnEsc = true;
    _overlayContentTemplate;
    _overlayTemplatePortal;
    _isOpened$ = new BehaviorSubject(false);
    isOpened$ = this._isOpened$.asObservable();
    _overlayRef = null;
    _overlay = inject(Overlay);
    _destroy$ = inject(QDestroyService);
    _scrollStrategies = inject(ScrollStrategyOptions);
    _overlayContainer = inject(OverlayContainer);
    _document = inject(DOCUMENT);
    open() {
        this._createAndOpenOverlay();
        this._isOpened$.next(true);
        this.opened.emit();
    }
    close(event) {
        this._overlayRef?.detach();
        this._overlayRef?.dispose();
        this._isOpened$.next(false);
        this.closed.emit(event);
    }
    detachBackdrop() {
        this._overlayRef?.detachBackdrop();
    }
    toggle() {
        if (!this._isOpened$.getValue()) {
            this.open();
        }
        else {
            this.close();
        }
    }
    updateSize(sizeConfig) {
        if (!this._overlayRef)
            return;
        this._overlayRef.updateSize(sizeConfig);
    }
    updateScrollStrategy(strategy) {
        this._overlayRef?.updateScrollStrategy(this._scrollStrategies[strategy]());
    }
    updatePositionStrategy(strategy) {
        if (!this._overlayRef)
            return;
        if (strategy === 'connected' && this.overlayOrigin) {
            this._overlayRef.updatePositionStrategy(this._getFlexibleConnectedPositionStrategy(this.overlayOrigin));
        }
        else if (strategy === 'global') {
            this._overlayRef.updatePositionStrategy(this._getGlobalPositionStrategy());
        }
    }
    get isOpened() {
        return this._isOpened$.getValue();
    }
    _createAndOpenOverlay() {
        this._relocateOverlayContainer();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: this.hasBackdrop,
            backdropClass: this.backdropClass,
            panelClass: this.panelClass,
            width: `var(--awds-overlay-panel-width ${this.width ? ', ' + this.width + 'px' : ''})`,
            minWidth: `var(--awds-overlay-panel-min-width ${this.minWidth ? ', ' + this.minWidth + 'px' : ''})`,
            maxWidth: `var(--awds-overlay-panel-max-width ${this.maxWidth ? ', ' + this.maxWidth + 'px' : ''})`,
            height: `var(--awds-overlay-panel-height ${this.height ? ', ' + this.height + 'px' : ''})`,
            maxHeight: `var(--awds-overlay-panel-max-height ${this.maxHeight ? ', ' + this.maxHeight + 'px' : ''})`,
            minHeight: `var(--awds-overlay-panel-min-height ${this.minHeight ? ', ' + this.minHeight + 'px' : ''})`,
            scrollStrategy: this._scrollStrategies[this.scrollStrategy](),
            positionStrategy: this.overlayOrigin
                ? this._getFlexibleConnectedPositionStrategy(this.overlayOrigin)
                : this._getGlobalPositionStrategy(),
        });
        this._overlayRef = this._overlay.create(overlayConfig);
        this._getCloseStream(this._overlayRef)
            .pipe(takeUntil(this._destroy$))
            .subscribe((event) => {
            if (!event)
                return;
            event.preventDefault();
            if (!this.disableClose) {
                this.close(event);
            }
        });
        this._overlayRef.attach(this._overlayTemplatePortal);
    }
    _relocateOverlayContainer() {
        if (this.overlayOrigin) {
            const originElement = this.overlayOrigin.elementRef.nativeElement;
            const dialogContainer = originElement.closest('dialog[q-dialog], dialog[qDialog]');
            const popoverContainer = originElement.closest('[popover][q-popover], [popover][qPopover]');
            const overlayContainer = this._overlayContainer.getContainerElement();
            if (dialogContainer?.contains(originElement)) {
                overlayContainer.parentNode?.removeChild(overlayContainer);
                dialogContainer.appendChild(overlayContainer);
            }
            else if (popoverContainer?.contains(originElement)) {
                overlayContainer.parentNode?.removeChild(overlayContainer);
                popoverContainer.appendChild(overlayContainer);
            }
            else if (overlayContainer.parentNode !== this._document.body) {
                this._document.body.appendChild(overlayContainer);
            }
        }
    }
    _getGlobalPositionStrategy() {
        const ps = this._overlay.position().global().centerHorizontally().centerVertically();
        if (this.top)
            ps.top(this.top);
        if (this.bottom)
            ps.bottom(this.bottom);
        if (this.left)
            ps.left(this.left);
        if (this.right)
            ps.right(this.right);
        return ps;
    }
    _getFlexibleConnectedPositionStrategy(overlayOrigin) {
        return this._overlay
            .position()
            .flexibleConnectedTo(overlayOrigin.elementRef)
            .withLockedPosition()
            .withFlexibleDimensions(this.flexibleDimensions)
            .withPositions((this.positions?.length
            ? this.positions
            : this._getDefaultPositions()));
    }
    _getDefaultPositions() {
        let prioritizedPositions = this.priorityPositions === 'horizontal'
            ? Q_HORIZONTAL_PRIORITY_POSITIONS
            : Q_VERTICAL_PRIORITY_POSITIONS;
        const selectedPosition = `${this.yPosition}-${this.xPosition}`;
        prioritizedPositions = [
            selectedPosition,
            ...prioritizedPositions.filter((position) => position !== selectedPosition),
        ];
        const positions = [];
        prioritizedPositions.forEach((position) => {
            positions.push({
                ...Q_OVERLAY_SUPPORTED_POSITIONS[position],
                offsetX: (Q_OVERLAY_SUPPORTED_POSITIONS[position].offsetX ?? 0) * this.offsetX,
                offsetY: (Q_OVERLAY_SUPPORTED_POSITIONS[position].offsetY ?? 0) * this.offsetY,
            });
        });
        return positions;
    }
    _getCloseStream(overlayRef) {
        let closeStream$ = overlayRef
            .detachments()
            .pipe(map(() => undefined));
        if (this.closeOnBackdropClick) {
            closeStream$ = merge(closeStream$, overlayRef.backdropClick());
        }
        if (this.closeOnEsc) {
            closeStream$ = merge(closeStream$, overlayRef.keydownEvents().pipe(filter((event) => event.code === ESCAPE)));
        }
        return closeStream$;
    }
    get closeStream() {
        return this._overlayRef && this._getCloseStream(this._overlayRef);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QOverlayComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QOverlayComponent, isStandalone: true, selector: "q-overlay", inputs: { top: "top", bottom: "bottom", left: "left", right: "right", offsetY: "offsetY", offsetX: "offsetX", width: "width", minWidth: "minWidth", maxWidth: "maxWidth", height: "height", minHeight: "minHeight", maxHeight: "maxHeight", yPosition: "yPosition", xPosition: "xPosition", positions: "positions", overlayOrigin: "overlayOrigin", panelClass: "panelClass", backdropClass: "backdropClass", scrollStrategy: "scrollStrategy", closeAnimationDone: "closeAnimationDone", priorityPositions: "priorityPositions", closeOnBackdropClick: ["closeOnBackdropClick", "closeOnBackdropClick", booleanAttribute], flexibleDimensions: ["flexibleDimensions", "flexibleDimensions", booleanAttribute], disableClose: ["disableClose", "disableClose", booleanAttribute], hasBackdrop: ["hasBackdrop", "hasBackdrop", booleanAttribute], closeOnEsc: ["closeOnEsc", "closeOnEsc", booleanAttribute] }, outputs: { opened: "opened", closed: "closed", overlayOriginChange: "overlayOriginChange" }, providers: [QDestroyService], queries: [{ propertyName: "_overlayContentTemplate", first: true, predicate: ["overlayContentTemplate"], descendants: true }], viewQueries: [{ propertyName: "_overlayTemplatePortal", first: true, predicate: ["overlayTemplatePortal"], descendants: true }], ngImport: i0, template: "<ng-template cdkPortal #overlayTemplatePortal=\"cdkPortal\">\n  <ng-container *ngTemplateOutlet=\"_overlayContentTemplate || defaultContentTemplate\" />\n  <ng-template #defaultContentTemplate>\n    <ng-content />\n  </ng-template>\n</ng-template>\n", dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "ngmodule", type: PortalModule }, { kind: "directive", type: i1.CdkPortal, selector: "[cdkPortal]", exportAs: ["cdkPortal"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QOverlayComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-overlay', imports: [NgTemplateOutlet, OverlayModule, PortalModule], providers: [QDestroyService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template cdkPortal #overlayTemplatePortal=\"cdkPortal\">\n  <ng-container *ngTemplateOutlet=\"_overlayContentTemplate || defaultContentTemplate\" />\n  <ng-template #defaultContentTemplate>\n    <ng-content />\n  </ng-template>\n</ng-template>\n" }]
        }], propDecorators: { opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], overlayOriginChange: [{
                type: Output
            }], top: [{
                type: Input
            }], bottom: [{
                type: Input
            }], left: [{
                type: Input
            }], right: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], width: [{
                type: Input
            }], minWidth: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], height: [{
                type: Input
            }], minHeight: [{
                type: Input
            }], maxHeight: [{
                type: Input
            }], yPosition: [{
                type: Input
            }], xPosition: [{
                type: Input
            }], positions: [{
                type: Input
            }], overlayOrigin: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], closeAnimationDone: [{
                type: Input
            }], priorityPositions: [{
                type: Input
            }], closeOnBackdropClick: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], flexibleDimensions: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disableClose: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hasBackdrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], closeOnEsc: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], _overlayContentTemplate: [{
                type: ContentChild,
                args: ['overlayContentTemplate']
            }], _overlayTemplatePortal: [{
                type: ViewChild,
                args: ['overlayTemplatePortal']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QOverlayComponent };
//# sourceMappingURL=questrade-allspark-angular-components-overlay.mjs.map
