import * as React from "react";
import styles from './styles';

const ModalDisplay = props => {
  const mergeStyles = key => Object.assign({}, styles[key]);
  const dialogStyles = mergeStyles('dialogStyles');
  const overlayStyles = mergeStyles('overlayStyles');
  const closeButtonStyle = mergeStyles('closeButtonStyle');
  const titleStyle = mergeStyles('titleStyle');
  overlayStyles.display = dialogStyles.display = 'block';

  const overlay = (
      <div className="skylight-overlay"
           onClick={() => props.onOverlayClicked()}
           style={overlayStyles}
      />);

  return (
      <section className="myModal-wrapper">
        {overlay}
        <div
            className="myModal-dialog" style={dialogStyles}
        >
          <a role="button" className="myModal-close-button"
             style={closeButtonStyle}
             onClick={() => props.onCloseClicked()}
          >
            &times;
          </a>
          <h2 style={titleStyle}>{props.title}</h2>
          {props.children}
        </div>
      </section>
  );
};

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({isVisible: false}, props);
  }

  render() {
    return (
        this.state.isVisible ?
            (
                <ModalDisplay
                    onCloseClicked={() => this.hide()}
                    onOverlayClicked={() => this.hide()}
                >
                  {this.state.children}
                </ModalDisplay>
            )
            : <div/>
    );
  }

  show() {
    this.setState({isVisible: true});
  }

  hide() {
    this.setState({isVisible: false});
  }

}