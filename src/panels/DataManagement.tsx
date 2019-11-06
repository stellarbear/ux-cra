import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card, Typography, IconButton, Button, Divider, Tooltip, makeStyles, Theme, createStyles } from '@material-ui/core';

import { ExpandMore, Clear, CloudUpload, CloudDownload } from '@material-ui/icons';
import { ModelProvider } from 'components/wrappers/ModelWrapper';
import UXTable from 'tiles/UXTable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            margin: 8, minWidth: 600
        },
        header: {
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            width: "100%", height: 48
        },
        panel: {
            padding: 0, maxWidth: "calc(100vw - 16px)"
        },
    })
);

interface IDataManagementProps { }

const DataManagement: React.FC<IDataManagementProps> = () => {
    const { importData, exportData, clearData } = React.useContext(ModelProvider);
    const classes = useStyles();

    const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation(); importData(event);
    }
    const onExport = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation(); exportData();
    }
    const onClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation(); clearData();
    }

    return (
        <Card className={classes.card}>
            <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}>
                    <div className={classes.header}>
                        <Typography> Data managment</Typography>
                        <div>
                            <Tooltip title="Clear data">
                                <IconButton color="primary" onClick={onClear}>
                                    <Clear />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export data">
                                <IconButton color="primary" onClick={onExport}>
                                    <CloudUpload />
                                </IconButton>
                            </Tooltip>

                            <label htmlFor="export-ux">
                                <Tooltip title="Import data">
                                    <IconButton component="span" color="primary">
                                        <CloudDownload />
                                    </IconButton>
                                </Tooltip>
                            </label>
                            <input hidden type="file" id="export-ux"
                                onChange={onImport}
                            />
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <Divider variant="middle" />
                <ExpansionPanelDetails className={classes.panel}>
                    <UXTable />
                </ExpansionPanelDetails>
            </ExpansionPanel >
        </Card >
    );
}

export default DataManagement;