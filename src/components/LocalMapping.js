import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import { defaultCellSize, zoomStep, emptyFunction, renderLocalTransition, styleContainer } from './renderHelper';


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
              <svg width={ 50 } height={ props.localMapping.length * cellSize * 2 } 
                      xmlns="http://www.w3.org/2000/svg">
                { 
                  props.localMapping.map((elem, indElem) => 
                    renderLocalTransition(indElem, indElem, elem[0], elem[1], 0, elem[0].length + 0.5, 2, cellSize,
                      elem[2] ? ( () => props.handleChangeableCellClick(indElem) ) : ( emptyFunction ))
                  )
                }
              </svg>
            </Col>
          </Row>
        </Container>
     );
  }
);

export default LocalMapping;