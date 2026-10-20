import {FC} from "react";
import {ProfileSessionsList} from "../../components/profile/sessions/ProfileSessionsList.tsx";
import {useTranslation} from "react-i18next";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";

export const ProfileSessions: FC = () => {
  const {t} = useTranslation();
  return (
    <>
      <TitleHeader title={t("Profile Sessions")}/>
      <div className=" padding-bottom">
        <div className="container ">
          <div
            className=""
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <ProfileSessionsList/>
          </div>
        </div>
      </div>
    </>
  );
};