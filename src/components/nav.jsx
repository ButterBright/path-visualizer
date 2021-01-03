import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHourglassStart,
    faHourglassEnd,
    faBan,
    faLightbulb,
    faEye,
    faBroom,
} from "@fortawesome/free-solid-svg-icons"

function Nav({
    handleStart,
    handleEnd,
    handleWall,
    handleClear,
    animateDijkstra,
}) {
    return (
        <Container>
            <Container2>
                <Title>Path Visualizer</Title>
                <Container3 onClick={handleStart}>
                    <FontAwesomeIcon icon={faHourglassStart} />
                    <Description>setStart</Description>
                </Container3>
                <Container3 onClick={handleEnd}>
                    <FontAwesomeIcon icon={faHourglassEnd} />
                    <Description>setEnd</Description>
                </Container3>
                <Container3 onClick={handleWall}>
                    <FontAwesomeIcon icon={faBan} />
                    <Description>setWall</Description>
                </Container3>
                <Container3>
                    <FontAwesomeIcon icon={faLightbulb} />
                    <Description>algorithm</Description>
                </Container3>
                <Container3 onClick={animateDijkstra}>
                    <FontAwesomeIcon icon={faEye} />
                    <Description>visualize</Description>
                </Container3>
                <Container3 onClick={handleClear}>
                    <FontAwesomeIcon icon={faBroom} />
                    <Description>clear</Description>
                </Container3>
            </Container2>
        </Container>
    )
}

const Container = styled.div`
    background-color: rgba(96, 174, 197, 0.863);
    color: white;
    padding: 1em;
    font-weight: bold;
`

const Container2 = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: space-between;
    max-width: 50%;
`

const Container3 = styled.div`
    display: flex;
`

const Title = styled.div`
    font-size: larger;
`

const Description = styled.div`
    padding-left: 0.5rem;
`

export default Nav
