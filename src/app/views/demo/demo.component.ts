import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {
  private sprintId: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.sprintId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
