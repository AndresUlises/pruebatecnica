import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function TextWithLink({ theme, title, linkTitle, path }) {
  return (
    <>
      {title && (
        <span style={{ color: theme.fontColor, paddingRight: '5px' }}>
          {title}
        </span>
      )}
      <Link to={path}>{linkTitle}</Link>
    </>
  );
}

TextWithLink.propTypes = {
  theme: PropTypes.object,
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  linkTitle: PropTypes.string,
};

TextWithLink.defaultProps = {
  theme: {},
};
