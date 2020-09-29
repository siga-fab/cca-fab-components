import { action } from '@storybook/addon-actions';
import {
  TableComponent,
  TableModule,
  InputModule,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../../projects/common/src/lib/icon/icon.module';

export default {
  title: 'Common / Table',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TableModule, InputModule, IconModule],
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
    pageSize: 20,
    maxPageSize: 200,
    pageIndex: 20,
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
  template: `<com-table
    [dataSource]="dataSource"
    [pageSize]="pageSize"
    [maxPageSize]="maxPageSize"
    [pageIndex]="pageIndex"
    [totalEntries]="totalEntries"
    (lastPage)="lastPage($event)"
    (firstPage)="firstPage($event)"
    (nextPage)="nextPage($event)"
    (previousPage)="previousPage($event)"
    (refresh)="refresh($event)"
    (pageSizeChange)="pageSizeChange($event)"
    (pageIndexChange)="pageIndexChange($event)"
  >
    <ng-template let-content #action>
      <div style="display: flex; justify-content: flex-end;">
        <div>
          <com-icon>edit</com-icon>
        </div>
        <div>
          <com-icon>delete</com-icon>
        </div>
      </div>
    </ng-template>
  </com-table>
  `,
});
