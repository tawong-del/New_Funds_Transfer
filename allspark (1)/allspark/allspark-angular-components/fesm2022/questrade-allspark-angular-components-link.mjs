import * as i0 from '@angular/core';
import { inject, ElementRef, DOCUMENT, booleanAttribute, numberAttribute, HostListener, HostBinding, Input, Directive } from '@angular/core';
import { QAnalyticsService } from '@questrade/allspark-angular-components/core/services';

class QLinkDirective {
    variant = 'primary';
    size = 'auto';
    underlined = false;
    disabled = false;
    tabindex = null;
    analyticsCssClassIdentifier = true;
    dataQt = 'q-link';
    get _hostTabindex() {
        return this.disabled ? -1 : this.tabindex;
    }
    get _hostClass() {
        return [
            'q-link',
            `q-link-variant-${this.variant}`,
            `q-link-size-${this.size}`,
            this.underlined && 'q-link-underlined',
            this.disabled && `q-link-disabled`,
            'q-focus-indicator',
            this._analytics.isEnabled && this.analyticsCssClassIdentifier && 'q-analytics',
        ]
            .filter(Boolean)
            .join(' ');
    }
    _onClick(event) {
        this._sendAnalyticsEvent(this._elementRef.nativeElement);
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
    _elementRef = inject(ElementRef);
    _window = inject(DOCUMENT).defaultView;
    _analytics = inject(QAnalyticsService);
    _sendAnalyticsEvent(hostElement) {
        const siteHost = this._window?.location.host;
        const linkHost = hostElement.host;
        let eventName;
        if (linkHost === siteHost) {
            eventName = 'link_click_navigation';
        }
        else if (linkHost.includes('questrade')) {
            eventName = 'link_click_outbound_to_questrade';
        }
        else {
            eventName = 'link_click_outbound';
        }
        const analyticsEvent = {
            event: eventName,
            link_text: hostElement.innerText,
            link_classes: hostElement.classList.value,
            link_url: hostElement.href,
        };
        if (eventName.includes('outbound')) {
            analyticsEvent.outbound = true;
        }
        this._analytics.sendEvent(analyticsEvent);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLinkDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: QLinkDirective, isStandalone: true, selector: "a[qLink], a[q-link]", inputs: { variant: "variant", size: "size", underlined: ["underlined", "underlined", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], analyticsCssClassIdentifier: ["analyticsCssClassIdentifier", "analyticsCssClassIdentifier", booleanAttribute], dataQt: "dataQt" }, host: { listeners: { "click": "_onClick($event)" }, properties: { "attr.data-qt": "this.dataQt", "attr.tabindex": "this._hostTabindex", "class": "this._hostClass" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLinkDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'a[qLink], a[q-link]' }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], underlined: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], analyticsCssClassIdentifier: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _hostTabindex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }], _onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QLinkDirective };
//# sourceMappingURL=questrade-allspark-angular-components-link.mjs.map
