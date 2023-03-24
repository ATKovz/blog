## 问题描述

1. 所有组件多语言异常，设置ConfigProvider无效

- 解决方案

因为context不一致，使用组件库下的provider导出

2. 生效后日期组件混合中英文，月份和周显示异常

- 解决方案

确保yarn.lock 里 moment 版本只有一个 ，同时在 provider 处引入 moment/locale/zh-CN，本次使用的是 2.29.4解决

