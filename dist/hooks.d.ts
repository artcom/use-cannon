import type { MaterialOptions } from 'cannon-es';
import type { DependencyList, Ref, RefObject } from 'react';
import type { AddRayMessage, AtomicName, CollideBeginEvent, CollideEndEvent, CollideEvent, RayhitEvent, SleepEvent, VectorName } from './setup';
import { Euler, Object3D, Quaternion, Vector3 } from 'three';
export declare type AtomicProps = {
    allowSleep: boolean;
    angularDamping: number;
    collisionFilterGroup: number;
    collisionFilterMask: number;
    collisionResponse: number;
    fixedRotation: boolean;
    isTrigger: boolean;
    linearDamping: number;
    mass: number;
    material: MaterialOptions;
    sleepSpeedLimit: number;
    sleepTimeLimit: number;
    userData: {};
};
export declare type Triplet = [x: number, y: number, z: number];
export declare type VectorProps = Record<VectorName, Triplet>;
declare type VectorTypes = Vector3 | Triplet;
export declare type Quad = [x: number, y: number, z: number, w: number];
export declare type BodyProps<T extends any[] = unknown[]> = Partial<AtomicProps> & Partial<VectorProps> & {
    args?: T;
    onCollide?: (e: CollideEvent) => void;
    onCollideBegin?: (e: CollideBeginEvent) => void;
    onCollideEnd?: (e: CollideEndEvent) => void;
    onSleep?: (e: SleepEvent) => void;
    quaternion?: Quad;
    rotation?: Triplet;
    type?: 'Dynamic' | 'Static' | 'Kinematic';
};
export declare type BodyPropsArgsRequired<T extends any[] = unknown[]> = BodyProps<T> & {
    args: T;
};
export declare type ShapeType = 'Plane' | 'Box' | 'Cylinder' | 'Heightfield' | 'Particle' | 'Sphere' | 'Trimesh' | 'ConvexPolyhedron';
export declare type BodyShapeType = ShapeType | 'Compound';
export declare type CylinderArgs = [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number];
export declare type SphereArgs = [radius: number];
export declare type TrimeshArgs = [vertices: ArrayLike<number>, indices: ArrayLike<number>];
export declare type HeightfieldArgs = [
    data: number[][],
    options: {
        elementSize?: number;
        maxValue?: number;
        minValue?: number;
    }
];
export declare type ConvexPolyhedronArgs<V extends VectorTypes = VectorTypes> = [
    vertices?: V[],
    faces?: number[][],
    normals?: V[],
    axes?: V[],
    boundingSphereRadius?: number
];
export declare type PlaneProps = BodyProps;
export declare type BoxProps = BodyProps<Triplet>;
export declare type CylinderProps = BodyProps<CylinderArgs>;
export declare type ParticleProps = BodyProps;
export declare type SphereProps = BodyProps<SphereArgs>;
export declare type TrimeshProps = BodyPropsArgsRequired<TrimeshArgs>;
export declare type HeightfieldProps = BodyPropsArgsRequired<HeightfieldArgs>;
export declare type ConvexPolyhedronProps = BodyProps<ConvexPolyhedronArgs>;
export interface CompoundBodyProps extends BodyProps {
    shapes: BodyProps & {
        type: ShapeType;
    }[];
}
export declare type AtomicApi<K extends AtomicName> = {
    set: (value: AtomicProps[K]) => void;
    subscribe: (callback: (value: AtomicProps[K]) => void) => () => void;
};
export declare type QuaternionApi = {
    set: (x: number, y: number, z: number, w: number) => void;
    copy: ({ w, x, y, z }: Quaternion) => void;
    subscribe: (callback: (value: Quad) => void) => () => void;
};
export declare type VectorApi = {
    set: (x: number, y: number, z: number) => void;
    copy: ({ x, y, z }: Vector3 | Euler) => void;
    subscribe: (callback: (value: Triplet) => void) => () => void;
};
export declare type WorkerApi = {
    [K in AtomicName]: AtomicApi<K>;
} & {
    [K in VectorName]: VectorApi;
} & {
    applyForce: (force: Triplet, worldPoint: Triplet) => void;
    applyImpulse: (impulse: Triplet, worldPoint: Triplet) => void;
    applyLocalForce: (force: Triplet, localPoint: Triplet) => void;
    applyLocalImpulse: (impulse: Triplet, localPoint: Triplet) => void;
    applyTorque: (torque: Triplet) => void;
    quaternion: QuaternionApi;
    rotation: VectorApi;
    sleep: () => void;
    wakeUp: () => void;
};
export interface PublicApi extends WorkerApi {
    at: (index: number) => WorkerApi;
}
export declare type Api = [RefObject<Object3D>, PublicApi];
export declare type ConstraintTypes = 'PointToPoint' | 'ConeTwist' | 'Distance' | 'Lock';
export interface ConstraintOptns {
    maxForce?: number;
    collideConnected?: boolean;
    wakeUpBodies?: boolean;
}
export interface PointToPointConstraintOpts extends ConstraintOptns {
    pivotA: Triplet;
    pivotB: Triplet;
}
export interface ConeTwistConstraintOpts extends ConstraintOptns {
    pivotA?: Triplet;
    axisA?: Triplet;
    pivotB?: Triplet;
    axisB?: Triplet;
    angle?: number;
    twistAngle?: number;
}
export interface DistanceConstraintOpts extends ConstraintOptns {
    distance?: number;
}
export interface HingeConstraintOpts extends ConstraintOptns {
    pivotA?: Triplet;
    axisA?: Triplet;
    pivotB?: Triplet;
    axisB?: Triplet;
}
export declare type LockConstraintOpts = ConstraintOptns;
export interface SpringOptns {
    restLength?: number;
    stiffness?: number;
    damping?: number;
    worldAnchorA?: Triplet;
    worldAnchorB?: Triplet;
    localAnchorA?: Triplet;
    localAnchorB?: Triplet;
}
declare type GetByIndex<T extends BodyProps> = (index: number) => T;
export declare function usePlane(fn: GetByIndex<PlaneProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useBox(fn: GetByIndex<BoxProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useCylinder(fn: GetByIndex<CylinderProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useHeightfield(fn: GetByIndex<HeightfieldProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useParticle(fn: GetByIndex<ParticleProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useSphere(fn: GetByIndex<SphereProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useTrimesh(fn: GetByIndex<TrimeshProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useConvexPolyhedron(fn: GetByIndex<ConvexPolyhedronProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
export declare function useCompoundBody(fn: GetByIndex<CompoundBodyProps>, fwdRef?: Ref<Object3D>, deps?: DependencyList): Api;
declare type ConstraintApi = [
    RefObject<Object3D>,
    RefObject<Object3D>,
    {
        enable: () => void;
        disable: () => void;
    }
];
declare type HingeConstraintApi = [
    RefObject<Object3D>,
    RefObject<Object3D>,
    {
        enable: () => void;
        disable: () => void;
        enableMotor: () => void;
        disableMotor: () => void;
        setMotorSpeed: (value: number) => void;
        setMotorMaxForce: (value: number) => void;
    }
];
declare type SpringApi = [
    RefObject<Object3D>,
    RefObject<Object3D>,
    {
        setStiffness: (value: number) => void;
        setRestLength: (value: number) => void;
        setDamping: (value: number) => void;
    }
];
export declare function usePointToPointConstraint(bodyA: Ref<Object3D> | undefined, bodyB: Ref<Object3D> | undefined, optns: PointToPointConstraintOpts, deps?: DependencyList): ConstraintApi;
export declare function useConeTwistConstraint(bodyA: Ref<Object3D> | undefined, bodyB: Ref<Object3D> | undefined, optns: ConeTwistConstraintOpts, deps?: DependencyList): ConstraintApi;
export declare function useDistanceConstraint(bodyA: Ref<Object3D> | undefined, bodyB: Ref<Object3D> | undefined, optns: DistanceConstraintOpts, deps?: DependencyList): ConstraintApi;
export declare function useHingeConstraint(bodyA: Ref<Object3D> | undefined, bodyB: Ref<Object3D> | undefined, optns: HingeConstraintOpts, deps?: DependencyList): HingeConstraintApi;
export declare function useLockConstraint(bodyA: Ref<Object3D> | undefined, bodyB: Ref<Object3D> | undefined, optns: LockConstraintOpts, deps?: DependencyList): ConstraintApi;
export declare function useSpring(bodyA: Ref<Object3D> | undefined, bodyB: Ref<Object3D> | undefined, optns: SpringOptns, deps?: DependencyList): SpringApi;
declare type RayOptions = Omit<AddRayMessage['props'], 'mode'>;
export declare function useRaycastClosest(options: RayOptions, callback: (e: RayhitEvent) => void, deps?: DependencyList): void;
export declare function useRaycastAny(options: RayOptions, callback: (e: RayhitEvent) => void, deps?: DependencyList): void;
export declare function useRaycastAll(options: RayOptions, callback: (e: RayhitEvent) => void, deps?: DependencyList): void;
export interface RaycastVehiclePublicApi {
    applyEngineForce: (value: number, wheelIndex: number) => void;
    setBrake: (brake: number, wheelIndex: number) => void;
    setSteeringValue: (value: number, wheelIndex: number) => void;
    sliding: {
        subscribe: (callback: (sliding: boolean) => void) => void;
    };
}
export interface WheelInfoOptions {
    radius?: number;
    directionLocal?: Triplet;
    suspensionStiffness?: number;
    suspensionRestLength?: number;
    maxSuspensionForce?: number;
    maxSuspensionTravel?: number;
    dampingRelaxation?: number;
    dampingCompression?: number;
    sideAcceleration?: number;
    frictionSlip?: number;
    rollInfluence?: number;
    axleLocal?: Triplet;
    chassisConnectionPointLocal?: Triplet;
    isFrontWheel?: boolean;
    useCustomSlidingRotationalSpeed?: boolean;
    customSlidingRotationalSpeed?: number;
}
export interface RaycastVehicleProps {
    chassisBody: Ref<Object3D>;
    wheels: Ref<Object3D>[];
    wheelInfos: WheelInfoOptions[];
    indexForwardAxis?: number;
    indexRightAxis?: number;
    indexUpAxis?: number;
}
export declare function useRaycastVehicle(fn: () => RaycastVehicleProps, fwdRef?: Ref<Object3D>, deps?: DependencyList): [RefObject<Object3D>, RaycastVehiclePublicApi];
export {};
