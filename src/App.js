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

//scroll à l'élement et le mettre en gras dans local mapping 
//  quand utilisateur choisi une configuration locale dans dgmSrc
//  (il faut utiliser les touches).

//utiliser react-virtuel pour render diagram.
//react_router pour récupérer les composants(peut être utiliser pour ouvrir les différence page).

//Coder lire input file JSON et parse un fichier JSON.

//Sauvegarder l'état actuel d'application.

//show targetRule quand déterministe.

const localMapping = initLocalMapping;
const superRule = initSuperRule;

let actionList = [];
let indActionList = -1;

function App (props) {
  const [sourceDiagram, setSourceDiagram] = useState([]);
  const [localMappingList, setLocalMappingList] = useState(initLocalMapping.getTable());
  const [indexChangeLocalMapping, setIndexChangeLocalMapping] = useState(-1); 
  const [targetDiagram, setTargetDiagram] = useState([]);
  const [targetRelationList, setTargetRealationList] = useState([]);
  const [locationOnMouseEnter, setLocationOnMouseEnter] = useState( { time : -1, position : -1 } );
  
  const handleTargetErrorCellClick = (time, position) => {
    setLocationOnMouseEnter( { time : time, position : position } );
  }
  
  const handleLocalMappingCellClick = (indexLine) => {
    const newReferenceLocalMappingList = [...localMappingList];
    const lmElement = newReferenceLocalMappingList[indexLine];
    const oldState = lmElement[1].state;
    const newState = getNextState(oldState);
    lmElement[1].state = newState;
    setLocalMappingList(newReferenceLocalMappingList);
    setIndexChangeLocalMapping(indexLine);

    const newTargetDiagrame = buildTargetDiagramFromLocalMapping(localMapping, sourceDiagram,
      outSpaceState, nCellRight, nCellRight);
    setTargetDiagram(newTargetDiagrame);

    localMapping.get(lmElement[0]).state = newState;

    actionList = actionList.slice(0, indActionList);
    actionList.push( { indexLine : indexLine, 
                     oldState : oldState,
                     newState : newState } );
    indActionList = actionList.length;

    /*
    console.log(actionList);
    console.log(indActionList);
    */

    
  }

  //inNavigate
  function inUndoRedoAction(indexLine, state) {
    const newReferenceLocalMappingList = [...localMappingList];
    const lmElement = newReferenceLocalMappingList[indexLine];
    lmElement[1].state = state;
    setLocalMappingList(newReferenceLocalMappingList);

    const newTargetDiagram = buildTargetDiagramFromLocalMapping(localMapping, 
                                      sourceDiagram, outSpaceState, nCellLeft, nCellRight);
    setTargetDiagram(newTargetDiagram);

    localMapping.get(lmElement[0]).state = state;
  }

  const handleUndoClick = () => {
    if (indActionList > 0) {
      indActionList--;
      const action = actionList[indActionList];
      inUndoRedoAction(action.indexLine, action.oldState);
      if (indActionList === 0)
        setIndexChangeLocalMapping(-1);
      else
        setIndexChangeLocalMapping(actionList[indActionList - 1].indexLine);

      setLocationOnMouseEnter( { time : -1, position : -1 } );
    }

    /*console.log(actionList);
    console.log(indActionList);*/
  }

  const handleRedoClick = () => {
    if (actionList.length > 0 && indActionList < actionList.length) {
      const action = actionList[indActionList];
      inUndoRedoAction(action.indexLine, action.newState);  
      setIndexChangeLocalMapping(actionList[indActionList].indexLine);
      setLocationOnMouseEnter( { time : -1, position : -1 } );
      
      indActionList++;
    }

    /*console.log(actionList);
    console.log(indActionList);*/
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

  function buildTargetRelationLevelHelper(superLConfig, superResult, levelLocalMapping, cutSizeLevel, cutNumber) {
    const targetLConfig = [];
    for (let i = 0; i < cutNumber; i++) {
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
    for (let levelSuperRule = 1; levelSuperRule <= dt; levelSuperRule++) {
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

//TODO passe cette function à TargetContainer pour afficher rule
  const handleCheckLocalMapping = () => {
    const targetRule = new TransitionTable();
    const newTargetRelationList = buildTargetRelationList();
    setTargetRealationList(newTargetRelationList);
    let isDet = true;
    newTargetRelationList.forEach( level => {
      level.forEach( ([lConfig, result]) => {
        const oldResult = targetRule.get(lConfig);
        if (oldResult === undefined)
          targetRule.set(lConfig, { state:result, mutable:false });
        else if (oldResult.state !== result) {
          console.log("Error: ", lConfig, " has ", oldResult.state, " and ", result);
          isDet = false;
        }
      } );
    } );

    if (isDet)
      console.log("okkkkkkkkk");
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
            indexChangeLocalMapping = { indexChangeLocalMapping }
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
            targetRelationList = { targetRelationList }
            handleTargetErrorCellClick = { handleTargetErrorCellClick }
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
