import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'

import { defaultCellSize, zoomStep, emptyFunction, renderLocalTransition, styleContainer } from './renderHelper';

//il faut que App passe une fct pour les erreurs de set dans map
/*const GeneratedRule = React.memo(*/
  function GeneratedRule(props) {
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
      				<svg width={50} height={props.genRule.size * cellSize * 3} xmlns="http://www.w3.org/2000/svg">
      					{ 
                  props.genRule.getTable().map((elem, indElem) => 
                    renderLocalTransition(indElem, indElem, elem[0], elem[1], 1, 1, 3, cellSize, 
                      emptyFunction)
      				    )
                }
      				</svg>
            </Col>
    			</Row>
    		</Container>
  	 );
  }
/*);*/

export default GeneratedRule;