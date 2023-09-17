import {useEffect, useRef, useState, useLayoutEffect} from 'react'
import styled from '@emotion/styled'
import {useSelector, useDispatch} from 'react-redux'

import AmidaBaseComponent from './components/AmidaBase'
import EntryNamesComponent from './components/EntryNames'
import ResultComponent from './components/Result'
import {AmidaDrawing, AmidaSize} from './states/types/amidaView'
import {setCanvasHeight, setCanvasWidth, setLengthEntryNames} from './states/amidaSize/actions'
import {getAmidaSizeIntervalHeight, getAmidaSizeIntervalWidth, getAmidaSizeCanvasHeight, getAmidaSizeNumberOfTree, getAmidaSizeLengthEntryNames} from './states/amidaSize/selectors'


const Container = styled.div`
    margin: 30px;
`;

function ContainerComponent() {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const canvasRef: any = useRef(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [amidaPath, setAmidaPath] = useState<number[][][]>([]);
    const entryNames: Array<String> = ['a', 'b', 'c', 'd'];

    let amidaSize: AmidaSize = {
        lengthEntryNames: entryNames.length,
    };

    const canvasHeight = getAmidaSizeNumberOfTree(selector) * getAmidaSizeIntervalHeight(selector) + 40;
    const canvasWidth = (entryNames.length * getAmidaSizeIntervalWidth(selector)) + getAmidaSizeIntervalWidth(selector);

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
                    entryNames={entryNames}
                    canvasContext={canvasContext}
                    setCanvasContext={setCanvasContext}
                    amidaPath={amidaPath}
                    setAmidaPath={setAmidaPath}
                />
                <AmidaBaseComponent
                    entryNames={entryNames}
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