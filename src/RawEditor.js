import React from "react";
import PropTypes from "prop-types";
import "./style.css";

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content, lines: [] };
    this.contentRef = React.createRef();
  }

  componentDidMount = () => {
    const { content, showLineNumber } = this.props;
    if (showLineNumber) {
      const arr = content.split("\n");
      const lines = new Array(arr.length).fill(1);
      this.setState({ lines });
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.content != prevProps.content) {
      this.setState({ content: props.content });
    }
  };

  componentWillUnmount = () => {
    const { unmountCb } = this.props;
    if (unmountCb) unmountCb(this.contentRef.current.innerText);
  };

  onContentChange = () => {
    const { debounceInterval } = this.props;
    this.debounce(this.updateContent, debounceInterval || 1000)();
  };

  debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  updateContent = () => {
    // alert("Lines: " + lines);
    if (this.props.showLineNumber) {
      const lines = new Array(
        this.contentRef.current.childElementCount + 1
      ).fill(1);
      this.setState({ lines });
    }
  };

  render() {
    const { showLineNumber } = this.props;
    return (
      <div className="viewport">
        <div
          className={`text-editor ${showLineNumber ? "with-line-number" : ""}`}
        >
          <div className="content-container" >
            <div
              className="ruler"
              contentEditable="false"
            >
              {this.props.showLineNumber
                ? this.state.lines.map((k, i) => (
                    <div className="line-number">{i + 1}</div>
                  ))
                : []}
            </div>
            <div
              className="editor-wrapper"
              id="editor-wrapper"
              ref={this.contentRef}
              contentEditable="true"
              onInput={this.onContentChange}
            >
              {this.state.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  content: PropTypes.array,
  unmountCb: PropTypes.func
};

export default TextEditor;
