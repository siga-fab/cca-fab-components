import { action } from '@storybook/addon-actions';
import {
  TableComponent,
  TableModule,
  InputModule,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export default {
  title: 'Common | Table',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TableModule, InputModule],
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

export const Default = () => ({
  component: TableComponent,
  props: {
    firstPage: action('firstPage'),
    lastPage: action('lastPage'),
    nextPage: action('nextPage'),
    previousPage: action('previousPage'),
    refresh: action('refresh'),
    pageSizeChange: action('pageSizeChange'),
    pageIndexChange: action('pageIndexChange'),
    pageSize: 10,
    maxPageSize: 200,
    pageIndex: 1,
    totalEntries: 200,
    dataSource: [
      {
        'Cabeçalho 1': 'Coluna 1',
        'Cabeçalho 2': 'Coluna 2',
        'Cabeçalho 3': 'Coluna 3',
        'Cabeçalho 4': 'Coluna 4',
        'Cabeçalho 5': 'Coluna 5',
      },
      {
        'Cabeçalho 1': 'Coluna 1',
        'Cabeçalho 2': 'Coluna 2',
        'Cabeçalho 3': 'Coluna 3',
        'Cabeçalho 4': 'Coluna 4',
        'Cabeçalho 5': 'Coluna 5',
      },
      {
        'Cabeçalho 1': 'Coluna 1',
        'Cabeçalho 2': 'Coluna 2',
        'Cabeçalho 3': 'Coluna 3',
        'Cabeçalho 4': 'Coluna 4',
        'Cabeçalho 5': 'Coluna 5',
      },
      {
        'Cabeçalho 1': 'Coluna 1',
        'Cabeçalho 2': 'Coluna 2',
        'Cabeçalho 3': 'Coluna 3',
        'Cabeçalho 4': 'Coluna 4',
        'Cabeçalho 5': 'Coluna 5',
      },
      {
        'Cabeçalho 1': 'Coluna 1',
        'Cabeçalho 2': 'Coluna 2',
        'Cabeçalho 3': 'Coluna 3',
        'Cabeçalho 4': 'Coluna 4',
        'Cabeçalho 5': 'Coluna 5',
      },
    ],
  },
});
