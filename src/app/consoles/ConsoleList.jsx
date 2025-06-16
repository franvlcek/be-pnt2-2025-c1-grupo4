import "../styles/styles.css";
import Console from "./Console";
export default function ConsoleList(props){
    
    return(
        <ul className="users-list">
            {props.Consoles.map((console)=>{
                return(
                    <Console
                    key={console["id"]}
                    ID={console["id"]}
                    Name={console["name"]}
                    />
                );
            })}
        </ul>
    );
}