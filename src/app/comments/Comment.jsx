import Link from "next/link";
import "../styles/styles.css";
import Image from "next/image";

export default function Comment(props){
    let profilePic=`/img/user${props.Role}.png`;
    let cardLink=`/users/${props.UserLink}`;
    if(props.Role == undefined){
        profilePic='/img/gameicon.png';
    }
    if(props.UserLink == undefined){
        cardLink=`/games/${props.GameLink}`;
    }
    return(
        <li className="user-item">
            <div className="card user-item__content">
                <Link href={cardLink}>
                    <div className="user-item__image avatar">
                        <Image
                            src={profilePic}
                            alt="Comment avatar"
                            width={50}
                            height={100}
                        />
                    </div>
                    <div className="user-item__info">
                        <h2>{props?.User}</h2>
                        <h3>{props?.Content}</h3>
                        <p>{props?.Game}</p>
                    </div>
                </Link>
            </div>
        </li>
    );
}

// {
//       "id": 3,
//       "content": "Muy malo, se crashea seguido",
//       "createdAt": "2025-06-17T22:42:53.000Z",
//       "updatedAt": "2025-06-17T22:42:53.000Z",
//       "UserId": 2,
//       "GameId": 6
//     }