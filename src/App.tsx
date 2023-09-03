import {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import AmidaBaseComponent from './components/AmidaBase'
import EntryNamesComponent from './components/EntryNames'
import ResultComponent from './components/Result'
import {AmidaDrawing, AmidaSize} from './tsx/types/amidaView'

const Container = styled.div`
    margin: 30px;
`;

function ContainerComponent() {
    const canvasRef: any = useRef(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [amidaPath, setAmidaPath] = useState<number[][][]>([]);
    const entryNames: Array<String> = ['a', 'b', 'c', 'd'];
    
    
    let amidaSize: AmidaSize = {
        lengthEntryNames: entryNames.length,
        numberOfTree: 15,
        canvasWidth: 0,
        canvasHeight: 0,
        intervalWidth: 100,
        intervalHeight: 30,
    };
    amidaSize.canvasHeight = (amidaSize.numberOfTree * amidaSize.intervalHeight) + 40;
    amidaSize.canvasWidth = (amidaSize.lengthEntryNames * amidaSize.intervalWidth) + amidaSize.intervalWidth;
    const atariNumber: number = Math.floor(Math.random() * amidaSize.lengthEntryNames);

    useEffect(() => {
    });

    return (
        <>
            <Container>
                <EntryNamesComponent
                    amidaSize={amidaSize}
                    entryNames={entryNames}
                    canvasContext={canvasContext}
                    setCanvasContext={setCanvasContext}
                    amidaPath={amidaPath}
                    setAmidaPath={setAmidaPath}
                />
                <AmidaBaseComponent 
                    amidaSize={amidaSize}
                    canvasContext={canvasContext}
                    setCanvasContext={setCanvasContext} 
                    canvasRef={canvasRef}
                    amidaPath={amidaPath}
                    setAmidaPath={setAmidaPath}
                />
                <ResultComponent
                    amidaSize={amidaSize}
                    atariNumber={atariNumber}
                />
            </Container>
        </>
    )
}

export default ContainerComponent