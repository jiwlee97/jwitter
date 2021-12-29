import { useCallback, useState, VFC } from "react";
import { IUser } from "components/App";
import { Form } from "./styles";

interface IProps {
  userObj: IUser;
  refreshUser: () => void;
}

const EditNickname: VFC<IProps> = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userObj.displayName ?? "User"
  );

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!newDisplayName || newDisplayName === userObj.displayName) {
        return;
      }
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    },
    [newDisplayName, refreshUser, userObj]
  );

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Nickname"
        value={newDisplayName}
        onChange={onChange}
      />
      <button type="submit">Edit Nickname</button>
    </Form>
  );
};

export default EditNickname;
