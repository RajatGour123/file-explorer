import { createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import {FileExplorerData as data} from "../data/FileExplorerData";

export const FileExplorerContext = createContext();

export default function FileExplorerContextWrapper({ children }) {
  const [nodes, setNodes] = useState(data);

  const addNode = (parentId, value) => {
    let status=  checkName(parentId,value,nodes)

    if(!status){
  toast.error("Name already Exist")
    }
    else{
        const newId = Date.now();
        const newData = { id: newId, name: value, parentId: parentId };
        const isFolder = value.split(".");
        if (isFolder.length > 1) {
          //it is a file
          newData.type = "file";
        } else {
          //it is a folder
          newData.type = "folder";
          newData.children = [];
        }
        const updatedNodes = { ...nodes, [newId]: newData };
        console.log(updatedNodes);
        updatedNodes[parentId].children.unshift(newId);
        setNodes(updatedNodes);
    }

  };
  function checkName(parentId, name,nodes) {
    const parent = nodes[parentId];
    if (!parent) {
        alert("error")
    }

    for (const childId of parent.children) {
        const child = nodes[childId];
        if (child.name === name) {
            return false
        }
    }

    return `Name "${name}" is available for use`;
}
  const editNode = (id, value) => {
   let status= checkName(id,value,nodes)
    if(!status){
  toast.error("Name already Exist")
    }
    else{
        const updatedNodes = { ...nodes };
        updatedNodes[id].name = value;
        setNodes(updatedNodes);
    }
 
  };

  const deleteNode = (id) => {
    const updatedNodes = { ...nodes };
    const parentId = updatedNodes[id].parentId;
    if (parentId) {
      updatedNodes[parentId].children = updatedNodes[parentId].children.filter(
        (childId) => {
          return childId !== id;
        }
      );
    }
    const queue = [id];
    while (queue.length > 0) {
      const currentId = queue.shift();
      if (nodes[currentId].children) queue.push(...nodes[currentId].children);
      delete updatedNodes[currentId];
    }
    setNodes(updatedNodes);
  };
  return (
    <>     
    <FileExplorerContext.Provider
      value={{ nodes, deleteNode, addNode, editNode }}
    >
      {children}
    </FileExplorerContext.Provider>
    </>
  );
}
