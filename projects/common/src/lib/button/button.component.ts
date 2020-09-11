import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Optional,
  Attribute,
} from '@angular/core';

@Component({
  selector: 'cca-common-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('iconRef') icon!: ElementRef;
  @ViewChild('textRef') text!: ElementRef;

  @Input() type?: 'outline' | 'fill';
  @Input() badged?: boolean;

  protected animate = false;
  protected hasIcon = false;
  protected hasText = false;

  constructor(
    @Optional() @Attribute('secondary') public secondary,
    @Optional() @Attribute('flat') public flat,
    @Optional() @Attribute('warning') public warning,
    @Optional() @Attribute('negative') public negative,
    @Optional() @Attribute('disabled') public disabled
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.hasIcon = this.icon.nativeElement.children.length > 0;
    this.hasText = this.text.nativeElement.textContent !== '';
  }

  onClick() {
    if (!this.animate) {
      this.animate = true;

      setTimeout(() => {
        this.animate = false;
      }, 850);
    }
  }
}
