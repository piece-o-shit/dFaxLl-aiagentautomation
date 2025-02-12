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

        createMany: procedure.input($Schema.ExecutionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).execution.createMany(input as any))),

        create: procedure.input($Schema.ExecutionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).execution.create(input as any))),

        deleteMany: procedure.input($Schema.ExecutionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).execution.deleteMany(input as any))),

        delete: procedure.input($Schema.ExecutionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).execution.delete(input as any))),

        findFirst: procedure.input($Schema.ExecutionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).execution.findFirst(input as any))),

        findMany: procedure.input($Schema.ExecutionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).execution.findMany(input as any))),

        findUnique: procedure.input($Schema.ExecutionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).execution.findUnique(input as any))),

        updateMany: procedure.input($Schema.ExecutionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).execution.updateMany(input as any))),

        update: procedure.input($Schema.ExecutionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).execution.update(input as any))),

        count: procedure.input($Schema.ExecutionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).execution.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ExecutionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExecutionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExecutionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExecutionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ExecutionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExecutionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExecutionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExecutionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExecutionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExecutionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExecutionGetPayload<T>, Context>) => Promise<Prisma.ExecutionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ExecutionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExecutionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExecutionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExecutionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ExecutionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExecutionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExecutionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExecutionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExecutionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExecutionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExecutionGetPayload<T>, Context>) => Promise<Prisma.ExecutionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ExecutionFindFirstArgs, TData = Prisma.ExecutionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ExecutionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ExecutionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExecutionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ExecutionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ExecutionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ExecutionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ExecutionFindManyArgs, TData = Array<Prisma.ExecutionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ExecutionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ExecutionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExecutionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ExecutionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ExecutionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ExecutionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ExecutionFindUniqueArgs, TData = Prisma.ExecutionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ExecutionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ExecutionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExecutionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ExecutionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ExecutionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ExecutionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ExecutionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExecutionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExecutionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExecutionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ExecutionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExecutionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExecutionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExecutionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExecutionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExecutionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExecutionGetPayload<T>, Context>) => Promise<Prisma.ExecutionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ExecutionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ExecutionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ExecutionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ExecutionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ExecutionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ExecutionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ExecutionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ExecutionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
