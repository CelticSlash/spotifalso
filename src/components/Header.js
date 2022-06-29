import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header()
{
    return(
        <AppBar position="fixed" color="success">
            <Toolbar>
                <img src="ryuko.png" style={{height: '61px', width: '75px'}} alt="Ryuka"/>
                {/* <HeadsetTwoTone style={{fontSize: '30px'}}/> */}
                <Typography variant="h6" component="h1" style={{marginLeft: '5px'}}>Ryuko Player 3.0</Typography>
            </Toolbar>
        </AppBar>
    )

}