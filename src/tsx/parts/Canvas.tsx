import {useEffect, useRef} from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
    margin: 30px;
`

function CanvasComponent(props) {
    const treeHeight: number = 15;
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
    
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getCanvasContext();
        props.setCanvasContext(ctx);
        ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
        ctx.strokeStyle = '#261103';

        type amidaPathType = [number, any]
        const amidaPath: amidaPathType = [0, []];
        let branchingPoint: number = 0;

        for (let vertical: number = 0; vertical < treeHeight; vertical++) {
            amidaPath[vertical] = [branchingPoint];

            for (let horizontal: number = 0; horizontal < props.lengthEntryNames; horizontal++){
                const isLastCol = horizontal === props.lengthEntryNames - 1;
                const isLastRow = vertical === treeHeight - 1;
                const isNotBranching = getRandomNumberForBranching() === 0;
                if (isLastCol || isNotBranching || isLastRow){
                    amidaPath[vertical][branchingPoint] = [0, 0];
                    branchingPoint++;

                    ctx.beginPath();
                    ctx.moveTo(props.intervalWidth * (horizontal + 1), props.intervalHeight * (vertical + 1));
                    ctx.lineTo(props.intervalWidth * (horizontal + 1), props.intervalHeight * (vertical + 2));
                    ctx.stroke();
                } else {
                    for (let t: number = 0; t < 2; t++) {
                        amidaPath[vertical][branchingPoint] = [horizontal + 1, horizontal + 2];
                        branchingPoint ++;
                    }
                    ctx.beginPath();
                    ctx.moveTo(props.intervalWidth * (horizontal + 1), props.intervalHeight * (vertical + 1));
                    ctx.lineTo(props.intervalWidth * (horizontal + 1), props.intervalHeight * (vertical + 2));
                    ctx.lineTo(props.intervalWidth * (horizontal + 2), props.intervalHeight * (vertical + 2));
                    ctx.moveTo(props.intervalWidth * (horizontal + 2), props.intervalHeight * (vertical + 1));
                    ctx.lineTo(props.intervalWidth * (horizontal + 2), props.intervalHeight * (vertical + 2));
                    ctx.stroke();
                    horizontal++;
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