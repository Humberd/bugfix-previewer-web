import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SprintModificationDialogData } from './model/sprint-modification-dialog-data';
import { SprintModificationStrategy } from './strategy/sprint-modification-strategy';
import { SprintUpdateStrategy } from './strategy/sprint-update-strategy';
import { SprintDomainService } from '../../domain/entities/sprint/sprint-domain.service';
import { SprintCreateStrategy } from './strategy/sprint-create-strategy';
import { FormGroup } from '@ng-stack/forms';
import { SprintModificationDialogFormValues } from './model/sprint-modification-dialog-form-values';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sprint-modification-dialog',
  templateUrl: './sprint-modification-dialog.component.html',
  styleUrls: ['./sprint-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprintModificationDialogComponent {
  rootForm: FormGroup<SprintModificationDialogFormValues>;
  strategy: SprintModificationStrategy;

  submitButton: string;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: SprintModificationDialogData,
    private sprintDomainService: SprintDomainService,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<SprintModificationDialogComponent>,
  ) {
    if (dialogData?.sprintView) {
      this.strategy = new SprintUpdateStrategy(sprintDomainService);
    } else {
      this.strategy = new SprintCreateStrategy(sprintDomainService);
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
