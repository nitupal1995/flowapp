import React from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import { WorkflowContext } from "./Dashboard";
import ShowWorkFlowCard from "./ShowWorkFlowCard";
import { Link } from "react-router-dom";
import { Status } from './Dashboard';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  margin1: {
    margin: theme.spacing(1),
  },
  rFloat: {
    float: "right",
  },
  lFloat: {
    float: "left",
  },
  inlineDisplay : {
    display : 'inline-block'
  }
}));

export default function CreateManageWorkFlow() {
  const classes = useStyles();
  const { searchedWorkflows, searchWorkFlow, filterWorkFlow, filterVal } = React.useContext(
    WorkflowContext
  );
  const handleSearchChange = (e) => {
    searchWorkFlow(e.currentTarget.value);
  };
  const handleFilterChange = e => {
    filterWorkFlow(e.target.value);
  }
  return (
    <>
    <div className={classes.margin1} style={{height : '40px'}}>
        <div className={clsx(classes.rFloat,classes.inlineDisplay)}>
          <Link to="create_workflow">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              ADD WORKFLOW
            </Button>
          </Link>
        </div>
        <div className={clsx(classes.lFloat,classes.inlineDisplay)}>
          <InputLabel htmlFor="flow-search">Search WorkFlows</InputLabel>
          <Input
            id="flow-search"
            type="text"
            onChange={handleSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </div>
        <div className={clsx(classes.lFloat,classes.inlineDisplay)} style={{marginLeft : '10px'}}>
        <InputLabel id="filter-status-label">Status Filter</InputLabel>
        <Select
          labelId="filter-status-label"
          id="filter-status"
          value={filterVal}
          onChange={handleFilterChange}
          endAdornment={
            <InputAdornment position="end">
              <FilterListIcon />
            </InputAdornment>
          }
        >
          <MenuItem value={-1}>ALL</MenuItem>
          <MenuItem value={0}>{Status[0].name}</MenuItem>
          <MenuItem value={1}>{Status[1].name}</MenuItem>
          <MenuItem value={2}>{Status[2].name}</MenuItem>
        </Select>
        </div>
      </div>
      <div className={classes.margin1}>
        {searchedWorkflows.map((workflow, idx) => (
          <ShowWorkFlowCard key={idx} {...workflow} />
        ))}
      </div>
    </>
  );
}
