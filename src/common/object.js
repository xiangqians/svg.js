// object
define(["jquery", "util"], function ($, UtilModule) {

    var obj = {};

    /**
     * 寄生组合式继承
     * 继承父类属性；覆盖父类方法。
     * @param subType 子类类型
     * @param superType 父类类型
     */
    obj.inherit = function (subType, superType) {
        // 在 new Fn() 的时候将构造函数指向子类
        function Fn() {
            // 修复实例
            this.constructor = subType
        }

        // new Fn()实例的原型继承了父类函数的原型
        Fn.prototype = superType.prototype;

        // 将子类的原型指向父类原型的一个副本
        subType.prototype = new Fn();
    };

    /**
     * Object
     * @constructor
     */
    obj.Object = function () {
    };

    /**
     * init Object
     * @private
     */
    obj.Object.prototype.__init__ = function () {
        this.__initSuper__();
        this.__generateGetterSetter__();
    };

    /**
     * super object
     * @type {{__currentPrototype__: null}}
     * @private
     */
    obj.Object.prototype.__super__ = null;

    /**
     * 初始化super function
     * @private
     */
    obj.Object.prototype.__initSuper__ = function () {
        this.__super__ = {
            // 当前prototype
            __currentPrototype__: null
        };

        const self = this;
        var prototype = self;
        while (prototype != null) {
            // console.log("prototype", prototype instanceof obj.Object, prototype instanceof Object, prototype);
            // if (!UtilModule.isType(prototype, obj.Object)) {
            if (!UtilModule.isType(prototype, Object)) {
                // prototype = Object.getPrototypeOf(prototype);
                // console.warn("prototype", prototype instanceof obj.Object, prototype instanceof Object, prototype);
                break;
            }

            //
            var keys = Object.keys(prototype);
            for (var i = 0, len = keys.length; i < len; i++) {
                const key = keys[i];
                if ("constructor" === key) {
                    continue;
                }

                var value = prototype[key];
                if (!UtilModule.isType(value, Function)) {
                    continue;
                }

                self.__super__[key] = function () {
                    var currentPrototype = self.__super__.__currentPrototype__;
                    var isReset = false;
                    if (UtilModule.isUndefined(currentPrototype)) {
                        currentPrototype = self.__getPrototype__(key);
                        isReset = true;
                    }
                    currentPrototype = self.__getPrototype__(key, currentPrototype);
                    if (currentPrototype == null) {
                        console.warn("Did not find", "'" + key + "'", "method,", self);
                        return;
                    }
                    // console.log("find", "'" + key + "'", "method,", self);

                    self.__super__.__currentPrototype__ = currentPrototype;
                    currentPrototype[key].apply(self, [].concat(UtilModule.arguments2arr(arguments)));

                    if (isReset) {
                        self.__super__.__currentPrototype__ = null;
                    }
                };
            }

            // 获取下一个 __prototype__
            prototype = Object.getPrototypeOf(prototype);
        }
    };
    /**
     * 获取 __prototype__
     * @param key
     * @param prototype
     * @returns {*}
     * @private
     */
    obj.Object.prototype.__getPrototype__ = function (key, prototype) {
        if (UtilModule.isUndefined(prototype)) {
            prototype = this;

        } else {
            prototype = Object.getPrototypeOf(prototype);
        }

        while (prototype != null) {
            var keys = Object.keys(prototype);
            var index = $.inArray(key, keys);
            if (index != -1) {
                return prototype;
            }

            // 获取下一个 __prototype__
            prototype = Object.getPrototypeOf(prototype);
        }
        return null;
    };


    /**
     * generate Getter / Setter function
     * @private
     */
    obj.Object.prototype.__generateGetterSetter__ = function () {
        const self = this;
        var keys = Object.keys(self);
        // console.log("keys", keys);
        for (var i = 0, len = keys.length; i < len; i++) {
            const key = keys[i];
            var value = self[key];
            if (UtilModule.isType(value, Function)) {
                continue;
            }

            // settings
            var settings = null;
            var isGenerate = null;
            var namingMethod = null;
            var fn = null;

            // getter
            settings = self.__generateGetterSettings__(key, value);
            isGenerate = settings.isGenerate;
            namingMethod = settings.namingMethod;
            fn = settings.fn;
            if (isGenerate) {
                var fnName = null;
                //  Camel-Case: 骆驼命名法
                if (namingMethod === "Camel-Case") {
                    fnName = "get" + key.substring(0, 1).toUpperCase() + key.substring(1);
                } else {
                    fnName = "get" + key;
                }

                if (!UtilModule.isType(fn, Function)) {
                    fn = function () {
                        return self[key];
                    };
                }

                self.__generateFn__(fnName, fn);
            }

            // setter
            settings = self.__generateSetterSettings__(key, value);
            isGenerate = settings.isGenerate;
            namingMethod = settings.namingMethod;
            fn = settings.fn;
            if (isGenerate) {
                var fnName = null;
                //  Camel-Case: 骆驼命名法
                if (namingMethod === "Camel-Case") {
                    fnName = "set" + key.substring(0, 1).toUpperCase() + key.substring(1);
                } else {
                    fnName = "set" + key;
                }

                if (!UtilModule.isType(fn, Function)) {
                    fn = function () {
                        return self[key];
                    };
                }

                self.__generateFn__(fnName, fn);
            }
        }
    };

    /**
     * generate Getter Settings
     * @param key
     * @param value
     * @returns {{isGenerate: boolean, namingMethod: string, fn: null}}
     * @private
     */
    obj.Object.prototype.__generateGetterSettings__ = function (key, value) {
        var settings = {
            isGenerate: true,

            // 函数命名方式
            // Camel-Case：骆驼命名法
            namingMethod: "Camel-Case",

            fn: null,
        };
        return settings;
    };

    /**
     * generate Setter Settings
     * @param key
     * @param value
     * @returns {{isGenerate: boolean, namingMethod: string, fn: null}}
     * @private
     */
    obj.Object.prototype.__generateSetterSettings__ = function (key, value) {
        var settings = {
            isGenerate: true,

            // 函数命名方式
            // Camel-Case：骆驼命名法
            namingMethod: "Camel-Case",

            fn: null,
        };
        return settings;
    };

    /**
     * generate function
     * @param fnName 函数名
     * @param fn 函数定义
     * @private
     */
    obj.Object.prototype.__generateFn__ = function (fnName, fn) {
        var prototype = Object.getPrototypeOf(this);
        prototype[fnName] = fn;
    };

    ///////////////////

    obj.User = function (username) {
        // 借用构造函数，将会继承父类构造函数的属性
        obj.Object.call(this);
        this.username = username;
        this.__init__();
    };// 解决了组合式两次调用构造函数属性的缺点

    // 将子类的原型指向父类原型的一个副本。
    // 注意：要执行该动作后才能在子类的prototype上定义方法，否则没用。
    obj.inherit(obj.User, obj.Object);

    // 定于对象方法
    obj.User.prototype.info = function () {
        console.log("User info");
    };

    ///

    return obj;
});