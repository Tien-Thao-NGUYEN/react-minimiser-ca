const getNextGConfig = (transitionTable, old_gc, outSpaceState, 
                          numberCellLeft, numberCellRight, beginPosition, endPosition) => {
  var old_gc_shallow = [...Array(numberCellLeft).fill(outSpaceState), 
                        ...old_gc,
                        ...Array(numberCellRight).fill(outSpaceState)];
  var new_gc = [];
  var sizeLConfig = numberCellLeft + 1 + numberCellRight;
  for (var position = beginPosition; position <= endPosition; position++)
  new_gc.push(transitionTable.get(old_gc_shallow.slice(position, position + sizeLConfig)));

  return new_gc;
}

const getDiagram = (transitionTable, initialGConfig, outSpaceState, 
                      numberCellLeft, numberCellRight, currentTime, currentPosition) => {
  var diagram = [initialGConfig];
  for (var time = 1; time < currentTime; time++)
    diagram.push(getNextGConfig(transitionTable, diagram[time - 1], outSpaceState, 
                    numberCellLeft, numberCellRight, 0, initialGConfig.length - 1));

  diagram.push(getNextGConfig(transitionTable, diagram[currentTime - 1], outSpaceState, 
                  numberCellLeft, numberCellRight, 0, currentPosition));

  return diagram;
}

export { getDiagram };