import { isPresent } from '@questrade/allspark-angular-components/core/utils';

/** Used to generate unique IDs for events. */
let uniqueIds = 0;
/**
 * Creates a browser MouseEvent with the specified options.
 * @docs-private
 */
function createMouseEvent(type, clientX = 0, clientY = 0, offsetX = 0, offsetY = 0, button = 0, modifiers = {}) {
    // Note: We cannot determine the position of the mouse event based on the screen
    // because the dimensions and position of the browser window are not available
    // To provide reasonable `screenX` and `screenY` coordinates, we simply use the
    // client coordinates as if the browser is opened in fullscreen.
    const screenX = clientX;
    const screenY = clientY;
    const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true, // Required for shadow DOM events.
        view: window,
        detail: 1,
        relatedTarget: null,
        screenX,
        screenY,
        clientX,
        clientY,
        button: button,
        buttons: 1,
        ...(isPresent(modifiers.control) && { ctrlKey: modifiers.control }),
        ...(isPresent(modifiers.alt) && { altKey: modifiers.alt }),
        ...(isPresent(modifiers.shift) && { shiftKey: modifiers.shift }),
        ...(isPresent(modifiers.meta) && { metaKey: modifiers.meta }),
    });
    // The `MouseEvent` constructor doesn't allow us to pass these properties into the constructor.
    // Override them to `1`, because they're used for fake screen reader event detection.
    if (offsetX != null) {
        defineReadonlyEventProperty(event, 'offsetX', offsetX);
    }
    if (offsetY != null) {
        defineReadonlyEventProperty(event, 'offsetY', offsetY);
    }
    return event;
}
/**
 * Creates a browser `PointerEvent` with the specified options. Pointer events
 * by default will appear as if they are the primary pointer of their type.
 * https://www.w3.org/TR/pointerevents2/#dom-pointerevent-isprimary.
 *
 * For example, if pointer events for a multi-touch interaction are created, the non-primary
 * pointer touches would need to be represented by non-primary pointer events.
 *
 * @docs-private
 */
function createPointerEvent(type, clientX = 0, clientY = 0, offsetX, offsetY, options = { isPrimary: true }) {
    const event = new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true, // Required for shadow DOM events.
        view: window,
        clientX,
        clientY,
        ...options,
    });
    if (offsetX != null) {
        defineReadonlyEventProperty(event, 'offsetX', offsetX);
    }
    if (offsetY != null) {
        defineReadonlyEventProperty(event, 'offsetY', offsetY);
    }
    return event;
}
/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 * @docs-private
 */
function createTouchEvent(type, pageX = 0, pageY = 0, clientX = 0, clientY = 0) {
    // We cannot use the `TouchEvent` or `Touch` because Firefox and Safari lack support.
    const event = document.createEvent('UIEvent');
    const touchDetails = { pageX, pageY, clientX, clientY, identifier: uniqueIds++ };
    // TS3.6 removes the initUIEvent method and suggests porting to "new UIEvent()".
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event.initUIEvent(type, true, true, window, 0);
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    defineReadonlyEventProperty(event, 'touches', [touchDetails]);
    defineReadonlyEventProperty(event, 'targetTouches', [touchDetails]);
    defineReadonlyEventProperty(event, 'changedTouches', [touchDetails]);
    return event;
}
/**
 * Creates a keyboard event with the specified key and modifiers.
 * @docs-private
 */
function createKeyboardEvent(type, key = '', modifiers = {}) {
    return new KeyboardEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true, // Required for shadow DOM events.
        view: window,
        code: key,
        key: key,
        ...(isPresent(modifiers.control) && { ctrlKey: modifiers.control }),
        ...(isPresent(modifiers.alt) && { altKey: modifiers.alt }),
        ...(isPresent(modifiers.shift) && { shiftKey: modifiers.shift }),
        ...(isPresent(modifiers.meta) && { metaKey: modifiers.meta }),
    });
}
/**
 * Creates a fake event object with any desired event type.
 * @docs-private
 */
function createFakeEvent(type, bubbles = false, cancelable = true, composed = true) {
    return new Event(type, { bubbles, cancelable, composed });
}
/**
 * Defines a readonly property on the given event object. Readonly properties on an event object
 * are always set as configurable as that matches default readonly properties for DOM event objects.
 */
function defineReadonlyEventProperty(event, propertyName, value) {
    Object.defineProperty(event, propertyName, { get: () => value, configurable: true });
}

/**
 * Utility to dispatch any event on a Node.
 * @docs-private
 */
function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/**
 * Shorthand to dispatch a fake event on a specified node.
 * @docs-private
 */
function dispatchFakeEvent(node, type, bubbles) {
    return dispatchEvent(node, createFakeEvent(type, bubbles));
}
/**
 * Shorthand to dispatch a keyboard event with a specified key code and
 * optional modifiers.
 * @docs-private
 */
function dispatchKeyboardEvent(node, type, key, modifiers) {
    return dispatchEvent(node, createKeyboardEvent(type, key, modifiers));
}
/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 * @docs-private
 */
function dispatchMouseEvent(node, type, clientX = 0, clientY = 0, offsetX, offsetY, button, modifiers) {
    return dispatchEvent(node, createMouseEvent(type, clientX, clientY, offsetX, offsetY, button, modifiers));
}
/**
 * Shorthand to dispatch a pointer event on the specified coordinates.
 * @docs-private
 */
function dispatchPointerEvent(node, type, clientX = 0, clientY = 0, offsetX, offsetY, options) {
    return dispatchEvent(node, createPointerEvent(type, clientX, clientY, offsetX, offsetY, options));
}
/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 * @docs-private
 */
function dispatchTouchEvent(node, type, pageX = 0, pageY = 0, clientX = 0, clientY = 0) {
    return dispatchEvent(node, createTouchEvent(type, pageX, pageY, clientX, clientY));
}

function triggerFocusChange(element, event) {
    let eventFired = false;
    const handler = () => (eventFired = true);
    element.addEventListener(event, handler);
    element[event]();
    element.removeEventListener(event, handler);
    if (!eventFired) {
        dispatchFakeEvent(element, event);
    }
}
/**
 * Patches an elements focus and blur methods to emit events consistently and predictably.
 * This is necessary, because some browsers can call the focus handlers asynchronously,
 * while others won't fire them at all if the browser window is not focused.
 * @docs-private
 */
// where browser is not necessarily focused.
function patchElementFocus(element) {
    element.focus = () => dispatchFakeEvent(element, 'focus');
    element.blur = () => dispatchFakeEvent(element, 'blur');
}
/** @docs-private */
function triggerFocus(element) {
    triggerFocusChange(element, 'focus');
}
/** @docs-private */
function triggerBlur(element) {
    triggerFocusChange(element, 'blur');
}

const POPOVER_MOCK_APPLIED = Symbol.for('__popoverMockApplied__');
const ORIGINAL_MATCHES = Symbol.for('__originalMatches__');
function mockPopoverAPI() {
    if (globalThis[POPOVER_MOCK_APPLIED]) {
        return;
    }
    globalThis[POPOVER_MOCK_APPLIED] = true;
    const originalMatches = globalThis[ORIGINAL_MATCHES] ||
        HTMLElement.prototype.matches;
    globalThis[ORIGINAL_MATCHES] =
        originalMatches;
    Object.defineProperty(window, 'requestAnimationFrame', {
        configurable: true,
        enumerable: true,
        writable: true,
        value(cb) {
            cb(0);
            return 0;
        },
    });
    const popoverStates = new WeakMap();
    const getPopoverState = (element) => {
        if (!popoverStates.has(element)) {
            popoverStates.set(element, {
                isOpen: false,
                popoverValue: null,
                triggerElement: null,
                position: { x: 0, y: 0 },
            });
        }
        return popoverStates.get(element);
    };
    const findTriggerElement = (popoverId) => {
        return document.querySelector(`[popovertarget="${popoverId}"]`);
    };
    const dispatchEventWithDelay = (element, event, delay = 0) => {
        if (delay > 0) {
            setTimeout(() => element.dispatchEvent(event), delay);
        }
        else {
            element.dispatchEvent(event);
        }
    };
    Object.defineProperty(HTMLElement.prototype, 'popover', {
        configurable: true,
        enumerable: true,
        get() {
            const state = getPopoverState(this);
            return state.popoverValue;
        },
        set(value) {
            const state = getPopoverState(this);
            state.popoverValue = value;
            if (value) {
                this.setAttribute('popover', value);
            }
            else {
                this.removeAttribute('popover');
            }
        },
    });
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
        configurable: true,
        enumerable: true,
        writable: true,
        value() {
            const state = getPopoverState(this);
            if (state.isOpen) {
                return;
            }
            const beforeToggleEvent = new Event('beforetoggle', {
                bubbles: true,
                cancelable: true,
            });
            beforeToggleEvent.newState = 'open';
            beforeToggleEvent.oldState = 'closed';
            this.dispatchEvent(beforeToggleEvent);
            if (beforeToggleEvent.defaultPrevented) {
                return;
            }
            state.isOpen = true;
            this.style.display = 'block';
            this.style.position = 'absolute';
            this.setAttribute('popover-open', '');
            if (state.position.x === 0 && state.position.y === 0) {
                const rect = this.getBoundingClientRect();
                state.position.x = rect.left;
                state.position.y = rect.top;
            }
            const popoverId = this.getAttribute('id');
            if (popoverId) {
                state.triggerElement = findTriggerElement(popoverId);
            }
            const showEvent = new Event('show', { bubbles: true });
            dispatchEventWithDelay(this, showEvent, 0);
        },
    });
    Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
        configurable: true,
        enumerable: true,
        writable: true,
        value() {
            const state = getPopoverState(this);
            if (!state.isOpen) {
                return;
            }
            const beforeToggleEvent = new Event('beforetoggle', {
                bubbles: true,
                cancelable: true,
            });
            beforeToggleEvent.newState = 'closed';
            beforeToggleEvent.oldState = 'open';
            this.dispatchEvent(beforeToggleEvent);
            if (beforeToggleEvent.defaultPrevented) {
                return;
            }
            state.isOpen = false;
            this.removeAttribute('popover-open');
            const hideEvent = new Event('hide', { bubbles: true });
            dispatchEventWithDelay(this, hideEvent, 0);
        },
    });
    Object.defineProperty(HTMLElement.prototype, 'togglePopover', {
        configurable: true,
        enumerable: true,
        writable: true,
        value(force) {
            const state = getPopoverState(this);
            if (force === undefined) {
                if (state.isOpen) {
                    this.hidePopover();
                }
                else {
                    this.showPopover();
                }
            }
            else if (force) {
                this.showPopover();
            }
            else {
                this.hidePopover();
            }
        },
    });
    Object.defineProperty(HTMLElement.prototype, 'matches', {
        configurable: true,
        enumerable: true,
        writable: true,
        value(selector) {
            if (selector === ':popover-open') {
                const state = getPopoverState(this);
                return state.isOpen;
            }
            return originalMatches.call(this, selector);
        },
    });
}

/**
 * Returns an error which reports that no keys have been specified.
 * @docs-private
 */
function getNoKeysSpecifiedError() {
    return Error('No keys have been specified.');
}

/** Input types for which the value can be entered incrementally. */
const incrementalInputTypes = new Set([
    'text',
    'email',
    'hidden',
    'password',
    'search',
    'tel',
    'url',
]);
/**
 * Checks whether the given Element is a text input element.
 * @docs-private
 */
function isTextInput(element) {
    const nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' || nodeName === 'textarea';
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function typeInElement(element, ...modifiersAndKeys) {
    const first = modifiersAndKeys[0];
    let modifiers;
    let rest;
    if (first !== undefined && typeof first !== 'string' && first.key === undefined) {
        modifiers = first;
        rest = modifiersAndKeys.slice(1);
    }
    else {
        modifiers = {};
        rest = modifiersAndKeys;
    }
    const isInput = isTextInput(element);
    const inputType = element.getAttribute('type') || 'text';
    const keys = rest
        .map((k) => (typeof k === 'string' ? k.split('').map((c) => ({ key: c })) : [k]))
        .reduce((arr, k) => arr.concat(k), []);
    // Throw an error if no keys have been specified. Calling this function with no
    // keys should not result in a focus event being dispatched unexpectedly.
    if (keys.length === 0) {
        throw getNoKeysSpecifiedError();
    }
    // We simulate the user typing in a value by incrementally assigning the value below. The problem
    // is that for some input types, the browser won't allow for an invalid value to be set via the
    // `value` property which will always be the case when going character-by-character. If we detect
    // such an input, we have to set the value all at once or listeners to the `input` event (e.g.
    // the `ReactiveFormsModule` uses such an approach) won't receive the correct value.
    const enterValueIncrementally = inputType === 'number'
        ? // The value can be set character by character in number inputs if it doesn't have any decimals.
            keys.every((key) => key.key !== '.' && key.key !== '-')
        : incrementalInputTypes.has(inputType);
    triggerFocus(element);
    // When we aren't entering the value incrementally, assign it all at once ahead
    // of time so that any listeners to the key events below will have access to it.
    if (!enterValueIncrementally) {
        element.value = keys.reduce((value, key) => value + (key.key || ''), '');
    }
    for (const key of keys) {
        dispatchKeyboardEvent(element, 'keydown', key.key, modifiers);
        dispatchKeyboardEvent(element, 'keypress', key.key, modifiers);
        if (isInput && key.key && key.key.length === 1) {
            if (enterValueIncrementally) {
                element.value += key.key;
                dispatchFakeEvent(element, 'input');
            }
        }
        dispatchKeyboardEvent(element, 'keyup', key.key, modifiers);
    }
    // Since we weren't dispatching `input` events while sending the keys, we have to do it now.
    if (!enterValueIncrementally) {
        dispatchFakeEvent(element, 'input');
    }
}
/**
 * Clears the text in an input or textarea element.
 * @docs-private
 */
function clearElement(element) {
    triggerFocus(element);
    element.value = '';
    dispatchFakeEvent(element, 'input');
}

/**
 * Generated bundle index. Do not edit.
 */

export { clearElement, createFakeEvent, createKeyboardEvent, createMouseEvent, createPointerEvent, createTouchEvent, dispatchEvent, dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchPointerEvent, dispatchTouchEvent, getNoKeysSpecifiedError, isTextInput, mockPopoverAPI, patchElementFocus, triggerBlur, triggerFocus, typeInElement };
//# sourceMappingURL=questrade-allspark-angular-components-core-testing.mjs.map
