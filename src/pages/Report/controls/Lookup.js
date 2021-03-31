import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Lookup(props) {
  const [inputId, setInputId] = useState(0);
  const [data, SetData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const items = props.items;
  const values = props.values;

  useEffect(() => {
    setInputId(props.inputId);
    const defaultValue = (dataList) => {
      let dt = dataList;
      const value = props.value;
      if (Number.isInteger(value)) {
        let index = +value;
        index = index >= dt.length ? dt.length - 1 : index;
        index = index < 0 ? 0 : index;

        return dt[index].value;
      } else if (value.toLowerCase() === "first") {
        return dt[0].value;
      } else if (value.toLowerCase() === "last") {
        return dt[dt.length - 1].value;
      } else return dt[0].value;
    };
    // Set data
    if (items.length > 0 && items.length === values.length) {
      // User definded
      let dataList = [];
      for (let i = 0; i < items.length; i++) {
        const itemValue = values[i].trim();
        const text = items[i].trim();
        dataList.push({
          value: itemValue,
          text: text,
          columns: [text],
        });
      }
      SetData(dataList);
      setSelectedValue(defaultValue(dataList));
    } else {
      // from data table (Promise data)
      let dataList = [];
      props.data.data.then((result) => {
        result.map((row) =>
          dataList.push({
            value: row[props.dataValue],
            text: row[props.displayValue],
            columns: [props.displayColumns.split(",").map((item) => row[item])],
          })
        );

        SetData(dataList);
        setSelectedValue(defaultValue(dataList));
      }); // Promise(props.data.data)
    }
  }, []);

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.text,
    
  };

  return (
    <Autocomplete
      {...defaultProps}
      id={props.name}
      name={props.name}
      disableClearable
      renderInput={(params) => (
        <TextField {...params} label="disableClearable" margin="normal" />
      )}
      value={selectedValue}
      onChange={(e) => {
        e.preventDefault();
        setSelectedValue(e.target.value);
      }}
    />

    // <select
    //   className={props.className}
    //   ref={(el) => (props.inputRef.current[inputId] = el)}
    //   id={props.name}
    //   name={props.name}
    //   value={selectedValue}
    //   onChange={(e) => {
    //     e.preventDefault();
    //     setSelectedValue(e.target.value);
    //   }}
    // >
    //   {data.map((item, index) => (
    //     <option key={index} value={item.value}>
    //       {item.text}
    //     </option>
    //   ))}

    // </select>
  );
}
