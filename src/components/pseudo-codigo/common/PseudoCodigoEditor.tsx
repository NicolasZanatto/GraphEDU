import React from 'react';
import AceEditor, { IMarker } from "react-ace";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IPseudoCodigoEditor } from './IPseudoCodigoEditor';

import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/mode-c_cpp'
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            textAlign: "center",
            fontSize: "14px",
            paddingTop: "10px"            
        },
        editor: {
            resize: "both",
            maxWidth: "100%",
            overflow: "auto",
            paddingTop: "30px"            
        },
        marker: {
            position:"absolute",
            background:"rgba(100,200,100,0.5)",
        }
    }),
);

const PseudoCodigoEditor = (props: IPseudoCodigoEditor) => {
    const classes = useStyles();
    const marker : IMarker = {
        startRow: props.linha? props.linha - 1: 0,
        startCol: 0,
        endRow: props.linha? props.linha - 1: 0,
        endCol: props.linha === undefined ? 0 : 30,
        className: `${classes.marker}`,
        type: 'fullLine'
    }
    
    return (
        <Paper className={classes.title} variant="outlined" elevation={0}>
            PseudoCódigo
        <AceEditor
            className={classes.editor}
            readOnly={true}
            value={props.algoritmo}
            fontSize={15}
            showPrintMargin={false}
            mode="c_cpp"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            markers={[marker]}
            setOptions={{
                useSoftTabs: true,
                indentedSoftWrap: false, 
            }
            }
        />
        </Paper>
    );
}


export default PseudoCodigoEditor