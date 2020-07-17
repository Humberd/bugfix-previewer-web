import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bugfix-modification-dialog',
  templateUrl: './bugfix-modification-dialog.component.html',
  styleUrls: ['./bugfix-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BugfixModificationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
