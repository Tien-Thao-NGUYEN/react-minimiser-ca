import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import { defaultCellSize, zoomStep, renderTuple, emptyFunction, styleContainer } from './renderHelper'; 
import { initialSuperRule } from '../data/dataHelper';


const SuperRule = React.memo(function SuperRule(props) {
	const [scale, setScale] = useState(1);

	const handleZoomInClick = () => setScale(scale + zoomStep);
	const handleZoomOutClick = () => setScale(scale - zoomStep);

  var cellSize = defaultCellSize * scale;
	return (
		<Container>
			<Row>
				<ButtonGroup size="sm">
					<Button onClick={handleZoomInClick}> z+ </Button>
					<Button onClick={handleZoomOutClick}> z- </Button>
				</ButtonGroup>
			</Row>
			<Row>
				<Col style={ styleContainer } >
					<svg width={50} height={initialSuperRule.length * cellSize * 3} xmlns="http://www.w3.org/2000/svg">
						{
							initialSuperRule.map( ([quint, tripl], indSrList) => 
                quint.length === tripl.length ?
                  [renderTuple(indSrList * 2, quint, 1, indSrList * 2, cellSize, emptyFunction)] :
                  [renderTuple((indSrList - 1.5) * 3, quint, 0, (indSrList - 1.5) * 3, cellSize, emptyFunction),
                    renderTuple((indSrList - 1.5) * 3 + 1, tripl, 1, (indSrList - 1.5) * 3 + 1, cellSize, emptyFunction)]
                    
              )
						}
					</svg>
				</Col>
			</Row>
		</Container>
	);
});

export default SuperRule;