import React from 'react';

class  ErreurDom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600">Oups, quelque chose s'est mal passé.</h2>
          <p className="text-gray-600 mt-2">Veuillez rafraîchir la page ou réessayer plus tard.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErreurDom;