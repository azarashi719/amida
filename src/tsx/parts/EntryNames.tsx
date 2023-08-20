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
    amidaPath: [number, any],
    setAmidaPath: Function,
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

    const getPrevPoint = (point: number): number => {
        return point;
    }

    const shouldMoveToNext = (x: number, y: number): Boolean => {
        return props.amidaPath[y][x][0] === getThisPoint(x);
    }

    const shouldMoveToPrev = (x: number, y: number): Boolean => {
        return props.amidaPath[y][x][1] === getThisPoint(x);
    }

    const goToResult = (index: number) => {
        ctx = props.canvasContext;
        if (firstAccess) {
            // 辿った線のないあみだを保存
            baseAmida = ctx.getImageData(0, 0, props.canvasWidth, props.canvasHeight);
            firstAccess = false;
        } else {
            // 辿った線を消去
            ctx.putImageData(baseAmida, 0, 0);
        }
        
        ctx.strokeStyle = "#00b0ec";
        ctx.lineWidth = 3;

        let x = index;
        for (let y: number = 0; y < props.numberOfTree; y++) {
            ctx.moveTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getThisPoint(y));
            if (shouldMoveToNext(x, y)) {
                ctx.beginPath();
                ctx.moveTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getThisPoint(y));
                ctx.lineTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getNextPoint(y));
                ctx.lineTo(props.intervalWidth * getNextPoint(x), props.intervalHeight * getNextPoint(y));
                ctx.stroke();
                x++;
            } else if (shouldMoveToPrev(x, y)) {
                ctx.beginPath();
                ctx.moveTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getThisPoint(y));
                ctx.lineTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getNextPoint(y));
                ctx.lineTo(props.intervalWidth * getPrevPoint(x), props.intervalHeight * getNextPoint(y));
                ctx.stroke();
                x--;
            } else {
                ctx.beginPath();
                ctx.moveTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getThisPoint(y));
                ctx.lineTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getNextPoint(y));
                ctx.stroke();
            }
        }
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