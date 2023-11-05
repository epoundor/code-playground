import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { preview as previewCode } from "../stores/preview/previewSlice";
import DebugBar from "./DebugBar";

// interface PreviewProps {

// }

const Preview: React.FC = () => {
  const [code, setCode] = useState<string>("");
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
      } catch (error: { message: string }) {
          setErrorLogs([...errorLogs, error]);
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
      const iframeDoc = iframe.current?.contentDocument || iframe.current?.contentWindow?.document;
      if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(code);
          iframeDoc.close();
      }
  }, [code]);

  return (
      <>
          <DebugBar />
          <iframe className="h-full w-full" ref={iframe}></iframe>
      </>
  );
};

export default Preview;
