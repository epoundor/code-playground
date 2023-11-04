import React, { useEffect, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";

export enum Lang {
    CSS = "CSS",
    JS = "JS",
    HTML = "HTML"
}
interface CodeBlockProps {
  onChange: (value: string, viewUpdate: ViewUpdate) => void;
  height: string;
  value: string;
  name: string;
  lang: Lang;
}

const languagesMap = {
  [Lang.CSS]: [css()],
  [Lang.JS]: [javascript()],
  [Lang.HTML]: [html()],
};
const CodeBlock: React.FC<CodeBlockProps> = (props) => {
    const [extensions, setextensions] = useState<LanguageSupport[]>([]);
    useEffect(() => {
    
      return () => {
        setextensions(languagesMap[props.lang])
      }
    }, [])
    
  return (
    <div className="flex flex-col bg-[#2b2f36] text-white">
      <div className="pl-4">{props.name}</div>
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
