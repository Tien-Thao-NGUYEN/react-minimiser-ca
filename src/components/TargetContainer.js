import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import GeneratedRule from './GeneratedRule';
import Diagram from './Diagram';



export default function TargetContainer(props) {

  return (
    <Container>
      <Row>
        <ButtonToolbar>
          <ButtonGroup size="sm">
            <Button onClick={() => {}}> chose rule </Button>
            <Button onClick={() => {}}> chose diagram </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
      <Row>
        <Col xl={4} style={{backgroundColor: 'yellow'}}>
          <GeneratedRule
            genRule = {props.genRule}
          />
        </Col>
        <Col xl={8} style={{backgroundColor: 'lightgray'}}>
           <Diagram
              transitionTable = {props.genRule}
              currentSize = {props.currentSize}
              currentTime = {props.currentTime}
              currentPosition = {props.currentPosition}
            />
        </Col>
      </Row>
    </Container>
  );
}