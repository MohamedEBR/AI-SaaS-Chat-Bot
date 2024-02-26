import { Link } from "react-router-dom"

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>;
}
const NavLink = (props: Props) => {
  return <Link 
  className="nav-link"
  onClick={props.onClick}
  to={props.to} 
  style={{  
    color: props.textColor, 
    background: props.bg 
    }}>
        {props.text}
        </Link>
}

export default NavLink
