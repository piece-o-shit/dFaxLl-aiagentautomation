/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.WorkflowAgentInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowAgent.createMany(input as any))),

        create: procedure.input($Schema.WorkflowAgentInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowAgent.create(input as any))),

        deleteMany: procedure.input($Schema.WorkflowAgentInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowAgent.deleteMany(input as any))),

        delete: procedure.input($Schema.WorkflowAgentInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowAgent.delete(input as any))),

        findFirst: procedure.input($Schema.WorkflowAgentInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).workflowAgent.findFirst(input as any))),

        findMany: procedure.input($Schema.WorkflowAgentInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).workflowAgent.findMany(input as any))),

        findUnique: procedure.input($Schema.WorkflowAgentInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).workflowAgent.findUnique(input as any))),

        updateMany: procedure.input($Schema.WorkflowAgentInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowAgent.updateMany(input as any))),

        update: procedure.input($Schema.WorkflowAgentInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowAgent.update(input as any))),

        count: procedure.input($Schema.WorkflowAgentInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).workflowAgent.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.WorkflowAgentCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowAgentCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowAgentCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowAgentCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.WorkflowAgentCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowAgentCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowAgentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowAgentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowAgentCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowAgentCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowAgentGetPayload<T>, Context>) => Promise<Prisma.WorkflowAgentGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.WorkflowAgentDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowAgentDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowAgentDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowAgentDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.WorkflowAgentDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowAgentDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowAgentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowAgentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowAgentDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowAgentDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowAgentGetPayload<T>, Context>) => Promise<Prisma.WorkflowAgentGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.WorkflowAgentFindFirstArgs, TData = Prisma.WorkflowAgentGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.WorkflowAgentFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WorkflowAgentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowAgentFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.WorkflowAgentFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WorkflowAgentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WorkflowAgentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.WorkflowAgentFindManyArgs, TData = Array<Prisma.WorkflowAgentGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.WorkflowAgentFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.WorkflowAgentGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowAgentFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.WorkflowAgentFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.WorkflowAgentGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.WorkflowAgentGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.WorkflowAgentFindUniqueArgs, TData = Prisma.WorkflowAgentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WorkflowAgentFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WorkflowAgentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowAgentFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WorkflowAgentFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WorkflowAgentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WorkflowAgentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.WorkflowAgentUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowAgentUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowAgentUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowAgentUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.WorkflowAgentUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowAgentUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowAgentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowAgentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowAgentUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowAgentUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowAgentGetPayload<T>, Context>) => Promise<Prisma.WorkflowAgentGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.WorkflowAgentCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.WorkflowAgentCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.WorkflowAgentCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.WorkflowAgentCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.WorkflowAgentCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.WorkflowAgentCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.WorkflowAgentCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.WorkflowAgentCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
