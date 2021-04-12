import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import Tuple from './Tuple';

import { defaultCellSize, zoomStep, emptyFunction, styleContainer } from './renderHelper'; 


const SuperRule = React.memo(
  function SuperRule({ superRule }) {
  	const [scale, setScale] = useState(1);
  
  	const handleZoomInClick = () => setScale(scale + zoomStep);
  	const handleZoomOutClick = () => setScale(scale - zoomStep);
  
    const cellSize = defaultCellSize * scale;

    function renderSuperRuleLevel() {
      const levelArray = Object.keys(superRule);
      levelArray.pop();
      const tupleArrayArray = levelArray.map( level => {
        return superRule[level].map( (superLConfig, indSuperLConfig) => {
          const indexLine = indSuperLConfig * 2;
          const x = 0;
          const stroke = 'black';
          const strokeWidth = 1;

          /*console.log(superLConfig);*/

          return <Tuple
                    key = { indexLine }
                    x = { x }
                    indexLine = { indexLine }
                    tuple = { superLConfig }
                    cellSize = { cellSize }
                    fillOpacity = { 1 }
                    stroke = { stroke } 
                    strokeWidth={ strokeWidth }
                    handleCellClick = { emptyFunction }
                  />
        } );
      } );

      /*console.log(tupleArrayArray);*/

      return tupleArrayArray.flat();
    }

    function renderSuperRuleLevelMax() {
      const levelArray = Object.keys(superRule);
      const levelMax = levelArray.pop();
      const indexed = levelArray.map( key => superRule[key].length).reduce((a, b) => a + b, 0) - 1.5;

      const fillOpacity = 1;
      const stroke = 'black';
      const strokeWidth = 1;

      const transitionRenderList = superRule[levelMax].map( ([superLConfig, superResult], indSuperTransition) => {
          const slcIndexLine = (indexed + indSuperTransition) * 3;
          const slcX = 0;
          /*console.log(superLConfig);*/
          const superLConfigRender =  <Tuple
                                        key = { slcIndexLine }
                                        x = { slcX }
                                        indexLine = { slcIndexLine }
                                        tuple = { superLConfig }
                                        cellSize = { cellSize }
                                        fillOpacity = { fillOpacity }
                                        stroke = { stroke } 
                                        strokeWidth={ strokeWidth }
                                        handleCellClick = { emptyFunction }
                                      />;

          const srIndexLine = slcIndexLine + 1;
          const srX = 1;
          /*console.log(superResult);*/
          const superResultRender =  <Tuple
                                        key = { srIndexLine }
                                        x = { srX }
                                        indexLine = { srIndexLine }
                                        tuple = { superResult }
                                        cellSize = { cellSize }
                                        fillOpacity = { fillOpacity }
                                        stroke = { stroke } 
                                        strokeWidth={ strokeWidth }
                                        handleCellClick = { emptyFunction }
                                      />;

          return [superLConfigRender, superResultRender];
        } );
      return transitionRenderList.flat();
    }

    
    const superRuleSize = Object.keys(superRule).map( key => 
                                superRule[key].length).reduce((a, b) => a + b, 0) - 1;

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
              height = { superRuleSize * cellSize * 3 } 
              xmlns="http://www.w3.org/2000/svg"
            >
  						{
  							renderSuperRuleLevel().concat(renderSuperRuleLevelMax())
  						}
  					</svg>
  				</Col>
  			</Row>
  		</Container>
  	);
  }
);

export default SuperRule;