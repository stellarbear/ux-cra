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

interface IIterations {
    data: IUX[];
    current: number;
}

const iterationsDefault = (): IIterations => ({
    data: [new UX()],
    current: 0
})

const ModelProvider = React.createContext({} as IModelProvider);

interface IModelWrapperProps { }
const local = "uxModel"

const ModelWrapper: React.FC<IModelWrapperProps> = observer(({ children }) => {
    const getLocal = (): IUX[] =>
        JSON.parse(localStorage.getItem(local) || "[]")
    const setLocal = (items: IUX[]) =>
        localStorage.setItem(local, JSON.stringify(items))

    const [loading, setLoading] = React.useState<boolean>(true);
    const [iterations, setIterations] = React.useState<IIterations>(iterationsDefault());
    const [uxKey, setUxKey] = React.useState<UXKey>(UXKeys[0]);
    const model = iterations.data[iterations.current];

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
        setIterations(iterationsDefault())
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
        setLoading(false);
        setIterations({
            data: deserialize(getLocal()),
            current: 0
        })
    }, []);

    useEffect(() => autorun(() => {
        console.log("changes!")
        setLocal(iterations.data);
    }), [model])


    const handleKeyChange = (key: UXKey) => setUxKey(key);

    const handleIterationChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setIterations({
            ...iterations, current: newValue
        })
    };

    const addIteration = () => {
        setIterations({
            data: [...iterations.data, new UX()],
            current: iterations.data.length
        })
    }
    const removeIteration = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        event.stopPropagation();
        setIterations({
            data: removeAt(iterations.data, index),
            current: 0
        })
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: 64 }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Tabs
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    value={iterations.current} onChange={handleIterationChange}>
                    {iterations.data.map((iteration, index) =>
                        <Tab
                            component="div"
                            key={`iteration-tab-${index}`}
                            label={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="button" style={{ padding: "0px 8px 0px 16px" }}>
                                        {`${index} iteration`}
                                    </Typography>
                                    <Tooltip title="Remove iteration">
                                        <IconButton
                                            disabled={iterations.data.length == 1 && index == 0}
                                            onClick={(event) => removeIteration(event, index)}>
                                            <Clear />
                                        </IconButton>
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
            <ModelProvider.Provider value={{ model, uxKey, exportData, importData, clearData }}>
                {children}
            </ModelProvider.Provider>
        </div>
    );
})

export { ModelProvider, ModelWrapper }