import { AnimationTriggerMetadata } from '@angular/animations';

declare const accordionAnimations: {
    readonly triggerRotate: AnimationTriggerMetadata;
    readonly bodyExpansion: AnimationTriggerMetadata;
};

declare const dropdownAnimations: {
    readonly triggerRotate: AnimationTriggerMetadata;
};

export { accordionAnimations, dropdownAnimations };
