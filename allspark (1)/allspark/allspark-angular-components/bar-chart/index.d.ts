import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as i0 from '@angular/core';
import { OnChanges, AfterViewInit, OnDestroy, ElementRef, SimpleChanges } from '@angular/core';

interface QBarChartDataItem {
    category: string;
    value: number;
    axisDisplayValue?: string;
}

type QBarChartOrientation = 'vertical' | 'horizontal';

type QBarChartTheme = 'grey' | 'green' | 'blue' | 'red' | 'purple' | 'orange' | 'yellow';

type QBarChartThickness = 'small' | 'medium';

declare class QBarChartComponent implements OnChanges, AfterViewInit, OnDestroy {
    stacked: boolean;
    legendValuePercentage: boolean;
    showLegend: boolean;
    showBulletsOnHover: boolean;
    yAxisLabelWidth: number;
    axisMaxValue: number | null;
    orientation: QBarChartOrientation;
    theme: QBarChartTheme;
    barThickness: QBarChartThickness;
    colors: string[];
    data: QBarChartDataItem[];
    license: string;
    dataQt: string;
    _chartContainer: ElementRef<HTMLElement>;
    _root: am5.Root;
    _chart: am5xy.XYChart;
    _series: am5xy.ColumnSeries;
    _xAxis: am5xy.Axis<am5xy.AxisRenderer>;
    _yAxis: am5xy.Axis<am5xy.AxisRenderer>;
    _xOppositeAxis: am5xy.Axis<am5xy.AxisRenderer>;
    _yOppositeAxis: am5xy.Axis<am5xy.AxisRenderer>;
    _legend: am5.Legend;
    _tooltip: am5.Tooltip;
    _activeBullet: am5.Bullet;
    private _isDarkTheme;
    private _dataSum;
    private _stackedData;
    private _defaultTheme;
    private readonly _document;
    private readonly _ngZone;
    private readonly _destroy$;
    private readonly _sharedMutationObserverService;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    get _licenses(): string[];
    private get _chartColors();
    private _initChart;
    private _setChart;
    private _setHorizontalChartAxis;
    private _setVerticalChartAxis;
    private _setSeries;
    private _setRegularChartSpecifics;
    private _setStackedChartSpecifics;
    private _setSeriesTooltip;
    private _showBullet;
    private _hideBullet;
    private _setSeriesBullets;
    private _setLegend;
    private _calculateChartHeight;
    private _showLegend;
    private _createStackedData;
    private _subscribeToThemeChanges;
    private _isLastDataItem;
    private _isFirstDataItem;
    private _getCategoryDataItems;
    private _addLicenseKey;
    private _getBarSize;
    static ɵfac: i0.ɵɵFactoryDeclaration<QBarChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QBarChartComponent, "q-bar-chart", never, { "stacked": { "alias": "stacked"; "required": false; }; "legendValuePercentage": { "alias": "legendValuePercentage"; "required": false; }; "showLegend": { "alias": "showLegend"; "required": false; }; "showBulletsOnHover": { "alias": "showBulletsOnHover"; "required": false; }; "yAxisLabelWidth": { "alias": "yAxisLabelWidth"; "required": false; }; "axisMaxValue": { "alias": "axisMaxValue"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "barThickness": { "alias": "barThickness"; "required": false; }; "colors": { "alias": "colors"; "required": false; }; "data": { "alias": "data"; "required": false; }; "license": { "alias": "license"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_stacked: unknown;
    static ngAcceptInputType_legendValuePercentage: unknown;
    static ngAcceptInputType_showLegend: unknown;
    static ngAcceptInputType_showBulletsOnHover: unknown;
    static ngAcceptInputType_yAxisLabelWidth: unknown;
    static ngAcceptInputType_axisMaxValue: unknown;
}

export { QBarChartComponent };
export type { QBarChartDataItem, QBarChartOrientation, QBarChartTheme, QBarChartThickness };
