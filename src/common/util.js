// util
define(["jquery"], function ($) {

    var obj = {};

    /**
     * @param namespaceURI
     * @param qualifiedName
     * @returns {*|jQuery|HTMLElement}
     */
    obj.createElementNS = function (namespaceURI, qualifiedName) {
        return $(document.createElementNS(namespaceURI, qualifiedName));
    };


    /**
     * get element by id
     * @param id
     * @returns {jQuery}
     */
    obj.getElementById = function (id) {
        return $("#" + id);
    };

    /**
     * 复制内容
     * @param element document element
     * @returns {boolean}
     */
    obj.copyByElement = function (element) {
        // windows选中的方法
        window.getSelection().selectAllChildren(element);

        // 执行浏览器复制命令
        return document.execCommand('copy');
    };

    /**
     * 复制内容
     * @param elementId document element id
     * @returns {boolean}
     */
    obj.copyByElementId = function (elementId) {
        var element = document.getElementById(elementId);
        return obj.copyByElement(element);
    };

    /**
     * 复制文本内容
     * @param element document element: input/textarea
     * @returns {boolean}
     */
    obj.copyTextByElement = function (element) {
        // select()方法用于选择该元素中的文本。
        element.select();

        // 执行浏览器复制命令
        return document.execCommand("copy");
    };

    /**
     * 复制文本内容
     * @param elementId document element id
     * @returns {*}
     */
    obj.copyTextByElementId = function (elementId) {
        var element = document.getElementById(elementId);
        return obj.copyTextByElement(element);
    };


    /**
     * has property
     * @param object
     * @param propertyName
     * @returns {boolean}
     */
    obj.hasProperty = function (object, propertyName) {
        return propertyName in object;
    };

    /**
     * has function
     * @param object
     * @param fnName
     * @returns {boolean}
     */
    obj.hasFn = function (object, fnName) {
        return fnName in object;
    };

    /**
     * arguments to arr
     * @param args
     * @param index
     * @returns {Array}
     */
    obj.arguments2arr = function (args, index) {
        if (obj.isUndefined(index)) {
            index = 0;
        }
        var arr = [];
        for (var i = index, len = args.length; i < len; i++) {
            arr.push(args[i]);
        }
        return arr;
    };

    obj.isType = function (object, type) {
        return object instanceof type;
    };


    /**
     * 是否未定义
     * @param object
     * @returns {boolean}
     */
    obj.isUndefined = function (object) {
        return object == null ? true : (object == undefined ? true : false);
    };


    /**
     * 是否是Element对象
     * @param object
     * @returns {boolean}
     */
    obj.isElementObject = function (object) {
        return object instanceof Element;
    };

    /**
     * 是否是jQuery对象
     * @param $element
     * @returns {boolean}
     */
    obj.isJQueryObject = function (object) {
        return object instanceof jQuery;
    };

    /**
     * 将element对象转为JQuery对象
     * @param element
     * @returns {jQuery}
     */
    obj.elementObjToJQueryObj = function (element) {
        if (obj.isElementObject(element)) {
            return $(element);
        }
        if (obj.isJQueryObject(element)) {
            return element;
        }
        return null;
    };

    /**
     * 将JQuery对象转为element对象
     * @param $element
     * @returns {HTMLElement}
     */
    obj.jqueryObjToElementObj = function ($element) {
        if (!obj.isJQueryObject($element)) {
            return null;
        }
        return $element[0];
    };

    /**
     * is number
     * @param object
     * @returns {boolean}
     */
    obj.isNumber = function (object) {
        return obj.isUndefined(object) ? false : !isNaN(object);
    };

    /**
     * to number
     * @param object
     * @returns {number}
     */
    obj.toNumber = function (object) {
        // console.log("toNumber", object);
        if (obj.isNumber(object)) {
            return parseInt(object);
        }
        throw "Cannot be converted to number, " + object;
    };

    /**
     * JSON对象转化为JSON字符串
     * @param value any
     * @param replacer replacer?: (key: string, value: any) => any
     * @param space space?: string | number
     * @returns {string}
     */
    obj.object2json = function (value, replacer, space) {
        // 使用JSON.stringify()方法进行转换，该方法不支持较老版本的IE浏览器，比如：ie8(兼容模式)、ie7、ie6。
        return JSON.stringify(value, replacer, space);
    };

    /**
     * 格式化JSON字符串
     * @param value
     * @param space
     * @returns {string}
     */
    obj.formatJson = function (value, space) {
        if (obj.isUndefined(space)) {
            space = 4;
        }
        // var json = JSON.stringify(value, null, '\t'); // 缩进一个tab
        // var json = JSON.stringify(value, null, 4); // 缩进4个空格
        return JSON.stringify(value, null, space);
    };

    /**
     * 压缩JSON字符串
     * @param value
     * @returns {string}
     */
    obj.compressionJson = function (value) {
        return JSON.stringify(value);
    };

    /**
     * object to json
     * @param json
     * @returns {object}
     */
    obj.json2object = function (json) {
        // 使用jQuery $.parseJSON() 方法进行转换，而且可以确保各个浏览器的兼容性。
        return $.parseJSON(json);
    };

    return obj;
});