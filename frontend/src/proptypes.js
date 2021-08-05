import PropTypes from 'prop-types';

const objectType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  velocityX: PropTypes.number.isRequired,
  velocityY: PropTypes.number.isRequired,
  properties: PropTypes.objectOf(PropTypes.any),
});

const optionalIdObjectType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  velocityX: PropTypes.number.isRequired,
  velocityY: PropTypes.number.isRequired,
  properties: PropTypes.objectOf(PropTypes.any),
});

export { objectType, optionalIdObjectType };
