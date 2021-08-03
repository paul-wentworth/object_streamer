import PropTypes from 'prop-types';

const objectType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  velocityX: PropTypes.number.isRequired,
  velocityY: PropTypes.number.isRequired,
  properties: PropTypes.objectOf(PropTypes.any), // TODO: test this dynamic proptype
});

const optionalIdObjectType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  velocityX: PropTypes.number.isRequired,
  velocityY: PropTypes.number.isRequired,
  properties: PropTypes.objectOf(PropTypes.any), // TODO: test this dynamic proptype
});

export { objectType, optionalIdObjectType };
