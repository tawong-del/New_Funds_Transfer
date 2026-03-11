import { Subject, ReplaySubject } from 'rxjs';
import { assertInInjectionContext, inject, Injector, runInInjectionContext, DestroyRef } from '@angular/core';

const arrayDifference = (items, excluded, compareFn = (a, b) => a === b) => items?.filter((item) => !excluded || excluded.every((excludedItem) => !compareFn(item, excludedItem))) ?? [];
const arrayChanges = (previous, current) => ({
    addedValues: arrayDifference(current, previous),
    removedValues: arrayDifference(previous, current),
});
const applyArrayChanges = (changes, applyAddedFn, applyRemovedFn = applyAddedFn) => {
    changes.addedValues?.forEach(applyAddedFn);
    changes.removedValues?.forEach(applyRemovedFn);
};
const range = (length, valueFunction) => Array.from({ length }, (_, i) => valueFunction(i));

const DEFAULT_ATTRIBUTE_VALUES_SPLITTER = /(?:,| )+/;
const splitAttributeValues = (attributeProp, splitter = DEFAULT_ATTRIBUTE_VALUES_SPLITTER) => attributeProp
    ? (Array.isArray(attributeProp) ? attributeProp : [attributeProp])
        .reduce((allValues, item) => allValues.concat(item?.split(splitter) ?? []), [])
        .filter((value) => Boolean(value))
    : [];
const calculateAttributeChanges = (previous, current, splitter = DEFAULT_ATTRIBUTE_VALUES_SPLITTER) => arrayChanges(splitAttributeValues(previous, splitter), splitAttributeValues(current, splitter));
const applyAttributeChanges = (previousValue, currentValue, applyAttributeFn, removeAttributeFn, shouldApplyChange, splitter = DEFAULT_ATTRIBUTE_VALUES_SPLITTER) => applyArrayChanges(calculateAttributeChanges(previousValue, currentValue, splitter), (value) => (!shouldApplyChange || shouldApplyChange(value, true)) && applyAttributeFn(value), (value) => (!shouldApplyChange || shouldApplyChange(value, true)) && removeAttributeFn(value));
const applyClassChanges = (previousValue, currentValue, targetElementRef, renderer, mapTypeToClassFn, isSupportedTypeFn, splitter = DEFAULT_ATTRIBUTE_VALUES_SPLITTER) => applyAttributeChanges(previousValue, currentValue, (value) => renderer.addClass(targetElementRef.nativeElement, mapTypeToClassFn(value)), (value) => renderer.removeClass(targetElementRef.nativeElement, mapTypeToClassFn(value)), isSupportedTypeFn, splitter);

const COLOR_THEMES = ['light', 'dark'];
const COLOR_PALETTES = [
    'grey',
    'green',
    'blue',
    'red',
    'yellow',
    'orange',
    'purple',
    'pink',
    'beige',
    'profit',
    'loss',
];
const COLOR_TONES = ['lightest', 'lighter', 'light', 'default', 'dark', 'darker', 'darkest'];
const GREY = {
    name: 'grey',
    light: {
        lightest: '#ffffff',
        lighter: '#f8f8fa',
        light: '#f2f2f8',
        default: '#ced6e2',
        dark: '#78899f',
        darker: '#5e6d83',
        darkest: '#262d33',
    },
    dark: {
        lightest: '#f2f2f8',
        lighter: '#8e97ad',
        light: '#6a7687',
        default: '#313a45',
        dark: '#262d33',
        darker: '#111317',
        darkest: '#07090a',
    },
    lightList: ['#ffffff', '#f8f8fa', '#f2f2f8', '#ced6e2', '#78899f', '#5e6d83', '#262d33'],
    darkList: ['#f2f2f8', '#8e97ad', '#6a7687', '#313a45', '#262d33', '#111317', '#07090a'],
};
const GREEN = {
    name: 'green',
    light: {
        lightest: '#ebf7eb',
        lighter: '#addeaf',
        light: '#5dbe62',
        default: '#389b3c',
        dark: '#227c20',
        darker: '#217024',
        darkest: '#1c5f1f',
    },
    dark: {
        lightest: '#8fd292',
        lighter: '#7bca7e',
        light: '#56bb5b',
        default: '#389b3c',
        dark: '#227c20',
        darker: '#144416',
        darkest: '#0a210b',
    },
    lightList: ['#ebf7eb', '#addeaf', '#5dbe62', '#389b3c', '#227c20', '#217024', '#1c5f1f'],
    darkList: ['#8fd292', '#7bca7e', '#56bb5b', '#389b3c', '#227c20', '#144416', '#0a210b'],
};
const BLUE = {
    name: 'blue',
    light: {
        lightest: '#e2f0ff',
        lighter: '#8bc1ff',
        light: '#1682ff',
        default: '#0066db',
        dark: '#0055b6',
        darker: '#00428f',
        darkest: '#003878',
    },
    dark: {
        lightest: '#84bdff',
        lighter: '#6db1ff',
        light: '#449bff',
        default: '#1e87ff',
        dark: '#066ade',
        darker: '#03346f',
        darkest: '#011a38',
    },
    lightList: ['#e2f0ff', '#8bc1ff', '#1682ff', '#0066db', '#0055b6', '#00428f', '#003878'],
    darkList: ['#84bdff', '#6db1ff', '#449bff', '#1e87ff', '#066ade', '#03346f', '#011a38'],
};
const RED = {
    name: 'red',
    light: {
        lightest: '#fee9ec',
        lighter: '#f9a5b2',
        light: '#f54c64',
        default: '#d33e54',
        dark: '#c91a33',
        darker: '#9d1328',
        darkest: '#851021',
    },
    dark: {
        lightest: '#ff9caa',
        lighter: '#ff8a9a',
        light: '#ff697f',
        default: '#ff4b65',
        dark: '#ce3a4f',
        darker: '#671d28',
        darkest: '#330e14',
    },
    lightList: ['#fee9ec', '#f9a5b2', '#f54c64', '#d33e54', '#c91a33', '#9d1328', '#851021'],
    darkList: ['#ff9caa', '#ff8a9a', '#ff697f', '#ff4b65', '#ce3a4f', '#671d28', '#330e14'],
};
const YELLOW = {
    name: 'yellow',
    light: {
        lightest: '#fef8e2',
        lighter: '#fce287',
        light: '#fbc610',
        default: '#cea000',
        dark: '#ab8400',
        darker: '#866800',
        darkest: '#715800',
    },
    dark: {
        lightest: '#ffe897',
        lighter: '#ffdf75',
        light: '#ffd548',
        default: '#ffcb1a',
        dark: '#d2a200',
        darker: '#624b00',
        darkest: '#2a2100',
    },
    lightList: ['#fef8e2', '#fce287', '#fbc610', '#cea000', '#ab8400', '#866800', '#715800'],
    darkList: ['#ffe897', '#ffdf75', '#ffd548', '#ffcb1a', '#d2a200', '#624b00', '#2a2100'],
};
const ORANGE = {
    name: 'orange',
    light: {
        lightest: '#fff2e9',
        lighter: '#ffc9a8',
        light: '#ff9451',
        default: '#ed7d37',
        dark: '#e5600e',
        darker: '#b34b0b',
        darkest: '#974009',
    },
    dark: {
        lightest: '#ffbc91',
        lighter: '#ffaf7c',
        light: '#ff9958',
        default: '#ff8436',
        dark: '#da671e',
        darker: '#6d330f',
        darkest: '#361907',
    },
    lightList: ['#fff2e9', '#ffc9a8', '#ff9451', '#ed7d37', '#e5600e', '#b34b0b', '#974009'],
    darkList: ['#ffbc91', '#ffaf7c', '#ff9958', '#ff8436', '#da671e', '#6d330f', '#361907'],
};
const PURPLE = {
    name: 'purple',
    light: {
        lightest: '#f7ebf8',
        lighter: '#daade4',
        light: '#b459c9',
        default: '#9545a8',
        dark: '#86279d',
        darker: '#691f7a',
        darkest: '#591a67',
    },
    dark: {
        lightest: '#e1a4ef',
        lighter: '#db93eb',
        light: '#d075e5',
        default: '#c759e1',
        dark: '#a047b4',
        darker: '#50245a',
        darkest: '#27122d',
    },
    lightList: ['#f7ebf8', '#daade4', '#b459c9', '#9545a8', '#86279d', '#691f7a', '#591a67'],
    darkList: ['#e1a4ef', '#db93eb', '#d075e5', '#c759e1', '#a047b4', '#50245a', '#27122d'],
};
const PINK = {
    name: 'pink',
    lightList: ['#e22c79'],
    darkList: ['#fe4894'],
};
const BEIGE = {
    name: 'beige',
    lightList: ['#faf6f5', '#f4eae6'],
    darkList: ['#faf6f5', '#f4eae6'],
};
const PROFIT = {
    name: 'profit',
    lightList: ['#e4f5ef', '#159a62', '#087346'],
    darkList: ['#6bc895', '#298646', '#143128'],
};
const LOSS = {
    name: 'loss',
    lightList: ['#ffece8', '#e94b41', '#b41005'],
    darkList: ['#fa6286', '#fe4d6d', '#411722'],
};
const COLORS = [GREY, GREEN, BLUE, RED, YELLOW, ORANGE, PURPLE, PINK, BEIGE, PROFIT, LOSS];

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
function querySelectorAllDeep(selector) {
    if (!selector || !selector.trim())
        return [];
    return _querySelectorDeep(selector, true, document, null);
}
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
function querySelectorDeep(selector) {
    if (!selector || !selector.trim())
        return null;
    // Prefer the light DOM (document) first; traversal will descend into open shadow roots as needed.
    return _querySelectorDeep(selector, false, document, null);
}
// Core implementation for deep querying within a given root
function _querySelectorDeep(selector, findMany, root, allElements = null) {
    selector = normalizeSelector(selector);
    const lightElement = querySelectorOnRoot(root, selector);
    if (supportsShadowDom()) {
        // no need to do any special if selector matches something specific in light-dom
        if (!findMany && lightElement) {
            return lightElement;
        }
        // split on commas because those are a logical divide in the operation
        const selectionsToMake = splitByCharacterUnlessQuoted(selector, ',');
        if (findMany) {
            const results = [];
            for (const minimalSelector of selectionsToMake) {
                const splitSelector = splitAndNormalizeSelector(minimalSelector);
                const possibleElementsIndex = splitSelector.length - 1;
                const lastSplitPart = splitSelector[possibleElementsIndex][splitSelector[possibleElementsIndex].length - 1];
                const possibleElements = collectAllElementsDeep(lastSplitPart, root, allElements);
                const findElements = findMatchingElement(splitSelector, possibleElementsIndex, root);
                results.push(...possibleElements.filter(findElements));
            }
            return results;
        }
        else {
            for (const minimalSelector of selectionsToMake) {
                const splitSelector = splitAndNormalizeSelector(minimalSelector);
                const possibleElementsIndex = splitSelector.length - 1;
                const lastSplitPart = splitSelector[possibleElementsIndex][splitSelector[possibleElementsIndex].length - 1];
                const possibleElements = collectAllElementsDeep(lastSplitPart, root, allElements);
                const findElements = findMatchingElement(splitSelector, possibleElementsIndex, root);
                const found = possibleElements.find(findElements) || null;
                if (found)
                    return found;
            }
            return null;
        }
    }
    else {
        if (!findMany) {
            return lightElement;
        }
        else {
            return querySelectorAllOnRoot(root, selector);
        }
    }
}
// Basic feature check used to decide whether to traverse shadow roots
function supportsShadowDom() {
    return typeof Element !== 'undefined' && 'attachShadow' in Element.prototype;
}
// Safe querySelector wrapper that works for Document, Element and ShadowRoot
function querySelectorOnRoot(root, selector) {
    if ('querySelector' in root && typeof root.querySelector === 'function') {
        return root.querySelector(selector);
    }
    return null;
}
// Safe querySelectorAll wrapper that works for Document, Element and ShadowRoot
function querySelectorAllOnRoot(root, selector) {
    if ('querySelectorAll' in root && typeof root.querySelectorAll === 'function') {
        return Array.from(root.querySelectorAll(selector));
    }
    return [];
}
// Normalizes and splits a complex selector into parts to support deep matching
function splitAndNormalizeSelector(minimalSelector) {
    return splitByCharacterUnlessQuoted(minimalSelector.replace(/^\s+/g, '').replace(/\s*([>+~]+)\s*/g, '$1'), ' ')
        .filter((entry) => !!entry)
        .map((entry) => splitByCharacterUnlessQuoted(entry, '>'));
}
// Returns a predicate that tests whether an element matches the split selector chain upwards
function findMatchingElement(splitSelector, possibleElementsIndex, root) {
    return (element) => {
        let position = possibleElementsIndex;
        let parent = element;
        let foundElement = false;
        while (parent && !isDocumentNode(parent)) {
            let foundMatch = true;
            if (splitSelector[position].length === 1) {
                foundMatch = parent.matches(splitSelector[position][0]);
            }
            else {
                // selector is in the format "a > b"
                // make sure a few parents match in order
                const reversedParts = [].concat(splitSelector[position]).reverse();
                let newParent = parent;
                for (const part of reversedParts) {
                    if (!newParent || !newParent.matches(part)) {
                        foundMatch = false;
                        break;
                    }
                    const next = findParentOrHost(newParent, root);
                    newParent = next && !isDocumentNode(next) ? next : null;
                }
            }
            if (foundMatch && position === 0) {
                foundElement = true;
                break;
            }
            if (foundMatch) {
                position--;
            }
            if (parent && parent.nodeType === Node.ELEMENT_NODE) {
                parent = findParentOrHost(parent, root);
            }
            else {
                parent = null;
            }
        }
        return foundElement;
    };
}
// Splits a string by a character, ignoring occurrences inside single/double quotes
function splitByCharacterUnlessQuoted(selector, character) {
    const initial = { a: [''], quote: 0, sQuote: 0 };
    const matches = selector.match(/\\?.|^$/g);
    if (!matches)
        return [''];
    return matches.reduce((p, c) => {
        if (c === '"' && !p.sQuote) {
            p.quote ^= 1;
            p.a[p.a.length - 1] += c;
        }
        else if (c === "'" && !p.quote) {
            p.sQuote ^= 1;
            p.a[p.a.length - 1] += c;
        }
        else if (!p.quote && !p.sQuote && c === character) {
            p.a.push('');
        }
        else {
            p.a[p.a.length - 1] += c;
        }
        return p;
    }, initial).a;
}
// True if the node is a Document or DocumentFragment (including ShadowRoot)
function isDocumentNode(node) {
    return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_NODE;
}
function findParentOrHost(element, root) {
    const parentNode = element.parentNode;
    if (!parentNode)
        return null;
    if (parentNode instanceof ShadowRoot)
        return parentNode.host;
    if (parentNode === root)
        return null;
    return parentNode;
}
// Collects all elements under the given root, including descendants inside open shadow roots
function collectAllElementsDeep(selector = null, root, cachedElements = null) {
    let allElements = [];
    if (cachedElements) {
        allElements = cachedElements;
    }
    else {
        const findAllElements = (nodes) => {
            for (const el of Array.from(nodes)) {
                allElements.push(el);
                const shadowRoot = el.shadowRoot;
                if (shadowRoot) {
                    findAllElements(shadowRoot.querySelectorAll('*'));
                }
            }
        };
        if ('shadowRoot' in root && root.shadowRoot) {
            const shadowRoot = root.shadowRoot;
            findAllElements(shadowRoot.querySelectorAll('*'));
        }
        findAllElements(root.querySelectorAll('*'));
    }
    return selector
        ? allElements.filter((el) => el.matches(selector))
        : allElements;
}
// Normalizes a CSS selector string for consistent tokenization and splitting
function normalizeSelector(sel) {
    function saveUnmatched() {
        if (unmatched) {
            if (tokens.length > 0 && /^[~+>]$/.test(tokens[tokens.length - 1])) {
                tokens.push(' ');
            }
            tokens.push(unmatched);
        }
    }
    const tokens = [];
    let match;
    let unmatched;
    let prev_match_idx;
    const state = [0];
    let next_match_idx = 0;
    const not_escaped_pattern = /(?:[^\\]|(?:^|[^\\])(?:\\\\)+)$/;
    const whitespace_pattern = /^\s+$/;
    const state_patterns = [
        /\s+|\/\*|["'>~+[(]/g,
        /\s+|\/\*|["'[\]()]/g,
        /\s+|\/\*|["'[\]()]/g,
        null,
        /\*\//g,
    ];
    sel = sel.trim();
    let done = false;
    while (!done) {
        unmatched = '';
        const currentPattern = state_patterns[state[state.length - 1]];
        if (!currentPattern) {
            // Handle null pattern (string literal state)
            done = true;
            break;
        }
        currentPattern.lastIndex = next_match_idx;
        match = currentPattern.exec(sel);
        if (match) {
            prev_match_idx = next_match_idx;
            next_match_idx = currentPattern.lastIndex;
            if (prev_match_idx < next_match_idx - match[0].length) {
                unmatched = sel.substring(prev_match_idx, next_match_idx - match[0].length);
            }
            if (state[state.length - 1] < 3) {
                saveUnmatched();
                if (match[0] === '[') {
                    state.push(1);
                }
                else if (match[0] === '(') {
                    state.push(2);
                }
                else if (/^["']$/.test(match[0])) {
                    state.push(3);
                    state_patterns[3] = new RegExp(match[0], 'g');
                }
                else if (match[0] === '/*') {
                    state.push(4);
                }
                else if (/^[\])]$/.test(match[0]) && state.length > 0) {
                    state.pop();
                }
                else if (/^(?:\s+|[~+>])$/.test(match[0])) {
                    if (tokens.length > 0 &&
                        !whitespace_pattern.test(tokens[tokens.length - 1]) &&
                        state[state.length - 1] === 0) {
                        tokens.push(' ');
                    }
                    if (state[state.length - 1] === 1 &&
                        tokens.length === 5 &&
                        tokens[2].charAt(tokens[2].length - 1) === '=') {
                        tokens[4] = ' ' + tokens[4];
                    }
                    if (whitespace_pattern.test(match[0])) {
                        continue;
                    }
                }
                tokens.push(match[0]);
            }
            else {
                tokens[tokens.length - 1] += unmatched;
                if (not_escaped_pattern.test(tokens[tokens.length - 1])) {
                    if (state[state.length - 1] === 4) {
                        if (tokens.length < 2 || whitespace_pattern.test(tokens[tokens.length - 2])) {
                            tokens.pop();
                        }
                        else {
                            tokens[tokens.length - 1] = ' ';
                        }
                        match[0] = '';
                    }
                    state.pop();
                }
                tokens[tokens.length - 1] += match[0];
            }
        }
        else {
            unmatched = sel.slice(next_match_idx);
            saveUnmatched();
            done = true;
        }
    }
    return tokens.join('').trim();
}

class ErrorState {
    _parentFormGroup;
    _parentForm;
    /** @hidden */
    ngControl;
    /** @hidden */
    stateChanges = new Subject();
    errorState = false;
    /** @hidden */
    /** An object used to control the error state of the component. */
    errorStateMatcher;
    constructor(_parentFormGroup, _parentForm) {
        this._parentFormGroup = _parentFormGroup;
        this._parentForm = _parentForm;
    }
    /** Updates the error state based on the provided error state matcher. */
    _updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const matcher = this.errorStateMatcher;
        const control = this.ngControl ? this.ngControl.control : null;
        const newState = matcher.isErrorState(control, parent);
        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }
}

function assertInjector(fn, injector, runner) {
    !injector && assertInInjectionContext(fn);
    const assertedInjector = injector ?? inject(Injector);
    if (!runner)
        return assertedInjector;
    return runInInjectionContext(assertedInjector, runner);
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
const injectDestroy = (injector) => {
    injector = assertInjector(injectDestroy, injector);
    return runInInjectionContext(injector, () => {
        const destroyRef = inject(DestroyRef);
        const subject$ = new ReplaySubject(1);
        destroyRef.onDestroy(() => {
            subject$.next();
            subject$.complete();
        });
        Object.assign(subject$, {
            onDestroy: destroyRef.onDestroy.bind(destroyRef),
        });
        return subject$;
    });
};

/**
 * Checks value not to be null or undefined
 * @param value Value to be checekd.
 */
const isPresent = (value) => value !== null && value !== undefined;

const ENTER = 'Enter';
const ESCAPE = 'Escape';
const DOWN_ARROW = 'ArrowDown';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const UP_ARROW = 'ArrowUp';
const SPACE = 'Space';
const TAB = 'Tab';
const HOME = 'Home';
const END = 'End';
const PAGE_UP = 'PageUp';
const PAGE_DOWN = 'PageDown';

/**
 * Logs a warning to the console with an Allspark prefix
 * to indicate the library that is warning the developer.
 *
 * @param message - The string message to be logged to the console.
 * @param params - Additional arguments to supply to the console.warn.
 */
const printAllsparkWarning = (message, ...params) => {
    console.warn(`[Allspark Warning]: ${message}`, ...params);
};
/**
 * Logs an error to the console with an Allspark prefix
 * to indicate the library that is warning the developer.
 *
 * @param message - The string message to be logged to the console.
 * @param params - Additional arguments to supply to the console.error.
 */
const printAllsparkError = (message, ...params) => {
    console.error(`[Allspark Error]: ${message}`, ...params);
};

/** Generates a random string. */
const randomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charCount = characters.length;
    let randomString = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charCount);
        randomString += characters.charAt(randomIndex);
    }
    const timestampPart = Date.now().toString(36);
    randomString += timestampPart;
    return randomString;
};

const isMobilePhone = () => /i(P(hone|ad|od)|OS)|Android/i.test(navigator?.userAgent);
const isMobileScreen = () => window?.innerWidth <= 599;

const nGramScore = (word1, word2, caseSensitive = false, gramSize = 2) => {
    if (!word1?.length || !word2?.length) {
        return 0.0;
    }
    if (!caseSensitive) {
        word1 = word1.toLocaleLowerCase();
        word2 = word2.toLocaleLowerCase();
    }
    const firstString = word1.length < word2.length ? word1 : word2;
    const secondString = word1.length < word2.length ? word2 : word1;
    const firstStringNGramPairs = getNGrams(firstString, gramSize);
    const secondStringNGramPairs = getNGrams(secondString, gramSize);
    const firstStringNGramsSet = new Set(firstStringNGramPairs);
    const totalPairsInSecondString = secondStringNGramPairs.length;
    let totalPairsMatch = 0;
    for (const item of secondStringNGramPairs) {
        if (firstStringNGramsSet.delete(item)) {
            totalPairsMatch++;
        }
    }
    return totalPairsMatch / totalPairsInSecondString;
};
const getNGrams = (word, sizeOfNGram) => {
    word = ' '.repeat(sizeOfNGram - 1) + word + ' '.repeat(sizeOfNGram - 1);
    const nGramsArray = new Array(word.length - sizeOfNGram + 1);
    for (let i = 0; i < nGramsArray.length; i++) {
        nGramsArray[i] = word.slice(i, i + sizeOfNGram);
    }
    return nGramsArray;
};

const capitalize = (text) => {
    if (!text || typeof text !== 'string')
        return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const voidFn = () => void 0;

/**
 * Generated bundle index. Do not edit.
 */

export { BEIGE, BLUE, COLORS, COLOR_PALETTES, COLOR_THEMES, COLOR_TONES, DEFAULT_ATTRIBUTE_VALUES_SPLITTER, DOWN_ARROW, END, ENTER, ESCAPE, ErrorState, GREEN, GREY, HOME, LEFT_ARROW, LOSS, ORANGE, PAGE_DOWN, PAGE_UP, PINK, PROFIT, PURPLE, RED, RIGHT_ARROW, SPACE, TAB, UP_ARROW, YELLOW, applyArrayChanges, applyAttributeChanges, applyClassChanges, arrayChanges, arrayDifference, calculateAttributeChanges, capitalize, injectDestroy, isMobilePhone, isMobileScreen, isPresent, nGramScore, printAllsparkError, printAllsparkWarning, querySelectorAllDeep, querySelectorDeep, randomString, range, splitAttributeValues, voidFn };
//# sourceMappingURL=questrade-allspark-angular-components-core-utils.mjs.map
