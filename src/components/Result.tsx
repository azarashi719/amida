import {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import {AmidaDrawing, AmidaSize} from '../states/types/amidaView'
import { useDispatch, useSelector } from "react-redux";

import {getAmidaSizeIntervalWidth, getAmidaSizeCanvasWidth} from '../states/amidaSize/selectors'

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
    width: ${ props => props.intervalWidth + 'px' };
    left: ${ props => props.leftPosition + 'px' };
    img {
        width: 100%;
        height: auto;
    }
`

type Props = {
    amidaSize: AmidaSize,
    atariNumber: number,
}

function ResultComponent(props: Props) {
    const selector = useSelector(state => state.amidaSize);
    const leftPosition: number = (getAmidaSizeIntervalWidth(selector) * props.atariNumber) + (getAmidaSizeIntervalWidth(selector) / 2);

    return (
        <Wrap canvasWidth={getAmidaSizeCanvasWidth(selector)}>
            <ImageBox
                intervalWidth={getAmidaSizeIntervalWidth(selector)}
                leftPosition={leftPosition}
                >
                <img src="/public/image/onepiece04_usopp_sogeking.png" />
            </ImageBox>
        </Wrap>
    );
}

export default ResultComponent