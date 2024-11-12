import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export default class EditCountries extends React.Component {
  state = {
    isEdit: false,
  };

  renderMain = () => {
    return (
      <li>
        <div>
          <span>{this.props.sendIndex + 1 + ". " + this.props.skills}</span>
          <button onClick={this.stateToggle}>
            <EditIcon />
          </button>
          <button onClick={() => this.props.deleteHandle(this.props.sendIndex)}>
            <DeleteIcon />
          </button>
        </div>
      </li>
    );
  };

  // Toggle state
  stateToggle = () => {
    let { isEdit } = this.state;
    this.setState({
      isEdit: !isEdit,
    });
  };

  submitEdit = (e) => {
    e.preventDefault();
    this.props.editHandle(this.props.sendIndex, this.input.value);
    this.stateToggle(); // false = isEdit تشغيل الفنكشن ويخلي
  };

  renderEdit = () => {
    return (
      <form onSubmit={this.submitEdit}>
        <input
          type="text"
          ref={(v) => {
            this.input = v;
          }}
          defaultValue={this.props.skills}
          required
          maxLength="15"
        />
        <button>
          <CheckIcon />
        </button>
      </form>
    );
  };

  render() {
    let { isEdit } = this.state;
    return (
      <React.Fragment>
        {isEdit ? this.renderEdit() : this.renderMain()}
      </React.Fragment>
    );
  }
}
