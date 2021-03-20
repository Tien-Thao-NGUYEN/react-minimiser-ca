import React, { useState } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap'

import LocalTransition from './LocalTransition';

import { defaultCellSize, zoomStep } from './renderHelper';


export default function GeneratedRule(props) {
	const [scale, setScale] = useState(1);  

	const handleZoomInClick = () => setScale(scale + zoomStep);
	const handleZoomOutClick = () => setScale(scale - zoomStep);

  const emptyFunction = () => {};

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
  				<svg width={500} height={props.genRule.size * cellSize * 3} xmlns="http://www.w3.org/2000/svg">
  					{ 
              props.genRule.getTable().map((lm, ilm) => 
  						  {
                  return <LocalTransition
                    key = {ilm}
                    x = {0}
                    y = {(ilm * 3) * cellSize}
                    cellSize = {cellSize}
                    localConfig = {lm[0]}
                    result = {lm[1]}
                    resultLineIndex = {1}
                    resultColumnIndex = {1}
                    handleCellClick = {emptyFunction}
                  />
                }
  				    )
            }
  				</svg>
  			</Row>
  		</Container>
	 );
}