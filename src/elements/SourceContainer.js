import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'

import SuperRule from "./SuperRule"
import GeneratedRule from "./GeneratedRule" 
//  01234567
//661000000066
var localMappingInit = [ 
                        {key:['6','6','1'], val:'6'},//0
                        {key:['6','1','0'], val:'1'},//1
                        {key:['1','0','0'], val:'0'},//2
                        {key:['0','0','0'], val:'0'},//3
                        {key:['0','0','6'], val:'0'},//4
                        {key:['0','6','6'], val:'0'},//5
                        ];

//les éléments de superRule est {key, val, size, time, postion}
var superRuleInit = [
            {key:[0,1,2], val:1, size:8, time:1, position:0},//66100-610
            {key:[1,2,3], val:2, size:8, time:1, position:1},//61000-100
            {key:[2,3,3], val:3, size:8, time:1, position:2},//10000-000
            {key:[3,3,3], val:3, size:8, time:1, position:3},//00000-000
            {key:[3,3,4], val:3, size:8, time:1, position:6},//00006-000
            {key:[3,4,5], val:4, size:8, time:1, position:7},//00066-006
            {key:[3,3,3], val:3, size:8, time:3, position:5},//00000-000
            {key:[3,3,3], val:3, size:8, time:5, position:4},//00000-000
            {key:[3,3,3], val:3, size:8, time:2, position:3},//00000-000
            ];


export default function SourceContainer(props) {
  const [superRule, setSuperRule] = useState(superRuleInit);
  const [localMapping, setLocalMapping] = useState(localMappingInit);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(currentIndex);

  const addSuperRule = () => {
    var shallowSuperRule = [...superRule];
    shallowSuperRule.push({key:[1,1,1], val:1});
    setSuperRule(shallowSuperRule);
  }

  //lam moi thu o day
  const handleOneStepClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleCellClick = () => {
    console.log("changer la valeur de cette cellule dans superRule et localMapping");
  }

  const getGeneratedRule = () => {
    var superRuleSlice = superRule.slice(0, currentIndex + 1);
    return superRuleSlice.map((obj, indexObj) => {
      var lc = obj.key.map((pointer, indexPointer) => localMapping[pointer].val);
      var r = localMapping[obj.val].val;
      return {key:lc, val:r};
    })
  }

  const updateGeneratedRuleAndDiagram = () => {
    var newGeneratedRule = getGeneratedRule(superRule, currentIndex, localMapping);
    props.setGeneratedRule(newGeneratedRule);
    props.setConfigurationSize(superRule[currentIndex].size);
    props.setCurrentTime(superRule[currentIndex].time);
    props.setCurrentPosition(superRule[currentIndex].position);
  }

  var getSuperRuleConvert = superRule.map((obj, indexObj) => {
    var lok = obj.key.map((c, ic) => localMapping[c]);
    lok.push(localMapping[obj.val]);
    return lok;
  });

  return (
      <Container>
        <Row>
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick={handleOneStepClick}>One step</Button>
              <Button onClick={addSuperRule}>add</Button>
              <Button onClick={updateGeneratedRuleAndDiagram}>update</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        <Row>
          <Col xl={8} style={{backgroundColor: 'green'}}>
            <SuperRule
              superRule = {getSuperRuleConvert}
              handleCellClick = {handleCellClick}
            />
          </Col>
          <Col xl={4} style={{backgroundColor: 'red'}}>
            <GeneratedRule
              generatedRule = {localMapping}
            />
          </Col>
        </Row>
      </Container>
    );
}