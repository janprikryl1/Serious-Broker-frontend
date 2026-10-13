import { FC, useEffect, useState, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { TbHandFinger } from "react-icons/tb";
import { ImageModal } from "./ImageModal.tsx";
import { ContentType } from "../../../utils/types/article/ContentType.ts";
import { imageURL } from "../../../utils/constants";
import { useModal } from "../../../utils/hooks/useModal.tsx";
import {defaultImageDimensions, defaultSpring} from "../../../utils/constants/defaultContent.ts";
import "../../../styles/sass/components/control-image-modal.scss"

type Props = {
    task: number;
    category: number;
    content: ContentType[];
};

export const ArticleImageColumn: FC<Props> = ({ task, category, content }) => {
    const [imageDimensions, setImageDimensions] = useState(defaultImageDimensions);
    const [springs, api] = useSpring(() => defaultSpring);
    const imageRef = useRef<HTMLImageElement>(null);
    const [selectedImage, setSelectedImage] = useState("");
    const { isOpen: isModalOpen, openModal: openModal, closeModal: closeModal } = useModal();

    const taskData = content?.[category]?.tasks?.[task];
    const imageUrl = taskData?.image ? `${imageURL}${taskData.image}` : '';
    const animateData = taskData?.animateTo;
    
    const handleLoad = () => {
        if (imageRef.current) {
            setImageDimensions({
                width: imageRef.current.offsetWidth,
                height: imageRef.current.offsetHeight,
            });
        }    
    }
    
    const handleError = () => {
        setImageDimensions(defaultImageDimensions);
    }

    useEffect(() => {
        if (!imageUrl) {
            setImageDimensions(defaultImageDimensions);
            return;
        }

        const imgElement = imageRef.current;

        if (imgElement) {
            imgElement.addEventListener('load', handleLoad);
            imgElement.addEventListener('error', handleError);
            if (imgElement.complete && imgElement.naturalWidth > 0) {
                handleLoad();
            }
        }
        
        return () => {
            if (imgElement) {
                imgElement.removeEventListener('load', handleLoad);
                imgElement.removeEventListener('error', handleError);
            }
        };
    }, [imageUrl]);
    
    useEffect(() => {
        if (
            animateData &&
            typeof animateData.from?.x === 'number' && typeof animateData.from?.y === 'number' &&
            typeof animateData.to?.x === 'number' && typeof animateData.to?.y === 'number' &&
            imageDimensions.width > 0 && imageDimensions.height > 0
        ) {
            // Calculate pixel coordinates from percentages
            const fromXpx = (animateData.from.x / 100) * imageDimensions.width;
            const fromYpx = (animateData.from.y / 100) * imageDimensions.height;
            const toXpx = (animateData.to.x / 100) * imageDimensions.width;
            const toYpx = (animateData.to.y / 100) * imageDimensions.height;
            
            api.start({
                from: {
                    left: fromXpx,
                    top: fromYpx
                },
                to: {
                    left: toXpx,
                    top: toYpx
                },
                loop: true,
                delay: 1000,
                config: { duration: 1500 },
                reset: true
            });
        } else {
            api.stop();
        }

        // Cleanup function
        return () => {
            api.stop();
        };

    }, [animateData, api, imageDimensions]);

    const handleImageClick = (imgSrc: string) => {
        setSelectedImage(imgSrc);
        openModal();
    };

    return (
      <div className="col-sm-4 tw-flex tw-justify-center tw-items-start">
          <div className="article-image-column-container">
              {imageUrl ? (
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt={`Task ${task + 1}`}
                  onClick={() => handleImageClick(imageUrl)}
                  className="tw-max-h-full tw-w-auto tw-object-contain tw-rounded-lg tw-cursor-pointer hover:tw-scale-105 tw-transition-transform"
                />
              ) : (
                <div className="tw-text-stone-200 tw-text-sm">{"No image"}</div>
              )}

              {animateData && (animateData.to?.x !== 0 || animateData.to?.y !== 0) && (
                <animated.div
                  className="article-image-column-animation tw-pointer-events-none"
                  style={{
                      opacity: springs.left.to(l => (l === -9999 ? 0 : 1)),
                      left: springs.left,
                      top: springs.top,
                      position: "absolute"
                  }}
                >
                    <TbHandFinger size={28} className="tw-text-red-500 tw-drop-shadow-lg" />
                </animated.div>
              )}
          </div>

          {imageUrl && <ImageModal isModalOpen={isModalOpen} selectedImage={selectedImage} closeModal={closeModal} />}
      </div>
    );
}