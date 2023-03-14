import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const alertAnimate = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.7s ease-in', style({ opacity: 0 })),
  ]),
]);
