import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  NgZone,
  OnInit,
} from '@angular/core';
import { Uppy } from '@uppy/core';
import * as FileInput from '@uppy/file-input';
import * as ProgressBar from '@uppy/progress-bar';
import * as XHRUpload from '@uppy/xhr-upload';
import { environment } from '../../../../../environments/environment';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let idGenerator = 0;

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FileUploaderComponent, multi: true},
  ],
})
export class FileUploaderComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  private onChangeFn: (url: string) => void;
  private onTouchedFn: () => void;

  url: string;

  @HostBinding('id') id: string;
  private uppy: Uppy;

  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.id = `app-file-uploader-${idGenerator++}`;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startUppy();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.url = obj;
  }

  private startUppy() {
    this.ngZone.runOutsideAngular(() => {
      const uppy = new Uppy({
        debug: true,
        allowMultipleUploads: true,
        autoProceed: true,
        restrictions: {
          maxFileSize: 20000000,
          maxNumberOfFiles: 1,
          allowedFileTypes: ['.mp4'],
        },
      });
      this.uppy = uppy;

      uppy.use(FileInput, {
        target: `#${this.id} .file-input`,
        replaceTargetContent: true,
      });
      uppy.use(ProgressBar, {
        target: `#${this.id} .progress-bar`,
        replaceTargetContent: true,
      });
      uppy.use(XHRUpload, {
        endpoint: `${environment.apiUrl}/files`,
        method: 'POST',
        fieldName: 'files',
        responseUrlFieldName: 'url',
      });

      uppy.on('upload-success', (file, body) => {
        console.log(file, body);
        this.ngZone.run(() => {
          this.url = body.uploadURL;
          this.onChangeFn(this.url);
          this.changeDetectorRef.markForCheck();
        });
      });

    });
  }

  removeSelection() {
    this.url = undefined;
    this.onChangeFn(this.url);
    this.ngZone.runOutsideAngular(() => {

    });
  }
}
