import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../../store/actions/canvasAction";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const RadioButtonValoradoNaoValorado = ({ valorado, optionValoradoAction }) => {
    const [value, setValue] = React.useState(valorado);

    const handleChange = (event) => {
        var isTrue = (event.target.value === 'true');
        setValue(isTrue);
        optionValoradoAction(isTrue);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value={true} control={<Radio />} label="Valorado" labelPlacement="end" />
                <FormControlLabel value={false} control={<Radio />} label="Não Valorado" labelPlacement="end" />
            </RadioGroup>
        </FormControl>
    );
}



const mapStateToProps = state => ({
    valorado: state.canvas.valorado
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(CanvasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonValoradoNaoValorado);
