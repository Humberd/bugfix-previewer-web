import { SprintModificationStrategy } from './sprint-modification-strategy';
import { SprintModificationDialogData } from '../model/sprint-modification-dialog-data';
import { SprintModificationDialogFormValues } from '../model/sprint-modification-dialog-form-values';
import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { Observable } from 'rxjs';
import { SprintDomainService } from '../../../domain/entities/sprint/sprint-domain.service';

export class SprintCreateStrategy implements SprintModificationStrategy {
  constructor(private sprintDomainService: SprintDomainService) {
  }

  generateFormDefinition(dialogData: SprintModificationDialogData): FormGroup<SprintModificationDialogFormValues> {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl(0, [Validators.required, Validators.min(0)]),
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
    return this.sprintDomainService.create({
      name: formValues.name,
      number: formValues.number,
    });
  }

}
