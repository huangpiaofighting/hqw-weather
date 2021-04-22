function getPolarPoint(distance, degree) {
  let radian = (degree * Math.PI) / 180;
  return {
    x: distance * Math.cos(radian),
    y: distance * Math.sin(radian) 
  };
}
class Trunk {
  constructor(snowWith,numSpurs) { 
    this.length = snowWith/2;
    this.tip = {
      x: 0,
      y: 0
    };
    this.path = [];
    this.spurDeets = [];
    this.numSpurs =numSpurs || Math.round(Math.random() * 2 + 8); //8-10个
    this.generate();
    this.buildSpurs();
  }
  generate() {
    let step = (this.length) / this.numSpurs;
    for (let i = 0; i < this.numSpurs; i++) {
      let spurDeetObj = {};
      spurDeetObj.step = step;
      spurDeetObj.spurLength =
        step * i + (Math.random() * (i === this.numSpurs - 1 ? 5 : 30) + 5);
      spurDeetObj.spurRotation = Math.random() * 10 + (i === 0 ? 30 : 5);
      this.spurDeets.push(spurDeetObj);
    }
  }
  buildSpurs() {
    this.path.push({
      target: this.tip,
      source: this.tip
    });
    for (let i = 0; i < this.numSpurs; i++) {
      let spurDeet = this.spurDeets[i];
      let root = getPolarPoint(spurDeet.step * i, 0);
      this.path.push({
        target: root,
        source: getPolarPoint(
          spurDeet.spurLength,
          spurDeet.spurRotation,
        )
      });
    }
    this.path.push({
      target: this.tip,
      source: getPolarPoint(this.spurDeets[this.numSpurs - 1].step * (this.numSpurs - 1), 0, this.tip)
    });
  }
}
export { Trunk, getPolarPoint };
