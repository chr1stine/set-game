import renderer from 'react-test-renderer';
import Modal from '../src/components/Modal';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

it('Modal renders', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Modal />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
