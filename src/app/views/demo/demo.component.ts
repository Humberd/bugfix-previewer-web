import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
export class DemoComponent implements OnInit, AfterViewInit, OnDestroy {
  private sprintId: string;
  sprintView: SprintView;
  bugfixes: BugfixView[] = [];
  currentBugfixIndex = 0;
  isBugPreview = true;
  allEnded = false;
  bugfixEnded = false;
  bugPreviewEnded = false;
  fixPreviewEnded = false;
  isPlaying = false;

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

  async ngAfterViewInit() {
    try {
      const response = await document.documentElement.requestFullscreen();
    } catch (e) {
      console.error(e);
    }
  }

  ngOnDestroy() {
    document.exitFullscreen();
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
    this.isPlaying = false;
    if (this.isBugPreview) {
      this.bugPreviewEnded = true;
      this.fixPreviewEnded = false;

      return;
    }

    this.bugPreviewEnded = false;
    this.fixPreviewEnded = true;

    if (this.currentBugfixIndex === this.bugfixes.length - 1) {
      this.allEnded = true;

      return;
    }

    this.bugfixEnded = true;
  }

  videoStarted() {
    console.log('video started');
    this.isPlaying = true;
  }

  videoPaused() {
    this.isPlaying = false;
  }

  showFixPreview() {
    this.isBugPreview = false;
  }

  showBugPreview() {
    this.isBugPreview = true;
  }

  goToNextBugfix() {

  }

  goToPreviousBugfix() {

  }
}
