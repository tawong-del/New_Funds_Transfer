import * as i0 from '@angular/core';
import { InjectionToken, inject, DOCUMENT, Injectable, PLATFORM_ID, NgZone } from '@angular/core';
import { Subject, Observable, filter, shareReplay, takeUntil } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { filter as filter$1, shareReplay as shareReplay$1, takeUntil as takeUntil$1 } from 'rxjs/operators';

const Q_ANALYTICS_ENABLED = new InjectionToken('Q_ANALYTICS_ENABLED', {
    providedIn: 'root',
    factory: () => true,
});
class QAnalyticsService {
    isEnabled = inject(Q_ANALYTICS_ENABLED);
    _window = inject(DOCUMENT).defaultView;
    debounceTimeout = null;
    sendEvent(analyticsEvent) {
        if (!this.isEnabled)
            return;
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
            this._window.dataLayer?.push(analyticsEvent);
            this.debounceTimeout = null;
        }, 200);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QAnalyticsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QAnalyticsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QAnalyticsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class QDestroyService extends Subject {
    ngOnDestroy() {
        this.next();
        this.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDestroyService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDestroyService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QDestroyService, decorators: [{
            type: Injectable
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
let hasV8BreakIterator;
// We need a try/catch around the reference to `Intl`, because accessing it in some cases can
// cause IE to throw. These cases are tied to particular versions of Windows and can happen if
// the consumer is providing a polyfilled `Map`. See:
// https://github.com/Microsoft/ChakraCore/issues/3189
// https://github.com/angular/components/issues/15687
try {
    hasV8BreakIterator =
        typeof Intl !== 'undefined' &&
            Intl.v8BreakIterator;
}
catch {
    hasV8BreakIterator = false;
}
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
class QPlatformService {
    _platformId = inject(PLATFORM_ID);
    // We want to use the Angular platform check because if the Document is shimmed
    // without the navigator, the following checks will fail. This is preferred because
    // sometimes the Document may be shimmed without the user's knowledge or intention
    /** Whether the Angular application is being rendered in the browser. */
    isBrowser = this._platformId
        ? isPlatformBrowser(this._platformId)
        : typeof document === 'object' && !!document;
    /** Whether the current browser is Microsoft Edge. */
    EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
    /** Whether the current rendering engine is Microsoft Trident. */
    TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
    // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
    /** Whether the current rendering engine is Blink. */
    BLINK = this.isBrowser &&
        !!(window.chrome || hasV8BreakIterator) &&
        typeof CSS !== 'undefined' &&
        !this.EDGE &&
        !this.TRIDENT;
    // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
    // ensure that Webkit runs standalone and is not used as another engine's base.
    /** Whether the current rendering engine is WebKit. */
    WEBKIT = this.isBrowser &&
        /AppleWebKit/i.test(navigator.userAgent) &&
        !this.BLINK &&
        !this.EDGE &&
        !this.TRIDENT;
    /** Whether the current platform is Apple iOS. */
    IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    // It's difficult to detect the plain Gecko engine, because most of the browsers identify
    // them self as Gecko-like browsers and modify the userAgent's according to that.
    // Since we only cover one explicit Firefox case, we can simply check for Firefox
    // instead of having an unstable check for Gecko.
    /** Whether the current browser is Firefox. */
    FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
    /** Whether the current platform is Android. */
    // Trident on mobile adds the android platform to the userAgent to trick detections.
    ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
    // Safari browsers will include the Safari keyword in their userAgent. Some browsers may fake
    // this and just place the Safari keyword in the userAgent. To be more safe about Safari every
    // Safari browser should also use Webkit as its layout engine.
    /** Whether the current browser is Safari. */
    SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPlatformService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPlatformService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPlatformService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class QSharedMutationObserver {
    _destroyed = new Subject();
    /** Stream of all events from the MutationObserver. */
    _mutationSubject = new Subject();
    /** MutationObserver used to observe element mutation events. */
    _mutationObserver;
    /** A map of elements to streams of their mutation events. */
    _elementObservables = new Map();
    constructor() {
        this._mutationObserver = new MutationObserver((mutations) => this._mutationSubject.next(mutations));
    }
    /**
     * Gets a stream of mutation events for the given element/target.
     * @param target The element to observe.
     * @return The stream of mutation events for the element/target.
     */
    observe(target, options = { attributes: true }) {
        if (!this._elementObservables.has(target)) {
            this._elementObservables.set(target, new Observable((observer) => {
                const subscription = this._mutationSubject.subscribe(observer);
                this._mutationObserver?.observe(target, options);
                return () => {
                    this._mutationObserver?.disconnect();
                    subscription.unsubscribe();
                    this._elementObservables.delete(target);
                };
            }).pipe(
            // Filter mutations based on whether they affect the target or its children
            filter((mutations) => mutations.some((mutation) => target.contains(mutation.target))), 
            // Share a replay of the last event so that subsequent calls to observe the same element
            // receive initial sizing info like the first one. Also enable ref counting so the
            // element will be automatically unobserved when there are no more subscriptions.
            shareReplay({ bufferSize: 1, refCount: true }), takeUntil(this._destroyed)));
        }
        return this._elementObservables.get(target);
    }
    destroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._mutationSubject.complete();
        this._elementObservables.clear();
    }
}
class QSharedMutationObserverService {
    _sharedMutationObserver = null;
    ngOnDestroy() {
        this._sharedMutationObserver?.destroy();
    }
    observe(target, options) {
        if (!this._sharedMutationObserver) {
            this._sharedMutationObserver = new QSharedMutationObserver();
        }
        return this._sharedMutationObserver.observe(target, options);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSharedMutationObserverService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSharedMutationObserverService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSharedMutationObserverService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Handler that logs "ResizeObserver loop limit exceeded" errors.
 * These errors are not shown in the Chrome console, so we log them to ensure developers are aware.
 * @param e The error
 */
const loopLimitExceededErrorHandler = (e) => {
    if (e instanceof Error && e.message === 'ResizeObserver loop limit exceeded') {
        console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
    }
};
/**
 * A shared ResizeObserver to be used for a particular box type (content-box, border-box, or
 * device-pixel-content-box)
 */
class QSingleBoxSharedResizeObserver {
    _box;
    /** Stream that emits when the shared observer is destroyed. */
    _destroyed = new Subject();
    /** Stream of all events from the ResizeObserver. */
    _resizeSubject = new Subject();
    /** ResizeObserver used to observe element resize events. */
    _resizeObserver;
    /** A map of elements to streams of their resize events. */
    _elementObservables = new Map();
    constructor(
    /** The box type to observe for resizes. */
    _box) {
        this._box = _box;
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
        }
    }
    /**
     * Gets a stream of resize events for the given element.
     * @param target The element to observe.
     * @return The stream of resize events for the element.
     */
    observe(target) {
        if (!this._elementObservables.has(target)) {
            this._elementObservables.set(target, new Observable((observer) => {
                const subscription = this._resizeSubject.subscribe(observer);
                this._resizeObserver?.observe(target, { box: this._box });
                return () => {
                    this._resizeObserver?.unobserve(target);
                    subscription.unsubscribe();
                    this._elementObservables.delete(target);
                };
            }).pipe(filter$1((entries) => entries.some((entry) => entry.target === target)), 
            // Share a replay of the last event so that subsequent calls to observe the same element
            // receive initial sizing info like the first one. Also enable ref counting so the
            // element will be automatically unobserved when there are no more subscriptions.
            shareReplay$1({ bufferSize: 1, refCount: true }), takeUntil$1(this._destroyed)));
        }
        return this._elementObservables.get(target);
    }
    /** Destroys this instance. */
    destroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._resizeSubject.complete();
        this._elementObservables.clear();
    }
}
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
class QSharedResizeObserverService {
    /** Map of box type to shared resize observer. */
    _observers = new Map();
    /** The Angular zone. */
    _ngZone = inject(NgZone);
    constructor() {
        if (typeof ResizeObserver !== 'undefined') {
            this._ngZone.runOutsideAngular(() => {
                window.addEventListener('error', loopLimitExceededErrorHandler);
            });
        }
    }
    ngOnDestroy() {
        for (const [, observer] of this._observers) {
            observer.destroy();
        }
        this._observers.clear();
        if (typeof ResizeObserver !== 'undefined') {
            window.removeEventListener('error', loopLimitExceededErrorHandler);
        }
    }
    /**
     * Gets a stream of resize events for the given target element and box type.
     * @param target The element to observe for resizes.
     * @param options Options to pass to the `ResizeObserver`
     * @return The stream of resize events for the element.
     */
    observe(target, options) {
        const box = options?.box || 'content-box';
        if (!this._observers.has(box)) {
            this._observers.set(box, new QSingleBoxSharedResizeObserver(box));
        }
        return this._observers.get(box)?.observe(target);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSharedResizeObserverService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSharedResizeObserverService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QSharedResizeObserverService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { QAnalyticsService, QDestroyService, QPlatformService, QSharedMutationObserverService, QSharedResizeObserverService, Q_ANALYTICS_ENABLED };
//# sourceMappingURL=questrade-allspark-angular-components-core-services.mjs.map
