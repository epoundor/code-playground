import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { preview as previewCode } from "../stores/preview/previewSlice";
import DebugBar from "./DebugBar";
import { useMitt } from '../hooks/useMitt';

// interface PreviewProps {

// }

const Preview: React.FC = () => {
    const emitter = useMitt();

    const [code, setCode] = useState<string>('');
    const [isMouseMove, setIsMouseMove] = useState<boolean>(false);
    const [errorLogs, setErrorLogs] = useState<string[]>([]);
    const iframe = useRef<HTMLIFrameElement>(null);
    const preview = useSelector(previewCode);
    // TODO
    function minify(code: string) {
        return code;
    }
    useEffect(() => {
        try {
            window.eval;
            if (iframe.current && iframe.current.contentWindow)
                (iframe.current.contentWindow as Window & typeof globalThis).eval(preview.js);
        } catch (error: unknown) {
            const knownError = error as Error;
            setErrorLogs([...errorLogs, knownError.message]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preview.js]);

    useEffect(() => {
        setCode(
            minify(`
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code Playground</title>
    <style type="text/css">${preview.style}</style>
  </head>
  <body>
  ${preview.html}
  </body>
</html>
          `)
        );
    }, [preview.html, preview.style]);

    useEffect(() => {
        const iframeDoc =
            iframe.current?.contentDocument || iframe.current?.contentWindow?.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(code);
            iframeDoc.close();
        }
    }, [code]);

    useEffect(() => {
        emitter.on('mouseMoveStart', () => {
            setIsMouseMove(true);
        });
        emitter.on('mouseMoveEnd', () => {
            setIsMouseMove(false);
        });
        console.log(emitter.all);
    }, []);

    return (
        <>
            <DebugBar />
            <iframe className="h-full w-full" ref={iframe}></iframe>
            {isMouseMove && <div className="h-full absolute top-0 inset-x-0 bg-transparent"></div>}
        </>
    );
};

export default Preview;
