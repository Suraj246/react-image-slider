import { useEffect, useState, useRef } from "react";
import ImgData from './ImgData'
import { Box, Typography } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
function Slider() {
    const [current, setCurrent] = useState<number>(0);
    const [intervalTime, setIntervalTime] = useState<string>("start")

    const slideNext = () => {
        setCurrent(current === ImgData.length - 1 ? 0 : current + 1);
    };
    // console.log('current', current);
    var timer: any;
    var onChangeRef = useRef(timer)
    useEffect(() => {
        if (intervalTime === "start") {
            onChangeRef.current = setInterval(() => slideNext(), 3000)
        }


        return () => clearInterval(onChangeRef.current)
    }, [current, intervalTime])

    var stop = () => {
        clearInterval(onChangeRef.current)
        setIntervalTime("start")

    }


    const slidePrev = () => {
        setCurrent(current === 0 ? ImgData.length - 1 : current - 1);
    };
    const goToIndex = (index: any) => {
        setCurrent(index)
    }
    return (
        <Box className="slider-page" >
            <Box className="container-img">
                {ImgData.map((elem, index) => {
                    const { image } = elem;
                    return (
                        <Box key={index} className="img-slider-container">
                            {
                                current ?
                                    <>
                                        {index === current &&
                                            <Box className="flex">
                                                <Box>
                                                    <img src={image} alt={elem.title} className="img-slide" loading="lazy" />
                                                </Box>
                                                <Box className="content-container">
                                                    <Box style={{ display: "grid", gap: "3rem" }}>
                                                        <Typography className="content" variant="h3" style={{ fontWeight: "500" }}>{elem?.title}</Typography>
                                                        <Typography className="content">{elem.text}</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        }
                                    </>
                                    :
                                    <Box className="flex">
                                        {index === current &&
                                            <>
                                                <Box>
                                                    <img src={ImgData[0].image} alt={ImgData[0].title} className="img-slide" loading="lazy" />
                                                </Box>
                                                <Box className="content-container">
                                                    <Box style={{ display: "grid", gap: "3rem" }}>
                                                        <Typography className="content" variant="h3" style={{ fontWeight: "500" }}>{ImgData[0].title}</Typography>
                                                        <Typography className="content">{ImgData[0].text}</Typography>
                                                    </Box>

                                                </Box>

                                            </>
                                        }
                                    </Box>
                            }

                        </Box>
                    )
                })}
                <Box className="flex-image">

                    <Box className="arrow-container">
                        <ArrowCircleLeftIcon onClick={slidePrev} sx={{ fontSize: 50 }} />
                        <Box className="img-container">
                            {ImgData.map((elem, index) => {
                                const { image } = elem;
                                return (
                                    <img key={index} src={image} alt={elem.title} loading="lazy"
                                        className={current === index ? "" : "img-index"}
                                        onClick={() => {
                                            goToIndex(index)
                                        }}
                                    />
                                )
                            })}
                        </Box>
                        <ArrowCircleRightIcon onClick={slideNext} sx={{ fontSize: 50 }} />
                    </Box>
                    <Box className="play-container">
                        {intervalTime === "start" && <PlayCircleIcon sx={{ fontSize: 110 }} style={{ color: "#29b6f6" }}
                            onClick={() => setIntervalTime("end")}
                        />}
                        {intervalTime === "end" &&
                            <PauseCircleIcon sx={{ fontSize: 110 }} style={{ color: "#29b6f6" }}
                                onClick={stop}
                            />
                        }
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}

export default Slider;
