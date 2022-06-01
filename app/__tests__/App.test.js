import TestRenderer from 'react-test-renderer';
import App from '../src/components/App';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

it('App renders', () => {
  const component = TestRenderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
