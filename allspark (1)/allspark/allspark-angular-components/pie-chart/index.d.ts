import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as i0 from '@angular/core';
import { OnChanges, AfterViewInit, OnDestroy, TemplateRef, ElementRef, SimpleChanges } from '@angular/core';

interface QPieChartDataItem {
    id?: string;
    value: number;
    category: string;
    color?: string;
}

type QPieChartLayout = 'vertical' | 'horizontal';

type QPieChartSize = 'sm' | 'md' | 'lg';

interface QPieChartTextSet {
    label: string;
    value: string;
}

type QPieChartVariant = 'donut-thin' | 'donut-medium' | 'donut-bold' | 'donut-extra-bold' | 'solid';

declare class QPieChartComponent implements OnChanges, AfterViewInit, OnDestroy {
    legendLabelText: string;
    legendValueText: string;
    labelText: string;
    colors: string[];
    license: string;
    dataQt: string;
    get yOffset(): number;
    set yOffset(value: number);
    get legendColumns(): number;
    set legendColumns(value: number);
    get showLegend(): boolean;
    set showLegend(value: boolean);
    get tooltipText(): string;
    set tooltipText(value: string);
    get layout(): QPieChartLayout;
    set layout(value: QPieChartLayout);
    get disableHoverAnimation(): boolean;
    set disableHoverAnimation(value: boolean);
    get showLabels(): boolean;
    set showLabels(value: boolean);
    get reverseDataSet(): boolean;
    set reverseDataSet(value: boolean);
    get internalSectionTextData(): QPieChartTextSet[];
    set internalSectionTextData(value: QPieChartTextSet[]);
    get type(): QPieChartVariant;
    set type(value: QPieChartVariant);
    get size(): QPieChartSize;
    set size(value: QPieChartSize);
    get data(): QPieChartDataItem[];
    set data(value: QPieChartDataItem[]);
    internalSectionTemplate: TemplateRef<HTMLElement>;
    internalSectionEl: ElementRef;
    _chartContainer: ElementRef<HTMLElement>;
    _root: am5.Root;
    _rootInnerContainer: am5.Container;
    _chart: am5percent.PieChart;
    _series: am5percent.PieSeries;
    _legend: am5.Legend;
    _label: am5.Label;
    _isDarkTheme: boolean;
    private _defaultTheme;
    private _yOffset;
    private _legendColumns;
    private _showLegend;
    private _tooltipText;
    private _layout;
    private _disableHoverAnimation;
    private _showLabels;
    private _reverseDataSet;
    private _internalSectionTextData;
    private _type;
    private _size;
    private _data;
    private _sizeMap;
    private _thicknessMap;
    private readonly _document;
    private readonly _ngZone;
    private readonly _cdr;
    private readonly _destroy$;
    private readonly _sharedMutationObserverService;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _hideFirstTextDataSetLabel(): boolean;
    _hideFirstTextDataSet(): boolean;
    _hideSecondTextDataSet(): boolean;
    _getTextValueCSSClasses(): string;
    get _licenses(): string[];
    private _subscribeToThemeChanges;
    private _initChart;
    private _setChart;
    private _setSeries;
    private _setSeriesTooltip;
    private _setSeriesCustomColors;
    private _setSeriesSlices;
    private _setLegend;
    private _setLegendItems;
    private _setLabels;
    private _setRootHeight;
    private _getDonutRadius;
    private _addLicenseKey;
    static ɵfac: i0.ɵɵFactoryDeclaration<QPieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QPieChartComponent, "q-pie-chart", never, { "legendLabelText": { "alias": "legendLabelText"; "required": false; }; "legendValueText": { "alias": "legendValueText"; "required": false; }; "labelText": { "alias": "labelText"; "required": false; }; "colors": { "alias": "colors"; "required": false; }; "license": { "alias": "license"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "yOffset": { "alias": "yOffset"; "required": false; }; "legendColumns": { "alias": "legendColumns"; "required": false; }; "showLegend": { "alias": "showLegend"; "required": false; }; "tooltipText": { "alias": "tooltipText"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "disableHoverAnimation": { "alias": "disableHoverAnimation"; "required": false; }; "showLabels": { "alias": "showLabels"; "required": false; }; "reverseDataSet": { "alias": "reverseDataSet"; "required": false; }; "internalSectionTextData": { "alias": "internalSectionTextData"; "required": false; }; "type": { "alias": "type"; "required": false; }; "size": { "alias": "size"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, {}, ["internalSectionTemplate"], never, true, never>;
}

export { QPieChartComponent };
export type { QPieChartDataItem, QPieChartLayout, QPieChartSize, QPieChartTextSet, QPieChartVariant };
