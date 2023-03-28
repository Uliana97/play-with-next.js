import Link from "next/link";

import classes from "./button.module.css";

interface IButton {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
}

const Button = ({ children, link, onClick }: IButton) => {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
