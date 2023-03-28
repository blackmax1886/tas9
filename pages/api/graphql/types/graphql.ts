/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql'
import { User } from '@prisma/client/index.d'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: 'Mutation'
  createTask: Task
  createUser: PrismaUser
}

export type MutationCreateTaskArgs = {
  input: NewTask
}

export type MutationCreateUserArgs = {
  input: NewUser
}

export type NewTask = {
  content?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  userId: Scalars['Int']
}

export type NewUser = {
  email: Scalars['String']
  name?: InputMaybe<Scalars['String']>
}

export type PrismaUser = {
  __typename?: 'PrismaUser'
  email: Scalars['String']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  task: Task
  tasks: Array<Task>
  user?: Maybe<PrismaUser>
}

export type QueryTaskArgs = {
  id: Scalars['Int']
}

export type QueryTasksArgs = {
  userId: Scalars['Int']
}

export type QueryUserArgs = {
  id: Scalars['Int']
}

export type Task = {
  __typename?: 'Task'
  archived: Scalars['Boolean']
  content?: Maybe<Scalars['String']>
  done: Scalars['Boolean']
  due?: Maybe<Scalars['String']>
  end?: Maybe<Scalars['String']>
  group?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  priority?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['Int']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  NewTask: NewTask
  NewUser: NewUser
  PrismaUser: ResolverTypeWrapper<User>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Task: ResolverTypeWrapper<Task>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']
  ID: Scalars['ID']
  Int: Scalars['Int']
  Mutation: {}
  NewTask: NewTask
  NewUser: NewUser
  PrismaUser: User
  Query: {}
  String: Scalars['String']
  Task: Task
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createTask?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTaskArgs, 'input'>
  >
  createUser?: Resolver<
    ResolversTypes['PrismaUser'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >
}

export type PrismaUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PrismaUser'] = ResolversParentTypes['PrismaUser']
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  task?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    RequireFields<QueryTaskArgs, 'id'>
  >
  tasks?: Resolver<
    Array<ResolversTypes['Task']>,
    ParentType,
    ContextType,
    RequireFields<QueryTasksArgs, 'userId'>
  >
  user?: Resolver<
    Maybe<ResolversTypes['PrismaUser']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >
}

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  done?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  due?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  priority?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  start?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>
  PrismaUser?: PrismaUserResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Task?: TaskResolvers<ContextType>
}
