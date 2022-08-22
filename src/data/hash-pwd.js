import { ethers } from "ethers";
import "@ethersproject/shims";

const hashPassword = (seed) => {
  const hash = ethers.utils.hashMessage(seed);

  return hash;
}
  
export default hashPassword;
