import { trigger, state, transition, style, animate } from '@angular/animations';

const accordionAnimations = {
    triggerRotate: trigger('triggerRotate', [
        state('collapsed, void', style({ transform: 'rotate(0deg)' })),
        state('expanded', style({ transform: 'rotate(180deg)' })),
        transition('expanded <=> collapsed, void => collapsed', animate('150ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
    bodyExpansion: trigger('bodyExpansion', [
        state('collapsed', style({ height: 0, visibility: 'hidden', paddingTop: 0, paddingBottom: 0 })),
        state('expanded', style({ height: '*', visibility: '' })),
        transition('expanded <=> collapsed', animate('150ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
};

const dropdownAnimations = {
    triggerRotate: trigger('triggerRotate', [
        state('collapsed, void', style({ transform: 'rotate(0deg)' })),
        state('expanded', style({ transform: 'rotate(180deg)' })),
        transition('expanded <=> collapsed, void => collapsed', animate('150ms ease-out')),
    ]),
};

/**
 * Generated bundle index. Do not edit.
 */

export { accordionAnimations, dropdownAnimations };
//# sourceMappingURL=questrade-allspark-angular-components-core-animations.mjs.map
