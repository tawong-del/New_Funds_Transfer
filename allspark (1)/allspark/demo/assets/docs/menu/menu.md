## Storybook

You can find the Menu storybook page [here](/?path=/docs/components-menu--docs).

## Examples

You can check the source code of these examples [here](https://gitlab.com/questrade/allspark/web/allspark-angular-components/-/tree/dev/projects/demo/src/app/demos/menu).

### Basic

<!-- example(menu-example) -->

### Hover Menu

<!-- example(menu-hover-example) -->

### Context Menu

<!-- example(context-menu-example) -->

### Programmatic Control

This example demonstrates how to control menu visibility programmatically using the `openMenu()`, `closeMenu()`, and `toggleMenu()` methods available on the menu trigger directive. The directive can be accessed using a template reference variable with `#menuTrigger="qMenuTrigger"`.

The trigger uses `qMenuTriggerMode="programmatic"` which:

- **Disables automatic triggering**: No click, hover, or keyboard (Enter/Space) will open the menu
- **Disables light dismiss**: Clicking outside will NOT close the menu
- **Preserves Escape key**: Pressing Escape will still close the menu (handled by native popover API)
- **Preserves internal navigation**: All keyboard navigation within the menu works normally (arrow keys, Enter on items, etc.)

This gives you complete programmatic control over when the menu opens and closes.

<!-- example(menu-programmatic-example) -->

### Combined

<!-- example(menu-combined-example) -->
