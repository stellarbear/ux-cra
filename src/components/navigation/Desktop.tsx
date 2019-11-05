import { AppBar, Toolbar, makeStyles, Theme, createStyles, Button, } from "@material-ui/core";
import React from "react";
import { GitHub } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            width: "100vw",
            left: 0
        },
        toolbar: {
            margin: 8,
            position: "relative",
            padding: "0px 48px",
            width: "92vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        right: {
            position: "absolute",
            right: 0,
        }
    })
);

interface IDesktop {
    handleNavigation(path: string): void
}

const Desktop: React.FC<IDesktop> = ({
    handleNavigation
}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const navigate = (destination: string) => handleNavigation(destination);

    const renderNavigation = () => (
        <React.Fragment>
            <img height={48} width={48} src={`/logo192.png`} onClick={() => navigate('/home')} />
        </React.Fragment>
    );

    const renderAppBar = (): JSX.Element => (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <div className={classes.toolbar}>
                    {renderNavigation()}
                    <div className={classes.right}>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );

    return (
        <React.Fragment>
            {renderAppBar()}
        </React.Fragment>
    );
}
export default Desktop;