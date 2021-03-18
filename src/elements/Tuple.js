//Cette composant va remplacer LConfig et GConfig en fonction de nombre de cellules passé en props.
import React from 'react';

import { renderCell } from './renderHelper'

const Tuple = React.memo(function Tuple(props) {
 
  const handleCellClick = (indexColumn) => {
    props.handleCellClick(props.indexLine, indexColumn)
  }

	return (
		<g transform={"translate(0," + (props.indexLine * props.cellSize) + ")"}>
			{
        props.tuple.map((valColumn, indexColumn) => 
          renderCell(valColumn, 0, indexColumn, props.cellSize, handleCellClick)
        )
      }
		</g>
	);
});

export default Tuple;