import {useEffect, useRef} from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`

`
type Props = {
    canvasWidth: number,
    canvasHeight: number,
    intervalWidth: number,
    intervalHeight: number,
    canvasContext: any,
    setCanvasContext: Function,
    numberOfTree: number,
    canvasRef: any,
    lengthEntryNames: number
}

function CanvasComponent(props: Props) {
    /**
     * 
     * @returns 
     */
     const getCanvasContext = (): CanvasRenderingContext2D => {
        const canvas: any = props.canvasRef.current;
        return canvas.getContext("2d");
    }

    const getRandomNumberForBranching = (): number => {
        return Math.floor(Math.random() * 2);
    }

    const getThisPoint = (point: number): number => {
        return point + 1;
    }

    const getNextPoint = (point: number): number => {
        return point + 2;
    }
    
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getCanvasContext();
        props.setCanvasContext(ctx);
        ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
        ctx.strokeStyle = '#261103';

        type amidaPathType = [number, any]
        const amidaPath: amidaPathType = [0, []];
        let branchingPoint: number = 0;

        for (let y: number = 0; y < props.numberOfTree; y++) {
            amidaPath[y] = [branchingPoint];
            for (let x: number = 0; x < props.lengthEntryNames; x++){
                const isLastCol = x === props.lengthEntryNames - 1;
                const isLastRow = y === props.numberOfTree - 1;
                const isNotBranching = getRandomNumberForBranching() === 0;
                if (isLastCol || isLastRow || isNotBranching){
                    // 枝分かれ
                    amidaPath[y][branchingPoint] = [0, 0];
                    branchingPoint++;

                    ctx.beginPath();
                    // 座標を取得
                    ctx.moveTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getThisPoint(y));
                    // 縦線を引く
                    ctx.lineTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getNextPoint(y));
                    ctx.stroke();
                } else {
                    //隣の座標の分もセット
                    for (let t: number = 0; t < 2; t++) {
                        amidaPath[y][branchingPoint] = [getThisPoint(x), getNextPoint(x)];
                        branchingPoint ++;
                    }
                    ctx.beginPath();
                    // 座標を取得
                    ctx.moveTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getThisPoint(y));
                    // 縦線を引く
                    ctx.lineTo(props.intervalWidth * getThisPoint(x), props.intervalHeight * getNextPoint(y));
                    // 横線を引く
                    ctx.lineTo(props.intervalWidth * getNextPoint(x), props.intervalHeight * getNextPoint(y));
                    // 隣のx座標を取得
                    ctx.moveTo(props.intervalWidth * getNextPoint(x), props.intervalHeight * getThisPoint(y));
                    // 隣のx縦線を引く
                    ctx.lineTo(props.intervalWidth * getNextPoint(x), props.intervalHeight * getNextPoint(y));
                    ctx.stroke();
                    // 隣のx座標の縦線は書いたのでスキップ
                    x++;
                }
            }
        }
    });

    return (
        <Canvas ref={props.canvasRef} width={props.canvasWidth} height={props.canvasHeight}>
            canvas not supported...
        </Canvas>
    )
}
export default CanvasComponent