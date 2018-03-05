import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import cacheUserRecord from "../../redux/actions/cacheUserRecord";
import PropTypes from 'prop-types';
import toastr from "toastr";

import ProgressVisualizer from './progressVisualizer';

function notInitialized(value) {
  return !value;
}

@connect(
    state => {
      return {
        user: state.userState
      };
    },

    dispatch => {
      return {
        cacheUserRecord: records => dispatch(cacheUserRecord(records))
      };
    }
)
class HomePage extends Component {

  /**
   *
   * @type {{user: shim, cacheUserRecord: shim}}
   * state1: user not login
   * state2: user log in, but records not fetched
   * state3: user log in, records fetched
   */

  static propTypes = {
    user: PropTypes.object,
    cacheUserRecord: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {user: undefined};

  }

  componentDidMount() {
    if (this.props.user.email === "") return;

    if (notInitialized(this.props.user.records)) {
      const that = this;
      $.get("/record", function (res) {
        that.props.cacheUserRecord(res);
      });
    }
  }


  render() {
    const that = this;
    return (
        <div className="home container">

          <div className="user-info">
            {
              this.props.user.email
                  ? (
                      <div>
                        {
                          this.props.user.records
                              ? recordList(this.props.user.records)
                              : "fetching history records"
                        }
                        <ProgressVisualizer records={this.props.user.records}/>
                      </div>
                  )
                  : (<h4>please log in</h4>)
            }

          </div>
        </div>
    );
  }
}

function recordList(records) {
  return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header"><h5>records</h5></li>
          {
            records.map(
                record => (
                    <li className="collection-item">
                      <div> wpf: {record.wpf} </div>
                      <span>{toTimeStr(record.createAt)}</span>
                    </li>
                )
            )
          }
        </ul>
      </div>
  );
}

function toTimeStr(timeStr) {
  const time = new Date(timeStr);
  return time.toLocaleTimeString() + "  " + time.toLocaleDateString();
}


export default HomePage;