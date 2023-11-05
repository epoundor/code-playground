import { format, Options } from 'prettier';
import babel from 'prettier/parser-babel';
import html from 'prettier/parser-html';
import css from 'prettier/parser-postcss';

const jsParser = {
    parsers: {
        js: babel.parsers.babel
    }
};

const prettierOptions: Options = {
    bracketSameLine: true,
    printWidth: 100,
    proseWrap: 'always',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    useTabs: false,
    plugins: [babel, html, css, jsParser]
};

export function beautify(str: string, options: Options = {}) {
    return format(str, { ...prettierOptions, ...options });
}
