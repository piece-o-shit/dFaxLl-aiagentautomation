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

        createMany: procedure.input($Schema.ChatConversationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatConversation.createMany(input as any))),

        create: procedure.input($Schema.ChatConversationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatConversation.create(input as any))),

        deleteMany: procedure.input($Schema.ChatConversationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatConversation.deleteMany(input as any))),

        delete: procedure.input($Schema.ChatConversationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatConversation.delete(input as any))),

        findFirst: procedure.input($Schema.ChatConversationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatConversation.findFirst(input as any))),

        findMany: procedure.input($Schema.ChatConversationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatConversation.findMany(input as any))),

        findUnique: procedure.input($Schema.ChatConversationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).chatConversation.findUnique(input as any))),

        updateMany: procedure.input($Schema.ChatConversationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatConversation.updateMany(input as any))),

        update: procedure.input($Schema.ChatConversationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chatConversation.update(input as any))),

        count: procedure.input($Schema.ChatConversationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).chatConversation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ChatConversationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatConversationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatConversationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatConversationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ChatConversationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatConversationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatConversationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatConversationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatConversationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatConversationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatConversationGetPayload<T>, Context>) => Promise<Prisma.ChatConversationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ChatConversationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatConversationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatConversationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatConversationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ChatConversationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatConversationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatConversationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatConversationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatConversationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatConversationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatConversationGetPayload<T>, Context>) => Promise<Prisma.ChatConversationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ChatConversationFindFirstArgs, TData = Prisma.ChatConversationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatConversationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatConversationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatConversationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatConversationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatConversationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatConversationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ChatConversationFindManyArgs, TData = Array<Prisma.ChatConversationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatConversationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ChatConversationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatConversationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatConversationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ChatConversationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ChatConversationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ChatConversationFindUniqueArgs, TData = Prisma.ChatConversationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ChatConversationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatConversationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatConversationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChatConversationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatConversationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatConversationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ChatConversationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatConversationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatConversationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatConversationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ChatConversationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatConversationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatConversationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatConversationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatConversationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatConversationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatConversationGetPayload<T>, Context>) => Promise<Prisma.ChatConversationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ChatConversationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatConversationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ChatConversationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ChatConversationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ChatConversationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ChatConversationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ChatConversationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatConversationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
