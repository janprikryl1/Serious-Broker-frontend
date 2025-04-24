import { FC, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { TbHandFinger } from "react-icons/tb";
import {ImageModal} from "./ImageModal.tsx";
import {ContentType} from "../../../utils/types/article/ContentType.ts";
import {imageURL} from "../../../utils/constants";
import {useModal} from "../../../utils/hooks/useModal.tsx";
import {defaultSpring} from "../../../utils/constants/defaultContent.ts";

type Props = {
    task: number;
    category: number;
    content: ContentType[];
};

export const ArticleImageColumn: FC<Props> = ({ task, category, content }) => {
    const [springs, api] = useSpring(() => defaultSpring);
    const { isOpen: isModalOpen, openModal: openModal, closeModal: closeModal } = useModal();
    const [selectedImage, setSelectedImage] = useState("");

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

    const handleImageClick = (imgSrc: string) => {
        setSelectedImage(imgSrc);
        openModal();
    };

    return (
        <div className="col-sm-4">
            <img
                src={`${imageURL}${content[category].tasks[task].image}`}
                alt={`Task ${task + 1}`}
                onClick={() => handleImageClick(`${imageURL}${content[category].tasks[task].image}`)}
                style={{ cursor: 'pointer' }}
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
                    <TbHandFinger style={{ color: "red" }} />
                </animated.div>
            )}
            <ImageModal isModalOpen={isModalOpen} selectedImage={selectedImage} closeModal={closeModal} />
        </div>
    );
}
