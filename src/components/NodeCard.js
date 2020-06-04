import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { Status } from "./Dashboard";
import { getFinalStatus } from "./AddEditWorkFlowDetails";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    maxWidth: 275,
    margin: theme.spacing(3),
    display: "inline-block",
    border: "1px solid #ccc",
    overflow: "unset",
  },
  taskStatus: {
    float: "right",
    borderRadius: "50%",
    padding: "8px",
    marginTop: "-20px",
    marginRight: "-20px",
  },
}));

export default function Nodecard({ idx, setState, state }) {
  const classes = useStyles();
  /**
   * Handling title for description change
   */
  const handleChange = (prop) => (e) => {
    state.nodesInfo[idx][prop] = e.currentTarget.value;
    setState({ ...state, nodesInfo: state.nodesInfo });
  };
  /**
   * allowedUpto monitors the status valid for tjis task node based on
   * previous task node
   *
   * we again change the workflow status depending upon the changes on this task node using getFinalStatus
   */
  const handleTaskStatusChange = (currStatus) => (e) => {
    let allowedUpto = 3;
    idx !== 0 && (allowedUpto = state.nodesInfo[idx - 1]["status"] + 1);
    state.nodesInfo[idx]["status"] = (currStatus + 1) % allowedUpto;
    setState({
      ...state,
      nodesInfo: state.nodesInfo,
      status: getFinalStatus(state.nodesInfo),
    });
  };
  return (
    <Card className={classes.cardRoot}>
      <CardContent>
        <CheckIcon
          className={classes.taskStatus}
          style={{ backgroundColor: Status[state.nodesInfo[idx].status].color }}
          onClick={handleTaskStatusChange(state.nodesInfo[idx].status)}
        />
        <Input
          placeholder="Task Title"
          value={state.nodesInfo[idx].title}
          onChange={handleChange("title")}
          required={true}
        />
        <TextField
          id="outlined-multiline-static"
          label="Task Descrption"
          multiline
          rows={4}
          style={{ marginTop: "30px" }}
          value={state.nodesInfo[idx].desc}
          onChange={handleChange("desc")}
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
}
