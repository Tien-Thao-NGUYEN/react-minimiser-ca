import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import Tuple from './Tuple';

import { defaultCellSize, zoomStep, emptyFunction, styleContainer } from './renderHelper'; 
import { initialSuperRule } from '../data/dataHelper';


const indexBelongErr = (index, indexSRErrorByGroup) => {

}

const SuperRule = React.memo(function SuperRule(props) {
	const [scale, setScale] = useState(1);

	const handleZoomInClick = () => setScale(scale + zoomStep);
	const handleZoomOutClick = () => setScale(scale - zoomStep);

  var cellSize = defaultCellSize * scale;
	return (
		<Container>
			<Row>
				<ButtonGroup size = "sm">
					<Button onClick = { handleZoomInClick }> z+ </Button>
					<Button onClick = { handleZoomOutClick }> z- </Button>
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
							initialSuperRule.map( ([quint, tripl], indSrList) => {
                if (quint.length === tripl.length) {
                  var indexLine = indSrList * 2;
                  var x = 1;
                }
                else{
                  indexLine = (indSrList - 1.5) * 3;
                  x = 0;
                }

                if (props.indexSRErrorByGroup.flat().includes(indSrList)) {
                  var stroke = 'red';
                  var strokeWidth = 3;
                }
                else {
                  stroke = 'black';
                  strokeWidth = 1;
                }

                const quintSVG =  <Tuple
                                    key = { indexLine }
                                    x = { x }
                                    indexLine = { indexLine }
                                    tuple = { quint }
                                    cellSize = { cellSize }
                                    fillOpacity = { 1 }
                                    stroke = { stroke } 
                                    strokeWidth={ strokeWidth }
                                    handleCellClick = { emptyFunction }
                                  />

                return quint.length === tripl.length ?
                  [ quintSVG ] :
                  [ quintSVG,
                    <Tuple
                      key = { indexLine + 1 }
                      x = { 1 }
                      indexLine = { indexLine + 1 }
                      tuple = { tripl }
                      cellSize = { cellSize }
                      fillOpacity = { 1 }
                      stroke = { stroke } 
                      strokeWidth={ strokeWidth }
                      handleCellClick = { emptyFunction }
                    /> ]
                }
              )
						}
					</svg>
				</Col>
			</Row>
		</Container>
	);
});

export default SuperRule;