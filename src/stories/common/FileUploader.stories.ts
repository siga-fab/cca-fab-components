import { FileUploaderModule } from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Common / File Uploader',
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
  const form = new FormData();

  return {
    props: {
      form: form,
      change: action('change'),
    },
    template: `
    <div>
      <com-file-uploader
        header="Anexar documentos de FIN"
        placeholder="Você pode adicionar arquivos aqui!"
        (changed)="change(form.getAll('files[]'))"
        [value]="form"
        >
      </com-file-uploader>
    </div>
    `,
  };
};