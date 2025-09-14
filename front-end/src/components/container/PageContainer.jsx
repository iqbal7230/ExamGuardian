import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const PageContainer = ({ title, description, children }) => {
  return (
    <div className="">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;
