import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

declare class QLineClampDirective implements OnInit {
    lineClamp: number;
    private _elementRef;
    private _renderer;
    private _defaultStyles;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QLineClampDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QLineClampDirective, "[qLineClamp], [q-line-clamp]", never, { "lineClamp": { "alias": "lineClamp"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_lineClamp: unknown;
}

declare class QScrollShadowDirective implements AfterViewInit {
    auditTimeMs: i0.InputSignal<number>;
    enabled: i0.InputSignalWithTransform<boolean, unknown>;
    _hostClass: string;
    private _hostElement;
    private readonly _destroy$;
    private readonly _resizeObserver;
    private readonly _viewContainerRef;
    private readonly _ngZone;
    ngAfterViewInit(): void;
    private setClasses;
    private _calculateScrollShadowClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<QScrollShadowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QScrollShadowDirective, "[qScrollShadow]", never, { "auditTimeMs": { "alias": "qScrollShadowAuditTimeMs"; "required": false; "isSignal": true; }; "enabled": { "alias": "qScrollShadowEnabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class QTextHighlightDirective implements OnChanges, AfterViewInit {
    characteresToHighlight: string;
    caseSensitive: boolean;
    exactMatch: boolean;
    text: string;
    hostClass: string;
    private _elementRef;
    private _domSanitizer;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _replaceHighlightedTextInHTML;
    private _insertSanitizedHTML;
    private _parseExactMatchText;
    private _parseAnyMatchText;
    static ɵfac: i0.ɵɵFactoryDeclaration<QTextHighlightDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QTextHighlightDirective, "[qTextHighlight], [q-text-highlight]", never, { "characteresToHighlight": { "alias": "qTextHighlight"; "required": false; }; "caseSensitive": { "alias": "caseSensitive"; "required": false; }; "exactMatch": { "alias": "exactMatch"; "required": false; }; "text": { "alias": "text"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_caseSensitive: unknown;
    static ngAcceptInputType_exactMatch: unknown;
}

export { QLineClampDirective, QScrollShadowDirective, QTextHighlightDirective };
