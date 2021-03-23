import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import LocalMapping from './components/LocalMapping';
import TransitionTable from './simulator/TransitionTable';

import { initialLocalMapping, initialSuperRuleIndex, getNextState } from './data/dataHelper';


var superRuleIndex = initialSuperRuleIndex;

function App (props) {
  const [localMapping, setLocalMapping] = useState(initialLocalMapping);
  const [targetRule, setTargetRule] = useState(new TransitionTable());
  const [indexSRErrorByGroup, setIndexSRErrorByGroup] = useState([]);

  const handleChangeableCellClick = (indexLine) => {
    var newLocalMapping = [...localMapping];
    var element = newLocalMapping[indexLine];
    element[1] = getNextState(element[1]);
    newLocalMapping[indexLine] = element;
    setLocalMapping(newLocalMapping);
  }

  const findAllGroupIndexOfLConfigErr = (lConfigErrorList, targetRelation) => {
    const lConfigList = targetRelation.map( (rel, indRel) => rel[0].join(",") );
    return lConfigErrorList.map( lConfigErr => lConfigErr.join(",") )
        .map( lConfigErr => {
                const indList = [];
                for (var ind = 0; ind < lConfigList.length; ind++) {
                  if (lConfigErr === lConfigList[ind])
                    indList.push(ind);
                }

                return indList;
              }
        );
  }

  const uniqueArray = (array) => {
    return array.map( elem => elem.join(",") )
                  .filter( (value, index, self) => self.indexOf(value) === index )
                    .map( elem => elem.split(",") );
  }

  const handleCheckClick = () => {
    console.log("Build la table de relations ...");
    var targetRelation = superRuleIndex.map( (sri, indSri) => 
      [sri.key.map( ilm => localMapping[ilm][1] ), localMapping[sri.val][1]] );
    console.log("Vérifier si la table de relations est un fonction ...");
    var lConfigErrorList = [];
    const targetRule = new TransitionTable();
    targetRelation.forEach( (rel, indRel) => {
      if (!targetRule.has(rel[0]))
        targetRule.set(rel[0], rel[1]);
      else if (!targetRule.isDeterminismIfSet(rel[0], rel[1])) {
          lConfigErrorList.push(rel[0]);
          setTargetRule(targetRule);
        }
    } );

    console.log("Résultat:")
    if (lConfigErrorList.length > 0) {
      lConfigErrorList = uniqueArray(lConfigErrorList);
      console.log("La vérification trouve ", lConfigErrorList.length, 
        " configurations locales erreurs. Voici la lists : ", lConfigErrorList);
      const groupErr = findAllGroupIndexOfLConfigErr(lConfigErrorList, targetRelation);
      console.log("Les groupe d'index de super rule cause erreurs: ", groupErr);
      setIndexSRErrorByGroup(groupErr);
    }
    else {
      console.log("Félicitation! Vous avez trouvé une solution!");
      setIndexSRErrorByGroup([]);
      setTargetRule(targetRule);
    }
  }


  return (
    <Container fluid style={ {'height': "100%", backgroundColor:"green"} }>
      <Row>
        <ButtonGroup size="sm">
          <Button onClick={ handleCheckClick } > Check </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <Col sm={5} lg={5} xl={5} >
          <SourceContainer
             indexSRErrorByGroup = { indexSRErrorByGroup }
          />
        </Col>
        <Col sm={2} lg={2} xl={2} >
          <Container>
            <Row>
              <Button size="sm"> show local mapping </Button>
            </Row>
            <Row>
              <Col style={ {backgroundColor: 'pink'} } >
                <LocalMapping
                  localMapping = { localMapping }
                  handleChangeableCellClick = { handleChangeableCellClick }
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col sm={5} lg={5} xl={5} >
          <Col>
            <TargetContainer
              targetRule = { targetRule }
            />
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
