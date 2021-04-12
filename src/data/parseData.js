import data from './exemple_data';
import TransitionTable from '../simulator/TransitionTable';

/*console.log(data);*/

function parseData(jsonString) {
  return JSON.parse(jsonString);
}

function parseRule(ruleStringArray, separatorTransition, separatorState) {
  /*console.log(ruleStringArray);*/
  let rule = new TransitionTable();
  ruleStringArray.forEach( e => {
    const transition = e.split(separatorTransition);
    const lConfig = transition[0].split(separatorState);
    const result = transition[1];
    rule.set(lConfig, { state:result, mutable:false });
  } );
  /*console.log(rule);*/
  return rule;
}

function parseLocalMapping(localMappingFixeStringArray, localMappingChangeStringArray, 
                                separatorTransition, separatorState, dt) {
  const localMapping = new TransitionTable();

  for (let h = 0; h <= dt; h++) {
    const hArrayChange = localMappingChangeStringArray[h];
    hArrayChange.forEach( e => {
      const transition = e.split(separatorTransition);
      const lConfig = transition[0].split(separatorState);
      const result = transition[1];
      localMapping.set(lConfig, { state:result, mutable:true });
    } );
    
    const hArrayFixe = localMappingFixeStringArray[h];
    hArrayFixe.forEach( e => {
      const transition = e.split(separatorTransition);
      const lConfig = transition[0].split(separatorState);
      const result = transition[1];
      localMapping.set(lConfig, { state:result, mutable:false });
    } );
  }

  return localMapping;
}

function parseSuperRule(superRuleStringArray, separatorTransition, separatorState, dt) {
  /*console.log(superRuleStringArray);*/
  const superRule = {};
  for (let h = 1; h <= dt; h++) {
    const hArray = superRuleStringArray[h];
    /*console.log(hArray);*/
    superRule[h] = hArray.map( e => e.split(separatorState) );
  }

  const dt1Array = superRuleStringArray[dt + 1];
  superRule[dt + 1] = dt1Array.map( e => {
                        const superTransition = e.split(separatorTransition);
                        const superLConfig = superTransition[0].split(separatorState);
                        const superResult = superTransition[1].split(separatorState);
                        return [superLConfig, superResult];
                      } );

  return superRule;
}

function getInitGConfig(size) {
  if (size === 0)
    return [];

  const gc0 = [data.activeState];
  for (let i = 1; i < size; i++)
    gc0.push(data.quiescenceState);

  return gc0;
}

function getNextState(state) {
  return data.mutableStateList[(data.mutableStateList.indexOf(state) + 1) % data.mutableStateList.length];
}

function fillColor(state) {
  const ind = data.stateList.indexOf(state);
  if (ind === -1) 
    return 'white';

  return data.stateColor[ind];
}

const initRule = parseRule(data.ruleStringArray, data.separatorTransition, data.separatorState);
const initSuperRule = parseSuperRule(data.superRuleStringArray, data.separatorTransition, data.separatorState, data.dt);
const initLocalMapping = parseLocalMapping(data.localMappingFixeStringArray, data.localMappingChangeStringArray, 
                                        data.separatorTransition, data.separatorState, data.dt);
const dt = data.dt;
const outSpaceState = data.outSpaceState;
const nCellLeft = data.nCellLeft;
const nCellRight = data.nCellRight;

export { initRule, initSuperRule, initLocalMapping, outSpaceState, 
          nCellLeft, nCellRight, dt, getNextState, getInitGConfig, fillColor };

