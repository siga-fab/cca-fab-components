import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import {
  FormModule,
  ButtonModule,
  RadioModule,
  LabelModule,
  CheckboxModule,
  InputModule,
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
        CheckboxModule,
        InputModule,
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
    myGroup: new FormGroup({
      input: new FormControl('asdfaf'),
      inputNumber: new FormControl(''),
      radioGroup: new FormControl('option 5'),
      checkboxOne: new FormControl(true),
      checkboxTwo: new FormControl(false),
      checkboxTree: new FormControl(false),
    }),
    formId: 'form-test',
  },
  template: `
    <div style="width: 70%;">
      <cca-common-form [id]="formId" [formGroup]="myGroup" (ngSubmit)="handleSubmit(myGroup.value)">
        <cca-common-form-section partly formTitle="Lorem Ipsum" step="1" tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
          <cca-common-input label="Basic input" placeholder="type your text here" formControlName="input"></cca-common-input>
          <cca-common-input type="number" label="Basic number input" placeholder="type your number here" formControlName="inputNumber" min="0" max="10"></cca-common-input>
        </cca-common-form-section>
        <cca-common-form-section partly formTitle="Lorem Ipsum" step="2" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id elit at erat consequat finibus non ut leo. Mauris luctus purus quis risus pharetra, in semper dolor faucibus.">
          <cca-common-fieldset>
            <cca-common-label>Checkbox field</cca-common-label>
            <cca-common-checkbox formControlName="checkboxOne">checkbox 1</cca-common-checkbox>
            <cca-common-checkbox formControlName="checkboxTwo">checkbox 2</cca-common-checkbox>
            <cca-common-checkbox formControlName="checkboxTree">checkbox 3</cca-common-checkbox>
          </cca-common-fieldset>
        </cca-common-form-section>
        <cca-common-form-section block formTitle="Lorem Ipsum" step="3">
          <cca-common-label>Radio button field</cca-common-label>
          <cca-common-radio-group horizontal formControlName="radioGroup">
            <cca-common-radio value="option 5">option 5</cca-common-radio>
            <cca-common-radio value="option 6">option 6</cca-common-radio>
            <cca-common-radio value="option 7">option 7</cca-common-radio>
            <cca-common-radio value="option 8">option 9</cca-common-radio>
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
