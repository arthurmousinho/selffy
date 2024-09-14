import { Link } from "react-router-dom";
import logo from "../../assets/brand/logo.svg";

export function Logo() {
    return (
        <Link to="/">
            <img
                src={logo}
                className="w-[150px]"
            />
        </Link>
    )
}