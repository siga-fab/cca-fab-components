import {
  Component,
  ElementRef,
  Input,
  OnInit,
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

  @Input() header = '';
  @Input() placeholder = '';

  @HostBinding('class.disabled') @Input() disabled = false;

  @Output() changed = new EventEmitter();

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

    for (const file of files) {
      if (
        !this.fileList.find(
          (currentFile) =>
            file.name === currentFile.name && file.size === currentFile.size
        )
      ) {
        this.value.append('files[]', file);
        this.fileList.push(file);
      }
    }

    this.changed.emit();
    this.onChange(this.value);
  }

  selectFiles() {
    this.fileInput.nativeElement.click();
  }

  deleteFile(index: number) {
    this.fileList.splice(index, 1);
    this.value.delete('files[]');

    for (const file of this.fileList) {
      this.value.append('files[]', file);
    }

    this.changed.emit();
    this.onChange(this.value);
  }
}
