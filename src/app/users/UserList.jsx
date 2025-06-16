import "./users.css";
import User from "./User";
export default function UserList(props){
    
    return(
        <ul className="users-list">
            {props.Users.map((user)=>{
                return(
                    <User
                    key={user["id"]}
                    ID={user["id"]}
                    UserName={user["name"]}
                    Email={user["mail"]}
                    Role = {user["RoleId"]}
                    />
                );
            })}
        </ul>
    );
}