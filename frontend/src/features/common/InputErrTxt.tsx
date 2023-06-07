export type InputErrTxtProps = {
  errorTxt: string;
};
export default function InputErrTxt(props: InputErrTxtProps) {
  return (
    <p
      style={{
        color: "red",
      }}
    >
      {props.errorTxt}
    </p>
  );
}
