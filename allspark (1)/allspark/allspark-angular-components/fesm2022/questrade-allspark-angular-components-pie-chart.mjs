import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, DOCUMENT, NgZone, ChangeDetectorRef, ViewChild, ContentChild, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';
import { QDestroyService, QSharedMutationObserverService } from '@questrade/allspark-angular-components/core/services';
import { takeUntil } from 'rxjs';

class QPieChartDefaultTheme extends am5.Theme {
    textColor = null;
    tooltipBackgroundColor = null;
    tooltipTextColor = null;
    _colors = [];
    update() {
        this._setThemeColors();
        this.setupDefaultRules();
    }
    setupDefaultRules() {
        this.rule('ColorSet').setAll({
            colors: this._colors,
            reuse: false, // use 'false' to auto-generate colors when it runs out of colors
            passOptions: {
                lightness: 0.05,
                hue: 0,
            },
        });
    }
    _setThemeColors() {
        const chartContainerStyles = getComputedStyle(this._root.dom);
        const colorTokens = [
            'ads-color-body-400',
            'ads-color-body-500',
            'ads-color-body-600',
            'ads-color-body-700',
            'ads-color-primary-500',
            'ads-color-primary-400',
            'ads-color-primary-300',
            'ads-color-primary-200',
        ];
        colorTokens.forEach((token) => {
            const colorValue = chartContainerStyles.getPropertyValue(`--${token}`);
            this._colors.push(am5.color(colorValue.trim()));
        });
        const textColorToken = 'ads-color-body-contrast-100';
        const tooltipBgColorToken = 'ads-color-body-700';
        const tooltipTextColorToken = 'ads-color-body-100';
        this.textColor = am5.color(chartContainerStyles.getPropertyValue(`--${textColorToken}`).trim());
        this.tooltipBackgroundColor = am5.color(chartContainerStyles.getPropertyValue(`--${tooltipBgColorToken}`).trim());
        this.tooltipTextColor = am5.color(chartContainerStyles.getPropertyValue(`--${tooltipTextColorToken}`).trim());
    }
}

class QPieChartComponent {
    legendLabelText = '{category}:';
    legendValueText = '{value}';
    labelText = '{category}: {value}';
    colors = [];
    license = '';
    dataQt = 'q-pie-chart';
    get yOffset() {
        return this._yOffset;
    }
    set yOffset(value) {
        this._yOffset = value;
        if (this._root)
            this._initChart();
    }
    get legendColumns() {
        return this._legendColumns;
    }
    set legendColumns(value) {
        this._legendColumns = value;
        if (this._root)
            this._initChart();
    }
    get showLegend() {
        return this._showLegend;
    }
    set showLegend(value) {
        this._showLegend = value;
        if (!value && this._rootInnerContainer) {
            this._rootInnerContainer.children.removeValue(this._legend);
            this._setRootHeight();
        }
        else if (this._root) {
            this._setLegend();
        }
    }
    get tooltipText() {
        return this._tooltipText;
    }
    set tooltipText(value) {
        this._tooltipText = value;
        if (this._root)
            this._initChart();
    }
    get layout() {
        return this._layout;
    }
    set layout(value) {
        this._layout = value;
        if (this._root)
            this._initChart();
    }
    get disableHoverAnimation() {
        return this._disableHoverAnimation;
    }
    set disableHoverAnimation(value) {
        this._disableHoverAnimation = value;
        if (this._root)
            this._initChart();
    }
    get showLabels() {
        return this._showLabels;
    }
    set showLabels(value) {
        this._showLabels = value;
        this._series?.labels.template.set('forceHidden', !this._showLabels);
        this._series?.ticks.template.set('forceHidden', !this._showLabels);
    }
    get reverseDataSet() {
        return this._reverseDataSet;
    }
    set reverseDataSet(value) {
        this._reverseDataSet = value;
        this._cdr.detectChanges();
        this._setLabels();
    }
    get internalSectionTextData() {
        return this._internalSectionTextData;
    }
    set internalSectionTextData(value) {
        this._internalSectionTextData = value;
        this._cdr.detectChanges();
        this._setLabels();
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        this._cdr.detectChanges();
        this._chart?.set('innerRadius', this.type !== 'solid' ? this._getDonutRadius() : undefined);
        this._setLabels();
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
        this._cdr.detectChanges();
        if (this._root)
            this._initChart();
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
        this._series?.data.setAll(this._data);
        if (this._legend)
            this._setLegend();
    }
    internalSectionTemplate;
    internalSectionEl;
    _chartContainer;
    _root;
    _rootInnerContainer;
    _chart;
    _series;
    _legend;
    _label;
    _isDarkTheme = false;
    _defaultTheme = null;
    _yOffset = 15;
    _legendColumns = 3;
    _showLegend = true;
    _tooltipText = '{valuePercentTotal}%';
    _layout = 'vertical';
    _disableHoverAnimation = false;
    _showLabels = false;
    _reverseDataSet = false;
    _internalSectionTextData = [];
    _type = 'donut-thin';
    _size = 'lg';
    _data = [];
    _sizeMap = new Map([
        ['sm', 88],
        ['md', 192],
        ['lg', 280],
    ]);
    _thicknessMap = new Map([
        ['donut-thin', { sm: 8, md: 12, lg: 16 }],
        ['donut-medium', { sm: 16, md: 20, lg: 24 }],
        ['donut-bold', { sm: 24, md: 32, lg: 40 }],
        ['donut-extra-bold', { sm: 32, md: 48, lg: 56 }],
    ]);
    _document = inject(DOCUMENT);
    _ngZone = inject(NgZone);
    _cdr = inject(ChangeDetectorRef);
    _destroy$ = inject(QDestroyService);
    _sharedMutationObserverService = inject(QSharedMutationObserverService);
    constructor() {
        this._subscribeToThemeChanges();
    }
    ngOnChanges(changes) {
        const { license } = changes;
        if (license?.currentValue) {
            this._addLicenseKey();
        }
    }
    ngAfterViewInit() {
        this._initChart();
    }
    ngOnDestroy() {
        this._ngZone.runOutsideAngular(() => {
            this._root?.dispose();
        });
    }
    _hideFirstTextDataSetLabel() {
        return this.size === 'sm';
    }
    _hideFirstTextDataSet() {
        return this.size === 'sm' && (this.type === 'donut-bold' || this.type === 'donut-extra-bold');
    }
    _hideSecondTextDataSet() {
        return this.size === 'sm' || (this.size === 'md' && this.type === 'donut-extra-bold');
    }
    _getTextValueCSSClasses() {
        if (this.size === 'md' && this.type === 'donut-extra-bold') {
            return 'medium-extra-bold';
        }
        else if (this.size === 'md') {
            return 'medium-thin';
        }
        else if (this.size === 'lg' && this.type === 'donut-extra-bold') {
            return 'large-extra-bold';
        }
        else if (this.size === 'lg') {
            return 'large-thin';
        }
        else
            return 'small-thin';
    }
    get _licenses() {
        return am5.registry.licenses;
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
    _initChart() {
        this._ngZone.runOutsideAngular(() => {
            if (!this._root) {
                this._root = am5.Root.new(this._chartContainer.nativeElement);
            }
            this._defaultTheme = QPieChartDefaultTheme.new(this._root);
            this._defaultTheme.update();
            this._root.setThemes([am5themes_Animated.new(this._root), this._defaultTheme]);
            this._setChart();
            this._setSeries();
            this._setLabels();
            if (this.showLegend) {
                this._setLegend();
            }
        });
    }
    _setChart() {
        if (this._root) {
            this._root.container.children.clear();
            this._rootInnerContainer = this._root.container.children.push(am5.Container.new(this._root, {
                centerX: am5.p50,
                x: am5.p50,
                layout: this.layout === 'horizontal' ? this._root.horizontalLayout : this._root.verticalLayout,
                y: this.yOffset,
            }));
            if (this.layout === 'vertical') {
                this._rootInnerContainer.setAll({
                    width: am5.p100,
                });
            }
            this._chart = this._rootInnerContainer.children.push(am5percent.PieChart.new(this._root, {
                radius: am5.p100,
                height: this._sizeMap.get(this.size) || null,
            }));
            this._chart?.set('innerRadius', this.type !== 'solid' ? this._getDonutRadius() : undefined);
            if (this.layout === 'horizontal') {
                this._chart.setAll({ width: (this._sizeMap.get(this.size) || 0) + 15, x: 15 });
            }
        }
    }
    _setSeries() {
        if (this._chart) {
            this._chart.series.clear();
            this._series = this._chart.series.push(am5percent.PieSeries.new(this._root, {
                name: 'QPieSeries',
                categoryField: 'category',
                valueField: 'value',
                fillField: 'color',
                legendLabelText: this.legendLabelText,
                legendValueText: this.legendValueText,
            }));
            this._setSeriesTooltip();
            this._setSeriesCustomColors();
            this._setSeriesSlices();
            this._series.events.on('datavalidated', () => {
                this._setRootHeight();
            });
            if (this.data.length) {
                this._series.data.setAll(this.data);
                this._series.appear().finally(() => void 0);
            }
        }
    }
    _setSeriesTooltip() {
        const tooltip = am5.Tooltip.new(this._root, {
            getFillFromSprite: false,
            autoTextColor: false,
            pointerOrientation: 'left',
            labelHTML: `
                <span class="q-pie-chart-tooltip">
                    ${this.tooltipText}
                </span>`,
            paddingBottom: 8,
            paddingTop: 8,
            paddingLeft: 12,
            paddingRight: 12,
        });
        if (this._defaultTheme &&
            this._defaultTheme.tooltipBackgroundColor &&
            this._defaultTheme.tooltipTextColor) {
            tooltip.get('background')?.setAll({
                fill: this._defaultTheme.tooltipBackgroundColor,
                fillOpacity: 1,
                strokeOpacity: 0,
            });
            tooltip.label.setAll({
                fill: this._defaultTheme.tooltipTextColor,
            });
        }
        this._series?.set('tooltip', tooltip);
    }
    _setSeriesCustomColors() {
        if (this.colors.length) {
            this._series.set('colors', am5.ColorSet.new(this._root, {
                colors: [...this.colors.map((color) => am5.color(color))],
                reuse: false,
                passOptions: {
                    lightness: 0.15,
                    hue: 0.8,
                },
            }));
        }
    }
    _setSeriesSlices() {
        // disable slice shift animation on click + add stroke around it
        this._series.slices.template.setAll({
            toggleKey: 'none',
            stroke: am5.color(this._isDarkTheme ? '#111317' : '#fff'),
        });
        if (this.disableHoverAnimation) {
            // disable default scaling animations on hover
            this._series.slices.template.states.create('hover', {
                scale: 1,
                shiftRadius: 0,
            });
        }
        if (this._defaultTheme && this._defaultTheme.textColor) {
            this._series.labels.template.setAll({
                text: this.labelText,
                fill: this._defaultTheme.textColor,
            });
            this._series.ticks.template.setAll({
                stroke: this._defaultTheme.textColor,
            });
        }
        if (!this.showLabels) {
            // remove labels
            this._series.labels.template.set('forceHidden', true);
            // remove lines under labels
            this._series.ticks.template.set('forceHidden', true);
        }
    }
    _setLegend() {
        this._rootInnerContainer.children.removeValue(this._legend);
        this._legend = this._rootInnerContainer.children.push(am5.Legend.new(this._root, {
            layout: am5.GridLayout.new(this._root, {
                maxColumns: this.legendColumns,
                fixedWidthGrid: true,
            }),
            visible: this.showLegend,
        }));
        if (this.layout === 'vertical') {
            this._legend.setAll({
                x: am5.p50,
                centerX: am5.p50,
                marginTop: 12,
                dx: 10,
            });
        }
        else if (this.layout === 'horizontal') {
            this._legend.setAll({
                y: am5.percent(50),
                centerY: am5.percent(50),
            });
            this._legend.itemContainers.template.setAll({
                marginLeft: 32,
            });
        }
        this._setLegendItems();
        this._legend.data.setAll(this._series.dataItems);
        this._legend.events.on('boundschanged', () => {
            this._setRootHeight();
        });
    }
    _setLegendItems() {
        this._legend.itemContainers.template.setAll({
            height: 22,
            marginTop: 6,
            marginBottom: 6,
        });
        this._legend.itemContainers.template.setup = (item) => {
            item.events.disableType('pointerover');
            item.events.disableType('click');
        };
        if (this._defaultTheme && this._defaultTheme.textColor) {
            this._legend.labels.template.setAll({
                oversizedBehavior: 'truncate',
                fill: this._defaultTheme.textColor,
            });
            this._legend.valueLabels.template.setAll({
                fill: this._defaultTheme.textColor,
            });
        }
        this._legend.markers.template.setAll({
            width: 12,
            height: 12,
        });
        this._legend.markerRectangles.template.setAll({
            cornerRadiusTL: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusBR: 10,
        });
    }
    _setLabels() {
        if (this._series && this.internalSectionEl) {
            this._series.children.removeValue(this._label);
            this._label?.dispose();
            if (this._type !== 'solid')
                this._label = this._series.children.push(am5.Label.new(this._root, {
                    html: this.internalSectionEl.nativeElement.innerHTML,
                    centerX: am5.percent(50),
                    centerY: am5.percent(50),
                }));
        }
    }
    _setRootHeight() {
        const chartHeight = this._sizeMap.get(this.size) || 1;
        const legendHeight = this._showLegend ? this._legend.height() : 0;
        const height = this._layout === 'vertical'
            ? chartHeight + legendHeight + this.yOffset * 2
            : Math.max(chartHeight, legendHeight) + this.yOffset * 2;
        this._root.dom.style.height = `${height}px`;
    }
    _getDonutRadius() {
        const thicknessType = this._thicknessMap.get(this.type);
        const mapSize = this._sizeMap.get(this.size);
        if (thicknessType && mapSize) {
            const thickness = thicknessType[this.size];
            return am5.percent(100 - (thickness * 2 * 100) / mapSize);
        }
        else {
            return am5.p100;
        }
    }
    _addLicenseKey() {
        if (!this._licenses.includes(this.license)) {
            am5.addLicense(this.license);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPieChartComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: QPieChartComponent, isStandalone: true, selector: "q-pie-chart", inputs: { legendLabelText: "legendLabelText", legendValueText: "legendValueText", labelText: "labelText", colors: "colors", license: "license", dataQt: "dataQt", yOffset: "yOffset", legendColumns: "legendColumns", showLegend: "showLegend", tooltipText: "tooltipText", layout: "layout", disableHoverAnimation: "disableHoverAnimation", showLabels: "showLabels", reverseDataSet: "reverseDataSet", internalSectionTextData: "internalSectionTextData", type: "type", size: "size", data: "data" }, host: { properties: { "attr.data-qt": "this.dataQt" } }, providers: [QDestroyService], queries: [{ propertyName: "internalSectionTemplate", first: true, predicate: ["internalSection"], descendants: true }], viewQueries: [{ propertyName: "internalSectionEl", first: true, predicate: ["internalSection"], descendants: true }, { propertyName: "_chartContainer", first: true, predicate: ["chartContainer"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div #chartContainer class=\"q-pie-chart\"></div>\n\n<div #internalSection class=\"q-pie-chart-internal-section\">\n  <ng-container *ngTemplateOutlet=\"internalSectionTemplate || defaultInternalSectionTemplate\" />\n  <ng-template #defaultInternalSectionTemplate>\n    <div class=\"q-pie-chart-text\">\n      @if (!_hideFirstTextDataSet()) {\n        <div class=\"q-pie-chart-text-data-set\" [class.q-pie-chart-reversed]=\"reverseDataSet\">\n          <div class=\"q-pie-chart-text-value\" [ngClass]=\"_getTextValueCSSClasses()\">\n            {{ internalSectionTextData.length ? internalSectionTextData[0].value : '' }}\n          </div>\n          @if (!_hideFirstTextDataSetLabel()) {\n            <div class=\"q-pie-chart-text-label\">\n              {{ internalSectionTextData.length ? internalSectionTextData[0].label : '' }}\n            </div>\n          }\n        </div>\n      }\n\n      @if (!_hideSecondTextDataSet()) {\n        <div class=\"q-pie-chart-text-data-set\" [class.q-pie-chart-reversed]=\"reverseDataSet\">\n          <div class=\"q-pie-chart-text-value\" [ngClass]=\"_getTextValueCSSClasses()\">\n            {{ internalSectionTextData.length > 1 ? internalSectionTextData[1].value : '' }}\n          </div>\n          <div class=\"q-pie-chart-text-label\">\n            {{ internalSectionTextData.length > 1 ? internalSectionTextData[1].label : '' }}\n          </div>\n        </div>\n      }\n    </div>\n  </ng-template>\n</div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-pie-chart-internal-section{display:none}.q-pie-chart-text{display:flex;flex-direction:column}.q-pie-chart-text-data-set{display:flex;flex-direction:column;text-align:center}.q-pie-chart-text-data-set.q-pie-chart-reversed{flex-direction:column-reverse}.q-pie-chart-text-label{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--pie-chart-text-label-color, var(--ads-color-body-600))}.q-pie-chart-text-value{color:var(--pie-chart-text-value-color, var(--ads-color-body-contrast-400))}.q-pie-chart-text-value.medium-extra-bold{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-pie-chart-text-value.medium-thin,.q-pie-chart-text-value.large-extra-bold{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-pie-chart-text-value.large-thin{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-pie-chart-text-value.small-thin{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-pie-chart .am5-focus-container div:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}span.q-pie-chart-tooltip{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--pie-chart-tt-color, var(--ads-color-body-contrast-700))}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: QPieChartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'q-pie-chart', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [NgClass, NgTemplateOutlet], providers: [QDestroyService], template: "<div #chartContainer class=\"q-pie-chart\"></div>\n\n<div #internalSection class=\"q-pie-chart-internal-section\">\n  <ng-container *ngTemplateOutlet=\"internalSectionTemplate || defaultInternalSectionTemplate\" />\n  <ng-template #defaultInternalSectionTemplate>\n    <div class=\"q-pie-chart-text\">\n      @if (!_hideFirstTextDataSet()) {\n        <div class=\"q-pie-chart-text-data-set\" [class.q-pie-chart-reversed]=\"reverseDataSet\">\n          <div class=\"q-pie-chart-text-value\" [ngClass]=\"_getTextValueCSSClasses()\">\n            {{ internalSectionTextData.length ? internalSectionTextData[0].value : '' }}\n          </div>\n          @if (!_hideFirstTextDataSetLabel()) {\n            <div class=\"q-pie-chart-text-label\">\n              {{ internalSectionTextData.length ? internalSectionTextData[0].label : '' }}\n            </div>\n          }\n        </div>\n      }\n\n      @if (!_hideSecondTextDataSet()) {\n        <div class=\"q-pie-chart-text-data-set\" [class.q-pie-chart-reversed]=\"reverseDataSet\">\n          <div class=\"q-pie-chart-text-value\" [ngClass]=\"_getTextValueCSSClasses()\">\n            {{ internalSectionTextData.length > 1 ? internalSectionTextData[1].value : '' }}\n          </div>\n          <div class=\"q-pie-chart-text-label\">\n            {{ internalSectionTextData.length > 1 ? internalSectionTextData[1].label : '' }}\n          </div>\n        </div>\n      }\n    </div>\n  </ng-template>\n</div>\n", styles: [".q-focus-indicator-inset,.q-focus-indicator{position:relative}.q-focus-indicator-inset:before,.q-focus-indicator:before{content:\"\";position:absolute;width:100%;height:100%;top:50%;left:50%;border-radius:inherit;box-sizing:border-box;pointer-events:none;translate:-50% -50%;opacity:0}.q-focus-indicator-inset:focus-visible,.q-focus-indicator:focus-visible{outline:none}.q-focus-indicator-inset:focus-visible:before,.q-focus-indicator:focus-visible:before{opacity:1}.q-focus-indicator:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-contrast-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}.q-focus-indicator-inset:before{border:var(--ads-size-quark) solid var(--ads-color-focus-indicator-400);box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset}.q-display-xl{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-display-l{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxl);text-transform:none}.q-display-m{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-display-s{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-display-xs{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-subtitle{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-l{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-m);text-transform:none}.q-body-m{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-body-s{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-overline{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-bold);letter-spacing:.1em;line-height:var(--ads-font-line-height-xxs);text-transform:uppercase}.q-note{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xxs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxs);text-transform:none}.q-cta-1{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-s);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-cta-2{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-semi-bold);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none}.q-pie-chart-internal-section{display:none}.q-pie-chart-text{display:flex;flex-direction:column}.q-pie-chart-text-data-set{display:flex;flex-direction:column;text-align:center}.q-pie-chart-text-data-set.q-pie-chart-reversed{flex-direction:column-reverse}.q-pie-chart-text-label{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--pie-chart-text-label-color, var(--ads-color-body-600))}.q-pie-chart-text-value{color:var(--pie-chart-text-value-color, var(--ads-color-body-contrast-400))}.q-pie-chart-text-value.medium-extra-bold{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xl);text-transform:none}.q-pie-chart-text-value.medium-thin,.q-pie-chart-text-value.large-extra-bold{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-l);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-l);text-transform:none}.q-pie-chart-text-value.large-thin{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-xxxl);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xxxl);text-transform:none}.q-pie-chart-text-value.small-thin{font-family:var(--ads-font-family-heading);font-size:var(--ads-font-size-m);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-s);text-transform:none}.q-pie-chart .am5-focus-container div:focus-visible{outline:none;box-shadow:0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-contrast-400) inset,0 0 0 var(--ads-size-quark) var(--ads-color-focus-indicator-400)}span.q-pie-chart-tooltip{font-family:var(--ads-font-family-body);font-size:var(--ads-font-size-xs);font-style:inherit;font-weight:var(--ads-font-weight-regular);letter-spacing:0;line-height:var(--ads-font-line-height-xs);text-transform:none;color:var(--pie-chart-tt-color, var(--ads-color-body-contrast-700))}\n"] }]
        }], ctorParameters: () => [], propDecorators: { legendLabelText: [{
                type: Input
            }], legendValueText: [{
                type: Input
            }], labelText: [{
                type: Input
            }], colors: [{
                type: Input
            }], license: [{
                type: Input
            }], dataQt: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.data-qt']
            }], yOffset: [{
                type: Input
            }], legendColumns: [{
                type: Input
            }], showLegend: [{
                type: Input
            }], tooltipText: [{
                type: Input
            }], layout: [{
                type: Input
            }], disableHoverAnimation: [{
                type: Input
            }], showLabels: [{
                type: Input
            }], reverseDataSet: [{
                type: Input
            }], internalSectionTextData: [{
                type: Input
            }], type: [{
                type: Input
            }], size: [{
                type: Input
            }], data: [{
                type: Input
            }], internalSectionTemplate: [{
                type: ContentChild,
                args: ['internalSection']
            }], internalSectionEl: [{
                type: ViewChild,
                args: ['internalSection']
            }], _chartContainer: [{
                type: ViewChild,
                args: ['chartContainer']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { QPieChartComponent };
//# sourceMappingURL=questrade-allspark-angular-components-pie-chart.mjs.map
