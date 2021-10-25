import type { ProviderProps } from './Provider';
import type { CannonWorker, WorldPropName } from './setup';
declare type Props = Pick<Required<ProviderProps>, WorldPropName> & {
    worker: CannonWorker;
};
export declare function useUpdateWorldPropsEffect({ axisIndex, broadphase, gravity, iterations, step, tolerance, worker, }: Props): void;
export {};
