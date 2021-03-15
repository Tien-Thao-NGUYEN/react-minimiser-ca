import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'

import LocalTransition from './LocalTransition';
import { defaultCellSize, zoomStep } from './renderHelper'; 


export default function SuperRule(props) {
	const [scale, setScale] = useState(1);

	const handleZoomInClick = () => setScale(scale + zoomStep);
	const handleZoomOutClick = () => setScale(scale - zoomStep);

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
				<Col>
					<svg width={500} height={props.superRule.length * cellSize * 3} xmlns="http://www.w3.org/2000/svg">
						{
							props.superRule.map((lmlist, ilmlist) => 
								lmlist.map((lm, ilm) =>
									<LocalTransition
										key = {ilm}
										x = {(ilm * 4)  * cellSize}
										y = {(ilmlist * 3) * cellSize}
										cellSize = {cellSize}
										localConfig = {lm.key}
										result = {lm.val}
										handleCellClick = {props.handleCellClick}
									/>
								)
							)
						}
					</svg>
				</Col>
			</Row>
		</Container>
	);
}