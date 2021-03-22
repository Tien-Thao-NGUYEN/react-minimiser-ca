import Cell from './Cell'
import Tuple from './Tuple'
import LocalTransition from './LocalTransition'


const defaultCellSize = 10;
const zoomStep = 0.1;

const renderCell = (key, valColumn, indexLine, indexColumn, cellSize, handleCellClick) => {
	return <Cell
		    		key={ key }
		    		indexLine={ indexLine }
		    		indexColumn={ indexColumn }
		    		cellState={ valColumn }
		    		cellSize={ cellSize }
		    		handleCellClick={ handleCellClick }
          />
};

const renderTuple = (key, valTuple, x, indexTuple, cellSize, handleCellClick) => {
	return <Tuple
			     	key = { key }
            x = { x }
			     	indexLine = { indexTuple }
			     	tuple = { valTuple }
			     	cellSize = { cellSize }
			     	handleCellClick = { handleCellClick }
          />
};

const renderLocalTransition = (key, indexLocalTransition, localConfig, 
    result, resultLineIndex, resultColumnIndex, lineStep, cellSize, handleCellClick) => {
  return <LocalTransition
            key = { key }
            x = {0}
            y = {(indexLocalTransition * lineStep) * cellSize}
            cellSize = { cellSize }
            localConfig = { localConfig }
            result = { result }
            resultLineIndex = { resultLineIndex }
            resultColumnIndex = { resultColumnIndex }
            handleCellClick = { handleCellClick }
          />
}

const styleContainer = {
                        'height': "85vh",
                        'overflowX': "auto",
                        'overflowY': "auto"
                      };

const emptyFunction = () => {};

const getColor = (state) => {
	switch(state) {
		case '0': return 'white';
		case '1': return 'blue';
		case '2': return 'orange';
		case '3': return 'cyan';
		case '4': return 'magenta';
		case '5': return 'red';
		case '6': return 'gray';
		default : return 'black';
	}	
}

export { defaultCellSize, zoomStep, renderCell, renderTuple, getColor, 
          emptyFunction, renderLocalTransition, styleContainer };