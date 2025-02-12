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

        createMany: procedure.input($Schema.DocumentationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentation.createMany(input as any))),

        create: procedure.input($Schema.DocumentationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentation.create(input as any))),

        deleteMany: procedure.input($Schema.DocumentationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentation.deleteMany(input as any))),

        delete: procedure.input($Schema.DocumentationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentation.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentation.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentation.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).documentation.findUnique(input as any))),

        updateMany: procedure.input($Schema.DocumentationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentation.updateMany(input as any))),

        update: procedure.input($Schema.DocumentationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentation.update(input as any))),

        count: procedure.input($Schema.DocumentationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DocumentationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DocumentationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentationGetPayload<T>, Context>) => Promise<Prisma.DocumentationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DocumentationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentationGetPayload<T>, Context>) => Promise<Prisma.DocumentationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentationFindFirstArgs, TData = Prisma.DocumentationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentationFindManyArgs, TData = Array<Prisma.DocumentationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentationFindUniqueArgs, TData = Prisma.DocumentationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DocumentationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DocumentationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentationGetPayload<T>, Context>) => Promise<Prisma.DocumentationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DocumentationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DocumentationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DocumentationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DocumentationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DocumentationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DocumentationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
