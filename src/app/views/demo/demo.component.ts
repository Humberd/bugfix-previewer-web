import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintDomainService } from '../../domain/entities/sprint/sprint-domain.service';
import { SprintView } from '../../domain/entities/sprint/view/sprint-view';
import { BugfixView } from '../../domain/entities/bugfix/view/bugfix-view';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnInit {
  private sprintId: string;
  sprintView: SprintView;
  bugfixes: BugfixView[] = [];
  currentBugfixIndex = 0;
  isBugPreview = true;
  isVideoPlaying = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sprintDomainService: SprintDomainService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.sprintId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.fetchSprintDetails();
    this.fetchBugfixes();
  }

  getCurrentUrl(): string {
    if (this.isBugPreview) {
      return this.bugfixes[this.currentBugfixIndex].bugPreviewUrl;
    }

    return this.bugfixes[this.currentBugfixIndex].fixPreviewUrl;
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
        this.bugfixes = result.data.filter(it => it.bugPreviewUrl && it.fixPreviewUrl);
        this.changeDetectorRef.markForCheck();
      });
  }

  videoEnded() {
    this.isVideoPlaying = false;
  }

  videoStarted() {
    this.isVideoPlaying = true;
  }

  videoPaused() {
    this.isVideoPlaying = false;
  }

  showFixPreview() {
    this.isBugPreview = false;
  }

  showBugPreview() {
    this.isBugPreview = true;
  }

  goToNextBugfix() {
    this.currentBugfixIndex++;
    this.isBugPreview = true;
  }

  goToPreviousBugfix() {
    this.currentBugfixIndex--;
    this.isBugPreview = false;
  }

  hasNext(): boolean {
    return this.currentBugfixIndex < this.bugfixes.length - 1;
  }

  hasPrevious(): boolean {
    return this.currentBugfixIndex > 0;
  }
}
