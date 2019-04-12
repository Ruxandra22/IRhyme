import React, { Component, Fragment} from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/PoetryModel";
import "./EditCard.css";

// imports for Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// imports for slate text editor and color picker
import { Editor } from 'slate-react';
import { Value, Block, Node } from 'slate';
import Html from 'slate-html-serializer';
import { isKeyHotkey } from 'is-hotkey'
import { ButtonCustom, Icon, Toolbar } from './Comps';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

// constants for text editor init
const DEFAULT_NODE = 'paragraph';
const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');

const BLOCK_TAGS = {
  p: 'paragraph',
};

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
};

//rules for serializing / deserializing HTML objects
const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underline':
            return <u>{children}</u>
        }
      }
    },
  },
]
const html = new Html({ rules });

class RichTextEditor extends Component {

  state = {
    // values of the different parts of the editor
    value: html.deserialize('<p></p>'),
    value2: html.deserialize('<p></p>'),
    value3: html.deserialize('<p></p>'),
    // html object of the text in the editor
    htmlString: '<p></p>',
    htmlString2: '<p></p>',
    htmlString3: '<p></p>',
    buttonPressed: false, 
    active: 1, 
    // color picker value
    color: "#00aabb",
    alignValue: "left",
  }

  //functions for the text editor
  hasMark = type => {
    if (this.state.active === 1) {
      const { value } = this.state
      return value.activeMarks.some(mark => mark.type === type)
    }
    else if (this.state.active === 2) {
      const { value2 } = this.state
      return value2.activeMarks.some(mark => mark.type === type)
    }
    else {
      const { value3 } = this.state
      return value3.activeMarks.some(mark => mark.type === type)
    }
  }

  ref = editor => {
    this.editor = editor
  }
  ref2 = editor => {
    this.editor2 = editor
  }
  ref3 = editor => {
    this.editor3 = editor
  }
  setActive = (num) => this.setState({active: num});

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    return (
      <ButtonCustom
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </ButtonCustom>
    )
  }
  changeHandler = (colors) => {
    this.setState({ color: colors.color })

  }
  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }
  renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'paragraph':
        return (
          <p {...props.attributes} className={props.node.data.get('className')}>
            {props.children}
          </p>
        )
      default:
        return next()
    }
  }
  onChange = ({ value }) => {
    this.setActive(1);
    let htmlstring = html.serialize(value);
    this.setState({ value, htmlString: htmlstring })
  }
  onChange2 = ({ value }) => {
    this.setActive(2);
    let htmlstring = html.serialize(value);
    this.setState({ value2: value, htmlString2: htmlstring });
  }
  onChange3 = ({ value }) => {
    this.setActive(3);
    let htmlstring = html.serialize(value);
    this.setState({ value3: value, htmlString3: htmlstring })
  }

  onKeyDown = (event, editor, next) => {
    let mark
    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  } 
  onKeyDown2 = (event, editor, next) => {
    let mark
    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  } 
  onKeyDown3 = (event, editor, next) => {
    let mark
    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  } 
  onClickMark = (event, type) => {
    event.preventDefault()
    if (this.state.active === 1) {
      this.editor.toggleMark(type);
    } else if (this.state.active === 2) {
      this.editor2.toggleMark(type);
    } else {
      this.editor3.toggleMark(type);
    }
  }

  // get poem from AI to the text editor
  generatePoem = () => {
    //TODO: get poem from AI here
    const edit = {
      "document": {
        "nodes": [
          {
            "object": "block",
            "type": "paragraph",
            "nodes": [
              {
                "object": "text",
                "leaves": [
                  {
                    "text": "A cheery hello on your birthday,"
                  }
                ]
              }
            ]
          },
          {
            "object": "block",
            "type": "paragraph",
            "nodes": [
              {
                "object": "text",
                "leaves": [
                  {
                    "text": "And wishes for everything bright,"
                  }
                ]
              }
            ]
          },
          {
            "object": "block",
            "type": "paragraph",
            "nodes": [
              {
                "object": "text",
                "leaves": [
                  {
                    "text": "May you know joy and wonder,"
                  }
                ]
              }
            ]
          },
          {
            "object": "block",
            "type": "paragraph",
            "nodes": [
              {
                "object": "text",
                "leaves": [
                  {
                    "text": "Morning, noon and night."
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    let val = Value.fromJSON(edit);
    let htmlstring = html.serialize(val);
    this.setState({
      value2: val,
      htmlString2: htmlstring,
      buttonPressed: true,
      active: 2,
    });
    console.log(this.state.htmlString2);
  }

  render() {

    return (
      <React.Fragment>

          <Toolbar clasName="white">
              {this.renderMarkButton('bold', 'format_bold')}
              {this.renderMarkButton('italic', 'format_italic')}
              {this.renderMarkButton('underlined', 'format_underlined')}
              <ColorPicker
                color={this.state.color}
                onChange={this.changeHandler}
                placement="topLeft"
                className="some-class"
              >
                <ButtonCustom>
                  <Icon>{'format_color_text'}</Icon>
                </ButtonCustom>
              </ColorPicker>
            </Toolbar>
            <div className="figure1 white">
              <div className="figure1_child" style={{color: this.state.color}}>
                <Editor
                  className="pad_50"
                  spellCheck
                  autoFocus
                  placeholder="Insert greeting here"
                  ref={this.ref}
                  value={this.state.value}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  renderMark={this.renderMark}
                  renderNode={this.renderNode}
                />
                <Editor
                  className="pad_50"
                  spellCheck
                  autoFocus
                  placeholder="Write a message or generate a poem"
                  ref={this.ref2}
                  value={this.state.value2}
                  onChange={this.onChange2}
                  onKeyDown={this.onKeyDown2}
                  renderMark={this.renderMark}
                  renderNode={this.renderNode}
                />
                <Editor
                  className="pad_50"
                  spellCheck
                  autoFocus
                  placeholder="Sign your name"
                  ref={this.ref3}
                  value={this.state.value3}
                  onChange={this.onChange3}
                  onKeyDown={this.onKeyDown3}
                  renderMark={this.renderMark}
                  renderNode={this.renderNode}
                />
              </div>
              <Button className="figure1_button" variant="outline-info" onClick={this.generatePoem}>
                {this.state.buttonPressed? "Regenerate AI poem": "Generate AI poem"}
              </Button>
            </div>
      </React.Fragment>
    )
  }

  
}

class EditCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 'INITIAL',
        cardId: this.props.match.params.id
      };
    }

    componentDidMount = () => {
      this.setState({
        status: 'LOADED',
        cardId: this.props.match.params.id
     })
    }
  
    render() {
      return (
        <div>
          <Container fluid={true}>
            <Row noGutters={false} className="pad_10">
                <Col md={{span: 4, offset:2}}>
                  <ImageCard cardId={this.state.cardId}/>
                </Col>
                <Col md={4}>
                  <RichTextEditor />
                </Col>
            </Row>
            <Row noGutters={false} className="pad_10" align="center">
                <Link to={{pathname: '/PrintCard/' + this.state.cardId}}>
                  <Button variant="outline-success" className="CreateBtn">Print Card!</Button>
                </Link>
             </Row>
          </Container>
        </div>
      );
    }
  }

  class ImageCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        cardId : this.props.cardId,
        url: null
      };
    }

    componentDidMount = () => {
      modelInstance.getCardImage(this.state.cardId).then(card => {
        this.setState({
          status: 'LOADED',
          url: card.src.portrait
        })
      }).catch(() => {
        this.setState({
          status: 'ERROR',
        })
      })
    }

    render() {
     
      return (
        <div>
          <React.Fragment>
            <div className="high"></div><div className="figure1 image_bcg" style={{backgroundImage : `url(${this.state.url})`}}>
              <div className="figure1_child">
                
              </div>
            </div>
          </React.Fragment>
        </div>
      );
    }
  }

export default EditCard;
