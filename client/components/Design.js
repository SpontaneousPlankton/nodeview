import React from 'react';

// Import Required Components
import Nav from './partials/Nav.js';
import Sidebar from './partials/design/Sidebar.js';
import CanvasContainer from './partials/design/CanvasContainer.js';
import Form from './partials/design/Form.js';


// Import React DnD
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// Decorate Design Component as a Drop Context
@DragDropContext(HTML5Backend)
export default class Design extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="content">
          <Sidebar />
          <CanvasContainer />
        </div>
      </div>
   );
  }
}
