import React from "react";
import Split from "react-split";
import ProblemDescription from "./problemDesc/ProblemDescription";
import Playground from "./playground/Playground";
import { Problem } from "@/utils/types/problems";

type WorkspaceProps = {
  problem: Problem
};

const Workspace: React.FC<WorkspaceProps> = ({problem}) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem}/>
      <Playground problem={problem}/>
    </Split>
  );
};
export default Workspace;
