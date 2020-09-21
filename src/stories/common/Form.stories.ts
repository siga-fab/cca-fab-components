import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import {
  FormModule,
  ButtonModule,
  RadioModule,
  LabelModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Form',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormModule,
        ButtonModule,
        RadioModule,
        LabelModule,
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
  props: {
    handleSubmit: action('submited'),
    myGroup: new FormGroup({}),
    formId: 'form-test',
  },
  template: `
    <div style="width: 70%;">
      <cca-common-form [id]="formId" [formGroup]="myGroup" (ngSubmit)="handleSubmit($event)">
        <cca-common-form-section partly title="Lorem Ipsum" step="1" tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></cca-common-form-section>
        <cca-common-form-section partly title="Lorem Ipsum" step="2" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id elit at erat consequat finibus non ut leo. Mauris luctus purus quis risus pharetra, in semper dolor faucibus.">
        </cca-common-form-section>
        <cca-common-form-section block title="Lorem Ipsum" step="3">
          <cca-common-label>Teste</cca-common-label>
          <cca-common-radio-group horizontal>
            <cca-common-radio checked="true" value="option 4">option 4</cca-common-radio>
            <cca-common-radio value="option 5">option 5</cca-common-radio>
            <cca-common-radio [disabled]="true">option 6</cca-common-radio>
          </cca-common-radio-group>
        </cca-common-form-section>
      </cca-common-form>
    </div>
    <div style="margin-top: 2rem;">
      <cca-common-button style="fill" type="submit" [form]="formId">
        <ng-container slot="text">submit</ng-container>
      </cca-common-button>
    </div>
  `,
});
