import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ElementRef,
  Optional,
  Attribute,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'cca-common-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('iconRef') icon!: ElementRef;
  @ViewChild('textRef') text!: ElementRef;

  @Input() style?: 'outline' | 'fill' | 'transparent';
  @Input() badged?: boolean;

  // Native attributes
  @Input() form: string;
  @Input() type = 'button';

  animate = false;
  animateMsTime = 850;

  hasIcon: boolean;
  hasText: boolean;

  constructor(
    @Optional() @Attribute('secondary') public secondary,
    @Optional() @Attribute('flat') public flat,
    @Optional() @Attribute('warning') public warning,
    @Optional() @Attribute('negative') public negative,
    @Optional() @Attribute('disabled') public disabled,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.hasIcon = this.icon.nativeElement.children.length > 0;
    this.hasText = this.text.nativeElement.textContent !== '';
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  onClick() {
    if (!this.animate) {
      this.animate = true;

      setTimeout(() => {
        this.animate = false;
      }, this.animateMsTime);
    }
  }
}
