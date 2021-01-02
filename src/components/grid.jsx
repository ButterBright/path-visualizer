import { useState } from "react"
import styled, { css } from "styled-components"
import { dijkstra } from "../dijkstra"

function Grid() {
    const [grid, setGrid] = useState(createGrid())
    const [mouseDown, setMouseDown] = useState(false)
    const [flag, setFlag] = useState(1) // 1: start 2:wall 3:end
    const [start, changeStart] = useState(null)
    const [end, changeEnd] = useState(null)

    function animateDijkstra(grid, start, end) {
        const visitedNode = dijkstra(grid, start, end)
        let path = []
        let cur = visitedNode[visitedNode.length - 1]
        if (cur.row == end.row && cur.col == end.col) {
            path.push(cur.prevNode)
            cur = cur.prevNode
            while (
                (cur && cur.row != start.row) ||
                (cur && cur.col != start.col)
            ) {
                path.push(cur.prevNode)
                cur = cur.prevNode
            }
        }
        for (let i = 0; i <= visitedNode.length; i++) {
            if (i == visitedNode.length) {
                for (let j = 0; j < path.length; j++) {
                    setTimeout(() => {
                        const node = path[j]
                        const { row, col } = node
                        node.isTraversed = true
                        const newGrid = grid.slice()
                        newGrid[row][col] = node
                        // grid[row][col] = {
                        //     ...grid[row][col],
                        //     isTraversed: true,
                        // }
                        setGrid(newGrid)
                    }, 5 * j)
                }
                return
            }
            setTimeout(() => {
                const node = visitedNode[i]
                const { row, col } = node
                node.isPassed = true
                const newGrid = grid.slice()
                newGrid[row][col] = node
                // grid[row][col] = {
                //     ...grid[row][col],
                //     isPassed: true,
                // }
                setGrid(newGrid)
            }, 10 * i)
        }
    }

    function createNode(row, col) {
        const node = {
            row: row,
            col: col,
            isStart: false,
            isEnd: false,
            isWall: false,
            distance: Infinity,
            prevNode: null,
            isVisited: false,
            isPassed: false,
            isTraversed: false,
        }
        return node
    }

    function createGrid() {
        const grid = []
        for (let i = 0; i < 20; i++) {
            const row = []
            for (let j = 0; j < 20; j++) {
                row.push(createNode(i, j))
            }
            grid.push(row)
        }
        return grid
    }

    function handleMouseDown(row, col) {
        setMouseDown(true)
        if (flag == 1) setStart(row, col)
        else if (flag == 2) setWall(row, col)
        else setEnd(row, col)
    }

    function handleMouseEnter(row, col) {
        if (mouseDown && flag == 2) setWall(row, col)
    }

    function handleMouseUp(row, col) {
        setMouseDown(false)
    }

    function setWall(row, col) {
        const node = grid[row][col]
        const newNode = { ...node, isWall: true }
        const newGrid = grid.slice()
        newGrid[row][col] = newNode
        setGrid(newGrid)
    }

    function setStart(row, col) {
        const newGrid = grid.slice()
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                newGrid[i][j] = { ...newGrid[i][j], isStart: false }
            }
        }
        setGrid(newGrid)
        const node = grid[row][col]
        const newNode = { ...node, isStart: true, isEnd: false, distance: 0 }
        newGrid[row][col] = newNode
        setGrid(newGrid)
        changeStart(newNode)
        console.log(row, col)
    }

    function setEnd(row, col) {
        const newGrid = grid.slice()
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                newGrid[i][j] = { ...newGrid[i][j], isEnd: false }
            }
        }
        setGrid(newGrid)
        const node = grid[row][col]
        const newNode = { ...node, isEnd: true, isStart: false }
        newGrid[row][col] = newNode
        setGrid(newGrid)
        changeEnd(newNode)
        console.log(row, col)
    }

    function handleStart() {
        setFlag(1)
    }

    function handleWall() {
        setFlag(2)
    }

    function handleEnd() {
        setFlag(3)
    }

    function handleClear() {
        const newGrid = grid.slice()
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                newGrid[i][j] = {
                    ...newGrid[i][j],
                    isStart: false,
                    isEnd: false,
                    isWall: false,
                }
            }
        }
        setGrid(newGrid)
    }

    return (
        <div>
            {grid.map((row, rowIdx) => {
                return (
                    <Row>
                        {row.map((node, nodeIdx) => {
                            const {
                                row,
                                col,
                                isWall,
                                isStart,
                                isEnd,
                                isPassed,
                                isTraversed,
                            } = node
                            return (
                                <Node
                                    isWall={isWall}
                                    isEnd={isEnd}
                                    isStart={isStart}
                                    isPassed={isPassed}
                                    isTraversed={isTraversed}
                                    onMouseDown={() =>
                                        handleMouseDown(row, col)
                                    }
                                    onMouseEnter={() =>
                                        handleMouseEnter(row, col)
                                    }
                                    onMouseUp={() => handleMouseUp(row, col)}
                                ></Node>
                            )
                        })}
                    </Row>
                )
            })}
            <Button>
                <button onClick={handleClear}>clear</button>
                <button onClick={handleStart}>start</button>
                <button onClick={handleEnd}>end</button>
                <button onClick={handleWall}>wall</button>
            </Button>
            <Button>
                <button onClick={() => animateDijkstra(grid, start, end)}>
                    visualize the path
                </button>
            </Button>
        </div>
    )
}

const Node = styled.div`
    height: 20px;
    width: 20px;
    border: 0.5px solid;
    ${({ isWall }) =>
        isWall === true &&
        css`
            background: black;
        `}
    ${({ isStart }) =>
        isStart === true &&
        css`
            background: blue;
        `}
    ${({ isEnd }) =>
        isEnd === true &&
        css`
            background: yellow;
        `}
    ${({ isPassed }) =>
        isPassed === true &&
        css`
            @keyframes visitedAnimation {
                0% {
                    transform: scale(0.3);
                    background-color: rgba(0, 0, 66, 0.75);
                    border-radius: 100%;
                }

                50% {
                    background-color: rgba(17, 104, 217, 0.75);
                }

                75% {
                    transform: scale(1.2);
                    background-color: rgba(0, 217, 159, 0.75);
                }

                100% {
                    transform: scale(1);
                    background-color: rgba(0, 190, 218, 0.75);
                }
            }
            animation-name: visitedAnimation;
            animation-duration: 1.5s;
            animation-timing-function: ease-out;
            animation-delay: 0;
            animation-direction: alternate;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-play-state: running;
        `}
    ${({ isTraversed }) =>
        isTraversed === true &&
        css`
            animation-name: shortestPath;
            animation-duration: 1.5s;
            animation-timing-function: ease-out;
            animation-delay: 0;
            animation-direction: alternate;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-play-state: running;

            @keyframes shortestPath {
                0% {
                    transform: scale(0.6);
                    background-color: rgb(255, 254, 106);
                }

                50% {
                    transform: scale(1.2);
                    background-color: rgb(255, 254, 106);
                }

                100% {
                    transform: scale(1);
                    background-color: rgb(255, 254, 106);
                }
            }
        `}
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2em;
`

const Row = styled.div`
    display: flex;
    justify-content: center;
`

export default Grid
