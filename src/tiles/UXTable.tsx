import React, { useEffect } from "react";
import { UXKey } from "model/ux";
import { ModelProvider } from "components/wrappers/ModelWrapper";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Button, Divider } from "@material-ui/core";
import NumberField from "components/NumberField";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import InputField from "components/InputField";
import { Clear } from "@material-ui/icons";
import NumericField from "components/NumericField";

interface IUXTableProps { }

const colorHover = "#ECEFF1"
const colorBlank = "#FFFFFF"
const UXTable: React.FC<IUXTableProps> = observer(() => {
    const { model, uxKey } = React.useContext(ModelProvider);
    const [hover, setHover] = React.useState<[number | null, number | null]>([null, null]);

    const [usersLocal, setUsers] = React.useState(0);
    const [scenariosLocal, setScenarios] = React.useState(0);

    useEffect(() => {
        setUsers(model.users.length)
        setScenarios(model.scenarios.length)
    }, [])

    const data = model.getData(uxKey)
    const expert = model.getExpert(uxKey)
    const hasExpert = expert.length > 0;

    const renderHeader = () => (
        <TableRow>
            <TableCell>{uxKey}</TableCell>
            {
                model.users.map((user, uindex) =>
                    <TableCell
                        style={{
                            padding: "8px 8px 0px 0px",
                            backgroundColor: hover[1] == uindex ?
                                colorHover : colorBlank,
                            transition: "background-color 256ms linear"
                        }}
                        key={`${uxKey}-${uindex}-table-head`}>
                        <InputField
                            maxWidth={96}
                            key={`${uxKey}-${uindex}-input`}
                            value={user}
                            adornment={
                                <IconButton size="small"
                                    onClick={() => model.removeUser(uindex)}
                                >
                                    <Clear />
                                </IconButton>
                            }
                            onChangeEvent={(value) => model.changeUser(uindex, value)}
                        />
                    </TableCell>
                )
            }
            <TableCell>
                <Typography
                    variant="subtitle2"
                    style={{ opacity: hasExpert ? 1.0 : 0.4 }}>
                    Expert
                </Typography>
            </TableCell>
        </TableRow>
    )


    const renderData = () => (
        model.scenarios.map((scenario, sindex) => (
            <TableRow key={`${uxKey}-${sindex}-table-row`}>
                <TableCell component="th" scope="row" style={{
                    whiteSpace: "nowrap",
                    position: "sticky",
                    left: 0,
                    backgroundColor: hover[0] == sindex ?
                        colorHover : colorBlank,
                    transition: "background-color 256ms linear"
                }}>
                    <InputField
                        maxWidth={132}
                        key={`${uxKey}-${sindex}-input`}
                        value={scenario}
                        adornment={
                            <IconButton size="small"
                            tabIndex={-1}
                                onClick={() => model.removeScenario(sindex)}
                            >
                                <Clear />
                            </IconButton>
                        }
                        onChangeEvent={(value) => model.changeScenario(sindex, value)}
                    />
                </TableCell>
                {
                    model.users.map((user, uindex) =>
                        <TableCell
                            style={{
                                padding: 0,
                                backgroundColor: hover[1] == uindex || hover[0] == sindex ?
                                    colorHover : colorBlank,
                                transition: "background-color 256ms linear"
                            }}
                            onMouseEnter={() => setHover([sindex, uindex])}
                            onMouseLeave={() => setHover([null, null])}
                            key={`${uxKey}-${user}-${uindex}-table-cell`}>
                            <NumberField
                                value={data[uindex][sindex]}
                                onChangeEvent={(value) => {
                                    model.setData(uxKey)(uindex, sindex, value)
                                }} />
                        </TableCell>
                    )
                }

                {
                    <TableCell
                        key={`${uxKey}-expert-${sindex}-table-cell`}>
                        <NumberField
                            disabled={!hasExpert}
                            value={hasExpert ? expert[sindex] : null}
                            onChangeEvent={(value) => {
                                hasExpert && model.setExpert(uxKey)(sindex, value)
                            }} />
                    </TableCell>
                }
            </TableRow>
        ))
    )

    return (
        <div style={{ width: "100%" }}>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <NumericField
                    min={0}
                    label={"users"}
                    value={usersLocal}
                    onChangeEvent={(value) => model.setUsersAndScenarios(value, model.scenarios.length)}
                />

                <Clear />
                <NumericField
                    min={0}
                    label={"scenarios"}
                    value={scenariosLocal}
                    onChangeEvent={(value) => model.setUsersAndScenarios(model.users.length, value)}
                />
            </div>
            <Divider variant="middle" />
            <div style={{
                maxHeight: "60vh",
                overflow: 'auto',
            }}>
                <Table size="small" style={{
                    minWidth: 128 * model.users.length,
                }}>
                    <TableHead>
                        {renderHeader()}
                    </TableHead>
                    <TableBody>
                        {renderData()}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
})

export default UXTable;