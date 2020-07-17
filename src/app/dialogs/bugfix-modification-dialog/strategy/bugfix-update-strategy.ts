import { BugfixModificationStrategy } from './bugfix-modification-strategy';
import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { Observable } from 'rxjs';
import { BugfixModificationDialogData } from '../model/bugfix-modification-dialog-data';
import { BugfixModificationDialogFormValues } from '../model/bugfix-modification-dialog-form-values';
import { BugfixDomainService } from '../../../domain/entities/bugfix/bugfix-domain.service';

export class BugfixUpdateStrategy implements BugfixModificationStrategy {
  constructor(private bugfixDomainService: BugfixDomainService) {
  }

  generateFormDefinition(dialogData: BugfixModificationDialogData): FormGroup<BugfixModificationDialogFormValues> {
    return new FormGroup({
      name: new FormControl(dialogData.bugfixView.name, Validators.required),
      ticket: new FormControl(dialogData.bugfixView.ticket, Validators.required),
      bugPreviewUrl: new FormControl(dialogData.bugfixView.bugPreviewUrl),
      fixPreviewUrl: new FormControl(dialogData.bugfixView.fixPreviewUrl),
    });
  }

  getSubmitButton(): string {
    return 'Save';
  }

  getTitle(): string {
    return 'Update Sprint';
  }

  handleSubmit(
    dialogData: BugfixModificationDialogData,
    formValues: BugfixModificationDialogFormValues,
  ): Observable<any> {
    return this.bugfixDomainService.update(dialogData.bugfixView.id, {
      name: formValues.name,
      ticket: formValues.ticket,
      bugPrefixUrl: formValues.bugPreviewUrl,
      fixPrefixUrl: formValues.fixPreviewUrl
    });
  }
}
