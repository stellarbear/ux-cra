import { removeAt } from "auxiliary/array";
import { decorate, observable, action } from "mobx";

export interface IObservation {
    addUser: (scenarios: number) => void
    addScenario: () => void
    removeUser: (index: number) => void
    removeScenario: (index: number) => void

    setExpert: (scenario: number, value: number | null) => void
    setData: (user: number, scenario: number, value: number | null) => void
    reset: (users: number, scenarios: number) => void

    expert: (number | null)[]
    data: (number | null)[][]
}

export class Observation implements IObservation {
    public data: (number | null)[][]
    public expert: (number | null)[] = [];

    public allowNegative: boolean;
    public booleanOnly: boolean;
    public hasExpert: boolean;

    constructor({
        data = [],
        allowNegative = false,
        booleanOnly = false,
        hasExpert = false
    }: {
        data?: (number | null)[][],
        allowNegative?: boolean,
        booleanOnly?: boolean,
        hasExpert?: boolean,
    } = {}) {
        this.data = data;
        this.hasExpert = hasExpert;
        this.booleanOnly = booleanOnly;
        this.allowNegative = allowNegative;
    }

    addUser = (scenarios: number) => {
        this.data = [...this.data, Array(scenarios).fill(null)];
    }
    removeUser = (index: number) => {
        this.data = removeAt(this.data, index);
    }

    addScenario = () => {
        this.data = this.data.map(d => [...d, null]);
        if (this.hasExpert) {
            this.expert = [...this.expert, null]
        }
    }
    removeScenario = (index: number) => {
        this.data = this.data.map(d => removeAt(d, index));
        if (this.hasExpert) {
            this.expert = removeAt(this.expert, index)
        }
    }

    private validate = (input: number | null): number | null => {
        const { allowNegative, booleanOnly } = this;

        if (input == null){
            return input
        }

        let result = input;

        if (result != null) {
            if (!allowNegative) {
                result = result >= 0 ? result : 0
            }
            if (booleanOnly) {
                result = result > 0 ? 1 : 0
            }
        }
        
        return result;
    }

    setExpert = (scenario: number, value: number | null) => {
        this.expert[scenario] = this.validate(value);
    }

    setData = (user: number, scenario: number, value: number | null) => {
        this.data[user][scenario] = this.validate(value);
    }

    reset = (users: number, scenarios: number) => {
        this.data = this.data.slice(0, users);
        this.data.forEach(scenario => scenario = scenario.slice(0, scenarios));
        this.expert = this.expert.slice(0, scenarios);
    }
}

decorate(Observation, {
    data: observable,
    expert: observable,
    setData: action,
    setExpert: action,
    reset: action,
    addUser: action,
    removeUser: action,
    addScenario: action,
    removeScenario: action,
});