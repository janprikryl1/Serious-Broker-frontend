import {FC} from "react";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {ArticleDetails} from "../components/modules/article/ArticleDetails.tsx";
import {SidebarSearch} from "../components/modules/article/SidebarSearch.tsx";
import {ArticleCategories} from "../components/modules/article/ArticleCategories.tsx";
import {RecentPost} from "../components/modules/article/RecentPost.tsx";

export const Article:FC = () => {
    return (
        <>
            <TitleHeader title = "Article" />
            <div className="blog-details padding-top padding-bottom section-bg-color">
                <div className="container">
                    <div className="blog-details__wrapper">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <ArticleDetails />
                            </div>
                            <div className="col-lg-4 col-md-8  col-12">
                                <div className="sidebar">
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <SidebarSearch />
                                        </div>
                                        <div className="col-12">
                                            <ArticleCategories />
                                        </div>
                                        <div className="col-12">
                                            <RecentPost />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}