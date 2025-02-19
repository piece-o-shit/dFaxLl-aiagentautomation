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

        createMany: procedure.input($Schema.ChatMessageInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatMessage.createMany(input as any))),

        create: procedure.input($Schema.ChatMessageInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatMessage.create(input as any))),

        deleteMany: procedure.input($Schema.ChatMessageInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatMessage.deleteMany(input as any))),

        delete: procedure.input($Schema.ChatMessageInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatMessage.delete(input as any))),

        findFirst: procedure.input($Schema.ChatMessageInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatMessage.findFirst(input as any))),

        findMany: procedure.input($Schema.ChatMessageInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatMessage.findMany(input as any))),

        findUnique: procedure.input($Schema.ChatMessageInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).chatMessage.findUnique(input as any))),

        updateMany: procedure.input($Schema.ChatMessageInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatMessage.updateMany(input as any))),

        update: procedure.input($Schema.ChatMessageInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatMessage.update(input as any))),

        count: procedure.input($Schema.ChatMessageInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatMessage.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ChatMessageCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatMessageCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatMessageCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatMessageCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ChatMessageCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatMessageCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatMessageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatMessageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatMessageCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatMessageCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatMessageGetPayload<T>, Context>) => Promise<Prisma.ChatMessageGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ChatMessageDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatMessageDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatMessageDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatMessageDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ChatMessageDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatMessageDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatMessageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatMessageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatMessageDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatMessageDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatMessageGetPayload<T>, Context>) => Promise<Prisma.ChatMessageGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ChatMessageFindFirstArgs, TData = Prisma.ChatMessageGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatMessageFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatMessageGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatMessageFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatMessageFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatMessageGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatMessageGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ChatMessageFindManyArgs, TData = Array<Prisma.ChatMessageGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatMessageFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ChatMessageGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatMessageFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatMessageFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ChatMessageGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ChatMessageGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ChatMessageFindUniqueArgs, TData = Prisma.ChatMessageGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ChatMessageFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatMessageGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatMessageFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChatMessageFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatMessageGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatMessageGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ChatMessageUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatMessageUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatMessageUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatMessageUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ChatMessageUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatMessageUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatMessageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatMessageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatMessageUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatMessageUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatMessageGetPayload<T>, Context>) => Promise<Prisma.ChatMessageGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ChatMessageCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatMessageCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ChatMessageCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ChatMessageCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ChatMessageCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ChatMessageCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ChatMessageCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatMessageCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
