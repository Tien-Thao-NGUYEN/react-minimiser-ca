import Cell from './Cell'
import Tuple from './Tuple'
import LocalTransition from './LocalTransition'


const defaultCellSize = 10;
const zoomStep = 0.1;

const renderCell = (valColumn, indexLine, indexColumn, cellSize, handleCellClick) => {
	return <Cell
		    		key={ indexColumn }
		    		indexLine={ indexLine }
		    		indexColumn={ indexColumn }
		    		cellState={ valColumn }
		    		cellSize={ cellSize }
		    		handleCellClick={ handleCellClick }
          />
};

//ajouter indexColumn pour deplacer en axe X
const renderTuple = (valTuple, x, indexTuple, cellSize, handleCellClick) => {
	return <Tuple
			     	key = { indexTuple }
            x = { x }
			     	indexLine = { indexTuple }
			     	tuple = { valTuple }
			     	cellSize = { cellSize }
			     	handleCellClick = { handleCellClick }
          />
};

//them render LocalTransition vao day vi no dung o nhieu noi
/*const renderLocalTransition = () => {
  return <LocalTransition
            key = {ilm}
            x = {0}
            y = {(ilm * 3) * cellSize}
            cellSize = {cellSize}
            localConfig = {lm[0]}
            result = {lm[1]}
            resultLineIndex = {1}
            resultColumnIndex = {1}
            handleCellClick = {emptyFunction}
          />
}*/

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

export { defaultCellSize, zoomStep, renderCell, renderTuple, getColor, emptyFunction };