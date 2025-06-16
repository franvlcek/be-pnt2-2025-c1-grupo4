import Image from "next/image";
import Link from "next/link";
import "./users/users.css";

export default function Home() {
  return (
    <div>
      <a href="/users" className="card user-item__content">Users </a>
      <a href="/games" className="card user-item__content">Games </a>
      <a href="/consoles" className="card user-item__content">Consoles </a>
      <a href="/genres" className="card user-item__content">Game Genres</a>
      <h1>Home Page
      </h1>
    </div>
  );
}
