import React from 'react';

import Cell from './Cell';

const Tuple = React.memo(
  function Tuple(props) {
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
              handleCellClick={ props.handleCellClick }
              stateColor = { props.stateColor }
            />
          )
        }
      </g>
    );
  }
);

export default Tuple;