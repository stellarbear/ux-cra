import { IObservation, Observation } from "./observation";
import { decorate, observable, computed, action } from 'mobx'
import { removeAt } from "auxiliary/array";

const UXKeys = ["result", "time", "actions"] as const;
type UXKeyTuple = typeof UXKeys;
export type UXKey = UXKeyTuple[number];

export type ObservationList = { [key in UXKey]: IObservation }

export interface IUX {
    addUser: (name?: string) => void
    removeUser: (index: number) => void
    addScenario: (name?: string) => void
    removeScenario: (index: number) => void
    setUsersAndScenarios: (users: number, scenarios: number) => void

    changeUser: (index: number, name: string) => void
    changeScenario: (index: number, name: string) => void

    setData: (key: UXKey) => (user: number, scenario: number, value: number | null) => void
    setExpert: (key: UXKey) => (scenario: number, value: number | null) => void
    reset: () => void

    users: string[]
    scenarios: string[]
    observations: ObservationList
    getData: (key: UXKey) => (number | null)[][]
    getExpert: (key: UXKey) => (number | null)[]
}
class UX implements IUX {
    constructor(
        public observations: ObservationList = {
            result: new Observation({ booleanOnly: true }),
            actions: new Observation({ hasExpert: true }),
            time: new Observation({ hasExpert: true }),
        },
        public scenarios: string[] = [],
        public users: string[] = [],
    ) { }

    private get data() {
        return Object.keys(this.observations)
            .map(key => (this.observations as any)[key]);
    }

    addUser = (name: string = `User ${this.users.length}`) => {
        this.users = [...this.users, name];
        this.data.forEach(o => o.addUser());
    }
    removeUser = (index: number) => {
        this.users = removeAt(this.users, index);
        this.data.forEach(o => o.removeUser(index));
    }

    addScenario = (name: string = `Scenario ${this.scenarios.length}`) => {
        this.scenarios = [...this.scenarios, name];
        this.data.forEach(o => o.addScenario());
    }
    removeScenario = (index: number) => {
        this.scenarios = removeAt(this.scenarios, index);
        this.data.forEach(o => o.removeScenario(index));
    }
    setUsersAndScenarios = (users: number, scenarios: number) => {
        this.reset();
        this.users = [];
        this.scenarios = [];
        Array.from({ length: users }).forEach(u => this.addUser());
        Array.from({ length: scenarios }).forEach(s => this.addScenario());
    }

    changeUser = (index: number, name: string) => {
        this.users[index] = name;
        this.users = [...this.users];
    }
    changeScenario = (index: number, name: string) => {
        this.scenarios[index] = name;
        this.scenarios = [...this.scenarios];
    }

    setData = (key: UXKey) => this.observations[key].setData;
    setExpert = (key: UXKey) => this.observations[key].setExpert;
    getData = (key: UXKey) => this.observations[key].data;
    getExpert = (key: UXKey) => this.observations[key].expert;
    
    reset = () => this.data.forEach(o => o.reset());
}

decorate(UX, {
    users: observable,
    scenarios: observable,
    observations: observable,
    setUsersAndScenarios: action,
    changeUser: action,
    changeScenario: action,
});


export { UXKeys, UX }