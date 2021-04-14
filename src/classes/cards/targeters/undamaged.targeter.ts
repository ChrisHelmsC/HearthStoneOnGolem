export interface Targeter<T, V> {
    target : T;

    setTarget(target : T) : void;
    getTargetables(targetList : V) : Array<T>;
}