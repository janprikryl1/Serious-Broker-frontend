import {motion, useAnimate, useDragControls, useMotionValue} from "framer-motion";
import useMeasure from "react-use-measure";
import {Dispatch, ReactNode, SetStateAction} from "react";
import "../../styles/sass/components/drag_close_drawer.scss";

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
}

export const DragCloseDrawer = ({ open, setOpen, children }: Props) => {
    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
        animate(scope.current, {
            opacity: [1, 0],
        });

        const yStart = typeof y.get() === "number" ? y.get() : 0;

        await animate("#drawer", {
            y: [yStart, height],
        });

        setOpen(false);
    };

    return (
        <>
            {open && (
                <motion.div
                    ref={scope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    className="overlayStyle"
                >
                    <motion.div
                        id="drawer"
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="drawerStyle"
                        style={{ y }}
                        drag="y"
                        dragControls={controls}
                        onDragEnd={() => {
                            if (y.get() >= 100) {
                                handleClose();
                            }
                        }}
                        dragListener={false}
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                        }}
                        dragElastic={{
                            top: 0,
                            bottom: 0.5,
                        }}
                    >
                        <div className="handleContainerStyle">
                            <button
                                onPointerDown={(e) => {
                                    controls.start(e);
                                }}
                                className="handleButtonStyle"
                                onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
                                onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
                            ></button>
                        </div>
                        <div className="contentContainerStyle">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};
