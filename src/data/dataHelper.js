import MazoyerSolutionDataDt1 from './data';
import TransitionTable from '../simulator/TransitionTable';

function getIndexLinkedList() {
  return MazoyerSolutionDataDt1["index_linker_list"]
    .map(string => string.split(" ").map(e => parseInt(e))).map(arr => {
      var lc = [arr[0],arr[1],arr[2]];
      var res = arr[3];
      return [lc, res];
    });
}

function getSuperRuleIndex() {
  var superRule = [];
  var indexLinked = getIndexLinkedList();
  var resLocList = MazoyerSolutionDataDt1["result_location_list"];
  for (var   i = 0; i < indexLinked.length; i++) {
    var obj = {
                key: indexLinked[i][0],
                val: indexLinked[i][1],
                size: resLocList[i][0],
                time: resLocList[i][1],
                position: resLocList[i][2]
              };

    superRule.push(obj);
  }

  /*console.log(superRule);*/

  return superRule;
}

function getSuperRule() {
  const superRule = [...MazoyerSolutionDataDt1["slt_table"]["1"], 
                      ...MazoyerSolutionDataDt1["slt_table"]["2"]];
  return superRule.map( string => {
    var srString = string.split(" ");
    var quintuplet = srString[0].split("");
    var triplet = srString[1].split("");
    return [quintuplet, triplet];
  } );  
}

function getLocalMapping() {
  var localMapping =  [...MazoyerSolutionDataDt1["local_mapping"]["0"],
                        ...MazoyerSolutionDataDt1["local_mapping"]["1"]];
  var changeable_index_list = MazoyerSolutionDataDt1["changeable_index_list"];
  changeable_index_list.forEach(e => localMapping[e].push(true));
  return localMapping;
}

function getRule() {
  var rule = new TransitionTable();
  MazoyerSolutionDataDt1["local_mapping"]["1"].forEach(([lc, res]) => rule.set(lc, res));
  return rule;
}

var initialSuperRuleIndex = getSuperRuleIndex();
var initialLocalMapping = getLocalMapping();
var initialSuperRule = getSuperRule();
var initialRule = getRule();

const stateArray = ["0", "1", "2", "3", "4"];
function getNextState(state) {
  return stateArray[(stateArray.indexOf(state) + 1) % stateArray.length];
}

function getInitialGConfig(size) {
  if (size === 0)
    return [];

  const gc0 = ["1"];
  for (var i = 1; i < size; i++)
    gc0.push("0");

  return gc0;
}

var outSpaceState = MazoyerSolutionDataDt1["outSpaceState"];
var nCellLeft = 1;
var nCellRight = 1

//can phai lam lai cai ghi vao JSON
export { outSpaceState, initialSuperRuleIndex, initialLocalMapping, initialSuperRule, 
  initialRule, getNextState, getInitialGConfig, nCellLeft, nCellRight}