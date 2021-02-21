// svg
define(["jquery", "util", "object"], function ($, UtilModule, ObjectModule) {

    var obj = {};

    // ############### Node ###############

    /**
     * Node
     * @param type 节点类型，{@code 1} ElementNode元素节点，{@code 2} AttributeNode属性节点，{@code 3} TextNode文本节点。
     * @param name 节点名
     * @param value 节点值，注意，元素节点没有value值
     * @constructor
     */
    obj.Node = function (type, name, value) {
        this.type = type;
        this.name = name;
        this.value = value;
    };

    /**
     * 初始化Element
     * @param $element
     * @private
     */
    obj.Node.prototype._initElement_ = function ($element) {
        var node = this;
        if (UtilModule.isUndefined(node.value)) {
            return;
        }

        // ElementNode元素节点
        if (node.type === 1) {

        }
        // AttributeNode属性节点
        else if (node.type === 2) {
            $element.attr(node.name, node.value);
        }
        // TextNode文本节点
        else if (node.type === 3) {
            $element.text(node.value);
        }
    };

    /**
     * 构建Node
     * @param type
     * @param name
     * @param value
     * @param defaultValue 默认值
     * @returns {*}
     * @private
     */
    obj.Node._build_ = function (type, name, value, defaultValue) {
        if (UtilModule.isType(value, obj.Node)) {
            return value;
        }
        return new obj.Node(type, name, UtilModule.isUndefined(value) ? defaultValue : value);
    };


    // ############### Style ###############

    /**
     * Element Style
     * @param stroke
     * @param strokeWidth
     * @param fill
     * @param fillRule
     * @constructor
     */
    obj.Style = function (stroke, strokeWidth, fill, fillRule) {
        this.$element = null;
        this.stroke = obj.Node._build_(2, "stroke", stroke, "black");
        this.strokeWidth = obj.Node._build_(2, "stroke-width", strokeWidth, 2);
        this.fill = obj.Node._build_(2, "fill", fill, "gray");
        this.fillRule = obj.Node._build_(2, "fill-rule", fillRule);
        // fill-opacity:0.1;
        // stroke-opacity:0.9
    };
    ObjectModule.inherit(obj.Style, ObjectModule.Object);

    /**
     * init element
     * @param $element
     * @private
     */
    obj.Style.prototype._initElement_ = function ($element) {
        this.$element = $element;
        var keys = Object.keys(this);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = this[key];

            // Node
            if (UtilModule.isType(value, obj.Node)) {
                var node = value;
                node._initElement_(this.$element);
            }
        }
        this.__init__();
    };

    obj.Style.prototype.__generateGetterSettings__ = function (key, value) {
        var fn = null;
        if (UtilModule.isType(value, obj.Node)) {
            const node = value;
            fn = function () {
                return node.value;
            }
        }

        // settings
        var settings = {
            isGenerate: true,
            namingMethod: "Camel-Case",
            fn: fn,
        };
        return settings;
    };

    obj.Style.prototype.__generateSetterSettings__ = function (key, value) {
        const self = this;
        var fn = null;
        if (UtilModule.isType(value, obj.Node)) {
            const node = value;

            // function
            fn = function (value) {
                node.value = value;

                // ElementNode元素节点
                if (node.type === 1) {
                }
                // AttributeNode属性节点
                else if (node.type === 2) {
                    self.$element.attr(node.name, node.value);
                }
                // TextNode文本节点
                else if (node.type === 3) {
                    self.$element.text(node.value);
                }
                return true;
            }
        }

        // settings
        var settings = {
            isGenerate: true,
            namingMethod: "Camel-Case",
            fn: fn,
        };
        return settings;
    };

    /**
     * 构建Style
     * @param value
     * @returns {*}
     * @private
     */
    obj.Style._build_ = function (value) {
        if (UtilModule.isType(value, obj.Style)) {
            return value;
        }
        return new obj.Style();
    };


    // ############### Point ###############

    obj.Point = function (x, y) {
        this.x = x;
        this.y = y;
    };


    // ############### SVG ###############

    /**
     * SVG
     * @param id
     * @param xmlns
     * @param version
     * @param width
     * @param height
     * @param style
     * @constructor
     */
    obj.SVG = function (id, xmlns, version, width, height, style) {
        ObjectModule.Object.call(this);
        this.$svg = null;
        this.xmlns = obj.Node._build_(2, "xmlns", xmlns, obj.SVG.DEFAULT_XMLNS);
        this.version = obj.Node._build_(2, "version", version, "1.1");
        this.width = obj.Node._build_(2, "width", width, 800);
        this.height = obj.Node._build_(2, "height", height, 600);
        this.style = obj.Style._build_(style);
    };

    /**
     * xmlns默认值
     * @type {string}
     * @private
     */
    obj.SVG._DEFAULT_XMLNS_ = "http://www.w3.org/2000/svg";

    /**
     *
     * @param tagName
     * @returns {*|jQuery|HTMLElement}
     * @private
     */
    obj.SVG._createTagElement_ = function (tagName) {
        return UtilModule.createElementNS(obj.SVG._DEFAULT_XMLNS_, tagName);
    };

    ObjectModule.inherit(obj.SVG, ObjectModule.Object);

    /**
     * init element
     * @private
     */
    obj.SVG.prototype._initElement_ = function () {
        var keys = Object.keys(this);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = this[key];

            // Node
            if (UtilModule.isType(value, obj.Node)) {
                var node = value;
                node._initElement_(this.$svg);
            }
            // Style
            else if (UtilModule.isType(value, obj.Style)) {
                var style = value;
                style._initElement_(this.$svg);
            }
        }
    };

    obj.SVG.prototype.__generateGetterSettings__ = function (key, value) {
        var fn = null;
        if (UtilModule.isType(value, obj.Node)) {
            const node = value;
            fn = function () {
                return node.value;
            }
        }

        // settings
        var settings = {
            isGenerate: true,
            namingMethod: "Camel-Case",
            fn: fn,
        };
        return settings;
    };

    obj.SVG.prototype.__generateSetterSettings__ = function (key, value) {
        const self = this;
        var fn = null;
        if (UtilModule.isType(value, obj.Node)) {
            const node = value;

            // function
            fn = function (value) {
                node.value = value;

                // ElementNode元素节点
                if (node.type === 1) {
                }
                // AttributeNode属性节点
                else if (node.type === 2) {
                    self.$svg.attr(node.name, node.value);
                }
                // TextNode文本节点
                else if (node.type === 3) {
                    self.$svg.text(node.value);
                }
                return true;
            }
        }

        // settings
        var settings = {
            isGenerate: true,
            namingMethod: "Camel-Case",
            fn: fn,
        };
        return settings;
    };

    /**
     * build
     */
    obj.SVG.prototype.build = function () {
        this.__init__();
        var $svg = obj.SVG._createTagElement_("svg");
        this.$svg = $svg;
        this._initElement_();
    };

    // ############### Shape ###############

    /**
     * 形状
     * @param id Shape唯一标识ID
     * @param style 样式
     * @constructor
     */
    obj.Shape = function (id, style) {
        ObjectModule.Object.call(this);
        this.$shape = null;
        this.id = obj.Node._build_(2, "id", id);
        this.style = obj.Style._build_(style);
    };
    ObjectModule.inherit(obj.Shape, ObjectModule.Object);

    /**
     * init element
     * @private
     */
    obj.Shape.prototype._initElement_ = function () {
        var keys = Object.keys(this);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = this[key];

            // Node
            if (UtilModule.isType(value, obj.Node)) {
                var node = value;
                node._initElement_(this.$shape);
            }
            // Style
            else if (UtilModule.isType(value, obj.Style)) {
                var style = value;
                style._initElement_(this.$shape);
            }
        }
    };

    obj.Shape.prototype.__generateGetterSettings__ = function (key, value) {
        var fn = null;
        if (UtilModule.isType(value, obj.Node)) {
            const node = value;
            fn = function () {
                return node.value;
            }
        }

        // settings
        var settings = {
            isGenerate: true,
            namingMethod: "Camel-Case",
            fn: fn,
        };
        return settings;
    };

    obj.Shape.prototype.__generateSetterSettings__ = function (key, value) {
        const self = this;
        var fn = null;
        if (UtilModule.isType(value, obj.Node)) {
            const node = value;

            // function
            fn = function (value) {
                node.value = value;

                // ElementNode元素节点
                if (node.type === 1) {
                }
                // AttributeNode属性节点
                else if (node.type === 2) {
                    self.$shape.attr(node.name, node.value);
                }
                // TextNode文本节点
                else if (node.type === 3) {
                    self.$shape.text(node.value);
                }
                return true;
            }
        }

        // settings
        var settings = {
            isGenerate: true,
            namingMethod: "Camel-Case",
            fn: fn,
        };
        return settings;
    };

    /**
     * build
     */
    obj.Shape.prototype.build = function () {
        this.__init__();
        var $shape = obj.SVG._createTagElement_(this.tagName());
        this.$shape = $shape;
        this._initElement_();
    };

    /**
     * tag name
     * @returns {null}
     */
    obj.Shape.prototype.tagName = function () {
        return null;
    };

    // ############### Circle ###############

    /**
     * SVG 圆形 - <circle>
     * <circle> 标签可用来创建一个圆。
     * @param id
     * @param style
     * @param cx cx属性定义圆点的x坐标，如果省略cx和cy，圆的中心会被设置为(0, 0)
     * @param cy cy属性定义圆点的y坐标
     * @param r r属性定义圆的半径
     * @constructor
     */
    obj.Circle = function (id, style, cx, cy, r) {
        obj.Shape.call(this, id, style);
        this.cx = obj.Node._build_(2, "cx", cx);
        this.cy = obj.Node._build_(2, "cy", cy);
        this.r = obj.Node._build_(2, "r", r);
    };
    ObjectModule.inherit(obj.Circle, obj.Shape);
    obj.Circle.prototype.tagName = function () {
        return "circle";
    };

    // ############### Rect ###############

    /**
     * SVG 矩形 - <rect>
     * <rect> 标签可用来创建矩形，以及矩形的变种。
     * @param id
     * @param style style属性用来定义CSS属性
     * CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
     * CSS 的 stroke-width 属性定义矩形边框的宽度
     * CSS 的 stroke 属性定义矩形边框的颜色
     * CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
     * CSS 的 stroke-opacity 属性定义轮廓颜色的透明度（合法的范围是：0 - 1）
     * CSS opacity 属性用于定义了元素的透明值 (范围: 0 到 1)。
     * @param x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
     * @param y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
     * @param width  定义矩形的宽度
     * @param height 定义矩形的高度
     * @param rx 可使矩形产生圆角
     * @param ry 可使矩形产生圆角
     * @constructor
     */
    obj.Rect = function (id, style, x, y, width, height, rx, ry) {
        obj.Shape.call(this, id, style);
        this.x = obj.Node._build_(2, "x", x)
        this.y = obj.Node._build_(2, "y", y)
        this.width = obj.Node._build_(2, "width", width)
        this.height = obj.Node._build_(2, "height", height)

        // 带圆角矩形
        this.rx = obj.Node._build_(2, "rx", rx)
        this.ry = obj.Node._build_(2, "ry", ry)
    };
    ObjectModule.inherit(obj.Rect, obj.Shape);
    obj.Rect.prototype.tagName = function () {
        return "rect";
    };


    // ############### Ellipse ###############

    /**
     * SVG 椭圆 - <ellipse>
     * <ellipse> 元素是用来创建一个椭圆。
     * 椭圆与圆很相似。不同之处在于椭圆有不同的x和y半径，而圆的x和y半径是相同的。
     * @param id
     * @param style
     * @param cx 属性定义的椭圆中心的x坐标
     * @param cy 属性定义的椭圆中心的y坐标
     * @param rx 属性定义的水平半径
     * @param ry 属性定义的垂直半径
     * @constructor
     */
    obj.Ellipse = function (id, style, cx, cy, rx, ry) {
        obj.Shape.call(this, id, style);
        this.cx = obj.Node._build_(2, "cx", cx)
        this.cy = obj.Node._build_(2, "cy", cy)
        this.rx = obj.Node._build_(2, "rx", rx)
        this.ry = obj.Node._build_(2, "ry", ry)
    };
    ObjectModule.inherit(obj.Ellipse, obj.Shape);
    obj.Ellipse.prototype.tagName = function () {
        return "ellipse";
    };

    // ############### Line ###############

    /**
     * SVG 直线 - <line>
     * <line> 元素是用来创建一个直线。
     * @param id
     * @param style
     * @param x1 属性在x轴定义线条的开始
     * @param y1 属性在y轴定义线条的开始
     * @param x2 属性在x轴定义线条的结束
     * @param y2 属性在y轴定义线条的结束
     * @constructor
     */
    obj.Line = function (id, style, x1, y1, x2, y2) {
        obj.Shape.call(this, id, style);
        this.x1 = obj.Node._build_(2, "x1", x1);
        this.y1 = obj.Node._build_(2, "y1", y1);
        this.x2 = obj.Node._build_(2, "x2", x2);
        this.y2 = obj.Node._build_(2, "y2", y2);
    };
    ObjectModule.inherit(obj.Line, obj.Shape);
    obj.Line.prototype.tagName = function () {
        return "line";
    };

    // ############### Polyxxx ###############

    /**
     * @param id
     * @param style
     * @param points 多个直线点 {@link obj.Point}
     * @constructor
     */
    obj.Polyxxx = function (id, style, points) {
        obj.Shape.call(this, id, style);
        this.points = points;
    };
    ObjectModule.inherit(obj.Polyxxx, obj.Shape);

    obj.Polyxxx.prototype.__generateGetterSetter__ = function () {
        this.__super__.__generateGetterSetter__();
        const self = this;
        var points = self.points;
        for (var i = 0, len = points.length; i < len; i++) {
            var propName = "Point" + i;
            const point = points[i];

            // getter
            var fnName = null;
            var fn = null;
            this.__generateFn__("get" + propName, function () {
                return point;
            });

            // setter
            this.__generateFn__("set" + propName, function (x, y) {
                var flag = 0;
                if (!UtilModule.isUndefined(x)) {
                    point.x = x;
                    flag++;
                }
                if (!UtilModule.isUndefined(y)) {
                    point.y = y;
                    flag++;
                }

                if (flag > 0) {
                    self._initElement_();
                    return true;
                }
                return false;
            });
        }
    };
    obj.Polyxxx.prototype._initElement_ = function () {
        this.__super__._initElement_();
        this.$shape.attr("points", this._buildPointsAttributeValue_());
    };

    /**
     * 构建Points属性值
     * @returns {string}
     * @private
     */
    obj.Polyxxx.prototype._buildPointsAttributeValue_ = function () {
        var points = this.points;
        var arr = [];
        for (var i = 0, len = points.length; i < len; i++) {
            var point = points[i];
            if (!UtilModule.isType(point, obj.Point)) {
                continue;
            }
            arr.push(point.x + "," + point.y);
        }
        return arr.join(" ");
    };


    // ############### Polygon ###############

    /**
     * SVG 多边形 - <polygon>
     * <polygon> 标签用来创建含有不少于三个边的图形。
     * 多边形是由直线组成，其形状是"封闭"的（所有的线条 连接起来）。
     * Remarkpolygon来自希腊。 "Poly" 意味 "many" ， "gon" 意味 "angle"。
     * @param id
     * @param style
     * @param points
     * @constructor
     */
    obj.Polygon = function (id, style, points) {
        obj.Polyxxx.call(this, id, style, UtilModule.isType(points, Array) ? points : UtilModule.arguments2arr(arguments, 2));
    };
    ObjectModule.inherit(obj.Polygon, obj.Polyxxx);
    obj.Polygon.prototype.tagName = function () {
        return "polygon";
    };


    // ############### Polyline ###############

    /**
     * SVG曲线<polyline>
     * <polyline> 元素是用于创建任何只有直线的形状。
     * @param id
     * @param style
     * @param points
     * @constructor
     */
    obj.Polyline = function (id, style, points) {
        obj.Polyxxx.call(this, id, style, UtilModule.isType(points, Array) ? points : UtilModule.arguments2arr(arguments, 2));
    };
    ObjectModule.inherit(obj.Polyline, obj.Polyxxx);
    obj.Polyline.prototype.tagName = function () {
        return "polyline";
    };


    // ############### Path ###############

    /**
     * SVG 路径 - <path>
     * <path> 元素用于定义一个路径。
     * @param id
     * @param style
     * @constructor
     */
    obj.Path = function (id, style, ds) {
        obj.Shape.call(this, id, style);
        this.ds = UtilModule.isType(ds, Array) ? ds : UtilModule.arguments2arr(arguments, 2);
    };

    ObjectModule.inherit(obj.Path, obj.Shape);

    obj.Path.prototype.__generateGetterSetter__ = function () {
        this.__super__.__generateGetterSetter__();
        const self = this;
        var ds = self.ds;
        for (var i = 0, len = ds.length; i < len; i++) {
            const d = ds[i];
            var propName = d.name + i;

            // getter
            this.__generateFn__("get" + propName, function () {
                return d;
            });

            // setter
            this.__generateFn__("set" + propName, function (x, y) {
                var flag = 0;
                if (!UtilModule.isUndefined(x)) {
                    d.x = x;
                    flag++;
                }
                if (!UtilModule.isUndefined(y)) {
                    d.y = y;
                    flag++;
                }

                if (flag > 0) {
                    self._initElement_();
                    return true;
                }
                return false;
            });
        }
    };
    /**
     * 构建Points属性值
     * @returns {string}
     * @private
     */
    obj.Path.prototype._initDAttributeValue_ = function () {
        var ds = this.ds;
        var arr = [];
        for (var i = 0, len = ds.length; i < len; i++) {
            var d = ds[i];
            if (!UtilModule.isType(d, obj.Path.D)) {
                continue;
            }

            if (UtilModule.isType(d, obj.Path.Z)) {
                arr.push(d.name);
            } else {
                arr.push(d.name + "" + d.x + " " + d.y);
            }
        }
        this.$shape.attr("d", arr.join(" "));
    };
    obj.Path.prototype._initElement_ = function () {
        this.__super__._initElement_();
        this._initDAttributeValue_();
    };
    obj.Path.prototype._isEffectivePoint_ = function (point) {
        return !(UtilModule.isUndefined(point.x) || UtilModule.isUndefined(point.y));
    };
    obj.Path.prototype.tagName = function () {
        return "path";
    };

    /**
     * 注意：以下所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。
     * @param name 路径数据名称
     * @param isAbsolutePositioning 是否是相对定位，默认true
     * @constructor
     */
    obj.Path.D = function (name, isAbsolutePositioning) {
        this.name = UtilModule.isUndefined(isAbsolutePositioning) ? name.toUpperCase() : (isAbsolutePositioning ? name.toUpperCase() : name.toLowerCase());
    };

    /**
     * moveto
     * @constructor
     */
    obj.Path.M = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "M", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.M, obj.Path.D);

    /**
     * lineto
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.L = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "L", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.L, obj.Path.D);

    /**
     * horizontal lineto
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.H = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "H", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.H, obj.Path.D);

    /**
     * vertical lineto
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.V = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "V", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.V, obj.Path.D);

    /**
     * curveto
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.C = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "C", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.C, obj.Path.D);

    /**
     * smooth curveto
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.S = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "S", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.S, obj.Path.D);

    /**
     * quadratic Bézier curve
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.Q = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "Q", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.Q, obj.Path.D);

    /**
     * smooth quadratic Bézier curveto
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.T = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "T", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.T, obj.Path.D);

    /**
     * elliptical Arc
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.A = function (x, y, isAbsolutePositioning) {
        obj.Path.D.call(this, "A", isAbsolutePositioning);
        this.x = x;
        this.y = y;
    };
    ObjectModule.inherit(obj.Path.A, obj.Path.D);

    /**
     * closepath
     * @param x
     * @param y
     * @param isAbsolutePositioning
     * @constructor
     */
    obj.Path.Z = function (isAbsolutePositioning) {
        obj.Path.D.call(this, "Z", isAbsolutePositioning);
    };
    ObjectModule.inherit(obj.Path.Z, obj.Path.D);


    // ############### Text ###############

    /**
     * <text> 元素用于定义文本。
     * @param id
     * @param style
     * @param x X轴
     * @param y Y轴
     * @param transform 旋转文本
     * @param content 文本内容
     * @constructor
     */
    obj.Text = function (id, style, x, y, transform, content) {
        obj.Shape.call(this, id, style);
        this.x = obj.Node._build_(2, "x", x);
        this.y = obj.Node._build_(2, "y", y);
        this.transform = obj.Node._build_(2, "transform", transform);
        this.content = obj.Node._build_(3, "content", content);
    };
    ObjectModule.inherit(obj.Text, obj.Shape);
    obj.Text.prototype.tagName = function () {
        return "text";
    };

    obj.Tspan = function () {
        obj.Shape.call(this, id, style);

    };

    obj.Tspan.prototype.tagName = function () {
        return "text";
    };


    return obj;
});