import SingleItem from '../components/Singleitem';

const Item = props => (
  <div>
    <SingleItem id={props.query.id} />
  </div>
);

export default Item;