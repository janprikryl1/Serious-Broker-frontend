import {FC} from "react";
import {UserDetailsProvider} from "../../utils/providers/UserDetailsProvider.tsx";
import {PersonalDataEdit} from "../../components/profile/userDetails/PersonalDataEdit.tsx";
import {LocationData} from "../../components/profile/userDetails/LocationData.tsx";
import {FirmData} from "../../components/profile/userDetails/FirmData.tsx";
import {NewsletterEdit} from "../../components/profile/userDetails/NewsletterEdit.tsx";
import {CreatedLastEdited} from "../../components/profile/userDetails/CreatedLastEdited.tsx";
import {UploadChangesButton} from "../../components/profile/userDetails/UploadChangesButton.tsx";

export const ProfileEdit:FC = () => {
    return (
        <div className="padding-bottom  tw-pb-6">
            <div className="container ">
                <div
                    className=" tw-px-0 sm:tw-px-2"
                    data-aos="fade-up"
                    data-aos-duration="900"
                >
                    <UserDetailsProvider>
                        <div className="admin-container mt-4">
                            <div className="row justify-content">
                                <div className="col-12 col-lg-8 col-xl-6">
                                    <PersonalDataEdit/>
                                    <LocationData/>
                                    <FirmData/>
                                    <NewsletterEdit/>
                                    <CreatedLastEdited/>
                                    <UploadChangesButton/>
                                </div>
                            </div>
                        </div>
                    </UserDetailsProvider>
                </div>
            </div>
        </div>
    );
}