import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import CanvasComponent from './parts/Canvas'

const Container = styled.div`
    margin: 30px;
`;

function ContainerComponent() {
    const [canvasContext, setCanvasContext] = useState(null);
    const canvasRef = useRef(null);

    const entryNames: Array<String> = ['a', 'b', 'c', 'd'];
    const lengthEntryNames: number = entryNames.length;
    const intervalWidth: number = 80;
    const intervalHeight: number = 30;
    let canvasWidth: number = 0;
    const canvasHeight: number = 530;

    canvasWidth = (lengthEntryNames * intervalWidth) + intervalWidth;
    
    
    return (
        <>
            <Container>
                <CanvasComponent 
                    canvasWidth={canvasWidth} 
                    canvasHeight={canvasHeight}
                    intervalWidth={intervalWidth}
                    intervalHeight={intervalHeight}
                    setCanvasContext={setCanvasContext} 
                    canvasRef={canvasRef}
                    lengthEntryNames={lengthEntryNames}
                />
            </Container>
        </>
    )
}

export default ContainerComponent