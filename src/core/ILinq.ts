namespace Linq.Core{
    export interface ILinq<T>{
        Where(where:Function):ILinq<T>;

        ToArray():Array<T>;
    }
}