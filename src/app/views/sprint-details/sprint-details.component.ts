import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SprintDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
