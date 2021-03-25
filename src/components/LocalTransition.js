import React from 'react';

import Cell from './Cell';
import Tuple from './Tuple';

import { emptyFunction } from './renderHelper';


export default function LocalTransition(props) {

	return (
		<g 
      transform = { "translate(" + props.x + "," + props.y + ")" }
    >
			{ 
        <Tuple
          key = { 0 }
          x = { 0 }
          indexLine = { 0 }
          tuple = { props.localConfig }
          cellSize = { props.cellSize }
          fillOpacity = { props.fillOpacity }
          stroke = { props.stroke } 
          strokeWidth = { props.strokeWidth }
          handleCellClick = { emptyFunction }
          stateColor = { props.stateColor }
        />
      }

			{ 
        <Cell
          key = { props.resultColumnIndex }
          indexLine = { props.resultLineIndex }
          indexColumn = { props.resultColumnIndex }
          cellState = { props.result }
          cellSize = { props.cellSize }
          fillOpacity = { props.fillOpacity }
          stroke = { props.stroke } 
          strokeWidth = { props.strokeWidth }
          handleCellClick = { props.handleCellClick }
          stateColor = { props.stateColor }
        />
      }
		</g>
	);
}