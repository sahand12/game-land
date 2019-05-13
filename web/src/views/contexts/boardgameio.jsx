import { createContext } from 'react';

// @TODO: think about the default value
const IsConnectedContext = createContext();
const ResetContext = createContext();
const RedoContext = createContext();
const UndoContext = createContext();
const IsActiveContext = createContext();
const EventsContext = createContext();
const MovesContext = createContext();
const CtxContext = createContext();
const GContext = createContext();
const IsMultiplayerContext = createContext();

export {
  CtxContext,
  EventsContext,
  GContext,
  IsActiveContext,
  IsConnectedContext,
  IsMultiplayerContext,
  MovesContext,
  RedoContext,
  ResetContext,
  UndoContext,
};
