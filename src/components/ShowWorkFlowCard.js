import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CheckIcon from "@material-ui/icons/Check";
import { WorkflowContext } from "./Dashboard";
import { Link } from "react-router-dom";
import { Status } from './Dashboard';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: "300px",
    margin: theme.spacing(3),
    display: "inline-block",
    border: "1px solid #ccc",
    overflow: "unset",
  },
  deleteStatus: {
    float: "right",
    borderRadius: "50%",
    padding: "8px",
    marginTop: "-20px",
    marginRight: "-20px",
    backgroundColor: "#f50057",
  },
  taskStatus: {
    borderRadius: "50%",
    padding: "8px",
  },
  divTitle: {
    padding: "5px",
    marginRight: "30px",
    display: "block",
    border: "1px solid #ccc",
  },
  divStatus: {
    padding: "5px",
    margin: "20px 30px 20px 0px",
  },
}));

export default function ShowWorkFlowCard({ detail , id }) {
  const { deleteWorkFlow } = React.useContext(WorkflowContext);
  /**
   * Handle delete workflow 
   */
  const handleDeleteFlow = () => {
    deleteWorkFlow(id);
  };
  const classes = useStyles();
  return (
    <Card className={classes.cardRoot}>
      <CardContent>
        <DeleteIcon
          className={classes.deleteStatus}
          onClick={handleDeleteFlow}
        />
        <Link to={{ pathname: `/edit_flow/${id}`}}>
          <div className={classes.divTitle}>
            <span>{detail.title}</span>
          </div>
        </Link>
        <div className={classes.divStatus}>
          <div style={{ display: "inline-block" }}>
            {Status[detail.status].name}
          </div>
          <div style={{ float: "right" }}>
            <CheckIcon
              className={classes.taskStatus}
              style={{ backgroundColor: Status[detail.status].color }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
