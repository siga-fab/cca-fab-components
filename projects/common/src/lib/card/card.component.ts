import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'com-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, AfterViewInit, AfterViewChecked {
  /**
   * @internal
   */
  @ViewChild('headerRef') header!: ElementRef;
  /**
   * @internal
   */
  @ViewChild('footerRef') footer!: ElementRef;

  /**
   * @internal
   */
  public hasHeader: boolean;
  /**
   * @internal
   */
  public hasFooter: boolean;

  @Input() headerTitle?: string;

  constructor(private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.hasFooter = this.footer.nativeElement.children.length > 0;
    this.hasHeader =
      this.header.nativeElement.children.length > 0 || !!this.headerTitle;
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }
}
