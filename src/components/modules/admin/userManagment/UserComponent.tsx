import {FC} from "react";
import {UserType} from "../../../../utils/types/user/userTypes.ts";
import {toCzechDate} from "../../../../utils/constants/functions.ts";

type Props = {
    user: UserType;
}

export const UserComponent:FC<Props> = ({user}) => {
    return (
        <tr>
            <th scope="row">{user.nickname}</th>
            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
            <td>{user.title_before}</td>
            <td>{user.firstname}</td>
            <td>{user.midlename}</td>
            <td>{user.surname}</td>
            <td>{user.title_after}</td>
            <td>{user.role}</td>
            <td>{user.firm_vat &&
                <>
                    <p>Firm</p>
                    <p>{user.firm_name}</p>
                    <p>{user.firm_id}</p>
                    <p>{user.firm_vat}</p>
                </>
            }</td>
            <td>{user.street}</td>
            <td>{user.street_number}</td>
            <td>{user.town}</td>
            <td>{user.country}</td>
            <td>{toCzechDate(user.changed)}</td>
            <td>{toCzechDate(user.created)}</td>
        </tr>
    )
}
