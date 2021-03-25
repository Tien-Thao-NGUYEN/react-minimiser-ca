import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import SuperRule from './SuperRule';
import Diagram from './Diagram';

import { initialRule } from '../data/dataHelper';


export default function SourceContainer( {sourceDiagram} ) {
  const [showDiagram, setShowDiagram] = useState(true);
  const handlerShowDiagram = () => {var show = !showDiagram; setShowDiagram(show)}; 

  const infoDiagram = () => {
      const infoDiagram = [];
      for (var time = 0; time < sourceDiagram.length; time++) {
        const sourceGConfig = sourceDiagram[time];
        const infoGConfig = [];
        for (var position = 0; position < sourceGConfig.length; position++) {
            var fillOpacity = 1;
            var stroke = 'gray';
            var strokeWidth = 1;
            var stateColor = 'black';

          const infoCell = {  state : sourceGConfig[position],
                              stateColor : stateColor,
                              fillOpacity : fillOpacity,
                              stroke : stroke,
                              strokeWidth : strokeWidth
                           }
          infoGConfig.push(infoCell);
        }

        infoDiagram.push(infoGConfig);
      }

      return infoDiagram;
    }

  return (
    <Container>
      <Row>
        <ButtonToolbar>
          <ButtonGroup size="sm">
            <Button onClick = { handlerShowDiagram }> { showDiagram ? "hide diagram" : "show diagram" } </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
      <Row>
        {
          showDiagram ?  
            <Col 
              xl = { 8 }
            >
              <Diagram
                infoDiagram = { infoDiagram() }
              />
            </Col> : 
            <Col></Col>
        }
      </Row>
    </Container>
  );
}