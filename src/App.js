import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import LocalMapping from './components/LocalMapping';
import TransitionTable from './simulator/TransitionTable';

import { initialLocalMapping, initialSuperRuleIndex, getNextState } from './data/dataHelper';

//chuyen genRule xuong generatedRule hay targetContainer nhung ko biet lam cach nao de update
//tam thoi giu genRule o day
var superRuleIndex = initialSuperRuleIndex;

function App (props) {
  const [localMapping, setLocalMapping] = useState(initialLocalMapping);
  const [currentSRIndex, setCurrentSRIndex] = useState(0);

  const handleNotDet = (info) => { console.log("add item at index ", info.currentSRIndex, " not det!!!") };
  const [infoUpdateRule, setInfoUpdateRule] = useState({  flag:false, 
                                                          transition:null , 
                                                          currentSRIndex:0, 
                                                          handleNotDet:handleNotDet 
                                                        });

  const handleOneStepClick = () => {
    var currentObj = superRuleIndex[currentSRIndex];
    var lc = currentObj.key.map( indexLM => localMapping[indexLM][1] );
    var res = localMapping[currentObj.val][1];

    var info = {};
    info.flag = true;
    info.transition = [lc, res];
    info.currentSRIndex = currentSRIndex;
    info.handleNotDet = handleNotDet;
    info.currentSize = currentObj.size;
    info.currentTime = currentObj.time;
    info.currentPosition = currentObj.position;
    setInfoUpdateRule(info);
    setCurrentSRIndex(currentSRIndex + 1);
  }

  const handleChangeableCellClick = (indexLine) => {
    var newLocalMapping = [...localMapping];
    var element = newLocalMapping[indexLine];
    element[1] = getNextState(element[1]);
    newLocalMapping[indexLine] = element;
    setLocalMapping(newLocalMapping);
  }

  const handleRunClick = () => {
    console.log("Build la table de relations ...");
    var targetRelation = superRuleIndex.map( (sri, indSri) => 
      [sri.key.map( ilm => localMapping[ilm][1] ), localMapping[sri.val][1]] );
    console.log("Vérifier si la table de relations est un fonction ...");
    const lConfigErrorList = [];
    const targetRule = new TransitionTable();
    targetRelation.forEach( (rel, indRel) => {
      if (!targetRule.has(rel[0]))
        targetRule.set(rel[0], rel[1]);
      else if (!targetRule.isDeterminismIfSet(rel[0], rel[1]))
        lConfigErrorList.push({lc:rel[0]});
    } );

    if (lConfigErrorList.length > 0) {
      console.log("La vérification trouve ", lConfigErrorList.length, 
        " configurations locales erreurs. Voici la lists : ", lConfigErrorList);
    }
    else {
      console.log("Félicitation! Vous avez trouvé une solution!");
    }
  }


  return (
    <Container fluid style={ {'height': "100%", backgroundColor:"green"} }>
      <Row>
        <ButtonGroup size="sm">
          <Button onClick={ handleRunClick } > run </Button>
          <Button onClick={ handleOneStepClick } > one step </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <Col sm={5} lg={5} xl={5} >
          <SourceContainer
            currentSRIndex = { currentSRIndex }
            currentSize = { 2 }
            currentTime = { 2 }
            currentPosition = { 1 } 
          />
        </Col>
        <Col sm={2} lg={2} xl={2} >
          <Container>
            <Row>
              <Button size="sm"> show local mapping </Button>
            </Row>
            <Row>
              <Col style={ {backgroundColor: 'pink'} } >
                <LocalMapping
                  localMapping = { localMapping }
                  handleChangeableCellClick = { handleChangeableCellClick }
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col sm={5} lg={5} xl={5} >
          <Col>
            <TargetContainer
              infoUpdateRule = { infoUpdateRule }
            />
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
