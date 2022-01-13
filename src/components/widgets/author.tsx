import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {ImageLoader} from "../utils/image_loader";
import {getPictureUrl} from "../../data/data_people";

export function Author(props) {
    const {name, relative} = props;

    const [picture, setPicture] = useState(props.picture);
    if (picture === undefined) {
        getPictureUrl(name).then(response => {
            setPicture(response);
        });
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row-reverse', top: -20, bottom: -20, position: (relative ? 'relative': 'static')}}>
            <div style={{flex: 1}} />
            <Typography variant={"body2"} component={"p"} style={{textAlign: 'center', margin: 'auto', padding: 5, whiteSpace: "nowrap"}} >
                { name }
            </Typography>
            {picture &&
                <div style={{width: 30, height: 30, overflow: "hidden", borderRadius: "100%"}}>
                    <ImageLoader height={35} width={30} src={process.env.PUBLIC_URL + picture}/>
                </div>
            }
        </div>
    )
}