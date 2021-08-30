import { combineReducers } from "redux";
import canvas from "./canvasReducer";
import simulacao from "./simulacaoReducer";

export default combineReducers({
    canvas,
    simulacao
})
