import { useDispatch, useSelector } from "react-redux";
import { setHtml, setJs, setStyle } from "./stores/preview/previewSlice";
import CodeBlock from './components/CodeBlock';
import { preview as previewCode } from './stores/preview/previewSlice';
import Preview from './components/Preview';
import { useEffect } from 'react';
import { Lang } from './constants';

export default function App() {
    const dispatch = useDispatch();
    const preview = useSelector(previewCode);

    const onChangeStyle = (value: string) => {
        dispatch(setStyle(value));
    };
    const onChangeJs = (value: string) => {
        dispatch(setJs(value));
    };
    const onChangeHtml = (value: string) => {
        dispatch(setHtml(value));
    };

    function setDefaultCode() {
        onChangeHtml(
            `<div class="a">
  <div class="b r"></div>
  <div class="b l"></div>
</div>`
        );

        onChangeStyle(
            `body{
  background-color: #343456;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh
}
.a{
  display: flex
}
.b{
  height: 200px;
  width: 100px;
  background-color: yellow;
  border-radius: 0 0 0 0px
}
.l{
  border-bottom-left-radius: 100px
}
.r{
  border-bottom-right-radius: 0100px
}`
        );
        onChangeJs(`console.log("Hello world")`);
    }

    useEffect(() => {
        setDefaultCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-full grid grid-rows-3 grid-cols-2">
            <CodeBlock
                value={preview.html}
                height={`${window.innerHeight / 3}px`}
                onChange={onChangeHtml}
                name="HTML"
                lang={Lang.HTML}
            />
            <div className="row-span-3">
                <Preview />
            </div>
            <CodeBlock
                value={preview.style}
                height={`${window.innerHeight / 3}px`}
                onChange={onChangeStyle}
                name="CSS"
                lang={Lang.CSS}
            />

            <CodeBlock
                value={preview.js}
                height={`${window.innerHeight / 3}px`}
                onChange={onChangeJs}
                name="JS"
                lang={Lang.JS}
            />
        </div>
    );
}
