import React from 'react';

import { getColor } from './renderHelper'

//jouter text pour afficher état
const Cell = React.memo((props) => {
	return (
    <g 
      transform = { "translate(" + (props.indexColumn * props.cellSize) 
                    + "," + (props.indexLine * props.cellSize) + ")" }
      onClick = { () => props.handleCellClick(props.indexColumn) }
    >
			<rect 
				x = { 0 } 
				y = { 0 }
				width = { props.cellSize }
				height={ props.cellSize }
        fill = { getColor(props.cellState) } 
				fillOpacity = { props.fillOpacity }
				stroke = { props.stroke } 
				strokeWidth={ props.strokeWidth }
			/>

      <text 
        x = { props.cellSize / 5 } 
        y = { props.cellSize - (props.cellSize / 6)}
        fontFamily = { "Verdana" }
        fontSize = { props.cellSize * 0.9}
      >
          {props.cellState}
      </text>
    </g>
	);
});

export default Cell;