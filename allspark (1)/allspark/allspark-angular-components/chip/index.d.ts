import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

interface QChipChangeEvent<T> {
    value: T | null;
    active: boolean;
    nativeEvent: Event;
}

type QChipCheckVariant = 'none' | 'single' | 'multiple' | 'toggle';

type QChipIconPosition = 'left' | 'right';

type QChipTextStyle = 'primary' | 'secondary';

type QChipVariant = 'regular' | 'outlined' | 'text' | 'alternative';

declare class QChipComponent<T> implements ControlValueAccessor {
    readonly changed: EventEmitter<QChipChangeEvent<T>>;
    readonly iconClicked: EventEmitter<string>;
    isIconChip: boolean;
    toggleActiveIconColor: string | null;
    toggleOnClick: boolean;
    isDropdown: boolean;
    error: boolean;
    readonly: boolean;
    value: T | null;
    iconPosition: QChipIconPosition;
    textStyle: QChipTextStyle;
    dataQt: string;
    set type(value: QChipVariant);
    get type(): QChipVariant;
    set showCheckIcon(value: boolean);
    get showCheckIcon(): boolean;
    set checkType(value: QChipCheckVariant);
    get checkType(): QChipCheckVariant;
    set active(value: boolean);
    get active(): boolean;
    set toggleActiveIcon(value: string);
    get _toggleActiveIconName(): string;
    set disabled(value: boolean);
    get disabled(): boolean;
    set icon(value: string);
    get toggleRightIcon(): string;
    set toggleRightIcon(value: string);
    _isMultipleCheckTypeAndNotText: boolean;
    _iconStyles: {};
    _textStyles: {};
    _isSelectable: boolean;
    _showIconName: string;
    _iconName: string;
    _toggleRightIcon: string;
    _toggleActiveIcon: string;
    _active: boolean;
    _type: QChipVariant;
    _checkType: QChipCheckVariant;
    _disabled: boolean;
    _showCheckIcon: boolean;
    private _onChange;
    private _onTouch;
    private readonly _cdr;
    private readonly _iconRegistry;
    constructor();
    /** @hidden */
    writeValue(value: boolean): void;
    /** @hidden */
    registerOnChange(fn: (_: boolean) => void): void;
    /** @hidden */
    registerOnTouched(fn: () => void): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    /** @hidden */
    setActiveValue(value: boolean): void;
    _onIconClick(iconName: string): void;
    _onElementClick(event: Event): void;
    _onKeyPress(event: KeyboardEvent): void;
    get classNames(): string;
    get hasLeftIcon(): boolean;
    get hasRightIcon(): boolean;
    private _setShowIcon;
    private _applyChanges;
    private _toggle;
    static ɵfac: i0.ɵɵFactoryDeclaration<QChipComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QChipComponent<any>, "q-chip", never, { "isIconChip": { "alias": "isIconChip"; "required": false; }; "toggleActiveIconColor": { "alias": "toggleActiveIconColor"; "required": false; }; "toggleOnClick": { "alias": "toggleOnClick"; "required": false; }; "isDropdown": { "alias": "isDropdown"; "required": false; }; "error": { "alias": "error"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "value": { "alias": "value"; "required": false; }; "iconPosition": { "alias": "iconPosition"; "required": false; }; "textStyle": { "alias": "textStyle"; "required": false; }; "dataQt": { "alias": "dataQt"; "required": false; }; "type": { "alias": "type"; "required": false; }; "showCheckIcon": { "alias": "showCheckIcon"; "required": false; }; "checkType": { "alias": "checkType"; "required": false; }; "active": { "alias": "active"; "required": false; }; "toggleActiveIcon": { "alias": "toggleActiveIcon"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "toggleRightIcon": { "alias": "toggleRightIcon"; "required": false; }; }, { "changed": "changed"; "iconClicked": "iconClicked"; }, never, ["*"], true, never>;
    static ngAcceptInputType_isIconChip: unknown;
    static ngAcceptInputType_toggleOnClick: unknown;
    static ngAcceptInputType_isDropdown: unknown;
    static ngAcceptInputType_error: unknown;
    static ngAcceptInputType_readonly: unknown;
}

export { QChipComponent };
export type { QChipChangeEvent, QChipCheckVariant, QChipIconPosition, QChipTextStyle, QChipVariant };
