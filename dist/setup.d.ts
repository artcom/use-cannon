import type { RayOptions } from 'cannon-es';
import type { Object3D } from 'three';
import type { ProviderProps, WorkerCollideEvent, WorkerRayhitEvent } from './Provider';
import type { AtomicProps, BodyProps, BodyShapeType, ConstraintTypes, Quad, SpringOptns, Triplet, WheelInfoOptions } from './hooks';
import type { MutableRefObject } from 'react';
export declare type Buffers = {
    positions: Float32Array;
    quaternions: Float32Array;
};
export declare type Refs = {
    [uuid: string]: Object3D;
};
declare type WorkerContact = WorkerCollideEvent['data']['contact'];
export declare type CollideEvent = Omit<WorkerCollideEvent['data'], 'body' | 'target' | 'contact'> & {
    body: Object3D;
    target: Object3D;
    contact: Omit<WorkerContact, 'bi' | 'bj'> & {
        bi: Object3D;
        bj: Object3D;
    };
};
export declare type CollideBeginEvent = {
    op: 'event';
    type: 'collideBegin';
    target: Object3D;
    body: Object3D;
};
export declare type CollideEndEvent = {
    op: 'event';
    type: 'collideEnd';
    target: Object3D;
    body: Object3D;
};
export declare type RayhitEvent = Omit<WorkerRayhitEvent['data'], 'body'> & {
    body: Object3D | null;
};
export declare type SleepEvent = {
    op: 'event';
    type: 'sleep';
    body: Object3D;
};
declare type CannonEvent = CollideBeginEvent | CollideEndEvent | CollideEvent | RayhitEvent | SleepEvent;
declare type CallbackByType<T extends {
    type: string;
}> = {
    [K in T['type']]?: T extends {
        type: K;
    } ? (e: T) => void : never;
};
declare type CannonEvents = {
    [uuid: string]: Partial<CallbackByType<CannonEvent>>;
};
export declare type Subscription = Partial<{
    [K in SubscriptionName]: (value: PropValue<K>) => void;
}>;
export declare type Subscriptions = Partial<{
    [id: number]: Subscription;
}>;
export declare type PropValue<T extends SubscriptionName = SubscriptionName> = T extends AtomicName ? AtomicProps[T] : T extends VectorName ? Triplet : T extends 'quaternion' ? Quad : T extends 'sliding' ? boolean : never;
export declare const atomicNames: readonly ["allowSleep", "angularDamping", "collisionFilterGroup", "collisionFilterMask", "collisionResponse", "fixedRotation", "isTrigger", "linearDamping", "mass", "material", "sleepSpeedLimit", "sleepTimeLimit", "userData"];
export declare type AtomicName = typeof atomicNames[number];
export declare const vectorNames: readonly ["angularFactor", "angularVelocity", "linearFactor", "position", "velocity"];
export declare type VectorName = typeof vectorNames[number];
export declare const subscriptionNames: readonly ["allowSleep", "angularDamping", "collisionFilterGroup", "collisionFilterMask", "collisionResponse", "fixedRotation", "isTrigger", "linearDamping", "mass", "material", "sleepSpeedLimit", "sleepTimeLimit", "userData", "angularFactor", "angularVelocity", "linearFactor", "position", "velocity", "quaternion", "sliding"];
export declare type SubscriptionName = typeof subscriptionNames[number];
export declare type SetOpName<T extends AtomicName | VectorName | WorldPropName | 'quaternion' | 'rotation'> = `set${Capitalize<T>}`;
declare type Operation<T extends string, P> = {
    op: T;
} & (P extends void ? {} : {
    props: P;
});
declare type WithUUID<T extends string, P = void> = Operation<T, P> & {
    uuid: string;
};
declare type WithUUIDs<T extends string, P = void> = Operation<T, P> & {
    uuid: string[];
};
declare type AddConstraintMessage = WithUUID<'addConstraint', [uuidA: string, uuidB: string, options: {}]> & {
    type: 'Hinge' | ConstraintTypes;
};
declare type DisableConstraintMessage = WithUUID<'disableConstraint'>;
declare type EnableConstraintMessage = WithUUID<'enableConstraint'>;
declare type RemoveConstraintMessage = WithUUID<'removeConstraint'>;
declare type ConstraintMessage = AddConstraintMessage | DisableConstraintMessage | EnableConstraintMessage | RemoveConstraintMessage;
declare type DisableConstraintMotorMessage = WithUUID<'disableConstraintMotor'>;
declare type EnableConstraintMotorMessage = WithUUID<'enableConstraintMotor'>;
declare type SetConstraintMotorMaxForce = WithUUID<'setConstraintMotorMaxForce', number>;
declare type SetConstraintMotorSpeed = WithUUID<'setConstraintMotorSpeed', number>;
declare type ConstraintMotorMessage = DisableConstraintMotorMessage | EnableConstraintMotorMessage | SetConstraintMotorSpeed | SetConstraintMotorMaxForce;
declare type AddSpringMessage = WithUUID<'addSpring', [uuidA: string, uuidB: string, options: SpringOptns]>;
declare type RemoveSpringMessage = WithUUID<'removeSpring'>;
declare type SetSpringDampingMessage = WithUUID<'setSpringDamping', number>;
declare type SetSpringRestLengthMessage = WithUUID<'setSpringRestLength', number>;
declare type SetSpringStiffnessMessage = WithUUID<'setSpringStiffness', number>;
declare type SpringMessage = AddSpringMessage | RemoveSpringMessage | SetSpringDampingMessage | SetSpringRestLengthMessage | SetSpringStiffnessMessage;
export declare type RayMode = 'Closest' | 'Any' | 'All';
export declare type AddRayMessage = WithUUID<'addRay', {
    from?: Triplet;
    mode: RayMode;
    to?: Triplet;
} & Pick<RayOptions, 'checkCollisionResponse' | 'collisionFilterGroup' | 'collisionFilterMask' | 'skipBackfaces'>>;
declare type RemoveRayMessage = WithUUID<'removeRay'>;
declare type RayMessage = AddRayMessage | RemoveRayMessage;
declare type AddRaycastVehicleMessage = WithUUIDs<'addRaycastVehicle', [
    chassisBodyUUID: string,
    wheelsUUID: string[],
    wheelInfos: WheelInfoOptions[],
    indexForwardAxis: number,
    indexRightAxis: number,
    indexUpAxis: number
]>;
declare type RemoveRaycastVehicleMessage = WithUUIDs<'removeRaycastVehicle'>;
declare type ApplyRaycastVehicleEngineForceMessage = WithUUID<'applyRaycastVehicleEngineForce', [
    value: number,
    wheelIndex: number
]>;
declare type SetRaycastVehicleBrakeMessage = WithUUID<'setRaycastVehicleBrake', [brake: number, wheelIndex: number]>;
declare type SetRaycastVehicleSteeringValueMessage = WithUUID<'setRaycastVehicleSteeringValue', [
    value: number,
    wheelIndex: number
]>;
declare type RaycastVehicleMessage = AddRaycastVehicleMessage | ApplyRaycastVehicleEngineForceMessage | RemoveRaycastVehicleMessage | SetRaycastVehicleBrakeMessage | SetRaycastVehicleSteeringValueMessage;
declare type AtomicMessage = WithUUID<SetOpName<AtomicName>, any>;
declare type QuaternionMessage = WithUUID<SetOpName<'quaternion'>, Quad>;
declare type RotationMessage = WithUUID<SetOpName<'rotation'>, Triplet>;
declare type VectorMessage = WithUUID<SetOpName<VectorName>, Triplet>;
declare type ApplyForceMessage = WithUUID<'applyForce', [force: Triplet, worldPoint: Triplet]>;
declare type ApplyImpulseMessage = WithUUID<'applyImpulse', [impulse: Triplet, worldPoint: Triplet]>;
declare type ApplyLocalForceMessage = WithUUID<'applyLocalForce', [force: Triplet, localPoint: Triplet]>;
declare type ApplyLocalImpulseMessage = WithUUID<'applyLocalImpulse', [impulse: Triplet, localPoint: Triplet]>;
declare type ApplyTorque = WithUUID<'applyTorque', [torque: Triplet]>;
declare type ApplyMessage = ApplyForceMessage | ApplyImpulseMessage | ApplyLocalForceMessage | ApplyLocalImpulseMessage | ApplyTorque;
declare type SerializableBodyProps = {
    onCollide: boolean;
};
declare type AddBodiesMessage = WithUUIDs<'addBodies', SerializableBodyProps[]> & {
    type: BodyShapeType;
};
declare type RemoveBodiesMessage = WithUUIDs<'removeBodies'>;
declare type BodiesMessage = AddBodiesMessage | RemoveBodiesMessage;
declare type SleepMessage = WithUUID<'sleep'>;
declare type WakeUpMessage = WithUUID<'wakeUp'>;
export declare type SubscriptionTarget = 'bodies' | 'vehicles';
declare type SubscribeMessage = WithUUID<'subscribe', {
    id: number;
    target: SubscriptionTarget;
    type: SubscriptionName;
}>;
declare type UnsubscribeMessage = Operation<'unsubscribe', number>;
declare type SubscriptionMessage = SubscribeMessage | UnsubscribeMessage;
export declare type WorldPropName = 'axisIndex' | 'broadphase' | 'gravity' | 'iterations' | 'step' | 'tolerance';
declare type WorldMessage<T extends WorldPropName> = Operation<SetOpName<T>, Required<ProviderProps[T]>>;
declare type CannonMessage = ApplyMessage | AtomicMessage | BodiesMessage | ConstraintMessage | ConstraintMotorMessage | QuaternionMessage | RaycastVehicleMessage | RayMessage | RotationMessage | SleepMessage | SpringMessage | SubscriptionMessage | VectorMessage | WakeUpMessage | WorldMessage<WorldPropName>;
export interface CannonWorker extends Worker {
    postMessage: (message: CannonMessage) => void;
}
export declare type ProviderContext = {
    worker: CannonWorker;
    bodies: MutableRefObject<{
        [uuid: string]: number;
    }>;
    buffers: Buffers;
    refs: Refs;
    events: CannonEvents;
    subscriptions: Subscriptions;
};
export declare type DebugApi = {
    add(id: string, props: BodyProps, type: BodyShapeType): void;
    remove(id: string): void;
};
export declare const context: import("react").Context<ProviderContext>;
export declare const debugContext: import("react").Context<DebugApi>;
export {};
