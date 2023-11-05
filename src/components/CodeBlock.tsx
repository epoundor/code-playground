import React, { useEffect, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { LanguageSupport } from '@codemirror/language';
import { beautify } from '../plugins/prettier';
import { Lang, languagesMap } from '../constants';

interface CodeBlockProps {
    onChange: (value: string, viewUpdate?: ViewUpdate) => void;
    height: string;
    value: string;
    name: string;
    lang: Lang;
}

const CodeBlock: React.FC<CodeBlockProps> = (props) => {
    const [extensions, setextensions] = useState<LanguageSupport[]>([]);
    function onBeautify() {
        const beautifyCode = beautify(props.value, {
            parser: props.lang.toLowerCase()
        });
        props.onChange(beautifyCode);
    }

    useEffect(() => {
        return () => {
            setextensions(languagesMap[props.lang]);
        };
    }, [props.lang]);

    return (
        <div className="flex flex-col bg-[#2b2f36] text-white">
            <div className="px-4 flex justify-between">
                <span className="font-semibold">{props.name}</span>
                <span className="text-sm" onClick={onBeautify}>
                    Beautify
                </span>
            </div>
            <CodeMirror
                value={props.value}
                height={`calc(${props.height} - 24px)`}
                theme="dark"
                extensions={extensions}
                onChange={props.onChange}
            />
        </div>
    );
};

export default CodeBlock;
