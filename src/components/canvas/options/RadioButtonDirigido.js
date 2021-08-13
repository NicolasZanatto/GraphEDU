import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../../store/actions/canvasAction";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';



const RadioButtonDirigidoNaoDirigido = ({ dirigido, optionDirigidoAction }) => {
    const [value, setValue] = React.useState(dirigido);

    const handleChange = (event) => {
        var isTrue = (event.target.value === 'true');
        setValue(isTrue);
        optionDirigidoAction(isTrue);
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


const mapStateToProps = state => ({
    dirigido: state.canvas.dirigido
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(CanvasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonDirigidoNaoDirigido);
