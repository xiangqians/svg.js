# 简介
通过js object操作SVG。


# demo
demo片段：
```javascript
require(["svg"], function (SvgModule) {

    // SVG
    var svg = new SvgModule.SVG();
    svg.build();
    var $svg = svg.get$svg();
    console.log("svg", svg);
    var $div = $("#test");
    $div.append($svg);

    // Circle
    var circle = new SvgModule.Circle(null, null, 100, 100, 60);
    circle.build();
    $svg.append(circle.get$shape());

    // 设置R
    circle.setR(20);
    // ...
});
```
完整demo见```demo/main.js```


# 文档
Documentation

## Style
css样式

### Constructor
Style (stroke, strokeWidth, fill, fillRule)

|  属性   | 描述  |
|  ----  | ----  |
| stroke  | stroke |
| strokeWidth  | stroke-width |
| fill  | fill |
| fillRule  | fill-rule |

### Method
| 方法 | 描述 | 
| ---- | ---- |
| getStroke() |  |
| setStroke(value) |  |
| getStrokeWidth() |  |
| setStrokeWidth(value) |  |
| getFill() |  |
| setFill(value) |  |
| getFillRule() |  |
| setFillRule(value) |  |

## SVG
### Constructor
SVG (id, xmlns, version, width, height, style)

|  属性   | 描述  |
|  ----  | ----  |
| id  | 唯一标识ID |
| xmlns  | xmlns |
| version  | 版本 |
| width  | 宽度 |
| height  | 高度 |
| style  | 样式 |


### Method
| 方法 | 描述 | 
| ---- | ---- |
| getId() |  |
| setId(value) |  |
| getXmlns() |  |
| setXmlns(value) |  |
| getVersion() |  |
| setVersion(value) |  |
| getWidth() |  |
| setWidth(value) |  |
| getHeight() |  |
| setHeight(value) |  |
| getStyle() |  |
| setStyle(value) |  |

## Circle
SVG 圆形 - &lt;circle&gt;

### Constructor
Circle (id, style, cx, cy, r)

|  属性   | 描述  |
|  ----  | ----  |
| id  | id |
| style  | 样式 |
| cx  | cx属性定义圆点的x坐标，如果省略cx和cy，圆的中心会被设置为(0, 0) |
| cy  | cy属性定义圆点的y坐标 |
| r  | r属性定义圆的半径 |

### Method
| 方法 | 描述 | 
| ---- | ---- |
| getId() |  |
| setId(value) |  |
| getStyle() |  |
| setStyle(value) |  |
| getCx() |  |
| setCx(value) |  |
| getCy() |  |
| setCy(value) |  |
| getR() |  |
| setR(value) |  |

## Rect
SVG 矩形 - &lt;rect&gt;

## Ellipse
SVG 椭圆 - &lt;ellipse&gt;

## Line
SVG 直线 - &lt;line&gt;

## Polygon
SVG 多边形 - &lt;polygon&gt;

## Polyline
SVG 曲线 - &lt;polyline&gt;

## Path
SVG 路径 - &lt;path&gt;

## Text
SVG 文本 - &lt;text&gt;


