import {FC} from "react";
import {UserType} from "../../../../utils/types/user/userTypes.ts";
import {UserAchievmentSkeleton} from "./UserAchievmentSkeleton.tsx";

type Props = {
    selectedUser?: UserType;
}

export const UserAchievmentDetails:FC<Props> = ({selectedUser}) => {
    return (
        <div className="padding-bottom padding-top">
            <p>UserAchievmentDetails</p>
            {selectedUser ? (
                <p>{selectedUser.nickname}</p>
            ) : (
              <UserAchievmentSkeleton />  
            )}
        </div>
    );
};