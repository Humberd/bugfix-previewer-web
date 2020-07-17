import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SprintView } from '../../domain/entities/sprint/view/sprint-view';
import { SprintDomainService } from '../../domain/entities/sprint/sprint-domain.service';
import { defaultViewList, ViewList } from '../../domain/common/view-list';
import { SprintModificationDialogService } from '../../dialogs/sprint-modification-dialog/services/sprint-modification-dialog.service';
import { ConfirmDialogService } from '../../dialogs/confirm-dialog/service/confirm-dialog.service';
import { ConfirmDialogConfig } from '../../dialogs/confirm-dialog/model/confirm-dialog-config';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprintsComponent implements OnInit {
  displayedColumns = ['name', 'number', 'bugfixes', 'actions'];
  items: ViewList<SprintView> = defaultViewList();

  constructor(
    private sprintDomainService: SprintDomainService,
    private changeDetectorRef: ChangeDetectorRef,
    private sprintModificationDialogService: SprintModificationDialogService,
    private confirmDialogService: ConfirmDialogService,
  ) {
  }

  ngOnInit(): void {
    this.fetchList();
  }

  private fetchList() {
    this.sprintDomainService.readList()
      .subscribe(response => {
        this.items = response;
        this.changeDetectorRef.markForCheck();
      });
  }

  async openNewSprintDialog() {
    const dialogRef = await this.sprintModificationDialogService.openCreate();
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) return;

        this.fetchList();
      });
  }

  async openUpdateSprintDialog(sprintView: SprintView) {
    const dialogRef = await this.sprintModificationDialogService.openUpdate();
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) return;

        this.fetchList();
      });
  }

  async openDeleteSprintDialog(sprintView: SprintView) {
    const config: ConfirmDialogConfig = {
      title: 'Sprint Removal',
      description: `Are you sure you want to delete ${sprintView.name}?`,
      action: () => this.sprintDomainService.delete(sprintView.id)
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

        this.fetchList();
      });
  }

  typeIt(row: SprintView): SprintView {
    return row;
  }

}
