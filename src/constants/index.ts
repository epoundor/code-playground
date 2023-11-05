import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';

export enum Lang {
    CSS = 'CSS',
    JS = 'JS',
    HTML = 'HTML'
}
export const languagesMap = {
    [Lang.CSS]: [css()],
    [Lang.JS]: [javascript()],
    [Lang.HTML]: [html()]
};
