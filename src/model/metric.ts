import { IUX, UXKey } from "./ux";

abstract class AMetrics {
    static for = (metric: UXKey) => {
        switch (metric) {
            case "result": return [new UXSuccess()]
            case "actions": return [new UXError()]
            case "time": return [new UXTime()]
        }
    }

    abstract get img(): string;
    abstract calculate(ux: IUX): number
    //abstract visualize(ux: IUX): number
}

class UXSuccess extends AMetrics {
    calculate(ux: IUX): number {
        const data = ux.getData("result")
        const { users, scenarios } = ux;
        const u = users.length || 1;
        const s = scenarios.length || 1;

        let result = 0;
        for (let user = 0; user < data.length; user++) {
            for (let scenario = 0; scenario < data[user].length; scenario++) {
                result += Number(!!data[user][scenario])
            }
        }

        result = Number((result * 100 / (u * s)).toFixed(2));

        return result;
    }
    get img(): string {
        return "success";
    }
}
class UXError extends AMetrics {
    calculate(ux: IUX): number {
        const data = ux.getData("actions")
        const expert = ux.getExpert("actions")
        const { users, scenarios } = ux;
        const u = users.length || 1;
        const s = scenarios.length || 1;

        let result = 0;
        for (let user = 0; user < data.length; user++) {
            for (let scenario = 0; scenario < data[user].length; scenario++) {
                const userData = data[user][scenario];
                const expertData = expert[scenario];
                if (userData && expertData) {
                    result += (expertData <= userData) ? expertData / userData : 1;
                }
            }
        }

        result = Number((result * 100 / (u * s)).toFixed(2));

        return (100 - result);
    }
    get img(): string {
        return "error";
    }
}
class UXTime extends AMetrics {
    calculate(ux: IUX): number {
        const data = ux.getData("time")
        const expert = ux.getExpert("time")
        const { users, scenarios } = ux;
        const u = users.length || 1;
        const s = scenarios.length || 1;

        let userTime = 0;
        let expertTime = 0;
        for (let user = 0; user < data.length; user++) {
            for (let scenario = 0; scenario < data[user].length; scenario++) {
                const userData = data[user][scenario];
                const expertData = expert[scenario];
                if (userData && expertData) {
                    userTime += userData;
                    expertTime += expertData;
                }
            }
        }

        let result = Number((expertTime * 100 / userTime).toFixed(2));

        return result;
    }
    get img(): string {
        return "time";
    }
}

export { AMetrics }