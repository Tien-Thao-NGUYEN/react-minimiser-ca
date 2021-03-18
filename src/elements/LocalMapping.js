import React, { useState } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap'

import LocalTransition from './LocalTransition';
import { defaultCellSize, zoomStep } from './renderHelper';


export default function LocalMapping(props) {
  const [scale, setScale] = useState(1);

  const handleZoomInClick = () => setScale(scale + zoomStep);
  const handleZoomOutClick = () => setScale(scale - zoomStep);

  var cellSize = defaultCellSize * scale;

  /*console.log(Array.from(props.localMapping).map((lm, ilm) => lm));*/
  
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
              props.localMapping.map((lm, ilm) => 
                {
                  return <LocalTransition
                    key = {ilm}
                    x = {0}
                    y = {(ilm * 2) * cellSize}
                    cellSize = {cellSize}
                    localConfig = {lm[0]}
                    result = {lm[1]}
                    resultLineIndex = {0}
                    resultColumnIndex = {lm[0].length + 0.5}
                    handleCellClick = {() => {}}
                  />
                }
              )
            }
          </svg>
        </Row>
      </Container>
   );
}