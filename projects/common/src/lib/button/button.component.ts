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
  selector: 'com-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('iconRef') icon!: ElementRef;
  @ViewChild('textRef') text!: ElementRef;

  @Input() badged?: boolean;

  // Native attributes
  @Input() form: string;
  @Input() type = 'button';

  public animate = false;
  public animateMsTime = 850;

  public hasIcon: boolean;
  public hasText: boolean;

  constructor(
    @Optional() @Attribute('secondary') public secondary,
    @Optional() @Attribute('flat') public flat,
    @Optional() @Attribute('warning') public warning,
    @Optional() @Attribute('negative') public negative,
    @Optional() @Attribute('disabled') public disabled,
    @Optional() @Attribute('outline') public outline,
    @Optional() @Attribute('fill') public fill,
    @Optional() @Attribute('transparent') public transparent,
    private cdref: ChangeDetectorRef
  ) {
    this.parseAttributes(
      'secondary',
      'flat',
      'warning',
      'negative',
      'disabled',
      'outline',
      'fill',
      'transparent'
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.hasIcon = this.icon.nativeElement.children.length > 0;
    this.hasText = this.text.nativeElement.textContent !== '';
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  private parseAttributes(...arr: any[]): void {
    for (const att of arr) {
      this[att] = this[att] === '';
    }
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
