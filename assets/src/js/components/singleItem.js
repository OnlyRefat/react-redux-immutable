import React, { Component } from 'react';
import { List, Map } from 'immutable';

class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	value: '',
      edit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount() {
    this.setState({ value : this.props.item.get('text')});
  }
  handleChange(e) {
    e.preventDefault();
  	this.setState({ value: e.target.value });
  }
  handleEdit(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }
  handleSave(e) {
    this.props.Edit({ value: this.state.value, id: this.props.item.get('id') });
    this.setState({ edit: false });
  }
  render() {
    const { item } = this.props;
    return (<div>
      {item.get('text')}
      <button onClick={this.handleEdit}>Edit</button>
      {this.state.edit ? <div>
        <input value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleSave}>Save</button>
        </div>
      : null}
    </div>);
  }
}

export default SingleItem;
