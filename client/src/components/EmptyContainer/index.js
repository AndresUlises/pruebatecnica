import React from 'react';
import { Empty, Spin } from 'antd';
import PropTypes from 'prop-types';

import { CenterView } from '../CenterView';

export function EmptyContainer({ loading, children, ...leftProps }) {
  return (
    <section style={{ height: '100%', width: '100%', padding: '10px' }}>
      <CenterView>
        <Spin spinning={loading}>
          <Empty {...leftProps}>{children}</Empty>
        </Spin>
      </CenterView>
    </section>
  );
}

EmptyContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
};

EmptyContainer.defaultProps = {
  loading: false,
  children: null,
};
