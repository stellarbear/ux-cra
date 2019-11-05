import { CssBaseline, Hidden, Toolbar, } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { useTranslation } from "react-i18next";

interface INavigationProps extends RouteComponentProps {
	rtl?: boolean;
}

const NavigationWrapper: React.FC<INavigationProps> = ({
	children,
	history,
	rtl = false
}) => {
	const { i18n: { language } } = useTranslation();

	const handleNavigation = (destination: string) =>
		history.push(`/${language}${destination}`);

	return (
		<React.Fragment>
			<CssBaseline />
			<Hidden smUp implementation="css" >
				<Mobile rtl={rtl} handleNavigation={handleNavigation} />
			</Hidden>
			<Hidden xsDown implementation="css" >
				<Desktop handleNavigation={handleNavigation} />
			</Hidden>
			<Toolbar />
			{children}
		</React.Fragment >
	);
}

export default
	withRouter(NavigationWrapper);
