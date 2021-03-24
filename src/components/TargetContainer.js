import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import GeneratedRule from './GeneratedRule';
import Diagram from './Diagram';


const TargetContainer = React.memo(
  function TargetContainer(props) {
    const [showDiagram, setShowDiagram] = useState(true);
    const [showTargetRule, setShowTargetRule] = useState(true);

    const handlerShowTargetRule = () => {var show = !showTargetRule; setShowTargetRule(show)};
    const handlerShowDiagram = () => {var show = !showDiagram; setShowDiagram(show)}; 

    return (
      <Container>
        <Row>
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick={ handlerShowDiagram }> { showDiagram ? "hide diagram" : "show diagram" } </Button>
              <Button onClick={ handlerShowTargetRule }> { showTargetRule ? "hide rule" : "show rule" } </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        <Row>
          {
            showDiagram ?
              <Col xl={8} style={ {backgroundColor: 'lightgray'} }>
                 <Diagram
                    rule = { props.targetRule }
                    size = { 20 }
                  />
              </Col> : 
              <Col></Col>
          }
          {
            showTargetRule ?
              <Col xl={4} style={ {backgroundColor: 'yellow'} }>
                <GeneratedRule
                  targetRule = { props.targetRule }
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