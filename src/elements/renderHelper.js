import Cell from './Cell'
import Tuple from './Tuple'


const defaultCellSize = 10;
const zoomStep = 0.1;

const renderCell = (valColumn, indexLine, indexColumn, cellSize, handleCellClick) => {
	return <Cell
				key={indexColumn}
				indexLine={indexLine}
				indexColumn={indexColumn}
				cellState={valColumn}
				cellSize={cellSize}
				handleCellClick={handleCellClick}
			/>
};

const renderTuple = (valTuple, indexTuple, cellSize, handleCellClick) => {
	return <Tuple
				key = {indexTuple}
				indexLine = {indexTuple}
				tuple = {valTuple}
				cellSize = {cellSize}
				handleCellClick = {handleCellClick}
			/>
};

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

export { defaultCellSize, zoomStep, renderCell, renderTuple, getColor };