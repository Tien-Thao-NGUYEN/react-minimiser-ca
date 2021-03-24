import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import GeneratedRule from './GeneratedRule';
import Diagram from './Diagram';


const TargetContainer = React.memo(
  function TargetContainer(props) {
    const [showDiagrame, setShowDiagram] = useState(true);
    const [showTargetRule, setShowTargetRule] = useState(true);

    const handlerShowTargetRule = () => {var show = !showTargetRule; setShowTargetRule(show)};
    const handlerShowDiagram = () => {var show = !showDiagrame; setShowDiagram(show)}; 

    return (
      <Container>
        <Row>
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick={ handlerShowDiagram }> show diagram </Button>
              <Button onClick={ handlerShowTargetRule }> show target rule </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        <Row>
          {
            showDiagrame ?
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