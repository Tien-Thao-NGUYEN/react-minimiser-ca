export default class TransitionTable extends Map {

  get(localConfig) {
    return super.get(localConfig.join(","));
  }

  set(localConfig, value) {
    return super.set(localConfig.join(","), value);
  }

  has(localConfig) {
    /*console.log("transition table ", localConfig);*/
    return super.has(localConfig.join(","));
  }

  delete(localConfig) {
    return super.delete(localConfig.join(","));
  }

  getTable() {
    return Array.from(this).map(element => [element[0].split(","), element[1]]);
  }

  isDeterminismIfSet(localConfig, value) {
    var old_value = this.get(localConfig);
    if (old_value === undefined)
      return true;
    else
      return old_value === value;
  }
}
//Tao fct static cho viec init voi table