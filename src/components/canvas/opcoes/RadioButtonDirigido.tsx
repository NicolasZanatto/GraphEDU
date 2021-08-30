import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as CanvasActions from "../../../store/actions/canvasAction";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { IState } from "../../../store/types";

const RadioButtonDirigidoNaoDirigido = (props: Props) => {
    const [value, setValue] = React.useState(props.dirigido);
    const handleChange = (event: any) => {
        var isTrue = (event.target.value === 'true');
        setValue(isTrue);
        props.optionDirigidoAction(isTrue);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value={true} control={<Radio />} label="Dirigido" labelPlacement="end" />
                <FormControlLabel value={false} control={<Radio />} label="Não Dirigido" labelPlacement="end" />
            </RadioGroup>
        </FormControl>
    );
}


const mapStateToProps = (state: IState) => ({
    dirigido: state.canvas.dirigido
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(CanvasActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(RadioButtonDirigidoNaoDirigido)
