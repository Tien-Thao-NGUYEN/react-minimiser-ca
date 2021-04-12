import React from 'react';

import { fillColor } from '../data/parseData'

//jouter text pour afficher état
const Cell = React.memo((props) => {
  const handleClick = () => props.handleCellClick(props.indexLine, props.indexColumn);
	return (
    <g 
      transform = { "translate(" + (props.indexColumn * props.cellSize) 
                    + "," + (props.indexLine * props.cellSize) + ")" }
      onClick = { handleClick }
      //onMouseEnter = { () => console.log("mouse enter ", props.indexLine, " ", props.indexColumn) }
      //onMouseOver = { () => console.log("mouse over ", props.indexLine, " ", props.indexColumn) }
    >
			<rect 
				x = { 0 } 
				y = { 0 }
				width = { props.cellSize }
				height = { props.cellSize }
        fill = { fillColor(props.cellState) } 
				fillOpacity = { props.fillOpacity }
				stroke = { props.stroke } 
				strokeWidth = { props.strokeWidth }
			/>

      <text 
        x = { props.cellSize / 5 } 
        y = { props.cellSize - (props.cellSize / 5)}
        fontFamily = { "Verdana" }
        fontWeight = { "bolder" }
        fontSize = { props.cellSize * 0.8}
        fill = { props.stateColor }
      >
          {props.cellState}
      </text>
    </g>
	);
});

export default Cell;