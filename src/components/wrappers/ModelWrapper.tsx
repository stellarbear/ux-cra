import React, { useEffect } from "react";
import { IUX, UX, ObservationList, UXKey, UXKeys } from "model/ux";
import { observer } from "mobx-react-lite";
import { autorun } from 'mobx'
import { Tabs, Tab, IconButton, Typography, CircularProgress, AppBar, Tooltip } from "@material-ui/core";
import { AddCircle, Clear } from "@material-ui/icons";
import { Observation } from "model/observation";
import { removeAt } from "auxiliary/array";
import { downloadFile, readFile } from "auxiliary/fs";

interface IModelProvider {
    model: IUX,
    uxKey: UXKey,

    clearData: () => void,
    exportData: () => void,
    importData: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ModelProvider = React.createContext({} as IModelProvider);

interface IModelWrapperProps { }
const local = "uxModel"
const getLocal = (): IUX[] => {
    try {
        return JSON.parse(localStorage.getItem(local) || "[]")
    } catch {
        return [];
    }
}
const setLocal = (items: IUX[]) =>
    localStorage.setItem(local, JSON.stringify(items))

const ModelWrapper: React.FC<IModelWrapperProps> = observer(({ children }) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [iterations, setIterations] = React.useState<IUX[]>([new UX()]);
    const [current, setCurrent] = React.useState<number>(0);
    const [uxKey, setUxKey] = React.useState<UXKey>(UXKeys[0]);
    const model = iterations[current];

    const exportData = () => {
        const dataJson = JSON.stringify(iterations);
        downloadFile(dataJson, `ux-${new Date().getTime()}`);
    }

    const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                let input = await readFile(e.target.files[0]);
                let parsed: IUX[] = JSON.parse(input as string || "[]");

                setLocal(deserialize(parsed));
                window.location.reload();
            } catch { }
        }
    }

    const clearData = () => {
        setLocal([]);
        setCurrent(0);
        setIterations([new UX()])
    }

    const deserialize = (input: IUX[]): IUX[] => {
        try {
            input = input.map((d: any) => Object.assign(new UX, d));
            input.forEach((o: IUX) => o.observations = Object.keys(o.observations)
                .reduce((acc, cur) =>
                    ({ ...acc, [cur]: Object.assign(new Observation, (o.observations as any)[cur]) }),
                    {} as ObservationList));

            input = input.length > 0 ? input : [new UX()];
        } catch {
            input = [new UX()];
        }

        return input;
    }

    useEffect(() => {
        setCurrent(0);
        setLoading(false);
        setIterations(deserialize(getLocal()))
    }, []);

    useEffect(() => autorun(() => {
        console.log("changes!")
        setLocal(iterations);
    }), [model])


    const handleKeyChange = (key: UXKey) => setUxKey(key);

    const handleIterationChange = (event: React.ChangeEvent<{}>, newValue: number) => setCurrent(newValue);

    const addIteration = () => {
        setCurrent(iterations.length);
        setIterations([...iterations, new UX()])
    }

    const removeIteration = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        event.stopPropagation();
        setCurrent(0);
        setIterations(removeAt(iterations, index));
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: 64 }}>
                <CircularProgress />
            </div>
        )
    }

    const buildIterationTabs = () => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Tabs
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                value={current} onChange={handleIterationChange}>
                {iterations.map((_, index) =>
                    <Tab
                        component="div"
                        key={`iteration-tab-${index}`}
                        label={
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="button" style={{ padding: "0px 8px 0px 16px" }}>
                                    {`${index} iteration`}
                                </Typography>
                                <Tooltip title="Remove iteration">
                                    <span>
                                        <IconButton
                                            disabled={iterations.length == 1 && index == 0}
                                            onClick={(event) => removeIteration(event, index)}>
                                            <Clear />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>}
                    />
                )}
            </Tabs>
            <Tooltip title="Add new iteration">
                <IconButton onClick={() => addIteration()}>
                    <AddCircle />
                </IconButton>
            </Tooltip>
        </div>
    )

    const buildMetricTabs = () => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={UXKeys.indexOf(uxKey)}>
                {(UXKeys.map((uxKey, index) =>
                    <Tab
                        key={`tab-${uxKey}`}
                        label={uxKey.toUpperCase()}
                        onClick={() => handleKeyChange(uxKey)} />
                ))}
            </Tabs>
        </div>
    )

    return (
        <div>
            {buildIterationTabs()}
            {buildMetricTabs()}
            <ModelProvider.Provider value={{ model, uxKey, exportData, importData, clearData }}>
                {children}
            </ModelProvider.Provider>
        </div>
    );
})

export { ModelProvider, ModelWrapper }