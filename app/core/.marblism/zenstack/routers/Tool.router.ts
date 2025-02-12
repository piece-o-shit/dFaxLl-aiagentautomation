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

        createMany: procedure.input($Schema.ToolInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tool.createMany(input as any))),

        create: procedure.input($Schema.ToolInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tool.create(input as any))),

        deleteMany: procedure.input($Schema.ToolInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tool.deleteMany(input as any))),

        delete: procedure.input($Schema.ToolInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tool.delete(input as any))),

        findFirst: procedure.input($Schema.ToolInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).tool.findFirst(input as any))),

        findMany: procedure.input($Schema.ToolInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).tool.findMany(input as any))),

        findUnique: procedure.input($Schema.ToolInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).tool.findUnique(input as any))),

        updateMany: procedure.input($Schema.ToolInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tool.updateMany(input as any))),

        update: procedure.input($Schema.ToolInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tool.update(input as any))),

        count: procedure.input($Schema.ToolInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).tool.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ToolCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ToolCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ToolCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ToolCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ToolCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ToolCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ToolGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ToolGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ToolCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ToolCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ToolGetPayload<T>, Context>) => Promise<Prisma.ToolGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ToolDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ToolDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ToolDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ToolDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ToolDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ToolDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ToolGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ToolGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ToolDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ToolDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ToolGetPayload<T>, Context>) => Promise<Prisma.ToolGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ToolFindFirstArgs, TData = Prisma.ToolGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ToolFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ToolGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ToolFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ToolFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ToolGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ToolGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ToolFindManyArgs, TData = Array<Prisma.ToolGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ToolFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ToolGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ToolFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ToolFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ToolGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ToolGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ToolFindUniqueArgs, TData = Prisma.ToolGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ToolFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ToolGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ToolFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ToolFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ToolGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ToolGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ToolUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ToolUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ToolUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ToolUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ToolUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ToolUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ToolGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ToolGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ToolUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ToolUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ToolGetPayload<T>, Context>) => Promise<Prisma.ToolGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ToolCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ToolCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ToolCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ToolCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ToolCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ToolCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ToolCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ToolCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
