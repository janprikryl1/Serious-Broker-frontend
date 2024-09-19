import { FC, useEffect, useState } from 'react';
import { Comments } from "./Comments";
import { CommentForm } from "./CommentForm";
import { useTranslation } from "react-i18next";
import { animated, useSpring } from '@react-spring/web';
import { Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { TbHandFinger } from "react-icons/tb";
import { v4 as uuidv4 } from 'uuid';
import { ArticleSkeleton } from "./ArticleSkeleton";
import { ArticleDetailProps } from "../../../utils/types/article/ArticleDetailProps";
import { useUserContext } from "../../../utils/providers/providerUser";
import { CommentType } from "../../../utils/types/CommentType";
import {imageURL} from "../../../utils/constants";
import {SubjectType} from "../../../utils/types/article/SubjectType.ts";
import {ContentType} from "../../../utils/types/article/ContentType.ts";

type Props = {
    article: ArticleDetailProps;
};

export const ArticleDetails: FC<Props> = ({ article }) => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const [category, setCategory] = useState(0);
    const [task, setTask] = useState(0);
    const [comments, setComments] = useState<CommentType[]>();
    const content:ContentType[] = JSON.parse(article.content);
    const subjects:SubjectType[]  = JSON.parse(article.subjects);
    
    const handleIncreaseCategory = () => {
        if (category + 1 < content.length) {
            setCategory(category + 1);
            setTask(0);
        }
    };

    const handleDecreaseCategory = () => {
        if (category - 1 >= 0) {
            setCategory(category - 1);
            setTask(0);
        }
    };

    const handleTaskDone = () => {
        if (task + 1 < content[category].tasks.length) {
            setTask(task + 1);
        }
    };

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
        <div className="blog-details__item">
            {content ? (
                <div className="blog-details__item-inner">
                    <div key={uuidv4()}>
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <i>{article.changed}</i>
                        <br /><br />
                        <p>{article.description}</p>
                        <br />
                        {subjects?.map((subject) => (
                            <div key={subject.title}>
                                <h3>{subject.title}</h3>
                                <p>{subject.text}</p>
                            </div>
                        ))}
                        <br />
                        {content && content.length ? (
                            <>
                                <h2>{content[category].title}</h2>
                                <div className="container">
                                    <div className="row">
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
                                                    <TbHandFinger style={{ color: "red" }} />
                                                </animated.div>
                                            )}
                                        </div>
                                        <div className="col-sm-8">
                                            {content[category].tasks.map((taskData, index) => (
                                                <p key={index} style={{ color: index <= task ? "default" : "gray" }}>
                                                    {taskData.task}
                                                </p>
                                            ))}

                                            <Button
                                                onClick={handleTaskDone}
                                                variant="success"
                                                disabled={task === content[category].tasks.length - 1}
                                            >
                                                <FaCheckCircle />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <br /><br />
                                <Button
                                    variant="danger"
                                    onClick={handleDecreaseCategory}
                                    disabled={category === 0}
                                >
                                    {t("Previous")}
                                </Button>{' '}
                                <Button
                                    variant="primary"
                                    onClick={handleIncreaseCategory}
                                    disabled={category === content.length - 1}
                                >
                                    {t("Next")}
                                </Button>
                                <br /><br />
                            </>
                        ) : (
                            <p>{t("Na návodu se pracuje")}</p>
                        )}
                    </div>
                    {article?.allowComments ? (
                        <>
                            <Comments articleId={article.id} setComments={setComments} comments={comments} />
                            {user && <CommentForm articleId={article.id} setComments={setComments} />}
                        </>
                    ) : (
                        <p>{t("Komentáře nejsou povoleny")}</p>
                    )}
                </div>
            ) : (
                <ArticleSkeleton />
            )}
        </div>
    );
};
