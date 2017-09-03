/**
* See also original blog post
* http://www.briangrinstead.com/blog/astar-search-algorithm-in-javascript
**/


// This array-of-arrays holds internal metadata
// for each cell in the grid. Unlike the rest of the
// game, it's X-first instead of Y-first. I may change
// this later. Or I may not.
var grid;


function astarCreateGrid(width, height)
{
    grid = new Array(width);
    for (var x = 0; x < width; ++x) {
        grid[x] = new Array(height);
        for (var y = 0; y < height; ++y) {
            grid[x][y] = { x: x, y: y };
        }
    }
}


function astarIsWall(node)
{
    return (getTile(node.x, node.y) != 0);
}


function astarSearch(start, end)
{
    start = grid[start.x][start.y];
    end = grid[end.x][end.y];

    // Reset the grid
    for(var x = 0; x < grid.length; x++) {
        for(var y = 0; y < grid[x].length; y++) {
            grid[x][y].f = 0;
            grid[x][y].g = 0;
            grid[x][y].h = 0;
            grid[x][y].visited = false;
            grid[x][y].closed = false;
            grid[x][y].parent = null;
        }
    }

    var openList = [];
    openList.push(start);

    while(openList.length > 0) {
        // Grab the lowest f(x) to process next
        var lowInd = 0;
        for (i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[lowInd].f) {
                lowInd = i;
            }
        }
        var currentNode = openList[lowInd];

        // End case -- result has been found, return the traced path
        if (currentNode == end) {
            var curr = currentNode;
            var ret = [];
            while (curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            return ret.reverse();
        }

        // Normal case -- move currentNode from open to closed, process each of its neighbors
        openList.splice(lowInd, 1);
        currentNode.closed = true;

        var neighbors = astarNeighbors(grid, currentNode);
        for (i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (neighbor.closed || astarIsWall(neighbor)) {
                // not a valid node to process, skip to next neighbor
                continue;
            }

            // g score is the shortest distance from start to current node, we need to check if
            //   the path we have arrived at this neighbor is the shortest one we have seen yet
            var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
            var gScoreIsBest = false;

            if (!neighbor.visited) {
                // This the the first time we have arrived at this node, it must be the best
                // Also, we need to take the h (heuristic) score since we haven't done so yet
                gScoreIsBest = true;
                neighbor.h = astarHeuristic(neighbor, end);
                neighbor.visited = true;
                openList.push(neighbor);

            } else if (gScore < neighbor.g) {
                // We have already seen the node, but last time it had a worse g (distance from start)
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                // Found an optimal (so far) path to this node.  Store info on how we got here and
                //  just how good it really is...
                neighbor.parent = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    // No result was found -- empty array signifies failure to find path
    return [];
}


function astarHeuristic(node0, node1) {
    var d1 = Math_abs(node1.x - node0.x);
    var d2 = Math_abs(node1.y - node0.y);
    return d1 + d2;
}


function astarNeighbors(grid, node) {
    var ret = [];
    var x = node.x;
    var y = node.y;

    if(grid[x-1] && grid[x-1][y]) {
        ret.push(grid[x-1][y]);
    }
    if(grid[x+1] && grid[x+1][y]) {
        ret.push(grid[x+1][y]);
    }
    if(grid[x][y-1] && grid[x][y-1]) {
        ret.push(grid[x][y-1]);
    }
    if(grid[x][y+1] && grid[x][y+1]) {
        ret.push(grid[x][y+1]);
    }

    return ret;
}
