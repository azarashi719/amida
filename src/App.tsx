import {useEffect, useRef, useState, useLayoutEffect} from 'react'
import styled from '@emotion/styled'
import {useSelector, useDispatch} from 'react-redux'

import AmidaBaseComponent from './components/AmidaBase'
import EntryNamesComponent from './components/EntryNames'
import ResultComponent from './components/Result'
import {AmidaDrawing, AmidaSize} from './states/types/amidaView'
import {setCanvasHeight, setCanvasWidth} from './states/amidaSize/actions'
import {getAmidaSizeIntervalHeight, getAmidaSizeIntervalWidth, getAmidaSizeCanvasHeight, getAmidaSizeNumberOfTree} from './states/amidaSize/selectors'


const Container = styled.div`
    margin: 30px;
`;

function ContainerComponent() {
    const selector = useSelector(state => state.amidaSize);
    const dispatch = useDispatch();
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
    const canvasHeight = getAmidaSizeNumberOfTree(selector) * getAmidaSizeIntervalHeight(selector) + 40;
    const canvasWidth = (4 * getAmidaSizeIntervalWidth(selector)) + getAmidaSizeIntervalWidth(selector);

    const atariNumber: number = Math.floor(Math.random() * amidaSize.lengthEntryNames);
    
    useLayoutEffect(() => {
        dispatch(setCanvasWidth(canvasWidth));
        dispatch(setCanvasHeight(canvasHeight));
    }, [canvasWidth, canvasHeight]);

    return (
        <>
            <Container>
                <p>{getAmidaSizeCanvasHeight(selector)}</p>
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