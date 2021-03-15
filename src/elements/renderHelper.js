import Cell from './Cell'
import Tuple from './Tuple'


const defaultCellSize = 10;
const zoomStep = 0.1;

const renderCell = (indexLine, indexColumn, column, cellSize, handleCellClick) => {
	return <Cell
				key={indexColumn}
				indexLine={indexLine}
				indexColumn={indexColumn}
				cellState={column}
				cellSize={cellSize}
				handleCellClick={handleCellClick}
			/>
};

const renderTuple = (tuple, indexTuple, cellSize, handleCellClick) => {
	return <Tuple
				key = {indexTuple}
				indexLine = {indexTuple}
				tuple = {tuple}
				cellSize = {cellSize}
				handleCellClick = {handleCellClick}
			/>
};

const getColor = (state) => {
	switch(state) {
		case '0': return 'white';
		case '1': return 'rgb(50, 159, 255)';
		case '2': return 'rgb(252, 175, 62)';
		case '3': return 'rgb(50, 255, 50)';
		case '4': return 'rgb(150, 29, 205)';
		case '5': return 'red';
		case '6': return 'yellow';
		case '7': return 'gray';
		case '8': return 'black';
		default : return 'lightgray';
	}	
}

export { defaultCellSize, zoomStep, renderCell, renderTuple, getColor };