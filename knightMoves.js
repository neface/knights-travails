const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];

export function knightMoves(start, end) {
  const boardSize = 8;

  if (start[0] < 0 || start[0] >= boardSize || start[1] < 0 || start[1] >= boardSize ||
      end[0] < 0 || end[0] >= boardSize || end[1] < 0 || end[1] >= boardSize) {
    throw new Error("Start or end position is out of bounds.");
  }
  
  let queue = [[start]];
  let visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    let path = queue.shift();
    let current = path[path.length - 1];

    if (current[0] === end[0] && current[1] === end[1]) {
        printPath(path);
        return path;
    }

    getValidMoves(current, boardSize).forEach((nextPosition) => {
      if (!visited.has(nextPosition.toString())) {
        visited.add(nextPosition.toString());
        queue.push([...path, nextPosition]);
      }
    });
  }

}

function getValidMoves(position, boardSize = 8) {
  const [x, y] = position;
  
  const allMoves = moves.map(([dx, dy]) => [x + dx, y + dy]);
  return allMoves.filter(([newX, newY]) => 
    newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize
  );
}

function printPath(path) {
  console.log("You made it in " + (path.length - 1) + " moves! Here's your path:");
  path.forEach((position) => {
    console.log(position);
  });
}
