//Cette composant va remplacer LConfig et GConfig en fonction de nombre de cellules passé en props.
import React from 'react';

import { renderCell } from './renderHelper'

export default function Tuple(props) {

	return (
		<g transform={"translate(0," + (props.indexLine * props.cellSize) + ")"}>
			{props.tuple.map((column, indexColumn) => renderCell(0, indexColumn, column, props.cellSize, (indexColumn) => props.handleCellClick(props.indexLine, indexColumn)))}
		</g>
	);
}