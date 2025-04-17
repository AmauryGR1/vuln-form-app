import * as React from "react";
import { Chip } from "@mui/material";

const getSeverityColors = (severity, mode = "dark") => {
  const lightMode = mode === "light";
  const colors = {
    purple: {
      bg: lightMode ? "#F5F0FA" : "#1B102A",
      color: lightMode ? "#7D3CBD" : "#A07FEF",
    },
    red: {
      bg: lightMode ? "#FAF0F0" : "#160B0B",
      color: lightMode ? "#BA0D0D" : "#F44336",
    },
    yellow: {
      bg: lightMode ? "#FCF2E6" : "#191207",
      color: lightMode ? "#8A4D02" : "#FFA726",
    },
    blue: {
      bg: lightMode ? "#e8f4fa" : "#071318",
      color: lightMode ? "#0A6391" : "#29b6f6",
    },
    green: {
      bg: lightMode ? "#E1FAEB" : "#0c130d",
      color: lightMode ? "#20693D" : "#66bb6a",
    },
  };
  const severityColors = {
    critical: colors.purple,
    high: colors.red,
    medium: colors.yellow,
    low: colors.blue,
    info: colors.green,
  };
  return severityColors[severity] || colors.green;
};

const MyStyledChip = (props) => (
  <Chip
    label={props.label}
    color="success"
    size={props?.size || "small"}
    sx={{
      bgcolor: getSeverityColors(props.label, props.mode || "dark").bg,
      color: getSeverityColors(props.label, props.mode || "dark").color,
      fontWeight: 600,
      ".MuiChip-label": {
        fontWeight: 600,
      },
      ...props?.sx,
    }}
  />
);

export default function StatusChip(props) {
  return <MyStyledChip {...props}>{props.children}</MyStyledChip>;
  // return (
  //   <Chip
  //     {...props}
  //     label={props.label}
  //     color="success"
  //     size={props?.label || "small"}
  //   />
  // );
}
