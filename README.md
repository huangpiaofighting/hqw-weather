# hqw-weather

用于天气皮肤

现有 [Snow]

暂未开发 [Rain Sun Wind Flower Leaf]

该版本有内存泄漏问题，在修复中严禁使用

## 安装

```bash
yarn add hqw-weather
```

## API

Snow

## 例子

```javascript
import React from 'react';
import Snow from 'hqw-weather';

export default function Example() {
  return (
    <>
      <Snow  />
    </>
  );
}
```

## 版本日志

- 1.0.0  创建模型 snow
- 1.0.1  修复入口bug
- 1.0.2  添加背景色
- 1.0.3  添加定时开关，和手动开关动画 解决性能问题
- 1.0.4  减少打包大小
- 1.0.5  修复入口bug
- 2.0.0  删除不必要的文件
