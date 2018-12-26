import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  // this gets called as soon we get respone back from
  // the server after a mutation hes been reformed 
  update = ( cache, payload ) => {
    //1. first read the cache
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY
    })
    //2. remove that item form the catrt 
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    //3. wirit it back to the cache 
    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
  };

  render() {
    return (
    <Mutation 
      mutation={REMOVE_FROM_CART_MUTATION}
      update={this.update}
      optimisticResponse={{
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'cartItem',
          id: this.props.id,
        }
      }}
      variables={{id: this.props.id}} >
      {(removeFromCart, {loading, error }) => (
        <BigButton 
          disabled={loading}
          title='Delete Item'  
          onClick={() => { removeFromCart().catch(err => alert(err.message)); }}
        >
          &times;
        </BigButton>
      )}
    </Mutation>
    );
  }
}

export default RemoveFromCart;