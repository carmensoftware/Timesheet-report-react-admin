import React, { useState, useEffect } from "react";
import { ListItemAvatar, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DescriptionIcon from "@material-ui/icons/Description";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

import { getReportList } from "./services";
import DatePicker from "./controls/DatePicker";

const default_DateFormat = "dd/MM/yyyy";

const ReportList = (props) => {
  const [reportList, setReportList] = useState();
  const [report, setReport] = useState();
  const [dialog, setDialog] = useState();

  useEffect(() => {
    async function fetch() {
      const groupName = props.options.groupName;
      const data = await getReportList(groupName);
      setReportList(data);
    }

    fetch();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      // width: "100%",
      // maxWidth: 420,
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

  const classes = useStyles();
  const report_Click = (e, id) => {
    e.preventDefault();
    createDialog(id);
  };

  const createDialog = (id) => {
    console.log("createDialog = ", id);
    setDialog(<DatePicker />);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" className={classes.title}>
            {props.options.label}
          </Typography>
          <Divider />
          <List component="nav" aria-label="report list">
            {reportList &&
              reportList.Data.map((item) => (
                <ListItem
                  button
                  key={item.Id}
                  onClick={(e) => report_Click(e, item.Id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.ReportName}
                    secondary={item.Description}
                  />
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" className={classes.title}>
            Report
          </Typography>
          <Divider />
          <DatePicker
            dateFormat={default_DateFormat}
            value="startmonth"
            label="Date From"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportList;
