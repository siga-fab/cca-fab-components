import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  Self,
  Optional,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgFormsChangedFn, NgFormsTouchedFn } from '../../types/ngForms';

@Component({
  selector: 'com-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements AfterViewInit {
  fileList = [];
  isDragging = false;
  droppedFiles: FileList;

  isAdvancedUpload = (() => {
    const div = document.createElement('div');
    return (
      ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
      'FormData' in window &&
      'FileReader' in window
    );
  })();

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('dragBox') dragBox: ElementRef;

  constructor(@Self() @Optional() private ngControl: NgControl) {}

  @Input() value: FormData = new FormData();
  @Input() limit = 1;
  @Input() maxLimitSize = 2 * 1024 * 1024;

  @Input() header = '';
  @Input() placeholder = '';

  @HostBinding('class.disabled') @Input() disabled = false;

  @Output() changed = new EventEmitter();
  @Output() fileError = new EventEmitter();

  onChange: NgFormsChangedFn = (value: any): void => {};
  onTouched: NgFormsTouchedFn = (): void => {};

  /* istanbul ignore next */
  writeValue(value: any) {
    this.value = value;
  }
  /* istanbul ignore next */
  registerOnChange(fn: NgFormsChangedFn): void {
    this.onChange = fn;
  }
  /* istanbul ignore next */
  registerOnTouched(fn: NgFormsTouchedFn): void {
    this.onTouched = fn;
  }
  /* istanbul ignore next */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit(): void {
    if (!this.isAdvancedUpload) {
      return;
    }

    const dragBox = this.dragBox.nativeElement as HTMLDivElement;
    const eventList = [
      'dragover',
      'dragenter',

      'dragend',
      'dragleave',
      'drop',

      'drag',
      'dragstart',
    ];

    for (let index = 0; index < eventList.length; ++index) {
      if (index === 0 || index === 1) {
        dragBox.addEventListener(eventList[index], (evt) => {
          this.isDragging = true;
        });
      }

      if (index >= 2 && index <= 4) {
        dragBox.addEventListener(eventList[index], (evt) => {
          this.isDragging = false;
        });
      }

      if (index === 4) {
        dragBox.addEventListener(eventList[index], (evt: DragEvent) => {
          this.upload(evt.dataTransfer.files);
        });
      }

      dragBox.addEventListener(eventList[index], (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      });
    }
  }

  upload(event: Event | FileList) {
    const files =
      event instanceof Event ? (event.target as HTMLInputElement).files : event;

    console.log(event, this.fileList.length);
    if (this.limit === 1 && !this.fileList.length) {
      console.log(
        files[0].size < this.maxLimitSize,
        this.maxLimitSize,
        files[0].size
      );
      if (files[0].size < this.maxLimitSize) {
        this.value.set('file', files[0]);
        this.fileList.push(files[0]);
      } else {
        this.fileError.emit(files[0]);
        this.fileInput.nativeElement.value = '';
        return;
      }
    } else if (this.fileList.length < this.limit) {
      let errors = 0;

      for (const file of files) {
        if (
          !this.fileList.find(
            (currentFile) =>
              file.name === currentFile.name && file.size === currentFile.size
          )
        ) {
          console.log(
            file.size < this.maxLimitSize,
            this.maxLimitSize,
            file.size
          );
          if (file.size < this.maxLimitSize) {
            this.value.append('files[]', file);
            this.fileList.push(file);
          } else {
            ++errors;
            this.fileError.emit(file);
          }
        }
      }

      if (errors === files.length) {
        this.fileInput.nativeElement.value = '';
        return;
      }
    }

    this.fileInput.nativeElement.value = '';

    this.changed.emit();
    this.onChange(this.value);
  }

  selectFiles() {
    this.fileInput.nativeElement.click();
  }

  deleteFile(index: number) {
    if (this.limit === 1) {
      this.fileList.pop();
      this.value.delete('file');
    } else {
      this.fileList.splice(index, 1);
      this.value.delete('files[]');

      for (const file of this.fileList) {
        this.value.append('files[]', file);
      }
    }

    this.fileInput.nativeElement.value = '';

    this.changed.emit();
    this.onChange(this.value);
  }
}
