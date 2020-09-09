import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import '@storybook/addon-console';
import '!style-loader!css-loader!sass-loader!./global.scss';

setCompodocJson(docJson);
