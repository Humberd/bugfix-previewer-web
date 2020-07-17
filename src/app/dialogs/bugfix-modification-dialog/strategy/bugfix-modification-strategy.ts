import { Observable } from 'rxjs';
import { FormGroup } from '@ng-stack/forms';
import { BugfixModificationDialogData } from '../model/bugfix-modification-dialog-data';
import { BugfixModificationDialogFormValues } from '../model/bugfix-modification-dialog-form-values';

export interface BugfixModificationStrategy {
  getTitle(): string;

  getSubmitButton(): string;

  handleSubmit(
    dialogData: BugfixModificationDialogData,
    formValues: BugfixModificationDialogFormValues,
  ): Observable<any>;

  generateFormDefinition(dialogData: BugfixModificationDialogData): FormGroup<BugfixModificationDialogFormValues>;
}
