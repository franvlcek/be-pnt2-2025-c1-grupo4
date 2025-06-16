import "../styles/styles.css";
import Genre from "./Genre";
export default function GenreList(props){
    
    return(
        <ul className="users-list">
            {props.Genres.map((genre)=>{
                return(
                    <Genre
                    key = {genre["id"]}
                    ID = {genre["id"]}
                    Name = {genre["genreName"]}
                    />
                );
            })}
        </ul>
    );
}