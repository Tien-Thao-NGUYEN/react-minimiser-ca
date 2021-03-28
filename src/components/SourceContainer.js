import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import SuperRule from './SuperRule';
import Diagram from './Diagram';

import { emptyFunction } from './renderHelper';


const SourceContainer = React.memo(
  function SourceContainer( {sourceDiagram, superRule, locationOnMouseEnter} ) {
    const [showDiagram, setShowDiagram] = useState(true);
    const handlerShowDiagram = () => {var show = !showDiagram; setShowDiagram(show)}; 

    const [showSuperRule, setShowSuperRule] = useState(false);
    const handlerShowSuperRule = () => {var show = !showSuperRule; setShowSuperRule(show)}; 
  
    function infoDiagram() {
      const infoDiagram = [];
      for (var time = 0; time < sourceDiagram.length; time++) {
        const sourceGConfig = sourceDiagram[time];
        const infoGConfig = [];
        for (var position = 0; position < sourceGConfig.length; position++) {
          if (time === locationOnMouseEnter.time - 1 
            && (position === locationOnMouseEnter.position - 1
              || position === locationOnMouseEnter.position
              || position === locationOnMouseEnter.position + 1)) {
                var stroke = 'black';
                var strokeWidth = 3;
          }
          else{
            stroke = 'gray';
            strokeWidth = 1;
          }
          
          var fillOpacity = 1;
          var stateColor = 'black';
 
          const infoCell = {  state : sourceGConfig[position],
                              stateColor : stateColor,
                              fillOpacity : fillOpacity,
                              stroke : stroke,
                              strokeWidth : strokeWidth,
                              handleCellClick : emptyFunction
                            }
          infoGConfig.push(infoCell);
        }
 
        infoDiagram.push(infoGConfig);
      }

      return infoDiagram;
    }

    function renderSuperRule(key, nbrColumn) {
      return <Col 
                key = { key }
                xl = { nbrColumn } 
                style = { {backgroundColor: 'lightgray'} }>
                <SuperRule
                  superRule = { superRule }
                />
              </Col>;
    }

    function renderDiagram(key, nbrColumn) {
      return <Col 
                key = { key }
                xl = { nbrColumn }
              >
                <Diagram
                  infoDiagram = { infoDiagram() }
                />
              </Col>
    }

    function render() {
      if (showSuperRule && showDiagram) 
        return [renderDiagram(1, 8), renderSuperRule(2, 4)];

      if (showSuperRule && !showDiagram)
        return [renderSuperRule(1, 12)]

      if (!showSuperRule && showDiagram)
        return [renderDiagram(1, 12)]

      return [];
    }

    return (
      <Container>
        <Row>
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick = { handlerShowDiagram }> { showDiagram ? "hide diagram" : "show diagram" } </Button>
              <Button onClick = { handlerShowSuperRule }> { showSuperRule ? "hide super rule" : "show super rule" } </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        <Row>
          { render() }
        </Row>
      </Container>
    );
  }
);

export default SourceContainer;