import { useContext, useState } from "react";
import { FileExplorerContext } from "../context/FileExplorerContext";
import Input from "./Input";
import { ToastContainer, toast } from 'react-toastify';

export default function FileExplorer({ id = 1 }) {
  const [showChildren, setShowChildren] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const { nodes, deleteNode, addNode, editNode } =
    useContext(FileExplorerContext);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  const handleDelete=(id)=>{
    console.log({id},"67899999999999999")
  if(id!="1"){
    deleteNode(id)
  }
  }
  return (
    <div className="container">
      <h5>
        {nodes[id]?.type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}

        {showEditInput ? (
          <Input
            name={nodes[id].name}
            cancel={() => setShowEditInput(false)}
            id={id}
            submit={editNode}
          />
        ) : (
          <>
            <span onClick={handleClick}>{nodes[id].name}</span>

            {nodes[id].type === "folder" && (
              <span onClick={() => setShowAddInput(true)}>➕</span>
            )}
            <span onClick={() => setShowEditInput(true)}>🖊️</span>
            <span onClick={() => handleDelete(id)}>❌</span>
          </>
        )}
      </h5>
      <>
        {showAddInput && (
          <Input
            submit={addNode}
            id={id}
            cancel={() => setShowAddInput(false)}
          />
        )}
      </>
      {showChildren &&
        nodes[id]?.children?.map((childId, index) => {
          return <FileExplorer key={index} id={childId} />;
        })}

<ToastContainer />
    </div>
  );
}
