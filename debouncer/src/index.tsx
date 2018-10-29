import * as React from 'react';
import { SFC, Component, ComponentClass, StatelessComponent } from 'react';
import { render } from 'react-dom';
import { pick, debounce } from 'lodash';

function debounceIt<T>(propsNames: [keyof T], funcDebounce: any) {
  return function(
    BaseComponent: ComponentClass<T, any> | StatelessComponent<T>
  ) {
    return class DebouncedComponent extends Component<T, T> {
      state: T = pick(this.props, propsNames);

      debounceChange = funcDebounce((props: T) => {
        this.setState(props);
      }, 3000);

      componentDidUpdate(prevProps: T) {
          this.debounceChange(prevProps);
      }

      render() {
        return (
          <BaseComponent {...pick(this.props, propsNames)} {...this.state} />
        );
      }
    };
  };
}

const ClickerShow: SFC<{ times: number }> = ({ times }) => {
  return <h1>Clicked {times}</h1>;
};

const debouncer = debounceIt<{ times: number }>(['times'], debounce);

const DebouncedClickerShow = debouncer(ClickerShow);

class Clicker extends Component {
  state = {
    times: 0
  };

  handler = () => {
    this.setState({
      times: this.state.times + 1
    });
  };

  render() {
    return (
      <>
        <DebouncedClickerShow times={this.state.times} />
        <button onClick={this.handler}>Push</button>
      </>
    );
  }
}

render(<Clicker />, document.getElementById('app'));
