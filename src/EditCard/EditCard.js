import React, { Component, Fragment, useState, useRef} from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Editor } from 'slate-react'
import { Value, Block, Node } from 'slate'

import { isKeyHotkey } from 'is-hotkey'
import { Button1, Icon, Toolbar } from './Comps'
import initialValue from './value.json'
import initialValue2 from './value2.json'

//import modelInstance from "./data/PoetryModel";
import "./EditCard.css";

const DEFAULT_NODE = 'paragraph'
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')

class RichTextEditor extends Component {

  state = {
    value: Value.fromJSON(initialValue),
    value2: Value.fromJSON(initialValue2),
    buttonPressed: false, 
    active: 1,
  }
  hasMark = type => {
    if (this.state.active === 1) {
      const { value } = this.state
      return value.activeMarks.some(mark => mark.type === type)
    }
    else {
      const { value2 } = this.state
      return value2.activeMarks.some(mark => mark.type === type)
    }
  }

  ref = editor => {
    this.editor = editor
  }
  ref2 = editor => {
    this.editor2 = editor
  }

  setActive = (num) => this.setState({active: num});

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
    this.setState({
      value2: Value.fromJSON(edit),
      buttonPressed: true,
      active: 2
    });
  
  }

  render() {
    return (
      <React.Fragment>
          <Toolbar clasName="white">
              {this.renderMarkButton('bold', 'format_bold')}
              {this.renderMarkButton('italic', 'format_italic')}
              {this.renderMarkButton('underlined', 'format_underlined')}
            </Toolbar>
            <div className="figure1 white">
              <div className="figure1_child">
                <Editor
                  className="pad_50"
                  spellCheck
                  autoFocus
                  placeholder="..."
                  ref={this.ref}
                  value={this.state.value}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  renderMark={this.renderMark}
                />
                <Editor
                  className="pad_50"
                  spellCheck
                  placeholder="..."
                  ref={this.ref2}
                  value={this.state.value2}
                  onChange={this.onChange2}
                  onKeyDown={this.onKeyDown2}
                  renderMark={this.renderMark2}
                />
              </div>
              <Button className="figure1_button" variant="outline-info" onClick={this.generatePoem}>
                {this.state.buttonPressed? "Regenerate AI poem": "Generate AI poem"}
              </Button>
            </div>
      </React.Fragment>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    return (
      <Button1
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button1>
    )
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
  renderMark2 = (props, editor, next) => {
    const { children, mark, attributes } = props
    console.log(editor)
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

  onChange = ({ value }) => {
    this.setActive(1);
    this.setState({ value })
  }
  onChange2 = ({ value }) => {
    this.setActive(2);
    this.setState({ value2: value })
  }

  onKeyDown = (event, editor, next) => {
    let mark
    this.setActive(1);
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
    this.setActive(2);
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
    } else {
      this.editor2.toggleMark(type);
    }
    //this.editor.toggleMark(type)
  }
}

class EditCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
      return (
        <div>
          <Container fluid={true}>
            <Row noGutters={false} className="pad_10">
                <Col md={{span: 4, offset:2}}>
                  <ImageCard />
                </Col>
                <Col md={4} align="center" >
                  <RichTextEditor />
                </Col>
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
      };
    }
  
    render() {
      return (
        <div>
          <React.Fragment>
            <div className="high"></div><div className="figure1 image_bcg" style={{backgroundImage : `url(${'http://isha.sadhguru.org/blog/wp-content/uploads/2016/05/natures-temples.jpg'})`}}>
              <div className="figure1_child">
                
              </div>
            </div>
          </React.Fragment>
        </div>
      );
    }
  }

export default EditCard;
