import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import LocalMapping from './components/LocalMapping';
import TransitionTable from './simulator/TransitionTable';
import Diagram from './components/Diagram';

import { initialRule, initialLocalMapping, getNextState, getInitialGConfig, outSpaceState, nCellLeft, nCellRight } from './data/dataHelper';
import { nextGConfig, simulate } from './simulator/simulator';

//initialLocalMapping est stocker dans un transition table
//lc -> [res, multable] or lc -> [res, undifined]
const getTargetDiagram = (sourceDiagram, newLocalMapping) => {
    //localMappingMap peut stocker dans une variable.
    //quand il y a des changement dans localMapping, set entry et c'est bon.
    const localMappingMap = new TransitionTable();
    newLocalMapping.forEach( (elem, indElem) => {
      localMappingMap.set(elem[0], elem[1]);
    } );

    const newTargetDiagrame = [[...sourceDiagram[0]]];
    for (var time = 0; time <= sourceDiagram.length - 2; time++) {
      const newTargetGConfig = nextGConfig(localMappingMap, sourceDiagram[time], outSpaceState, nCellLeft, nCellRight);
      newTargetDiagrame.push(newTargetGConfig);
    }

    return newTargetDiagrame;
  }


//co van de la khi sua o day dgm ko render lai
const sizeInit = 30;//max size = 48

//undo/redo: luu lai thay doi trong LM vao 1 cai list là ok
function App (props) {
  const [size, setSize] = useState(sizeInit);
  const [localMapping, setLocalMapping] = useState(initialLocalMapping);
  const [sourceDiagram, setSourceDiagram] = useState(simulate(initialRule, getInitialGConfig(size), outSpaceState, nCellLeft, nCellRight));
  const [targetDiagram, setTargetDiagram] = useState(getTargetDiagram(sourceDiagram, localMapping));

  

  const handleLocalMappingCellClick = (indexLine) => {
    var newLocalMapping = [...localMapping];
    var element = newLocalMapping[indexLine];
    element[1] = getNextState(element[1]);
    newLocalMapping[indexLine] = element;
    setLocalMapping(newLocalMapping);

    const newTargetDiagrame = getTargetDiagram(sourceDiagram, newLocalMapping);
    setTargetDiagram(newTargetDiagrame);
    /*console.log(newTargetDiagrame);*/
  }

  return (
    <Container fluid style={ {'height': "100vh", backgroundColor:"green"} }>
      <Row>
        <Button size="sm"> show local mapping </Button>
      </Row>
      <Row>
        <Col 
          xl={5} 
          style={ {backgroundColor: 'lightgray'} }
        >
          <Diagram
            sourceDiagram = { sourceDiagram }
            targetDiagram = { sourceDiagram }
            fillOpacitySame = { 1 }
            fillOpacityDiff = { 1 }
          />
        </Col>
        <Col 
          sm={2} lg={2} xl={2} 
          style={ {backgroundColor: 'lightblue'} } 
        >
          <LocalMapping
            localMapping = { localMapping }
            handleLocalMappingCellClick = { handleLocalMappingCellClick }
          />
        </Col>
        <Col 
          xl={5} 
          style={ {backgroundColor: 'lightgray'} }
        >
          <Diagram
            sourceDiagram = { sourceDiagram }
            targetDiagram = { targetDiagram }
            fillOpacitySame = { 0.1 }
            fillOpacityDiff = { 1 }
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
