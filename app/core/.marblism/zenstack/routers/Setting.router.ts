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

        createMany: procedure.input($Schema.SettingInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).setting.createMany(input as any))),

        create: procedure.input($Schema.SettingInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).setting.create(input as any))),

        deleteMany: procedure.input($Schema.SettingInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).setting.deleteMany(input as any))),

        delete: procedure.input($Schema.SettingInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).setting.delete(input as any))),

        findFirst: procedure.input($Schema.SettingInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).setting.findFirst(input as any))),

        findMany: procedure.input($Schema.SettingInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).setting.findMany(input as any))),

        findUnique: procedure.input($Schema.SettingInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).setting.findUnique(input as any))),

        updateMany: procedure.input($Schema.SettingInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).setting.updateMany(input as any))),

        update: procedure.input($Schema.SettingInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).setting.update(input as any))),

        count: procedure.input($Schema.SettingInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).setting.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SettingCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SettingCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SettingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SettingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SettingGetPayload<T>, Context>) => Promise<Prisma.SettingGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SettingDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SettingDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SettingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SettingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SettingGetPayload<T>, Context>) => Promise<Prisma.SettingGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SettingFindFirstArgs, TData = Prisma.SettingGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.SettingFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SettingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SettingFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SettingFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SettingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SettingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SettingFindManyArgs, TData = Array<Prisma.SettingGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.SettingFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SettingGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SettingFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SettingFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SettingGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SettingGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SettingFindUniqueArgs, TData = Prisma.SettingGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SettingFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SettingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SettingFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SettingFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SettingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SettingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SettingUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SettingUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SettingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SettingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SettingGetPayload<T>, Context>) => Promise<Prisma.SettingGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.SettingCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SettingCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.SettingCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SettingCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.SettingCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.SettingCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SettingCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SettingCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
