import React, { useState } from "react";
import {useTranslation} from "react-i18next";

const CommentForm: React.FC = () => {
    const { t } = useTranslation();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <div
            className="blog-details__commentform"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className="sidebar">
                <div className="sidebar__commentform" id="post">
                    <div className="sidebar__head">
                        <h3>{t("Leave a comment")}</h3>
                    </div>
                    <div className="sidebar__commentform-body pt-25">
                        <form action="/">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div>
                                        <label htmlFor="name" className="form-label">
                                            {t("Name")}
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder={t("Full Name")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder={t("Email here")}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div>
                                        <label htmlFor="textarea" className="form-label">
                                            {t("Message")}
                                        </label>
                                        <textarea
                                            cols={30}
                                            rows={5}
                                            className="form-control"
                                            id="textarea"
                                            placeholder={t("Enter Your Message")}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="trk-btn trk-btn--border trk-btn--primary mt-4"
                                onClick={handleClick}
                            >
                                {t("Send")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentForm;
