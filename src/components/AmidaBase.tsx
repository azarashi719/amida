import {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import {AmidaDrawing, AmidaSize} from '../tsx/types/amidaView'

const Canvas = styled.canvas`

`

type Props = {
    amidaSize: AmidaSize,
    canvasContext: CanvasRenderingContext2D | null,
    setCanvasContext: Function,
    canvasRef: any,
    amidaPath: number[][][],
    setAmidaPath: Function,
}

function AmidaBaseComponent(props: Props) {
    /**
     * 
     * @returns 
     */
     const getCanvasContext = (): CanvasRenderingContext2D | null => {
        const canvas: HTMLCanvasElement = props.canvasRef.current;
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
        const ctx: CanvasRenderingContext2D | null = getCanvasContext();
        if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        ctx.clearRect(0, 0, props.amidaSize.canvasWidth, props.amidaSize.canvasHeight);
        ctx.strokeStyle = '#261103';

        let branchingPoint: number = 0;

        for (let y: number = 0; y < props.amidaSize.numberOfTree; y++) {
            branchingPoint = 0;
            props.amidaPath[y] = new Array(branchingPoint);
            for (let x: number = 0; x < props.amidaSize.lengthEntryNames; x++){
                const isLastCol = x === props.amidaSize.lengthEntryNames - 1;
                const isLastRow = y === props.amidaSize.numberOfTree - 1;
                const isNotBranching = getRandomNumberForBranching() === 0;
                if (isLastCol || isLastRow || isNotBranching){
                    // 枝分かれ
                    props.amidaPath[y][branchingPoint] = [0, 0];
                    branchingPoint++;

                    ctx.beginPath();
                    // 座標を取得
                    ctx.moveTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getThisPoint(y));
                    // 縦線を引く
                    ctx.lineTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                    ctx.stroke();
                } else {
                    //隣の座標の分もセット
                    for (let t: number = 0; t < 2; t++) {
                        props.amidaPath[y][branchingPoint] = [getThisPoint(x), getNextPoint(x)];
                        branchingPoint++;
                    }
                    ctx.beginPath();
                    // 座標を取得
                    ctx.moveTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getThisPoint(y));
                    // 縦線を引く
                    ctx.lineTo(props.amidaSize.intervalWidth * getThisPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                    // 横線を引く
                    ctx.lineTo(props.amidaSize.intervalWidth * getNextPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                    // 隣のx座標を取得
                    ctx.moveTo(props.amidaSize.intervalWidth * getNextPoint(x), props.amidaSize.intervalHeight * getThisPoint(y));
                    // 隣のx縦線を引く
                    ctx.lineTo(props.amidaSize.intervalWidth * getNextPoint(x), props.amidaSize.intervalHeight * getNextPoint(y));
                    ctx.stroke();
                    // 隣のx座標の縦線は書いたのでスキップ
                    x++;
                }
            }
        }
        props.setCanvasContext(ctx);
        props.setAmidaPath(props.amidaPath);
    });

    return (
        <Canvas ref={props.canvasRef} width={props.amidaSize.canvasWidth} height={props.amidaSize.canvasHeight}>
            canvas not supported...
        </Canvas>
    )
}
export default AmidaBaseComponent