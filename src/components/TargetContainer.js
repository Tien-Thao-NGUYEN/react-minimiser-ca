import React, { useState } from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import GeneratedRule from './GeneratedRule';
import Diagram from './Diagram';
import TransitionTable from '../simulator/TransitionTable';

import { emptyFunction } from './renderHelper';
import { outSpaceState, nCellLeft, nCellRight } from '../data/parseData';


const TargetContainer = React.memo(
  function TargetContainer({ sourceDiagram, targetDiagram, handleTargetErrorCellClick }) {
    const [showDiagram, setShowDiagram] = useState(true);
    const [showTargetRule, setShowTargetRule] = useState(false);
    const handlerShowTargetRule = () => {let show = !showTargetRule; setShowTargetRule(show)};
    const handlerShowDiagram = () => {let show = !showDiagram; setShowDiagram(show)};

    const findLConfigErrorSet = () => {
      const relationTable = new TransitionTable();
      const lConfigSize = nCellLeft + 1 + nCellRight;
      for (let time = 0; time <= targetDiagram.length - 2; time++) {
        const currentTargetGConfig = [ ...Array(nCellLeft).fill(outSpaceState), 
                                        ...targetDiagram[time],
                                        ...Array(nCellRight).fill(outSpaceState) ];
        const nextTargetGConfig = targetDiagram[time + 1];
        for (let position = 0; position < nextTargetGConfig.length; position++) {
          const lConfig = currentTargetGConfig.slice(position, position + lConfigSize);
          const result = nextTargetGConfig[position];
          const resultInfo = relationTable.get(lConfig);
          if (resultInfo === undefined)
            relationTable.set(lConfig, [result, true]);
          else if (resultInfo[0] !== result)
            resultInfo[1] = false;
        }
      }

      const lConfigErrorSet = new TransitionTable();
      relationTable.getTable()
        .filter( elem => elem[1][1] === false )
        .forEach( elem => lConfigErrorSet.set(elem[0], true) );

      return lConfigErrorSet;
    }

    const identifyCellErrorWithDiagram = () => {
      const lConfigErrorSet = findLConfigErrorSet();
      const lConfigSize = nCellLeft + 1 + nCellRight;
      const errorDiagram = [];
      for (let time = 0; time < targetDiagram.length; time++)
        errorDiagram.push(Array(targetDiagram[time].length).fill(false));

      for (let time = 0; time <= errorDiagram.length - 2; time++) {
        const currentTargetGConfig = [...Array(nCellLeft).fill(outSpaceState), 
                                      ...targetDiagram[time],
                                      ...Array(nCellRight).fill(outSpaceState) ];
        for (let position = 0; position < errorDiagram[time].length; position++) {
          const lConfig = currentTargetGConfig.slice(position, position + lConfigSize);
          if (lConfigErrorSet.has(lConfig)) {
            const beginPos = position - nCellLeft;
            const endPos = position + nCellRight;
            for (let i = beginPos; i <= endPos; i++) {
              if (i >= 0 && i < errorDiagram.length)
                errorDiagram[time][i] = true;
            }
            
            errorDiagram[time + 1][position] = true;
          }
        }
      }
      return errorDiagram; 
    }

    const infoDiagram = () => {
      const errorDiagram = identifyCellErrorWithDiagram();
      const infoDiagram = [];
      for (let time = 0; time < sourceDiagram.length; time++) {
        const sourceGConfig = sourceDiagram[time];
        const targetGConfig = targetDiagram[time];
        const errorGConfig = errorDiagram[time];
        const infoGConfig = [];

        for (let position = 0; position < sourceGConfig.length; position++) {
          if (sourceGConfig[position] !== targetGConfig[position]) {
            var fillOpacity = 1;
            var stroke = 'black';
            var strokeWidth = 3;
            var stateColor = errorGConfig[position] ? 'red' : 'black';
          }
          else {
            fillOpacity = 0.1;
            stroke = 'gray';
            strokeWidth = 1;
            stateColor = errorGConfig[position] ? 'red' : 'gray';
          }

          const handleCellClick = errorGConfig[position] ? handleTargetErrorCellClick : emptyFunction;

          const infoCell = {  state : targetGConfig[position],
                              stateColor : stateColor,
                              fillOpacity : fillOpacity,
                              stroke : stroke,
                              strokeWidth : strokeWidth,
                              handleCellClick : handleCellClick
                           }
          infoGConfig.push(infoCell);
        }

        infoDiagram.push(infoGConfig);
      }

      return infoDiagram;
    }

    function renderTargetRule(key, nbrColumn) {
      return <Col 
                key = { key }
                xl = { nbrColumn } 
              >
                <GeneratedRule
                  targetRule = { new TransitionTable() }
                />
              </Col>
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
      if (showTargetRule && showDiagram) 
        return [renderDiagram(1, 8), renderTargetRule(2, 4)];

      if (showTargetRule && !showDiagram)
        return [renderTargetRule(1, 12)]

      if (!showTargetRule && showDiagram)
        return [renderDiagram(1, 12)]

      return [];
    }

    return (
      <Container>
        <Row
          style = { {backgroundColor: 'lightgray'} }
        >
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick = { handlerShowDiagram }> { showDiagram ? "hide diagram" : "show diagram" } </Button>
              <Button onClick = { handlerShowTargetRule }> { showTargetRule ? "hide rule" : "show rule" } </Button>
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

export default TargetContainer;