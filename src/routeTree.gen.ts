/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MyCodesImport } from './routes/my-codes'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const MyCodesRoute = MyCodesImport.update({
  path: '/my-codes',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/my-codes': {
      id: '/my-codes'
      path: '/my-codes'
      fullPath: '/my-codes'
      preLoaderRoute: typeof MyCodesImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/my-codes': typeof MyCodesRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/my-codes': typeof MyCodesRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/my-codes': typeof MyCodesRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/my-codes'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/my-codes'
  id: '__root__' | '/' | '/my-codes'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MyCodesRoute: typeof MyCodesRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MyCodesRoute: MyCodesRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/my-codes"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/my-codes": {
      "filePath": "my-codes.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
