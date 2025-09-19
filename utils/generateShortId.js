import { nanoid } from "nanoid";

const generateShortId = () => {
  return nanoid(8); 
};

export default generateShortId;
