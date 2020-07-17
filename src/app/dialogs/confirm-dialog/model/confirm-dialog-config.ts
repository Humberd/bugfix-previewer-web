import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';

export interface ConfirmDialogConfig {
  title: string;
  description: string;
  action: () => Observable<any>;
  actionButton: {
    name: string,
    color: ThemePalette
  };
}
