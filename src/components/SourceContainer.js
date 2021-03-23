import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import SuperRule from './SuperRule';
import Diagram from './Diagram';

import { initialRule } from '../data/dataHelper';


export default function SourceContainer(props) {
  const [showDiagrame, setShowDiagram] = useState(true);
  const [showSuperRule, setShowSuperRule] = useState(true);

  const handlerShowDiagram = () => {var show = !showDiagrame; setShowDiagram(show)}; 
  const handlerShowSuperRule = () => {var show = !showSuperRule; setShowSuperRule(show)};

  return (
    <Container>
      <Row>
        <ButtonToolbar>
          <ButtonGroup size="sm">
            <Button onClick={ handlerShowDiagram }> show diagram </Button>
            <Button onClick={ handlerShowSuperRule }> show super rule </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
      <Row>
        {
          showDiagrame ?  
            <Col xl={8} style={{backgroundColor: 'gray'}}>
              <Diagram
                 rule = { initialRule }
                 size = { 20 }
              />
            </Col> : 
            <Col></Col>
        }
        {
          showSuperRule ?
            <Col xl={4} style={ {backgroundColor: 'lightgray'} }>
              <SuperRule
                indexSRErrorByGroup = { props.indexSRErrorByGroup }
              />
            </Col> : 
            <Col></Col>
        }
      </Row>
    </Container>
  );
}