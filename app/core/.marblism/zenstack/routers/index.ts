/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createDocumentationRouter from "./Documentation.router";
import createAgentRouter from "./Agent.router";
import createWorkflowRouter from "./Workflow.router";
import createToolRouter from "./Tool.router";
import createWorkflowAgentRouter from "./WorkflowAgent.router";
import createExecutionRouter from "./Execution.router";
import createNotificationRouter from "./Notification.router";
import createSettingRouter from "./Setting.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as DocumentationClientType } from "./Documentation.router";
import { ClientType as AgentClientType } from "./Agent.router";
import { ClientType as WorkflowClientType } from "./Workflow.router";
import { ClientType as ToolClientType } from "./Tool.router";
import { ClientType as WorkflowAgentClientType } from "./WorkflowAgent.router";
import { ClientType as ExecutionClientType } from "./Execution.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as SettingClientType } from "./Setting.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        documentation: createDocumentationRouter(router, procedure),
        agent: createAgentRouter(router, procedure),
        workflow: createWorkflowRouter(router, procedure),
        tool: createToolRouter(router, procedure),
        workflowAgent: createWorkflowAgentRouter(router, procedure),
        execution: createExecutionRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        setting: createSettingRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    documentation: DocumentationClientType<AppRouter>;
    agent: AgentClientType<AppRouter>;
    workflow: WorkflowClientType<AppRouter>;
    tool: ToolClientType<AppRouter>;
    workflowAgent: WorkflowAgentClientType<AppRouter>;
    execution: ExecutionClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    setting: SettingClientType<AppRouter>;
}
