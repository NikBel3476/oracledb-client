import React, { FC } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
	children?: React.ReactNode | React.ReactNode[];
};

const Header: FC<HeaderProps> = ({ children }) => {
	return <header className={styles.header__wrapper}>{children}</header>;
};

export default Header;
