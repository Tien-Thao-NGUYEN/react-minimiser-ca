import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import SuperRule from './SuperRule';
import LocalMapping from './LocalMapping'; 
import Diagram from './Diagram';

import { initialLocalMapping, initialRule, getNextState } from '../data/dataHelper';


export default function SourceContainer(props) {
  const [localMapping, setLocalMapping] = useState(initialLocalMapping);
  const [showDiagrame, setShowDiagram] = useState(true);
  const [showSuperRule, setShowSuperRule] = useState(true);

  const handleChangeableCellClick = (indexLine) => {
    var newLocalMapping = [...localMapping];
    var element = newLocalMapping[indexLine];
    /*console.log(indexLine, element);*/
    element[1] = getNextState(element[1]);
    newLocalMapping[indexLine] = element;
    setLocalMapping(newLocalMapping);
  }

  const setInfoGenRule = (obj) => {
    props.setInfoGenRule(obj);
  }

  return (
    <Container>
      <Row>
        <ButtonToolbar>
          <ButtonGroup size="sm">
            <Button onClick={ () => {var show = !showDiagrame; setShowDiagram(show)} }> show diagram </Button>
            <Button onClick={ () => {var show = !showSuperRule; setShowSuperRule(show)} }> show super rule </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
      <Row>
        {
          showDiagrame ? 
            (  
              <Col xl={5} style={{backgroundColor: 'lightgray'}}>
                <Diagram
                   transitionTable = {initialRule}
                   currentSize = {20}
                   currentTime = {38}
                   currentPosition = {19}
                />
              </Col> 
            ) : <Col></Col>
        }
        {
          showSuperRule ?
            ( 
              <Col xl={5} style={ {backgroundColor: 'lightgray'} }>
                <SuperRule
                  localMapping = { localMapping }
                  updateGenRule = { props.updateGenRule }
                  setCurrentSize = { props.setCurrentSize }
                  setCurrentTime = { props.setCurrentTime }
                  setCurrentPosition = { props.setCurrentPosition }
                />
              </Col>
            ) : <Col></Col>
        }
        <Col xl={2} style={ {backgroundColor: 'pink'} }>
          <LocalMapping
            localMapping = { localMapping }
            handleChangeableCellClick = { handleChangeableCellClick }
          />
        </Col>
      </Row>
    </Container>
  );
}