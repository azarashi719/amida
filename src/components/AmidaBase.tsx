import {useEffect, useRef, useLayoutEffect} from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from "react-redux";

import {setCanvasHeight, setCanvasWidth, setLengthEntryNames} from '../states/amidaSize/actions'
import {getAmidaSizeNumberOfTree, getAmidaSizeIntervalHeight, getAmidaSizeIntervalWidth, getAmidaSizeCanvasHeight, getAmidaSizeCanvasWidth, getAmidaSizeLengthEntryNames} from '../states/amidaSize/selectors'

const Canvas = styled.canvas`

`

type Props = {
    entryNames: String[],
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
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const intervalWidth = getAmidaSizeIntervalWidth(selector);
    const intervalHeight = getAmidaSizeIntervalHeight(selector);
    const numberOfTree = getAmidaSizeNumberOfTree(selector);
    const lengthEntryNames = props.entryNames.length;

    // MEMO: 値の更新がうまくいっていない
    // useLayoutEffect(() => {
    //     dispatch(setLengthEntryNames(props.entryNames.length));
    // }, []);

    useEffect(() => {
        
        const ctx: CanvasRenderingContext2D | null = getCanvasContext();
        if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        ctx.clearRect(0, 0, getAmidaSizeCanvasWidth(selector), getAmidaSizeCanvasHeight(selector));
        ctx.strokeStyle = '#261103';

        let branchingPoint: number = 0;

        for (let y: number = 0; y < numberOfTree; y++) {
            branchingPoint = 0;
            props.amidaPath[y] = new Array(branchingPoint);
            for (let x: number = 0; x < lengthEntryNames; x++){
                const isLastCol = x === lengthEntryNames - 1;
                const isLastRow = y === numberOfTree - 1;
                const isNotBranching = getRandomNumberForBranching() === 0;
                if (isLastCol || isLastRow || isNotBranching){
                    // 枝分かれ
                    props.amidaPath[y][branchingPoint] = [0, 0];
                    branchingPoint++;

                    ctx.beginPath();
                    // 座標を取得
                    ctx.moveTo(intervalWidth * getThisPoint(x), intervalHeight * getThisPoint(y));
                    // 縦線を引く
                    ctx.lineTo(intervalWidth * getThisPoint(x), intervalHeight * getNextPoint(y));
                    ctx.stroke();
                } else {
                    //隣の座標の分もセット
                    for (let t: number = 0; t < 2; t++) {
                        props.amidaPath[y][branchingPoint] = [getThisPoint(x), getNextPoint(x)];
                        branchingPoint++;
                    }
                    ctx.beginPath();
                    // 座標を取得
                    ctx.moveTo(intervalWidth * getThisPoint(x), intervalHeight * getThisPoint(y));
                    // 縦線を引く
                    ctx.lineTo(intervalWidth * getThisPoint(x), intervalHeight * getNextPoint(y));
                    // 横線を引く
                    ctx.lineTo(intervalWidth * getNextPoint(x), intervalHeight * getNextPoint(y));
                    // 隣のx座標を取得
                    ctx.moveTo(intervalWidth * getNextPoint(x), intervalHeight * getThisPoint(y));
                    // 隣のx縦線を引く
                    ctx.lineTo(intervalWidth * getNextPoint(x), intervalHeight * getNextPoint(y));
                    ctx.stroke();
                    // 隣のx座標の縦線は書いたのでスキップ
                    x++;
                }
            }
        }
        props.setCanvasContext(ctx);
        props.setAmidaPath(props.amidaPath);
    }, [selector]);

    return (
        <Canvas ref={props.canvasRef} width={getAmidaSizeCanvasWidth(selector)} height={getAmidaSizeCanvasHeight(selector)}>
            canvas not supported...
        </Canvas>
    )
}
export default AmidaBaseComponent