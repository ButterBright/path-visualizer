import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {

} from "@fortawesome/free-solid-svg-icons"

function Legend() {
    return (
        <Container>
            <Container2><Start></Start>start node</Container2>
            <Container2><End></End>end node</Container2>
            <Container2><Wall></Wall>wall</Container2>
            <Container2><Unvisited></Unvisited>unvisited node</Container2>
            <Container2><Visited></Visited>visited node</Container2>
            <Container2><Path></Path>path node</Container2>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    font-size: larger;
    padding-bottom: 1rem;
`

const Container2 = styled.div`
    display: flex;
    padding: 1rem 1rem;
`

const Start = styled.div`
    border: 0.5px solid rgb(172, 225, 238);
    background-color: blue;
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
`

const End = styled.div`
    border: 0.5px solid rgb(172, 225, 238);
    background-color: yellow;
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
`

const Wall = styled.div`
    border: 0.5px solid rgb(172, 225, 238);
    background-color: black;
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
`

const Visited = styled.div`
    border: 0.5px solid rgb(172, 225, 238);
    background-color:  rgba(0, 190, 218, 0.75);
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
`

const Unvisited = styled.div`
    border: 0.5px solid rgb(172, 225, 238);
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
`

const Path = styled.div`
    border: 0.5px solid rgb(172, 225, 238);
    background-color: yellow;
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
`
export default Legend
