import { AiOutlineClose } from "react-icons/ai";
import { InputProps } from "./Input";
import "./AddOrRemoveList.css";
import Button from "./Button";
export type AddOrRemoveListProps = {
  listItems: { _id: string; value: string }[];
  inputProps: InputProps;
  onRemoveClick: (_id: string) => void;
  addToList: VoidFunction;
  buttonLabel: string;
};
export default function AddOrRemoveList(props: AddOrRemoveListProps) {
  return (
    <div className="addorremove__list">
      <input {...props.inputProps} />
      <ul className="add__list">
        {props.listItems.map((item) => (
          <li key={item._id}>
            <span>{item.value}</span>
            <AiOutlineClose onClick={() => props.onRemoveClick(item._id)} />
          </li>
        ))}
      </ul>
      <Button type="button" label={props.buttonLabel} onClick={props.addToList} />
    </div>
  );
}
