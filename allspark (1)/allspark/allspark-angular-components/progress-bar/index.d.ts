import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core';

type QProgressBarSize = 'large' | 'default' | 'thin';

type QProgressBarVariant = 'standard' | 'steps' | 'circular' | 'loading';

declare class QProgressBarComponent implements OnInit, OnChanges {
    variant: QProgressBarVariant;
    size: QProgressBarSize;
    circularProgressLabel: string;
    selectedState: BooleanInput;
    segmentInReviewIndex: number | null;
    disabled: boolean;
    dataQt: string;
    get segments(): number;
    set segments(value: NumberInput);
    get progress(): number;
    set progress(value: NumberInput);
    get hostClasses(): string;
    _circularStrokeWidth: number;
    _pathString: string;
    _progressCirclePath: {
        strokeDasharray: string;
    };
    _progressTrailPath: {
        strokeDasharray: string;
    };
    _showSuccess: boolean;
    _segmentPercents: number[];
    _segmentsInReview: number[];
    private readonly _minSegments;
    private readonly _maxSegments;
    private readonly _minProgress;
    private readonly _maxProgress;
    private readonly _strokeWidthSmallView;
    private readonly _strokeWidthDefault;
    private _segments;
    private _progress;
    private readonly _iconRegistryService;
    private readonly _breakpointObserver;
    private readonly _destroy$;
    private readonly _cdr;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _setSegments(): void;
    _isSegmentInReview(index: number): boolean;
    _setCirclePaths(): void;
    get inProgress(): boolean;
    private _setBreakpointObserver;
    private _registerIcons;
    static ɵfac: i0.ɵɵFactoryDeclaration<QProgressBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QProgressBarComponent, "q-progress-bar", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "circularProgressLabel": { "alias": "circularProgressLabel"; "required": false; }; "selectedState": { "alias": "selectedState"; "required": false; }; "segmentInReviewIndex": { "alias": "segmentInReviewIndex"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "segments": { "alias": "segments"; "required": false; }; "progress": { "alias": "progress"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_disabled: unknown;
}

export { QProgressBarComponent };
