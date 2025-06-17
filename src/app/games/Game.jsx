import Link from "next/link";
import "../styles/styles.css";
import Image from "next/image";

export default function Game(props){
    return(
        
        <li className="user-item">
            <div className="card user-item__content">
                <Link href={`/games/${props?.ID}`}>
                    <div className="user-item__image avatar">
                        <Image
                            src={`/img/gameicon.png`}
                            alt="Game avatar"
                            width={50}
                            height={100}
                        />
                    </div>
                    <div className="user-item__info">
                        <h2>{props?.Name}</h2>
                        <h3>{props?.Genre}</h3>
                        <h3>{props?.Console}</h3>
                    </div>
                </Link>
            </div>
        </li>
        
    );
}