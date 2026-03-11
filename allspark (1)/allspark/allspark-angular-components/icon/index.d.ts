import { QIcon } from '@questrade/allspark-icons';
import * as i0 from '@angular/core';

declare class QIconRegistryService {
    private readonly _registry;
    registerIcon(icon: QIcon): void;
    registerIcons(icons: QIcon[]): void;
    hasIcon(iconName: string): boolean;
    getIcon(iconName: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QIconRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QIconRegistryService>;
}

type QIconSize = '12' | '16' | '20' | '24' | '40' | '48' | '56' | '80' | '128' | '400' | 'w-86' | 'w-103' | 'w-120';

/** @dynamic */
declare class QIconComponent {
    dataQt: string;
    get name(): string;
    set name(iconName: string);
    get size(): QIconSize;
    set size(size: QIconSize);
    /** @hidden */
    hostClass: string;
    get isFlag(): boolean;
    private _name;
    private _size;
    private _svgIcon;
    private readonly _elementRef;
    private readonly _renderer2;
    private readonly _iconRegistry;
    private readonly _document;
    private _svgElementFromString;
    private _updateSvgIcon;
    private _updateSize;
    static ɵfac: i0.ɵɵFactoryDeclaration<QIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QIconComponent, "q-icon", never, { "dataQt": { "alias": "dataQt"; "required": false; }; "name": { "alias": "name"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, ["*"], true, never>;
}

export { QIconComponent, QIconRegistryService };
export type { QIconSize };
