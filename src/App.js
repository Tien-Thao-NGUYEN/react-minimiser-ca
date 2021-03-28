import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import LocalMapping from './components/LocalMapping';
import ToolBar from './components/ToolBar';

import { buildTargetDiagramFromLocalMapping, simulate } from './simulator/simulator';
import TransitionTable from './simulator/TransitionTable';
import { initRule, initSuperRule, initLocalMapping, getNextState, outSpaceState, dt, nCellLeft, nCellRight, getInitGConfig } from './data/parseData';


//NOTE: 

//scroll toi element trong local mapping khi dua chuot vao o danh dau trong dgmSrc

//xem co the su dung dc ban phim cung luc voi chuot ko de co nhieu cach the hien outil.
//  vi du giu shift va chon cells canh nhau lien tiep trong dgmSrc de scroll den element trong lm.

//doc virtuel react de render diagram.
//doc router react de lay dc nhieu app.

//Lam chon file JSON.
//parse fichier json de lay ra nhung object dans su dung.
//Luu state actuel cua app vao file: (code generate file JSON) luu tat ca giong voi file exemple_data.json

//van co van de o undo/redo

const localMapping = initLocalMapping;
const superRule = initSuperRule;

var actionList = [];
var indActionList = -1;

function App (props) {
  const [sourceDiagram, setSourceDiagram] = useState([]);
  const [localMappingList, setLocalMappingList] = useState(initLocalMapping.getTable());
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
    indActionList = actionList.length;

    localMapping.get(lmElement[0]).state = nextState;
    setLocalMappingList(localMapping.getTable());

    const newTargetDiagrame = buildTargetDiagramFromLocalMapping(localMapping, sourceDiagram,
      outSpaceState, nCellRight, nCellRight);
    setTargetDiagram(newTargetDiagrame);
  }

  const handleChangeSize = (newSize) => {
    const newSourceDiagram = simulate(initRule, getInitGConfig(newSize), 
                                      outSpaceState, nCellLeft, nCellRight);
    const newTargetDiagram = buildTargetDiagramFromLocalMapping(localMapping, 
                                      newSourceDiagram, outSpaceState, nCellLeft, nCellRight);
    setSourceDiagram(newSourceDiagram);
    setTargetDiagram(newTargetDiagram);
    setLocationOnMouseEnter( { time : -1, position : -1 } );//TODO

/*console.log(newSourceDiagram[1][0]);
console.log(newTargetDiagram);*/
  }

  //inNavigate
  function inUndoRedoAction(lConfig, state) {
    localMapping.get(lConfig).state = state;
      setLocalMappingList(localMapping.getTable());
      const newTargetDiagram = buildTargetDiagramFromLocalMapping(localMapping, 
                                      sourceDiagram, outSpaceState, nCellLeft, nCellRight);
      setTargetDiagram(newTargetDiagram);
  }

  //retard quand click ici quand changer dans lm
  const handleUndoClick = () => {
    if (indActionList > -1) {
      indActionList--;
      if (indActionList !== -1) {
        const action = actionList[indActionList];
        inUndoRedoAction(action.lConfig, action.oldState);
        setLocationOnMouseEnter( { time : -1, position : -1 } );
      }
    }

    /*if (indActionList >= 0) {
      //console.log(actionList);
      //console.log(indActionList);
      const action = actionList[indActionList];
      inUndoRedoAction(action.lConfig, action.oldState);
      setLocationOnMouseEnter( { time : -1, position : -1 } );
    }

    if (indActionList > 0) {
      indActionList--;
    }*/
  }

  //retard quand click ici quand changer dans lm
  const handleRedoClick = () => {
    if (indActionList < actionList.length) {
      indActionList++;
      if (indActionList !== actionList.length) {
        const action = actionList[indActionList];
        inUndoRedoAction(action.lConfig, action.newState);
        setLocationOnMouseEnter( { time : -1, position : -1 } );
      }
    }
    /*if (actionList.length > 0) {
      if (indActionList < actionList.length) {
        //console.log(actionList);
        //console.log(indActionList);
        const action = actionList[indActionList];
        inUndoRedoAction(action.lConfig, action.newState);
        setLocationOnMouseEnter( { time : -1, position : -1 } );
      }

      if (indActionList < actionList.length - 1)
        indActionList++;
    }*/
  }

  function buildTargetRelationLevelHelper(superLConfig, superResult, levelLocalMapping, cutSizeLevel, cutNumber) {
    const targetLConfig = [];
    for (var i = 0; i < cutNumber; i++) {
      const motif = superLConfig.slice(i, i + cutSizeLevel);
      const motifResult = localMapping.get(motif);

      if (motifResult === undefined) {
        console.log("level lm: ", levelLocalMapping, ", cut size: ", cutSizeLevel, ", slc: ", superLConfig , ", motif: ",  motif);
      }

      const state = motifResult.state;
      targetLConfig.push(state);
    }
    
    const targetResult = localMapping.get(superResult).state;
    return [targetLConfig, targetResult];
  }

  function buildTargetRelationList() {
    const targetRelation = [];
    const cutNumber = nCellLeft + 1 + nCellRight; 
    for (var levelSuperRule = 1; levelSuperRule <= dt; levelSuperRule++) {
      const levelLocalMapping = levelSuperRule - 1;
      const cutSizeLevel = levelLocalMapping * (nCellLeft + nCellRight) + 1;
      const targetRelationLevel = superRule[levelSuperRule].map( superLConfig => 
        buildTargetRelationLevelHelper(superLConfig, superLConfig, levelLocalMapping, cutSizeLevel, cutNumber)
      );

      targetRelation.push(targetRelationLevel);
    }

    const cutSizeLevelMax = dt * (nCellLeft + nCellRight) + 1;
    const targetRelationLevelMax = superRule[dt + 1].map( ([superLConfig, superResult]) => 
      buildTargetRelationLevelHelper(superLConfig, superResult, dt, cutSizeLevelMax, cutNumber)
    );

    targetRelation.push(targetRelationLevelMax);

    return targetRelation;
  }

//TODO chuyen xuong TargetContainer de afficher rule
  const handleCheckLocalMapping = () => {
    const targetRule = new TransitionTable();
    const targetRelationList = buildTargetRelationList();
    targetRelationList.forEach( level => {
      level.forEach( ([lConfig, result]) => {
        var oldResult = targetRule.get(lConfig);
        if (oldResult === undefined)
          targetRule.set(lConfig, { state:result, mutable:false });
        else if (oldResult.state !== result)
          console.log("Error: ", lConfig, " has ", oldResult.state, " and ", result);
      } );
    } );

    console.log("okkk");
  }

  return (
    <Container fluid style={ {'height': "100vh", backgroundColor:"green"} }>
      <Row>
        <ToolBar
          handleChangeSize = { handleChangeSize }
          handleUndoClick = { handleUndoClick }
          handleRedoClick = { handleRedoClick }
          handleCheckLocalMapping = { handleCheckLocalMapping }
        />
      </Row>
      <Row>
        <Col 
          xl = { 5 } 
          style = { {backgroundColor: 'lightgray'} }
        >
          <SourceContainer
            sourceDiagram = { sourceDiagram }
            superRule = { superRule }
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
