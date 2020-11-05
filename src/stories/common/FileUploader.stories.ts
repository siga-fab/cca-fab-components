import {
  FileUploaderModule,
  FileUploaderComponent,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Common / File Uploader',
  component: FileUploaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FileUploaderModule],
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
  const form = { value: new FormData() };
  const clickFn = () => (form.value = new FormData());

  return {
    props: {
      form: form,
      change: action('change'),
      error: action('error'),
      clickFn: clickFn,
    },
    template: `
    <div>
      <com-file-uploader
        header="Anexar documentos de FIN"
        placeholder="Você pode adicionar arquivos aqui!"
        (changed)="change(form.value.getAll('files[]'))"
        (error)="error($event)"
        [limit]="3"
        [value]="form.value"
        >
      </com-file-uploader>
      <button (click)="clickFn()">Clear</button>
    </div>
    `,
  };
};
