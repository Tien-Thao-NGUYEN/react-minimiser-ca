import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import LocalTransition from './LocalTransition';

import { defaultCellSize, zoomStep, renderTuple, emptyFunction } from './renderHelper'; 
import { initialSuperRuleIndex, initialSuperRule } from '../data/dataHelper';


export default function SuperRule(props) {
	const [scale, setScale] = useState(1);
  const [superRuleIndex, setSuperRuleIndex] = useState(initialSuperRuleIndex);
  const [currentIndex, setCurrentIndex] = useState(0);
  //doc slt_table trong data là ok cho viec render 5up -> 3up.
  //ko cell nao co onClick.


	const handleZoomInClick = () => setScale(scale + zoomStep);
	const handleZoomOutClick = () => setScale(scale - zoomStep);


  const superRuleConvert = superRuleIndex.map((obj, indexObj) => {
    var lok = obj.key.map((c, ic) => props.localMapping[c]);
    lok.push(props.localMapping[obj.val]);
    return lok;
  });

  /*console.log(superRule)*/

  const handleOneStepClick = () => {
    var currentObj = superRuleIndex[currentIndex];
    /*console.log(currentObj);*/
    var lc = currentObj.key.map( (c, ic) => props.localMapping[c][1] );
    var res = props.localMapping[currentObj.val][1];

    props.updateGenRule(true, lc, res);
    props.setCurrentSize(currentObj.size);
    props.setCurrentTime(currentObj.time);
    props.setCurrentPosition(currentObj.position);
    setCurrentIndex(currentIndex + 1);
  }


  var cellSize = defaultCellSize * scale;
	return (
		<Container>
			<Row>
				<ButtonGroup size="sm">
					<Button onClick={handleZoomInClick}> z+ </Button>
					<Button onClick={handleZoomOutClick}> z- </Button>
          <Button onClick={handleOneStepClick}> one step </Button>
				</ButtonGroup>
			</Row>
			<Row>
				<Col>
					<svg width={500} height={superRuleIndex.length * cellSize * 3} xmlns="http://www.w3.org/2000/svg">
						{
							initialSuperRule.map( ([quint, tripl], indSrList) => 
                quint.length === tripl.length ?
                  [renderTuple(quint, 1, (indSrList * 2), cellSize, emptyFunction)] :
                  [renderTuple(quint, 0, ((indSrList - 1.5) * 3), cellSize, emptyFunction),
                    renderTuple(tripl, 1, ((indSrList - 1.5) * 3 + 1), cellSize, emptyFunction)]
                    
              )
						}
					</svg>
				</Col>
			</Row>
		</Container>
	);
}