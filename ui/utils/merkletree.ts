import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import MerkleTree from "merkletreejs";

export const merkleTreeRoot = (data: string[]) => {
  const tree = StandardMerkleTree.of([data], ["string"]);
  return tree.root;
}

export const merkleTreeVerify = async (tree: any, dataToProve: string) => {
  let response = false;
  for (const [i, v] of tree.entries()) {
    if (v[i] === dataToProve) {
      const proof = tree.getProof(i);
      console.log('Proof:', proof);
      response = tree.verify(proof,dataToProve);
    }
  }
  return response;
}
