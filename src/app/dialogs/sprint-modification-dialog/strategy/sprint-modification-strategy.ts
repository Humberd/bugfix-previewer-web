import { SprintModificationDialogData } from '../model/sprint-modification-dialog-data';
import { SprintModificationDialogFormValues } from '../model/sprint-modification-dialog-form-values';
import { Observable } from 'rxjs';
import { FormGroup } from '@ng-stack/forms';

export interface SprintModificationStrategy {
  getTitle(): string;

  getSubmitButton(): string;

  handleSubmit(
    dialogData: SprintModificationDialogData,
    formValues: SprintModificationDialogFormValues,
  ): Observable<any>;

  generateFormDefinition(dialogData: SprintModificationDialogData): FormGroup<SprintModificationDialogFormValues>;
}
