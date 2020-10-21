import { action } from '@storybook/addon-actions';
import {
  TableComponent,
  TableModule,
  InputModule,
  IconModule,
  TooltipModule,
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
        TooltipModule,
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
    pageIndex: 1,
    totalPages: 20,
    columns: [
      {
        field: 'field1',
        title: 'Coluna 1',
        width: '10%',
      },
      {
        field: 'field2',
        title: 'Coluna 2',
        width: '10%',
      },
      {
        field: 'field3',
        title: 'Coluna 3',
        width: '50%',
      },
      {
        field: 'field4',
        title: 'Coluna 4',
      },
      {
        field: 'field5',
        title: 'Coluna 5',
      },
    ],
    data: [
      {
        id: 1,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium. Donec id lorem eget magna dictum tincidunt vitae et dui. Fusce volutpat luctus tellus et tempor. Vestibulum ut felis venenatis, posuere massa sit amet, vehicula arcu. ',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        field5: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 2,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium. Donec id lorem eget magna dictum tincidunt vitae et dui. Fusce volutpat luctus tellus et tempor. Vestibulum ut felis venenatis, posuere massa sit amet, vehicula arcu',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        field5: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 3,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium. Donec id lorem eget magna dictum tincidunt vitae et dui. Fusce volutpat luctus tellus et tempor. Vestibulum ut felis venenatis, posuere massa sit amet, vehicula arcu',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        field5: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 4,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium. Donec id lorem eget magna dictum tincidunt vitae et dui. Fusce volutpat luctus tellus et tempor. Vestibulum ut felis venenatis, posuere massa sit amet, vehicula arcu',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        field5: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 5,
        field1: '2020',
        field2: '00000000',
        field3:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum tincidunt malesuada. Donec lacinia gravida turpis sollicitudin laoreet. Duis eleifend dui eget risus blandit pretium. Donec id lorem eget magna dictum tincidunt vitae et dui. Fusce volutpat luctus tellus et tempor. Vestibulum ut felis venenatis, posuere massa sit amet, vehicula arcu',
        field4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        field5: 'Lorem ipsum dolor sit amet',
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
      <div style="display: flex; justify-content: flex-end;">
        <div>
          <com-icon >edit</com-icon>
        </div>
        <div>
          <com-icon [ccaCommonTooltip]="'ID: ' + content.data.id" tooltipPosition="bottom-left">delete</com-icon>
        </div>
      </div>
    </ng-template>
    <ng-template let-content name="field3">
      <strong>{{ content.index }} - {{ content.field }}</strong>
    </ng-template>
  </com-table>
  `,
});
