import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IState } from "../../store/types";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    })
);

const DFSCamposAdicionais = (props: Props) => {
    const classes = useStyles();
    const passo = props.simulacao.dfs.caminho[props.simulacao.passo];
    console.log("Passo Campos Adicionais", passo);
    const verticeInicial = passo !== undefined ? passo.verticeInicial : 0;
    const verticesAdj = passo !== undefined ? passo.listaAdj.toString() : "";

    return (
        <div className={classes.root}>
            {/* <TextField disabled id="standard-disabled" label="Vértice Inicial" value={verticeInicial} /> */}
            {/* <TextField disabled id="standard-disabled" label="Vértice Adjacentes" value={verticesAdj} /> */}
        </div>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(DFSCamposAdicionais)