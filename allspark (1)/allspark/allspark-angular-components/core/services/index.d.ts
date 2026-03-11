import * as i0 from '@angular/core';
import { InjectionToken, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

interface WindowWithAnalytics extends Window {
    dataLayer: Record<string, unknown>[];
}
/**
 * Type definition based on Marketing Cloud Confluence documentation
 *
 * https://questrade.atlassian.net/wiki/spaces/AGILE/pages/344555603/GA+Events
 *
 * https://questrade.atlassian.net/wiki/spaces/AGILE/pages/363956251/Create+GTM+module+for+MFE+tool+library+for+shadow+DOM+tracking
 */
type QAnalyticsEvent = {
    [key: string]: string | boolean;
};
declare const Q_ANALYTICS_ENABLED: InjectionToken<boolean>;
declare class QAnalyticsService {
    isEnabled: boolean;
    private _window;
    private debounceTimeout;
    sendEvent(analyticsEvent: QAnalyticsEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QAnalyticsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QAnalyticsService>;
}

declare class QDestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QDestroyService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QDestroyService>;
}

/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
declare class QPlatformService {
    private _platformId;
    /** Whether the Angular application is being rendered in the browser. */
    isBrowser: boolean;
    /** Whether the current browser is Microsoft Edge. */
    EDGE: boolean;
    /** Whether the current rendering engine is Microsoft Trident. */
    TRIDENT: boolean;
    /** Whether the current rendering engine is Blink. */
    BLINK: boolean;
    /** Whether the current rendering engine is WebKit. */
    WEBKIT: boolean;
    /** Whether the current platform is Apple iOS. */
    IOS: boolean;
    /** Whether the current browser is Firefox. */
    FIREFOX: boolean;
    /** Whether the current platform is Android. */
    ANDROID: boolean;
    /** Whether the current browser is Safari. */
    SAFARI: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<QPlatformService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QPlatformService>;
}

declare class QSharedMutationObserverService implements OnDestroy {
    private _sharedMutationObserver;
    ngOnDestroy(): void;
    observe(target: Element, options?: MutationObserverInit): Observable<MutationRecord[]> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSharedMutationObserverService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QSharedMutationObserverService>;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Allows observing resize events on multiple elements using a shared set of ResizeObserver.
 * Sharing a ResizeObserver instance is recommended for better performance (see
 * https://github.com/WICG/resize-observer/issues/59).
 *
 * Rather than share a single `ResizeObserver`, this class creates one `ResizeObserver` per type
 * of observed box ('content-box', 'border-box', and 'device-pixel-content-box'). This avoids
 * later calls to `observe` with a different box type from influencing the events dispatched to
 * earlier calls.
 */
declare class QSharedResizeObserverService implements OnDestroy {
    /** Map of box type to shared resize observer. */
    private _observers;
    /** The Angular zone. */
    private _ngZone;
    constructor();
    ngOnDestroy(): void;
    /**
     * Gets a stream of resize events for the given target element and box type.
     * @param target The element to observe for resizes.
     * @param options Options to pass to the `ResizeObserver`
     * @return The stream of resize events for the element.
     */
    observe(target: Element, options?: ResizeObserverOptions): Observable<ResizeObserverEntry[]> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<QSharedResizeObserverService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QSharedResizeObserverService>;
}

export { QAnalyticsService, QDestroyService, QPlatformService, QSharedMutationObserverService, QSharedResizeObserverService, Q_ANALYTICS_ENABLED };
export type { QAnalyticsEvent, WindowWithAnalytics };
