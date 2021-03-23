import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import Tuple from './Tuple';

import { defaultCellSize, zoomStep, styleContainer } from './renderHelper';
import { simulate } from '../simulator/simulator';
import { getInitialGConfig, outSpaceState } from '../data/dataHelper';


const Diagram = React.memo(
  function Diagram(props) {
  	const [scale, setScale] = useState(1);

  	const handleZoomInClick = () => setScale(scale + zoomStep);
  	const handleZoomOutClick = () => setScale(scale - zoomStep);
    const handleCellClick = (indexLine, indexColumn) => {console.log("click on ", indexLine, " ", indexColumn)};

    var cellSize = defaultCellSize * scale;

    const diagram = simulate(props.rule, getInitialGConfig(props.size), outSpaceState, 1, 1);

  	return (
  		<Container>
        <Row>
          <ButtonGroup size="sm">
            <Button onClick = { handleZoomInClick }> z+ </Button>
            <Button onClick = { handleZoomOutClick }> z- </Button>
            <Button> time </Button>
            <Button> cellNumber </Button>
            <Button> size </Button>
          </ButtonGroup>
        </Row>
  			<Row>
          <Col style={ styleContainer } >
    				<svg 
              width = { props.size * cellSize } 
              height= { diagram.length * cellSize } 
              xmlns="http://www.w3.org/2000/svg"
            >
    					{
                diagram.map( (valLine, indexLine) => 
                  <Tuple
                    key = { indexLine }
                    x = { 0 }
                    indexLine = { indexLine }
                    tuple = { valLine }
                    cellSize = { cellSize }
                    fillOpacity = { 1 }
                    stroke = { 'black' } 
                    strokeWidth={ 1 }
                    handleCellClick = { handleCellClick }
                  />
                )
              }
    				</svg>
          </Col>
  			</Row>
  		</Container>
  	);
  }
);

export default Diagram;