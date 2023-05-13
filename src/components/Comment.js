//The code begins with importing necessary dependencies and components. 
//useState, useRef, and useEffect are hooks from the React library used for managing state and side effects. 
//Action is imported from the "./Action" file, which is likely another React component. 
//The DownArrow and UpArrow components are imported as React components from SVG files.
import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
import moment from 'moment';


//A functional component named Comment is declared. 
//It accepts several props: handleInsertNode, handleEditNode, handleDeleteNode, comment, and initialText. 
//It uses destructuring to extract these props from the passed object.
const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  initialText = "",

}) => {
  //Several state variables are declared using the useState hook. 
  //These variables are input, editMode, showInput, and expand, each initialized with an initial value. setInput, setEditMode, setShowInput, and setExpand are functions used to update the state variables, respectively.
  //inputRef is initialized as a reference object using the useRef hook. 
  //It is initially set to null.
  //Another state variable text is declared and initialized with the value of initialText prop. 
  //setText is a function to update the text state variable.
 // isTextareaDisabled is a boolean variable that indicates whether the textarea should be disabled based on the length of the text.  
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const fiveMinutes = 300000;
  const createdAt = moment(comment.createdAt).format('DD/MM/YYYY');


  //The useEffect hook is used here to focus on the input element referenced by inputRef when editMode changes. 
  //It ensures that the input receives focus whenever editMode becomes true.
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);
//handleNewComment is a function that toggles the value of expand and sets showInput to true. 
//It is likely used to expand the comment section and show the input for adding a new comment.
  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };
//onAddComment is a function called when adding a new comment. 
//If editMode is true, it calls handleEditNode function with the comment.id and the inner text of inputRef. 
//Otherwise, it sets expand to true, calls handleInsertNode with the comment.id and input, and resets the input-related state variables.
//Finally, if `editMode is true, it sets editMode to false using setEditMode.
  const onAddComment = () => {
    
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      console.log('check editmode0120303');
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };
//handleDelete is a function called when deleting a comment. 
//It invokes the handleDeleteNode function with the comment.id as a parameter.
  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };
 
/*The return statement begins the JSX markup of the component. 
It renders a <div> element as the outer container.
Inside the container, a nested <div> is rendered with a dynamic className based on the comment.id. 
If the comment.id is equal to 1, it will have the className "inputContainer"; otherwise, it will have the className "commentContainer".
Inside this nested <div>, there is a <div> with the className "comment-image-container", which contains an <img> element displaying a user icon.
*/ 

return (
  
  <div>
  
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
      
{/*
   In this section:
There is a conditional rendering based on the value of comment.id.
If comment.id is equal to 1, it renders the content within the first pair of parentheses. Otherwise, it renders the content within the second pair of parentheses.
If comment.id is equal to 1:
An <input> element is rendered with various attributes such as type, className, autoFocus, value, onChange, and placeholder.
An Action component is rendered with specific props, including className, type, and handleClick.
If comment.id is not equal to 1:
A <span> element is rendered with contentEditable and suppressContentEditableWarning attributes set to the value of editMode.
The ref attribute is used to reference an element (inputRef) for later use.
The <span> element displays the value of comment.name.
A <div> element is rendered with inline styles, including display: "flex" and marginTop: "5px".
Within this <div>, there is more conditional rendering.
*/ }

        {comment.id === 1 ? (
          <>
          
          <form>
            <textarea
              type="text"
              className="comment-form-textarea"
              autoFocus
              value={input}
              
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a comment" 
            />

            <Action
              className="comment-form-button"
              type="COMMENT"
              handleClick={onAddComment}
            />
            </form>
          </>
        ) : (
          <>
          <div className="comment">
            <div className="comment-image-container">
              <img src="/user-icon.png" />
            </div></div>
            
           
            
            <span
            
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
            <div className="commentsection">
              {comment.name}</div>
            </span>

{/*  
In this section, there is a conditional rendering within the second <div> we were discussing earlier. It is based on the value of editMode. If editMode is true, it renders the content within the first pair of parentheses. Otherwise, it renders the content within the second pair of parentheses.

If editMode is true:

An Action component is rendered with a className of "reply", a type of "SAVE", and a handleClick prop set to onAddComment.
Another Action component is rendered with a className of "reply", a type of "CANCEL", and a handleClick prop that contains a callback function. This function checks if inputRef.current exists and sets its inner text to comment.name. Then, it calls setEditMode(false) to disable the edit mode.
If editMode is false:

An Action component is rendered with a className of "reply". The type prop is set to a JSX fragment (<>...</>) that conditionally renders an <UpArrow> or <DownArrow> component based on the value of expand. It also includes the text "REPLY" followed by comment.name.
The handleClick prop is set to handleNewComment.
Please note that the code snippet provided doesn't include the definition of the <UpArrow> and <DownArrow> components, so their exact implementation and behavior are not visible in the given code.

*/}
<div class="comment-actions">
            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="reply"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
              )}
             
              <div>
            <span className="dateTime">
            {createdAt}
            </span> 
            </div>
            </div>
          
            </div>
        
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <textarea
              type="text"
              className="comment-form-textarea"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;