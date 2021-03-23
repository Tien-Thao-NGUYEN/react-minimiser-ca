import React from 'react';

import Cell from './Cell';

const Tuple = React.memo(function Tuple(props) {
 
  const handleCellClick = (indexColumn) => {
    props.handleCellClick(props.indexLine, indexColumn)
  }

	return (
		<g 
      transform = { "translate(" + (props.x * props.cellSize) + "," + (props.indexLine * props.cellSize) + ")" }
    >
			{
        props.tuple.map( (valColumn, indexColumn) => 
          <Cell
            key={ indexColumn }
            indexLine={ 0 }
            indexColumn={ indexColumn }
            cellState={ valColumn }
            cellSize={ props.cellSize }
            fillOpacity = { props.fillOpacity }
            stroke = { props.stroke } 
            strokeWidth={ props.strokeWidth }
            handleCellClick={ handleCellClick }
          />
        )
      }
		</g>
	);
});

export default Tuple;