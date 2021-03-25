import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import LocalMapping from './components/LocalMapping';

import { initialRule, initialLocalMapping, getNextState, getInitialGConfig, 
  outSpaceState, nCellLeft, nCellRight, initialSuperRule } from './data/dataHelper';
import { buildTargetDiagramFromLocalMapping, simulate } from './simulator/simulator';


//NOTE: 

//Cho superRule vao trong 1 variable trong App trong viec check localMapping khi targetDgm det nhung ko biet targetRule co det ko.

//lam list undo/redo  //undo/redo: luu lai thay doi trong LM vao 1 cai list là ok

//sua loi chinh size ma DGM ko render lai (co the khi size la 1 state thi se ok => lam input text)
// lam cai menu gon gang

//Luu state actuel cua app vao file.

//Lam chon file JSON va code lai generate file JSON: xac dinh ro la can nhung cai j trong file.

//scroll toi element trong local mapping khi dua chuot vao o danh dau trong dgmSrc

//xem co the su dung dc ban phim cung luc voi chuot ko de co nhieu cach the hien outil.
//  vi du giu shift va chon cells canh nhau lien tiep trong dgmSrc de scroll den element trong lm.



const localMapping = initialLocalMapping;
const superRule = initialSuperRule;
const sizeInit = 25;//max size = 48

function App (props) {
  const [size, setSize] = useState(sizeInit);
  const [sourceDiagram, setSourceDiagram] = useState(
          simulate(initialRule, getInitialGConfig(size), outSpaceState, nCellLeft, nCellRight));
  const [localMappingList, setLocalMappingList] = useState(initialLocalMapping.getTable());
  const [targetDiagram, setTargetDiagram] = useState(
          buildTargetDiagramFromLocalMapping(initialLocalMapping, sourceDiagram, outSpaceState, 
                                                                          nCellLeft, nCellRight));
  const [locationOnMouseEnter, setLocationOnMouseEnter] = useState( { time : -1, position : -1 } );
  
  const handleTargetErrorCellClick = (time, position) => {
    setLocationOnMouseEnter( { time : time, position : position } );
  }
  
  const handleLocalMappingCellClick = (indexLine) => {
    const lmElement = localMappingList[indexLine];
    const nextState = getNextState(lmElement[1].state);
    localMapping.get(lmElement[0]).state = nextState;
    setLocalMappingList(localMapping.getTable());

    const newTargetDiagrame = buildTargetDiagramFromLocalMapping(localMapping, sourceDiagram,
      outSpaceState, nCellRight, nCellRight);
    setTargetDiagram(newTargetDiagrame);
  }


  return (
    <Container fluid style={ {'height': "100vh", backgroundColor:"green"} }>
      <Row>
        <Button size="sm"> show local mapping </Button>
      </Row>
      <Row>
        <Col 
          xl = { 5 } 
          style = { {backgroundColor: 'lightgray'} }
        >
          <SourceContainer
            sourceDiagram = { sourceDiagram }
            locationOnMouseEnter = { locationOnMouseEnter }
          />
        </Col>
        <Col 
          xl = { 2 } 
          style = { {backgroundColor: 'lightblue'} } 
        >
          <LocalMapping
            localMapping = { localMappingList }
            handleLocalMappingCellClick = { handleLocalMappingCellClick }
          />
        </Col>
        <Col
          xl = { 5 } 
          style = { {backgroundColor: 'lightgray'} }
        >
          <TargetContainer
            sourceDiagram = { sourceDiagram }
            targetDiagram = { targetDiagram }
            handleTargetErrorCellClick = { handleTargetErrorCellClick }
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
