import {FC} from "react";
import {UserDetailsProvider} from "../../utils/providers/UserDetailsProvider.tsx";
import {PersonalDataEdit} from "../../components/modules/profile/userDetails/PersonalDataEdit.tsx";
import {LocationData} from "../../components/modules/profile/userDetails/LocationData.tsx";
import {FirmData} from "../../components/modules/profile/userDetails/FirmData.tsx";
import {CreatedLastEdited} from "../../components/modules/profile/userDetails/CreatedLastEdited.tsx";
import {UploadChangesButton} from "../../components/modules/profile/userDetails/UploadChangesButton.tsx";

export const ProfileEdit:FC = () => {
    return (
        <UserDetailsProvider>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <PersonalDataEdit />
                        <LocationData />
                        <FirmData />
                        <CreatedLastEdited />
                        <UploadChangesButton />
                    </div>
                </div>
            </div>
        </UserDetailsProvider>  
    );
}