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
      <com-form [id]="formId" [formGroup]="myGroup" (ngSubmit)="handleSubmit(myGroup.value)">
        <com-form-section partly formTitle="Lorem Ipsum" step="1" tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
          <com-input style="width: 100%" label="Basic input" placeholder="type your text here" formControlName="input"></com-input>
          <com-input style="width: 100%" type="number" label="Basic number input" placeholder="type your number here" formControlName="inputNumber" min="0" max="10"></com-input>
        </com-form-section>
        <com-form-section partly formTitle="Lorem Ipsum" step="2" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id elit at erat consequat finibus non ut leo. Mauris luctus purus quis risus pharetra, in semper dolor faucibus.">
          <com-fieldset>
            <com-label>Checkbox field</com-label>
            <com-checkbox formControlName="checkboxOne">checkbox 1</com-checkbox>
            <com-checkbox formControlName="checkboxTwo">checkbox 2</com-checkbox>
            <com-checkbox formControlName="checkboxTree">checkbox 3</com-checkbox>
          </com-fieldset>
        </com-form-section>
        <com-form-section block formTitle="Lorem Ipsum" step="3">
          <com-label>Radio button field</com-label>
          <com-radio-group horizontal formControlName="radioGroup">
            <com-radio value="option 5">option 5</com-radio>
            <com-radio value="option 6">option 6</com-radio>
            <com-radio value="option 7">option 7</com-radio>
            <com-radio value="option 8">option 9</com-radio>
          </com-radio-group>
        </com-form-section>
      </com-form>
    </div>
    <div style="margin-top: 2rem;">
      <com-button style="fill" type="submit" [form]="formId">
        <ng-container slot="text">submit</ng-container>
      </com-button>
    </div>
  `,
});
