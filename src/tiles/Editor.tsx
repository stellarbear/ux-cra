import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tabs, Tab, Box, Button, IconButton, Divider } from '@material-ui/core';

import { ExpandMore, Clear } from '@material-ui/icons';
import { UXKeys } from 'model/ux';
import NumericField from 'components/NumericField';
import TabPanel from 'components/TabPanel';
import InputField from 'components/InputField';
import { ModelProvider } from 'components/wrappers/ModelWrapper';
import { useObserver } from "mobx-react-lite"

interface IEditorProps { }

const Editor: React.FC<IEditorProps> = () => {
    const [usersLocal, setUsers] = React.useState(0);
    const [scenariosLocal, setScenarios] = React.useState(0);
    const { model } = React.useContext(ModelProvider);

    useEffect(() => {
        setUsers(model.users.length)
        setScenarios(model.scenarios.length)
    }, [])

    return useObserver(() => (
        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
            <div style={{ display: "flex", alignSelf: "center", alignItems: "center", flexDirection: "row" }}>
                <NumericField
                    min={0}
                    label={"users"}
                    value={usersLocal}
                    onChangeEvent={(value) => setUsers(value)}
                />

                <Clear />
                <NumericField
                    min={0}
                    label={"scenarios"}
                    value={scenariosLocal}
                    onChangeEvent={(value) => setScenarios(value)}
                />
                <Button
                    variant="contained" color="primary"
                    onClick={() => model.setUsersAndScenarios(usersLocal, scenariosLocal)}
                >Generate</Button>
            </div>
            <div style={{
                display: "flex", justifyContent: "center", flexDirection: "row", width: "100%",
                maxHeight: 300,
                overflow: 'auto', padding: 8
            }}>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 150 }}>
                    {
                        model.users.map((user, index) =>
                            <InputField
                                key={`user-${index}`}
                                value={user}
                                adornment={
                                    <IconButton
                                        onClick={() => model.removeUser(index)}
                                    >
                                        <Clear />
                                    </IconButton>
                                }
                                onChangeEvent={(value) => model.changeUser(index, value)}
                            />
                        )
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 150, marginLeft: 32 }}>
                    {
                        model.scenarios.map((scenario, index) =>
                            <InputField
                                key={`scenario-${index}`}
                                value={scenario}
                                adornment={
                                    <IconButton
                                        onClick={() => model.removeScenario(index)}
                                    >
                                        <Clear />
                                    </IconButton>
                                }
                                onChangeEvent={(value) => model.changeScenario(index, value)}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    ));
}

export default Editor;