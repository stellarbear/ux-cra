import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card, Typography, Divider, makeStyles, Theme, createStyles } from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';
import { ModelProvider } from 'components/wrappers/ModelWrapper';
import { AMetrics } from 'model/metric';
import { observer } from 'mobx-react-lite';

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
            padding: 0,
        },
        details: {
            display: "flex", flexDirection: "column", width: "100%",
        },
        metric: {
            display: "flex", flexDirection: "row", width: "100%",
            alignItems: "center", justifyContent: "center"
        },
        image: {
            opacity: 0.6
        }
    })
);

interface IDataMetricsProps { }

const DataMetrics: React.FC<IDataMetricsProps> = observer(() => {
    const { model, uxKey } = React.useContext(ModelProvider);
    const classes = useStyles();

    const metrics = AMetrics.for(uxKey);

    return (
        <Card className={classes.card}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}>
                    <div className={classes.header}>
                        <Typography>UX Metrics</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider variant="middle" />
                <ExpansionPanelDetails className={classes.panel}>
                    <div className={classes.details}>
                        {
                            metrics.map(({ img, calculate }, index) =>
                                <div key={`metric-${uxKey}-${index}`} className={classes.metric}>
                                    <img
                                        alt="asset"
                                        className={classes.image}
                                        height={128}
                                        src={require(`assets/metrics/${img}.png`)}
                                        onError={(e) => { }} />
                                    <Typography variant="h3">
                                        {` =  ${calculate(model)} %`}
                                    </Typography>
                                </div>
                            )
                        }
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Card >
    );
})

export default DataMetrics;