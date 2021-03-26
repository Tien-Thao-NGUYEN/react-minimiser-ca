import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import LocalMapping from './components/LocalMapping';
import ToolBar from './components/ToolBar';

import { initialRule, initialLocalMapping, getNextState, getInitialGConfig, 
  outSpaceState, nCellLeft, nCellRight, initialSuperRule } from './data/dataHelper';
import { buildTargetDiagramFromLocalMapping, simulate } from './simulator/simulator';


//NOTE: 

//Cho superRule vao trong 1 variable trong App trong viec check localMapping khi targetDgm det nhung ko biet targetRule co det ko.

//Luu state actuel cua app vao file.

//Lam chon file JSON va code lai generate file JSON: xac dinh ro la can nhung cai j trong file.

//scroll toi element trong local mapping khi dua chuot vao o danh dau trong dgmSrc

//xem co the su dung dc ban phim cung luc voi chuot ko de co nhieu cach the hien outil.
//  vi du giu shift va chon cells canh nhau lien tiep trong dgmSrc de scroll den element trong lm.



const localMapping = initialLocalMapping;
const superRule = initialSuperRule;
var actionList = [];
var indActionList = -1;

function App (props) {
  const [sourceDiagram, setSourceDiagram] = useState([]);
  const [localMappingList, setLocalMappingList] = useState(initialLocalMapping.getTable());
  const [targetDiagram, setTargetDiagram] = useState([]);
  const [locationOnMouseEnter, setLocationOnMouseEnter] = useState( { time : -1, position : -1 } );
  
  const handleTargetErrorCellClick = (time, position) => {
    setLocationOnMouseEnter( { time : time, position : position } );
  }
  
  const handleLocalMappingCellClick = (indexLine) => {
    const lmElement = localMappingList[indexLine];
    const nextState = getNextState(lmElement[1].state);
    
    if (indActionList < actionList.length - 1)
      actionList = actionList.slice(0, indActionList + 1);

    actionList.push( { lConfig : lmElement[0], 
                     oldState : localMapping.get(lmElement[0]).state,
                     newState : nextState } );
    indActionList = actionList.length - 1;

    localMapping.get(lmElement[0]).state = nextState;
    setLocalMappingList(localMapping.getTable());

    const newTargetDiagrame = buildTargetDiagramFromLocalMapping(localMapping, sourceDiagram,
      outSpaceState, nCellRight, nCellRight);
    setTargetDiagram(newTargetDiagrame);
  }

  const handleChangeSize = (newSize) => {
    const newSourceDiagram = simulate(initialRule, getInitialGConfig(newSize), 
                                      outSpaceState, nCellLeft, nCellRight);
    const newTargetDiagram = buildTargetDiagramFromLocalMapping(localMapping, 
                                      newSourceDiagram, outSpaceState, nCellLeft, nCellRight);
    setSourceDiagram(newSourceDiagram);
    setTargetDiagram(newTargetDiagram);
    setLocationOnMouseEnter( { time : -1, position : -1 } );

/*console.log(newSourceDiagram[1][0]);
console.log(newTargetDiagram);*/
  }

  const inUndoRedoAction = (lConfig, state) => {
    localMapping.get(lConfig).state = state;
      setLocalMappingList(localMapping.getTable());
      const newTargetDiagram = buildTargetDiagramFromLocalMapping(localMapping, 
                                      sourceDiagram, outSpaceState, nCellLeft, nCellRight);
      setTargetDiagram(newTargetDiagram);
  }

  const handleUndoClick = () => {
    if (indActionList >= 0) {
      console.log(actionList);
      console.log(indActionList);
      const action = actionList[indActionList];
      inUndoRedoAction(action.lConfig, action.oldState);
      setLocationOnMouseEnter( { time : -1, position : -1 } );
    }

    if (indActionList > 0) {
      indActionList--;
    }
  }

  const handleRedoClick = () => {
    if (indActionList < actionList.length) {
      console.log(actionList);
      console.log(indActionList);
      const action = actionList[indActionList];
      inUndoRedoAction(action.lConfig, action.newState);
      setLocationOnMouseEnter( { time : -1, position : -1 } );
    }

    if (indActionList < actionList.length - 1)
      indActionList++;
  }


  return (
    <Container fluid style={ {'height': "100vh", backgroundColor:"green"} }>
      <Row>
        <ToolBar
          handleChangeSize = { handleChangeSize }
          handleUndoClick = { handleUndoClick }
          handleRedoClick = { handleRedoClick }
        />
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
