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

        createMany: procedure.input($Schema.WorkflowInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflow.createMany(input as any))),

        create: procedure.input($Schema.WorkflowInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflow.create(input as any))),

        deleteMany: procedure.input($Schema.WorkflowInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflow.deleteMany(input as any))),

        delete: procedure.input($Schema.WorkflowInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflow.delete(input as any))),

        findFirst: procedure.input($Schema.WorkflowInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).workflow.findFirst(input as any))),

        findMany: procedure.input($Schema.WorkflowInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).workflow.findMany(input as any))),

        findUnique: procedure.input($Schema.WorkflowInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).workflow.findUnique(input as any))),

        updateMany: procedure.input($Schema.WorkflowInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflow.updateMany(input as any))),

        update: procedure.input($Schema.WorkflowInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflow.update(input as any))),

        count: procedure.input($Schema.WorkflowInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).workflow.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.WorkflowCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.WorkflowCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowGetPayload<T>, Context>) => Promise<Prisma.WorkflowGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.WorkflowDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.WorkflowDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowGetPayload<T>, Context>) => Promise<Prisma.WorkflowGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.WorkflowFindFirstArgs, TData = Prisma.WorkflowGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.WorkflowFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WorkflowGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.WorkflowFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WorkflowGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WorkflowGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.WorkflowFindManyArgs, TData = Array<Prisma.WorkflowGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.WorkflowFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.WorkflowGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.WorkflowFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.WorkflowGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.WorkflowGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.WorkflowFindUniqueArgs, TData = Prisma.WorkflowGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WorkflowFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WorkflowGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WorkflowFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WorkflowGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WorkflowGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.WorkflowUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.WorkflowUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowGetPayload<T>, Context>) => Promise<Prisma.WorkflowGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.WorkflowCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.WorkflowCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.WorkflowCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.WorkflowCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.WorkflowCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.WorkflowCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.WorkflowCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.WorkflowCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
