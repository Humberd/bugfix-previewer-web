import { BugfixModificationStrategy } from './bugfix-modification-strategy';
import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { Observable } from 'rxjs';
import { SprintDomainService } from '../../../domain/entities/sprint/sprint-domain.service';
import { BugfixModificationDialogData } from '../model/bugfix-modification-dialog-data';
import { BugfixModificationDialogFormValues } from '../model/bugfix-modification-dialog-form-values';

export class BugfixCreateStrategy implements BugfixModificationStrategy {
  constructor(private sprintDomainService: SprintDomainService) {
  }

  generateFormDefinition(dialogData: BugfixModificationDialogData): FormGroup<BugfixModificationDialogFormValues> {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      ticket: new FormControl('', Validators.required),
      bugPreviewUrl: new FormControl(),
      fixPreviewUrl: new FormControl(),
    });
  }

  getSubmitButton(): string {
    return 'Create';
  }

  getTitle(): string {
    return 'New Bugfix';
  }

  handleSubmit(
    dialogData: BugfixModificationDialogData,
    formValues: BugfixModificationDialogFormValues,
  ): Observable<any> {
    return this.sprintDomainService.createBugfix(dialogData.sprintId, {
      name: formValues.name,
      ticket: formValues.ticket,
      bugPrefixUrl: formValues.bugPreviewUrl,
      fixPrefixUrl: formValues.fixPreviewUrl,
    });
  }

}
