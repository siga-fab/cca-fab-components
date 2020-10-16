import {
  ModalModule,
  ModalComponent,
  IconModule,
  CardModule,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Common / Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ModalModule,
        IconModule,
        CardModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: '#fafafa' },
        { name: 'dark', value: '#202124' },
      ],
    },
  },
};

export const Default = () => {
  let isOpen = { value: false },
    data = { testing: 1 };
  const toggleOpen = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    props: {
      data,
      isOpen,
      toggleOpen,
      closed: action('closed'),
      confirm: action('confirm'),
      changeData: () => ++data.testing,
    },
    template: `
      <button (click)="toggleOpen()">Open Modal</button>
      <com-modal
        header="Modal Title"
        actionText="Modal Action"
        (confirm)="confirm()"
        (closed)="toggleOpen(); closed()"
        *ngIf="isOpen.value">
          <button (click)="changeData()">
            {{data.testing}}
          </button>
      </com-modal>
    `,
  };
};
