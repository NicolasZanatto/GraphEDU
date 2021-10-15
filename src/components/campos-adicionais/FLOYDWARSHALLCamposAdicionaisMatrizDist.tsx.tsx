import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ICaminhoFLOYDWARSHALL } from '../../store/types/floydWarshallTypes';

const useStyles = makeStyles((theme) => ({
    root:{
      textAlign: "center"
    },  
    table: {
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid rgba(0, 0, 0, 0.12)",
      },
      tr:{
        border: "1px solid rgba(0, 0, 0, 0.12)",
      },
      td:{
        border: "1px solid rgba(0, 0, 0, 0.12)",
        '&:hover': {
          background:"rgba(100,200,100,0.5)"
      },
      }
}));

export const MatrizDistancia =(passo : ICaminhoFLOYDWARSHALL)=> {
    const classes = useStyles();

    if(passo.matrizDistancia === undefined)
      return (<div></div>)

  return (
      <div className={classes.root}>
        <p>Matriz de Distâncias</p>
        <table className={classes.table}>
            <tr className={classes.tr}>
            <td className={classes.td} key={`r{index}`}></td>
            {passo.matrizDistancia.map((linha, index) => {
                return <td className={classes.td}>{index+1}</td>
            })}
            </tr>
            {passo.matrizDistancia.map((linha, index) => {
                return (<tr className={classes.tr} key={index}>
                             <td className={classes.td} key={`c{index}`}>{index+1}</td>
                            {linha.map((coluna, index) => {
                                return <td className={classes.td} key={index}>{coluna.peso ?? "∞"}</td>
                            })}
                </tr>
                )
            })}
        </table>
        </div>
  );
}