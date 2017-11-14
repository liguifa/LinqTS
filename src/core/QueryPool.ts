namespace Linq.Core{
    export class QueryPool{
        private mPool:Array<Query> = new Array<Query>();

        public Push(query:Query):void{
            this.mPool.push(query);
        }

        public Pop():Query{
            return this.mPool.shift();
        }
    }

    export class Query{
        public Type:QueryType;

        public QueryBody:Function;

        constructor(type:QueryType,queryBody:Function){
            this.Type = type;
            this.QueryBody = queryBody;
        }
    }

    export enum QueryType{
        Where,
    }
}