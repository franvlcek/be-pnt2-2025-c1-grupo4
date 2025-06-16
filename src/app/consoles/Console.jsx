import Link from "next/link";
import "../styles/styles.css";
import Image from "next/image";

export default function Console(props){
    return(
        <li className="user-item">
            <div className="card user-item__content">
                <Link href={`/consoles/${props.ID}`}>
                    <div className="user-item__image avatar">
                        <Image
                            src={`/img/consoleicon.png`}
                            alt="User avatar"
                            width={50}
                            height={100}
                        />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.Name}</h2>
                    </div>
                </Link>
            </div>
        </li>
    );
}