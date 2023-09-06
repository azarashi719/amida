import {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import {AmidaDrawing, AmidaSize} from '../states/types/amidaView'

type EntryNamesProps = {
    canvasWidth: number,
    intervalWidth: number,
}
const EntryNames = styled.ul<EntryNamesProps>`
    display: flex;
    padding: 0 ${props => (props.intervalWidth / 2) + 'px'};
    width: ${props => props.canvasWidth + 'px'};
    box-sizing: border-box;
    text-align: center;
    margin: 0 0 -30px;
    position: relative;
    z-index: 100;
    > li {
        width: ${props => props.intervalWidth + 'px'};
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
    amidaSize: AmidaSize,
    entryNames: Array<String>,
    canvasContext: any,
    setCanvasContext: Function,
    amidaPath: number[][][],
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
            baseAmida = ctx.getImageData(0, 0, props.amidaSize.canvasWidth, props.amidaSize.canvasHeight);
            firstAccess = false;
        } else {
            // 辿った線を消去
            ctx.putImageData(baseAmida, 0, 0);
        }
        
        ctx.strokeStyle = "#00b0ec";
        ctx.lineWidth = 3;

        let x = index;

        for (let y: number = 0; y < props.amidaSize.numberOfTree; y++) {
            ctx.moveTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getThisPoint(y));
            if (shouldMoveToNext(x, y)) {
                ctx.beginPath();
                ctx.moveTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getThisPoint(y));
                ctx.lineTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                ctx.lineTo(props.amidaSize.intervalWidth * getNextPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                ctx.stroke();
                x++;
            } else if (shouldMoveToPrev(x, y)) {
                ctx.beginPath();
                ctx.moveTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getThisPoint(y));
                ctx.lineTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                ctx.lineTo(props.amidaSize.intervalWidth * getPrevPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                ctx.stroke();
                x--;
            } else {
                ctx.beginPath();
                ctx.moveTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getThisPoint(y));
                ctx.lineTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                ctx.stroke();
            }
        }
        props.setCanvasContext(ctx);
    }


    return (
        <EntryNames
            intervalWidth={props.amidaSize.intervalWidth}
            canvasWidth={props.amidaSize.canvasWidth}
            >
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