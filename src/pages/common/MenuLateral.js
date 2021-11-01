import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ItemLink from "./ItemLink";
import { EAlgoritmos } from '../../Algoritmos/EAlgoritmos';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ItensMenuPaginaInicial = [
  { text: 'Página Inicial', caminho: "/" },
];

const ItensMenuAlgoritmoBusca = [
  { text: 'Dfs', caminho: "DFS", enumAlgoritmo: EAlgoritmos.DFS },
  { text: 'Bfs', caminho: "BFS", enumAlgoritmo: EAlgoritmos.BFS },
];

const ItensMenuAlgoritmoCaminhoMinimo = [
  { text: 'Dijkstra', caminho: 'DIJKSTRA', enumAlgoritmo: EAlgoritmos.DIJKSTRA },
  { text: 'Bellman-Ford', caminho: 'BELLMANFORD', enumAlgoritmo: EAlgoritmos.BELLMANFORD },
  { text: 'Floyd-Warshall', caminho: 'FLOYDWARSHALL', enumAlgoritmo: EAlgoritmos.FLOYDWARSHALL },
];

const ItensMenuAlgoritmoArvoreGeradoraMinima = [
  { text: 'Prim', caminho: 'PRIM', enumAlgoritmo: EAlgoritmos.PRIM },
  { text: 'Kruskal', caminho: 'KRUSKAL', enumAlgoritmo: EAlgoritmos.KRUSKAL },
]

export const MenuLateral = (props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#151A1E", color: "#fff" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GraphEDU
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ItensMenuPaginaInicial.map((item, index) => (
            <ItemLink key={index} caminho={item.caminho} text={item.text} home={true} algoritmo={0}></ItemLink>
          ))}
        </List>
        <Divider />
        <List>
          {ItensMenuAlgoritmoBusca.map((item, index) => (
            <ItemLink key={index} caminho={item.caminho} text={item.text} home={false} algoritmo={item.enumAlgoritmo}></ItemLink>
          ))}
        </List>
        <Divider />
        <List>
          {ItensMenuAlgoritmoCaminhoMinimo.map((item, index) => (
            <ItemLink key={index} text={item.text} caminho={item.caminho} home={false} algoritmo={item.enumAlgoritmo}></ItemLink>
          ))}
        </List>
        <Divider />
        <List>
          {ItensMenuAlgoritmoArvoreGeradoraMinima.map((item, index) => (
            <ItemLink key={index} text={item.text} caminho={item.caminho} home={false} algoritmo={item.enumAlgoritmo}></ItemLink>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader/>
        {props.children}
      </Main>
    </Box>
  );
}