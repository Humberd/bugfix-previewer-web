import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SprintDomainService } from '../../domain/entities/sprint/sprint-domain.service';
import { BugfixDomainService } from '../../domain/entities/bugfix/bugfix-domain.service';
import { SprintView } from '../../domain/entities/sprint/view/sprint-view';
import { ActivatedRoute } from '@angular/router';
import { defaultViewList, ViewList } from '../../domain/common/view-list';
import { BugfixView } from '../../domain/entities/bugfix/view/bugfix-view';

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
      .subscribe(result => {
        this.sprintView = result;
        this.changeDetectorRef.markForCheck();
      });
  }

  private fetchBugfixes() {
    this.sprintDomainService.readBugfixesList(this.sprintId)
      .subscribe(result => {
        this.items = result;
        this.changeDetectorRef.markForCheck();
      });
  }

  async openUpdateSprintDialog(bugfixView: BugfixView) {

  }

  async openDeleteSprintDialog(bugfixView: BugfixView) {

  }

  async openNewSprintDialog() {

  }
}
