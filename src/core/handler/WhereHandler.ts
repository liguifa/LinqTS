namespace Linq.Core {
    @Handler(QueryType.Where)
    class WhereHandler implements IHandler {
        constructor(){
            
        }

        public Handler<T>(source: Array<T>, query: Query): Array<T> {
            return source.filter(item => {
                return query.QueryBody(item);
            });
        }
    }
}