import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';
import { ModelProvider } from 'components/wrappers/ModelWrapper';
import { observer } from 'mobx-react-lite';
import { AChart } from 'model/chart';

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
            display: "flex", flexDirection: "column"
        },
        chart: {
            display: "flex", flexDirection: "row",
            alignItems: "center",
        }
    })
);

interface IDataChartProps { }

const DataChart: React.FC<IDataChartProps> = observer(() => {
    const { model, uxKey } = React.useContext(ModelProvider);
    const classes = useStyles();

    const charts = AChart.for(uxKey);

    return (
        <Card className={classes.card}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}>
                    <div className={classes.header}>
                        <Typography>UX Charts</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panel}>
                    <div className={classes.details}>
                        {
                            charts.map(({ render }, index) =>
                                <div className={classes.chart}
                                    key={`metric-${uxKey}-${index}`}>
                                    {render(model)}
                                </div>
                            )
                        }
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Card>
    );
})

export default DataChart;