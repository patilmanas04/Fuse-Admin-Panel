import { createDynamicMiddleware } from '@reduxjs/toolkit/react';

const dynamicInstance = createDynamicMiddleware();
export const { middleware: dynamicMiddleware } = dynamicInstance;
export const addAppMiddleware = dynamicInstance.addMiddleware.withTypes();
export const withAppMiddleware = dynamicInstance.withMiddleware.withTypes();
export const createAppDispatchWithMiddlewareHook = dynamicInstance.createDispatchWithMiddlewareHook.withTypes();
