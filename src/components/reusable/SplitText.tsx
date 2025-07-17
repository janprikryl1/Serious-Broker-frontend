import {FC, useEffect, useRef} from "react";
import {splitText} from "motion-plus";
import {animate, stagger} from "motion";

type Props = {
    text: string;
    type?: "h1" | "h2" | "h3" | "p";
    color?: string;
}

export const SplitText:FC<Props> = ({ text, type = "h1", color="#fff" }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Hide the container until the fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector(type)!
            )

            // Animate the words in the h1
            animate(
                words,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 2,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })
    }, [])

    return (
        <div ref={containerRef}>
            {type === "h1" ? <h1 style={{color: color}}>{text}</h1>
             : type === "h2" ? <h2 style={{color: color}}>{text}</h2>
             : type === "h3" ? <h3 style={{color: color}}>{text}</h3>
             : <p style={{color: color}}>{text}</p>}
        </div>
    )
}