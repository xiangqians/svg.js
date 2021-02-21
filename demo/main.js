// config
require.config({

    // baseUrl: "tmp",
    // baseUrl: "E:\\workspace\\idea\\tmp\\requirejs",

    paths: {
        "jquery": "../src/jquery/jquery-3.5.1.min",
        "util": "../src/common/util",
        "object": "../src/common/object",
        "svg": "../src/svg/svg",
    },
});
// require(["jquery",
//     "object",
//     "svg",
// ], function (
//     $,
//     ObjectModule,
//     SvgModule) {
require(["svg"], function (SvgModule) {

    var svg = new SvgModule.SVG();
    svg.build();
    var $svg = svg.get$svg();
    // console.log("svg", svg);
    window.svg = svg;
    //
    var $div = $("#test");
    $div.append($svg);

    var shape = null;

    // =========== Circle ===========
    var circle = new SvgModule.Circle(null, null, 100, 100, 60);
    circle.build();
    $svg.append(circle.get$shape());

    circle.setR(20);

    shape = circle;

    // =========== Rect ===========
    // shape = new SvgModule.Rect(null, null, 200, 100, 50, 80);
    // shape = new SvgModule.Rect(null, null, 200, 100, 50, 80, 50, 20);
    // shape.build();
    // $svg.append(shape.$shape);

    // =========== Ellipse ===========
    // shape = new SvgModule.Ellipse(null, null, 300, 80, 100, 50);
    // shape.build();
    // $svg.append(shape.$shape);

    // =========== Line ===========
    // shape = new SvgModule.Line(null, null, 300, 80, 100, 50);
    // shape.build();
    // $svg.append(shape.$shape);

    // =========== Polygon ===========

    // 三角形
    // shape = new SvgModule.Polygon(null, null, new SvgModule.Point(200, 10), new SvgModule.Point(250, 190), new SvgModule.Point(160, 210));
    // shape.build();
    // $svg.append(shape.$shape);

    // 四边形
    // shape = new SvgModule.Polygon(null, new SvgModule.Style("purple", 1, "lime"),
    //     new SvgModule.Point(220, 10),
    //     new SvgModule.Point(300, 210),
    //     new SvgModule.Point(170, 250),
    //     new SvgModule.Point(123, 234));
    // shape.build();
    // $svg.append(shape.$shape);

    // 一个星星
    // shape = new SvgModule.Polygon(null, new SvgModule.Style("purple", 5, "lime", "nonzero"),
    //     new SvgModule.Point(100, 10),
    //     new SvgModule.Point(40, 198),
    //     new SvgModule.Point(190, 78),
    //     new SvgModule.Point(10, 78),
    //     new SvgModule.Point(160, 198));
    // shape.build();
    // $svg.append(shape.$shape);

    // 另一个星星
    // shape = new SvgModule.Polygon(null, new SvgModule.Style("purple", 5, "lime", "evenodd"),
    //     new SvgModule.Point(100, 10),
    //     new SvgModule.Point(40, 198),
    //     new SvgModule.Point(190, 78),
    //     new SvgModule.Point(10, 78),
    //     new SvgModule.Point(160, 198));
    // shape.build();
    // $svg.append(shape.$shape);


    // =========== Polyline ===========

    // 折线
    // shape = new SvgModule.Polyline(null, new SvgModule.Style("black", 3, "none"),
    //     new SvgModule.Point(20, 20),
    //     new SvgModule.Point(40, 25),
    //     new SvgModule.Point(60, 40),
    //     new SvgModule.Point(80, 120),
    //     new SvgModule.Point(120, 140),
    //     new SvgModule.Point(200, 180));
    // shape.build();
    // $svg.append(shape.$shape);

    // 另一个折线
    // shape = new SvgModule.Polyline(null, new SvgModule.Style("red", 4, "white"),
    //     new SvgModule.Point(0, 40),
    //     new SvgModule.Point(40, 40),
    //     new SvgModule.Point(40, 80),
    //     new SvgModule.Point(80, 80),
    //     new SvgModule.Point(80, 120),
    //     new SvgModule.Point(120, 120),
    //     new SvgModule.Point(120, 160));
    // shape.build();
    // $svg.append(shape.$shape);


    // =========== Text ===========

    // shape = new SvgModule.Text(null, null, 200, 60, "rotate(30 20,40)", "Hello");
    // shape.build();
    // $svg.append(shape.$shape);


    // =========== Path ===========

    // shape = new SvgModule.Path(null, null,
    //     new SvgModule.Path.M(150, 0),
    //     new SvgModule.Path.L(75, 200),
    //     new SvgModule.Path.L(225, 200),
    //     new SvgModule.Path.Z());
    // shape.build();
    // $svg.append(shape.$shape);


    window.shape = shape;
    console.log("shape", window.shape);


    //===================================

    // var user = new ObjectModule.User();
    // console.log("user", user);
    // user.info();
    // window.user = user;


    console.log("require.js load done");
});


