import React, { useState } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';

import LocalTransition from './LocalTransition';

import { defaultCellSize, zoomStep, emptyFunction } from './renderHelper';
import { initialLocalMapping } from '../data/dataHelper';


export default function LocalMapping(props) {
  const [scale, setScale] = useState(1);
  const [localMapping, setLocalMapping] = useState(initialLocalMapping);

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
          <svg width={500} height={props.localMapping.length * cellSize * 3} xmlns="http://www.w3.org/2000/svg">
            { 
              props.localMapping.map((elem, indElem) => 
                {
                  return <LocalTransition
                    key = {indElem}
                    x = {0}
                    y = {(indElem * 2) * cellSize}
                    cellSize = {cellSize}
                    localConfig = {elem[0]}
                    result = {elem[1]}
                    resultLineIndex = {0}
                    resultColumnIndex = {elem[0].length + 0.5}
                    handleCellClick = {
                      elem[2] ? ( () => props.handleChangeableCellClick(indElem) ) : ( emptyFunction )
                    }
                  />
                }
              )
            }
          </svg>
        </Row>
      </Container>
   );
}