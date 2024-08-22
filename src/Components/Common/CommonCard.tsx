import React from "react";
import { Card, CardProps } from "@mui/material";

interface CommonCardProps extends CardProps {}

const CommonCard: React.FC<CommonCardProps> = ({ children, ...props }) => {
  return (
    <Card
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.16)",
        boxShadow: 0,
        elevation: 0,
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        // borderRadius: "8px",
        // backgroundColor: "rgba(255, 255, 255, 0.3)",
        // backdropFilter: "blur(10px)",
        padding: "2vw",
        margin: "0px",
        // maxWidth: 800,
        // margin: "auto",
        // marginTop: 2,
        // padding: 2,
        // marginBottom: 4,
        // backgroundColor: "white",
        // color: "black",
        ...props.sx,
      }}
    >
      {children}
    </Card>
  );
};

export default CommonCard;
