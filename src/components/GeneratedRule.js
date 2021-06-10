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
    const targetRelationListLength = Object.keys(props.targetRelationList).map( key => 
                                props.targetRelationList[key].length).reduce((a, b) => a + b, 0);

     function removeDuplicated(targetArray){
      let sortedArray= []
      for(let i=0; i<targetArray.length-1; i++){
        if(targetArray[i].join() !== targetArray[i+1].join()){
          sortedArray.push(targetArray[i])
          if(i+1===targetArray.length-1){
            sortedArray.push(targetArray[i+1])
          }
        }
      }
     return sortedArray;
    }

    function renderLocalTransition() {
      const sortedTargetRelationList = removeDuplicated(props.targetRelationList.flat().sort())  
        const localTransArray = sortedTargetRelationList.map( ([localConfig, result], indexed) =>
          <LocalTransition
            key = { indexed * 3 }
            x = { 0 }
            y = { indexed  * 3 * cellSize }
            localConfig = { localConfig }
            result = { result }
            resultLineIndex = { 1 }
            resultColumnIndex = { 1 }
            cellSize = { cellSize }
            fillOpacity = { 1 }
            stroke = { 'black' } 
            strokeWidth={ 1 }
            handleCellClick = { emptyFunction }
          />
        );
     return localTransArray;
    }
  	

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
                height={ targetRelationListLength * cellSize * 3 } 
                xmlns = "http://www.w3.org/2000/svg"
              >
      					{ 
                  renderLocalTransition()
                }
      				</svg>
            </Col>
    			</Row>
    		</Container>
  	 );
  }
);

export default GeneratedRule;