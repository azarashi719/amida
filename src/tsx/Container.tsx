import {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import AmidaBaseComponent from './components/AmidaBase'
import EntryNamesComponent from './components/EntryNames'
import ResultComponent from './components/Result'

const Container = styled.div`
    margin: 30px;
`;

function ContainerComponent() {
    const canvasRef: any = useRef(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const numberOfTree: number = 15;
    const entryNames: Array<String> = ['a', 'b', 'c', 'd'];
    const lengthEntryNames: number = entryNames.length;
    const intervalWidth: number = 100;
    const intervalHeight: number = 30;
    let canvasWidth: number = 0;
    let canvasHeight: number = 0;
    canvasHeight = (numberOfTree *  intervalHeight) + 40;
    canvasWidth = (lengthEntryNames * intervalWidth) + intervalWidth;

    const [amidaPath, setAmidaPath] = useState<number[][][]>([]);
    

    useEffect(() => {
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
                    amidaPath={amidaPath}
                    setAmidaPath={setAmidaPath}
                />
                <AmidaBaseComponent 
                    canvasWidth={canvasWidth} 
                    canvasHeight={canvasHeight}
                    intervalWidth={intervalWidth}
                    intervalHeight={intervalHeight}
                    numberOfTree={numberOfTree}
                    canvasContext={canvasContext}
                    setCanvasContext={setCanvasContext} 
                    canvasRef={canvasRef}
                    lengthEntryNames={lengthEntryNames}
                    amidaPath={amidaPath}
                    setAmidaPath={setAmidaPath}
                />
                <ResultComponent
                    canvasWidth={canvasWidth}
                    intervalWidth={intervalWidth}
                    lengthEntryNames={lengthEntryNames}
                />
            </Container>
        </>
    )
}

export default ContainerComponent