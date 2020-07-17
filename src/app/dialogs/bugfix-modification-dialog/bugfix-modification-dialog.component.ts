import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SprintDomainService } from '../../domain/entities/sprint/sprint-domain.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BugfixModificationStrategy } from './strategy/bugfix-modification-strategy';
import { BugfixUpdateStrategy } from './strategy/bugfix-update-strategy';
import { BugfixCreateStrategy } from './strategy/bugfix-create-strategy';
import { FormGroup } from '@ng-stack/forms';
import { BugfixModificationDialogFormValues } from './model/bugfix-modification-dialog-form-values';
import { BugfixDomainService } from '../../domain/entities/bugfix/bugfix-domain.service';
import { BugfixModificationDialogData } from './model/bugfix-modification-dialog-data';

@Component({
  selector: 'app-bugfix-modification-dialog',
  templateUrl: './bugfix-modification-dialog.component.html',
  styleUrls: ['./bugfix-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugfixModificationDialogComponent {
  rootForm: FormGroup<BugfixModificationDialogFormValues>;
  strategy: BugfixModificationStrategy;

  submitButton: string;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: BugfixModificationDialogData,
    private sprintDomainService: SprintDomainService,
    private bugfixDomainService: BugfixDomainService,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<BugfixModificationDialogComponent>,
  ) {
    if (dialogData?.bugfixView) {
      this.strategy = new BugfixUpdateStrategy(bugfixDomainService);
    } else {
      this.strategy = new BugfixCreateStrategy(sprintDomainService);
    }

    this.rootForm = this.strategy.generateFormDefinition(dialogData);
    this.title = this.strategy.getTitle();
    this.submitButton = this.strategy.getSubmitButton();
  }

  submitForm() {
    if (this.rootForm.invalid) {
      console.error(this.rootForm.errors);
      return;
    }

    this.strategy.handleSubmit(this.dialogData, this.rootForm.value)
      .subscribe({
        next: result => this.matDialogRef.close('ok'),
        error: err => this.snackBar.open(err.message || err),
      });
  }

}
