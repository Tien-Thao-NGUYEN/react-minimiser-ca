import React from 'react';

import { getColor } from './renderHelper'

//jouter text pour afficher état
const Cell = React.memo(function Cell(props) {
	return (
			<rect 
				x = {props.indexColumn * props.cellSize} 
				y = {props.indexLine * props.cellSize}
				width = {props.cellSize} 
				height={props.cellSize}
				fill = {getColor(props.cellState)} 
				fillOpacity = {1}
				stroke = {'black'} 
				strokeWidth={1}
				onClick = {() => props.handleCellClick(props.indexColumn)}
			/>
	);
});

export default Cell;