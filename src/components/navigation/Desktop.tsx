import { AppBar, Toolbar, makeStyles, Theme, createStyles, Typography, } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            margin: 8,
        },
        toolbar: {
            margin: 8,
            position: "relative",
            padding: "0px 48px",
            width: "92vw",
            display: "flex",
            justifyContent: "flex-start",
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
    const navigate = (destination: string) => handleNavigation(destination);

    const renderNavigation = () => (
        <React.Fragment>
            <img alt="logo" height={48} width={48} src={`/logo.png`} onClick={() => navigate('/home')} />
            <div>
                <Typography variant='h5' color='inherit' style={{ marginLeft: 20 }}>UX Metrics (ISO-9241)</Typography>
                <Typography variant='caption' style={{ marginLeft: 20 }}>@stellarbears</Typography>
            </div>
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