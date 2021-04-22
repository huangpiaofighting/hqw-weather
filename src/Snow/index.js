import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import {Stage,Layer,Animation,Group} from "konva";
import { each, remove } from "lodash";
import classnames from "classnames";
import styles from "./index.less";
import Snow from "./snow";

class SnowScanner extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onChange: PropTypes.func
  };
  state = {
    open: true,
  };
  static defaultProps = {
    open: true,
    onChange: ()=>{}
  };
  constructor() {
    super();
    this.canvasRef = createRef();
    this.groupsnowList = [];
    this.config = {
      maxHeight: 800
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.open !== state.open ) {
      return {
        open: props.open,
      };
    }
    return null;
  }

  componentDidMount() {
    const containerWidth = this.canvasRef.current.getBoundingClientRect().width;
    const containerHeight = this.canvasRef.current.getBoundingClientRect()
      .height;
    this.stage = new Stage({
      container: this.canvasRef.current, // 可以是个string 或者 是个el
      width: containerWidth,
      height: containerHeight
    });
    //设置原点
    // this.stage.x(this.stage.width() / 2);
    // this.stage.y(this.stage.height() / 2);
    this.layer = new Layer();
    this.layer.destroy();
    this.randomSnow();
    this.stage.add(this.layer);
    let times = 0;
    this.anim = new Animation(frame => {
      times = times + 1;
      if (times % 50 == 0) {
        this.randomSnow();
      }
      this.draw();
    }, this.layer);

    this.anim.start();
  }
  onClickCanvas() {
    this.setState({
      open: !this.state.open
    });
    this.props.onChange && this.props.onChange(!this.state.open);
  }
  draw() {
    each(this.groupsnowList, groupList => {
      if (!groupList.group) {
        groupList.group = new Group();
      }
      each(groupList.data, snow => {
        snow.deg = snow.deg + (Math.random() * 5) / 10;
        snow.group.rotation(snow.deg);
        let opt = 0.5 - groupList.group.y() / this.stage.height();
        opt = opt < 0 ? 0 : opt;
        snow.setAttr(`rgba(235, 232, 224, ${opt})`);
        groupList.group.add(snow.group);
      });
      groupList.group.move({
        x: 0,
        y: 1
      });
      this.layer.add(groupList.group);
    });
    remove(this.groupsnowList, groupList => {
      if (groupList.group.y() > this.config.maxHeight) {
        groupList.group.destroy();
        return true;
      }
      return false;
    });
  }
  randomSnow() {
    let currentShowList = [];
    let currentTimeSnowTotal = Math.ceil(Math.random() * 8 + 2); // 1-10
    for (let i = 0; i < currentTimeSnowTotal; i++) {
      const snow = new Snow({
        numSpurs: Math.ceil(Math.random() * 200 + 2),
        sheetNumber: Math.ceil(Math.random() * 5 + 2)
      });
      const scale = Math.ceil(Math.random() * 5) / 10;
      snow.group.scale({
        x: scale,
        y: scale
      });
      snow.group.x(Math.ceil(Math.random() * this.stage.width() + 50));
      snow.group.y(Math.ceil(Math.random() * 100 - 50));
      currentShowList.push(snow);
    }
    this.groupsnowList.push({
      data: currentShowList
    });
    return currentShowList;
  }
  componentDidUpdate() {
    if (this.state.open) {
      this.anim.start();
    } else {
      this.anim.stop();
    }
  }
  render() {
    let canvasContainer = classnames({
      [styles.canvasContainer]: true,
      [styles.closeContainer]: !this.state.open
    });
    return (
      <>
        <div
          onClick={this.onClickCanvas.bind(this)}
          className={canvasContainer}
          ref={this.canvasRef}
        />
      </>
    );
  }
}

export default SnowScanner;
