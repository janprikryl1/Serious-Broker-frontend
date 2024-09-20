import {FC, useEffect} from "react";
import {imageURL} from "../../../../utils/constants";
import {animated, useSpring} from "@react-spring/web";
import {TbHandFinger} from "react-icons/tb";
import {ContentType} from "../../../../utils/types/article/ContentType.ts";

type Props = {
    task: number;
    category: number;
    content: ContentType[];
};

export const ArticleImageColumn:FC<Props> = ({task, category, content}) => {
    const [springs, api] = useSpring(() => ({
        from: { x: 0, y: 0 },
    }));

    useEffect(() => {
        if (!content) return;
        const taskData = content[category]?.tasks[task];
        const animate = taskData?.animateTo;

        if (animate && typeof animate.to.x && typeof animate.to.y) {
            api.start({
                from: {
                    x: animate.from.x,
                    y: animate.from.y
                },
                to: {
                    x: animate.to.x - 150,
                    y: animate.to.y + 50
                },
                loop: true,
                delay: 1000
            });
        }
    }, [task, category, content]);
    
    return (
        <div className="col-sm-4">
            <img
                src={`${imageURL}${content[category].tasks[task].image}`}
                alt={`Task ${task + 1}`}
            />
            {content[category].tasks[task].animateTo.to.x !== 0 && content[category].tasks[task].animateTo.to.y !== 0 && (
                <animated.div
                    style={{
                        ...springs,
                        zIndex: 1,
                        top: springs.y,
                        left: springs.x,
                    }}
                >
                    <TbHandFinger style={{color: "red"}}/>
                </animated.div>
            )}
        </div>
    );
}