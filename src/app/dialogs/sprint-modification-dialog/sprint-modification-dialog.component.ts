import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-modification-dialog',
  templateUrl: './sprint-modification-dialog.component.html',
  styleUrls: ['./sprint-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SprintModificationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
