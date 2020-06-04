import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import CustomAlert from "./Alert";
import Nodecard from "./NodeCard";
import { WorkflowContext } from "./Dashboard";
import { useHistory, useParams } from "react-router-dom";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    float: "right",
  },
  buttonDiv : {
    marginBottom: theme.spacing(1)
  },
  flowTitle: {
    margin: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
}));
/**
 *
 * This function determines the final status of the task from the list of task nodes
 * logic :  If all the task are completed, then status : success
 *          If atleast one the task is in-progress, then status : in-progress
 *          else status : pending
 */
export function getFinalStatus(nodesInfo) {
  let flowStatus = 2;
  let inProgCount = 0;
  nodesInfo.forEach((info) => {
    info.status === 0 && (flowStatus = 0);
    info.status === 1 && inProgCount++;
  });
  inProgCount && (flowStatus = 1);
  return flowStatus;
}

export default function AddEditWorkFlowDetails() {
  /**
   * id : when the user clicks for editing the workflows
   */
  let { id } = useParams();
  let history = useHistory();
  const flowNAmeRef = React.useRef(null);
  /**
   * used for setting any alret on the page
   */
  const [alertVal, setAlertVal] = React.useState({
    open: false,
    severity: "",
    message: "",
  });
  /**
   * handleClose is for handling the close of alert shown
   */
  const handleClose = () => {
    setAlertVal({
      open: false,
      severity: "",
      message: "",
    });
  };
  const { addWorkFlow, totalWorkflows, editWorkFlow } = React.useContext(
    WorkflowContext
  );
  const classes = useStyles();

  const handleShuffleWorkflow = () => {
    setState({
      ...state,
      nodesInfo: state.nodesInfo.reverse(),
    });
  };

  const handleDeleteNode = () => {
    const nodesList = state.nodesInfo;
    nodesList.pop();
    setState({
      ...state,
      status: getFinalStatus(nodesList),
      nodesInfo: nodesList,
    });
  };

  const handleAddNode = () => {
    const nodesList = state.nodesInfo;
    nodesList.push({ title: "", desc: "", status: 0 });
    setState({
      ...state,
      status: getFinalStatus(nodesList),
      nodesInfo: nodesList,
    });
  };

  const handleTitleChange = (e) => {
    flowNAmeRef.current.style.backgroundColor = "unset";
    setState({
      ...state,
      title: e.currentTarget.value,
    });
  };

  const handleSaveWorkflow = () => {
    if (state.title && state.nodesInfo.length > 0) {
      id ? editWorkFlow(state, parseInt(id)) : addWorkFlow(state);
      history.push("/");
    }
    const titleMag = "You can't leave Flow Name blank.";
    const taskMsg = "Please add atleast one task."
    flowNAmeRef.current.style.backgroundColor = "#f5005757";
    setAlertVal({
      open: true,
      severity: "error",
      message: !state.title && state.nodesInfo.length === 0 ? `${titleMag} and ${taskMsg}` : (!state.title ? titleMag : taskMsg)
    });
  };

  const flowDetails = totalWorkflows.find((flow) => flow.id === parseInt(id));
  /**
   * Setting different state values depending on whether a new workflow is being created
   * or editing the previous ones
   *
   * If not a single task node is added, the workflow status is complete by default
   */
  const [state, setState] = React.useState(
    id
      ? {
          title: flowDetails.detail.title,
          nodesInfo: flowDetails.detail.nodesInfo,
          status: flowDetails.detail.status,
        }
      : {
          title: "",
          nodesInfo: [],
          status: 2,
        }
  );
  /**
   * The action buttons on flow node
   */
  const buttonsJSX = (
    <div key="buttons" className={classes.buttonDiv}>
      <Input
        ref={flowNAmeRef}
        placeholder="WorkFlow Name"
        className={classes.flowTitle}
        value={state.title}
        onChange={handleTitleChange}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSaveWorkflow}
      >
        SAVE
      </Button>
      <Button
        variant="contained"
        style={{backgroundColor: '#4caf50'}}
        className={clsx(classes.button)}
        onClick={handleAddNode}
        startIcon={<AddIcon />}
      >
        ADD NODE
      </Button>
      <Button
        variant="contained"
        color="secondary"
        disabled={state.nodesInfo.length ? false : true}
        className={classes.button}
        onClick={handleDeleteNode}
        startIcon={<DeleteIcon />}
      >
        DELETE
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleShuffleWorkflow}
        disabled={state.status === 2 && state.nodesInfo.length ? false : true}
        startIcon={<ShuffleIcon />}
      >
        SHUFFLE
      </Button>
    </div>
  );
  const nodesJSX = state.nodesInfo.map((d, idx) => {
    if (idx) {
      return [
        <ArrowRightAltIcon key={`arrow-${idx}`} />,
        <Nodecard key={idx} {...{ idx, state, setState }} />,
      ];
    } else {
      return <Nodecard key={idx} {...{ idx, state, setState }} />;
    }
  });
  return [
    alertVal.open ? <CustomAlert key="alert" {...alertVal} handleClose={handleClose} /> : '',
    buttonsJSX,
    nodesJSX,
  ];
}
