import * as i0 from '@angular/core';
import { inject, ElementRef, Renderer2, numberAttribute, Input, Directive, input, booleanAttribute, ViewContainerRef, NgZone, HostBinding, SecurityContext } from '@angular/core';
import { QSharedResizeObserverService } from '@questrade/allspark-angular-components/core/services';
import { injectDestroy } from '@questrade/allspark-angular-components/core/utils';
import { fromEvent, auditTime, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

class QLineClampDirective {
    lineClamp = 0;
    _elementRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    _defaultStyles = {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        webkitBoxOrient: 'vertical',
        webkitLineClamp: 'none',
    };
    ngOnInit() {
        Object.assign(this._elementRef.nativeElement.style, this._defaultStyles);
        this._renderer.setStyle(this._elementRef.nativeElement, '-webkit-line-clamp', this.lineClamp);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLineClampDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: QLineClampDirective, isStandalone: true, selector: "[qLineClamp], [q-line-clamp]", inputs: { lineClamp: ["lineClamp", "lineClamp", numberAttribute] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QLineClampDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qLineClamp], [q-line-clamp]',
                }]
        }], propDecorators: { lineClamp: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });

var QScrollShadowClass;
(function (QScrollShadowClass) {
    QScrollShadowClass["UP"] = "q-shadow-top";
    QScrollShadowClass["DOWN"] = "q-shadow-bottom";
})(QScrollShadowClass || (QScrollShadowClass = {}));
class QScrollShadowDirective {
    auditTimeMs = input(200, ...(ngDevMode ? [{ debugName: "auditTimeMs", alias: 'qScrollShadowAuditTimeMs' }] : [{ alias: 'qScrollShadowAuditTimeMs' }]));
    enabled = input(true, ...(ngDevMode ? [{ debugName: "enabled", transform: booleanAttribute, alias: 'qScrollShadowEnabled' }] : [{ transform: booleanAttribute, alias: 'qScrollShadowEnabled' }]));
    _hostClass = 'q-scroll-shadow';
    _hostElement = null;
    _destroy$ = injectDestroy();
    _resizeObserver = inject(QSharedResizeObserverService);
    _viewContainerRef = inject(ViewContainerRef);
    _ngZone = inject(NgZone);
    ngAfterViewInit() {
        this._hostElement = this._viewContainerRef.element.nativeElement;
        if (!this._hostElement)
            return;
        this._ngZone.runOutsideAngular(() => {
            if (!this._hostElement)
                return;
            fromEvent(this._hostElement, 'scroll')
                .pipe(auditTime(this.auditTimeMs()), takeUntil(this._destroy$))
                .subscribe(this.setClasses.bind(this));
        });
        this._resizeObserver
            .observe(this._hostElement)
            ?.pipe(auditTime(this.auditTimeMs()), takeUntil(this._destroy$))
            .subscribe(this.setClasses.bind(this));
        this.setClasses();
    }
    setClasses() {
        this._hostElement?.classList.remove(QScrollShadowClass.UP, QScrollShadowClass.DOWN);
        if (this.enabled()) {
            const scrollShadowClasses = this._calculateScrollShadowClasses().filter(Boolean);
            this._hostElement?.classList.add(...scrollShadowClasses);
        }
    }
    _calculateScrollShadowClasses() {
        if (!this._hostElement)
            return [];
        const { clientHeight, scrollHeight, scrollTop } = this._hostElement;
        const canScrollUp = scrollTop > 0;
        const scrolled = Math.ceil(scrollHeight - scrollTop) === clientHeight;
        const canScrollDown = clientHeight < scrollHeight && !scrolled;
        return [canScrollUp ? QScrollShadowClass.UP : '', canScrollDown ? QScrollShadowClass.DOWN : ''];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QScrollShadowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.16", type: QScrollShadowDirective, isStandalone: true, selector: "[qScrollShadow]", inputs: { auditTimeMs: { classPropertyName: "auditTimeMs", publicName: "qScrollShadowAuditTimeMs", isSignal: true, isRequired: false, transformFunction: null }, enabled: { classPropertyName: "enabled", publicName: "qScrollShadowEnabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class": "this._hostClass" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QScrollShadowDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[qScrollShadow]' }]
        }], propDecorators: { auditTimeMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "qScrollShadowAuditTimeMs", required: false }] }], enabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "qScrollShadowEnabled", required: false }] }], _hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class QTextHighlightDirective {
    characteresToHighlight = '';
    caseSensitive = false;
    exactMatch = false;
    text = '';
    hostClass = 'q-text-highlight';
    _elementRef = inject(ElementRef);
    _domSanitizer = inject(DomSanitizer);
    ngAfterViewInit() {
        this._replaceHighlightedTextInHTML();
    }
    ngOnChanges(changes) {
        const { characteresToHighlight, caseSensitive, exactMatch, text, highlightClass } = changes || {};
        if (this._elementRef?.nativeElement) {
            if (characteresToHighlight || caseSensitive || exactMatch || text || highlightClass) {
                this._replaceHighlightedTextInHTML();
            }
        }
    }
    _replaceHighlightedTextInHTML() {
        if (this.characteresToHighlight === '') {
            this._insertSanitizedHTML(this.text);
        }
        else {
            const highlightedText = this.exactMatch
                ? this._parseExactMatchText()
                : this._parseAnyMatchText();
            this._insertSanitizedHTML(highlightedText);
        }
    }
    _insertSanitizedHTML(htmlContent) {
        const sanitized = this._domSanitizer.sanitize(SecurityContext.HTML, htmlContent);
        this._elementRef.nativeElement.innerHTML = sanitized || '';
    }
    _parseExactMatchText() {
        const regex = new RegExp(this.characteresToHighlight || '', this.caseSensitive ? 'g' : 'gi');
        return this.text.replace(regex, (match) => {
            return `<strong class="q-text-bold">${match}</strong>`;
        });
    }
    _parseAnyMatchText() {
        const highlightedTextArray = [];
        this.text.split('').forEach((character) => {
            if (this.caseSensitive
                ? this.characteresToHighlight.includes(character)
                : this.characteresToHighlight.toLocaleLowerCase().includes(character.toLocaleLowerCase())) {
                highlightedTextArray.push(`<strong class="q-text-bold">${character}</strong>`);
            }
            else {
                highlightedTextArray.push(character);
            }
        });
        return highlightedTextArray.join('');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTextHighlightDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: QTextHighlightDirective, isStandalone: true, selector: "[qTextHighlight], [q-text-highlight]", inputs: { characteresToHighlight: ["qTextHighlight", "characteresToHighlight"], caseSensitive: ["caseSensitive", "caseSensitive", booleanAttribute], exactMatch: ["exactMatch", "exactMatch", booleanAttribute], text: "text" }, host: { properties: { "class": "this.hostClass" } }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QTextHighlightDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[qTextHighlight], [q-text-highlight]',
                }]
        }], propDecorators: { characteresToHighlight: [{
                type: Input,
                args: ['qTextHighlight']
            }], caseSensitive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], exactMatch: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], text: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QLineClampDirective, QScrollShadowDirective, QTextHighlightDirective };
//# sourceMappingURL=questrade-allspark-angular-components-core-directives.mjs.map
