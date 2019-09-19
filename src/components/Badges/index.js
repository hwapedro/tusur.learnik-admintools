import React, { Component } from "react";
import PropTypes from "prop-types";
import BadgeConstructor from "./BadgeConstructor";
import BadgesList from "./BadgeList";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "badge";

export default class Badge extends Component {
  state = {
    search: "",
    activeLanguage: {label: "Russian", value: "ru"}
  };

  componentDidMount() {
    const { getAllBadges } = this.props;
    getAllBadges(name);
  }

  handleLangChange = activeLanguage => {
    this.setState({ activeLanguage });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      loading,
      badges,
      changeBadge,
      createBadge,
      getAllBadges,
      delBadge,
      error
    } = this.props;

    const { search, activeLanguage } = this.state;
    return (
      <>
        {error && (
          <>
            <Error name={name} />
          </>
        )}

        {loading && (
          <>
            <Spinner />
          </>
        )}
        {!error && !loading && (
          <>
            <BadgeConstructor
             value={search}
              createBadge={(title, description, name) =>
                createBadge(title, description, name)
              }
              getAllBadges={name => getAllBadges(name)}
              onChange={this.onChange}
              activeLanguage={activeLanguage}
              handleLangChange={activeLanguage => this.handleLangChange(activeLanguage)}
            />

            <BadgesList
              badges={badges}
              search={search}
              changeBadge={(courseIndex, title, description, name, icon) =>
                changeBadge(courseIndex, title, description, name, icon)
              }
              activeLanguage={activeLanguage}
              delBadge={(courseIndex, name) => delBadge(courseIndex, name)}
            />
          </>
        )}
      </>
    );
  }
}

Badge.defaultProps = {
  badges: [],
  loading: false,
  error: false,
  addBadge() {},
  delBadge() {},
  getAllBadges() {},
  changeBadge() {},
  changeIconBadge() {}
};

Badge.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addBadge: PropTypes.func,
  delBadge: PropTypes.func,
  getAllBadges: PropTypes.func,
  changeBadge: PropTypes.func,
  changeIconBadge: PropTypes.func
};

