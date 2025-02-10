import {FC} from "react";
import {UserDetailsProvider} from "../../utils/providers/UserDetailsProvider.tsx";
import {PersonalDataEdit} from "../../components/modules/profile/userDetails/PersonalDataEdit.tsx";
import {LocationData} from "../../components/modules/profile/userDetails/LocationData.tsx";
import {FirmData} from "../../components/modules/profile/userDetails/FirmData.tsx";
import {CreatedLastEdited} from "../../components/modules/profile/userDetails/CreatedLastEdited.tsx";
import {UploadChangesButton} from "../../components/modules/profile/userDetails/UploadChangesButton.tsx";
import {NewsletterEdit} from "../../components/modules/profile/userDetails/NewsletterEdit.tsx";

export const ProfileEdit:FC = () => {
    return (
        <div className="padding-bottom">
            <div className="service-details__item">
                <div className="service-details__item-inner">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <UserDetailsProvider>
                            <div className="admin-container mt-4">
                                <div className="row justify-content">
                                    <div className="col-md-6">
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
        </div>
    );
}