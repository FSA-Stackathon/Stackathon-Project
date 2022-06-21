import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";

class AllUsers extends React.Component {

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <div>
          <h1>All Users in the database</h1>
          <h3> Users</h3>
        </div>
        <ol>
          {}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
