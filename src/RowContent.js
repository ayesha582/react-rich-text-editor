import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class RowContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.text, mounted: false, raw: props.text };
    this.textRef = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ mounted: true });
  };


  render() {
    return (
      <div className="content" ref={this.textRef} id={this.props.id}>
        <If condition={this.state.mounted}>
          {this.state.text.map((cont, i) => {
            return (
              <Fragment>
                {i !== 0 ? ',' : ''}
                <span
                  className={'block-content'}
                  contentEditable="true"
                  key={`${this.props.id}-text-block-${index}`}
                >
                  {cont}
                </span>
              </Fragment>
            );
          })}
        </If>
      </div>
    );
  }
}
RowContent.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
};

export default RowContent;
