import { ElementRef, Renderer2, Injector, DestroyRef } from '@angular/core';
import { NgControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcherInterface } from '@questrade/allspark-angular-components/form-control';
import { Subject, ReplaySubject } from 'rxjs';

type ArrayChangesTypeValues<T> = T[] | null | undefined;
declare const arrayDifference: <T>(items: ArrayChangesTypeValues<T>, excluded: ArrayChangesTypeValues<T>, compareFn?: (a: T, b: T) => boolean) => ArrayChangesTypeValues<T>;
interface ArrayChangesType<T> {
    addedValues: ArrayChangesTypeValues<T>;
    removedValues: ArrayChangesTypeValues<T>;
}
declare const arrayChanges: <T>(previous: ArrayChangesTypeValues<T>, current: ArrayChangesTypeValues<T>) => ArrayChangesType<T>;
declare const applyArrayChanges: <T>(changes: {
    addedValues: ArrayChangesTypeValues<T>;
    removedValues: ArrayChangesTypeValues<T>;
}, applyAddedFn: (value: T) => void, applyRemovedFn?: (value: T) => void) => void;
declare const range: <T>(length: number, valueFunction: (index: number) => T) => ArrayChangesTypeValues<T>;

declare const DEFAULT_ATTRIBUTE_VALUES_SPLITTER: RegExp;
type AttributePropType = string | string[];
declare const splitAttributeValues: (attributeProp: AttributePropType, splitter?: RegExp | string) => string[];
declare const calculateAttributeChanges: (previous: AttributePropType, current: AttributePropType, splitter?: RegExp | string) => ArrayChangesType<string>;
declare const applyAttributeChanges: (previousValue: AttributePropType, currentValue: AttributePropType, applyAttributeFn: (value: string) => void, removeAttributeFn: (value: string) => void, shouldApplyChange?: (value: string, isNew: boolean) => boolean, splitter?: RegExp | string) => void;
declare const applyClassChanges: (previousValue: AttributePropType, currentValue: AttributePropType, targetElementRef: ElementRef, renderer: Renderer2, mapTypeToClassFn: (value: string) => string, isSupportedTypeFn?: (value: string, isNew: boolean) => boolean, splitter?: RegExp | string) => void;

declare const COLOR_THEMES: string[];
declare const COLOR_PALETTES: string[];
declare const COLOR_TONES: string[];
declare const GREY: {
    name: string;
    light: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    dark: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    lightList: string[];
    darkList: string[];
};
declare const GREEN: {
    name: string;
    light: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    dark: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    lightList: string[];
    darkList: string[];
};
declare const BLUE: {
    name: string;
    light: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    dark: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    lightList: string[];
    darkList: string[];
};
declare const RED: {
    name: string;
    light: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    dark: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    lightList: string[];
    darkList: string[];
};
declare const YELLOW: {
    name: string;
    light: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    dark: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    lightList: string[];
    darkList: string[];
};
declare const ORANGE: {
    name: string;
    light: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    dark: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    lightList: string[];
    darkList: string[];
};
declare const PURPLE: {
    name: string;
    light: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    dark: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    lightList: string[];
    darkList: string[];
};
declare const PINK: {
    name: string;
    lightList: string[];
    darkList: string[];
};
declare const BEIGE: {
    name: string;
    lightList: string[];
    darkList: string[];
};
declare const PROFIT: {
    name: string;
    lightList: string[];
    darkList: string[];
};
declare const LOSS: {
    name: string;
    lightList: string[];
    darkList: string[];
};
declare const COLORS: {
    name: string;
    lightList: string[];
    darkList: string[];
}[];

/**
 * Shadow DOM–aware querySelector utilities. They work in light DOM and open shadow roots.
 */
/**
 * Returns all elements matching the selector, searching across open shadow roots starting at document.
 *
 * Notes:
 * - Traverses into open shadow roots. Closed shadow roots cannot be queried.
 * - Very broad selectors may impact performance due to deep traversal.
 *
 * @typeParam T - Expected element type
 * @param selector CSS selector to match
 * @returns Array of matching elements (possibly empty)
 */
declare function querySelectorAllDeep<T extends Element = Element>(selector: string): T[];
/**
 * Returns the first element matching the selector, searching across open shadow roots starting at document.
 *
 * Notes:
 * - Traverses into open shadow roots. Closed shadow roots cannot be queried.
 * - Very broad selectors may impact performance due to deep traversal.
 *
 * @typeParam T - Expected element type
 * @param selector CSS selector to match
 * @returns The first matching element, or null if none found
 */
declare function querySelectorDeep<T extends Element = Element>(selector: string): T | null;

declare class ErrorState {
    private _parentFormGroup;
    private _parentForm;
    /** @hidden */
    ngControl: NgControl;
    /** @hidden */
    stateChanges: Subject<void>;
    errorState: boolean;
    /** @hidden */
    /** An object used to control the error state of the component. */
    errorStateMatcher: ErrorStateMatcherInterface;
    constructor(_parentFormGroup: FormGroupDirective | null, _parentForm: NgForm | null);
    /** Updates the error state based on the provided error state matcher. */
    _updateErrorState(): void;
}

/**
 * Injects the `DestroyRef` service and returns a `ReplaySubject` that emits
 * when the component is destroyed.
 *
 * @throws {Error} If no `DestroyRef` is found.
 * @returns {ReplaySubject<void>} A `ReplaySubject` that emits when the component is destroyed.
 *
 * @example
 * // In your component:
 * export class MyComponent implements OnInit {
 *   private readonly _destroy$ = injectDestroy();
 *
 *   ngOnInit(): void {
 *     return this.service.getData()
 *       .pipe(takeUntil(this._destroy$))
 *       .subscribe(data => {});
 *
 *     // The value returned by injectDestroy() also includes onDestroy() function to register arbitrary destroy logic callbacks.
 *     this.destroy$.onDestroy(() => {
 *     // other destroy logics, similar to DestroyRef#onDestroy
 *     });
 *   }
 * }
 */
declare const injectDestroy: (injector?: Injector) => ReplaySubject<void> & {
    onDestroy: DestroyRef["onDestroy"];
};

/**
 * Checks value not to be null or undefined
 * @param value Value to be checekd.
 */
declare const isPresent: <T>(value?: T | null) => value is T;

declare const ENTER = "Enter";
declare const ESCAPE = "Escape";
declare const DOWN_ARROW = "ArrowDown";
declare const LEFT_ARROW = "ArrowLeft";
declare const RIGHT_ARROW = "ArrowRight";
declare const UP_ARROW = "ArrowUp";
declare const SPACE = "Space";
declare const TAB = "Tab";
declare const HOME = "Home";
declare const END = "End";
declare const PAGE_UP = "PageUp";
declare const PAGE_DOWN = "PageDown";

/**
 * Logs a warning to the console with an Allspark prefix
 * to indicate the library that is warning the developer.
 *
 * @param message - The string message to be logged to the console.
 * @param params - Additional arguments to supply to the console.warn.
 */
declare const printAllsparkWarning: (message: string, ...params: unknown[]) => void;
/**
 * Logs an error to the console with an Allspark prefix
 * to indicate the library that is warning the developer.
 *
 * @param message - The string message to be logged to the console.
 * @param params - Additional arguments to supply to the console.error.
 */
declare const printAllsparkError: (message: string, ...params: unknown[]) => void;

/** Generates a random string. */
declare const randomString: () => string;

declare const isMobilePhone: () => boolean;
declare const isMobileScreen: () => boolean;

declare const nGramScore: (word1: string, word2: string, caseSensitive?: boolean, gramSize?: number) => number;

declare const capitalize: (text: string) => string;

declare const voidFn: () => void;

export { BEIGE, BLUE, COLORS, COLOR_PALETTES, COLOR_THEMES, COLOR_TONES, DEFAULT_ATTRIBUTE_VALUES_SPLITTER, DOWN_ARROW, END, ENTER, ESCAPE, ErrorState, GREEN, GREY, HOME, LEFT_ARROW, LOSS, ORANGE, PAGE_DOWN, PAGE_UP, PINK, PROFIT, PURPLE, RED, RIGHT_ARROW, SPACE, TAB, UP_ARROW, YELLOW, applyArrayChanges, applyAttributeChanges, applyClassChanges, arrayChanges, arrayDifference, calculateAttributeChanges, capitalize, injectDestroy, isMobilePhone, isMobileScreen, isPresent, nGramScore, printAllsparkError, printAllsparkWarning, querySelectorAllDeep, querySelectorDeep, randomString, range, splitAttributeValues, voidFn };
export type { ArrayChangesType, AttributePropType };
