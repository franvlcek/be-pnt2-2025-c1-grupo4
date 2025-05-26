import Image from "next/image";
import Link from "next/link";
import "./users/users.css";

export default function Home() {
  return (
    <div>
      <a href="/users" className="card user-item__content">Users</a>
      <h1>Home Page
      </h1>
    </div>
  );
}
