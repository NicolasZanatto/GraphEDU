import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as CanvasActions from "../../../store/actions/canvasAction";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { IState } from "../../../store/types";
import { EAlgoritmos } from '../../../Algoritmos/EAlgoritmos';

const RadioButtonValoradoNaoValorado = (props: Props) => {
    const algoritmosValorados = [EAlgoritmos.DIJKSTRA, EAlgoritmos.BELLMANFORD, EAlgoritmos.FLOYDWARSHALL];
    const handleValue = () => {
        if (algoritmosValorados.includes(props.tipoAlgoritmo ?? 0)) {
            props.optionValoradoAction(true);
            return true;
        }

        return props.valorado;
    }

    const [value, setValue] = React.useState(handleValue());

    const handleChange = (event: any) => {
        var isTrue = (event.target.value === 'true');
        setValue(isTrue);
        props.optionValoradoAction(isTrue);
    };

    const handleDisabled = () => {
        if (algoritmosValorados.includes(props.tipoAlgoritmo ?? 0))
            return true;

        return false;
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel disabled={handleDisabled()} value={true} control={<Radio />} label="Valorado" labelPlacement="end" />
                <FormControlLabel disabled={handleDisabled()} value={false} control={<Radio />} label="Não Valorado" labelPlacement="end" />
            </RadioGroup>
        </FormControl>
    );
}



const mapStateToProps = (state: IState) => ({
    valorado: state.canvas.valorado,
    tipoAlgoritmo: state.simulacao.tipoAlgoritmo
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(CanvasActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(RadioButtonValoradoNaoValorado)