namespace Linq.Core {
    export interface IHandler {
        Handler<T>(source: Array<T>, query: Query): Array<T>
    }

    export function Handler(type: QueryType): Function {
        return function (constructor: Function) {
            HandlerFactory.GetInstance().Register(type, constructor);
        }
    }

    export class HandlerFactory {
        private mHandlers: Array<HandlerTypeMap> = new Array<HandlerTypeMap>();
        private static mHandlerFactory: HandlerFactory;

        private constructor() {

        }

        public static GetInstance(): HandlerFactory {
            if (HandlerFactory.mHandlerFactory == null) {
                HandlerFactory.mHandlerFactory = new HandlerFactory();
            }
            return HandlerFactory.mHandlerFactory;
        }

        public Register(type: QueryType, constructor: Function) {
            let map = new HandlerTypeMap();
            map.Constructor = constructor;
            map.Type = type;
            this.mHandlers.push(map);
        }

        public GetHnadler(type: QueryType): IHandler {
            return (Object.seal(this.mHandlers.find(d => d.Type == type).Constructor))();
        }
    }

    class HandlerTypeMap {
        public Constructor: Function;

        public Type: QueryType;
    }
}