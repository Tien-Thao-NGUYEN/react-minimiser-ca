import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import Tuple from './Tuple';

import { defaultCellSize, zoomStep, styleContainer } from './renderHelper';
import { getDiagram } from '../simulator/simulator';
import { getInitialGConfig, outSpaceState } from '../data/dataHelper';

function removeInDiagram(diagram, newTime, newPosition) {
  var newDiagramRef = diagram.slice(0, newTime);
  var newGConfigRef = diagram[newTime].slice(0, newPosition + 1);
  newDiagramRef.push(newGConfigRef);
  return newDiagramRef;
}


const Diagram = React.memo(
  function Diagram(props) {
  	const [scale, setScale] = useState(1);
  	const [diagram, setDiagram] = useState([getInitialGConfig(props.currentSize)]);

    /*console.log(props.currentSize, diagram[0].length);
    console.log(props.currentTime, diagram.length - 1);
    console.log(props.currentPosition, diagram[diagram.length - 1].length - 1);
    console.log(diagram);*/

    if (props.currentSize === diagram[0].length) { //same size
      var currentTimeDiagram = diagram.length - 1;
      if (props.currentTime === currentTimeDiagram) { //same time
        if (props.currentPosition > diagram[currentTimeDiagram].length - 1) { //add cell
          //call simulator
          var newDiagram = getDiagram(props.transitionTable, getInitialGConfig(props.currentSize), 
                                        outSpaceState, 1, 1, props.currentTime, props.currentPosition);
          setDiagram(newDiagram);
        }
        else if (props.currentPosition < diagram[currentTimeDiagram].length - 1) { //remove cell
          setDiagram(removeInDiagram(diagram, props.currentTime, props.currentPosition));
        } 
      }
      else { //diff time
        if (props.currentTime > currentTimeDiagram) { //add cell
          //call simulator 
          newDiagram = getDiagram(props.transitionTable, getInitialGConfig(props.currentSize), 
                                        outSpaceState, 1, 1, props.currentTime, props.currentPosition);
          setDiagram(newDiagram);
        }
        else { //remove cell
          setDiagram(removeInDiagram(diagram, props.currentTime, props.currentPosition));
        }
      }
    }
    else { //new diagram
      newDiagram = getDiagram(props.transitionTable, getInitialGConfig(props.currentSize), 
                                    outSpaceState, 1, 1, props.currentTime, props.currentPosition);
      setDiagram(newDiagram);
    }

  	const handleZoomInClick = () => setScale(scale + zoomStep);
  	const handleZoomOutClick = () => setScale(scale - zoomStep);
    const handleCellClick = (indexLine, indexColumn) => {console.log("click on ", indexLine, " ", indexColumn)};

    var cellSize = defaultCellSize * scale;

  	return (
  		<Container>
        <Row>
          <ButtonGroup size="sm">
            <Button onClick={handleZoomInClick}>z+</Button>
            <Button onClick={handleZoomOutClick}>z-</Button>
          </ButtonGroup>
        </Row>
  			<Row>
          <Col style={ styleContainer } >
    				<svg 
              width = { props.currentSize * cellSize } 
              height= { (props.currentTime + 1) * cellSize } 
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
                    strokeWidth={ 3 }
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