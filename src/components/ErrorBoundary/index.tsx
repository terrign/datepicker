import { Component } from 'react';

interface State {
  hasError: boolean;
  errorMessage: string | null;
}
interface Props {
  children?: JSX.Element;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  refreshPage = () => {
    this.setState({ hasError: false });
    this.forceUpdate();
  };

  render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      return (
        <section>
          <h1>Something went wrong, please try to reload</h1>
          <p>Error: {errorMessage}</p>
          <button onClick={this.refreshPage} type="button">
            Reload
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
