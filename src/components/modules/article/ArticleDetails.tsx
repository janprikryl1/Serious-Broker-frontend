import {FC, useEffect, useState} from 'react';
import {Comments} from "./Comments.tsx";
import CommentForm from "./CommentForm.tsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {animated, useSpring} from '@react-spring/web'
import {ArticleContent, ArticleDetailProps} from "../../../utils/types/article/ArticleProps.ts";
import {getArticleDetails} from "../../../api/articleService.ts";
import Swal from "sweetalert2";
import {Button} from "react-bootstrap";
import {FaCheckCircle} from "react-icons/fa";
import { TbHandFinger } from "react-icons/tb";
import { v4 as uuidv4 } from 'uuid';
import {ArticleSkeleton} from "./ArticleSkeleton.tsx";


export const ArticleDetails: FC = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [article, setArticle] = useState<ArticleDetailProps>();
    const [data, setData] = useState<ArticleContent>();
    const [category, setCategory] = useState(0);
    const [task, setTask] = useState(0);


    const handleIncreaseCategory = () => {
        if (category + 1 < data!.content.length) {
            setCategory(category + 1);
            setTask(0);
        }
    }
    const handleDecreaseCategory = () => {
        if (category - 1 >= 0) {
            setCategory(category - 1);
            setTask(0);
        }
    }

    const handleTaskDone = () => {
        if (task + 1 < data!.content[category].taskData.length) {
            setTask(task + 1);
        }
    }

    const [springs, api] = useSpring(() => ({
        from: { x: 0, y:0 },
    }))

    useEffect(() => {
        if (!data) return;
        const taskData = data.content[category]?.taskData[task];
        const animate = taskData?.animate;

        if (animate && typeof animate.from !== 'undefined' && typeof animate.to !== 'undefined') {
            api.start({
                from: {
                    x: animate.from.x,
                    y: animate.from.y
                },
                to: {
                    x: animate.to.x-150,
                    y: animate.to.y + 50
                },
                loop: true,
                delay: 1000
            });
        }
    }, [task]);
    
    useEffect(() => {
        if (!id) return;
        const fetchArticle = async () => {
            try {
                const response = await getArticleDetails(id);
                const arrayData = response.data[0];
                setArticle(arrayData);
                setData(JSON.parse(arrayData.content));
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: t("Loading failed"),
                    text: t("Please try again later"),
                });
                console.error("Error fetching user details:", error);
            }
        };
        fetchArticle();
    }, []);
    
    return (
        <div className="blog-details__item">
            {data ? (
            <div className="blog-details__item-inner">
                <div key={uuidv4()}>
                    <h1>{data.title}</h1>
                    <br/>
                    <p>{data.description}</p>
                    <br/>
                    {data.subjects.map((subject) => (
                        <div key={subject.title}>
                            <h3>{subject.title}</h3>
                            <p>{subject.text}</p>
                        </div>
                    ))}
                    <br/>

                    {data.content && data.content.length ? (
                        <>
                            <h2>{data.content[category].title}</h2>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <img src={data.content[category].taskData[task].image}
                                             alt={`Task ${task + 1}`}/>
                                        {"animate" in data.content[category].taskData[task] ? (
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
                                        ) : null}
                                    </div>
                                    <div className="col-sm-8">
                                        {data.content[category].taskData.map((data, index) => (
                                            <p key={index}
                                               style={{color: index <= task ? "default" : "gray"}}>{data.text}</p>
                                        ))}

                                        <Button onClick={handleTaskDone} variant="success"
                                                disabled={task === data.content[category].taskData.length - 1}><FaCheckCircle/></Button>
                                    </div>
                                </div>
                            </div>
                            <br/><br/>
                            <Button variant="danger" onClick={handleDecreaseCategory}
                                    disabled={category === 0}>{t("Previous")}</Button> {' '}
                            <Button variant="primary" onClick={handleIncreaseCategory}
                                    disabled={category === data.content.length - 1}>{t("Next")}</Button>
                            <br/><br/>
                        </>
                    ) : <p>{t("Na návodu se pracuje")}</p>}
                </div>
                {article?.allowComments ? (
                    <>
                        <Comments/>
                        <CommentForm/>
                    </>
                ) : <p>{t("Komentáře nejsou povoleny")}</p>}
            </div>
             ) : <ArticleSkeleton />}
        </div>
    );
};