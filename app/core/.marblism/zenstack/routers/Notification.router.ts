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

        createMany: procedure.input($Schema.NotificationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.createMany(input as any))),

        create: procedure.input($Schema.NotificationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.create(input as any))),

        deleteMany: procedure.input($Schema.NotificationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.deleteMany(input as any))),

        delete: procedure.input($Schema.NotificationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.delete(input as any))),

        findFirst: procedure.input($Schema.NotificationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).notification.findFirst(input as any))),

        findMany: procedure.input($Schema.NotificationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).notification.findMany(input as any))),

        findUnique: procedure.input($Schema.NotificationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).notification.findUnique(input as any))),

        updateMany: procedure.input($Schema.NotificationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.updateMany(input as any))),

        update: procedure.input($Schema.NotificationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.update(input as any))),

        count: procedure.input($Schema.NotificationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).notification.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.NotificationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotificationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotificationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotificationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.NotificationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotificationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NotificationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NotificationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotificationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotificationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NotificationGetPayload<T>, Context>) => Promise<Prisma.NotificationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.NotificationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotificationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotificationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotificationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.NotificationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotificationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NotificationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NotificationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotificationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotificationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NotificationGetPayload<T>, Context>) => Promise<Prisma.NotificationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.NotificationFindFirstArgs, TData = Prisma.NotificationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.NotificationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NotificationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NotificationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NotificationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NotificationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NotificationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.NotificationFindManyArgs, TData = Array<Prisma.NotificationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.NotificationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.NotificationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NotificationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NotificationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.NotificationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.NotificationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.NotificationFindUniqueArgs, TData = Prisma.NotificationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.NotificationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NotificationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NotificationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.NotificationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NotificationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NotificationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.NotificationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotificationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotificationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotificationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.NotificationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotificationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NotificationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NotificationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotificationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotificationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NotificationGetPayload<T>, Context>) => Promise<Prisma.NotificationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.NotificationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NotificationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.NotificationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.NotificationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.NotificationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.NotificationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.NotificationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NotificationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
