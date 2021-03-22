import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import GeneratedRule from './GeneratedRule';
import Diagram from './Diagram';
import TransitionTable from '../simulator/TransitionTable';


function handlerAddInRule(rule, infoUpdate, setGenRuleFct) {
  const lc = infoUpdate.transition[0];
  const res = infoUpdate.transition[1];
  if (!rule.has(lc)) {
    rule.set(lc, res);
    setGenRuleFct(rule);
  }
   else {
    if (!rule.isDeterminismIfSet(lc, res)) {
      infoUpdate.handleNotDet(infoUpdate);
    }
  }     
}


const TargetContainer = React.memo(
  function TargetContainer(props) {
    const [showDiagrame, setShowDiagram] = useState(true);
    const [showGenRule, setShowGenRule] = useState(true);
    
    const [genRule, setGenRule] = useState(() => new TransitionTable()); //useReducer

    const [currentSize, setCurrentSize] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(-1);

    /*console.log("rules ", props.infoUpdateRule.rules);*/

    if (props.infoUpdateRule.transition !== null) {
      var newRuleRef = genRule;
      if (props.infoUpdateRule.flag === true) {
        const lc = props.infoUpdateRule.transition[0];
        const res = props.infoUpdateRule.transition[1];
        if (!newRuleRef.has(lc)) {
          newRuleRef.set(lc, res);
          setGenRule(newRuleRef);
          setCurrentSize(props.infoUpdateRule.currentSize);
          setCurrentTime(props.infoUpdateRule.currentTime);
          setCurrentPosition(props.infoUpdateRule.currentPosition);
        }
        else {
          if (newRuleRef.isDeterminismIfSet(lc, res)) {
            if (currentSize !== props.infoUpdateRule.currentSize
                || currentTime !== props.infoUpdateRule.currentTime
                || currentPosition !== props.infoUpdateRule.currentPosition) {
              setCurrentSize(props.infoUpdateRule.currentSize);
              setCurrentTime(props.infoUpdateRule.currentTime);
              setCurrentPosition(props.infoUpdateRule.currentPosition);
            }
          }
          else {
            props.infoUpdateRule.handleNotDet(props.infoUpdateRule);
          }
        }          
      }
      else {//cho nay phai remove 1 list lc
        newRuleRef.remove(props.infoUpdateRule.transition[0]);
        setGenRule(newRuleRef);
        if (currentSize !== props.infoUpdateRule.currentSize
            || currentTime !== props.infoUpdateRule.currentTime
            || currentPosition !== props.infoUpdateRule.currentPosition) {//pas sure
          setCurrentSize(props.infoUpdateRule.currentSize);
          setCurrentTime(props.infoUpdateRule.currentTime);
          setCurrentPosition(props.infoUpdateRule.currentPosition);
        }
      }
    }

    const handlerShowGenRule = () => {var show = !showGenRule; setShowGenRule(show)};
    const handlerShowDiagram = () => {var show = !showDiagrame; setShowDiagram(show)}; 

    return (
      <Container>
        <Row>
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick={ handlerShowGenRule }> show gen rule </Button>
              <Button onClick={ handlerShowDiagram }> show diagram </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        <Row>
          {
            showGenRule ?
              <Col xl={4} style={ {backgroundColor: 'yellow'} }>
                <GeneratedRule
                  genRule = { genRule }
                />
              </Col> :
              <Col></Col>
          }
          {
            showDiagrame ?
              <Col xl={8} style={ {backgroundColor: 'lightgray'} }>
                 <Diagram
                    transitionTable = { genRule }
                    currentSize = { currentSize }
                    currentTime = { currentTime }
                    currentPosition = { currentPosition }
                  />
              </Col> : 
              <Col></Col>
          }
        </Row>
      </Container>
    );
  }
);

export default TargetContainer;