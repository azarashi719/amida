import {useEffect, useRef} from 'react'
import styled from 'styled-components'

const EntryNames = styled.ul`
    display: flex;
    padding: 0 40px;
    text-align: center;
    margin: 0 0 -30px;
    position: relative;
    z-index: 100;
    > li {
        width: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
`

const Name = styled.p`
    
`

const Button = styled.button`
    
`
type Props = {
    canvasWidth: number,
    canvasHeight: number,
    intervalWidth: number,
    intervalHeight: number,
    entryNames: Array<String>,
    lengthEntryNames: number,
    canvasContext: any,
    setCanvasContext: Function,
    numberOfTree: number,
}

function EntryNamesComponent(props: Props){
    let ctx = null;
    let firstAccess: Boolean = true;
    let baseAmida: any = null;
    
    const getThisPoint = (point: number): number => {
        return point + 1;
    }

    const getNextPoint = (point: number): number => {
        return point + 2;
    }

    const goToResult = (index: number) => {
        ctx = props.canvasContext;
        console.log(ctx);
        if (firstAccess) {
            baseAmida = ctx.getImageData(0, 0, props.canvasWidth, props.canvasHeight);
            firstAccess = false;
        }
        ctx.putImageData(baseAmida, 0, 0);
        for (let x: number = 0; x < props.lengthEntryNames; x++){
            let pointX = x;
            for(let y: number = 0; y < props.numberOfTree; y++) {
                ctx.moveTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getThisPoint(y));
            
            }
        }
        console.log(index);
        
        console.log(baseAmida);
        props.setCanvasContext(ctx);
    }


    return (
        <EntryNames>
            {props.entryNames.map( (value: String, index: number) => {
                return (
                    <li key={index}>
                        <Name>{value}</Name>
                        <Button type="button" onClick={() => goToResult(index)}><span>スタート</span></Button>
                    </li>
                )
            })}
        </EntryNames>
    )
}

export default EntryNamesComponent