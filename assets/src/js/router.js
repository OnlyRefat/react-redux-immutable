import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import SingleItem from './components/singleItem';

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }
  handleAdd(e) {
    e.preventDefault();
    this.props.addItem({ id: new Date().getTime(), value: this.state.value });
    this.setState({ value: '' });
  }
  handleEdit(data) {
    this.props.editItem(data);
  }
  render() {
    const items = this.props.totalState.initial.get('allItem').toArray();
    // keySeq().toArray();
    const showItem = (singleItem) => {
      return (
        <SingleItem
          key={singleItem.get('id')} item={singleItem} Edit={this.handleEdit}
        />
      );
    };
    return (<div>
      <input
        type="text" value={this.state.value} onChange={this.handleChange}
      />
      <button
        onClick={this.handleAdd}
      >Add Item
      </button>
      {items.length > 0 ? items.map(showItem) : null}
    </div>);
  }
}
function addItem(data) {
  return {
    type: 'ADD_ITEM',
    data,
  };
}
function editItem(data) {
  return {
    type: 'EDIT_ITEM',
    data,
  };
}

export default connect(state => ({
  totalState: state,
}), { addItem, editItem })(Router);
