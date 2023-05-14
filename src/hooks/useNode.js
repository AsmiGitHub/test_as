/*This line defines a function called useNode using arrow function syntax. 
It doesn't take any arguments and will return an object containing three functions: insertNode, editNode, and deleteNode.*/
const useNode = () => {
/*This line defines the insertNode function, which takes three parameters: tree, commentId, and item.
This function is responsible for inserting a new node into the tree structure. */ 
    const insertNode = function (tree, commentId, item) {
/* This block of code checks if the current tree node's id matches the commentId. 
If they match, a new node object is created with a unique id (using new Date().getTime()), 
the provided item name, and an empty items array. 
The new node is then pushed into the tree node's items array. 
Finally, the updated tree is returned. */      
      if (tree.id === commentId && item !== "") {
        tree.items.push({
          id: new Date().getTime(),
          name: item,
          items: [],
        });
        return tree;
      } 
/*This code block is executed when the commentId doesn't match the current tree node's id. 
It initializes an empty array called latestNode. 
The tree node's items array is iterated using the map function. For each item (ob) in the items array, 
the insertNode function is recursively called with the ob, commentId, and item arguments. 
The resulting nodes are collected in the latestNode array. 
Finally, an updated copy of the tree is returned using the spread operator (...),
 with the items property replaced by the latestNode array.*/ 
      let latestNode = [];
      latestNode = tree.items.map((ob) => {
        return insertNode(ob, commentId, item);
      });
  
      return { ...tree, items: latestNode };
    };
/*This line defines the editNode function, which takes three parameters: tree, commentId, and value. 
This function is responsible for editing the name of a node in the tree structure. */  
    const editNode = (tree, commentId, value) => {
/*This block of code checks if the current tree node's id matches the commentId. 
If they match, the name property of the tree node is updated with the provided value. 
Finally, the updated tree is returned.*/     
      if (tree.id === commentId) {
        tree.name = value;
        return tree;
      }
/**This code block is executed when the commentId doesn't match the current tree node's id. 
 * It iterates over each item (ob) in the tree node's items array and recursively calls the editNode function with the ob, commentId, and value arguments. 
 * This ensures that all child nodes are checked for a match. */
      tree.items.map((ob) => {
        return editNode(ob, commentId, value);
      });
/**After iterating over the child nodes, an updated copy of the tree is returned using the spread operator (...).
 */  
      return { ...tree };
    };
 /**This line defines the deleteNode function, which takes two parameters: tree and id. This function is responsible for deleting */ 
    const deleteNode = (tree, id) => {
/**This code block is the implementation of the deleteNode function. It iterates over the tree node's items array using a for loop. For each item, it checks if the id of the current item matches the specified id parameter.
If a match is found, the splice method is used to remove the item from the items array at the current index i. The updated tree is then returned.
If no match is found, the deleteNode function is recursively called with the current item (currentItem) and the specified id parameter. This allows the function to search for the id in the child nodes of the tree.
After iterating over all the items and their child nodes, if no match is found, the original tree is returned.
Finally, the useNode function returns an object containing the insertNode, editNode, and deleteNode functions. This allows external code to access and use these functions for manipulating a tree structure. */     
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode };
  };
  
  export default useNode;