import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import Tuple from './Tuple';

import { defaultCellSize, zoomStep, emptyFunction, styleContainer } from './renderHelper'; 
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
					<svg 
            width = { 100 } 
            height = { initialSuperRule.length * cellSize * 3 } 
            xmlns="http://www.w3.org/2000/svg"
          >
						{
							initialSuperRule.map( ([quint, tripl], indSrList) => 
                quint.length === tripl.length ?
                  [ <Tuple
                      key = { indSrList * 2 }
                      x = { 1 }
                      indexLine = { indSrList * 2 }
                      tuple = { quint }
                      cellSize = { cellSize }
                      fillOpacity = { 1 }
                      stroke = { 'black' } 
                      strokeWidth={ 1 }
                      handleCellClick = { emptyFunction }
                    /> ] :
                  [ <Tuple
                      key = { (indSrList - 1.5) * 3 }
                      x = { 0 }
                      indexLine = { (indSrList - 1.5) * 3 }
                      tuple = { quint }
                      cellSize = { cellSize }
                      fillOpacity = { 1 }
                      stroke = { 'black' } 
                      strokeWidth={ 1 }
                      handleCellClick = { emptyFunction }
                    />,
                    <Tuple
                      key = { (indSrList - 1.5) * 3 + 1 }
                      x = { 1 }
                      indexLine = { (indSrList - 1.5) * 3 + 1 }
                      tuple = { tripl }
                      cellSize = { cellSize }
                      fillOpacity = { 1 }
                      stroke = { 'black' } 
                      strokeWidth={ 1 }
                      handleCellClick = { emptyFunction }
                    /> ]
              )
						}
					</svg>
				</Col>
			</Row>
		</Container>
	);
});

export default SuperRule;