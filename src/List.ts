/// <reference path="./core/ILinq.ts" />

namespace Linq{
    export class List<T> extends Array<T> implements Linq.Core.ILinq<T>{
        private mQuerys:Linq.Core.QueryPool = new Linq.Core.QueryPool();

        public Where(where:Function):Linq.Core.ILinq<T>{
            let query = new Linq.Core.Query(Linq.Core.QueryType.Where,where);
            this.mQuerys.Push(query);
            return this;
        }

        public ToArray():Array<T>{
            var where = this.mQuerys.Pop();
            return Linq.Core.HandlerFactory.GetInstance().GetHnadler(where.Type).Handler(this,where);  
        }
    }
}