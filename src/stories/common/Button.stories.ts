import { action } from '@storybook/addon-actions';
import { ButtonComponent } from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Button',
  component: ButtonComponent,
};

export const WithSomeEmojiAndAction = () => ({
  component: ButtonComponent,
  props: {
    text: '😀 😎 👍 💯',
    click: action('This was clicked OMG'),
  },
});