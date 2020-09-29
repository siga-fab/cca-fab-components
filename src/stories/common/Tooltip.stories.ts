import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { IconComponent } from '../../../projects/common/src/lib/icon/icon.component';
import { InputModule } from '../../../projects/common/src/lib/input/input.module';
import {
  ButtonModule,
  IconModule,
  TooltipModule,
  TooltipDirective,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common / Tooltip',
  component: TooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ButtonModule,
        IconModule,
        TooltipModule,
        InputModule,
      ],
      entryComponents: [IconComponent],
    }),
  ],
};

export const Default = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
  <ul style="display: flex; flex-flow: row wrap; max-width: 80rem; list-style-type: none;">
    <li style="padding: .5rem">
      <com-button ccaCommonTooltip="Adicionar novo elemento através do uso deste botão completamente acessível" flat (click)="click($event)">
        <com-icon slot="icon">add</com-icon>
        <ng-container slot="text">nova</ng-container>
      </com-button>
    </li>
    <li style="padding: .5rem">
      <com-input style="width: 10rem" ccaCommonTooltip="Campo de texto" value=""></com-input>
    </li>
  </ul>
`,
});
