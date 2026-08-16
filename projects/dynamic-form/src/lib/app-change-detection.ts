import { ChangeDetectionStrategy, VERSION } from '@angular/core';

export const APP_CHANGE_DETECTION = +VERSION.major >= 22
  ? ChangeDetectionStrategy.Eager
  : ChangeDetectionStrategy.OnPush;