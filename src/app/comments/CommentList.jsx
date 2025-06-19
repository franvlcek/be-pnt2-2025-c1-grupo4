import "../styles/styles.css";
import Comment from "./Comment";
export default function CommentList(props){
    
    return(
        <ul className="users-list">
            {props.Comments.map((comment)=>{
                return(
                    <Comment
                    key = {comment["id"]}
                    ID = {comment["id"]}
                    Content = {comment["content"]}
                    UserId = {comment["User"].id}
                    User = {comment["User"].name}
                    Game = {comment["Game"].gameName}
                    Role = {comment["User"].RoleId}
                    GameLink = {comment["GameId"]}
                    />
                );
            })}
        </ul>
    );
}