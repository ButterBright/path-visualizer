export function dijkstra(grid, start, end) {
    let visitedNode = []
    let unvistedNode = getNodes(grid)
    while (unvistedNode.length) {
        unvistedNode.sort((a, b) => a.distance - b.distance)
        const node = unvistedNode[0]
        console.log(node.distance)
        if (node.distance == Infinity) return visitedNode
        unvistedNode.shift()
        node.isVisited = true
        visitedNode.push(node)
        if (node.row == end.row && node.col == end.col) return visitedNode
        updateDistance(node, grid)
    }
}


function updateDistance(node, grid) {
    const { row, col } = node
    if (
        row >= 1 &&
        !grid[row - 1][col].isWall &&
        !grid[row - 1][col].isVisited
    ) {
        grid[row - 1][col].prevNode = node
        grid[row - 1][col].distance = node.distance + 1
    }
    if (
        row <= grid.length - 2 &&
        !grid[row + 1][col].isWall &&
        !grid[row + 1][col].isVisited
    ) {
        grid[row + 1][col].prevNode = node
        grid[row + 1][col].distance = node.distance + 1
    }
    if (
        col >= 1 &&
        !grid[row][col - 1].isWall &&
        !grid[row][col - 1].isVisited
    ) {
        grid[row][col - 1].prevNode = node
        grid[row][col - 1].distance = node.distance + 1
    }
    if (
        col <= grid.length - 2 &&
        !grid[row][col + 1].isWall &&
        !grid[row][col + 1].isVisited
    ) {
        grid[row][col + 1].prevNode = node
        grid[row][col + 1].distance = node.distance + 1
    }
}

function getNodes(grid) {
    const nodes = []
    for (const row of grid) for (const node of row) nodes.push(node)
    return nodes
}
