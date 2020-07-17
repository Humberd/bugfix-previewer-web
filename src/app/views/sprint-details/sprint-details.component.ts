import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SprintDomainService } from '../../domain/entities/sprint/sprint-domain.service';
import { BugfixDomainService } from '../../domain/entities/bugfix/bugfix-domain.service';
import { SprintView } from '../../domain/entities/sprint/view/sprint-view';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultViewList, ViewList } from '../../domain/common/view-list';
import { BugfixView } from '../../domain/entities/bugfix/view/bugfix-view';
import { ConfirmDialogConfig } from '../../dialogs/confirm-dialog/model/confirm-dialog-config';
import { mapTo } from 'rxjs/operators';
import { BugfixModificationDialogService } from '../../dialogs/bugfix-modification-dialog/services/bugfix-modification-dialog.service';
import { ConfirmDialogService } from '../../dialogs/confirm-dialog/service/confirm-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprintDetailsComponent implements OnInit {
  displayedColumns = ['name', 'ticket', 'bugPreview', 'fixPreview', 'actions'];
  sprintView: SprintView;
  items: ViewList<BugfixView> = defaultViewList();

  private sprintId: string;

  constructor(
    private sprintDomainService: SprintDomainService,
    private bugfixDomainService: BugfixDomainService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private bugfixModificationDialogService: BugfixModificationDialogService,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.sprintId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.fetchSprintDetails();
    this.fetchBugfixes();
  }

  typeIt(row: BugfixView): BugfixView {
    return row;
  }

  private fetchSprintDetails() {
    this.sprintDomainService.read(this.sprintId)
      .subscribe({
        next: result => {
          this.sprintView = result;
          this.changeDetectorRef.markForCheck();
        },
        error: error => {
          this.snackBar.open(`There is no sprint ${this.sprintId}`);
          this.router.navigateByUrl('/');
        },
      });
  }

  private fetchBugfixes() {
    this.sprintDomainService.readBugfixesList(this.sprintId)
      .subscribe(result => {
        this.items = result;
        this.changeDetectorRef.markForCheck();
      });
  }

  async openNewSprintDialog() {
    const dialogRef = await this.bugfixModificationDialogService.openCreate({
      sprintId: this.sprintId,
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) return;

        this.fetchBugfixes();
      });
  }

  async openUpdateSprintDialog(bugfixView: BugfixView) {
    const dialogRef = await this.bugfixModificationDialogService.openUpdate({
      bugfixView,
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) return;

        this.fetchBugfixes();
      });
  }

  async openDeleteSprintDialog(bugfixView: BugfixView) {
    const config: ConfirmDialogConfig = {
      title: 'Bugfix Removal',
      description: `Are you sure you want to delete ${bugfixView.name}?`,
      action: () => this.bugfixDomainService.delete(bugfixView.id)
        .pipe(mapTo('ok')),
      actionButton: {
        color: 'warn',
        name: 'Delete',
      },
    };

    const dialogRef = await this.confirmDialogService.open(config);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) return;

        this.fetchBugfixes();
      });
  }
}
