import {FC, useEffect, useState} from "react";
import {UserType} from "../../utils/types/user/userTypes.ts";
import {getAllUsers} from "../../api/adminService.ts";

export const UserManagment:FC = () => {
    const [users, setUsers] = useState<UserType[]>();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getAllUsers();
                if (!response) return;
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUsers();
    }, []);
    
    return (
        <div className="blog-details padding-top padding-bottom section-bg-color">
            <div className="container">
                <div className="blog-details__wrapper">
                    <div className="row g-5">
                        <div className="col-lg-8">
                            User managment
                        </div>
                        <div className="col-lg-4 col-md-8  col-12">
                            <div className="sidebar">
                                
                                    
                                
                                    {
                                        users && users.map((user, index) => (
                                            <div key={index}>
                                                {user.email}
                                            </div>
                                        ))
                                    }                                 
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}