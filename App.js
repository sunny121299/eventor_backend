import React from 'react';
import Nav from './component/nav/Nav';
import SideDrawer from './component/nav/sidetoggler/Sidetoggler';
import Backdrop from './component/nav/backdrop/Backdrop';
import Home from './component/Home';
import Contact from './component/Contact';
import Event from './component/Event';
import './index.css';
import { Route, Switch } from 'react-router-dom';
class App extends React.Component {
    state = {
        sideDrawerOpen: false
    };
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    };

    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = < Backdrop click = { this.backdropClickHandler }
            />;
        }
        return ( < >
            <
            Nav drawerClickHandler = { this.drawerToggleClickHandler }
            /> <
            SideDrawer show = { this.state.sideDrawerOpen }
            />{ backdrop } 

            <
            Switch > < Route exact path = '/'
            component = { Home }
            />   <
            Route exact path = '/events'
            component = { Event }
            />  <
            Route exact path = '/contact'
            component = { Contact }
            /> < /
            Switch > <
            />
        );
    }

}
export default App;