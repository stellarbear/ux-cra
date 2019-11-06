import React from 'react';
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tabs, Tab, Card, Typography, Divider } from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';
import { ModelProvider } from 'components/wrappers/ModelWrapper';
import { AMetrics } from 'model/metric';
import { observer } from 'mobx-react-lite';

interface IDataMetricsProps { }

const DataMetrics: React.FC<IDataMetricsProps> = observer(() => {
    const { model, uxKey } = React.useContext(ModelProvider);

    const metrics = AMetrics.for(uxKey);

    return (
        <Card style={{ margin: 8, minWidth: 600 }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}>
                    <div style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%", height: 48
                    }}>
                        <Typography>UX Metrics</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider variant="middle" />
                <ExpansionPanelDetails style={{ padding: 0 }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%" }}>
                        {
                            metrics.map(({ img, calculate }, index) =>
                                <div key={`metric-${uxKey}-${index}`}
                                    style={{
                                        display: "flex", flexDirection: "row",
                                        alignItems: "center",
                                    }}>
                                    <img
                                        style={{ opacity: 0.6 }}
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
        </Card>
    );
})

export default DataMetrics;