import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as i0 from '@angular/core';
import { inject, DOCUMENT, NgZone, numberAttribute, booleanAttribute, ViewChild, Input, HostBinding, ChangeDetectionStrategy, ViewEncapsulation, Component } from '@angular/core';
import { QDestroyService, QSharedMutationObserverService } from '@questrade/allspark-angular-components/core/services';
import { isPresent } from '@questrade/allspark-angular-components/core/utils';
import { Subscription, takeUntil } from 'rxjs';

class QBarChartDefaultTheme extends am5.Theme {
    isDarkTheme = false;
    theme = 'green';
    _currentThemeColors = {};
    _currentThemeColorPalette = {};
    _themeChangeSub = Subscription.EMPTY;
    _themes = {
        grey: this._currentThemeColors.body,
        green: this._currentThemeColors.primary,
        red: this._currentThemeColors.danger,
        blue: this._currentThemeColors.info,
        purple: this._currentThemeColors.accent,
        orange: this._currentThemeColors.caution,
        yellow: this._currentThemeColors.warning,
    };
    get axisStrokeColor() {
        return am5.color(this._currentThemeColorPalette['ads-color-body-400']);
    }
    get textColor() {
        return am5.color(this._currentThemeColorPalette['ads-color-body-700']);
    }
    get tooltipBgColor() {
        return am5.color(this._currentThemeColorPalette['ads-color-body-700']);
    }
    get tooltipTextColor() {
        return am5.color(this._currentThemeColorPalette['ads-color-body-100']);
    }
    get spriteFillColor() {
        return am5.color(this._currentThemeColorPalette['ads-color-body-100']);
    }
    get spriteStrokeColor() {
        return am5.color(this._currentThemeColorPalette['ads-color-primary-400']);
    }
    update() {
        this.setupDefaultRules();
    }
    clearSubscriptions() {
        this._themeChangeSub.unsubscribe();
    }
    setupDefaultRules() {
        this.rule('ColorSet').setAll({
            colors: this._getAMColors(),
            reuse: false, // use 'false' to auto-generate colors when it runs out of colors
            passOptions: {
                lightness: 0.05,
                hue: 0,
            },
        });
    }
    _getAMColors() {
        this._getThemeColors();
        const theme = this._themes[this.theme];
        const colorList = theme;
        return colorList.map((color) => am5.color(color));
    }
    _getThemeColors() {
        const chartContainerStyles = getComputedStyle(this._root.dom);
        const colorContexts = [
            'primary',
            'secondary',
            'caution',
            'danger',
            'info',
            'accent',
            'success',
            'warning',
            'body',
        ];
        colorContexts.forEach((context) => {
            this._currentThemeColors[context] = [];
            for (let i = 1; i <= 7; i++) {
                const weight = `${i}00`;
                const colorToken = `ads-color-${context}-${weight}`;
                const colorValue = chartContainerStyles.getPropertyValue(`--${colorToken}`).trim();
                this._currentThemeColorPalette[colorToken] = colorValue.trim();
                this._currentThemeColors[context].push(colorValue.trim());
            }
        });
        this._setThemes();
    }
    _setThemes() {
        this._themes = {
            grey: this._currentThemeColors.body.splice(3),
            green: this._currentThemeColors.primary,
            red: this._currentThemeColors.danger,
            blue: this._currentThemeColors.info,
            purple: this._currentThemeColors.accent,
            orange: this._currentThemeColors.caution,
            yellow: this._currentThemeColors.warning,
        };
    }
}

const VERTICAL_CHART_HEIGHT = 131;
const VERTICAL_STACKED_CHART_HEIGHT = 312;
const HORIZONTAL_STACKED_CHART_HEIGHT = 55;
class QBarChartComponent {
    stacked = false;
    legendValuePercentage = true;
    showLegend = true;
    showBulletsOnHover = true;
    yAxisLabelWidth = 136;
    axisMaxValue = null;
    orientation = 'horizontal';
    theme = 'green';
    barThickness = 'small';
    colors = [];
    data = [];
    license = '';
    dataQt = 'q-bar-chart';
    _chartContainer;
    _root;
    _chart;
    _series;
    _xAxis;
    _yAxis;
    _xOppositeAxis;
    _yOppositeAxis;
    _legend;
    _tooltip;
    _activeBullet;
    _isDarkTheme = false;
    _dataSum;
    _stackedData = [];
    _defaultTheme = null;
    _document = inject(DOCUMENT);
    _ngZone = inject(NgZone);
    _destroy$ = inject(QDestroyService);
    _sharedMutationObserverService = inject(QSharedMutationObserverService);
    ngOnChanges(changes) {
        const { license, data, stacked, orientation, theme, barThickness, showLegend, legendValuePercentage, showBulletsOnHover, yAxisLabelWidth, axisMaxValue, } = changes;
        if (license?.currentValue) {
            this._addLicenseKey();
        }
        if (data) {
            this._createStackedData();
            this._dataSum = this.data.map((i) => i.value).reduce((curr, sum) => curr + sum, 0);
        }
        if ((stacked && !stacked.isFirstChange()) ||
            (axisMaxValue && !axisMaxValue.isFirstChange()) ||
            (orientation && !orientation.isFirstChange()) ||
            (theme && !theme.isFirstChange()) ||
            (barThickness && !barThickness.isFirstChange()) ||
            (showLegend && !showLegend.isFirstChange()) ||
            (legendValuePercentage && !legendValuePercentage.isFirstChange()) ||
            (showBulletsOnHover && !showBulletsOnHover.isFirstChange()) ||
            (yAxisLabelWidth && !yAxisLabelWidth.isFirstChange()) ||
            (data && !data.isFirstChange())) {
            this._initChart();
        }
    }
    ngAfterViewInit() {
        this._subscribeToThemeChanges();
        this._initChart();
    }
    ngOnDestroy() {
        this._defaultTheme?.clearSubscriptions();
        this._ngZone.runOutsideAngular(() => {
            this._root?.dispose();
        });
    }
    get _licenses() {
        return am5.registry.licenses;
    }
    get _chartColors() {
        return this._chart.get('colors');
    }
    _initChart() {
        this._ngZone.runOutsideAngular(() => {
            if (!this._root) {
                this._root = am5.Root.new(this._chartContainer.nativeElement);
            }
            this._defaultTheme = QBarChartDefaultTheme.new(this._root);
            this._defaultTheme.isDarkTheme = this._isDarkTheme;
            this._defaultTheme.theme = this.theme;
            this._defaultTheme.update();
            this._root.setThemes([am5themes_Animated.new(this._root), this._defaultTheme]);
            this._setChart();
            if (this.orientation === 'horizontal') {
                this._setHorizontalChartAxis(this.stacked ? this._stackedData : this.data);
            }
            else {
                this._setVerticalChartAxis(this.stacked ? this._stackedData : this.data);
            }
            if (this.stacked) {
                this.data.forEach((dataItem) => this._setSeries(this._stackedData, dataItem.category));
            }
            else {
                this._setSeries(this.data);
            }
            // custom colors don't work with stacked chart
            if (this.colors.length) {
                this._chartColors?.set('colors', [...this.colors.map((color) => am5.color(color))]);
            }
            if (this._showLegend()) {
                this._setLegend();
            }
            this._series?.appear(1000);
            this._chart?.appear(1000, 100);
        });
    }
    _setChart() {
        this._root.container.children.clear();
        this._chart = this._root.container.children.push(am5xy.XYChart.new(this._root, {
            panX: false,
            panY: false,
            wheelX: 'none',
            wheelY: 'none',
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingTop: this.orientation === 'horizontal' && this.stacked ? 33 : 0,
            marginBottom: 0,
            layout: this._root.verticalLayout,
        }));
    }
    _setHorizontalChartAxis(data) {
        const yRenderer = am5xy.AxisRendererY.new(this._root, {
            strokeOpacity: this.stacked ? 0 : 1,
            inversed: true,
            marginLeft: -1,
            minGridDistance: 10,
        });
        yRenderer.set('stroke', this._defaultTheme?.axisStrokeColor);
        yRenderer.grid.template.setAll({
            strokeOpacity: 0,
        });
        yRenderer.labels.template.setAll({
            fontSize: 12,
            width: this.stacked ? 0 : this.yAxisLabelWidth,
            visible: !this.stacked,
            paddingBottom: 0,
            paddingTop: 0,
            marginBottom: 0,
            marginTop: 0,
        });
        yRenderer.labels.template.set('fill', this._defaultTheme?.textColor);
        const xRenderer = am5xy.AxisRendererX.new(this._root, {
            strokeOpacity: 0,
        });
        xRenderer.set('stroke', this._defaultTheme?.axisStrokeColor);
        xRenderer.grid.template.setAll({
            strokeOpacity: 0,
        });
        xRenderer.labels.template.setAll({
            visible: false,
        });
        this._yAxis = this._chart.yAxes.push(am5xy.CategoryAxis.new(this._root, {
            categoryField: 'category',
            renderer: yRenderer,
        }));
        this._yAxis.data.setAll(data);
        if (!this.stacked) {
            const yOppositeRenderer = am5xy.AxisRendererY.new(this._root, {
                opposite: true,
                strokeOpacity: 0,
                inversed: true,
                minGridDistance: 10,
            });
            yOppositeRenderer.grid.template.setAll({
                strokeOpacity: 0,
            });
            yOppositeRenderer.labels.template.setAll({
                fontSize: 12,
                fill: am5.color(this._defaultTheme?.isDarkTheme ? '#F2F2F8' : '#262D33'),
                paddingLeft: 27,
            });
            yOppositeRenderer.labels.template.adapters.add('text', (text, target) => {
                const dataItem = target?.dataItem?.dataContext;
                if (dataItem) {
                    const dataItemPercentage = Math.round((100 * dataItem.value) / this._dataSum);
                    return dataItem.axisDisplayValue || dataItemPercentage + '%';
                }
                return '{value}';
            });
            this._yOppositeAxis = this._chart.yAxes.push(am5xy.CategoryAxis.new(this._root, {
                categoryField: 'category',
                renderer: yOppositeRenderer,
            }));
            this._yOppositeAxis.data.setAll(data);
        }
        this._xAxis = this._chart.xAxes.push(am5xy.ValueAxis.new(this._root, {
            min: 0,
            ...(isPresent(this.axisMaxValue) && { max: this.axisMaxValue }),
            strictMinMax: true,
            calculateTotals: true,
            renderer: xRenderer,
        }));
    }
    _setVerticalChartAxis(data) {
        const xRenderer = am5xy.AxisRendererX.new(this._root, {
            strokeOpacity: this.stacked || this.orientation === 'horizontal' ? 0 : 1,
        });
        xRenderer.set('stroke', this._defaultTheme?.axisStrokeColor);
        xRenderer.grid.template.setAll({
            strokeOpacity: 0,
        });
        xRenderer.labels.template.setAll({
            visible: false,
        });
        const yRenderer = am5xy.AxisRendererY.new(this._root, {});
        yRenderer.grid.template.setAll({
            strokeOpacity: 0,
        });
        yRenderer.labels.template.setAll({
            visible: false,
        });
        this._xAxis = this._chart.xAxes.push(am5xy.CategoryAxis.new(this._root, {
            categoryField: 'category',
            renderer: xRenderer,
            height: 10,
        }));
        this._xAxis.data.setAll(data);
        if (!this.stacked) {
            const xOppositeRenderer = am5xy.AxisRendererX.new(this._root, {
                opposite: true,
                strokeOpacity: 0,
                minGridDistance: 10,
            });
            xOppositeRenderer.grid.template.setAll({
                strokeOpacity: 0,
            });
            xOppositeRenderer.labels.template.setAll({
                fontSize: 12,
                paddingBottom: 16,
            });
            xOppositeRenderer.labels.template.set('fill', this._defaultTheme?.textColor);
            xOppositeRenderer.labels.template.adapters.add('text', (text, target) => {
                const dataItem = target?.dataItem?.dataContext;
                if (dataItem) {
                    const dataItemPercentage = Math.round((100 * dataItem.value) / this._dataSum);
                    return dataItem.axisDisplayValue || dataItemPercentage + '%';
                }
                return '{value}';
            });
            this._xOppositeAxis = this._chart.xAxes.push(am5xy.CategoryAxis.new(this._root, {
                categoryField: 'category',
                renderer: xOppositeRenderer,
            }));
            this._xOppositeAxis.data.setAll(data);
        }
        this._yAxis = this._chart.yAxes.push(am5xy.ValueAxis.new(this._root, {
            min: 0,
            ...(isPresent(this.axisMaxValue) && { max: this.axisMaxValue }),
            strictMinMax: true,
            calculateTotals: true,
            renderer: yRenderer,
        }));
    }
    _setSeries(data, fieldName) {
        const colSeriesOptions = this.orientation === 'horizontal'
            ? {
                name: fieldName || 'Series Horizontal',
                stacked: this.stacked,
                xAxis: this._xAxis,
                yAxis: this._yAxis,
                valueXField: fieldName || 'value',
                categoryYField: 'category',
                baseAxis: this._yAxis,
                calculateAggregates: true,
                legendRangeLabelText: '{name}',
                legendRangeValueText: '{valueXClose}',
            }
            : {
                name: fieldName || 'Series Vertical',
                stacked: this.stacked,
                xAxis: this._xAxis,
                yAxis: this._yAxis,
                valueYField: fieldName || 'value',
                categoryXField: 'category',
                calculateAggregates: true,
                baseAxis: this._xAxis,
            };
        this._series = this._chart.series.push(am5xy.ColumnSeries.new(this._root, colSeriesOptions));
        this._setSeriesTooltip();
        if (this.showBulletsOnHover) {
            this._setSeriesBullets();
        }
        const horizontalTooltipText = `${this.stacked ? '{name}' : '{categoryY}'}: {valueX}`;
        const verticalTooltipText = `${this.stacked ? '{name}' : '{categoryX}'}: {valueY}`;
        this._series.columns.template.setAll({
            tooltipText: this.orientation === 'horizontal' ? horizontalTooltipText : verticalTooltipText, // used for regular (non-stacked) charts
            tooltipY: this.orientation === 'horizontal' ? -6 : am5.p50,
            tooltipX: this.orientation === 'horizontal' ? am5.p50 : 15,
            cursorOverStyle: 'pointer',
            cornerRadiusTL: this.orientation === 'vertical' && !this.stacked ? 10 : 0,
            cornerRadiusTR: this.stacked ? 0 : 10,
            cornerRadiusBL: 0,
            cornerRadiusBR: this.stacked || this.orientation === 'vertical' ? 0 : 10,
        });
        const barSize = this._getBarSize();
        this._series.columns.template.setAll(this.orientation === 'horizontal' ? { height: barSize } : { width: barSize });
        if (this.stacked) {
            this._setStackedChartSpecifics();
        }
        else {
            this._setRegularChartSpecifics();
        }
        this._series.events.on('datavalidated', () => {
            this._calculateChartHeight();
        });
        if (this.showBulletsOnHover) {
            this._series.columns.template.events.on('pointerover', (e) => {
                this._showBullet(e.target.dataItem);
            });
            this._series.columns.template.events.on('pointerout', () => {
                this._hideBullet();
            });
        }
        this._series.data.setAll(data);
    }
    _setRegularChartSpecifics() {
        this._series.columns.template.adapters.add('fill', (fill, target) => this._chartColors?.getIndex(this._series.columns.indexOf(target)));
        if (!this.colors.length) {
            this._series.columns.template.adapters.add('stroke', (stroke, target) => {
                const columnIndex = this._series.columns.indexOf(target);
                if (columnIndex === -1)
                    return stroke;
                return this._chartColors?.getIndex(columnIndex === 0 ? columnIndex + 1 : columnIndex);
            });
        }
    }
    _setStackedChartSpecifics() {
        this._series.columns.template.adapters.add('cornerRadiusTL', (radius, target) => {
            return this._isFirstDataItem(target.dataItem) ? 10 : 0;
        });
        this._series.columns.template.adapters.add('cornerRadiusTR', (radius, target) => {
            if (this.orientation === 'vertical') {
                return this._isFirstDataItem(target.dataItem) ? 10 : 0;
            }
            return this._isLastDataItem(target.dataItem) ? 10 : 0;
        });
        this._series.columns.template.adapters.add('cornerRadiusBL', (radius, target) => {
            if (this.orientation === 'vertical') {
                return this._isLastDataItem(target.dataItem) ? 10 : 0;
            }
            return this._isFirstDataItem(target.dataItem) ? 10 : 0;
        });
        this._series.columns.template.adapters.add('cornerRadiusBR', (radius, target) => {
            return this._isLastDataItem(target.dataItem) ? 10 : 0;
        });
        if (!this.colors.length) {
            this._series.columns.template.adapters.add('stroke', (stroke, target) => {
                if (!target.dataItem)
                    return stroke;
                const isFirstItem = this.orientation === 'horizontal'
                    ? this._isFirstDataItem(target.dataItem)
                    : this._isLastDataItem(target.dataItem);
                return isFirstItem ? this._chartColors?.getIndex(1) : stroke;
            });
        }
    }
    _setSeriesTooltip() {
        this._tooltip = am5.Tooltip.new(this._root, {
            height: 28,
            getFillFromSprite: false,
            autoTextColor: false,
            pointerOrientation: this.orientation === 'horizontal' ? 'vertical' : 'left',
        });
        this._tooltip.get('background')?.setAll({
            fillOpacity: 1,
            strokeOpacity: 0,
        });
        this._tooltip.get('background')?.set('fill', this._defaultTheme?.tooltipBgColor);
        this._tooltip.label.set('fontSize', 11);
        this._tooltip.label.set('fill', this._defaultTheme?.tooltipTextColor);
        this._series?.set('tooltip', this._tooltip);
    }
    _showBullet = (dataItem) => {
        if (dataItem?.bullets?.length) {
            this._activeBullet = dataItem.bullets[0];
            this._activeBullet.get('sprite').animate({ key: 'opacity', to: 1, duration: 100 });
        }
    };
    _hideBullet = () => {
        this._activeBullet.get('sprite').animate({ key: 'opacity', to: 0, duration: 100 });
    };
    _setSeriesBullets() {
        this._series.bullets.push(() => {
            const horizontalTooltipText = `${this.stacked ? '{name}' : '{categoryY}'}: {valueX}`;
            const verticalTooltipText = `${this.stacked ? '{name}' : '{categoryX}'}: {valueY}`;
            const sprite = am5.Circle.new(this._root, {
                radius: 7,
                strokeWidth: 2,
                interactive: true,
                toggleKey: 'active',
                opacity: 0,
                tooltipText: this.orientation === 'horizontal' ? horizontalTooltipText : verticalTooltipText,
                tooltipY: this.orientation === 'horizontal' ? -4 : am5.p50,
                tooltipX: this.orientation === 'horizontal' ? am5.p50 : 18,
                tooltip: this._tooltip,
            });
            sprite.set('fill', this._defaultTheme?.spriteFillColor);
            sprite.set('stroke', this._defaultTheme?.spriteStrokeColor);
            sprite.events.on('pointerover', (e) => {
                this._showBullet(e.target.dataItem);
            });
            sprite.events.on('pointerout', () => {
                this._hideBullet();
            });
            return am5.Bullet.new(this._root, {
                sprite: sprite,
            });
        });
    }
    _setLegend() {
        this._legend = this._chart.children.push(am5.Legend.new(this._root, {
            centerX: am5.p50,
            x: am5.p50,
            layout: this._root.verticalLayout,
            nameField: 'categoryX',
            width: am5.p100,
        }));
        this._legend.itemContainers.template.setup = (item) => {
            item.events.disableType('pointerover');
            item.events.disableType('click');
        };
        this._legend.itemContainers.template.setAll({
            height: 18,
            marginTop: 16,
            width: am5.p100,
        });
        this._legend.labels.template.set('fontSize', 13);
        this._legend.labels.template.set('fill', this._defaultTheme?.textColor);
        this._legend.valueLabels.template.setAll({
            textAlign: 'right',
            width: am5.p100,
            fontSize: 13,
        });
        this._legend.valueLabels.template.set('fill', this._defaultTheme?.textColor);
        this._legend.markers.template.setAll({
            width: 12,
            height: 12,
            marginRight: 16,
        });
        this._legend.markerRectangles.template.setAll({
            cornerRadiusTL: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusBR: 10,
        });
        if (this.stacked) {
            this._legend.markerRectangles.template.adapters.add('stroke', (value, target) => {
                if (!target.dataItem)
                    return value;
                const dataItem = target.dataItem.dataContext.dataItems[0];
                const isFirstItem = this.orientation === 'horizontal'
                    ? this._isFirstDataItem(dataItem)
                    : this._isLastDataItem(dataItem);
                return isFirstItem ? this._chartColors?.getIndex(1) : value;
            });
        }
        this._legend.valueLabels.template.adapters.add('text', (text, target) => {
            if (target.dataItem) {
                let value;
                if (this.stacked) {
                    const dataItem = target.dataItem.component.dataItems[0];
                    value = dataItem.get(this.orientation === 'horizontal' ? 'valueX' : 'valueY');
                }
                else {
                    const lblDataItem = target.dataItem;
                    const seriesDataItem = lblDataItem?.dataContext;
                    const dataItem = seriesDataItem?.dataContext;
                    value = dataItem.value;
                }
                if (value) {
                    const percentage = Math.round((100 * value) / this._dataSum);
                    return this.legendValuePercentage ? percentage + '%' : value.toString();
                }
            }
            return text;
        });
        if (this.stacked) {
            this._legend.data.setAll(this._chart.series.values);
        }
        else {
            this._legend.data.setAll(this._series.dataItems);
        }
    }
    _calculateChartHeight() {
        let chartHeight = 0;
        const legendHeight = this._showLegend() ? this._legend?.height() : 0;
        if (this.orientation === 'vertical') {
            chartHeight = this.stacked ? VERTICAL_STACKED_CHART_HEIGHT : VERTICAL_CHART_HEIGHT;
        }
        else {
            const getRegularChartHeight = () => 24 + this.data.length * 10 + (this.data.length - 1) * 24;
            chartHeight = this.stacked ? HORIZONTAL_STACKED_CHART_HEIGHT : getRegularChartHeight();
        }
        this._root.dom.style.height = `${chartHeight + legendHeight}px`;
    }
    _showLegend() {
        return (this.showLegend &&
            ((this.orientation === 'vertical' && !this.stacked) ||
                (this.orientation === 'horizontal' && this.stacked)));
    }
    _createStackedData() {
        this._stackedData = this.data.reduce((acc, curr) => {
            acc[0][curr.category] = curr.value;
            return acc;
        }, [{ category: 'StackedCategory' }]);
    }
    _subscribeToThemeChanges() {
        this._isDarkTheme = this._document.body.classList.contains('dark-theme');
        this._sharedMutationObserverService
            .observe(this._document.body, { attributes: true })
            ?.pipe(takeUntil(this._destroy$))
            .subscribe((mutations) => {
            mutations.forEach((mutation) => {
                const bodyEl = mutation.target;
                if (mutation.attributeName === 'class') {
                    const isDarkTheme = bodyEl?.classList?.contains('dark-theme');
                    if (this._isDarkTheme !== isDarkTheme) {
                        this._isDarkTheme = isDarkTheme;
                        this._initChart();
                    }
                }
            });
        });
    }
    _isLastDataItem = (dataItem) => {
        if (!dataItem)
            return false;
        const items = this._getCategoryDataItems(dataItem);
        const valueY = dataItem.get('valueY');
        return valueY !== undefined && valueY >= 0
            ? items.indexOf(dataItem) == 0
            : items.indexOf(dataItem) == items.length - 1;
    };
    _isFirstDataItem = (dataItem) => {
        if (!dataItem)
            return false;
        const items = this._getCategoryDataItems(dataItem);
        const valueY = dataItem.get('valueY');
        return valueY !== undefined && valueY >= 0
            ? items.indexOf(dataItem) == items.length - 1
            : items.indexOf(dataItem) == 0;
    };
    _getCategoryDataItems = (dataItem) => {
        const currentAxis = (this.orientation === 'vertical' ? this._xAxis : this._yAxis);
        const dataItemCategory = dataItem.get(this.orientation === 'vertical' ? 'categoryX' : 'categoryY');
        if (!dataItemCategory)
            return [];
        const index = currentAxis.categoryToIndex(dataItemCategory);
        const items = [];
        this._chart.series.each((series) => {
            if (series.get('visible')) {
                const item = series.dataItems[index];
                const itemSettingsValue = item?.get(this.orientation === 'vertical' ? 'valueY' : 'valueX');
                if (itemSettingsValue) {
                    items.push(item);
                }
                else {
                    items.unshift(item);
                }
            }
        });
        return items;
    };
    _addLicenseKey() {
        if (!this._licenses.includes(this.license)) {
            am5.addLicense(this.license);
        }
    }
    _getBarSize() {
        const baseSize = this.barThickness === 'medium' ? 16 : 8;
        return baseSize;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QBarChartComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: QBarChartComponent, isStandalone: true, selector: "q-bar-chart", inputs: { stacked: ["stacked", "stacked", booleanAttribute], legendValuePercentage: ["legendValuePercentage", "legendValuePercentage", booleanAttribute], showLegend: ["showLegend", "showLegend", booleanAttribute], showBulletsOnHover: ["showBulletsOnHover", "showBulletsOnHover", booleanAttribute], yAxisLabelWidth: ["yAxisLabelWidth", "yAxisLabelWidth", numberAttribute], axisMaxValue: ["axisMaxValue", "axisMaxValue", numberAttribute], orientation: "orientation", theme: "theme", barThickness: "barThickness", colors: "colors", data: "data", license: "license", dataQt: "dataQt" }, host: { properties: { "attr.data-qt": "this.dataQt" } }, providers: [QDestroyService], viewQueries: [{ propertyName: "_chartContainer", first: true, predicate: ["chartContainer"], descendants: true }], usesOnChanges: true, ngImport: i0, template: '<div #chartContainer class="q-bar-chart"></div>', isInline: true, styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-bar-chart{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;width:100%}.q-bar-chart .am5-focus-container div:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QBarChartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-bar-chart', template: '<div #chartContainer class="q-bar-chart"></div>', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [QDestroyService], styles: [".q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-bar-chart{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none;width:100%}.q-bar-chart .am5-focus-container div:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}\n"] }]
        }], propDecorators: { stacked: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], legendValuePercentage: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showLegend: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showBulletsOnHover: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], yAxisLabelWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], axisMaxValue: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], orientation: [{
                type: Input
            }], theme: [{
                type: Input
            }], barThickness: [{
                type: Input
            }], colors: [{
                type: Input
            }], data: [{
                type: Input
            }], license: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], _chartContainer: [{
                type: ViewChild,
                args: ['chartContainer']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QBarChartComponent };
//# sourceMappingURL=questrade-allspark-angular-components-bar-chart.mjs.map
