import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  Component,
  OnInit,
  Optional,
  Attribute,
  HostBinding,
  Input,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'com-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
})
export class FormSectionComponent implements OnInit, OnDestroy {
  @HostBinding('class.partly-sized') partlySized = false;

  @Input() description?: string;
  @Input() formTitle?: string;
  @Input() tooltip?: string;

  // A number between 0-99
  @Input() step?: number;

  _observer: MutationObserver;

  constructor(
    @Optional() @Attribute('partly') public partly,
    @Optional() @Attribute('block') public block,
    private elRef: ElementRef
  ) {
    this.partly = partly !== null;
    this.block = block !== null;

    this._observer = new MutationObserver((mutations: MutationRecord[]) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'partly') {
          this.partly =
            this.elRef.nativeElement.attributes.getNamedItem('partly') !== null;
          this.partlySized = this.partly;
          continue;
        }

        if (mutation.attributeName === 'block') {
          console.log(
            this.elRef.nativeElement.attributes.getNamedItem('block')
          );
          this.block =
            this.elRef.nativeElement.attributes.getNamedItem('block') !== null;
          continue;
        }
      }
    });

    this._observer.observe(elRef.nativeElement, {
      attributes: true,
      attributeOldValue: true,
    });
  }

  ngOnInit(): void {
    this.partlySized = this.partly;
  }

  ngOnDestroy(): void {
    this._observer.disconnect();
  }
}
