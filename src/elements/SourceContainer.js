import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'

import SuperRule from "./SuperRule"
import LocalMapping from "./LocalMapping" 
import TransitionTable from './simulator/TransitionTable'

import { initialSuperRule, initialLocalMapping } from '../data'


export default function SourceContainer(props) {
  const [superRule, setSuperRule] = useState(initialSuperRule);
  const [localMapping, setLocalMapping] = useState(initialLocalMapping);
  const [indexLMArray, setIndexLMArray] = useState(0);
  const [currentSRIndex, setCurrentSRIndex] = useState(0);

  
  //lam moi thu o day
  const handleOneStepClick = () => {
    if (currentSRIndex < superRule.length - 1) {
      console.log(currentSRIndex);
      setCurrentSRIndex(currentSRIndex + 1);
    }
    else {
      console.log("Fin de superRule");
      setCurrentSRIndex(0);
    }
  };

  const handleCellClick = () => {
    console.log("changer la valeur de cette cellule dans superRule et localMapping");
  }

  /*const getGeneratedRule = () => {
    var superRuleSlice = superRule.slice(0, currentIndex + 1);
    var generatedRule = new TransitionTable();
    superRuleSlice.forEach(obj => {
      var lc = obj.key.map((pointer, indexPointer) => localMapping[pointer][1]);
      var r = localMapping[obj.val][1];
      generatedRule.set(lc, r);
    });

    return generatedRule;
  }*/

  const updateGeneratedRuleAndDiagram = () => {
    /*var newGeneratedRule = getGeneratedRule(superRule, currentIndex, localMapping);*/
    const currentLC = superRule[currentSRIndex].key.map((pointer, indexPointer) => localMapping[pointer][1]);
    const currentRes = localMapping[superRule[currentSRIndex].val][1];
    props.addInRule(currentLC, currentRes);
    props.setConfigurationSize(superRule[currentSRIndex].size);
    props.setCurrentTime(superRule[currentSRIndex].time);
    props.setCurrentPosition(superRule[currentSRIndex].position);
  }

  const getSuperRuleConvert = superRule.map((obj, indexObj) => {
    var lok = obj.key.map((c, ic) => localMapping[c]);
    lok.push(localMapping[obj.val]);
    return lok;
  });

  return (
      <Container>
        <Row>
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick={handleOneStepClick}>one step</Button>
              <Button onClick={updateGeneratedRuleAndDiagram}>update</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        <Row>
          <Col xl={8} style={{backgroundColor: 'lightgray'}}>
            <SuperRule
              superRule = {getSuperRuleConvert}
              handleCellClick = {handleCellClick}
            />
          </Col>
          <Col xl={4} style={{backgroundColor: 'pink'}}>
            <LocalMapping
              localMapping = {localMapping}
            />
          </Col>
        </Row>
      </Container>
    );
}