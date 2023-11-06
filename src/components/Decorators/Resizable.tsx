import React, {
    MouseEvent as ReactMouseEvent,
    PropsWithChildren,
    useRef,
    useState,
    useEffect
} from 'react';

type ResizeHandleAxis = 'ew' | 'ns';

interface ResizableProps {
    handle: ResizeHandleAxis;
    className?: string;
    style?: React.CSSProperties;
}
interface Dimensions {
    width: number;
    height: number;
}
interface Position {
    x: number;
    y: number;
}

const Resizable: React.FC<PropsWithChildren<ResizableProps>> = (props) => {
    const [originalDimensions, setOriginalDimensions] = useState<Dimensions>();
    const [originalPositions, setOriginalPositions] = useState<Position>();

    const resizableElement = useRef<HTMLDivElement>(null);

    function resize(event: MouseEvent) {
        if (originalDimensions && originalPositions && resizableElement.current) {
            const width = originalDimensions.width + (event.pageX - originalPositions.x);
            const height = originalDimensions.height + (event.pageY - originalPositions?.y);
            console.log(width);
            if (props.handle === 'ew') {
                resizableElement.current.style.width = width + 'px';
            }
            if (props.handle === 'ns') {
                resizableElement.current.style.height = height + 'px';
            }
        }
    }
    function stopResize() {
        if (originalPositions) {
            removeEventListener('mousemove', resize);
        }
    }
    // I rename this type cause of ts shit
    function handleMouseDown(event: ReactMouseEvent<HTMLSpanElement>) {
        event.preventDefault();

        if (!resizableElement.current) return;
        setOriginalDimensions({
            width: resizableElement.current.offsetWidth,
            height: resizableElement.current.offsetHeight
        });
        setOriginalPositions({
            x: event.pageX,
            y: event.pageY
        });

        addEventListener('mousemove', resize);
        addEventListener('mouseup', stopResize);
    }
    useEffect(() => {
        if (resizableElement.current) {
            setOriginalDimensions({
                width: resizableElement.current.offsetWidth,
                height: resizableElement.current.offsetHeight
            });
        }
    }, []);

    return (
        <>
            <div className={props.className} style={props.style} ref={resizableElement}>
                {props.children}
            </div>
            <span
                onMouseDown={handleMouseDown}
                className="inline-flex items-center justify-center px-1 bg-slate-900 cursor-ew-resize">
                <span className="w-1 bg-white rounded-full h-20"></span>
            </span>
        </>
    );
};

export default Resizable;
