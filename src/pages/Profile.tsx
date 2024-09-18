import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {FC} from "react";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {UserDetailsProvider} from "../utils/providers/UserDetailsProvider.tsx";
import {PersonalDataEdit} from "../components/modules/userDetails/PersonalDataEdit.tsx";
import {LocationData} from "../components/modules/userDetails/LocationData.tsx";
import {FirmData} from "../components/modules/userDetails/FirmData.tsx";
import {CreatedLastEdited} from "../components/modules/userDetails/CreatedLastEdited.tsx";
import {UploadChangesButton} from "../components/modules/userDetails/UploadChangesButton.tsx";

export const Profile: FC = () => {
    const {user} = useUserContext();
    
    if (user) {
        return (
            <>
                <TitleHeader title="Profile"/>
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
            </>
        );
    }
}