import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
  const [inputId, setInputId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setInputId(props.inputId);

    const today = new Date();
    
    const d = today.getDate().toString().padStart(2, "0");
    const m = (today.getMonth() + 1).toString().padStart(2, "0");
    const y = today.getFullYear();

    let dateValue = "";
    let value = props.value ?? "today";
    switch (value.toLowerCase()) {
      case "today":
        dateValue = `${y}-${m}-${d}`;
        break;
      case "startmonth":
        dateValue = `${y}-${m}-1`;
        break;
      case "endmonth":
        dateValue = `${y}-${m}-${d}`;
        break;
      default:
        dateValue = value;
        break;
    }
    setSelectedDate(new Date(dateValue));
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        ref={(el) => (props.inputRef.current[inputId] = el)}
        margin="normal"
        id={props.name}
        label={props.label}
        format={props.dateFormat}
        showTodayButton
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
        }}
        KeyboardButtonProps={{
          "aria-label": "Select date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
