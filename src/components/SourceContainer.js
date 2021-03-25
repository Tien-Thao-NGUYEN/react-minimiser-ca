import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import SuperRule from './SuperRule';
import Diagram from './Diagram';

import { initialRule } from '../data/dataHelper';


const SourceContainer = React.memo(
  function SourceContainer( {sourceDiagram, locationOnMouseEnter} ) {
    const [showDiagram, setShowDiagram] = useState(true);
    const handlerShowDiagram = () => {var show = !showDiagram; setShowDiagram(show)}; 
  
      const infoDiagram = () => {
          const infoDiagram = [];
          for (var time = 0; time < sourceDiagram.length; time++) {
            const sourceGConfig = sourceDiagram[time];
            const infoGConfig = [];
            for (var position = 0; position < sourceGConfig.length; position++) {
              if (time === locationOnMouseEnter.time - 1 
                && (position === locationOnMouseEnter.position - 1
                  || position === locationOnMouseEnter.position
                  || position === locationOnMouseEnter.position + 1)) {
                    var fillOpacity = 1;
                    var stroke = 'black';
                    var strokeWidth = 3;
                    var stateColor = 'black';
              }
              else{
                fillOpacity = 1;
                stroke = 'gray';
                strokeWidth = 1;
                stateColor = 'black';  
              } 
  
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
);

export default SourceContainer;