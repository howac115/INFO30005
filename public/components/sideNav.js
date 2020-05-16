import { slide as Menu } from 'react-burger-menu'

const e = React.createElement;

class Menu extends React.Component {
    showSettings (event) {
        event.preventDefault();
        console.log('The link was clicked.');
    .
    .
    }

    render () {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            </Menu>
            // Menu
            //     a#home(classname='menu-item', href='/') Home
            //     a#about(classname='menu-item', href='/about') About
            //     a#contact(classname='menu-item', href='/contact') Contact
            //     a(onclick='{' this.showsettings='' }='' classname='menu-item--small' href='') Settings
            //


        );
    }
}

// 'use strict';
//
// const e = React.createElement;
//
// class LikeButton extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { liked: false };
//     }
//
//     render() {
//         if (this.state.liked) {
//             return 'You liked this.';
//         }
//
//         return e(
//             'button',
//             { onClick: () => this.setState({ liked: true }) },
//             'Like'
//         );
//     }
// }

const domContainer = document.querySelector('#side-menu');
ReactDOM.render(e(Menu), domContainer);

//ReactDOM.render(e(Menu), document.getElementById('side-menu'));