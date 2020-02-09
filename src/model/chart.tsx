import React from "react";
import { IUX, UXKey } from "./ux";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

abstract class AChart {
    static for = (metric: UXKey) => {
        switch (metric) {
            case "result": return [new ChartSuccess()]
            case "actions": return [new ChartError()]
            case "time": return [new ChartTime()]
        }
    }

    abstract render(ux: IUX): React.ReactNode
}

class ChartSuccess extends AChart {
    render(ux: IUX): React.ReactNode {
        const data = ux.getData("result")
        const { users } = ux;

        const success = data.map(user => user.reduce((acc: number, cur) => acc + (cur === 1 ? 1 : 0), 0))
        const failure = data.map(user => user.reduce((acc: number, cur) => acc + (cur !== 1 ? 1 : 0), 0))

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: 'column'
                    },
                    xAxis: {
                        categories: users
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of scenarios'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: 'gray'
                            }
                        }
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    series: [{
                        type: "column",
                        name: 'Success',
                        data: success
                    }, {
                        type: "column",
                        name: 'Failure',
                        data: failure
                    }]
                }}
            />
        );
    }
}
class ChartError extends AChart {
    render(ux: IUX): React.ReactNode {
        const data = ux.getData("actions")
        const expert = ux.getExpert("actions")
        const { users, scenarios } = ux;

        const userData = users.map((user, index) => (
            {
                type: "column",
                name: user,
                data: data[index].map(x => x == null ? 0 : x)
            }
        ));
        const expertData = {
            type: "column",
            name: "expert",
            data: expert.map(x => x == null ? 0 : x)
        }
        const series: any[] = [...userData, expertData];

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: 'column'
                    },
                    xAxis: {
                        categories: scenarios
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of actions'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: 'gray'
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}'
                    },
                    series: series
                }}
            />
        );
    }
}
class ChartTime extends AChart {
    render(ux: IUX): React.ReactNode {
        const data = ux.getData("time")
        const expert = ux.getExpert("time")
        const { users, scenarios } = ux;
        const userData = users.map((user, index) => (
            {
                type: "column",
                name: user,
                data: data[index].map(x => x == null ? 0 : x)
            }
        ));
        const expertData = {
            type: "column",
            name: "expert",
            data: expert.map(x => x == null ? 0 : x)
        }
        const series: any[] = [...userData, expertData];

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: 'column'
                    },
                    xAxis: {
                        categories: scenarios
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of actions'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: 'gray'
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}'
                    },
                    series: series
                }}
            />
        );
    }
}

export { AChart }