import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      // Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }

  render() {
    // const clients = [
    //   {
    //     id: "4343434343",
    //     firstName: "Kevin",
    //     lastName: "Johnson",
    //     email: "kevin@gmail.com",
    //     phone: "555-555-5555",
    //     balance: "30"
    //   },
    //   {
    //     id: "4343454",
    //     firstName: "Bob",
    //     lastName: "Jackson",
    //     email: "bob@gmail.com",
    //     phone: "555-555-34535",
    //     balance: "1000"
    //   }
    // ];
    // const clients = this.props.clients;
    const { clients } = this.props;
    const { totalOwed } = this.state;

    // let totalBalance = 0;

    if (clients) {
      // totalBalance = clients.reduce(
      //   (sum, el) => sum + parseFloat(el.balance),
      //   0
      // );
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users">Clients</i>
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total owed{" "}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                  {/* ${totalBalance} */}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className=" btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      // return <h1>Loading...</h1>;
      return <Spinner />;
    }
    // return (
    //   <div>
    //     <h1>Clients</h1>
    //   </div>
    // );
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

// export default Clients;
export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
