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

        createMany: procedure.input($Schema.ChatParticipantInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatParticipant.createMany(input as any))),

        create: procedure.input($Schema.ChatParticipantInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatParticipant.create(input as any))),

        deleteMany: procedure.input($Schema.ChatParticipantInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatParticipant.deleteMany(input as any))),

        delete: procedure.input($Schema.ChatParticipantInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatParticipant.delete(input as any))),

        findFirst: procedure.input($Schema.ChatParticipantInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatParticipant.findFirst(input as any))),

        findMany: procedure.input($Schema.ChatParticipantInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatParticipant.findMany(input as any))),

        findUnique: procedure.input($Schema.ChatParticipantInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).chatParticipant.findUnique(input as any))),

        updateMany: procedure.input($Schema.ChatParticipantInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatParticipant.updateMany(input as any))),

        update: procedure.input($Schema.ChatParticipantInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatParticipant.update(input as any))),

        count: procedure.input($Schema.ChatParticipantInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatParticipant.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ChatParticipantCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatParticipantCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatParticipantCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatParticipantCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ChatParticipantCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatParticipantCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatParticipantGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatParticipantGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatParticipantCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatParticipantCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatParticipantGetPayload<T>, Context>) => Promise<Prisma.ChatParticipantGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ChatParticipantDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatParticipantDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatParticipantDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatParticipantDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ChatParticipantDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatParticipantDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatParticipantGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatParticipantGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatParticipantDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatParticipantDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatParticipantGetPayload<T>, Context>) => Promise<Prisma.ChatParticipantGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ChatParticipantFindFirstArgs, TData = Prisma.ChatParticipantGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatParticipantFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatParticipantGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatParticipantFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatParticipantFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatParticipantGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatParticipantGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ChatParticipantFindManyArgs, TData = Array<Prisma.ChatParticipantGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatParticipantFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ChatParticipantGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatParticipantFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatParticipantFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ChatParticipantGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ChatParticipantGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ChatParticipantFindUniqueArgs, TData = Prisma.ChatParticipantGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ChatParticipantFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatParticipantGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatParticipantFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChatParticipantFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatParticipantGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatParticipantGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ChatParticipantUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatParticipantUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatParticipantUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatParticipantUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ChatParticipantUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatParticipantUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatParticipantGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatParticipantGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatParticipantUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatParticipantUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatParticipantGetPayload<T>, Context>) => Promise<Prisma.ChatParticipantGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ChatParticipantCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatParticipantCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ChatParticipantCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ChatParticipantCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ChatParticipantCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ChatParticipantCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ChatParticipantCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatParticipantCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
