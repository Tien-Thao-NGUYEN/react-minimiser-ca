const oneStep = (transitionTable, currentGConfig, outSpaceState, nCellLeft, nCellRight) => {
  const currentGConfigShallow = [ ...Array(nCellLeft).fill(outSpaceState), 
                                ...currentGConfig,
                                ...Array(nCellRight).fill(outSpaceState) ];
  
  const lConfigSize = nCellLeft + 1 + nCellRight;
  const nextGConfig = [];
  for (var position = 0; position < currentGConfig.length; position++) {
    const nextState = transitionTable.get(currentGConfigShallow.slice(position, position + lConfigSize));
    if (nextState === undefined)
      return [false, nextGConfig];

    nextGConfig.push(nextState);
  }

  return [true, nextGConfig];
}

const simulate = (transitionTable, initialGConfig, outSpaceState, nCellLeft, nCellRight) => {
  if (initialGConfig.length === 0)
    return [];

  const diagram = [initialGConfig];
  var isContinue = true;
  var currentGConfig = initialGConfig;
  do {
    const [shouldContinue, nextGConfig] = 
            oneStep(transitionTable, currentGConfig, outSpaceState, nCellLeft, nCellRight);
    
    if (nextGConfig.length !== 0)
      diagram.push(nextGConfig);

    currentGConfig = nextGConfig;
    isContinue = shouldContinue;
  } while (isContinue);

  return diagram;
}

//dung trong App de lay targetDiagram
const nextGConfig = (transitionTable, currentGConfig, outSpaceState, nCellLeft, nCellRight) => {
  const currentGConfigShallow = [ ...Array(nCellLeft).fill(outSpaceState), 
                                ...currentGConfig,
                                ...Array(nCellRight).fill(outSpaceState) ];
  
  const lConfigSize = nCellLeft + 1 + nCellRight;
  const nextGConfig = [];
  for (var position = 0; position < currentGConfig.length; position++) {
    const nextState = transitionTable.get(currentGConfigShallow.slice(position, position + lConfigSize));
    nextGConfig.push(nextState);
  }

  return nextGConfig;
}

export { nextGConfig, simulate };