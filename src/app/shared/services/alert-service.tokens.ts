import { InjectionToken } from '@angular/core';

export interface AlertData {
    type: 'error' | 'warning' | 'success';
    message: string;
    timeout?: number;
}

export const ALERT_DATA = new InjectionToken<AlertData>('ALERT_DATA');
