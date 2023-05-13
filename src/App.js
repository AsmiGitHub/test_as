/**These lines import necessary dependencies and components for the application. 
 * useState is imported from the React library to manage state within a functional component. 
 * Comment is imported from the ./components/Comment file, which presumably contains the component responsible for rendering and manipulating comments. 
 * useNode is imported from the ./hooks/useNode file, which provides the functions for manipulating the tree structure. 
 * And the "./styles.css" file is imported to apply styles to the application. */
import { useState } from "react";
import Comment from "./components/Comment";
import useNode from "./hooks/useNode";
import Header from "./components/Header";
import "./styles.css";

/**This line initializes the comments object, which represents the root of the tree structure. 
 *It has an id property set to 1 and an empty items array. This structure will be managed by the application. */
const comments = {
  id: 1,
  items: [],
};

/**This line defines the App functional component using arrow function syntax */
const App = () => {
/**This line uses the useState hook to create a state variable commentsData and a function setCommentsData to update its value. 
   * The initial value of commentsData is set to the comments object, representing the initial state of the comments tree */
  const [commentsData, setCommentsData] = useState(comments);
/**This line uses the useNode custom hook to initialize three variables: insertNode, editNode, and deleteNode. 
 * These variables represent the three functions returned by the useNode hook, which allow for inserting, editing, and deleting nodes in the tree structure. */
  const { insertNode, editNode, deleteNode } = useNode();
/**This line defines the handleInsertNode function, which is responsible for handling the insertion of a new node into the comments tree. 
 * It takes two parameters: folderId, which represents the ID of the node where the new node will be inserted, and item, which represents the name or content of the new node.
Inside the function, the insertNode function from the useNode hook is called with the current commentsData, folderId, and item as arguments. 
The returned finalStructure represents the updated tree structure after the insertion.
Finally, the setCommentsData function is called with finalStructure as an argument to update the state and trigger a re-render of the component with the updated tree structure. */
  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };
/**This line defines the handleEditNode function, responsible for handling the editing of a node in the comments tree.
 *  It takes two parameters: folderId, representing the ID of the node to be edited, and value, representing the new value or content for the node.
Inside the function, the editNode function from the useNode hook is called with the current commentsData, folderId, and value as arguments. 
The returned finalStructure represents the updated tree structure after the edit.
The setCommentsData function is then called with finalStructure as an argument to update the state and trigger a re-render of the components with the updated tree structure. */
  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };
/**This line defines the handleDeleteNode function, responsible for handling the deletion of a node from the comments tree. 
 * It takes one parameter: folderId, representing the ID of the node to be deleted.
Inside the function, the deleteNode function from the useNode hook is called with the current commentsData and folderId as arguments. 
The returned finalStructure represents the updated tree structure after the deletion.
A temporary object temp is created using the spread operator ({ ...finalStructure }) to ensure that the state update triggers a re-render. 
This step is necessary because React compares the reference of the state object to determine if it has changed. 
By creating a new object using the spread operator, we guarantee a change in the reference.
Finally, the setCommentsData function is called with temp as an argument to update the state and trigger a re-render of the component with the updated tree structure. */
  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };
/**This block of code represents the JSX (JavaScript XML) returned by the App component. 
 * It renders the Comment component, passing several props to it:

handleInsertNode: The handleInsertNode function is passed to the Comment component, allowing it to invoke the function when a new node needs to be inserted.
handleEditNode: The handleEditNode function is passed to the Comment component, enabling it to invoke the function when a node needs to be edited.
handleDeleteNode: The handleDeleteNode function is passed to the Comment component, enabling it to invoke the function when a node needs to be deleted.
comment: The commentsData state variable is passed to the Comment component, providing it with the current tree structure to render and display.
The returned JSX is wrapped in a <div> element with the className of "App", which allows for applying styling to the component.

Finally, the App component is exported as the default export, making it available for use in other parts of the application. */
  return (
    
    <div className="App">
    <Header/>
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </div>
  );
};

export default App;