import { action } from '@storybook/addon-actions';
import {
  TableComponent,
  TableModule,
  InputModule,
  IconModule,
  ButtonModule,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Common / Table',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TableModule,
        InputModule,
        IconModule,
        ButtonModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
  parameters: {
    docs: { iframeHeight: 650 },
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
    onPageSizeChange: action('pageSizeChange'),
    onPageIndexChange: action('pageIndexChange'),
    pageSize: 20,
    minPageSize: 0,
    maxPageSize: 50,
    pageIndex: 2,
    totalPages: 20,
    columns: [
      {
        field: 'field1',
        title: 'Coluna 1',
        width: '15%',
      },
      {
        field: 'field2',
        title: 'Coluna 2',
        width: '15%',
      },
      {
        field: 'field3',
        title: 'Coluna 3',
        width: '40%',
      },
      {
        field: 'field4',
        title: 'Coluna 4',
      },
    ],
    data: [
      {
        id: 1,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 2,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 3,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 4,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 5,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
    ],
  },
  template: `<com-table
    [pageSize]="pageSize"
    [maxPageSize]="maxPageSize"
    [minPageSize]="minPageSize"
    [pageIndex]="pageIndex"
    [totalPages]="totalPages"
    [hidden]="hiddenFields"
    [data]="data"
    [columns]="columns"
    (lastPage)="lastPage($event)"
    (firstPage)="firstPage($event)"
    (nextPage)="nextPage($event)"
    (previousPage)="previousPage($event)"
    (refresh)="refresh($event)"
    (pageSizeChanged)="onPageSizeChange($event)"
    (pageIndexChanged)="onPageIndexChange($event)"
  >
    <ng-template let-content name="action">
      <div style="margin: .25rem">
        <com-button flat transparent>
          <com-icon slot="icon">edit</com-icon>
        </com-button>
      </div>
      <div style="margin: .25rem">
        <com-button warning transparent>
          <com-icon outlined slot="icon">delete</com-icon>
        </com-button>
      </div>
    </ng-template>
    <ng-template let-content name="field3">
      <strong>{{ content.index }} - {{ content.field }}</strong>
    </ng-template>
  </com-table>
  `,
});
