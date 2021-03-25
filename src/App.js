import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import LocalMapping from './components/LocalMapping';
import TransitionTable from './simulator/TransitionTable';
import Diagram from './components/Diagram';

import { initialRule, initialLocalMapping, getNextState, getInitialGConfig, outSpaceState, nCellLeft, nCellRight } from './data/dataHelper';
import { nextGConfig, simulate } from './simulator/simulator';


//NOTE: 

//Tao ra 2 fct cho viec mouseEnter va mouseOver trong App de lien lac voi 2 container.

//Dung superRuleIndex de su dung cho viec check localMapping khi targetDgm det nhung ko biet targetRule co det ko.

//lam list undo/redo  //undo/redo: luu lai thay doi trong LM vao 1 cai list là ok

//sua loi chinh size ma DGM ko render lai (co the khi size la 1 state thi se ok => lam input text)
// lam cai menu gon gang

//Luu state actuel cua app vao file.

//Lam chon file JSON va code lai generate file JSON: xac dinh ro la can nhung cai j trong file.

//scroll toi element trong local mapping khi dua chuot vao o danh dau trong dgmSrc

//xem co the su dung dc ban phim cung luc voi chuot ko de co nhieu cach the hien outil.
//  vi du giu shift va chon cells canh nhau lien tiep trong dgmSrc de scroll den element trong lm.



const localMapping = initialLocalMapping;

const buildTargetDiagram = (sourceDiagram) => {
  const targetDiagrame = [[...sourceDiagram[0]]];
  for (var time = 0; time <= sourceDiagram.length - 2; time++) {
    const targetGConfig = nextGConfig(localMapping, sourceDiagram[time], outSpaceState, nCellLeft, nCellRight);
    targetDiagrame.push(targetGConfig);
  }

  return targetDiagrame;
}


//co van de la khi sua o day dgm ko render lai
const sizeInit = 25;//max size = 48

function App (props) {
  const [size, setSize] = useState(sizeInit);
  const [localMappingList, setLocalMappingList] = useState(initialLocalMapping.getTable());
  const [sourceDiagram, setSourceDiagram] = useState(simulate(initialRule, getInitialGConfig(size), outSpaceState, nCellLeft, nCellRight));
  const [targetDiagram, setTargetDiagram] = useState(buildTargetDiagram(sourceDiagram));

  

  const handleLocalMappingCellClick = (indexLine) => {
    const lmElement = localMappingList[indexLine];
    const nextState = getNextState(lmElement[1].state);
    localMapping.get(lmElement[0]).state = nextState;
    setLocalMappingList(localMapping.getTable());

    const newTargetDiagrame = buildTargetDiagram(sourceDiagram);
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
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
