import React from 'react';
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tabs, Tab, Card, Typography } from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';
import { ModelProvider } from 'components/wrappers/ModelWrapper';
import { AMetrics } from 'model/metric';
import { AChart } from 'model/chart';
import { observer } from 'mobx-react-lite';

interface IDataChartProps { }

const DataChart: React.FC<IDataChartProps> = observer(() => {
    const { model, uxKey } = React.useContext(ModelProvider);

    const charts = AChart.for(uxKey);

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
                        <Typography>UX Charts</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ padding: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {
                            charts.map(({ render }, index) =>
                                <div key={`metric-${uxKey}-${index}`}
                                    style={{
                                        display: "flex", flexDirection: "row",
                                        alignItems: "center",
                                    }}>
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