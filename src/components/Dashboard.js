import React from "react";
import Login from "./Login";
import { AuthContext } from "../App";
import { 
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';
import CreateManageWorkFlow from './CreateManageWorkFlow';
import AddEditWorkFlowDetails from './AddEditWorkFlowDetails';
import CustomAlert from './Alert';

export const WorkflowContext = React.createContext();

export const Status = {
  0: { name: "PENDING", color: "grey" },
  1: { name: "IN PROGRESS", color: "#3f51b5" },
  2: { name: "COMPLETED", color: "#4caf50" },
};

export default function Dashboard() {
  const { loggedIn } = React.useContext(AuthContext);
  if (loggedIn) {
    return (
      <WorkflowContextProvider>
          <Switch>
            <Route path="/create_workflow" component={AddEditWorkFlowDetails} />
            <Route path="/edit_flow/:id" component={AddEditWorkFlowDetails} />
            <Route path="/" component={CreateManageWorkFlow} exact/>
            <Route>
                <Redirect to="/" />
            </Route>
          </Switch>
      </WorkflowContextProvider>
    );
  } else {
    return <Login />;
  }
}

function WorkflowContextProvider({ children }) {
  const initState = {
    totalWorkflows: [],
    searchedWorkflows : [],
    totalCount : 0,
    filterVal : -1
  };
  const [state, dispatcher] = React.useReducer(workflowReducer, initState);
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
  const addWorkFlow = (workflowdDet) => {
    dispatcher({ type: "ADD", workflowdDet});
    setAlertVal({
      open: true,
      severity: "success",
      message: "Work Flow Added Successfully!",
    });
  };
  const deleteWorkFlow = (workflowId) => {
    dispatcher({ type: "DELETE", workflowId });
    setAlertVal({
      open: true,
      severity: "success",
      message: "Work Flow Deleted Successfully!",
    });
  };
  const editWorkFlow = (workflowdDet,id) => {
    dispatcher({ type: "EDIT", workflowdDet , id });
    setAlertVal({
      open: true,
      severity: "success",
      message: "Work Flow Edited Successfully!",
    });
  }
  const searchWorkFlow = (str) => {
    dispatcher({ type : 'SEARCH', str})
  }
  const filterWorkFlow = (status) => {
    dispatcher({type : 'FILTER', status});
  }
  const values = {
    totalWorkflows: state.totalWorkflows,
    searchedWorkflows: state.searchedWorkflows,
    filterVal : state.filterVal,
    searchWorkFlow,
    addWorkFlow,
    filterWorkFlow,
    deleteWorkFlow,
    editWorkFlow
  };
  return (
    <WorkflowContext.Provider value={values}>
      {children}
      {alertVal.open ? <CustomAlert key="alert" {...alertVal} handleClose={handleClose} /> : ''}
    </WorkflowContext.Provider>
  );
}
const editWorkFlow = (state, details, id) => {
  state.totalWorkflows.forEach(flow => {
    flow.id === id && (flow.detail = details);
  })
  return {
    ...state,
    searchedWorkflows : state.totalWorkflows,
    totalWorkflows : state.totalWorkflows
  }
}

const addNewWorkFlow = (state, details) => {
    return {
      ...state,
      searchedWorkflows : [...state.totalWorkflows,{ detail : details, id : state.totalCount}],
      totalWorkflows : [...state.totalWorkflows,{ detail : details, id : state.totalCount}],
      totalCount : state.totalCount + 1
    }
}
const deleteWorkFlow = (state, id) => {
  state.totalWorkflows = state.totalWorkflows.filter(flow => flow.id !== id);
  return { 
    ...state,
    searchedWorkflows : state.totalWorkflows, 
    totalWorkflows : state.totalWorkflows,
    totalCount : state.totalCount - 1
  };
};

const searchWorkFlow = (state,str) => {
  state.searchedWorkflows = state.totalWorkflows.filter( flow => flow.detail.title.includes(str));
  return {
    ...state,
    searchedWorkflows : state.searchedWorkflows
  }
}

const filterWorkFlow = (state,status) => {
  state.searchedWorkflows = status === -1 ? state.totalWorkflows : state.totalWorkflows.filter( flow => flow.detail.status === status);
  return {
    ...state,
    filterVal : status,
    searchedWorkflows : state.searchedWorkflows
  }
}

function workflowReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return addNewWorkFlow(state, action.workflowdDet);
    case 'EDIT' : 
      return editWorkFlow(state,action.workflowdDet, action.id);
    case "DELETE":
      return deleteWorkFlow(state, action.workflowId);
    case 'SEARCH' : 
      return searchWorkFlow(state,action.str);
    case 'FILTER' : 
      return filterWorkFlow(state,action.status);
    default :
      return ({...state});  
  }
}
