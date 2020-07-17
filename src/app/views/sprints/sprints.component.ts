import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SprintView } from '../../domain/entities/sprint/view/sprint-view';
import { SprintDomainService } from '../../domain/entities/sprint/sprint-domain.service';
import { defaultViewList, ViewList } from '../../domain/common/view-list';

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
  ) {
  }

  ngOnInit(): void {
    this.sprintDomainService.readList()
      .subscribe(response => {
        this.items = response;
        this.changeDetectorRef.markForCheck();
      });
  }

  typeIt(row: SprintView): SprintView {
    return row;
  }

}
