import React from 'react';

class App extends React.Component {
  render() {
    return(
      <div className='container-fluid'>
        <p>Heaeder here...</p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;