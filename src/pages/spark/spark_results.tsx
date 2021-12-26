import {DarkTypography} from "src/components/theme/mui/dark_typography";
import React, {useEffect, useState, useLayoutEffect} from "react";
import {Typography} from "@material-ui/core";
import {ImageGallery} from "src/components/screens/image_gallery";
import {ecessApiCall} from "src/utils/api";



function ExportWinner(props) {
    const {emoji, children, placement, title, link} = props;
    return (
        <div style={{
            display: "flex",
            borderWidth: 1,
            borderStyle: "solid",
            margin: 10,
            padding: 10,
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderColor: "rgba(0, 0, 0, 0)",
        }}>
            <div>
                {emoji}
            </div>
            <div style={{flex: 1}}>
                <DarkTypography variant={'subtitle2'}>️{placement}</DarkTypography>
                <DarkTypography variant={'subtitle2'}>
                    <a href={link}
                       style={{fontSize: 12, margin: 0, padding: 0}}>{title}</a>
                </DarkTypography>
                {children}
            </div>
        </div>
    )
}

export function SparkResults() {

    const [photos, setPhotos] = useState(undefined);
    useEffect(() => {
        if (photos === undefined) {
            const getLinks = async () => {
                const response: any = await ecessApiCall("events", undefined, {
                    path: "events/12-11-2021-spark/"
                }, "https://ecess-api.matthewwen.com/ecess");
                response.forEach((item) => {
                    item.opacity = 1
                })
                for (let i = 0; i < response.length; i++) {
                    let idx =  i + Math.floor(Math.random() * (response.length - i));
                    const temp = response[i];
                    response[i] = response[idx];
                    response[idx] = temp;
                }
                return response;
            }
            getLinks().then((response: any[]) => {
                setPhotos(response);
            })

        }

    }, [photos])

    const [width, setWidth] = useState(undefined);

    useLayoutEffect(() => {
        function updateSize() {
            let newWidth = window.innerWidth > 500 ? window.innerWidth: 500;
            setWidth(newWidth * 0.8 / 3);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div>
            {photos &&
            <ImageGallery
                photos={photos}
            >
                <div style={{padding: 10, overflowX: "hidden", maxWidth: "100%"}}>
                    <DarkTypography variant={'h6'}>
                        Winners!! 🎉
                    </DarkTypography>
                    {width &&
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fill,minmax(${Math.floor(width)}px, 1fr))`,
                    }}>
                        <ExportWinner
                            title={"Snow Vision"}
                            emoji={"🥇"}
                            link={"https://engineering.purdue.edu/477grp17/"}
                            placement={"First Place"}
                        />
                        <ExportWinner
                            title={"RevEx"}
                            emoji={"🥈"}
                            placement={"Second Place"}
                            link={"https://engineering.purdue.edu/477grp6/"}/>
                        <ExportWinner
                            title={"Interactive Piano"}
                            emoji={"🥉"}
                            link={"https://engineering.purdue.edu/477grp16/"}
                            placement={"Third Place"}/>
                    </div>
                    }
                </div>
            </ImageGallery>
            }

            <div style={{textAlign: "center", margin: "30px 0 30px 0"}}>
                <Typography variant={"h6"}>Awards</Typography>
                <div style={{display: "flex", marginTop: 25, flexWrap: "wrap"}}>
                    <div style={{flex: 1}}>
                        <Typography variant={"subtitle2"}>First Place</Typography>
                        <Typography variant={"h6"}>$1000</Typography>
                    </div>
                    <div style={{flex: 1}}>
                        <Typography variant={"subtitle2"}>Second Place</Typography>
                        <Typography variant={"h6"}>$800</Typography>
                    </div>
                    <div style={{flex: 1}}>
                        <Typography variant={"subtitle2"}>Third Place</Typography>
                        <Typography variant={"h6"}>$600</Typography>
                    </div>
                </div>
            </div>

            <div style={{padding: "30px", backgroundColor: "#fff", }}>
                <div style={{maxWidth: 1080, margin: "0 auto"}}>
                    <DarkTypography variant={"h6"}>Corporate Sponsors</DarkTypography>

                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {
                            [
                                {name: "GM", logo: "General_Motors_(2021).svg"},
                                {name: "John Deere", logo: "John_Deere_logo.svg.png"},
                                {name: "Texas Instruments", logo: "Official_logo_of_Texas_Instruments.png"},
                                {name: "Qualcomm", logo: "qualcomm.jpg"},
                                {name: "Eastman", logo: "eastman.png"},
                                {name: "JLG", logo: "jlg.svg.png"},
                                {name: "Cliffs", logo: "cliffs.jpg"},
                            ].map((item, i) => (
                                <div key={`sponsor-${item.name}`} style={{display: "flex", flexDirection: "column", margin: 10}}>
                                    <div style={{flex: 1}} />
                                    <img style={{maxWidth: 100, maxHeight: 100, height: "auto", width: "auto"}} src={process.env.PUBLIC_URL + "/static/logo/other/" + item.logo} alt={item.name}/>
                                    <div style={{flex: 1}} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div style={{padding: "30px"}}>
                <div style={{maxWidth: 1080, margin: "0 auto"}}>
                    <Typography variant={"h6"}>Video Submissions</Typography>
                    <Typography variant={"subtitle1"}>Coming Soon</Typography>
                </div>
            </div>

        </div>
    )

}
