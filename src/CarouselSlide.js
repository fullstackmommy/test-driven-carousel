import PropTypes from "prop-types";
import React from "react";

const CarouselSlide = ({ imgUrl, description, attribution, ...rest }) => {
  return (
    <figure {...rest}>
      <img src={imgUrl} />
      <figcaption>
        <strong>{description}</strong>
        {attribution}
      </figcaption>
    </figure>
  );
};

CarouselSlide.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  attribution: PropTypes.node
};

export default CarouselSlide;
