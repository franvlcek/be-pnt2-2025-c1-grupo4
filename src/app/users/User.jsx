import Link from "next/link";
import "./users.css";
import Image from "next/image";

export default function User(props){
    return(
        <li className="user-item">
            <div className="card user-item__content">
                <Link href={`/users/${props.ID}`}>
                    <div className="user-item__image avatar">
                        <Image
                            src={`/img/user${props.Role}.png`}
                            alt="User avatar"
                            width={50}
                            height={100}
                        />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.UserName}</h2>
                        <h3>{props.Email}</h3>
                    </div>
                </Link>
            </div>
        </li>
    );
}