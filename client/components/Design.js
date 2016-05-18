import React from 'react';
import Popup from 'react-popup';

// Import Required Components
import Nav from './partials/Nav.js';
import Sidebar from './partials/design/Sidebar.js';
import CanvasContainer from './partials/design/CanvasContainer.js';

// Import React DnD
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';

// Decorate Design Component as a Drop Context
@dragDropContext(HTML5Backend)
export default class Design extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createPrompt(text, btnText, cb) {
    Popup.create({
      title: null,
      content: text,
      buttons: {
        left: ['cancel'],
        right: [{
          text: btnText,
          className: 'warning', // optional
          action(popup) {
            cb();
            popup.close();
          },
        }],
      },
    });
  }


  render() {
    return (
      <div className="container">
        <Nav />
        <div className="content">
          <Sidebar />
          <CanvasContainer createPrompt={this.createPrompt} />
        </div>
        <Popup
          className="mm-popup"
          btnClass="btn-popup"
        />
      </div>
   );
  }
}
