import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import './infoBox.css';

function InfoBox({title, active, isRed,isGreen,isOrange,cases,total, ...props}) {
    return (

           <Card className={`infobox ${active && "infobox--selected"} ${
        isRed && "infobox--red"} ${isGreen && "infobox--green"} ${isOrange && "infobox--orange"}`} onClick={props.onClick}>
               <CardContent >
                   {/* {title} */}
                    <Typography  className="infobox__title" color="textSecondary">{title}</Typography>
                   {/* {cases} */}
                    <h2 className={`infobox__cases ${isGreen && "infobox__cases--green"} ${isOrange && "infobox__cases--orange"}`}>{cases}</h2>
                   {/* {total cases} */}
                    <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>
               </CardContent>
            </Card> 
    )
}

export default InfoBox
