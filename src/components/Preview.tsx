import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { preview as previewCode } from "../stores/preview/previewSlice";

// interface PreviewProps {

// }

const Preview: React.FC = () => {
    const [code, setCode] = useState<string>("")
    const preview = useSelector(previewCode);

    useEffect(() => {
          setCode(`
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code Playground</title>
    <style type="text/css">  ${preview.style}</style>
    <script>  ${preview.js}</script>
  </head>
  <body>
  ${preview.html}
  </body>
</html>
          `);
    }, [preview]);
    
    function handleErrorCapture() {
        console.log(3);
    }
    return (
      <>
        <iframe
          onError={handleErrorCapture}
          onErrorCapture={handleErrorCapture}
          className="h-full w-full"
          srcDoc={code}
        ></iframe>
      </>
    );
};

export default Preview;
