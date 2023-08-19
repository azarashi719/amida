import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import CanvasComponent from './parts/Canvas'
import EntryNamesComponent from './parts/EntryNames'

const Container = styled.div`
    margin: 30px;
`;

function ContainerComponent() {
    const canvasRef: any = useRef(null);
    const [canvasContext, setCanvasContext]: any = useState(null);
    const numberOfTree: number = 15;
    const entryNames: Array<String> = ['a', 'b', 'c', 'd'];
    const lengthEntryNames: number = entryNames.length;
    const intervalWidth: number = 80;
    const intervalHeight: number = 30;
    let canvasWidth: number = 0;
    let canvasHeight: number = 0;
    canvasHeight = (numberOfTree *  intervalHeight) + 40;
    canvasWidth = (lengthEntryNames * intervalWidth) + intervalWidth;
    
    const getCanvasContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;
        return canvas.getContext("2d");
    }

    useEffect(() => {
        // const ctx: CanvasRenderingContext2D = getCanvasContext();
        
        // setCanvasContext(ctx);
        // console.log(canvasContext);
    });

    return (
        <>
            <Container>
                <EntryNamesComponent 
                    canvasWidth={canvasWidth} 
                    canvasHeight={canvasHeight}
                    intervalWidth={intervalWidth}
                    intervalHeight={intervalHeight}
                    entryNames={entryNames}
                    lengthEntryNames={lengthEntryNames}
                    canvasContext={canvasContext}
                    setCanvasContext={setCanvasContext}
                    numberOfTree={numberOfTree}
                />
                <CanvasComponent 
                    canvasWidth={canvasWidth} 
                    canvasHeight={canvasHeight}
                    intervalWidth={intervalWidth}
                    intervalHeight={intervalHeight}
                    numberOfTree={numberOfTree}
                    canvasContext={canvasContext}
                    setCanvasContext={setCanvasContext} 
                    canvasRef={canvasRef}
                    lengthEntryNames={lengthEntryNames}
                />
            </Container>
        </>
    )
}

export default ContainerComponent