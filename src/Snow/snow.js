import {Group,Shape} from "konva";
import { each } from "lodash";
import { Trunk } from "./trunk";

export default class Snow {
  constructor(option) {
    const defaultOption = {
      size: 100, // 雪花的宽度
      sheetNumber: Math.round(Math.random() * 5 + 5), //5-11 //几片叶子
      isFill: Math.round(Math.random()) === 1, //是否填充
      numSpurs: null
    };
    this.snow = { ...defaultOption, ...option };
    this.init();
  }
  init() {
    this.group = new Group();
    this.deg = 0;
    this.move = {
      x: 0,
      y: 0
    };
    this.createModal();
    this.startDraw();
  }

  setAttr(color){
    this.group.destroyChildren();
    this.orginModal.stroke(color||'red');
    this.startDraw()
  }

  startDraw() {
    for (let i = 0; i < this.snow.sheetNumber; i++) {
      const cloneOrgin = this.orginModal.clone();
      cloneOrgin.rotation((360 / this.snow.sheetNumber) * i);

      this.group.add(cloneOrgin);
    }
  }

  createModal() {
    const truck = new Trunk(this.snow.size, this.snow.numSpurs);
    let that = this;
    const { path } = truck;
    this.orginModal = new Shape({
      x: 0, // 开始的原点
      y: 0,
      sceneFunc: function(context, shape) {
        // context.fillStrokeShape(shape);
        context.beginPath();
        each(path, item => {
          context.moveTo(item.target.x, item.target.y);
          context.lineTo(item.source.x, item.source.y);
          context.moveTo(item.target.x, -item.target.y);
          context.lineTo(item.source.x, -item.source.y);
        });

        context.moveTo(path[0].target.x, path[0].target.y);
        each(path, item => {
          context.lineTo(item.source.x, item.source.y);
        });
        const pathmapping = [...path].reverse();
        each(pathmapping, item => {
          context.lineTo(item.source.x, -item.source.y);
        });
        context.lineTo(path[0].target.x, path[0].target.y);
        that.snow.isFill
          ? context.fillStrokeShape(shape)
          : context.strokeShape(shape);
      },
      fill: "rgb(235 232 224 / 30%)",
      stroke: "rgb(235 232 224 / 80%)",
      strokeWidth: 1
    });
    // this.orginModal.shadowColor('green');
    // this.orginModal.fill('green');
  }
}
