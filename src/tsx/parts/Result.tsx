import {useEffect, useRef} from 'react'
import styled from 'styled-components'

// TODO: consoleのwarning出てる
type WrapProps = {
    canvasWidth: number
}
const Wrap = styled.div<WrapProps>`
    position: relative;
    width: ${props => props.canvasWidth + 'px'};
`

type ImageBoxProps = {
    intervalWidth: number,
    leftPosition: number,
}
const ImageBox = styled.span<ImageBoxProps>`
    position: absolute;
    width: ${props => props.intervalWidth + 'px'};
    left: ${props => props.leftPosition + 'px'};
    img {
        width: 100%;
        height: auto;
    }
`

type Props = {
    canvasWidth: number,
    intervalWidth: number,
    lengthEntryNames: number,
}

function ResultComponent(props: Props) {
    const atariNumber: number = Math.floor(Math.random() * props.lengthEntryNames);

    const leftPosition: number = (props.intervalWidth * atariNumber) - (props.intervalWidth / 2);

    return (
        <Wrap canvasWidth={props.canvasWidth}>
            <ImageBox 
                intervalWidth={props.intervalWidth}
                leftPosition={leftPosition}
                >
                <img src="/public/image/onepiece04_usopp_sogeking.png" />
            </ImageBox>
        </Wrap>
    );
}

export default ResultComponent