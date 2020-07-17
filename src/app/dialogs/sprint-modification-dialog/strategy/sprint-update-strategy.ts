import { SprintModificationStrategy } from './sprint-modification-strategy';
import { SprintDomainService } from '../../../domain/entities/sprint/sprint-domain.service';
import { SprintModificationDialogData } from '../model/sprint-modification-dialog-data';
import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { SprintModificationDialogFormValues } from '../model/sprint-modification-dialog-form-values';
import { Observable } from 'rxjs';

export class SprintUpdateStrategy implements SprintModificationStrategy {
  constructor(private sprintDomainService: SprintDomainService) {
  }

  generateFormDefinition(dialogData: SprintModificationDialogData): FormGroup<SprintModificationDialogFormValues> {
    return new FormGroup({
      name: new FormControl(dialogData.sprintView.name, Validators.required),
      number: new FormControl(dialogData.sprintView.number, [Validators.required, Validators.min(0)]),
    });
  }

  getSubmitButton(): string {
    return 'Create';
  }

  getTitle(): string {
    return 'New Sprint';
  }

  handleSubmit(
    dialogData: SprintModificationDialogData,
    formValues: SprintModificationDialogFormValues,
  ): Observable<any> {
    return this.sprintDomainService.update(dialogData.sprintView.id, {
      name: formValues.name,
      number: formValues.number,
    });
  }
}
