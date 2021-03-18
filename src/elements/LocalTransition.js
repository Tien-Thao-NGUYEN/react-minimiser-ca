import React from 'react';


import { renderCell, renderTuple } from './renderHelper'


export default function LocalTransition(props) {

	return (
		<g transform={"translate(" + props.x + "," + props.y + ")"}>
			{renderTuple(props.localConfig, 0, props.cellSize, () => {})}
			{renderCell(props.result, props.resultLineIndex, props.resultColumnIndex, props.cellSize, props.handleCellClick)}
		</g>
	);
}