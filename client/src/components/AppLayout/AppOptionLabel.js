import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AppOptionLabel({ path, label, isSubMenu }) {
  return isSubMenu && !path ? (
    <span>{label}</span>
  ) : (
    <Link to={`/${path.toLowerCase()}`}>{label}</Link>
  );
}

AppOptionLabel.propTypes = {
  path: PropTypes.string,
  label: PropTypes.string,
  isSubMenu: PropTypes.bool,
};

AppOptionLabel.defaultProps = {
  isSubMenu: false,
};
export default AppOptionLabel;
