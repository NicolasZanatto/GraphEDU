import React, {useState} from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import * as SimulacaoActions from "../../../store/actions/simulacaoAction";
import { IState } from "../../../store/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        height: 8,
    },
    slider: {
        color: "#001"
    },
  }),
);

const ContadorPassos = (props: Props) => {
  const [passo, setPasso] = useState(0);
  const [qntdPassos, setQntdPassos] = useState(1);

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: qntdPassos === 0? 1 : qntdPassos,
      label: `${qntdPassos === 0? 1 : qntdPassos}`,
    },
  ];

  const classes = useStyles();

  React.useEffect(() => {
    setPasso(props.simulacao.passo);
    setQntdPassos(props.simulacao.qntdPassos);
  },[props.simulacao.passo,props.simulacao.qntdPassos]);

  return (
    <div className={classes.root}>
      <Slider
        className={classes.slider}
        defaultValue={0}
        value={passo}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
        min={0}
        max={qntdPassos}
      />
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  canvas: state.canvas,
  simulacao: state.simulacao
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SimulacaoActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(ContadorPassos)