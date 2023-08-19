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
    entryNames: Array<String>,
    lengthEntryNames: number,
    canvasContext: any,
    setCanvasContext: Function,
}

function EntryNamesComponent(props: Props){

    const goToResult = (index: number) => {
        console.log(props.canvasContext);
        console.log(index);
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