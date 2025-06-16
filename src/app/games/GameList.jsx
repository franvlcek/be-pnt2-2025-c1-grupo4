import "../styles/styles.css";
import Game from "./Game";
export default function GameList(props){
    
    return(
        <ul className="users-list">
            {props.Games.map((game)=>{
                return(
                    <Game
                    key = {game["id"]}
                    ID = {game["id"]}
                    Name = {game["gameName"]}
                    Genre = {game["Genre"].genreName}
                    Console = {game["Console"].name}
                    />
                );
            })}
        </ul>
    );
}