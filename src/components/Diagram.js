import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import Cell from './Cell';

import { defaultCellSize, zoomStep, styleContainer } from './renderHelper';


const Diagram = React.memo(
  function Diagram( { infoDiagram } ) {
  	const [scale, setScale] = useState(1);

  	const handleZoomInClick = () => setScale(scale + zoomStep);
  	const handleZoomOutClick = () => setScale(scale - zoomStep);
    const handleCellClick = (indexLine, indexColumn) => {console.log("click on ", indexLine, " ", indexColumn)};

    var cellSize = defaultCellSize * scale;

    const cellCollection = () => {
      const cellCollection = [];
      for (var time = 0; time < infoDiagram.length; time++) {
        const infoGConfig = infoDiagram[time];
        for (var position = 0; position < infoGConfig.length; position++) {
          const infoCell = infoGConfig[position];
          const cell =  <Cell
                          key = { time * infoGConfig.length + position }
                          indexLine = { time }
                          indexColumn = { position }
                          cellState = { infoCell.state }
                          cellSize = { cellSize }
                          fillOpacity = { infoCell.fillOpacity }
                          stroke = { infoCell.stroke } 
                          strokeWidth = { infoCell.strokeWidth }
                          stateColor = { infoCell.stateColor }
                          handleCellClick = { handleCellClick }
                        />

          if (infoCell.strokeWidth === 3)
            cellCollection.push(cell);
          else
            cellCollection.unshift(cell);
        }
      }

      return cellCollection;
    }
                

  	return (
  		<Container>
        <Row>
          <ButtonGroup 
            size = "sm"
          >
            <Button onClick = { handleZoomInClick }> z+ </Button>
            <Button onClick = { handleZoomOutClick }> z- </Button>
          </ButtonGroup>
        </Row>
  			<Row>
          <Col 
            style={ styleContainer } 
          >
    				<svg 
              width = { infoDiagram[0].length * cellSize } 
              height= { infoDiagram.length * cellSize } 
              xmlns="http://www.w3.org/2000/svg"
            >
    					{
                cellCollection()
              }
    				</svg>
          </Col>
  			</Row>
  		</Container>
  	);
  }
);

export default Diagram;