var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="./core/ILinq.ts" />
var Linq;
(function (Linq) {
    class List extends Array {
        constructor() {
            super(...arguments);
            this.mQuerys = new Linq.Core.QueryPool();
        }
        Where(where) {
            let query = new Linq.Core.Query(Linq.Core.QueryType.Where, where);
            this.mQuerys.Push(query);
            return this;
        }
        ToArray() {
            var where = this.mQuerys.Pop();
            return Linq.Core.HandlerFactory.GetInstance().GetHnadler(where.Type).Handler(this, where);
        }
    }
    Linq.List = List;
})(Linq || (Linq = {}));
var Linq;
(function (Linq) {
    var Core;
    (function (Core) {
        class QueryPool {
            constructor() {
                this.mPool = new Array();
            }
            Push(query) {
                this.mPool.push(query);
            }
            Pop() {
                return this.mPool.shift();
            }
        }
        Core.QueryPool = QueryPool;
        class Query {
            constructor(type, queryBody) {
                this.Type = type;
                this.QueryBody = queryBody;
            }
        }
        Core.Query = Query;
        let QueryType;
        (function (QueryType) {
            QueryType[QueryType["Where"] = 0] = "Where";
        })(QueryType = Core.QueryType || (Core.QueryType = {}));
    })(Core = Linq.Core || (Linq.Core = {}));
})(Linq || (Linq = {}));
var Linq;
(function (Linq) {
    var Core;
    (function (Core) {
        function Handler(type) {
            return function (constructor) {
                HandlerFactory.GetInstance().Register(type, constructor);
            };
        }
        Core.Handler = Handler;
        class HandlerFactory {
            constructor() {
                this.mHandlers = new Array();
            }
            static GetInstance() {
                if (HandlerFactory.mHandlerFactory == null) {
                    HandlerFactory.mHandlerFactory = new HandlerFactory();
                }
                return HandlerFactory.mHandlerFactory;
            }
            Register(type, constructor) {
                let map = new HandlerTypeMap();
                map.Constructor = constructor;
                map.Type = type;
                this.mHandlers.push(map);
            }
            GetHnadler(type) {
                return (Object.seal(this.mHandlers.find(d => d.Type == type).Constructor))();
            }
        }
        Core.HandlerFactory = HandlerFactory;
        class HandlerTypeMap {
        }
    })(Core = Linq.Core || (Linq.Core = {}));
})(Linq || (Linq = {}));
var Linq;
(function (Linq) {
    var Core;
    (function (Core) {
        let WhereHandler = class WhereHandler {
            constructor() {
            }
            Handler(source, query) {
                return source.filter(item => {
                    return query.QueryBody(item);
                });
            }
        };
        WhereHandler = __decorate([
            Core.Handler(Core.QueryType.Where)
        ], WhereHandler);
    })(Core = Linq.Core || (Linq.Core = {}));
})(Linq || (Linq = {}));
/// <reference path="../src/List.ts" />
let array = new Linq.List();
array.push("鞍山");
array.push("大连");
array.push("丹东");
array.push("辽阳");
array.push("河池");
let newArray = array.Where(d => d == "鞍山").ToArray();
for (let i in newArray) {
    console.log(newArray[i]);
}
//# sourceMappingURL=linq.js.map