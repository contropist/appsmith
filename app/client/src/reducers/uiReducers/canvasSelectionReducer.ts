import { createImmerReducer } from "utils/AppsmithUtils";
import { ReduxAction, ReduxActionTypes } from "constants/ReduxActionConstants";
import { MAIN_CONTAINER_WIDGET_ID } from "constants/WidgetConstants";
import { XYCord } from "pages/common/CanvasArenas/hooks/useCanvasDragging";

const initialState: CanvasSelectionState = {
  isDraggingForSelection: false,
  widgetId: "",
  outOfCanvasStartPositions: undefined,
  newWidgets: {},
};

export const canvasSelectionReducer = createImmerReducer(initialState, {
  [ReduxActionTypes.START_CANVAS_SELECTION]: (
    state: CanvasSelectionState,
    action: ReduxAction<{ widgetId?: string }>,
  ) => {
    state.isDraggingForSelection = true;
    state.widgetId = action.payload.widgetId;
  },
  [ReduxActionTypes.STOP_CANVAS_SELECTION]: (state: CanvasSelectionState) => {
    state.isDraggingForSelection = false;
    state.widgetId = "";
    state.outOfCanvasStartPositions = undefined;
  },
  [ReduxActionTypes.START_CANVAS_SELECTION_FROM_EDITOR]: (
    state: CanvasSelectionState,
    action: ReduxAction<{ startPoints?: XYCord }>,
  ) => {
    state.isDraggingForSelection = true;
    state.widgetId = MAIN_CONTAINER_WIDGET_ID;
    state.outOfCanvasStartPositions = action.payload.startPoints;
  },
  [ReduxActionTypes.STOP_CANVAS_SELECTION_FROM_EDITOR]: (
    state: CanvasSelectionState,
  ) => {
    state.isDraggingForSelection = false;
    state.widgetId = "";
    state.outOfCanvasStartPositions = undefined;
  },
  ADD_NEW_WIDGET: (
    state: CanvasSelectionState,
    action: ReduxAction<string[]>,
  ) => {
    if (Array.isArray(action.payload)) {
      action.payload.forEach((id) => {
        state.newWidgets[id] = id;
      });
    }
  },
  REMOVE_NEW_WIDGET: (
    state: CanvasSelectionState,
    action: ReduxAction<string>,
  ) => {
    delete state.newWidgets[action.payload];
  },
});

export type CanvasSelectionState = {
  isDraggingForSelection: boolean;
  widgetId?: string;
  outOfCanvasStartPositions?: XYCord;
  newWidgets: Record<string, string>;
};

export default canvasSelectionReducer;
