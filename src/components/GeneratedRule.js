import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import LocalTransition from './LocalTransition';

import { defaultCellSize, zoomStep, emptyFunction, styleContainer } from './renderHelper';


const GeneratedRule = React.memo(
  function GeneratedRule(props) {
  	const [scale, setScale] = useState(1);

  	const handleZoomInClick = () => setScale(scale + zoomStep);
  	const handleZoomOutClick = () => setScale(scale - zoomStep);

  	const cellSize = defaultCellSize * scale;

  	return (
    		<Container>
          <Row>
            <ButtonGroup>
              <Button size="sm" onClick={handleZoomInClick}>z+</Button>
              <Button size="sm" onClick={handleZoomOutClick}>z-</Button>
            </ButtonGroup>    
          </Row>
    			<Row>
            <Col style={ styleContainer } >
      				<svg 
                width = { 100 } 
                height={ props.targetRule.size * cellSize * 3 } 
                xmlns = "http://www.w3.org/2000/svg"
              >
      					{ 
                  props.targetRule.getTable().map( (elem, indElem) => 
                    <LocalTransition
                      key = { indElem }
                      x = { 0 }
                      y = { indElem * 3 * cellSize }
                      localConfig = { elem[0] }
                      result = { elem[1] }
                      resultLineIndex = { 1 }
                      resultColumnIndex = { 1 }
                      cellSize = { cellSize }
                      fillOpacity = { 1 }
                      stroke = { 'black' } 
                      strokeWidth={ 1 }
                      handleCellClick = { emptyFunction }
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

export default GeneratedRule;