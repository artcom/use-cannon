import React from 'react';
import type { Shape } from 'cannon-es';
import type { Triplet } from './hooks';
export declare type Broadphase = 'Naive' | 'SAP';
export declare type ProviderProps = {
    children: React.ReactNode;
    shouldInvalidate?: boolean;
    tolerance?: number;
    step?: number;
    iterations?: number;
    allowSleep?: boolean;
    broadphase?: Broadphase;
    gravity?: Triplet;
    quatNormalizeFast?: boolean;
    quatNormalizeSkip?: number;
    solver?: 'GS' | 'Split';
    axisIndex?: number;
    defaultContactMaterial?: {
        friction?: number;
        restitution?: number;
        contactEquationStiffness?: number;
        contactEquationRelaxation?: number;
        frictionEquationStiffness?: number;
        frictionEquationRelaxation?: number;
    };
    size?: number;
};
export declare type WorkerCollideEvent = {
    data: {
        op: 'event';
        type: 'collide';
        target: string;
        body: string;
        contact: {
            id: string;
            ni: number[];
            ri: number[];
            rj: number[];
            impactVelocity: number;
            bi: string;
            bj: string;
            contactPoint: number[];
            contactNormal: number[];
        };
        collisionFilters: {
            bodyFilterGroup: number;
            bodyFilterMask: number;
            targetFilterGroup: number;
            targetFilterMask: number;
        };
    };
};
export declare type WorkerRayhitEvent = {
    data: {
        op: 'event';
        type: 'rayhit';
        ray: {
            from: number[];
            to: number[];
            direction: number[];
            collisionFilterGroup: number;
            collisionFilterMask: number;
            uuid: string;
        };
        hasHit: boolean;
        body: string | null;
        shape: (Omit<Shape, 'body'> & {
            body: string;
        }) | null;
        rayFromWorld: number[];
        rayToWorld: number[];
        hitNormalWorld: number[];
        hitPointWorld: number[];
        hitFaceIndex: number;
        distance: number;
        shouldStop: boolean;
    };
};
export declare type WorkerCollideBeginEvent = {
    data: {
        op: 'event';
        type: 'collideBegin';
        bodyA: string;
        bodyB: string;
    };
};
export declare type WorkerCollideEndEvent = {
    data: {
        op: 'event';
        type: 'collideEnd';
        bodyA: string;
        bodyB: string;
    };
};
export declare type WorkerSleepEvent = {
    data: {
        op: 'event';
        type: 'sleep';
        body: string;
    };
};
export default function Provider({ children, shouldInvalidate, step, gravity, tolerance, iterations, allowSleep, broadphase, axisIndex, quatNormalizeFast, quatNormalizeSkip, solver, defaultContactMaterial, size, }: ProviderProps): JSX.Element;
