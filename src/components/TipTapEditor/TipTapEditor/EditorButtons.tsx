import React from 'react';
import { ButtonGroup, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import CodeIcon from '@material-ui/icons/Code';//code
import BorderColorIcon from '@material-ui/icons/BorderColor';//highlite

import FormatTextdirectionLToRIcon from '@material-ui/icons/FormatTextdirectionLToR';//pragraph
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';//bullet list
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';// ordered list
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'; //quote
import FormatClearIcon from '@material-ui/icons/FormatClear'; //clear text


const useStyles = makeStyles((theme: any) => ({
  inActive: {
    borderRadius: 'unset',
    color: theme.palette.green.main,
    border: `1px solid ${theme.palette.green.main}`,
  },
  active: {
    borderRadius: 'unset',
    color: theme.palette.white,
    border: `1px solid ${theme.palette.green.main}`,
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
  btnGroup: {
    display: 'block'
  }
}));



const EditorButton = (props: any) => {
  const { editor } = props
  const classes = useStyles();
  return (
    <ButtonGroup disableElevation fullWidth className={classes.btnGroup} variant="contained" size='small' >

      {/* ===Bold=== */}
      <IconButton size="small"
        classes={{ root: editor?.isActive('bold') ? classes.active : classes.inActive }}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FormatBoldIcon />
      </IconButton>

      {/* ===italic=== */}
      <IconButton size="small"
        classes={{ root: editor?.isActive('italic') ? classes.active : classes.inActive }}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FormatItalicIcon />
      </IconButton>

      {/* ===Strike=== */}
      <IconButton size="small"
        classes={{ root: editor?.isActive('strike') ? classes.active : classes.inActive }}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <StrikethroughSIcon />
      </IconButton>

      {/* ===Code=== */}
      <IconButton size="small"
        classes={{ root: editor?.isActive('code') ? classes.active : classes.inActive }}
        onClick={() => editor?.chain().focus().toggleCode().run()}
      >
        <CodeIcon />
      </IconButton>

      {/* ===Paragraph=== */}
      <IconButton size="small"
        classes={{ root: editor?.isActive('paragraph') ? classes.active : classes.inActive }}
        onClick={() => editor?.chain().focus().setParagraph().run()}
      >
        <FormatTextdirectionLToRIcon />
      </IconButton>
 
      {/* ===bullet list=== */}
      <IconButton size="small"
        classes={{ root: editor?.isActive('bulletList') ? classes.active : classes.inActive }}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <FormatListBulletedIcon />
      </IconButton>

      {/* ===order list=== */}
      <IconButton size="small"
        classes={{ root: editor?.isActive('orderedList') ? classes.active : classes.inActive }}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <FormatListNumberedIcon />
      </IconButton>


    </ButtonGroup>
  );
}

const EditorIcon = (props: any) => {
  const { children, active, click } = props
  const classes = useStyles()
  return (
    <IconButton size="small"
      classes={{ root: active ? classes.active : classes.inActive }}
      onClick={() => click()}
    >
      {children}
    </IconButton>
  )
}

export default EditorButton;
