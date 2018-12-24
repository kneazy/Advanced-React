import Items from '../components/Items';
const Hello = props => (
  <div>
    <Items page={parseFloat(props.query.page)|| 1} />
  </div>
);

export default Hello;