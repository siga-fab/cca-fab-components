import { trigger, transition, animate, style } from '@angular/animations';
import { AfterViewInit } from '@angular/core';
import {
  Attribute,
  Component,
  Input,
  OnInit,
  Optional,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'cca-common-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '.1s ease-in-out',
          style({
            opacity: 1,
          })
        ),
      ]),

      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate(
          '.1s ease-in-out',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class InputComponent implements OnInit, AfterViewInit {
  @Input() value = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() step = 1;
  @Input() min: number;
  @Input() max: number;
  @Input() focus = false;

  @Output() confirm = new EventEmitter();
  @Output() ref = new EventEmitter();

  @ViewChild('input') input;

  private numberInterval: any;
  private numberIntervalCounter = 1;

  constructor(
    @Optional() @Attribute('textCenter') public textCenter: any,
    @Optional() @Attribute('slim') public slim: any
  ) {
    this.textCenter = textCenter !== null;
    this.slim = slim !== null;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ref.emit(this.input.nativeElement);
  }

  isFocused(value: boolean) {
    this.focus = value;
    if (!value) {
      this.confirm.emit(this.value);
      if (this.numberInterval) {
        this.clearNumberInterval();
      }
    }
  }

  private clearNumberInterval() {
    clearInterval(this.numberInterval);
    this.numberInterval = null;
    this.numberIntervalCounter = 1;
  }

  onMouseUp() {
    this.clearNumberInterval();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.confirm.emit(this.value);
    }
  }

  rangedValue(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = parseInt(el.value, 10);

    if (this.type === 'number') {
      this.value = el.value =
        this.max && this.min
          ? String(Math.max(Math.min(this.max, value), this.min))
          : el.value;
    }
  }

  updateValue(event: Event, operation: 'add' | 'sub') {
    // Impede remoção do foco do input
    event.preventDefault();
    const step = operation === 'add' ? +this.step : -this.step;

    // Atualiza o valor imediatamente
    this.value =
      this.max && this.min
        ? String(
            Math.max(
              Math.min(this.max, parseInt(this.value, 10) + step),
              this.min
            )
          )
        : String(parseInt(this.value, 10) + step);

    // Cria intervalo onde (depois de um delay de 500ms) atualiza o valor do input a cada 50ms
    this.numberInterval = setInterval(() => {
      if (this.numberIntervalCounter > 10) {
        // Garante o delay de 500ms (50 do intervalo, e 10 das iterações com contador menor que 10)
        this.value =
          this.max && this.min
            ? String(
                Math.max(
                  Math.min(this.max, parseInt(this.value, 10) + step),
                  this.min
                )
              )
            : String(parseInt(this.value, 10) + step);
      }
      ++this.numberIntervalCounter;
    }, 50);
  }
}
