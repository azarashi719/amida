import {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import {AmidaDrawing, AmidaSize} from '../types/amidaView'

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
}

function ResultComponent(props: Props) {
    const atariNumber: number = Math.floor(Math.random() * props.amidaSize.lengthEntryNames);

    const leftPosition: number = (props.amidaSize.intervalWidth * atariNumber) + (props.amidaSize.intervalWidth / 2);

    return (
        <Wrap canvasWidth={props.amidaSize.canvasWidth}>
            <ImageBox
                intervalWidth={props.amidaSize.intervalWidth}
                leftPosition={leftPosition}
                >
                <img src="/public/image/onepiece04_usopp_sogeking.png" />
            </ImageBox>
        </Wrap>
    );
}

export default ResultComponent