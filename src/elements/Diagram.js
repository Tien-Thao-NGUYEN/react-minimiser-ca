import React, { useState } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap'

import { defaultCellSize, zoomStep, renderTuple } from './renderHelper'
import { getDiagram } from './simulator/simulator'


const getInitialGConfig = (size) => {
  if (size === 0)
    return [];

  var gc0 = ["1"];
  for (var i = 1; i < size; i++)
    gc0.push("0");

  return gc0;
}

function Diagram(props) {
	const [scale, setScale] = useState(1);
	/*const [diagram, setDiagram] = useState([getInitialGConfig(props.configurationSize)]);*/
  //can phai su dung diagram: khi tien len thi goi simulator, khi quay lai ma cung size thi chi xoa cell va gconfig
  //neu ko cung size thi phai goi simulator

  //can phai lam lai cai ghi vao JSON


	const handleZoomInClick = () => setScale(scale + zoomStep);
	const handleZoomOutClick = () => setScale(scale - zoomStep);


  

  var cellSize = defaultCellSize * scale;

	return (
		<Container>
      <Row>
        <ButtonGroup size="sm">
          <Button onClick={handleZoomInClick}>z+</Button>
          <Button onClick={handleZoomOutClick}>z-</Button>
        </ButtonGroup>
      </Row>
			<Row>
				<svg width={props.configurationSize * cellSize} height={(props.currentTime + 1) * cellSize} xmlns="http://www.w3.org/2000/svg">
					{
            getDiagram(props.transitionTable, getInitialGConfig(props.configurationSize), "6", 
              1, 1, props.currentTime, props.currentPosition).map((valLine, indexLine) => 
                renderTuple(valLine, indexLine, cellSize, props.handleCellClick))
          }
				</svg>
			</Row>
		</Container>
	);
}

export default Diagram;