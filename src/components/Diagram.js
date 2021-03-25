import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import Cell from './Cell';
import TransitionTable from '../simulator/TransitionTable';

import { defaultCellSize, zoomStep, styleContainer } from './renderHelper';
import { outSpaceState, nCellLeft, nCellRight } from '../data/dataHelper';


const Diagram = React.memo(
  function Diagram(props) {
  	const [scale, setScale] = useState(1);

  	const handleZoomInClick = () => setScale(scale + zoomStep);
  	const handleZoomOutClick = () => setScale(scale - zoomStep);
    const handleCellClick = (indexLine, indexColumn) => {console.log("click on ", indexLine, " ", indexColumn)};

    var cellSize = defaultCellSize * scale;

    const findLConfigErrorSet = () => {
      const relationTable = new TransitionTable();
      const lConfigSize = nCellLeft + 1 + nCellRight;
      for (var time = 0; time <= props.targetDiagram.length - 2; time++) {
        const currentTargetGConfig = [ ...Array(nCellLeft).fill(outSpaceState), 
                                ...props.targetDiagram[time],
                                ...Array(nCellRight).fill(outSpaceState) ];
        const nextTargetGConfig = props.targetDiagram[time + 1];
        for (var position = 0; position < nextTargetGConfig.length; position++) {
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
      
      /*console.log(lConfigErrorSet);*/

      return lConfigErrorSet;
    }

    const identifyCellErrorWithDiagram = () => {
      const lConfigErrorSet = findLConfigErrorSet();
      const lConfigSize = nCellLeft + 1 + nCellRight;
      const diagramError = [];
      for (var time = 0; time < props.targetDiagram.length; time++)
        diagramError.push(Array(props.targetDiagram[time].length).fill(false));

      for (time = 0; time <= diagramError.length - 2; time++) {
        const currentTargetGConfig = [...Array(nCellLeft).fill(outSpaceState), 
                                      ...props.targetDiagram[time],
                                      ...Array(nCellRight).fill(outSpaceState) ];
        for (var position = 0; position < diagramError[time].length; position++) {
          const lConfig = currentTargetGConfig.slice(position, position + lConfigSize);
          if (lConfigErrorSet.has(lConfig)) {
            //cho nay co the lay 1 cai list [time, position] de dung cho viec entourer dgmSrc
            /*console.log(lConfigErrorSet, " has ", lConfig);*/
            const beginPos = position - nCellLeft;
            const endPos = position + nCellRight;
            for (var i = beginPos; i <= endPos; i++) {
              if (i >= 0 && i < diagramError.length)
                diagramError[time][i] = true;
            }
            
            diagramError[time + 1][position] = true;
          }
        }
      }
      /*console.log(diagramError[1]);*/
      return diagramError; 
    }

    const cellCollection = () => {
      const diagramError = identifyCellErrorWithDiagram();
      const cellCollection = [];
      for (var time = 0; time < props.sourceDiagram.length; time++) {
        const sourceGConfig = props.sourceDiagram[time];
        const targetGConfig = props.targetDiagram[time];
        for (var position = 0; position < sourceGConfig.length; position++) {
          if (sourceGConfig[position] !== targetGConfig[position]) {
            var fillOpacity = props.fillOpacityDiff;
            var stroke = 'black';
            var strokeWidth = 3 * scale;
            var stateColor = diagramError[time][position] ? 'red' : 'black';
          }
          else {
            fillOpacity = props.fillOpacitySame;
            stroke = 'gray';
            strokeWidth = 1;
            stateColor = diagramError[time][position] ? 'red' : 'black';
          }

          const cell =  <Cell
                          key = { time * sourceGConfig.length + position }
                          indexLine = { time }
                          indexColumn = { position }
                          cellState = { targetGConfig[position] }
                          cellSize = { cellSize }
                          fillOpacity = { fillOpacity }
                          stroke = { stroke } 
                          strokeWidth = { strokeWidth }
                          handleCellClick = { handleCellClick }
                          stateColor = { stateColor }
                        />

          if (sourceGConfig[position] !== targetGConfig[position])
            cellCollection.push(cell);
          else
            cellCollection.unshift(cell);
        }
      }

      return cellCollection;
    }
                

  	return (
  		<Container>
        <Row>
          <ButtonGroup 
            size = "sm"
          >
            <Button onClick = { handleZoomInClick }> z+ </Button>
            <Button onClick = { handleZoomOutClick }> z- </Button>
            <Button> show time </Button>
            <Button> show cellNumber </Button>
            <Button> size </Button>
            <Button> time max </Button>
          </ButtonGroup>
        </Row>
  			<Row>
          <Col 
            style={ styleContainer } 
          >
    				<svg 
              width = { props.targetDiagram[0].length * cellSize } 
              height= { props.targetDiagram.length * cellSize } 
              xmlns="http://www.w3.org/2000/svg"
            >
    					{
                cellCollection()
              }
    				</svg>
          </Col>
  			</Row>
  		</Container>
  	);
  }
);

export default Diagram;