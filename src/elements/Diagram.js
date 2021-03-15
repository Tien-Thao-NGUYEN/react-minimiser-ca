import React, { useState } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap'

import { defaultCellSize, zoomStep, renderTuple } from './renderHelper'


const getInitialGConfig = (size) => {
  var gc0 = ['1'];
  for (var i = 1; i < size; i++)
    gc0.push('0');

  return gc0;
}

function Diagram(props) {
	const [scale, setScale] = useState(1);
	/*const [diagram, setDiagram] = useState([getInitialGConfig(props.configurationSize)]);*/

	const handleZoomInClick = () => setScale(scale + zoomStep);
	const handleZoomOutClick = () => setScale(scale - zoomStep);

  const equalsArray = (arr1, arr2) => {
    if (arr1 == null && arr2 == null)
      return true;

    if (arr1.length !== arr2.length)
      return false;

    for (var i = 0; i < arr1.length; i++)
      if (arr1[i] != arr2[i])
        return false;

    return true;
  }

  const getDiagram = () => {
    if (props.configurationSize === 0)
      return [];

    var diagram = [getInitialGConfig(props.configurationSize)];
    for (var t = 1; t < props.currentTime; t++) {
      var old_gc = diagram[t - 1];
      var new_gc = [];
      for (var p = 0; p < props.configurationSize; p++){
        var lc = [p-1 < 0 ? '6' : old_gc[p-1], old_gc[p], p+1 === props.configurationSize ? '6' : old_gc[p+1]];
        new_gc.push(props.rule.find(e => equalsArray(e.key, lc)).val);
      }
      diagram.push(new_gc);
    }

    var old_gc = diagram[props.currentTime - 1];
    var new_gc = [];
    for (var p = 0; p <= props.currentPosition; p++){
      var lc = [p-1 < 0 ? '6' : old_gc[p-1], old_gc[p], p+1 === props.configurationSize ? '6' : old_gc[p+1]];
      new_gc.push(props.rule.find(e => equalsArray(e.key, lc)).val);
    }
    diagram.push(new_gc);

    console.log(diagram);
    return diagram;
  }

  var cellSize = defaultCellSize * scale;

	return (
		<Container>
      <Row>
        <ButtonGroup size="sm">
          <Button onClick={handleZoomInClick}>+</Button>
          <Button onClick={handleZoomOutClick}>-</Button>
        </ButtonGroup>
      </Row>
			<Row>
				<svg width={props.configurationSize * cellSize} height={(props.currentTime + 1) * cellSize} xmlns="http://www.w3.org/2000/svg">
					{getDiagram().map((line, indexLine) => renderTuple(line, indexLine, cellSize, props.handleCellClick))}
				</svg>
			</Row>
		</Container>
	);
}

export default Diagram;