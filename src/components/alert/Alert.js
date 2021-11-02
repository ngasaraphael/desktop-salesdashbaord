import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      width: '100%',
      padding: '0  10px',
      backgroundColor: '#edf2ff',
      marginBottom: '20px',
      height: '40px',
      textAlign: 'center',
      borderRadius: '4px',
      lineHeight: '40px',
    };
  };

  render() {
    return (
      <div className='Alert'>
        <div style={this.getStyle()}>{this.props.text}</div>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#0c2461';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'green';
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };
