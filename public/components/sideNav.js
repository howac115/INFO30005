import { slide as Menu } from 'react-burger-menu'

class sideNav extends React.Component {
    showSettings (event) {
        event.preventDefault();
    .
    .
    .
    }

    render () {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            // <Menu>
            //     <a id="home" className="menu-item" href="/">Home</a>
            //     <a id="about" className="menu-item" href="/about">About</a>
            //     <a id="contact" className="menu-item" href="/contact">Contact</a>
            //     <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            // </Menu>
            Menu
                a#home(classname='menu-item', href='/') Home
                a#about(classname='menu-item', href='/about') About
                a#contact(classname='menu-item', href='/contact') Contact
                a(onclick='{' this.showsettings='' }='' classname='menu-item--small' href='') Settings



        );
    }
}

const domContainer = document.querySelector('#side-menu');
ReactDOM.render(e(sideNav), domContainer);