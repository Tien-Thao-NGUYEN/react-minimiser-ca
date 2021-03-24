import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import LocalTransition from './LocalTransition';

import { defaultCellSize, zoomStep, emptyFunction, styleContainer } from './renderHelper';


const LocalMapping = React.memo(
  function LocalMapping(props) {
    const [scale, setScale] = useState(1);

    const handleZoomInClick = () => setScale(scale + zoomStep);
    const handleZoomOutClick = () => setScale(scale - zoomStep);

    var cellSize = defaultCellSize * scale;
    
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
                height = { props.localMapping.length * cellSize * 2 } 
                xmlns="http://www.w3.org/2000/svg"
              >
                { 
                  props.localMapping.map( (elem, indElem) => {
                    if (!elem[2]) {
                      var stroke = 'blue';
                      var strokeWidth = cellSize / 4;
                      var handleCellClick = () => props.handleChangeableCellClick(indElem);
                    }
                    else {
                      stroke = 'black';
                      strokeWidth = 1;
                      handleCellClick = emptyFunction;
                    }

                    return <LocalTransition
                              key = { indElem }
                              x = { 0 }
                              y = { indElem * 2 * cellSize }
                              localConfig = { elem[0] }
                              result = { elem[1] }
                              resultLineIndex = { 0 }
                              resultColumnIndex = { elem[0].length + 0.5 }
                              cellSize = { cellSize }
                              fillOpacity = { 1 }
                              stroke = { stroke } 
                              strokeWidth={ strokeWidth }
                              handleCellClick = { handleCellClick }
                            />
                    
                    
                  })
                }
              </svg>
            </Col>
          </Row>
        </Container>
     );
  }
);

export default LocalMapping;